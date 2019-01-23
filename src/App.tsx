import React from 'react';

import './styles/main.less';
import './styles/form/index.less'
import './components/infoViews/info.less';
import 'normalize.css';

import { UIView } from '@uirouter/react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { apolloClient } from './index';

import { Nav } from './components/Nav';
import { Divider } from './components/common/Divider';
import router from './router';

const GET_INVITES = gql`
    {
        me {
            id
            code
            title
            invitees {
                id
                firstName
                lastName
                inviteStatus
            }
        }
    }
`;

export class App extends React.Component<any, any> {
    public render() {
        console.log('app props', this.props);
        return (
            <Query query={GET_INVITES} fetchPolicy="network-only">
                {({ data, error, loading, refetch }) => {
                    let me;

                    if (data) {
                        me = data.me;
                    }

                    return (
                        <div className="page-wrapper">

                            { !loading && !error && data ? <Nav invitation={me}/> : null }

                            <h1 className="main-page-title">Eric &#91;Malin</h1>

                            { !loading && !error && data ? <h3 className="main-page-subheader">11 Maj 2019 | Köpmansmagasinet Smygehamn | 15:00 </h3> : null }

                            <UIView render={(Component, props) =>
                              <Component {...props} invitation={me} refetch={refetch}/>
                            }/> {/* add invitation */}
                        </div>
                    )
                }}
            </Query>
        )
    }
}

 export const rootState = {
    name: 'root',
    url: '/',
    redirectTo: 'rsvp',
    resolve: {
        me: async () => {
            const response = await apolloClient.query({
                query: GET_INVITES
            })
            return response;
        }
    }
}
