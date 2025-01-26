// This file is auto-generated by @hey-api/openapi-ts

export type Body_login_auth_token_post = {
    grant_type?: (string | null);
    username: string;
    password: string;
    scope?: string;
    client_id?: (string | null);
    client_secret?: (string | null);
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
    slurm_options?: Array<(string)>;
    extra_options?: ({
    [key: string]: (string);
} | null);
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

export type GroupCreate = {
    name: string;
};

export type GroupMemberPublicWithGroup = {
    is_supervisor: boolean;
    group: MiniGroupPublic;
};

export type GroupPublic = {
    id: number;
    name: string;
    members: Array<MiniGroupMemberPublic>;
};

export type GroupUpdate = {
    name: string;
    members: Array<(number)>;
    supervisors: Array<(number)>;
};

export type HTTPValidationError = {
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

export type MiniGroupMemberPublic = {
    is_supervisor: boolean;
    user: UserPublic;
};

export type MiniGroupPublic = {
    id: number;
    name: string;
};

export type MiniProblemPublic = {
    id: number;
    name: string;
};

export type MultipleChoiceTask = {
    id: number;
    type: "MULTIPLE_CHOICE_TASK";
    autograde?: boolean;
    question: string;
    choices: Array<(string)>;
    expected_answer: number;
};

export type MultipleChoiceTaskResult = {
    id: number;
    task_attempt_id: number;
    task_type: TaskType;
    started_at: string;
    completed_at: (string | null);
    job_id: (string | null);
    status: TaskEvalStatus;
    result: boolean;
    error: (string | null);
};

export type MultipleResponseTask = {
    id: number;
    type: "MULTIPLE_RESPONSE_TASK";
    autograde?: boolean;
    question: string;
    choices: Array<(string)>;
    expected_answer: Array<(number)>;
};

export type MultipleResponseTaskResult = {
    id: number;
    task_attempt_id: number;
    task_type: TaskType;
    started_at: string;
    completed_at: (string | null);
    job_id: (string | null);
    status: TaskEvalStatus;
    result: (MultipleResponseTaskResultType | null);
    error: (string | null);
};

export type MultipleResponseTaskResultType = {
    correct_choices: Array<(number)>;
    incorrect_choices: Array<(number)>;
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
    id?: (number | null);
    owner_id: (number | null);
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
    data?: (string | number | boolean | File | null);
    user_label?: (string | null);
    comparison?: (Comparison | null);
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
    tasks: Array<(ProgrammingTask | MultipleChoiceTask | MultipleResponseTask | ShortAnswerTask)>;
};

export type ProblemBase = {
    id: number;
    name: string;
    description: string;
    project_id: number;
};

export type ProblemORM = {
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
    tasks: Array<(ProgrammingTask | MultipleChoiceTask | MultipleResponseTask | ShortAnswerTask)>;
    edit: boolean;
    make_submission: boolean;
};

export type ProgrammingTask = {
    id: number;
    type: "PROGRAMMING_TASK";
    autograde?: boolean;
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
    completed_at: (string | null);
    job_id: (string | null);
    status: TaskEvalStatus;
    result: (Array<TestcaseResult> | null);
    error: (string | null);
};

export type ProjectCreate = {
    name: string;
};

export type ProjectPublic = {
    name: string;
    id: number;
    roles: Array<RolePublic>;
    view_own_submission: boolean;
    view_supervised_submission: boolean;
    view_others_submission: boolean;
    view_roles: boolean;
    add_roles: boolean;
    edit_roles: boolean;
    create_problems: boolean;
    view_groups: boolean;
    create_groups: boolean;
    edit_groups: boolean;
    delete_groups: boolean;
};

export type ProjectPublicWithProblems = {
    name: string;
    id: number;
    roles: Array<RolePublic>;
    view_own_submission: boolean;
    view_supervised_submission: boolean;
    view_others_submission: boolean;
    view_roles: boolean;
    add_roles: boolean;
    edit_roles: boolean;
    create_problems: boolean;
    view_groups: boolean;
    create_groups: boolean;
    edit_groups: boolean;
    delete_groups: boolean;
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
    data: (string | number | boolean | File);
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
    view_supervised_submission_access: boolean;
    view_others_submission_access: boolean;
    view_groups_access: boolean;
    create_groups_access: boolean;
    edit_groups_access: boolean;
    delete_groups_access: boolean;
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
    view_supervised_submission_access: boolean;
    view_others_submission_access: boolean;
    view_groups_access: boolean;
    create_groups_access: boolean;
    edit_groups_access: boolean;
    delete_groups_access: boolean;
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
    view_supervised_submission_access: boolean;
    view_others_submission_access: boolean;
    view_groups_access: boolean;
    create_groups_access: boolean;
    edit_groups_access: boolean;
    delete_groups_access: boolean;
};

export type ShortAnswerTask = {
    id: number;
    type: "SHORT_ANSWER_TASK";
    autograde?: boolean;
    question: string;
    expected_answer?: (string | null);
};

export type ShortAnswerTaskResult = {
    id: number;
    task_attempt_id: number;
    task_type: TaskType;
    started_at: string;
    completed_at: (string | null);
    job_id: (string | null);
    status: TaskEvalStatus;
    result: (string | null);
    error: (string | null);
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
    data?: (string | number | boolean | File | null);
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
    submitted_at: (string | null);
    task_attempts: Array<TaskAttemptPublic>;
    user: UserPublicWithRolesAndGroups;
    problem: MiniProblemPublic;
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
    task: TaskORM;
};

export type TaskEvalStatus = 'SUCCESS' | 'PENDING' | 'SKIPPED' | 'FAILED';

export type TaskORM = {
    id: number;
    type: TaskType;
    autograde: boolean;
    other_fields?: {
        [key: string]: unknown;
    };
    problem_id: number;
};

export type TaskResult = MultipleChoiceTaskResult | MultipleResponseTaskResult | ProgrammingTaskResult | ShortAnswerTaskResult;

export type TaskType = 'MULTIPLE_CHOICE_TASK' | 'MULTIPLE_RESPONSE_TASK' | 'SHORT_ANSWER_TASK' | 'PROGRAMMING_TASK';

export type Testcase = {
    nodes: Array<(OutputStep | InputStep | PyRunFunctionStep | LoopStep | IfElseStep | StringMatchStep | ObjectAccessStep)>;
    edges: Array<GraphEdge>;
    id: number;
};

export type TestcaseResult = {
    status: Status;
    stdout: string;
    stderr: string;
    id: number;
    results?: (Array<SocketResult> | null);
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

export type UserPublicWithRolesAndGroups = {
    id: number;
    username: string;
    roles: Array<RolePublic>;
    group_members: Array<GroupMemberPublicWithGroup>;
};

export type ValidationError = {
    loc: Array<(string | number)>;
    msg: string;
    type: string;
};

export type LoginData = {
    body: Body_login_auth_token_post;
};

export type LoginResponse = (Token);

export type LoginError = (HTTPValidationError);

export type SignupData = {
    body: UserCreate;
};

export type SignupResponse = (Token);

export type SignupError = (HTTPValidationError);

export type LogoutResponse = (unknown);

export type LogoutError = unknown;

export type GetUserData = unknown;

export type GetUserResponse = (UserPublic);

export type GetUserError = (HTTPValidationError);

export type GetProblemData = {
    path: {
        id: number;
    };
};

export type GetProblemResponse = (ProblemPublic);

export type GetProblemError = (HTTPValidationError);

export type UpdateProblemData = {
    body: Problem;
    path: {
        id: number;
    };
};

export type UpdateProblemResponse = (Problem);

export type UpdateProblemError = (HTTPValidationError);

export type AddTaskToProblemData = {
    body: (ProgrammingTask | MultipleChoiceTask | MultipleResponseTask | ShortAnswerTask);
    path: {
        id: number;
    };
};

export type AddTaskToProblemResponse = (unknown);

export type AddTaskToProblemError = (HTTPValidationError);

export type SubmitProblemTaskAttemptData = {
    body: UserInput;
    path: {
        id: number;
        task_id: number;
    };
};

export type SubmitProblemTaskAttemptResponse = (TaskAttemptPublic);

export type SubmitProblemTaskAttemptError = (HTTPValidationError);

export type MakeSubmissionData = {
    body: Array<(number)>;
    path: {
        id: number;
    };
};

export type MakeSubmissionResponse = (SubmissionPublic);

export type MakeSubmissionError = (HTTPValidationError);

export type GetSubmissionData = {
    path: {
        submission_id: number;
    };
    query?: {
        task_id?: (number | null);
    };
};

export type GetSubmissionResponse = (SubmissionPublic);

export type GetSubmissionError = (HTTPValidationError);

export type GetAllOrganisationsData = unknown;

export type GetAllOrganisationsResponse = (Array<Organisation>);

export type GetAllOrganisationsError = (HTTPValidationError);

export type CreateOrganisationData = {
    body: OrganisationCreate;
};

export type CreateOrganisationResponse = (OrganisationPublic);

export type CreateOrganisationError = (HTTPValidationError);

export type UpdateOrganisationData = {
    body: OrganisationUpdate;
    path: {
        id: number;
    };
};

export type UpdateOrganisationResponse = (OrganisationPublic);

export type UpdateOrganisationError = (HTTPValidationError);

export type DeleteOrganisationData = {
    path: {
        id: number;
    };
};

export type DeleteOrganisationResponse = (unknown);

export type DeleteOrganisationError = (HTTPValidationError);

export type GetOrganisationData = {
    path: {
        id: number;
    };
};

export type GetOrganisationResponse = (OrganisationPublicWithProjects);

export type GetOrganisationError = (HTTPValidationError);

export type CreateProjectData = {
    body: ProjectCreate;
    path: {
        id: number;
    };
};

export type CreateProjectResponse = (ProjectPublic);

export type CreateProjectError = (HTTPValidationError);

export type GetAllProjectsData = unknown;

export type GetAllProjectsResponse = (Array<ProjectPublic>);

export type GetAllProjectsError = (HTTPValidationError);

export type GetProjectData = {
    path: {
        id: number;
    };
};

export type GetProjectResponse = (ProjectPublicWithProblems);

export type GetProjectError = (HTTPValidationError);

export type UpdateProjectData = {
    body: ProjectUpdate;
    path: {
        id: number;
    };
};

export type UpdateProjectResponse = (ProjectPublic);

export type UpdateProjectError = (HTTPValidationError);

export type GetProjectRolesData = {
    path: {
        id: number;
    };
};

export type GetProjectRolesResponse = (Array<RolePublicWithInvitationKeys>);

export type GetProjectRolesError = (HTTPValidationError);

export type CreateRoleData = {
    body: RoleCreate;
    path: {
        id: number;
    };
};

export type CreateRoleResponse = (RolePublic);

export type CreateRoleError = (HTTPValidationError);

export type GetProjectUsersData = {
    path: {
        id: number;
    };
};

export type GetProjectUsersResponse = (Array<UserPublicWithRolesAndGroups>);

export type GetProjectUsersError = (HTTPValidationError);

export type GetProjectGroupsData = {
    path: {
        id: number;
    };
};

export type GetProjectGroupsResponse = (Array<GroupPublic>);

export type GetProjectGroupsError = (HTTPValidationError);

export type CreateGroupData = {
    body: GroupCreate;
    path: {
        id: number;
    };
};

export type CreateGroupResponse = (GroupPublic);

export type CreateGroupError = (HTTPValidationError);

export type GetProjectSubmissionsData = {
    path: {
        id: number;
    };
    query?: {
        all_users?: boolean;
    };
};

export type GetProjectSubmissionsResponse = (Array<SubmissionPublic>);

export type GetProjectSubmissionsError = (HTTPValidationError);

export type JoinProjectData = {
    path: {
        key: string;
    };
};

export type JoinProjectResponse = (ProjectPublic);

export type JoinProjectError = (HTTPValidationError);

export type CreateProblemData = {
    body: Problem;
    path: {
        id: number;
    };
};

export type CreateProblemResponse = (ProblemORM);

export type CreateProblemError = (HTTPValidationError);

export type UpdateRoleData = {
    body: RoleUpdate;
    path: {
        id: number;
    };
};

export type UpdateRoleResponse = (unknown);

export type UpdateRoleError = (HTTPValidationError);

export type DeleteRoleData = {
    path: {
        id: number;
    };
};

export type DeleteRoleResponse = (unknown);

export type DeleteRoleError = (HTTPValidationError);

export type CreateInvitationKeyData = {
    path: {
        id: number;
    };
};

export type CreateInvitationKeyResponse = (unknown);

export type CreateInvitationKeyError = (HTTPValidationError);

export type DeleteInvitationKeyData = {
    path: {
        id: number;
    };
};

export type DeleteInvitationKeyResponse = (unknown);

export type DeleteInvitationKeyError = (HTTPValidationError);

export type GetGroupData = {
    path: {
        id: number;
    };
};

export type GetGroupResponse = (GroupPublic);

export type GetGroupError = (HTTPValidationError);

export type UpdateGroupData = {
    body: GroupUpdate;
    path: {
        id: number;
    };
};

export type UpdateGroupResponse = (GroupPublic);

export type UpdateGroupError = (HTTPValidationError);

export type DeleteGroupData = {
    path: {
        id: number;
    };
};

export type DeleteGroupResponse = (unknown);

export type DeleteGroupError = (HTTPValidationError);