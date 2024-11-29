import React, { useState, useEffect } from 'react'
import {
    Input,
    Button,
    Select,
    Avatar,
    FormItem,
    FormContainer,
    toast,
    Notification
} from 'components/ui'
import { Field, Form, Formik } from 'formik'
import { HiCheck } from 'react-icons/hi'
import { components } from 'react-select'
import { updateListini,getListini } from '../store/dataSlice'
import { toggleModalUpdateListini } from '../store/stateSlice'
import { useSelector, useDispatch } from 'react-redux'
import * as Yup from 'yup'

const { MultiValueLabel } = components

const CustomSelectOption = ({ innerProps, label, data, isSelected }) => {
    return (
        <div
            className={`flex items-center justify-between p-2 ${
                isSelected
                    ? 'bg-gray-100 dark:bg-gray-500'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
            {...innerProps}
        >
            <div className="flex items-center">
                <Avatar shape="circle" size={20} src={data.img} />
                <span className="ml-2 rtl:mr-2">{label}</span>
            </div>
            {isSelected && <HiCheck className="text-emerald-500 text-xl" />}
        </div>
    )
}

const CustomControlMulti = ({ children, data, ...props }) => {
    const { img } = data
    return (
        <MultiValueLabel {...props}>
            <div className="inline-flex items-center">
                <Avatar
                    className="mr-2 rtl:ml-2"
                    shape="circle"
                    size={15}
                    src={img}
                />
                {children}
            </div>
        </MultiValueLabel>
    )
}

const validationSchema = Yup.object().shape({
    listino: Yup.string().required('il nome del listino è richiesto'),
})

const FormUpdateListini = () => {
    const dispatch = useDispatch()

    const tableData = useSelector(
        (state) => state.crmListini.data.tableData
    )

    const statiListini = useSelector(
        (state) => state.crmListini.state.statiListini
    )

    const dataListini = useSelector(
        (state) => state.crmListini.state.dataListini
    )

   const initialStateListini = {
        listino: dataListini.listino,
        stato: dataListini.stato,
        id_listino: dataListini.id_listino
    }

    const onSubmit = async (formValue, setSubmitting) => {

        setSubmitting(true)
       
        await updateListini(formValue, formValue.id_listino);

        dispatch(toggleModalUpdateListini(false))

        dispatch(getListini(tableData))
        toast.push(
            <Notification
                title="Modifica listino."
                type="success"
                duration={3500}
            >
                Il listino selezionato è stato modificato con success
            </Notification>,
            {
                placement: 'top-center',
            }
        )
    }

    return (
        <Formik
            initialValues={initialStateListini}
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
                                        options={statiListini}
                                        value={statiListini.filter(
                                            (stato) => stato.value === values.stato
                                        )}
                                        onChange={(data) => {
                                            form.setFieldValue(
                                                field.name,
                                                data.value
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

export default FormUpdateListini
