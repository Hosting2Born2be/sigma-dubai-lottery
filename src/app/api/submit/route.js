import { NextResponse } from "next/server";
import { Pool } from "pg";
import { google } from "googleapis";

function makeBody(to, from, subject, message) {
  const email = [
    `To: ${to}`,
    `From: ${from}`,
    `Subject: ${subject}`,
    `MIME-Version: 1.0`,
    `Content-Type: text/html; charset=UTF-8`,
    "",
    message.trim(),
  ].join("\r\n");

  return Buffer.from(email)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      id,
      firstName,
      lastName,
      phone,
      email,
      industry,
      company,
      websiteUrl,
      currentPaymentProviders,
    } = body;

    // Створення запису в базі та отримання згенерованого id
    const insertQuery = `
      INSERT INTO "sigma-dubai-lottery"
      ("firstName", "lastName", phone, email, industry, company, "websiteUrl", "currentPaymentProviders")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id
    `;
    const result = await pool.query(insertQuery, [
      firstName,
      lastName,
      phone,
      email,
      industry,
      company,
      websiteUrl,
      currentPaymentProviders,
    ]);
    const userId = result.rows[0].id;

    const OAuth2 = google.auth.OAuth2;
    const oauth2Client = new OAuth2(
      process.env.EMAIL_CLIENT_ID,
      process.env.EMAIL_CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    );
    oauth2Client.setCredentials({
      refresh_token: process.env.EMAIL_REFRESH_TOKEN,
    });
    const accessTokenResponse = await oauth2Client.getAccessToken();
    if (!accessTokenResponse.token) {
      throw new Error("Failed to generate access token.");
    }
    const gmail = google.gmail({ version: "v1", auth: oauth2Client });

    const adminEmailBody = makeBody(
      process.env.EMAIL_USER,
      process.env.EMAIL_USER,
      "New Lottery Entry",
      `
      <p><b>First Name:</b> ${firstName}</p>
      <p><b>Last Name:</b> ${lastName}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Phone:</b> ${phone}</p>
      <p><b>Industry:</b> ${industry}</p>
      <p><b>Company:</b> ${company || "N/A"}</p>
      <p><b>Website URL:</b> ${websiteUrl}</p>
      <p><b>Current Payment Providers:</b> ${
        currentPaymentProviders || "N/A"
      }</p>
      <p><b>ID:</b> ${userId}</p>
      `
    );

    const clientEmailSubject = "Sigma Dubai Participation Confirmation Letter";
    const clientEmailBody = makeBody(
      email,
      process.env.EMAIL_USER,
      clientEmailSubject,
      `
      <table width="640"
    style="border-collapse: collapse; margin: 0 auto;  font-family: Roboto, sans-serif;background: #EDEDED;">
    <thead>
        <tr>
            <td>
                <img style="width: 100%" src="https://sigma-dubai-lottery.clarityglobalinc.com/images/email_header.png"
                    alt="Header" />
            </td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="padding: 50px 40px 16px 40px; color:#0A0A0A;">
                <h2 style="color: #2D2D2D;
                font-size: 16px;
                font-style: normal;
                font-weight: 800;
                line-height: normal;">Hello ${firstName},</h2>
                <p style="color: #2D2D2D;
                font-size: 10px;
                font-style: normal;
                font-weight: 400;
                line-height: normal;">You have successfully registered for the Clarity Global Raffle at Sigma Dubai!
                    This means you now have the chance to win an exclusive prize.</p>
            </td>
        </tr>
        <tr>
            <td style="padding: 16px 40px;">
                <table style="width: 100%;">
                    <td style="border-radius: 16px;
background: #F85C3A;
padding: 16px;">
                        <p style="color: #FFF;
                text-align: center;
                font-size: 16px;
                font-style: normal;
                font-weight: 600;
                line-height: normal;margin: 0;">Your unique raffle number</p>
                        <p style="color: #FFF;
                text-align: center;
                font-size: 32px;
                font-style: normal;
                font-weight: 600;
                line-height: normal;margin: 0;">
                            ${userId}
                        </p>
                    </td>
                </table>
            </td>
        </tr>
        <tr>
            <td style="padding: 16px 40px;">
                <p style="color: #2D2D2D;
                font-size: 12px;
                font-style: normal;
                font-weight: 800;
                line-height: normal;">
                    What Happens Next?
                </p>
                <ul style="font-size: 10px;color: #2D2D2D;padding-left: 12px;">
                    <li>The raffle will take place at our booth during the event at SIGMA Dubai 2025</li>
                    <li>If you win, you will receive a personal email notification with instructions on how to claim
                        your prize.</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td style="padding: 16px 40px;">
                <table style="width: 100%;">
                    <td style="border-radius: 16px;
background: #fff;
padding: 32px;">
                        <p style="color: #2D2D2D;
                text-align: center;
                font-size: 16px;
                font-style: normal;
                font-weight: 600;
                line-height: normal;margin: 0;">For real-time updates and raffle results,<br>
                            join our Telegram channel</p>
                        <a href="https://t.me/+O2DTGj6u8MY5Y2Jk" target="_blank" style="color: #FFF;
                        font-size: 10px;
                        font-style: normal;
                        font-weight: 700;
                        line-height: 1;
                        padding: 10px 30px;
                        border-radius: 100px;
                        background: #F85C3A;
                        display: block;
                        margin: 16px auto 0 auto;
                        text-align: center;
                        width: fit-content;
                        text-decoration: none;">
                            Join our telegram
                        </a>
                    </td>
                </table>
            </td>
        </tr>
        <tr>
            <td style="padding: 16px 40px 40px 40px;">
                <p style="color: #2D2D2D;
                font-size: 10px;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
                margin-bottom: 24px;">Thank you for participating, and good luck! We look forward to seeing you at the
                    event.</p>
                <p style="color: #2D2D2D;
                font-size: 12px;
                font-style: normal;
                font-weight: 800;
                line-height: normal;
                ">
                    The Clarity Global Team
                </p>
                <p style="margin-bottom: 8px;">
                    <a href="https://clarityglobalinc.com" target="_blank" style="display: inline-block;
                color: #F85C3A;
                font-size: 10px;
                font-style: normal;
                font-weight: 700;
                line-height: normal;
                text-decoration-line: underline;
                text-decoration-style: solid;
                text-decoration-skip-ink: none;
                text-decoration-thickness: auto;
                text-underline-offset: auto;
                text-underline-position: from-font;">
                        <img width="15" height="15"
                            src="https://sigma-dubai-lottery.clarityglobalinc.com/images/website_icon.png" alt="tg"
                            style="float: left;margin-right: 6px;margin-top: -2px;" />
                        clarityglobalinc.com
                    </a>
                </p>
                <p><a href="mailto:info@clarityglobalinc.com" target="_blank" style="display: inline-block;
                    color: #F85C3A;
                    font-size: 10px;
                    font-style: normal;
                    font-weight: 700;
                    line-height: normal;
                    text-decoration-line: underline;
                    text-decoration-style: solid;
                    text-decoration-skip-ink: none;
                    text-decoration-thickness: auto;
                    text-underline-offset: auto;
                    text-underline-position: from-font;">
                        <img width="15" height="15"
                            src="https://sigma-dubai-lottery.clarityglobalinc.com/images/email_icon.png" alt="tg"
                            style="float: left;margin-right: 6px;margin-top: -2px;" />
                        info@clarityglobalinc.com
                    </a></p>
            </td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td style="background-color: #2D2D2D;
            padding: 40px;
            background-image: url('https://sigma-dubai-lottery.clarityglobalinc.com/images/email_footer.png');
            background-position: bottom center;
            background-size: cover;
            ">
                <table style="width: 100%;">
                    <tr>
                        <td style="width: 33%;vertical-align: baseline;">
                            <p style="color: #F85C3A;
                            font-size: 20px;
                            font-style: normal;
                            font-weight: 800;
                            line-height: 140%;margin: 0 0 10px 0;">Clarity Global</p>
                            <p style="color: #F6F6F6;
                            font-size: 14px;
                            font-style: normal;
                            font-weight: 600;
                            line-height: 110%;margin: 0;">Your Trusted Partner in <br>Financial Solutions.</p>
                        </td>
                        <td style="width: 33%;"></td>
                        <td style="width: 33%;vertical-align: baseline;margin-left: auto;">
                            <p style="color: #FFF;
                            font-size: 9.52px;
                            font-style: normal;
                            font-weight: 800;
                            line-height: normal;margin-bottom: 7px;">Support for service</p>
                            <a href="https://t.me/ClarityGlobalSupport" target="_blank" style="display: inline-block;color: #FFF;
                            font-size: 9.52px;
                            font-style: normal;
                            font-weight: 600;
                            line-height: normal;
                            margin-bottom: 7px;
                            text-decoration: none;">
                                <img width="15" height="15"
                                    src="https://sigma-dubai-lottery.clarityglobalinc.com/images/tg_icon.png" alt="tg"
                                    style="float: left;margin-right: 6px;margin-top: -2px;" />
                                @ClarityGlobalSupport
                            </a>
                            <a href="https://wa.me/38669403456" target="_blank" style="display: inline-block;color: #FFF;
                            font-size: 9.52px;
                            font-style: normal;
                            font-weight: 600;
                            line-height: normal;
                            text-decoration: none;">
                                <img width="15" height="15"
                                    src="https://sigma-dubai-lottery.clarityglobalinc.com/images/whatsapp_icon.png"
                                    alt="tg" style="float: left;margin-right: 6px;margin-top: -2px;" />
                                +38669403456
                            </a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </tfoot>
</table>
      `
    );

    // Відправка листа адміну
    await gmail.users.messages.send({
      userId: "me",
      resource: { raw: adminEmailBody },
    });

    // Відправка листа клієнту
    await gmail.users.messages.send({
      userId: "me",
      resource: { raw: clientEmailBody },
    });

    return NextResponse.json({ success: true, id: userId });
  } catch (error) {
    console.error("Error:", error.message);
    return NextResponse.json(
      { error: "Internal server error", message: error.message },
      { status: 500 }
    );
  }
}
