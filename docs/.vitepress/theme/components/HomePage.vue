<script setup lang="ts">
import PixelIcon from "./PixelIcon.vue";
import PixelIconSprite from "./PixelIconSprite.vue";
</script>

<template>
  <main class="wb-home">
    <PixelIconSprite />
    <section class="wb-hero" aria-labelledby="wb-hero-title">
      <div class="wb-hero__stage">
        <div class="wb-hero__copy">
          <p class="wb-pixel-label">WORKBUDDY PLAYBOOK · AI WORK SYSTEM</p>
          <h1 id="wb-hero-title" class="wb-hero__title--bluebook">WorkBuddy 实战蓝皮书</h1>
          <p class="wb-hero__summary">
            一套面向新手、任务实践者与团队负责人的 WorkBuddy 学习路线。从下载安装、第一个任务与 Skill 入门，到真实案例、自动化、多 Agent 系统与团队落地。
          </p>
          <div class="wb-hero__actions">
            <a class="wb-button wb-button--primary" href="/bluebook/">
              <span>开始阅读</span>
              <PixelIcon name="arrow-right" />
            </a>
            <a class="wb-button wb-button--outline" href="/reading-guide">阅读指南</a>
          </div>
        </div>

        <div class="wb-hero__art" aria-label="WorkBuddy 像素图标组合">
          <span class="wb-hero__monogram">WB_Helper</span>
          <span class="wb-icon-card wb-icon-card--buddy">
            <PixelIcon name="face-grin" />
          </span>
          <span class="wb-icon-card wb-icon-card--book">
            <PixelIcon name="book" />
          </span>
          <span class="wb-icon-card wb-icon-card--flow">
            <PixelIcon name="sitemap" />
          </span>
          <span class="wb-icon-card wb-icon-card--work">
            <PixelIcon name="briefcase" />
          </span>
          <div class="wb-hero__metrics" aria-label="站点内容规模">
            <span><b>27</b> 章节</span>
            <span><b>4</b> 大篇章</span>
            <span><b>∞</b> 可复用</span>
          </div>
        </div>
      </div>

      <div class="wb-value-strip" aria-label="站点价值">
        <div class="wb-value-strip__item">
          <PixelIcon name="check-box" />
          <span><b>真实案例</b><small>REAL CASES</small></span>
        </div>
        <div class="wb-value-strip__item">
          <PixelIcon name="refresh" />
          <span><b>可复用</b><small>REUSABLE</small></span>
        </div>
        <div class="wb-value-strip__item">
          <PixelIcon name="handshake" />
          <span><b>从任务到系统</b><small>SYSTEMIZE</small></span>
        </div>
        <div class="wb-value-strip__item">
          <PixelIcon name="grid" />
          <span><b>团队落地</b><small>TEAM READY</small></span>
        </div>
      </div>
    </section>

    <section class="wb-section wb-reading" aria-labelledby="wb-reading-title">
      <div class="wb-section__heading">
        <div>
          <p class="wb-pixel-label">PARTS / 01—04</p>
          <h2 id="wb-reading-title">四大篇章，按需深入</h2>
        </div>
        <p>从把 WorkBuddy 用起来，到把案例沉淀成自己的工作系统。</p>
      </div>

      <div class="wb-reading-grid">
        <a class="wb-reading-card" href="/bluebook/%E7%AC%AC%E4%B8%80%E7%AF%87%20%E4%BD%BF%E7%94%A8%E6%89%8B%E5%86%8C%EF%BC%9A%E5%85%88%E6%8A%8A%20WorkBuddy%20%E7%94%A8%E8%B5%B7%E6%9D%A5/">
          <span class="wb-reading-card__icon"><PixelIcon name="user" /></span>
          <span class="wb-reading-card__content">
            <small>MANUAL · START HERE</small>
            <strong>使用手册</strong>
            <span>下载安装、主界面、第一个任务、Skill、连接器与自动化。</span>
            <em><b>新手入门</b><b>先跑起来</b></em>
          </span>
          <PixelIcon name="arrow-right" class="wb-reading-card__arrow" />
        </a>

        <a class="wb-reading-card" href="/bluebook/%E7%AC%AC%E4%BA%8C%E7%AF%87%20%E6%A1%88%E4%BE%8B%E7%AF%87%EF%BC%9A%E4%BB%8E%E4%B8%80%E9%A1%B9%E4%BB%BB%E5%8A%A1%E5%88%B0%E4%B8%80%E6%94%AF%20AI%20%E5%9B%A2%E9%98%9F/">
          <span class="wb-reading-card__icon"><PixelIcon name="briefcase" /></span>
          <span class="wb-reading-card__content">
            <small>CASES · REAL TASKS</small>
            <strong>案例篇</strong>
            <span>办公三件套、远程控制、资讯整合、会议、投资与自媒体。</span>
            <em><b>真实任务</b><b>即学即用</b></em>
          </span>
          <PixelIcon name="arrow-right" class="wb-reading-card__arrow" />
        </a>

        <a class="wb-reading-card" href="/bluebook/%E7%AC%AC%E4%B8%89%E7%AF%87%20%E8%BF%9B%E9%98%B6%E7%AF%87%EF%BC%9A%E6%8A%8A%E6%A1%88%E4%BE%8B%E5%8F%98%E6%88%90%E8%87%AA%E5%B7%B1%E7%9A%84%E5%B7%A5%E4%BD%9C%E7%B3%BB%E7%BB%9F/">
          <span class="wb-reading-card__icon"><PixelIcon name="sitemap" /></span>
          <span class="wb-reading-card__content">
            <small>ADVANCED · SYSTEMIZE</small>
            <strong>进阶篇</strong>
            <span>打造 Skill、多 Agent 系统设计、自动化工作流的可靠性。</span>
            <em><b>沉淀系统</b><b>多 Agent</b></em>
          </span>
          <PixelIcon name="arrow-right" class="wb-reading-card__arrow" />
        </a>

        <a class="wb-reading-card" href="/bluebook/%E7%AC%AC%E5%9B%9B%E7%AF%87%20%E5%B2%97%E4%BD%8D%E4%B8%8E%E8%A1%8C%E4%B8%9A%E8%90%BD%E5%9C%B0/">
          <span class="wb-reading-card__icon"><PixelIcon name="users" /></span>
          <span class="wb-reading-card__content">
            <small>TEAM · LANDING</small>
            <strong>岗位与行业落地</strong>
            <span>不同岗位、不同行业如何把 WorkBuddy 用深。</span>
            <em><b>岗位路线</b><b>行业路线</b></em>
          </span>
          <PixelIcon name="arrow-right" class="wb-reading-card__arrow" />
        </a>
      </div>
    </section>

    <section class="wb-section wb-task-index" aria-labelledby="wb-task-index-title">
      <div class="wb-section__heading wb-section__heading--compact">
        <div>
          <p class="wb-pixel-label">QUICK START</p>
          <h2 id="wb-task-index-title">想从哪里开始？</h2>
        </div>
        <p>带着具体问题进来，先找到能落地的答案。</p>
      </div>

      <div class="wb-task-grid">
        <a href="/bluebook/%E7%AC%AC%E4%B8%80%E7%AF%87%20%E4%BD%BF%E7%94%A8%E6%89%8B%E5%86%8C%EF%BC%9A%E5%85%88%E6%8A%8A%20WorkBuddy%20%E7%94%A8%E8%B5%B7%E6%9D%A5/%E7%AC%AC%205%20%E7%AB%A0%20WorkBuddy%E5%8A%A0%E8%BD%BD%E4%B8%80%E4%B8%AA%E7%9C%9F%E6%AD%A3%E7%94%A8%E5%BE%97%E4%B8%8A%E7%9A%84%20Skill/">
          <PixelIcon name="briefcase" /><strong>加载 Skill</strong><span>找一个真正用得上的 Skill</span>
        </a>
        <a href="/bluebook/%E7%AC%AC%E4%BA%8C%E7%AF%87%20%E6%A1%88%E4%BE%8B%E7%AF%87%EF%BC%9A%E4%BB%8E%E4%B8%80%E9%A1%B9%E4%BB%BB%E5%8A%A1%E5%88%B0%E4%B8%80%E6%94%AF%20AI%20%E5%9B%A2%E9%98%9F/%E7%AC%AC%2011%20%E7%AB%A0%20%E5%8A%9E%E5%85%AC%E4%B8%89%E4%BB%B6%E5%A5%97%EF%BC%9AWord%E3%80%81Excel%E3%80%81PPT/">
          <PixelIcon name="folder-open" /><strong>办公三件套</strong><span>Word · Excel · PPT</span>
        </a>
        <a href="/bluebook/%E7%AC%AC%E4%BA%8C%E7%AF%87%20%E6%A1%88%E4%BE%8B%E7%AF%87%EF%BC%9A%E4%BB%8E%E4%B8%80%E9%A1%B9%E4%BB%BB%E5%8A%A1%E5%88%B0%E4%B8%80%E6%94%AF%20AI%20%E5%9B%A2%E9%98%9F/%E7%AC%AC%2015%20%E7%AB%A0%20%E8%B5%84%E8%AE%AF%E6%95%B4%E5%90%88%EF%BC%9A%E6%8A%8A%E4%BF%A1%E6%81%AF%E6%B5%81%E5%8F%98%E6%88%90%E6%AF%8F%E6%97%A5%E9%80%9A%E7%9F%A5/">
          <PixelIcon name="newspaper" /><strong>资讯整合</strong><span>把信息流变成每日通知</span>
        </a>
        <a href="/bluebook/%E7%AC%AC%E4%B8%89%E7%AF%87%20%E8%BF%9B%E9%98%B6%E7%AF%87%EF%BC%9A%E6%8A%8A%E6%A1%88%E4%BE%8B%E5%8F%98%E6%88%90%E8%87%AA%E5%B7%B1%E7%9A%84%E5%B7%A5%E4%BD%9C%E7%B3%BB%E7%BB%9F/%E7%AC%AC%2022%20%E7%AB%A0%20%E6%89%93%E9%80%A0skill%EF%BC%9A%E5%B0%86%E4%B9%A6%E5%92%8C%E8%A7%86%E9%A2%91%E8%92%B8%E9%A6%8F%E4%B8%BA%E5%8F%AF%E6%89%A7%E8%A1%8C%20Skill/">
          <PixelIcon name="chart-line" /><strong>打造 Skill</strong><span>把书和视频蒸馏成可执行 Skill</span>
        </a>
        <a href="/bluebook/%E7%AC%AC%E4%B8%89%E7%AF%87%20%E8%BF%9B%E9%98%B6%E7%AF%87%EF%BC%9A%E6%8A%8A%E6%A1%88%E4%BE%8B%E5%8F%98%E6%88%90%E8%87%AA%E5%B7%B1%E7%9A%84%E5%B7%A5%E4%BD%9C%E7%B3%BB%E7%BB%9F/%E7%AC%AC%2024%20%E7%AB%A0%20%E5%A6%82%E4%BD%95%E8%BF%9B%E8%A1%8C%E5%A4%9A%20Agent%20%E7%B3%BB%E7%BB%9F%E8%AE%BE%E8%AE%A1/">
          <PixelIcon name="video-camera" /><strong>多 Agent 设计</strong><span>如何设计多 Agent 系统</span>
        </a>
        <a href="/help/">
          <PixelIcon name="robot" /><strong>帮你解决</strong><span>提交真实场景问题</span>
        </a>
      </div>
    </section>

    <section class="wb-section wb-system" aria-labelledby="wb-system-title">
      <div class="wb-system__intro">
        <p class="wb-pixel-label">LEARN · PRACTICE · REFLECT · SHARE</p>
        <h2 id="wb-system-title">把 WorkBuddy，用成你自己的系统。</h2>
        <p>真正有价值的是把踩过的坑、走过的路沉淀成可复用的 Skill 与自动化，让经验在下一个任务里继续发光。</p>
      </div>
      <ol class="wb-system__steps">
        <li><b>01</b><strong>LEARN</strong><span>读完一章就动手</span></li>
        <li><b>02</b><strong>PRACTICE</strong><span>完成一个真实任务</span></li>
        <li><b>03</b><strong>REFLECT</strong><span>复盘卡点与取舍</span></li>
        <li><b>04</b><strong>SHARE</strong><span>沉淀成 Skill 或 Case</span></li>
      </ol>
    </section>

    <section class="wb-community" aria-labelledby="wb-community-title">
      <div>
        <p class="wb-pixel-label">KEEP LEARNING · KEEP BUILDING</p>
        <h2 id="wb-community-title">有场景不知道怎么解决？一起把它变成 Case。</h2>
      </div>
      <div class="wb-community__actions">
        <a class="wb-button wb-button--acid" href="/help/">帮你解决</a>
        <a class="wb-button wb-button--dark-outline" href="https://github.com/">前往 GitHub</a>
      </div>
      <PixelIcon name="book" class="wb-community__icon" />
    </section>
  </main>
</template>
