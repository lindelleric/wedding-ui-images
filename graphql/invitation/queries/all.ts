import { gql } from 'apollo-boost';

export const meMutation = gql`
    query All {
        invitations {
            id
            code
            title
            note
            role
            lastActive
            invitees {
                id
                firstName
                lastName
                inviteStatus
            }
        }
    }
`;
