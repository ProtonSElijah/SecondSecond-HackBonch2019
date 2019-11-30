import React, { useState, useEffect } from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Search from '@vkontakte/vkui/dist/components/Search/Search';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Icon24Search from '@vkontakte/icons/dist/24/search';

import ProductCell from '../Components/ProductCell';

const Main = ({id}) => {
    const [searchValue, setSearchValue] = useState("Введите");
    const [dataProducts, setDataProducts] = useState(null);

    const RefreshSearch = e => {
        setSearchValue(e.replace(/\s+/g,' '));
    };

    useEffect(() => {
        function serverRequest() {
            return fetch("http://192.168.43.76:8080/items", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
            })
            .then(response => response.json())
            .then(data => setDataProducts(data));
        }
      serverRequest();
    }, []);

    return (
        <Panel id={id}>


<PanelHeader
  left={<HeaderButton><Icon24Search/></HeaderButton>}
/>
<Search value={searchValue} onChange={RefreshSearch}/>
            <div id="ProductList" className="ProductList">
                {dataProducts &&
                    <ProductList data={dataProducts} />}
               <ProductCell name="Свитер" img="https://sun9-34.userapi.com/c857632/v857632625/10d2de/LxNWQk6Fy6k.jpg" price="Цена"/>
               <ProductCell name="Свитер" img="https://sun9-34.userapi.com/c857632/v857632625/10d2de/LxNWQk6Fy6k.jpg" price="Цена"/>
               <ProductCell name="Свитер" img="https://sun9-34.userapi.com/c857632/v857632625/10d2de/LxNWQk6Fy6k.jpg" price="Цена"/>
               <ProductCell name="Свитер" img="https://sun9-34.userapi.com/c857632/v857632625/10d2de/LxNWQk6Fy6k.jpg" price="Цена"/>
               <ProductCell name="Свитер" img="https://sun9-34.userapi.com/c857632/v857632625/10d2de/LxNWQk6Fy6k.jpg" price="Цена"/>
               <ProductCell name="Свитер" img="https://sun9-34.userapi.com/c857632/v857632625/10d2de/LxNWQk6Fy6k.jpg" price="Цена"/>
               <ProductCell name="Свитер" img="https://sun9-34.userapi.com/c857632/v857632625/10d2de/LxNWQk6Fy6k.jpg" price="Цена"/>
               <ProductCell name="Свитер" img="https://sun9-34.userapi.com/c857632/v857632625/10d2de/LxNWQk6Fy6k.jpg" price="Цена"/>
            </div>

        </Panel>
    );
};

const ProductList = ({data}) => {
    return data.map (
        product =>
            <div className="ProductCell">
                <img src={product.img ? product.img : null}/>
                <div className="ProdName">{product.name ? product.name : ""}</div>
                <div className="ProdPrice">{product.price ? product.price : ""}</div>
            </div>
    );
}

export default Main;
