import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import { Invitee } from './Invitee';

import './Rsvp.less';

const GET_INVITES = gql`
    {
        me {
            id
            code
            title
            invitees {
                id
                firstName
                lastName
                inviteStatus
            }
        }
    }
`;

export class Rsvp extends React.Component {
    public render() {
        console.log('rsvp');
        return (
            <Query query={GET_INVITES} fetchPolicy="network-only">
                {({ loading, error, data, refetch }) => {
                    {if (loading) return '';}
                    if (error) return `Error! ${error.message}`;

                    const { me } = data;

                    return (
                        <div className="rsvp-wrapper">
                            <h2>{ me.title }</h2>

                            <p>0 / 5 har svarat</p>

                            { me.invitees.map((invitee, i) => <Invitee invitee={invitee} refetch={() => refetch()} key={i}></Invitee> ) }
                        </div>
                    );
                }}
            </Query>
        );
    }
}
