import React from 'react';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { InvitationRow } from './InvitationRow';
import { NewInvitation } from './NewInvitation';

import { All } from './../../generated/graphql';

interface State {
    sortField: string;
    sortDirection: boolean;
}

import './Admin.less';

export class Admin extends React.Component<null, State> {


    private clickHeader(field: string) {
         // TODO
    }

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
                                            <th className="check"></th>
                                            <th className="title">Titel</th>
                                            <th className="code">Kod</th>
                                            <th className="note">Meddelande</th>
                                            <th className="last-visit">Senaste besök</th>
                                            <th className="coming">Kommer</th>
                                            <th className="not-coming">Kommer ej</th>
                                            <th className="not-answered">Ej svarat</th>
                                            <th className="total">Totalt</th>
                                            <th className="remove"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            invitations
                                            .sort((a, b) => (a!.title || 0) > (b!.title || 0) ? 1 : -1)
                                            .map((invitation, i) => (
                                                <InvitationRow invitation={invitation} refetch={refetch} key={invitation.id} index={i} />
                                            ))
                                        }
                                        <tr>
                                        </tr>
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
