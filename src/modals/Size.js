import React from 'react';
import ModalPage from '@vkontakte/vkui/dist/components/ModalPage/ModalPage';
import ModalPageHeader from '@vkontakte/vkui/dist/components/ModalPageHeader/ModalPageHeader';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Select from '@vkontakte/vkui/dist/components/Select/Select';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import List from '@vkontakte/vkui/dist/components/List/List';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Button from '@vkontakte/vkui/dist/components/Button/Button';

import Icon24Done from '@vkontakte/icons/dist/24/done';
import { IS_PLATFORM_ANDROID, IS_PLATFORM_IOS } from '@vkontakte/vkui/dist/lib/platform';


const Size = ({id, onClose, onClick, toggleSizes, sizes, SIZES_LIST, refreshList}) => (
    <ModalPage
          id={id}
          onClose={onClose}
          settlingHeight={300}
          header={
            <ModalPageHeader
              right={<HeaderButton onClick={onClick}>{IS_PLATFORM_IOS ? 'Готово' : <Icon24Done />}</HeaderButton>}>
              Размер одежды
            </ModalPageHeader>
          }>
            <FormLayout>
               <Button level="secondary" size="xl" data-list={id} onClick={refreshList}>Добавить / очистить все</Button>
                <Group>
                    <List>
                        {SIZES_LIST.map( size =>
                            <Cell
                                data-size={size}
                                key={"SIZES_LIST#" + size}
                                onClick={toggleSizes}
                                asideContent={(sizes.indexOf(size) != -1) ? "Добавлено" : ""}>
                                {size}
                            </Cell>
                        )}
                    </List>
                </Group>
            </FormLayout>
        </ModalPage>
);

export default Size;
