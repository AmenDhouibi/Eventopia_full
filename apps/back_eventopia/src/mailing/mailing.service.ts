import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { join } from 'path';
import * as fs from 'fs';

@Injectable()
export class MailingService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: 'apikey',
        pass: process.env.SENDGRID_API_KEY,
      },
    });
  }

  async sendMail(to: string, subject: string, text: string, html: string) {
    const mailOptions = {
      from: `"Eventopia" <${process.env.SMTP_FROM}>`,
      to,
      subject,
      text,
      html,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

async sendWelcomeEmail(to: string) {
    const subject = 'Welcome to Our App!';
    const text = 'Welcome to our app! We hope you enjoy your stay.';
    const htmlPath = 'src/mailing/Templates/Welcome.html';

    try {
      console.log('Current directory:', process.cwd());
      const html = fs.readFileSync(htmlPath, 'utf-8');
      await this.sendMail(to, subject, text, html);
    } catch (error) {
      console.error('Error reading HTML file or sending email:', error);
    }
}

async sendInvitationEmail(to: string | string[], eventName: string, inviteLink: string, emailContent: string) {
  
  console.log('Recipient(s) received:', to);
  // Use the provided email content instead of the default text
  const subject = `You're invited to ${eventName}!`;
  const text = emailContent;
  const html = `<p>${emailContent}</p>`;

  // Send the email using the provided content
  try {
      // Ensure `to` is a valid array of email addresses
      let recipients: string[];

      if (typeof to === 'string') {
          recipients = [to];
      } else if (Array.isArray(to) && to.length > 0) {
          recipients = to;
      } else {
          throw new Error('No valid recipients defined');
      }

      for (const email of recipients) {
          await this.sendMail(email, subject, text, html);
      }
  } catch (error) {
      Logger.error('Error sending invitation:', error);
      throw error;
  }
}

}


