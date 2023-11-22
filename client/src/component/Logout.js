import React from 'react'
import { useNavigate } from 'react-router-dom'


export default function Logout(){
    const navigate = useNavigate()

    const handelOnLogout = ()=>{
        localStorage.removeItem("token")
        navigate("/login")
    }
  return (
    <>
      <button className="btn btn-primary" onClick={handelOnLogout}>Logout</button>
    </>
  )
}
