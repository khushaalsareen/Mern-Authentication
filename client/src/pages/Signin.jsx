import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function SignIn() {
  const [formData, setFormData] = useState({});
  const [loading,setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  
  const handleChange = (e)=>{
    setFormData({...formData, [e.target.id]:e.target.value});
  }
  
  const handleSubmit = async(e)=>{
    e.preventDefault();
    
    setLoading(true);
    setError(false);
    setErrorMsg("");

    const res = await fetch('/api/auth/signin',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    setLoading(false);
    console.log(data)
    
    if(data.success===false){
      setError(true);
      setErrorMsg(data.message);
    }

    navigate('/');
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="text" placeholder='Email' id='email' className='bg-slate-100 rounded-lg p-3' onChange={handleChange}/>
        <input type="password" placeholder='Password' id='password' className='bg-slate-100 rounded-lg p-3' onChange={handleChange}/>
        <button className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80 p-3 disabled:{loading}'>{loading ? "Loading" : "Sign In"}</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont Have an account?</p>
        <Link to='/sign-up'>
        <span className='text-blue-500'>Sign Up</span>
        </Link>
      </div>
      <p className='text-red-700 mt-5'>{error && errorMsg}</p>
    </div>
  )
}

export default SignIn