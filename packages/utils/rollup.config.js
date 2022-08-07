const path = require('path')

export default {
  input: path.resolve(__dirname, './src/index.js'),
  output: [
    {
      dir: path.resolve(__dirname, 'dist/esm'),
      format: 'esm' // 通过esm格式输出
    }
  ]
}
