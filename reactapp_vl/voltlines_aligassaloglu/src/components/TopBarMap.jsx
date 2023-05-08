import { Button, TextField } from '@mui/material'
import React, { useRef, useState } from 'react'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useStateContext } from '../contexts/ContextProvider';


const TopBarMap = function() {

    const {duration, distance, setMarkerMode, packageNameRef, packageOrderRef} = useStateContext()

    const pickupLocation = {
        lat: 0.00,
        lng: 0.00,
    };

    const passengerInfo = {
    name: 'Dummy',
    pickUpPoint: pickupLocation, // location object
    };
    const enrichedPassengerInfo = {
    ...passengerInfo, // existing passengerInfo
    pickUpPointOrder: 0,
    tripDuration: 0,
    };
    const passengers = [
        passengerInfo,
    ];

    const [viewDetails, setViewDetails] = useState(false)
    const [open, setOpen] = useState(true)
  return (
    <div className='flex items-center justify-center p-3 flex-col gap-1'>
        <div className={`bg-white rounded-2xl flex p-5 gap-4 ${open ? "" : "hidden"}`}>
            <div className='flex flex-col justify-center gap-4 '>
                <Button sx={{alignSelf:"center"}} onClick={()=>setViewDetails(true)} variant='outlined' >View Details</Button>
                <Button sx={{alignSelf:"center"}} onClick={()=>{setViewDetails(false)}} variant='outlined' >Add Passenger</Button>
            </div>
            {!viewDetails && (
                <div className='flex flex-col gap-2'>
                    <TextField inputRef={packageNameRef} style={{alignSelf: 'center' }} variant='standard' label='Passenger Name' className='max-md:w-28' />
                    <TextField InputProps={{ inputProps: { min: 0 } }} type='number' inputRef={packageOrderRef} style={{alignSelf: 'center' }} variant='standard' label='Pickup Order' />
                </div>
            )}
            {viewDetails && (
                <div className='flex flex-col gap-2 max-md:w-28'>
                    <span className='p-2 text-sm text-center'>
                        <p>Duration</p>
                        <p>{duration ?? "none"} hours</p>
                    </span>
                    <span className='p-2 text-sm text-center'>
                        <p>Total Route Distance</p>
                        <p>{distance ?? "none"}</p>
                    </span>
                </div>
            )}
        </div>
            <div className={`w-8 rounded-full  flex  p-2 hover:text-slate-400 ${open ? "":"-translate-y-24"}`}>
                <button type='button' className={`${open ? "" : "rotate-180"}`} onClick={()=>setOpen(!open)}>
                    <KeyboardArrowUpIcon fontSize='large'/>
                </button>
            </div>
    </div>
  )
}

export default TopBarMap