import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import getPolls from '../redux/reducers/pollSlice'
const Poll = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
  
  })
  return (
    
    <div className='min-h-screen flex justify-center items-center'>
      <h1 className="text-4xl font-semibold">Poll List</h1>
      
    </div>
  )
}

export default Poll
