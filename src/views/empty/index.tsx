'use client'
import React from 'react'
import {motion} from 'framer-motion'
import Image from 'next/image'

type EmptyBooksProps = {
    title?: string
}
const EmptyBooks = ({ title }: EmptyBooksProps) =>{
    return <motion.div className='flex flex-col w-full h-full self-center justify-center items-center'>
        <div className='flex flex-col gap-5'>
        <Image
         src={'/empty.png'}
          alt="Empty books"
          width={180}
          height={38}
          className="w-[200px] h-auto rounded-lg object-cover"
          priority
        />
            <h3 className='text-sm'>{title ?? 'The books you authored will appear here'}</h3>
        </div>
    </motion.div>
}

export default EmptyBooks;