import React from 'react';
import ModalPage from '@vkontakte/vkui/dist/components/ModalPage/ModalPage';
import ModalPageHeader from '@vkontakte/vkui/dist/components/ModalPageHeader/ModalPageHeader';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Select from '@vkontakte/vkui/dist/components/Select/Select';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import List from '@vkontakte/vkui/dist/components/List/List';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';

import Icon24Done from '@vkontakte/icons/dist/24/done';
import { IS_PLATFORM_ANDROID, IS_PLATFORM_IOS } from '@vkontakte/vkui/dist/lib/platform';

const Stores = ({id, onClose, onClick, stores, STORE_LIST, toggleStores}) => (
    <ModalPage
          id={id}
          onClose={onClose}
          settlingHeight={300}
          header={
            <ModalPageHeader
              right={<HeaderButton onClick={onClick}>{IS_PLATFORM_IOS ? 'Готово' : <Icon24Done />}</HeaderButton>}>
              Магазины
            </ModalPageHeader>
          }>
            <FormLayout>
                <Group>
                    <List>
                        {STORE_LIST.map( store =>
                            <Cell
                                data-store={store}
                                key={"STORE_LIST#" + store}
                                onClick={toggleStores}
                                asideContent={(stores.indexOf(store) != -1) ? "Добавлено" : ""}>
                                {store}
                            </Cell>
                        )}
                    </List>
                </Group>
            </FormLayout>
        </ModalPage>
);

export default Stores
