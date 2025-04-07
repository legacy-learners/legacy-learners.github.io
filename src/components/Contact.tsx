import { useState, useRef, useEffect } from "react";
import students from "../assets/students.jpg";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { differenceInMonths, differenceInYears } from "date-fns";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";

type Inputs = {
  name: string;
  email: string;
  phone: string;
  message: string;
  childsAge: string;
};

// Declare global grecaptcha
declare global {
  interface Window {
    // eslint-disable-next-line
    grecaptcha: any;
    onReCaptchaLoad: (() => void) | undefined;
  }
}

export const Contact = () => {
  const [loading, setLoading] = useState(false);
  const recaptchaRef = useRef<HTMLDivElement>(null);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      childsAge: "",
    },
  });

  // Initialize reCAPTCHA
  useEffect(() => {
    // Add callback function to window object before loading the script
    window.onReCaptchaLoad = () => {
      setRecaptchaLoaded(true);
    };

    // Create a script element for reCAPTCHA
    const script = document.createElement("script");
    script.src =
      "https://www.google.com/recaptcha/api.js?onload=onReCaptchaLoad&render=explicit";
    script.async = true;
    script.defer = true;

    // Append the script to the document
    document.body.appendChild(script);

    // Clean up
    return () => {
      if (script.parentNode) {
        document.body.removeChild(script);
      }
      // eslint-disable-next-line
      (window as any).onReCaptchaLoad = undefined;
    };
  }, []);

  // Render reCAPTCHA once it's loaded
  useEffect(() => {
    if (recaptchaLoaded && recaptchaRef.current && window.grecaptcha) {
      try {
        window.grecaptcha.render(recaptchaRef.current, {
          sitekey: import.meta.env.VITE_RECAPTCHA_SITE_KEY, // Get key from environment variables
          callback: (token: string) => setRecaptchaToken(token),
          "expired-callback": () => setRecaptchaToken(""),
        });
      } catch (error) {
        console.error("Error rendering reCAPTCHA:", error);
      }
    }
  }, [recaptchaLoaded]);

  const handleForm = async (data: Inputs) => {
    console.log({ data });

    // Get the reCAPTCHA response directly from grecaptcha
    const captchaResponse = window.grecaptcha
      ? window.grecaptcha.getResponse()
      : "";

    // Verify reCAPTCHA token exists
    if (!captchaResponse) {
      toast("Please complete the reCAPTCHA verification.", {
        type: "error",
        position: "bottom-center",
      });
      return;
    }

    setLoading(true);
    try {
      const body = {
        accessKey: import.meta.env.VITE_STATICFORM_TOKEN,
        subject: "Legacy Learners Website Contact Form",
        name: data.name,
        email: data.email,
        phone: data.phone,
        $childsAge: data.childsAge,
        message: data.message,
        "g-recaptcha-response": captchaResponse, // Include the reCAPTCHA token
      };
      const res = await fetch("https://api.staticforms.xyz/submit", {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      });

      const json = await res.json();
      if (json.success) {
        toast("Thanks for your message👍. We will get back to you ASAP.", {
          type: "success",
          position: "bottom-center",
        });
        reset();

        // Reset reCAPTCHA
        if (window.grecaptcha) {
          window.grecaptcha.reset();
          setRecaptchaToken("");
        }
      } else {
        toast("Sorry, something went wrong. Please try again later.", {
          type: "error",
          position: "bottom-center",
        });
      }
    } catch (error) {
      toast(
        "Sorry, something went wrong. Please try again later or try reaching out directly on our email legacylearnersdayhome@gmail.com.",
        {
          type: "error",
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <section className="contact_section" id="contact">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="d-flex justify-content-center d-md-block">
                  <h2>Contact Us</h2>
                </div>
                <form onSubmit={handleSubmit(handleForm)}>
                  <div className="contact_form-container">
                    <div className="holder">
                      <label htmlFor="name">Name</label>
                      <input
                        id="name"
                        type="text"
                        placeholder="Name"
                        {...register("name", { required: "Name is required" })}
                      />
                      <small className="error">
                        {errors.name ? "Name is required" : null}
                      </small>
                    </div>
                    <div className="holder">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        {...register("email", { required: true })}
                      />
                      <small className="error">
                        {errors.email
                          ? "We need your email so we can get in touch"
                          : null}
                      </small>
                    </div>
                    <div className="holder">
                      <label htmlFor="phone">Phone</label>
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        {...register("phone", { required: true })}
                      />
                      <small className="error">
                        {errors.phone
                          ? "We need your phone so we can get in touch"
                          : null}
                      </small>
                    </div>
                    <div className="holder">
                      <label htmlFor="subject">
                        Month and year your child was born
                      </label>
                      <DatePicker
                        disableFuture
                        views={["year", "month"]}
                        {...register("childsAge", { required: true })}
                        onChange={(data: Date | null) => {
                          const currentDate = new Date();
                          const selectedDate = new Date(data ?? currentDate);
                          const month = selectedDate.getMonth() + 1;
                          const year = selectedDate.getFullYear();

                          const totalMonths = differenceInMonths(
                            currentDate,
                            selectedDate
                          );
                          const years = differenceInYears(
                            currentDate,
                            selectedDate
                          );
                          const remainingMonths = totalMonths % 12;

                          setValue(
                            "childsAge",
                            `month: ${month} / 
                            year: ${year} / 
                            age: ${years} years and ${remainingMonths} months`
                          );
                        }}
                        sx={{
                          width: "100%",
                          input: {
                            py: 0,
                          },
                        }}
                      />
                      <small className="error">
                        {errors.childsAge ? "child's age is required" : null}
                      </small>
                    </div>
                    <div className="holder">
                      <label htmlFor="message">Message</label>
                      <textarea
                        placeholder="Message"
                        rows={3}
                        cols={50}
                        id="message"
                        {...register("message", { required: true })}
                      />
                      <small className="error">
                        {errors.message ? "Message is required" : null}
                      </small>
                    </div>

                    {/* reCAPTCHA container */}
                    <div className="holder">
                      <div ref={recaptchaRef}></div>
                      {!recaptchaToken && (
                        <small className="error">
                          Please complete the reCAPTCHA verification
                        </small>
                      )}
                    </div>

                    <div className="mt-4">
                      <button
                        disabled={loading || !recaptchaToken}
                        className="submit"
                        type="submit"
                      >
                        {loading ? "loading..." : "send"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-md-6">
                <div className="contact_img-box">
                  <img
                    src={students}
                    alt="students green esmerald pencil and pen"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </LocalizationProvider>
    </>
  );
};
