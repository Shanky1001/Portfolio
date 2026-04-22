'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { ToastEvent, toastEventBus } from '../../toast';
import Toast from './Toast';

const ToastContainer: React.FC = () => {
    const [toast, setToast] = useState<null | ToastEvent>(null);

    useEffect(() => {
        const unsubscribe = toastEventBus.subscribe((event) => {
            setToast(event);
        });
        return unsubscribe;
    }, []);

    // Stable identity prevents Toast's dismiss timer from resetting on every render.
    const handleClose = useCallback(() => setToast(null), []);

    if (!toast) return null;

    return (
        <Toast
            message={toast.message}
            actionLabel={toast.actionLabel}
            onAction={toast.onAction}
            duration={toast.duration}
            onClose={handleClose}
        />
    );
};

export default ToastContainer;
