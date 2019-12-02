import React, { useState, useEffect } from 'react';
import connect from '@vkontakte/vk-connect';
import View from '@vkontakte/vkui/dist/components/View/View';
import { IS_PLATFORM_ANDROID, IS_PLATFORM_IOS } from '@vkontakte/vkui/dist/lib/platform';
import ModalRoot from '@vkontakte/vkui/dist/components/ModalRoot/ModalRoot';
import ModalPage from '@vkontakte/vkui/dist/components/ModalPage/ModalPage';
import ModalPageHeader from '@vkontakte/vkui/dist/components/ModalPageHeader/ModalPageHeader';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout';
import FormLayoutGroup from '@vkontakte/vkui/dist/components/FormLayoutGroup/FormLayoutGroup';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Link from '@vkontakte/vkui/dist/components/Link/Link';
import Checkbox from '@vkontakte/vkui/dist/components/Checkbox/Checkbox';
import RangeSlider from '@vkontakte/vkui/dist/components/RangeSlider/RangeSlider';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import Icon24Dismiss from '@vkontakte/icons/dist/24/dismiss';
import Icon24Done from '@vkontakte/icons/dist/24/dismiss';

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
    const [dataProductsNEW, setDataProductsNEW] = useState(1);

    const [minPriceChange, setMinPriceChange] = useState(0);
    const [maxPriceChange, setMaxPriceChange] = useState(12000);

    const MODAL_PAGE_PRODUCTINFO = "product-info";
    const MODAL_PAGE_FILTER = "filter";

    const LOCAL_SERVER = "192.168.0.106";

    let count = 6;

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
        serverRequest(`http://${LOCAL_SERVER}:8080/items/randomItems?amount=${20*count}`);

    }

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
