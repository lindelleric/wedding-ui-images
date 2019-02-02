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

export namespace Create {
  export type Variables = {
    title: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    createInvitation: CreateInvitation;
  };

  export type CreateInvitation = {
    __typename?: "Invitation";

    id: string;

    code: string;

    note: Maybe<string>;
  };
}

export namespace Remove {
  export type Variables = {
    invitationId: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    removeInvitation: boolean;
  };
}

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

    lastActive: Maybe<string>;

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

export namespace AddInvitee {
  export type Variables = {
    invitationId: string;
    firstName: string;
    lastName: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    addInvitee: AddInvitee;
  };

  export type AddInvitee = {
    __typename?: "Invitee";

    id: string;
  };
}

export namespace RemoveInvitee {
  export type Variables = {
    inviteeId: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    removeInvitee: boolean;
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

  lastActive?: Maybe<string>;

  invitees: Invitee[];
}

export interface Mutation {
  addInvitee: Invitee;

  removeInvitee: boolean;

  setInviteStatus?: Maybe<Invitee>;

  createInvitation: Invitation;
  /** Returns the removed invitation. This removes the invitation and ALL the invitees in the invitation. Throws if no invitation matching id is found. */
  removeInvitation: boolean;

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

export namespace Create {
  export const Document = gql`
    mutation create($title: String!) {
      createInvitation(title: $title) {
        id
        code
        note
      }
    }
  `;
  export class Component extends React.Component<
    Partial<ReactApollo.MutationProps<Mutation, Variables>>
  > {
    render() {
      return (
        <ReactApollo.Mutation<Mutation, Variables>
          mutation={Document}
          {...(this as any)["props"] as any}
        />
      );
    }
  }
  export type Props<TChildProps = any> = Partial<
    ReactApollo.MutateProps<Mutation, Variables>
  > &
    TChildProps;
  export type MutationFn = ReactApollo.MutationFn<Mutation, Variables>;
  export function HOC<TProps, TChildProps = any>(
    operationOptions:
      | ReactApollo.OperationOption<
          TProps,
          Mutation,
          Variables,
          Props<TChildProps>
        >
      | undefined
  ) {
    return ReactApollo.graphql<TProps, Mutation, Variables, Props<TChildProps>>(
      Document,
      operationOptions
    );
  }
}
export namespace Remove {
  export const Document = gql`
    mutation remove($invitationId: String!) {
      removeInvitation(invitationId: $invitationId)
    }
  `;
  export class Component extends React.Component<
    Partial<ReactApollo.MutationProps<Mutation, Variables>>
  > {
    render() {
      return (
        <ReactApollo.Mutation<Mutation, Variables>
          mutation={Document}
          {...(this as any)["props"] as any}
        />
      );
    }
  }
  export type Props<TChildProps = any> = Partial<
    ReactApollo.MutateProps<Mutation, Variables>
  > &
    TChildProps;
  export type MutationFn = ReactApollo.MutationFn<Mutation, Variables>;
  export function HOC<TProps, TChildProps = any>(
    operationOptions:
      | ReactApollo.OperationOption<
          TProps,
          Mutation,
          Variables,
          Props<TChildProps>
        >
      | undefined
  ) {
    return ReactApollo.graphql<TProps, Mutation, Variables, Props<TChildProps>>(
      Document,
      operationOptions
    );
  }
}
export namespace All {
  export const Document = gql`
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
export namespace AddInvitee {
  export const Document = gql`
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
  `;
  export class Component extends React.Component<
    Partial<ReactApollo.MutationProps<Mutation, Variables>>
  > {
    render() {
      return (
        <ReactApollo.Mutation<Mutation, Variables>
          mutation={Document}
          {...(this as any)["props"] as any}
        />
      );
    }
  }
  export type Props<TChildProps = any> = Partial<
    ReactApollo.MutateProps<Mutation, Variables>
  > &
    TChildProps;
  export type MutationFn = ReactApollo.MutationFn<Mutation, Variables>;
  export function HOC<TProps, TChildProps = any>(
    operationOptions:
      | ReactApollo.OperationOption<
          TProps,
          Mutation,
          Variables,
          Props<TChildProps>
        >
      | undefined
  ) {
    return ReactApollo.graphql<TProps, Mutation, Variables, Props<TChildProps>>(
      Document,
      operationOptions
    );
  }
}
export namespace RemoveInvitee {
  export const Document = gql`
    mutation RemoveInvitee($inviteeId: String!) {
      removeInvitee(inviteeId: $inviteeId)
    }
  `;
  export class Component extends React.Component<
    Partial<ReactApollo.MutationProps<Mutation, Variables>>
  > {
    render() {
      return (
        <ReactApollo.Mutation<Mutation, Variables>
          mutation={Document}
          {...(this as any)["props"] as any}
        />
      );
    }
  }
  export type Props<TChildProps = any> = Partial<
    ReactApollo.MutateProps<Mutation, Variables>
  > &
    TChildProps;
  export type MutationFn = ReactApollo.MutationFn<Mutation, Variables>;
  export function HOC<TProps, TChildProps = any>(
    operationOptions:
      | ReactApollo.OperationOption<
          TProps,
          Mutation,
          Variables,
          Props<TChildProps>
        >
      | undefined
  ) {
    return ReactApollo.graphql<TProps, Mutation, Variables, Props<TChildProps>>(
      Document,
      operationOptions
    );
  }
}
