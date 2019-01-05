import React from 'react';

import './styles/main.less';
import 'normalize.css';

import { UIRouter, UIView } from '@uirouter/react';
import router from './router';

export class App extends React.Component {
    public render() {
        return (
            <UIRouter router={router}>
                {/* NAV */}
                <div className="page-wrapper">
                    <h1 className="main-page-title">Eric &#162; Malin</h1> {/* &#91; */}
                    <UIView/>
                </div>
            </UIRouter>
        )
    }
}


