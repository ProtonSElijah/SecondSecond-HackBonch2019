import React, { useState, useEffect } from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Search from '@vkontakte/vkui/dist/components/Search/Search';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Icon24Filter from '@vkontakte/icons/dist/24/filter';

import ProductList from '../components/ProductList';

const Main = ({id, toProduct, dataProducts, toFilter, dataUpload, onChangeNameSearch, nameSearch}) => {
    const uploadData = e => {
        let elem = e.currentTarget;
        if (elem.scrollHeight - elem.clientHeight*2 <= elem.scrollTop) {
            dataUpload();
        }
    };

    return (
        <Panel id={id}>
            <PanelHeader
                left={
                    <HeaderButton key="filter" onClick={toFilter}><Icon24Filter/></HeaderButton>
                }>
              SecondSecond
            </PanelHeader>
            <Search value={nameSearch} onChange={onChangeNameSearch} placeholder="Поиск по названию и категории"/>
                <div id="ProductList" className="ProductList" onScroll={uploadData}>
                    {dataProducts &&
                        <ProductList data={dataProducts} toProduct={toProduct}/>}
                </div>
        </Panel>
    );
};

export default Main;
