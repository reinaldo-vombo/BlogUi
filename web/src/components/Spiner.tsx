import React from 'react'
import { Circles } from 'react-loader-spinner'
interface Prop {
   message: string
}

export default function Spiner({ message }: Prop) {
   return (
      <div className='flex flex-col justify-center items-center w-full h-full'>
         <Circles
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
         />
         <p className='text-center text-lg px-2'>{message}</p>
      </div>
   )
}
