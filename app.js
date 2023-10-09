const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve your HTML form
app.use(express.static('public'));

// Handle form submission
app.post('/submit', (req, res) => {
  const { fullName, email, mobileNumber, emailSubject, message } = req.body;

  // Create a Nodemailer transporter using your email service's SMTP settings
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // You can change this to your email service provider
    auth: {
      user: 'admou3@gmail.com', // Your email address
      pass: 'fmsu rhcl fsgu ghnm', // Your email password or an application-specific password
    },
  });

  // Email message
  const emailMessage = {
    from: email,
    to: 'admou3@gmail.com', // Recipient's email address
    subject: emailSubject,
    text: `
      Full Name: ${fullName}
      Email: ${email}
      Mobile Number: ${mobileNumber}
      Message: ${message}
    `,
  };

  // Send the email
  transporter.sendMail(emailMessage, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Email could not be sent.');
    } else {
      console.log('Email sent successfully:', info.response);
      res.status(200).send('Email sent successfully!');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
