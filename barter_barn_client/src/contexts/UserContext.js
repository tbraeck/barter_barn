import React, {useState, useEffect, createContext} from "react";

const UserContext = createContext();

function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(()=> {
        fetch("/me").then((res)=> {
          if(res.ok){
            res.json().then((user) => {
              setUser(user)})
          }
        })
      }, [])

  // the value prop of the provider will be our context data
  // this value will be available to child components of this provider
  return <UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>;
}

export { UserContext, UserProvider };