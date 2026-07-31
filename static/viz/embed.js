/*
 * viz/embed.js —— 可视化页面的宿主协议，随 cosmos 主题分发。
 *
 * 在任何要被 {{< viz >}} 嵌入的页面里加一行就够了：
 *   <script src="/viz/embed.js"></script>
 *
 * 用绝对路径，这样页面放在站点的哪个目录下都能引到。
 *
 * 它负责两件事：
 *   1. 把页面真实高度上报给宿主页，宿主页据此调整 iframe 高度，不用在外面写死；
 *   2. 接收宿主页的明暗主题，写到 <html data-theme="...">，页面 CSS 照此配色即可。
 *
 * 页面若在自身内容变化后想立刻重报高度，可以调用 window.vizReportHeight()；
 * 常规的尺寸变化由 ResizeObserver 自动覆盖，一般不需要手动调。
 * 独立打开（不在 iframe 里）时整个脚本是空操作。
 */
(function () {
  'use strict';

  if (window.parent === window) return;

  var last = 0;

  function report() {
    var h = Math.ceil(document.documentElement.scrollHeight);
    if (h === last || h <= 0) return;
    last = h;
    parent.postMessage({ type: 'viz:height', height: h }, '*');
  }

  window.vizReportHeight = report;

  addEventListener('message', function (e) {
    if (!e.data || e.data.type !== 'viz:theme') return;
    document.documentElement.setAttribute(
      'data-theme',
      e.data.theme === 'dark' ? 'dark' : 'light'
    );
  });

  function init() {
    if (window.ResizeObserver) new ResizeObserver(report).observe(document.body);
    report();
  }

  if (document.readyState === 'loading') addEventListener('DOMContentLoaded', init);
  else init();

  addEventListener('load', report);
  addEventListener('resize', report);

  /* 宿主页收到 ready 后会立刻回一次主题，避免 iframe 比宿主脚本先加载完时错过同步 */
  parent.postMessage({ type: 'viz:ready' }, '*');
})();
