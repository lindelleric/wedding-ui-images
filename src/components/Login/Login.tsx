import React from 'react';
// import {observer} from 'mobx-react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import './Login.less';

const AUTHENTICATE = gql`
    mutation Auth($invitationCode: String!) {
        authenticate(invitationCode: $invitationCode)
    }
`

// @observer
export class Login extends React.Component<any, any> {
    public constructor(props: any) {
        super(props);
        this.state = {
            code: ''
        }
    }

    private updateCode = (event: any) => {
       this.setState({
           code: event.target.value
       });
    }

    private onSuccessfulLogin(response: any) {
        const { authenticate } = response.data;
        localStorage.setItem('token', authenticate);

        const { transition } = this.props;
        transition.router.stateService.go('root', {}, { reload: true });
        this.props.refetch();
    }

    public render() {
        return (
            <Mutation mutation={AUTHENTICATE}>
                {(authenticate, { data, error }) => (
                    <div className="login-wrapper">
                        <form onSubmit={event => {
                                event.preventDefault();
                                authenticate({ variables: { invitationCode: this.state.code } }).then((response) => this.onSuccessfulLogin(response));
                            }}
                        >
                            <input type="text" className="code-input" name="code" placeholder="Skriv in er personliga kod här" value={this.state.code} onChange={this.updateCode}/>

                            <button type="submit" className="login-button" disabled={!this.state.code}>Logga in</button>

                            {
                                error && error.graphQLErrors.map((error, i) => {
                                    switch (error.name) {
                                        case 'CodeNotFoundError':
                                            return <p className="login-error" key={i}>Koden finns inte</p>;
                                        default:
                                            return <p className="login-error" key={i}>Något fel har inträffat</p>;
                                    }
                                })
                            }

                        </form>
                    </div>
                )}
            </Mutation>
        )
    }
}
