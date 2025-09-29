// vis.js — create two SVG visualizations using vanilla JS + SVG DOM
document.addEventListener("DOMContentLoaded", () => {
  // 1) Simple horizontal bar chart 
  const data = [
    {name: "China", value: 55},
    {name: "Italy", value: 51},
    {name: "France", value: 43},
    {name: "Spain", value: 45},
    {name: "Germany", value: 41}
  ];
  const svg = document.getElementById("chart-svg");
  if (svg) {
    const ns = "http://www.w3.org/2000/svg";
    const width = 800, height = 320, margin = {left:120, right:20, top:20, bottom:30};
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    const chartW = width - margin.left - margin.right;
    const chartH = height - margin.top - margin.bottom;
    const maxV = Math.max(...data.map(d=>d.value));
    const barH = chartH / data.length * 0.7;
    data.forEach((d, i) => {
      const g = document.createElementNS(ns, "g");
      const y = margin.top + i * (chartH / data.length) + (chartH/data.length - barH)/2;

      // bar
      const rect = document.createElementNS(ns, "rect");
      const barW = (d.value / maxV) * (chartW - 10);
      rect.setAttribute("x", margin.left);
      rect.setAttribute("y", y);
      rect.setAttribute("width", barW);
      rect.setAttribute("height", barH);
      rect.setAttribute("rx", 6);
      rect.setAttribute("fill", "var(--accent)");
      rect.appendChild(document.createElementNS(ns, "title")).textContent = `${d.name}: ${d.value}`;
      g.appendChild(rect);

      // label
      const label = document.createElementNS(ns, "text");
      label.setAttribute("x", margin.left - 10);
      label.setAttribute("y", y + barH/2 + 5);
      label.setAttribute("text-anchor", "end");
      label.setAttribute("font-size", "14");
      label.setAttribute("fill", "var(--text)");
      label.textContent = d.name;
      g.appendChild(label);

      // value text on bar end
      const val = document.createElementNS(ns, "text");
      val.setAttribute("x", margin.left + barW + 8);
      val.setAttribute("y", y + barH/2 + 5);
      val.setAttribute("font-size", "12");
      val.setAttribute("fill", "var(--muted)");
      val.textContent = d.value;
      g.appendChild(val);

      svg.appendChild(g);
    });

    // x-axis baseline
    const axis = document.createElementNS(ns, "line");
    axis.setAttribute("x1", margin.left);
    axis.setAttribute("x2", width - margin.right);
    axis.setAttribute("y1", height - margin.bottom);
    axis.setAttribute("y2", height - margin.bottom);
    axis.setAttribute("stroke", "rgba(0,0,0,0.08)");
    svg.appendChild(axis);
  }

  // 2) Creative radial SVG art 
  const art = document.getElementById("art-svg");
  if (art) {
    const ns = "http://www.w3.org/2000/svg";
    const W = 600, H = 360, cx = W/2, cy = H/2;
    art.setAttribute("viewBox", `0 0 ${W} ${H}`);

    const group = document.createElementNS(ns, "g");
    group.setAttribute("transform", `translate(${cx}, ${cy})`);
    art.appendChild(group);

    const rings = 12;
    for (let i=0;i<rings;i++){
      const r = 12 + i*12;
      const circle = document.createElementNS(ns, "circle");
      circle.setAttribute("r", r);
      circle.setAttribute("fill", "none");
      const strokeW = Math.max(1, 6 - Math.floor(i/3));
      circle.setAttribute("stroke-width", strokeW);
      // color variation via HSL
      circle.setAttribute("stroke", `hsl(${(i*30)%360} 70% 55%)`);
      circle.setAttribute("opacity", String(0.9 - i*0.06));
      group.appendChild(circle);
    }

    // rotating group for subtle animation via CSS 
    group.setAttribute("class", "rot-group");

    // create several radial lines 
    for (let a=0; a<24; a++){
      const angle = a * (360/24);
      const line = document.createElementNS(ns, "line");
      line.setAttribute("x1", 0);
      line.setAttribute("y1", 12);
      line.setAttribute("x2", 0);
      line.setAttribute("y2", - (100 + (a%6)*8));
      line.setAttribute("stroke-width", 2);
      line.setAttribute("stroke-linecap", "round");
      line.setAttribute("transform", `rotate(${angle})`);
      line.setAttribute("stroke", `hsl(${(a*14)%360} 80% 60%)`);
      line.setAttribute("opacity", "0.85");
      group.appendChild(line);
    }

    // small center circle
    const dot = document.createElementNS(ns, "circle");
    dot.setAttribute("r", 6);
    dot.setAttribute("fill", "var(--accent)");
    group.appendChild(dot);

    // add CSS style element for animation
    const styleTag = document.createElementNS(ns, "style");
    styleTag.textContent = `
      .rot-group { transform-origin: center; animation: rotateSlow 12s linear infinite; }
      @keyframes rotateSlow { from { transform: rotate(0deg);} to { transform: rotate(360deg);} }
    `;
    art.appendChild(styleTag);
  }
});
