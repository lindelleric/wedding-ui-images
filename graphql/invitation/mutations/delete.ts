import { gql } from 'apollo-boost';

export const removeInvitation = gql`
    mutation remove($invitationId: String!) {
        removeInvitation(invitationId: $invitationId)
    }
`
