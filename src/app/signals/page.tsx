'use client';

import { signal } from '@preact/signals-react';
import { useSignals } from '@preact/signals-react/runtime';

const count = signal(0);

export default function SignalsPage() {
  useSignals();
  console.log('render SignalsPage');
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CounterContainer count={count} />
    </main>
  );
}

const CounterContainer = ({ count }: any) => {
  useSignals();
  console.log('render CounterContainer');
  return (
    <div>
      <Counter count={count} />
    </div>
  );
};

const Counter = ({ count }: any) => {
  useSignals();
  console.log('render Counter');

  return (
    <div>
      <p>Count: {count.value}</p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => count.value++}
      >
        Increment
      </button>
    </div>
  );
};
