import React from 'react';
import Dashboard from './pages/Dashboard';
import CreateCoffeeBean from './pages/CreateCoffeeBean';
import CreateRecipe from './pages/CreateRecipe';
import EditCoffeeBean from './pages/EditCoffeeBean';
import EditRecipe from './pages/EditRecipe';
import SettingsCoffeeBean from './pages/SettingsCoffeeBean';
import SettingsRecipes from './pages/SettingsRecipes';
import ViewAllRecipes from './pages/ViewAllRecipes';
import ViewFilteredRecipes from './pages/ViewFilteredRecipes';
import Nav from './shared/Nav';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import '../src/bootstrap-custom/bootstrap.css'

const App = () => {
    return <div className="flex min-h-screen bg-creme font-sans">
        <Router>
            <div className="flex w-full">
                <Nav/>
                <div className="w-full px-3 text-sm text-burnt-sienna">
                <Routes>
                    <Route exact path='/' element={<Dashboard />} />
                    <Route exact path="/recipes" element={<ViewAllRecipes />} />
                    <Route exact path="/recipes/:attr_name/:cat_id" element={<ViewFilteredRecipes />} />
                    <Route exact path="/create/bean" element={<CreateCoffeeBean />} />
                    <Route exact path="/create/recipe" element={<CreateRecipe />} />
                    <Route exact path="/edit/:bean_id" element={<EditCoffeeBean />} />
                    <Route exact path="/edit/:recipe_id" element={<EditRecipe />} />
                    <Route exact path="/settings/bean" element={<SettingsCoffeeBean />} />
                    <Route exact path="/settings/recipe" element={<SettingsRecipes />} />
                </Routes>
                </div>
            </div>
        </Router>
    </div>
}

export default App;