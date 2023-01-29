import type ICompletion from "./completion.type";

interface IPrompt {
  id: number;
  value: string;
  completions: ICompletion[];
}

export default IPrompt;
