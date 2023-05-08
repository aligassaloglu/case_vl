import React from 'react'
import { useStateContext } from '../contexts/ContextProvider'

const RouteDetails = function() {
  const {distance, duration, enrichedPassengers} = useStateContext()
  const calculateAveragePassengerDuration = () =>{
    let durationAvg = 0
    if(enrichedPassengers.length < 1){
      return "0"
    }
    enrichedPassengers.forEach(element => {
      durationAvg +=  element.tripDuration
    })
    return (durationAvg/enrichedPassengers.length).toFixed(2)
  }
  return (
    <div className='min-h-full w-100 flex flex-col gap-5 justify-center items-center '>
      <div className='flex gap-3'>
        <h1>Total Distance:</h1>
        {distance ?? "none"}
      </div>
      <div className='flex gap-3'>
        <h1>Total Duration:</h1>
        {duration ?? "0"} hours
      </div>
      <div className='flex gap-3'>
        <h1>Average Passenger Duration:</h1>
        {calculateAveragePassengerDuration()} minutes
      </div>
    </div>
  )

}

export default RouteDetails