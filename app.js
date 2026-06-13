const STORAGE_KEY = "morning-plan-state-v2";
const DAY_MS = 86400000;

const exams = [
  { id: "calculus", subject: "高数", fullName: "高等数学IIB", date: "2026-06-22", time: "13:30-15:30", location: "子良A145", seat: "11" },
  { id: "linear-algebra", subject: "线代", fullName: "线性代数B", date: "2026-06-24", time: "13:30-15:30", location: "教301（录播）", seat: "40" },
  { id: "history", subject: "近代史", fullName: "中国近现代史纲要", date: "2026-06-25", time: "13:30-15:30", location: "子良A259（4-7不排）", seat: "49" },
  { id: "business-law", subject: "经济法", fullName: "经济法A", date: "2026-06-26", time: "09:00-11:00", location: "教309（录播）", seat: "24" },
  { id: "microeconomics", subject: "微观", fullName: "微观经济学A", date: "2026-06-29", time: "09:00-11:00", location: "子良A252", seat: "19" },
  { id: "accounting", subject: "会计", fullName: "会计学", date: "2026-06-30", time: "09:00-11:00", location: "教401*", seat: "25" }
];

const deadlines = [
  { date: "2026-06-11", title: "经济学论文提交", detail: "确认已提交；未提交则立即补救" },
  { date: "2026-06-13", title: "六级考试", detail: "检查准考证、证件和考试用品" },
  { date: "2026-06-15", title: "法律论文提交", detail: "检查、备份、提交" },
  { date: "2026-06-16", title: "英语口语面试", detail: "5 分钟无稿回答；只用关键词练习，不携带笔记" },
  { date: "2026-06-16", title: "会计小组作业", detail: "确认分工、汇总并提交" },
  { date: "2026-06-16", title: "Python 大作业验收", detail: "准备可运行项目和现场演示" },
  { date: "2026-06-18", title: "Python 大作业验收", detail: "补充演示与问题修正" },
  { date: "2026-06-21", title: "Python 大作业上传", detail: "检查 notebook、报告、PPT 并上传" }
];

const coursesByWeekday = {
  1: ["高数", "经济法", "法律课"],
  2: ["英语口语", "会计", "Python"],
  3: ["近代史", "日语教育课"],
  4: ["线代", "微观", "Python", "经济法"],
  5: ["体育", "微观"]
};

const dailyStudy = {
  "2026-06-12": [
    task("cet-listening", "六级听力 + 阅读", "完成一套真题并订正", "19:00", "20:30"),
    task("calculus-basic", "高数基础题", "完成一组题，标记错题", "20:45", "21:45"),
    task("linear-concepts", "线代概念与例题", "复习概念并做 3 道例题", "21:45", "22:30"),
    task("python-scope", "Python 拆任务", "列出 notebook、报告、演示三部分", "22:30", "23:00")
  ],
  "2026-06-13": [
    task("cet-exam", "参加六级考试", "带齐证件与考试用品", "考试", ""),
    task("calculus-light", "高数轻复习", "完成 45 分钟基础题", "19:00", "19:45"),
    task("linear-light", "线代轻复习", "完成 45 分钟例题", "20:00", "20:45"),
    task("accounting-role", "确认会计分工", "问清个人负责内容和汇总时间", "21:00", "21:20")
  ],
  "2026-06-14": [
    task("law-check", "检查法律论文", "确认文件、命名与提交入口", "19:00", "20:00"),
    task("python-core", "Python 核心功能", "跑通数据加载与两个模型", "20:00", "21:30"),
    task("oral-keywords", "英语口语关键词练习", "5 题各整理 3-4 个关键词并自然回答", "21:30", "22:15"),
    task("calculus-30", "高数复习", "完成 30 分钟错题回看", "22:15", "22:45")
  ],
  "2026-06-15": [
    task("law-submit", "提交法律论文", "提交后保留成功截图", "白天", ""),
    task("python-mvp", "Python 可提交版", "模型对比流程完整运行", "19:00", "20:30"),
    task("accounting-part", "会计小组个人部分", "完成并发给组员", "20:45", "21:30"),
    task("oral-mock", "英语口语模拟", "脱稿完成两轮 5 分钟模拟回答", "21:30", "22:15"),
    task("linear-45", "线代复习", "完成 45 分钟题目", "22:15", "23:00")
  ],
  "2026-06-16": [
    task("oral-interview", "英语口语面试", "完成 5 分钟无稿问卷回答，不携带书面稿或笔记", "当天", ""),
    task("accounting-submit", "会计小组作业", "完成汇总、检查和提交", "当天", ""),
    task("python-check", "Python 第一次验收", "项目能运行，准备现场演示", "课堂", ""),
    task("calculus-90", "高数复习", "专题刷题 90 分钟", "19:30", "21:00"),
    task("linear-60", "线代复习", "矩阵与向量 60 分钟", "21:15", "22:15")
  ],
  "2026-06-17": [
    task("calculus-topic", "高数专题刷题", "完成一个薄弱专题", "19:00", "20:45"),
    task("linear-matrix", "线代矩阵与向量", "完成 75 分钟练习", "21:00", "22:15"),
    task("calculus-errors", "高数错题", "重新独立做错题", "22:15", "23:00")
  ],
  "2026-06-18": [
    task("python-second", "Python 第二次验收", "修正第一次验收的问题", "课堂", ""),
    task("calculus-paper", "高数真题", "限时完成并订正", "19:00", "20:45"),
    task("linear-practice", "线代题目", "完成 75 分钟练习", "21:00", "22:15"),
    task("history-first", "近代史第一轮", "梳理章节框架", "22:15", "23:00")
  ],
  "2026-06-19": [
    task("calculus-weak", "高数薄弱章", "集中突破一个薄弱章节", "19:00", "21:00"),
    task("linear-hour", "线代复习", "完成一组综合题", "21:15", "22:15"),
    task("law-framework", "经济法框架", "整理章节与重点法条", "22:15", "23:00")
  ],
  "2026-06-20": [
    task("calculus-mock", "高数模拟 / 真题", "限时完成一套试卷", "19:00", "21:00"),
    task("linear-review", "线代复习", "完成一组综合题", "21:15", "22:15"),
    task("micro-preview", "微观概念预热", "回顾核心概念", "22:15", "23:00")
  ],
  "2026-06-21": [
    task("python-upload", "上传 Python 大作业", "检查、备份并确认上传成功", "白天", ""),
    task("calculus-final", "高数总复习", "过一遍错题和公式", "19:00", "21:30"),
    task("linear-light-review", "线代轻复习", "回顾重点公式", "21:45", "22:45")
  ],
  "2026-06-22": [
    task("calculus-exam", "高数考试", "13:00 前到达子良A145，座位 11", "13:30", "15:30"),
    task("linear-key", "线代重点题", "完成 2 小时重点题", "19:00", "21:00"),
    task("history-memory", "近代史背诵", "背诵 45 分钟", "21:15", "22:00"),
    task("law-hour", "经济法复习", "完成 1 小时重点复习", "22:00", "23:00")
  ],
  "2026-06-23": [
    task("linear-final", "线代总复习", "过完错题和核心题型", "19:00", "21:30"),
    task("history-45", "近代史复习", "背诵 45 分钟", "21:45", "22:30"),
    task("law-30", "经济法复习", "回顾重点法条", "22:30", "23:00")
  ],
  "2026-06-24": [
    task("linear-exam", "线代考试", "13:00 前到达教301，座位 40", "13:30", "15:30"),
    task("history-sprint", "近代史冲刺", "完成 90 分钟背诵", "19:00", "20:30"),
    task("law-75", "经济法复习", "完成 75 分钟复习", "20:45", "22:00"),
    task("micro-hour", "微观复习", "完成 1 小时概念题", "22:00", "23:00")
  ],
  "2026-06-25": [
    task("history-exam", "近代史考试", "13:00 前到达子良A259，座位 49", "13:30", "15:30"),
    task("law-sprint", "经济法冲刺", "完成 2 小时重点复习", "19:00", "21:00"),
    task("micro-review", "微观复习", "完成 1 小时题目", "21:15", "22:15")
  ],
  "2026-06-26": [
    task("law-exam", "经济法考试", "08:30 前到达教309，座位 24", "09:00", "11:00"),
    task("micro-key", "微观重点题", "完成 2 小时计算题", "19:00", "21:00"),
    task("accounting-base", "会计学基础", "复习分录与基础题型", "21:15", "22:30")
  ],
  "2026-06-27": [
    task("micro-paper", "微观真题 / 计算", "限时完成并订正", "19:00", "21:00"),
    task("accounting-entries", "会计分录与题型", "完成 90 分钟练习", "21:15", "22:45"),
    task("tomorrow-plan", "整理明日清单", "标记最后薄弱点", "22:45", "23:00")
  ],
  "2026-06-28": [
    task("micro-final", "微观总复习", "过完错题和公式", "19:00", "21:30"),
    task("accounting-hour", "会计学复习", "完成 1 小时练习", "21:45", "22:45"),
    task("exam-kit", "准备考试用品", "检查地点、证件和座位", "22:45", "23:00")
  ],
  "2026-06-29": [
    task("micro-exam", "微观经济学考试", "08:30 前到达子良A252，座位 19", "09:00", "11:00"),
    task("accounting-final", "会计学总复习", "完成 3.5 小时总复习", "19:00", "22:30"),
    task("accounting-errors", "会计错题与公式", "最后检查易错点", "22:30", "23:00")
  ],
  "2026-06-30": [
    task("accounting-exam", "会计学考试", "08:30 前到达教401，座位 25", "09:00", "11:00"),
    task("cleanup", "整理考试资料", "归档资料并记录待补事项", "考试后", "")
  ]
};

const state = loadState();
const els = {
  dateLabel: document.querySelector("#dateLabel"),
  pageTitle: document.querySelector("#pageTitle"),
  syncLabel: document.querySelector("#syncLabel"),
  urgentNotice: document.querySelector("#urgentNotice"),
  todayCount: document.querySelector("#todayCount"),
  todayList: document.querySelector("#todayList"),
  nextTask: document.querySelector("#nextTask"),
  countdownGrid: document.querySelector("#countdownGrid"),
  scheduleList: document.querySelector("#scheduleList"),
  plansList: document.querySelector("#plansList"),
  planDialog: document.querySelector("#planDialog"),
  planForm: document.querySelector("#planForm"),
  planTitle: document.querySelector("#planTitle"),
  planBody: document.querySelector("#planBody"),
  startDate: document.querySelector("#startDate"),
  dayCount: document.querySelector("#dayCount"),
  offlineStatus: document.querySelector("#offlineStatus")
};

init();

function init() {
  const today = new Date();
  els.dateLabel.textContent = formatDate(today, true);
  els.startDate.value = toDateKey(today);
  document.querySelectorAll("[data-tab]").forEach((button) => {
    button.addEventListener("click", () => switchTab(button.dataset.tab));
  });
  document.querySelector("#refreshPlan").addEventListener("click", refreshPlan);
  document.querySelector("#addPlan").addEventListener("click", openPlanDialog);
  document.querySelector("#downloadReminder").addEventListener("click", downloadCalendarReminder);
  els.planForm.addEventListener("submit", handlePlanSubmit);
  render();
  registerServiceWorker();
  els.offlineStatus.textContent = navigator.onLine ? "可用" : "离线";
  window.addEventListener("online", () => { els.offlineStatus.textContent = "可用"; });
  window.addEventListener("offline", () => { els.offlineStatus.textContent = "离线"; });
}

function task(id, title, criterion, start, end) {
  return { id, title, criterion, start, end };
}

function switchTab(tab) {
  const titles = { today: "今天", schedule: "日程", plans: "计划", settings: "设置" };
  document.querySelectorAll("[data-tab]").forEach((button) => {
    button.classList.toggle("active", button.dataset.tab === tab);
  });
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.toggle("active", screen.id === `${tab}Screen`);
  });
  els.pageTitle.textContent = titles[tab];
}

function refreshPlan() {
  const icon = document.querySelector(".sync-icon");
  icon.animate([{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }], { duration: 420 });
  els.syncLabel.textContent = `${formatClock(new Date())} 已更新`;
  render();
}

function render() {
  renderToday();
  renderSchedule();
  renderPlans();
}

function renderToday() {
  const today = startOfLocalDay(new Date());
  const key = toDateKey(today);
  const tasks = getTasksForDate(key).slice(0, 3);
  const urgent = getUrgentItem(today);
  els.urgentNotice.innerHTML = urgent ? `
    <article class="urgent-notice">
      <span class="urgent-dot" aria-hidden="true"></span>
      <div>
        <h2><span class="urgent-key">${escapeHTML(urgent.when)}</span> ${escapeHTML(urgent.title)}</h2>
        <p>${escapeHTML(urgent.detail)}</p>
      </div>
    </article>
  ` : "";

  els.todayCount.textContent = String(tasks.length);
  els.todayList.innerHTML = tasks.length ? tasks.map((item) => {
    const done = state.completed.includes(completionKey(key, item.id));
    return `
      <article class="task-row ${done ? "done" : ""}">
        <button class="check-button ${done ? "done" : ""}" type="button" data-complete="${escapeHTML(item.id)}" aria-label="${done ? "标记未完成" : "标记完成"}">${done ? "✓" : ""}</button>
        <div class="task-copy">
          <h3>${escapeHTML(item.title)}</h3>
          <p>${colorNumbers(escapeHTML(item.criterion))}</p>
        </div>
        <time class="task-time">${escapeHTML(formatTaskTime(item))}</time>
      </article>
    `;
  }).join("") : `<div class="empty">今天没有必须完成的任务。</div>`;

  els.todayList.querySelectorAll("[data-complete]").forEach((button) => {
    button.addEventListener("click", () => toggleCompleted(key, button.dataset.complete));
  });

  const next = tasks.find((item) => !state.completed.includes(completionKey(key, item.id))) || tasks[0];
  els.nextTask.innerHTML = next ? `
    <article class="next-card">
      <time class="next-time">${escapeHTML(next.start)}</time>
      <h3 class="next-title">${escapeHTML(next.title)}</h3>
      <p class="next-duration"><strong>${getDuration(next)}</strong> 分钟</p>
    </article>
  ` : `<div class="empty">今天的任务已完成。</div>`;

  const upcoming = exams
    .map((exam) => ({ ...exam, days: daysBetween(today, parseDate(exam.date)) }))
    .filter((exam) => exam.days >= 0)
    .slice(0, 3);
  els.countdownGrid.innerHTML = upcoming.map((exam) => `
    <article class="countdown-item ${urgencyClass(exam.days)}">
      <p class="countdown-subject">${escapeHTML(exam.subject)}</p>
      <div class="countdown-value">
        <strong class="countdown-number">${exam.days}</strong>
        <span class="countdown-unit">天</span>
      </div>
      <p class="countdown-date">${formatShortDate(exam.date)}</p>
    </article>
  `).join("");
}

function renderSchedule() {
  const today = startOfLocalDay(new Date());
  const end = new Date(2026, 5, 30);
  const rows = [];
  for (let date = new Date(today); date <= end; date.setDate(date.getDate() + 1)) {
    const key = toDateKey(date);
    const items = getScheduleItems(key);
    if (!items.length) continue;
    rows.push(`
      <article class="schedule-day">
        <div class="schedule-date">${date.getDate()}<span>${formatWeekday(date)}</span></div>
        <div class="schedule-events">
          ${items.map((item) => `
            <div class="schedule-event ${item.type === "exam" ? "event-exam" : ""} ${item.type === "deadline" ? "event-deadline" : ""}">
              <h3>${escapeHTML(item.title)}</h3>
              <p>${item.time ? `<span class="event-time">${escapeHTML(item.time)}</span> · ` : ""}${escapeHTML(item.detail)}</p>
            </div>
          `).join("")}
        </div>
      </article>
    `);
  }
  els.scheduleList.innerHTML = rows.length ? rows.join("") : `<div class="empty">近期没有日程。</div>`;
}

function renderPlans() {
  const builtIn = [
    { title: "期末考试冲刺", detail: "6月12日-6月30日", complete: getBuiltInProgress(), total: 19 },
    { title: "Python 大作业", detail: "6月21日前上传", complete: deadlinePassed("2026-06-21") ? 1 : 0, total: 1 }
  ];
  const custom = state.plans.map((plan) => ({
    title: plan.title,
    detail: `${formatShortDate(plan.startDate)} 开始`,
    complete: plan.slices.filter((slice) => slice.done).length,
    total: plan.slices.length
  }));
  els.plansList.innerHTML = [...builtIn, ...custom].map((plan) => `
    <article class="plan-row">
      <div>
        <h3>${escapeHTML(plan.title)}</h3>
        <p>${escapeHTML(plan.detail)}</p>
      </div>
      <div class="plan-progress">${plan.complete}<span> / ${plan.total}</span></div>
    </article>
  `).join("");
}

function getTasksForDate(key) {
  const builtIn = dailyStudy[key] || [];
  const custom = state.plans.flatMap((plan) => {
    const dayOffset = daysBetween(parseDate(plan.startDate), parseDate(key));
    if (dayOffset < 0 || dayOffset >= plan.slices.length) return [];
    const slice = plan.slices[dayOffset];
    return [task(`custom-${plan.id}-${slice.id}`, plan.title, slice.text, "自定", "")];
  });
  return [...builtIn, ...custom];
}

function getUrgentItem(today) {
  const candidates = [
    ...deadlines.map((item) => ({ ...item, type: "deadline" })),
    ...exams.map((item) => ({
      date: item.date,
      title: `${item.fullName}考试`,
      detail: `${item.time} · ${item.location} · 座位 ${item.seat}`,
      type: "exam"
    }))
  ]
    .map((item) => ({ ...item, days: daysBetween(today, parseDate(item.date)) }))
    .filter((item) => item.days >= 0)
    .sort((a, b) => a.days - b.days);
  if (!candidates.length) return null;
  const first = candidates[0];
  return {
    ...first,
    when: first.days === 0 ? "今天" : first.days === 1 ? "明天" : `${first.days}天后`
  };
}

function getScheduleItems(key) {
  const date = parseDate(key);
  const items = [];
  const inCourseWeeks = key >= "2026-06-08" && key <= "2026-06-19";
  if (inCourseWeeks) {
    let courses = coursesByWeekday[date.getDay()] || [];
    if (key === "2026-06-18") {
      courses = courses.filter((course) => !["微观", "经济法"].includes(course));
    }
    if (courses.length) {
      items.push({ type: "course", title: "课程", time: "", detail: courses.join(" · ") });
    }
  }
  deadlines.filter((item) => item.date === key).forEach((item) => {
    items.push({ type: "deadline", title: item.title, time: "", detail: item.detail });
  });
  exams.filter((item) => item.date === key).forEach((item) => {
    items.push({
      type: "exam",
      title: `${item.fullName}考试`,
      time: item.time,
      detail: `${item.location} · 座位 ${item.seat}`
    });
  });
  return items;
}

function openPlanDialog() {
  els.planForm.reset();
  els.startDate.value = toDateKey(new Date());
  els.dayCount.value = 7;
  els.planDialog.showModal();
  els.planTitle.focus();
}

function handlePlanSubmit(event) {
  event.preventDefault();
  const title = els.planTitle.value.trim();
  const body = els.planBody.value.trim();
  const startDate = els.startDate.value || toDateKey(new Date());
  const count = clamp(Number(els.dayCount.value || 7), 1, 60);
  state.plans.unshift({
    id: makeID(),
    title,
    startDate,
    slices: makeSlices(body, count)
  });
  saveState();
  els.planDialog.close();
  switchTab("plans");
  render();
}

function makeSlices(body, count) {
  const lines = body.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const tasks = lines.length ? lines : ["推进这个计划的一小步"];
  return Array.from({ length: count }, (_, index) => ({
    id: makeID(),
    text: tasks[index % tasks.length],
    done: false
  }));
}

function toggleCompleted(dateKey, taskID) {
  const key = completionKey(dateKey, taskID);
  state.completed = state.completed.includes(key)
    ? state.completed.filter((item) => item !== key)
    : [...state.completed, key];
  saveState();
  render();
}

function downloadCalendarReminder() {
  const start = new Date();
  start.setHours(8, 0, 0, 0);
  if (start <= new Date()) start.setDate(start.getDate() + 1);
  const endDate = new Date(2026, 5, 30, 8, 0, 0);
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Today Plan//Daily Study Reminder//CN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:today-plan-${Date.now()}@local`,
    `DTSTAMP:${toICSDateTime(new Date())}`,
    `DTSTART:${toICSDateTime(start)}`,
    `RRULE:FREQ=DAILY;UNTIL=${toICSDateTime(endDate)}`,
    "SUMMARY:查看今日学习计划",
    "DESCRIPTION:打开主屏幕上的今日计划，完成今天最重要的三件事。",
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    "DESCRIPTION:查看今日学习计划",
    "TRIGGER:PT0M",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "today-plan-0800.ics";
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return {
      plans: Array.isArray(parsed.plans) ? parsed.plans : [],
      completed: Array.isArray(parsed.completed) ? parsed.completed : []
    };
  } catch {
    return { plans: [], completed: [] };
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Keep the current session usable when storage is unavailable.
  }
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  navigator.serviceWorker.register("sw.js").catch(() => {});
}

function getBuiltInProgress() {
  const start = parseDate("2026-06-12");
  const today = startOfLocalDay(new Date());
  return clamp(daysBetween(start, today), 0, 19);
}

function deadlinePassed(date) {
  return startOfLocalDay(new Date()) > parseDate(date);
}

function completionKey(date, id) {
  return `${date}:${id}`;
}

function getDuration(item) {
  if (!/^\d{2}:\d{2}$/.test(item.start) || !/^\d{2}:\d{2}$/.test(item.end)) return "—";
  const [startHour, startMinute] = item.start.split(":").map(Number);
  const [endHour, endMinute] = item.end.split(":").map(Number);
  return String((endHour * 60 + endMinute) - (startHour * 60 + startMinute));
}

function formatTaskTime(item) {
  if (!item.end) return item.start;
  return `${item.start}–${item.end}`;
}

function urgencyClass(days) {
  if (days <= 3) return "urgent";
  if (days <= 7) return "warning";
  return "";
}

function daysBetween(from, to) {
  return Math.round((startOfLocalDay(to) - startOfLocalDay(from)) / DAY_MS);
}

function parseDate(value) {
  return new Date(`${value}T00:00:00`);
}

function toDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDate(date, includeWeekday = false) {
  const base = `${date.getMonth() + 1}月${date.getDate()}日`;
  return includeWeekday ? `${base} ${formatWeekday(date)}` : base;
}

function formatWeekday(date) {
  return new Intl.DateTimeFormat("zh-CN", { weekday: "short" }).format(date);
}

function formatShortDate(value) {
  return formatDate(parseDate(value));
}

function formatClock(date) {
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

function startOfLocalDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function toICSDateTime(date) {
  return [
    date.getUTCFullYear(),
    String(date.getUTCMonth() + 1).padStart(2, "0"),
    String(date.getUTCDate()).padStart(2, "0"),
    "T",
    String(date.getUTCHours()).padStart(2, "0"),
    String(date.getUTCMinutes()).padStart(2, "0"),
    String(date.getUTCSeconds()).padStart(2, "0"),
    "Z"
  ].join("");
}

function colorNumbers(value) {
  return value.replace(/(\d+)/g, '<span style="color:var(--blue);font-weight:600">$1</span>');
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function makeID() {
  return globalThis.crypto?.randomUUID?.() || `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
