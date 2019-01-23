import React from 'react';
import gql from 'graphql-tag';
import { Mutation, MutationFn } from 'react-apollo';

import './Invitee.less';

interface InviteeType {
    id?: string;
    firstName?: string;
    lastName?: string;
    inviteStatus?: boolean;
}

interface InviteeProps {
    invitee: InviteeType;
    // refetch: () => void;
}

interface InviteeState {
    invitee: InviteeType;
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

    private onSetStatus(response: any) {
        console.log(response);
    }

    private onSetStatusClick(inviteStatus: boolean, setStatus: MutationFn) {
        console.log(inviteStatus);
        setStatus({
            variables: {
                inviteeId: this.state.invitee.id,
                inviteStatus
            }
        }).then((response: any) => {
            const { invitee } = this.state;
            invitee.inviteStatus = response.data.setInviteStatus.inviteStatus;
            this.setState({invitee});
            console.log(response);
        });
    }

    public render() {
        return (
             <Mutation mutation={SETSTATUS}>
                {(setStatus, { data, error, loading }) => (
                    <div className="invitee-wrapper">
                        <span>{`${ this.state.invitee.firstName } ${ this.state.invitee.lastName }`}</span>

                        <span className="actions-wrapper">{
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
                        }</span>
                    </div>
                )}
            </Mutation>
        );
    }
}
