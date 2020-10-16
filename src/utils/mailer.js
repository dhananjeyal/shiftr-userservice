import { UserRole, UserStatus } from "../constants";
const nodemailer = require("nodemailer");
import moment from 'moment';
export const sendMail = async (to, subject, html, fromEmail) => {
    fromEmail = fromEmail ? fromEmail : process.env.SMTP_FROM
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
        from: `${fromEmail}`
    });
    const mailOptions = {
        to: to, // list of receivers
        subject: subject, // Subject line
        html: html // html body
    };
    return transport.sendMail(mailOptions);
};
export const signUp = (firstName, email, link) => {
    let userName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
    let html = `<b>Welcome to Shiftr</b>
                <b>${userName}</b>
                <p>Thank you for signing up to the Shiftr Platform. In order to complete the registration process we need to review and verify your details which includes personal, driving, and banking details.</p>
                <p>While personal details are required for verification purposes,banking details will solely be used for making payments to your account.</p>
                <p><b>Verification is a two step process:</b></p>
                <p>Step 1: Document verification</p>
                <p>Step 2: In person meeting with our panel. NOTE: due to COVID 19 pandemic the meeting may be done on-line.</p>
                <p>Upon acceptance you'll receive an approval email to your registered email address.</p>
                <p>If you have any questions or concerns please feel to write to us</p>
                <a href="${link}">Verify your account</a>
                <p>Regards,</p>
                <p>Shiftr Support</p>`;
    return sendMail(email, "Verification Email", html)
};
export const busownerSignUp = (firstName, email, link) => {
    let userName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
    let html = `<b>Welcome to Shiftr</b>
                <b>${userName}</b>
                <p>Thank you for signing up to Shiftr Platform.</p>
                <p>Please note that in order to use this platform you need to have a vaild WSIB Clearance certificate.</p>
                <p>Click on below link to verify your account and complete the registeration process.</p>
                <a href="${link}">Verify your account</a>
                <p>Regards,</p>
                <p>Shiftr Support</p>`;
    return sendMail(email, "Verification Email", html)
};
export const DriversignUpCompleted = (firstName, email) => {
    let userName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
    let html = `<b>Hello ${userName}</b>
                <p>Thank you for submitting the documents for verification.</p>
                <p><b>Current status :</b>Documents submitted for verification.</p>
                <p>Once your documents are verified you will be notified.</p>
                <p>Thanks</p>
                <p>Regards,</p>
                <p>Shiftr Support</p>`;
    return sendMail(email, "Signup Confirmation Email", html)
};
export const emailVerified = (user) => {
    let userName = user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1);
    let html = `<b>Congratulations !!! ${userName}</b>
                    <p>You're email is successfully verified. You can now login to continue..</p>
                    <p>Regards</p>
                    <p>Shiftr Support</p>`;
    if (user.typeId === UserRole.DRIVER_R) {
        html = `<b>Congratulations !!! ${userName}</b>
                    <p>Your verification was successfully completed.You are welcomed to join our platform as a commercial Driver.</p>
                    <b>Next Step</b>
                    <p>Please login to the Shiftr mobile application to optimise your settings to start recieving trips.</p>
                <p>Link to Shiftr application</p>
                    <p>If you have any questions or concerns please write to us.</p>
                    <p>Regards</p>
                    <p>Shiftr Support</p>`;
    }
    return sendMail(user.emailId, "Email verified", html)
};
export const accountCreated = (user, link) => {
    let html = `<b>Hello ${user.firstName}</b>
                    <p>ShiftR admin has created an account for you, please download the app "{app-link}" and log in with temporary credentials:</p>
                    <p>Username / email address: ${user.emailId}</p>
                    <p>Temporary password: ${user.password}</p>
                    <hr>
                    <p>OR</p>
                    <p>Set a new password using below shown link:</p>
                    <a href="${link}">Set new password</a>
                    <p>Best regards</p>`;
    if (user.typeId === UserRole.ADMIN_R) {
        html = `<b>Hello ${user.firstName}</b>
                    <p>ShiftR admin has created an account for you, you can log in the admin dashboard using following credential:</p>
                    <p>Username / email address: ${user.emailId}</p>
                    <p>Temporary password: ${user.password}</p>
                    <a href="${process.env.ADMINEMAILLINK}">Admin login click here</a>
                    <hr>
                    <p>Best Regards</p>`;
        // `<p>OR</p>
        //<p>Set a new password using below shown link:</p>
        //<a href="${link}">Set new password</a>
        //<p>Best regards</p>`;
    }
    return sendMail(user.emailId, "Account created", html)
};
export const activateDeactivate = (user) => {
    let userName = user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1);
    let html = `<b>Hello ${userName}</b>
                    <p>Your Shiftr account has been reactivated.</p>
                    <p>You can now login to your account.</p>
                    <p>Regards</p>
                    <p>Shiftr Support</p>`;
    let subject = "Account activated";
    if (user.status === UserStatus.INACTIVE) {
        html = `<b>${userName}</b>
                <p>Your Shiftr account has been suspended by Admin.</p>
                <p>If you have any questions or concerns please write to us.</p>
                    <p>Regards</p>
                    <p>Shiftr Support</p>`;
        subject = "Account suspended";
    }
    return sendMail(user.emailId, subject, html)
};

export const forgetPassword = (user, link) => {
    let userName = user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1);
    let html = `<b>Hello ${userName},</b>
    <p>Click on the single-use <a href="${link}">link /password</a> below to access your account. Please remember to change your password</p>
    <p>It should be 8 characters minimum, 1 small - 1 capital - 1 special 1 number” you can log in the admin dashboard using this credential</p>
    <p>Regards</p>
    <p>Shiftr Support</p>`;

    if(user.userType == UserRole.CUSTOMER_R){
        html = `<b>Hello ${userName},</b>
    <p>A request has been recieved to change the password for your Shiftr account.Please use the single-use <a href="${link}">Link/Password</a> to access your account.</p> 
    <p>Please remember to change your password as soon as you login.Your new password should be 8 characters minimum: I small • I capital • I special I number</p>
    <p>Regards</p>
    <p>Shiftr Support</p>`;
    }
    return sendMail(user.emailId, "Forgot password", html)
};

export const resetPassword = (user) => {
    let userName = user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1);
    let html = `<b>Hello ${userName},</b>
                    <p>Please use the below link to reset password.</p>
                    <p>Regards</p>`;
    return sendMail(user.emailId, "Password reset", html)
};
// <p>Trip start yard:- ${tripDetails.startYard}</p>
export const notifyBusOwner = (user, tripDetails) => {
    let html = `<b>Hello ${user.firstName},</b>
                    <p>Your Trip have been ${tripDetails.tripStatus} by ${tripDetails.driverFirstName}.</p>
                    <p><b>Trip Details:-</b></p>
                    <p>Company name:- ${tripDetails.companyName}</p>
                    <p>Trip code:- ${tripDetails.tripCode}</p>
                    <p>Trip type:- ${tripDetails.type}</p>
                    <p>Trip start date:- ${moment(tripDetails.startDate).format('DD/MM/YYYY')}</p>
                    <p>Trip end date:- ${moment(tripDetails.endDate).format('DD/MM/YYYY')}</p>
                    <p>Trip start time:- ${tripDetails.startTime}</p>
                    <p><b>Driver Details:-</b></p>
                    <p>Driver name:- ${tripDetails.driverFirstName} ${tripDetails.driverLastName}</p>
                    <p>Driver contact:- ${tripDetails.driverPhoneNumber}</p>
                    <p>Driver address:- ${tripDetails.driverAddress}</p>
                    <p>Best regards</p>`;
    return sendMail(user.emailId, `Trip-${tripDetails.tripStatus}`, html)
};
export const busOwnerEmail = (user, tripDetails, message) => {
    let html = `<b>Hello ${user.firstName},</b>
                    <p>${message} ${tripDetails.tripCode} .</p>
                    <p><b>Trip Details:-</b></p>
                    <p>Company name:- ${tripDetails.companyName}</p>
                    <p>Trip code:- ${tripDetails.tripCode}</p>
                    <p>Trip type:- ${tripDetails.type}</p>
                    <p>Trip start date:- ${moment(tripDetails.startDate).format('DD/MM/YYYY')}</p>
                    <p>Trip end date:- ${moment(tripDetails.endDate).format('DD/MM/YYYY')}</p>
                    <p>Trip start time:- ${tripDetails.startTime}</p>`;
    return sendMail(user.emailId, `Trip-${tripDetails.tripStatus}`, html)
};
export const superAdminEmail = (tripDetails, message) => {
    let html = `<b>Hello shiftr,</b>
                    <p>${message} ${tripDetails.tripCode} .</p>
                    <p><b>Trip Details:-</b></p>
                    <p>Company name:- ${tripDetails.companyName}</p>
                    <p>Trip code:- ${tripDetails.tripCode}</p>
                    <p>Trip type:- ${tripDetails.type}</p>
                    <p>Trip start date:- ${moment(tripDetails.startDate).format('DD/MM/YYYY')}</p>
                    <p>Trip end date:- ${moment(tripDetails.endDate).format('DD/MM/YYYY')}</p>
                    <p>Trip start time:- ${tripDetails.startTime}</p>`;
    return sendMail(`shiftr@joshiinc.com`, `Trip-${tripDetails.tripStatus}`, html)
};
export const subscriptionNotification = (payload) => {
    let html = `<b>Hello ${payload.username},</b>
                    <p>Welcome to shiftR ! Thank you for the subscription.!</p>                   
                    <p><b>Plan Details:-</b></p>
                    <p>companyName:- ${payload.companyName}</p>
                    <p>Plan Type:- ${payload.planType}</p>
                    <p>Plan Category(Monthly/Yearly):- ${payload.planDurationType}</p>
                    <p>Plan startdate:- ${payload.startdate}</p>
                    <p>plan enddate:- ${payload.expirydate}</p>
                    <p>TotalTrips:- ${payload.totalTrips}</p>
                    <p>Amount (CAD) $:- ${payload.amount}</p>`;
    return sendMail(payload.useremail, "ShiftR-Subscription", html)
};
export const subscriptionReminder = (payload) => {
    let html = `<b>Hello ${payload.username},</b>
                    <p>Your subscription will be expired.!</p>                   
                    <p><b>Plan Details:-</b></p>
                    <p>companyName:- ${payload.companyName}</p>
                    <p>Plan startdate:- ${moment(payload.startdate).format('DD/MM/YYYY')}</p>
                    <p>plan enddate:- ${moment(payload.expirydate).format('DD/MM/YYYY')}</p>
                    <p>TotalTrips:- ${payload.totalTrips}</p>`;
    return sendMail(payload.useremail, "ShiftR-Reminder-Subscription", html)
};
export const subscriptionExpired = (payload) => {
    let html = `<b>Hello ${payload.username},</b>
                    <p>Welcome to shiftR ! your subscription expired.!</p>                   
                    <p><b>Plan Details:-</b></p>
                    <p>companyName:- ${payload.companyName}</p>
                    <p>Plan startdate:- ${payload.startdate}</p>
                    <p>plan enddate:- ${payload.expirydate}</p>
                    <p>TotalTrips:- ${payload.totalTrips}</p>`;
    return sendMail(payload.useremail, "ShiftR-Reminder-Subscription", html)
};
export const subscriptionActivated = (payload) => {
    let html = `<b>Hello ${payload.username},</b>
                    <p>Welcome to shiftR ! your subscription Pre-subscription Activated.!</p>                   
                    <p><b>Plan Details:-</b></p>
                    <p>companyName:- ${payload.companyName}</p>
                    <p>Plan startdate:- ${payload.startdate}</p>
                    <p>plan enddate:- ${payload.expirydate}</p>
                    <p>TotalTrips:- ${payload.totalTrips}</p>`;
    return sendMail(payload.useremail, "ShiftR-Reminder-Subscription", html)
};
export const subscriptionDeactiveNotification = (payload) => {
    let html = `<b>Hello ${payload.username},</b>
                    <p>Welcome to shiftR ! your subscription Deactivated successfully.!</p>                   
                    <p><b>Plan Details:-</b></p>
                    <p>companyName:- ${payload.companyName}</p>
                    <p>Plan startdate:- ${payload.startDate}</p>
                    <p>plan enddate:- ${payload.endDate}</p>
                    <p>TotalTrips:- ${payload.totalTrips}</p>
                    <p>RemainingTrips:- ${payload.remainingTrips}</p>`;
    return sendMail(payload.useremail, "ShiftR-Deactive-Subscription", html)
};
export const adminSignupnotification = (name, emailid, userType) => {
    let html;
    if (userType == UserRole.DRIVER_R) {
        html = `<b>Hello ShiftR,</b>
        <p>New Driver has regiter our platform! Please check the and proceed further process!</p>                   
        <p><b>Driver Details:-</b></p>
        <p>Name:- ${name}</p>
        <p>Email-Id:- ${emailid}</p>`;
    } else {
        html = `<b>Hello ShiftR,</b>
        <p>New Busowner has regiter our platform! Please check the and proceed further process!</p>                   
        <p><b>Busowner Details:-</b></p>
        <p>CompanyName:- ${name}</p>
        <p>Email-Id:- ${emailid}</p>`;
    }
    return sendMail("shiftr@joshiinc.com", "ShiftR-Signup-Alert", html)
};