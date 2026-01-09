"use client"
import React from 'react'
import { Button } from './button'
import { signOut } from 'next-auth/react'

const ProfileActions = () => {
  return (
    <div className='flex items-center justify-center' >
      <Button onClick={e => signOut()} >
        SignOut
      </Button>
    </div>
  )
}

export default ProfileActions