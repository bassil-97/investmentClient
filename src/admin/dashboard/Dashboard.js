import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import '../dashboard-sections/Dashboard-sections.css';
import '../Sidebar/Sidebar.css';
import {  Route, withRouter } from 'react-router-dom';

import Sidebar from '../Sidebar/Sidebar';
import Home from '../dashboard-sections/Home';
import CompanyNameForm from '../dashboard-sections/CompanyNameForm';
import Requests from '../dashboard-sections/Orders';


function Dashboard() {

    const [orders, setOrders] = useState();
    const [products, setProducts] = useState();
    const [totalEarnings, setTotalEarnings] = useState(0);
    
    useEffect(()=> {
        const fetchOrdersList = async () => {
            const response = await fetch('https://water-delivery-acdc9-default-rtdb.firebaseio.com/orders.json');
            const responseData = await response.json();

            const loadedOrdersList = [];

            for(const key in responseData) {
                loadedOrdersList.push({
                    id: key,
                    firstName: responseData[key].firstName,
                    lastName: responseData[key].lastName,
                    email: responseData[key].email,
                    order: responseData[key].product,
                    phoneNumber: responseData[key].phoneNumber,
                    quantity: responseData[key].quantity
                });
                setTotalEarnings(prevState => prevState + responseData[key].price);
                console.log(totalEarnings);
            }

            setOrders(loadedOrdersList);
        };

        const fetchProductsList = async () => {
            const response = await fetch('https://water-delivery-acdc9-default-rtdb.firebaseio.com/products.json');
            const responseData = await response.json();

            const loadedProductsList = [];

            for(const key in responseData) {
                loadedProductsList.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].productDescription,
                    price: responseData[key].price,
                    imageURL: responseData[key].imageURL
                });
            }
            setProducts(loadedProductsList);
        };
        
        fetchOrdersList();
        fetchProductsList();
    }, []);

    return (
        <div className="dashboard">
            <Sidebar />
            <section className="home-section">
                <Route path="/dashboard/home">
                    <Home products={products} orders={orders} />
                </Route>
                <Route path="/dashboard/change-service-name" component={CompanyNameForm} />
                <Route path="/dashboard/requests" component={Requests} />
            </section>
            
        </div>
    )
}

export default withRouter(Dashboard);