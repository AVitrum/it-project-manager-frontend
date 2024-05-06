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

export type CompanyResponse = {
    id: number;
    name: string;
    picture: string | undefined;
    employees: EmployeeResponse[]
};

export type EmployeeResponse = {
    id: number,
    username: string,
    email: string,
    position: string,
    salary: number
    picture: string | null
};