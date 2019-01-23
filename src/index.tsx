import React from 'react';
import { render } from 'react-dom';
import router from './router';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import { UIRouter, UIView } from '@uirouter/react';

export const apolloClient = new ApolloClient({
     uri: '/graphql',
     credentials: 'include', // TODO: set to 'same-origin' when backend is on the same domain as frontend
     request: async (operation) => {
         const token = localStorage.getItem('token');
         if (token) {
             operation.setContext({
                 headers: {
                     authorization: `Bearer ${token}`
                 }
             });
         }
     }
 });

import { App } from './App';

render(
    <ApolloProvider client={apolloClient}>
        <UIRouter router={router}>
            <App />
        </UIRouter>
    </ApolloProvider>,
    document.getElementById('root'),
);

