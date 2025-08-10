import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import crypto from 'crypto'

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    })

    // Always return success even if user doesn't exist (security best practice)
    if (!user) {
      return NextResponse.json({
        message: 'If an account exists with that email, a password reset link has been sent.',
      })
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex')
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    // Save token to database with 1 hour expiry
    await prisma.passwordResetToken.create({
      data: {
        token: hashedToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 3600000), // 1 hour
      },
    })

    // In production, send email with reset link
    // For development, we'll log the reset URL
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`

    if (process.env.NODE_ENV === 'development') {
      // In development, log the reset URL
      // eslint-disable-next-line no-console
      console.log('Password reset URL:', resetUrl)
    } else {
      // TODO: Send email using Resend or other email service
      // await sendPasswordResetEmail(email, resetUrl)
    }

    return NextResponse.json({
      message: 'If an account exists with that email, a password reset link has been sent.',
    })
  } catch (error) {
    console.error('Password reset error:', error)
    return NextResponse.json({ error: 'Failed to process password reset request' }, { status: 500 })
  }
}
