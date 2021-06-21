// 身份证号码验证
export const validateIdCard = (rules, value, callback) => {
  if (!value) {
    callback()
  }
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  if (!reg.test(value)) {
    callback(new Error('请输入正确的身份证号码'))
  } else {
    callback()
  }
}

// 手机号码验证
export const validateMobile = (rules, value, callback) => {
  if (!value) {
    callback()
  }
  const reg = /^1[3456789]\d{9}$/
  if (!reg.test(value)) {
    callback(new Error('请输入正确的手机号码'))
  } else {
    callback()
  }
}

// 金额 亩 
export const validateNumer = (_rule, value, callback) => {
  if (value > 99999999) {
    callback(new Error('超过最大值'))
  } else {
    callback()
  }
}


