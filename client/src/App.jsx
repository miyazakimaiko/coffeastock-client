import React, { useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard';
import CreateCoffeeBean from './pages/CreateCoffeeBean';
import CreateRecipe from './pages/CreateRecipe';
import EditCoffeeBean from './pages/EditCoffeeBean';
import EditRecipe from './pages/EditRecipe';
import SettingsCoffeeBean from './pages/SettingsCoffeeBean';
import SettingsRecipes from './pages/SettingsRecipes';
import ViewRecipes from './pages/ViewRecipes';
import ViewMyCoffees from './pages/ViewMyCoffees';
import Nav from './shared/Nav';
import {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import '../src/bootstrap-custom/bootstrap.css'

const App = () => {
  const [authenticated, setAuthenticated] = useState(false)

  return <>
    <div className="flex min-h-screen bg-creme font-sans">
      <Router>
        <div className="flex w-full">
          {authenticated ? <Nav/>: ""}
          <div className={"w-full box-border text-sm text-burnt-sienna" + (authenticated ? " ml-64 px-2" : "")}>
            <Routes>
            <Route exact path='/login' element={authenticated ? <Navigate to="/" /> : <Login />} />
            <Route exact path='/register' element={<Register />} />

            <Route exact path='/' element={authenticated ? <Dashboard /> : <Navigate to="/login" />} />
            <Route exact path="/coffees" element={authenticated ? <ViewMyCoffees /> : <Navigate to="/login" />} />
            <Route exact path="/recipes/:roaster_id/:coffee_id" element={authenticated ? <ViewRecipes /> : <Navigate to="/login" />} />
            <Route exact path="/create/bean" element={authenticated ? <CreateCoffeeBean /> : <Navigate to="/login" />} />
            <Route exact path="/create/recipe" element={authenticated ? <CreateRecipe /> : <Navigate to="/login" />} />
            <Route exact path="/edit/:bean_id" element={authenticated ? <EditCoffeeBean /> : <Navigate to="/login" />} />
            <Route exact path="/edit/:recipe_id" element={authenticated ? <EditRecipe /> : <Navigate to="/login" />} />
            <Route exact path="/settings/bean" element={authenticated ? <SettingsCoffeeBean /> : <Navigate to="/login" />} />
            <Route exact path="/settings/recipe" element={authenticated ? <SettingsRecipes /> : <Navigate to="/login" />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  </>
}

export default App;