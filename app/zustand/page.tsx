"use client";

import ZustandOne from "@/components/zustand/zustand-one";
import ZustandTwo from "@/components/zustand/zustand-two";
import { useRouter } from "next/navigation";

const ZustandPage = () => {
  const router = useRouter();
  return (
    <div className="flex justify-start items-start gap-x-2 border-spacing-2">
      <ZustandOne />
      <ZustandTwo />
      <button onClick={() => router.push("/zustand-router")}>Next</button>
    </div>
  );
};

export default ZustandPage;
