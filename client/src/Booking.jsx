import React, { useContext, useState } from 'react'
import axios from 'axios';
import { UserContext } from './UserContext';
import { Navigate } from 'react-router-dom';

function Booking({place}) {
    const[date,setDate]=useState('');
    const[time,setTime]=useState('');
    const[count,setCount]=useState(0);
    const[name,setName]=useState('');
    const[phone,setPhone]=useState('');
    const [redirect,setRedirect]=useState('')
    const {user}= useContext(UserContext)

    async function bookit() {
        const bookingData = { date, time, count, name, phone, place: place._id };
        const response = await axios.post('/bookings', bookingData,{withCredentials:true});
        const bookingid = response.data._id;
        setRedirect(`/account/bookings/${bookingid}`);
      }
      
    if(redirect){
        return <Navigate to={redirect}/>
    }
  return (
    <div>
      <div>
            <div className="border bg-white shadow p-4 rounded-2xl justify-center">
                Average price for two : {place.price}
            <div>
                <div className="flex text-center">
                   <div className="my-4 border py-3 px-4 rounded-2xl" >
                    <label>
                    Date
                    <input className="px-2" type="date" value={date} onChange={e=>setDate(e.target.value)}/>
                    </label>
                    </div>
                    <div className="my-4 border py-3 px-4 rounded-2xl">
                    <label>
                    Time
                    <input className='px-2'type="time" value={time} onChange={e=>setTime(e.target.value)}/>
                    </label>
                    </div>
                </div>
                    <div className="my-4 border py-3 px-4 rounded-2xl text-center">
                    <label>
                    No of people
                    <input type="number"  className='w-full border my-1 py-2 px-2 rounded-2xl 140px' value={count} onChange={e=>setCount(e.target.value)}/>
                    </label>
                    </div>
                    {count>0 && (
                        <div className='py-3 px-4 border-t my-4 border py-3 px-4 rounded-2xl text-center'>
                           <label>
                            Name
                           <input className="w-full border my-1 py-2 px-2 rounded-2xl 140px" type="text" value={name} onChange={e=>setName(e.target.value)}/>
                           </label>
                           <label>
                            Phone no
                           <input className="w-full border my-1 py-2 px-2 rounded-2xl 140px" type="tel" value={phone} onChange={e=>setPhone(e.target.value)}/>
                           </label>    
                        </div>
                    )}
            </div>
             <button onClick={bookit} className='bg-red-500 p-2 my-3 w-full text-white rounded-2xl'>Book now!</button>
            </div>
            </div>
    </div>
  )
}

export default Booking
