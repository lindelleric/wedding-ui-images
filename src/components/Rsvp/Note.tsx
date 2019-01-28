import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { Invitation } from './../../types';

import './Note.less';

interface Props {
    invitation: Invitation;
}

interface State {
    note: string;
    isEdit: boolean;
}

const ADD_NOTE = gql`
    mutation addNote($invitationId: String!, $note: String!) {
        addNote(invitationId: $invitationId, note: $note) {
            id
            note
        }
    }
`

export class Note extends React.Component<{ invitation: Invitation }, State> {
    public constructor(props) {
        super(props);

        this.state = {
            note: this.props.invitation.note || '',
            isEdit: false
        };
    }

    private toggleEdit = () => {
        this.setState({
            isEdit: !this.state.isEdit
        });
    }

    private updateNote = (e) => {
        this.setState({
            note: e.target.value
        })
    }

    private hasNote() {
        return this.props.invitation.note;
    }

    public render() {
        return (
            <div className="note-wrapper">
                <h4>Meddelande</h4>
                { this.getContent() }
            </div>
        )
    }

    public getContent() {
        if (this.state.isEdit) {
            return (
                <Mutation mutation={ADD_NOTE}>
                    {(addNote, {data, error}) => (
                        <form onSubmit={(event) => {
                            event.preventDefault();
                            addNote({
                                variables: {
                                    invitationId: this.props.invitation.id,
                                    note: this.state.note
                                }
                            }).then(() => this.toggleEdit())
                        }}>
                                <textarea name="note" id="note" value={this.state.note} onChange={this.updateNote} placeholder="Skriv gärna ett meddelande. Allergier?"></textarea>
                                <button type="submit" className="save">Spara</button>
                        </form>
                    )}
                </Mutation>
            )
        } else if (this.hasNote()) {
            return (
                <>
                    <p className="note">{ this.props.invitation.note }</p>
                    <button onClick={this.toggleEdit}>Ändra meddelande</button>
                </>
            )
        } else {
            return (
                <button onClick={this.toggleEdit}>Lämna meddelande här</button>
            )
        }
    }
}
