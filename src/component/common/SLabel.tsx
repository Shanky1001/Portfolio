import React from 'react';

function SLabel({ text }: { text: string }) {
  return (
    <p className="text-violet-800 w-fit rounded py-1 px-2 text-sm dark:text-violet-600 bg-violet-50 dark:bg-violet-900/10">
      {text}
    </p>
  );
}

export default SLabel;
