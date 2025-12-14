// brewlytics-nav.js
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".brewlytics-container");
  const navItems = Array.from(document.querySelectorAll(".navbar .nav-item"));
  const sections = container ? Array.from(container.querySelectorAll("section")) : [];
  const header = document.querySelector(".site-header");

  if (!container || navItems.length === 0) {
    console.warn("❌ Brewlytics nav init failed", { container, navItems: navItems.length });
    return;
  }

  // 1) 点击底部导航：在容器内滚动到对应 section
  navItems.forEach(item => {
    item.addEventListener("click", () => {
      const selector = item.dataset.target; // e.g. "#intro"
      const target = container.querySelector(selector);
      if (!target) return;

      container.scrollTo({
        top: target.offsetTop,
        behavior: "smooth"
      });
    });
  });

  // 2) 高亮当前 section（按容器中线判断）
  const updateActive = () => {
    const mid = container.scrollTop + container.clientHeight / 2;
    let currentId = null;

    for (const section of sections) {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      if (top <= mid && bottom >= mid) {
        currentId = section.id;
        break;
      }
    }

    navItems.forEach(item => {
      item.classList.toggle("active", item.dataset.target === `#${currentId}`);
    });
  };

  container.addEventListener("scroll", updateActive, { passive: true });
  updateActive();

  // 3) ✅ Header 只在 Home（第一屏）显示：最稳的写法（不用 Observer，100% 生效）
  // 因为你是“容器滚动”，直接用 scrollTop 判定最可靠
  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle("is-hidden", container.scrollTop > 10);
  };

  container.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();
});
