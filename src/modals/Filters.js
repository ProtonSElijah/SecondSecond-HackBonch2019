import React, {useState} from 'react';
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


const Filters = ({modalBack, onChangePrice, minPriceChange, maxPriceChange, id}) => {
    const [sizes, setSizes] = useState(["XXS", "XS", "S", "M", "L", "XL", "XXL"]);

    return (
        <ModalPage
          id={id}
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
                  placeholder="Не выбрана"
                  onClick={alert("s")}>

                </SelectMimicry>
          </FormLayout>

        </ModalPage>
    );
}

export default Filters;
