import { ChangeEvent } from "react";

export type Input = {
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

export type ApiError = {
    status: number;
    data: {
        title: string,
        status: number,
        traceId: string
    };
}