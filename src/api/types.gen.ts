// This file is auto-generated by @hey-api/openapi-ts

export type Body_login_auth_token_post = {
    grant_type?: (string | null);
    username: string;
    password: string;
    scope?: string;
    client_id?: (string | null);
    client_secret?: (string | null);
};

export type ContestSubmission = {
    expected_answers: Array<ExpectedAnswer>;
    user_inputs: Array<UserInput>;
};

export type Definition = {
    name: string;
    description: string;
    tasks: Array<Task>;
};

export type DefinitionORM = {
    id: number;
    name: string;
    description: string;
};

export type ExpectedAnswer = {
    task_id: number;
    expected_answer: unknown;
};

export type HTTPValidationError = {
    detail?: Array<ValidationError>;
};

export type Task = {
    id: number;
    type: TaskType;
    autograde?: boolean;
};

export type TaskEvalStatus = 'SUCCESS' | 'PENDING' | 'SKIPPED' | 'FAILED';

export type TaskResultORM = {
    id: number;
    submission_id: number;
    definition_id: number;
    task_id: number;
    started_at: string;
    completed_at: (string | null);
    job_id: (string | null);
    status: TaskEvalStatus;
    result?: {
        [key: string]: unknown;
    };
    error: (string | null);
};

export type TaskType = 'MULTIPLE_CHOICE_TASK' | 'MULTIPLE_RESPONSE_TASK' | 'SHORT_ANSWER_TASK' | 'PROGRAMMING_TASK';

export type Token = {
    access_token: string;
    token_type: string;
    user: UserPublic;
};

export type UserInput = {
    task_id: number;
    user_input: unknown;
};

export type UserPublic = {
    id: number;
    username: string;
};

export type ValidationError = {
    loc: Array<(string | number)>;
    msg: string;
    type: string;
};

export type LoginAuthTokenPostData = {
    body: Body_login_auth_token_post;
};

export type LoginAuthTokenPostResponse = (Token);

export type LoginAuthTokenPostError = (HTTPValidationError);

export type LogoutAuthLogoutGetResponse = (unknown);

export type LogoutAuthLogoutGetError = unknown;

export type GetUserAuthSessionGetData = unknown;

export type GetUserAuthSessionGetResponse = (UserPublic);

export type GetUserAuthSessionGetError = (HTTPValidationError);

export type GetDefinitionsContestsDefinitionsGetData = unknown;

export type GetDefinitionsContestsDefinitionsGetResponse = (Array<DefinitionORM>);

export type GetDefinitionsContestsDefinitionsGetError = (HTTPValidationError);

export type SubmitDefinitionContestsDefinitionsPostData = {
    body: Definition;
};

export type SubmitDefinitionContestsDefinitionsPostResponse = (DefinitionORM);

export type SubmitDefinitionContestsDefinitionsPostError = (HTTPValidationError);

export type GetDefinitionContestsDefinitionsIdGetData = {
    path: {
        id: number;
    };
};

export type GetDefinitionContestsDefinitionsIdGetResponse = (Definition);

export type GetDefinitionContestsDefinitionsIdGetError = (HTTPValidationError);

export type UpdateDefinitionContestsDefinitionsIdPatchData = {
    body: Definition;
    path: {
        id: number;
    };
};

export type UpdateDefinitionContestsDefinitionsIdPatchResponse = (DefinitionORM);

export type UpdateDefinitionContestsDefinitionsIdPatchError = (HTTPValidationError);

export type SubmitContestSubmissionContestsDefinitionsIdSubmissionsPostData = {
    body: ContestSubmission;
    path: {
        id: number;
    };
    query?: {
        task_id?: (number | null);
    };
};

export type SubmitContestSubmissionContestsDefinitionsIdSubmissionsPostResponse = (Array<TaskResultORM>);

export type SubmitContestSubmissionContestsDefinitionsIdSubmissionsPostError = (HTTPValidationError);

export type GetSubmissionContestsSubmissionsSubmissionIdGetData = {
    path: {
        submission_id: number;
    };
    query?: {
        task_id?: (number | null);
    };
};

export type GetSubmissionContestsSubmissionsSubmissionIdGetResponse = (Array<TaskResultORM>);

export type GetSubmissionContestsSubmissionsSubmissionIdGetError = (HTTPValidationError);