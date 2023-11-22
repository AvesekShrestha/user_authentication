import React, { useState, useEffect } from 'react'
import axios from 'axios';
import config from '../config';

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${config.BASE_URL}/`,{headers : {'Authorization': `Bearer ${token}`}});
        if (response) setData(response.data);
      }catch(error){
        console.log(error);
      }
    }
    fetchData();

  }, [])

  return (
    <>
      {
        data.map((element, index) => {
          return (
            <div className="card" key={index}>
              <div className="card-body">
                <h5 className="card-title">{element.email} </h5>
                <p className="card-text">{element.password} </p>
                <a href="/" className="btn btn-primary">Go somewhere</a>
              </div>
            </div>
          )
        })
      }
    </>
  )
}
