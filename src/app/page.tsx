'use client';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const LeafletComponent = dynamic(
  () =>
    import('@/components/LeafletMap')
      // this part is needed if your use a named export
      // you can replace by ".default" when using a default export
      .then((mod) => mod.LeafletMap),
  {
    // This prevents server-side rendering of BrowserComponent
    ssr: false
  }
);

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link title="Form" className="my-4 bg-black text-white py-2 px-4 rounded" href="/surveys">
        Go to surveys
      </Link>
      <LeafletComponent />
    </main>
  );
}
