import React, { useState } from "react";
import SectionWrapper from "../../wrapper/sectionWrapper/SectionWrapper.tsx";
import { BiLoaderAlt } from "react-icons/bi";
import RevealAnimation from "../../wrapper/reveal/RevealAnimation.tsx";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!values.name.trim() || !values.email.trim() || !values.message.trim()) {
      return false;
    }

    setLoading(true);
    const templatePrams = {
      name: values.name,
      email: values.email,
      message: values.message,
    };
    emailjs
      .send(
        process.env.MAIL_SERVICE_ID!,
        process.env.MAIL_TEMPLATE_ID!,
        templatePrams,
        process.env.MAIL_PUBLIC_KEY!
      )
      .then((response) => {
        if (response.status === 200) {
          toast.success("Thank you for contacting.");
        } else {
          toast.error(response.text);
        }
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setValues((prevInput) => ({
      ...prevInput,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <SectionWrapper id="contact" className="mb-16 mx-4 lg:mx-0">
      <h2 className="text-center font-semibold text-4xl">Contact Me</h2>

      <div className="w-full lg:w-5/6 2xl:w-3/4 mt-10 md:mt-16 mx-auto flex justify-between rounded-xl">
        <img
          alt="contact"
          src="/contact.png"
          className="hidden md:block w-1/2 h-full object-cover"
          loading="lazy"
        />
        <div className="flex-1">
          <RevealAnimation>
            <h3 className="text-2xl">Get in touch</h3>
          </RevealAnimation>
          <RevealAnimation>
            <p className="text-gray-400 mb-4 text-sm md:text-base">
              My inbox is always open. Whether you have a question or just want
              to say hello, I will try my best to get back to you!
            </p>
          </RevealAnimation>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 rounded-xl"
          >
            <input
              onChange={handleChange}
              required
              value={values.name}
              name="name"
              type="text"
              placeholder="Full Name *"
              className="outline-none bg-gray-100 dark:bg-grey-800 placeholder-gray-400 rounded-lg py-3 px-4"
            />
            <input
              onChange={handleChange}
              required
              value={values.email}
              name="email"
              type="email"
              placeholder="Email *"
              className="outline-none bg-gray-100 dark:bg-grey-800 placeholder-gray-400 rounded-lg py-3 px-4"
            />
            <textarea
              onChange={handleChange}
              required
              value={values.message}
              name="message"
              rows={4}
              placeholder="Message *"
              className="outline-none resize-none bg-gray-100 dark:bg-grey-800 placeholder-gray-400 rounded-lg py-3 px-4"
            />
            <button
              disabled={loading}
              type="submit"
              className="px-4 py-2 bg-violet-600 hover:bg-violet-700 transition-colors text-white rounded-lg disabled:cursor-not-allowed self-end"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  Say Hello <BiLoaderAlt className="animate-spin" />
                </span>
              ) : (
                "Say Hello 👋"
              )}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnHover
        theme={"colored"}
      />
    </SectionWrapper>
  );
};

export default Contact;
