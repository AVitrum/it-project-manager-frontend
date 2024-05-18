export type ProfileResponse = {
    id: number;
    username: string;
    email: string;
    phoneNumber: string;
    creationDate: string;
    imageUrl: string | null;
    averageSalary: number;
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
    maxSalary: number;
    minSalary: number;
    totalCosts: number;
    averageSalary: number;
};

export type ProjectResponse = {
    id: number;
    name: string;
    description: string;
    budget: number;
    image: string | undefined;
    companyId: number;
    performers: EmployeeResponse[];
    assignments: AssignmentResponse[];
};

export type AssignmentResponse = {
    id: number;
    theme: string;
    description: string;
    type: string;
    companyId: number;
    budget: number;
    createdAt: string;
    deadline: string;
    updatedAt: string;
    performers: EmployeeResponse[];
    comments: CommentResponse[];
    histories: HistoryResponse[];
    files: FileResponse[];
};


export type FileResponse = {
    name: string;
    link: string;
};

export type CommentResponse = {
    id: number;
    message: string;
    user: EmployeeResponse;
};

export type HistoryResponse = {
    updatedAt: string;
    change: string;
};

export type EmployeeResponse = {
    id: number,
    username: string,
    email: string,
    position: string,
    salary: number
    picture: string | undefined
    permissions: PositionInCompanyResponse;
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