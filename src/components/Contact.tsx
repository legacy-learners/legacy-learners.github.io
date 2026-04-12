import { useState, useRef, useEffect } from "react";
import students from "../assets/students.jpg";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";
import PhoneInput from "react-phone-number-input/react-hook-form";
import "react-phone-number-input/style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { differenceInMonths, differenceInYears } from "date-fns";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email({ error: "Please enter a valid email address" }),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .refine(isValidPhoneNumber, "Please enter a valid phone number"),
  message: z.string().min(1, "Message is required"),
  childsAge: z.string().min(1, "Child's birth date is required"),
});

type Inputs = z.infer<typeof schema>;

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
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const recaptchaRef = useRef<HTMLDivElement>(null);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [recaptchaError, setRecaptchaError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      childsAge: "",
    },
  });

  useEffect(() => {
    window.onReCaptchaLoad = () => {
      setRecaptchaLoaded(true);
    };

    const script = document.createElement("script");
    script.src =
      "https://www.google.com/recaptcha/api.js?onload=onReCaptchaLoad&render=explicit";
    script.async = true;

    script.onerror = (e) => {
      console.error("Error loading reCAPTCHA script:", e);
      setRecaptchaError(
        "Failed to load reCAPTCHA. Please refresh the page and try again.",
      );
    };

    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      window.onReCaptchaLoad = undefined;
    };
  }, []);

  useEffect(() => {
    if (recaptchaLoaded && recaptchaRef.current) {
      try {
        if (!window.grecaptcha || !window.grecaptcha.render) {
          console.error("grecaptcha not available");
          setRecaptchaError(
            "reCAPTCHA is not available. Please check your internet connection and try again.",
          );
          return;
        }

        try {
          window.grecaptcha.render(recaptchaRef.current, {
            sitekey:
              import.meta.env.VITE_RECAPTCHA_SITE_KEY ||
              "6LdSZA0rAAAAAGqi6IQto1iPNUkgHPOqKn9urHMw",
            callback: (token: string) => {
              setRecaptchaToken(token);
            },
            "expired-callback": () => setRecaptchaToken(""),
            // eslint-disable-next-line
            "error-callback": (error: any) => {
              console.error("reCAPTCHA widget error:", error);
              setRecaptchaError(
                "There was an error with the reCAPTCHA verification. Please try again.",
              );
            },
          });
        } catch (renderError) {
          console.error("Error rendering reCAPTCHA widget:", renderError);
          setRecaptchaError(
            "Could not initialize reCAPTCHA. It may already be rendered or there was an error.",
          );
        }
      } catch (error) {
        console.error("Top level reCAPTCHA error:", error);
        setRecaptchaError(
          "An unexpected error occurred with reCAPTCHA. Please refresh the page.",
        );
      }
    }
  }, [recaptchaLoaded]);

  const handleForm = async (data: Inputs) => {
    const captchaResponse = window.grecaptcha.getResponse();

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
        subject: `Legacy Learners Website Contact Form - ${data.name} - ${new Date().toLocaleDateString()}`,
        name: data.name,
        email: data.email,
        phone: data.phone,
        $childsAge: data.childsAge,
        message: data.message,
        "g-recaptcha-response": captchaResponse,
      };

      const res = await fetch("https://api.staticforms.xyz/submit", {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      });

      await res.json();

      toast("Thanks for your message👍. We will get back to you ASAP.", {
        type: "success",
        position: "bottom-center",
      });
      reset();

      if (window.grecaptcha) {
        window.grecaptcha.reset();
        setRecaptchaToken("");
      }
    } catch (error) {
      console.error("Form submission exception:", error);
      toast(
        "Sorry, something went wrong. Please try again later or try reaching out directly on our email legacylearnersdayhome@gmail.com.",
        { type: "error" },
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
                        {...register("name")}
                      />
                      <small className="error">{errors.name?.message}</small>
                    </div>
                    <div className="holder">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        {...register("email")}
                      />
                      <small className="error">{errors.email?.message}</small>
                    </div>
                    <div className="holder">
                      <label htmlFor="phone">Phone</label>
                      <PhoneInput
                        name="phone"
                        control={control}
                        defaultCountry="CA"
                        placeholder="Phone Number"
                        international
                        countryCallingCodeEditable={false}
                      />
                      <small className="error">{errors.phone?.message}</small>
                    </div>
                    <div className="holder">
                      <label htmlFor="subject">
                        Month and year your child was born
                      </label>
                      <Controller
                        name="childsAge"
                        control={control}
                        render={({ field }) => (
                          <DatePicker
                            disableFuture
                            views={["year", "month"]}
                            open={datePickerOpen}
                            onOpen={() => setDatePickerOpen(true)}
                            onClose={() => setDatePickerOpen(false)}
                            slotProps={{
                              textField: {
                                onClick: () => setDatePickerOpen(true),
                              },
                            }}
                            onChange={(data: Date | null) => {
                              const currentDate = new Date();
                              const selectedDate = new Date(
                                data ?? currentDate,
                              );
                              const month = selectedDate.getMonth() + 1;
                              const year = selectedDate.getFullYear();

                              const totalMonths = differenceInMonths(
                                currentDate,
                                selectedDate,
                              );
                              const years = differenceInYears(
                                currentDate,
                                selectedDate,
                              );
                              const remainingMonths = totalMonths % 12;

                              field.onChange(
                                `month: ${month} / year: ${year} / age: ${years} years and ${remainingMonths} months`,
                              );
                            }}
                            sx={{
                              width: "100%",
                              "& .MuiOutlinedInput-root": {
                                borderRadius: 0,
                                minHeight: "50px",
                                backgroundColor: "white",
                                "& fieldset": {
                                  borderColor: "var(--main-color)",
                                  borderWidth: "1px",
                                },
                                "&:hover fieldset": {
                                  borderColor: "var(--main-color)",
                                },
                                "&.Mui-focused fieldset": {
                                  borderColor: "var(--main-color)",
                                  borderWidth: "3px",
                                },
                              },
                              "& .MuiInputBase-input": {
                                padding: "0 14px",
                                color: "black",
                              },
                              "& .MuiInputAdornment-root": {
                                borderLeft: "none",
                              },
                            }}
                          />
                        )}
                      />
                      <small className="error">
                        {errors.childsAge?.message}
                      </small>
                    </div>
                    <div className="holder">
                      <label htmlFor="message">Message</label>
                      <textarea
                        placeholder="Message"
                        rows={3}
                        cols={50}
                        id="message"
                        {...register("message")}
                      />
                      <small className="error">{errors.message?.message}</small>
                    </div>

                    <div className="footer-holder">
                      <div className="mt-4">
                        <button
                          disabled={loading || !recaptchaToken}
                          className="submit"
                          type="submit"
                        >
                          {loading ? "loading..." : "send"}
                        </button>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-end",
                        }}
                      >
                        <div ref={recaptchaRef}></div>
                        {recaptchaError ? (
                          <small className="error">{recaptchaError}</small>
                        ) : !recaptchaToken ? (
                          <small className="error">
                            Please complete the reCAPTCHA verification
                          </small>
                        ) : null}
                      </div>
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
