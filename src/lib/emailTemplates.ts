import { createTransport } from "nodemailer";

export async function sendVerificationRequest(params: any) {
  const { identifier, url, provider, theme } = params;
  const { host } = new URL(url);

  const transport = createTransport(provider.server);
  const result = await transport.sendMail({
    to: identifier,
    from: provider.from,
    subject: `Sign in to ${host}`,
    text: magicLinkText({ url, host }),
    html: magicLinkHtml({ url, host }),
  });

  const failed = result.rejected || [];
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
  }
}

export async function sendWelcomeEmail(email: string, name: string | null) {
  try {
    const transport = createTransport(process.env.EMAIL_SERVER);
    await transport.sendMail({
      to: email,
      from: process.env.EMAIL_FROM,
      subject: "Welcome to hitd.ai!",
      html: welcomeHtml({ name: name || "there" }),
    });
  } catch (error) {
    console.error("Failed to send welcome email:", error);
  }
}

export function magicLinkHtml({ url, host }: { url: string; host: string }) {
  const escapedHost = host.replace(/\./g, "&#8203;.");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sign in to ${escapedHost}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #FAFAFA; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #FAFAFA; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #FFFFFF; border: 1px solid #EAEAEA; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #000000; letter-spacing: -0.5px;">hitd.ai</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px 30px; text-align: center;">
              <h2 style="margin: 0 0 16px; font-size: 20px; font-weight: 600; color: #111111;">Sign in to your account</h2>
              <p style="margin: 0; font-size: 15px; line-height: 24px; color: #666666;">
                Click the button below to securely sign in to <strong>${escapedHost}</strong>. This link will expire in 24 hours.
              </p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 0 40px 40px;">
              <a href="${url}" style="display: inline-block; padding: 14px 32px; background-color: #000000; color: #FFFFFF; text-decoration: none; font-size: 16px; font-weight: 600; border-radius: 8px;">
                Sign In / Register
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px 40px; text-align: center;">
              <p style="margin: 0; font-size: 13px; line-height: 20px; color: #999999;">
                If you didn't request this email, you can safely ignore it.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}

export function magicLinkText({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host}\n${url}\n\n`;
}

export function welcomeHtml({ name }: { name: string }) {
  const greeting = name && name !== "there" ? `Hi ${name},` : "Hi there,";
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to hitd.ai</title>
</head>
<body style="margin: 0; padding: 0; background-color: #FAFAFA; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #FAFAFA; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #FFFFFF; border: 1px solid #EAEAEA; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #000000; letter-spacing: -0.5px;">hitd.ai</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px 30px; text-align: left;">
              <h2 style="margin: 0 0 20px; font-size: 20px; font-weight: 600; color: #111111;">${greeting}</h2>
              <p style="margin: 0 0 16px; font-size: 15px; line-height: 24px; color: #444444;">
                Thank you for registering at <strong>hitd.ai</strong>! We are thrilled to have you on board.
              </p>
              <p style="margin: 0 0 16px; font-size: 15px; line-height: 24px; color: #444444;">
                Our platform is designed to help you analyze and improve your content effortlessly using advanced AI. Whether you are generating copy or analyzing videos, we've got you covered.
              </p>
              <p style="margin: 0; font-size: 15px; line-height: 24px; color: #444444;">
                If you have any questions or need help getting started, just reply to this email. Our team is always here to assist you.
              </p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 10px 40px 40px;">
              <a href="https://hitd.ai/dashboard" style="display: inline-block; padding: 14px 32px; background-color: #000000; color: #FFFFFF; text-decoration: none; font-size: 16px; font-weight: 600; border-radius: 8px;">
                Go to Dashboard
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}
