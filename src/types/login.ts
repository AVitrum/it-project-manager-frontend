import { ChangeEvent, MouseEventHandler } from "react";

export interface AuthState {
    user: string | null;
    token: string | null;
    refreshToken: string | null;
};

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
};

export interface Input {
    type: string;
    id: string;
    ref: React.RefObject<HTMLInputElement> | null;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    autoComplete: string;
    required: boolean;
    label: string;
    Icon: React.ComponentType<any>;
    iconColor: string;
    iconHeight: string;
    iconWidth: string;
};