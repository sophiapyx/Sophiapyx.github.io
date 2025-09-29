// main.js: basic interactivity: menu, theme switcher, badges copy, contact form
document.addEventListener("DOMContentLoaded", () => {
  // set year
  document.getElementById("year").textContent = new Date().getFullYear();

  // MOBILE MENU
  const menuBtn = document.getElementById("menu-btn");
  const navList = document.getElementById("nav-list");
  if (menuBtn && navList) {
    menuBtn.addEventListener("click", () => {
      const expanded = menuBtn.getAttribute("aria-expanded") === "true";
      menuBtn.setAttribute("aria-expanded", String(!expanded));
      navList.classList.toggle("open");
    });
  }

  // THEME TOGGLER (cycles 3 themes)
  const themes = ["theme-professional","theme-creative","theme-playful"];
  const themeBtn = document.getElementById("theme-btn");
  let current = localStorage.getItem("site-theme") || themes[0];
  function applyTheme(name){
    document.body.classList.remove(...themes);
    document.body.classList.add(name);
    localStorage.setItem("site-theme", name);
  }
  applyTheme(current);
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      let idx = themes.indexOf(localStorage.getItem("site-theme") || themes[0]);
      idx = (idx + 1) % themes.length;
      applyTheme(themes[idx]);
      themeBtn.textContent = "Theme";
    });
  }

  // BADGE copy to clipboard 
  document.querySelectorAll(".badge").forEach(btn => {
    btn.addEventListener("click", async () => {
      const text = btn.dataset.copy || btn.textContent;
      try {
        await navigator.clipboard.writeText(text);
        btn.textContent = "Copied ✓";
        setTimeout(()=> btn.textContent = text, 900);
      } catch(e) {
        console.warn("Clipboard failed", e);
      }
    });
  });

  // CONTACT FORM validation
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  const clearBtn = document.getElementById("clear-btn");
  if (clearBtn) clearBtn.addEventListener("click", () => form.reset());
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        status.style.color = "crimson";
        status.textContent = "Please enter a valid email.";
        return;
      }
      if (message.length < 6) {
        status.style.color = "crimson";
        status.textContent = "Please write a longer message.";
        return;
      }
      // Success in real site you'd send to backend
      status.style.color = "green";
      status.textContent = "Thanks, message saved locally.";
      form.reset();
    });
  }
});
