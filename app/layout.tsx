import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import Script from 'next/script';
import '../src/index.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  style: ['normal'],
  display: 'swap',
  variable: '--font-poppins',
});

const SITE_URL = 'https://shashank-rai-dev.netlify.app';
const OG_IMAGE = 'https://res.cloudinary.com/donrxmkyd/image/upload/v1765548417/1000025604_xv8mat.png';
const FAVICON = 'https://res.cloudinary.com/donrxmkyd/image/upload/v1765549332/about-1-Photoroom_hexdga.png';

const DESCRIPTION =
  'Shashank Rai is a skilled Frontend Web and Mobile Application Developer with expertise in React, ' +
  'React Native, Next.js, Redux Toolkit, Jest, Detox, Appium, and AWS. Explore my portfolio to see ' +
  'projects and experience.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Shashank Rai | React & React Native Developer Portfolio',
  description: DESCRIPTION,
  authors: [{ name: 'Shashank Rai' }],
  manifest: '/manifest.json',
  robots: { index: true, follow: true },
  icons: { icon: FAVICON },
  openGraph: {
    type: 'website',
    title: 'Shashank Rai | Frontend & Mobile Developer',
    description:
      'Portfolio of Shashank Rai, experienced Frontend and Mobile Developer skilled in React, React Native, ' +
      'Redux Toolkit, Jest, Detox, Appium, and AWS.',
    url: SITE_URL,
    siteName: 'Shashank Rai Portfolio',
    images: [{ url: OG_IMAGE }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shashank Rai | Frontend & Mobile Developer',
    description:
      'Explore the portfolio of Shashank Rai, a Frontend and Mobile Developer skilled in React, React Native, ' +
      'Redux Toolkit, Jest, Detox, Appium, and AWS.',
    images: [OG_IMAGE],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#7c3aed',
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Shashank Rai',
  url: SITE_URL,
  jobTitle: 'Frontend & Mobile Application Developer',
  description:
    'Experienced Frontend Web and Mobile Application Developer skilled in React, React Native, JavaScript, ' +
    'TypeScript, Redux, testing with Jest, Appium and Detox, and building performant, maintainable applications.',
  skills: [
    'React',
    'React Native',
    'Redux Toolkit',
    'JavaScript (ES6+)',
    'TypeScript',
    'Context API',
    'React Router',
    'React Navigation',
    'CSS3, HTML5',
    'Responsive Design',
    'Styled-components',
    'Jest',
    'Testing Library (React and React Native)',
    'Detox',
    'Webpack',
    'Babel',
    'Git and Version Control',
    'API Integration (REST, GraphQL)',
    'Performance Optimization',
    'CI/CD',
    'Secure Authentication',
    'Offline Data Management',
    'Debugging',
    'Agile Development',
  ],
  sameAs: ['https://github.com/Shanky1001', 'https://www.linkedin.com/in/shashankrai01'],
  worksFor: { '@type': 'Organization', name: 'GlobalLogic Pvt Ltd' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'Kamala Nehru Institute of Technology' },
  address: { '@type': 'PostalAddress', addressLocality: 'Noida', addressCountry: 'India' },
};

// Inline pre-hydration script that applies the saved theme before paint.
// Mirrors `Header.getInitialTheme` so the first paint matches what React
// will hydrate, eliminating both the FOUC and the dark/light hydration mismatch.
const themeBootstrap = `(function() {
  try {
    var stored = localStorage.theme;
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (stored === 'dark' || (!('theme' in localStorage) && prefersDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {}
})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={poppins.variable}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Script id="theme-bootstrap" strategy="beforeInteractive">
          {themeBootstrap}
        </Script>
      </head>
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        {children}
      </body>
    </html>
  );
}
