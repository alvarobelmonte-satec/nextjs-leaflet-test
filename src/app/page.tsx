'use client';
import dynamic from 'next/dynamic';

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
      <LeafletComponent />
    </main>
  );
}
