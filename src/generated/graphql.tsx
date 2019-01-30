export type Maybe<T> = T | null;

export interface InviteeInput {
  /** The Invitation that should get the new invitee */
  invitationId: string;

  firstName: string;

  lastName: string;
}

// ====================================================
// Documents
// ====================================================

export namespace All {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";

    invitations: Invitations[];
  };

  export type Invitations = {
    __typename?: "Invitation";

    id: string;

    code: string;

    title: Maybe<string>;

    note: Maybe<string>;

    role: Maybe<string>;

    invitees: Invitees[];
  };

  export type Invitees = {
    __typename?: "Invitee";

    id: string;

    firstName: string;

    lastName: string;

    inviteStatus: Maybe<boolean>;
  };
}

export namespace Current {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";

    invitation: Invitation;
  };

  export type Invitation = {
    __typename?: "Invitation";

    id: string;

    code: string;

    title: Maybe<string>;

    note: Maybe<string>;

    role: Maybe<string>;

    invitees: Invitee[];
  };

  export type Invitee = {
    __typename?: "Invitee";

    id: string;

    firstName: string;

    lastName: string;

    inviteStatus: Maybe<boolean>;
  };
}

// ====================================================
// Types
// ====================================================

export interface Query {
  invitee: Invitee;

  invitees: Invitee[];

  invitation: Invitation;

  invitations: Invitation[];
}

export interface Invitee {
  id: string;

  firstName: string;

  lastName: string;

  inviteStatus?: Maybe<boolean>;

  invitation: Invitation;
}

export interface Invitation {
  id: string;

  code: string;

  note?: Maybe<string>;

  title?: Maybe<string>;

  role?: Maybe<string>;

  invitees: Invitee[];
}

export interface Mutation {
  addInvitee: Invitee;
  /** This returnes the removed invitee. Throws error if invitee is not found. */
  removeInvitee: Invitee;

  setInviteStatus?: Maybe<Invitee>;

  createInvitation: Invitation;
  /** Returns the removed invitation. This removes the invitation and ALL the invitees in the invitation. Throws if no invitation matching id is found. */
  removeInvitation: Invitation;

  addNote: Invitation;

  resetAllInvitationStatuses: Invitee[];

  authenticate: string;
}

// ====================================================
// Arguments
// ====================================================

export interface InviteeQueryArgs {
  inviteeId: string;
}
export interface InvitationQueryArgs {
  invitationId?: Maybe<string>;
}
export interface AddInviteeMutationArgs {
  invitee: InviteeInput;
}
export interface RemoveInviteeMutationArgs {
  inviteeId: string;
}
export interface SetInviteStatusMutationArgs {
  inviteStatus?: Maybe<boolean>;

  inviteeId: string;
}
export interface CreateInvitationMutationArgs {
  role?: Maybe<string>;

  title: string;
}
export interface RemoveInvitationMutationArgs {
  invitationId: string;
}
export interface AddNoteMutationArgs {
  note: string;

  invitationId: string;
}
export interface ResetAllInvitationStatusesMutationArgs {
  invitationId: string;
}
export interface AuthenticateMutationArgs {
  invitationCode: string;
}

import * as ReactApollo from "react-apollo";
import * as React from "react";

import gql from "graphql-tag";

// ====================================================
// Components
// ====================================================

export namespace All {
  export const Document = gql`
    query All {
      invitations {
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
  export class Component extends React.Component<
    Partial<ReactApollo.QueryProps<Query, Variables>>
  > {
    render() {
      return (
        <ReactApollo.Query<Query, Variables>
          query={Document}
          {...(this as any)["props"] as any}
        />
      );
    }
  }
  export type Props<TChildProps = any> = Partial<
    ReactApollo.DataProps<Query, Variables>
  > &
    TChildProps;
  export function HOC<TProps, TChildProps = any>(
    operationOptions:
      | ReactApollo.OperationOption<
          TProps,
          Query,
          Variables,
          Props<TChildProps>
        >
      | undefined
  ) {
    return ReactApollo.graphql<TProps, Query, Variables, Props<TChildProps>>(
      Document,
      operationOptions
    );
  }
}
export namespace Current {
  export const Document = gql`
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
  export class Component extends React.Component<
    Partial<ReactApollo.QueryProps<Query, Variables>>
  > {
    render() {
      return (
        <ReactApollo.Query<Query, Variables>
          query={Document}
          {...(this as any)["props"] as any}
        />
      );
    }
  }
  export type Props<TChildProps = any> = Partial<
    ReactApollo.DataProps<Query, Variables>
  > &
    TChildProps;
  export function HOC<TProps, TChildProps = any>(
    operationOptions:
      | ReactApollo.OperationOption<
          TProps,
          Query,
          Variables,
          Props<TChildProps>
        >
      | undefined
  ) {
    return ReactApollo.graphql<TProps, Query, Variables, Props<TChildProps>>(
      Document,
      operationOptions
    );
  }
}
