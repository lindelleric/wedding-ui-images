import React from 'react';

import { Create } from './../../generated/graphql';

interface Props {
    refetch: () => any;
}

interface State {
    title: string;
}

export class NewInvitation extends React.Component<Props, State> {
    public constructor(props: any) {
        super(props);
        this.state = {
            title: ''
        }
    }

    public onCreate() {
        this.setState({
            title: ''
        });
        this.props.refetch();
    }
    public render() {
        return (
            <div className="new-invitation-wrapper">
                <Create.Component>
                    {(createInvitation, { data, loading, error }) => (
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            createInvitation({
                                variables: {
                                    title: this.state.title
                                }
                            }).then(() => this.onCreate());
                        }}>
                            <input value={this.state.title} placeholder="Titel" onChange={(e) => this.setState({ title: e.target.value })}/>
                            <button type="submit" disabled={!this.state.title}>Skapa inbjudan</button>
                        </form>
                    )}
                </Create.Component>
            </div>
        )
    }
}
