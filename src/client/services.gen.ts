// This file is auto-generated by @hey-api/openapi-ts

import { createClient, createConfig, type Options, urlSearchParamsBodySerializer } from './client';
import type { LoginAuthTokenPostData, LoginAuthTokenPostError, LoginAuthTokenPostResponse, LogoutAuthLogoutGetError, LogoutAuthLogoutGetResponse, GetUserAuthSessionGetData, GetUserAuthSessionGetError, GetUserAuthSessionGetResponse, SubmitDefinitionContestDefinitionPostData, SubmitDefinitionContestDefinitionPostError, SubmitDefinitionContestDefinitionPostResponse, UpdateDefinitionContestDefinitionIdPatchData, UpdateDefinitionContestDefinitionIdPatchError, UpdateDefinitionContestDefinitionIdPatchResponse, SubmitContestSubmissionContestDefinitionIdSubmissionPostData, SubmitContestSubmissionContestDefinitionIdSubmissionPostError, SubmitContestSubmissionContestDefinitionIdSubmissionPostResponse, GetSubmissionContestSubmissionSubmissionIdGetData, GetSubmissionContestSubmissionSubmissionIdGetError, GetSubmissionContestSubmissionSubmissionIdGetResponse } from './types.gen';

export const client = createClient(createConfig());

/**
 * Login
 */
export const loginAuthTokenPost = <ThrowOnError extends boolean = false>(options: Options<LoginAuthTokenPostData, ThrowOnError>) => {
    return (options?.client ?? client).post<LoginAuthTokenPostResponse, LoginAuthTokenPostError, ThrowOnError>({
        ...options,
        ...urlSearchParamsBodySerializer,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            ...options?.headers
        },
        url: '/auth/token'
    });
};

/**
 * Logout
 */
export const logoutAuthLogoutGet = <ThrowOnError extends boolean = false>(options?: Options<unknown, ThrowOnError>) => {
    return (options?.client ?? client).get<LogoutAuthLogoutGetResponse, LogoutAuthLogoutGetError, ThrowOnError>({
        ...options,
        url: '/auth/logout'
    });
};

/**
 * Get User
 */
export const getUserAuthSessionGet = <ThrowOnError extends boolean = false>(options?: Options<GetUserAuthSessionGetData, ThrowOnError>) => {
    return (options?.client ?? client).get<GetUserAuthSessionGetResponse, GetUserAuthSessionGetError, ThrowOnError>({
        ...options,
        url: '/auth/session'
    });
};

/**
 * Submit a contest definition
 */
export const submitDefinitionContestDefinitionPost = <ThrowOnError extends boolean = false>(options: Options<SubmitDefinitionContestDefinitionPostData, ThrowOnError>) => {
    return (options?.client ?? client).post<SubmitDefinitionContestDefinitionPostResponse, SubmitDefinitionContestDefinitionPostError, ThrowOnError>({
        ...options,
        url: '/contest/definition'
    });
};

/**
 * Update a contest definition
 */
export const updateDefinitionContestDefinitionIdPatch = <ThrowOnError extends boolean = false>(options: Options<UpdateDefinitionContestDefinitionIdPatchData, ThrowOnError>) => {
    return (options?.client ?? client).patch<UpdateDefinitionContestDefinitionIdPatchResponse, UpdateDefinitionContestDefinitionIdPatchError, ThrowOnError>({
        ...options,
        url: '/contest/definition/{id}'
    });
};

/**
 * Upload a submission for a contest definition
 */
export const submitContestSubmissionContestDefinitionIdSubmissionPost = <ThrowOnError extends boolean = false>(options: Options<SubmitContestSubmissionContestDefinitionIdSubmissionPostData, ThrowOnError>) => {
    return (options?.client ?? client).post<SubmitContestSubmissionContestDefinitionIdSubmissionPostResponse, SubmitContestSubmissionContestDefinitionIdSubmissionPostError, ThrowOnError>({
        ...options,
        url: '/contest/definition/{id}/submission'
    });
};

/**
 * Get results of a submission
 */
export const getSubmissionContestSubmissionSubmissionIdGet = <ThrowOnError extends boolean = false>(options: Options<GetSubmissionContestSubmissionSubmissionIdGetData, ThrowOnError>) => {
    return (options?.client ?? client).get<GetSubmissionContestSubmissionSubmissionIdGetResponse, GetSubmissionContestSubmissionSubmissionIdGetError, ThrowOnError>({
        ...options,
        url: '/contest/submission/{submission_id}'
    });
};