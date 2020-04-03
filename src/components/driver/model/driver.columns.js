import DriverExperience from './experience.model';

export let driverUserDetailsColumns = [
    'SRU04_DETAIL_D as detailsId',
    'SRU03_USER_MASTER_D as userId',
    'SRU04_EMAIL_STATUS_D as emailStatus',
    // 'SRU04_PHONE_N as phoneNo',
    'SRU04_PHONE_N as phone',
    'SRU04_AGE_D as age',
    'SRU04_GENDER_D as gender',
    'SRU04_EXPERIENCE_D as experience',
    'SRU04_PROFILE_I as profilePicture',
    'SRU04_PROFILE_I as userprofile',
    'SRU04_WORKING_WITH_OTHERS as workingWithOthers',
    // 'SRU04_WORKING_WITH_OTHERS as previcesexperience',
    'SRU04_OTHER_SERVICE_INFO as otherServiceInfo',
    'SRU04_OTHER_SERVICE_INFO as description',
];

export let driverFinancialColumns = [
    'SRU08_BANK_N as bankName',
    'SRU08_ACCOUNT_N as accountNo',
    'SRU08_INSTITUTION_N as institutionName',
    'SRU08_TRANSIT_N as transitNo',
];

export let driverExperienceColumns = [   
    'SRU09_SPECIALITY_KEY_D as specialityKey',
    'SRU09_TYPE_N as experienceType',//Experience Type = CANADA | USA
    'SRU09_LICENSE_TYPE_N as licenseType',//Experience Type = CANADA | USA
    'SRU09_TOTALEXP_N as totalExp',
    'SRU09_CURRENT_N as currentExp', //Current Experience in State or Province
];

export let driverExpSpecialityColumns = [
    'SRU12_DRIVER_SPECIALITY_D as driverSpecialityId',
    "SRU12_DRIVER_SPECIALITY.SRU03_USER_MASTER_D as userId",
    'SRU12_SPECIALITY_N as specialityType',
    'SRU12_VALIDYEAR_N as validYear',
];

export let driverLicenseTypeColumns = [
    'SRU10_LICENSE_TYPE_D as licenseId',
    'SRU10_LICENSE_TYPE_N as licenseType'
]

export let driverSpecialityColumns = [
    'SRU11_SPECIALITY_TRAINING_D as specialitytrainingId',
    'SRU11_SPECIALITY_TRAINING_N as specialityType'
]

export let experienceListColumns = [
    'SRU13_EXPERIENCE_D as ExperienceListId',
    'SRU13_EXPERIENCE_R as Experience'
]

export let contactInfoColumns = [
    'SRU09_PHONE_D as contactinfoId',
    'SRU09_CONTACT_PERSON_N as contcatPersonName',
    'SRU09_PHONE_R as contactpersonPhoneNumber'
]

export let driverSpecialityDetailsColumns = [
    'SRU12_DRIVER_SPECIALITY_D as specialityId',
    'SRU12_SPECIALITY_N as specialityName'
]

export let driverLanguageColumns = [
    'SRU11_LANGUAGE_D as languageId',
    'SRU11_LANGUAGE_N as languageName'
]

