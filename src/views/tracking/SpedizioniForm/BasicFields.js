import React, { useEffect } from 'react'
import { Input, FormItem, Select } from 'components/ui'
import { RichTextEditor } from 'components/shared'
import { Field } from 'formik'
import { useSelector,useDispatch } from 'react-redux'
import { getCorrieri, getClienti } from './store/dataSlice'

const BasicFields = (props) => {
    const { values, touched, errors, type } = props
   
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCorrieri())
        dispatch(getClienti())
    }, [])

    const corrieriData = useSelector(
        (state) => state.trackingSpedizioneForm.data.corrieriData
    )

    const corrieri = corrieriData.map((corriere) => {
        return {
            label: corriere.corriere,
            value: corriere.id_corriere,
        }
    })
    
    const stato = [
        { label: 'In consegna', value: 'IN CONSEGNA' },
        { label: 'Consegnata', value: 'CONSEGNATA' },
        { label: 'Prenotata', value: 'PRENOTATA' },
        { label: 'Ritirata', value: 'RITIRATA' },
        { label: 'Partita', value: 'PARTITA' },
        { label: 'In transito', value: 'IN TRANSITO' },
        { label: 'Mancata consegna', value: 'MANCATA CONSEGNA' },
        { label: 'Ritorno al mittente', value: 'RITORNO AL MITTENTE' },
        { label: 'Smarrita', value: 'SMARRITA' },        
    ]
    
    const clientiData = useSelector(
        (state) => state.trackingSpedizioneForm.data.clientiData
    )

    const clienti = clientiData.map((cliente) => {
        return {
            label: cliente.cliente,
            value: cliente.id_cliente,
        }
    })    

    return (
        <>
            <FormItem
                label="Id spedizione"
                invalid={errors.id_spedizione && touched.id_spedizione}
                errorMessage={errors.id_spedizione}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="id_spedizione"
                    placeholder="Id spedizione"
                    component={Input}
                />
            </FormItem>        
            <FormItem
                label="Codice spedizione"
                invalid={errors.altro_numero && touched.altro_numero}
                errorMessage={errors.altro_numero}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="altro_numero"
                    placeholder="Codice spedizione"
                    component={Input}
                />
            </FormItem>
            
            <FormItem
                    label="Cliente"
                    invalid={errors.cliente && touched.cliente}
                    errorMessage={errors.cliente}
                >
                    <Field name="id_cliente">
                        {({ field, form }) => (
                            <Select
                                field={field}
                                form={form}
                                options={clienti}
                                value={clienti.filter(
                                    (id_cliente) =>
                                        id_cliente.value === values.id_cliente
                                )}
                                onChange={(option) =>
                                    form.setFieldValue(
                                        field.name,
                                        option.value
                                    )
                                }
                            />
                        )}
                    </Field>
            </FormItem>      

            <FormItem
                    label="Corriere"
                    invalid={errors.corriere && touched.corriere}
                    errorMessage={errors.corriere}
                >
                    <Field name="id_corriere">
                        {({ field, form }) => (
                            <Select
                                field={field}
                                form={form}
                                options={corrieri}
                                value={corrieri.filter(
                                    (id_corriere) =>
                                        id_corriere.value === values.id_corriere
                                )}
                                onChange={(option) =>
                                    form.setFieldValue(
                                        field.name,
                                        option.value
                                    )
                                }
                            />
                        )}
                    </Field>
            </FormItem>
            
            <FormItem
                    label="Stato spedizione"
                    invalid={errors.stato && touched.stato}
                    errorMessage={errors.stato}                    
                >
                    <Field name="stato">
                        {({ field, form }) => (
                            <Select
                                field={field}
                                form={form}
                                options={stato}
                                value={stato.filter(
                                    (stato) =>
                                        stato.value === values.stato
                                )}
                                onChange={(option) =>
                                    form.setFieldValue(
                                        field.name,
                                        option.value
                                    )
                                }
                            />
                        )}
                    </Field>
            </FormItem>

            <FormItem
                label="Note"
                labelClass="!justify-start"
                invalid={errors.description && touched.description}
                errorMessage={errors.description}
            >
                <Field name="note">
                    {({ field, form }) => (
                        <RichTextEditor
                            value={field.value}
                            onChange={(val) =>
                                form.setFieldValue(field.name, val)
                            }
                        />
                    )}
                </Field>
            </FormItem>
        </>
    )
}

export default BasicFields
