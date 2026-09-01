import { defineConfig } from "vitepress";

import { siteSidebar, firstCaseLink } from "./sidebar";
import { configureMermaidMarkdown } from "./mermaid-markdown";
import { createPageDescription, createSeoHead } from "./seo";

const siteUrl = process.env.VITEPRESS_SITE_URL || "https://workbuddyhelper.example.com";

export default defineConfig({
    lang: "zh-CN",
    title: "WorkBuddyHelper",
    titleTemplate: ":title · WorkBuddyHelper",
    description: "WorkBuddyHelper：WorkBuddy 实战蓝皮书，从使用手册、实战案例、进阶系统到岗位与行业落地。",
    cleanUrls: true,
    lastUpdated: true,
    srcExclude: ["**/source.md", "plans/**"],
    sitemap: {
      hostname: siteUrl,
    },
    transformPageData: (pageData, { siteConfig }) => {
      if (pageData.relativePath.startsWith("cases/")) {
        pageData.frontmatter.aside = false;
        pageData.frontmatter.outline = false;
      }

      return {
        description: createPageDescription(siteConfig.srcDir, pageData),
      };
    },
    transformHead: (context) => createSeoHead(siteUrl, context),
    head: [
      ["link", { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
      ["meta", { name: "theme-color", content: "#b1f9f9" }],
      ["meta", { name: "author", content: "WorkBuddyHelper" }],
      [
        "meta",
        {
          name: "keywords",
          content:
            "WorkBuddy,AI 工作系统,Skill,自动化任务,多 Agent,连接器,专家团,实战案例",
        },
      ],
    ],
    markdown: {
      config: configureMermaidMarkdown,
      image: {
        lazyLoading: true,
      },
      theme: {
        light: "github-light",
        dark: "github-dark",
      },
    },
    themeConfig: {
      siteTitle: "WorkBuddyHelper",
      nav: [
        { text: "首页", link: "/" },
        { text: "蓝皮书", link: "/bluebook/" },
        { text: "案例", link: firstCaseLink },
        { text: "帮你解决", link: "/help/" },
      ],
      sidebar: siteSidebar,
      socialLinks: [
        { icon: "github", link: "https://github.com/" },
      ],
      search: {
        provider: "local",
      },
      outline: {
        level: [2, 3],
        label: "本页目录",
      },
      docFooter: {
        prev: "上一篇",
        next: "下一篇",
      },
      lastUpdated: {
        text: "最后更新",
        formatOptions: {
          dateStyle: "medium",
          timeStyle: "short",
        },
      },
      footer: {
        message:
          "WorkBuddyHelper · WorkBuddy 实战蓝皮书",
        copyright: "Copyright © 2026 WorkBuddyHelper",
      },
    },
  });
