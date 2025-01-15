import React from 'react'
import { SignIn } from '@clerk/clerk-react'
import './../styles/SignInPage.css'
function SignInPage() {
  return (
    <div className='clerk-signin'>
      <SignIn 
        fallbackRedirectUrl='/'
        forceRedirectUrl={'/main'}
      />
    </div>
  )
}

export default SignInPage