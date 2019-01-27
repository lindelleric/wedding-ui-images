import React from 'react';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { Invitation } from './../../types';
import { InvitationRow } from './InvitationRow';

import './Admin.less';

const ALL_INVITATIONS = gql`
    {
        invitations {
            id
            code
            title
            note
            role
            invitees {
                id
                firstName
                lastName
                inviteStatus
            }
        }
    }
`;

export class Admin extends React.Component {

    public render() {
        return (
            <Query<{invitations: Invitation[]}> query={ALL_INVITATIONS} fetchPolicy="network-only">
                {({ data, error, loading, refetch }) => {
                    if (data) {
                        const { invitations } = data;

                        if (loading) {
                             return <p className="main-page-loading">Laddar...</p>
                        }

                        return (
                            <div className="admin-wrapper">
                                <table className="invitation-table">
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Kod</th>
                                            <th>Kommer</th>
                                            <th>Kommer ej</th>
                                            <th>Ej svarat</th>
                                            <th>Totalt</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            invitations.map((invitation, i) => (
                                                <InvitationRow invitation={invitation}  key={i} />
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        )
                    }
                }}
            </Query>
        );
    }
}
