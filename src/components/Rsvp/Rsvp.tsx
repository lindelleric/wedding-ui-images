import React from 'react';

import { Invitee } from './Invitee';

import './Rsvp.less';

export class Rsvp extends React.Component<any, any> {
    public render() {
        return (
            this.props.invitation ? (
                <div className="rsvp-wrapper">
                    <h2>{ this.props.invitation.title }</h2>

                    <p>0 / 5 har svarat</p>

                    { this.props.invitation.invitees.map((invitee, i) => <Invitee invitee={invitee} key={i}></Invitee> ) }
                </div>
            ) : null
        );
    }
}
