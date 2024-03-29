import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/login';
import Register from './pages/register';
import Dashboard from './pages/dashboard';
import ViewBeanAndRecipes from './pages/view-bean-and-recipes';
import ViewMyCoffees from './pages/view-beans-list';
import ViewRanges from './pages/view-ranges';
import CompareRecipes from './pages/compare-recipes';
import ManageAccount from './pages/manage-account';
import { useGetSession, 
        useSetUserData, 
        useAuthenticated, 
        useSetAuthenticated } from './context/AccountContext';
import ScrollBackButton from './elements/ScrollBackButton';
import ServerError from './pages/server-error';
import DashboardLayout from './components/dashboard-layout';
import NotFound from './pages/not-found-error';
import ErrorPage from './pages/error';
import './index.scss'


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

  const dashboard = <Dashboard setTitle={setTitle} />;
  const login = <Login />;
  const pageNotFound = <NotFound />;

  return (
    <div className="font-sans text-xs md:text-sm text-burnt-sienna">
      <Router>
        <Routes>
          <Route exact path="/" element={authenticated ? <Navigate to="/app/dashboard" />  : login} />
          {/* <Route exact path="pricing" element={<Pricing />} /> */}
          <Route exact path="500" element={<ServerError />} />  
          <Route exact path='/login' element={authenticated ? <Navigate to="/app/dashboard" />  : login} />
          <Route exact path='/register' element={<Register />} />
        </Routes>

          { authenticated ? 
            <>
              <Routes>
                <Route path="app/" element={<DashboardLayout title={title} />} >
                  <Route index path="" element={dashboard} />
                  <Route exact path="dashboard" element={dashboard} />
                  <Route exact path="coffee" element={<ViewMyCoffees setTitle={setTitle} />} />
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
                  <Route exact path="error" element={<ErrorPage />} />
                  <Route exact path="500" element={<ServerError />} />  
                  <Route path="*" element={pageNotFound} />
                </Route>
              </Routes>
            </>
            :
            <Routes>
              <Route path='app/*' element={login} />
            </Routes>
          }

          <ToastContainer theme="colored" newestOnTop hideProgressBar={false}/>
          <ScrollBackButton />
      </Router>
    </div>
  )
}

export default App;