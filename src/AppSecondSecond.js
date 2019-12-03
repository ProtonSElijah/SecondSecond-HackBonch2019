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
    const MODAL_PAGE_STORE = "store";

    const [sizes, setSizes] = useState(["XXS", "XS", "S", "M", "L", "XL", "XXL"]);

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
        console.log(activeModal);
        if (activeModal == MODAL_PAGE_FILTER) serverRequest (`http://${LOCAL_SERVER}:8080/items/priceRange?min_price=${minPriceChange.toString()}&max_price=${maxPriceChange.toString()}`);
        setActiveModal(null);
    };

    const openFilter = () => {
        setActiveModal(MODAL_PAGE_FILTER);
        console.log(activeModal);
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

    const toSize = e => {setActiveModal(MODAL_PAGE_SIZE)};
    const toFilter = e => {setActiveModal(MODAL_PAGE_FILTER)};

    const switching = e => {
        let s = sizes.slice();
        if (s.indexOf(e.currentTarget.dataset.size) != -1) s.splice(s.indexOf(e.currentTarget.dataset.size), 1);
        else s.push(e.currentTarget.dataset.size);
        let newS = [];
        if (s.indexOf("XXS") != -1) newS.push("XXS");
        if (s.indexOf("XS") != -1) newS.push("XS");
        if (s.indexOf("S") != -1) newS.push("S");
        if (s.indexOf("M") != -1) newS.push("M");
        if (s.indexOf("L") != -1) newS.push("L");
        if (s.indexOf("XL") != -1) newS.push("XL");
        if (s.indexOf("XXL") != -1) newS.push("XXL");
        setSizes(newS);
    };

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

        <ModalPage
          id={MODAL_PAGE_FILTER}
          onClose={modalBack}
          settlingHeight={300}
          header={
            <ModalPageHeader
              right={<HeaderButton onClick={modalBack}>{IS_PLATFORM_IOS ? 'Готово' : <Icon24Done />}</HeaderButton>}>
              Критерии поиска
            </ModalPageHeader>
          }>
          <FormLayout>
            <RangeSlider onChange={onChangePrice}
                top={"Ценовой диапазон: " + minPriceChange + " - " + maxPriceChange}
                min={0}
                max={12000}
                step={1}
                defaultValue={[0, 12000]}/>
              <SelectMimicry
                  top="Выберите размеры"
                  placeholder={sizes.toString()}
                  onClick={toSize}>
                </SelectMimicry>
                <SelectMimicry
                  top="Выберите магазины"
                  placeholder={sizes.toString()}
                  onClick={toSize}>
                </SelectMimicry>
          </FormLayout>
        </ModalPage>

        <ModalPage
          id={MODAL_PAGE_SIZE}
          onClose={toFilter}
          settlingHeight={300}
          header={
            <ModalPageHeader
              right={<HeaderButton onClick={toFilter}>{IS_PLATFORM_IOS ? 'Готово' : <Icon24Done />}</HeaderButton>}>
              Размер одежды
            </ModalPageHeader>
          }>
          <FormLayout>
            <Group>
                <List>
                  <Cell
                   data-size="XXS"
                    onClick={switching}
                    asideContent={(sizes.indexOf("XXS") != -1) ? "Добавлено" : ""}>
                    XXS
                  </Cell>
                  <Cell
                   data-size="XS"
                    onClick={switching}
                    asideContent={(sizes.indexOf("XS") != -1) ? "Добавлено" : ""}>
                    XS
                  </Cell>
                  <Cell
                   data-size="S"
                    onClick={switching}
                    asideContent={(sizes.indexOf("S") != -1) ? "Добавлено" : ""}>
                    S
                  </Cell>
                  <Cell
                   data-size="M"
                    onClick={switching}
                    asideContent={(sizes.indexOf("M") != -1) ? "Добавлено" : ""}>
                    M
                  </Cell>
                  <Cell
                   data-size="L"
                    onClick={switching}
                    asideContent={(sizes.indexOf("L") != -1) ? "Добавлено" : ""}>
                    L
                  </Cell>
                  <Cell
                   data-size="XL"
                    onClick={switching}
                    asideContent={(sizes.indexOf("XL") != -1) ? "Добавлено" : ""}>
                    XL
                  </Cell>
                  <Cell
                    data-size="XXL"
                    onClick={switching}
                    asideContent={(sizes.indexOf("XXL") != -1) ? "Добавлено" : ""}>
                    XXL
                  </Cell>
                </List>
              </Group>
          </FormLayout>
        </ModalPage>

      </ModalRoot>
    );

    return (
        <View activePanel={activePanel} modal={modal}>
            <Main
                id='main'
                openModal={openModal}
                dataProducts={dataProducts}
                openFilter={openFilter}
                dataUpload={dataUpload}/>
        </View>
    );
}

export default AppSecondSecond;
