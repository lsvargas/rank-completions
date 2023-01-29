import { useState } from "react";

const initialState = {
  1: { active: null, text: "" },
  2: { active: null, text: "" },
  3: { active: null, text: "" }
};

export interface CompletionState {
  active: null | number;
  text: string;
}

export interface RankState {
  [key: number]: CompletionState
}

const useRanks = () => {
  const [ranksState, setRanksState] = useState<RankState>(initialState);

  const textChangeHandler = (text: string, sampleId: number): void  => {
    setRanksState((prevState) => ({ ...prevState, [sampleId]: { ...prevState[sampleId], text } }));
  }

  const rankChangeHandler = (buttonId: number, sampleId: number): void => {
    setRanksState((prevState) => ({ ...prevState, [sampleId]: { ...prevState[sampleId], active: buttonId } }));
  }

  return {
    ranksState,
    rankChangeHandler,
    textChangeHandler,
    setRanksState
  }
}

export default useRanks;
