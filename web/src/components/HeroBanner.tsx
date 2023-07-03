import React from 'react'
import { day, afternoon, landscape_2, night } from '../images'
import Header from './Header';

export default function HeroBanner() {
   function getImageBasedOnDaytime() {
      const currentTime = new Date();
      const currentHour = currentTime.getHours();

      // Define the image URLs based on daytime
      const morningImage = day;
      const afternoonImage = afternoon;
      const eveningImage = landscape_2;
      const nightImage = night;

      // Define the hour ranges for each daytime
      const morningRange = [6, 11]; // 6am - 11am
      const afternoonRange = [12, 17]; // 12pm - 5pm
      const eveningRange = [18, 21]; // 6pm - 9pm

      let image;

      // Determine the current daytime based on the hour
      if (currentHour >= morningRange[0] && currentHour <= morningRange[1]) {
         image = morningImage;
      } else if (currentHour >= afternoonRange[0] && currentHour <= afternoonRange[1]) {
         image = afternoonImage;
      } else if (currentHour >= eveningRange[0] && currentHour <= eveningRange[1]) {
         image = eveningImage;
      } else {
         image = nightImage;
      }

      return image;
   }

   const imageUrl = getImageBasedOnDaytime();

   return (
      <>
         <Header showHome={true} />
         <div className='h-screen flex items-center justify-center relative'>
            <img src={imageUrl} className='absolute w-full h-full object-cover top-0 bottom-0 right-0 left-0' alt="" />
            <div className='relative z-10'>
               <h1 className='text-[45px] font-bold w-[39rem] text-center text-white'>transforms your ideas into in to content end share it</h1>
               <form className="flex items-center">
                  <label htmlFor="simple-search" className="sr-only">Search</label>
                  <div className="relative w-full">
                     <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                     </div>
                     <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
                  </div>
                  <button type="submit" className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                     <span className="sr-only">Search</span>
                  </button>
               </form>
            </div>
         </div>
      </>
   )
}
