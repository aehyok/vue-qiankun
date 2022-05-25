module.exports = {
    // type 类型（定义之后，可通过上下键选择）
    types: [
        { value: "feat", name: "feat:     新增功能" },
        { value: "fix", name: "fix:      修复 bug" },
        { value: "docs", name: "docs:     文档变更" },
        {
            value: "style",
            name: "style:    代码格式（不影响功能，例如空格、分号等格式修正）"
        },
        {
            value: "refactor",
            name: "refactor: 代码重构（不包括 bug 修复、功能新增）"
        },
        { value: "perf", name: "perf:     性能优化" },
        { value: "chore", name: "chore:     其他修改, 比如构建流程, 依赖管理、版本好修正." }
    ],

    // scope 类型（定义之后，可通过上下键选择）
    scopes: [
        ["components", "组件相关"],
        ["hooks", "hook 相关"],
        ["utils", "utils 相关"],
        ["element-ui", "对 element-ui 的调整"],
        ["styles", "样式相关"],
        ["deps", "项目依赖"],
        ["auth", "对 auth 修改"],
        ["other", "其他修改"],
        // 如果选择 custom，后面会让你再输入一个自定义的 scope。也可以不设置此项，把后面的 allowCustomScopes 设置为 true
        ["custom", "以上都不是？我要自定义"]
    ].map(([value, description]) => {
        return {
            value,
            name: `${value.padEnd(30)} (${description})`
        }
    }),

    // 是否允许自定义填写 scope，在 scope 选择的时候，会有 empty 和 custom 可以选择。
    // allowCustomScopes: true,

    // allowTicketNumber: false,
    // isTicketNumberRequired: false,
    // ticketNumberPrefix: 'TICKET-',
    // ticketNumberRegExp: '\\d{1,5}',

    // 针对每一个 type 去定义对应的 scopes，例如 fix
    /*
    scopeOverrides: {
      fix: [
        { name: 'merge' },
        { name: 'style' },
        { name: 'e2eTest' },
        { name: 'unitTest' }
      ]
    },
    */

    // 交互提示信息
    messages: {
        type: "确保本次提交遵循：盛阳前端代码规范！\n选择你要提交的类型：",
        scope: "\n选择一个 scope（可选）：",
        // 选择 scope: custom 时会出下面的提示
        customScope: "请输入自定义的 scope：",
        subject: "填写简短精炼的变更描述：\n",
        body: '填写更加详细的变更描述（可选）。使用 "|" 换行：\n',
        breaking: "列举非兼容性重大的变更（可选）：\n",
        footer: "列举出所有变更的 ISSUES CLOSED（可选）。 例如: #31, #34：\n",
        confirmCommit: "确认提交？"
    },

    // 设置只有 type 选择了 feat 或 fix，才询问 breaking message
    allowBreakingChanges: ["feat", "fix"],

    // 跳过要询问的步骤
    skipQuestions: ["scope", "body", "breaking", "footer"],

    subjectLimit: 100, // subject 限制长度
    breaklineChar: "|" // 换行符，支持 body 和 footer
    // footerPrefix : 'ISSUES CLOSED:'
    // askForBreakingChangeFirst : true,
}
