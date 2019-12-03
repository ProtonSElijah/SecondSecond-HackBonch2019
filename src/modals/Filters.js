import React, {useState, useEffect} from 'react';
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


const Filters = ({id, onClose, onClick, onChangePrice, minPriceChange, maxPriceChange, toSize, sizes, toStores, stores, MIN_PRICE, MAX_PRICE}) => {
    const[minPriceDynamic, setMinPriceDynamic] = useState(null);
    const[maxPriceDynamic, setMaxPriceDynamic] = useState(null);

    useEffect(() => {
        setMaxPriceDynamic(maxPriceChange);
        setMinPriceDynamic(minPriceChange);
    }, []);

    return (
        <ModalPage
          id={id}
          onClose={onClose}
          settlingHeight={300}
          header={
            <ModalPageHeader
              right={<HeaderButton onClick={onClick}>{IS_PLATFORM_IOS ? 'Готово' : <Icon24Done />}</HeaderButton>}>
              Критерии поиска
            </ModalPageHeader>
          }>
          <FormLayout>
                <RangeSlider onChange={onChangePrice}
                    top={"Ценовой диапазон: " + minPriceChange + " - " + maxPriceChange}
                    min={MIN_PRICE}
                    max={MAX_PRICE}
                    step={1}
                    defaultValue={[minPriceDynamic, maxPriceDynamic]}/>
                  <SelectMimicry
                      top="Выберите размеры"
                      placeholder={sizes.toString()}
                      onClick={toSize}>
                    </SelectMimicry>
                    <SelectMimicry
                      top="Выберите магазины"
                      placeholder={"Выбрано " + stores.length}
                      onClick={toStores}>
                    </SelectMimicry>
              </FormLayout>
        </ModalPage>
    );
}

export default Filters;
