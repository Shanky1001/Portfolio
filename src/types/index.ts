type skill = {
  name: string;
  image: string;
  category: string;
};

type project = {
  name: string;
  image: string;
  techstack: string;
  category: string;
  links: {
    visit: string;
    code?: string;
    video?: string;
  };
};

type experience = {
  company: string;
  position: string;
  duration: string;
  desc: string[];
};

type education = {
  institute: string;
  degree: string;
  duration: string;
};

type main = {
  name: string;
  logo?: string;
  titles: string[];
  heroImage: string;
  shortDesc: string;
  longDesc: string;
  techStackImages: string[];
};

type about = {
  aboutImage: string;
  aboutImageCaption: string;
  title: string[];
  about: string;
  about_work?: string | string[];
  resumeUrl: string;
  callUrl: string;
};

type social = {
  name?: string;
  icon: string;
  link: string;
};

type certification = {
  title:string,
  desc:string,
  link:string,
  issuer:string
}

type data = {
  main: main;
  about: about;
  skills?: skill[];
  projects?: project[];
  experiences: experience[];
  educations: education[];
  socials: social[];
  certifications?:certification[]
};

export type { data, main, about, skill, project, experience, education, social, certification };
