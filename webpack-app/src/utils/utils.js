export const isObjArr = (value) => {
    if (Object.prototype.toString.call(value) === "[object Array]") {
        return true
    }else {
        return false
    }
}

// 判断val是否为数值
export const isNumber =(value) => {
    var regPos = /^\d+(\.\d+)?$/; //非负浮点数
    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
    if(regPos.test(value) || regNeg.test(value)) {
    return true;
    } else {
    return false;
    }
}

// 获取随机数(不与上一次重复)
export const getRndInteger = (max) => {
    const tempNum = Math.floor(Math.random() * max);
    console.log(`当前值：${tempNum},历史值：${window.randomNum}`);
    if (window.randomNum === tempNum) {
        console.log("再调用一次方法");
        getRndInteger(max);
    } else {
        window.randomNum = tempNum;
    }
}

// 获取随机数最小值和最大值区间（min，max）
export const getRangeInteger = (min,max) => {
    const tempNum = Math.floor(Math.random() * (max-min) + min)
    return tempNum
}

  /**
   * 获取随机字符串  
   * @param {*默认32位长度} length
   */
export const stringRandom = (length) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const maxPos = chars.length;
    let noceStr = '';
    let i;
    for (i = 0; i < (length || 32); i += 1) {
      noceStr += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return noceStr
}