'use client';

import React, { useEffect } from 'react';
import { GrUpdate } from 'react-icons/gr';
import { toastEventBus } from '../../toast.ts';
import ToastContainer from '../../component/toast/ToastContainer.tsx';
import { activateUpdate, initServiceWorker } from '../../hooks/useServiceWorker.ts';

const ClientBoot = () => {
  useEffect(() => {
    initServiceWorker();

    const handleSWUpdate = (event: Event) => {
      const registration = (event as CustomEvent<ServiceWorkerRegistration>).detail;

      toastEventBus.emit({
        message: 'A new update is available!',
        actionLabel: <GrUpdate size={20} />,
        // Posts SKIP_WAITING to the waiting SW; the resulting `controllerchange`
        // listener in useServiceWorker.ts then reloads the page.
        onAction: () => activateUpdate(registration),
        duration: 10000,
      });
    };

    window.addEventListener('update-available', handleSWUpdate);
    return () => window.removeEventListener('update-available', handleSWUpdate);
  }, []);

  return <ToastContainer />;
};

export default ClientBoot;
