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
var SITE_ALTERNATE_NAME = "WorkBuddyHelper \xB7 WorkBuddy \u5B9E\u6218\u84DD\u76AE\u4E66";
var ORGANIZATION_NAME = "WorkBuddyHelper";
var GITHUB_URL = "https://github.com/";
var DEFAULT_DESCRIPTION = "WorkBuddy \u5B9E\u6218\u84DD\u76AE\u4E66\uFF1A\u4ECE\u4F7F\u7528\u624B\u518C\u3001\u5B9E\u6218\u6848\u4F8B\u3001\u8FDB\u9636\u7CFB\u7EDF\u5230\u5C97\u4F4D\u4E0E\u884C\u4E1A\u843D\u5730\uFF0C\u4E00\u6761\u5B8C\u6574\u7684 WorkBuddy \u5B66\u4E60\u8DEF\u7EBF\u3002";
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
    bluebook: "\u84DD\u76AE\u4E66",
    cases: "\u6848\u4F8B",
    community: "\u793E\u533A",
    help: "\u5E2E\u4F60\u89E3\u51B3",
    "reading-guide": "\u9605\u8BFB\u6307\u5357"
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
    ["meta", { property: "og:image:alt", content: "WorkBuddy \u5B9E\u6218\u84DD\u76AE\u4E66\u9996\u9875\u9884\u89C8" }],
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    ["meta", { name: "twitter:title", content: title }],
    ["meta", { name: "twitter:description", content: description }],
    ["meta", { name: "twitter:image", content: socialImageUrl }],
    ["meta", { name: "twitter:image:alt", content: "WorkBuddy \u5B9E\u6218\u84DD\u76AE\u4E66\u9996\u9875\u9884\u89C8" }],
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
  description: "WorkBuddyHelper\uFF1AWorkBuddy \u5B9E\u6218\u84DD\u76AE\u4E66\uFF0C\u4ECE\u4F7F\u7528\u624B\u518C\u3001\u5B9E\u6218\u6848\u4F8B\u3001\u8FDB\u9636\u7CFB\u7EDF\u5230\u5C97\u4F4D\u4E0E\u884C\u4E1A\u843D\u5730\u3002",
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
    ["meta", { name: "theme-color", content: "#0ea5a4" }],
    ["meta", { name: "author", content: "WorkBuddyHelper" }],
    [
      "meta",
      {
        name: "keywords",
        content: "WorkBuddy,AI \u5DE5\u4F5C\u7CFB\u7EDF,Skill,\u81EA\u52A8\u5316\u4EFB\u52A1,\u591A Agent,\u8FDE\u63A5\u5668,\u4E13\u5BB6\u56E2,\u5B9E\u6218\u6848\u4F8B"
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
      { text: "\u84DD\u76AE\u4E66", link: "/bluebook/" },
      { text: "\u6848\u4F8B", link: "/cases/" },
      { text: "\u5E2E\u4F60\u89E3\u51B3", link: "/help/" },
      {
        text: "\u4EA4\u6D41\u7FA4",
        component: "GroupQrMenu"
      }
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
      message: "WorkBuddyHelper \xB7 WorkBuddy \u5B9E\u6218\u84DD\u76AE\u4E66",
      copyright: "Copyright \xA9 2026 WorkBuddyHelper"
    }
  }
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZG9jcy8udml0ZXByZXNzL2NvbmZpZy5tdHMiLCAiZG9jcy8udml0ZXByZXNzL3NpZGViYXIudHMiLCAiZG9jcy8udml0ZXByZXNzL21lcm1haWQtbWFya2Rvd24udHMiLCAiZG9jcy8udml0ZXByZXNzL3Nlby50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXDNcXFxcV29ya0J1ZGR5R3VpZGUtbWFpblxcXFxkb2NzXFxcXC52aXRlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXDNcXFxcV29ya0J1ZGR5R3VpZGUtbWFpblxcXFxkb2NzXFxcXC52aXRlcHJlc3NcXFxcY29uZmlnLm10c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovMy9Xb3JrQnVkZHlHdWlkZS1tYWluL2RvY3MvLnZpdGVwcmVzcy9jb25maWcubXRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVwcmVzc1wiO1xuXG5pbXBvcnQgeyBzaXRlU2lkZWJhciB9IGZyb20gXCIuL3NpZGViYXJcIjtcbmltcG9ydCB7IGNvbmZpZ3VyZU1lcm1haWRNYXJrZG93biB9IGZyb20gXCIuL21lcm1haWQtbWFya2Rvd25cIjtcbmltcG9ydCB7IGNyZWF0ZVBhZ2VEZXNjcmlwdGlvbiwgY3JlYXRlU2VvSGVhZCB9IGZyb20gXCIuL3Nlb1wiO1xuXG5jb25zdCBzaXRlVXJsID0gcHJvY2Vzcy5lbnYuVklURVBSRVNTX1NJVEVfVVJMIHx8IFwiaHR0cHM6Ly93b3JrYnVkZHloZWxwZXIuZXhhbXBsZS5jb21cIjtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgICBsYW5nOiBcInpoLUNOXCIsXG4gICAgdGl0bGU6IFwiV29ya0J1ZGR5SGVscGVyXCIsXG4gICAgdGl0bGVUZW1wbGF0ZTogXCI6dGl0bGUgXHUwMEI3IFdvcmtCdWRkeUhlbHBlclwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIldvcmtCdWRkeUhlbHBlclx1RkYxQVdvcmtCdWRkeSBcdTVCOUVcdTYyMThcdTg0RERcdTc2QUVcdTRFNjZcdUZGMENcdTRFQ0VcdTRGN0ZcdTc1MjhcdTYyNEJcdTUxOENcdTMwMDFcdTVCOUVcdTYyMThcdTY4NDhcdTRGOEJcdTMwMDFcdThGREJcdTk2MzZcdTdDRkJcdTdFREZcdTUyMzBcdTVDOTdcdTRGNERcdTRFMEVcdTg4NENcdTRFMUFcdTg0M0RcdTU3MzBcdTMwMDJcIixcbiAgICBjbGVhblVybHM6IHRydWUsXG4gICAgbGFzdFVwZGF0ZWQ6IHRydWUsXG4gICAgc3JjRXhjbHVkZTogW1wiKiovc291cmNlLm1kXCIsIFwicGxhbnMvKipcIl0sXG4gICAgc2l0ZW1hcDoge1xuICAgICAgaG9zdG5hbWU6IHNpdGVVcmwsXG4gICAgfSxcbiAgICB0cmFuc2Zvcm1QYWdlRGF0YTogKHBhZ2VEYXRhLCB7IHNpdGVDb25maWcgfSkgPT4ge1xuICAgICAgaWYgKHBhZ2VEYXRhLnJlbGF0aXZlUGF0aC5zdGFydHNXaXRoKFwiY2FzZXMvXCIpKSB7XG4gICAgICAgIHBhZ2VEYXRhLmZyb250bWF0dGVyLmFzaWRlID0gZmFsc2U7XG4gICAgICAgIHBhZ2VEYXRhLmZyb250bWF0dGVyLm91dGxpbmUgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZGVzY3JpcHRpb246IGNyZWF0ZVBhZ2VEZXNjcmlwdGlvbihzaXRlQ29uZmlnLnNyY0RpciwgcGFnZURhdGEpLFxuICAgICAgfTtcbiAgICB9LFxuICAgIHRyYW5zZm9ybUhlYWQ6IChjb250ZXh0KSA9PiBjcmVhdGVTZW9IZWFkKHNpdGVVcmwsIGNvbnRleHQpLFxuICAgIGhlYWQ6IFtcbiAgICAgIFtcImxpbmtcIiwgeyByZWw6IFwiaWNvblwiLCB0eXBlOiBcImltYWdlL3N2Zyt4bWxcIiwgaHJlZjogXCIvZmF2aWNvbi5zdmdcIiB9XSxcbiAgICAgIFtcIm1ldGFcIiwgeyBuYW1lOiBcInRoZW1lLWNvbG9yXCIsIGNvbnRlbnQ6IFwiIzBlYTVhNFwiIH1dLFxuICAgICAgW1wibWV0YVwiLCB7IG5hbWU6IFwiYXV0aG9yXCIsIGNvbnRlbnQ6IFwiV29ya0J1ZGR5SGVscGVyXCIgfV0sXG4gICAgICBbXG4gICAgICAgIFwibWV0YVwiLFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogXCJrZXl3b3Jkc1wiLFxuICAgICAgICAgIGNvbnRlbnQ6XG4gICAgICAgICAgICBcIldvcmtCdWRkeSxBSSBcdTVERTVcdTRGNUNcdTdDRkJcdTdFREYsU2tpbGwsXHU4MUVBXHU1MkE4XHU1MzE2XHU0RUZCXHU1MkExLFx1NTkxQSBBZ2VudCxcdThGREVcdTYzQTVcdTU2NjgsXHU0RTEzXHU1QkI2XHU1NkUyLFx1NUI5RVx1NjIxOFx1Njg0OFx1NEY4QlwiLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICBdLFxuICAgIG1hcmtkb3duOiB7XG4gICAgICBjb25maWc6IGNvbmZpZ3VyZU1lcm1haWRNYXJrZG93bixcbiAgICAgIGltYWdlOiB7XG4gICAgICAgIGxhenlMb2FkaW5nOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIHRoZW1lOiB7XG4gICAgICAgIGxpZ2h0OiBcImdpdGh1Yi1saWdodFwiLFxuICAgICAgICBkYXJrOiBcImdpdGh1Yi1kYXJrXCIsXG4gICAgICB9LFxuICAgIH0sXG4gICAgdGhlbWVDb25maWc6IHtcbiAgICAgIHNpdGVUaXRsZTogXCJXb3JrQnVkZHlIZWxwZXJcIixcbiAgICAgIG5hdjogW1xuICAgICAgICB7IHRleHQ6IFwiXHU5OTk2XHU5ODc1XCIsIGxpbms6IFwiL1wiIH0sXG4gICAgICAgIHsgdGV4dDogXCJcdTg0RERcdTc2QUVcdTRFNjZcIiwgbGluazogXCIvYmx1ZWJvb2svXCIgfSxcbiAgICAgICAgeyB0ZXh0OiBcIlx1Njg0OFx1NEY4QlwiLCBsaW5rOiBcIi9jYXNlcy9cIiB9LFxuICAgICAgICB7IHRleHQ6IFwiXHU1RTJFXHU0RjYwXHU4OUUzXHU1MUIzXCIsIGxpbms6IFwiL2hlbHAvXCIgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6IFwiXHU0RUE0XHU2RDQxXHU3RkE0XCIsXG4gICAgICAgICAgY29tcG9uZW50OiBcIkdyb3VwUXJNZW51XCIsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgICAgc2lkZWJhcjogc2l0ZVNpZGViYXIsXG4gICAgICBzb2NpYWxMaW5rczogW1xuICAgICAgICB7IGljb246IFwiZ2l0aHViXCIsIGxpbms6IFwiaHR0cHM6Ly9naXRodWIuY29tL1wiIH0sXG4gICAgICBdLFxuICAgICAgc2VhcmNoOiB7XG4gICAgICAgIHByb3ZpZGVyOiBcImxvY2FsXCIsXG4gICAgICB9LFxuICAgICAgb3V0bGluZToge1xuICAgICAgICBsZXZlbDogWzIsIDNdLFxuICAgICAgICBsYWJlbDogXCJcdTY3MkNcdTk4NzVcdTc2RUVcdTVGNTVcIixcbiAgICAgIH0sXG4gICAgICBkb2NGb290ZXI6IHtcbiAgICAgICAgcHJldjogXCJcdTRFMEFcdTRFMDBcdTdCQzdcIixcbiAgICAgICAgbmV4dDogXCJcdTRFMEJcdTRFMDBcdTdCQzdcIixcbiAgICAgIH0sXG4gICAgICBsYXN0VXBkYXRlZDoge1xuICAgICAgICB0ZXh0OiBcIlx1NjcwMFx1NTQwRVx1NjZGNFx1NjVCMFwiLFxuICAgICAgICBmb3JtYXRPcHRpb25zOiB7XG4gICAgICAgICAgZGF0ZVN0eWxlOiBcIm1lZGl1bVwiLFxuICAgICAgICAgIHRpbWVTdHlsZTogXCJzaG9ydFwiLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIGZvb3Rlcjoge1xuICAgICAgICBtZXNzYWdlOlxuICAgICAgICAgIFwiV29ya0J1ZGR5SGVscGVyIFx1MDBCNyBXb3JrQnVkZHkgXHU1QjlFXHU2MjE4XHU4NEREXHU3NkFFXHU0RTY2XCIsXG4gICAgICAgIGNvcHlyaWdodDogXCJDb3B5cmlnaHQgXHUwMEE5IDIwMjYgV29ya0J1ZGR5SGVscGVyXCIsXG4gICAgICB9LFxuICAgIH0sXG4gIH0pO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFwzXFxcXFdvcmtCdWRkeUd1aWRlLW1haW5cXFxcZG9jc1xcXFwudml0ZXByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFwzXFxcXFdvcmtCdWRkeUd1aWRlLW1haW5cXFxcZG9jc1xcXFwudml0ZXByZXNzXFxcXHNpZGViYXIudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6LzMvV29ya0J1ZGR5R3VpZGUtbWFpbi9kb2NzLy52aXRlcHJlc3Mvc2lkZWJhci50c1wiO2ltcG9ydCB7IHJlYWRGaWxlU3luYywgcmVhZGRpclN5bmMgfSBmcm9tIFwibm9kZTpmc1wiO1xuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCB9IGZyb20gXCJub2RlOnVybFwiO1xuXG5pbXBvcnQgdHlwZSB7IERlZmF1bHRUaGVtZSB9IGZyb20gXCJ2aXRlcHJlc3NcIjtcblxuY29uc3Qgcm91dGUgPSAoLi4uc2VnbWVudHM6IHN0cmluZ1tdKTogc3RyaW5nID0+XG4gIGVuY29kZVVSSShgL2JsdWVib29rLyR7c2VnbWVudHMubWFwKChzZWdtZW50KSA9PiBzZWdtZW50LnRyaW0oKSkuam9pbihcIi9cIil9L2ApO1xuXG4vLyBcdTRFQ0UgaW5kZXgubWQgXHU2M0QwXHU1M0Q2XHU0RTAwXHU3RUE3XHU2ODA3XHU5ODk4XHU0RjVDXHU0RTNBXHU0RkE3XHU4RkI5XHU2ODBGXHU2NjNFXHU3OTNBXHU2NTg3XHU1QjU3XHVGRjBDXHU1NkRFXHU5MDAwXHU1MjMwXHU3NkVFXHU1RjU1XHU1NDBEXG5jb25zdCBleHRyYWN0VGl0bGUgPSAoaW5kZXhNZFBhdGg6IHN0cmluZywgZmFsbGJhY2s6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgbWFya2Rvd24gPSByZWFkRmlsZVN5bmMoaW5kZXhNZFBhdGgsIFwidXRmOFwiKTtcbiAgICBjb25zdCBoMSA9IG1hcmtkb3duLm1hdGNoKC9eI1xccysoLispJC9tKT8uWzFdPy50cmltKCk7XG4gICAgcmV0dXJuIGgxIHx8IGZhbGxiYWNrO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gZmFsbGJhY2s7XG4gIH1cbn07XG5cbmNvbnN0IGJsdWVib29rRGlyZWN0b3J5ID0gZmlsZVVSTFRvUGF0aChcbiAgbmV3IFVSTChcIi4uL2JsdWVib29rL1wiLCBpbXBvcnQubWV0YS51cmwpLFxuKTtcblxuLy8gV29ya0J1ZGR5IFx1NUI5RVx1NjIxOFx1ODRERFx1NzZBRVx1NEU2Nlx1RkYxQVx1NTZEQlx1N0JDNyArIFx1OTY0NFx1NUY1NVx1RkYwQzI3IFx1N0FFMFx1MzAwMlxuLy8gXHU3QkM3XHU3NkVFXHVGRjA4UGFydFx1RkYwOVx1NEUzQVx1OTg3Nlx1NUM0Mlx1RkYwQ1x1N0FFMFx1ODI4Mlx1RkYwOENoYXB0ZXJcdUZGMDlcdTRFM0FcdTVCNTBcdTk4NzlcdUZGMENcdTU3NDdcdTkwMUFcdThGQzcgaW5kZXgubWQgXHU2M0QwXHU1M0Q2XHU2ODA3XHU5ODk4XHUzMDAyXG5jb25zdCBQQVJUUyA9IFtcbiAgXCJcdTdCMkNcdTRFMDBcdTdCQzcgXHU0RjdGXHU3NTI4XHU2MjRCXHU1MThDXHVGRjFBXHU1MTQ4XHU2MjhBIFdvcmtCdWRkeSBcdTc1MjhcdThENzdcdTY3NjVcIixcbiAgXCJcdTdCMkNcdTRFOENcdTdCQzcgXHU2ODQ4XHU0RjhCXHU3QkM3XHVGRjFBXHU0RUNFXHU0RTAwXHU5ODc5XHU0RUZCXHU1MkExXHU1MjMwXHU0RTAwXHU2NTJGIEFJIFx1NTZFMlx1OTYxRlwiLFxuICBcIlx1N0IyQ1x1NEUwOVx1N0JDNyBcdThGREJcdTk2MzZcdTdCQzdcdUZGMUFcdTYyOEFcdTY4NDhcdTRGOEJcdTUzRDhcdTYyMTBcdTgxRUFcdTVERjFcdTc2ODRcdTVERTVcdTRGNUNcdTdDRkJcdTdFREZcIixcbiAgXCJcdTdCMkNcdTU2REJcdTdCQzcgXHU1Qzk3XHU0RjREXHU0RTBFXHU4ODRDXHU0RTFBXHU4NDNEXHU1NzMwXCIsXG4gIFwiXHU5NjQ0XHU1RjU1XCIsXG5dIGFzIGNvbnN0O1xuXG5jb25zdCBibHVlYm9va1NpZGViYXI6IERlZmF1bHRUaGVtZS5TaWRlYmFyID0ge1xuICBcIi9ibHVlYm9vay9cIjogKCgpID0+IHtcbiAgICBjb25zdCBpdGVtczogRGVmYXVsdFRoZW1lLlNpZGViYXJJdGVtW10gPSBbXG4gICAgICB7IHRleHQ6IFwiXHU4NEREXHU3NkFFXHU0RTY2XHU2MDNCXHU4OUM4XCIsIGxpbms6IFwiL2JsdWVib29rL1wiIH0sXG4gICAgXTtcblxuICAgIGZvciAoY29uc3QgcGFydE5hbWUgb2YgUEFSVFMpIHtcbiAgICAgIGNvbnN0IHBhcnREaXIgPSBgJHtibHVlYm9va0RpcmVjdG9yeX0ke3BhcnROYW1lfWA7XG4gICAgICBjb25zdCBwYXJ0VGl0bGUgPSBleHRyYWN0VGl0bGUoYCR7cGFydERpcn0vaW5kZXgubWRgLCBwYXJ0TmFtZSk7XG5cbiAgICAgIGNvbnN0IGNoaWxkcmVuID0gcmVhZGRpclN5bmMocGFydERpciwgeyB3aXRoRmlsZVR5cGVzOiB0cnVlIH0pXG4gICAgICAgIC5maWx0ZXIoKGVudHJ5KSA9PiBlbnRyeS5pc0RpcmVjdG9yeSgpKVxuICAgICAgICAuc29ydCgobGVmdCwgcmlnaHQpID0+IGxlZnQubmFtZS5sb2NhbGVDb21wYXJlKHJpZ2h0Lm5hbWUsIFwiemgtQ05cIikpXG4gICAgICAgIC5tYXAoKGNoYXB0ZXIpID0+ICh7XG4gICAgICAgICAgdGV4dDogZXh0cmFjdFRpdGxlKFxuICAgICAgICAgICAgYCR7cGFydERpcn0vJHtjaGFwdGVyLm5hbWV9L2luZGV4Lm1kYCxcbiAgICAgICAgICAgIGNoYXB0ZXIubmFtZSxcbiAgICAgICAgICApLFxuICAgICAgICAgIGxpbms6IHJvdXRlKHBhcnROYW1lLCBjaGFwdGVyLm5hbWUpLFxuICAgICAgICB9KSk7XG5cbiAgICAgIGl0ZW1zLnB1c2goe1xuICAgICAgICB0ZXh0OiBwYXJ0VGl0bGUsXG4gICAgICAgIGNvbGxhcHNlZDogZmFsc2UsXG4gICAgICAgIGl0ZW1zOiBjaGlsZHJlbixcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBpdGVtcztcbiAgfSkoKSxcbn07XG5cbmNvbnN0IGNhc2VzRGlyZWN0b3J5ID0gZmlsZVVSTFRvUGF0aChcbiAgbmV3IFVSTChcIi4uL2Nhc2VzL3N1Ym1pc3Npb25zL1wiLCBpbXBvcnQubWV0YS51cmwpLFxuKTtcblxuY29uc3QgY2FzZUl0ZW1zID0gcmVhZGRpclN5bmMoY2FzZXNEaXJlY3RvcnksIHsgd2l0aEZpbGVUeXBlczogdHJ1ZSB9KVxuICAuZmlsdGVyKChlbnRyeSkgPT4gZW50cnkuaXNEaXJlY3RvcnkoKSlcbiAgLm1hcCgoZW50cnkpID0+IHtcbiAgICBjb25zdCBtYXJrZG93biA9IHJlYWRGaWxlU3luYyhcbiAgICAgIG5ldyBVUkwoYC4uL2Nhc2VzL3N1Ym1pc3Npb25zLyR7ZW50cnkubmFtZX0vaW5kZXgubWRgLCBpbXBvcnQubWV0YS51cmwpLFxuICAgICAgXCJ1dGY4XCIsXG4gICAgKTtcbiAgICBjb25zdCBmcm9udG1hdHRlciA9IG1hcmtkb3duLm1hdGNoKC9eLS0tXFxzKlxcbihbXFxzXFxTXSo/KVxcbi0tLS8pPy5bMV0gfHwgXCJcIjtcbiAgICBjb25zdCByZWFkRmllbGQgPSAoZmllbGQ6IHN0cmluZyk6IHN0cmluZyA9PlxuICAgICAgZnJvbnRtYXR0ZXJcbiAgICAgICAgLm1hdGNoKG5ldyBSZWdFeHAoYF4ke2ZpZWxkfTpcXFxccyooLispJGAsIFwibVwiKSk/LlsxXVxuICAgICAgICA/LnRyaW0oKVxuICAgICAgICAucmVwbGFjZSgvXlsnXCJdfFsnXCJdJC9nLCBcIlwiKSB8fCBcIlwiO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGU6IHJlYWRGaWVsZChcImRhdGVcIiksXG4gICAgICBpdGVtOiB7XG4gICAgICAgIHRleHQ6IHJlYWRGaWVsZChcInRpdGxlXCIpIHx8IGVudHJ5Lm5hbWUsXG4gICAgICAgIGxpbms6IGVuY29kZVVSSShgL2Nhc2VzL3N1Ym1pc3Npb25zLyR7ZW50cnkubmFtZX0vYCksXG4gICAgICB9IHNhdGlzZmllcyBEZWZhdWx0VGhlbWUuU2lkZWJhckl0ZW0sXG4gICAgfTtcbiAgfSlcbiAgLnNvcnQoKGxlZnQsIHJpZ2h0KSA9PiBsZWZ0LmRhdGUubG9jYWxlQ29tcGFyZShyaWdodC5kYXRlKSlcbiAgLm1hcCgoeyBpdGVtOiBjYXNlSXRlbSB9KSA9PiBjYXNlSXRlbSk7XG5cbmNvbnN0IGNhc2VzU2lkZWJhcjogRGVmYXVsdFRoZW1lLlNpZGViYXJJdGVtW10gPSBbXG4gIHsgdGV4dDogXCJcdTY4NDhcdTRGOEJcdTk5OTZcdTk4NzVcIiwgbGluazogXCIvY2FzZXMvXCIgfSxcbiAgeyB0ZXh0OiBcIlx1NTk4Mlx1NEY1NVx1NjNEMFx1NEVBNFwiLCBsaW5rOiBcIi9jb21tdW5pdHkvY2FzZS1jb250cmlidXRpbmdcIiB9LFxuICB7XG4gICAgdGV4dDogXCJcdTY4NDhcdTRGOEJcdTUyMTdcdTg4NjhcIixcbiAgICBjb2xsYXBzZWQ6IGZhbHNlLFxuICAgIGl0ZW1zOiBjYXNlSXRlbXMsXG4gIH0sXG5dO1xuXG5leHBvcnQgY29uc3Qgc2l0ZVNpZGViYXI6IERlZmF1bHRUaGVtZS5TaWRlYmFyID0ge1xuICAuLi5ibHVlYm9va1NpZGViYXIsXG4gIFwiL2Nhc2VzL1wiOiBjYXNlc1NpZGViYXIsXG4gIFwiL2NvbW11bml0eS9jYXNlLWNvbnRyaWJ1dGluZ1wiOiBjYXNlc1NpZGViYXIsXG59O1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFwzXFxcXFdvcmtCdWRkeUd1aWRlLW1haW5cXFxcZG9jc1xcXFwudml0ZXByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFwzXFxcXFdvcmtCdWRkeUd1aWRlLW1haW5cXFxcZG9jc1xcXFwudml0ZXByZXNzXFxcXG1lcm1haWQtbWFya2Rvd24udHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6LzMvV29ya0J1ZGR5R3VpZGUtbWFpbi9kb2NzLy52aXRlcHJlc3MvbWVybWFpZC1tYXJrZG93bi50c1wiO2ltcG9ydCB0eXBlIE1hcmtkb3duSXQgZnJvbSBcIm1hcmtkb3duLWl0XCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb25maWd1cmVNZXJtYWlkTWFya2Rvd24obWQ6IE1hcmtkb3duSXQpIHtcbiAgY29uc3QgZmFsbGJhY2tGZW5jZSA9IG1kLnJlbmRlcmVyLnJ1bGVzLmZlbmNlPy5iaW5kKG1kLnJlbmRlcmVyLnJ1bGVzKTtcblxuICBtZC5yZW5kZXJlci5ydWxlcy5mZW5jZSA9ICh0b2tlbnMsIGluZGV4LCBvcHRpb25zLCBlbnYsIHNlbGYpID0+IHtcbiAgICBjb25zdCB0b2tlbiA9IHRva2Vuc1tpbmRleF07XG5cbiAgICBpZiAodG9rZW4uaW5mby50cmltKCkgIT09IFwibWVybWFpZFwiKSB7XG4gICAgICByZXR1cm4gZmFsbGJhY2tGZW5jZT8uKHRva2VucywgaW5kZXgsIG9wdGlvbnMsIGVudiwgc2VsZikgPz8gc2VsZi5yZW5kZXJUb2tlbih0b2tlbnMsIGluZGV4LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBjb25zdCBncmFwaCA9IGVuY29kZVVSSUNvbXBvbmVudCh0b2tlbi5jb250ZW50KTtcbiAgICByZXR1cm4gYDxNZXJtYWlkRGlhZ3JhbSBncmFwaD1cIiR7Z3JhcGh9XCIgLz5gO1xuICB9O1xufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFwzXFxcXFdvcmtCdWRkeUd1aWRlLW1haW5cXFxcZG9jc1xcXFwudml0ZXByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFwzXFxcXFdvcmtCdWRkeUd1aWRlLW1haW5cXFxcZG9jc1xcXFwudml0ZXByZXNzXFxcXHNlby50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovMy9Xb3JrQnVkZHlHdWlkZS1tYWluL2RvY3MvLnZpdGVwcmVzcy9zZW8udHNcIjtpbXBvcnQgeyByZWFkRmlsZVN5bmMgfSBmcm9tIFwibm9kZTpmc1wiO1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCJub2RlOnBhdGhcIjtcblxuaW1wb3J0IHR5cGUgeyBIZWFkQ29uZmlnLCBQYWdlRGF0YSwgVHJhbnNmb3JtQ29udGV4dCB9IGZyb20gXCJ2aXRlcHJlc3NcIjtcblxuY29uc3QgU0lURV9OQU1FID0gXCJXb3JrQnVkZHlIZWxwZXJcIjtcbmNvbnN0IFNJVEVfQUxURVJOQVRFX05BTUUgPSBcIldvcmtCdWRkeUhlbHBlciBcdTAwQjcgV29ya0J1ZGR5IFx1NUI5RVx1NjIxOFx1ODRERFx1NzZBRVx1NEU2NlwiO1xuY29uc3QgT1JHQU5JWkFUSU9OX05BTUUgPSBcIldvcmtCdWRkeUhlbHBlclwiO1xuY29uc3QgR0lUSFVCX1VSTCA9IFwiaHR0cHM6Ly9naXRodWIuY29tL1wiO1xuY29uc3QgREVGQVVMVF9ERVNDUklQVElPTiA9XG4gIFwiV29ya0J1ZGR5IFx1NUI5RVx1NjIxOFx1ODRERFx1NzZBRVx1NEU2Nlx1RkYxQVx1NEVDRVx1NEY3Rlx1NzUyOFx1NjI0Qlx1NTE4Q1x1MzAwMVx1NUI5RVx1NjIxOFx1Njg0OFx1NEY4Qlx1MzAwMVx1OEZEQlx1OTYzNlx1N0NGQlx1N0VERlx1NTIzMFx1NUM5N1x1NEY0RFx1NEUwRVx1ODg0Q1x1NEUxQVx1ODQzRFx1NTczMFx1RkYwQ1x1NEUwMFx1Njc2MVx1NUI4Q1x1NjU3NFx1NzY4NCBXb3JrQnVkZHkgXHU1QjY2XHU0RTYwXHU4REVGXHU3RUJGXHUzMDAyXCI7XG5cbmZ1bmN0aW9uIGNsZWFuUGFnZVBhdGgocGFnZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgaWYgKHBhZ2UgPT09IFwiaW5kZXgubWRcIikgcmV0dXJuIFwiL1wiO1xuICBpZiAocGFnZS5lbmRzV2l0aChcIi9pbmRleC5tZFwiKSkge1xuICAgIHJldHVybiBgLyR7cGFnZS5zbGljZSgwLCAtXCJpbmRleC5tZFwiLmxlbmd0aCl9YDtcbiAgfVxuXG4gIHJldHVybiBgLyR7cGFnZS5yZXBsYWNlKC9cXC5tZCQvLCBcIlwiKX1gO1xufVxuXG5mdW5jdGlvbiBhYnNvbHV0ZVBhZ2VVcmwoc2l0ZVVybDogc3RyaW5nLCBwYWdlOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gbmV3IFVSTChjbGVhblBhZ2VQYXRoKHBhZ2UpLCBgJHtzaXRlVXJsfS9gKS5ocmVmO1xufVxuXG5mdW5jdGlvbiBzdHJpcE1hcmtkb3duKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gdmFsdWVcbiAgICAucmVwbGFjZSgvIVxcW1teXFxdXSpcXF1cXChbXildKlxcKS9nLCBcIlwiKVxuICAgIC5yZXBsYWNlKC9cXFsoW15cXF1dKylcXF1cXChbXildKlxcKS9nLCBcIiQxXCIpXG4gICAgLnJlcGxhY2UoLzxbXj5dKz4vZywgXCJcIilcbiAgICAucmVwbGFjZSgvW2AqX35dL2csIFwiXCIpXG4gICAgLnJlcGxhY2UoL1xcXFwoW1xcXFxgKnt9XFxbXFxdKCkjK1xcLS4hXz5dKS9nLCBcIiQxXCIpXG4gICAgLnJlcGxhY2UoL1xccysvZywgXCIgXCIpXG4gICAgLnRyaW0oKTtcbn1cblxuZnVuY3Rpb24gZGVjb2RlSHRtbEVudGl0aWVzKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gdmFsdWVcbiAgICAucmVwbGFjZSgvJm5ic3A7L2csIFwiIFwiKVxuICAgIC5yZXBsYWNlKC8mYW1wOy9nLCBcIiZcIilcbiAgICAucmVwbGFjZSgvJnF1b3Q7L2csICdcIicpXG4gICAgLnJlcGxhY2UoLyYjMzk7fCZhcG9zOy9nLCBcIidcIilcbiAgICAucmVwbGFjZSgvJmx0Oy9nLCBcIjxcIilcbiAgICAucmVwbGFjZSgvJmd0Oy9nLCBcIj5cIilcbiAgICAucmVwbGFjZSgvJiMoXFxkKyk7L2csIChfLCBjb2RlUG9pbnQ6IHN0cmluZykgPT5cbiAgICAgIFN0cmluZy5mcm9tQ29kZVBvaW50KE51bWJlcihjb2RlUG9pbnQpKSxcbiAgICApXG4gICAgLnJlcGxhY2UoLyYjeChbMC05YS1mXSspOy9naSwgKF8sIGNvZGVQb2ludDogc3RyaW5nKSA9PlxuICAgICAgU3RyaW5nLmZyb21Db2RlUG9pbnQoTnVtYmVyLnBhcnNlSW50KGNvZGVQb2ludCwgMTYpKSxcbiAgICApO1xufVxuXG5mdW5jdGlvbiB0cnVuY2F0ZURlc2NyaXB0aW9uKHZhbHVlOiBzdHJpbmcsIG1heExlbmd0aCA9IDE1NSk6IHN0cmluZyB7XG4gIGNvbnN0IGNoYXJhY3RlcnMgPSBBcnJheS5mcm9tKHZhbHVlKTtcbiAgaWYgKGNoYXJhY3RlcnMubGVuZ3RoIDw9IG1heExlbmd0aCkgcmV0dXJuIHZhbHVlO1xuXG4gIGNvbnN0IHNob3J0ZW5lZCA9IGNoYXJhY3RlcnMuc2xpY2UoMCwgbWF4TGVuZ3RoKS5qb2luKFwiXCIpO1xuICBjb25zdCBwdW5jdHVhdGlvbkluZGV4ID0gTWF0aC5tYXgoXG4gICAgc2hvcnRlbmVkLmxhc3RJbmRleE9mKFwiXHUzMDAyXCIpLFxuICAgIHNob3J0ZW5lZC5sYXN0SW5kZXhPZihcIlx1RkYxQlwiKSxcbiAgICBzaG9ydGVuZWQubGFzdEluZGV4T2YoXCJcdUZGMENcIiksXG4gICk7XG5cbiAgcmV0dXJuIGAke1xuICAgIHB1bmN0dWF0aW9uSW5kZXggPj0gTWF0aC5mbG9vcihtYXhMZW5ndGggKiAwLjY1KVxuICAgICAgPyBzaG9ydGVuZWQuc2xpY2UoMCwgcHVuY3R1YXRpb25JbmRleClcbiAgICAgIDogc2hvcnRlbmVkXG4gIH1cdTIwMjZgO1xufVxuXG5mdW5jdGlvbiBleHRyYWN0RGVzY3JpcHRpb24obWFya2Rvd246IHN0cmluZywgZmFsbGJhY2s6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IG1haW5TdGFydCA9IG1hcmtkb3duLmluZGV4T2YoXCI8bWFpblwiKTtcbiAgY29uc3QgbWFpbkVuZCA9IG1haW5TdGFydCA+PSAwID8gbWFya2Rvd24uaW5kZXhPZihcIjwvbWFpbj5cIiwgbWFpblN0YXJ0KSA6IC0xO1xuICBjb25zdCBwYWdlQ29udGVudCA9XG4gICAgbWFpblN0YXJ0ID49IDAgJiYgbWFpbkVuZCA+IG1haW5TdGFydFxuICAgICAgPyBtYXJrZG93bi5zbGljZShtYWluU3RhcnQsIG1haW5FbmQpXG4gICAgICA6IG1hcmtkb3duO1xuICBjb25zdCBodG1sUGFyYWdyYXBocyA9IEFycmF5LmZyb20oXG4gICAgcGFnZUNvbnRlbnQubWF0Y2hBbGwoLzxwKD86XFxzW14+XSopPz4oW1xcc1xcU10qPyk8XFwvcD4vZ2kpLFxuICAgIChtYXRjaCkgPT4gZGVjb2RlSHRtbEVudGl0aWVzKHN0cmlwTWFya2Rvd24obWF0Y2hbMV0pKSxcbiAgKS5maWx0ZXIoKHBhcmFncmFwaCkgPT4gQXJyYXkuZnJvbShwYXJhZ3JhcGgpLmxlbmd0aCA+PSAxMik7XG5cbiAgaWYgKGh0bWxQYXJhZ3JhcGhzLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCBzZWxlY3RlZDogc3RyaW5nW10gPSBbXTtcbiAgICBmb3IgKGNvbnN0IHBhcmFncmFwaCBvZiBodG1sUGFyYWdyYXBocykge1xuICAgICAgc2VsZWN0ZWQucHVzaChwYXJhZ3JhcGgpO1xuICAgICAgaWYgKEFycmF5LmZyb20oc2VsZWN0ZWQuam9pbihcIiBcIikpLmxlbmd0aCA+PSA5MCkgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydW5jYXRlRGVzY3JpcHRpb24oc2VsZWN0ZWQuam9pbihcIiBcIikpO1xuICB9XG5cbiAgY29uc3QgY29udGVudCA9IG1hcmtkb3duLnJlcGxhY2UoXG4gICAgL14tLS1cXHMqW1xcclxcbl0rW1xcc1xcU10qP1tcXHJcXG5dKy0tLVxccypbXFxyXFxuXSsvLFxuICAgIFwiXCIsXG4gICk7XG4gIGNvbnN0IGNhbmRpZGF0ZXM6IHN0cmluZ1tdID0gW107XG5cbiAgZm9yIChjb25zdCBibG9jayBvZiBjb250ZW50LnNwbGl0KC9cXHI/XFxuXFxzKlxccj9cXG4vKSkge1xuICAgIGNvbnN0IHRyaW1tZWQgPSBibG9jay50cmltKCk7XG4gICAgaWYgKFxuICAgICAgIXRyaW1tZWQgfHxcbiAgICAgIHRyaW1tZWQuc3RhcnRzV2l0aChcIiNcIikgfHxcbiAgICAgIHRyaW1tZWQuc3RhcnRzV2l0aChcImBgYFwiKSB8fFxuICAgICAgdHJpbW1lZC5zdGFydHNXaXRoKFwifn5+XCIpIHx8XG4gICAgICB0cmltbWVkLnN0YXJ0c1dpdGgoXCJpbXBvcnQgXCIpIHx8XG4gICAgICB0cmltbWVkLnN0YXJ0c1dpdGgoXCJleHBvcnQgXCIpIHx8XG4gICAgICB0cmltbWVkLnN0YXJ0c1dpdGgoXCI8IS0tXCIpIHx8XG4gICAgICB0cmltbWVkLnN0YXJ0c1dpdGgoXCI8XCIpIHx8XG4gICAgICB0cmltbWVkLnN0YXJ0c1dpdGgoXCJ8XCIpIHx8XG4gICAgICAvXlstKitdXFxzLy50ZXN0KHRyaW1tZWQpIHx8XG4gICAgICAvXlxcZCtbLildXFxzLy50ZXN0KHRyaW1tZWQpXG4gICAgKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBjb25zdCBwbGFpblRleHQgPSBzdHJpcE1hcmtkb3duKHRyaW1tZWQpO1xuICAgIGlmIChBcnJheS5mcm9tKHBsYWluVGV4dCkubGVuZ3RoIDwgMTIpIGNvbnRpbnVlO1xuXG4gICAgY2FuZGlkYXRlcy5wdXNoKHBsYWluVGV4dCk7XG4gICAgaWYgKEFycmF5LmZyb20oY2FuZGlkYXRlcy5qb2luKFwiIFwiKSkubGVuZ3RoID49IDkwKSBicmVhaztcbiAgfVxuXG4gIHJldHVybiB0cnVuY2F0ZURlc2NyaXB0aW9uKGNhbmRpZGF0ZXMuam9pbihcIiBcIikgfHwgZmFsbGJhY2sgfHwgREVGQVVMVF9ERVNDUklQVElPTik7XG59XG5cbmZ1bmN0aW9uIGJyZWFkY3J1bWJOYW1lKHNlZ21lbnQ6IHN0cmluZyk6IHN0cmluZyB7XG4gIGxldCBkZWNvZGVkU2VnbWVudCA9IHNlZ21lbnQ7XG5cbiAgdHJ5IHtcbiAgICBkZWNvZGVkU2VnbWVudCA9IGRlY29kZVVSSUNvbXBvbmVudChzZWdtZW50KTtcbiAgfSBjYXRjaCB7XG4gICAgLy8gS2VlcCB0aGUgb3JpZ2luYWwgc2VnbWVudCB3aGVuIGl0IGlzIG5vdCB2YWxpZCBVUkktZW5jb2RlZCB0ZXh0LlxuICB9XG5cbiAgY29uc3QgbGFiZWxzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICAgIGJsdWVib29rOiBcIlx1ODRERFx1NzZBRVx1NEU2NlwiLFxuICAgIGNhc2VzOiBcIlx1Njg0OFx1NEY4QlwiLFxuICAgIGNvbW11bml0eTogXCJcdTc5M0VcdTUzM0FcIixcbiAgICBoZWxwOiBcIlx1NUUyRVx1NEY2MFx1ODlFM1x1NTFCM1wiLFxuICAgIFwicmVhZGluZy1ndWlkZVwiOiBcIlx1OTYwNVx1OEJGQlx1NjMwN1x1NTM1N1wiLFxuICB9O1xuXG4gIHJldHVybiBsYWJlbHNbZGVjb2RlZFNlZ21lbnRdIHx8IGRlY29kZWRTZWdtZW50LnJlcGxhY2UoL1stX10vZywgXCIgXCIpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVCcmVhZGNydW1icyhcbiAgc2l0ZVVybDogc3RyaW5nLFxuICBwYWdlOiBzdHJpbmcsXG4gIHBhZ2VUaXRsZTogc3RyaW5nLFxuICBjYW5vbmljYWxVcmw6IHN0cmluZyxcbikge1xuICBjb25zdCBwYXRoID0gY2xlYW5QYWdlUGF0aChwYWdlKS5yZXBsYWNlKC9eXFwvfFxcLyQvZywgXCJcIik7XG4gIGlmICghcGF0aCkgcmV0dXJuIG51bGw7XG5cbiAgY29uc3Qgc2VnbWVudHMgPSBwYXRoLnNwbGl0KFwiL1wiKTtcbiAgY29uc3QgaXRlbUxpc3RFbGVtZW50ID0gW1xuICAgIHtcbiAgICAgIFwiQHR5cGVcIjogXCJMaXN0SXRlbVwiLFxuICAgICAgcG9zaXRpb246IDEsXG4gICAgICBuYW1lOiBcIlx1OTk5Nlx1OTg3NVwiLFxuICAgICAgaXRlbTogbmV3IFVSTChcIi9cIiwgYCR7c2l0ZVVybH0vYCkuaHJlZixcbiAgICB9LFxuICAgIC4uLnNlZ21lbnRzLm1hcCgoc2VnbWVudCwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGlzTGFzdCA9IGluZGV4ID09PSBzZWdtZW50cy5sZW5ndGggLSAxO1xuICAgICAgY29uc3QgcGFyZW50UGF0aCA9IGAvJHtzZWdtZW50cy5zbGljZSgwLCBpbmRleCArIDEpLmpvaW4oXCIvXCIpfS9gO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBcIkB0eXBlXCI6IFwiTGlzdEl0ZW1cIixcbiAgICAgICAgcG9zaXRpb246IGluZGV4ICsgMixcbiAgICAgICAgbmFtZTogaXNMYXN0ID8gcGFnZVRpdGxlIDogYnJlYWRjcnVtYk5hbWUoc2VnbWVudCksXG4gICAgICAgIGl0ZW06IGlzTGFzdCA/IGNhbm9uaWNhbFVybCA6IG5ldyBVUkwocGFyZW50UGF0aCwgYCR7c2l0ZVVybH0vYCkuaHJlZixcbiAgICAgIH07XG4gICAgfSksXG4gIF07XG5cbiAgcmV0dXJuIHtcbiAgICBcIkB0eXBlXCI6IFwiQnJlYWRjcnVtYkxpc3RcIixcbiAgICBcIkBpZFwiOiBgJHtjYW5vbmljYWxVcmx9I2JyZWFkY3J1bWJgLFxuICAgIGl0ZW1MaXN0RWxlbWVudCxcbiAgfTtcbn1cblxuZnVuY3Rpb24gc2VyaWFsaXplSnNvbkxkKHZhbHVlOiB1bmtub3duKTogc3RyaW5nIHtcbiAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHZhbHVlKS5yZXBsYWNlKC88L2csIFwiXFxcXHUwMDNjXCIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUGFnZURlc2NyaXB0aW9uKFxuICBzb3VyY2VEaXJlY3Rvcnk6IHN0cmluZyxcbiAgcGFnZURhdGE6IFBhZ2VEYXRhLFxuKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgaWYgKHBhZ2VEYXRhLmRlc2NyaXB0aW9uIHx8IHBhZ2VEYXRhLmlzTm90Rm91bmQgfHwgIXBhZ2VEYXRhLmZpbGVQYXRoKSB7XG4gICAgcmV0dXJuIHBhZ2VEYXRhLmRlc2NyaXB0aW9uIHx8IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGNvbnN0IGZhbGxiYWNrID0gYCR7cGFnZURhdGEudGl0bGV9XHVGRjFBJHtERUZBVUxUX0RFU0NSSVBUSU9OfWA7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBtYXJrZG93biA9IHJlYWRGaWxlU3luYyhcbiAgICAgIHJlc29sdmUoc291cmNlRGlyZWN0b3J5LCBwYWdlRGF0YS5maWxlUGF0aCksXG4gICAgICBcInV0ZjhcIixcbiAgICApO1xuICAgIHJldHVybiBleHRyYWN0RGVzY3JpcHRpb24obWFya2Rvd24sIGZhbGxiYWNrKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIHRydW5jYXRlRGVzY3JpcHRpb24oZmFsbGJhY2spO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZW9IZWFkKFxuICBzaXRlVXJsOiBzdHJpbmcsXG4gIGNvbnRleHQ6IFRyYW5zZm9ybUNvbnRleHQsXG4pOiBIZWFkQ29uZmlnW10ge1xuICBjb25zdCB7IHBhZ2UsIHBhZ2VEYXRhLCB0aXRsZSwgY29udGVudCB9ID0gY29udGV4dDtcblxuICBpZiAocGFnZURhdGEuaXNOb3RGb3VuZCkge1xuICAgIHJldHVybiBbXG4gICAgICBbXCJtZXRhXCIsIHsgbmFtZTogXCJyb2JvdHNcIiwgY29udGVudDogXCJub2luZGV4LCBub2ZvbGxvd1wiIH1dLFxuICAgIF07XG4gIH1cblxuICBjb25zdCBjYW5vbmljYWxVcmwgPSBhYnNvbHV0ZVBhZ2VVcmwoc2l0ZVVybCwgcGFnZSk7XG4gIGNvbnN0IHNvY2lhbEltYWdlVXJsID0gbmV3IFVSTChcIi9vZy93b3JrYnVkZHktZ3VpZGUucG5nXCIsIGAke3NpdGVVcmx9L2ApLmhyZWY7XG4gIGNvbnN0IGRlc2NyaXB0aW9uID0gcGFnZURhdGEuZGVzY3JpcHRpb25cbiAgICA/IHRydW5jYXRlRGVzY3JpcHRpb24ocGFnZURhdGEuZGVzY3JpcHRpb24pXG4gICAgOiBleHRyYWN0RGVzY3JpcHRpb24oXG4gICAgICAgIGNvbnRlbnQsXG4gICAgICAgIGAke3BhZ2VEYXRhLnRpdGxlfVx1RkYxQSR7Y29udGV4dC5kZXNjcmlwdGlvbiB8fCBERUZBVUxUX0RFU0NSSVBUSU9OfWAsXG4gICAgICApO1xuICBjb25zdCBpc0hvbWUgPSBwYWdlID09PSBcImluZGV4Lm1kXCI7XG4gIGNvbnN0IGlzQmx1ZWJvb2tQYWdlID0gcGFnZS5zdGFydHNXaXRoKFwiYmx1ZWJvb2svXCIpO1xuICBjb25zdCBtb2RpZmllZFRpbWUgPSBwYWdlRGF0YS5sYXN0VXBkYXRlZFxuICAgID8gbmV3IERhdGUocGFnZURhdGEubGFzdFVwZGF0ZWQpLnRvSVNPU3RyaW5nKClcbiAgICA6IHVuZGVmaW5lZDtcblxuICBjb25zdCBvcmdhbml6YXRpb24gPSB7XG4gICAgXCJAdHlwZVwiOiBcIk9yZ2FuaXphdGlvblwiLFxuICAgIFwiQGlkXCI6IGAke3NpdGVVcmx9LyNvcmdhbml6YXRpb25gLFxuICAgIG5hbWU6IE9SR0FOSVpBVElPTl9OQU1FLFxuICAgIHVybDogYCR7c2l0ZVVybH0vYCxcbiAgICBzYW1lQXM6IFtHSVRIVUJfVVJMXSxcbiAgfTtcbiAgY29uc3Qgd2Vic2l0ZSA9IHtcbiAgICBcIkB0eXBlXCI6IFwiV2ViU2l0ZVwiLFxuICAgIFwiQGlkXCI6IGAke3NpdGVVcmx9LyN3ZWJzaXRlYCxcbiAgICB1cmw6IGAke3NpdGVVcmx9L2AsXG4gICAgbmFtZTogU0lURV9OQU1FLFxuICAgIGFsdGVybmF0ZU5hbWU6IFNJVEVfQUxURVJOQVRFX05BTUUsXG4gICAgZGVzY3JpcHRpb246IERFRkFVTFRfREVTQ1JJUFRJT04sXG4gICAgaW5MYW5ndWFnZTogXCJ6aC1DTlwiLFxuICAgIHB1Ymxpc2hlcjogeyBcIkBpZFwiOiBgJHtzaXRlVXJsfS8jb3JnYW5pemF0aW9uYCB9LFxuICB9O1xuICBjb25zdCBicmVhZGNydW1iVGl0bGUgPVxuICAgIHR5cGVvZiBwYWdlRGF0YS5mcm9udG1hdHRlci5icmVhZGNydW1iVGl0bGUgPT09IFwic3RyaW5nXCJcbiAgICAgID8gcGFnZURhdGEuZnJvbnRtYXR0ZXIuYnJlYWRjcnVtYlRpdGxlXG4gICAgICA6IHBhZ2VEYXRhLnRpdGxlO1xuICBjb25zdCBicmVhZGNydW1icyA9IGNyZWF0ZUJyZWFkY3J1bWJzKFxuICAgIHNpdGVVcmwsXG4gICAgcGFnZSxcbiAgICBicmVhZGNydW1iVGl0bGUsXG4gICAgY2Fub25pY2FsVXJsLFxuICApO1xuICBjb25zdCBwYWdlRW50aXR5ID0gaXNIb21lXG4gICAgPyBudWxsXG4gICAgOiB7XG4gICAgICAgIFwiQHR5cGVcIjogaXNCbHVlYm9va1BhZ2UgPyBcIkFydGljbGVcIiA6IFwiV2ViUGFnZVwiLFxuICAgICAgICBcIkBpZFwiOiBgJHtjYW5vbmljYWxVcmx9I3dlYnBhZ2VgLFxuICAgICAgICB1cmw6IGNhbm9uaWNhbFVybCxcbiAgICAgICAgbmFtZTogcGFnZURhdGEudGl0bGUsXG4gICAgICAgIC4uLihpc0JsdWVib29rUGFnZSA/IHsgaGVhZGxpbmU6IHBhZ2VEYXRhLnRpdGxlIH0gOiB7fSksXG4gICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICBpbkxhbmd1YWdlOiBcInpoLUNOXCIsXG4gICAgICAgIGlzUGFydE9mOiB7IFwiQGlkXCI6IGAke3NpdGVVcmx9LyN3ZWJzaXRlYCB9LFxuICAgICAgICBicmVhZGNydW1iOiBicmVhZGNydW1ic1xuICAgICAgICAgID8geyBcIkBpZFwiOiBgJHtjYW5vbmljYWxVcmx9I2JyZWFkY3J1bWJgIH1cbiAgICAgICAgICA6IHVuZGVmaW5lZCxcbiAgICAgICAgLi4uKGlzQmx1ZWJvb2tQYWdlXG4gICAgICAgICAgPyB7XG4gICAgICAgICAgICAgIG1haW5FbnRpdHlPZlBhZ2U6IGNhbm9uaWNhbFVybCxcbiAgICAgICAgICAgICAgaW1hZ2U6IFtzb2NpYWxJbWFnZVVybF0sXG4gICAgICAgICAgICAgIGF1dGhvcjogeyBcIkBpZFwiOiBgJHtzaXRlVXJsfS8jb3JnYW5pemF0aW9uYCB9LFxuICAgICAgICAgICAgICBwdWJsaXNoZXI6IHsgXCJAaWRcIjogYCR7c2l0ZVVybH0vI29yZ2FuaXphdGlvbmAgfSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICA6IHt9KSxcbiAgICAgICAgLi4uKG1vZGlmaWVkVGltZSA/IHsgZGF0ZU1vZGlmaWVkOiBtb2RpZmllZFRpbWUgfSA6IHt9KSxcbiAgICAgIH07XG4gIGNvbnN0IGpzb25MZEdyYXBoID0gW29yZ2FuaXphdGlvbiwgd2Vic2l0ZSwgcGFnZUVudGl0eSwgYnJlYWRjcnVtYnNdLmZpbHRlcihcbiAgICBCb29sZWFuLFxuICApO1xuXG4gIGNvbnN0IGhlYWQ6IEhlYWRDb25maWdbXSA9IFtcbiAgICBbXCJtZXRhXCIsIHsgbmFtZTogXCJkZXNjcmlwdGlvblwiLCBjb250ZW50OiBkZXNjcmlwdGlvbiB9XSxcbiAgICBbXG4gICAgICBcIm1ldGFcIixcbiAgICAgIHtcbiAgICAgICAgbmFtZTogXCJyb2JvdHNcIixcbiAgICAgICAgY29udGVudDpcbiAgICAgICAgICBcImluZGV4LCBmb2xsb3csIG1heC1pbWFnZS1wcmV2aWV3OmxhcmdlLCBtYXgtc25pcHBldDotMSwgbWF4LXZpZGVvLXByZXZpZXc6LTFcIixcbiAgICAgIH0sXG4gICAgXSxcbiAgICBbXCJsaW5rXCIsIHsgcmVsOiBcImNhbm9uaWNhbFwiLCBocmVmOiBjYW5vbmljYWxVcmwgfV0sXG4gICAgW1wibWV0YVwiLCB7IHByb3BlcnR5OiBcIm9nOmxvY2FsZVwiLCBjb250ZW50OiBcInpoX0NOXCIgfV0sXG4gICAgW1wibWV0YVwiLCB7IHByb3BlcnR5OiBcIm9nOnNpdGVfbmFtZVwiLCBjb250ZW50OiBTSVRFX05BTUUgfV0sXG4gICAgW1wibWV0YVwiLCB7IHByb3BlcnR5OiBcIm9nOnR5cGVcIiwgY29udGVudDogaXNCbHVlYm9va1BhZ2UgPyBcImFydGljbGVcIiA6IFwid2Vic2l0ZVwiIH1dLFxuICAgIFtcIm1ldGFcIiwgeyBwcm9wZXJ0eTogXCJvZzp0aXRsZVwiLCBjb250ZW50OiB0aXRsZSB9XSxcbiAgICBbXCJtZXRhXCIsIHsgcHJvcGVydHk6IFwib2c6ZGVzY3JpcHRpb25cIiwgY29udGVudDogZGVzY3JpcHRpb24gfV0sXG4gICAgW1wibWV0YVwiLCB7IHByb3BlcnR5OiBcIm9nOnVybFwiLCBjb250ZW50OiBjYW5vbmljYWxVcmwgfV0sXG4gICAgW1wibWV0YVwiLCB7IHByb3BlcnR5OiBcIm9nOmltYWdlXCIsIGNvbnRlbnQ6IHNvY2lhbEltYWdlVXJsIH1dLFxuICAgIFtcIm1ldGFcIiwgeyBwcm9wZXJ0eTogXCJvZzppbWFnZTp0eXBlXCIsIGNvbnRlbnQ6IFwiaW1hZ2UvcG5nXCIgfV0sXG4gICAgW1wibWV0YVwiLCB7IHByb3BlcnR5OiBcIm9nOmltYWdlOndpZHRoXCIsIGNvbnRlbnQ6IFwiMTI4MFwiIH1dLFxuICAgIFtcIm1ldGFcIiwgeyBwcm9wZXJ0eTogXCJvZzppbWFnZTpoZWlnaHRcIiwgY29udGVudDogXCI3MjBcIiB9XSxcbiAgICBbXCJtZXRhXCIsIHsgcHJvcGVydHk6IFwib2c6aW1hZ2U6YWx0XCIsIGNvbnRlbnQ6IFwiV29ya0J1ZGR5IFx1NUI5RVx1NjIxOFx1ODRERFx1NzZBRVx1NEU2Nlx1OTk5Nlx1OTg3NVx1OTg4NFx1ODlDOFwiIH1dLFxuICAgIFtcIm1ldGFcIiwgeyBuYW1lOiBcInR3aXR0ZXI6Y2FyZFwiLCBjb250ZW50OiBcInN1bW1hcnlfbGFyZ2VfaW1hZ2VcIiB9XSxcbiAgICBbXCJtZXRhXCIsIHsgbmFtZTogXCJ0d2l0dGVyOnRpdGxlXCIsIGNvbnRlbnQ6IHRpdGxlIH1dLFxuICAgIFtcIm1ldGFcIiwgeyBuYW1lOiBcInR3aXR0ZXI6ZGVzY3JpcHRpb25cIiwgY29udGVudDogZGVzY3JpcHRpb24gfV0sXG4gICAgW1wibWV0YVwiLCB7IG5hbWU6IFwidHdpdHRlcjppbWFnZVwiLCBjb250ZW50OiBzb2NpYWxJbWFnZVVybCB9XSxcbiAgICBbXCJtZXRhXCIsIHsgbmFtZTogXCJ0d2l0dGVyOmltYWdlOmFsdFwiLCBjb250ZW50OiBcIldvcmtCdWRkeSBcdTVCOUVcdTYyMThcdTg0RERcdTc2QUVcdTRFNjZcdTk5OTZcdTk4NzVcdTk4ODRcdTg5QzhcIiB9XSxcbiAgICBbXG4gICAgICBcInNjcmlwdFwiLFxuICAgICAgeyB0eXBlOiBcImFwcGxpY2F0aW9uL2xkK2pzb25cIiB9LFxuICAgICAgc2VyaWFsaXplSnNvbkxkKHsgXCJAY29udGV4dFwiOiBcImh0dHBzOi8vc2NoZW1hLm9yZ1wiLCBcIkBncmFwaFwiOiBqc29uTGRHcmFwaCB9KSxcbiAgICBdLFxuICBdO1xuXG4gIGlmIChtb2RpZmllZFRpbWUgJiYgaXNCbHVlYm9va1BhZ2UpIHtcbiAgICBoZWFkLnB1c2goW1xuICAgICAgXCJtZXRhXCIsXG4gICAgICB7IHByb3BlcnR5OiBcImFydGljbGU6bW9kaWZpZWRfdGltZVwiLCBjb250ZW50OiBtb2RpZmllZFRpbWUgfSxcbiAgICBdKTtcbiAgfVxuXG4gIHJldHVybiBoZWFkO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE0UyxTQUFTLG9CQUFvQjs7O0FDQTdCLFNBQVMsY0FBYyxtQkFBbUI7QUFDdFYsU0FBUyxxQkFBcUI7QUFEK0osSUFBTSwyQ0FBMkM7QUFLOU8sSUFBTSxRQUFRLElBQUksYUFDaEIsVUFBVSxhQUFhLFNBQVMsSUFBSSxDQUFDLFlBQVksUUFBUSxLQUFLLENBQUMsRUFBRSxLQUFLLEdBQUcsQ0FBQyxHQUFHO0FBRy9FLElBQU0sZUFBZSxDQUFDLGFBQXFCLGFBQTZCO0FBQ3RFLE1BQUk7QUFDRixVQUFNLFdBQVcsYUFBYSxhQUFhLE1BQU07QUFDakQsVUFBTSxLQUFLLFNBQVMsTUFBTSxhQUFhLElBQUksQ0FBQyxHQUFHLEtBQUs7QUFDcEQsV0FBTyxNQUFNO0FBQUEsRUFDZixRQUFRO0FBQ04sV0FBTztB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QWMsU0FBUyxPQUFPO0FBQUEsRUFDMUQsTUFBTTtBQUFBLElBQ0osQ0FBQyxRQUFRLEVBQUUsS0FBSyxRQUFRLE1BQU0saUJBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQUEsSUFDckUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxlQUFlLFNBQVMsVUFBVSxDQUFDO0FBQUEsSUFDcEQsQ0FBQyxRQUFRLEVBQUUsTUFBTSxVQUFVLFNBQVMsa0JBQWtCLENBQUM7QUFBQSxJQUN2RDtBQUFBLE1BQ0U7QUFBQSxNQUNBO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixTQUNFO0FBQUEsTUFDSjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxVQUFVO0FBQUEsSUFDUixRQUFRO0FBQUEsSUFDUixPQUFPO0FBQUEsTUFDTCxhQUFhO0FBQUEsSUFDZjtBQUFBLElBQ0EsT0FBTztBQUFBLE1BQ0wsT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLElBQ1I7QUFBQSxFQUNGO0FBQUEsRUFDQSxhQUFhO0FBQUEsSUFDWCxXQUFXO0FBQUEsSUFDWCxLQUFLO0FBQUEsTUFDSCxFQUFFLE1BQU0sZ0JBQU0sTUFBTSxJQUFJO0FBQUEsTUFDeEIsRUFBRSxNQUFNLHNCQUFPLE1BQU0sYUFBYTtBQUFBLE1BQ2xDLEVBQUUsTUFBTSxnQkFBTSxNQUFNLFVBQVU7QUFBQSxNQUM5QixFQUFFLE1BQU0sNEJBQVEsTUFBTSxTQUFTO0FBQUEsTUFDL0I7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLFdBQVc7QUFBQSxNQUNiO0FBQUEsSUFDRjtBQUFBLElBQ0EsU0FBUztBQUFBLElBQ1QsYUFBYTtBQUFBLE1BQ1gsRUFBRSxNQUFNLFVBQVUsTUFBTSxzQkFBc0I7QUFBQSxJQUNoRDtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04sVUFBVTtBQUFBLElBQ1o7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFBQSxNQUNaLE9BQU87QUFBQSxJQUNUO0FBQUEsSUFDQSxXQUFXO0FBQUEsTUFDVCxNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsSUFDUjtBQUFBLElBQ0EsYUFBYTtBQUFBLE1BQ1gsTUFBTTtBQUFBLE1BQ04sZUFBZTtBQUFBLFFBQ2IsV0FBVztBQUFBLFFBQ1gsV0FBVztBQUFBLE1BQ2I7QUFBQSxJQUNGO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixTQUNFO0FBQUEsTUFDRixXQUFXO0FBQUEsSUFDYjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogWyJyZWFkRmlsZVN5bmMiLCAic2l0ZVVybCIsICJyZWFkRmlsZVN5bmMiXQp9Cg==
