import React from 'react';

import './styles/main.less';
import './styles/form/index.less'
import './components/infoViews/info.less';
import 'normalize.css';

import { UIView } from '@uirouter/react';

import { Nav } from './components/Nav';
import { Divider } from './components/common/Divider';

// import { Invitation } from './types';

import { Current, Invitation } from './generated/graphql';

// const GET_INVITES = gql`
//     {
//         me {
//             id
//             code
//             title
//             note
//             role
//             invitees {
//                 id
//                 firstName
//                 lastName
//                 inviteStatus
//             }
//         }
//     }
// `;

export class App extends React.Component<any, any> {
    public render() {
        console.log('app props', this.props);
        return (
            <Current.Component fetchPolicy="network-only">
                {({ data, error, loading, refetch }) => {
                    {/*let invitation: Invitation | null = null;*/}
                    let invitation: Current.Invitation | null = null;

                    if (data) {
                        invitation = data.invitation;
                    }

                    console.log('invitatiopn',invitation);
                    return (
                        <div className={`page-wrapper ${ invitation ? '' : 'login' }`}>

                            { !loading && !error && invitation ? <Nav invitation={invitation} /> : null }

                            <h1 className="main-page-title">Eric &#91;Malin</h1>
                            { loading ? <p className="main-page-loading">Laddar...</p> : null }

                            { !loading && !error && data ? <h3 className="main-page-subheader">11 Maj 2019 | Köpmansmagasinet Smygehamn | 15:00 </h3> : null }

                            <UIView render={(Component, props) =>
                                <Component {...props} invitation={invitation} refetch={refetch}/>
                            }/>
                        </div>
                    )
                }}
            </Current.Component>
        )
    }
}

export const rootState = {
    name: 'root',
    url: '/',
    redirectTo: 'rsvp'
}
