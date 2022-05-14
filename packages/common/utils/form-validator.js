// 常用正则整理表单录入字段校验
// https://juejin.cn/post/7016871226899431431

// 1、手机号码
const phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/

// 2、身份证的校验
const sfzReg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/

// 3、邮箱的校验
const emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/

//4、URL的校验
const urlReg = /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/

// 5、IPv4的校验
const ipv4Reg = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/

// 6、16进制颜色的校验（#fff、#1234567）
const color16Reg = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/

//7、日期 YYYY-MM-DD
const dateReg = /^\d{4}(\-)\d{1,2}\1\d{1,2}$/

//8、日期 YYYY-MM-DD hh:mm:ss
const dateTimeReg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/

//9、整数的校验
const intReg = /^[-+]?\d*$/

//10、小数的校验
const floatReg1 = /^[-\+]?\d+(\.\d+)?$/

//11、保留n位小数
function checkFloat(n) {
  return new RegExp(`^([1-9]+[\d]*(.[0-9]{1,${n}})?)$`)
}

// 保留2位小数
const floatReg = checkFloat(2)
const floatNum1 = 1234.5
console.log(floatReg.test(floatNum1)) // true


//12、邮政编号的校验
const postalNoReg = /^\d{6}$/

//13、QQ号的校验（说明：5-11位数字）
const qqReg = /^[1-9][0-9]{4,10}$/

//14、微信号的校验（说明：6至20位，以字母开头，字母，数字，减号，下划线）
const wxReg = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/

//15、车牌号的校验
const carNoReg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/

//16、只含字母的字符串
const letterReg = /^[a-zA-Z]+$/

//17、包含中文的字符串
const cnReg = /[\u4E00-\u9FA5]/

//18、密码强度的校验（说明：密码中必须包含字母、数字、特称字符，至少8个字符，最多30个字符）
const passwordReg = /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,30}/

//19、字符串长度n的校验
function checkStrLength(n) {
  return new RegExp(`^.{${n}}$`)
}

// 校验长度为3的字符串
const lengthReg = checkStrLength(3)
const str1 = 'hhh'
console.log(lengthReg.test(str1)) // true

//20、文件拓展名的校验
function checkFileName (arr) {
  arr = arr.map(name => `.${name}`).join('|')
  return new RegExp(`(${arr})$`)
}

const filenameReg = checkFileName(['jpg', 'png', 'txt'])

const filename1 = 'sunshine.jpg'
console.log(filenameReg.test(filename1)) // true






export const validate = (regString, value,callback) => {
  if (!value) {
    callback()
  }
  if (!regString.test(value)) {
    callback(new Error('请输入正确的身份证号码'))
  } else {
    callback()
  }
}

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


