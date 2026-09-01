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
var PARTS = [
  "\u7B2C\u4E00\u7BC7 \u4F7F\u7528\u624B\u518C\uFF1A\u5148\u628A WorkBuddy \u7528\u8D77\u6765",
  "\u7B2C\u4E8C\u7BC7 \u6848\u4F8B\u7BC7\uFF1A\u4ECE\u4E00\u9879\u4EFB\u52A1\u5230\u4E00\u652F AI \u56E2\u961F",
  "\u7B2C\u4E09\u7BC7 \u8FDB\u9636\u7BC7\uFF1A\u628A\u6848\u4F8B\u53D8\u6210\u81EA\u5DF1\u7684\u5DE5\u4F5C\u7CFB\u7EDF",
  "\u7B2C\u56DB\u7BC7 \u5C97\u4F4D\u4E0E\u884C\u4E1A\u843D\u5730",
  "\u9644\u5F55"
];
var bluebookSidebar = {
  "/bluebook/": (() => {
    const items = [
      { text: "\u84DD\u76AE\u4E66\u603B\u89C8", link: "/bluebook/" }
    ];
    for (const partName of PARTS) {
      const partDir = `${bluebookDirectory}${partName}`;
      const partTitle = extractTitle(`${partDir}/index.md`, partName);
      const children = readdirSync(partDir, { withFileTypes: true }).filter((entry) => entry.isDirectory()).sort((left, right) => left.name.localeCompare(right.name, "zh-CN")).map((chapter) => ({
        text: extractTitle(
          `${partDir}/${chapter.name}/index.md`,
          chapter.name
        ),
        link: route(partName, chapter.name)
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZG9jcy8udml0ZXByZXNzL2NvbmZpZy5tdHMiLCAiZG9jcy8udml0ZXByZXNzL3NpZGViYXIudHMiLCAiZG9jcy8udml0ZXByZXNzL21lcm1haWQtbWFya2Rvd24udHMiLCAiZG9jcy8udml0ZXByZXNzL3Nlby50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXDNcXFxcV29ya0J1ZGR5R3VpZGUtbWFpblxcXFxkb2NzXFxcXC52aXRlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXDNcXFxcV29ya0J1ZGR5R3VpZGUtbWFpblxcXFxkb2NzXFxcXC52aXRlcHJlc3NcXFxcY29uZmlnLm10c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovMy9Xb3JrQnVkZHlHdWlkZS1tYWluL2RvY3MvLnZpdGVwcmVzcy9jb25maWcubXRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVwcmVzc1wiO1xuXG5pbXBvcnQgeyBzaXRlU2lkZWJhciB9IGZyb20gXCIuL3NpZGViYXJcIjtcbmltcG9ydCB7IGNvbmZpZ3VyZU1lcm1haWRNYXJrZG93biB9IGZyb20gXCIuL21lcm1haWQtbWFya2Rvd25cIjtcbmltcG9ydCB7IGNyZWF0ZVBhZ2VEZXNjcmlwdGlvbiwgY3JlYXRlU2VvSGVhZCB9IGZyb20gXCIuL3Nlb1wiO1xuXG5jb25zdCBzaXRlVXJsID0gcHJvY2Vzcy5lbnYuVklURVBSRVNTX1NJVEVfVVJMIHx8IFwiaHR0cHM6Ly93b3JrYnVkZHloZWxwZXIuZXhhbXBsZS5jb21cIjtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgICBsYW5nOiBcInpoLUNOXCIsXG4gICAgdGl0bGU6IFwiV29ya0J1ZGR5SGVscGVyXCIsXG4gICAgdGl0bGVUZW1wbGF0ZTogXCI6dGl0bGUgXHUwMEI3IFdvcmtCdWRkeUhlbHBlclwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIldvcmtCdWRkeUhlbHBlclx1RkYxQVx1NEUxM1x1NkNFOFx1NEU4RSBKYXZhXHUzMDAxU3ByaW5nIEJvb3QgXHU0RTBFXHU1NDBFXHU3QUVGXHU1RjAwXHU1M0QxXHU3Njg0XHU2MjgwXHU2NzJGXHU1MzVBXHU1QkEyXHU0RTBFXHU3N0U1XHU4QkM2XHU1RTkzXHUzMDAyXCIsXG4gICAgY2xlYW5VcmxzOiB0cnVlLFxuICAgIGxhc3RVcGRhdGVkOiB0cnVlLFxuICAgIHNyY0V4Y2x1ZGU6IFtcIioqL3NvdXJjZS5tZFwiLCBcInBsYW5zLyoqXCJdLFxuICAgIHNpdGVtYXA6IHtcbiAgICAgIGhvc3RuYW1lOiBzaXRlVXJsLFxuICAgIH0sXG4gICAgdHJhbnNmb3JtUGFnZURhdGE6IChwYWdlRGF0YSwgeyBzaXRlQ29uZmlnIH0pID0+IHtcbiAgICAgIGlmIChwYWdlRGF0YS5yZWxhdGl2ZVBhdGguc3RhcnRzV2l0aChcImNhc2VzL1wiKSkge1xuICAgICAgICBwYWdlRGF0YS5mcm9udG1hdHRlci5hc2lkZSA9IGZhbHNlO1xuICAgICAgICBwYWdlRGF0YS5mcm9udG1hdHRlci5vdXRsaW5lID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiBjcmVhdGVQYWdlRGVzY3JpcHRpb24oc2l0ZUNvbmZpZy5zcmNEaXIsIHBhZ2VEYXRhKSxcbiAgICAgIH07XG4gICAgfSxcbiAgICB0cmFuc2Zvcm1IZWFkOiAoY29udGV4dCkgPT4gY3JlYXRlU2VvSGVhZChzaXRlVXJsLCBjb250ZXh0KSxcbiAgICBoZWFkOiBbXG4gICAgICBbXCJsaW5rXCIsIHsgcmVsOiBcImljb25cIiwgdHlwZTogXCJpbWFnZS9zdmcreG1sXCIsIGhyZWY6IFwiL2Zhdmljb24uc3ZnXCIgfV0sXG4gICAgICBbXCJtZXRhXCIsIHsgbmFtZTogXCJ0aGVtZS1jb2xvclwiLCBjb250ZW50OiBcIiMyNTYzZWJcIiB9XSxcbiAgICAgIFtcIm1ldGFcIiwgeyBuYW1lOiBcImF1dGhvclwiLCBjb250ZW50OiBcIldvcmtCdWRkeUhlbHBlclwiIH1dLFxuICAgICAgW1xuICAgICAgICBcIm1ldGFcIixcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6IFwia2V5d29yZHNcIixcbiAgICAgICAgICBjb250ZW50OlxuICAgICAgICAgICAgXCJKYXZhLFNwcmluZyBCb290LFx1NTQwRVx1N0FFRlx1NUYwMFx1NTNEMSxcdTYyODBcdTY3MkZcdTUzNUFcdTVCQTIsXHU3N0U1XHU4QkM2XHU1RTkzLFx1NUZBRVx1NjcwRFx1NTJBMSxcdTY1NzBcdTYzNkVcdTVFOTMsXHU0RTJEXHU5NUY0XHU0RUY2XCIsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIF0sXG4gICAgbWFya2Rvd246IHtcbiAgICAgIGNvbmZpZzogY29uZmlndXJlTWVybWFpZE1hcmtkb3duLFxuICAgICAgaW1hZ2U6IHtcbiAgICAgICAgbGF6eUxvYWRpbmc6IHRydWUsXG4gICAgICB9LFxuICAgICAgdGhlbWU6IHtcbiAgICAgICAgbGlnaHQ6IFwiZ2l0aHViLWxpZ2h0XCIsXG4gICAgICAgIGRhcms6IFwiZ2l0aHViLWRhcmtcIixcbiAgICAgIH0sXG4gICAgfSxcbiAgICB0aGVtZUNvbmZpZzoge1xuICAgICAgc2l0ZVRpdGxlOiBcIldvcmtCdWRkeUhlbHBlclwiLFxuICAgICAgbmF2OiBbXG4gICAgICAgIHsgdGV4dDogXCJcdTk5OTZcdTk4NzVcIiwgbGluazogXCIvXCIgfSxcbiAgICAgICAgeyB0ZXh0OiBcIlx1NjU4N1x1N0FFMFwiLCBsaW5rOiBcIi9ibHVlYm9vay9cIiB9LFxuICAgICAgICB7IHRleHQ6IFwiXHU1MTczXHU0RThFXCIsIGxpbms6IFwiL3JlYWRpbmctZ3VpZGVcIiB9LFxuICAgICAgXSxcbiAgICAgIHNpZGViYXI6IHNpdGVTaWRlYmFyLFxuICAgICAgc29jaWFsTGlua3M6IFtcbiAgICAgICAgeyBpY29uOiBcImdpdGh1YlwiLCBsaW5rOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9cIiB9LFxuICAgICAgXSxcbiAgICAgIHNlYXJjaDoge1xuICAgICAgICBwcm92aWRlcjogXCJsb2NhbFwiLFxuICAgICAgfSxcbiAgICAgIG91dGxpbmU6IHtcbiAgICAgICAgbGV2ZWw6IFsyLCAzXSxcbiAgICAgICAgbGFiZWw6IFwiXHU2NzJDXHU5ODc1XHU3NkVFXHU1RjU1XCIsXG4gICAgICB9LFxuICAgICAgZG9jRm9vdGVyOiB7XG4gICAgICAgIHByZXY6IFwiXHU0RTBBXHU0RTAwXHU3QkM3XCIsXG4gICAgICAgIG5leHQ6IFwiXHU0RTBCXHU0RTAwXHU3QkM3XCIsXG4gICAgICB9LFxuICAgICAgbGFzdFVwZGF0ZWQ6IHtcbiAgICAgICAgdGV4dDogXCJcdTY3MDBcdTU0MEVcdTY2RjRcdTY1QjBcIixcbiAgICAgICAgZm9ybWF0T3B0aW9uczoge1xuICAgICAgICAgIGRhdGVTdHlsZTogXCJtZWRpdW1cIixcbiAgICAgICAgICB0aW1lU3R5bGU6IFwic2hvcnRcIixcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBmb290ZXI6IHtcbiAgICAgICAgbWVzc2FnZTpcbiAgICAgICAgICBcIldvcmtCdWRkeUhlbHBlciBcdTAwQjcgXHU0RTEzXHU2Q0U4XHU0RThFIEphdmEgXHU0RTBFXHU1NDBFXHU3QUVGXHU1RjAwXHU1M0QxXHU3Njg0XHU2MjgwXHU2NzJGXHU1MzVBXHU1QkEyXHU0RTBFXHU3N0U1XHU4QkM2XHU1RTkzXCIsXG4gICAgICAgIGNvcHlyaWdodDogXCJDb3B5cmlnaHQgXHUwMEE5IDIwMjYgV29ya0J1ZGR5SGVscGVyXCIsXG4gICAgICB9LFxuICAgIH0sXG4gIH0pO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFwzXFxcXFdvcmtCdWRkeUd1aWRlLW1haW5cXFxcZG9jc1xcXFwudml0ZXByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFwzXFxcXFdvcmtCdWRkeUd1aWRlLW1haW5cXFxcZG9jc1xcXFwudml0ZXByZXNzXFxcXHNpZGViYXIudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6LzMvV29ya0J1ZGR5R3VpZGUtbWFpbi9kb2NzLy52aXRlcHJlc3Mvc2lkZWJhci50c1wiO2ltcG9ydCB7IHJlYWRGaWxlU3luYywgcmVhZGRpclN5bmMgfSBmcm9tIFwibm9kZTpmc1wiO1xuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCB9IGZyb20gXCJub2RlOnVybFwiO1xuXG5pbXBvcnQgdHlwZSB7IERlZmF1bHRUaGVtZSB9IGZyb20gXCJ2aXRlcHJlc3NcIjtcblxuY29uc3Qgcm91dGUgPSAoLi4uc2VnbWVudHM6IHN0cmluZ1tdKTogc3RyaW5nID0+XG4gIGVuY29kZVVSSShgL2JsdWVib29rLyR7c2VnbWVudHMubWFwKChzZWdtZW50KSA9PiBzZWdtZW50LnRyaW0oKSkuam9pbihcIi9cIil9L2ApO1xuXG4vLyBcdTRFQ0UgaW5kZXgubWQgXHU2M0QwXHU1M0Q2XHU0RTAwXHU3RUE3XHU2ODA3XHU5ODk4XHU0RjVDXHU0RTNBXHU0RkE3XHU4RkI5XHU2ODBGXHU2NjNFXHU3OTNBXHU2NTg3XHU1QjU3XHVGRjBDXHU1NkRFXHU5MDAwXHU1MjMwXHU3NkVFXHU1RjU1XHU1NDBEXG5jb25zdCBleHRyYWN0VGl0bGUgPSAoaW5kZXhNZFBhdGg6IHN0cmluZywgZmFsbGJhY2s6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgbWFya2Rvd24gPSByZWFkRmlsZVN5bmMoaW5kZXhNZFBhdGgsIFwidXRmOFwiKTtcbiAgICBjb25zdCBoMSA9IG1hcmtkb3duLm1hdGNoKC9eI1xccysoLispJC9tKT8uWzFdPy50cmltKCk7XG4gICAgcmV0dXJuIGgxIHx8IGZhbGxiYWNrO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gZmFsbGJhY2s7XG4gIH1cbn07XG5cbmNvbnN0IGJsdWVib29rRGlyZWN0b3J5ID0gZmlsZVVSTFRvUGF0aChcbiAgbmV3IFVSTChcIi4uL2JsdWVib29rL1wiLCBpbXBvcnQubWV0YS51cmwpLFxuKTtcblxuLy8gV29ya0J1ZGR5IFx1NUI5RVx1NjIxOFx1ODRERFx1NzZBRVx1NEU2Nlx1RkYxQVx1NTZEQlx1N0JDNyArIFx1OTY0NFx1NUY1NVx1RkYwQzI3IFx1N0FFMFx1MzAwMlxuLy8gXHU3QkM3XHU3NkVFXHVGRjA4UGFydFx1RkYwOVx1NEUzQVx1OTg3Nlx1NUM0Mlx1RkYwQ1x1N0FFMFx1ODI4Mlx1RkYwOENoYXB0ZXJcdUZGMDlcdTRFM0FcdTVCNTBcdTk4NzlcdUZGMENcdTU3NDdcdTkwMUFcdThGQzcgaW5kZXgubWQgXHU2M0QwXHU1M0Q2XHU2ODA3XHU5ODk4XHUzMDAyXG5jb25zdCBQQVJUUyA9IFtcbiAgXCJcdTdCMkNcdTRFMDBcdTdCQzcgXHU0RjdGXHU3NTI4XHU2MjRCXHU1MThDXHVGRjFBXHU1MTQ4XHU2MjhBIFdvcmtCdWRkeSBcdTc1MjhcdThENzdcdTY3NjVcIixcbiAgXCJcdTdCMkNcdTRFOENcdTdCQzcgXHU2ODQ4XHU0RjhCXHU3QkM3XHVGRjFBXHU0RUNFXHU0RTAwXHU5ODc5XHU0RUZCXHU1MkExXHU1MjMwXHU0RTAwXHU2NTJGIEFJIFx1NTZFMlx1OTYxRlwiLFxuICBcIlx1N0IyQ1x1NEUwOVx1N0JDNyBcdThGREJcdTk2MzZcdTdCQzdcdUZGMUFcdTYyOEFcdTY4NDhcdTRGOEJcdTUzRDhcdTYyMTBcdTgxRUFcdTVERjFcdTc2ODRcdTVERTVcdTRGNUNcdTdDRkJcdTdFREZcIixcbiAgXCJcdTdCMkNcdTU2REJcdTdCQzcgXHU1Qzk3XHU0RjREXHU0RTBFXHU4ODRDXHU0RTFBXHU4NDNEXHU1NzMwXCIsXG4gIFwiXHU5NjQ0XHU1RjU1XCIsXG5dIGFzIGNvbnN0O1xuXG5jb25zdCBibHVlYm9va1NpZGViYXI6IERlZmF1bHRUaGVtZS5TaWRlYmFyID0ge1xuICBcIi9ibHVlYm9vay9cIjogKCgpID0+IHtcbiAgICBjb25zdCBpdGVtczogRGVmYXVsdFRoZW1lLlNpZGViYXJJdGVtW10gPSBbXG4gICAgICB7IHRleHQ6IFwiXHU4NEREXHU3NkFFXHU0RTY2XHU2MDNCXHU4OUM4XCIsIGxpbms6IFwiL2JsdWVib29rL1wiIH0sXG4gICAgXTtcblxuICAgIGZvciAoY29uc3QgcGFydE5hbWUgb2YgUEFSVFMpIHtcbiAgICAgIGNvbnN0IHBhcnREaXIgPSBgJHtibHVlYm9va0RpcmVjdG9yeX0ke3BhcnROYW1lfWA7XG4gICAgICBjb25zdCBwYXJ0VGl0bGUgPSBleHRyYWN0VGl0bGUoYCR7cGFydERpcn0vaW5kZXgubWRgLCBwYXJ0TmFtZSk7XG5cbiAgICAgIGNvbnN0IGNoaWxkcmVuID0gcmVhZGRpclN5bmMocGFydERpciwgeyB3aXRoRmlsZVR5cGVzOiB0cnVlIH0pXG4gICAgICAgIC5maWx0ZXIoKGVudHJ5KSA9PiBlbnRyeS5pc0RpcmVjdG9yeSgpKVxuICAgICAgICAuc29ydCgobGVmdCwgcmlnaHQpID0+IGxlZnQubmFtZS5sb2NhbGVDb21wYXJlKHJpZ2h0Lm5hbWUsIFwiemgtQ05cIikpXG4gICAgICAgIC5tYXAoKGNoYXB0ZXIpID0+ICh7XG4gICAgICAgICAgdGV4dDogZXh0cmFjdFRpdGxlKFxuICAgICAgICAgICAgYCR7cGFydERpcn0vJHtjaGFwdGVyLm5hbWV9L2luZGV4Lm1kYCxcbiAgICAgICAgICAgIGNoYXB0ZXIubmFtZSxcbiAgICAgICAgICApLFxuICAgICAgICAgIGxpbms6IHJvdXRlKHBhcnROYW1lLCBjaGFwdGVyLm5hbWUpLFxuICAgICAgICB9KSk7XG5cbiAgICAgIGl0ZW1zLnB1c2goe1xuICAgICAgICB0ZXh0OiBwYXJ0VGl0bGUsXG4gICAgICAgIGNvbGxhcHNlZDogZmFsc2UsXG4gICAgICAgIGl0ZW1zOiBjaGlsZHJlbixcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBpdGVtcztcbiAgfSkoKSxcbn07XG5cbmNvbnN0IGNhc2VzRGlyZWN0b3J5ID0gZmlsZVVSTFRvUGF0aChcbiAgbmV3IFVSTChcIi4uL2Nhc2VzL3N1Ym1pc3Npb25zL1wiLCBpbXBvcnQubWV0YS51cmwpLFxuKTtcblxuY29uc3QgY2FzZUl0ZW1zID0gcmVhZGRpclN5bmMoY2FzZXNEaXJlY3RvcnksIHsgd2l0aEZpbGVUeXBlczogdHJ1ZSB9KVxuICAuZmlsdGVyKChlbnRyeSkgPT4gZW50cnkuaXNEaXJlY3RvcnkoKSlcbiAgLm1hcCgoZW50cnkpID0+IHtcbiAgICBjb25zdCBtYXJrZG93biA9IHJlYWRGaWxlU3luYyhcbiAgICAgIG5ldyBVUkwoYC4uL2Nhc2VzL3N1Ym1pc3Npb25zLyR7ZW50cnkubmFtZX0vaW5kZXgubWRgLCBpbXBvcnQubWV0YS51cmwpLFxuICAgICAgXCJ1dGY4XCIsXG4gICAgKTtcbiAgICBjb25zdCBmcm9udG1hdHRlciA9IG1hcmtkb3duLm1hdGNoKC9eLS0tXFxzKlxcbihbXFxzXFxTXSo/KVxcbi0tLS8pPy5bMV0gfHwgXCJcIjtcbiAgICBjb25zdCByZWFkRmllbGQgPSAoZmllbGQ6IHN0cmluZyk6IHN0cmluZyA9PlxuICAgICAgZnJvbnRtYXR0ZXJcbiAgICAgICAgLm1hdGNoKG5ldyBSZWdFeHAoYF4ke2ZpZWxkfTpcXFxccyooLispJGAsIFwibVwiKSk/LlsxXVxuICAgICAgICA/LnRyaW0oKVxuICAgICAgICAucmVwbGFjZSgvXlsnXCJdfFsnXCJdJC9nLCBcIlwiKSB8fCBcIlwiO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGU6IHJlYWRGaWVsZChcImRhdGVcIiksXG4gICAgICBpdGVtOiB7XG4gICAgICAgIHRleHQ6IHJlYWRGaWVsZChcInRpdGxlXCIpIHx8IGVudHJ5Lm5hbWUsXG4gICAgICAgIGxpbms6IGVuY29kZVVSSShgL2Nhc2VzL3N1Ym1pc3Npb25zLyR7ZW50cnkubmFtZX0vYCksXG4gICAgICB9IHNhdGlzZmllcyBEZWZhdWx0VGhlbWUuU2lkZWJhckl0ZW0sXG4gICAgfTtcbiAgfSlcbiAgLnNvcnQoKGxlZnQsIHJpZ2h0KSA9PiBsZWZ0LmRhdGUubG9jYWxlQ29tcGFyZShyaWdodC5kYXRlKSlcbiAgLm1hcCgoeyBpdGVtOiBjYXNlSXRlbSB9KSA9PiBjYXNlSXRlbSk7XG5cbmNvbnN0IGNhc2VzU2lkZWJhcjogRGVmYXVsdFRoZW1lLlNpZGViYXJJdGVtW10gPSBbXG4gIHsgdGV4dDogXCJcdTY4NDhcdTRGOEJcdTk5OTZcdTk4NzVcIiwgbGluazogXCIvY2FzZXMvXCIgfSxcbiAgeyB0ZXh0OiBcIlx1NTk4Mlx1NEY1NVx1NjNEMFx1NEVBNFwiLCBsaW5rOiBcIi9jb21tdW5pdHkvY2FzZS1jb250cmlidXRpbmdcIiB9LFxuICB7XG4gICAgdGV4dDogXCJcdTY4NDhcdTRGOEJcdTUyMTdcdTg4NjhcIixcbiAgICBjb2xsYXBzZWQ6IGZhbHNlLFxuICAgIGl0ZW1zOiBjYXNlSXRlbXMsXG4gIH0sXG5dO1xuXG5leHBvcnQgY29uc3Qgc2l0ZVNpZGViYXI6IERlZmF1bHRUaGVtZS5TaWRlYmFyID0ge1xuICAuLi5ibHVlYm9va1NpZGViYXIsXG4gIFwiL2Nhc2VzL1wiOiBjYXNlc1NpZGViYXIsXG4gIFwiL2NvbW11bml0eS9jYXNlLWNvbnRyaWJ1dGluZ1wiOiBjYXNlc1NpZGViYXIsXG59O1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFwzXFxcXFdvcmtCdWRkeUd1aWRlLW1haW5cXFxcZG9jc1xcXFwudml0ZXByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFwzXFxcXFdvcmtCdWRkeUd1aWRlLW1haW5cXFxcZG9jc1xcXFwudml0ZXByZXNzXFxcXG1lcm1haWQtbWFya2Rvd24udHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6LzMvV29ya0J1ZGR5R3VpZGUtbWFpbi9kb2NzLy52aXRlcHJlc3MvbWVybWFpZC1tYXJrZG93bi50c1wiO2ltcG9ydCB0eXBlIE1hcmtkb3duSXQgZnJvbSBcIm1hcmtkb3duLWl0XCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb25maWd1cmVNZXJtYWlkTWFya2Rvd24obWQ6IE1hcmtkb3duSXQpIHtcbiAgY29uc3QgZmFsbGJhY2tGZW5jZSA9IG1kLnJlbmRlcmVyLnJ1bGVzLmZlbmNlPy5iaW5kKG1kLnJlbmRlcmVyLnJ1bGVzKTtcblxuICBtZC5yZW5kZXJlci5ydWxlcy5mZW5jZSA9ICh0b2tlbnMsIGluZGV4LCBvcHRpb25zLCBlbnYsIHNlbGYpID0+IHtcbiAgICBjb25zdCB0b2tlbiA9IHRva2Vuc1tpbmRleF07XG5cbiAgICBpZiAodG9rZW4uaW5mby50cmltKCkgIT09IFwibWVybWFpZFwiKSB7XG4gICAgICByZXR1cm4gZmFsbGJhY2tGZW5jZT8uKHRva2VucywgaW5kZXgsIG9wdGlvbnMsIGVudiwgc2VsZikgPz8gc2VsZi5yZW5kZXJUb2tlbih0b2tlbnMsIGluZGV4LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBjb25zdCBncmFwaCA9IGVuY29kZVVSSUNvbXBvbmVudCh0b2tlbi5jb250ZW50KTtcbiAgICByZXR1cm4gYDxNZXJtYWlkRGlhZ3JhbSBncmFwaD1cIiR7Z3JhcGh9XCIgLz5gO1xuICB9O1xufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFwzXFxcXFdvcmtCdWRkeUd1aWRlLW1haW5cXFxcZG9jc1xcXFwudml0ZXByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFwzXFxcXFdvcmtCdWRkeUd1aWRlLW1haW5cXFxcZG9jc1xcXFwudml0ZXByZXNzXFxcXHNlby50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovMy9Xb3JrQnVkZHlHdWlkZS1tYWluL2RvY3MvLnZpdGVwcmVzcy9zZW8udHNcIjtpbXBvcnQgeyByZWFkRmlsZVN5bmMgfSBmcm9tIFwibm9kZTpmc1wiO1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCJub2RlOnBhdGhcIjtcblxuaW1wb3J0IHR5cGUgeyBIZWFkQ29uZmlnLCBQYWdlRGF0YSwgVHJhbnNmb3JtQ29udGV4dCB9IGZyb20gXCJ2aXRlcHJlc3NcIjtcblxuY29uc3QgU0lURV9OQU1FID0gXCJXb3JrQnVkZHlIZWxwZXJcIjtcbmNvbnN0IFNJVEVfQUxURVJOQVRFX05BTUUgPSBcIldvcmtCdWRkeUhlbHBlclwiO1xuY29uc3QgT1JHQU5JWkFUSU9OX05BTUUgPSBcIldvcmtCdWRkeUhlbHBlclwiO1xuY29uc3QgR0lUSFVCX1VSTCA9IFwiaHR0cHM6Ly9naXRodWIuY29tL1wiO1xuY29uc3QgREVGQVVMVF9ERVNDUklQVElPTiA9XG4gIFwiV29ya0J1ZGR5SGVscGVyXHVGRjFBXHU0RTEzXHU2Q0U4XHU0RThFIEphdmFcdTMwMDFTcHJpbmcgQm9vdCBcdTRFMEVcdTU0MEVcdTdBRUZcdTVGMDBcdTUzRDFcdTc2ODRcdTYyODBcdTY3MkZcdTUzNUFcdTVCQTJcdTRFMEVcdTc3RTVcdThCQzZcdTVFOTNcdTMwMDJcIjtcblxuZnVuY3Rpb24gY2xlYW5QYWdlUGF0aChwYWdlOiBzdHJpbmcpOiBzdHJpbmcge1xuICBpZiAocGFnZSA9PT0gXCJpbmRleC5tZFwiKSByZXR1cm4gXCIvXCI7XG4gIGlmIChwYWdlLmVuZHNXaXRoKFwiL2luZGV4Lm1kXCIpKSB7XG4gICAgcmV0dXJuIGAvJHtwYWdlLnNsaWNlKDAsIC1cImluZGV4Lm1kXCIubGVuZ3RoKX1gO1xuICB9XG5cbiAgcmV0dXJuIGAvJHtwYWdlLnJlcGxhY2UoL1xcLm1kJC8sIFwiXCIpfWA7XG59XG5cbmZ1bmN0aW9uIGFic29sdXRlUGFnZVVybChzaXRlVXJsOiBzdHJpbmcsIHBhZ2U6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBuZXcgVVJMKGNsZWFuUGFnZVBhdGgocGFnZSksIGAke3NpdGVVcmx9L2ApLmhyZWY7XG59XG5cbmZ1bmN0aW9uIHN0cmlwTWFya2Rvd24odmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiB2YWx1ZVxuICAgIC5yZXBsYWNlKC8hXFxbW15cXF1dKlxcXVxcKFteKV0qXFwpL2csIFwiXCIpXG4gICAgLnJlcGxhY2UoL1xcWyhbXlxcXV0rKVxcXVxcKFteKV0qXFwpL2csIFwiJDFcIilcbiAgICAucmVwbGFjZSgvPFtePl0rPi9nLCBcIlwiKVxuICAgIC5yZXBsYWNlKC9bYCpffl0vZywgXCJcIilcbiAgICAucmVwbGFjZSgvXFxcXChbXFxcXGAqe31cXFtcXF0oKSMrXFwtLiFfPl0pL2csIFwiJDFcIilcbiAgICAucmVwbGFjZSgvXFxzKy9nLCBcIiBcIilcbiAgICAudHJpbSgpO1xufVxuXG5mdW5jdGlvbiBkZWNvZGVIdG1sRW50aXRpZXModmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiB2YWx1ZVxuICAgIC5yZXBsYWNlKC8mbmJzcDsvZywgXCIgXCIpXG4gICAgLnJlcGxhY2UoLyZhbXA7L2csIFwiJlwiKVxuICAgIC5yZXBsYWNlKC8mcXVvdDsvZywgJ1wiJylcbiAgICAucmVwbGFjZSgvJiMzOTt8JmFwb3M7L2csIFwiJ1wiKVxuICAgIC5yZXBsYWNlKC8mbHQ7L2csIFwiPFwiKVxuICAgIC5yZXBsYWNlKC8mZ3Q7L2csIFwiPlwiKVxuICAgIC5yZXBsYWNlKC8mIyhcXGQrKTsvZywgKF8sIGNvZGVQb2ludDogc3RyaW5nKSA9PlxuICAgICAgU3RyaW5nLmZyb21Db2RlUG9pbnQoTnVtYmVyKGNvZGVQb2ludCkpLFxuICAgIClcbiAgICAucmVwbGFjZSgvJiN4KFswLTlhLWZdKyk7L2dpLCAoXywgY29kZVBvaW50OiBzdHJpbmcpID0+XG4gICAgICBTdHJpbmcuZnJvbUNvZGVQb2ludChOdW1iZXIucGFyc2VJbnQoY29kZVBvaW50LCAxNikpLFxuICAgICk7XG59XG5cbmZ1bmN0aW9uIHRydW5jYXRlRGVzY3JpcHRpb24odmFsdWU6IHN0cmluZywgbWF4TGVuZ3RoID0gMTU1KTogc3RyaW5nIHtcbiAgY29uc3QgY2hhcmFjdGVycyA9IEFycmF5LmZyb20odmFsdWUpO1xuICBpZiAoY2hhcmFjdGVycy5sZW5ndGggPD0gbWF4TGVuZ3RoKSByZXR1cm4gdmFsdWU7XG5cbiAgY29uc3Qgc2hvcnRlbmVkID0gY2hhcmFjdGVycy5zbGljZSgwLCBtYXhMZW5ndGgpLmpvaW4oXCJcIik7XG4gIGNvbnN0IHB1bmN0dWF0aW9uSW5kZXggPSBNYXRoLm1heChcbiAgICBzaG9ydGVuZWQubGFzdEluZGV4T2YoXCJcdTMwMDJcIiksXG4gICAgc2hvcnRlbmVkLmxhc3RJbmRleE9mKFwiXHVGRjFCXCIpLFxuICAgIHNob3J0ZW5lZC5sYXN0SW5kZXhPZihcIlx1RkYwQ1wiKSxcbiAgKTtcblxuICByZXR1cm4gYCR7XG4gICAgcHVuY3R1YXRpb25JbmRleCA+PSBNYXRoLmZsb29yKG1heExlbmd0aCAqIDAuNjUpXG4gICAgICA/IHNob3J0ZW5lZC5zbGljZSgwLCBwdW5jdHVhdGlvbkluZGV4KVxuICAgICAgOiBzaG9ydGVuZWRcbiAgfVx1MjAyNmA7XG59XG5cbmZ1bmN0aW9uIGV4dHJhY3REZXNjcmlwdGlvbihtYXJrZG93bjogc3RyaW5nLCBmYWxsYmFjazogc3RyaW5nKTogc3RyaW5nIHtcbiAgY29uc3QgbWFpblN0YXJ0ID0gbWFya2Rvd24uaW5kZXhPZihcIjxtYWluXCIpO1xuICBjb25zdCBtYWluRW5kID0gbWFpblN0YXJ0ID49IDAgPyBtYXJrZG93bi5pbmRleE9mKFwiPC9tYWluPlwiLCBtYWluU3RhcnQpIDogLTE7XG4gIGNvbnN0IHBhZ2VDb250ZW50ID1cbiAgICBtYWluU3RhcnQgPj0gMCAmJiBtYWluRW5kID4gbWFpblN0YXJ0XG4gICAgICA/IG1hcmtkb3duLnNsaWNlKG1haW5TdGFydCwgbWFpbkVuZClcbiAgICAgIDogbWFya2Rvd247XG4gIGNvbnN0IGh0bWxQYXJhZ3JhcGhzID0gQXJyYXkuZnJvbShcbiAgICBwYWdlQ29udGVudC5tYXRjaEFsbCgvPHAoPzpcXHNbXj5dKik/PihbXFxzXFxTXSo/KTxcXC9wPi9naSksXG4gICAgKG1hdGNoKSA9PiBkZWNvZGVIdG1sRW50aXRpZXMoc3RyaXBNYXJrZG93bihtYXRjaFsxXSkpLFxuICApLmZpbHRlcigocGFyYWdyYXBoKSA9PiBBcnJheS5mcm9tKHBhcmFncmFwaCkubGVuZ3RoID49IDEyKTtcblxuICBpZiAoaHRtbFBhcmFncmFwaHMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IHNlbGVjdGVkOiBzdHJpbmdbXSA9IFtdO1xuICAgIGZvciAoY29uc3QgcGFyYWdyYXBoIG9mIGh0bWxQYXJhZ3JhcGhzKSB7XG4gICAgICBzZWxlY3RlZC5wdXNoKHBhcmFncmFwaCk7XG4gICAgICBpZiAoQXJyYXkuZnJvbShzZWxlY3RlZC5qb2luKFwiIFwiKSkubGVuZ3RoID49IDkwKSBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1bmNhdGVEZXNjcmlwdGlvbihzZWxlY3RlZC5qb2luKFwiIFwiKSk7XG4gIH1cblxuICBjb25zdCBjb250ZW50ID0gbWFya2Rvd24ucmVwbGFjZShcbiAgICAvXi0tLVxccypbXFxyXFxuXStbXFxzXFxTXSo/W1xcclxcbl0rLS0tXFxzKltcXHJcXG5dKy8sXG4gICAgXCJcIixcbiAgKTtcbiAgY29uc3QgY2FuZGlkYXRlczogc3RyaW5nW10gPSBbXTtcblxuICBmb3IgKGNvbnN0IGJsb2NrIG9mIGNvbnRlbnQuc3BsaXQoL1xccj9cXG5cXHMqXFxyP1xcbi8pKSB7XG4gICAgY29uc3QgdHJpbW1lZCA9IGJsb2NrLnRyaW0oKTtcbiAgICBpZiAoXG4gICAgICAhdHJpbW1lZCB8fFxuICAgICAgdHJpbW1lZC5zdGFydHNXaXRoKFwiI1wiKSB8fFxuICAgICAgdHJpbW1lZC5zdGFydHNXaXRoKFwiYGBgXCIpIHx8XG4gICAgICB0cmltbWVkLnN0YXJ0c1dpdGgoXCJ+fn5cIikgfHxcbiAgICAgIHRyaW1tZWQuc3RhcnRzV2l0aChcImltcG9ydCBcIikgfHxcbiAgICAgIHRyaW1tZWQuc3RhcnRzV2l0aChcImV4cG9ydCBcIikgfHxcbiAgICAgIHRyaW1tZWQuc3RhcnRzV2l0aChcIjwhLS1cIikgfHxcbiAgICAgIHRyaW1tZWQuc3RhcnRzV2l0aChcIjxcIikgfHxcbiAgICAgIHRyaW1tZWQuc3RhcnRzV2l0aChcInxcIikgfHxcbiAgICAgIC9eWy0qK11cXHMvLnRlc3QodHJpbW1lZCkgfHxcbiAgICAgIC9eXFxkK1suKV1cXHMvLnRlc3QodHJpbW1lZClcbiAgICApIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGNvbnN0IHBsYWluVGV4dCA9IHN0cmlwTWFya2Rvd24odHJpbW1lZCk7XG4gICAgaWYgKEFycmF5LmZyb20ocGxhaW5UZXh0KS5sZW5ndGggPCAxMikgY29udGludWU7XG5cbiAgICBjYW5kaWRhdGVzLnB1c2gocGxhaW5UZXh0KTtcbiAgICBpZiAoQXJyYXkuZnJvbShjYW5kaWRhdGVzLmpvaW4oXCIgXCIpKS5sZW5ndGggPj0gOTApIGJyZWFrO1xuICB9XG5cbiAgcmV0dXJuIHRydW5jYXRlRGVzY3JpcHRpb24oY2FuZGlkYXRlcy5qb2luKFwiIFwiKSB8fCBmYWxsYmFjayB8fCBERUZBVUxUX0RFU0NSSVBUSU9OKTtcbn1cblxuZnVuY3Rpb24gYnJlYWRjcnVtYk5hbWUoc2VnbWVudDogc3RyaW5nKTogc3RyaW5nIHtcbiAgbGV0IGRlY29kZWRTZWdtZW50ID0gc2VnbWVudDtcblxuICB0cnkge1xuICAgIGRlY29kZWRTZWdtZW50ID0gZGVjb2RlVVJJQ29tcG9uZW50KHNlZ21lbnQpO1xuICB9IGNhdGNoIHtcbiAgICAvLyBLZWVwIHRoZSBvcmlnaW5hbCBzZWdtZW50IHdoZW4gaXQgaXMgbm90IHZhbGlkIFVSSS1lbmNvZGVkIHRleHQuXG4gIH1cblxuICBjb25zdCBsYWJlbHM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gICAgYmx1ZWJvb2s6IFwiXHU2NTg3XHU3QUUwXCIsXG4gICAgY2FzZXM6IFwiXHU2ODQ4XHU0RjhCXCIsXG4gICAgY29tbXVuaXR5OiBcIlx1NzkzRVx1NTMzQVwiLFxuICAgIGhlbHA6IFwiXHU1RTJFXHU1MkE5XCIsXG4gICAgXCJyZWFkaW5nLWd1aWRlXCI6IFwiXHU1MTczXHU0RThFXCIsXG4gIH07XG5cbiAgcmV0dXJuIGxhYmVsc1tkZWNvZGVkU2VnbWVudF0gfHwgZGVjb2RlZFNlZ21lbnQucmVwbGFjZSgvWy1fXS9nLCBcIiBcIik7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUJyZWFkY3J1bWJzKFxuICBzaXRlVXJsOiBzdHJpbmcsXG4gIHBhZ2U6IHN0cmluZyxcbiAgcGFnZVRpdGxlOiBzdHJpbmcsXG4gIGNhbm9uaWNhbFVybDogc3RyaW5nLFxuKSB7XG4gIGNvbnN0IHBhdGggPSBjbGVhblBhZ2VQYXRoKHBhZ2UpLnJlcGxhY2UoL15cXC98XFwvJC9nLCBcIlwiKTtcbiAgaWYgKCFwYXRoKSByZXR1cm4gbnVsbDtcblxuICBjb25zdCBzZWdtZW50cyA9IHBhdGguc3BsaXQoXCIvXCIpO1xuICBjb25zdCBpdGVtTGlzdEVsZW1lbnQgPSBbXG4gICAge1xuICAgICAgXCJAdHlwZVwiOiBcIkxpc3RJdGVtXCIsXG4gICAgICBwb3NpdGlvbjogMSxcbiAgICAgIG5hbWU6IFwiXHU5OTk2XHU5ODc1XCIsXG4gICAgICBpdGVtOiBuZXcgVVJMKFwiL1wiLCBgJHtzaXRlVXJsfS9gKS5ocmVmLFxuICAgIH0sXG4gICAgLi4uc2VnbWVudHMubWFwKChzZWdtZW50LCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgaXNMYXN0ID0gaW5kZXggPT09IHNlZ21lbnRzLmxlbmd0aCAtIDE7XG4gICAgICBjb25zdCBwYXJlbnRQYXRoID0gYC8ke3NlZ21lbnRzLnNsaWNlKDAsIGluZGV4ICsgMSkuam9pbihcIi9cIil9L2A7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIFwiQHR5cGVcIjogXCJMaXN0SXRlbVwiLFxuICAgICAgICBwb3NpdGlvbjogaW5kZXggKyAyLFxuICAgICAgICBuYW1lOiBpc0xhc3QgPyBwYWdlVGl0bGUgOiBicmVhZGNydW1iTmFtZShzZWdtZW50KSxcbiAgICAgICAgaXRlbTogaXNMYXN0ID8gY2Fub25pY2FsVXJsIDogbmV3IFVSTChwYXJlbnRQYXRoLCBgJHtzaXRlVXJsfS9gKS5ocmVmLFxuICAgICAgfTtcbiAgICB9KSxcbiAgXTtcblxuICByZXR1cm4ge1xuICAgIFwiQHR5cGVcIjogXCJCcmVhZGNydW1iTGlzdFwiLFxuICAgIFwiQGlkXCI6IGAke2Nhbm9uaWNhbFVybH0jYnJlYWRjcnVtYmAsXG4gICAgaXRlbUxpc3RFbGVtZW50LFxuICB9O1xufVxuXG5mdW5jdGlvbiBzZXJpYWxpemVKc29uTGQodmFsdWU6IHVua25vd24pOiBzdHJpbmcge1xuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodmFsdWUpLnJlcGxhY2UoLzwvZywgXCJcXFxcdTAwM2NcIik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQYWdlRGVzY3JpcHRpb24oXG4gIHNvdXJjZURpcmVjdG9yeTogc3RyaW5nLFxuICBwYWdlRGF0YTogUGFnZURhdGEsXG4pOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICBpZiAocGFnZURhdGEuZGVzY3JpcHRpb24gfHwgcGFnZURhdGEuaXNOb3RGb3VuZCB8fCAhcGFnZURhdGEuZmlsZVBhdGgpIHtcbiAgICByZXR1cm4gcGFnZURhdGEuZGVzY3JpcHRpb24gfHwgdW5kZWZpbmVkO1xuICB9XG5cbiAgY29uc3QgZmFsbGJhY2sgPSBgJHtwYWdlRGF0YS50aXRsZX1cdUZGMUEke0RFRkFVTFRfREVTQ1JJUFRJT059YDtcblxuICB0cnkge1xuICAgIGNvbnN0IG1hcmtkb3duID0gcmVhZEZpbGVTeW5jKFxuICAgICAgcmVzb2x2ZShzb3VyY2VEaXJlY3RvcnksIHBhZ2VEYXRhLmZpbGVQYXRoKSxcbiAgICAgIFwidXRmOFwiLFxuICAgICk7XG4gICAgcmV0dXJuIGV4dHJhY3REZXNjcmlwdGlvbihtYXJrZG93biwgZmFsbGJhY2spO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gdHJ1bmNhdGVEZXNjcmlwdGlvbihmYWxsYmFjayk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlb0hlYWQoXG4gIHNpdGVVcmw6IHN0cmluZyxcbiAgY29udGV4dDogVHJhbnNmb3JtQ29udGV4dCxcbik6IEhlYWRDb25maWdbXSB7XG4gIGNvbnN0IHsgcGFnZSwgcGFnZURhdGEsIHRpdGxlLCBjb250ZW50IH0gPSBjb250ZXh0O1xuXG4gIGlmIChwYWdlRGF0YS5pc05vdEZvdW5kKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgIFtcIm1ldGFcIiwgeyBuYW1lOiBcInJvYm90c1wiLCBjb250ZW50OiBcIm5vaW5kZXgsIG5vZm9sbG93XCIgfV0sXG4gICAgXTtcbiAgfVxuXG4gIGNvbnN0IGNhbm9uaWNhbFVybCA9IGFic29sdXRlUGFnZVVybChzaXRlVXJsLCBwYWdlKTtcbiAgY29uc3Qgc29jaWFsSW1hZ2VVcmwgPSBuZXcgVVJMKFwiL29nL3dvcmtidWRkeS1ndWlkZS5wbmdcIiwgYCR7c2l0ZVVybH0vYCkuaHJlZjtcbiAgY29uc3QgZGVzY3JpcHRpb24gPSBwYWdlRGF0YS5kZXNjcmlwdGlvblxuICAgID8gdHJ1bmNhdGVEZXNjcmlwdGlvbihwYWdlRGF0YS5kZXNjcmlwdGlvbilcbiAgICA6IGV4dHJhY3REZXNjcmlwdGlvbihcbiAgICAgICAgY29udGVudCxcbiAgICAgICAgYCR7cGFnZURhdGEudGl0bGV9XHVGRjFBJHtjb250ZXh0LmRlc2NyaXB0aW9uIHx8IERFRkFVTFRfREVTQ1JJUFRJT059YCxcbiAgICAgICk7XG4gIGNvbnN0IGlzSG9tZSA9IHBhZ2UgPT09IFwiaW5kZXgubWRcIjtcbiAgY29uc3QgaXNCbHVlYm9va1BhZ2UgPSBwYWdlLnN0YXJ0c1dpdGgoXCJibHVlYm9vay9cIik7XG4gIGNvbnN0IG1vZGlmaWVkVGltZSA9IHBhZ2VEYXRhLmxhc3RVcGRhdGVkXG4gICAgPyBuZXcgRGF0ZShwYWdlRGF0YS5sYXN0VXBkYXRlZCkudG9JU09TdHJpbmcoKVxuICAgIDogdW5kZWZpbmVkO1xuXG4gIGNvbnN0IG9yZ2FuaXphdGlvbiA9IHtcbiAgICBcIkB0eXBlXCI6IFwiT3JnYW5pemF0aW9uXCIsXG4gICAgXCJAaWRcIjogYCR7c2l0ZVVybH0vI29yZ2FuaXphdGlvbmAsXG4gICAgbmFtZTogT1JHQU5JWkFUSU9OX05BTUUsXG4gICAgdXJsOiBgJHtzaXRlVXJsfS9gLFxuICAgIHNhbWVBczogW0dJVEhVQl9VUkxdLFxuICB9O1xuICBjb25zdCB3ZWJzaXRlID0ge1xuICAgIFwiQHR5cGVcIjogXCJXZWJTaXRlXCIsXG4gICAgXCJAaWRcIjogYCR7c2l0ZVVybH0vI3dlYnNpdGVgLFxuICAgIHVybDogYCR7c2l0ZVVybH0vYCxcbiAgICBuYW1lOiBTSVRFX05BTUUsXG4gICAgYWx0ZXJuYXRlTmFtZTogU0lURV9BTFRFUk5BVEVfTkFNRSxcbiAgICBkZXNjcmlwdGlvbjogREVGQVVMVF9ERVNDUklQVElPTixcbiAgICBpbkxhbmd1YWdlOiBcInpoLUNOXCIsXG4gICAgcHVibGlzaGVyOiB7IFwiQGlkXCI6IGAke3NpdGVVcmx9LyNvcmdhbml6YXRpb25gIH0sXG4gIH07XG4gIGNvbnN0IGJyZWFkY3J1bWJUaXRsZSA9XG4gICAgdHlwZW9mIHBhZ2VEYXRhLmZyb250bWF0dGVyLmJyZWFkY3J1bWJUaXRsZSA9PT0gXCJzdHJpbmdcIlxuICAgICAgPyBwYWdlRGF0YS5mcm9udG1hdHRlci5icmVhZGNydW1iVGl0bGVcbiAgICAgIDogcGFnZURhdGEudGl0bGU7XG4gIGNvbnN0IGJyZWFkY3J1bWJzID0gY3JlYXRlQnJlYWRjcnVtYnMoXG4gICAgc2l0ZVVybCxcbiAgICBwYWdlLFxuICAgIGJyZWFkY3J1bWJUaXRsZSxcbiAgICBjYW5vbmljYWxVcmwsXG4gICk7XG4gIGNvbnN0IHBhZ2VFbnRpdHkgPSBpc0hvbWVcbiAgICA/IG51bGxcbiAgICA6IHtcbiAgICAgICAgXCJAdHlwZVwiOiBpc0JsdWVib29rUGFnZSA/IFwiQXJ0aWNsZVwiIDogXCJXZWJQYWdlXCIsXG4gICAgICAgIFwiQGlkXCI6IGAke2Nhbm9uaWNhbFVybH0jd2VicGFnZWAsXG4gICAgICAgIHVybDogY2Fub25pY2FsVXJsLFxuICAgICAgICBuYW1lOiBwYWdlRGF0YS50aXRsZSxcbiAgICAgICAgLi4uKGlzQmx1ZWJvb2tQYWdlID8geyBoZWFkbGluZTogcGFnZURhdGEudGl0bGUgfSA6IHt9KSxcbiAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgIGluTGFuZ3VhZ2U6IFwiemgtQ05cIixcbiAgICAgICAgaXNQYXJ0T2Y6IHsgXCJAaWRcIjogYCR7c2l0ZVVybH0vI3dlYnNpdGVgIH0sXG4gICAgICAgIGJyZWFkY3J1bWI6IGJyZWFkY3J1bWJzXG4gICAgICAgICAgPyB7IFwiQGlkXCI6IGAke2Nhbm9uaWNhbFVybH0jYnJlYWRjcnVtYmAgfVxuICAgICAgICAgIDogdW5kZWZpbmVkLFxuICAgICAgICAuLi4oaXNCbHVlYm9va1BhZ2VcbiAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgbWFpbkVudGl0eU9mUGFnZTogY2Fub25pY2FsVXJsLFxuICAgICAgICAgICAgICBpbWFnZTogW3NvY2lhbEltYWdlVXJsXSxcbiAgICAgICAgICAgICAgYXV0aG9yOiB7IFwiQGlkXCI6IGAke3NpdGVVcmx9LyNvcmdhbml6YXRpb25gIH0sXG4gICAgICAgICAgICAgIHB1Ymxpc2hlcjogeyBcIkBpZFwiOiBgJHtzaXRlVXJsfS8jb3JnYW5pemF0aW9uYCB9LFxuICAgICAgICAgICAgfVxuICAgICAgICAgIDoge30pLFxuICAgICAgICAuLi4obW9kaWZpZWRUaW1lID8geyBkYXRlTW9kaWZpZWQ6IG1vZGlmaWVkVGltZSB9IDoge30pLFxuICAgICAgfTtcbiAgY29uc3QganNvbkxkR3JhcGggPSBbb3JnYW5pemF0aW9uLCB3ZWJzaXRlLCBwYWdlRW50aXR5LCBicmVhZGNydW1ic10uZmlsdGVyKFxuICAgIEJvb2xlYW4sXG4gICk7XG5cbiAgY29uc3QgaGVhZDogSGVhZENvbmZpZ1tdID0gW1xuICAgIFtcIm1ldGFcIiwgeyBuYW1lOiBcImRlc2NyaXB0aW9uXCIsIGNvbnRlbnQ6IGRlc2NyaXB0aW9uIH1dLFxuICAgIFtcbiAgICAgIFwibWV0YVwiLFxuICAgICAge1xuICAgICAgICBuYW1lOiBcInJvYm90c1wiLFxuICAgICAgICBjb250ZW50OlxuICAgICAgICAgIFwiaW5kZXgsIGZvbGxvdywgbWF4LWltYWdlLXByZXZpZXc6bGFyZ2UsIG1heC1zbmlwcGV0Oi0xLCBtYXgtdmlkZW8tcHJldmlldzotMVwiLFxuICAgICAgfSxcbiAgICBdLFxuICAgIFtcImxpbmtcIiwgeyByZWw6IFwiY2Fub25pY2FsXCIsIGhyZWY6IGNhbm9uaWNhbFVybCB9XSxcbiAgICBbXCJtZXRhXCIsIHsgcHJvcGVydHk6IFwib2c6bG9jYWxlXCIsIGNvbnRlbnQ6IFwiemhfQ05cIiB9XSxcbiAgICBbXCJtZXRhXCIsIHsgcHJvcGVydHk6IFwib2c6c2l0ZV9uYW1lXCIsIGNvbnRlbnQ6IFNJVEVfTkFNRSB9XSxcbiAgICBbXCJtZXRhXCIsIHsgcHJvcGVydHk6IFwib2c6dHlwZVwiLCBjb250ZW50OiBpc0JsdWVib29rUGFnZSA/IFwiYXJ0aWNsZVwiIDogXCJ3ZWJzaXRlXCIgfV0sXG4gICAgW1wibWV0YVwiLCB7IHByb3BlcnR5OiBcIm9nOnRpdGxlXCIsIGNvbnRlbnQ6IHRpdGxlIH1dLFxuICAgIFtcIm1ldGFcIiwgeyBwcm9wZXJ0eTogXCJvZzpkZXNjcmlwdGlvblwiLCBjb250ZW50OiBkZXNjcmlwdGlvbiB9XSxcbiAgICBbXCJtZXRhXCIsIHsgcHJvcGVydHk6IFwib2c6dXJsXCIsIGNvbnRlbnQ6IGNhbm9uaWNhbFVybCB9XSxcbiAgICBbXCJtZXRhXCIsIHsgcHJvcGVydHk6IFwib2c6aW1hZ2VcIiwgY29udGVudDogc29jaWFsSW1hZ2VVcmwgfV0sXG4gICAgW1wibWV0YVwiLCB7IHByb3BlcnR5OiBcIm9nOmltYWdlOnR5cGVcIiwgY29udGVudDogXCJpbWFnZS9wbmdcIiB9XSxcbiAgICBbXCJtZXRhXCIsIHsgcHJvcGVydHk6IFwib2c6aW1hZ2U6d2lkdGhcIiwgY29udGVudDogXCIxMjgwXCIgfV0sXG4gICAgW1wibWV0YVwiLCB7IHByb3BlcnR5OiBcIm9nOmltYWdlOmhlaWdodFwiLCBjb250ZW50OiBcIjcyMFwiIH1dLFxuICAgIFtcIm1ldGFcIiwgeyBwcm9wZXJ0eTogXCJvZzppbWFnZTphbHRcIiwgY29udGVudDogXCJXb3JrQnVkZHlIZWxwZXIgXHU5OTk2XHU5ODc1XHU5ODg0XHU4OUM4XCIgfV0sXG4gICAgW1wibWV0YVwiLCB7IG5hbWU6IFwidHdpdHRlcjpjYXJkXCIsIGNvbnRlbnQ6IFwic3VtbWFyeV9sYXJnZV9pbWFnZVwiIH1dLFxuICAgIFtcIm1ldGFcIiwgeyBuYW1lOiBcInR3aXR0ZXI6dGl0bGVcIiwgY29udGVudDogdGl0bGUgfV0sXG4gICAgW1wibWV0YVwiLCB7IG5hbWU6IFwidHdpdHRlcjpkZXNjcmlwdGlvblwiLCBjb250ZW50OiBkZXNjcmlwdGlvbiB9XSxcbiAgICBbXCJtZXRhXCIsIHsgbmFtZTogXCJ0d2l0dGVyOmltYWdlXCIsIGNvbnRlbnQ6IHNvY2lhbEltYWdlVXJsIH1dLFxuICAgIFtcIm1ldGFcIiwgeyBuYW1lOiBcInR3aXR0ZXI6aW1hZ2U6YWx0XCIsIGNvbnRlbnQ6IFwiV29ya0J1ZGR5SGVscGVyIFx1OTk5Nlx1OTg3NVx1OTg4NFx1ODlDOFwiIH1dLFxuICAgIFtcbiAgICAgIFwic2NyaXB0XCIsXG4gICAgICB7IHR5cGU6IFwiYXBwbGljYXRpb24vbGQranNvblwiIH0sXG4gICAgICBzZXJpYWxpemVKc29uTGQoeyBcIkBjb250ZXh0XCI6IFwiaHR0cHM6Ly9zY2hlbWEub3JnXCIsIFwiQGdyYXBoXCI6IGpzb25MZEdyYXBoIH0pLFxuICAgIF0sXG4gIF07XG5cbiAgaWYgKG1vZGlmaWVkVGltZSAmJiBpc0JsdWVib29rUGFnZSkge1xuICAgIGhlYWQucHVzaChbXG4gICAgICBcIm1ldGFcIixcbiAgICAgIHsgcHJvcGVydHk6IFwiYXJ0aWNsZTptb2RpZmllZF90aW1lXCIsIGNvbnRlbnQ6IG1vZGlmaWVkVGltZSB9LFxuICAgIF0pO1xuICB9XG5cbiAgcmV0dXJuIGhlYWQ7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTRTLFNBQVMsb0JBQW9COzs7QUNBN0IsU0FBUyxjQUFjLG1CQUFtQjtBQUN0VixTQUFTLHFCQUFxQjtBQUQrSixJQUFNLDJDQUEyQztBQUs5TyxJQUFNLFFBQVEsSUFBSSxhQUNoQixVQUFVLGFBQWEsU0FBUyxJQUFJLENBQUMsWUFBWSxRQUFRLEtBQUssQ0FBQyxFQUFFLEtBQUssR0FBRyxDQUFDLEdBQUc7QUFHL0UsSUFBTSxlQUFlLENBQUMsYUFBcUIsYUFBNkI7QUFDdEUsTUFBSTtBQUNGLFVBQU0sV0FBVyxhQUFhLGFBQWEsTUFBTTtBQUNqRCxVQUFNLEtBQUssU0FBUyxNQUFNLGFBQWEsSUFBSSxDQUFDLEdBQUcsS0FBSztBQUNwRCxXQUFPLE1BQU07QUFBQSxFQUNmLFFBQVE7QUFDTixXQUFPO0FBQUEsRUFDVDtBQUNGO0FBRUEsSUFBTSxvQkFBb0I7QUFBQSxFQUN4QixJQUFJLElBQUksZ0JBQWdCLHdDQUFlO0FBQ3pDO0FBSUEsSUFBTSxRQUFRO0FBQUEsRUFDWjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRjtBQUVBLElBQU0sa0JBQXdDO0FBQUEsRUFDNUMsZUFBZSxNQUFNO0FBQ25CLFVBQU0sUUFBb0M7QUFBQSxNQUN4QyxFQUFFLE1BQU0sa0NBQVMsTUFBTSxhQUFhO0FBQUEsSUFDdEM7QUFFQSxlQUFXLFlBQVksT0FBTztBQUM1QixZQUFNLFVBQVUsR0FBRyxpQkFBaUIsR0FBRyxRQUFRO0FBQy9DLFlBQU0sWUFBWSxhQUFhLEdBQUcsT0FBTyxhQUFhLFFBQVE7QUFFOUQsWUFBTSxXQUFXLFlBQVksU0FBUyxFQUFFLGVBQWUsS0FBSyxDQUFDLEVBQzFELE9BQU8sQ0FB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QUEsSUFDUjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLGFBQWE7QUFBQSxJQUNYLFdBQVc7QUFBQSxJQUNYLEtBQUs7QUFBQSxNQUNILEVBQUUsTUFBTSxnQkFBTSxNQUFNLElBQUk7QUFBQSxNQUN4QixFQUFFLE1BQU0sZ0JBQU0sTUFBTSxhQUFhO0FBQUEsTUFDakMsRUFBRSxNQUFNLGdCQUFNLE1BQU0saUJBQWlCO0FBQUEsSUFDdkM7QUFBQSxJQUNBLFNBQVM7QUFBQSxJQUNULGFBQWE7QUFBQSxNQUNYLEVBQUUsTUFBTSxVQUFVLE1BQU0sc0JBQXNCO0FBQUEsSUFDaEQ7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNOLFVBQVU7QUFBQSxJQUNaO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxPQUFPLENBQUMsR0FBRyxDQUFDO0FBQUEsTUFDWixPQUFPO0FBQUEsSUFDVDtBQUFBLElBQ0EsV0FBVztBQUFBLE1BQ1QsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLElBQ1I7QUFBQSxJQUNBLGFBQWE7QUFBQSxNQUNYLE1BQU07QUFBQSxNQUNOLGVBQWU7QUFBQSxRQUNiLFdBQVc7QUFBQSxRQUNYLFdBQVc7QUFBQSxNQUNiO0FBQUEsSUFDRjtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04sU0FDRTtBQUFBLE1BQ0YsV0FBVztBQUFBLElBQ2I7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFsicmVhZEZpbGVTeW5jIiwgInNpdGVVcmwiLCAicmVhZEZpbGVTeW5jIl0KfQo=
