# 测试到家

Next.js App Router + React 19 + TypeScript + Ant Design。

## 本地运行

```sh
npm install
npm run dev
```

访问 http://localhost:5174/home 。

```sh
npm run build
npm start
```

## Vercel 部署

将项目推送到 Git 仓库后，在 Vercel 中导入仓库。Framework Preset 选择 Next.js，Root Directory 选择本项目根目录；Build Command 使用 npm run build，Output Directory 保持默认，无需填写 dist。不需要配置环境变量。

## 目录

- src/app：路由、根布局和全局 Provider
- src/views：首页、服务、个人中心页面组件
- src/components：共享组件及弹窗
- src/context：共享状态
- src/data：模拟技师数据

登录注册、头像和设置目前使用浏览器 localStorage，仅供演示；部署不会将其自动变成服务端账号系统。请勿输入真实密码。
