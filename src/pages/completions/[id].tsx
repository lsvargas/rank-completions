import { useRouter } from "next/router";

import useRanks, { type RankState } from "../../hooks/rank";
import EditCompletion from "../../components/EditCompletion";
import { api } from "../../utils/api";
import buildUpdateBody from "../../utils/completionHelpers";
import type ICompletion from "../../types/completion.type";


function Completion() {
  const router = useRouter()
  const { rankChangeHandler, ranksState, textChangeHandler, setRanksState } = useRanks();

  const onSuccess = (resp: ICompletion) => {
    const initState: RankState = resp?.completions?.reduce((accum, curr, idx) => {
      return { ...accum, [idx+1]: { active: curr.rank, text: curr.value } }
    }, {});

    setRanksState(initState)
  }

  const { data } = api.completions.getCompletionsByIds.useQuery(
    { ids: router.query.ids },
    {
      enabled: router.query.ids !== undefined,
      onSuccess
    }
  );
  const { mutate } = api.completions.update.useMutation();

  const editSaveHandler = (completionId: number) => {
    const completion = ranksState[completionId];
    const updateBody = buildUpdateBody(data, completion, completionId)

    mutate(updateBody)
  }


  return (
    <div className="p-12 flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-200">
      <h1 className="text-2xl font-extrabold tracking-tight sm:text-4xl py-8">
        Edit <span className="text-green-600">Completions</span>
      </h1>

      {data?.completions?.map((completion, index: number) => (
        <EditCompletion
          key={index}
          index={index+1}
          ranksState={ranksState}
          rankChangeHandler={rankChangeHandler}
          textChangeHandler={textChangeHandler}
          editSaveHandler={editSaveHandler}
        />
      ))}
    </div>
  )
}

export default Completion;
