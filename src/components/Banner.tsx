'use client'
import { useRouter } from 'next/navigation'
import styles from './banner.module.css'
import Image from 'next/image'
import { useState } from 'react'
import { useSession } from 'next-auth/react'

export default function Banner () {
    const covers = ['/img/cover.jpg', '/img/cover2.jpg', '/img/cover3.jpg', '/img/cover4.jpg']
    const  [index, setIndex] = useState(0)
    const router = useRouter()
    const {data:session} = useSession()
    
    return(
        <div className={styles.banner} onClick={()=> {setIndex(index+1)}}>
            <Image 
                src={covers[index%4]}
                alt="cover"
                fill={true}
                priority
                style={{ objectFit: "cover" }}
            />
            <div className={styles.bannerText}>
                <h1 className='text-4xl font-medium'>Vaccine Service Center</h1>
                <h3 className='text-xl font-serif'>Book the vaccines you want with us.</h3>
            </div>
            {
                session? <div className='z-30 absolute top-5 right-10 font font-semibold text-black text-xl'>Welcome {session.user?.name}</div>
                : null
            }
            <button className='bg-white text-cyan-600 border border-cyan-600 font-semibold
                py-2 px-2 m-2 rounded z-30 absolute bottom-0 right-5
                hover:bg-cyan-600 hover:text-white hover:border-transparent'
                onClick={(e)=>{e.stopPropagation(); router.push('/hospital')}}>
                Select Your Vaccine Service Center NOW
            </button>
        </div>
    )
}