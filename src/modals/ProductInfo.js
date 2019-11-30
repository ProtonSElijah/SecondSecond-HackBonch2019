import React from 'react';
import { IS_PLATFORM_ANDROID, IS_PLATFORM_IOS } from '@vkontakte/vkui/dist/lib/platform';
import ModalRoot from '@vkontakte/vkui/dist/components/ModalRoot/ModalRoot';
import ModalPage from '@vkontakte/vkui/dist/components/ModalPage/ModalPage';
import ModalPageHeader from '@vkontakte/vkui/dist/components/ModalPageHeader/ModalPageHeader';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout';
import FormLayoutGroup from '@vkontakte/vkui/dist/components/FormLayoutGroup/FormLayoutGroup';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import Icon24Dismiss from '@vkontakte/icons/dist/24/dismiss';


const modal = ({activeModal, modalBack}) => (
  <ModalRoot activeModal={activeModal}>
    <ModalPage
      id={"product-info"}
      header={
        <ModalPageHeader
          left={IS_PLATFORM_ANDROID && <HeaderButton onClick={modalBack}><Icon24Cancel /></HeaderButton>}
          right={IS_PLATFORM_IOS && <HeaderButton onClick={modalBack}><Icon24Dismiss /></HeaderButton>}
        >
          Выберите страну
        </ModalPageHeader>
      }
      onClose={modalBack}
      settlingHeight={80}
    >
      <FormLayout>

        <FormLayoutGroup>
          <Button level="secondary" size="xl">Выбор страны</Button>
          <Button level="secondary" size="xl">Просмотры истории</Button>
          <Button level="secondary" size="xl">Информация о пользователе</Button>
        </FormLayoutGroup>

      </FormLayout>
    </ModalPage>
  </ModalRoot>
);

export default modal;
