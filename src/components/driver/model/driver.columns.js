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
    'SRU12_SPECIALITY_N as specialityType',
    'SRU12_VALIDYEAR_N as validYear',
];

export let driverLicenseTypeColumns = [
    'SRU10_LICENSE_TYPE_N as licenseType',
    'SRU10_LICENSE_TYPE_DESC_X as licenseTypeDesc',
]

export let driverSpecialityColumns = [
    'SRU11_SPECIALITY_TRAINING_N as specialityType',
    'SRU11_SPECIALITY_TRAINING_X as specialityDesc',
]
