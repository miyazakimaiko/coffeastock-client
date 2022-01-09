import React, { useState, useEffect, useContext } from 'react';
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
import SettingsCustomRange from './pages/SettingsCustomRange';
import { AccountContext } from './context/Account';
import CustomRange from './context/CustomRange';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  const setAuth = boolean => {
    setAuthenticated(boolean);
  }

  const { getSession, userData } = useContext(AccountContext);

  useEffect(() => {
    getSession().then((session) => {
      setAuthenticated(true);
    });
  }, []);
  // const [authenticated, setAuthenticated] = useState(false)

  // const setAuth = boolean => {
  //   setAuthenticated(boolean);
  // }

  // const isAuthenticated = async () => {
  //   try {
  //     const response = await fetch(
  //       "http://localhost:4000/api/v1/authorized",
  //       {
  //         method: "GET",
  //         headers: {
  //           "token": localStorage.token
  //         }
  //       }
  //     );
  //     const parseRes = await response.json();
  //     console.log(parseRes)
  //     parseRes === true ? setAuthenticated(true) : setAuthenticated(false);

  //   } catch (error) {
  //     console.log(error.message)
  //   }
  // }

  // const [name, setName] = useState('');
  // const [customOrigins, setCustomOrigins] = useState('')
  // const [customVarieties, setCustomVarieties] = useState('')
  // const [customFarms, setCustomFarms] = useState('')
  // const [customProcesses, setCustomProcesses] = useState('')
  // const [customRoasters, setCustomRoasters] = useState('')
  // const [customMethods, setCustomMethods] = useState('')
  // const [customWaters, setCustomWaters] = useState('')
  // const [customGrinders, setCustomGrinders] = useState('')
  // const [customPalates, setCustomPalates] = useState('')
  // const [customAromas, setCustomAromas] = useState('')
 
  //  const getUserDetails = async () => {
  //    try {
  //      const response = await fetch(
  //        "http://localhost:4000/api/v1/user",
  //        {
  //          method: "GET",
  //          headers: {"token": localStorage.token}
  //        }
  //      );
  //      const parseRes = await response.json();
  //      setName(parseRes.username)
  //      setCustomOrigins(parseRes.origin_range)
  //      setCustomFarms(parseRes.farm_range)
  //      setCustomVarieties(parseRes.variety_range)
  //      setCustomProcesses(parseRes.process_range)
  //      setCustomRoasters(parseRes.roaster_range)
  //      setCustomAromas(parseRes.aroma_range)
  //      setCustomGrinders(parseRes.grinder_range)
  //      setCustomMethods(parseRes.method_range)
  //      setCustomWaters(parseRes.water_range)
  //      setCustomPalates(parseRes.palate_range)
 
  //    } catch (error) {
  //      console.log(error.message)
  //    }
  //  }

  // useEffect(() => {
  //   isAuthenticated().then(getUserDetails());
  // }, [])
  return <>
    <CustomRange>
      <div className="relative flex min-h-screen bg-creme font-sans">
          <Router>
            <div className="flex w-full">
              {authenticated ? <Nav setAuth={setAuth} nickname={userData.nickname} />: ""}
              <div className={"w-full box-border text-sm text-burnt-sienna" + (authenticated ? " pl-64" : "")}>
                <Routes>
                <Route exact path='/login' element={authenticated ? <Navigate to="/" /> : <Login setAuth={setAuth} />} />
                <Route exact path='/register' element={authenticated ? <Navigate to="/" /> : <Register />} />

                <Route exact path='/' element={authenticated ? <Dashboard /> : <Navigate to="/login" />} />
                <Route exact path="/coffees" element={authenticated ? <ViewMyCoffees /> : <Navigate to="/login" />} />
                <Route exact path="/recipes/:roaster_id/:coffee_id" element={authenticated ? <ViewRecipes /> : <Navigate to="/login" />} />
                <Route exact path="/add/bean" element={authenticated ? <AddCoffeeBean /> : <Navigate to="/login" />} />
                <Route exact path="/add/recipe" element={authenticated ? <AddRecipe /> : <Navigate to="/login" />} />
                <Route exact path="/edit/:bean_id" element={authenticated ? <EditCoffeeBean /> : <Navigate to="/login" />} />
                <Route exact path="/edit/:recipe_id" element={authenticated ? <EditRecipe /> : <Navigate to="/login" />} />

                <Route exact path="/settings/aroma" element={authenticated ? <SettingsCustomRange parentCat={'Coffee Beans'} cat={'aroma'}/> : <Navigate to="/login" />} />
                <Route exact path="/settings/farm" element={authenticated ? <SettingsCustomRange parentCat={'Coffee Beans'} cat={'farm'}/> : <Navigate to="/login" />} />
                <Route exact path="/settings/origin" element={authenticated ? <SettingsCustomRange parentCat={'Coffee Beans'} cat={'origin'}/> : <Navigate to="/login" />} />
                <Route exact path="/settings/variety" element={authenticated ? <SettingsCustomRange parentCat={'Coffee Beans'} cat={'variety'}/> : <Navigate to="/login" />} />
                <Route exact path="/settings/process" element={authenticated ? <SettingsCustomRange parentCat={'Coffee Beans'} cat={'process'} /> : <Navigate to="/login" />} />
                <Route exact path="/settings/roaster" element={authenticated ? <SettingsCustomRange parentCat={'Coffee Beans'} cat={'roaster'} /> : <Navigate to="/login" />} />

                <Route exact path="/settings/grinder" element={authenticated ? <SettingsCustomRange parentCat={'Recipes'} cat={'grinder'} /> : <Navigate to="/login" />} />
                <Route exact path="/settings/method" element={authenticated ? <SettingsCustomRange parentCat={'Recipes'} cat={'method'} /> : <Navigate to="/login" />} />
                <Route exact path="/settings/palate" element={authenticated ? <SettingsCustomRange parentCat={'Recipes'} cat={'palate'} /> : <Navigate to="/login" />} />
                <Route exact path="/settings/water" element={authenticated ? <SettingsCustomRange parentCat={'Recipes'} cat={'water'} /> : <Navigate to="/login" />} />
                </Routes>
              </div>
            </div>
          </Router>
        {authenticated ? <FloatingMenu />: ""}
        <ToastContainer theme="colored" hideProgressBar={true}/>
      </div>
    </CustomRange>
  </>
}

export default App;