'use client'
import React from 'react'
import { Bell, Envelope, Gear, House, Magnifier, Person,LayoutSideContentLeft, Briefcase} from "@gravity-ui/icons";
import {Button, Drawer} from "@heroui/react";
import Link from 'next/link';



 const navItems = [
    {icon: House,  href:'/dashboard/recuriter', label: "Home"},
    {icon: Magnifier, href:'/dashboard/recuriter/jobs', label: "Jobs"},
    {icon: Bell,href:'/dashboard/recuriter/jobs/new',  label: "Post a Job"},
     {icon: Briefcase,href:'/dashboard/recuriter/company',  label: "Company profile"},
    {icon: Envelope,href:'/dashboard/message', label: "Messages"},
    {icon: Person,href:'/dashboard/profile', label: "Profile"},
    {icon: Gear,href:'/dashboard/profile', label: "Settings"},
  ];

  const navContent =  <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                    type="button"
                    href={item.href}
                  >
                    <item.icon className="size-5 text-muted" />
                    {item.label}
                  </Link>
                ))}
              </nav>

const DashboardSidebar = () => {

  return (
    <div>
      <>
      <aside className='hidden w-64 shrink-0 border-r border-default p-4 lg:block'>
        {navContent}
      </aside>
      <Drawer>
      <Button className='lg:hidden' variant="secondary">
      <LayoutSideContentLeft></LayoutSideContentLeft>
        
      </Button>
      <Drawer.Backdrop>
        <Drawer.Content placement="left">
          <Drawer.Dialog>
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading>Navigation</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
             {navContent}
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
      
      </>
    </div>
  )
}

export default DashboardSidebar