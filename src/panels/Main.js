import React, { useState, useEffect } from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Search from '@vkontakte/vkui/dist/components/Search/Search';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Icon24Search from '@vkontakte/icons/dist/24/search';

const Main = ({id, openModal, dataProducts}) => {
    const [searchValue, setSearchValue] = useState("Введите");

    const RefreshSearch = e => {
        setSearchValue(e.replace(/\s+/g,' '));
    };

    return (
        <Panel id={id}>
            <PanelHeader
              left={<HeaderButton onClick={openModal}><Icon24Search/></HeaderButton>}
            />
            <Search value={searchValue} onChange={RefreshSearch}/>
            <div id="ProductList" className="ProductList">
                {dataProducts &&
                    <ProductList data={dataProducts} openModal={openModal}/>}
            </div>
        </Panel>
    );
};

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

export default Main;
