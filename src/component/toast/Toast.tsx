'use client';

import React, { useEffect } from 'react';

interface ToastProps {
    message: string;
    actionLabel?: string | React.ReactNode;
    onAction?: () => void;
    duration?: number;
    onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({
    message,
    actionLabel,
    onAction,
    duration,
    onClose,
}) => {
    useEffect(() => {
        if (!duration) return;
        const timer = setTimeout(() => onClose(), duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <div className="toast">
            <span className="font-bold bg-clip-text text-transparent 
                      bg-gradient-to-r from-yellow-300 via-white to-yellow-300 animate-pulse">
                {message}
            </span>
            {actionLabel && onAction && (
                <button
                    className="hover:scale-105 transition-transform"
                    onClick={() => {
                        onAction();
                        onClose();
                    }}
                >
                    {actionLabel}
                </button>
            )}
        </div>
    );
};

export default Toast;
