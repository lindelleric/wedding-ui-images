import React from 'react';

import { Invitee } from './Invitee';
import { Note } from './Note';

// import { Invitation } from './../../types';
import { Current } from'./../../generated/graphql';

import './Rsvp.less';

export class Rsvp extends React.Component<{invitation: Current.Invitation}, any> {

    public getAwnseredCount(): number {
        const { invitation } = this.props;
        return invitation && invitation.invitees.filter((invitee) => invitee.inviteStatus !== null).length;
    }

    public getInviteeCount(): number {
        const { invitation } = this.props;
        return invitation && invitation.invitees.length;

    }

    public render() {
        console.log('rsvp render',this.props.invitation);
        return (
            this.props.invitation ? (
                <div className="rsvp-wrapper">
                    <h2>{ this.props.invitation.title }</h2>

                    {
                        this.getAwnseredCount() === this.getInviteeCount() ? (
                            <p className="summery">Alla har svarat <i className="fa fa-check"></i></p>
                        ) : (
                            <p className="summery">{ this.getAwnseredCount() } / { this.getInviteeCount() } har svarat</p>
                        )
                    }

                    <table className="invitee-table">
                        <tbody>
                            { this.props.invitation.invitees.map((invitee, i) => <Invitee invitee={invitee} key={invitee.id}></Invitee> ) }
                        </tbody>
                    </table>

                    <Note invitation={this.props.invitation} />
                </div>
            ) : null
        );
    }
}
