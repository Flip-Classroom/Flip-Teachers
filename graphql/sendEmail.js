// const Sib = require("sib-api-v3-sdk");
// const { google } = require("googleapis");
// const OAuth2 = google.auth.OAuth2;
// const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");

export default async function sendEmail(val) {
  //   await sendEmail1(val);
  await sendGridMailer(val);
  // sendEmailViaSib(val);
  // sendEmail1(val);
  // sendEmail3(val);
}

const sendGridMailer = async (val) => {
  sgMail.setApiKey(`${process.env.NEXT_PUBLIC_SEND_GRID_API_KEY}`);
  console.log(
    process.env.NEXT_PUBLIC_SEND_GRID_API_KEY,
    process.env.NEXT_PUBLIC_APP_MAIN_EMAIL
  );
  const message = {
    to: `${val.to_email}`,
    from: `${process.env.NEXT_PUBLIC_APP_MAIN_EMAIL}`,
    subject:
      val.type === "signup"
        ? "Flip Classroom Verification Code"
        : "Flip Classroom Password Reset Link",
    html: val.type === "signup" ? genHtmlText(val) : genHtmlText2(val),
  };

  await sgMail
    .send(message)
    .then((res) => console.log("Email sent"))
    .catch((e) => console.log(e));
};

// const sendEmailViaSib = (val) => {
//   const client = Sib.ApiClient.instance;
//   const apiKey = client.authentications["api-key"];
//   apiKey.apiKey = process.env.NEXT_PUBLIC_SIB_API_KEY;

//   const tranEmailApi = new Sib.TransactionalEmailsApi();

//   const sender = {
//     email: `${process.env.NEXT_PUBLIC_APP_EMAIL}`,
//     name: "Flip Classroom",
//   };

//   const receivers = [
//     {
//       email: val.to_email,
//     },
//   ];

//   tranEmailApi
//     .sendTransacEmail({
//       sender,
//       to: receivers,
//       subject:
//         val.type === "signup"
//           ? "Flip Classroom Verification Code"
//           : "Flip Classroom Password Reset Link",
//       htmlContent: val.type === "signup" ? genHtmlText(val) : genHtmlText2(val),
//     })
//     .then(console.log)
//     .catch(console.log);
// };

// const sendEmail3 = async (val) => {
//   console.log("send email 3 starts");
//   const transporter = nodemailer.createTransport({
//     port: 465,
//     host: "smtp.gmail.com",
//     auth: {
//       user: `${process.env.NEXT_PUBLIC_APP_EMAIL}`,
//       pass: `${process.env.NEXT_PUBLIC_APP_PASSWORD}`,
//     },
//     secure: true,
//   });

//   await new Promise((resolve, reject) => {
//     // verify connection configuration
//     transporter.verify(function (error, success) {
//       if (error) {
//         console.log(error);
//         reject(error);
//       } else {
//         console.log("Server is ready to take our messages");
//         resolve(success);
//       }
//     });
//   });

//   const mailData = {
//     from: `"Flip Classroom" <${process.env.NEXT_PUBLIC_APP_EMAIL}>`, // sender address
//     to: `${val.to_email}`, // list of receivers
//     subject: "Flip Classroom Email Verification", // Subject line
//     // text: "Hello world?", // plain text body
//     html: val.type === "signup" ? genHtmlText(val) : genHtmlText2(val), // html body
//   };

//   await new Promise((resolve, reject) => {
//     // send mail
//     transporter.sendMail(mailData, (err, info) => {
//       if (err) {
//         console.error(err);
//         reject(err);
//       } else {
//         console.log(info);
//         resolve(info);
//       }
//     });
//   });

//   console.log("send email 3 stops");
// };

// const sendEmail1 = async (val) => {
//   const oauth2Client = await new Promise((res, rej) => {
//     try {
//       res(
//         new OAuth2(
//           `${process.env.NEXT_PUBLIC_CLIENT_ID}`.trim(), // ClientID
//           `${process.env.NEXT_PUBLIC_CLIENT_SECRET}`.trim(), // Client Secret
//           "https://developers.google.com/oauthplayground" // Redirect URL
//         )
//       );
//     } catch (e) {
//       rej(e);
//     }
//   });
//   console.log("oauth2", oauth2Client);
//   oauth2Client.setCredentials({
//     refresh_token: `${process.env.NEXT_PUBLIC_REFRESH_TOKEN}`.trim(),
//   });
//   console.log("Set credentials");

//   try {
//     console.log("above await");
//     const accessToken = await oauth2Client.getAccessToken();
//     console.log("access toke", accessToken);

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       port: 465,
//       secure: true,
//       auth: {
//         type: "OAuth2",
//         user: `${process.env.NEXT_PUBLIC_APP_EMAIL}`.trim(),
//         clientId: `${process.env.NEXT_PUBLIC_CLIENT_ID}`.trim(),
//         clientSecret: `${process.env.NEXT_PUBLIC_CLIENT_SECRET}`.trim(),
//         refreshToken: `${process.env.NEXT_PUBLIC_REFRESH_TOKEN}`.trim(),
//         accessToken: accessToken,
//       },
//       tls: {
//         rejectUnauthorized: false,
//       },
//     });

//     // send mail with defined transport object
//     let info = transporter.sendMail({
//       from: `"Flip Classroom" <${process.env.NEXT_PUBLIC_APP_EMAIL}>`, // sender address
//       to: `${val.to_email}`, // list of receivers
//       subject: "Flip Classroom Email Verification", // Subject line
//       // text: "Hello world?", // plain text body
//       html: val.type === "signup" ? genHtmlText(val) : genHtmlText2(val), // html body
//     });

//     console.log(info);
//     return info;
//   } catch (e) {
//     console.log(e);
//     return e;
//   }
// };

const genHtmlText = (val) => {
  return `
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,600;1,700;1,800;1,900&family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&family=Roboto:wght@300&display=swap"
        rel="stylesheet"
      />
      <title>Flip Classroom Email Verification</title>
    </head>
    <body style="font-family: 'Fira Sans', sans-serif">
      <div
        style="
          height: max-content;
          width: 100%;
          background-color: rgb(27, 27, 27);
          text-align: center;
          color: white;
          padding: 2rem 0;
        "
      >
        <h2 style="">Email Verification</h2>
        <h3 style="width: 90%; margin: auto; font-size: small">
          This is an email verification code from flip classroom, if you didn't
          signup for this please ignore
        </h3>
        <p style="font-size: 50px">Code: ${val.message}</p>
      </div>
    </body>
  </html>
    `;
};

const genHtmlText2 = (val) => {
  return `
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,600;1,700;1,800;1,900&family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&family=Roboto:wght@300&display=swap"
        rel="stylesheet"
      />
      <title>Flip Classroom Password Reset</title>
    </head>
    <body style="font-family: 'Fira Sans', sans-serif">
      <div
        style="
          height: max-content;
          width: 100%;
          background-color: rgb(27, 27, 27);
          text-align: center;
          color: white;
          padding: 2rem 0;
        "
      >
        <h2 style="">Password Reset</h2>
        <h3 style="width: 90%; margin: auto; font-size: small">
          This is a password reset link from flip classroom, if you didn't
          signup for this please ignore
        </h3>
        <a href="${val.message}"><div style="font-size: 30px; display: flex; align-items: center; justify-content: center; width: 50%; margin: 1rem auto; text-align: center; height: 2.5rem; background-color: #f21d1d; color: white;">Reset</div></a>
      </div>
    </body>
  </html>
    `;
};
