import React, { useState, useEffect } from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Search from '@vkontakte/vkui/dist/components/Search/Search';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Icon24Filter from '@vkontakte/icons/dist/24/filter';
/**/
const Main = ({id, openModal, dataProducts, openFilter}) => {
    const [searchValue, setSearchValue] = useState("");

    const RefreshSearch = e => {
        setSearchValue(e);
    };

    const products = () => {
      const search = searchValue.toLowerCase();
      return dataProducts.filter(({name}) => name.toLowerCase().indexOf(search) > -1);
    };

    return (
        <Panel id={id}>

            <PanelHeader
              left={[<HeaderButton onClick={openFilter}><Icon24Filter/></HeaderButton>]}>
              SecondSecond
            </PanelHeader>

            <Search value={searchValue} onChange={RefreshSearch}/>
                <div id="ProductList" className="ProductList">
                    {dataProducts &&
                        <ProductList data={products()} openModal={openModal}/>}
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
