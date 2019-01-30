import React from 'react';

import { All, Remove } from './../../generated/graphql';

interface Props {
    invitation: All.Invitations
    refetch: () => any;
}

export class InvitationRow extends React.Component<Props, any> {

    public getInviteeCount(): number {
        return this.props.invitation.invitees.length;
    }

    public getCommingCount(): number {
        return this.props.invitation.invitees.filter(({ inviteStatus }) => inviteStatus === true).length;
    }

    public getNotCommingCount(): number {
        return this.props.invitation.invitees.filter(({ inviteStatus }) => inviteStatus === false).length;
    }

    public getUnknownCount(): number {
        return this.props.invitation.invitees.filter(({ inviteStatus }) => inviteStatus === null).length;
    }

    public render() {
        const { invitation } = this.props;

        return (
            this.props.invitation ? (
                <tr className="invitation-row-wrapper">
                    <td className="title">{ invitation.title }</td>
                    <td className="code">{ invitation.code }</td>
                    <td>{ this.getCommingCount() }</td>
                    <td>{ this.getNotCommingCount() }</td>
                    <td>{ this.getUnknownCount() }</td>
                    <td>{ this.getUnknownCount() }</td>
                    <td>
                        <Remove.Component>
                            {(removeInvitation) => (
                                <button onClick={() => {
                                    removeInvitation({
                                        variables: { invitationId: invitation.id }
                                    }).then(() => this.props.refetch());
                                }} disabled={invitation.role === 'ADMIN'}><i className="fa fa-times"></i></button>
                            )}
                        </Remove.Component>
                    </td>
                </tr>
            ) : null
        );
    }
}
