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
    description: string;
    budget: number;
    picture: string | undefined;
    employees: EmployeeResponse[];
    projects: ProjectResponse[];
};

export type ProjectResponse = {
    id: number;
    name: string;
    description: string;
    budget: number;
    image: string | undefined
    performers: EmployeeResponse[];
};

export type EmployeeResponse = {
    id: number,
    username: string,
    email: string,
    position: string,
    salary: number
    picture: string | undefined
};

export type PositionInCompanyResponse = {
    name: string;
    priority: number;
    createProject: boolean;
    updateProject: boolean;
    deleteProject: boolean;
    addUser: boolean;
    updateUser: boolean;
    deleteUser: boolean;
    addBudget: boolean;
    updateBudget: boolean;
    createPosition: boolean;
    updatePosition: boolean;
    createTask: boolean;
    updateTask: boolean;
    deleteTask: boolean;
}