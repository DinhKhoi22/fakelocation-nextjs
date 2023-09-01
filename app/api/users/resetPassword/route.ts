import { connect } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

import User from '@/models/userModel';
import { sendEmail } from '@/helpers/mailer';

connect();

// In your POST function
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email } = reqBody;

        console.log(reqBody);

        // Validate the email using a regex pattern
        const validEmailPattern = /^\S+@\S+\.\S+$/;
        if (!validEmailPattern.test(email)) {
            return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        console.log(user);

        if (!user) {
            return NextResponse.json({ error: 'User does not exist' }, { status: 400 });
        }

        // Generate a new random password
        const newRandomPassword = await generateRandomPassword();

        // Hash the new password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(newRandomPassword, salt);

        // Update user's password in the database
        user.password = hashedPassword;
        await user.save();

        // Send email with new password
        await sendEmail({
            email,
            emailType: 'RESET',
            userId: user._id,
            newPassword: newRandomPassword,
        });

        return NextResponse.json({
            message: 'Password reset successful',
            success: true,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

async function generateRandomPassword() {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const length = 8;
    const password = Array(length)
        .fill(null)
        .map(() => chars.charAt(Math.floor(Math.random() * chars.length)));
    return password.join('');
}
