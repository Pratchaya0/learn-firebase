"use client";

import { useCountState } from "@/zustand/count";
import { useEffect } from "react";

const ZustandOne = () => {
  const { count, increase, removeAll, update } = useCountState();

  useEffect(() => {
    update(2);
  }, []);

  return (
    <div className="flex flex-col justify-start items-start gap-y-2">
      <p>{count}</p>
      <button onClick={increase}>one up</button>
      <button onClick={removeAll}>reset</button>
    </div>
  );
};

export default ZustandOne;
