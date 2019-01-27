import React from 'react';

import { Invitee } from './Invitee';

import { Invitation } from './../../types';

import './Rsvp.less';

export class Rsvp extends React.Component<{invitation: Invitation}, any> {

    public getAwnseredCount(): number {
        const { invitation } = this.props;
        return invitation && invitation.invitees.filter((invitee) => invitee.inviteStatus !== null).length;
    }

    public getInviteeCount(): number {
        const { invitation } = this.props;
        return invitation && invitation.invitees.length;

    }

    public render() {
        return (
            this.props.invitation ? (
                <div className="rsvp-wrapper">
                    <h2>{ this.props.invitation.title }</h2>

                    <p>{ this.getAwnseredCount() } / { this.getInviteeCount() } har svarat</p>

                    { this.props.invitation.invitees.map((invitee, i) => <Invitee invitee={invitee} key={i}></Invitee> ) }
                </div>
            ) : null
        );
    }
}
