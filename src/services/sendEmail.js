import { Resend } from "resend";
const resend = new Resend("re_b5reac54_65BGVPZazKGqa1BFXLzjyBeY");

//funvion para enviar email:
const sendEmail = (to, subject, content) => {
  try {
    resend.emails.send({
      from: "onboarding@resend.dev",
      to: to,
      subject: subject,
      html: content,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.log(error, "Error sending email");
  }
};

export default sendEmail;
