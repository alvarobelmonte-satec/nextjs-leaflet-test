'use client';
import React from 'react';
import { init, Form } from '@feathery/react';
import Link from 'next/link';

export default function SurveysPage() {
  init('230aa4bc-9be0-4943-86f3-7e7b92e4d47a');
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h2>FormBricks</h2>
      <button title="Form" className="my-4 bg-blue-500 text-white py-2 px-4 rounded">
        Open Survey
      </button>
      <button title="Form" className="m-4 bg-blue-500 text-white py-2 px-4 rounded">
        Open Survey 3
      </button>
      <Link href="/tally" className="m-4 bg-purple-500 text-white py-2 px-4 rounded">
        Tally Form
      </Link>
      <Link href="/feathery" className="m-4 bg-green-500 text-white py-2 px-4 rounded">
        Feathery Form
      </Link>

      <Link href="/youform" className="m-4 bg-pink-500 text-white py-2 px-4 rounded">
        YouForm
      </Link>
    </main>
  );
}
