import React from 'react';

interface InviteeProps {
    invitee: {
        id?: string;
        firstName?: string;
        lastName?: string;
        inviteStatus?: boolean;
    }
}

export class Invitee extends React.Component<InviteeProps> {
    public render() {
        console.log('invitee',this.props.invitee);
        return (
            <div>{ this.props.invitee.firstName }</div>
        );
    }
}
