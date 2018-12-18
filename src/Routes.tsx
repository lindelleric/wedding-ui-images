
import React from 'react';
import ReactDOM from 'react-dom';
import { UIRouter, UIView, pushStateLocationPlugin } from '@uirouter/react';

import { Rsvp } from './components/Rsvp';



// define your states
const states = [
  {
    name: 'rsvp',
    url: '/',
    component: Rsvp,
  },{
    name: 'rsvps',
    url: '/rsvp',
    component: () => <h1>yes?</h1>,
  },
];

// select your plugins
const plugins = [pushStateLocationPlugin];

export const Routes = () => {
    console.log('routes');
    return (

    <UIRouter plugins={plugins} states={states}>
        <UIView />
    </UIRouter>
)
}
// export class Routes extends React.Component {
//     render() {
//         return (
//             <UIRouter plugins={plugins} states={states}>
//                 <UIView />
//             </UIRouter>
//         )
//     }
// }
