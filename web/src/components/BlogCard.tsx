import React from 'react'
interface Props {
   image: string
   className?: string
}

export default function BlogCard({ image, className }: Props) {
   return (
      <div className={`group relative shadow-lg shadow-black/30 ${className ? className : 'w-16'} h-96 hover:w-[30rem] transition-all duration-200 cursor-pointer overflow-hidden `}>
         <img src={image} className='rounded-md w-full h-full object-cover group-hover:scale-125 transition-all' alt="" />
         <div className="invisible absolute inset-0 bg-gradient-to-b from-green-500/20 to-black group-hover:visible">
            <div className="absolute inset-x-5 bottom-6">
               <div className="flex gap-3 text-white">
                  <div>
                     <p className='font-semibold text-lg text-gray-100'>
                        Beyond builder
                     </p>
                     <p className='text-gray-300'>
                        Better Design
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
