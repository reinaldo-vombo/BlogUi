import React from 'react'
import Masonry from 'react-masonry-css';
import Post from './post';

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
interface Props {
   blog: Blog[];
}

const breakpointColumnsObj = {
   default: 4,
   3000: 6,
   2000: 5,
   1200: 3,
   1000: 2,
   500: 1,
};

export default function MasonaryLayout({ blog }: Props) {

   return (
      <Masonry className="flex animate-slide-fwd" breakpointCols={breakpointColumnsObj}>
         {blog?.map((blog) => <Post className='w-max' key={blog._id} blog={blog} />)}
      </Masonry>
   )
}
