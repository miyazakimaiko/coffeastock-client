import React, { useEffect, useContext, createRef } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddCoffeeBean from './pages/AddCoffeeBean';
import AddRecipe from './pages/AddRecipe';
import EditCoffeeBean from './pages/EditCoffeeBean';
import EditRecipe from './pages/EditRecipe';
import ViewRecipes from './pages/ViewRecipes';
import ViewMyCoffees from './pages/ViewMyCoffees';
import Nav from './shared/Nav';
import {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/js/bootstrap'
import '../src/bootstrap-custom/bootstrap.css'
import './index.scss'
import FloatingMenu from './shared/FloatingMenu';
import SettingsCustomRanges from './pages/SettingsCustomRanges';
import { AccountContext } from './context/Account';
import CustomRanges from './context/CustomRanges';
import Header from './shared/Header';
import NavState from './context/NavState';

const App = () => {
  const mainRef = createRef();
  const navRef = createRef();
  const headerRef = createRef();
  const pushpinRef = createRef();


  const { getSession, setUserData, authenticated, setAuthenticated } = useContext(AccountContext);

  useEffect(() => {
    getSession().then((session) => {
      setUserData(session);
      setAuthenticated(true);
    }); 
  }, []);

  return <>
    <CustomRanges>
      <NavState>
        <div className="relative flex flex-col min-h-screen bg-creme font-sans">
          <Router>
            {authenticated ? <Nav navRef={navRef} mainRef={mainRef} headerRef={headerRef} pushpinRef={pushpinRef}/>: ""}
            <div ref={mainRef} className={"main w-full box-border text-sm text-burnt-sienna"}>
              {/* https://stackoverflow.com/questions/58786766/dynamic-header-content-in-react */}
              {authenticated ? <Header title="Header" mainRef={mainRef} navRef={navRef} pushpinRef={pushpinRef}/>: ""}
              <Routes>
              <Route exact path='/login' element={authenticated ? <Navigate to="/" /> : <Login />} />
              <Route exact path='/register' element={authenticated ? <Navigate to="/" /> : <Register />} />

              <Route exact path='/' element={authenticated ? <Dashboard /> : <Navigate to="/login" />} />
              <Route exact path="/coffees" element={authenticated ? <ViewMyCoffees /> : <Navigate to="/login" />} />
              <Route exact path="/recipes/:roaster_id/:coffee_id" element={authenticated ? <ViewRecipes /> : <Navigate to="/login" />} />
              <Route exact path="/add/bean" element={authenticated ? <AddCoffeeBean /> : <Navigate to="/login" />} />
              <Route exact path="/add/recipe" element={authenticated ? <AddRecipe /> : <Navigate to="/login" />} />
              <Route exact path="/edit/:bean_id" element={authenticated ? <EditCoffeeBean /> : <Navigate to="/login" />} />
              <Route exact path="/edit/:recipe_id" element={authenticated ? <EditRecipe /> : <Navigate to="/login" />} />

              <Route exact path="/settings/aroma" element={authenticated ? <SettingsCustomRanges parentCat={'Coffee Beans'} cat={'aroma'}/> : <Navigate to="/login" />} />
              <Route exact path="/settings/farm" element={authenticated ? <SettingsCustomRanges parentCat={'Coffee Beans'} cat={'farm'}/> : <Navigate to="/login" />} />
              <Route exact path="/settings/origin" element={authenticated ? <SettingsCustomRanges parentCat={'Coffee Beans'} cat={'origin'}/> : <Navigate to="/login" />} />
              <Route exact path="/settings/variety" element={authenticated ? <SettingsCustomRanges parentCat={'Coffee Beans'} cat={'variety'}/> : <Navigate to="/login" />} />
              <Route exact path="/settings/process" element={authenticated ? <SettingsCustomRanges parentCat={'Coffee Beans'} cat={'process'} /> : <Navigate to="/login" />} />
              <Route exact path="/settings/roaster" element={authenticated ? <SettingsCustomRanges parentCat={'Coffee Beans'} cat={'roaster'} /> : <Navigate to="/login" />} />

              <Route exact path="/settings/grinder" element={authenticated ? <SettingsCustomRanges parentCat={'Recipes'} cat={'grinder'} /> : <Navigate to="/login" />} />
              <Route exact path="/settings/method" element={authenticated ? <SettingsCustomRanges parentCat={'Recipes'} cat={'method'} /> : <Navigate to="/login" />} />
              <Route exact path="/settings/palate" element={authenticated ? <SettingsCustomRanges parentCat={'Recipes'} cat={'palate'} /> : <Navigate to="/login" />} />
              <Route exact path="/settings/water" element={authenticated ? <SettingsCustomRanges parentCat={'Recipes'} cat={'water'} /> : <Navigate to="/login" />} />
              </Routes>
            </div>
          </Router>
          {authenticated ? <FloatingMenu />: ""}
          <ToastContainer theme="colored" hideProgressBar={true}/>
        </div>
      </NavState>
    </CustomRanges>
  </>
}

export default App;