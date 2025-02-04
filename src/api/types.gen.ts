// This file is auto-generated by @hey-api/openapi-ts

export type BodyLoginAuthTokenPost = {
    grant_type?: string | null;
    username: string;
    password: string;
    scope?: string;
    client_id?: string | null;
    client_secret?: string | null;
};

export type Choice = {
    id: number;
    order_index: number;
    text: string;
};

export type Comparison = {
    operator: Operator;
    value: unknown;
};

export type ComputeContext = {
    language: Language;
    time_limit_secs: number;
    memory_limit_mb: number;
    slurm?: boolean;
    slurm_options?: Array<string>;
    extra_options?: {
        [key: string]: string;
    } | null;
};

export type File = {
    name: string;
    content: string;
};

export type GraphEdge = {
    id: number;
    from_node_id: number;
    from_socket_id: string;
    to_node_id: number;
    to_socket_id: string;
};

export type HttpValidationError = {
    detail?: Array<ValidationError>;
};

export type IfElseStep = {
    id: number;
    inputs: Array<StepSocket>;
    outputs: Array<StepSocket>;
    type: StepType;
};

export type InputStep = {
    id: number;
    inputs: Array<StepSocket>;
    outputs: Array<StepSocket>;
    type: StepType;
};

export type InvitationKeyPublic = {
    key?: string;
    enabled?: boolean;
};

export type Language = 'PYTHON';

export type LoopStep = {
    id: number;
    inputs: Array<StepSocket>;
    outputs: Array<StepSocket>;
    type: StepType;
};

export type MultipleChoiceTask = {
    id: number;
    type: 'MULTIPLE_CHOICE_TASK';
    autograde?: boolean;
    order_index: number;
    question: string;
    choices: Array<Choice>;
    expected_answer: number;
};

export type MultipleChoiceTaskResult = {
    id: number;
    task_attempt_id: number;
    task_type: TaskType;
    started_at: string;
    completed_at: string | null;
    job_id: string | null;
    status: TaskEvalStatus;
    result: boolean;
    error: string | null;
};

export type MultipleResponseTask = {
    id: number;
    type: 'MULTIPLE_RESPONSE_TASK';
    autograde?: boolean;
    order_index: number;
    question: string;
    choices: Array<Choice>;
    expected_answer: Array<number>;
};

export type MultipleResponseTaskResult = {
    id: number;
    task_attempt_id: number;
    task_type: TaskType;
    started_at: string;
    completed_at: string | null;
    job_id: string | null;
    status: TaskEvalStatus;
    result: MultipleResponseTaskResultType | null;
    error: string | null;
};

export type MultipleResponseTaskResultType = {
    correct_choices: Array<number>;
    incorrect_choices: Array<number>;
    num_choices: number;
};

/**
 * A step to retrieve a value from a dictionary.
 * To use this step, the user must provide the key value to access the dictionary.
 */
export type ObjectAccessStep = {
    id: number;
    inputs: Array<StepSocket>;
    outputs: Array<StepSocket>;
    type: StepType;
    key: string;
};

export type Operator = '<' | '=' | '>';

export type Organisation = {
    name: string;
    description: string;
    id?: number | null;
    owner_id: number | null;
};

export type OrganisationCreate = {
    name: string;
    description: string;
};

export type OrganisationPublic = {
    name: string;
    description: string;
    id: number;
};

export type OrganisationPublicWithProjects = {
    name: string;
    description: string;
    id: number;
    projects: Array<ProjectPublic>;
};

export type OrganisationUpdate = {
    name: string;
    description: string;
};

export type OutputSocket = {
    id: string;
    data?: string | number | number | boolean | File | null;
    user_label?: string | null;
    comparison?: Comparison | null;
    public?: boolean;
};

export type OutputStep = {
    id: number;
    inputs: Array<OutputSocket>;
    outputs: Array<OutputSocket>;
    type: StepType;
};

export type Problem = {
    name: string;
    restricted: boolean;
    description: string;
    tasks: Array<({
        type?: 'PROGRAMMING_TASK';
    } & ProgrammingTask) | ({
        type?: 'MULTIPLE_CHOICE_TASK';
    } & MultipleChoiceTask) | ({
        type?: 'MULTIPLE_RESPONSE_TASK';
    } & MultipleResponseTask) | ({
        type?: 'SHORT_ANSWER_TASK';
    } & ShortAnswerTask)>;
};

export type ProblemBase = {
    id: number;
    name: string;
    description: string;
    project_id: number;
    restricted: boolean;
};

export type ProblemOrm = {
    id: number;
    name: string;
    description: string;
    restricted?: boolean;
    project_id: number;
};

export type ProblemPublic = {
    name: string;
    restricted: boolean;
    description: string;
    tasks: Array<({
        type?: 'PROGRAMMING_TASK';
    } & ProgrammingTask) | ({
        type?: 'MULTIPLE_CHOICE_TASK';
    } & MultipleChoiceTask) | ({
        type?: 'MULTIPLE_RESPONSE_TASK';
    } & MultipleResponseTask) | ({
        type?: 'SHORT_ANSWER_TASK';
    } & ShortAnswerTask)>;
    edit: boolean;
    make_submission: boolean;
};

export type ProblemUpdate = {
    name: string;
    restricted: boolean;
    description: string;
    task_order: Array<TaskOrder>;
};

export type ProgrammingTask = {
    id: number;
    type: 'PROGRAMMING_TASK';
    autograde?: boolean;
    order_index: number;
    question: string;
    environment: ComputeContext;
    required_inputs: Array<RequiredInput>;
    testcases: Array<Testcase>;
};

export type ProgrammingTaskResult = {
    id: number;
    task_attempt_id: number;
    task_type: TaskType;
    started_at: string;
    completed_at: string | null;
    job_id: string | null;
    status: TaskEvalStatus;
    result: Array<TestcaseResult> | null;
    error: string | null;
};

export type ProjectCreate = {
    name: string;
};

export type ProjectPublic = {
    name: string;
    id: number;
    roles: Array<RolePublic>;
    view_own_submission: boolean;
    view_others_submission: boolean;
    view_roles: boolean;
    add_roles: boolean;
    edit_roles: boolean;
    create_problems: boolean;
};

export type ProjectPublicWithProblems = {
    name: string;
    id: number;
    roles: Array<RolePublic>;
    view_own_submission: boolean;
    view_others_submission: boolean;
    view_roles: boolean;
    add_roles: boolean;
    edit_roles: boolean;
    create_problems: boolean;
    problems: Array<ProblemBase>;
};

export type ProjectUpdate = {
    name: string;
};

/**
 * A step that runs a Python function.
 * To use this step, the user must provide the function name and the arguments to the function via the input sockets.
 *
 * Socket Name Format:
 * - DATA.IN.ARG.{index}.{name}: For positional arguments
 * - DATA.IN.KWARG.{name}: For keyword arguments
 * - DATA.IN.FILE: For the `File` object that contains the Python function
 */
export type PyRunFunctionStep = {
    id: number;
    inputs: Array<StepSocket>;
    outputs: Array<StepSocket>;
    type: StepType;
    function_identifier: string;
    allow_error?: boolean;
};

export type RequiredInput = {
    id: string;
    data: string | number | number | boolean | File;
};

export type RoleCreate = {
    name: string;
};

export type RolePublic = {
    name: string;
    id: number;
    project_id: number;
    view_problems_access: boolean;
    create_problems_access: boolean;
    edit_problems_access: boolean;
    delete_problems_access: boolean;
    view_restricted_problems_access: boolean;
    edit_restricted_problems_access: boolean;
    delete_restricted_problems_access: boolean;
    make_submission_access: boolean;
    view_own_submission_access: boolean;
    view_others_submission_access: boolean;
};

export type RolePublicWithInvitationKeys = {
    name: string;
    id: number;
    project_id: number;
    view_problems_access: boolean;
    create_problems_access: boolean;
    edit_problems_access: boolean;
    delete_problems_access: boolean;
    view_restricted_problems_access: boolean;
    edit_restricted_problems_access: boolean;
    delete_restricted_problems_access: boolean;
    make_submission_access: boolean;
    view_own_submission_access: boolean;
    view_others_submission_access: boolean;
    invitation_keys: Array<InvitationKeyPublic>;
};

export type RoleUpdate = {
    name: string;
    view_problems_access: boolean;
    create_problems_access: boolean;
    edit_problems_access: boolean;
    delete_problems_access: boolean;
    view_restricted_problems_access: boolean;
    edit_restricted_problems_access: boolean;
    delete_restricted_problems_access: boolean;
    make_submission_access: boolean;
    view_own_submission_access: boolean;
    view_others_submission_access: boolean;
};

export type ShortAnswerTask = {
    id: number;
    type: 'SHORT_ANSWER_TASK';
    autograde?: boolean;
    order_index: number;
    question: string;
    expected_answer?: string | null;
};

export type ShortAnswerTaskResult = {
    id: number;
    task_attempt_id: number;
    task_type: TaskType;
    started_at: string;
    completed_at: string | null;
    job_id: string | null;
    status: TaskEvalStatus;
    result: string | null;
    error: string | null;
};

/**
 * This class is used to store whether the result of an output socket is right or wrong.
 * Note that whether or not to show this information (public) and other variables should be derived from data in Testcase.
 */
export type SocketResult = {
    id: string;
    value: unknown;
    correct: boolean;
};

export type Status = 'OK' | 'MLE' | 'TLE' | 'RTE' | 'WA';

/**
 * A socket that is used to connect steps to each other.
 *
 * Socket ID Format: <TYPE>.<NAME>.<INDEX>
 * - <NAME>.<INDEX> is optional and is used to differentiate between multiple sockets of the same type
 * - Collectively, <NAME>.<INDEX> is referred to as the "label"
 *
 * There can be 2 types of sockets:
 *
 * 1. Control Sockets: Used to control the flow of the program
 * - e.g. CONTROL.<NAME>.<INDEX>
 * 2. Data Sockets: Used to pass data between steps
 * - e.g. DATA.<NAME>.<INDEX>
 */
export type StepSocket = {
    id: string;
    data?: string | number | number | boolean | File | null;
};

export type StepType = 'PY_RUN_FUNCTION_STEP' | 'OBJECT_ACCESS_STEP' | 'INPUT_STEP' | 'OUTPUT_STEP' | 'LOOP_STEP' | 'IF_ELSE_STEP' | 'STRING_MATCH_STEP';

export type StringMatchStep = {
    id: number;
    inputs: Array<StepSocket>;
    outputs: Array<StepSocket>;
    type: StepType;
};

export type SubmissionPublic = {
    id: number;
    problem_id: number;
    user_id: number;
    submitted_at: string | null;
    task_attempts: Array<TaskAttemptPublic>;
    user: UserPublic;
};

export type TaskAttemptPublic = {
    id: number;
    user_id: number;
    task_id: number;
    task_type: TaskType;
    other_fields: {
        [key: string]: unknown;
    };
    task_results: Array<TaskResult>;
    task: TaskOrm;
};

export type TaskAttemptResult = {
    id: number;
    user_id: number;
    task_id: number;
    task_type: TaskType;
    other_fields: {
        [key: string]: unknown;
    };
    task_results: Array<TaskResult>;
};

export type TaskEvalStatus = 'SUCCESS' | 'PENDING' | 'SKIPPED' | 'FAILED';

export type TaskOrm = {
    id: number;
    type: TaskType;
    autograde: boolean;
    other_fields?: {
        [key: string]: unknown;
    };
    updated_version_id: number | null;
    order_index: number;
    problem_id: number;
};

export type TaskOrder = {
    id: number;
    order_index: number;
};

export type TaskResult = MultipleChoiceTaskResult | MultipleResponseTaskResult | ProgrammingTaskResult | ShortAnswerTaskResult;

export type TaskType = 'MULTIPLE_CHOICE_TASK' | 'MULTIPLE_RESPONSE_TASK' | 'SHORT_ANSWER_TASK' | 'PROGRAMMING_TASK';

export type TaskUpdate = {
    task: ProgrammingTask | MultipleChoiceTask | MultipleResponseTask | ShortAnswerTask;
    rerun: boolean;
};

export type Testcase = {
    nodes: Array<OutputStep | InputStep | PyRunFunctionStep | LoopStep | IfElseStep | StringMatchStep | ObjectAccessStep>;
    edges: Array<GraphEdge>;
    id: number;
};

export type TestcaseResult = {
    status: Status;
    stdout: string;
    stderr: string;
    id: number;
    results?: Array<SocketResult> | null;
};

export type Token = {
    access_token: string;
    token_type: string;
    user: UserPublic;
};

export type UserCreate = {
    username: string;
    password: string;
    confirm_password: string;
};

export type UserInput = {
    task_id: number;
    value: unknown;
};

export type UserPublic = {
    id: number;
    username: string;
};

export type UserPublicWithRoles = {
    id: number;
    username: string;
    roles: Array<RolePublic>;
};

export type ValidationError = {
    loc: Array<string | number>;
    msg: string;
    type: string;
};

export type LoginData = {
    body: BodyLoginAuthTokenPost;
    path?: never;
    query?: never;
    url: '/auth/token';
};

export type LoginErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type LoginError = LoginErrors[keyof LoginErrors];

export type LoginResponses = {
    /**
     * Successful Response
     */
    200: Token;
};

export type LoginResponse = LoginResponses[keyof LoginResponses];

export type SignupData = {
    body: UserCreate;
    path?: never;
    query?: never;
    url: '/auth/signup';
};

export type SignupErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type SignupError = SignupErrors[keyof SignupErrors];

export type SignupResponses = {
    /**
     * Successful Response
     */
    200: Token;
};

export type SignupResponse = SignupResponses[keyof SignupResponses];

export type LogoutData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/auth/logout';
};

export type LogoutResponses = {
    /**
     * Successful Response
     */
    200: unknown;
};

export type GetUserData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/auth/session';
};

export type GetUserErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type GetUserError = GetUserErrors[keyof GetUserErrors];

export type GetUserResponses = {
    /**
     * Successful Response
     */
    200: UserPublic;
};

export type GetUserResponse = GetUserResponses[keyof GetUserResponses];

export type GetProblemData = {
    body?: never;
    path: {
        id: number;
    };
    query?: never;
    url: '/problems/{id}';
};

export type GetProblemErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type GetProblemError = GetProblemErrors[keyof GetProblemErrors];

export type GetProblemResponses = {
    /**
     * Successful Response
     */
    200: ProblemPublic;
};

export type GetProblemResponse = GetProblemResponses[keyof GetProblemResponses];

export type UpdateProblemData = {
    body: ProblemUpdate;
    path: {
        id: number;
    };
    query?: never;
    url: '/problems/{id}';
};

export type UpdateProblemErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type UpdateProblemError = UpdateProblemErrors[keyof UpdateProblemErrors];

export type UpdateProblemResponses = {
    /**
     * Successful Response
     */
    200: Problem;
};

export type UpdateProblemResponse = UpdateProblemResponses[keyof UpdateProblemResponses];

export type AddTaskToProblemData = {
    body: ProgrammingTask | MultipleChoiceTask | MultipleResponseTask | ShortAnswerTask;
    path: {
        id: number;
    };
    query?: never;
    url: '/problems/{id}/tasks';
};

export type AddTaskToProblemErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type AddTaskToProblemError = AddTaskToProblemErrors[keyof AddTaskToProblemErrors];

export type AddTaskToProblemResponses = {
    /**
     * Successful Response
     */
    200: unknown;
};

export type DeleteTaskData = {
    body?: never;
    path: {
        task_id: number;
        id: number;
    };
    query?: never;
    url: '/problems/{id}/tasks/{task_id}';
};

export type DeleteTaskErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type DeleteTaskError = DeleteTaskErrors[keyof DeleteTaskErrors];

export type DeleteTaskResponses = {
    /**
     * Successful Response
     */
    200: unknown;
};

export type SubmitProblemTaskAttemptData = {
    body: UserInput;
    path: {
        task_id: number;
        id: number;
    };
    query?: never;
    url: '/problems/{id}/tasks/{task_id}';
};

export type SubmitProblemTaskAttemptErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type SubmitProblemTaskAttemptError = SubmitProblemTaskAttemptErrors[keyof SubmitProblemTaskAttemptErrors];

export type SubmitProblemTaskAttemptResponses = {
    /**
     * Successful Response
     */
    200: TaskAttemptPublic;
};

export type SubmitProblemTaskAttemptResponse = SubmitProblemTaskAttemptResponses[keyof SubmitProblemTaskAttemptResponses];

export type UpdateTaskData = {
    body: TaskUpdate;
    path: {
        task_id: number;
        id: number;
    };
    query?: never;
    url: '/problems/{id}/tasks/{task_id}';
};

export type UpdateTaskErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type UpdateTaskError = UpdateTaskErrors[keyof UpdateTaskErrors];

export type UpdateTaskResponses = {
    /**
     * Successful Response
     */
    200: unknown;
};

export type GetProblemTaskAttemptResultsData = {
    body?: never;
    path: {
        task_id: number;
        id: number;
    };
    query?: never;
    url: '/problems/{id}/tasks/{task_id}/attempts';
};

export type GetProblemTaskAttemptResultsErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type GetProblemTaskAttemptResultsError = GetProblemTaskAttemptResultsErrors[keyof GetProblemTaskAttemptResultsErrors];

export type GetProblemTaskAttemptResultsResponses = {
    /**
     * Successful Response
     */
    200: Array<TaskAttemptResult>;
};

export type GetProblemTaskAttemptResultsResponse = GetProblemTaskAttemptResultsResponses[keyof GetProblemTaskAttemptResultsResponses];

export type MakeSubmissionData = {
    body: Array<number>;
    path: {
        id: number;
    };
    query?: never;
    url: '/problems/{id}/submit';
};

export type MakeSubmissionErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type MakeSubmissionError = MakeSubmissionErrors[keyof MakeSubmissionErrors];

export type MakeSubmissionResponses = {
    /**
     * Successful Response
     */
    200: SubmissionPublic;
};

export type MakeSubmissionResponse = MakeSubmissionResponses[keyof MakeSubmissionResponses];

export type GetSubmissionData = {
    body?: never;
    path: {
        submission_id: number;
    };
    query?: {
        task_id?: number | null;
    };
    url: '/problems/submissions/{submission_id}';
};

export type GetSubmissionErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type GetSubmissionError = GetSubmissionErrors[keyof GetSubmissionErrors];

export type GetSubmissionResponses = {
    /**
     * Successful Response
     */
    200: SubmissionPublic;
};

export type GetSubmissionResponse = GetSubmissionResponses[keyof GetSubmissionResponses];

export type GetAllOrganisationsData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/organisations/';
};

export type GetAllOrganisationsErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type GetAllOrganisationsError = GetAllOrganisationsErrors[keyof GetAllOrganisationsErrors];

export type GetAllOrganisationsResponses = {
    /**
     * Successful Response
     */
    200: Array<Organisation>;
};

export type GetAllOrganisationsResponse = GetAllOrganisationsResponses[keyof GetAllOrganisationsResponses];

export type CreateOrganisationData = {
    body: OrganisationCreate;
    path?: never;
    query?: never;
    url: '/organisations/';
};

export type CreateOrganisationErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type CreateOrganisationError = CreateOrganisationErrors[keyof CreateOrganisationErrors];

export type CreateOrganisationResponses = {
    /**
     * Successful Response
     */
    200: OrganisationPublic;
};

export type CreateOrganisationResponse = CreateOrganisationResponses[keyof CreateOrganisationResponses];

export type DeleteOrganisationData = {
    body?: never;
    path: {
        id: number;
    };
    query?: never;
    url: '/organisations/{id}';
};

export type DeleteOrganisationErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type DeleteOrganisationError = DeleteOrganisationErrors[keyof DeleteOrganisationErrors];

export type DeleteOrganisationResponses = {
    /**
     * Successful Response
     */
    200: unknown;
};

export type GetOrganisationData = {
    body?: never;
    path: {
        id: number;
    };
    query?: never;
    url: '/organisations/{id}';
};

export type GetOrganisationErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type GetOrganisationError = GetOrganisationErrors[keyof GetOrganisationErrors];

export type GetOrganisationResponses = {
    /**
     * Successful Response
     */
    200: OrganisationPublicWithProjects;
};

export type GetOrganisationResponse = GetOrganisationResponses[keyof GetOrganisationResponses];

export type UpdateOrganisationData = {
    body: OrganisationUpdate;
    path: {
        id: number;
    };
    query?: never;
    url: '/organisations/{id}';
};

export type UpdateOrganisationErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type UpdateOrganisationError = UpdateOrganisationErrors[keyof UpdateOrganisationErrors];

export type UpdateOrganisationResponses = {
    /**
     * Successful Response
     */
    200: OrganisationPublic;
};

export type UpdateOrganisationResponse = UpdateOrganisationResponses[keyof UpdateOrganisationResponses];

export type CreateProjectData = {
    body: ProjectCreate;
    path: {
        id: number;
    };
    query?: never;
    url: '/organisations/{id}/projects';
};

export type CreateProjectErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type CreateProjectError = CreateProjectErrors[keyof CreateProjectErrors];

export type CreateProjectResponses = {
    /**
     * Successful Response
     */
    200: ProjectPublic;
};

export type CreateProjectResponse = CreateProjectResponses[keyof CreateProjectResponses];

export type GetAllProjectsData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/projects/';
};

export type GetAllProjectsErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type GetAllProjectsError = GetAllProjectsErrors[keyof GetAllProjectsErrors];

export type GetAllProjectsResponses = {
    /**
     * Successful Response
     */
    200: Array<ProjectPublic>;
};

export type GetAllProjectsResponse = GetAllProjectsResponses[keyof GetAllProjectsResponses];

export type GetProjectData = {
    body?: never;
    path: {
        id: number;
    };
    query?: never;
    url: '/projects/{id}';
};

export type GetProjectErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type GetProjectError = GetProjectErrors[keyof GetProjectErrors];

export type GetProjectResponses = {
    /**
     * Successful Response
     */
    200: ProjectPublicWithProblems;
};

export type GetProjectResponse = GetProjectResponses[keyof GetProjectResponses];

export type UpdateProjectData = {
    body: ProjectUpdate;
    path: {
        id: number;
    };
    query?: never;
    url: '/projects/{id}';
};

export type UpdateProjectErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type UpdateProjectError = UpdateProjectErrors[keyof UpdateProjectErrors];

export type UpdateProjectResponses = {
    /**
     * Successful Response
     */
    200: ProjectPublic;
};

export type UpdateProjectResponse = UpdateProjectResponses[keyof UpdateProjectResponses];

export type GetProjectRolesData = {
    body?: never;
    path: {
        id: number;
    };
    query?: never;
    url: '/projects/{id}/roles';
};

export type GetProjectRolesErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type GetProjectRolesError = GetProjectRolesErrors[keyof GetProjectRolesErrors];

export type GetProjectRolesResponses = {
    /**
     * Successful Response
     */
    200: Array<RolePublicWithInvitationKeys>;
};

export type GetProjectRolesResponse = GetProjectRolesResponses[keyof GetProjectRolesResponses];

export type CreateRoleData = {
    body: RoleCreate;
    path: {
        id: number;
    };
    query?: never;
    url: '/projects/{id}/roles';
};

export type CreateRoleErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type CreateRoleError = CreateRoleErrors[keyof CreateRoleErrors];

export type CreateRoleResponses = {
    /**
     * Successful Response
     */
    200: RolePublic;
};

export type CreateRoleResponse = CreateRoleResponses[keyof CreateRoleResponses];

export type GetProjectUsersData = {
    body?: never;
    path: {
        id: number;
    };
    query?: never;
    url: '/projects/{id}/users';
};

export type GetProjectUsersErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type GetProjectUsersError = GetProjectUsersErrors[keyof GetProjectUsersErrors];

export type GetProjectUsersResponses = {
    /**
     * Successful Response
     */
    200: Array<UserPublicWithRoles>;
};

export type GetProjectUsersResponse = GetProjectUsersResponses[keyof GetProjectUsersResponses];

export type GetProjectSubmissionsData = {
    body?: never;
    path: {
        id: number;
    };
    query?: {
        all_users?: boolean;
    };
    url: '/projects/{id}/submissions';
};

export type GetProjectSubmissionsErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type GetProjectSubmissionsError = GetProjectSubmissionsErrors[keyof GetProjectSubmissionsErrors];

export type GetProjectSubmissionsResponses = {
    /**
     * Successful Response
     */
    200: Array<SubmissionPublic>;
};

export type GetProjectSubmissionsResponse = GetProjectSubmissionsResponses[keyof GetProjectSubmissionsResponses];

export type JoinProjectData = {
    body?: never;
    path: {
        key: string;
    };
    query?: never;
    url: '/projects/{key}/join';
};

export type JoinProjectErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type JoinProjectError = JoinProjectErrors[keyof JoinProjectErrors];

export type JoinProjectResponses = {
    /**
     * Successful Response
     */
    200: ProjectPublic;
};

export type JoinProjectResponse = JoinProjectResponses[keyof JoinProjectResponses];

export type CreateProblemData = {
    body: Problem;
    path: {
        id: number;
    };
    query?: never;
    url: '/projects/{id}/problems';
};

export type CreateProblemErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type CreateProblemError = CreateProblemErrors[keyof CreateProblemErrors];

export type CreateProblemResponses = {
    /**
     * Successful Response
     */
    200: ProblemOrm;
};

export type CreateProblemResponse = CreateProblemResponses[keyof CreateProblemResponses];

export type DeleteRoleData = {
    body?: never;
    path: {
        id: number;
    };
    query?: never;
    url: '/roles/{id}';
};

export type DeleteRoleErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type DeleteRoleError = DeleteRoleErrors[keyof DeleteRoleErrors];

export type DeleteRoleResponses = {
    /**
     * Successful Response
     */
    200: unknown;
};

export type UpdateRoleData = {
    body: RoleUpdate;
    path: {
        id: number;
    };
    query?: never;
    url: '/roles/{id}';
};

export type UpdateRoleErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type UpdateRoleError = UpdateRoleErrors[keyof UpdateRoleErrors];

export type UpdateRoleResponses = {
    /**
     * Successful Response
     */
    200: unknown;
};

export type DeleteInvitationKeyData = {
    body?: never;
    path: {
        id: number;
    };
    query?: never;
    url: '/roles/{id}/invitation_key';
};

export type DeleteInvitationKeyErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type DeleteInvitationKeyError = DeleteInvitationKeyErrors[keyof DeleteInvitationKeyErrors];

export type DeleteInvitationKeyResponses = {
    /**
     * Successful Response
     */
    200: unknown;
};

export type CreateInvitationKeyData = {
    body?: never;
    path: {
        id: number;
    };
    query?: never;
    url: '/roles/{id}/invitation_key';
};

export type CreateInvitationKeyErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type CreateInvitationKeyError = CreateInvitationKeyErrors[keyof CreateInvitationKeyErrors];

export type CreateInvitationKeyResponses = {
    /**
     * Successful Response
     */
    200: unknown;
};