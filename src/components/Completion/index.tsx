import type { ReactNode } from "react";
import type { RankState } from "../../hooks/rank";
import Button from "../Button";

interface CompletionProps {
  children: ReactNode;
  index: number;
  ranksState: RankState;
  rankChangeHandler: (n: number, i: number) => void;
}

function Completion({
  children,
  index,
  rankChangeHandler,
  ranksState,
}: CompletionProps) {

  const completion = ranksState[index];

  return (
    <div className="flex w-full flex-col mb-8 rounded-xl p-8 shadow-xl hover:bg-white/20">
      <div className="flex justify-between mb-4">
        <p className="w-[70%] text-gray-400 font-bold tracking-[2px]">{`Sample ${index}`}</p>
        <div className="flex justify-around w-[30%]">
          <p className="w-[70%] text-gray-400 font-bold tracking-[2px]">Rank</p>
        </div>
      </div>

      <div className="flex">
        <div className="w-[70%] mr-4">
          <p>{children}</p>
        </div>

        <div className="w-[30%] border-l-2 border-gray-300">
          <div className="flex justify-around">
            <Button text="1" onClick={() => rankChangeHandler(1, index)} active={completion?.active === 1} />

            <Button text="2" onClick={() => rankChangeHandler(2, index)} active={completion?.active === 2} />
            <Button text="3" onClick={() => rankChangeHandler(3, index)} active={completion?.active === 3} />
            {completion?.active === 0 ? (
              <svg onClick={() => rankChangeHandler(0, index)} className="hover:cursor-pointer h-8 w-8 self-center fill-red-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M313.4 479.1c26-5.2 42.9-30.5 37.7-56.5l-2.3-11.4c-5.3-26.7-15.1-52.1-28.8-75.2H464c26.5 0 48-21.5 48-48c0-25.3-19.5-46-44.3-47.9c7.7-8.5 12.3-19.8 12.3-32.1c0-23.4-16.8-42.9-38.9-47.1c4.4-7.3 6.9-15.8 6.9-24.9c0-21.3-13.9-39.4-33.1-45.6c.7-3.3 1.1-6.8 1.1-10.4c0-26.5-21.5-48-48-48H294.5c-19 0-37.5 5.6-53.3 16.1L202.7 73.8C176 91.6 160 121.6 160 153.7V192v48 24.9c0 29.2 13.3 56.7 36 75l7.4 5.9c26.5 21.2 44.6 51 51.2 84.2l2.3 11.4c5.2 26 30.5 42.9 56.5 37.7zM32 320H96c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32H32C14.3 32 0 46.3 0 64V288c0 17.7 14.3 32 32 32z"/>
              </svg>
            ) : (
              <svg onClick={() => rankChangeHandler(0, index)} className="hover:cursor-pointer h-8 w-8 self-center fill-red-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M128 288V64.03c0-17.67-14.33-31.1-32-31.1H32c-17.67 0-32 14.33-32 31.1v223.1c0 17.67 14.33 31.1 32 31.1h64C113.7 320 128 305.7 128 288zM481.5 229.1c1.234-5.092 1.875-10.32 1.875-15.64c0-22.7-11.44-43.13-29.28-55.28c.4219-3.015 .6406-6.076 .6406-9.122c0-22.32-11.06-42.6-28.83-54.83c-2.438-34.71-31.47-62.2-66.8-62.2h-52.53c-35.94 0-71.55 11.87-100.3 33.41L169.6 92.93c-6.285 4.71-9.596 11.85-9.596 19.13c0 12.76 10.29 24.04 24.03 24.04c5.013 0 10.07-1.565 14.38-4.811l36.66-27.51c20.48-15.34 45.88-23.81 71.5-23.81h52.53c10.45 0 18.97 8.497 18.97 18.95c0 3.5-1.11 4.94-1.11 9.456c0 26.97 29.77 17.91 29.77 40.64c0 9.254-6.392 10.96-6.392 22.25c0 13.97 10.85 21.95 19.58 23.59c8.953 1.671 15.45 9.481 15.45 18.56c0 13.04-11.39 13.37-11.39 28.91c0 12.54 9.702 23.08 22.36 23.94C456.2 266.1 464 275.2 464 284.1c0 10.43-8.516 18.93-18.97 18.93H307.4c-12.44 0-24 10.02-24 23.1c0 4.038 1.02 8.078 3.066 11.72C304.4 371.7 312 403.8 312 411.2c0 8.044-5.984 20.79-22.06 20.79c-12.53 0-14.27-.9059-24.94-28.07c-24.75-62.91-61.74-99.9-80.98-99.9c-13.8 0-24.02 11.27-24.02 23.99c0 7.041 3.083 14.02 9.016 18.76C238.1 402 211.4 480 289.9 480C333.8 480 360 445 360 411.2c0-12.7-5.328-35.21-14.83-59.33h99.86C481.1 351.9 512 321.9 512 284.1C512 261.8 499.9 241 481.5 229.1z"/>
              </svg>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Completion;
