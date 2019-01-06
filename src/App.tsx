import React from 'react';

import './styles/main.less';
import './components/infoViews/info.less';
import 'normalize.css';

import { UIRouter, UIView } from '@uirouter/react';
import router from './router';

import { Nav } from './components/Nav';
import { Divider } from './components/common/Divider';

export class App extends React.Component {
    public render() {
        return (
            <UIRouter router={router}>
                <div className="page-wrapper">
                    <Nav />
                    <h1 className="main-page-title">Eric &#91;Malin</h1> {/* &#91;  &#162; */}
                    <h3 className="main-page-subheader">11 Maj 2019 | Köpmansmagasinet Smygehamn | 15:00 </h3>
                    {/*<Divider />*/}
                    <UIView/>
                </div>
            </UIRouter>
        )
    }
}


