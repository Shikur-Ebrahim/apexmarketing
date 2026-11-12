import { Resend } from "resend";
import nodemailer from "nodemailer";

let resendClient: Resend | null = null;

export function getResendClient(): Resend {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error(
        "RESEND_API_KEY is missing. Please add it to your .env.local file."
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
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Apex Marketing Verification</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f8fafc; padding: 16px 12px;">
          <tr>
            <td align="center">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 440px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.06);">
                
                <!-- Top Logo -->
                <tr>
                  <td align="center" style="padding: 20px 20px 10px 20px;">
                    <img src="${LOGO_URL}" alt="Apex Marketing Hub" width="230" style="display: block; width: 230px; max-width: 100%; height: auto; border: 0; border-radius: 10px;" />
                  </td>
                </tr>

                <!-- Main Content (Compact, no-scroll design) -->
                <tr>
                  <td style="padding: 10px 28px 20px 28px; text-align: center;">
                    <h1 style="margin: 0 0 8px 0; font-size: 20px; font-weight: 700; color: #0f172a; letter-spacing: -0.3px;">
                      Email Verification
                    </h1>
                    <p style="margin: 0 0 16px 0; font-size: 14px; line-height: 20px; color: #64748b;">
                      Welcome to <strong style="color: #0284c7;">Apex Marketing Hub</strong>. Use the verification code below to complete your registration:
                    </p>

                    ${
                      verificationCode
                        ? `
                      <!-- Verification Code Box -->
                      <div style="margin: 0 auto 14px auto; display: inline-block; padding: 12px 30px; background-color: #f1f5f9; border-radius: 10px; border: 1px solid #cbd5e1;">
                        <span style="font-size: 28px; font-weight: 800; letter-spacing: 6px; color: #0f172a; font-family: -apple-system, BlinkMacSystemFont, monospace;">
                          ${verificationCode}
                        </span>
                      </div>
                      <p style="margin: 0 0 14px 0; font-size: 12px; color: #94a3b8;">
                        This code expires in 10 minutes.
                      </p>
                    `
                        : ""
                    }

                    ${
                      verificationLink
                        ? `
                      <div style="margin-bottom: 14px;">
                        <a href="${verificationLink}" style="display: inline-block; padding: 10px 24px; background-color: #0284c7; color: #ffffff; font-weight: 600; font-size: 14px; text-decoration: none; border-radius: 8px;">
                          Verify Email Address
                        </a>
                      </div>
                    `
                        : ""
                    }

                    <p style="margin: 0; font-size: 12px; color: #94a3b8; line-height: 18px;">
                      If you didn't create an account, you can safely ignore this email.
                    </p>
                  </td>
                </tr>

                <!-- Compact Footer -->
                <tr>
                  <td style="padding: 14px 24px; background-color: #f8fafc; border-top: 1px solid #f1f5f9; text-align: center;">
                    <p style="margin: 0; font-size: 11px; color: #94a3b8; line-height: 16px;">
                      Questions? Reach us at <a href="mailto:${replyTo}" style="color: #0284c7; text-decoration: none;">${replyTo}</a>
                      <br />&copy; 2026 Apex Marketing Hub
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
  const html = getVerificationHtml({ verificationCode, verificationLink, replyTo });

  // If Gmail SMTP App Password is provided, send directly from Gmail so your logo avatar displays!
  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD.replace(/\s+/g, ""), // clean spaces if copied from Google
      },
    });

    const info = await transporter.sendMail({
      from: `Apex Marketing <${process.env.GMAIL_USER}>`,
      to,
      replyTo,
      subject: "Verify your Apex Marketing account",
      html,
    });

    return { provider: "gmail", messageId: info.messageId };
  }

  // Fallback to Resend
  const resend = getResendClient();
  const from = process.env.EMAIL_FROM || "Apex Marketing <onboarding@resend.dev>";

  return await resend.emails.send({
    from,
    to,
    replyTo,
    subject: "Verify your Apex Marketing account",
    html,
  });
}
