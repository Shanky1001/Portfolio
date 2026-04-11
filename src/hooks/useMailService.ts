import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { toastEventBus } from '../toast';

const useMailService = () => {
  const [loading, setLoading] = useState(false);
  const sendMail = (data: Record<string, string>) => {
    const mailServiceId = process.env.NEXT_PUBLIC_MAIL_SERVICE_ID ?? process.env.REACT_APP_MAIL_SERVICE_ID;
    const mailTemplateId = process.env.NEXT_PUBLIC_MAIL_TEMPLATE_ID ?? process.env.REACT_APP_MAIL_TEMPLATE_ID;
    const mailPublicKey = process.env.NEXT_PUBLIC_MAIL_PUBLIC_KEY ?? process.env.REACT_APP_MAIL_PUBLIC_KEY;

    if (!mailServiceId || !mailTemplateId || !mailPublicKey) {
      toastEventBus.emit({ message: 'Mail service not configured.', duration: 3000 });
      return;
    }
    setLoading(true);
    return emailjs
      .send(mailServiceId, mailTemplateId, data, mailPublicKey)
      .then(
        (response) => {
          if (response.status === 200) {
            toastEventBus.emit({ message: 'Thank you for contacting.', duration: 3000 });
            return true;
          } else {
            toastEventBus.emit({ message: response.text, duration: 3000 });
            return false;
          }
        },
        (reason) => {
          toastEventBus.emit({ message: reason, duration: 3000 });
          return false;
        }
      )
      .catch(() => {
        toastEventBus.emit({ message: 'Something went wrong.', duration: 3000 });
        return false;
      })
      .finally(() => {
        setLoading(false);
      });
    return true;
  };

  return { loading, sendMail };
};

export default useMailService;
