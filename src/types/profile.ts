import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

type Profile = {
    id: number | null;
    email: string | null;
    username: string | null;
    creationDate: string | null;
    phoneNumber: string | null;
};

export type ProfileResp = {
    data: Profile,
    isLoading: boolean,
    isSuccess: boolean,
    isError: boolean,
    error: FetchBaseQueryError | SerializedError | undefined
};