import React from 'react';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { InvitationRow } from './InvitationRow';
import { NewInvitation } from './NewInvitation';

import { All } from './../../generated/graphql';

import './Admin.less';

export class Admin extends React.Component {

    public render() {
        return (
            <All.Component fetchPolicy="network-only">
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
                                            <th>Titel</th>
                                            <th>Kod</th>
                                            <th>Kommer</th>
                                            <th>Kommer ej</th>
                                            <th>Ej svarat</th>
                                            <th>Totalt</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            invitations.map((invitation, i) => (
                                                <InvitationRow invitation={invitation} refetch={refetch} key={i} />
                                            ))
                                        }
                                    </tbody>
                                </table>
                                <NewInvitation refetch={refetch} />
                            </div>
                        )
                    }
                }}
            </All.Component>
        );
    }
}
