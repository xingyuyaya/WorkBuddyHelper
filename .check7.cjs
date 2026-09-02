const fs = require('fs');
const css = fs.readFileSync('docs/.vitepress/dist/assets/style.q5_tW7tT.css','utf8');

// 找 .VPNavBar .container 的所有 padding 设置（含 box-shadow, padding）
const blocks = [...css.matchAll(/(?:@media[^{]*\{[^}]*)?\.VPNavBar\s+\.container[^{]*\{[^}]*\}/g)];
blocks.forEach((m, i) => {
  console.log('--- ' + i + ' ---');
  console.log(m[0]);
  console.log('');
});

// 找 .VPNavBarBar .container (基础 container，不带 .VPNavBar 前缀的)
console.log('===== container 默认 =====');
const cs = [...css.matchAll(/\.container\b[^{]*\{[^}]*\}/g)];
cs.forEach((m, i) => {
  if (!m[0].includes('vp-doc') && !m[0].includes('VPLocal') && !m[0].includes('local-search')) {
    console.log('--- ' + i + ' ---');
    console.log(m[0].substring(0, 300));
    console.log('');
  }
});