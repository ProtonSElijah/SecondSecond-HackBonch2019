import React from 'react';
import { IS_PLATFORM_ANDROID, IS_PLATFORM_IOS } from '@vkontakte/vkui/dist/lib/platform';
import ModalPage from '@vkontakte/vkui/dist/components/ModalPage/ModalPage';
import ModalPageHeader from '@vkontakte/vkui/dist/components/ModalPageHeader/ModalPageHeader';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout';
import Checkbox from '@vkontakte/vkui/dist/components/Checkbox/Checkbox';
import RangeSlider from '@vkontakte/vkui/dist/components/RangeSlider/RangeSlider';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import Icon24Done from '@vkontakte/icons/dist/24/dismiss';


const Filters = ({modalBack, onChangePrice, minPriceChange, maxPriceChange, id}) => (
        <ModalPage
          id={id}
          onClose={modalBack}
          settlingHeight={300}
          header={
            <ModalPageHeader
              left={IS_PLATFORM_ANDROID && <HeaderButton onClick={modalBack}><Icon24Cancel /></HeaderButton>}
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
                defaultValue={[0, 12000]}
              />
              <div className="sizeCheckbox">
                  <Checkbox name="size" value="XXS">XXS</Checkbox>
                  <Checkbox name="size" value="XS">XS</Checkbox>
                  <Checkbox name="size" value="S">S</Checkbox>
                  <Checkbox name="size" value="M">M</Checkbox>
              </div>
                <div className="sizeCheckbox">
                  <Checkbox name="size" value="L">L</Checkbox>
                  <Checkbox name="size" value="XL">XL</Checkbox>
                  <Checkbox name="size" value="XXL">XXL</Checkbox>
              </div>
          </FormLayout>

        </ModalPage>
    );

export default Filters;
