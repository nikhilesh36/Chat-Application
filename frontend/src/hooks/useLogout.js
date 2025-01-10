import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const useLogout = () => {
  const [loading,setLoading]=useState(false);
  const {setAuthUser}=useAuthContext()
  const logout=async ()=>{
    setLoading(true);
    try {
        const res=await fetch("/api/auth/logout",{
            method:"POST",
            headers:{"Content-Type":"application/json"}
        })
        const data=await res.json();
        if(data.error){
            throw new Error(data.error || "Failed to log out");
        }
        localStorage.removeItem("chat-user")
        setAuthUser(null);
    } catch (error) {
        toast.error(error.message || "An unexpected error occurred");
    }finally{
        setLoading(false);
    }
  }
  return {loading,logout};
}

export default useLogout