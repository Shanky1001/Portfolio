import Home from '../src/page/home/Home.tsx';
import Firebase from '../src/Firebase.tsx';
import { data } from '../src/types/index.ts';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

async function getDevFallbackData(): Promise<data | null> {
  // Local JSON fallback is dev-only. In production the page must come from
  // the configured remote DB; if that's missing, we'd rather fail visibly
  // (forever spinner) than ship stale committed data to users.
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  try {
    const fallbackPath = path.join(process.cwd(), 'src/page/home/myportfolio.json');
    const raw = await readFile(fallbackPath, 'utf-8');
    const parsed = JSON.parse(raw) as { data?: data };
    return parsed.data ?? null;
  } catch {
    return null;
  }
}

async function getServerPortfolioData(): Promise<data | null> {
  const fallback = await getDevFallbackData();
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
      <Home initialData={initialData ?? undefined} />
    </Firebase>
  );
}
