import React, { useState, useEffect } from 'react';
import MUIDataTable from "mui-datatables";
import IconButton from '@material-ui/core/IconButton';
import Clock from '../../UI/Clock';

import firebase from '../../helpers/firebase';

import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

export default function Orders() {

    const [orders, setOrders] = useState();
    const columns = [
        "id", 
        "name", 
        "email", 
        "order", 
        "quantity", 
        {
            name: 'actions',
            options: {
                customBodyRender: (value, tableMeta, updateValue) => (
                    <div>
                        <IconButton onClick={() => removeOrderHandler(tableMeta.tableData[tableMeta.rowIndex]["0"])}>
                            <DeleteOutlineIcon />
                        </IconButton>
                        <IconButton>
                            <CheckCircleOutlineIcon />
                        </IconButton>
                    </div>
                )
            }
        }
    ];

    const options = {
        filterType: 'checkbox',
    };

    useEffect(() => {
        fetchOrdersList();
    }, []);

    const fetchOrdersList = async () => {
        const response = await fetch('https://water-delivery-acdc9-default-rtdb.firebaseio.com/orders.json');
        const responseData = await response.json();

        const loadedOrdersList = [];

        for(const key in responseData) {
            loadedOrdersList.push({
                id: key,
                name: responseData[key].firstName + ' ' + responseData[key].lastName,
                email: responseData[key].email,
                order: responseData[key].product,
                phoneNumber: responseData[key].phoneNumber,
                quantity: responseData[key].quantity
            });
        }
        setOrders(loadedOrdersList);
    };

    const removeOrderHandler = orderId => {
        console.log(orderId);
        const ordersRef = firebase.database().ref("orders").child(orderId);
        ordersRef.remove();
        fetchOrdersList();
    };

    return (
        <div>
            <div className="db-header">
                <div className="text">
                    <h3 className="mb-0">Customers orders</h3>
                    <small className="text-muted">Here's an overview of your customers orders</small>
                </div>
                <Clock />
            </div>
            {orders && <MUIDataTable
                title={"Orders"}
                data={orders}
                columns={columns}
                options={options}
            />}
        </div>
    )
}



