import React from 'react'
import Masonry from 'react-masonry-css';
import Blog from './Blog';
import Post from './post';

interface Props {
   blogs: {
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
         },
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
   }[];
}
const breakpointColumnsObj = {
   default: 4,
   3000: 6,
   2000: 5,
   1200: 3,
   1000: 2,
   500: 1,
};

export default function MasonaryLayout({ blogs }: Props) {

   return (
      <Masonry className="flex animate-slide-fwd" breakpointCols={breakpointColumnsObj}>
         {blogs?.map((blog) => <Post className='w-max' key={blog._id} blog={blog} />)}
      </Masonry>
   )
}
