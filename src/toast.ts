import React from "react";

export type ToastEvent = {
    message: string;
    actionLabel?: string | React.ReactNode;
    onAction?: () => void;
    duration?: number;
};

const listeners: ((event: ToastEvent) => void)[] = [];

export const toastEventBus = {
    emit: (event: ToastEvent) => listeners.forEach(fn => fn(event)),
    subscribe: (fn: (event: ToastEvent) => void) => {
        listeners.push(fn);
        return () => {
            const index = listeners.indexOf(fn);
            if (index !== -1) listeners.splice(index, 1);
        };
    },
};
