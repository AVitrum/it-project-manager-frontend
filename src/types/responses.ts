export type ProfileResponse = {
    id: number,
    username: string,
    email: string,
    phoneNumber: string | null,
    creationDate: string,
    imageUrl: string | null
};

export type AuthResponse = {
    accessToken: string;
    refreshToken: string;
};