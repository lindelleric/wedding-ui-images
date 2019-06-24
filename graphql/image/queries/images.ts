import { gql } from 'apollo-boost';

export const meMutation = gql`
    query Images {
        images {
            filename
            thumbWidth
            thumbHeight
        }
    }
`;
