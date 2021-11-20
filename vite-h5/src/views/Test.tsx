import { defineComponent } from 'vue'
export default defineComponent({
  setup() {
    console.log('table in console')
    function convertTest(input: string): number {

      let obj = new Map()
      obj.set('I', 1)
      obj.set('V', 5)
      obj.set('X', 10)
      obj.set('L', 50)
      obj.set('C', 100)
      obj.set('D', 500)
      obj.set('M', 1000)


      let spec = new Map()
      spec.set('CM', 900)
      spec.set('CD', 400)
      spec.set('XC', 90)
      spec.set('XL', 40)
      spec.set('IX', 9)
      spec.set('IV', 4)

      let output = 0
      for (let item of spec.keys()) {
        console.log(input,item, 'spec----------------------')
        if(input.indexOf(item)> -1 ) {
          console.log(item,spec[item], 'up')
          input = input.replace(item, '');
          output = output+ spec.get(item)
          console.log(spec,input, 'input-spec',output)
        }
      }


      console.log('input=--中间', input,output)
      let array = input.split('')
      array.forEach((item) => {
        console.log(item, 'down')
        if(obj.has(item)) {
          input = input.replace(item, '');
          output = output + obj.get(item)
        }
        console.log(input, 'input-obj',output)
      });
      console.log(output, 'output-ending')
      return output;
    }

    // convertTest('III');
    // convertTest('IV');
    // convertTest('LVIII');
    // convertTest('MCMXCIV');



    function romanToInt(s) {
      const map = {
          I: 1,
          V: 5,
          X: 10,
          L: 50,
          C: 100,
          D: 500,
          M: 1000
      }
      let sum = 0;
      for(let i = 0; i < s.length; i++) {
          const item = s[i];
          let val = map[item];
          console.log(val,map[s[i+1]], '比较' )
          if(val < map[s[i+1]]) {
              // 前面小于后面 后面 - 前面
              val = map[s[i+1]] - val;
              i++;
          }
          sum += val;
      }
      console.log(sum, 'sum')
      return sum
    };
    romanToInt('III')
    // 14. 最长公共前缀
    function longestCommonPrefix (strs:string[]):string {
      // 先找出数组中字符串最短的一个

      let lengths = strs.map(item => item.length)

      let min= Math.min(...lengths)
      // 找出最短字符串的索引值
      let str = strs[lengths.indexOf(min)]

      let currentS =''
      let result = ''
      for(let item of str) {
        currentS += item
        if (strs.every(item => item.startsWith(currentS))) {
          result= currentS
          console.log('result', result, item)
        } else {
          console.log('result','break', result)
          break
        }
      }

      return result ?? ''
    }

    longestCommonPrefix( ["flower","flow","flight"])
    longestCommonPrefix(["dog","racecar","car"])


    // 20. 有效的括号
    function isValid(s: string): boolean {
      return s.length > 0
    };

    isValid('[]')
    return () =>
      <>
        Test
      </>
  }
})
