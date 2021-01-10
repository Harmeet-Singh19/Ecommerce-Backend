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
    logo:'https://i.ibb.co/C5hs0qb/logo.png',
    logoHeight: '60px',
    copyright: 'Copyright © 2020 DUBooksEX. All rights reserved.',
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

const forgotPassword=(email,pass)=>{
  console.log("mail")
 
    // sign up the user .....

    // then send the email
    let response = {
      body: {
        name:"User",
        intro: `This is your new password: ${pass}.`,
        outro: 'If you think this email was sent by mistake, please ignore it!'
      },
    };
  
    let mail = MailGenerator.generate(response);
  
    let message = {
      from: EMAIL,
      to: email,
      subject: "Forgot  Password!",
      html: mail,
    };
  
    transporter
      .sendMail(message)
      .catch((error) => console.error(error));
}

const getBill = (res) => {
  const { name, email } = res.userId;

  console.log(res)
  let response = {
    body: {
      name,
      intro: "Your order was placed successfully!",
      
     
    action: {
      instructions: 'Check the status of your order in your account.',
      button: {
          // Optional action button color
          text: 'Go to Order History',
          link: 'https://du-book-ex.herokuapp.com/profile'
      }
  },
      outro: "We thank you for your purchase.",
      table: {
        data: [
            {
                OrderId: `#${res.orderId}`,
                Total: `₹ ${res.finalAmount}`,
                Address:`${res.address.address},${res.address.city},${res.address.state},${res.address.phone}`
            },
           
        ],
        columns: {
            // Optionally, customize the column widths
            customWidth: {
                orderId: '25%',
                Total: '20%',
                Address:'55%'
            },
            // Optionally, change column text alignment
            customAlignment: {
                Address: 'right'
            }
        }
    },
      signature: false,
    },
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from: EMAIL,
    to: email,
    subject: "Successful Transaction",
    html: mail,
  };


  transporter
    .sendMail(message)
    
    .catch((error) => console.error(error));
};
const vendor = (em) => {
  console.log("mail")

// sign up the user .....

// then send the email
let response = {
  body: {
    name:em.seller.name,
    intro: `Your book ${em.book.name} was sold. Qty: ${em.bookQty} Addr :${em.buyerAddr}`,
    outro: 'Looking forward to do more business with you.'
  },
};

let mail = MailGenerator.generate(response);

let message = {
  from: EMAIL,
  to: em.seller.email,
  subject: "Order Placed!",
  html: mail,
};

transporter
  .sendMail(message)
  .catch((error) => console.error(error));
};
module.exports = {
  signup,
  getBill,
  forgotPassword,
  vendor
};