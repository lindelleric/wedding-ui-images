
import React from 'react';
import ReactDOM from 'react-dom';

import { UIRouterReact, TargetState, pushStateLocationPlugin, servicesPlugin, hashLocationPlugin } from '@uirouter/react';

import { Rsvp } from './components/Rsvp';
import { Login } from './components/Login';
import { HittaHit } from './components/infoViews/HittaHit/HittaHit';
import { TidProgram } from './components/infoViews/TidProgram/TidProgram';
import { PraktiskInfo } from './components/infoViews/PraktiskInfo/PraktiskInfo';
import { Kladkod } from './components/infoViews/Kladkod/Kladkod';
import { Overnattning } from './components/infoViews/Overnattning/Overnattning';
import { Onskelista } from './components/infoViews/Onskelista/Onskelista';
import { Toastmaster } from './components/infoViews/Toastmaster/Toastmaster';
import { Admin } from './components/Admin/Admin';
import { rootState } from './App';

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
        name: 'rsvp',
        url: '/rsvp',
        component: Rsvp,
    },
    {
        name: 'login',
        url: '/code',
        component: Login,
    },
    {
        name: 'hittaHit',
        url: '/hitta-hit',
        component: HittaHit,
    },
    {
        name: 'tidProgram',
        url: '/tid-och-program',
        component: TidProgram,
    },
    {
        name: 'praktiskInfo',
        url: '/praktisk-info',
        component: PraktiskInfo,
    },
    {
        name: 'kladkod',
        url: '/kladkod',
        component: Kladkod,
    },
    {
        name: 'overnattning',
        url: '/overnattning',
        component: Overnattning,
    },
    {
        name: 'onskelista',
        url: '/onskelista',
        component: Onskelista,
    },
    {
        name: 'toastmaster',
        url: '/toastmaster',
        component: Toastmaster,
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
        me {
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

    return apolloClient.query<{ me: Invitation }>({
            query: GET_INVITES
        })
        .then(({ data }) => {
            const { me } = data;

            if (name === 'admin') {
                if (me.role !== 'ADMIN') {
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
