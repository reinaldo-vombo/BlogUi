import React from 'react'
import BlogCard from './BlogCard'
import { blogs } from '../api/data'

export default function ViewBlgos() {
   const data = blogs
   return (
      <div className='flex min-h-screen items-center justify-center'>
         <div className='max-w-6xl mx-auto px-6'>
            <div className='flex [&:hover>div]:w-16 [&>div:hover]:w-[30rem]'>
               {data.map((post, index) => index < 6 && (
                  <BlogCard
                     key={index}
                     className={index === 0 ? 'w-[30rem]' : ''}
                     image={post.image}
                  />
               ))}
            </div>
         </div>
      </div>
   )
}
