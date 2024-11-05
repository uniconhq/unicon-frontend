// This file is auto-generated by @hey-api/openapi-ts

export const Body_login_auth_token_postSchema = {
  properties: {
    grant_type: {
      anyOf: [
        {
          type: "string",
          pattern: "password",
        },
        {
          type: "null",
        },
      ],
      title: "Grant Type",
    },
    username: {
      type: "string",
      title: "Username",
    },
    password: {
      type: "string",
      title: "Password",
    },
    scope: {
      type: "string",
      title: "Scope",
      default: "",
    },
    client_id: {
      anyOf: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
      title: "Client Id",
    },
    client_secret: {
      anyOf: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
      title: "Client Secret",
    },
  },
  type: "object",
  required: ["username", "password"],
  title: "Body_login_auth_token_post",
} as const;

export const ContestSubmissionSchema = {
  properties: {
    expected_answers: {
      $ref: "#/components/schemas/RootModelList_ExpectedAnswer_",
    },
    user_inputs: {
      $ref: "#/components/schemas/RootModelList_UserInput_",
    },
  },
  type: "object",
  required: ["expected_answers", "user_inputs"],
  title: "ContestSubmission",
} as const;

export const DefinitionSchema = {
  properties: {
    name: {
      type: "string",
      title: "Name",
    },
    description: {
      type: "string",
      title: "Description",
    },
    tasks: {
      items: {
        $ref: "#/components/schemas/Task",
      },
      type: "array",
      title: "Tasks",
    },
  },
  type: "object",
  required: ["name", "description", "tasks"],
  title: "Definition",
} as const;

export const ExpectedAnswerSchema = {
  properties: {
    task_id: {
      type: "integer",
      title: "Task Id",
    },
    expected_answer: {
      title: "Expected Answer",
    },
  },
  type: "object",
  required: ["task_id", "expected_answer"],
  title: "ExpectedAnswer",
} as const;

export const HTTPValidationErrorSchema = {
  properties: {
    detail: {
      items: {
        $ref: "#/components/schemas/ValidationError",
      },
      type: "array",
      title: "Detail",
    },
  },
  type: "object",
  title: "HTTPValidationError",
} as const;

export const RootModelList_ExpectedAnswer_Schema = {
  items: {
    $ref: "#/components/schemas/ExpectedAnswer",
  },
  type: "array",
  title: "RootModelList[ExpectedAnswer]",
} as const;

export const RootModelList_UserInput_Schema = {
  items: {
    $ref: "#/components/schemas/UserInput",
  },
  type: "array",
  title: "RootModelList[UserInput]",
} as const;

export const TaskSchema = {
  properties: {
    id: {
      type: "integer",
      title: "Id",
    },
    type: {
      $ref: "#/components/schemas/TaskType",
    },
    autograde: {
      type: "boolean",
      title: "Autograde",
      default: true,
    },
  },
  additionalProperties: false,
  type: "object",
  required: ["id", "type"],
  title: "Task",
} as const;

export const TaskTypeSchema = {
  type: "string",
  enum: [
    "MULTIPLE_CHOICE_TASK",
    "MULTIPLE_RESPONSE_TASK",
    "SHORT_ANSWER_TASK",
    "PROGRAMMING_TASK",
  ],
  title: "TaskType",
} as const;

export const TokenSchema = {
  properties: {
    access_token: {
      type: "string",
      title: "Access Token",
    },
    token_type: {
      type: "string",
      title: "Token Type",
    },
    user: {
      $ref: "#/components/schemas/UserPublic",
    },
  },
  type: "object",
  required: ["access_token", "token_type", "user"],
  title: "Token",
} as const;

export const UserInputSchema = {
  properties: {
    task_id: {
      type: "integer",
      title: "Task Id",
    },
    user_input: {
      title: "User Input",
    },
  },
  type: "object",
  required: ["task_id", "user_input"],
  title: "UserInput",
} as const;

export const UserPublicSchema = {
  properties: {
    id: {
      type: "integer",
      title: "Id",
    },
    username: {
      type: "string",
      title: "Username",
    },
  },
  type: "object",
  required: ["id", "username"],
  title: "UserPublic",
} as const;

export const ValidationErrorSchema = {
  properties: {
    loc: {
      items: {
        anyOf: [
          {
            type: "string",
          },
          {
            type: "integer",
          },
        ],
      },
      type: "array",
      title: "Location",
    },
    msg: {
      type: "string",
      title: "Message",
    },
    type: {
      type: "string",
      title: "Error Type",
    },
  },
  type: "object",
  required: ["loc", "msg", "type"],
  title: "ValidationError",
} as const;
