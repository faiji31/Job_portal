'use client'
import { useSession } from '@/lib/auth-client'
import React from 'react'
import { Spinner } from '@heroui/react';
import {
 BookOpen,
  Persons,
 Thunderbolt,
  CircleCheck,
} from "@gravity-ui/icons";
import DashboardStats from '@/Dashboard/DashboardStats';


const recruiterStats = [
  {
    id: "jobs",
    label: "Total Job Posts",
    value: 48,
    icon: <BookOpen className="h-3.5 w-3.5" />,
  },
  {
    id: "applicants",
    label: "Total Applicants",
    value: 1284,
    icon: <Persons className="h-3.5 w-3.5" />,
  },
  {
    id: "active",
    label: "Active Jobs",
    value: 18,
    icon: <Thunderbolt className="h-3.5 w-3.5" />,
  },
  {
    id: "closed",
    label: "Jobs Closed",
    value: 32,
    icon: <CircleCheck className="h-3.5 w-3.5" />,
  },
];



const RecuriterDashboardHomePage = () => {
  const {data:session,isPending} = useSession()

 const user = session?.user

  if(isPending){
    return (
    <div className="flex items-center gap-4">
      <Spinner />
    </div>
  );

 
  }
  return (
    <div className='text-2xl font-medium'>
     Welcome Back, {user?.name}
     <div className='mt-3 p-5'>
       <DashboardStats stats={recruiterStats} />
     </div>
    
    </div>
  )
}

export default  RecuriterDashboardHomePage