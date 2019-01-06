import React from 'react';

import { UISrefActive, UISref } from '@uirouter/react';

import './nav.less';

export class Nav extends React.Component {
    public render() {
        return (
            <div className="nav-wrapper">
                <ul>
                    <li>
                        <UISrefActive class="active">
                            <UISref to="rsvp">
                                <a>OSA</a>
                            </UISref>
                        </UISrefActive>
                    </li>
                    <li>
                        <UISrefActive class="active">
                            <UISref to="hittaHit">
                                <a>Hitta hit</a>
                            </UISref>
                        </UISrefActive>
                    </li>
                    <li>
                        <UISrefActive class="active">
                            <UISref to="tidProgram">
                                <a>Tid och program</a>
                            </UISref>
                        </UISrefActive>
                    </li>
                    <li>
                        <UISrefActive class="active">
                            <UISref to="praktiskInfo">
                                <a>Praktisk info</a>
                            </UISref>
                        </UISrefActive>
                    </li>
                    <li>
                        <UISrefActive class="active">
                            <UISref to="kladkod">
                                <a>Klädkod</a>
                            </UISref>
                        </UISrefActive>
                    </li>
                    <li>
                        <UISrefActive class="active">
                            <UISref to="overnattning">
                                <a>Övernattning</a>
                            </UISref>
                        </UISrefActive>
                    </li>
                    <li>
                        <UISrefActive class="active">
                            <UISref to="toastmaster">
                                <a>Toastmaster</a>
                            </UISref>
                        </UISrefActive>
                    </li>
                </ul>
            </div>
        )
    }
}
