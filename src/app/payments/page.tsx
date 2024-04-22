import { Payment, columns } from './columns';
import { DataTable } from './data-table';

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: '4e91c4d2-7c29-4385-9188-78ebc35cb44f',
      amount: 99,
      status: 'pending',
      email: 'tpovall0@lycos.com'
    },
    {
      id: 'fd00a271-eb71-4627-9c57-59a8d0c8decd',
      amount: 43,
      status: 'pending',
      email: 'mnimmo1@sfgate.com'
    },
    {
      id: '311ba7f7-6d96-48a5-b77b-fe3f712d9a14',
      amount: 73,
      status: 'pending',
      email: 'bstraun2@themeforest.net'
    },
    {
      id: 'a2d15a66-ed8c-4ce6-8f37-428c13587cb4',
      amount: 14,
      status: 'pending',
      email: 'nbordiss3@4shared.com'
    },
    {
      id: '8e3739f9-7d49-46e5-a536-56b4bf764182',
      amount: 80,
      status: 'pending',
      email: 'ntunniclisse4@cdbaby.com'
    },
    {
      id: 'b75a8227-d57b-4d73-995c-6150a43690c6',
      amount: 80,
      status: 'pending',
      email: 'ngeist5@tamu.edu'
    },
    {
      id: '602ea98f-e4be-47e0-8764-edc249ae6e86',
      amount: 45,
      status: 'pending',
      email: 'obrugemann6@nsw.gov.au'
    },
    {
      id: '90af8b4d-5b56-4a89-afdf-b99d3094321a',
      amount: 16,
      status: 'pending',
      email: 'zmackissack7@moonfruit.com'
    },
    {
      id: 'e382e152-2193-4434-8ee8-b4d8de25d927',
      amount: 6,
      status: 'pending',
      email: 'tbeverley8@about.com'
    },
    {
      id: 'f62b3ebe-6583-43fd-a131-3e4f639d3a59',
      amount: 49,
      status: 'pending',
      email: 'fromand9@ocn.ne.jp'
    },
    {
      id: '52ad682d-2372-44f6-a80a-0f5da1b945b5',
      amount: 92,
      status: 'pending',
      email: 'tbattisona@ovh.net'
    },
    {
      id: 'ad764d3d-8487-4b8e-a990-4804736771d0',
      amount: 83,
      status: 'pending',
      email: 'lforrestillb@guardian.co.uk'
    },
    {
      id: '4bc36bdc-2110-418f-b00b-772ddc703ae3',
      amount: 98,
      status: 'pending',
      email: 'aosorioc@princeton.edu'
    },
    {
      id: '9af7fe14-f7e8-4e15-b575-927292a12384',
      amount: 49,
      status: 'pending',
      email: 'voxenburyd@go.com'
    },
    {
      id: '1221a6cf-f605-4162-a614-012f44fa11ce',
      amount: 43,
      status: 'pending',
      email: 'gmellonbye@sun.com'
    },
    {
      id: 'a9b4e2a0-5c94-4a75-8fb7-def8af88ac0e',
      amount: 6,
      status: 'pending',
      email: 'epyattf@1688.com'
    },
    {
      id: '33ef72f5-b14b-4df6-9a96-8b6618ee9bb3',
      amount: 37,
      status: 'pending',
      email: 'nzavattierig@free.fr'
    },
    {
      id: '84a2f7b6-8851-46e9-8717-3fd0df32c73a',
      amount: 36,
      status: 'pending',
      email: 'sgrammerh@bluehost.com'
    },
    {
      id: '25f2d080-9d4a-4258-ae45-d7dd0ba32a34',
      amount: 75,
      status: 'pending',
      email: 'hpilcheri@sfgate.com'
    },
    {
      id: '6ac286c5-da49-4353-ba43-f8f4054507b0',
      amount: 78,
      status: 'pending',
      email: 'asallerj@engadget.com'
    },
    {
      id: 'ea524909-9ec3-4061-93c6-ef4027d29e65',
      amount: 3,
      status: 'pending',
      email: 'estowersk@smugmug.com'
    },
    {
      id: 'a4ebf686-15c9-4726-bfd1-cfba8e5059c3',
      amount: 9,
      status: 'pending',
      email: 'omckeowonl@wordpress.com'
    },
    {
      id: '700f7d85-304c-4080-b822-701c41e94428',
      amount: 1,
      status: 'pending',
      email: 'wrowlandm@moonfruit.com'
    },
    {
      id: 'eaedf623-4098-4bcc-8dec-cb8b2645d022',
      amount: 88,
      status: 'pending',
      email: 'tnozzoliin@weibo.com'
    },
    {
      id: '25e32e92-6d01-4c65-ad0a-538d99bf554f',
      amount: 51,
      status: 'pending',
      email: 'dflattmano@topsy.com'
    },
    {
      id: '70c2254b-47ae-4942-8100-d8ffc1ae79e3',
      amount: 42,
      status: 'pending',
      email: 'llowniep@thetimes.co.uk'
    },
    {
      id: 'c37d1e25-f802-46e1-bb23-fbf76f54c430',
      amount: 21,
      status: 'pending',
      email: 'rleathleyq@sphinn.com'
    },
    {
      id: 'e8f62c63-a4a2-48ee-bb11-8f67cc89654b',
      amount: 8,
      status: 'pending',
      email: 'csleafordr@posterous.com'
    },
    {
      id: '9eddd5e3-75f6-4b10-8d9c-d09c2aba548a',
      amount: 15,
      status: 'pending',
      email: 'dpethers@weather.com'
    },
    {
      id: 'b4995a03-69e8-4bc0-baa3-f30fd8e2e23b',
      amount: 24,
      status: 'pending',
      email: 'dwinstont@dagondesign.com'
    }
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
