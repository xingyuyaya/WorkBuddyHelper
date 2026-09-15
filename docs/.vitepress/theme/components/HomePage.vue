<script setup lang="ts">
import PixelIcon from "./PixelIcon.vue";
import PixelIconSprite from "./PixelIconSprite.vue";
</script>

<template>
  <main class="wb-home">
    <PixelIconSprite />

    <!-- ============ HERO ============ -->
    <section class="wb-hero" aria-labelledby="wb-hero-title">
      <div class="wb-hero__bg" aria-hidden="true">
        <span class="wb-hero__orb wb-hero__orb--a"></span>
        <span class="wb-hero__orb wb-hero__orb--b"></span>
      </div>

      <div class="wb-hero__inner">
        <div class="wb-hero__copy">
          <p class="wb-eyebrow">
            <span class="wb-eyebrow__dot" aria-hidden="true"></span>
            AI 智能体 · WORK SYSTEM
          </p>
          <h1 id="wb-hero-title" class="wb-hero__title">
            WorkBuddy <span class="wb-gradient-text">实战蓝皮书</span>
          </h1>
          <p class="wb-hero__summary">
            一套面向新手、任务实践者与团队负责人的 WorkBuddy 学习路线。从下载安装、第一个任务与
            Skill 入门，到真实案例、自动化、多 Agent 系统与团队落地。
          </p>
          <div class="wb-hero__actions">
            <a class="wb-btn wb-btn--primary" href="/bluebook/">
              <span>开始阅读</span>
              <PixelIcon name="arrow-right" />
            </a>
            <a class="wb-btn wb-btn--ghost" href="#wb-capabilities">查看能力</a>
          </div>
          <div class="wb-hero__metrics" aria-label="内容规模">
            <span><b>27</b> 章节</span>
            <span><b>4</b> 大篇章</span>
            <span><b>∞</b> 可复用</span>
          </div>
        </div>

        <!-- 对话式面板：自然语言 → 多步执行 -->
        <div class="wb-hero__art" aria-label="WorkBuddy 对话示例">
          <div class="wb-chat" role="img" aria-label="示例：用户让 WorkBuddy 整理客户反馈，智能体规划并分步执行">
            <div class="wb-chat__bar">
              <span class="wb-chat__badge"><i aria-hidden="true"></i>WorkBuddy</span>
              <span class="wb-chat__status">ONLINE</span>
            </div>
            <div class="wb-chat__bubble wb-chat__bubble--user">
              帮我把这周的客户反馈整理成一份报告
            </div>
            <div class="wb-chat__bubble wb-chat__bubble--bot">
              已规划 3 步：抓取反馈 → 分类归纳 → 生成报告，正在执行
              <span class="wb-chat__dots" aria-hidden="true">
                <span class="wb-chat__dot"></span>
                <span class="wb-chat__dot"></span>
                <span class="wb-chat__dot"></span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ 价值条 ============ -->
    <section class="wb-strip" aria-label="站点价值">
      <div class="wb-strip__item">
        <PixelIcon name="check-box" />
        <span><b>真实案例</b><small>REAL CASES</small></span>
      </div>
      <div class="wb-strip__item">
        <PixelIcon name="refresh" />
        <span><b>可复用</b><small>REUSABLE</small></span>
      </div>
      <div class="wb-strip__item">
        <PixelIcon name="handshake" />
        <span><b>从任务到系统</b><small>SYSTEMIZE</small></span>
      </div>
      <div class="wb-strip__item">
        <PixelIcon name="grid" />
        <span><b>团队落地</b><small>TEAM READY</small></span>
      </div>
    </section>

    <!-- ============ 核心能力 ============ -->
    <section class="wb-section" id="wb-capabilities" aria-labelledby="wb-cap-title">
      <div class="wb-section__head">
        <span class="wb-section__eyebrow">CORE CAPABILITIES</span>
        <h2 id="wb-cap-title">一个能真正干活的 AI 智能体</h2>
        <p>不是聊天玩具，而是把任务接住、拆开、做完、并沉淀下来的工作系统。</p>
      </div>

      <div class="wb-grid--caps">
        <article class="wb-cap">
          <span class="wb-cap__icon"><PixelIcon name="robot" /></span>
          <a class="wb-cap__title" href="/cases/submissions/annual-report-digital-transformation/#%E6%83%B3%E8%A6%81%E5%AE%8C%E6%88%90%E7%9A%84%E4%BB%BB%E5%8A%A1">智能体执行</a>
          <p class="wb-cap__desc">用自然语言描述目标，WorkBuddy 自主拆解步骤、调用工具、交付结果。</p>
        </article>
        <article class="wb-cap">
          <span class="wb-cap__icon"><PixelIcon name="briefcase" /></span>
          <a class="wb-cap__title" href="/bluebook/第一篇%20使用手册：先把%20WorkBuddy%20用起来/第%205%20章%20WorkBuddy加载一个真正用得上的%20Skill/#workbuddy%E9%87%8C%E6%89%BE%E5%88%B0%E5%90%88%E9%80%82%E7%9A%84skill">Skill 技能库</a>
          <p class="wb-cap__desc">把常用流程封装成可复用 Skill，一次蒸馏，处处调用。</p>
        </article>
        <article class="wb-cap">
          <span class="wb-cap__icon"><PixelIcon name="sitemap" /></span>
          <a class="wb-cap__title" href="/bluebook/第一篇%20使用手册：先把%20WorkBuddy%20用起来/第%207%20章%20WorkBuddy%20使用连接器/">连接器生态</a>
          <p class="wb-cap__desc">通过连接器与 MCP 接入外部 API 与内部系统，无需从零开发。</p>
        </article>
        <article class="wb-cap">
          <span class="wb-cap__icon"><PixelIcon name="refresh" /></span>
          <a class="wb-cap__title" href="/bluebook/第一篇%20使用手册：先把%20WorkBuddy%20用起来/第%2010%20章%20WorkBuddy%20自动化任务/#%E7%AC%AC-10-%E7%AB%A0-workbuddy-%E8%87%AA%E5%8A%A8%E5%8C%96%E4%BB%BB%E5%8A%A1">自动化任务</a>
          <p class="wb-cap__desc">支持定时与触发式自动化，把重复工作交给智能体持续运转。</p>
        </article>
        <article class="wb-cap">
          <span class="wb-cap__icon"><PixelIcon name="users" /></span>
          <a class="wb-cap__title" href="/bluebook/第三篇%20进阶篇：把案例变成自己的工作系统/第%2024%20章%20如何进行多%20Agent%20系统设计/#%E7%AC%AC-24-%E7%AB%A0-%E5%A6%82%E4%BD%95%E8%BF%9B%E8%A1%8C%E5%A4%9A-agent-%E7%B3%BB%E7%BB%9F%E8%AE%BE%E8%AE%A1">多 Agent 协作</a>
          <p class="wb-cap__desc">组合多个专项智能体，像团队一样分工完成复杂任务。</p>
        </article>
        <article class="wb-cap">
          <span class="wb-cap__icon"><PixelIcon name="user" /></span>
          <a class="wb-cap__title" href="/bluebook/第一篇%20使用手册：先把%20WorkBuddy%20用起来/第%206%20章%20WorkBuddy的专家和专家团/#%E5%8F%AC%E5%94%A4%E4%B8%80%E4%B8%AA%E4%B8%93%E5%AE%B6%E5%9B%A2">专家团</a>
          <p class="wb-cap__desc">内置领域专家与专家团，在关键决策上给出专业判断。</p>
        </article>
      </div>
    </section>

    <!-- ============ 典型使用场景 ============ -->
    <section class="wb-section" id="wb-scenarios" aria-labelledby="wb-sc-title">
      <div class="wb-section__head">
        <span class="wb-section__eyebrow">TYPICAL SCENARIOS</span>
        <h2 id="wb-sc-title">带着任务来，找到落地答案</h2>
        <p>从日常办公到专业分析，下面是读者最常从这里出发的真实场景。</p>
      </div>

      <div class="wb-grid--scenes">
        <a class="wb-scene" href="/bluebook/%E7%AC%AC%E4%B8%80%E7%AF%87%20%E4%BD%BF%E7%94%A8%E6%89%8B%E5%86%8C%EF%BC%9A%E5%85%88%E6%8A%8A%20WorkBuddy%20%E7%94%A8%E8%B5%B7%E6%9D%A5/%E7%AC%AC%205%20%E7%AB%A0%20WorkBuddy%E5%8A%A0%E8%BD%BD%E4%B8%80%E4%B8%AA%E7%9C%9F%E6%AD%A3%E7%94%A8%E5%BE%97%E4%B8%8A%E7%9A%84%20Skill/">
          <PixelIcon name="briefcase" class="wb-scene__icon" />
          <span class="wb-scene__title">加载 Skill</span>
          <p class="wb-scene__desc">找一个真正用得上的 Skill，立刻扩展能力边界。</p>
        </a>
        <a class="wb-scene" href="/bluebook/%E7%AC%AC%E4%BA%8C%E7%AF%87%20%E6%A1%88%E4%BE%8B%E7%AF%87%EF%BC%9A%E4%BB%8E%E4%B8%80%E9%A1%B9%E4%BB%BB%E5%8A%A1%E5%88%B0%E4%B8%80%E6%94%AF%20AI%20%E5%9B%A2%E9%98%9F/%E7%AC%AC%2011%20%E7%AB%A0%20%E5%8A%9E%E5%85%AC%E4%B8%89%E4%BB%B6%E5%A5%97%EF%BC%9AWord%E3%80%81Excel%E3%80%81PPT/">
          <PixelIcon name="folder-open" class="wb-scene__icon" />
          <span class="wb-scene__title">办公三件套</span>
          <p class="wb-scene__desc">Word · Excel · PPT，让文档工作不再从零开始。</p>
        </a>
        <a class="wb-scene" href="/bluebook/%E7%AC%AC%E4%BA%8C%E7%AF%87%20%E6%A1%88%E4%BE%8B%E7%AF%87%EF%BC%9A%E4%BB%8E%E4%B8%80%E9%A1%B9%E4%BB%BB%E5%8A%A1%E5%88%B0%E4%B8%80%E6%94%AF%20AI%20%E5%9B%A2%E9%98%9F/%E7%AC%AC%2015%20%E7%AB%A0%20%E8%B5%84%E8%AE%AF%E6%95%B4%E5%90%88%EF%BC%9A%E6%8A%8A%E4%BF%A1%E6%81%AF%E6%B5%81%E5%8F%98%E6%88%90%E6%AF%8F%E6%97%A5%E9%80%9A%E7%9F%A5/">
          <PixelIcon name="newspaper" class="wb-scene__icon" />
          <span class="wb-scene__title">资讯整合</span>
          <p class="wb-scene__desc">把散落的信息流，变成每天准时送达的通知。</p>
        </a>
        <a class="wb-scene" href="/bluebook/%E7%AC%AC%E4%B8%89%E7%AF%87%20%E8%BF%9B%E9%98%B6%E7%AF%87%EF%BC%9A%E6%8A%8A%E6%A1%88%E4%BE%8B%E5%8F%98%E6%88%90%E8%87%AA%E5%B7%B1%E7%9A%84%E5%B7%A5%E4%BD%9C%E7%B3%BB%E7%BB%9F/%E7%AC%AC%2022%20%E7%AB%A0%20%E6%89%93%E9%80%A0skill%EF%BC%9A%E5%B0%86%E4%B9%A6%E5%92%8C%E8%A7%86%E9%A2%91%E8%92%B8%E9%A6%8F%E4%B8%BA%E5%8F%AF%E6%89%A7%E8%A1%8C%20Skill/">
          <PixelIcon name="chart-line" class="wb-scene__icon" />
          <span class="wb-scene__title">打造 Skill</span>
          <p class="wb-scene__desc">把书和视频里的经验，蒸馏成可执行的 Skill。</p>
        </a>
        <a class="wb-scene" href="/bluebook/%E7%AC%AC%E4%B8%89%E7%AF%87%20%E8%BF%9B%E9%98%B6%E7%AF%87%EF%BC%9A%E6%8A%8A%E6%A1%88%E4%BE%8B%E5%8F%98%E6%88%90%E8%87%AA%E5%B7%B1%E7%9A%84%E5%B7%A5%E4%BD%9C%E7%B3%BB%E7%BB%9F/%E7%AC%AC%2024%20%E7%AB%A0%20%E5%A6%82%E4%BD%95%E8%BF%9B%E8%A1%8C%E5%A4%9A%20Agent%20%E7%B3%BB%E7%BB%9F%E8%AE%BE%E8%AE%A1/">
          <PixelIcon name="video-camera" class="wb-scene__icon" />
          <span class="wb-scene__title">多 Agent 设计</span>
          <p class="wb-scene__desc">学会把复杂任务，拆给一支分工协作的 AI 团队。</p>
        </a>
        <a class="wb-scene" href="/help/">
          <PixelIcon name="robot" class="wb-scene__icon" />
          <span class="wb-scene__title">帮你解决</span>
          <p class="wb-scene__desc">把你的真实场景提交过来，一起把它变成 Case。</p>
        </a>
      </div>
    </section>

    <!-- ============ 学习路径（四大篇章，保留核心信息） ============ -->
    <section class="wb-section" id="wb-learn" aria-labelledby="wb-learn-title">
      <div class="wb-section__head">
        <span class="wb-section__eyebrow">LEARNING PATH</span>
        <h2 id="wb-learn-title">从入门到系统化的学习路径</h2>
        <p>四大篇章按需深入：先把 WorkBuddy 用起来，再把案例沉淀成自己的工作系统。</p>
      </div>

      <div class="wb-grid--path">
        <a class="wb-path" href="/bluebook/%E7%AC%AC%E4%B8%80%E7%AF%87%20%E4%BD%BF%E7%94%A8%E6%89%8B%E5%86%8C%EF%BC%9A%E5%85%88%E6%8A%8A%20WorkBuddy%20%E7%94%A8%E8%B5%B7%E6%9D%A5/">
          <span class="wb-path__no">PART 01</span>
          <span class="wb-path__title">使用手册</span>
          <p class="wb-path__desc">下载安装、主界面、第一个任务、Skill、连接器与自动化。</p>
          <span class="wb-path__range">CH. 01–10</span>
        </a>
        <a class="wb-path" href="/bluebook/%E7%AC%AC%E4%BA%8C%E7%AF%87%20%E6%A1%88%E4%BE%8B%E7%AF%87%EF%BC%9A%E4%BB%8E%E4%B8%80%E9%A1%B9%E4%BB%BB%E5%8A%A1%E5%88%B0%E4%B8%80%E6%94%AF%20AI%20%E5%9B%A2%E9%98%9F/">
          <span class="wb-path__no">PART 02</span>
          <span class="wb-path__title">案例篇</span>
          <p class="wb-path__desc">办公三件套、远程控制、资讯整合、会议、投资与自媒体。</p>
          <span class="wb-path__range">CH. 11–21</span>
        </a>
        <a class="wb-path" href="/bluebook/%E7%AC%AC%E4%B8%89%E7%AF%87%20%E8%BF%9B%E9%98%B6%E7%AF%87%EF%BC%9A%E6%8A%8A%E6%A1%88%E4%BE%8B%E5%8F%98%E6%88%90%E8%87%AA%E5%B7%B1%E7%9A%84%E5%B7%A5%E4%BD%9C%E7%B3%BB%E7%BB%9F/">
          <span class="wb-path__no">PART 03</span>
          <span class="wb-path__title">进阶篇</span>
          <p class="wb-path__desc">打造 Skill、多 Agent 系统设计、自动化工作流的可靠性。</p>
          <span class="wb-path__range">CH. 22–25</span>
        </a>
        <a class="wb-path" href="/bluebook/%E7%AC%AC%E5%9B%9B%E7%AF%87%20%E5%B2%97%E4%BD%8D%E4%B8%8E%E8%A1%8C%E4%B8%9A%E8%90%BD%E5%9C%B0/">
          <span class="wb-path__no">PART 04</span>
          <span class="wb-path__title">岗位与行业落地</span>
          <p class="wb-path__desc">不同岗位、不同行业如何把 WorkBuddy 用深、用透。</p>
          <span class="wb-path__range">CH. 26–27</span>
        </a>
      </div>
    </section>

    <!-- ============ 方法论循环 ============ -->
    <section class="wb-loop" aria-labelledby="wb-loop-title">
      <div class="wb-loop__head">
        <h2 id="wb-loop-title">把 WorkBuddy，用成你自己的系统</h2>
        <p>真正有价值的，是把踩过的坑、走过的路沉淀成可复用的 Skill 与自动化。</p>
      </div>
      <div class="wb-loop__steps">
        <div class="wb-step"><b>01</b><strong>LEARN</strong><span>读完一章就动手</span></div>
        <div class="wb-step"><b>02</b><strong>PRACTICE</strong><span>完成一个真实任务</span></div>
        <div class="wb-step"><b>03</b><strong>REFLECT</strong><span>复盘卡点与取舍</span></div>
        <div class="wb-step"><b>04</b><strong>SHARE</strong><span>沉淀成 Skill 或 Case</span></div>
      </div>
    </section>

    <!-- ============ 常见问题 ============ -->
    <section class="wb-section" id="wb-faq" aria-labelledby="wb-faq-title">
      <div class="wb-section__head">
        <span class="wb-section__eyebrow">FAQ</span>
        <h2 id="wb-faq-title">常见问题</h2>
        <p>关于 WorkBuddy 与这本蓝皮书，你大概率会问的这些。</p>
      </div>

      <div class="wb-faq">
        <details class="wb-faq__item">
          <summary class="wb-faq__q">WorkBuddy 是什么？</summary>
          <div class="wb-faq__a"><p>WorkBuddy 是一款 AI 智能体工具。你用自然语言把任务交给它，它会自主拆解步骤、调用工具并产出结果——而不只是回答问题。</p></div>
        </details>
        <details class="wb-faq__item">
          <summary class="wb-faq__q">需要会编程才能用吗？</summary>
          <div class="wb-faq__a"><p>不需要。日常使用只靠自然语言即可。进阶用户可以把常用流程蒸馏成 Skill 复用，但那不是门槛。</p></div>
        </details>
        <details class="wb-faq__item">
          <summary class="wb-faq__q">我的数据安全吗？</summary>
          <div class="wb-faq__a"><p>WorkBuddy 采用本地优先策略，连接器的权限清晰可控，涉及敏感数据的操作都需要你明确授权后再执行。</p></div>
        </details>
        <details class="wb-faq__item">
          <summary class="wb-faq__q">支持自动化任务吗？</summary>
          <div class="wb-faq__a"><p>支持。你可以设置定时或触发式的自动化任务，把日报、巡检、汇总这类重复工作交给智能体持续运转。</p></div>
        </details>
        <details class="wb-faq__item">
          <summary class="wb-faq__q">能接入我自己的系统吗？</summary>
          <div class="wb-faq__a"><p>可以。通过连接器与 MCP，WorkBuddy 能接入外部 API 与你的内部系统，无需从零开发集成。</p></div>
        </details>
        <details class="wb-faq__item">
          <summary class="wb-faq__q">有系统性的学习资料吗？</summary>
          <div class="wb-faq__a"><p>有。这本《实战蓝皮书》共 27 章，覆盖从安装入门、实战案例，到多 Agent 系统化的完整路线。</p></div>
        </details>
      </div>
    </section>

    <!-- ============ 最终 CTA ============ -->
    <section class="wb-cta" aria-labelledby="wb-cta-title">
      <h2 id="wb-cta-title" class="wb-cta__title">有场景不知道怎么解决？一起把它变成 Case。</h2>
      <div class="wb-cta__actions">
        <a class="wb-btn wb-btn--primary" href="/help/">帮你解决</a>
        <!--<a class="wb-btn wb-btn--ghost" href="https://github.com/">前往 GitHub</a>-->
      </div>
      <PixelIcon name="book" class="wb-cta__icon" />
    </section>
  </main>
</template>
