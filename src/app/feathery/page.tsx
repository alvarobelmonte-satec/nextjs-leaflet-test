'use client';
import React from 'react';
import { init, Form } from '@feathery/react';

export default function SurveysPage() {
  init('230aa4bc-9be0-4943-86f3-7e7b92e4d47a');
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Form formName="farmer personal info" />
    </main>
  );
}
