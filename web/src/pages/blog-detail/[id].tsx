import React, { useState, useEffect } from 'react'
import { Link, type HeadFC } from "gatsby"
import { postDetailQuery, postDetailMorepostQuery } from '../../utils/data'
import Spiner from '../../components/Spiner'
import { client, urlFor } from '../../../sanityClient'
interface User {
   userId: {
      _id: string
      name: string
      image: {
         asset: {
            _ref: string
         }
      }

   }
}
interface Blog {
   // Define the structure of a blog object here
   // For example:
   title: string;
   content: string;
   // ...
}
interface Blog {
   image: {
      asset: {
         url: string;
      };
   };
   _id: string;
   title: string;
   description: string;
   category: string;
   destination: string;
   postedBy: {
      _id: string;
      name: string;
      image: {
         asset: {
            url: string;
         };
      };
   };
   save: {
      postedBy: {
         _id: string;
         name: string;
         image: {
            asset: {
               url: string;
            };
         };
      };
   }[];
   comments: {
      comment: string;
      _key: string;
      postedBy: {
         _id: string;
         name: string;
         image: {
            asset: {
               url: string;
            };
         };
      };
   }[];
}
export default function BlogDetails({ location }) {

   const user = location.state?.user;
   const { state = {} } = location
   const { blogId } = state

   const [blogs, setBlogs] = useState<Blog[] | null>(null);
   const [blogDetais, setBlogDetais] = useState<Blog | null>(null)
   const [comment, setComment] = useState('')
   const [addingComment, setAddingComment] = useState(false)

   const fetchBlogDatils = () => {
      let query = postDetailQuery(blogId)

      if (query) {
         client.fetch(query)
            .then((data: Blog[]) => {
               setBlogDetais(data[0])


               if (data[0]) {
                  query = postDetailMorepostQuery(data[0])

                  client.fetch(query)
                     .then((res: Blog[]) => setBlogs(res))
                     .catch((error: Error) => {
                        // Handle the error case if the API call fails
                        console.log('Error fetching related posts:', error);
                     })
               }
            })
            .catch((error: Error) => {
               // Handle the error case if the API call fails
               console.log('Error fetching blog details:', error);
            });
      }

   }

   useEffect(() => {
      fetchBlogDatils()
   }, [blogId])

   if (!blogDetais) return <Spiner message='Carrengando blog' />

   return (
      <div className="flex xl:flex-row flex-col m-auto bg-white">
         <div className='flex justify-center items-center md:items-start flex-initial'>
            <img
               className="rounded-t-3xl rounded-b-lg"
               src={(blogDetais?.image && urlFor(blogDetais?.image).url())}
               alt="user-post"
            />
         </div>
         <div className='w-full p-5 flex-1 xl:min-w-620'>
            <div className="flex items-center justify-between">
               <div className="flex gap-2 items-center">
                  <a
                     href={`${blogDetais.image.asset.url}?dl=`}
                     download
                     className='bg-secondaryColor p-2 text-xl rounded-full flex items-center justify-center text-dark opacity-75 hover:opacity-100'
                  >
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9.75v6.75m0 0l-3-3m3 3l3-3m-8.25 6a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                     </svg>

                  </a>
               </div>
               <a href={blogDetais.destination} target='_blank' >
                  {blogDetais.destination}
               </a>
            </div>
         </div>
         <div>
            <h1 className='text-4xl font-bold break-words mt-3'>
               {blogDetais.title}
            </h1>
            <p className="mt-3">
               {blogDetais.description}
            </p>
         </div>
         <Link to={`/user-profile/${blogDetais.postedBy._id}`}>
            <img src={blogDetais.postedBy.image.asset.url} className="w-10 h-10 rounded-full" alt="user-profile" />
         </Link>
      </div>
   )
}
export const Head: HeadFC = () => <title>BlogUi | post</title>