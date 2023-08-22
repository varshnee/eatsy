import React from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function AccountNav() {
    let subpage = useParams();
    function linkclasses(type = null) {
        let classes = 'inline-flex gap-2 py-2 px-6 rounded-full';
        
        // Check if type matches the subpage
        if(type === subpage.subpage || (subpage.subpage===undefined && type==='profile')) {
          classes += ' bg-red-500 text-white';
        }
        else{
          classes += ' bg-gray-300'
        }
        
        return classes;
      }
  return (
    <div>
      <nav className="w-full flex mt-10 gap-4 justify-around mb-8">
            <Link className={linkclasses('profile')} to={'/account'}>My Profile
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            </Link>
            <Link className={linkclasses('bookings')} to={'/account/bookings'}>My Bookings
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            </Link>
            <Link className={linkclasses('places')} to={'/account/places'}>My Places
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            </Link>
        </nav>
    </div>
  )
}

export default AccountNav;
