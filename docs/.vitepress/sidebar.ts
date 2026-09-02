import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

import type { DefaultTheme } from "vitepress";

const route = (...segments: string[]): string =>
  encodeURI(`/bluebook/${segments.map((segment) => segment.trim()).join("/")}/`);

// 从 index.md 提取一级标题作为侧边栏显示文字，回退到目录名
const extractTitle = (indexMdPath: string, fallback: string): string => {
  try {
    const markdown = readFileSync(indexMdPath, "utf8");
    const h1 = markdown.match(/^#\s+(.+)$/m)?.[1]?.trim();
    return h1 || fallback;
  } catch {
    return fallback;
  }
};

const bluebookDirectory = fileURLToPath(
  new URL("../bluebook/", import.meta.url),
);

// WorkBuddy 实战蓝皮书：四篇 + 附录，27 章。
// 篇目（Part）为顶层，章节（Chapter）为子项，均通过 index.md 提取标题。
const PARTS = [
  "第一篇 使用手册：先把 WorkBuddy 用起来",
  "第二篇 案例篇：从一项任务到一支 AI 团队",
  "第三篇 进阶篇：把案例变成自己的工作系统",
  "第四篇 岗位与行业落地",
  "附录",
] as const;

const bluebookSidebar: DefaultTheme.Sidebar = {
  "/bluebook/": (() => {
    const items: DefaultTheme.SidebarItem[] = [
      { text: "蓝皮书总览", link: "/bluebook/" },
    ];

    for (const partName of PARTS) {
      const partDir = `${bluebookDirectory}${partName}`;
      const partTitle = extractTitle(`${partDir}/index.md`, partName);

      const children = readdirSync(partDir, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .sort((left, right) => {
          // 章号前缀（如「第 1 章」「第 10 章」）按数字排序，避免字符串排序
          // 把「第 10 章」排在「第 2 章」前面。
          const leftNum = Number(left.name.match(/^第\s*(\d+)\s*章/)?.[1] ?? NaN);
          const rightNum = Number(right.name.match(/^第\s*(\d+)\s*章/)?.[1] ?? NaN);
          if (!Number.isNaN(leftNum) && !Number.isNaN(rightNum)) {
            return leftNum - rightNum;
          }
          if (!Number.isNaN(leftNum)) return -1;
          if (!Number.isNaN(rightNum)) return 1;
          return left.name.localeCompare(right.name, "zh-CN");
        })
        .map((chapter) => ({
          text: extractTitle(
            `${partDir}/${chapter.name}/index.md`,
            chapter.name,
          ),
          link: route(partName, chapter.name),
        }));

      items.push({
        text: partTitle,
        collapsed: false,
        items: children,
      });
    }

    return items;
  })(),
};

const casesDirectory = fileURLToPath(
  new URL("../cases/submissions/", import.meta.url),
);

const caseItems = readdirSync(casesDirectory, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => {
    const markdown = readFileSync(
      new URL(`../cases/submissions/${entry.name}/index.md`, import.meta.url),
      "utf8",
    );
    const frontmatter = markdown.match(/^---\s*\n([\s\S]*?)\n---/)?.[1] || "";
    const readField = (field: string): string =>
      frontmatter
        .match(new RegExp(`^${field}:\\s*(.+)$`, "m"))?.[1]
        ?.trim()
        .replace(/^['"]|['"]$/g, "") || "";

    return {
      date: readField("date"),
      item: {
        text: readField("title") || entry.name,
        link: encodeURI(`/cases/submissions/${entry.name}/`),
      } satisfies DefaultTheme.SidebarItem,
    };
  })
  .sort((left, right) => right.date.localeCompare(left.date))
  .map(({ item: caseItem }) => caseItem);

const casesSidebar: DefaultTheme.SidebarItem[] = caseItems;

export const firstCaseLink: string =
  caseItems[0]?.link ?? "/cases/";

export const siteSidebar: DefaultTheme.Sidebar = {
  ...bluebookSidebar,
  "/cases/": casesSidebar,
  "/community/case-contributing": casesSidebar,
};
