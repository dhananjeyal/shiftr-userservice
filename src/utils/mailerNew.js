import { SignUpStatus, UserRole, UserStatus } from "../constants";

const nodemailer = require("nodemailer");
const mailerhbs = require("nodemailer-express-handlebars");
const path = require('path')

const transport = nodemailer.createTransport({
    service: process.env.SMTP_SERVICE,
    host: process.env.SMTP_HOST,
    secureConnection: false,
    logger: true,
    debug: true,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD
    }
}, {
    from: `${process.env.SMTP_FROM}`
});

let options = {
    viewEngine: {
        extname: '.hbs',
        layoutsDir: './public/templates/emails',
        partialsDir: './public/templates/emails', // location of your subtemplates aka. header, footer etc
        // defaultLayout: 'verificationEmail'
    },
    viewPath: 'public/templates/emails',
    extName: '.hbs'
};



// transport.use('compile', mailerhbs({
//     // viewEngine: {
//     //     extname: '.hbs', // handlebars extension
//     //     layoutsDir: 'public/templates/emails', // location of handlebars templates
//     //     // defaultLayout: 'template', // name of main template
//     //     partialsDir: 'public/templates/emails', // location of your subtemplates aka. header, footer etc
//     // },
//     viewPath: path.resolve('./public/templates/emails'), //Path to email template folder
//     extName: '.hbs' //extendtion of email template
// }));


export const sendMail = async (to, subject, html, context) => {
    if (process.env.SMTP_ENABLED) {
        if (context) {
            return transport.sendMail({
                to: to,
                template: html,
                subject: subject,
                context: context
            });
        } else {
            return transport.sendMail({
                to: to,
                subject: subject,
                html: html
            });
        }
    }
};

export const signUp = (firstName, email, link) => {
    // let html = `<b>Hello ${firstName}</b>
    //             <p>Thank you for signing up on our platform please click on the below link to verify your account</p>
    //             <a href="${link}">Verify your account</a>
    //             <p>Best regards</p>`;
    let context = {
        firstName: firstName,
        link: link
    }
    options.viewEngine.defaultLayout = 'verificationEmail'
    transport.use('compile', mailerhbs(options));
    return sendMail(email, "Verification Email", "verificationEmail", context)
};

export const emailVerified = (user) => {
    let html = `<b>Hello ${user.firstName}</b>
                    <p>You're email is successfully verified. You can now login to continue..</p>
                    <p>Best regards</p>`;

    if (user.typeId === UserRole.DRIVER_R) {
        html = `<b>Hello ${user.firstName}</b>
                    <p>The email verification process is done now you are just a few steps away to use the platform please log in and complete the entire sign up process.</p>
                    <p>Best regards</p>`;
    }
    return sendMail(user.emailId, "Email verified", html)
};

export const accountCreated = (user, link) => {
    let html = `<b>Hello ${user.firstName}</b>
                    <p>Pick Ups admin has created an account for you, please download the app "{app-link}" and log in with temporary credentials:</p>
                    <p>Username / email address: ${user.emailId}</p>
                    <p>Temporary password: ${user.password}</p>
                    <hr>
                    <p>OR</p>
                    <p>Set a new password using below shown link:</p>
                    <a href="${link}">Set new password</a>
                    <p>Best regards</p>`;

    if (user.typeId === UserRole.ADMIN_R) {
        html = `<b>Hello ${user.firstName}</b>
                    <p>Pick Ups admin has created an account for you, you can log in the admin dashboard using following credential:</p>
                    <p>Username / email address: ${user.emailId}</p>
                    <p>Temporary password: ${user.password}</p>
                    <hr>
                    <p><b>OR</b></p>
                    <p>Set a new password using below shown link:</p>
                    <a href="${link}">Set new password</a>
                    <p>Best regards</p>`;
    } else if (user.typeId === UserRole.SUPER_ADMIN_R) {
        html = `<b>Hello ${user.firstName}</b>
                    <p>Pick Ups Super admin has created an account for you, you can log in the Super admin dashboard using following credential:</p>
                    <p>Username / email address: ${user.emailId}</p>
                    <p>Temporary password: ${user.password}</p>
                    <hr>
                    <p><b>OR</b></p>
                    <p>Set a new password using below shown link:</p>
                    <a href="${link}">Set new password</a>
                    <p>Best regards</p>`;
    }

    return sendMail(user.emailId, "Account created", html)
};

export const activateDeactivate = (user) => {
    let html = `<b>Hello ${user.firstName}</b>
                    <p>Your account has been activated please you can now log in to the account.</p>
                    <p>Best regards</p>`;
    let subject = "Account activated";

    if (user.status === UserStatus.INACTIVE) {
        html = `<b>Hello ${user.firstName}</b>
                    <p>Your account has been suspended please contact the admin for further clarification.</p>
                    <p>Best regards</p>`;
        subject = "Account suspended";
    }

    return sendMail(user.emailId, subject, html)
};

export const forgetPassword = (user, link) => {
    let html = `<b>Hi ${user.firstName},</b>
                    <p>You can reset your password by using the below link within 24 hours.</p>
                    <a href="${link}">Reset Password</a>
                    <p>Please ignore this email, if you haven't made this request. You can continue to use your current password.</p>
                    <p>Best regards</p>`;
    return sendMail(user.emailId, "Forget password", html)
};

export const resetPassword = (user) => {
    let html = `<b>Hello ${user.firstName},</b>
                    <p>You have successfully reset your password you can now log in to the app with your new credential.</p>
                    <p>Best regards</p>`;
    return sendMail(user.emailId, "Password reset", html)
};

export const signUpStatus = (user, signUpStatus) => {
    let html = null;
    let subject = null;

    if (signUpStatus === SignUpStatus.VERIFIED) {
        html = `<b>Hello ${user.firstName},</b>
                    <p>Your profile has been approved by the admin and you can now begin to use the service</p>
                    <p>by logging into your profile</p>
                    <p>{Link to download}</p>
                    <p>Best regards</p>`;
        subject = "Profile approved";
    } else if (signUpStatus === SignUpStatus.REJECTED) {
        html = `<b>Hello ${user.firstName},</b>
                    <p>Your profile has been rejected you can contact the platform admin for further queries</p>
                    <p>{Admin contact}</p>
                    <p>Best regards</p>`;
        subject = "Profile rejected";
    }

    if (html && subject) {
        return sendMail(user.emailId, subject, html)
    }

};
