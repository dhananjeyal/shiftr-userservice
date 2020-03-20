import { SignUpStatus, UserRole, UserStatus } from "../constants";

const nodemailer = require("nodemailer");

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

export const sendMail = async (to, subject, template, options) => {
    if (process.env.SMTP_ENABLED) {
        return transport.sendMail({
            to: to,
            subject: subject,
            headers: {
                'X-MC-Template': template,
                'X-MC-MergeVars':JSON.stringify(options)
            }
        });
        /*if (context) {
          options.viewEngine.defaultLayout = 'template';
          transport.use('compile', mailerhbs(options));
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
        }*/
    }
};

export const signUp = (firstName, email, link) => {
    let context = { firstName, link };
    return sendMail(email, "Verification Email", "signup", context);
};

export const emailVerified = (user) => {
    let context = { role: user.typeId, firstName: user.firstName };
    return sendMail(user.emailId, "Email verified", "emailVerified", context);
};

export const accountCreated = (user, link) => {
    let context = { role: user.typeId,link, firstName:user.firstName, emailId: user.emailId, password: user.password };
    return sendMail(user.emailId, "Account created", "accountCreated", context)
};

export const activateDeactivate = (user) => {
    let context = { status: user.status, firstName:user.firstName };
    let subject = "Account activated";
    if(user.status === UserStatus.INACTIVE){
        subject = "Account suspended";
    }
    return sendMail(user.emailId, subject, "activateDeactivate", context)
};

export const forgetPassword = (user, link) => {
  const context = { firstName:user.firstName, link };
  return sendMail(user.emailId, "Forgot password", "forgetPassword", context);
};

export const resetPassword = (user) => {
    let context = { firstName:user.firstName };
    return sendMail(user.emailId, "Password reset",  "resetPassword", context);
};

export const signUpStatus = (user, signUpStatus) => {
    let subject = null;
    if (signUpStatus === SignUpStatus.VERIFIED) {
        subject = "Profile approved";
    } else if (signUpStatus === SignUpStatus.REJECTED) {
        subject = "Profile rejected";
    }
    let context = { firstName:user.firstName, signUpStatus, link:'', adminEmail:'' }
    if (!!subject) {
        return sendMail(user.emailId, subject, 'signUpStatus', context);
    }

};