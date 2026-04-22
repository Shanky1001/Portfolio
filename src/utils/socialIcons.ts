import type { IconType } from 'react-icons';
import {
  FaBehance,
  FaBitbucket,
  FaCodepen,
  FaDev,
  FaDiscord,
  FaDribbble,
  FaFacebook,
  FaGithub,
  FaGitlab,
  FaInstagram,
  FaLinkedin,
  FaMedium,
  FaPinterest,
  FaReddit,
  FaSlack,
  FaSpotify,
  FaStackOverflow,
  FaTelegram,
  FaTwitch,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from 'react-icons/fa';

// Explicit registry of social icons used (or likely to be used) in the
// portfolio data. Importing only the icons we need lets bundlers tree-shake
// the rest of `react-icons/fa` (~1 MB unminified) instead of pulling the
// entire icon set via `import * as Fa from 'react-icons/fa'`.
export const socialIconRegistry: Record<string, IconType> = {
  FaBehance,
  FaBitbucket,
  FaCodepen,
  FaDev,
  FaDiscord,
  FaDribbble,
  FaFacebook,
  FaGithub,
  FaGitlab,
  FaInstagram,
  FaLinkedin,
  FaMedium,
  FaPinterest,
  FaReddit,
  FaSlack,
  FaSpotify,
  FaStackOverflow,
  FaTelegram,
  FaTwitch,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
};

export const getSocialIcon = (name: string): IconType | undefined => socialIconRegistry[name];
