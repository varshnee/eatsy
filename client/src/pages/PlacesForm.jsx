import React from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Perks from '../Perks';
import AccountNav from '../AccountNav';
import axios from 'axios';

function PlacesForm() {
    const {action} = useParams();
    const {id} = useParams();
    const [title,setTitle] = useState('');
    const [address,setAddress] = useState('');
    const [pincode,setPincode] = useState('');
    const [photos,setPhotos] = useState([]);
    const [description,setDescription] = useState('');
    const [perks,setPerks] = useState([]);
    const [extraInfo,setExtraInfo] = useState('');
    const [cuisine,setCuisine] = useState('');
    const [price,setPrice] = useState(0);
    const [contact,setContact] = useState('');
    const [redirect,setRedirect]= useState(false);
    const [places,setPlaces]=useState([]);

    function uploadPhotos(e){
        const files = e.target.files;
        const data = new FormData();
        for(let i=0;i<files.length;i++){
          data.append('photos',files[i]);
        }
        axios.post('/upload',data,{
          headers:{'Content-Type':'multipart/form-data'}
        }).then(response=>{
          const {data:filenames} = response;
          setPhotos(prev=>{
            return [...prev,...filenames];
          });
        })
      }

      async function addRestaurant(e){
        e.preventDefault();
        await axios.post('/places',{title,address,pincode,photos,description,perks,extraInfo,cuisine,price,contact},{withCredentials:true});
        setRedirect(true);
    }
    
  return (
    <div>
        <AccountNav/>
      <div>
            <form onSubmit={addRestaurant}>
                <h2 className='text-2xl mt-4'>Restaurant Name</h2>
                <input className='w-full border my-1 py-2 px-3 rounded-2xl 140px'
                 type="text"
                 value={title}
                 onChange={e=>setTitle(e.target.value)}
                />
                <h2 className='text-2xl mt-4'>Address</h2>
                <input className='w-full border my-1 py-2 px-3 rounded-2xl 140px'
                 type="text"
                 value={address}
                 onChange={e=>setAddress(e.target.value)}
                 />
                <h2 className='text-2xl mt-4'>Pincode</h2>
                <input className='w-full border my-1 py-2 px-3 rounded-2xl 140px'
                 type="text"
                 value={pincode}
                 onChange={e=>setPincode(e.target.value)}
                 />
                <h2 className='text-2xl mt-4'>Photos</h2>
                <div className='mt-2 grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6'>
                {photos.length > 0 && photos.map((link, index) => (
                  <div key={index} className='h-32 flex'>
                  <img className='rounded-2xl w-full object-cover' src={`http://localhost:8080/uploads/${link}`} alt="img" />
                  <div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                  </div>
                  </div>
                     ))}
                <label className='h-32 cursor-pointer flex justify-center border bg-transparent rounded-2xl p-8 text-2xl text-gray-600'>
                <input type="file" multiple className='hidden' onChange={uploadPhotos}/>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                  </svg>
                </label>
                </div>
                <h2 className='text-2xl mt-4 pt-2'>Description</h2>
                <textarea className='w-full border my-1 py-2 px-3 rounded-2xl h-48'
                value={description}
                onChange={e=>setDescription(e.target.value)}
                ></textarea>
                <h2 className='text-2xl mt-4'>Perks</h2>
                <Perks selected={perks} onChange={setPerks}/>
                <h2 className='text-2xl mt-4 pt-2'>Extra Info</h2>
                <textarea className='w-full border my-1 py-2 px-3 rounded-2xl h-16'
                value={extraInfo}
                onChange={e=>setExtraInfo(e.target.value)}
                ></textarea>
                <h2 className='text-2xl mt-4 pt-2'>Cuisine, Average price for 2, Contact details</h2>
                <div className='grid sm:grid-cols-3 gap-2'>
                  <div className='mt-4 mb-1'>
                     <h3>Cusine</h3>
                     <input type="text"
                     value={cuisine}
                     onChange={e=>setCuisine(e.target.value)}
                     />
                  </div>
                  <div className='mt-4 mb-1'>
                     <h3>Price for 2</h3>
                     <input type="number"
                     value={price}
                     onChange={e=>setPrice(e.target.value)}
                     />
                  </div>
                  <div className='mt-4 mb-1'>
                     <h3>Contact</h3>
                     <input type="text"
                     value={contact}
                     onChange={e=>setContact(e.target.value)}/>
                  </div>
                </div>

                <div>
                  <button className='bg-red-500 rounded-full text-white w-full flex mt-10 gap-4 justify-around mb-8 py-2 px-6'>Save</button>
                </div>
            </form>
            </div>
    </div>
  )
}

export default PlacesForm
