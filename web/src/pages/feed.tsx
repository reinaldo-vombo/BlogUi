import React, { useState, useEffect } from 'react'
import { feedQuery, searchQuery } from '../utils/data'
import type { HeadFC } from "gatsby"
import { client } from '../../sanityClient'
import { useParams } from 'react-router-dom'
import Spiner from '../components/Spiner'
import MasonaryLayout from '../components/MasonaryLayout'
import Header from '../components/Header'

interface Props {
   props: {
      params: {
         slug: string
      }
   }
}

export default function Feed({ props }: Props) {
   const { categoryId } = useParams()
   const [loading, setLoading] = useState(false)
   const [blogs, setblogs] = useState(null)
   useEffect(() => {
      setLoading(true)
      if (categoryId) {
         const query = searchQuery(categoryId)
         client.fetch(query)
            .then(data => {
               setblogs(data)
               setLoading(false)
               console.log(data);

            })
      } else {
         client.fetch(feedQuery)
            .then(data => {
               setblogs(data)
               setLoading(false)
            })
      }
   }, [categoryId])

   if (loading) return <Spiner message='we are adding new blogs to feed' />
   return (
      <>
         <Header showHome={false} showFeed={true} />
         <div className='mt-[5rem]'>
            {blogs && (
               <MasonaryLayout blogs={blogs} />
            )}
         </div>
      </>
   )
}
export const Head: HeadFC = () => <title>BlogUi | feed</title>