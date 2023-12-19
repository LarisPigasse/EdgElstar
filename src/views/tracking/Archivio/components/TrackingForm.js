import React from 'react'
import { Form, Formik, Field } from 'formik'
import {
    Input,
    Button,
    FormItem,
    FormContainer,
    toast,
    Notification
} from 'components/ui'

import { getTracking } from '../store/dataSlice'
import { toggleDrawerInsertTracking } from '../store/stateSlice'
import { useDispatch, useSelector } from 'react-redux'

import { insertTracking } from '../store/dataSlice'

function TrackingForm() {

    const dispatch = useDispatch()

    const dataSpedizioni = useSelector(
        (state) => state.trackingSpedizioni.state.dataSpedizioni
    )


    const onSubmit = async (formValue, setSubmitting) => {

        setSubmitting(true)

        formValue = {
            ...formValue,
            id_spedizione: dataSpedizioni.id_spedizione
        }
        

        let ok = await insertTracking(formValue);

        if(ok){
            dispatch(getTracking(dataSpedizioni.id_spedizione))
            dispatch(toggleDrawerInsertTracking(false))
        }



        // dispatch(getOperatori(tableData))
        toast.push(
            <Notification
                title="Tracking registrato con successo."
                type="success"
                duration={3500}
            >
                qualcosa...
            </Notification>,
            {
                placement: 'top-center',
            }
        )
    }

    return (
        <>
            <Formik
                initialValues={{
                    data: '',
                    localita: '',
                    evento: '',
                    info: ''
                }}
                onSubmit={(values, { resetForm, setSubmitting }) => {
                    onSubmit(values, setSubmitting)
                }}
            >
                {({ touched, errors, values, resetForm }) => (
                    <Form>
                        <FormContainer>

                            <FormItem
                                label="Data"
                                invalid={errors.operatore && touched.operatore}
                                errorMessage={errors.operatore}
                            >
                                <Field
                                    type="date"
                                    autoComplete="off"
                                    name="data_tracking"
                                    placeholder="Data"
                                    component={Input}
                                />
                            </FormItem>

                            <FormItem
                                label="Località"
                                invalid={errors.email && touched.email}
                                errorMessage={errors.email}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="localita"
                                    placeholder="Inserisci località"
                                    component={Input}
                                />
                            </FormItem>

                            <FormItem
                                label="Evento"
                                invalid={errors.password && touched.password}
                                errorMessage={errors.password}
                            >
                                <Field
                                    type="textarea"
                                    autoComplete="off"
                                    name="evento"
                                    placeholder="Inserisci evento"
                                    component={Input}
                                />
                            </FormItem>

                            <FormItem
                                label="Info"
                                invalid={errors.password && touched.password}
                                errorMessage={errors.password}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="info"
                                    placeholder="Inserisci ulteriori informazioni"
                                    component={Input}
                                />
                            </FormItem>

                            <Button block variant="solid" type="submit">
                                Submit
                            </Button>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default TrackingForm