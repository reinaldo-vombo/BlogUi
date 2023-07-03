import React from 'react'
import { useParams } from 'react-router-dom'
interface Props {
   userId: {
      name: string
      image: {
         asset: {
            url: string
         }
      }
      email: string;
   }

}

export default function UserProfile({ userId }: Props) {
   const user = useParams()
   console.log(user);

   return (
      <div>
         <h1>hello profile page</h1>
      </div>
   )
}
