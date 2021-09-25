import React from 'react';
import './App.css';

import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProtectedRoute from './helpers/ProtectedRoute';
import Home from './components/home/Home';
import AdminIndex from './admin/index/AdminIndex';
import Dashboard from './admin/dashboard/Dashboard';


function App() {

  const isAuth = useSelector(state => state.isAuth);  

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/admin">
          <AdminIndex />
        </Route>
        <ProtectedRoute path="/dashboard" component={Dashboard} isAuth={isAuth} />
      </Switch>
    </div>
  );
}

export default App;
