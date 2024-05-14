"use client";

import { useCountState } from "@/zustand/count";

const ZustandRouterPage = () => {
  const { count, increase, removeAll } = useCountState();

  return (
    <div className="flex flex-col justify-start items-start gap-y-2">
      <p>{count}</p>
      <button onClick={increase}>one up</button>
      <button onClick={removeAll}>reset</button>
    </div>
  );
};

export default ZustandRouterPage;
