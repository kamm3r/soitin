import type { NextPage } from 'next';
import { Layout } from '../components/Layout';
import Select from '../components/Select';
import { SimplePlayer } from '../components/osxplayer';

const items = [
  { id: 1, value: '0.5x' },
  { id: 2, value: '1x' },
  { id: 3, value: '1.25x' },
  { id: 4, value: '2x' },
];

const Home: NextPage = () => {
  return (
    <Layout title='Soitin - Video Player'>
      <SimplePlayer />
      {/* <div className='max-w-6xl w-full mt-4 mx-auto'>
        <Select title='select speed' items={items} />
      </div> */}
    </Layout>
  );
};

export default Home;
