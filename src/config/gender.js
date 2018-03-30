// 性别
const genderType = {
    MALE: 1, // 男
    FEMALE: 2, // 女
    UNKNOWN: 3 // 未知
}

const converTypeToValue = (type) => {
    if (type === genderType.MALE) {
        return '男'
    } else if (type === genderType.FEMALE) {
        return '女'
    }
    return '未知'
}

const converValueToType = (value) => {
    if (value === '男') {
        return genderType.MALE
    } else if (value === '女') {
        return genderType.FEMALE
    }
    return genderType.UNKNOWN
}



module.exports = {
    genderType,
    converTypeToValue,
    converValueToType
};
