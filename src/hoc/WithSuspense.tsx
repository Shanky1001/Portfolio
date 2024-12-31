import React, { Suspense, ComponentType } from 'react';
import Loading from '../component/Loading/Loading';

const WithSuspense = <P extends object>(Component: ComponentType<P>): ComponentType<P> => {
  const WrappedComponent = (props: P) => {
    return (
      <Suspense fallback={<Loading />}>
        <Component {...props} />
      </Suspense>
    );
  };
  return WrappedComponent;
};

export default WithSuspense;
