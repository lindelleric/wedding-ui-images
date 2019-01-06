import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import './Rsvp.less';

const GET_INVITES = gql`
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

export class Rsvp extends React.Component {

    public render() {
        console.log('rsvp');
        return (
            <Query query={GET_INVITES} fetchPolicy="network-only">
                {({ loading, error, data }) => {
                    {if (loading) return '';}
                    if (error) return `Error! ${error.message}`;

                    const { me } = data;

                    return (
                        <div className="rsvp-wrapper">
                            <h2>Famlijen { me.code }</h2>
                            {/*<h2 className="code">{ me.code }</h2>*/}
                            <ul>
                                {me.invitees.map((invitee: any) => (
                                    <li key={invitee.id}>
                                        <p>{ `${invitee.firstName} ${invitee.lastName}: ${invitee.inviteStatus}` }</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                }}
            </Query>
        );
    }
}
