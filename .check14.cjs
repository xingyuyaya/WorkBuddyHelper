const fs = require('fs');
const path = require('path');
const cssFile = fs.readdirSync('docs/.vitepress/dist/assets').find(f => f.startsWith('style.') && f.endsWith('.css'));
const css = fs.readFileSync(path.join('docs/.vitepress/dist/assets', cssFile), 'utf8');

// 验证我的覆盖是否在产物里
console.log('===== 我的覆盖是否生效 =====');
const checks = [
  '.VPNavBar.has-sidebar .container{max-width:var(--vp-layout-max-width)!important}',
  '.VPNavBar.has-sidebar .title{position:static;width:auto;height:auto;padding:0!important',
  '.VPNavBar.has-sidebar .content{padding-left:0!important;padding-right:0!important}',
  '.VPNavBar.has-sidebar .divider{padding-left:0!important}'
];
checks.forEach(c => {
  const idx = css.indexOf(c);
  console.log((idx >= 0 ? '✓ ' : '✗ ') + c.substring(0, 60) + '...' + (idx >= 0 ? ' at ' + idx : ' NOT FOUND'));
});