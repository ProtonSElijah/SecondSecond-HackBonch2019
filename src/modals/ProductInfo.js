import React from 'react';
import { IS_PLATFORM_ANDROID, IS_PLATFORM_IOS } from '@vkontakte/vkui/dist/lib/platform';
import ModalPage from '@vkontakte/vkui/dist/components/ModalPage/ModalPage';
import ModalPageHeader from '@vkontakte/vkui/dist/components/ModalPageHeader/ModalPageHeader';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import Icon24Dismiss from '@vkontakte/icons/dist/24/dismiss';


const ProductInfo = ({toMainPanel, name, img, description, store, url, price, id}) => (
    <ModalPage
          id={id}
          onClose={toMainPanel}
          settlingHeight={300}
          header={
            <ModalPageHeader
              left={IS_PLATFORM_ANDROID && <HeaderButton onClick={toMainPanel}><Icon24Cancel /></HeaderButton>}
              right={IS_PLATFORM_IOS && <HeaderButton onClick={toMainPanel}><Icon24Dismiss /></HeaderButton>}>
              {name ? name : ""}
            </ModalPageHeader>
          }>
         <div className="ModalProduct">
            <img src={img}/>
            <div className="ModalProductDescription">{description}</div>
            <div className="ModalStore">{store}</div>
         </div>
          <FormLayout>
            <Button level="secondary" size="xl"
            component="a" href={url}>
                {price ? ("Купить за " + price + " руб.") : ""}
            </Button>
          </FormLayout>
        </ModalPage>
    );

export default ProductInfo;
