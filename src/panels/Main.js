import React, { useState, useEffect } from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';

const Main = ({id}) => {
    return (
        <Panel id={id}>
            <PanelHeader>SecondSecond</PanelHeader>
            <div className="Options">

            </div>
            <div className="ProductList">
                <div className="ProductCell"></div>
                <div className="ProductCell"></div>
                <div className="ProductCell"></div>
                <div className="ProductCell"></div>
                <div className="ProductCell"></div>
                <div className="ProductCell"></div>
                <div className="ProductCell"></div>
                <div className="ProductCell"></div>
                <div className="ProductCell"></div>
                <div className="ProductCell"></div>
                <div className="ProductCell"></div>
            </div>
        </Panel>
    );
};

export default Main;
