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

    useEffect(() => {
        connect.subscribe(({ detail: { type, data }}) => {
            if (type === 'VKWebAppUpdateConfig') {
                const schemeAttribute = document.createAttribute('scheme');
                schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
                document.body.attributes.setNamedItem(schemeAttribute);
            }
        });
        function serverRequest() {
            return fetch("https://192.168.43.76:8080/items", {
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

    const modalBack = () => {
        setActiveModal(null);
    };

    const openFilter = () => {
        setActiveModal(MODAL_PAGE_FILTER);
    };

    const onChangePrice = e => {
        setMinPriceChange(e[0]);
        setMaxPriceChange(e[1])
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
        <ModalPage
          id={MODAL_PAGE_PRODUCTINFO}
          header={
            <ModalPageHeader
              left={IS_PLATFORM_ANDROID && <HeaderButton onClick={modalBack}><Icon24Cancel /></HeaderButton>}
              right={IS_PLATFORM_IOS && <HeaderButton onClick={modalBack}><Icon24Dismiss /></HeaderButton>}
            >
              {nameProductModal ? nameProductModal : ""}
            </ModalPageHeader>
          }
          onClose={modalBack}
          settlingHeight={300}
        >
         <div className="ModalProduct">
            <img src={imgProductModal}/>
            <div className="ModalProductDescription">
                {descriptionProductModal}
            </div>
            <div className="ModalStore">
                {storeProductModal}
            </div>
         </div>

          <FormLayout>
            <Button level="secondary" size="xl"
            component="a" href={urlProductModal}
            >
            {priceProductModal ? ("Купить за " + priceProductModal) : ""}</Button>
          </FormLayout>

        </ModalPage>


        <ModalPage
          id={MODAL_PAGE_FILTER}
          header={
            <ModalPageHeader
              left={IS_PLATFORM_ANDROID && <HeaderButton onClick={modalBack}><Icon24Cancel /></HeaderButton>}
              right={<HeaderButton onClick={modalBack}>{IS_PLATFORM_IOS ? 'Готово' : <Icon24Done />}</HeaderButton>}>
              Критерии поиска
            </ModalPageHeader>
          }
          onClose={modalBack}
          settlingHeight={300}
        >

          <FormLayout>
            <RangeSlider onChange={onChangePrice}
                top={"Ценовой диапазон: " + minPriceChange + " - " + maxPriceChange}
                min={minPriceChange}
                max={maxPriceChange}
                step={1}
                defaultValue={[0, 12000]}
              />
              <div className="sizeCheckbox">
                  <Checkbox>XXS</Checkbox>
                  <Checkbox>XS</Checkbox>
                  <Checkbox>S</Checkbox>
                  <Checkbox>M</Checkbox>
              </div>
                <div className="sizeCheckbox">
                  <Checkbox>L</Checkbox>
                  <Checkbox>XL</Checkbox>
                  <Checkbox>XXL</Checkbox>
              </div>
          </FormLayout>

        </ModalPage>
      </ModalRoot>
    );

    const go = e => {
        setActivePanel(e.currentTarget.dataset.to);
    };

    return (
        <View activePanel={activePanel} modal={modal}>
            <Main id='main' openModal={openModal} dataProducts={dataProducts} openFilter={openFilter}/>
        </View>
    );
}

export default AppSecondSecond;
