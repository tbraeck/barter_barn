import { useState, useEffect, createContext } from 'react';

const ForumContext = createContext();

function ForumProvider({ children }) {
  const [allForum, setAllForum] = useState([]);

  useEffect(()=> {
    fetch("/forums").then((res)=> {
      if(res.ok){
        res.json().then((data) => {
          setAllForum(data)})
      }
    })
  }, [])
  return (
    <ForumContext.Provider value={{ allForum, setAllForum }}>
      {children}
    </ForumContext.Provider>
  );
}

export { ForumContext, ForumProvider };