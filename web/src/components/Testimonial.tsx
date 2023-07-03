import React from 'react'
import { blogs, feedback } from '../api/data'

export default function Testimonial() {
   const data = blogs
   return (
      <div className='py-[100px] px-10 flex justify-center'>
         <div className='w-[50%]'>
            <h1 className='text-[61px] font-bold'>See what other user are saying</h1>
         </div>
         <div className="mockup-window w-1/2 border bg-base-300">
            <div className="px-4 py-16 bg-base-200">
               {feedback.map((user, index) => (
                  <div className={`chat ${index % 2 === 0 ? 'chat-start' : 'chat-end'}`} key={index}>
                     <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                           <img src={user.photo} />
                        </div>
                     </div>
                     <div className="chat-header">
                        {user.name}
                        <time className="text-xs opacity-50">12:45</time>
                     </div>
                     <div className="chat-bubble">{user.message}</div>
                     <div className="chat-footer opacity-50">
                        Delivered
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
}
