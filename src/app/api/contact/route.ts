import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

interface SMTPError {
  message: string
  code?: string
  command?: string
  response?: string
}

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json()

    // Validate input
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Log environment variables (without exposing sensitive data)
    console.log('Email configuration:', {
      user: process.env.EMAIL_USER ? 'Set' : 'Not Set',
      pass: process.env.EMAIL_PASS ? 'Set' : 'Not Set'
    })

    // Create transporter with specific SMTP settings
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      debug: true, // Enable debug logging
      logger: true // Enable logger
    })

    // Verify transporter configuration
    try {
      console.log('Verifying SMTP configuration...')
      await transporter.verify()
      console.log('SMTP configuration verified successfully')
    } catch (verifyError) {
      const error = verifyError as SMTPError
      console.error('SMTP configuration error:', {
        message: error.message,
        code: error.code,
        command: error.command
      })
      return NextResponse.json(
        { error: 'Email service configuration error' },
        { status: 500 }
      )
    }

    // Send email
    try {
      console.log('Attempting to send email...')
      const info = await transporter.sendMail({
        from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
        to: 'alghanifaras@gmail.com',
        replyTo: email,
        subject: `New Contact Form Submission: ${subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      })
      console.log('Email sent successfully:', info.messageId)
      return NextResponse.json(
        { message: 'Email sent successfully' },
        { status: 200 }
      )
    } catch (sendError) {
      const error = sendError as SMTPError
      console.error('Error sending email:', {
        message: error.message,
        code: error.code,
        command: error.command,
        response: error.response
      })
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      )
    }
  } catch (error) {
    const err = error as Error
    console.error('Unexpected error:', {
      message: err.message,
      stack: err.stack
    })
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
} 