import React, { useState } from 'react'
import { navigate, Link } from 'gatsby'
import { client, urlFor } from '../../sanityClient';
import { fetchUser } from '../utils/fetchUser';
import { v4 as uuid } from 'uuid'

interface Props {
   blog: {
      image: {
         asset: {
            url: string;
         }
      };
      _id: string;
      destination: string;
      postedBy: {
         _id: string;
         name: string;
         image: {
            asset: {
               url: string
            }
         }
      };
      save: {
         _key: string;
         postedBy: {
            _id: string;
            name: string;
            image: {
               asset: {
                  url: string
               }
            }
         };
      }[];
   };
   className: string
}

export default function post({ blog, className }: Props) {

   const { postedBy, image, _id, destination, save } = blog;


   const [postHover, setPostHover] = useState(false)
   const user = fetchUser()

   const alreadySaved = !!(blog?.save?.filter((item) => item.postedBy?._id === user?.userId))?.length

   const deleteBlog = (id: string) => {
      client
         .delete(id)
         .then(() => {
            window.location.reload();
         });
   };

   const saveBlog = (id: string) => {
      if (!alreadySaved) {

         client.patch(id)
            .setIfMissing({ save: [] })
            .insert('after', 'save[-1]', [{
               _key: uuid(),
               userId: user.userId,
               postedBy: {
                  _type: 'postedBy',
                  _ref: user.userId
               }
            }])
            .commit()
            .then(() => {
               window.location.reload()
            })

      }
   }

   return (
      <div className='m-2'>
         <div
            onMouseEnter={() => setPostHover(true)}
            onMouseLeave={() => setPostHover(false)}
            onClick={() => navigate(`/blog-detail/${_id}`)}
            className='relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out'
         >
            <img className="rounded-lg w-full " src={(urlFor(image).width(250).url())} alt="user-post" />
            {postHover && (
               <div
                  className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
                  style={{ height: '100%' }}
               >
                  <div className='flex items-center justify-between'>
                     <div className='flex gap-2'>
                        <a
                           href={`${image?.asset?.url}?dl=`}
                           download
                           onClick={(e) => e.stopPropagation()}
                           className="bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                        >
                           <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M9 13.5l3 3m0 0l3-3m-3 3v-6m1.06-4.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"></path>
                           </svg>
                        </a>
                     </div>
                     {alreadySaved ? (
                        <button
                           className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'
                           type='button'
                        >
                           {save?.length} Saved
                        </button>
                     ) : (
                        <button
                           className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'
                           type='button'
                           onClick={(e) => {
                              e.stopPropagation()
                              saveBlog(_id)
                           }}
                        >
                           save
                        </button>
                     )}
                  </div>
                  <div className='flex justify-between items-center gap-2 w-full'>
                     {destination && (
                        <a
                           href={destination}
                           target='_blank'
                           rel='noreferrer'
                           className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
                        >
                           <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75"></path>
                           </svg>
                           {destination.slice(8, 17)}
                        </a>
                     )}
                     {postedBy?._id === user.userId && (
                        <button
                           type='button'
                           onClick={(e) => {
                              e.stopPropagation()
                              deleteBlog(_id)
                           }}
                           className='bg-white p-2 opacity-70 hover:opacity-100 font-bold text-dark text-base rounded-3xl hover:shadow-md outline-none'
                        >
                           <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path>
                           </svg>
                        </button>
                     )}
                  </div>
               </div>
            )}
         </div>
         <Link to={`/user-profile/${user?._id}`} className="flex gap-2 mt-2 items-center">
            <img
               className="w-8 h-8 rounded-full object-cover"
               src={postedBy.image.asset.url}
               alt="user-profile"
            />
            <p className="font-semibold capitalize">{postedBy?.name}</p>
         </Link>
      </div>
   )
}
