import React from 'react';

import './nav.less';

export class Nav extends React.Component {
    public render() {
        return (
            <div className="nav-wrapper">
                <ul>
                    <li>OSA</li>
                    <li>Hitta hit</li>
                    <li>Tid och program</li>
                    <li>Praktisk info</li>
                    <li>Klädkod</li>
                    <li>Övernattning</li>
                    <li>Toastmaster</li>
                </ul>
            </div>
        )
    }
}
