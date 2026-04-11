import type { Metadata } from 'next';
import '../src/index.css';

export const metadata: Metadata = {
  title: 'Shashank Rai | Portfolio',
  description: 'Frontend and mobile application developer portfolio.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
