'use client'
import UserBooks from '@/components/users/books'
import ProfileSidebar from '@/components/users/side-bar'
import React from 'react'

const UserProfile = () =>{
    return <>
    <div className="grid h-screen px-3 lg:px-10 py-3 font-[family-name:var(--font-geist-sans)]">
    <main className="flex-row gap-12 justify-between md:grid md:grid-cols-12">
        <UserBooks />
        <ProfileSidebar />
      </main>
    </div>
  </>
}

export default UserProfile