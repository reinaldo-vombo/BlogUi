import React, { useState, useContext } from 'react'
import { client } from '../../../sanityClient'
import { navigate } from 'gatsby';
import { AuthContext } from '../../context/sanityContext'

export default function Login() {

   const { signUp, signIn } = useContext(AuthContext)
   const [animate, setAnimate] = useState(false);
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [error, setError] = useState('');

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      signUp(name, email, password);
   };

   const handleSignin = (e: React.FormEvent) => {
      e.preventDefault();
      try {
         signIn(email, password);

      } catch (error) {
         setError('Invalid email or password');
      }
   };


   return (
      <>
         <div className={animate ? 'containerr sign-up-mode' : 'containerr'}>
            <div className='forms-container'>
               <div className='signin-signup'>
                  <form onSubmit={handleSignin} className='sign-in-form'>
                     <h2 className='title'>Sign in</h2>
                     <div className='input-field'>
                        <i className='fas fa-user'></i>
                        <input
                           onChange={(e) => setEmail(e.target.value)}
                           type='text'
                           value={email}
                           placeholder='Email'
                           required
                        />
                     </div>
                     <div className='input-field'>
                        <i className='fas fa-lock'></i>
                        <input
                           type='password'
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           placeholder='Password'
                        />
                     </div>
                     {error && <p className='text-red-600 text-center'>{error}</p>}
                     <button
                        type='submit'
                        className='btn solid'
                     >
                        Login
                     </button>
                     <p className='social-text'>Or Sign in with social platforms</p>
                     <div className='social-media'>
                        <a href='#' className='social-icon'>
                           <i className='fab fa-facebook-f'></i>
                        </a>
                        <a href='#' className='social-icon'>
                           <i className='fab fa-twitter'></i>
                        </a>
                        <a href='#' className='social-icon'>
                           <i className='fab fa-google'></i>
                        </a>
                        <a href='#' className='social-icon'>
                           <i className='fab fa-linkedin-in'></i>
                        </a>
                     </div>
                  </form>
                  {/* {error && <p className='text-red-600 text-center text-xl'>{error}</p>} */}
                  <form onSubmit={handleSubmit} className='sign-up-form'>
                     <h2 className='title'>Sign up</h2>
                     <div className='input-field'>
                        <i className='fas fa-user'></i>
                        <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='name' required />
                     </div>
                     <div className='input-field'>
                        <i className='fas fa-envelope'></i>
                        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' required />
                     </div>
                     <div className='input-field'>
                        <i className='fas fa-lock'></i>
                        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
                     </div>
                     {/* <div className='input-field'>
                        <i className='fas fa-lock'></i>
                        <input type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirma palavra-passe' required />
                     </div> */}
                     <button type='submit' className='btn'>
                        Sign up
                     </button>
                  </form>
               </div>
            </div>

            <div className='panels-container'>
               <div className='panel left-panel'>
                  <div className='content'>
                     <h3>New here ?</h3>
                     <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
                        ex ratione. Aliquid!
                     </p>
                     <button
                        className='btn transparent'
                        id='sign-up-btn'
                        onClick={() => setAnimate(true)}
                     >
                        Sign up
                     </button>
                  </div>
                  <img src='' className='image' alt='' />
               </div>
               <div className='panel right-panel'>
                  <div className='content'>
                     <h3>One of us ?</h3>
                     <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                        laboriosam ad deleniti.
                     </p>
                     <button
                        className='btn transparent'
                        id='sign-in-btn'
                        onClick={() => setAnimate(false)}
                     >
                        Sign in
                     </button>
                  </div>
                  <img src='' className='image' alt='' />
               </div>
            </div>
         </div>
      </>
   )
}
