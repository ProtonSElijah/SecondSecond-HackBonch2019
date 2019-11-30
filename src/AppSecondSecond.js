import React, { useState, useEffect } from 'react';
import connect from '@vkontakte/vk-connect';
import View from '@vkontakte/vkui/dist/components/View/View';

import Main from './panels/Main';

import '@vkontakte/vkui/dist/vkui.css';
import './panels/Main.css';

const AppSecondSecond = () => {
    const [activePanel, setActivePanel] = useState('main');

    useEffect(() => {
        connect.subscribe(({ detail: { type, data }}) => {
            if (type === 'VKWebAppUpdateConfig') {
                const schemeAttribute = document.createAttribute('scheme');
                schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
                document.body.attributes.setNamedItem(schemeAttribute);
            }
        });
     /*   async function fetchData() {
            const user = await connect.sendPromise('VKWebAppGetUserInfo');
            setUser(user);
        }
        fetchData();*/
    }, []);

    const go = e => {
        setActivePanel(e.currentTarget.dataset.to);
    };

    return (
        <View activePanel={activePanel}>
            <Main id='main'/>
        </View>
    );
}

export default AppSecondSecond;
