import React, { useEffect } from 'react';
import './App.css';

import { Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { companyNameActions } from './store/company-name-slice';

import ProtectedRoute from './helpers/ProtectedRoute';
import Home from './components/home/Home';
import AdminIndex from './admin/index/AdminIndex';
import Dashboard from './admin/dashboard/Dashboard';


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchServiceName = async () => {
      const response = await fetch("https://investment-c954f-default-rtdb.firebaseio.com/company.json");

      if(!response.ok) {
        throw new Error('Could not fetch cart data!');
      }

      const data = await response.json();
      dispatch(companyNameActions.changeCompanyName(data['name']));
    };

    fetchServiceName();
  }, [dispatch]);

  const isAuth = useSelector(state => state.auth.isAuth);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/admin">
          <AdminIndex />
        </Route>
        <ProtectedRoute path="/dashboard" component={Dashboard} isAuth={isAuth} />
      </Switch>
    </div>
  );
}

export default App;
