
import DashboardSidebar from '@/Dashboard/DashboardSidebar'
import React from 'react'

const Dashboardlayout = ({children}) => {
  return (
    <div className='flex min-h-screen'>
        <DashboardSidebar></DashboardSidebar>
      <div className='flex-1' >
        
        {children}
      </div>
    </div>
  )
}

export default Dashboardlayout