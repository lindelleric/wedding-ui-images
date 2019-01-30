import React from 'react';
import gql from 'graphql-tag';
import { Mutation, MutationFn } from 'react-apollo';

import './Invitee.less';

import { Current } from'./../../generated/graphql';

interface InviteeProps {
    invitee: Current.Invitee;
    // refetch: () => void;
}

interface InviteeState {
    invitee: Current.Invitee;
}

const SETSTATUS = gql`
    mutation SetInvitationStatus($inviteeId: String!, $inviteStatus: Boolean) {
        setInviteStatus(inviteeId: $inviteeId, inviteStatus: $inviteStatus) {
            id
            inviteStatus
        }
    }
`

export class Invitee extends React.Component<InviteeProps, InviteeState> {
    public constructor(props) {
        super(props);

        const { invitee } = this.props;

        this.state = {
            invitee
        };
    }

    private onSetStatusClick(inviteStatus: boolean, setStatus: MutationFn) {
        setStatus({
            variables: {
                inviteeId: this.state.invitee.id,
                inviteStatus
            }
        }).then((response: any) => {
            const { invitee } = this.state;
            invitee.inviteStatus = response.data.setInviteStatus.inviteStatus;
            this.setState({invitee});
        });
    }

    public render() {
        return (
             <Mutation mutation={SETSTATUS}>
                {(setStatus, { data, error, loading }) => (
                    <tr className="invitee-wrapper">
                        <td className="invitee-name">{`${ this.state.invitee.firstName } ${ this.state.invitee.lastName }`}</td>

                        <td className="actions-wrapper">{
                            this.state.invitee.inviteStatus === null ?
                                (<>
                                    <button className="margin-right" onClick={e => this.onSetStatusClick(true, setStatus)}>Kommer</button>
                                    <button onClick={e => this.onSetStatusClick(false, setStatus)}>Kommer Inte</button>
                                </>)
                                :
                                (<>
                                    <p className={ this.state.invitee.inviteStatus ? 'green' : 'red' }>{
                                        this.state.invitee.inviteStatus ? 'Kommer' : 'Kommer inte'
                                    }</p>
                                </>)
                        }</td>
                    </tr>
                )}
            </Mutation>
        );
    }
}
