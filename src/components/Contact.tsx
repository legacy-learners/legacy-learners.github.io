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
  const [recaptchaError, setRecaptchaError] = useState<string | null>(null);

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

  // Use a simpler approach with the explicit onload callback
  useEffect(() => {
    // Define the callback function
    window.onReCaptchaLoad = () => {
      console.log("reCAPTCHA script loaded");
      setRecaptchaLoaded(true);
    };

    // Create script element
    const script = document.createElement("script");
    script.src =
      "https://www.google.com/recaptcha/api.js?onload=onReCaptchaLoad&render=explicit";
    script.async = true;

    // Add error handling for the script
    script.onerror = (e) => {
      console.error("Error loading reCAPTCHA script:", e);
      setRecaptchaError(
        "Failed to load reCAPTCHA. Please refresh the page and try again."
      );
    };

    // Append to document
    document.head.appendChild(script);

    return () => {
      // Clean up
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      window.onReCaptchaLoad = undefined;
    };
  }, []);

  // This effect runs when the script is loaded
  useEffect(() => {
    if (recaptchaLoaded && recaptchaRef.current) {
      try {
        console.log("Attempting to render reCAPTCHA");

        // Verify grecaptcha is available
        if (!window.grecaptcha || !window.grecaptcha.render) {
          console.error("grecaptcha not available");
          setRecaptchaError(
            "reCAPTCHA is not available. Please check your internet connection and try again."
          );
          return;
        }

        // Use a try-catch to capture any render errors
        try {
          // For debugging
          console.log(
            "Site key being used:",
            import.meta.env.VITE_RECAPTCHA_SITE_KEY ||
              "6LdSZA0rAAAAAGqi6IQto1iPNUkgHPOqKn9urHMw"
          );

          window.grecaptcha.render(recaptchaRef.current, {
            // Try using the environment variable first, fall back to the hardcoded key
            sitekey:
              import.meta.env.VITE_RECAPTCHA_SITE_KEY ||
              "6LdSZA0rAAAAAGqi6IQto1iPNUkgHPOqKn9urHMw",
            callback: (token: string) => {
              console.log("reCAPTCHA callback received");
              setRecaptchaToken(token);
            },
            "expired-callback": () => setRecaptchaToken(""),
            // eslint-disable-next-line
            "error-callback": (error: any) => {
              console.error("reCAPTCHA widget error:", error);
              setRecaptchaError(
                "There was an error with the reCAPTCHA verification. Please try again."
              );
            },
          });
        } catch (renderError) {
          console.error("Error rendering reCAPTCHA widget:", renderError);
          setRecaptchaError(
            "Could not initialize reCAPTCHA. It may already be rendered or there was an error."
          );
        }
      } catch (error) {
        console.error("Top level reCAPTCHA error:", error);
        setRecaptchaError(
          "An unexpected error occurred with reCAPTCHA. Please refresh the page."
        );
      }
    }
  }, [recaptchaLoaded]);

  const handleForm = async (data: Inputs) => {
    console.log({ data });

    // Check if grecaptcha is available
    if (!window.grecaptcha) {
      toast(
        "reCAPTCHA is not available. Please refresh the page and try again.",
        {
          type: "error",
          position: "bottom-center",
        }
      );
      return;
    }

    // Get the response
    const captchaResponse = window.grecaptcha.getResponse();
    console.log("reCAPTCHA response length:", captchaResponse?.length || 0);

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
        "g-recaptcha-response": captchaResponse,
      };

      console.log("Submitting form with reCAPTCHA response");

      const res = await fetch("https://api.staticforms.xyz/submit", {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      });

      const json = await res.json();
      console.log("Form submission response:", json);

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
        console.error("Form submission error:", json);
        toast(
          `Sorry, something went wrong: ${json.message || "Unknown error"}`,
          {
            type: "error",
            position: "bottom-center",
          }
        );
      }
    } catch (error) {
      console.error("Form submission exception:", error);
      toast(
        "Sorry, something went wrong. Please try again later or try reaching out directly on our email legacylearnersdayhome@gmail.com.",
        { type: "error" }
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
                    {/* Form fields... */}
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
                      {recaptchaError ? (
                        <small className="error">{recaptchaError}</small>
                      ) : !recaptchaToken ? (
                        <small className="error">
                          Please complete the reCAPTCHA verification
                        </small>
                      ) : null}
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
