import React from 'react';

const ProductList = ({data, openModal}) => {
    return data.map (
        product =>
            <div className="ProductCell"
               onClick={openModal}
               data-name={product.name}
               data-price={product.price}
               data-img={product.img}
               data-url={product.url}
               data-store={product.shop}
               data-description={product.description}>
                <img src={product.img ? product.img : null}/>
                <div className="ProdName">{product.name ? product.name : ""}</div>
                <div className="ProdPrice">{product.price ? (product.price + " руб.") : ""}</div>
            </div>
    );
}

export default ProductList;
