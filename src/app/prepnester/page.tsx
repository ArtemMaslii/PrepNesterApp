'use client';

import {useUser} from "@/context";

export default function Home() {
  const {user} = useUser()

  return (
      <>Hi</>
  );
}
