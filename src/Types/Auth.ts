type AuthState = {
    user: string | null;
    token: string | null;
    refreshToken: string | null;
};

type SetCredentialsPayload = {
    user: string;
    accessToken: string;
    refreshToken: string;
};