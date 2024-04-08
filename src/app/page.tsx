import { LeafletMap } from '@/components/LeafletMap';
import { OLMap } from '@/components/OLMap';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Leaflet Map</h1>
      <LeafletMap />
    </main>
  );
}
