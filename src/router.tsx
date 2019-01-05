
import React from 'react';
import ReactDOM from 'react-dom';

import { UIRouterReact, pushStateLocationPlugin, servicesPlugin, hashLocationPlugin } from '@uirouter/react';

import { Rsvp } from './components/Rsvp';
import { Login } from './components/Login';

const router = new UIRouterReact();

router.plugin(servicesPlugin);
router.plugin(pushStateLocationPlugin);


// TODO: Gör snyggare. Decorators?
const states = [
  {
    name: 'rsvp',
    url: '/',
    component: Rsvp,
  },{
    name: 'login',
    url: '/login',
    component: Login,
  },{
    name: 'notFound',
    url: '/404',
    component: () => <h1>Sidan hittades inte</h1>,
  },
];

states.forEach(state => router.stateRegistry.register(state));

router.urlService.rules.initial({ state: 'rsvp' });
router.urlService.rules.otherwise({ state: 'notFound' });

export default router;
