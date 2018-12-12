import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import React from 'react';
import { render } from 'react-dom';

 const client = new ApolloClient({
     uri: 'http://localhost:8080/graphql',
     credentials: 'include', // TODO: set to 'same-origin' when backend is on the same domain as frontend
     request: async (operation) => {
         operation.setContext({
             headers: {
                 authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbnZpdGF0aW9uSWQiOiI3MjY2NTEyZi1lMDEzLTRiNmQtODhlNy02MDAyZjNkNzI1NDAiLCJpYXQiOjE1MzUxMjUzOTksImV4cCI6MTU2NjY4Mjk5OX0.jzIhYSy07ECCOBVHmtyfWkee8w2XZ8WMZI2Z-1ROXcg'// `Bearer ${localStorage.getItem('token')}`
             }
         })
     }
 });

console.log('client', client);

import { First } from './First';

render(
    <ApolloProvider client={client}>
        <h1>Hello!!</h1>
        <First></First>
    </ApolloProvider>,
    document.getElementById('root'),
);

