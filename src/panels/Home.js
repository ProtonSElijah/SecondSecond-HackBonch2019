import React, { useState, useEffect } from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';

const Swipe = ({id}) => {
    return (
        <Panel id={id}>
            <PanelHeader>SecondSecond</PanelHeader>
        </Panel>
    );
};

export default Swipe;
