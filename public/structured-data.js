const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Shashank Rai',
  url: 'https://shashank-rai-dev.netlify.app',
  jobTitle: 'Frontend & Mobile Application Developer',
  description:
    'Experienced Frontend Web and Mobile Application Developer skilled in React, React Native, JavaScript, TypeScript, Redux, testing with Jest, Appium and Detox, and building performant, maintainable applications.',
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
  worksFor: {
    '@type': 'Organization',
    name: 'GlobalLogic Pvt Ltd',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Kamala Nehru Institute of Technology',
  },
  email: 'mailto:shashank.rai2808@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Noida',
    addressCountry: 'India',
  },
};

const script = document.createElement('script');
script.type = 'application/ld+json';
script.text = JSON.stringify(jsonLd);
document.head.appendChild(script);
