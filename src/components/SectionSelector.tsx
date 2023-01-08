import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

function SectionSelector() {
  const router = useRouter();
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    console.log(router);
  }, [router]);
  return (
    <div>
      <ul className="w-full flex ml-[5%] m-4 font-bold">
        <li
          className={
            counter === 1
              ? "h-[60px] px-4 flex text-xl border-x-[1px] first:border-l-[2px] items-center justify-around underline"
              : "h-[60px] px-4 flex text-xl border-x-[1px] first:border-l-[2px] items-center justify-around hover:underline"
          }
        >
          <Link href="/sections/static-sections" onClick={() => setCounter(1)}>
            Hero Slider
          </Link>
        </li>
        <li
          className={
            counter === 2
              ? "h-[60px] px-4 flex text-xl border-x-[1px] first:border-l-[2px] items-center justify-around underline"
              : "h-[60px] px-4 flex text-xl border-x-[1px] first:border-l-[2px] items-center justify-around hover:underline"
          }
        >
          <Link href="/sections/static-sections" onClick={() => setCounter(2)}>
            Carrousel Static
          </Link>
        </li>
        <li
          className={
            counter === 3
              ? "h-[60px] px-4 flex text-xl border-x-[1px] first:border-l-[2px] items-center justify-around underline"
              : "h-[60px] px-4 flex text-xl border-x-[1px] first:border-l-[2px] items-center justify-around hover:underline"
          }
        >
          <Link href="/sections/dynamic-sections" onClick={() => setCounter(3)}>
            Carrousel Dynamic
          </Link>
        </li>
        <li
          className={
            counter === 4
              ? "h-[60px] px-4 flex text-xl border-x-[1px] first:border-l-[2px] items-center justify-around underline"
              : "h-[60px] px-4 flex text-xl border-x-[1px] first:border-l-[2px] items-center justify-around hover:underline"
          }
        >
          <Link href="/sections/dynamic-sections" onClick={() => setCounter(4)}>
            Grid Dynamic
          </Link>
        </li>
        <li
          className={
            counter === 5
              ? "h-[60px] px-4 flex text-xl border-x-[1px] first:border-l-[2px] items-center justify-around underline"
              : "h-[60px] px-4 flex text-xl border-x-[1px] first:border-l-[2px] items-center justify-around hover:underline"
          }
        >
          <Link href="/sections/advertisings" onClick={() => setCounter(5)}>
            Advertising
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default SectionSelector;
