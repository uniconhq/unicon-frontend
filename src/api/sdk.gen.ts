// This file is auto-generated by @hey-api/openapi-ts

import { type Options as ClientOptions, type TDataShape, type Client, urlSearchParamsBodySerializer } from '@hey-api/client-axios';
import type { LoginData, LoginResponse, LoginError, SignupData, SignupResponse, SignupError, LogoutData, GetUserData, GetUserResponse, GetUserError, GetPythonVersionsData, GetPythonVersionsResponse, GetPythonVersionsError, GetProblemData, GetProblemResponse, GetProblemError, UpdateProblemData, UpdateProblemResponse, UpdateProblemError, AddTaskToProblemData, AddTaskToProblemError, DeleteTaskData, DeleteTaskError, SubmitProblemTaskAttemptData, SubmitProblemTaskAttemptResponse, SubmitProblemTaskAttemptError, UpdateTaskData, UpdateTaskError, RerunTaskAttemptData, RerunTaskAttemptError, GetProblemTaskAttemptResultsData, GetProblemTaskAttemptResultsResponse, GetProblemTaskAttemptResultsError, MakeSubmissionData, MakeSubmissionResponse, MakeSubmissionError, GetSubmissionData, GetSubmissionResponse, GetSubmissionError, GetAllOrganisationsData, GetAllOrganisationsResponse, GetAllOrganisationsError, CreateOrganisationData, CreateOrganisationResponse, CreateOrganisationError, DeleteOrganisationData, DeleteOrganisationError, GetOrganisationData, GetOrganisationResponse, GetOrganisationError, UpdateOrganisationData, UpdateOrganisationResponse, UpdateOrganisationError, CreateProjectData, CreateProjectResponse, CreateProjectError, GetOrganisationMembersData, GetOrganisationMembersResponse, GetOrganisationMembersError, CreateOrganisationInvitationKeyData, CreateOrganisationInvitationKeyError, DeleteOrganisationInvitationKeyData, DeleteOrganisationInvitationKeyError, JoinOrganisationData, JoinOrganisationResponse, JoinOrganisationError, DeleteMemberData, DeleteMemberError, UpdateMemberData, UpdateMemberError, GetAllProjectsData, GetAllProjectsResponse, GetAllProjectsError, GetProjectData, GetProjectResponse, GetProjectError, UpdateProjectData, UpdateProjectResponse, UpdateProjectError, GetProjectRolesData, GetProjectRolesResponse, GetProjectRolesError, CreateRoleData, CreateRoleResponse, CreateRoleError, GetProjectUsersData, GetProjectUsersResponse, GetProjectUsersError, GetProjectGroupsData, GetProjectGroupsResponse, GetProjectGroupsError, CreateGroupData, CreateGroupResponse, CreateGroupError, GetProjectSubmissionsData, GetProjectSubmissionsResponse, GetProjectSubmissionsError, JoinProjectData, JoinProjectResponse, JoinProjectError, CreateProblemData, CreateProblemResponse, CreateProblemError, DeleteRoleData, DeleteRoleError, UpdateRoleData, UpdateRoleError, DeleteInvitationKeyData, DeleteInvitationKeyError, CreateInvitationKeyData, CreateInvitationKeyError, DeleteGroupData, DeleteGroupError, GetGroupData, GetGroupResponse, GetGroupError, UpdateGroupData, UpdateGroupResponse, UpdateGroupError } from './types.gen';
import { client as _heyApiClient } from './client.gen';

export type Options<TData extends TDataShape = TDataShape, ThrowOnError extends boolean = boolean> = ClientOptions<TData, ThrowOnError> & {
    /**
     * You can provide a client instance returned by `createClient()` instead of
     * individual options. This might be also useful if you want to implement a
     * custom client.
     */
    client?: Client;
};

/**
 * Login
 */
export const login = <ThrowOnError extends boolean = false>(options: Options<LoginData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).post<LoginResponse, LoginError, ThrowOnError>({
        ...urlSearchParamsBodySerializer,
        url: '/auth/token',
        ...options,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            ...options?.headers
        }
    });
};

/**
 * Signup
 */
export const signup = <ThrowOnError extends boolean = false>(options: Options<SignupData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).post<SignupResponse, SignupError, ThrowOnError>({
        url: '/auth/signup',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};

/**
 * Logout
 */
export const logout = <ThrowOnError extends boolean = false>(options?: Options<LogoutData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).get<unknown, unknown, ThrowOnError>({
        url: '/auth/logout',
        ...options
    });
};

/**
 * Get User
 */
export const getUser = <ThrowOnError extends boolean = false>(options?: Options<GetUserData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).get<GetUserResponse, GetUserError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/auth/session',
        ...options
    });
};

/**
 * Get available Python versions
 */
export const getPythonVersions = <ThrowOnError extends boolean = false>(options?: Options<GetPythonVersionsData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).get<GetPythonVersionsResponse, GetPythonVersionsError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/problems/python-versions',
        ...options
    });
};

/**
 * Get a problem definition
 */
export const getProblem = <ThrowOnError extends boolean = false>(options: Options<GetProblemData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).get<GetProblemResponse, GetProblemError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/problems/{id}',
        ...options
    });
};

/**
 * Update a problem definition
 */
export const updateProblem = <ThrowOnError extends boolean = false>(options: Options<UpdateProblemData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).patch<UpdateProblemResponse, UpdateProblemError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/problems/{id}',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};

/**
 * Add a task to a problem
 */
export const addTaskToProblem = <ThrowOnError extends boolean = false>(options: Options<AddTaskToProblemData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).post<unknown, AddTaskToProblemError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/problems/{id}/tasks',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};

/**
 * Delete a task from a problem
 */
export const deleteTask = <ThrowOnError extends boolean = false>(options: Options<DeleteTaskData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).delete<unknown, DeleteTaskError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/problems/{id}/tasks/{task_id}',
        ...options
    });
};

/**
 * Submit a task attempt
 */
export const submitProblemTaskAttempt = <ThrowOnError extends boolean = false>(options: Options<SubmitProblemTaskAttemptData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).post<SubmitProblemTaskAttemptResponse, SubmitProblemTaskAttemptError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/problems/{id}/tasks/{task_id}',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};

/**
 * Update a task in a problem
 */
export const updateTask = <ThrowOnError extends boolean = false>(options: Options<UpdateTaskData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).put<unknown, UpdateTaskError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/problems/{id}/tasks/{task_id}',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};

/**
 * Rerun a task attempt
 */
export const rerunTaskAttempt = <ThrowOnError extends boolean = false>(options: Options<RerunTaskAttemptData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).post<unknown, RerunTaskAttemptError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/problems/attempts/{attempt_id}/rerun',
        ...options
    });
};

/**
 * Get results of all task attempts for a task
 */
export const getProblemTaskAttemptResults = <ThrowOnError extends boolean = false>(options: Options<GetProblemTaskAttemptResultsData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).get<GetProblemTaskAttemptResultsResponse, GetProblemTaskAttemptResultsError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/problems/{id}/tasks/{task_id}/attempts',
        ...options
    });
};

/**
 * Make a problem submission
 */
export const makeSubmission = <ThrowOnError extends boolean = false>(options: Options<MakeSubmissionData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).post<MakeSubmissionResponse, MakeSubmissionError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/problems/{id}/submit',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};

/**
 * Get results of a submission
 */
export const getSubmission = <ThrowOnError extends boolean = false>(options: Options<GetSubmissionData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).get<GetSubmissionResponse, GetSubmissionError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/problems/submissions/{submission_id}',
        ...options
    });
};

/**
 * Get all organisations that user owns
 */
export const getAllOrganisations = <ThrowOnError extends boolean = false>(options?: Options<GetAllOrganisationsData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).get<GetAllOrganisationsResponse, GetAllOrganisationsError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/organisations/',
        ...options
    });
};

/**
 * Create a new organisation
 */
export const createOrganisation = <ThrowOnError extends boolean = false>(options: Options<CreateOrganisationData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).post<CreateOrganisationResponse, CreateOrganisationError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/organisations/',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};

/**
 * Delete an organisation
 */
export const deleteOrganisation = <ThrowOnError extends boolean = false>(options: Options<DeleteOrganisationData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).delete<unknown, DeleteOrganisationError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/organisations/{id}',
        ...options
    });
};

/**
 * Get an organisation by ID
 */
export const getOrganisation = <ThrowOnError extends boolean = false>(options: Options<GetOrganisationData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).get<GetOrganisationResponse, GetOrganisationError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/organisations/{id}',
        ...options
    });
};

/**
 * Update an organisation
 */
export const updateOrganisation = <ThrowOnError extends boolean = false>(options: Options<UpdateOrganisationData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).put<UpdateOrganisationResponse, UpdateOrganisationError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/organisations/{id}',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};

/**
 * Create a new project
 */
export const createProject = <ThrowOnError extends boolean = false>(options: Options<CreateProjectData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).post<CreateProjectResponse, CreateProjectError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/organisations/{id}/projects',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};

/**
 * Get all users in an organisation
 */
export const getOrganisationMembers = <ThrowOnError extends boolean = false>(options: Options<GetOrganisationMembersData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).get<GetOrganisationMembersResponse, GetOrganisationMembersError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/organisations/{id}/members',
        ...options
    });
};

/**
 * Create invitation key
 */
export const createOrganisationInvitationKey = <ThrowOnError extends boolean = false>(options: Options<CreateOrganisationInvitationKeyData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).post<unknown, CreateOrganisationInvitationKeyError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/organisations/{id}/invitation_key',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};

/**
 * Delete invitation key
 */
export const deleteOrganisationInvitationKey = <ThrowOnError extends boolean = false>(options: Options<DeleteOrganisationInvitationKeyData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).delete<unknown, DeleteOrganisationInvitationKeyError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/organisations/{id}/invitation_key/{key_id}',
        ...options
    });
};

/**
 * Join an organisation
 */
export const joinOrganisation = <ThrowOnError extends boolean = false>(options: Options<JoinOrganisationData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).post<JoinOrganisationResponse, JoinOrganisationError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/organisations/join',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};

/**
 * Delete member
 */
export const deleteMember = <ThrowOnError extends boolean = false>(options: Options<DeleteMemberData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).delete<unknown, DeleteMemberError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/organisations/{id}/members/{user_id}',
        ...options
    });
};

/**
 * Update member role
 */
export const updateMember = <ThrowOnError extends boolean = false>(options: Options<UpdateMemberData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).put<unknown, UpdateMemberError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/organisations/{id}/members/{user_id}',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};

/**
 * Get all projects user is part of
 */
export const getAllProjects = <ThrowOnError extends boolean = false>(options?: Options<GetAllProjectsData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).get<GetAllProjectsResponse, GetAllProjectsError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/projects/',
        ...options
    });
};

/**
 * Get a project
 */
export const getProject = <ThrowOnError extends boolean = false>(options: Options<GetProjectData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).get<GetProjectResponse, GetProjectError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/projects/{id}',
        ...options
    });
};

/**
 * Update a project
 */
export const updateProject = <ThrowOnError extends boolean = false>(options: Options<UpdateProjectData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).put<UpdateProjectResponse, UpdateProjectError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/projects/{id}',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};

/**
 * Get all roles in a project
 */
export const getProjectRoles = <ThrowOnError extends boolean = false>(options: Options<GetProjectRolesData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).get<GetProjectRolesResponse, GetProjectRolesError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/projects/{id}/roles',
        ...options
    });
};

/**
 * Create a new role
 */
export const createRole = <ThrowOnError extends boolean = false>(options: Options<CreateRoleData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).post<CreateRoleResponse, CreateRoleError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/projects/{id}/roles',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};

/**
 * Get all users in a project
 */
export const getProjectUsers = <ThrowOnError extends boolean = false>(options: Options<GetProjectUsersData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).get<GetProjectUsersResponse, GetProjectUsersError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/projects/{id}/users',
        ...options
    });
};

/**
 * Get all groups in a project
 */
export const getProjectGroups = <ThrowOnError extends boolean = false>(options: Options<GetProjectGroupsData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).get<GetProjectGroupsResponse, GetProjectGroupsError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/projects/{id}/groups',
        ...options
    });
};

/**
 * Create a new group
 */
export const createGroup = <ThrowOnError extends boolean = false>(options: Options<CreateGroupData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).post<CreateGroupResponse, CreateGroupError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/projects/{id}/groups',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};

/**
 * Get all submissions in a project
 */
export const getProjectSubmissions = <ThrowOnError extends boolean = false>(options: Options<GetProjectSubmissionsData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).get<GetProjectSubmissionsResponse, GetProjectSubmissionsError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/projects/{id}/submissions',
        ...options
    });
};

/**
 * Join project by invitation key
 */
export const joinProject = <ThrowOnError extends boolean = false>(options: Options<JoinProjectData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).post<JoinProjectResponse, JoinProjectError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/projects/{key}/join',
        ...options
    });
};

/**
 * Create Problem
 * Create a new problem
 */
export const createProblem = <ThrowOnError extends boolean = false>(options: Options<CreateProblemData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).post<CreateProblemResponse, CreateProblemError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/projects/{id}/problems',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};

/**
 * Delete a role
 */
export const deleteRole = <ThrowOnError extends boolean = false>(options: Options<DeleteRoleData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).delete<unknown, DeleteRoleError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/roles/{id}',
        ...options
    });
};

/**
 * Update a role
 */
export const updateRole = <ThrowOnError extends boolean = false>(options: Options<UpdateRoleData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).put<unknown, UpdateRoleError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/roles/{id}',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};

/**
 * Disable an invitation key
 */
export const deleteInvitationKey = <ThrowOnError extends boolean = false>(options: Options<DeleteInvitationKeyData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).delete<unknown, DeleteInvitationKeyError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/roles/{id}/invitation_key',
        ...options
    });
};

/**
 * Create invitation key
 */
export const createInvitationKey = <ThrowOnError extends boolean = false>(options: Options<CreateInvitationKeyData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).post<unknown, CreateInvitationKeyError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/roles/{id}/invitation_key',
        ...options
    });
};

/**
 * Delete a group
 */
export const deleteGroup = <ThrowOnError extends boolean = false>(options: Options<DeleteGroupData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).delete<unknown, DeleteGroupError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/groups/{id}',
        ...options
    });
};

/**
 * Get a group
 */
export const getGroup = <ThrowOnError extends boolean = false>(options: Options<GetGroupData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).get<GetGroupResponse, GetGroupError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/groups/{id}',
        ...options
    });
};

/**
 * Update a group
 */
export const updateGroup = <ThrowOnError extends boolean = false>(options: Options<UpdateGroupData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).put<UpdateGroupResponse, UpdateGroupError, ThrowOnError>({
        security: [
            {
                scheme: 'bearer',
                type: 'http'
            }
        ],
        url: '/groups/{id}',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};