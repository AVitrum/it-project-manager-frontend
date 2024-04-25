export type PopupState = {
    active: boolean,
    openModal: boolean,
};

export type AuthState = {
    user: string | null;
    token: string | null;
    refreshToken: string | null;
};