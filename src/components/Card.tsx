'use client'
import Image from 'next/image'
import InteractiveCard from './InteractiveCard'
import { Rating } from '@mui/material';
import { useState } from 'react';

export default function Card ({hospitalName,imgSrc,updateRating}:{hospitalName:string, imgSrc:string, updateRating?:Function}) {
    
    const  [rating, setRating] = useState<number|null>(0)
    
    return(
        <InteractiveCard>
            <div className='w-full h-[70%] relative rounded-t-lg'>
                <Image
                    src={imgSrc}
                    alt="Production Picture"
                    fill={true}
                    className='object-cover rounded-t-lg'
                />
            </div>
            <div className='w-full h-[15%] p-[10px]'>{hospitalName}</div>
            {
                updateRating?  <Rating
                                    className='p-[10px]'
                                    id = {hospitalName + ' Rating'}
                                    name={hospitalName + ' Rating'}
                                    data-testid={hospitalName + ' Rating'}
                                    value={rating}
                                    onClick={(e)=>{e.stopPropagation();}}
                                    onChange={(e, newRating) => {
                                        setRating(newRating)
                                        updateRating(hospitalName,newRating)
                                    }}
                                />
                            :''
            }
        </InteractiveCard>
    )
}