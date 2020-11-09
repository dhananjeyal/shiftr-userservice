export class UserRole {
    static SUPER_ADMIN_R = 1;
    static ADMIN_R = 2;
    static DRIVER_R = 3;
    static CUSTOMER_R = 4;
}

export class DocumentType {
    static FINANCIAL = 5;
    static LICENSE = 6;
    static PCC = 7;
    static INSURANCE = 8;
    static OWNERSHIP = 9;
    static CRIMINAL = 13;
    static ABSTRACT = 14;
    static CVOR = 15;
    static OTHERS = 16;
}

export class CountryType {
    static CANADA = 17;
    static USA = 18;
    static CANADA_LIST = 38;
    static USA_LIST = 231;
}

export class DocumentName {
    static FINANCIAL = "FINANCIAL_DOCUMENT";
    static LICENSE = "LICENSE_DOCUMENT";
    static PCC = "PCC_DOCUMENT";
    static INSURANCE = "INSURANCE_DOCUMENT";
    static OWNERSHIP = "OWNERSHIP_DOCUMENT";
    static CRIMINAL = "CRIMINAL_DOCUMENT";
    static ABSTRACT = "ABSTRACT_DOCUMENT";
    static CVOR = "CVOR_DOCUMENT";
    static OTHERS = "ADDITIONAL_DOCUMENT";
}

export class DocumentStatus {
    static VERIFIED = 2;
    static PENDING = 3;
    static REJECTED = 4;
}

export class Gender {
    static MALE = 1;
    static FEMALE = 2;
}

export class UserStatus {
    static FIRST_TIME = 11
    static ACTIVE = 1;
    static INACTIVE = 4;
}

export class SignUpStatus {
    static ACTIVE = 1;
    static VERIFIED = 2;
    static REJECTED = 4;
    static PERSONAL_DETAILS = 5;
    static VEHICLE_DETAILS = 6;
    static DRIVER_DOCUMENTS = 7;
    static FINANCIAL_DETAILS = 8;
    static COMPLETED = 9;
    static SC_VERIFICATION = 10;
}

export class EmailStatus {
    static VERIFIED = 2;
    static PENDING = 3;
    static FIRST_TIME = 11;
}

export class AddressType {
    static RESIDENTIAL = 10;
    static PERMANENT = 11;
    static FINANCIAL = 12;
}

export class NotifyType {
    static VERIFY_EMAIL = 1;
    static ACTIVATE_USER = 2;
    static DE_ACTIVATE_USER = 3;
}

export class booleanType {
    static YES = 1;
    static NO = 0;
}

export class phonenumbertype {
    static OFFICE = 19;
    static PERSONAL = 20;
    static HOME = 21;
}

export class WebscreenType {
    static PROFILE = 1;
    static COMPANY = 2;
    static SETTINGS = 3;
}

export class licenseType {
    static CANADA = 1;
    static USA = 2;
    static BOTH = 3;
}

export class Typeofdistance {
    static KM = 22;
    static MILES = 23;
    static DEFAULTKM = 1.6;  // 1miles   = 1.6 KM 
}

export class EmailContents {
    static TRIP_PENDING = "Trip is not accepted by any drivers";
    static TRIP_NOT_STARTED = "Trip is not started by the drivers";
    static TRIP_NO_MATCH = "Driver not found for your Trip";
}

export class subscriptionStatus {
    static ACTIVEUSER = 12;
    static GUESTUSER = 13;
}

export class plandurationTypetext {
    static DAYS = "DAYS";
    static MONTHS = "MONTHS";
    static YEARS = "YEARS";
    static UNLIMITED = "UNLIMITED"
}

export class TripStatus {
    static TRIP_CREATED = 8;
    static TRIP_SAVED = 9;
    static TRIP_PENDING = 10;
    static TRIP_ACCEPTED = 11;
    static TRIP_IN_PROGRESS = 12;
    static TRIP_CANCELLED = 13;
    static TRIP_COMPLETED = 14;
    static TRIP_IGNORED = 15;
    static START_TRIP = 23;
    static ACTIVE_TRIP = 24;
    static NOT_STARTED = 25;
}
export class encryptionSecret {
    static SALTKEY = "06fe746c4d7174b827e5599eac0e26f2";
}

export const encryptKeys = ['password', 'emailId', 'newPassword', 'tempPassword', 'firstName', 'lastName', 'phoneNo', 'phoneNumber', 'age', 'phone'];