import students from "../assets/students.jpg";
import { useForm } from "react-hook-form";

type Inputs = {
  name: string;
  email: string;
  tel: string;
  message: string;
};

export const Contact = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      name: "",
      email: "",
      tel: "",
      message: "",
    },
  });

  const handleForm = (data: Inputs) => {
    console.log({ data });
    const sendGridApiKey = process.env.SEND_GRID;

    fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sendGridApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: "vitorboccio@gmail.com" }],
            subject: "Contact via LL Website",
          },
        ],
        from: { email: "contact@legacylearners.ca" },
        content: [
          {
            type: "text/plain",
            value: `
            <strong>Name:<strong> ${data.name} <br />
            <strong>Email:</strong> ${data.email} <br />
            <strong>Phone:</strong> ${data.tel} <br />
            <strong>Message:</strong> ${data.message} <br />
            `,
          },
        ],
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Email sent successfully");
        } else {
          console.error("Error sending email");
        }
      })
      .catch((error) => {
        console.error("Error sending email", error);
      });
  };

  const allVales = getValues();

  return (
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
                      required: !allVales.email && !allVales.tel ? true : false,
                    })}
                  />
                  <small className="error">
                    {!allVales.email && !allVales.tel
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
                      required: !allVales.email && !allVales.tel ? true : false,
                    })}
                  />
                  <small className="error">
                    {!allVales.email && !allVales.tel
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
                  <button type="submit"> send</button>
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
  );
};
