// This file is auto-generated by @hey-api/openapi-ts

export const Body_login_auth_token_postSchema = {
    properties: {
        grant_type: {
            anyOf: [
                {
                    type: 'string',
                    pattern: 'password'
                },
                {
                    type: 'null'
                }
            ],
            title: 'Grant Type'
        },
        username: {
            type: 'string',
            title: 'Username'
        },
        password: {
            type: 'string',
            title: 'Password'
        },
        scope: {
            type: 'string',
            title: 'Scope',
            default: ''
        },
        client_id: {
            anyOf: [
                {
                    type: 'string'
                },
                {
                    type: 'null'
                }
            ],
            title: 'Client Id'
        },
        client_secret: {
            anyOf: [
                {
                    type: 'string'
                },
                {
                    type: 'null'
                }
            ],
            title: 'Client Secret'
        }
    },
    type: 'object',
    required: ['username', 'password'],
    title: 'Body_login_auth_token_post'
} as const;

export const FileSchema = {
    properties: {
        file_name: {
            type: 'string',
            title: 'File Name'
        },
        content: {
            type: 'string',
            title: 'Content'
        }
    },
    type: 'object',
    required: ['file_name', 'content'],
    title: 'File'
} as const;

export const GraphEdgeSchema = {
    properties: {
        id: {
            type: 'integer',
            title: 'Id'
        },
        from_node_id: {
            type: 'integer',
            title: 'From Node Id'
        },
        from_socket_id: {
            type: 'string',
            title: 'From Socket Id'
        },
        to_node_id: {
            type: 'integer',
            title: 'To Node Id'
        },
        to_socket_id: {
            type: 'string',
            title: 'To Socket Id'
        }
    },
    type: 'object',
    required: ['id', 'from_node_id', 'from_socket_id', 'to_node_id', 'to_socket_id'],
    title: 'GraphEdge'
} as const;

export const HTTPValidationErrorSchema = {
    properties: {
        detail: {
            items: {
                '$ref': '#/components/schemas/ValidationError'
            },
            type: 'array',
            title: 'Detail'
        }
    },
    type: 'object',
    title: 'HTTPValidationError'
} as const;

export const InvitationKeyPublicSchema = {
    properties: {
        key: {
            type: 'string',
            format: 'uuid',
            title: 'Key'
        },
        enabled: {
            type: 'boolean',
            title: 'Enabled',
            default: true
        }
    },
    type: 'object',
    title: 'InvitationKeyPublic'
} as const;

export const MultipleChoiceTaskSchema = {
    properties: {
        id: {
            type: 'integer',
            title: 'Id'
        },
        type: {
            type: 'string',
            const: 'MULTIPLE_CHOICE_TASK',
            title: 'Type'
        },
        autograde: {
            type: 'boolean',
            title: 'Autograde',
            default: true
        },
        question: {
            type: 'string',
            title: 'Question'
        },
        choices: {
            items: {
                type: 'string'
            },
            type: 'array',
            title: 'Choices'
        },
        expected_answer: {
            type: 'integer',
            title: 'Expected Answer'
        }
    },
    type: 'object',
    required: ['id', 'type', 'question', 'choices', 'expected_answer'],
    title: 'MultipleChoiceTask'
} as const;

export const MultipleChoiceTaskResultSchema = {
    properties: {
        id: {
            type: 'integer',
            title: 'Id'
        },
        task_attempt_id: {
            type: 'integer',
            title: 'Task Attempt Id'
        },
        task_type: {
            '$ref': '#/components/schemas/TaskType'
        },
        started_at: {
            type: 'string',
            format: 'date-time',
            title: 'Started At'
        },
        completed_at: {
            anyOf: [
                {
                    type: 'string',
                    format: 'date-time'
                },
                {
                    type: 'null'
                }
            ],
            title: 'Completed At'
        },
        job_id: {
            anyOf: [
                {
                    type: 'string'
                },
                {
                    type: 'null'
                }
            ],
            title: 'Job Id'
        },
        status: {
            '$ref': '#/components/schemas/TaskEvalStatus'
        },
        result: {
            type: 'boolean',
            title: 'Result'
        },
        error: {
            anyOf: [
                {
                    type: 'string'
                },
                {
                    type: 'null'
                }
            ],
            title: 'Error'
        }
    },
    type: 'object',
    required: ['id', 'task_attempt_id', 'task_type', 'started_at', 'completed_at', 'job_id', 'status', 'result', 'error'],
    title: 'MultipleChoiceTaskResult'
} as const;

export const MultipleResponseTaskSchema = {
    properties: {
        id: {
            type: 'integer',
            title: 'Id'
        },
        type: {
            type: 'string',
            const: 'MULTIPLE_RESPONSE_TASK',
            title: 'Type'
        },
        autograde: {
            type: 'boolean',
            title: 'Autograde',
            default: true
        },
        question: {
            type: 'string',
            title: 'Question'
        },
        choices: {
            items: {
                type: 'string'
            },
            type: 'array',
            title: 'Choices'
        },
        expected_answer: {
            items: {
                type: 'integer'
            },
            type: 'array',
            title: 'Expected Answer'
        }
    },
    type: 'object',
    required: ['id', 'type', 'question', 'choices', 'expected_answer'],
    title: 'MultipleResponseTask'
} as const;

export const MultipleResponseTaskResultSchema = {
    properties: {
        id: {
            type: 'integer',
            title: 'Id'
        },
        task_attempt_id: {
            type: 'integer',
            title: 'Task Attempt Id'
        },
        task_type: {
            '$ref': '#/components/schemas/TaskType'
        },
        started_at: {
            type: 'string',
            format: 'date-time',
            title: 'Started At'
        },
        completed_at: {
            anyOf: [
                {
                    type: 'string',
                    format: 'date-time'
                },
                {
                    type: 'null'
                }
            ],
            title: 'Completed At'
        },
        job_id: {
            anyOf: [
                {
                    type: 'string'
                },
                {
                    type: 'null'
                }
            ],
            title: 'Job Id'
        },
        status: {
            '$ref': '#/components/schemas/TaskEvalStatus'
        },
        result: {
            anyOf: [
                {
                    '$ref': '#/components/schemas/MultipleResponseTaskResultType'
                },
                {
                    type: 'null'
                }
            ]
        },
        error: {
            anyOf: [
                {
                    type: 'string'
                },
                {
                    type: 'null'
                }
            ],
            title: 'Error'
        }
    },
    type: 'object',
    required: ['id', 'task_attempt_id', 'task_type', 'started_at', 'completed_at', 'job_id', 'status', 'result', 'error'],
    title: 'MultipleResponseTaskResult'
} as const;

export const MultipleResponseTaskResultTypeSchema = {
    properties: {
        correct_choices: {
            items: {
                type: 'integer'
            },
            type: 'array',
            title: 'Correct Choices'
        },
        incorrect_choices: {
            items: {
                type: 'integer'
            },
            type: 'array',
            title: 'Incorrect Choices'
        },
        num_choices: {
            type: 'integer',
            title: 'Num Choices'
        }
    },
    type: 'object',
    required: ['correct_choices', 'incorrect_choices', 'num_choices'],
    title: 'MultipleResponseTaskResultType'
} as const;

export const OrganisationSchema = {
    properties: {
        name: {
            type: 'string',
            title: 'Name'
        },
        description: {
            type: 'string',
            title: 'Description'
        },
        id: {
            anyOf: [
                {
                    type: 'integer'
                },
                {
                    type: 'null'
                }
            ],
            title: 'Id'
        },
        owner_id: {
            anyOf: [
                {
                    type: 'integer'
                },
                {
                    type: 'null'
                }
            ],
            title: 'Owner Id'
        }
    },
    type: 'object',
    required: ['name', 'description', 'owner_id'],
    title: 'Organisation'
} as const;

export const OrganisationCreateSchema = {
    properties: {
        name: {
            type: 'string',
            title: 'Name'
        },
        description: {
            type: 'string',
            title: 'Description'
        }
    },
    type: 'object',
    required: ['name', 'description'],
    title: 'OrganisationCreate'
} as const;

export const OrganisationPublicSchema = {
    properties: {
        name: {
            type: 'string',
            title: 'Name'
        },
        description: {
            type: 'string',
            title: 'Description'
        },
        id: {
            type: 'integer',
            title: 'Id'
        }
    },
    type: 'object',
    required: ['name', 'description', 'id'],
    title: 'OrganisationPublic'
} as const;

export const OrganisationPublicWithProjectsSchema = {
    properties: {
        name: {
            type: 'string',
            title: 'Name'
        },
        description: {
            type: 'string',
            title: 'Description'
        },
        id: {
            type: 'integer',
            title: 'Id'
        },
        projects: {
            items: {
                '$ref': '#/components/schemas/ProjectPublic'
            },
            type: 'array',
            title: 'Projects'
        }
    },
    type: 'object',
    required: ['name', 'description', 'id', 'projects'],
    title: 'OrganisationPublicWithProjects'
} as const;

export const OrganisationUpdateSchema = {
    properties: {
        name: {
            type: 'string',
            title: 'Name'
        },
        description: {
            type: 'string',
            title: 'Description'
        }
    },
    type: 'object',
    required: ['name', 'description'],
    title: 'OrganisationUpdate'
} as const;

export const ProblemSchema = {
    properties: {
        name: {
            type: 'string',
            title: 'Name'
        },
        description: {
            type: 'string',
            title: 'Description'
        },
        tasks: {
            items: {
                oneOf: [
                    {
                        '$ref': '#/components/schemas/ProgrammingTask'
                    },
                    {
                        '$ref': '#/components/schemas/MultipleChoiceTask'
                    },
                    {
                        '$ref': '#/components/schemas/MultipleResponseTask'
                    },
                    {
                        '$ref': '#/components/schemas/ShortAnswerTask'
                    }
                ],
                discriminator: {
                    propertyName: 'type',
                    mapping: {
                        MULTIPLE_CHOICE_TASK: '#/components/schemas/MultipleChoiceTask',
                        MULTIPLE_RESPONSE_TASK: '#/components/schemas/MultipleResponseTask',
                        PROGRAMMING_TASK: '#/components/schemas/ProgrammingTask',
                        SHORT_ANSWER_TASK: '#/components/schemas/ShortAnswerTask'
                    }
                }
            },
            type: 'array',
            title: 'Tasks'
        }
    },
    type: 'object',
    required: ['name', 'description', 'tasks'],
    title: 'Problem'
} as const;

export const ProblemBaseSchema = {
    properties: {
        id: {
            type: 'integer',
            title: 'Id'
        },
        name: {
            type: 'string',
            title: 'Name'
        },
        description: {
            type: 'string',
            title: 'Description'
        },
        project_id: {
            type: 'integer',
            title: 'Project Id'
        }
    },
    type: 'object',
    required: ['id', 'name', 'description', 'project_id'],
    title: 'ProblemBase'
} as const;

export const ProblemORMSchema = {
    properties: {
        id: {
            type: 'integer',
            title: 'Id'
        },
        name: {
            type: 'string',
            title: 'Name'
        },
        description: {
            type: 'string',
            title: 'Description'
        },
        project_id: {
            type: 'integer',
            title: 'Project Id'
        }
    },
    type: 'object',
    required: ['id', 'name', 'description', 'project_id'],
    title: 'ProblemORM'
} as const;

export const ProcessedResultSchema = {
    properties: {
        id: {
            type: 'integer',
            title: 'Id'
        },
        status: {
            '$ref': '#/components/schemas/Status'
        },
        stdout: {
            type: 'string',
            title: 'Stdout'
        },
        stderr: {
            type: 'string',
            title: 'Stderr'
        },
        results: {
            anyOf: [
                {
                    items: {
                        '$ref': '#/components/schemas/SocketResult'
                    },
                    type: 'array'
                },
                {
                    type: 'null'
                }
            ],
            title: 'Results'
        }
    },
    type: 'object',
    required: ['id', 'status', 'stdout', 'stderr'],
    title: 'ProcessedResult'
} as const;

export const ProgrammingLanguageSchema = {
    type: 'string',
    enum: ['PYTHON'],
    title: 'ProgrammingLanguage'
} as const;

export const ProgrammingTaskSchema = {
    properties: {
        id: {
            type: 'integer',
            title: 'Id'
        },
        type: {
            type: 'string',
            const: 'PROGRAMMING_TASK',
            title: 'Type'
        },
        autograde: {
            type: 'boolean',
            title: 'Autograde',
            default: true
        },
        question: {
            type: 'string',
            title: 'Question'
        },
        environment: {
            '$ref': '#/components/schemas/RunnerEnvironment'
        },
        required_inputs: {
            items: {
                '$ref': '#/components/schemas/RequiredInput'
            },
            type: 'array',
            title: 'Required Inputs'
        },
        testcases: {
            items: {
                '$ref': '#/components/schemas/Testcase'
            },
            type: 'array',
            title: 'Testcases'
        }
    },
    type: 'object',
    required: ['id', 'type', 'question', 'environment', 'required_inputs', 'testcases'],
    title: 'ProgrammingTask'
} as const;

export const ProgrammingTaskResultSchema = {
    properties: {
        id: {
            type: 'integer',
            title: 'Id'
        },
        task_attempt_id: {
            type: 'integer',
            title: 'Task Attempt Id'
        },
        task_type: {
            '$ref': '#/components/schemas/TaskType'
        },
        started_at: {
            type: 'string',
            format: 'date-time',
            title: 'Started At'
        },
        completed_at: {
            anyOf: [
                {
                    type: 'string',
                    format: 'date-time'
                },
                {
                    type: 'null'
                }
            ],
            title: 'Completed At'
        },
        job_id: {
            anyOf: [
                {
                    type: 'string'
                },
                {
                    type: 'null'
                }
            ],
            title: 'Job Id'
        },
        status: {
            '$ref': '#/components/schemas/TaskEvalStatus'
        },
        result: {
            anyOf: [
                {
                    items: {
                        '$ref': '#/components/schemas/ProcessedResult'
                    },
                    type: 'array'
                },
                {
                    type: 'null'
                }
            ],
            title: 'Result'
        },
        error: {
            anyOf: [
                {
                    type: 'string'
                },
                {
                    type: 'null'
                }
            ],
            title: 'Error'
        }
    },
    type: 'object',
    required: ['id', 'task_attempt_id', 'task_type', 'started_at', 'completed_at', 'job_id', 'status', 'result', 'error'],
    title: 'ProgrammingTaskResult'
} as const;

export const ProjectCreateSchema = {
    properties: {
        name: {
            type: 'string',
            title: 'Name'
        }
    },
    type: 'object',
    required: ['name'],
    title: 'ProjectCreate'
} as const;

export const ProjectPublicSchema = {
    properties: {
        name: {
            type: 'string',
            title: 'Name'
        },
        id: {
            type: 'integer',
            title: 'Id'
        },
        roles: {
            items: {
                '$ref': '#/components/schemas/RolePublic'
            },
            type: 'array',
            title: 'Roles'
        }
    },
    type: 'object',
    required: ['name', 'id', 'roles'],
    title: 'ProjectPublic'
} as const;

export const ProjectPublicWithProblemsSchema = {
    properties: {
        name: {
            type: 'string',
            title: 'Name'
        },
        id: {
            type: 'integer',
            title: 'Id'
        },
        roles: {
            items: {
                '$ref': '#/components/schemas/RolePublic'
            },
            type: 'array',
            title: 'Roles'
        },
        problems: {
            items: {
                '$ref': '#/components/schemas/ProblemBase'
            },
            type: 'array',
            title: 'Problems'
        }
    },
    type: 'object',
    required: ['name', 'id', 'roles', 'problems'],
    title: 'ProjectPublicWithProblems'
} as const;

export const ProjectUpdateSchema = {
    properties: {
        name: {
            type: 'string',
            title: 'Name'
        }
    },
    type: 'object',
    required: ['name'],
    title: 'ProjectUpdate'
} as const;

export const RequiredInputSchema = {
    properties: {
        id: {
            type: 'string',
            title: 'Id'
        },
        data: {
            anyOf: [
                {
                    type: 'string'
                },
                {
                    type: 'integer'
                },
                {
                    type: 'number'
                },
                {
                    type: 'boolean'
                },
                {
                    '$ref': '#/components/schemas/File'
                }
            ],
            title: 'Data'
        }
    },
    type: 'object',
    required: ['id', 'data'],
    title: 'RequiredInput'
} as const;

export const RoleBaseSchema = {
    properties: {
        name: {
            type: 'string',
            title: 'Name'
        }
    },
    type: 'object',
    required: ['name'],
    title: 'RoleBase'
} as const;

export const RoleCreateSchema = {
    properties: {
        name: {
            type: 'string',
            title: 'Name'
        }
    },
    type: 'object',
    required: ['name'],
    title: 'RoleCreate'
} as const;

export const RolePublicSchema = {
    properties: {
        name: {
            type: 'string',
            title: 'Name'
        },
        id: {
            type: 'integer',
            title: 'Id'
        },
        project_id: {
            type: 'integer',
            title: 'Project Id'
        }
    },
    type: 'object',
    required: ['name', 'id', 'project_id'],
    title: 'RolePublic'
} as const;

export const RolePublicWithInvitationKeysSchema = {
    properties: {
        name: {
            type: 'string',
            title: 'Name'
        },
        id: {
            type: 'integer',
            title: 'Id'
        },
        project_id: {
            type: 'integer',
            title: 'Project Id'
        },
        invitation_keys: {
            items: {
                '$ref': '#/components/schemas/InvitationKeyPublic'
            },
            type: 'array',
            title: 'Invitation Keys'
        }
    },
    type: 'object',
    required: ['name', 'id', 'project_id', 'invitation_keys'],
    title: 'RolePublicWithInvitationKeys'
} as const;

export const RunnerEnvironmentSchema = {
    properties: {
        language: {
            '$ref': '#/components/schemas/ProgrammingLanguage'
        },
        time_limit: {
            type: 'integer',
            title: 'Time Limit'
        },
        memory_limit: {
            type: 'integer',
            title: 'Memory Limit'
        },
        extra_options: {
            anyOf: [
                {
                    type: 'object'
                },
                {
                    type: 'null'
                }
            ],
            title: 'Extra Options'
        }
    },
    type: 'object',
    required: ['language', 'time_limit', 'memory_limit'],
    title: 'RunnerEnvironment'
} as const;

export const ShortAnswerTaskSchema = {
    properties: {
        id: {
            type: 'integer',
            title: 'Id'
        },
        type: {
            type: 'string',
            const: 'SHORT_ANSWER_TASK',
            title: 'Type'
        },
        autograde: {
            type: 'boolean',
            title: 'Autograde',
            default: false
        },
        question: {
            type: 'string',
            title: 'Question'
        },
        expected_answer: {
            anyOf: [
                {
                    type: 'string'
                },
                {
                    type: 'null'
                }
            ],
            title: 'Expected Answer'
        }
    },
    type: 'object',
    required: ['id', 'type', 'question'],
    title: 'ShortAnswerTask'
} as const;

export const ShortAnswerTaskResultSchema = {
    properties: {
        id: {
            type: 'integer',
            title: 'Id'
        },
        task_attempt_id: {
            type: 'integer',
            title: 'Task Attempt Id'
        },
        task_type: {
            '$ref': '#/components/schemas/TaskType'
        },
        started_at: {
            type: 'string',
            format: 'date-time',
            title: 'Started At'
        },
        completed_at: {
            anyOf: [
                {
                    type: 'string',
                    format: 'date-time'
                },
                {
                    type: 'null'
                }
            ],
            title: 'Completed At'
        },
        job_id: {
            anyOf: [
                {
                    type: 'string'
                },
                {
                    type: 'null'
                }
            ],
            title: 'Job Id'
        },
        status: {
            '$ref': '#/components/schemas/TaskEvalStatus'
        },
        result: {
            anyOf: [
                {
                    type: 'string'
                },
                {
                    type: 'null'
                }
            ],
            title: 'Result'
        },
        error: {
            anyOf: [
                {
                    type: 'string'
                },
                {
                    type: 'null'
                }
            ],
            title: 'Error'
        }
    },
    type: 'object',
    required: ['id', 'task_attempt_id', 'task_type', 'started_at', 'completed_at', 'job_id', 'status', 'result', 'error'],
    title: 'ShortAnswerTaskResult'
} as const;

export const SocketResultSchema = {
    properties: {
        id: {
            type: 'string',
            title: 'Id'
        },
        value: {
            title: 'Value'
        },
        correct: {
            type: 'boolean',
            title: 'Correct'
        }
    },
    type: 'object',
    required: ['id', 'value', 'correct'],
    title: 'SocketResult',
    description: `This class is used to store whether the result of an output socket is right or wrong.
Note that whether or not to show this information (public) and other variables should be derived from data in Testcase.`
} as const;

export const StatusSchema = {
    type: 'string',
    enum: ['OK', 'MLE', 'TLE', 'RTE', 'WA'],
    title: 'Status'
} as const;

export const StepSchema = {
    properties: {
        id: {
            type: 'integer',
            title: 'Id'
        },
        inputs: {
            items: {
                '$ref': '#/components/schemas/StepSocket'
            },
            type: 'array',
            title: 'Inputs'
        },
        outputs: {
            items: {
                '$ref': '#/components/schemas/StepSocket'
            },
            type: 'array',
            title: 'Outputs'
        },
        type: {
            '$ref': '#/components/schemas/StepType'
        }
    },
    additionalProperties: false,
    type: 'object',
    required: ['id', 'inputs', 'outputs', 'type'],
    title: 'Step'
} as const;

export const StepSocketSchema = {
    properties: {
        id: {
            type: 'string',
            title: 'Id'
        },
        data: {
            anyOf: [
                {
                    type: 'string'
                },
                {
                    type: 'integer'
                },
                {
                    type: 'number'
                },
                {
                    type: 'boolean'
                },
                {
                    '$ref': '#/components/schemas/File'
                },
                {
                    type: 'null'
                }
            ],
            title: 'Data'
        }
    },
    type: 'object',
    required: ['id'],
    title: 'StepSocket',
    description: `A socket that is used to connect steps to each other.

Socket ID Format: <TYPE>.<NAME>.<INDEX>
- <NAME>.<INDEX> is optional and is used to differentiate between multiple sockets of the same type
    - Collectively, <NAME>.<INDEX> is referred to as the "label"

There can be 2 types of sockets:

1. Control Sockets: Used to control the flow of the program
    - e.g. CONTROL.<NAME>.<INDEX>
2. Data Sockets: Used to pass data between steps
    - e.g. DATA.<NAME>.<INDEX>`
} as const;

export const StepTypeSchema = {
    type: 'string',
    enum: ['PY_RUN_FUNCTION_STEP', 'OBJECT_ACCESS_STEP', 'INPUT_STEP', 'OUTPUT_STEP', 'LOOP_STEP', 'IF_ELSE_STEP', 'STRING_MATCH_STEP'],
    title: 'StepType'
} as const;

export const SubmissionPublicSchema = {
    properties: {
        id: {
            type: 'integer',
            title: 'Id'
        },
        problem_id: {
            type: 'integer',
            title: 'Problem Id'
        },
        user_id: {
            type: 'integer',
            title: 'User Id'
        },
        submitted_at: {
            anyOf: [
                {
                    type: 'string',
                    format: 'date-time'
                },
                {
                    type: 'null'
                }
            ],
            title: 'Submitted At'
        },
        task_attempts: {
            items: {
                '$ref': '#/components/schemas/TaskAttemptPublic'
            },
            type: 'array',
            title: 'Task Attempts'
        }
    },
    type: 'object',
    required: ['id', 'problem_id', 'user_id', 'submitted_at', 'task_attempts'],
    title: 'SubmissionPublic'
} as const;

export const TaskAttemptPublicSchema = {
    properties: {
        id: {
            type: 'integer',
            title: 'Id'
        },
        user_id: {
            type: 'integer',
            title: 'User Id'
        },
        task_id: {
            type: 'integer',
            title: 'Task Id'
        },
        task_type: {
            '$ref': '#/components/schemas/TaskType'
        },
        other_fields: {
            type: 'object',
            title: 'Other Fields'
        },
        task_results: {
            items: {
                '$ref': '#/components/schemas/TaskResult'
            },
            type: 'array',
            title: 'Task Results'
        },
        task: {
            '$ref': '#/components/schemas/TaskORM'
        }
    },
    type: 'object',
    required: ['id', 'user_id', 'task_id', 'task_type', 'other_fields', 'task_results', 'task'],
    title: 'TaskAttemptPublic'
} as const;

export const TaskEvalStatusSchema = {
    type: 'string',
    enum: ['SUCCESS', 'PENDING', 'SKIPPED', 'FAILED'],
    title: 'TaskEvalStatus'
} as const;

export const TaskORMSchema = {
    properties: {
        id: {
            type: 'integer',
            title: 'Id'
        },
        type: {
            '$ref': '#/components/schemas/TaskType'
        },
        autograde: {
            type: 'boolean',
            title: 'Autograde'
        },
        other_fields: {
            type: 'object',
            title: 'Other Fields'
        },
        problem_id: {
            type: 'integer',
            title: 'Problem Id'
        }
    },
    type: 'object',
    required: ['id', 'type', 'autograde', 'problem_id'],
    title: 'TaskORM'
} as const;

export const TaskResultSchema = {
    anyOf: [
        {
            '$ref': '#/components/schemas/MultipleChoiceTaskResult'
        },
        {
            '$ref': '#/components/schemas/MultipleResponseTaskResult'
        },
        {
            '$ref': '#/components/schemas/ProgrammingTaskResult'
        },
        {
            '$ref': '#/components/schemas/ShortAnswerTaskResult'
        }
    ]
} as const;

export const TaskTypeSchema = {
    type: 'string',
    enum: ['MULTIPLE_CHOICE_TASK', 'MULTIPLE_RESPONSE_TASK', 'SHORT_ANSWER_TASK', 'PROGRAMMING_TASK'],
    title: 'TaskType'
} as const;

export const TestcaseSchema = {
    properties: {
        nodes: {
            items: {
                '$ref': '#/components/schemas/Step'
            },
            type: 'array',
            title: 'Nodes'
        },
        edges: {
            items: {
                '$ref': '#/components/schemas/GraphEdge'
            },
            type: 'array',
            title: 'Edges'
        },
        id: {
            type: 'integer',
            title: 'Id'
        }
    },
    type: 'object',
    required: ['nodes', 'edges', 'id'],
    title: 'Testcase'
} as const;

export const TokenSchema = {
    properties: {
        access_token: {
            type: 'string',
            title: 'Access Token'
        },
        token_type: {
            type: 'string',
            title: 'Token Type'
        },
        user: {
            '$ref': '#/components/schemas/UserPublic'
        }
    },
    type: 'object',
    required: ['access_token', 'token_type', 'user'],
    title: 'Token'
} as const;

export const UserCreateSchema = {
    properties: {
        username: {
            type: 'string',
            title: 'Username'
        },
        password: {
            type: 'string',
            minLength: 8,
            title: 'Password'
        },
        confirm_password: {
            type: 'string',
            title: 'Confirm Password'
        }
    },
    type: 'object',
    required: ['username', 'password', 'confirm_password'],
    title: 'UserCreate'
} as const;

export const UserInputSchema = {
    properties: {
        task_id: {
            type: 'integer',
            title: 'Task Id'
        },
        value: {
            title: 'Value'
        }
    },
    type: 'object',
    required: ['task_id', 'value'],
    title: 'UserInput'
} as const;

export const UserPublicSchema = {
    properties: {
        id: {
            type: 'integer',
            title: 'Id'
        },
        username: {
            type: 'string',
            title: 'Username'
        }
    },
    type: 'object',
    required: ['id', 'username'],
    title: 'UserPublic'
} as const;

export const UserPublicWithRolesSchema = {
    properties: {
        id: {
            type: 'integer',
            title: 'Id'
        },
        username: {
            type: 'string',
            title: 'Username'
        },
        roles: {
            items: {
                '$ref': '#/components/schemas/RolePublic'
            },
            type: 'array',
            title: 'Roles'
        }
    },
    type: 'object',
    required: ['id', 'username', 'roles'],
    title: 'UserPublicWithRoles'
} as const;

export const ValidationErrorSchema = {
    properties: {
        loc: {
            items: {
                anyOf: [
                    {
                        type: 'string'
                    },
                    {
                        type: 'integer'
                    }
                ]
            },
            type: 'array',
            title: 'Location'
        },
        msg: {
            type: 'string',
            title: 'Message'
        },
        type: {
            type: 'string',
            title: 'Error Type'
        }
    },
    type: 'object',
    required: ['loc', 'msg', 'type'],
    title: 'ValidationError'
} as const;