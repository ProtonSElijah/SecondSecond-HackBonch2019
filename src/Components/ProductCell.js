import React, { useState, useEffect } from 'react';

const ProductCell = ({name, price, img}) => {
    return (
        <div className="ProductCell">
            <img src={img}/>
            <div className="ProdName">{name}</div>
            <div className="ProdPrice">{price}</div>
        </div>
    );
}

export default ProductCell;
