import { Choice, ProgrammingTask } from "@/api";

type ChoiceWithoutOrder = Omit<Choice, "order_index">;

export const normaliseChoices = (
  oldChoices: ChoiceWithoutOrder[],
  newChoices: ChoiceWithoutOrder[],
) => {
  // If a new choice has the id of a deleted choice, keep the old id to maximise compatibility with existing attempts.
  const choices = newChoices.map((newChoice) => {
    const oldChoice = oldChoices.find(
      (choice) => choice.text === newChoice.text,
    );
    return oldChoice ? { ...newChoice, id: oldChoice.id } : newChoice;
  });
  return choices;
};

/*
We define the safety of a change based on its predicted unsafety on rerunning previous attempts.
*/
export const isSafeChoiceChange = (
  oldChoices: ChoiceWithoutOrder[],
  newChoices: ChoiceWithoutOrder[],
) => {
  /*
  For MCQ and MRQ, deleting/adding a choice may be unfair to previous attempts since they
  may have already selected old ids OR not get to select the new choice.
  */
  const oldChoiceIds = oldChoices.map((choice) => choice.id);
  const newChoiceIds = newChoices.map((choice) => choice.id);
  return (
    oldChoices.length === newChoices.length &&
    newChoiceIds.every((id) => oldChoiceIds.includes(id))
  );
};

export const isSafeChangeForProgrammingTask = (
  oldProgrammingTask: Pick<ProgrammingTask, "required_inputs">,
  newProgrammingTask: Pick<ProgrammingTask, "required_inputs">,
) => {
  /*
  For programming tasks, if the input format changed, we assume it is unsafe.

  TODO: this can theoretically be enhanced (lower false positives) by only comparing functions that are used in 
  the testcases. (But that's a bit overkill for now and can be considered in the future, when the node graph is fully validated)
  */
  return (
    JSON.stringify(oldProgrammingTask.required_inputs) ===
    JSON.stringify(newProgrammingTask.required_inputs)
  );
};
