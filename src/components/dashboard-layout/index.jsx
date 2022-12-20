import React, { createRef } from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '../nav';
import DashboardHeader from '../dashboard-header';
import DashboardFooter from '../dashboard-footer';

const DashboardLayout = ({title}) => {
  const mainRef = createRef();
  const navRef = createRef();
  const headerRef = createRef();
  const pushpinRef = createRef();

  return (
    <div className="bg-creme font-sans text-xs md:text-sm text-burnt-sienna">
      <Nav mainRef={mainRef} navRef={navRef} headerRef={headerRef} pushpinRef={pushpinRef}/>
      <DashboardHeader mainRef={mainRef} navRef={navRef} headerRef={headerRef} pushpinRef={pushpinRef} title={title}/>
      <div ref={mainRef} className="relative main min-h-screen box-border header-top-pd flex flex-col justify-between w-full">
        <Outlet />
        <DashboardFooter />
      </div>
    </div>
  )
}

export default DashboardLayout