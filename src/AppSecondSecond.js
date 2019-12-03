import React, { useState, useEffect } from 'react';
import connect from '@vkontakte/vk-connect';
import View from '@vkontakte/vkui/dist/components/View/View';
import ModalRoot from '@vkontakte/vkui/dist/components/ModalRoot/ModalRoot';

import { IS_PLATFORM_ANDROID, IS_PLATFORM_IOS } from '@vkontakte/vkui/dist/lib/platform';
import ModalPage from '@vkontakte/vkui/dist/components/ModalPage/ModalPage';
import ModalPageHeader from '@vkontakte/vkui/dist/components/ModalPageHeader/ModalPageHeader';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout';
import Checkbox from '@vkontakte/vkui/dist/components/Checkbox/Checkbox';
import RangeSlider from '@vkontakte/vkui/dist/components/RangeSlider/RangeSlider';
import SelectMimicry from '@vkontakte/vkui/dist/components/SelectMimicry/SelectMimicry';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import Icon24Done from '@vkontakte/icons/dist/24/dismiss';
import Select from '@vkontakte/vkui/dist/components/Select/Select';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import List from '@vkontakte/vkui/dist/components/List/List';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';

import Main from './panels/Main';
import ProductInfo from './modals/ProductInfo';
import Filters from './modals/Filters';
import Size from './modals/Size';
import Stores from './modals/Stores';

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
    const MODAL_PAGE_SIZE = "size";
    const MODAL_PAGE_STORES = "stores";

    const SIZES_LIST = ["XXS", "XS", "S", "M", "L", "XL", "XXL"];
    const [sizes, setSizes] = useState(SIZES_LIST.slice());
    const [stores, setStores] = useState(["Ромашкино", "Костров"]);

    //стартовые константы, которые нужно загружать
    const [STORE_LIST, setSTORE_LIST] = useState(["Ромашкино", "Костров"]);
    const [MIN_PRICE, setMIN_PRICE] = useState(0);
    const [MAX_PRICE, setMAX_PRICE] = useState(12000);

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
        let a = dataProducts.slice();
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

    const onChangePrice = e => {
        setMinPriceChange(e[0]);
        setMaxPriceChange(e[1]);
    };

    //Открытие модального окна продукта и установка его свойств
    const toProduct = e => {
        setNameProductModal(e.currentTarget.dataset.name);
        setPriceProductModal(e.currentTarget.dataset.price);
        setImgProductModal(e.currentTarget.dataset.img);
        setDescriptionProductModal(e.currentTarget.dataset.description);
        setUrlProductModal(e.currentTarget.dataset.url);
        setStoreProductModal(e.currentTarget.dataset.store);
        setActiveModal(MODAL_PAGE_PRODUCTINFO);
    };

    //Переключатели между модальными окнами
    const toSize = e => {setActiveModal(MODAL_PAGE_SIZE)};
    const toFilter = e => {
        if (sizes.length == 0) {setSizes(SIZES_LIST)}
        if (stores.length == 0) {setStores(STORE_LIST)}
        setActiveModal(MODAL_PAGE_FILTER);
    };
    const toStores = e => {setActiveModal(MODAL_PAGE_STORES)};

    //Переключатель магазинов
    const toggleStores = e => {
        let s = stores.slice();
        if (s.indexOf(e.currentTarget.dataset.store) != -1)
            s.splice(s.indexOf(e.currentTarget.dataset.store), 1);
        else s.push(e.currentTarget.dataset.store);
        setStores(s);
    };

    //Переключатель размеров и сортировщик
    const toggleSizes = e => {
        let s = sizes.slice();
        if (s.indexOf(e.currentTarget.dataset.size) != -1)
            s.splice(s.indexOf(e.currentTarget.dataset.size), 1);
        else s.push(e.currentTarget.dataset.size);
        let newS = [];
        SIZES_LIST.forEach(function(size) {
            if (s.indexOf(size) != -1) newS.push(size);
        });
        setSizes(newS);
    };

    //Добавить / очистить все
    const refreshList = e => {
        let list = e.currentTarget.dataset.list;
        if (list == MODAL_PAGE_SIZE) {
            if (sizes.length == 0) {
                setSizes(SIZES_LIST);
            } else setSizes(sizes.splice(sizes.length));
        }
        else if (list == MODAL_PAGE_STORES) {
            if (stores.length == 0) {
                setStores(STORE_LIST);
            } else setStores(stores.splice(stores.length));
        }
    };


    //Коллекция модальных окон
    //ProductInfo - окно продукта
    //Filters - коллекция фильтров
    //Size - коллекция размеров
    const modal = (
      <ModalRoot activeModal={activeModal}>
       <ProductInfo
            onClose={modalBack}
            modalBack={modalBack}
            name={nameProductModal}
            img={imgProductModal}
            description={descriptionProductModal}
            store={storeProductModal}
            url={urlProductModal}
            price={priceProductModal}
            id={MODAL_PAGE_PRODUCTINFO}/>
       <Filters
           id={MODAL_PAGE_FILTER}
           onClose={modalBack}
           onClick={modalBack}
           onChangePrice={onChangePrice}
           minPriceChange={minPriceChange}
           maxPriceChange={maxPriceChange}
           toSize={toSize}
           toStores={toStores}
           sizes={sizes}
           stores={stores}
           MIN_PRICE={MIN_PRICE}
           MAX_PRICE={MAX_PRICE}/>
       <Size
           id={MODAL_PAGE_SIZE}
           onClose={toFilter}
           toggleSizes={toggleSizes}
           sizes={sizes}
           SIZES_LIST={SIZES_LIST}
           onClick={toFilter}
           refreshList={refreshList}/>
        <Stores
            id={MODAL_PAGE_STORES}
            onClose={toFilter}
            onClick={toFilter}
            toggleStores={toggleStores}
            stores={stores}
            STORE_LIST={STORE_LIST}
            refreshList={refreshList}/>
      </ModalRoot>
    );

    //Коллекция панелей
    //Main - главный экран
    return (
        <View activePanel={activePanel} modal={modal}>
            <Main
                id='main'
                toProduct={toProduct}
                dataProducts={dataProducts}
                toFilter={toFilter}
                dataUpload={dataUpload}/>
        </View>
    );
}

export default AppSecondSecond;
