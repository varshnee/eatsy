import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Places from "./Places";
import AccountNav from "../AccountNav";
import PlacesForm from "./PlacesForm";

export default function Account(){

    const {ready,user,setUser}= useContext(UserContext)
    const [redirect,setRedirect]=useState(null);

    console.log('user:', user);
    console.log('ready:', ready);

    async function logout() {
        await axios.post('/logout');
        setUser(null);
        setRedirect('/');
      }

    
    if(!ready){
        return 'Loading...';
    }

    if(ready && !user && !redirect){
        return <Navigate to = {'/login'}/>
    }
    if(redirect){
      return <Navigate to={redirect}/>
    }

    let subpage = useParams();
    console.log(subpage);
    return(
      <div>
        <AccountNav/>
        {subpage.subpage === undefined && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email})<br />
          <button onClick={logout} className="bg-red-500 rounded-full text-white w-full flex mt-10 gap-4 justify-around mb-8 py-2 px-6">Logout</button>
        </div>
      )}
      {subpage.subpage==='places' && (
        <Places/>
      )}
      </div>
    );
}