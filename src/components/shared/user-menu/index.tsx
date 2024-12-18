'use client'
import { useLogout } from '@/hooks/auth/logout'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'nextjs-toploader/app';
import React, { useEffect, useRef } from 'react'

type UserMenuType = {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const UserMenu = ({ isOpen, setIsOpen}:UserMenuType) =>{
    const menuRef = useRef<any>(null);
    const router = useRouter();

    const { handleLogout } = useLogout(()=>{
      setIsOpen(false)
    });
    
    useEffect(() => {
        const handleClickOutside = (event:any) => {
          if (menuRef.current && !menuRef?.current?.contains(event.target)) {
            setIsOpen(false);
          }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }, []);
      
    return <AnimatePresence>
    {isOpen && (
      <motion.div
        ref={menuRef}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="dropdown-menu"
      >
        <ul>
          <li onClick={() => router.push('/profile')}>My Profile</li>
          <li onClick={() => router.push('/profile')}>My Books</li>
          <li onClick={() => alert('Change Password')}>Change Password</li>
          <li onClick={() => handleLogout() }>Logout</li>
        </ul>
      </motion.div>
    )}
  </AnimatePresence>
}

export default UserMenu;