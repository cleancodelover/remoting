'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { RangeConfig } from 'rc-slider/lib/Slider';

const SlidingFilter = ({ title, max, min, isYear = false, range = false, isRating = false, onChange }:{title: string, max: number, min: number, range: boolean | RangeConfig | undefined, isRating?: boolean, onChange?:(val:any)=>void, isYear?: boolean}) =>{
  const [currentValue, setCurrentValue] = useState<any>();
  return <motion.div className='p-2'
      whileInView={{
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.3,
        },
      }}
      viewport={{once: false}}>
        <h3 className='text-gray-400'>{title}</h3>
        <Slider range={range} onChange={(e)=>{setCurrentValue(e);}} onChangeComplete={(e)=>{ onChange && onChange(e) }} style={{borderColor:'#d1d5db'}} dotStyle={{}}/>
        <div className='flex flex-row justify-between w-full'>
            {min && <h6 className='text-sm text-gray-400'>{min}</h6>}
            {<h6 className='text-sm text-gray-400'>{`${currentValue ?? 0} ${isRating ? 'stars' : ''}`}</h6>}
            {max && <h6 className='text-sm text-gray-400'>{max}</h6>}
        </div>
    
    </motion.div>
}

export default SlidingFilter;