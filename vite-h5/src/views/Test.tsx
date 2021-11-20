import { defineComponent } from 'vue'
export default defineComponent({
  setup() {
    console.log('table in console')
    function convertTest(s: string): number {

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
        console.log(s,item, 'spec----------------------')
        if(s.indexOf(item)> -1 ) {
          console.log(item,spec[item], 'up')
          s = s.replace(item, '');
          output = output+ spec.get(item)
          console.log(spec,screenTop, 'input-spec',output)
        }
      }


      console.log('input=--中间', s,output)
      let array = s.split('')
      array.forEach((item) => {
        console.log(item, 'down')
        if(obj.has(item)) {
          s = s.replace(item, '');
          output = output + obj.get(item)
        }
        console.log(s, 'input-obj',output)
      });
      console.log(output, 'output-ending')
      return output;
    }

    // convertTest('III');
    // convertTest('IV');
    convertTest('LVIII');
    convertTest('MCMXCIV');

    return () =>
      <>
        Test
      </>
  }
})
