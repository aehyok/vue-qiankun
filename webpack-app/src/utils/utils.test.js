const utils = require('./utils');

test('isObjArr 是否为对象数组', () => {
  let obj = {}
  expect(utils.isObjArr(obj)).toBe(false);
});

test('isNumber 是否为数值', () => {
    let number1= 123
    expect(utils.isNumber(number1)).toBe(true)

    let number2='s1'
    expect(utils.isNumber(number2)).toBe(false)
})


test('getRndInteger 获取随机数', () => {
    let number1= 123
    expect(utils.isNumber(number1)).toBe(true)

    let number2='s1'
    expect(utils.isNumber(number2)).toBe(false)
})