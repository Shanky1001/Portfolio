'use client';

import React, { useEffect } from 'react';
import { GrUpdate } from 'react-icons/gr';
import { toastEventBus } from '../../toast.ts';
import ToastContainer from '../../component/toast/ToastContainer.tsx';
import { initServiceWorker } from '../../hooks/useServiceWorker.ts';

const ClientBoot = () => {
  useEffect(() => {
    initServiceWorker();

    const handleSWUpdate = () => {
      toastEventBus.emit({
        message: 'A new update is available!',
        actionLabel: <GrUpdate size={20} />,
        onAction: () => window.location.reload(),
        duration: 10000,
      });
    };

    window.addEventListener('update-available', handleSWUpdate as EventListener);
    return () => window.removeEventListener('update-available', handleSWUpdate as EventListener);
  }, []);

  return <ToastContainer />;
};

export default ClientBoot;
