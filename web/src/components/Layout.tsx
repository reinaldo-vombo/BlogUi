import React from 'react'
import '../styles/global.css'
import Header from './Header'
import Footer from './Footer'

interface Props {
   children: React.ReactNode
}

export default function Layout({ children }: Props) {
   return (
      <>

         <main>
            {children}
         </main>
         <Footer />
      </>
   )
}
