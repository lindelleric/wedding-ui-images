import { gql } from 'apollo-boost';

export const createInvitee = gql`
mutation AddInvitee(
        $invitationId: String!
        $firstName: String!
        $lastName: String!
    ) {
        addInvitee(
            invitee: {
                invitationId: $invitationId
                firstName: $firstName
                lastName: $lastName
            }
        ) {
        id
    }
}
`
