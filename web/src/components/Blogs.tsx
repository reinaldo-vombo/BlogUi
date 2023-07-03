import React, { useEffect, useState } from 'react'
import Blog from './Blog'
import { blogs } from '../api/data'

export default function Blogs() {
   const data = blogs


   return (
      <div className=''>
         <h1>Treands</h1>
         <div className='flex items-center justify-center flex-wrap gap-3'>
            {data.map((post, index) => index < 6 && (
               <Blog
                  key={post._id}
                  title={post.title}
                  image={post.image}
                  category={post.category}
                  author={post.author}
                  slug={post.slug}
               />
            ))}
         </div>
      </div>
   )
}
