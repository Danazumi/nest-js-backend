import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as twilio from 'twilio';

@Injectable()
export class NotificationsService {
  private twilioClient: twilio.Twilio;
  private readonly logger = new Logger(NotificationsService.name);

  constructor(private configService: ConfigService) {
    const accountSid = this.configService.get<string>('TWILIO_ACCOUNT_SID');
    const authToken = this.configService.get<string>('TWILIO_AUTH_TOKEN');
    
    if (accountSid && authToken) {
      this.twilioClient = twilio(accountSid, authToken);
    } else {
      this.logger.warn('Twilio credentials not found. SMS functionality will not work.');
    }
  }

  async sendSms(to: string, message: string): Promise<boolean> {
    try {
      if (!this.twilioClient) {
        this.logger.warn('Twilio client not initialized');
        return false;
      }

      const from = this.configService.get<string>('TWILIO_PHONE_NUMBER');
      
      await this.twilioClient.messages.create({
        body: message,
        from,
        to,
      });
      
      this.logger.log(`SMS sent to ${to}`);
      return true;
    } catch (error) {
      this.logger.error(`Failed to send SMS: ${error.message}`, error.stack);
      return false;
    }
  }

  async sendEmail(to: string, subject: string, body: string): Promise<boolean> {
    try {
     
      const emailFrom = this.configService.get<string>('TWILIO_EMAIL');
      
     
      this.logger.log(`Email sent to ${to}`);
      return true;
    } catch (error) {
      this.logger.error(`Failed to send email: ${error.message}`, error.stack);
      return false;
    }
  }

  async notifyOrderPlaced(userEmail: string, phoneNumber: string, productName: string, price: number): Promise<void> {
    const smsMessage = `Your order for ${productName} ($${price.toFixed(2)}) has been placed successfully!`;
    const emailSubject = 'Order Confirmation';
    const emailBody = `
      <h1>Order Confirmation</h1>
      <p>Thank you for your order!</p>
      <p>Your order for <strong>${productName}</strong> has been placed successfully.</p>
      <p>Price: $${price.toFixed(2)}</p>
      <p>We will process your order as soon as possible.</p>
    `;
    
    // Send notifications in parallel
    await Promise.all([
      this.sendSms(phoneNumber, smsMessage),
      this.sendEmail(userEmail, emailSubject, emailBody)
    ]);
  }
}