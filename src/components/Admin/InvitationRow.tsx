import React from 'react';

import { All, Remove, AddInvitee, RemoveInvitee } from './../../generated/graphql';

interface Props {
    invitation: All.Invitations;
    index: number;
    refetch: () => any;
}

interface State {
    isExpanded: boolean;
    newFirstName: string;
    newLastName: string;
}

export class InvitationRow extends React.Component<Props, State> {

    public constructor(props) {
        super(props);
        this.state = {
            isExpanded: false,
            newFirstName: '',
            newLastName: ''
        };
    }

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

    private toggle() {
        this.setState({
            isExpanded: !this.state.isExpanded
        })
    }

    private getInviteStatusHuman(status: boolean | null) {
        if (status === null) {
            return 'Inte svarat';
        } else {
            return status ? 'Kommer' : 'Kommer inte';
        }
    }

    public render() {
        const { invitation } = this.props;

        return (
            this.props.invitation ? (
                <>
                    <tr className={`invitation-row-wrapper ${this.props.index % 2 !== 0 ? 'odd' : 'even' } ${ this.state.isExpanded ? 'active' : null }`}>
                        <td><input type="checkbox" /></td>
                        <td onClick={() => this.toggle()}>{ invitation.title }</td>
                        <td onClick={() => this.toggle()}>{ invitation.code }</td>
                        <td onClick={() => this.toggle()}>{ invitation.note }</td>
                        <td onClick={() => this.toggle()}>{ this.getCommingCount() }</td>
                        <td onClick={() => this.toggle()}>{ this.getNotCommingCount() }</td>
                        <td onClick={() => this.toggle()}>{ this.getUnknownCount() }</td>
                        <td onClick={() => this.toggle()}>{ this.getInviteeCount() }</td>
                        <td>
                            <Remove.Component>
                                {(removeInvitation, {loading}) => (
                                    <button
                                        onClick={() => {
                                            removeInvitation({
                                                variables: { invitationId: invitation.id }
                                            }).then(() => this.props.refetch());
                                        }}
                                        className={loading ? 'submitted' : ''}
                                        disabled={invitation.role === 'ADMIN'}
                                    ><i className="fa fa-times"></i></button>
                                )}
                            </Remove.Component>
                        </td>
                    </tr>
                    {
                        this.state.isExpanded ? (
                            <tr className="more-info">
                                <td colSpan={9}>
                                    <ul>
                                        {invitation.invitees.map((invitee) => (
                                            <li className="invitee-row" key={invitee.id}>
                                                <span className="name">{ invitee.firstName } { invitee.lastName }</span>
                                                <span className="status">{ this.getInviteStatusHuman(invitee.inviteStatus) }</span>
                                                <span>
                                                    <RemoveInvitee.Component>
                                                        {(removeInvitee, {loading}) => (
                                                            <button
                                                                onClick={() => {
                                                                    removeInvitee({
                                                                        variables: {
                                                                            inviteeId: invitee.id
                                                                        }
                                                                    }).then(() => this.props.refetch());
                                                                }}
                                                                className={loading ? 'submitted' : ''}
                                                            ><i className="fa fa-times"></i></button>
                                                        )}
                                                    </RemoveInvitee.Component>
                                                </span>
                                            </li>
                                        ))}
                                        <li className="add-invitee">
                                            <AddInvitee.Component>
                                                {(addInvitee, {error, loading}) => (
                                                    <form onSubmit={(e) => {
                                                        e.preventDefault();
                                                        addInvitee({
                                                            variables: {
                                                                invitationId: invitation.id,
                                                                firstName: this.state.newFirstName,
                                                                lastName: this.state.newLastName
                                                            }
                                                        }).then(() => this.props.refetch());

                                                        this.setState({
                                                            newFirstName: '',
                                                            newLastName: ''
                                                        });
                                                    }}>
                                                        <input type="text" value={this.state.newFirstName} placeholder="Förnamn" onChange={(e) => this.setState({ newFirstName: e.target.value})} />
                                                        <input type="text" value={this.state.newLastName} placeholder="Efternamn" onChange={(e) => this.setState({ newLastName: e.target.value})} />
                                                        <button
                                                            type="submit"
                                                            className={loading ? 'submitted' : ''}
                                                            disabled={ !this.state.newFirstName || !this.state.newLastName }
                                                        >Lägg till</button>
                                                    </form>
                                                )}
                                            </AddInvitee.Component>
                                        </li>
                                    </ul>
                                </td>
                            </tr>
                        ) : null
                    }
                </>
            ) : null
        );
    }
}
