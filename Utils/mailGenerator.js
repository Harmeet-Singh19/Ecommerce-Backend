const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const {google}=require("googleapis")
const OAuth2 = google.auth.OAuth2;

const EMAIL=process.env.MAIL_EMAIL;
const PASSWORD=process.env.MAIL_PASSWORD;
const MAIN_URL=process.env.MAIN_URL;

const oauth2Client = new OAuth2(
  "330850319181-pj47ceriu0f7s87vto6349fi5j23h8b5.apps.googleusercontent.com", // ClientID
  "fITOpfiVKlJCq1YIZUxt9WU0", // Client Secret
  "https://developers.google.com/oauthplayground" // Redirect URL
);
oauth2Client.setCredentials({
  refresh_token: "1//04MFsE2EmNSA9CgYIARAAGAQSNwF-L9Irz2MWbspWyWuIHj7Jq4NkX4U9vqDjGMCKLyt03KaffzVCYprUlZ3Rsz7ITiQBOFMX4y0"
});
const accessToken = oauth2Client.getAccessToken()
let transporter = nodemailer.createTransport({
  service: "Gmail",
  
  auth: {
    type:"OAuth2",
    user:EMAIL,
    clientId:"330850319181-pj47ceriu0f7s87vto6349fi5j23h8b5.apps.googleusercontent.com",
    clientSecret:"fITOpfiVKlJCq1YIZUxt9WU0",
    refreshToken:"1//04MFsE2EmNSA9CgYIARAAGAQSNwF-L9Irz2MWbspWyWuIHj7Jq4NkX4U9vqDjGMCKLyt03KaffzVCYprUlZ3Rsz7ITiQBOFMX4y0",
    accessToken:accessToken

  },
});

let MailGenerator = new Mailgen({
  theme: "neopolitan",
  product: {
    name: "DUBookX",
    link: MAIN_URL,
    logo:'https://i.ibb.co/C5hs0qb/logo.png',
    logoHeight: '60px',
    copyright: 'Copyright © 2021 DUBookX. All rights reserved.',
  },
});

const signup = (req) => {
    
const {email,name}=req.body
  
  let response = {
    body: {
      name,
      intro: "Welcome to DUbookX! We're very excited to have you on board.",
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
const vendorsignup = (req) => {
  
const {email,name}=req.body

let response = {
  body: {
    name,
    intro: `Welcome to DUbookX! We're very excited to have you on board.
    There is a link provided below which will take you to site where you shall login into your VENDOR account and upload all the books you want.`,
    outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.',
    action: {
      instructions: 'Please open the site from laptop/PC only.',
      button: {
         
          text: 'Your Vendor Account',
          link: 'https://du-book-admin-panel.herokuapp.com/'
      }
  }
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
 
    let response = {
      body: {
        name:"User",
        intro: `This is your new password: ${pass}.`,
        outro: 'This Password can not be changed. If you think this email was sent by mistake, please ignore it!'
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

  let arr=[];
  res.books.map((b)=>{
    let obj={
      Name:b.name,
      Qty:b.quantity,
      Price:b.billedPrice
    }
   arr.push(obj)
  })
  console.log(arr)
  let response = {
    body: {
      name,
      intro: "Your order was placed successfully!",
      
     
    action: {
      instructions: 'Check the status of your order in your account.',
      button: {
          
          text: 'Go to Order History',
          link: 'https://www.dubookx.com/profile'
      }
  },
      outro: "We thank you for your purchase.",
      table: [
        
      {
        title1:'Book Details',
        data:arr,
        columns: {
            // Optionally, customize the column widths
            customWidth: {
                Name: '25%',
                Qty: '20%',
                Price:'55%'
            },
            // Optionally, change column text alignment
            customAlignment: {
              Price: 'right'
            }
        }
    },
    {
      title2:'Order Details',
      data: [
          {
            OrderId:res.orderId,
            FinalAmt:res.finalAmount,
            DeliveryAddress:res.address.address+","+res.address.city+","+res.address.state+"-"+res.address.pincode
          }
         
      ],
      columns: {
          // Optionally, customize the column widths
          customWidth: {
            OrderId: '25%',
              FinalAmt: '20%',
              DeliveryAddress:'55%'
          },
          // Optionally, change column text alignment
          customAlignment: {
            DeliveryAddress: 'right'
          }
      }
  }
  ],
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
  
// then send the email
let response = {
  body: {
    name:em.seller.name,
    intro: `Your book ${em.book.name} was sold. Qty: ${em.bookQty} Addr :${em.buyerAddr}
    The book shall be picked up from your given location within 48 hours. During this time period please pack the book in a small box/bubble wrap/plastic package which should be sealed properly.
    You will be also required to print out and stick a shipping label which will be mailed to you by DUbookX.
    If there is any issue regarding the same please reply to this email or Contact us on our social media Handles.`,
    outro: `Looking forward to do more business with you.
    https://linktr.ee/DUbookX`
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

const orderCancel = (res) => {
  const { name, email } = res.userId;
 
 
  let response = {
    body: {
      name,
      intro: `We are extremely sorry that \n OrderId:#${res.orderId} has been cancelled due to unavaibility of the requested book/s.
      We hope to serve you again. `,
      outro:`Please contact us if you have any query regarding this by replying to this email or contacting us on our social media handles.
      https://linktr.ee/DUbookX `
    }
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from: EMAIL,
    to: email,
    subject: "Order Cancelled.",
    html: mail,
  };


  transporter
    .sendMail(message)
    .catch((error) => console.error(error));
};

const orderPlaced = (res) => {
  const { name, email } = res.userId;
 let s="";
 let i=1;
 res.books.map((b)=>{
   s+=`${b.name} x ${b.quantity} , \n`;
 })
 
  let response = {
    body: {
      name,
      intro: `Your order for the following has been recieved- \n 
      ${s} \n You shall receive a confirmation email within 24 hours. `,
      outro:`Please contact DUbookX regarding any issue with the order via the website/instagram. `
    }
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from: EMAIL,
    to: email,
    subject: "Order Confirmation.",
    html: mail,
  };


  transporter
    .sendMail(message)
    .catch((error) => console.error(error));
};

const orderDelivered = (res) => {
  const { name, email } = res.userId;

  let response = {
    body: {
      name,
      intro: `We hope you have recieved the order, Thank you for doing Business with us. `,
      outro:`Regarding any queries please contact DUbookX via the website/instagram. `
    }
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from: EMAIL,
    to: email,
    subject: "Order Delivered.",
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
  vendor,
  vendorsignup,
  orderCancel,
  orderPlaced,
  orderDelivered
}; 






// We hope you have recieved the order, Thank you for doing Business with us.

// Regarding any queries please contact DUbookX via the website/instagram.