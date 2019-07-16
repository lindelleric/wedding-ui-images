
import React from 'react';
import ReactDOM from 'react-dom';

import { UIRouterReact, TargetState, pushStateLocationPlugin, servicesPlugin, hashLocationPlugin } from '@uirouter/react';

import { rootState } from './App';
import { Login } from './components/Login';
import { Bilder } from './components/Bilder/Bilder';
import { Filmer } from './components/Filmer/Filmer';
import { Tack } from './components/Tack/Tack';
import { Admin } from './components/Admin/Admin';

import { Invitation } from './types';

import { apolloClient } from './';
import gql from 'graphql-tag';

const router = new UIRouterReact();

router.plugin(servicesPlugin);
router.plugin(pushStateLocationPlugin);

// TODO: Gör snyggare. Decorators?
const states = [
    rootState,
    {
        name: 'login',
        url: '/code',
        component: Login,
    },
    {
        name: 'tack',
        url: '/tack',
        component: Tack,
    },
    {
        name: 'bilder',
        url: '/bilder',
        component: Bilder,
    },
    {
        name: 'filmer',
        url: '/filmer',
        component: Filmer,
    },
    {
        name: 'admin',
        url: '/admin',
        component: Admin,
    },
    {
        name: 'notFound',
        url: '/404',
        component: () => <h1>Sidan hittades inte</h1>,
    },
    {
        name: 'accessDenied',
        url: '/403',
        component: () => <h1>Du får inte se denna sidan</h1>,
    },
];

states.forEach(state => router.stateRegistry.register(state));

const GET_INVITES = gql`
    {
        invitation {
            id
            role
        }
    }
`;

router.transitionService.onBefore({}, (transition) => {
    const stateService = transition.router.stateService;
    const { name } = transition.to();

    // Allow login
    if (name === 'login') {
        return true;
    }

    return apolloClient.query<{ invitation: Invitation }>({
            query: GET_INVITES
        })
        .then(({ data }) => {
            const { invitation } = data;

            if (name === 'admin') {
                if (invitation.role !== 'ADMIN') {
                    return stateService.target('403');
                } else {
                    return true;
                }
            }

            return true;
        })
        .catch(() => stateService.target('login'));
});


// router.urlService.rules.initial({ state: 'rsvp' });
router.urlService.rules.otherwise({ state: 'notFound' });

export default router;
