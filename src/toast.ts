import type { ReactNode } from "react";

export type ToastEvent = {
    message: string;
    actionLabel?: string | ReactNode;
    onAction?: () => void;
    duration?: number;
};

const listeners = new Set<(event: ToastEvent) => void>();

export const toastEventBus = {
    emit: (event: ToastEvent) => listeners.forEach(fn => fn(event)),
    subscribe: (fn: (event: ToastEvent) => void) => {
        listeners.add(fn);
        return () => {
            listeners.delete(fn);
        };
    },
};
