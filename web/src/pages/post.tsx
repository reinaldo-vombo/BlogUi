import React, { useState } from 'react'
import Header from '../components/Header';
import { CreatePost } from '../AuthContext'

export const Post: React.FC = () => {
   const [title, setTitle] = useState('');
   const [slug, setSlug] = useState('');
   const [author, setAuthor] = useState('');
   const [image, setImage] = useState('');
   const [categories, setCategories] = useState<string[]>([]);
   const [body, setBody] = useState('');

   const handleCreatePost = async () => {
      const blogData = {
         title,
         slug,
         author,
         image,
         categories,
         body,
      };
      await CreatePost(blogData);
      console.log('Blog posted successfully!');
   };

   return (
      <>
         <Header />
         <div className='flex items-center justify-center py-[100px]'>
            <div className='rounded-md bg-slate-200 w-1/2'>
               <input
                  type='text'
                  placeholder='Title'
                  className='input input-bordered w-full max-w-xs'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
               />
               <input
                  type='text'
                  placeholder='Slug'
                  className='input input-bordered w-full max-w-xs'
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
               />
               <input type="file" className="file-input w-full max-w-xs" />
            </div>
            {/* Rest of the form inputs */}
         </div>
         <button onClick={handleCreatePost}>Create Post</button>
      </>
   );
}
