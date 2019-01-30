import React from 'react';

import { UISrefActive, UISref } from '@uirouter/react';

// import { Invitation } from './../../types';

import { Current } from './../../generated/graphql';

import './nav.less';

export class Nav extends React.Component<{ invitation: Current.Invitation }> {
    public isAdmin() {
        console.log(this.props);
        return this.props.invitation && this.props.invitation.role === 'ADMIN';
    }

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
                            <UISref to="onskelista">
                                <a>Önskalista</a>
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
                    {
                        this.isAdmin() ? (
                            <li>
                                <UISrefActive class="active">
                                    <UISref to="admin">
                                        <a>Admin</a>
                                    </UISref>
                                </UISrefActive>
                            </li>
                        ) : null
                    }
                </ul>
            </div>
        )
    }
}
