import React from 'react'
import { graphql } from 'gatsby';

interface Author {
   data: {
      author: {
         name: string;
         bio: string;
         avatar: {
            url: string;
         };
      }

   }
}


export default function AuthorProfile({ data }: Author) {
   const { name, bio, avatar, } = data.author;
   return (
      <div>
         <h1>{name}</h1>
      </div>
   )
}
