
import React, { useContext, useState } from 'react';
import type { HeadFC } from "gatsby"
import { navigate } from 'gatsby'
import { useLocation } from '@reach/router'
import { client, urlFor } from '../../sanityClient';
import { categories } from '../utils/data';
import Spiner from '../components/Spiner';

interface SanityImageAssetDocument {
   _id: string
   _type: string
   url: string
}

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

const CreatePost: React.FC = () => {
   const location = useLocation()
   const user: User | undefined = location.state as User | undefined



   const [title, settitle] = useState('')
   const [about, setAbout] = useState('')
   const [destination, setDestination] = useState('')
   const [loading, setLoading] = useState(false)
   const [fields, setfields] = useState(false)
   const [category, setCategory] = useState<string | null>(null)
   const [imageAsset, setImageAsset] = useState<SanityImageAssetDocument | null>(null)
   const [wrongImageType, setwrongImageType] = useState(false)

   const savePin = () => {
      if (title && about && destination && imageAsset?._id && category) {
         const doc = {
            _type: 'post',
            title,
            about,
            destination,
            image: {
               _type: 'image',
               asset: {
                  _type: 'reference',
                  _ref: imageAsset?._id
               }
            },
            userId: user?.userId._id,
            postedBy: {
               _type: 'postedBy',
               _ref: user?.userId._id
            },
            category
         }
         client.create(doc)
            .then(() => {
               navigate('/feed')
            })
      } else {
         setfields(true)

         setTimeout(() => setfields(false), 2000)
      }
   }

   const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files && e.target.files[0]

      if (file && file.type) {
         const { type, name } = file

         if (
            type === 'image/png' ||
            type === 'image/svg+xml' ||
            type === 'image/jpeg' ||
            type === 'image/gif' ||
            type === 'image/tiff'
         ) {
            // File type is valid, perform desired operations
            setwrongImageType(false)
            setLoading(true)

            client.assets
               .upload('image', file, { contentType: type, filename: name })
               .then((document) => {
                  setImageAsset(document)

               }).catch((error: Error) => {
                  console.log('Image upload error:', error)
               }).finally(() => {
                  setLoading(false)
               })
         } else {
            setwrongImageType(true)
            setLoading(false)
            // File type is not valid
         }
      } else {
         // No file selected
      }
   }

   return (
      <div className='flex flex-col justify-center items-center mt-5 lg:h-4/6'>
         {fields && (
            <p className='text-red-500 mb-5 text-xl transition-all duration-150 ease-in'>Please fill in all the fields</p>
         )}
         <div className='flex  flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full'>
            <div className="bg-[##c5c4c4] p-3 flex flex-0.7 w-full">
               <div className=" flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
                  {loading && <Spiner message='waite' />}
                  {wrongImageType && <p>Wronge image type</p>}
                  {!imageAsset ? (
                     <label htmlFor="">
                        <div className="flex flex-col items-center justify-center h-full">
                           <div className="flex flex-col justify-center items-center">
                              <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                 <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"></path>
                              </svg>
                              <p>Click to upload</p>
                              <p className="mt-32 text-gray-400">
                                 Recommendation: Use high-quality JPG, JPEG, SVG, PNG, GIF or TIFF less than 20MB
                              </p>
                           </div>
                           <input
                              type="file"
                              name="upload-image"
                              onChange={uploadImage}
                              className="file-input file-input-bordered  w-full max-w-x"
                           />
                        </div>
                     </label>
                  ) : (
                     <div className="relative h-full">
                        <img
                           src={imageAsset?.url}
                           alt="uploaded-pic"
                           className="h-full w-full"
                        />
                        <button
                           type="button"
                           className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                           onClick={() => setImageAsset(null)}
                        >
                           <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path>
                           </svg>
                        </button>
                     </div>
                  )}
               </div>
            </div>

            <div className='flex flex-1 flex-col gap-6 lg:pl-5 w-full'>
               <input
                  type="text"
                  onChange={(e) => settitle(e.target.value)}
                  value={title}
                  placeholder="Adicione o seu texto aqui"
                  className="input input-bordered w-full max-w-xs"
               />
               {user && user.userId && user.userId.image?.asset && (
                  <div className='flex gap-2 my-2 items-center'>
                     <img src={urlFor(user.userId.image).url()} className='w-10 h-10 rounded-full' alt="user photo" />
                     <p className='font-bold'>{user.userId.name}</p>
                  </div>
               )}

               <input
                  type="text"
                  onChange={(e) => setAbout(e.target.value)}
                  value={about}
                  placeholder="descrição do teu blog"
                  className="input outline-none input-bordered w-full max-w-xs"
               />

               <input
                  type="text"
                  onChange={(e) => setDestination(e.target.value)}
                  value={destination}
                  placeholder="Adicione um link destinatorio"
                  className="input outline-none input-bordered w-full max-w-xs"
               />
               <div className='flex flex-col'>
                  <div>
                     <p className='mb-2 font-semibold text-lg sm:text-xl'>Escolha a categoria</p>
                     <select
                        onChange={(e) => setCategory(e.target.value)}
                        className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
                     >
                        <option value="outros" className='bg-white'>Selecione uma categoria</option>

                        {categories.map((item) => (
                           <option value={item.name}>
                              {item.name}
                           </option>
                        ))}
                     </select>
                  </div>
               </div>
            </div>
            <div className="flex justify-end items-end mt-5">
               <button
                  type="button"
                  onClick={savePin}
                  className="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none"
               >
                  Save Pin
               </button>
            </div>
         </div>
      </div>
   );
};

export default CreatePost;

export const Head: HeadFC = () => <title>BlogUi |Criar blog</title>