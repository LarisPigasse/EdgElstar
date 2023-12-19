import React from 'react'
import { Input, FormItem } from 'components/ui'
import { Field } from 'formik'


const ShippingFields = (props) => {
    const { touched, errors } = props

    return (
        <>
            <FormItem
                label="Destinatario"
                invalid={errors.destinatario && touched.destinatario}
                errorMessage={errors.destinatario}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="destinatario"
                    placeholder="Destinatario"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Destinazione"
                invalid={errors.destinazione && touched.destinazione}
                errorMessage={errors.destinazione}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="destinazione"
                    placeholder="Destinazione"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Indirizzo"
                invalid={errors.indirizzo && touched.indirizzo}
                errorMessage={errors.indirizzo}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="indirizzo"
                    placeholder="Indirizzo"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Cap"
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="cap"
                    placeholder="Cap"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Città"
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="citta"
                    placeholder="Città"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Codice nazione"
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="codice_nazione"
                    placeholder="Codice nazione"
                    component={Input}
                />
            </FormItem>                                                                             
        </>
    )
}

export default ShippingFields
