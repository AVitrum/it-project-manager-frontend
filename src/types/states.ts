export type PopupState = {
    isActive: boolean,
};

export type AuthState = {
    username: string | null;
    token: string | null;
    email: string | null;
    image: string | undefined;
    refreshToken: string | null;
};