import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

const myEmail = process.env.EMAIL;
const myPassword = process.env.EMAIL_PASSWORD;

export const sendEmail = async ({ email, emailType, userId, newPassword }: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId, { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 });
        } else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000,
            });
        }

        if (!userId) {
            console.log('User ID is undefined');
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: myEmail,
                pass: myPassword,
            },
        });

        const mailOptions = {
            from: 'dinhkhoi2110@gmail.com',
            to: email,
            subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
            html: `            
            ${emailType === 'RESET' ? `<p>Your new Password is ${newPassword}</p>` : `
            <p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${
                emailType === 'VERIFY' ? 'verify your email' : 'reset your password'
            }
            or copy and paste the link below in your browser. <br> ${
                process.env.DOMAIN
            }/verifyemail?token=${hashedToken}
            </p>`}
            `,
        };

        const mailresponse = await transporter.sendMail(mailOptions);
        return mailresponse;
    } catch (error: any) {
        throw new Error(error);
    }
};
