import { useState, useCallback } from 'react';
import { toastEventBus } from '../toast';

// Resolved once at module load — env vars are static at runtime
const mailServiceId = process.env.NEXT_PUBLIC_MAIL_SERVICE_ID ?? process.env.REACT_APP_MAIL_SERVICE_ID;
const mailTemplateId = process.env.NEXT_PUBLIC_MAIL_TEMPLATE_ID ?? process.env.REACT_APP_MAIL_TEMPLATE_ID;
const mailPublicKey = process.env.NEXT_PUBLIC_MAIL_PUBLIC_KEY ?? process.env.REACT_APP_MAIL_PUBLIC_KEY;

const useMailService = () => {
  const [loading, setLoading] = useState(false);
  const sendMail = useCallback(async (data: Record<string, string>) => {
    if (!mailServiceId || !mailTemplateId || !mailPublicKey) {
      toastEventBus.emit({ message: 'Mail service not configured.', duration: 3000 });
      return false;
    }
    setLoading(true);
    try {
      // Dynamically import @emailjs/browser so its ~30 KB payload only
      // reaches the client when the visitor actually submits the contact form.
      const { default: emailjs } = await import('@emailjs/browser');
      const response = await emailjs.send(mailServiceId, mailTemplateId, data, mailPublicKey);
      if (response.status === 200) {
        toastEventBus.emit({ message: 'Thank you for contacting.', duration: 3000 });
        return true;
      }
      toastEventBus.emit({ message: response.text, duration: 3000 });
      return false;
    } catch (reason) {
      const message = reason instanceof Error ? reason.message : 'Something went wrong.';
      toastEventBus.emit({ message, duration: 3000 });
      return false;
    } finally {
      setLoading(false);
    }
  }, []); // env vars are module-level constants — stable across renders

  return { loading, sendMail };
};

export default useMailService;
