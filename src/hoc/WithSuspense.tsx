import React, { Suspense } from "react";
import Loading from "../component/Loading/Loading.tsx";

const WithSuspense = (Component) => {
  const WrappedComponent = (props: any) => {
    return (
      <Suspense fallback={<Loading />}>
        <Component {...props} />
      </Suspense>
    );
  };
  return WrappedComponent;
};

export default WithSuspense;
