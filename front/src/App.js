import './App.css';
import AppBar from './components/AppBar.jsx'
import Home from './views/Home.jsx'
import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import Products from './components/Products';




function App() {
  return (
    <div className="App">
        <AppBar />
 
      <BrowserRouter>
        <Switch>

        <Route path exact ='/'> <Home/> </Route>
        <Route path='/login'><Login /></Route>
        <Route path='/register'><Register /></Route>
        <Route path='/products'><Products /></Route>
        
        
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
