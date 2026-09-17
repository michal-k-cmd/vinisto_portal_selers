import React, { Children, type ReactNode, useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Form, FormProps } from 'react-final-form';
import { LocalizationContext } from 'Services/LocalizationService';

type Props<T> = FormProps<T, Partial<T>> & {
	renderHeader?: (page: number) => ReactNode;
	onSubmit: (values: T) => void;
	submitText?: ReactNode;
};

export const Step = <T,>(props: {
	children: ReactNode;
	validate?: (values: any) => Partial<T>;
}) => props.children;

const MultistepForm = <T extends Record<string, any>>(props: Props<T>) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const { onSubmit, children, initialValues = {}, renderHeader } = props;
	const [page, setPage] = useState(0);
	const [values, setValues] = useState<Partial<T>>(initialValues);

	const childrenArray =
		typeof children === 'function' ? [] : Children.toArray(children);
	const activePage = childrenArray[page];
	const isLastPage = page === Children.count(children) - 1;

	const next = (values: Partial<T>) => {
		setPage((currentPage) =>
			Math.min(currentPage + 1, Children.count(children) - 1)
		);
		setValues(values);
	};

	const previous = () => {
		setPage((currentPage) => Math.max(currentPage - 1, 0));
	};

	const validate = (values: T) => {
		const activePage = childrenArray[page];
		const activePageProps = React.isValidElement(activePage)
			? activePage.props
			: {};
		return activePageProps.validate ? activePageProps.validate(values) : {};
	};

	const handleSubmit = (values: T) => {
		const isLastPage = page === React.Children.count(children) - 1;

		if (isLastPage) {
			return onSubmit(values);
		} else {
			next(values);
		}
	};

	return (
		<Form<T>
			{...props}
			initialValues={values}
			onSubmit={handleSubmit}
			validate={validate}
		>
			{({ handleSubmit, submitting }) => {
				return (
					<form onSubmit={handleSubmit}>
						{typeof renderHeader === 'function' ? renderHeader(page) : null}
						{activePage}
						<div className="d-flex align-item-center justify-content-between">
							{page > 0 && (
								<Button
									type="button"
									variant="otline"
									className="btn btn-outline-primary"
									onClick={previous}
								>
									← {t({ id: 'admin.previous' })}
								</Button>
							)}
							{!isLastPage && (
								<Button
									type="submit"
									style={{ marginLeft: 'auto' }}
								>
									{' '}
									{t({ id: 'admin.next' })} →
								</Button>
							)}
							{isLastPage && (
								<Button
									type="submit"
									disabled={submitting}
								>
									{props.submitText ?? t({ id: 'submit' })}
								</Button>
							)}
						</div>
					</form>
				);
			}}
		</Form>
	);
};

export default MultistepForm;
