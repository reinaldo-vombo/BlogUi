import React, { createContext, useEffect, useState } from 'react';
import { client } from '../../sanityClient';
import { navigate } from 'gatsby';

interface User {
   _id: string;
   name: string;
   email: string;
   password: string;
}


interface BlogPost {
   title: string;
   description?: string;
   slug: string;
   image: string;
   categories: string[];
   author: User;
}

interface SanityContextProviderProps {
   children: React.ReactNode;
}

interface AuthContextProps {
   user: User | null;
   isLoggedIn: boolean;
   createBlogPost: (blogPost: BlogPost, image: File | null) => void;
   signUp: (name: string, email: string, password: string) => void;
   signIn: (email: string, password: string) => void;
}

const AuthContext = createContext<AuthContextProps>({
   user: null,
   isLoggedIn: false,
   signUp: () => { },
   signIn: () => { },
   createBlogPost: () => { },
});

const SanityContextProvider: React.FC<SanityContextProviderProps> = ({ children }) => {
   const [user, setUser] = useState<User | null>(null);
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [userId, setUserId] = useState<string | null>(null);

   useEffect(() => {
      const storedUser = localStorage.getItem('user');

      if (storedUser) {
         setUser(JSON.parse(storedUser));
         setIsLoggedIn(true);
      }
   }, []);


   // const signUp = async (name: string, email: string, password: string) => {
   //    try {
   //       // Save user data to Sanity author dataset
   //       await client.create({
   //          _type: 'author',
   //          name,
   //          email,
   //          password,
   //       });

   //       // Update the user state
   //       setUser({
   //          name,
   //          email,
   //          password,
   //       });

   //       navigate('/')
   //    } catch (error) {
   //       console.error('Sign-up failed:', error);
   //    }
   // };

   const signUp = async (name: string, email: string, password: string) => {
      try {
         // Save user data to Sanity author dataset
         const userData = await client.create({
            _type: 'user',
            name,
            email,
            password,
         });

         // Update the user state
         setUser(userData);
         setUserId(userData._id);
         // Store user data in local storage
         setIsLoggedIn(true);
         localStorage.setItem('user', JSON.stringify({
            name,
            email,
            password,
         }));
         navigate('/');
      } catch (error) {
         console.error('Sign-up failed:', error);
      }
   };

   const signIn = async (email: string, password: string) => {
      try {
         // Fetch user data from Sanity author dataset
         const result = await client.fetch(`*[_type == 'user' && email == $email && password == $password][0]`, {
            email,
            password,
         });

         if (result) {
            // Update the user state
            const userId = result._id;

            setUser(result);
            setIsLoggedIn(true);
            localStorage.setItem('user', JSON.stringify(result));
            navigate('/')
         } else {
            console.error('Invalid credentials');
         }
      } catch (error) {
         console.error('Sign-in failed:', error);
      }
   };

   const createBlogPost = async (blogPost: BlogPost, image: File | null) => {
      try {
         // Upload the image to Sanity
         const imageBlob = new Blob([blogPost.image], { type: image?.type });
         const imageAsset = await client.assets.upload('file', imageBlob);

         // Save blog post data to Sanity post dataset
         await client.create({
            _type: 'post',
            title: blogPost.title,
            description: blogPost.description,
            slug: blogPost.slug,
            image: {
               _type: 'image',
               asset: {
                  _type: 'reference',
                  _ref: imageAsset._id,
               },
            },
            categories: blogPost.categories.map((categories) => ({ title: categories })),
            author: {
               _type: 'reference',
               _ref: `author-${user?.email}` // Assuming user email is unique and can be used as a reference
            },
         });

         console.log('Blog post created successfully!');
      } catch (error) {
         console.error('Failed to create blog post:', error);
      }
   };

   return <AuthContext.Provider value={{ user, isLoggedIn, signUp, signIn, createBlogPost }}>{children}</AuthContext.Provider>;
};

export { AuthContext, SanityContextProvider };
