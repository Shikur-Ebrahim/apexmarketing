import { Resend } from "resend";

let resendClient: Resend | null = null;

export function getResendClient(): Resend {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error(
        "RESEND_API_KEY is missing. Please add it to your environment variables."
      );
    }
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

interface SendVerificationEmailParams {
  to: string;
  verificationCode?: string;
  verificationLink?: string;
}

const LOGO_URL =
  "https://res.cloudinary.com/ujbsqmo3/image/upload/v1794472184/apexmarketing/logo.jpg";

function getVerificationHtml({
  verificationCode,
  verificationLink,
  replyTo,
}: {
  verificationCode?: string;
  verificationLink?: string;
  replyTo: string;
}) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Verify your Apex Marketing Hub account</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f8fafc; padding: 24px 12px;">
          <tr>
            <td align="center">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 460px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 14px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
                
                <!-- Logo Header -->
                <tr>
                  <td align="center" style="padding: 24px 20px 12px 20px;">
                    <img src="${LOGO_URL}" alt="Apex Marketing Hub" width="220" style="display: block; width: 220px; max-width: 100%; height: auto; border: 0; border-radius: 8px;" />
                  </td>
                </tr>

                <!-- Content Area -->
                <tr>
                  <td style="padding: 12px 32px 24px 32px; text-align: center;">
                    <h1 style="margin: 0 0 10px 0; font-size: 20px; font-weight: 700; color: #0f172a;">
                      Account Verification
                    </h1>
                    <p style="margin: 0 0 18px 0; font-size: 14px; line-height: 22px; color: #475569;">
                      Thank you for joining <strong>Apex Marketing Hub</strong>. Use the security verification code below to confirm your email address.
                    </p>

                    ${
                      verificationCode
                        ? `
                      <div style="margin: 0 auto 16px auto; display: inline-block; padding: 14px 32px; background-color: #f1f5f9; border-radius: 8px; border: 1px solid #cbd5e1;">
                        <span style="font-size: 30px; font-weight: 800; letter-spacing: 6px; color: #0284c7; font-family: -apple-system, BlinkMacSystemFont, monospace;">
                          ${verificationCode}
                        </span>
                      </div>
                      <p style="margin: 0 0 16px 0; font-size: 12px; color: #64748b;">
                        This verification code will expire in 10 minutes.
                      </p>
                    `
                        : ""
                    }

                    ${
                      verificationLink
                        ? `
                      <div style="margin-bottom: 16px;">
                        <a href="${verificationLink}" style="display: inline-block; padding: 12px 28px; background-color: #0284c7; color: #ffffff; font-weight: 600; font-size: 14px; text-decoration: none; border-radius: 6px;">
                          Verify My Email
                        </a>
                      </div>
                    `
                        : ""
                    }

                    <p style="margin: 0; font-size: 12px; color: #94a3b8; line-height: 18px;">
                      If you did not request this code, no further action is required.
                    </p>
                  </td>
                </tr>

                <!-- Footer (Anti-Spam CAN-SPAM compliant) -->
                <tr>
                  <td style="padding: 16px 24px; background-color: #f8fafc; border-top: 1px solid #f1f5f9; text-align: center;">
                    <p style="margin: 0 0 4px 0; font-size: 11px; color: #64748b;">
                      Need help? Contact support at <a href="mailto:${replyTo}" style="color: #0284c7; text-decoration: none;">${replyTo}</a>
                    </p>
                    <p style="margin: 0; font-size: 11px; color: #94a3b8;">
                      Apex Marketing Hub &bull; <a href="https://apexmarketinget.com" style="color: #64748b; text-decoration: none;">apexmarketinget.com</a>
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

export async function sendVerificationEmail({
  to,
  verificationCode,
  verificationLink,
}: SendVerificationEmailParams) {
  const replyTo = process.env.EMAIL_REPLY_TO || "apexmarketinghub01@gmail.com";
  const from =
    process.env.EMAIL_FROM || "Apex Marketing Hub <verify@apexmarketinget.com>";

  const code = verificationCode || Math.floor(100000 + Math.random() * 900000).toString();
  const html = getVerificationHtml({ verificationCode: code, verificationLink, replyTo });

  // Plain text fallback (Crucial to prevent Gmail spam detection)
  const text = `Welcome to Apex Marketing Hub!

Your account verification code is: ${code}

This code will expire in 10 minutes.

If you did not request this verification code, please ignore this email.

Need assistance? Contact support at ${replyTo}
Apex Marketing Hub - https://apexmarketinget.com`;

  const resend = getResendClient();

  return await resend.emails.send({
    from,
    to,
    replyTo,
    subject: `Your Apex Marketing verification code: ${code}`,
    html,
    text,
    headers: {
      "X-Entity-Ref-ID": `apex-${Date.now()}`,
    },
  });
}
