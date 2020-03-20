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

export let driverVehicleColumns = [
    'SRU07_VEHICLE_D as vehicleId',
    'SRU07_TYPE_N as type',//vehicleType
    'SRU07_TYPE_N as vehicleType',//vehicleType
    'SRU07_MAKE_N as make',
    'SRU07_MODEL_N as model',
    'SRU07_VIN_N as vin',
    'SRU07_COLOR_N as color',
    'SRU07_LICENSE_PLATE_N as licensePlate',
    'SRU07_SEATS_UP_N as seatsUp',
    'SRU07_SEATS_DOWN_N as seatsDown',
    "SRU07_CREATED_AT as createdAt",
    "SRU07_UPDATED_AT as updatedAt",
    "SRU07_CREATED_D as createdBy",
    "SRU07_UPDATED_D as updatedBy",
];
