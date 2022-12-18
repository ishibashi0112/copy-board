import { Button, Title } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";

export const Header: FC = () => {
  const { pathname } = useRouter();

  return (
    <header className="bg-white flex justify-between items-center h-12 px-5 mb-3">
      <Link className="no-underline text-black" href="/">
        <Title order={3}>copy board</Title>
      </Link>

      {pathname === "/" ? (
        <Link
          className="no-underline px-5 py-1 font-sans font-semibold text-white bg-blue-500 rounded-md "
          href="/form"
        >
          追加
        </Link>
      ) : null}
    </header>
  );
};
