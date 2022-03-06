import React, { useEffect, createRef } from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.scss'
import Nav from './components/nav';
import Header from './components/header';
import Login from './pages/login';
import Register from './pages/register';
import Dashboard from './pages/dashboard';
import ViewRecipes from './pages/view-recipe-list';
import ViewMyCoffees from './pages/view-beans-list';
import ManageAttributeRanges from './pages/manage-attribute-ranges';
import { useGetSession, useSetUserData, useAuthenticated, useSetAuthenticated } from './context/AccountContext';
import NavStateProvider from './context/NavStateContext';
import ScrollBackButton from './components/elements/ScrollBackButton';

const App = () => {
  const mainRef = createRef();
  const navRef = createRef();
  const headerRef = createRef();
  const pushpinRef = createRef();

  const getSession = useGetSession()
  const setUserData = useSetUserData()
  const authenticated = useAuthenticated()
  const setAuthenticated = useSetAuthenticated()

  useEffect(() => {
    getSession().then((session) => {
      setUserData(session);
      setAuthenticated(true);
    });
  }, []);

  return <>
    <Router>
      <div className="relative flex flex-col min-h-screen bg-creme font-sans">
        <NavStateProvider>
          {authenticated ? <Nav navRef={navRef} mainRef={mainRef} headerRef={headerRef} pushpinRef={pushpinRef}/>: ""}
          <div ref={mainRef} className={"main w-full box-border text-md text-burnt-sienna"}>
            {authenticated ? <Header mainRef={mainRef} navRef={navRef} pushpinRef={pushpinRef}/>: ""}

            { authenticated ? 
              <Routes>
                <Route exact path="/coffees" element={<ViewMyCoffees />} />
                <Route exact path="/coffee/:id" element={<ViewRecipes />} />

                <Route exact path="/settings/aroma" element={<ManageAttributeRanges parentCat={'Coffee Beans'} cat={'aroma'}/>} />
                <Route exact path="/settings/farm" element={<ManageAttributeRanges parentCat={'Coffee Beans'} cat={'farm'}/>} />
                <Route exact path="/settings/origin" element={<ManageAttributeRanges parentCat={'Coffee Beans'} cat={'origin'}/>} />
                <Route exact path="/settings/variety" element={<ManageAttributeRanges parentCat={'Coffee Beans'} cat={'variety'}/>} />
                <Route exact path="/settings/process" element={<ManageAttributeRanges parentCat={'Coffee Beans'} cat={'process'} />} />
                <Route exact path="/settings/roaster" element={<ManageAttributeRanges parentCat={'Coffee Beans'} cat={'roaster'} />} />

                <Route exact path="/settings/grinder" element={<ManageAttributeRanges parentCat={'Recipes'} cat={'grinder'} />} />
                <Route exact path="/settings/method" element={<ManageAttributeRanges parentCat={'Recipes'} cat={'method'} />} />
                <Route exact path="/settings/palate" element={<ManageAttributeRanges parentCat={'Recipes'} cat={'palate'} />} />
                <Route exact path="/settings/water" element={<ManageAttributeRanges parentCat={'Recipes'} cat={'water'} />} />
                <Route path='/' element={<Dashboard />} />
              </Routes>
              :
              <Routes>
                <Route exact path='/register' element={<Register />} />
                <Route exact path='/login' element={<Login />} />
                <Route path='/' element={<Login />} />
              </Routes>
            }
          </div>
        </NavStateProvider>
        <ToastContainer theme="colored" hideProgressBar={true}/>
        <ScrollBackButton />
      </div>
    </Router>
  </>
}

export default App;