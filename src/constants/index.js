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

export class screeningcanadastatus {
    static FILE_COMPLETED = 'file.completed';    
}