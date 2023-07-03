import { Link } from 'gatsby';
import React from 'react'
interface BlogPost {
   _id: number;
   title: string;
   slug: string;
   description: string;
   image: string;
   images: string[];
   category: string;
   author: {
      name: string;
      photo: string;
   };
   _createdAt: Date;
}

export default function Blog({ title, image, slug, category, author }: BlogPost) {
   return (
      <div>
         <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <Link to={`/blog/${slug}`}>
               <img className="rounded-t-lg" src={image} alt="" />
            </Link>
            <div className="p-5">
               <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
               </a>
               <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
               <span className='bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300'>{category}</span>

               <div className="flex items-center space-x-4 mt-5">
                  <img className="w-10 h-10 object-cover rounded-full" src={author.photo} alt="" />
                  <div className="font-medium dark:text-white">
                     <div>{author.name}</div>
                     <div className="text-sm text-gray-500 dark:text-gray-400">Joined in August 2014</div>
                  </div>
               </div>

            </div>
         </div>

      </div>
   )
}
