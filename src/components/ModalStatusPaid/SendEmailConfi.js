import { Resend } from "resend"
const resend = new Resend('re_MtUsWTYy_LhU1KK7DavrXfZVeQnC2R4q5');
import EmailConfirmation from "../EmailConfirmation/EmailConfirmation";


export const SendEmailConfirmation = async () => {
    try {
        const data = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: ['urenajosealbeto@gmail.com'],
            subject: 'Hello World',
            html: '<strong>It works!</strong>'
        });

        console.log(data);
    } catch (error) {
        console.error(error);
    }
};
