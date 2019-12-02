import React, { useState, useEffect } from 'react';
import connect from '@vkontakte/vk-connect';
import View from '@vkontakte/vkui/dist/components/View/View';
import ModalRoot from '@vkontakte/vkui/dist/components/ModalRoot/ModalRoot';

import Main from './panels/Main';
import Filters from './modals/Filters';
import ProductInfo from './modals/ProductInfo';

import '@vkontakte/vkui/dist/vkui.css';
import './panels/Main.css';

const AppSecondSecond = () => {
    const [activePanel, setActivePanel] = useState('main');
    const [activeModal, setActiveModal] = useState(null);

    const [nameProductModal, setNameProductModal] = useState(null);
    const [priceProductModal, setPriceProductModal] = useState(null);
    const [imgProductModal, setImgProductModal] = useState(null);
    const [descriptionProductModal, setDescriptionProductModal] = useState(null);
    const [storeProductModal, setStoreProductModal] = useState(null);
    const [urlProductModal, setUrlProductModal] = useState(null);

    const [dataProducts, setDataProducts] = useState(null);

    const [minPriceChange, setMinPriceChange] = useState(0);
    const [maxPriceChange, setMaxPriceChange] = useState(12000);

    const MODAL_PAGE_PRODUCTINFO = "product-info";
    const MODAL_PAGE_FILTER = "filter";

    const LOCAL_SERVER = "192.168.0.106";

    useEffect(() => {
        connect.subscribe(({ detail: { type, data }}) => {
            if (type === 'VKWebAppUpdateConfig') {
                const schemeAttribute = document.createAttribute('scheme');
                schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
                document.body.attributes.setNamedItem(schemeAttribute);
            }
        });
        serverRequest(`http://${LOCAL_SERVER}:8080/items/randomItems?amount=20`);
    }, []);

    const serverRequest = (request) => {
        return fetch(request, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
        })
        .then(response => response.json())
        .then(data => setDataProducts(data));
    };

    const dataUpload = () => {
        let a = dataProducts;
        fetch(`http://${LOCAL_SERVER}:8080/items/randomItems?amount=20`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
        })
        .then(response => response.json())
        .then(data => setDataProducts(a.concat(data)));
    };

    const modalBack = () => {
        if (activeModal == MODAL_PAGE_FILTER) serverRequest (`http://${LOCAL_SERVER}:8080/items/priceRange?min_price=${minPriceChange.toString()}&max_price=${maxPriceChange.toString()}`);

        setActiveModal(null);
    };

    const openFilter = () => {
        setActiveModal(MODAL_PAGE_FILTER);
    };

    const onChangePrice = e => {
        setMinPriceChange(e[0]);
        setMaxPriceChange(e[1]);
    };

    const openModal = e => {
        setNameProductModal(e.currentTarget.dataset.name);
        setPriceProductModal(e.currentTarget.dataset.price);
        setImgProductModal(e.currentTarget.dataset.img);
        setDescriptionProductModal(e.currentTarget.dataset.description);
        setUrlProductModal(e.currentTarget.dataset.url);
        setStoreProductModal(e.currentTarget.dataset.store);
        setActiveModal(MODAL_PAGE_PRODUCTINFO);
    };

    const modal = (
      <ModalRoot activeModal={activeModal}>
       <ProductInfo
           modalBack={modalBack}
           name={nameProductModal}
           img={imgProductModal}
           description={descriptionProductModal}
           store={storeProductModal}
           url={urlProductModal}
           price={priceProductModal}
           id={MODAL_PAGE_PRODUCTINFO}
       />

        <Filters
            modalBack={modalBack}
            onChangePrice={onChangePrice}
            minPriceChange={minPriceChange}
            maxPriceChange={maxPriceChange}
            id={MODAL_PAGE_FILTER}
        />
      </ModalRoot>
    );

    return (
        <View activePanel={activePanel} modal={modal}>
            <Main id='main' openModal={openModal} dataProducts={dataProducts} openFilter={openFilter} dataUpload={dataUpload}/>
        </View>
    );
}

export default AppSecondSecond;
