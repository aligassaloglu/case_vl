import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../components/SideBar';
import BottomBar from '../components/BottomBar';

const Root = function() {
  return (
    <div className='flex relative'>
          <SideBar/>
        <div className='px-5 py-9 w-full min-h-screen max-md:py-0 max-md:px-0'>
          <Outlet/>
        </div>
        <div className='absolute bottom-0 right-0 left-0 px-6 pb-3'>
          <BottomBar/>
        </div>
    </div>
  )
}

export default Root;