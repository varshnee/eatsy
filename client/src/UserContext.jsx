import {createContext, useEffect, useState} from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({children}) {
  const [user,setUser] = useState(null);
  const [ready,setReady] = useState(false);
  useEffect(() => {
    if (!user) {
      axios.get('/profile',{ withCredentials: true }).then(({data}) => {
        setUser(data);
        console.log('Setting ready to true');
        setReady(true);
      }).catch(e=>{
        console.error('Error fetching profile:', error);
      })
    }
  }, [user]);
  return (
    <UserContext.Provider value={{user,setUser,ready}}>
      {children}
    </UserContext.Provider>
  );
}