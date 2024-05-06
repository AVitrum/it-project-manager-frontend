export type ProfileResponse = {
    id: number,
    username: string,
    email: string,
    phoneNumber: string,
    creationDate: string,
    imageUrl: string | null
};

export type AuthResponse = {
    username: string;
    image: string;
    accessToken: string;
    refreshToken: string;
};