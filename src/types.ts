export interface Invitation {
    id: string;
    code: string;
    note: string;
    title: string;
    role: string;
    invitees: Invitee[];
    invitation: Invitation;
}

export interface Invitee {
    id: string;
    firstName: string;
    lastName: string;
    inviteStatus?: boolean;
    invitation: Invitation;
}
