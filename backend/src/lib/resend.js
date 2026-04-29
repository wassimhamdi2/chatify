import { Resend } from 'resend';
import "dotenv/config"


const resendClient = new Resend(process.env.RESEND_API_KEY);

export const sender= {
    email: process.env.EMAIL_FROM,
    name: process.env.EMAIL_FROM_NAME
}

(async function () {
  const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: ['delivered@resend.dev'],
    subject: 'Hello World',
    html: '<strong>It works!</strong>',
  });

  if (error) {
    return console.error({ error });
  }

  console.log({ data });
})();