import React, { useEffect, createRef, useState } from 'react';
import {BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.scss'
import Nav from './components/nav';
import DashboardHeader from './components/dashboard-header';
import Login from './pages/login';
import Register from './pages/register';
import Dashboard from './pages/dashboard';
import ViewBeanAndRecipes from './pages/view-bean-and-recipes';
import ViewMyCoffees from './pages/view-beans-list';
import ViewRanges from './pages/view-ranges';
import CompareRecipes from './pages/compare-recipes';
import ManageAccount from './pages/manage-account';
import ErrorPage from './pages/error';
import { useGetSession, 
        useSetUserData, 
        useAuthenticated, 
        useSetAuthenticated } from './context/AccountContext';
import ScrollBackButton from './elements/ScrollBackButton';
import Plans from './pages/plans';
import BasicHeader from './components/basic-header';

export function DashboardLayout({title}) {
  const mainRef = createRef();
  const navRef = createRef();
  const headerRef = createRef();
  const pushpinRef = createRef();

  return (
    <>
      <Nav mainRef={mainRef} navRef={navRef} headerRef={headerRef} pushpinRef={pushpinRef}/>
      <DashboardHeader mainRef={mainRef} navRef={navRef} headerRef={headerRef} pushpinRef={pushpinRef} title={title}/>
      <div ref={mainRef} className={"relative main min-h-screen box-border header-top-pd"}>
        <Outlet />
      </div>
    </>
  )
}

export function BasicLayout() {
  return (
    <>
      <BasicHeader />
      <div className="h-full">
        <Outlet />
      </div>
    </>
  )
}

const App = () => {

  const getSession = useGetSession();
  const setUserData = useSetUserData();
  const authenticated = useAuthenticated();
  const setAuthenticated = useSetAuthenticated();

  const [title, setTitle] = useState("Dashboard");
  
  useEffect(() => {
    getSession().then((session) => {
      setUserData(session);
      setAuthenticated(true);
    });
  }, []);

  return <>
    <Router>
      <div className="relative flex flex-col w-full min-h-screen bg-creme font-sans text-xs md:text-sm text-burnt-sienna">
        { authenticated ? 
          <>
            <Routes>
              <Route path="/" element={<DashboardLayout title={title} />} >
                <Route index element={<Dashboard setTitle={setTitle} />} />
                <Route exact path="coffees" element={<ViewMyCoffees setTitle={setTitle} />} />
                <Route exact path="coffee/:id" element={<ViewBeanAndRecipes setTitle={setTitle} />} />
                <Route exact path="compare/recipes" element={<CompareRecipes setTitle={setTitle} />} />

                <Route exact path="settings/aroma" element={<ViewRanges rangeName="aroma" setTitle={setTitle}/>} />
                <Route exact path="settings/farm" element={<ViewRanges rangeName="farm" setTitle={setTitle} />} />
                <Route exact path="settings/origin" element={<ViewRanges rangeName="origin" setTitle={setTitle} />} />
                <Route exact path="settings/variety" element={<ViewRanges rangeName="variety" setTitle={setTitle} />} />
                <Route exact path="settings/process" element={<ViewRanges rangeName="process" setTitle={setTitle} />} />
                <Route exact path="settings/roaster" element={<ViewRanges rangeName="roaster" setTitle={setTitle} />} />

                <Route exact path="settings/grinder" element={<ViewRanges rangeName="grinder" setTitle={setTitle} />} />
                <Route exact path="settings/method" element={<ViewRanges rangeName="method" setTitle={setTitle} />} />
                <Route exact path="settings/palate" element={<ViewRanges rangeName="palate" setTitle={setTitle} />} />
                <Route exact path="settings/water" element={<ViewRanges rangeName="water" setTitle={setTitle} />} />
                <Route exact path="account" element={<ManageAccount setTitle={setTitle} />} />
                <Route path="*" element={<ErrorPage />} />
              </Route>

              <Route path="/" element={<BasicLayout />} >
                <Route exact path="plans" element={<Plans />} />
                <Route path="*" element={<ErrorPage />} />
              </Route>
            </Routes>
          </>
          :
          <div className="relative main min-h-screen box-border">
            <Routes>
              <Route exact path='/register' element={<Register />} />
              <Route exact path='/login' element={<Login />} />
            </Routes>
          </div>
        }
        <ToastContainer theme="colored" newestOnTop hideProgressBar={false}/>
        <ScrollBackButton />
      </div>
    </Router>
  </>
}

export default App;