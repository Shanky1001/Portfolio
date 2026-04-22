import React from 'react';

interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

const SectionWrapper = ({ children, id, className }: SectionWrapperProps) => {
  return (
    <section id={id} className={className}>
      {children}
    </section>
  );
};

export default SectionWrapper;
