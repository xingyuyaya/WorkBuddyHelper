// docs/.vitepress/config.mts
import { defineConfig } from "file:///D:/3/WorkBuddyGuide-main/node_modules/vitepress/dist/node/index.js";

// docs/.vitepress/sidebar.ts
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
var __vite_injected_original_import_meta_url = "file:///D:/3/WorkBuddyGuide-main/docs/.vitepress/sidebar.ts";
var route = (...segments) => encodeURI(`/bluebook/${segments.map((segment) => segment.trim()).join("/")}/`);
var extractTitle = (indexMdPath, fallback) => {
  try {
    const markdown = readFileSync(indexMdPath, "utf8");
    const h1 = markdown.match(/^#\s+(.+)$/m)?.[1]?.trim();
    return h1 || fallback;
  } catch {
    return fallback;
  }
};
var bluebookDirectory = fileURLToPath(
  new URL("../bluebook/", __vite_injected_original_import_meta_url)
);
var LEGACY_DIRS = /* @__PURE__ */ new Set(["\u9644\u5F55"]);
var bluebookSidebar = {
  "/bluebook/": (() => {
    const items = [
      { text: "\u6587\u7AE0\u603B\u89C8", link: "/bluebook/" }
    ];
    const parts = readdirSync(bluebookDirectory, { withFileTypes: true }).filter(
      (entry) => entry.isDirectory() && !LEGACY_DIRS.has(entry.name) && !entry.name.startsWith("\u7B2C")
    ).sort((left, right) => left.name.localeCompare(right.name, "zh-CN"));
    for (const part of parts) {
      const partDir = `${bluebookDirectory}${part.name}`;
      const partTitle = extractTitle(
        `${partDir}/index.md`,
        part.name
      );
      const children = readdirSync(partDir, { withFileTypes: true }).filter((entry) => entry.isDirectory()).sort((left, right) => left.name.localeCompare(right.name, "zh-CN")).map((chapter) => ({
        text: extractTitle(
          `${partDir}/${chapter.name}/index.md`,
          chapter.name
        ),
        link: route(part.name, chapter.name)
      }));
      items.push({
        text: partTitle,
        collapsed: false,
        items: children
      });
    }
    return items;
  })()
};
var casesDirectory = fileURLToPath(
  new URL("../cases/submissions/", __vite_injected_original_import_meta_url)
);
var caseItems = readdirSync(casesDirectory, { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => {
  const markdown = readFileSync(
    new URL(`../cases/submissions/${entry.name}/index.md`, __vite_injected_original_import_meta_url),
    "utf8"
  );
  const frontmatter = markdown.match(/^---\s*\n([\s\S]*?)\n---/)?.[1] || "";
  const readField = (field) => frontmatter.match(new RegExp(`^${field}:\\s*(.+)$`, "m"))?.[1]?.trim().replace(/^['"]|['"]$/g, "") || "";
  return {
    date: readField("date"),
    item: {
      text: readField("title") || entry.name,
      link: encodeURI(`/cases/submissions/${entry.name}/`)
    }
  };
}).sort((left, right) => left.date.localeCompare(right.date)).map(({ item: caseItem }) => caseItem);
var casesSidebar = [
  { text: "\u6848\u4F8B\u9996\u9875", link: "/cases/" },
  { text: "\u5982\u4F55\u63D0\u4EA4", link: "/community/case-contributing" },
  {
    text: "\u6848\u4F8B\u5217\u8868",
    collapsed: false,
    items: caseItems
  }
];
var siteSidebar = {
  ...bluebookSidebar,
  "/cases/": casesSidebar,
  "/community/case-contributing": casesSidebar
};

// docs/.vitepress/mermaid-markdown.ts
function configureMermaidMarkdown(md) {
  const fallbackFence = md.renderer.rules.fence?.bind(md.renderer.rules);
  md.renderer.rules.fence = (tokens, index, options, env, self) => {
    const token = tokens[index];
    if (token.info.trim() !== "mermaid") {
      return fallbackFence?.(tokens, index, options, env, self) ?? self.renderToken(tokens, index, options);
    }
    const graph = encodeURIComponent(token.content);
    return `<MermaidDiagram graph="${graph}" />`;
  };
}

// docs/.vitepress/seo.ts
import { readFileSync as readFileSync2 } from "node:fs";
import { resolve } from "node:path";
var SITE_NAME = "WorkBuddyHelper";
var SITE_ALTERNATE_NAME = "WorkBuddyHelper";
var ORGANIZATION_NAME = "WorkBuddyHelper";
var GITHUB_URL = "https://github.com/";
var DEFAULT_DESCRIPTION = "WorkBuddyHelper\uFF1A\u4E13\u6CE8\u4E8E Java\u3001Spring Boot \u4E0E\u540E\u7AEF\u5F00\u53D1\u7684\u6280\u672F\u535A\u5BA2\u4E0E\u77E5\u8BC6\u5E93\u3002";
function cleanPagePath(page) {
  if (page === "index.md") return "/";
  if (page.endsWith("/index.md")) {
    return `/${page.slice(0, -"index.md".length)}`;
  }
  return `/${page.replace(/\.md$/, "")}`;
}
function absolutePageUrl(siteUrl2, page) {
  return new URL(cleanPagePath(page), `${siteUrl2}/`).href;
}
function stripMarkdown(value) {
  return value.replace(/!\[[^\]]*\]\([^)]*\)/g, "").replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").replace(/<[^>]+>/g, "").replace(/[`*_~]/g, "").replace(/\\([\\`*{}\[\]()#+\-.!_>])/g, "$1").replace(/\s+/g, " ").trim();
}
function decodeHtmlEntities(value) {
  return value.replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(
    /&#(\d+);/g,
    (_, codePoint) => String.fromCodePoint(Number(codePoint))
  ).replace(
    /&#x([0-9a-f]+);/gi,
    (_, codePoint) => String.fromCodePoint(Number.parseInt(codePoint, 16))
  );
}
function truncateDescription(value, maxLength = 155) {
  const characters = Array.from(value);
  if (characters.length <= maxLength) return value;
  const shortened = characters.slice(0, maxLength).join("");
  const punctuationIndex = Math.max(
    shortened.lastIndexOf("\u3002"),
    shortened.lastIndexOf("\uFF1B"),
    shortened.lastIndexOf("\uFF0C")
  );
  return `${punctuationIndex >= Math.floor(maxLength * 0.65) ? shortened.slice(0, punctuationIndex) : shortened}\u2026`;
}
function extractDescription(markdown, fallback) {
  const mainStart = markdown.indexOf("<main");
  const mainEnd = mainStart >= 0 ? markdown.indexOf("</main>", mainStart) : -1;
  const pageContent = mainStart >= 0 && mainEnd > mainStart ? markdown.slice(mainStart, mainEnd) : markdown;
  const htmlParagraphs = Array.from(
    pageContent.matchAll(/<p(?:\s[^>]*)?>([\s\S]*?)<\/p>/gi),
    (match) => decodeHtmlEntities(stripMarkdown(match[1]))
  ).filter((paragraph) => Array.from(paragraph).length >= 12);
  if (htmlParagraphs.length > 0) {
    const selected = [];
    for (const paragraph of htmlParagraphs) {
      selected.push(paragraph);
      if (Array.from(selected.join(" ")).length >= 90) break;
    }
    return truncateDescription(selected.join(" "));
  }
  const content = markdown.replace(
    /^---\s*[\r\n]+[\s\S]*?[\r\n]+---\s*[\r\n]+/,
    ""
  );
  const candidates = [];
  for (const block of content.split(/\r?\n\s*\r?\n/)) {
    const trimmed = block.trim();
    if (!trimmed || trimmed.startsWith("#") || trimmed.startsWith("```") || trimmed.startsWith("~~~") || trimmed.startsWith("import ") || trimmed.startsWith("export ") || trimmed.startsWith("<!--") || trimmed.startsWith("<") || trimmed.startsWith("|") || /^[-*+]\s/.test(trimmed) || /^\d+[.)]\s/.test(trimmed)) {
      continue;
    }
    const plainText = stripMarkdown(trimmed);
    if (Array.from(plainText).length < 12) continue;
    candidates.push(plainText);
    if (Array.from(candidates.join(" ")).length >= 90) break;
  }
  return truncateDescription(candidates.join(" ") || fallback || DEFAULT_DESCRIPTION);
}
function breadcrumbName(segment) {
  let decodedSegment = segment;
  try {
    decodedSegment = decodeURIComponent(segment);
  } catch {
  }
  const labels = {
    bluebook: "\u6587\u7AE0",
    cases: "\u6848\u4F8B",
    community: "\u793E\u533A",
    help: "\u5E2E\u52A9",
    "reading-guide": "\u5173\u4E8E"
  };
  return labels[decodedSegment] || decodedSegment.replace(/[-_]/g, " ");
}
function createBreadcrumbs(siteUrl2, page, pageTitle, canonicalUrl) {
  const path = cleanPagePath(page).replace(/^\/|\/$/g, "");
  if (!path) return null;
  const segments = path.split("/");
  const itemListElement = [
    {
      "@type": "ListItem",
      position: 1,
      name: "\u9996\u9875",
      item: new URL("/", `${siteUrl2}/`).href
    },
    ...segments.map((segment, index) => {
      const isLast = index === segments.length - 1;
      const parentPath = `/${segments.slice(0, index + 1).join("/")}/`;
      return {
        "@type": "ListItem",
        position: index + 2,
        name: isLast ? pageTitle : breadcrumbName(segment),
        item: isLast ? canonicalUrl : new URL(parentPath, `${siteUrl2}/`).href
      };
    })
  ];
  return {
    "@type": "BreadcrumbList",
    "@id": `${canonicalUrl}#breadcrumb`,
    itemListElement
  };
}
function serializeJsonLd(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
function createPageDescription(sourceDirectory, pageData) {
  if (pageData.description || pageData.isNotFound || !pageData.filePath) {
    return pageData.description || void 0;
  }
  const fallback = `${pageData.title}\uFF1A${DEFAULT_DESCRIPTION}`;
  try {
    const markdown = readFileSync2(
      resolve(sourceDirectory, pageData.filePath),
      "utf8"
    );
    return extractDescription(markdown, fallback);
  } catch {
    return truncateDescription(fallback);
  }
}
function createSeoHead(siteUrl2, context) {
  const { page, pageData, title, content } = context;
  if (pageData.isNotFound) {
    return [
      ["meta", { name: "robots", content: "noindex, nofollow" }]
    ];
  }
  const canonicalUrl = absolutePageUrl(siteUrl2, page);
  const socialImageUrl = new URL("/og/workbuddy-guide.png", `${siteUrl2}/`).href;
  const description = pageData.description ? truncateDescription(pageData.description) : extractDescription(
    content,
    `${pageData.title}\uFF1A${context.description || DEFAULT_DESCRIPTION}`
  );
  const isHome = page === "index.md";
  const isBluebookPage = page.startsWith("bluebook/");
  const modifiedTime = pageData.lastUpdated ? new Date(pageData.lastUpdated).toISOString() : void 0;
  const organization = {
    "@type": "Organization",
    "@id": `${siteUrl2}/#organization`,
    name: ORGANIZATION_NAME,
    url: `${siteUrl2}/`,
    sameAs: [GITHUB_URL]
  };
  const website = {
    "@type": "WebSite",
    "@id": `${siteUrl2}/#website`,
    url: `${siteUrl2}/`,
    name: SITE_NAME,
    alternateName: SITE_ALTERNATE_NAME,
    description: DEFAULT_DESCRIPTION,
    inLanguage: "zh-CN",
    publisher: { "@id": `${siteUrl2}/#organization` }
  };
  const breadcrumbTitle = typeof pageData.frontmatter.breadcrumbTitle === "string" ? pageData.frontmatter.breadcrumbTitle : pageData.title;
  const breadcrumbs = createBreadcrumbs(
    siteUrl2,
    page,
    breadcrumbTitle,
    canonicalUrl
  );
  const pageEntity = isHome ? null : {
    "@type": isBluebookPage ? "Article" : "WebPage",
    "@id": `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: pageData.title,
    ...isBluebookPage ? { headline: pageData.title } : {},
    description,
    inLanguage: "zh-CN",
    isPartOf: { "@id": `${siteUrl2}/#website` },
    breadcrumb: breadcrumbs ? { "@id": `${canonicalUrl}#breadcrumb` } : void 0,
    ...isBluebookPage ? {
      mainEntityOfPage: canonicalUrl,
      image: [socialImageUrl],
      author: { "@id": `${siteUrl2}/#organization` },
      publisher: { "@id": `${siteUrl2}/#organization` }
    } : {},
    ...modifiedTime ? { dateModified: modifiedTime } : {}
  };
  const jsonLdGraph = [organization, website, pageEntity, breadcrumbs].filter(
    Boolean
  );
  const head = [
    ["meta", { name: "description", content: description }],
    [
      "meta",
      {
        name: "robots",
        content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      }
    ],
    ["link", { rel: "canonical", href: canonicalUrl }],
    ["meta", { property: "og:locale", content: "zh_CN" }],
    ["meta", { property: "og:site_name", content: SITE_NAME }],
    ["meta", { property: "og:type", content: isBluebookPage ? "article" : "website" }],
    ["meta", { property: "og:title", content: title }],
    ["meta", { property: "og:description", content: description }],
    ["meta", { property: "og:url", content: canonicalUrl }],
    ["meta", { property: "og:image", content: socialImageUrl }],
    ["meta", { property: "og:image:type", content: "image/png" }],
    ["meta", { property: "og:image:width", content: "1280" }],
    ["meta", { property: "og:image:height", content: "720" }],
    ["meta", { property: "og:image:alt", content: "WorkBuddyHelper \u9996\u9875\u9884\u89C8" }],
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    ["meta", { name: "twitter:title", content: title }],
    ["meta", { name: "twitter:description", content: description }],
    ["meta", { name: "twitter:image", content: socialImageUrl }],
    ["meta", { name: "twitter:image:alt", content: "WorkBuddyHelper \u9996\u9875\u9884\u89C8" }],
    [
      "script",
      { type: "application/ld+json" },
      serializeJsonLd({ "@context": "https://schema.org", "@graph": jsonLdGraph })
    ]
  ];
  if (modifiedTime && isBluebookPage) {
    head.push([
      "meta",
      { property: "article:modified_time", content: modifiedTime }
    ]);
  }
  return head;
}

// docs/.vitepress/config.mts
var siteUrl = process.env.VITEPRESS_SITE_URL || "https://workbuddyhelper.example.com";
var config_default = defineConfig({
  lang: "zh-CN",
  title: "WorkBuddyHelper",
  titleTemplate: ":title \xB7 WorkBuddyHelper",
  description: "WorkBuddyHelper\uFF1A\u4E13\u6CE8\u4E8E Java\u3001Spring Boot \u4E0E\u540E\u7AEF\u5F00\u53D1\u7684\u6280\u672F\u535A\u5BA2\u4E0E\u77E5\u8BC6\u5E93\u3002",
  cleanUrls: true,
  lastUpdated: true,
  srcExclude: ["**/source.md", "plans/**"],
  sitemap: {
    hostname: siteUrl
  },
  transformPageData: (pageData, { siteConfig }) => {
    if (pageData.relativePath.startsWith("cases/")) {
      pageData.frontmatter.aside = false;
      pageData.frontmatter.outline = false;
    }
    return {
      description: createPageDescription(siteConfig.srcDir, pageData)
    };
  },
  transformHead: (context) => createSeoHead(siteUrl, context),
  head: [
    ["link", { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
    ["meta", { name: "theme-color", content: "#2563eb" }],
    ["meta", { name: "author", content: "WorkBuddyHelper" }],
    [
      "meta",
      {
        name: "keywords",
        content: "Java,Spring Boot,\u540E\u7AEF\u5F00\u53D1,\u6280\u672F\u535A\u5BA2,\u77E5\u8BC6\u5E93,\u5FAE\u670D\u52A1,\u6570\u636E\u5E93,\u4E2D\u95F4\u4EF6"
      }
    ]
  ],
  markdown: {
    config: configureMermaidMarkdown,
    image: {
      lazyLoading: true
    },
    theme: {
      light: "github-light",
      dark: "github-dark"
    }
  },
  themeConfig: {
    siteTitle: "WorkBuddyHelper",
    nav: [
      { text: "\u9996\u9875", link: "/" },
      { text: "\u6587\u7AE0", link: "/bluebook/" },
      { text: "\u5173\u4E8E", link: "/reading-guide" }
    ],
    sidebar: siteSidebar,
    socialLinks: [
      { icon: "github", link: "https://github.com/" }
    ],
    search: {
      provider: "local"
    },
    outline: {
      level: [2, 3],
      label: "\u672C\u9875\u76EE\u5F55"
    },
    docFooter: {
      prev: "\u4E0A\u4E00\u7BC7",
      next: "\u4E0B\u4E00\u7BC7"
    },
    lastUpdated: {
      text: "\u6700\u540E\u66F4\u65B0",
      formatOptions: {
        dateStyle: "medium",
        timeStyle: "short"
      }
    },
    footer: {
      message: "WorkBuddyHelper \xB7 \u4E13\u6CE8\u4E8E Java \u4E0E\u540E\u7AEF\u5F00\u53D1\u7684\u6280\u672F\u535A\u5BA2\u4E0E\u77E5\u8BC6\u5E93",
      copyright: "Copyright \xA9 2026 WorkBuddyHelper"
    }
  }
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZG9jcy8udml0ZXByZXNzL2NvbmZpZy5tdHMiLCAiZG9jcy8udml0ZXByZXNzL3NpZGViYXIudHMiLCAiZG9jcy8udml0ZXByZXNzL21lcm1haWQtbWFya2Rvd24udHMiLCAiZG9jcy8udml0ZXByZXNzL3Nlby50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXDNcXFxcV29ya0J1ZGR5R3VpZGUtbWFpblxcXFxkb2NzXFxcXC52aXRlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXDNcXFxcV29ya0J1ZGR5R3VpZGUtbWFpblxcXFxkb2NzXFxcXC52aXRlcHJlc3NcXFxcY29uZmlnLm10c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovMy9Xb3JrQnVkZHlHdWlkZS1tYWluL2RvY3MvLnZpdGVwcmVzcy9jb25maWcubXRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVwcmVzc1wiO1xuXG5pbXBvcnQgeyBzaXRlU2lkZWJhciB9IGZyb20gXCIuL3NpZGViYXJcIjtcbmltcG9ydCB7IGNvbmZpZ3VyZU1lcm1haWRNYXJrZG93biB9IGZyb20gXCIuL21lcm1haWQtbWFya2Rvd25cIjtcbmltcG9ydCB7IGNyZWF0ZVBhZ2VEZXNjcmlwdGlvbiwgY3JlYXRlU2VvSGVhZCB9IGZyb20gXCIuL3Nlb1wiO1xuXG5jb25zdCBzaXRlVXJsID0gcHJvY2Vzcy5lbnYuVklURVBSRVNTX1NJVEVfVVJMIHx8IFwiaHR0cHM6Ly93b3JrYnVkZHloZWxwZXIuZXhhbXBsZS5jb21cIjtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgICBsYW5nOiBcInpoLUNOXCIsXG4gICAgdGl0bGU6IFwiV29ya0J1ZGR5SGVscGVyXCIsXG4gICAgdGl0bGVUZW1wbGF0ZTogXCI6dGl0bGUgXHUwMEI3IFdvcmtCdWRkeUhlbHBlclwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIldvcmtCdWRkeUhlbHBlclx1RkYxQVx1NEUxM1x1NkNFOFx1NEU4RSBKYXZhXHUzMDAxU3ByaW5nIEJvb3QgXHU0RTBFXHU1NDBFXHU3QUVGXHU1RjAwXHU1M0QxXHU3Njg0XHU2MjgwXHU2NzJGXHU1MzVBXHU1QkEyXHU0RTBFXHU3N0U1XHU4QkM2XHU1RTkzXHUzMDAyXCIsXG4gICAgY2xlYW5VcmxzOiB0cnVlLFxuICAgIGxhc3RVcGRhdGVkOiB0cnVlLFxuICAgIHNyY0V4Y2x1ZGU6IFtcIioqL3NvdXJjZS5tZFwiLCBcInBsYW5zLyoqXCJdLFxuICAgIHNpdGVtYXA6IHtcbiAgICAgIGhvc3RuYW1lOiBzaXRlVXJsLFxuICAgIH0sXG4gICAgdHJhbnNmb3JtUGFnZURhdGE6IChwYWdlRGF0YSwgeyBzaXRlQ29uZmlnIH0pID0+IHtcbiAgICAgIGlmIChwYWdlRGF0YS5yZWxhdGl2ZVBhdGguc3RhcnRzV2l0aChcImNhc2VzL1wiKSkge1xuICAgICAgICBwYWdlRGF0YS5mcm9udG1hdHRlci5hc2lkZSA9IGZhbHNlO1xuICAgICAgICBwYWdlRGF0YS5mcm9udG1hdHRlci5vdXRsaW5lID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiBjcmVhdGVQYWdlRGVzY3JpcHRpb24oc2l0ZUNvbmZpZy5zcmNEaXIsIHBhZ2VEYXRhKSxcbiAgICAgIH07XG4gICAgfSxcbiAgICB0cmFuc2Zvcm1IZWFkOiAoY29udGV4dCkgPT4gY3JlYXRlU2VvSGVhZChzaXRlVXJsLCBjb250ZXh0KSxcbiAgICBoZWFkOiBbXG4gICAgICBbXCJsaW5rXCIsIHsgcmVsOiBcImljb25cIiwgdHlwZTogXCJpbWFnZS9zdmcreG1sXCIsIGhyZWY6IFwiL2Zhdmljb24uc3ZnXCIgfV0sXG4gICAgICBbXCJtZXRhXCIsIHsgbmFtZTogXCJ0aGVtZS1jb2xvclwiLCBjb250ZW50OiBcIiMyNTYzZWJcIiB9XSxcbiAgICAgIFtcIm1ldGFcIiwgeyBuYW1lOiBcImF1dGhvclwiLCBjb250ZW50OiBcIldvcmtCdWRkeUhlbHBlclwiIH1dLFxuICAgICAgW1xuICAgICAgICBcIm1ldGFcIixcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6IFwia2V5d29yZHNcIixcbiAgICAgICAgICBjb250ZW50OlxuICAgICAgICAgICAgXCJKYXZhLFNwcmluZyBCb290LFx1NTQwRVx1N0FFRlx1NUYwMFx1NTNEMSxcdTYyODBcdTY3MkZcdTUzNUFcdTVCQTIsXHU3N0U1XHU4QkM2XHU1RTkzLFx1NUZBRVx1NjcwRFx1NTJBMSxcdTY1NzBcdTYzNkVcdTVFOTMsXHU0RTJEXHU5NUY0XHU0RUY2XCIsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIF0sXG4gICAgbWFya2Rvd246IHtcbiAgICAgIGNvbmZpZzogY29uZmlndXJlTWVybWFpZE1hcmtkb3duLFxuICAgICAgaW1hZ2U6IHtcbiAgICAgICAgbGF6eUxvYWRpbmc6IHRydWUsXG4gICAgICB9LFxuICAgICAgdGhlbWU6IHtcbiAgICAgICAgbGlnaHQ6IFwiZ2l0aHViLWxpZ2h0XCIsXG4gICAgICAgIGRhcms6IFwiZ2l0aHViLWRhcmtcIixcbiAgICAgIH0sXG4gICAgfSxcbiAgICB0aGVtZUNvbmZpZzoge1xuICAgICAgc2l0ZVRpdGxlOiBcIldvcmtCdWRkeUhlbHBlclwiLFxuICAgICAgbmF2OiBbXG4gICAgICAgIHsgdGV4dDogXCJcdTk5OTZcdTk4NzVcIiwgbGluazogXCIvXCIgfSxcbiAgICAgICAgeyB0ZXh0OiBcIlx1NjU4N1x1N0FFMFwiLCBsaW5rOiBcIi9ibHVlYm9vay9cIiB9LFxuICAgICAgICB7IHRleHQ6IFwiXHU1MTczXHU0RThFXCIsIGxpbms6IFwiL3JlYWRpbmctZ3VpZGVcIiB9LFxuICAgICAgXSxcbiAgICAgIHNpZGViYXI6IHNpdGVTaWRlYmFyLFxuICAgICAgc29jaWFsTGlua3M6IFtcbiAgICAgICAgeyBpY29uOiBcImdpdGh1YlwiLCBsaW5rOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9cIiB9LFxuICAgICAgXSxcbiAgICAgIHNlYXJjaDoge1xuICAgICAgICBwcm92aWRlcjogXCJsb2NhbFwiLFxuICAgICAgfSxcbiAgICAgIG91dGxpbmU6IHtcbiAgICAgICAgbGV2ZWw6IFsyLCAzXSxcbiAgICAgICAgbGFiZWw6IFwiXHU2NzJDXHU5ODc1XHU3NkVFXHU1RjU1XCIsXG4gICAgICB9LFxuICAgICAgZG9jRm9vdGVyOiB7XG4gICAgICAgIHByZXY6IFwiXHU0RTBBXHU0RTAwXHU3QkM3XCIsXG4gICAgICAgIG5leHQ6IFwiXHU0RTBCXHU0RTAwXHU3QkM3XCIsXG4gICAgICB9LFxuICAgICAgbGFzdFVwZGF0ZWQ6IHtcbiAgICAgICAgdGV4dDogXCJcdTY3MDBcdTU0MEVcdTY2RjRcdTY1QjBcIixcbiAgICAgICAgZm9ybWF0T3B0aW9uczoge1xuICAgICAgICAgIGRhdGVTdHlsZTogXCJtZWRpdW1cIixcbiAgICAgICAgICB0aW1lU3R5bGU6IFwic2hvcnRcIixcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBmb290ZXI6IHtcbiAgICAgICAgbWVzc2FnZTpcbiAgICAgICAgICBcIldvcmtCdWRkeUhlbHBlciBcdTAwQjcgXHU0RTEzXHU2Q0U4XHU0RThFIEphdmEgXHU0RTBFXHU1NDBFXHU3QUVGXHU1RjAwXHU1M0QxXHU3Njg0XHU2MjgwXHU2NzJGXHU1MzVBXHU1QkEyXHU0RTBFXHU3N0U1XHU4QkM2XHU1RTkzXCIsXG4gICAgICAgIGNvcHlyaWdodDogXCJDb3B5cmlnaHQgXHUwMEE5IDIwMjYgV29ya0J1ZGR5SGVscGVyXCIsXG4gICAgICB9LFxuICAgIH0sXG4gIH0pO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFwzXFxcXFdvcmtCdWRkeUd1aWRlLW1haW5cXFxcZG9jc1xcXFwudml0ZXByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFwzXFxcXFdvcmtCdWRkeUd1aWRlLW1haW5cXFxcZG9jc1xcXFwudml0ZXByZXNzXFxcXHNpZGViYXIudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6LzMvV29ya0J1ZGR5R3VpZGUtbWFpbi9kb2NzLy52aXRlcHJlc3Mvc2lkZWJhci50c1wiO2ltcG9ydCB7IHJlYWRGaWxlU3luYywgcmVhZGRpclN5bmMgfSBmcm9tIFwibm9kZTpmc1wiO1xuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCB9IGZyb20gXCJub2RlOnVybFwiO1xuXG5pbXBvcnQgdHlwZSB7IERlZmF1bHRUaGVtZSB9IGZyb20gXCJ2aXRlcHJlc3NcIjtcblxuY29uc3Qgcm91dGUgPSAoLi4uc2VnbWVudHM6IHN0cmluZ1tdKTogc3RyaW5nID0+XG4gIGVuY29kZVVSSShgL2JsdWVib29rLyR7c2VnbWVudHMubWFwKChzZWdtZW50KSA9PiBzZWdtZW50LnRyaW0oKSkuam9pbihcIi9cIil9L2ApO1xuXG4vLyBcdTRFQ0UgaW5kZXgubWQgXHU2M0QwXHU1M0Q2XHU0RTAwXHU3RUE3XHU2ODA3XHU5ODk4XHU0RjVDXHU0RTNBXHU0RkE3XHU4RkI5XHU2ODBGXHU2NjNFXHU3OTNBXHU2NTg3XHU1QjU3XHVGRjBDXHU1NkRFXHU5MDAwXHU1MjMwXHU3NkVFXHU1RjU1XHU1NDBEXG5jb25zdCBleHRyYWN0VGl0bGUgPSAoaW5kZXhNZFBhdGg6IHN0cmluZywgZmFsbGJhY2s6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgbWFya2Rvd24gPSByZWFkRmlsZVN5bmMoaW5kZXhNZFBhdGgsIFwidXRmOFwiKTtcbiAgICBjb25zdCBoMSA9IG1hcmtkb3duLm1hdGNoKC9eI1xccysoLispJC9tKT8uWzFdPy50cmltKCk7XG4gICAgcmV0dXJuIGgxIHx8IGZhbGxiYWNrO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gZmFsbGJhY2s7XG4gIH1cbn07XG5cbmNvbnN0IGJsdWVib29rRGlyZWN0b3J5ID0gZmlsZVVSTFRvUGF0aChcbiAgbmV3IFVSTChcIi4uL2JsdWVib29rL1wiLCBpbXBvcnQubWV0YS51cmwpLFxuKTtcblxuLy8gXHU2MzkyXHU5NjY0XHU3Njg0XHU2NUU3XHU1MTg1XHU1QkI5XHU3NkVFXHU1RjU1XHVGRjA4XHU1RjUyXHU2ODYzXHU3Njg0IFdvcmtCdWRkeSBcdTY1NTlcdTdBMEJcdTdCQzdcdTc2RUVcdUZGMDlcbmNvbnN0IExFR0FDWV9ESVJTID0gbmV3IFNldChbXCJcdTk2NDRcdTVGNTVcIl0pO1xuXG4vLyBcdTgxRUFcdTUyQThcdTYyNkJcdTYzQ0YgYmx1ZWJvb2svIFx1NEUwQlx1NzY4NFx1NTIwNlx1N0M3Qlx1NzZFRVx1NUY1NVx1NTNDQVx1NTE3Nlx1NjU4N1x1N0FFMFx1NzZFRVx1NUY1NVx1RkYwQ1x1NzUxRlx1NjIxMFx1NEZBN1x1OEZCOVx1NjgwRlx1MzAwMlxuLy8gXHU2NUU3IFdvcmtCdWRkeSBcdTdCQzdcdTc2RUVcdTVGNTVcdUZGMDhcdTRFRTVcIlx1N0IyQ1wiXHU1RjAwXHU1OTM0XHVGRjA5XHU0RTBFXCJcdTk2NDRcdTVGNTVcIlx1NEUwRFx1N0VCM1x1NTE2NVx1NEZBN1x1OEZCOVx1NjgwRlx1MzAwMlxuY29uc3QgYmx1ZWJvb2tTaWRlYmFyOiBEZWZhdWx0VGhlbWUuU2lkZWJhciA9IHtcbiAgXCIvYmx1ZWJvb2svXCI6ICgoKSA9PiB7XG4gICAgY29uc3QgaXRlbXM6IERlZmF1bHRUaGVtZS5TaWRlYmFySXRlbVtdID0gW1xuICAgICAgeyB0ZXh0OiBcIlx1NjU4N1x1N0FFMFx1NjAzQlx1ODlDOFwiLCBsaW5rOiBcIi9ibHVlYm9vay9cIiB9LFxuICAgIF07XG5cbiAgICBjb25zdCBwYXJ0cyA9IHJlYWRkaXJTeW5jKGJsdWVib29rRGlyZWN0b3J5LCB7IHdpdGhGaWxlVHlwZXM6IHRydWUgfSlcbiAgICAgIC5maWx0ZXIoXG4gICAgICAgIChlbnRyeSkgPT5cbiAgICAgICAgICBlbnRyeS5pc0RpcmVjdG9yeSgpICYmXG4gICAgICAgICAgIUxFR0FDWV9ESVJTLmhhcyhlbnRyeS5uYW1lKSAmJlxuICAgICAgICAgICFlbnRyeS5uYW1lLnN0YXJ0c1dpdGgoXCJcdTdCMkNcIiksXG4gICAgICApXG4gICAgICAuc29ydCgobGVmdCwgcmlnaHQpID0+IGxlZnQubmFtZS5sb2NhbGVDb21wYXJlKHJpZ2h0Lm5hbWUsIFwiemgtQ05cIikpO1xuXG4gICAgZm9yIChjb25zdCBwYXJ0IG9mIHBhcnRzKSB7XG4gICAgICBjb25zdCBwYXJ0RGlyID0gYCR7Ymx1ZWJvb2tEaXJlY3Rvcnl9JHtwYXJ0Lm5hbWV9YDtcbiAgICAgIGNvbnN0IHBhcnRUaXRsZSA9IGV4dHJhY3RUaXRsZShcbiAgICAgICAgYCR7cGFydERpcn0vaW5kZXgubWRgLFxuICAgICAgICBwYXJ0Lm5hbWUsXG4gICAgICApO1xuXG4gICAgICBjb25zdCBjaGlsZHJlbiA9IHJlYWRkaXJTeW5jKHBhcnREaXIsIHsgd2l0aEZpbGVUeXBlczogdHJ1ZSB9KVxuICAgICAgICAuZmlsdGVyKChlbnRyeSkgPT4gZW50cnkuaXNEaXJlY3RvcnkoKSlcbiAgICAgICAgLnNvcnQoKGxlZnQsIHJpZ2h0KSA9PiBsZWZ0Lm5hbWUubG9jYWxlQ29tcGFyZShyaWdodC5uYW1lLCBcInpoLUNOXCIpKVxuICAgICAgICAubWFwKChjaGFwdGVyKSA9PiAoe1xuICAgICAgICAgIHRleHQ6IGV4dHJhY3RUaXRsZShcbiAgICAgICAgICAgIGAke3BhcnREaXJ9LyR7Y2hhcHRlci5uYW1lfS9pbmRleC5tZGAsXG4gICAgICAgICAgICBjaGFwdGVyLm5hbWUsXG4gICAgICAgICAgKSxcbiAgICAgICAgICBsaW5rOiByb3V0ZShwYXJ0Lm5hbWUsIGNoYXB0ZXIubmFtZSksXG4gICAgICAgIH0pKTtcblxuICAgICAgaXRlbXMucHVzaCh7XG4gICAgICAgIHRleHQ6IHBhcnRUaXRsZSxcbiAgICAgICAgY29sbGFwc2VkOiBmYWxzZSxcbiAgICAgICAgaXRlbXM6IGNoaWxkcmVuLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGl0ZW1zO1xuICB9KSgpLFxufTtcblxuY29uc3QgY2FzZXNEaXJlY3RvcnkgPSBmaWxlVVJMVG9QYXRoKFxuICBuZXcgVVJMKFwiLi4vY2FzZXMvc3VibWlzc2lvbnMvXCIsIGltcG9ydC5tZXRhLnVybCksXG4pO1xuXG5jb25zdCBjYXNlSXRlbXMgPSByZWFkZGlyU3luYyhjYXNlc0RpcmVjdG9yeSwgeyB3aXRoRmlsZVR5cGVzOiB0cnVlIH0pXG4gIC5maWx0ZXIoKGVudHJ5KSA9PiBlbnRyeS5pc0RpcmVjdG9yeSgpKVxuICAubWFwKChlbnRyeSkgPT4ge1xuICAgIGNvbnN0IG1hcmtkb3duID0gcmVhZEZpbGVTeW5jKFxuICAgICAgbmV3IFVSTChgLi4vY2FzZXMvc3VibWlzc2lvbnMvJHtlbnRyeS5uYW1lfS9pbmRleC5tZGAsIGltcG9ydC5tZXRhLnVybCksXG4gICAgICBcInV0ZjhcIixcbiAgICApO1xuICAgIGNvbnN0IGZyb250bWF0dGVyID0gbWFya2Rvd24ubWF0Y2goL14tLS1cXHMqXFxuKFtcXHNcXFNdKj8pXFxuLS0tLyk/LlsxXSB8fCBcIlwiO1xuICAgIGNvbnN0IHJlYWRGaWVsZCA9IChmaWVsZDogc3RyaW5nKTogc3RyaW5nID0+XG4gICAgICBmcm9udG1hdHRlclxuICAgICAgICAubWF0Y2gobmV3IFJlZ0V4cChgXiR7ZmllbGR9OlxcXFxzKiguKykkYCwgXCJtXCIpKT8uWzFdXG4gICAgICAgID8udHJpbSgpXG4gICAgICAgIC5yZXBsYWNlKC9eWydcIl18WydcIl0kL2csIFwiXCIpIHx8IFwiXCI7XG5cbiAgICByZXR1cm4ge1xuICAgICAgZGF0ZTogcmVhZEZpZWxkKFwiZGF0ZVwiKSxcbiAgICAgIGl0ZW06IHtcbiAgICAgICAgdGV4dDogcmVhZEZpZWxkKFwidGl0bGVcIikgfHwgZW50cnkubmFtZSxcbiAgICAgICAgbGluazogZW5jb2RlVVJJKGAvY2FzZXMvc3VibWlzc2lvbnMvJHtlbnRyeS5uYW1lfS9gKSxcbiAgICAgIH0gc2F0aXNmaWVzIERlZmF1bHRUaGVtZS5TaWRlYmFySXRlbSxcbiAgICB9O1xuICB9KVxuICAuc29ydCgobGVmdCwgcmlnaHQpID0+IGxlZnQuZGF0ZS5sb2NhbGVDb21wYXJlKHJpZ2h0LmRhdGUpKVxuICAubWFwKCh7IGl0ZW06IGNhc2VJdGVtIH0pID0+IGNhc2VJdGVtKTtcblxuY29uc3QgY2FzZXNTaWRlYmFyOiBEZWZhdWx0VGhlbWUuU2lkZWJhckl0ZW1bXSA9IFtcbiAgeyB0ZXh0OiBcIlx1Njg0OFx1NEY4Qlx1OTk5Nlx1OTg3NVwiLCBsaW5rOiBcIi9jYXNlcy9cIiB9LFxuICB7IHRleHQ6IFwiXHU1OTgyXHU0RjU1XHU2M0QwXHU0RUE0XCIsIGxpbms6IFwiL2NvbW11bml0eS9jYXNlLWNvbnRyaWJ1dGluZ1wiIH0sXG4gIHtcbiAgICB0ZXh0OiBcIlx1Njg0OFx1NEY4Qlx1NTIxN1x1ODg2OFwiLFxuICAgIGNvbGxhcHNlZDogZmFsc2UsXG4gICAgaXRlbXM6IGNhc2VJdGVtcyxcbiAgfSxcbl07XG5cbmV4cG9ydCBjb25zdCBzaXRlU2lkZWJhcjogRGVmYXVsdFRoZW1lLlNpZGViYXIgPSB7XG4gIC4uLmJsdWVib29rU2lkZWJhcixcbiAgXCIvY2FzZXMvXCI6IGNhc2VzU2lkZWJhcixcbiAgXCIvY29tbXVuaXR5L2Nhc2UtY29udHJpYnV0aW5nXCI6IGNhc2VzU2lkZWJhcixcbn07XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXDNcXFxcV29ya0J1ZGR5R3VpZGUtbWFpblxcXFxkb2NzXFxcXC52aXRlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXDNcXFxcV29ya0J1ZGR5R3VpZGUtbWFpblxcXFxkb2NzXFxcXC52aXRlcHJlc3NcXFxcbWVybWFpZC1tYXJrZG93bi50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovMy9Xb3JrQnVkZHlHdWlkZS1tYWluL2RvY3MvLnZpdGVwcmVzcy9tZXJtYWlkLW1hcmtkb3duLnRzXCI7aW1wb3J0IHR5cGUgTWFya2Rvd25JdCBmcm9tIFwibWFya2Rvd24taXRcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbmZpZ3VyZU1lcm1haWRNYXJrZG93bihtZDogTWFya2Rvd25JdCkge1xuICBjb25zdCBmYWxsYmFja0ZlbmNlID0gbWQucmVuZGVyZXIucnVsZXMuZmVuY2U/LmJpbmQobWQucmVuZGVyZXIucnVsZXMpO1xuXG4gIG1kLnJlbmRlcmVyLnJ1bGVzLmZlbmNlID0gKHRva2VucywgaW5kZXgsIG9wdGlvbnMsIGVudiwgc2VsZikgPT4ge1xuICAgIGNvbnN0IHRva2VuID0gdG9rZW5zW2luZGV4XTtcblxuICAgIGlmICh0b2tlbi5pbmZvLnRyaW0oKSAhPT0gXCJtZXJtYWlkXCIpIHtcbiAgICAgIHJldHVybiBmYWxsYmFja0ZlbmNlPy4odG9rZW5zLCBpbmRleCwgb3B0aW9ucywgZW52LCBzZWxmKSA/PyBzZWxmLnJlbmRlclRva2VuKHRva2VucywgaW5kZXgsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGNvbnN0IGdyYXBoID0gZW5jb2RlVVJJQ29tcG9uZW50KHRva2VuLmNvbnRlbnQpO1xuICAgIHJldHVybiBgPE1lcm1haWREaWFncmFtIGdyYXBoPVwiJHtncmFwaH1cIiAvPmA7XG4gIH07XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXDNcXFxcV29ya0J1ZGR5R3VpZGUtbWFpblxcXFxkb2NzXFxcXC52aXRlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXDNcXFxcV29ya0J1ZGR5R3VpZGUtbWFpblxcXFxkb2NzXFxcXC52aXRlcHJlc3NcXFxcc2VvLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi8zL1dvcmtCdWRkeUd1aWRlLW1haW4vZG9jcy8udml0ZXByZXNzL3Nlby50c1wiO2ltcG9ydCB7IHJlYWRGaWxlU3luYyB9IGZyb20gXCJub2RlOmZzXCI7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcIm5vZGU6cGF0aFwiO1xuXG5pbXBvcnQgdHlwZSB7IEhlYWRDb25maWcsIFBhZ2VEYXRhLCBUcmFuc2Zvcm1Db250ZXh0IH0gZnJvbSBcInZpdGVwcmVzc1wiO1xuXG5jb25zdCBTSVRFX05BTUUgPSBcIldvcmtCdWRkeUhlbHBlclwiO1xuY29uc3QgU0lURV9BTFRFUk5BVEVfTkFNRSA9IFwiV29ya0J1ZGR5SGVscGVyXCI7XG5jb25zdCBPUkdBTklaQVRJT05fTkFNRSA9IFwiV29ya0J1ZGR5SGVscGVyXCI7XG5jb25zdCBHSVRIVUJfVVJMID0gXCJodHRwczovL2dpdGh1Yi5jb20vXCI7XG5jb25zdCBERUZBVUxUX0RFU0NSSVBUSU9OID1cbiAgXCJXb3JrQnVkZHlIZWxwZXJcdUZGMUFcdTRFMTNcdTZDRThcdTRFOEUgSmF2YVx1MzAwMVNwcmluZyBCb290IFx1NEUwRVx1NTQwRVx1N0FFRlx1NUYwMFx1NTNEMVx1NzY4NFx1NjI4MFx1NjcyRlx1NTM1QVx1NUJBMlx1NEUwRVx1NzdFNVx1OEJDNlx1NUU5M1x1MzAwMlwiO1xuXG5mdW5jdGlvbiBjbGVhblBhZ2VQYXRoKHBhZ2U6IHN0cmluZyk6IHN0cmluZyB7XG4gIGlmIChwYWdlID09PSBcImluZGV4Lm1kXCIpIHJldHVybiBcIi9cIjtcbiAgaWYgKHBhZ2UuZW5kc1dpdGgoXCIvaW5kZXgubWRcIikpIHtcbiAgICByZXR1cm4gYC8ke3BhZ2Uuc2xpY2UoMCwgLVwiaW5kZXgubWRcIi5sZW5ndGgpfWA7XG4gIH1cblxuICByZXR1cm4gYC8ke3BhZ2UucmVwbGFjZSgvXFwubWQkLywgXCJcIil9YDtcbn1cblxuZnVuY3Rpb24gYWJzb2x1dGVQYWdlVXJsKHNpdGVVcmw6IHN0cmluZywgcGFnZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIG5ldyBVUkwoY2xlYW5QYWdlUGF0aChwYWdlKSwgYCR7c2l0ZVVybH0vYCkuaHJlZjtcbn1cblxuZnVuY3Rpb24gc3RyaXBNYXJrZG93bih2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHZhbHVlXG4gICAgLnJlcGxhY2UoLyFcXFtbXlxcXV0qXFxdXFwoW14pXSpcXCkvZywgXCJcIilcbiAgICAucmVwbGFjZSgvXFxbKFteXFxdXSspXFxdXFwoW14pXSpcXCkvZywgXCIkMVwiKVxuICAgIC5yZXBsYWNlKC88W14+XSs+L2csIFwiXCIpXG4gICAgLnJlcGxhY2UoL1tgKl9+XS9nLCBcIlwiKVxuICAgIC5yZXBsYWNlKC9cXFxcKFtcXFxcYCp7fVxcW1xcXSgpIytcXC0uIV8+XSkvZywgXCIkMVwiKVxuICAgIC5yZXBsYWNlKC9cXHMrL2csIFwiIFwiKVxuICAgIC50cmltKCk7XG59XG5cbmZ1bmN0aW9uIGRlY29kZUh0bWxFbnRpdGllcyh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHZhbHVlXG4gICAgLnJlcGxhY2UoLyZuYnNwOy9nLCBcIiBcIilcbiAgICAucmVwbGFjZSgvJmFtcDsvZywgXCImXCIpXG4gICAgLnJlcGxhY2UoLyZxdW90Oy9nLCAnXCInKVxuICAgIC5yZXBsYWNlKC8mIzM5O3wmYXBvczsvZywgXCInXCIpXG4gICAgLnJlcGxhY2UoLyZsdDsvZywgXCI8XCIpXG4gICAgLnJlcGxhY2UoLyZndDsvZywgXCI+XCIpXG4gICAgLnJlcGxhY2UoLyYjKFxcZCspOy9nLCAoXywgY29kZVBvaW50OiBzdHJpbmcpID0+XG4gICAgICBTdHJpbmcuZnJvbUNvZGVQb2ludChOdW1iZXIoY29kZVBvaW50KSksXG4gICAgKVxuICAgIC5yZXBsYWNlKC8mI3goWzAtOWEtZl0rKTsvZ2ksIChfLCBjb2RlUG9pbnQ6IHN0cmluZykgPT5cbiAgICAgIFN0cmluZy5mcm9tQ29kZVBvaW50KE51bWJlci5wYXJzZUludChjb2RlUG9pbnQsIDE2KSksXG4gICAgKTtcbn1cblxuZnVuY3Rpb24gdHJ1bmNhdGVEZXNjcmlwdGlvbih2YWx1ZTogc3RyaW5nLCBtYXhMZW5ndGggPSAxNTUpOiBzdHJpbmcge1xuICBjb25zdCBjaGFyYWN0ZXJzID0gQXJyYXkuZnJvbSh2YWx1ZSk7XG4gIGlmIChjaGFyYWN0ZXJzLmxlbmd0aCA8PSBtYXhMZW5ndGgpIHJldHVybiB2YWx1ZTtcblxuICBjb25zdCBzaG9ydGVuZWQgPSBjaGFyYWN0ZXJzLnNsaWNlKDAsIG1heExlbmd0aCkuam9pbihcIlwiKTtcbiAgY29uc3QgcHVuY3R1YXRpb25JbmRleCA9IE1hdGgubWF4KFxuICAgIHNob3J0ZW5lZC5sYXN0SW5kZXhPZihcIlx1MzAwMlwiKSxcbiAgICBzaG9ydGVuZWQubGFzdEluZGV4T2YoXCJcdUZGMUJcIiksXG4gICAgc2hvcnRlbmVkLmxhc3RJbmRleE9mKFwiXHVGRjBDXCIpLFxuICApO1xuXG4gIHJldHVybiBgJHtcbiAgICBwdW5jdHVhdGlvbkluZGV4ID49IE1hdGguZmxvb3IobWF4TGVuZ3RoICogMC42NSlcbiAgICAgID8gc2hvcnRlbmVkLnNsaWNlKDAsIHB1bmN0dWF0aW9uSW5kZXgpXG4gICAgICA6IHNob3J0ZW5lZFxuICB9XHUyMDI2YDtcbn1cblxuZnVuY3Rpb24gZXh0cmFjdERlc2NyaXB0aW9uKG1hcmtkb3duOiBzdHJpbmcsIGZhbGxiYWNrOiBzdHJpbmcpOiBzdHJpbmcge1xuICBjb25zdCBtYWluU3RhcnQgPSBtYXJrZG93bi5pbmRleE9mKFwiPG1haW5cIik7XG4gIGNvbnN0IG1haW5FbmQgPSBtYWluU3RhcnQgPj0gMCA/IG1hcmtkb3duLmluZGV4T2YoXCI8L21haW4+XCIsIG1haW5TdGFydCkgOiAtMTtcbiAgY29uc3QgcGFnZUNvbnRlbnQgPVxuICAgIG1haW5TdGFydCA+PSAwICYmIG1haW5FbmQgPiBtYWluU3RhcnRcbiAgICAgID8gbWFya2Rvd24uc2xpY2UobWFpblN0YXJ0LCBtYWluRW5kKVxuICAgICAgOiBtYXJrZG93bjtcbiAgY29uc3QgaHRtbFBhcmFncmFwaHMgPSBBcnJheS5mcm9tKFxuICAgIHBhZ2VDb250ZW50Lm1hdGNoQWxsKC88cCg/Olxcc1tePl0qKT8+KFtcXHNcXFNdKj8pPFxcL3A+L2dpKSxcbiAgICAobWF0Y2gpID0+IGRlY29kZUh0bWxFbnRpdGllcyhzdHJpcE1hcmtkb3duKG1hdGNoWzFdKSksXG4gICkuZmlsdGVyKChwYXJhZ3JhcGgpID0+IEFycmF5LmZyb20ocGFyYWdyYXBoKS5sZW5ndGggPj0gMTIpO1xuXG4gIGlmIChodG1sUGFyYWdyYXBocy5sZW5ndGggPiAwKSB7XG4gICAgY29uc3Qgc2VsZWN0ZWQ6IHN0cmluZ1tdID0gW107XG4gICAgZm9yIChjb25zdCBwYXJhZ3JhcGggb2YgaHRtbFBhcmFncmFwaHMpIHtcbiAgICAgIHNlbGVjdGVkLnB1c2gocGFyYWdyYXBoKTtcbiAgICAgIGlmIChBcnJheS5mcm9tKHNlbGVjdGVkLmpvaW4oXCIgXCIpKS5sZW5ndGggPj0gOTApIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVuY2F0ZURlc2NyaXB0aW9uKHNlbGVjdGVkLmpvaW4oXCIgXCIpKTtcbiAgfVxuXG4gIGNvbnN0IGNvbnRlbnQgPSBtYXJrZG93bi5yZXBsYWNlKFxuICAgIC9eLS0tXFxzKltcXHJcXG5dK1tcXHNcXFNdKj9bXFxyXFxuXSstLS1cXHMqW1xcclxcbl0rLyxcbiAgICBcIlwiLFxuICApO1xuICBjb25zdCBjYW5kaWRhdGVzOiBzdHJpbmdbXSA9IFtdO1xuXG4gIGZvciAoY29uc3QgYmxvY2sgb2YgY29udGVudC5zcGxpdCgvXFxyP1xcblxccypcXHI/XFxuLykpIHtcbiAgICBjb25zdCB0cmltbWVkID0gYmxvY2sudHJpbSgpO1xuICAgIGlmIChcbiAgICAgICF0cmltbWVkIHx8XG4gICAgICB0cmltbWVkLnN0YXJ0c1dpdGgoXCIjXCIpIHx8XG4gICAgICB0cmltbWVkLnN0YXJ0c1dpdGgoXCJgYGBcIikgfHxcbiAgICAgIHRyaW1tZWQuc3RhcnRzV2l0aChcIn5+flwiKSB8fFxuICAgICAgdHJpbW1lZC5zdGFydHNXaXRoKFwiaW1wb3J0IFwiKSB8fFxuICAgICAgdHJpbW1lZC5zdGFydHNXaXRoKFwiZXhwb3J0IFwiKSB8fFxuICAgICAgdHJpbW1lZC5zdGFydHNXaXRoKFwiPCEtLVwiKSB8fFxuICAgICAgdHJpbW1lZC5zdGFydHNXaXRoKFwiPFwiKSB8fFxuICAgICAgdHJpbW1lZC5zdGFydHNXaXRoKFwifFwiKSB8fFxuICAgICAgL15bLSorXVxccy8udGVzdCh0cmltbWVkKSB8fFxuICAgICAgL15cXGQrWy4pXVxccy8udGVzdCh0cmltbWVkKVxuICAgICkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgY29uc3QgcGxhaW5UZXh0ID0gc3RyaXBNYXJrZG93bih0cmltbWVkKTtcbiAgICBpZiAoQXJyYXkuZnJvbShwbGFpblRleHQpLmxlbmd0aCA8IDEyKSBjb250aW51ZTtcblxuICAgIGNhbmRpZGF0ZXMucHVzaChwbGFpblRleHQpO1xuICAgIGlmIChBcnJheS5mcm9tKGNhbmRpZGF0ZXMuam9pbihcIiBcIikpLmxlbmd0aCA+PSA5MCkgYnJlYWs7XG4gIH1cblxuICByZXR1cm4gdHJ1bmNhdGVEZXNjcmlwdGlvbihjYW5kaWRhdGVzLmpvaW4oXCIgXCIpIHx8IGZhbGxiYWNrIHx8IERFRkFVTFRfREVTQ1JJUFRJT04pO1xufVxuXG5mdW5jdGlvbiBicmVhZGNydW1iTmFtZShzZWdtZW50OiBzdHJpbmcpOiBzdHJpbmcge1xuICBsZXQgZGVjb2RlZFNlZ21lbnQgPSBzZWdtZW50O1xuXG4gIHRyeSB7XG4gICAgZGVjb2RlZFNlZ21lbnQgPSBkZWNvZGVVUklDb21wb25lbnQoc2VnbWVudCk7XG4gIH0gY2F0Y2gge1xuICAgIC8vIEtlZXAgdGhlIG9yaWdpbmFsIHNlZ21lbnQgd2hlbiBpdCBpcyBub3QgdmFsaWQgVVJJLWVuY29kZWQgdGV4dC5cbiAgfVxuXG4gIGNvbnN0IGxhYmVsczogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcbiAgICBibHVlYm9vazogXCJcdTY1ODdcdTdBRTBcIixcbiAgICBjYXNlczogXCJcdTY4NDhcdTRGOEJcIixcbiAgICBjb21tdW5pdHk6IFwiXHU3OTNFXHU1MzNBXCIsXG4gICAgaGVscDogXCJcdTVFMkVcdTUyQTlcIixcbiAgICBcInJlYWRpbmctZ3VpZGVcIjogXCJcdTUxNzNcdTRFOEVcIixcbiAgfTtcblxuICByZXR1cm4gbGFiZWxzW2RlY29kZWRTZWdtZW50XSB8fCBkZWNvZGVkU2VnbWVudC5yZXBsYWNlKC9bLV9dL2csIFwiIFwiKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQnJlYWRjcnVtYnMoXG4gIHNpdGVVcmw6IHN0cmluZyxcbiAgcGFnZTogc3RyaW5nLFxuICBwYWdlVGl0bGU6IHN0cmluZyxcbiAgY2Fub25pY2FsVXJsOiBzdHJpbmcsXG4pIHtcbiAgY29uc3QgcGF0aCA9IGNsZWFuUGFnZVBhdGgocGFnZSkucmVwbGFjZSgvXlxcL3xcXC8kL2csIFwiXCIpO1xuICBpZiAoIXBhdGgpIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IHNlZ21lbnRzID0gcGF0aC5zcGxpdChcIi9cIik7XG4gIGNvbnN0IGl0ZW1MaXN0RWxlbWVudCA9IFtcbiAgICB7XG4gICAgICBcIkB0eXBlXCI6IFwiTGlzdEl0ZW1cIixcbiAgICAgIHBvc2l0aW9uOiAxLFxuICAgICAgbmFtZTogXCJcdTk5OTZcdTk4NzVcIixcbiAgICAgIGl0ZW06IG5ldyBVUkwoXCIvXCIsIGAke3NpdGVVcmx9L2ApLmhyZWYsXG4gICAgfSxcbiAgICAuLi5zZWdtZW50cy5tYXAoKHNlZ21lbnQsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBpc0xhc3QgPSBpbmRleCA9PT0gc2VnbWVudHMubGVuZ3RoIC0gMTtcbiAgICAgIGNvbnN0IHBhcmVudFBhdGggPSBgLyR7c2VnbWVudHMuc2xpY2UoMCwgaW5kZXggKyAxKS5qb2luKFwiL1wiKX0vYDtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgXCJAdHlwZVwiOiBcIkxpc3RJdGVtXCIsXG4gICAgICAgIHBvc2l0aW9uOiBpbmRleCArIDIsXG4gICAgICAgIG5hbWU6IGlzTGFzdCA/IHBhZ2VUaXRsZSA6IGJyZWFkY3J1bWJOYW1lKHNlZ21lbnQpLFxuICAgICAgICBpdGVtOiBpc0xhc3QgPyBjYW5vbmljYWxVcmwgOiBuZXcgVVJMKHBhcmVudFBhdGgsIGAke3NpdGVVcmx9L2ApLmhyZWYsXG4gICAgICB9O1xuICAgIH0pLFxuICBdO1xuXG4gIHJldHVybiB7XG4gICAgXCJAdHlwZVwiOiBcIkJyZWFkY3J1bWJMaXN0XCIsXG4gICAgXCJAaWRcIjogYCR7Y2Fub25pY2FsVXJsfSNicmVhZGNydW1iYCxcbiAgICBpdGVtTGlzdEVsZW1lbnQsXG4gIH07XG59XG5cbmZ1bmN0aW9uIHNlcmlhbGl6ZUpzb25MZCh2YWx1ZTogdW5rbm93bik6IHN0cmluZyB7XG4gIHJldHVybiBKU09OLnN0cmluZ2lmeSh2YWx1ZSkucmVwbGFjZSgvPC9nLCBcIlxcXFx1MDAzY1wiKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBhZ2VEZXNjcmlwdGlvbihcbiAgc291cmNlRGlyZWN0b3J5OiBzdHJpbmcsXG4gIHBhZ2VEYXRhOiBQYWdlRGF0YSxcbik6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gIGlmIChwYWdlRGF0YS5kZXNjcmlwdGlvbiB8fCBwYWdlRGF0YS5pc05vdEZvdW5kIHx8ICFwYWdlRGF0YS5maWxlUGF0aCkge1xuICAgIHJldHVybiBwYWdlRGF0YS5kZXNjcmlwdGlvbiB8fCB1bmRlZmluZWQ7XG4gIH1cblxuICBjb25zdCBmYWxsYmFjayA9IGAke3BhZ2VEYXRhLnRpdGxlfVx1RkYxQSR7REVGQVVMVF9ERVNDUklQVElPTn1gO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgbWFya2Rvd24gPSByZWFkRmlsZVN5bmMoXG4gICAgICByZXNvbHZlKHNvdXJjZURpcmVjdG9yeSwgcGFnZURhdGEuZmlsZVBhdGgpLFxuICAgICAgXCJ1dGY4XCIsXG4gICAgKTtcbiAgICByZXR1cm4gZXh0cmFjdERlc2NyaXB0aW9uKG1hcmtkb3duLCBmYWxsYmFjayk7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiB0cnVuY2F0ZURlc2NyaXB0aW9uKGZhbGxiYWNrKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VvSGVhZChcbiAgc2l0ZVVybDogc3RyaW5nLFxuICBjb250ZXh0OiBUcmFuc2Zvcm1Db250ZXh0LFxuKTogSGVhZENvbmZpZ1tdIHtcbiAgY29uc3QgeyBwYWdlLCBwYWdlRGF0YSwgdGl0bGUsIGNvbnRlbnQgfSA9IGNvbnRleHQ7XG5cbiAgaWYgKHBhZ2VEYXRhLmlzTm90Rm91bmQpIHtcbiAgICByZXR1cm4gW1xuICAgICAgW1wibWV0YVwiLCB7IG5hbWU6IFwicm9ib3RzXCIsIGNvbnRlbnQ6IFwibm9pbmRleCwgbm9mb2xsb3dcIiB9XSxcbiAgICBdO1xuICB9XG5cbiAgY29uc3QgY2Fub25pY2FsVXJsID0gYWJzb2x1dGVQYWdlVXJsKHNpdGVVcmwsIHBhZ2UpO1xuICBjb25zdCBzb2NpYWxJbWFnZVVybCA9IG5ldyBVUkwoXCIvb2cvd29ya2J1ZGR5LWd1aWRlLnBuZ1wiLCBgJHtzaXRlVXJsfS9gKS5ocmVmO1xuICBjb25zdCBkZXNjcmlwdGlvbiA9IHBhZ2VEYXRhLmRlc2NyaXB0aW9uXG4gICAgPyB0cnVuY2F0ZURlc2NyaXB0aW9uKHBhZ2VEYXRhLmRlc2NyaXB0aW9uKVxuICAgIDogZXh0cmFjdERlc2NyaXB0aW9uKFxuICAgICAgICBjb250ZW50LFxuICAgICAgICBgJHtwYWdlRGF0YS50aXRsZX1cdUZGMUEke2NvbnRleHQuZGVzY3JpcHRpb24gfHwgREVGQVVMVF9ERVNDUklQVElPTn1gLFxuICAgICAgKTtcbiAgY29uc3QgaXNIb21lID0gcGFnZSA9PT0gXCJpbmRleC5tZFwiO1xuICBjb25zdCBpc0JsdWVib29rUGFnZSA9IHBhZ2Uuc3RhcnRzV2l0aChcImJsdWVib29rL1wiKTtcbiAgY29uc3QgbW9kaWZpZWRUaW1lID0gcGFnZURhdGEubGFzdFVwZGF0ZWRcbiAgICA/IG5ldyBEYXRlKHBhZ2VEYXRhLmxhc3RVcGRhdGVkKS50b0lTT1N0cmluZygpXG4gICAgOiB1bmRlZmluZWQ7XG5cbiAgY29uc3Qgb3JnYW5pemF0aW9uID0ge1xuICAgIFwiQHR5cGVcIjogXCJPcmdhbml6YXRpb25cIixcbiAgICBcIkBpZFwiOiBgJHtzaXRlVXJsfS8jb3JnYW5pemF0aW9uYCxcbiAgICBuYW1lOiBPUkdBTklaQVRJT05fTkFNRSxcbiAgICB1cmw6IGAke3NpdGVVcmx9L2AsXG4gICAgc2FtZUFzOiBbR0lUSFVCX1VSTF0sXG4gIH07XG4gIGNvbnN0IHdlYnNpdGUgPSB7XG4gICAgXCJAdHlwZVwiOiBcIldlYlNpdGVcIixcbiAgICBcIkBpZFwiOiBgJHtzaXRlVXJsfS8jd2Vic2l0ZWAsXG4gICAgdXJsOiBgJHtzaXRlVXJsfS9gLFxuICAgIG5hbWU6IFNJVEVfTkFNRSxcbiAgICBhbHRlcm5hdGVOYW1lOiBTSVRFX0FMVEVSTkFURV9OQU1FLFxuICAgIGRlc2NyaXB0aW9uOiBERUZBVUxUX0RFU0NSSVBUSU9OLFxuICAgIGluTGFuZ3VhZ2U6IFwiemgtQ05cIixcbiAgICBwdWJsaXNoZXI6IHsgXCJAaWRcIjogYCR7c2l0ZVVybH0vI29yZ2FuaXphdGlvbmAgfSxcbiAgfTtcbiAgY29uc3QgYnJlYWRjcnVtYlRpdGxlID1cbiAgICB0eXBlb2YgcGFnZURhdGEuZnJvbnRtYXR0ZXIuYnJlYWRjcnVtYlRpdGxlID09PSBcInN0cmluZ1wiXG4gICAgICA/IHBhZ2VEYXRhLmZyb250bWF0dGVyLmJyZWFkY3J1bWJUaXRsZVxuICAgICAgOiBwYWdlRGF0YS50aXRsZTtcbiAgY29uc3QgYnJlYWRjcnVtYnMgPSBjcmVhdGVCcmVhZGNydW1icyhcbiAgICBzaXRlVXJsLFxuICAgIHBhZ2UsXG4gICAgYnJlYWRjcnVtYlRpdGxlLFxuICAgIGNhbm9uaWNhbFVybCxcbiAgKTtcbiAgY29uc3QgcGFnZUVudGl0eSA9IGlzSG9tZVxuICAgID8gbnVsbFxuICAgIDoge1xuICAgICAgICBcIkB0eXBlXCI6IGlzQmx1ZWJvb2tQYWdlID8gXCJBcnRpY2xlXCIgOiBcIldlYlBhZ2VcIixcbiAgICAgICAgXCJAaWRcIjogYCR7Y2Fub25pY2FsVXJsfSN3ZWJwYWdlYCxcbiAgICAgICAgdXJsOiBjYW5vbmljYWxVcmwsXG4gICAgICAgIG5hbWU6IHBhZ2VEYXRhLnRpdGxlLFxuICAgICAgICAuLi4oaXNCbHVlYm9va1BhZ2UgPyB7IGhlYWRsaW5lOiBwYWdlRGF0YS50aXRsZSB9IDoge30pLFxuICAgICAgICBkZXNjcmlwdGlvbixcbiAgICAgICAgaW5MYW5ndWFnZTogXCJ6aC1DTlwiLFxuICAgICAgICBpc1BhcnRPZjogeyBcIkBpZFwiOiBgJHtzaXRlVXJsfS8jd2Vic2l0ZWAgfSxcbiAgICAgICAgYnJlYWRjcnVtYjogYnJlYWRjcnVtYnNcbiAgICAgICAgICA/IHsgXCJAaWRcIjogYCR7Y2Fub25pY2FsVXJsfSNicmVhZGNydW1iYCB9XG4gICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICAgIC4uLihpc0JsdWVib29rUGFnZVxuICAgICAgICAgID8ge1xuICAgICAgICAgICAgICBtYWluRW50aXR5T2ZQYWdlOiBjYW5vbmljYWxVcmwsXG4gICAgICAgICAgICAgIGltYWdlOiBbc29jaWFsSW1hZ2VVcmxdLFxuICAgICAgICAgICAgICBhdXRob3I6IHsgXCJAaWRcIjogYCR7c2l0ZVVybH0vI29yZ2FuaXphdGlvbmAgfSxcbiAgICAgICAgICAgICAgcHVibGlzaGVyOiB7IFwiQGlkXCI6IGAke3NpdGVVcmx9LyNvcmdhbml6YXRpb25gIH0sXG4gICAgICAgICAgICB9XG4gICAgICAgICAgOiB7fSksXG4gICAgICAgIC4uLihtb2RpZmllZFRpbWUgPyB7IGRhdGVNb2RpZmllZDogbW9kaWZpZWRUaW1lIH0gOiB7fSksXG4gICAgICB9O1xuICBjb25zdCBqc29uTGRHcmFwaCA9IFtvcmdhbml6YXRpb24sIHdlYnNpdGUsIHBhZ2VFbnRpdHksIGJyZWFkY3J1bWJzXS5maWx0ZXIoXG4gICAgQm9vbGVhbixcbiAgKTtcblxuICBjb25zdCBoZWFkOiBIZWFkQ29uZmlnW10gPSBbXG4gICAgW1wibWV0YVwiLCB7IG5hbWU6IFwiZGVzY3JpcHRpb25cIiwgY29udGVudDogZGVzY3JpcHRpb24gfV0sXG4gICAgW1xuICAgICAgXCJtZXRhXCIsXG4gICAgICB7XG4gICAgICAgIG5hbWU6IFwicm9ib3RzXCIsXG4gICAgICAgIGNvbnRlbnQ6XG4gICAgICAgICAgXCJpbmRleCwgZm9sbG93LCBtYXgtaW1hZ2UtcHJldmlldzpsYXJnZSwgbWF4LXNuaXBwZXQ6LTEsIG1heC12aWRlby1wcmV2aWV3Oi0xXCIsXG4gICAgICB9LFxuICAgIF0sXG4gICAgW1wibGlua1wiLCB7IHJlbDogXCJjYW5vbmljYWxcIiwgaHJlZjogY2Fub25pY2FsVXJsIH1dLFxuICAgIFtcIm1ldGFcIiwgeyBwcm9wZXJ0eTogXCJvZzpsb2NhbGVcIiwgY29udGVudDogXCJ6aF9DTlwiIH1dLFxuICAgIFtcIm1ldGFcIiwgeyBwcm9wZXJ0eTogXCJvZzpzaXRlX25hbWVcIiwgY29udGVudDogU0lURV9OQU1FIH1dLFxuICAgIFtcIm1ldGFcIiwgeyBwcm9wZXJ0eTogXCJvZzp0eXBlXCIsIGNvbnRlbnQ6IGlzQmx1ZWJvb2tQYWdlID8gXCJhcnRpY2xlXCIgOiBcIndlYnNpdGVcIiB9XSxcbiAgICBbXCJtZXRhXCIsIHsgcHJvcGVydHk6IFwib2c6dGl0bGVcIiwgY29udGVudDogdGl0bGUgfV0sXG4gICAgW1wibWV0YVwiLCB7IHByb3BlcnR5OiBcIm9nOmRlc2NyaXB0aW9uXCIsIGNvbnRlbnQ6IGRlc2NyaXB0aW9uIH1dLFxuICAgIFtcIm1ldGFcIiwgeyBwcm9wZXJ0eTogXCJvZzp1cmxcIiwgY29udGVudDogY2Fub25pY2FsVXJsIH1dLFxuICAgIFtcIm1ldGFcIiwgeyBwcm9wZXJ0eTogXCJvZzppbWFnZVwiLCBjb250ZW50OiBzb2NpYWxJbWFnZVVybCB9XSxcbiAgICBbXCJtZXRhXCIsIHsgcHJvcGVydHk6IFwib2c6aW1hZ2U6dHlwZVwiLCBjb250ZW50OiBcImltYWdlL3BuZ1wiIH1dLFxuICAgIFtcIm1ldGFcIiwgeyBwcm9wZXJ0eTogXCJvZzppbWFnZTp3aWR0aFwiLCBjb250ZW50OiBcIjEyODBcIiB9XSxcbiAgICBbXCJtZXRhXCIsIHsgcHJvcGVydHk6IFwib2c6aW1hZ2U6aGVpZ2h0XCIsIGNvbnRlbnQ6IFwiNzIwXCIgfV0sXG4gICAgW1wibWV0YVwiLCB7IHByb3BlcnR5OiBcIm9nOmltYWdlOmFsdFwiLCBjb250ZW50OiBcIldvcmtCdWRkeUhlbHBlciBcdTk5OTZcdTk4NzVcdTk4ODRcdTg5QzhcIiB9XSxcbiAgICBbXCJtZXRhXCIsIHsgbmFtZTogXCJ0d2l0dGVyOmNhcmRcIiwgY29udGVudDogXCJzdW1tYXJ5X2xhcmdlX2ltYWdlXCIgfV0sXG4gICAgW1wibWV0YVwiLCB7IG5hbWU6IFwidHdpdHRlcjp0aXRsZVwiLCBjb250ZW50OiB0aXRsZSB9XSxcbiAgICBbXCJtZXRhXCIsIHsgbmFtZTogXCJ0d2l0dGVyOmRlc2NyaXB0aW9uXCIsIGNvbnRlbnQ6IGRlc2NyaXB0aW9uIH1dLFxuICAgIFtcIm1ldGFcIiwgeyBuYW1lOiBcInR3aXR0ZXI6aW1hZ2VcIiwgY29udGVudDogc29jaWFsSW1hZ2VVcmwgfV0sXG4gICAgW1wibWV0YVwiLCB7IG5hbWU6IFwidHdpdHRlcjppbWFnZTphbHRcIiwgY29udGVudDogXCJXb3JrQnVkZHlIZWxwZXIgXHU5OTk2XHU5ODc1XHU5ODg0XHU4OUM4XCIgfV0sXG4gICAgW1xuICAgICAgXCJzY3JpcHRcIixcbiAgICAgIHsgdHlwZTogXCJhcHBsaWNhdGlvbi9sZCtqc29uXCIgfSxcbiAgICAgIHNlcmlhbGl6ZUpzb25MZCh7IFwiQGNvbnRleHRcIjogXCJodHRwczovL3NjaGVtYS5vcmdcIiwgXCJAZ3JhcGhcIjoganNvbkxkR3JhcGggfSksXG4gICAgXSxcbiAgXTtcblxuICBpZiAobW9kaWZpZWRUaW1lICYmIGlzQmx1ZWJvb2tQYWdlKSB7XG4gICAgaGVhZC5wdXNoKFtcbiAgICAgIFwibWV0YVwiLFxuICAgICAgeyBwcm9wZXJ0eTogXCJhcnRpY2xlOm1vZGlmaWVkX3RpbWVcIiwgY29udGVudDogbW9kaWZpZWRUaW1lIH0sXG4gICAgXSk7XG4gIH1cblxuICByZXR1cm4gaGVhZDtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNFMsU0FBUyxvQkFBb0I7OztBQ0E3QixTQUFTLGNBQWMsbUJBQW1CO0FBQ3RWLFNBQVMscUJBQXFCO0FBRCtKLElBQU0sMkNBQTJDO0FBSzlPLElBQU0sUUFBUSxJQUFJLGFBQ2hCLFVBQVUsYUFBYSxTQUFTLElBQUksQ0FBQyxZQUFZLFFBQVEsS0FBSyxDQUFDLEVBQUUsS0FBSyxHQUFHLENBQUMsR0FBRztBQUcvRSxJQUFNLGVBQWUsQ0FBQyxhQUFxQixhQUE2QjtBQUN0RSxNQUFJO0FBQ0YsVUFBTSxXQUFXLGFBQWEsYUFBYSxNQUFNO0FBQ2pELFVBQU0sS0FBSyxTQUFTLE1BQU0sYUFBYSxJQUFJLENBQUMsR0FBRyxLQUFLO0FBQ3BELFdBQU8sTUFBTTtBQUFBLEVBQ2YsUUFBUTtBQUNOLFdBQU87QUFBQSxFQUNUO0FBQ0Y7QUFFQSxJQUFNLG9CQUFvQjtBQUFBLEVBQ3hCLElBQUksSUFBSSxnQkFBZ0Isd0NBQWU7QUFDekM7QUFHQSxJQUFNLGNBQWMsb0JBQUksSUFBSSxDQUFDLGNBQUksQ0FBQztBQUlsQyxJQUFNLGtCQUF3QztBQUFBLEVBQzVDLGVBQWUsTUFBTTtBQUNuQixVQUFNLFFBQW9DO0FBQUEsTUFDeEMsRUFBRSxNQUFNLDRCQUFRLE1BQU0sYUFBYTtBQUFBLElBQ3JDO0FBRUEsVUFBTSxRQUFRLFlBQVksbUJBQW1CLEVBQUUsZUFBZSxLQUFLLENBQUMsRUFDakU7QUFBQSxNQUNDLENBQUMsVUFDQyxNQUFNLFlBQVksS0FDbEIsQ0FBQyxZQUFZLElBQUks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
