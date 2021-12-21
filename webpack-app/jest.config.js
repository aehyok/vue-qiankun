module.exports = {
    // 是否显示覆盖率报告
    collectCoverage: true,
    // 告诉 jest 哪些文件需要经过单元测试测试
    collectCoverageFrom: ['get.ts', 'sum.ts', 'src/utils/**/*'],
  }