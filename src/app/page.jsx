'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

import Form from '@/components/form';

export default function Home() {
  const router = useRouter();

  React.useEffect(() => {
    // check if userId is set in the local storage then route to /user/[userId]
    const userID = localStorage.getItem('userID');

    if (userID) {
      router.push(`/user/${userID}`);
    }
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-24">
      <h1 className=" text-base font-medium">
        Please enter your name and pick the Sectors you are currently involved
        in.
      </h1>
      <Form />
    </main>
  );
}
