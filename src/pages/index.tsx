import { useState } from "react";
import { type NextPage } from "next";
import Head from "next/head";

import { api } from "../utils/api";
import Completion from "../components/Completion";
import useRanks from "../hooks/rank";
import { useRouter } from "next/router";
import Spinner from "../components/Spinner";
import type ICompletion from "../types/completion.type";

const Home: NextPage = () => {
  const router = useRouter()
  const [inputValue, setInputValue] = useState("");
  const { rankChangeHandler, ranksState } = useRanks();
  const { mutate } = api.prompt.create.useMutation({
    onSuccess: (resp) => {
      const ids = resp?.completions?.map((c: ICompletion) => c.id).join(",");
      router.push({ pathname: `completions/${resp.id}`, query: { ids } });
  }});

  const { data, refetch, isLoading, isFetching } = api.completions.getCompletions.useQuery({ prompt: inputValue }, {
    refetchOnWindowFocus: false, enabled: false
  });

  const saveHandler = () => {
    const completions: ICompletion[] = data?.completions?.map((comp, idx) => ({ value: comp, rank: ranksState[idx+1]?.active }))
    mutate({ promptValue: inputValue, completions });
  };

  console.log(isLoading, isFetching)

  return (
    <>
      <Head><title>Completions Rank</title></Head>
      <main className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-4xl py-8">
          Rank <span className="text-green-600">Completions</span>
        </h1>

        <div className="container flex flex-col items-center justify-center gap-8 px-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => { setInputValue(e.target.value) }}
            className="bg-gray-50 border border-gray-600 max-w-2xl text-sm rounded-lg focus-ring focus:ring-green-500 focus:border-green-500 block w-full p-2.5" placeholder="Prompt" required
          />

          <button
            type="button"
            onClick={refetch}
            className="flex text-green-600 hover:fill-white hover:text-white border border-green-600 hover:bg-green-800 focus:outline-none font-medium rounded-lg text-sm px-12 py-2.5 text-center mr-2 mb-2"
          >
            <svg className="w-6 h-6 fill-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M64 416L168.6 180.7c15.3-34.4 40.3-63.5 72-83.7l146.9-94c3-1.9 6.5-2.9 10-2.9C407.7 0 416 8.3 416 18.6v1.6c0 2.6-.5 5.1-1.4 7.5L354.8 176.9c-1.9 4.7-2.8 9.7-2.8 14.7c0 5.5 1.2 11 3.4 16.1L448 416H240.9l11.8-35.4 40.4-13.5c6.5-2.2 10.9-8.3 10.9-15.2s-4.4-13-10.9-15.2l-40.4-13.5-13.5-40.4C237 276.4 230.9 272 224 272s-13 4.4-15.2 10.9l-13.5 40.4-40.4 13.5C148.4 339 144 345.1 144 352s4.4 13 10.9 15.2l40.4 13.5L207.1 416H64zM279.6 141.5c-1.1-3.3-4.1-5.5-7.6-5.5s-6.5 2.2-7.6 5.5l-6.7 20.2-20.2 6.7c-3.3 1.1-5.5 4.1-5.5 7.6s2.2 6.5 5.5 7.6l20.2 6.7 6.7 20.2c1.1 3.3 4.1 5.5 7.6 5.5s6.5-2.2 7.6-5.5l6.7-20.2 20.2-6.7c3.3-1.1 5.5-4.1 5.5-7.6s-2.2-6.5-5.5-7.6l-20.2-6.7-6.7-20.2zM32 448H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/>
            </svg>
            <p className="self-center ml-2">
              Generate !
            </p>
          </button>

          <Spinner active={isLoading && isFetching} />

          {data?.completions?.map((completion, index: number) => (
            <Completion
              index={index+1}
              key={index}
              ranksState={ranksState}
              rankChangeHandler={rankChangeHandler}
            >
              {completion}
            </Completion>
          ))}

          {data && (
            <button
              type="button"
              onClick={() => saveHandler()}
              className="flex text-green-600 hover:fill-white hover:text-white border border-green-600 hover:bg-green-800 focus:outline-none font-medium rounded-lg text-sm px-12 py-2.5 text-center mr-2 mb-2"
            >
              <p className="self-center ml-2 tracking-[1px]">Save</p>
            </button>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
