import React from 'react';

import { UISrefActive, UISref } from '@uirouter/react';

import router from './../../router';

// import { Invitation } from './../../types';

import { Current } from './../../generated/graphql';

import './nav.less';

interface Props {
    invitation: Current.Invitation;
}

interface State {
    isOpen: boolean;
    currentState: string;
}

export class Nav extends React.Component<Props, State> {

    public constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            currentState: this.stateMap[router.stateService.$current.name]
        };

        router.transitionService.onSuccess({to: '*'}, (trans) => {
            this.setState({
                currentState: this.stateMap[router.stateService.$current.name]
            });
        });
    }

    private isAdmin() {
        return this.props.invitation && this.props.invitation.role === 'ADMIN';
    }

    private toggleMenu = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    private stateMap = {
        rsvp: 'OSA',
        hittaHit: 'Hitta hit',
        tidProgram: 'Tid och program',
        kladkod: 'Klädkod',
        overnattning: 'Övernattning',
        onskelista: 'Önskelista',
        toastmaster: 'Toastmaster',
        praktiskInfo: 'Kontaktuppgifter',
        admin: 'Admin'
    };

    public render() {
        return (
            <>
                <div onClick={this.toggleMenu} className={`mobile-header ${this.state.isOpen ? 'open' : ''}`}>
                    <i className={`menu-icon fa ${ this.state.isOpen ? 'fa-times' : 'fa-bars' }`}></i>
                    <span className="current-state">{ this.state.currentState }</span>
                </div>
                <div className={`nav-wrapper ${this.state.isOpen ? 'open' : ''}`}>
                    <ul>
                        <li>
                            <UISrefActive class="active">
                                <UISref to="rsvp">
                                    <a onClick={this.toggleMenu}>OSA</a>
                                </UISref>
                            </UISrefActive>
                        </li>
                        <li>
                            <UISrefActive class="active">
                                <UISref to="hittaHit">
                                    <a onClick={this.toggleMenu}>Hitta hit</a>
                                </UISref>
                            </UISrefActive>
                        </li>
                        <li>
                            <UISrefActive class="active">
                                <UISref to="tidProgram">
                                    <a onClick={this.toggleMenu}>Tid och program</a>
                                </UISref>
                            </UISrefActive>
                        </li>
                        <li>
                            <UISrefActive class="active">
                                <UISref to="kladkod">
                                    <a onClick={this.toggleMenu}>Klädkod</a>
                                </UISref>
                            </UISrefActive>
                        </li>
                        <li>
                            <UISrefActive class="active">
                                <UISref to="overnattning">
                                    <a onClick={this.toggleMenu}>Övernattning</a>
                                </UISref>
                            </UISrefActive>
                        </li>
                        <li>
                            <UISrefActive class="active">
                                <UISref to="onskelista">
                                    <a onClick={this.toggleMenu}>Önskelista</a>
                                </UISref>
                            </UISrefActive>
                        </li>
                        <li>
                            <UISrefActive class="active">
                                <UISref to="toastmaster">
                                    <a onClick={this.toggleMenu}>Toastmaster</a>
                                </UISref>
                            </UISrefActive>
                        </li>
                        <li>
                            <UISrefActive class="active">
                                <UISref to="praktiskInfo">
                                    <a onClick={this.toggleMenu}>Kontaktuppgifter</a>
                                </UISref>
                            </UISrefActive>
                        </li>
                        {
                            this.isAdmin() ? (
                                <li>
                                    <UISrefActive class="active">
                                        <UISref to="admin">
                                            <a onClick={this.toggleMenu}>Admin</a>
                                        </UISref>
                                    </UISrefActive>
                                </li>
                            ) : null
                        }
                    </ul>
                </div>
            </>
        )
    }
}
