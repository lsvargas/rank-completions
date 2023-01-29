import { type CompletionState } from "../hooks/rank";
import type ICompletion from "../types/completion.type";

interface DataType {
  completions: ICompletion[]
}

interface BodyType {
  text?: string;
  rank?: number;
}

const buildUpdateBody = (data: DataType, completion: CompletionState, completionId: number) => {
  const body: BodyType = {}
  if (completion?.active !== null) body["rank"] = completion.active;
  if (completion?.text) body["text"] = completion.text;

  return { ...body, id: data.completions[completionId-1]?.id }
}


export default buildUpdateBody;
