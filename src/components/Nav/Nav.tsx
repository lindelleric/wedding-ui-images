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

    private closeMenu = () => {
        this.setState({
            isOpen: false
        });
    }

    private stateMap = {
        bilder: 'Bilder',
        filmer: 'Filmer',
        admin: 'Admin',
        tack: 'Tack'
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
                                <UISref to="tack">
                                    <a onClick={this.closeMenu}>Tack</a>
                                </UISref>
                            </UISrefActive>
                        </li>
                        <li>
                            <UISrefActive class="active">
                                <UISref to="bilder">
                                    <a onClick={this.closeMenu}>Bilder</a>
                                </UISref>
                            </UISrefActive>
                        </li>
                        <li>
                            <UISrefActive class="active">
                                <UISref to="filmer">
                                    <a onClick={this.closeMenu}>Filmer</a>
                                </UISref>
                            </UISrefActive>
                        </li>
                        {
                            this.isAdmin() ? (
                                <li>
                                    <UISrefActive class="active">
                                        <UISref to="admin">
                                            <a onClick={this.closeMenu}>Admin</a>
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
