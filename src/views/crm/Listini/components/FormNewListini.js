import React, { useState, useEffect } from 'react'
import {
    Input,
    Button,
    Select,
    FormItem,
    FormContainer,
    toast,
    Notification
} from 'components/ui'
import { Field, Form, Formik } from 'formik'
import { components } from 'react-select'
import { insertListini,getListini } from '../store/dataSlice'
import { toggleModalNewListini } from '../store/stateSlice'
import { useSelector, useDispatch } from 'react-redux'
import * as Yup from 'yup'

const { MultiValueLabel } = components

const validationSchema = Yup.object().shape({
    listino: Yup.string().required('il nome del listino è richiesto')
})

const FormNewListini = () => {
    const dispatch = useDispatch()

    const tableData = useSelector(
        (state) => state.crmListini.data.tableData
    )

    const onSubmit = async (formValue, setSubmitting) => {

        setSubmitting(true)
       
       let { stato } = formValue

         stato = stato.value;

        formValue = {...formValue,
                        stato
        }

        let ok = await insertListini(formValue);

        dispatch(toggleModalNewListini(false))

        dispatch(getListini(tableData))
        toast.push(
            <Notification
                title="Inserimento nuovo listino."
                type="success"
                duration={3500}
            >
                Il nuovo listino è stato inserito con successo
            </Notification>,
            {
                placement: 'top-center',
            }
        )
    }

    return (
        <Formik
            initialValues={{
                listino: '',
                stato: ''
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm, setSubmitting }) => {
                onSubmit(values, setSubmitting)
            }}
        >
            {({ touched, errors, values, resetForm }) => (
                <Form>
                    <FormContainer>

                        <FormItem
                            label="Listino"
                            invalid={errors.listino && touched.listino}
                            errorMessage={errors.listino}
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="listino"
                                placeholder="Inserisci il nome del listino"
                                component={Input}
                            />
                        </FormItem>

                        <FormItem
                            label="stato"
                            invalid={errors.stato && touched.stato}
                            errorMessage={errors.stato}
                        >
                            <Field name="stato">
                                {({ field, form }) => (
                                    <Select
                                        className="min-w-[120px]"
                                        field={field}
                                        form={form}
                                        options={[{value:'Attivo',label:'Attivo'},{value:'Inattivo',label:'Inattivo'}]}
                                        value={values.stato}
                                        onChange={(data) => {
                                            console.log(field);
                                            form.setFieldValue(
                                                field.name,
                                                data
                                            )
                                        }}
                                    />
                                )}
                            </Field>
                        </FormItem>

                        <Button block variant="solid" type="submit">
                            Submit
                        </Button>
                    </FormContainer>
                </Form>
            )}
        </Formik>
    )
}

export default FormNewListini
