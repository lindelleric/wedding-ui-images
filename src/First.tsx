import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_DOGS = gql`
  {
    me {
      id
      code
      invitees {
        id
        firstName
        lastName
        inviteStatus
      }
    }
  }
`;

export const First = () => (
  <Query query={GET_DOGS}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;

      const { me } = data;

      return (
          <div>
            <h1>{ me.code }</h1>
            <ul>
              {
                me.invitees.map((invitee: any) => (
                  <li key={invitee.id}>
                    <p>{ `${invitee.firstName} ${invitee.lastName}: ${invitee.inviteStatus}` }</p>
                  </li>
               ))
              }
            </ul>
          </div>
      );
    }}
  </Query>
);
