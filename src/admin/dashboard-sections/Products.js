import React, { useEffect, useState } from 'react';

import Card from '../../UI/Card';
import Clock from '../../UI/Clock';
import firebase from '../../helpers/firebase';

function Products() {

    const [products, setProducts] = useState();
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        fetchProductsList();
    }, []);

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

    const removeProductHandler = productId => {
        const productsRef = firebase.database().ref("products").child(productId);
        productsRef.remove();
        fetchProductsList();
    };

    return (
        <div className="w-100">
            <div className="db-header">
                <div className="text">
                    <h3 className="mb-0">Products</h3>
                    <small className="text-muted">Here's an overview of your website performance</small>
                </div>
                <Clock />
            </div>
            <div className="form-group d-flex" id="searchbar">
                <label htmlFor="search-input">Search</label>
                <input style={{border: '1px solid lightgray'}} type="text" className="form-control ml-2 mb-2" value={searchInput} onChange={(e)=> setSearchInput(e.target.value)} id="search-input" />
            </div>
            <div className="db-products">
                {
                    products && products.filter((product) => {
                        if(searchInput == "") {
                            return products;
                        } else if(product.name.toLowerCase().includes(searchInput.toLowerCase())) {
                            return product;
                        }
                    }).map((product) => (
                        <Card 
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            description={product.description}
                            imageURL={product.imageURL}
                            price={product.price}
                            removeProduct={removeProductHandler}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Products;
