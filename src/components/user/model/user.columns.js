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
    'SRU04_NUMBER_OF_BUSES_R as NumberofBus'
];

export let userAddressColumns = [
    'SRU06_ADDRESS_D as addressId',
    'SRU06_LINE_1_N as addressLine1',
    'SRU06_LINE_1_N as userAddress',
    'SRU06_LINE_2_N as addressLine2',
    'SRU06_POSTAL_CODE_N as postalCode',
    'SRU06_LOCATION_LATITUDE_N as latitude',
    'SRU06_LOCATION_LONGITUDE_N as longitude',
    "SRU06_CREATED_AT as createdAt",
    "SRU06_UPDATED_AT as updatedAt",
    "SRU06_CREATED_D as createdBy",
    "SRU06_UPDATED_D as updatedBy",
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
];

export let screeningCanadastatus = [
    'SRU09_SCREENING_CANADA_STATUS_D as SCstatusId',    
    'SRU09_SC_USER_N as screeningcanadaUserId',
    'SRU09_SC_STATUS_N as ScreeningCanadastatus'
];