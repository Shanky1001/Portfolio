import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { toastEventBus } from '../toast';

const useMailService = () => {
  const [loading, setLoading] = useState(false);
  const sendMail = (data: Record<string, string>) => {

    const { REACT_APP_MAIL_SERVICE_ID, REACT_APP_MAIL_TEMPLATE_ID, REACT_APP_MAIL_PUBLIC_KEY } = process.env;
    if (!REACT_APP_MAIL_SERVICE_ID || !REACT_APP_MAIL_TEMPLATE_ID || !REACT_APP_MAIL_PUBLIC_KEY) {
      toastEventBus.emit({ message: 'Mail service not configured.', duration: 3000 });
      return;
    }
    setLoading(true);
    return emailjs
      .send(REACT_APP_MAIL_SERVICE_ID, REACT_APP_MAIL_TEMPLATE_ID, data, REACT_APP_MAIL_PUBLIC_KEY)
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
