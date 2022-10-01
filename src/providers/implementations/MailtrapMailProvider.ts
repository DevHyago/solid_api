import { IMailProvider, IMessage } from "../IMailProvider";
import nodemailer from 'nodemailer';
import Mail from "nodemailer/lib/mailer";

export class MailtrapMailProvider implements IMailProvider{
   private transporter: Mail;

   constructor(){
      this.transporter = nodemailer.createTransport({
         host: 'smtp.mailtrap.io',
         port: 2525,
         auth: {
            user: 'a6d237f7ef4bf4',
            pass: '4b4f925f6ff4c9'
         }
      });
   }

   async sendMail(message: IMessage): Promise<void> {
      await this.transporter.sendMail({
         to: {
            name: message.to.name,
            address: message.to.email
         },
         from: {
            name: message.from.name,
            address: message.from.email
         },
         subject: message.subject,
         html: message.body
      });
   }
   
}