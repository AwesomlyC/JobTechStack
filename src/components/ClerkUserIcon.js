import React from 'react'
import {UserButton} from '@clerk/clerk-react'
import './../styles/ClerkUserIcon.css'
function ClerkUserIcon() {
  return (
      <div className='clerk-user-icon'>
          <UserButton 
            userProfileMode = 'modal'
            appearance={{
                elements: {
                    userButtonAvatarBox: {
                        width: "32px",
                        height: "32px",
                      },
                }
            }}/>
        </div>
  )
}

export default ClerkUserIcon