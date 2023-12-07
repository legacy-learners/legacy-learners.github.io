import { useState } from "react";
import students from "../assets/students.jpg";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

export const Contact = () => {
  const [loading, setLoading] = useState(false);
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

  const handleForm = async (data: Inputs) => {
    console.log({ data });
    setLoading(true);
    try {
      const body = {
        accessKey: import.meta.env.VITE_STATICFORM_TOKEN,
        subject: "Legacy Learners Website Contact Form",
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: `childs month and year: ${data.childsAge}
        message: ${data.message}
        `,
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
      } else {
        toast("Sorry, something went wrong. Please try again later.", {
          type: "error",
          position: "bottom-center",
        });
      }
    } catch (error) {
      toast(
        "Sorry, something went wrong. Please try again later or try reaching out directly on our email.",
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
                        type="phone"
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
                          const date = new Date(data ?? new Date());
                          const month = date.getMonth() + 1;
                          const year = date.getFullYear();
                          setValue(
                            "childsAge",
                            `month: ${month} / year: ${year}`
                          );
                        }}
                        sx={{
                          width: "100%",
                          input: {
                            py: 0,
                          },
                          button: {
                            background: "red",
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
                    <div className="mt-4">
                      <button
                        disabled={loading}
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
