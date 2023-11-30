import React from 'react'
import SignInForm from './SignInForm'
import { APP_NAME } from 'constants/app.constant'

const SignIn = () => {
    return (
        <>
            <div className=' mb-8 flex justify-center'>
               <img  src='logoEdg.png' alt={`${APP_NAME} logo`} />
            </div>
            <div className="mb-6 text-center">
                <h3 className="mb-1">Benvenuto nell'<span className='text-red-600'>Area Operatore</span></h3>
                <p>Inserisci le credenziali del tuo account per entrare nell'area riservata</p>
            </div>
            <SignInForm disableSubmit={false} />
        </>
    )
}

export default SignIn
