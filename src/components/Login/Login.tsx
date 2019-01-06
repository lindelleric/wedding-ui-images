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
       console.log(event.target.value);
       this.setState({
           code: event.target.value
       })
    }

    private onSuccessfulLogin(response: any) {
        const { authenticate } = response.data;
        console.log(authenticate);
        localStorage.setItem('token', authenticate);

        const { transition } = this.props;
        transition.router.stateService.go('rsvp', {}, { reload: true });
    }

    public render() {
        // return (
        //     <div>
        //         <h1>login</h1>

        //         <input type="text" name="code" placeholder="Kod" value={this.state.code} onChange={this.updateCode}/>

        //     </div>
        // )

        return (
            <Mutation mutation={AUTHENTICATE}>
                {(authenticate, { data }) => (
                    <div className="login-wrapper">
                        <form onSubmit={event => {
                                event.preventDefault();
                                authenticate({ variables: { invitationCode: this.state.code } }).then((response) => this.onSuccessfulLogin(response));
                            }}
                        >
                            <input type="text" name="code" placeholder="Kod" value={this.state.code} onChange={this.updateCode}/>

                            <button type="submit">Logga in</button>
                        </form>
                    </div>
                )}
            </Mutation>
        )
    }
}
