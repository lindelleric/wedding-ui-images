import { gql } from 'apollo-boost';

export const meMutation = gql`
    query Current {
        invitation {
            id
            code
            title
            note
            role
            invitees {
                id
                firstName
                lastName
                inviteStatus
            }
        }
    }
`;
