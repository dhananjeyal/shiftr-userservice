import Users from "./user.model";
import UsersDetails from "./userDetails.model";

export let columns = [
    "SRU03_USER_MASTER_D as userId",
    "SRU03_FIRST_N as firstName",
    "SRU03_LAST_N as lastName",
    "SRU03_EMAIL_N as emailId",
    "SRU03_PASSWORD_N as password",
    "SRU03_TYPE_D as typeId",
    "SRU03_STATUS_D as status",
    "SRU03_CREATED_AT as createdAt",
    "SRU03_UPDATED_AT as updatedAt",
    "SRU03_CREATED_D as createdBy",
    "SRU03_UPDATED_D as updatedBy",
];

export let userDetailsColumns = [
    'SRU04_DETAIL_D as detailsId',
    'SRU04_EMAIL_STATUS_D as emailStatus',
    'SRU04_SIGNUP_STATUS_D as signUpStatus',
    'SRU04_PHONE_N as phoneNumber',
    'SRU04_COMPANY_NAME_N as companyName',
    'SRU04_NUMBER_OF_BUSES_R as NumberofBus',
    'SRU04_TRAVEL_LOGIN_STATUS_F as firsttimeLoginstatus',
    'SRU04_NOTIFICATION_SETTINGS_F as notificationSettings',
    'SRU04_PROFILE_I as userProfileImage'
];


export let tripUserDetailsColumns = [
    'SRU04_DETAIL_D as detailsId',
    'SRU04_EMAIL_STATUS_D as emailStatus',
    'SRU04_SIGNUP_STATUS_D as signUpStatus',
    `SRU04_LICENSE_TYPE_R as licenseType`,
    `SRU04_LICENSE_TYPE_N as license`,
    'SRU04_PHONE_N as phoneNumber',
    'SRU04_COMPANY_NAME_N as companyName',
    'SRU04_NUMBER_OF_BUSES_R as NumberofBus',
    'SRU04_TRAVEL_LOGIN_STATUS_F as firsttimeLoginstatus',
    'SRU04_NOTIFICATION_SETTINGS_F as notificationSettings',
    'SRU04_PROFILE_I as userprofile'
];

export let userAddressReports = [
    'SRU06_CITY_N as location',
    'SRU16_PROVINCE_D as province'
];

export let usersColumnsReports = [
    `SRU03_USER_MASTER_D as userId`,
    `SRU03_FIRST_N as firstName`,
    `SRU03_LAST_N as lastName`
];

export let userAddressColumns = [
    'SRU06_ADDRESS_D as addressId',
    'SRU06_LINE_1_N as addressLine1',
    'SRU06_LINE_1_N as userAddress',
    'SRU06_LINE_2_N as addressLine2',
    'SRU06_POSTAL_CODE_N as postalCode',
    'SRU06_LOCATION_LATITUDE_N as latitude',
    'SRU06_LOCATION_LONGITUDE_N as longitude'
];


export let userAddressWithType = [
    'SRU06_ADDRESS_D as addressId',
    'SRU06_LINE_1_N as addressLine1',
    'SRU06_LINE_1_N as userAddress',
    'SRU06_LINE_2_N as addressLine2',
    'SRU06_POSTAL_CODE_N as postalCode',
    'SRU06_CITY_N as city',
    'SRU06_LOCATION_LATITUDE_N as latitude',
    'SRU06_LOCATION_LONGITUDE_N as longitude',
    'SRU06_ADDRESS_TYPE_D as addressType'
];

export let userFinancialColumns = [
    'SRU08_FINANCIAL_D as financialId',
    'SRU08_BANK_N as bankName',
    'SRU08_ACCOUNT_N as accountNumber',
    'SRU08_INSTITUTION_N as institutionNumber',
    'SRU08_TRANSIT_N as transitNumber',
    "SRU08_CREATED_AT as createdAt",
    "SRU08_UPDATED_AT as updatedAt",
    "SRU08_CREATED_D as createdBy",
    "SRU08_UPDATED_D as updatedBy",
];

export let userDocumentColumns = [
    'SRU05_DOCUMENT_D as documentId',
    'SRU05_NAME as name',
    'SRU01_TYPE_D as type',
    'SRU02_STATUS_D as status',
    'SRU05_DOCUMENT_I as path',
    "SRU05_CREATED_AT as createdAt",
    "SRU05_UPDATED_AT as updatedAt",
    "SRU05_CREATED_D as createdBy",
    "SRU05_UPDATED_D as updatedBy",
];

export let adminListColumns = [
    `${Users.tableName}.SRU03_USER_MASTER_D as userId`,
    `${Users.tableName}.SRU03_FIRST_N as firstName`,
    `${Users.tableName}.SRU03_LAST_N as lastName`,
    `${Users.tableName}.SRU03_EMAIL_N as emailId`,
    `${Users.tableName}.SRU03_STATUS_D as status`,
    `${Users.tableName}.SRU03_UPDATED_AT as updatedAt`,
    `${UsersDetails.tableName}.SRU04_PHONE_N as phoneNo`,
];

export let userListColumns = [
    `${Users.tableName}.SRU03_USER_MASTER_D as userId`,
    `${Users.tableName}.SRU03_FIRST_N as firstName`,
    `${Users.tableName}.SRU03_LAST_N as lastName`,
    `${Users.tableName}.SRU03_EMAIL_N as emailId`,
    `${Users.tableName}.SRU03_STATUS_D as status`,
    `${Users.tableName}.SRU03_UPDATED_AT as updatedAt`,
    `${UsersDetails.tableName}.SRU04_PHONE_N as phoneNo`,
    `${UsersDetails.tableName}.SRU04_EXPERIENCE_D as experience`,
    `${UsersDetails.tableName}.SRU04_LICENSE_TYPE_N as license`,
];

export let screeningCanadastatus = [
    'SRU09_SCREENING_CANADA_STATUS_D as SCstatusId',    
    'SRU09_SC_USER_N as screeningcanadaUserId',
    'SRU09_SC_STATUS_N as ScreeningCanadastatus'
];

export let contactInfoDetailsColumns = [
    'SRU19_CONTACT_INFO_D as contactinfoId',
    'SRU19_CONTACT_PERSON_N as contcatPersonName',
    'SRU19_PHONE_R as contactpersonPhoneNumber'
];

export let drivercontactInfoDetailsColumns = [
    'SRU19_CONTACT_INFO_D as contactinfoId',
    'SRU01_TYPE_D as phonenumberType',
    'SRU19_CONTACT_PERSON_N as contactPerson',
    'SRU19_PHONE_R as phoneNumber'
];

export let userEmailDetails = [
    "SRU03_USER_MASTER_D as userId",
    "SRU03_FIRST_N as firstName",
    "SRU03_LAST_N as lastName",
    "SRU03_EMAIL_N as emailId"
];

export let usersColumns = [
    `SRU03_USER_MASTER_D as userId`,
    `SRU03_FIRST_N as firstName`,
    `SRU03_LAST_N as lastName`,
    `SRU03_EMAIL_N as emailId`,
    `SRU03_STATUS_D as status`,
    `SRU03_UPDATED_AT as updatedAt`
];

export let userDetailsPhoneAndExp = [
    `SRU04_PHONE_N as phoneNo`,
    `SRU04_EXPERIENCE_D as experience`
]
