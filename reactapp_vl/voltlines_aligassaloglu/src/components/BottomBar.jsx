import React from 'react'
import { NavLink } from 'react-router-dom'
import MapIcon from '@mui/icons-material/Map';
import TableRowsIcon from '@mui/icons-material/TableRows';
import RouteIcon from '@mui/icons-material/Route';

const BottomBar = () => {
    const sidebarData = [
        {
            title: "Create Order",
            icon: <MapIcon fontSize='inherit'/>,
            navigateTo: '/map-view'
        },
        {
            title: "Create ",
            icon: <TableRowsIcon fontSize='inherit'/>,
            navigateTo: '/table-view'
        },
        {
            title: "sads",
            icon: <RouteIcon fontSize='inherit'/>,
            navigateTo: '/route-details'
        }
    ]


  return (
    <div className='min-h-width md:hidden'>
        <div className=' bg-slate-600 h-full  flex flex-row gap-2 px-5 py-4 rounded-2xl drop-shadow-xl justify-center' style={{backgroundColor: "#BED8D4"}}>
            {sidebarData.map((el)=>(
                <NavLink key={el.title} to={el.navigateTo} className={({isActive})=> isActive ? " flex flex-row text-4xl items-center justify-center gap-2 px-4 py-2 text-white" : " flex flex-row items-center justify-center gap-2 px-4 py-2  rounded-xl text-4xl"}>
                    {el.icon}
                </NavLink>
            ))}
        </div>
    </div>
  )
}

export default BottomBar