export type PopupState = {
    isActive: boolean,
};

export type AuthState = {
    user: string | null;
    token: string | null;
    refreshToken: string | null;
};