import { useState } from "react";
import students from "../assets/students.jpg";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Inputs = {
  name: string;
  email: string;
  tel: string;
  message: string;
};

export const Contact = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      name: "",
      email: "",
      tel: "",
      message: "",
    },
  });

  const handleForm = async (data: Inputs) => {
    console.log({ data });
    setLoading(true);
    try {
      const body = {
        name: data.name,
        email: `email: ${data.email} - phone: ${data.tel}  `,
        message: data.message,
        honeypot: "",
        replyTo: "@",
        subject: "Legacy Learners Website Contact Form",
        accessKey: import.meta.env.VITE_STATICFORM_TOKEN,
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

  const allVales = getValues();

  return (
    <>
      <ToastContainer />
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
                      {...register("email", {
                        required:
                          !allVales.email && !allVales.tel ? true : false,
                      })}
                    />
                    <small className="error">
                      {errors.email ||
                      (errors.tel && !allVales.email && !allVales.tel)
                        ? "We need either your email or phone so we can get in touch"
                        : null}
                    </small>
                  </div>
                  <div className="holder">
                    <label htmlFor="tel">Phone</label>
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      {...register("tel", {
                        required:
                          !allVales.email && !allVales.tel ? true : false,
                      })}
                    />
                    <small className="error">
                      {errors.email ||
                      (errors.tel && !allVales.email && !allVales.tel)
                        ? "We need either your phone or email so we can get in touch"
                        : null}
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
                    <button disabled={loading} type="submit">
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
    </>
  );
};
