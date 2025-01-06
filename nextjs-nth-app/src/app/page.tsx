"use client";

import Button from "@/components/Button";
import { useEffect, useState } from "react";

export default function Home() {
  const [counter, setCounter] = useState(0);

  const increment = () => {
    setCounter((prev) => prev + 2);
  };

  return (
    <div className="p-8">
      <p>Presentation of Next.js framework</p>

      <div className="flex items-center justify-center">
        <Button text={`${counter}`} handler={increment} />
      </div>
    </div>
  );
}
