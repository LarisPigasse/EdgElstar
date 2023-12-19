import React, { forwardRef } from 'react'
import { FormContainer, Button } from 'components/ui'
import { AdaptableCard } from 'components/shared'
import { Form, Formik } from 'formik'
import BasicFields from './BasicFields'
import ShippingFields from './ShippingFields'
import cloneDeep from 'lodash/cloneDeep'
import { AiOutlineSave } from 'react-icons/ai'
import * as Yup from 'yup'
import reducer from './store'
import { injectReducer } from 'store/index'

injectReducer('trackingSpedizioneForm', reducer)

//const { useUniqueId } = hooks

const validationSchema1 = Yup.object().shape({
    altro_numero: Yup.number().required('Inserire codice spedizione'),
    id_cliente: Yup.number().required('Inserire cliente'),
    destinatario: Yup.string().required('Inserire destinatario'),
    destinazione: Yup.string().required('Inserire destinazione'),
    id_corriere: Yup.number().required('Inserire corriere'),
    indirizzo: Yup.string().required('Inserire indirizzo'),
})

const idSpedizioneSchema = Yup.number().required('Inserire id spedizione');

const validationSchema = validationSchema1.concat(
    Yup.object().shape({
        id_spedizione: idSpedizioneSchema,
      })    
)

const SpedizioniForm = forwardRef((props, ref) => {
    const { type, initialData, onFormSubmit, onDiscard } = props

    //const newId = useUniqueId('product-')

    return (
        <>
            <Formik
                innerRef={ref}
                initialValues={{
                    ...initialData,
                    tags: initialData?.tags
                        ? initialData.tags.map((value) => ({
                              label: value,
                              value,
                          }))
                        : [],
                }}
                
                validationSchema={type === 'new' ? validationSchema : validationSchema1}
                onSubmit={(values, { setSubmitting }) => {
                    const formData = cloneDeep(values)
                    formData.tags = formData.tags.map((tag) => tag.value)
                    // if (type === 'new') {
                    //     formData.id = newId
                    //     if (formData.imgList.length > 0) {
                    //         formData.img = formData.imgList[0].img
                    //     }
                    // }
                    onFormSubmit?.(formData, setSubmitting)
                }}
            >
                {({ values, touched, errors, isSubmitting, type }) => (
                    <Form>
                        <FormContainer>
                            <AdaptableCard className="mb-4 p-2" divider>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className='mb-4 col-span-2'>
                                        {(type === 'new') ? <h4>Inserisci una nuova spedizione</h4> : <h4>Modifica la spedizione</h4>}
                                    </div>
                                    <div className="px-2 col-span-2 lg:col-span-1">
                                        <BasicFields
                                            touched={touched}
                                            errors={errors}
                                            values={values}
                                        />                                  
                                    </div>
                                    <div className="px-2 col-span-2 lg:col-span-1">
                                        <ShippingFields
                                            touched={touched}
                                            errors={errors}
                                            values={values}
                                        />
                                    </div>
                                </div>                           
                                <div
                                    className="-mx-8 px-8 flex items-center justify-between py-4"
                                >
                                    <div>

                                    </div>
                                    <div className="md:flex items-center">
                                        <Button
                                            size="sm"
                                            className="ltr:mr-3 rtl:ml-3"
                                            onClick={() => onDiscard?.()}
                                            type="button"
                                        >
                                            Annulla
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="solid"
                                            loading={isSubmitting}
                                            icon={<AiOutlineSave />}
                                            type="submit"
                                        >
                                            Salva
                                        </Button>
                                    </div>
                                </div>
                            </AdaptableCard>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </>
    )
})

SpedizioniForm.defaultProps = {
    type: 'edit',
    initialData: {
        id_cliente: 0,
        altro_numero: 0,
        id_corriere: 0,
        destinatario: '',
        destinazione: '',
        indirizzo: '',
        cap: '',
        citta: '',
        codice_nazione: '',
        data_spedizione: '',
    },
}

export default SpedizioniForm
