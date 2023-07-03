import { HeadFC } from 'gatsby'
import React from 'react'
import { landscape_12 } from '../images'

export default function About() {
   return (
      <>
         <div className="hero min-h-screen" style={{ background: `url(${landscape_12})` }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
               <div className="max-w-md">
                  <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                  <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                  <button className="btn btn-primary">Get Started</button>
               </div>
            </div>
         </div>
      </>
   )
}
export const Head: HeadFC = () => <title>About</title>
