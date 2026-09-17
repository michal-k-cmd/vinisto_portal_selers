import { useCallback, useContext, useMemo, useRef } from 'react';
import cx from 'classnames';
import { get } from 'lodash-es';
import { API_EVALUATIONS_URL } from 'pages-spa/Bundle/Components/BundleDetail/Components/ReviewSection/constants';
import { NOT_SELECTED } from 'Components/Rating/constants';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { ModalContext } from 'Components/Modal/context';
import { NotificationsContext } from 'Services/NotificationService';
import { Form, InputError, InputTextArea } from 'Components/Form';
import { required } from 'Components/Form/validators';
import { Field } from 'react-final-form';
import { MutableState, Tools } from 'final-form';
import './styles.css';
import Rating from 'Components/Rating';
import api from 'vinisto_api_client/src/api';

import { ReviewFormValues } from './types';
import styles from './styles.module.css';

const ReviewModal = () => {
	const { vinistoUser } = useContext(AuthenticationContext);
	const { useFormatMessage } = useContext(LocalizationContext);
	const modalContext = useContext(ModalContext);
	const notificationsContext = useContext(NotificationsContext);
	const t = useFormatMessage();
	const userLoginHash = vinistoUser.loginHash;

	const reviewData = modalContext?.modalData?.reviewData ?? {};
	const reviewStars = reviewData.stars;
	const reviewValue =
		reviewStars === undefined ? NOT_SELECTED : reviewStars / 2;

	const handleOnSubmitReview = useCallback(
		(formValues: ReviewFormValues) => {
			const requestData = {
				userLoginHash: userLoginHash,
				bundleId: get(modalContext, 'modalData.bundleId', ''),
				text: get(formValues, 'text', ''),
				stars: get(formValues, 'rating', 0) * 2, // API accepts values 0-10, we have 5 stars
			};
			api
				.post(API_EVALUATIONS_URL, undefined, requestData)
				.then(() => {
					notificationsContext.handleShowSuccessNotification(
						'notification.message.review.success'
					);
					modalContext.handleCloseModal();
					modalContext.modalData?.forceReload?.();
				})
				.catch(() => {
					notificationsContext.handleShowErrorNotification(
						'notification.message.review.error'
					);
				});
		},
		[userLoginHash, modalContext, notificationsContext]
	);

	const validateRating = useCallback((value: any): string | undefined => {
		return !value || value <= 0 ? 'modal.review.rating.error' : undefined;
	}, []);

	const mutatorsReference = useRef<Record<string, any>>({});
	const mutators = useMemo(
		() => ({
			updateRating: (
				args: [],
				state: MutableState<Record<string, any>>,
				tools: Tools<Record<string, any>>
			) => {
				tools.changeValue(state, 'rating', () => get(args, '[0]', 0));
			},
		}),
		[]
	);

	const handleOnRatingChange = useCallback((value: number) => {
		const updateRating = get(
			mutatorsReference,
			'current.updateRating',
			() => null
		);
		updateRating(value);
	}, []);

	return (
		<Form
			submitCallback={handleOnSubmitReview}
			initializationValues={{
				text: reviewData.text ?? '',
				rating: reviewValue,
			}}
			customSubmitContent={() => (
				<div className={styles.footer}>
					<div className={styles.footerText}>
						{t({ id: 'modal.review.disclaimer' })}
					</div>
					<button
						type="submit"
						className={cx(styles.footerButton, 'vinisto-btn vinisto-bg-green')}
					>
						{t({ id: 'modal.review.button' })}
					</button>
				</div>
			)}
			{...{ mutators, mutatorsReference }}
		>
			<div className={styles.stars}>
				<Field
					name="rating"
					validate={validateRating}
					value={reviewValue}
				>
					{(fieldPropTypes) => {
						const { input, meta } = fieldPropTypes;

						return (
							<>
								<Rating
									handleOnChange={handleOnRatingChange}
									defaultValue={get(input, 'value')}
									isLarge
								/>
								<span className="vinisto-add-review__stars-error">
									<InputError
										errorMessage={get(meta, 'error')}
										touched={get(meta, 'touched', false)}
									/>
								</span>
							</>
						);
					}}
				</Field>
			</div>
			<div className="mb-4">
				<InputTextArea
					identifier="text"
					name="text"
					label="modal.review.label"
					className={styles.reviewTextArea}
					placeholder=""
					validate={required}
				/>
			</div>
		</Form>
	);
};

export default ReviewModal;
