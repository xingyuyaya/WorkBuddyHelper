# Cloudflare Pages 部署

本站是纯静态 VitePress 站点，通过 Cloudflare Pages 的 GitHub 集成持续部署。
推送到 `main` 分支即自动构建并发布，无需服务器。

## 一、Cloudflare Pages 设置（首次部署）

1. 登录 [Cloudflare 控制台](https://dash.cloudflare.com/)，进入 **Workers & Pages**。
2. 点击 **Create application → Pages → Import an existing Git repository**。
3. 授权 GitHub 账号，选择仓库 `xingyuyaya/WorkBuddyHelper`。
4. 按下面的表格填写构建配置：

| 配置项 | 值 |
| --- | --- |
| Project name | `workbuddyhelper` |
| Production branch | `main` |
| Framework preset | `VitePress`（选不到就选 None） |
| Build command | `npm run docs:build` |
| Build output directory | `docs/.vitepress/dist` |
| Root directory | `/` |

5. 点击 **Save and Deploy**，等待首次构建完成。

Cloudflare 会自动读取仓库根目录的 `.nvmrc`（Node 22），并用 `package-lock.json`
固定依赖。**无需手动设置任何环境变量**——本站是纯静态站点，不依赖服务端。

## 二、部署完成后

- 首次构建完成后会得到一个默认域名：`https://workbuddyhelper.pages.dev`。
- 后续只要 `git push` 到 `main`，Cloudflare Pages 会自动重新构建并发布。
- 创建 Pull Request 时，Pages 会自动生成预览部署链接，方便审核。

## 三、自定义域名（可选）

如果你有域名（例如 `workbuddy.homes`），在 Pages 项目的
**Custom domains** 里添加即可，Cloudflare 会自动配置 DNS 与 HTTPS 证书。

绑定域名后，建议同步更新：

- `docs/.vitepress/config.mts` 中的 `site` 相关 URL
- `docs/public/robots.txt` 里的 sitemap 地址
- `docs/public/sitemap.xml` 里的站点地址

## 四、本地验证

```bash
npm ci
npm run docs:build     # 构建产物输出到 docs/.vitepress/dist
npm run preview        # 本地预览构建结果
```

构建成功的标志：`docs/.vitepress/dist/index.html` 存在，且包含 `assets`、
`bluebook`、`cases`、`community`、`help` 等目录。
