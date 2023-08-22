import React, { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useState } from 'react';
import Perks from '../Perks';
import axios from 'axios';
import PlacesForm from './PlacesForm';
import AccountNav from '../AccountNav';

function Places() {
    const {action} = useParams();
    const [redirect,setRedirect]= useState(false);
    const [places,setPlaces]=useState([]);

    console.log(action);

    if(redirect){
      return <Navigate to = {'/account/places'}/>
    }

    useEffect(()=>{
     axios.get('/places',{withCredentials:true}).then(({data})=>{
      setPlaces(data);
     })
    },[])

  return (
    <div>
        {
            action!=='new' && (
              <div>
                <AccountNav/>
              <Link className='items-center inline-flex gap-1 bg-red-500 text-white py-2 px-6 rounded-full text-center justify-center' to={'/account/places/new'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add new eatery!
              </Link>
              <div className='mt-4'>
                {places.length > 0 && places.map(place => (
                  <Link to={'/account/places/' + place._id} className='flex gap-4 bg-gray-200 p-4 rounded-2xl cursor-pointer' key={place.id}>
                    <div className='flex w-32 h-32 bg-gray-300 grow shrink-0'>
                      {place.photos.length > 0 && (
                        <img className='object-cover' src={'http://localhost:8080/uploads/'+ place.photos[0]} alt="" />
                      )}
                    </div>
                    <div className='grow-0 shrink'>
                      <h2 className='text-xl'>{place.title}</h2>
                      <p className='text-sm mt-2'>{place.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            
            )
        }
        {action==='new' && (
            <PlacesForm/>
        )}
    </div>
  )
}

export default Places
