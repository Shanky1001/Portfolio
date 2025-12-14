import React, { useEffect, useState } from 'react';
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

    if (!toast) return null;

    return (
        <Toast
            message={toast.message}
            actionLabel={toast.actionLabel}
            onAction={toast.onAction}
            duration={toast.duration}
            onClose={() => setToast(null)}
        />
    );
};

export default ToastContainer;
