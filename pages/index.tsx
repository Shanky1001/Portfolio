import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Firebase from '../src/Firebase.tsx';

const Home = dynamic(() => import('../src/page/home/Home.tsx'), {
  ssr: false,
});

export default function HomePage() {
  useEffect(() => {
    import('../src/hooks/useServiceWorker.ts').then(({ initServiceWorker }) => {
      initServiceWorker();
    });
  }, []);

  return (
    <Firebase>
      <Home />
    </Firebase>
  );
}
