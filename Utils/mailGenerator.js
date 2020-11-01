const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

const EMAIL=process.env.MAIL_EMAIL;
const PASSWORD=process.env.MAIL_PASSWORD;
const MAIN_URL=process.env.MAIN_URL;


let transporter = nodemailer.createTransport({
  service: "Gmail",
  secure: true,
  auth: {
    user: EMAIL,
    pass: PASSWORD,
  },
});

let MailGenerator = new Mailgen({
  theme: "neopolitan",
  product: {
    name: "DUBooksEx",
    link: MAIN_URL,
    logo:'https://i.ibb.co/GWBKTFW/DU.png'
  },
});

const signup = (req) => {
    console.log("mail")
const {email,name}=req.body
  // sign up the user .....

  // then send the email
  let response = {
    body: {
      name,
      intro: "Welcome to DuBooksEx! We're very excited to have you on board.",
      outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
    },
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from: EMAIL,
    to: email,
    subject: "Successful Registration!",
    html: mail,
  };

  transporter
    .sendMail(message)
    .catch((error) => console.error(error));
};

const getBill = (req, res) => {
  const { name, userEmail } = req.body;

  let response = {
    body: {
      name,
      intro: "Your bill has arrived!",
      table: {
        data: [
          {
            item: "MERN stack book",
            description: "A mern stack book",
            price: "$10.99",
          },
        ],
      },
      outro: "Looking forward to do more business with you",
    },
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from: EMAIL,
    to: userEmail,
    subject: "transaction",
    html: mail,
  };

  transporter
    .sendMail(message)
    
    .catch((error) => console.error(error));
};

module.exports = {
  signup,
  getBill,
};