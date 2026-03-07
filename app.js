const API_ENDPOINT = "/api/workload-summary";
const DEFAULT_PERIODS = [
  { id: "7d", label: "15 Feb - 22Feb (7 days)" },
  { id: "14d", label: "09 Feb - 22Feb (14 days)" },
  { id: "30d", label: "24 Jan - 22Feb (30 days)" }
];

const PANEL_KEYS = ["priority", "status", "aging", "buildup"];

const ui = {
  periodPicker: document.getElementById("period-picker"),
  periodTrigger: document.getElementById("period-trigger"),
  periodTriggerLabel: document.getElementById("period-trigger-label"),
  periodMenu: document.getElementById("period-menu"),
  panelPickers: document.querySelectorAll("[data-period-picker]"),
  statusMessage: document.getElementById("status-message"),
  summaryKpis: document.getElementById("summary-kpis"),
  buildupKpis: document.getElementById("buildup-kpis"),
  priorityBars: document.getElementById("priority-bars"),
  statusBars: document.getElementById("status-bars"),
  agingBars: document.getElementById("aging-bars")
};

const state = {
  periods: DEFAULT_PERIODS.slice(),
  globalPeriodId: "7d",
  panelPeriods: {
    priority: "7d",
    status: "7d",
    aging: "7d",
    buildup: "7d"
  }
};

const KPI_ICON_PATHS = {
  totalActiveTickets: "M3 7h11v9H3z M5 9h7M5 11h7M5 13h5 M9 5h11v9H9z M11 7h7M11 9h7M11 11h5",
  activeAssignedTickets: "M8 8a2 2 0 1 0 0.01 0 M16 8a2 2 0 1 0 0.01 0 M4 18v-2l4-3 4 3v2 M12 18v-2l4-3 4 3v2",
  shareOfActiveAssigned: "M12 3a9 9 0 1 0 9 9h-9z M12 3v9h9",
  activeEmergencyTickets: "M8 11h8v5H8z M7 16h10 M10 8v3 M14 8v3 M5 13h2 M17 13h2 M9 6l-1-1 M15 6l1-1",
  activeVipTickets: "M4 8l3 4 5-5 5 5 3-4-2 9H6z M9 18h6",
  activeEscalatedTickets: "M5 6h10v4H5z M5 12h10v6H5z M17 8h2 M17 14h2 M18 8v6 M18 14l2 2",
  overdueTickets: "M3 7h11v9H3z M5 9h7M5 11h7M5 13h5 M9 5h11v9H9z M11 7h7M11 9h7M11 11h5",
  netTicketFlow: "M4 12h8 M12 12h8 M9 9l3 3-3 3 M15 9l-3 3 3 3",
  avgDailyNetFlow: "M5 17l4-5 3 3 6-8 M17 7h2v2"
};

init();

function init() {
  renderGlobalPeriodPicker();
  renderPanelPeriodPickers();
  bindGlobalPicker();
  bindPanelPickers();
  bindDismissMenus();
  loadInitial();
}

async function loadInitial() {
  setStatus("Loading...");
  try {
    await loadGlobalSummary();
    await Promise.all(PANEL_KEYS.map((panel) => loadPanel(panel)));
    setStatus("Last update: " + new Date().toLocaleTimeString());
  } catch (error) {
    setStatus("Failed to load fake API data.");
    // eslint-disable-next-line no-console
    console.error(error);
  }
}

function bindGlobalPicker() {
  ui.periodTrigger.addEventListener("click", () => {
    const isOpen = ui.periodPicker.classList.toggle("is-open");
    ui.periodMenu.hidden = !isOpen;
    ui.periodTrigger.setAttribute("aria-expanded", String(isOpen));
  });
}

function bindPanelPickers() {
  ui.panelPickers.forEach((picker) => {
    const trigger = picker.querySelector(".mini-period-trigger");
    trigger.addEventListener("click", () => {
      const isOpen = !picker.classList.contains("is-open");
      ui.panelPickers.forEach((item) => closePanelMenu(item));
      picker.classList.toggle("is-open", isOpen);
      picker.querySelector(".mini-period-menu").hidden = !isOpen;
      trigger.setAttribute("aria-expanded", String(isOpen));
    });
  });
}

function bindDismissMenus() {
  document.addEventListener("click", (event) => {
    if (!ui.periodPicker.contains(event.target)) {
      closeGlobalMenu();
    }
    ui.panelPickers.forEach((picker) => {
      if (!picker.contains(event.target)) {
        closePanelMenu(picker);
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeGlobalMenu();
      ui.panelPickers.forEach((picker) => closePanelMenu(picker));
    }
  });
}

function closeGlobalMenu() {
  ui.periodPicker.classList.remove("is-open");
  ui.periodMenu.hidden = true;
  ui.periodTrigger.setAttribute("aria-expanded", "false");
}

function closePanelMenu(picker) {
  const trigger = picker.querySelector(".mini-period-trigger");
  const menu = picker.querySelector(".mini-period-menu");
  picker.classList.remove("is-open");
  menu.hidden = true;
  trigger.setAttribute("aria-expanded", "false");
}

function renderGlobalPeriodPicker() {
  ui.periodTriggerLabel.textContent = getPeriodLabel(state.globalPeriodId);
  ui.periodMenu.innerHTML = "";

  state.periods.forEach((period) => {
    const item = document.createElement("li");
    item.className = "period-option";
    item.textContent = period.label;
    item.setAttribute("role", "option");
    item.setAttribute("aria-selected", String(period.id === state.globalPeriodId));
    if (period.id === state.globalPeriodId) item.classList.add("is-selected");

    item.addEventListener("click", async () => {
      state.globalPeriodId = period.id;
      PANEL_KEYS.forEach((panelKey) => {
        state.panelPeriods[panelKey] = period.id;
      });
      closeGlobalMenu();
      renderGlobalPeriodPicker();
      renderPanelPeriodPickers();
      await loadGlobalSummary();
      await Promise.all(PANEL_KEYS.map((panel) => loadPanel(panel)));
      setStatus("All cards updated: " + period.label);
    });

    ui.periodMenu.appendChild(item);
  });
}

function renderPanelPeriodPickers() {
  ui.panelPickers.forEach((picker) => {
    const panel = picker.dataset.panel;
    const selected = state.panelPeriods[panel];
    const label = picker.querySelector(".mini-period-label");
    const menu = picker.querySelector(".mini-period-menu");

    label.textContent = getPeriodLabel(selected);
    menu.innerHTML = "";

    state.periods.forEach((period) => {
      const item = document.createElement("li");
      item.className = "mini-period-option";
      item.textContent = period.label;
      item.setAttribute("role", "option");
      item.setAttribute("aria-selected", String(period.id === selected));
      if (period.id === selected) item.classList.add("is-selected");

      item.addEventListener("click", async () => {
        state.panelPeriods[panel] = period.id;
        closePanelMenu(picker);
        renderPanelPeriodPickers();
        await loadPanel(panel);
        setStatus(panel + " updated: " + period.label);
      });

      menu.appendChild(item);
    });
  });
}

async function loadGlobalSummary() {
  const payload = await requestDashboard(state.globalPeriodId);
  syncPeriods(payload);
  renderGlobalPeriodPicker();
  renderPanelPeriodPickers();
  renderKpis(ui.summaryKpis, payload.summaryKpis || []);
}

async function loadPanel(panel) {
  const periodId = state.panelPeriods[panel];
  const payload = await requestDashboard(periodId);
  syncPeriods(payload);
  renderPanelPeriodPickers();

  if (panel === "priority") {
    renderBars(ui.priorityBars, payload.charts?.priority || []);
  } else if (panel === "status") {
    renderBars(ui.statusBars, payload.charts?.status || []);
  } else if (panel === "aging") {
    renderBars(ui.agingBars, payload.charts?.aging || []);
  } else if (panel === "buildup") {
    renderKpis(ui.buildupKpis, payload.buildupKpis || []);
  }
}

function syncPeriods(payload) {
  if (Array.isArray(payload.periods) && payload.periods.length > 0) {
    state.periods = payload.periods;
  }
}

async function requestDashboard(periodId) {
  const url = API_ENDPOINT + "?period=" + encodeURIComponent(periodId);
  const response = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json" }
  });
  if (!response.ok) throw new Error("HTTP " + response.status);
  return response.json();
}

function renderKpis(container, kpis) {
  container.innerHTML = "";

  kpis.forEach((item) => {
    const kpiItem = document.createElement("div");
    kpiItem.className = "kpi-item";

    const value = document.createElement("div");
    value.className = "kpi-value";
    value.innerHTML =
      "<span class=\"icon-wrap\">" + getKpiIcon(item.key) + "</span>" +
      escapeHtml(formatValue(item.value));

    const label = document.createElement("div");
    label.className = "kpi-label";
    label.textContent = item.label || "";

    if (typeof item.delta === "number") {
      const delta = document.createElement("span");
      delta.className = "kpi-delta " + (item.delta >= 0 ? "up" : "down");
      delta.textContent = (item.delta >= 0 ? "+" : "") + item.delta.toFixed(1) + "%";
      label.appendChild(document.createTextNode(" "));
      label.appendChild(delta);
    }

    kpiItem.appendChild(value);
    kpiItem.appendChild(label);
    container.appendChild(kpiItem);
  });
}

function renderBars(container, rows) {
  container.innerHTML = "";
  const normalizedRows = normalizeBars(rows);
  const total = normalizedRows.reduce((sum, row) => sum + row.value, 0);
  const maxValue = normalizedRows.reduce((max, row) => (row.value > max ? row.value : max), 0);

  normalizedRows.forEach((row, index) => {
    const rowNode = document.createElement("button");
    rowNode.className = "bar-row";
    rowNode.type = "button";
    rowNode.setAttribute("aria-label", row.label + " " + row.value);

    const meta = document.createElement("span");
    meta.className = "row-meta";
    const share = total > 0 ? (row.value / total) * 100 : 0;
    meta.textContent = row.value + ", " + share.toFixed(1) + "%";

    const track = document.createElement("div");
    track.className = "bar-track";

    const fill = document.createElement("div");
    fill.className = "bar-fill";
    fill.style.width = row.percent.toFixed(1) + "%";

    const label = document.createElement("span");
    label.className = "bar-label";
    label.textContent = row.label;

    const tip = document.createElement("span");
    tip.className = "bar-tip";
    tip.textContent = row.label + " | " + row.value + " tickets | " + share.toFixed(1) + "%";

    track.appendChild(fill);
// show benchmarks only for aging chart and first row
if (container.id === "aging-bars" && index === 0) {

  const target = document.createElement("div");
  target.className = "bar-benchmark is-blue";
  target.style.left = "70%";

  const targetLabel = document.createElement("span");
  targetLabel.className = "bar-benchmark-label";
  targetLabel.textContent = "TARGET";

  target.appendChild(targetLabel);
  track.appendChild(target);

  const avg = document.createElement("div");
  avg.className = "bar-benchmark is-orange";
  avg.style.left = "45%";

  const avgLabel = document.createElement("span");
  avgLabel.className = "bar-benchmark-label";
  avgLabel.textContent = "YTD AVG";

  avg.appendChild(avgLabel);
  track.appendChild(avg);
}
    track.appendChild(label);
    track.appendChild(tip);
    rowNode.appendChild(meta);
    rowNode.appendChild(track);
    container.appendChild(rowNode);
  });

  container.appendChild(buildAxisNode(maxValue));
}

function normalizeBars(rows) {
  const maxValue = rows.reduce((max, row) => (row.value > max ? row.value : max), 0);
  if (maxValue <= 0) return rows.map((row) => ({ ...row, percent: 0 }));
  return rows.map((row) => ({ ...row, percent: (row.value / maxValue) * 100 }));
}

function buildAxisNode(maxValue) {
  const axis = document.createElement("div");
  axis.className = "bar-axis";
  const axisMax = Math.max(420, Math.ceil(maxValue / 30) * 30);
  const step = 30;
  const ticks = Math.round(axisMax / step);
  const line = document.createElement("div");
  line.className = "bar-axis-line";
  axis.appendChild(line);

  for (let i = 0; i <= ticks; i += 1) {
    const tick = document.createElement("span");
    tick.className = "bar-axis-tick";
    tick.style.left = (i / ticks) * 100 + "%";

    const label = document.createElement("span");
    label.className = "bar-axis-label";
    label.textContent = (step * i).toString();

    tick.appendChild(label);
    axis.appendChild(tick);
  }
  return axis;
}

function getPeriodLabel(periodId) {
  const match = state.periods.find((period) => period.id === periodId);
  if (match) return match.label;
  const fallback = DEFAULT_PERIODS.find((period) => period.id === periodId);
  return fallback ? fallback.label : DEFAULT_PERIODS[0].label;
}

function formatValue(value) {
  if (typeof value === "number") {
    if (Number.isInteger(value)) return value.toLocaleString();
    return value.toFixed(1);
  }
  return String(value);
}

function setStatus(message) {
  const isError = String(message || "").toLowerCase().includes("failed");
  if (isError) {
    ui.statusMessage.textContent = message;
    ui.statusMessage.classList.add("error");
    ui.statusMessage.hidden = false;
    return;
  }

  ui.statusMessage.textContent = "";
  ui.statusMessage.classList.remove("error");
  ui.statusMessage.hidden = true;
}

function getKpiIcon(key) {
  const path = KPI_ICON_PATHS[key] || KPI_ICON_PATHS.totalActiveTickets;

  return `
    <svg class="kpi-icon" viewBox="0 0 24 24" fill="none"
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linecap="round"
      stroke-linejoin="round">
      <path d="${path}"></path>
    </svg>
  `;
}
function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#39;");
}
