import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';

const useMailService = () => {
  const [loading, setLoading] = useState(false);
  const sendMail = (data: Record<string, string>) => {
    const { REACT_APP_MAIL_SERVICE_ID, REACT_APP_MAIL_TEMPLATE_ID, REACT_APP_MAIL_PUBLIC_KEY } = process.env;
    if (!REACT_APP_MAIL_SERVICE_ID || !REACT_APP_MAIL_TEMPLATE_ID || !REACT_APP_MAIL_PUBLIC_KEY) return;
    setLoading(true);
    return emailjs
      .send(REACT_APP_MAIL_SERVICE_ID, REACT_APP_MAIL_TEMPLATE_ID, data, REACT_APP_MAIL_PUBLIC_KEY)
      .then(
        (response) => {
          if (response.status === 200) {
            toast.success('Thank you for contacting.');
            return true;
          } else {
            toast.error(response.text);
            return false;
          }
        },
        (reason) => {
          toast.error(reason);
          return false;
        }
      )
      .catch(() => {
        toast.error('Something went wrong.');
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
