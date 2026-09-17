# SingleEditForm

Wrapper for form fields that are intially disabled and can be edit upon turning edit mode on.
Fields are wrapped in form (react-final-form package is used) automatically, pass function to deal
with submitted data by `onSubmit` prop (see example below). Loading spinner (`ContentPreloader`
component) is displayed overlaying whole form when data are submitted and hidden when passed
`onSubmit` function finishes its execution (result is being `await`ed).
Only one form within the same context can be in edit mode at a time.

## Usage example

```tsx
import { FC, useCallback } from 'react';
import { SingleEditWrapperComponentProps } from 'Components/SingleEditForm/interfaces';
import SingleEditFormContextProvider from 'Components/SingleEditForm/context';
import withForm from 'Components/SingleEditForm/withForm';

interface EditEmailForm {
    email: string;
}

const EditEmailInput: FC<SingleEditWrapperComponentProps> = ({
    disabled,       // state of edit mode
    label,          // function adding toggle edit mode btn after label text
    id,             // string (or array of them) assigned from parent (see below)
}) => {
    ...
    return (<>
        <InputEmail
            identifier={typeof id === 'string' ? id : (id?.[0] : 'email')}
            name="email"
            disabled={disabled}
            label={label(t({ id: 'settings.email.label' }))}
        />
        {/* optionally form elements */}
        ...
    </>);
}

const FormEditEmail = withForm<EditEmailForm>(EditEmailInput);

const Page: FC = () => {
    const handleOnEmailSubmit = useCallback(
        (values: EditEmailForm) => {
            // handle submitted values
            ...
            return apiServiceInstance.get(..)
                .then((...) => {
                    ...
                    // empty object when no errors occured
                    return {};
                })
                .catch((err) => {
                    return {
                        email: err.message,
                    };
                })
        },
        [],
    );
    return (
        <SingleEditFormContextProvider>
            <FormEditEmail
                formKey="userEmail"                 // unique key to identify form within context
                onSubmit={handleOnEmailSubmit}
                initialValues={{                    // optional
                    email: 'my@email.cz',
                }}
                wrapperClassName=" ... "            // optional, default "d-flex"
                btnsClassName=" ... "               // optional, CSS class for wrapper around
                                                    //    OK/Cancel buttons
                id=" ... "                          // optional, string (or array of them) to
                                                    //    assign to elements inside form; useful
                                                    //    when same component is used multiple
                                                    //    times within same page
            />

            {/* more components wrapped using withForm, can have children and own context for
                handling data */}

            ...

        </SingleEditFormContextProvider>
    );
};
```