// This file is meant for helpful methods related to our socket names.

import { StepSocket } from "@/api";

export const type = (socket: StepSocket) => {
  return socket.id.split(".")[0];
};

export const label = (socket: StepSocket) => {
  return socket.id.split(".", 2)[1];
};

export const isControlSocket = (socket: StepSocket) => {
  return type(socket) === "CONTROL";
};
