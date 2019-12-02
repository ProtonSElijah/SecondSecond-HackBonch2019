import React, { useState, useEffect } from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Search from '@vkontakte/vkui/dist/components/Search/Search';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Icon24Filter from '@vkontakte/icons/dist/24/filter';

import ProductList from '../components/ProductList';

const Main = ({id, openModal, dataProducts, openFilter, dataUpload}) => {
    const [searchValue, setSearchValue] = useState("");

    const products = () => {
      const search = searchValue.toLowerCase();
      return dataProducts.filter(({name}) => name.toLowerCase().indexOf(search) > -1);
    };

    const uploadData = e => {
        let elem = e.currentTarget;
        console.log("scrollTop: " + elem.scrollTop);
        console.log("Граница: " + (elem.scrollHeight - elem.clientHeight*2));
        if (elem.scrollHeight - elem.clientHeight*2 <= elem.scrollTop) {
            dataUpload();
        }
    };

    return (
        <Panel id={id}>
            <PanelHeader
                left={
                    <HeaderButton key="filter" onClick={openFilter}><Icon24Filter/></HeaderButton>
                }>
              SecondSecond
            </PanelHeader>
            <Search value={searchValue} onChange={e => setSearchValue(e)} placeholder="Поиск по названию"/>
                <div id="ProductList" className="ProductList" onScroll={uploadData}>
                    {dataProducts &&
                        <ProductList data={products()} openModal={openModal}/>}
                </div>
        </Panel>
    );
};

export default Main;
