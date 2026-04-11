import Home from '../src/page/home/Home.tsx';
import Firebase from '../src/Firebase.tsx';
import portfolioData from '../src/page/home/myportfolio.json';
import { data } from '../src/types/index.ts';

async function getServerPortfolioData(): Promise<data> {
  const fallback = (portfolioData as { data?: data }).data as data;
  const databaseUrl = process.env.NEXT_PUBLIC_DATABASE_URL ?? process.env.REACT_APP_DATABASE_URL;

  if (!databaseUrl) {
    return fallback;
  }

  try {
    const normalizedUrl = databaseUrl.endsWith('/') ? databaseUrl.slice(0, -1) : databaseUrl;
    const response = await fetch(`${normalizedUrl}/data.json`, {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      return fallback;
    }

    const remoteData = (await response.json()) as data | null;
    return remoteData ?? fallback;
  } catch {
    return fallback;
  }
}

export default async function Page() {
  const initialData = await getServerPortfolioData();

  return (
    <Firebase>
      <Home initialData={initialData} />
    </Firebase>
  );
}
