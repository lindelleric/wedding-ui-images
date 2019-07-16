import { gql } from 'apollo-boost';

export const createInvitee = gql`
mutation RemoveInvitee($inviteeId: String!) {
    removeInvitee(inviteeId: $inviteeId)
}
`
