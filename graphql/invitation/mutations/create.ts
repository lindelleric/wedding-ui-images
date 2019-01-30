import { gql } from 'apollo-boost';

export const createInvitation = gql`
    mutation create($title: String!) {
        createInvitation(title: $title) {
          id
          code
          note
        }
    }
`
