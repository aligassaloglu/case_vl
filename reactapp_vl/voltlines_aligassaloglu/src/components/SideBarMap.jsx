/* eslint-disable eqeqeq */
import React from 'react'
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import NearMeIcon from '@mui/icons-material/NearMe';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { useStateContext } from '../contexts/ContextProvider';

const SideBarMap = function() {
    const {setMarkerMode, markerMode} = useStateContext();
    return (
    <div className='rounded-full bg-white p-3 flex flex-col gap-2'>
        <button type='button' className={` ${markerMode == 'initial' ? 'text-blue-600': 'hover:text-slate-500'}`} onClick={()=>setMarkerMode('initial')}>
            {/* <AirportShuttleIcon/> */}
            <p className='font-extrabold'>
                A
            </p>
        </button>
        <button type='button' className={`${markerMode == 'destination' ? 'text-blue-600': 'hover:text-slate-500'}`} onClick={()=>setMarkerMode('destination')}>
            {/* <NearMeIcon/> */}
            <p className='font-extrabold'>
                B
            </p>
        </button>
        <button type='button' className={` ${markerMode == 'passenger' ? 'text-blue-600': 'hover:text-slate-500'}`} onClick={()=>setMarkerMode('passenger')}>
            <AddLocationAltIcon/>
        </button>
    </div>
  )
}

export default SideBarMap