var R = Object.defineProperty;
var O = (c, i, e) => i in c ? R(c, i, { enumerable: !0, configurable: !0, writable: !0, value: e }) : c[i] = e;
var h = (c, i, e) => O(c, typeof i != "symbol" ? i + "" : i, e);
import { ref as x, watchEffect as L, computed as B, onMounted as A, createElementBlock as Y, openBlock as E, createElementVNode as M, toDisplayString as V, renderSlot as I, onUnmounted as j, createBlock as P, createCommentVNode as z, createVNode as _, withCtx as N, unref as J, withDirectives as U, vModelText as q, defineCustomElement as W, createApp as K } from "vue";
var d;
let v = (d = class extends Date {
  constructor(e = null, t = "YYYY-MM-DD", s = "en-US") {
    super(d.parseDateTime(e, t, s));
    h(this, "lang");
    this.lang = s;
  }
  static parseDateTime(e, t = "YYYY-MM-DD", s = "en-US") {
    if (!e) return new Date((/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0));
    if (e instanceof d) return e.toJSDate();
    if (e instanceof Date) return e;
    if (/^-?\d{10,}$/.test(String(e))) return new Date(Number(e));
    if (typeof e == "string") {
      const n = [];
      let r = null;
      for (; (r = d.regex.exec(t)) != null; ) r[1] !== "\\" && n.push(r);
      if (n.length) {
        const a = { year: null, month: null, shortMonth: null, longMonth: null, day: null, hour: 0, minute: 0, second: 0, ampm: null, value: "" };
        n[0].index > 0 && (a.value += ".*?");
        for (const [l, u] of Object.entries(n)) {
          const g = Number(l), { group: w, pattern: b } = d.formatPatterns(u[0], s);
          a[w] = g + 1, a.value += b, a.value += ".*?";
        }
        const o = new RegExp(`^${a.value}$`);
        if (o.test(e)) {
          const l = o.exec(e), u = Number(l[a.year]);
          let g = null;
          a.month ? g = Number(l[a.month]) - 1 : a.shortMonth ? g = d.shortMonths(s).indexOf(l[a.shortMonth]) : a.longMonth && (g = d.longMonths(s).indexOf(l[a.longMonth]));
          const w = Number(l[a.day]) || 1, b = Number(l[a.hour]);
          let k = Number.isNaN(b) ? 0 : b;
          const f = Number(l[a.minute]), m = Number.isNaN(f) ? 0 : f, y = Number(l[a.second]), T = Number.isNaN(y) ? 0 : y, S = l[a.ampm];
          return S && S === "PM" && (k += 12, k === 24 && (k = 0)), new Date(u, g, w, k, m, T, 0);
        }
      }
    }
    return new Date((/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0));
  }
  static shortMonths(e) {
    return d.MONTH_JS.map((t) => new Date(2019, t).toLocaleString(e, { month: "short" }));
  }
  static longMonths(e) {
    return d.MONTH_JS.map((t) => new Date(2019, t).toLocaleString(e, { month: "long" }));
  }
  static formatPatterns(e, t) {
    switch (e) {
      case "YY":
      case "YYYY":
        return { group: "year", pattern: `(\\d{${e.length}})` };
      case "M":
        return { group: "month", pattern: "(\\d{1,2})" };
      case "MM":
        return { group: "month", pattern: "(\\d{2})" };
      case "MMM":
        return { group: "shortMonth", pattern: `(${d.shortMonths(t).join("|")})` };
      case "MMMM":
        return { group: "longMonth", pattern: `(${d.longMonths(t).join("|")})` };
      case "D":
        return { group: "day", pattern: "(\\d{1,2})" };
      case "DD":
        return { group: "day", pattern: "(\\d{2})" };
      case "h":
      case "H":
        return { group: "hour", pattern: "(\\d{1,2})" };
      case "hh":
      case "HH":
        return { group: "hour", pattern: "(\\d{2})" };
      case "m":
        return { group: "minute", pattern: "(\\d{1,2})" };
      case "mm":
        return { group: "minute", pattern: "(\\d{2})" };
      case "s":
        return { group: "second", pattern: "(\\d{1,2})" };
      case "ss":
        return { group: "second", pattern: "(\\d{2})" };
      case "a":
      case "A":
        return { group: "ampm", pattern: "(AM|PM|am|pm)" };
    }
  }
  getWeek(e) {
    const t = new Date(this.midnight_ts(this)), s = (this.getDay() + (7 - e)) % 7;
    t.setDate(t.getDate() - s);
    const n = t.getTime();
    return t.setMonth(0, 1), t.getDay() !== e && t.setMonth(0, 1 + (4 - t.getDay() + 7) % 7), 1 + Math.ceil((n - t.getTime()) / 6048e5);
  }
  clone() {
    return new d(this);
  }
  toJSDate() {
    return new Date(this);
  }
  inArray(e, t = "[]") {
    return e.some((s) => s instanceof Array ? this.isBetween(s[0], s[1], t) : this.isSame(s, "day"));
  }
  isBetween(e, t, s = "()") {
    switch (s) {
      default:
      case "()":
        return this.midnight_ts(this) > this.midnight_ts(e) && this.midnight_ts(this) < this.midnight_ts(t);
      case "[)":
        return this.midnight_ts(this) >= this.midnight_ts(e) && this.midnight_ts(this) < this.midnight_ts(t);
      case "(]":
        return this.midnight_ts(this) > this.midnight_ts(e) && this.midnight_ts(this) <= this.midnight_ts(t);
      case "[]":
        return this.midnight_ts() >= this.midnight_ts(e) && this.midnight_ts() <= this.midnight_ts(t);
    }
  }
  isBefore(e, t = "days") {
    switch (t) {
      case "day":
      case "days":
        return new Date(e.getFullYear(), e.getMonth(), e.getDate()).getTime() > new Date(this.getFullYear(), this.getMonth(), this.getDate()).getTime();
      case "month":
      case "months":
        return new Date(e.getFullYear(), e.getMonth(), 1).getTime() > new Date(this.getFullYear(), this.getMonth(), 1).getTime();
      case "year":
      case "years":
        return e.getFullYear() > this.getFullYear();
    }
    throw new Error("isBefore: Invalid unit!");
  }
  isSameOrBefore(e, t = "days") {
    switch (t) {
      case "day":
      case "days":
        return new Date(e.getFullYear(), e.getMonth(), e.getDate()).getTime() >= new Date(this.getFullYear(), this.getMonth(), this.getDate()).getTime();
      case "month":
      case "months":
        return new Date(e.getFullYear(), e.getMonth(), 1).getTime() >= new Date(this.getFullYear(), this.getMonth(), 1).getTime();
    }
    throw new Error("isSameOrBefore: Invalid unit!");
  }
  isAfter(e, t = "days") {
    switch (t) {
      case "day":
      case "days":
        return new Date(this.getFullYear(), this.getMonth(), this.getDate()).getTime() > new Date(e.getFullYear(), e.getMonth(), e.getDate()).getTime();
      case "month":
      case "months":
        return new Date(this.getFullYear(), this.getMonth(), 1).getTime() > new Date(e.getFullYear(), e.getMonth(), 1).getTime();
      case "year":
      case "years":
        return this.getFullYear() > e.getFullYear();
    }
    throw new Error("isAfter: Invalid unit!");
  }
  isSameOrAfter(e, t = "days") {
    switch (t) {
      case "day":
      case "days":
        return new Date(this.getFullYear(), this.getMonth(), this.getDate()).getTime() >= new Date(e.getFullYear(), e.getMonth(), e.getDate()).getTime();
      case "month":
      case "months":
        return new Date(this.getFullYear(), this.getMonth(), 1).getTime() >= new Date(e.getFullYear(), e.getMonth(), 1).getTime();
    }
    throw new Error("isSameOrAfter: Invalid unit!");
  }
  isSame(e, t = "days") {
    switch (t) {
      case "day":
      case "days":
        return new Date(this.getFullYear(), this.getMonth(), this.getDate()).getTime() === new Date(e.getFullYear(), e.getMonth(), e.getDate()).getTime();
      case "month":
      case "months":
        return new Date(this.getFullYear(), this.getMonth(), 1).getTime() === new Date(e.getFullYear(), e.getMonth(), 1).getTime();
    }
    throw new Error("isSame: Invalid unit!");
  }
  add(e, t = "days") {
    switch (t) {
      case "day":
      case "days":
        this.setDate(this.getDate() + e);
        break;
      case "month":
      case "months":
        this.setMonth(this.getMonth() + e);
    }
    return this;
  }
  subtract(e, t = "days") {
    switch (t) {
      case "day":
      case "days":
        this.setDate(this.getDate() - e);
        break;
      case "month":
      case "months":
        this.setMonth(this.getMonth() - e);
    }
    return this;
  }
  diff(e, t = "days") {
    switch (t) {
      default:
      case "day":
      case "days":
        return Math.round((this.midnight_ts() - this.midnight_ts(e)) / 864e5);
      case "month":
      case "months":
        let s = 12 * (e.getFullYear() - this.getFullYear());
        return s -= e.getMonth(), s += this.getMonth(), s;
    }
  }
  format(e, t = "en-US") {
    let s = "";
    const n = [];
    let r = null;
    for (; (r = d.regex.exec(e)) != null; ) r[1] !== "\\" && n.push(r);
    if (n.length) {
      n[0].index > 0 && (s += e.substring(0, n[0].index));
      for (const [a, o] of Object.entries(n)) {
        const l = Number(a);
        s += this.formatTokens(o[0], t), n[l + 1] && (s += e.substring(o.index + o[0].length, n[l + 1].index)), l === n.length - 1 && (s += e.substring(o.index + o[0].length));
      }
    }
    return s.replace(/\\/g, "");
  }
  midnight_ts(e) {
    return e ? new Date(e.getFullYear(), e.getMonth(), e.getDate(), 0, 0, 0, 0).getTime() : new Date(this.getFullYear(), this.getMonth(), this.getDate(), 0, 0, 0, 0).getTime();
  }
  formatTokens(e, t) {
    switch (e) {
      case "YY":
        return String(this.getFullYear()).slice(-2);
      case "YYYY":
        return String(this.getFullYear());
      case "M":
        return String(this.getMonth() + 1);
      case "MM":
        return `0${this.getMonth() + 1}`.slice(-2);
      case "MMM":
        return d.shortMonths(t)[this.getMonth()];
      case "MMMM":
        return d.longMonths(t)[this.getMonth()];
      case "D":
        return String(this.getDate());
      case "DD":
        return `0${this.getDate()}`.slice(-2);
      case "H":
        return String(this.getHours());
      case "HH":
        return `0${this.getHours()}`.slice(-2);
      case "h":
        return String(this.getHours() % 12 || 12);
      case "hh":
        return `0${this.getHours() % 12 || 12}`.slice(-2);
      case "m":
        return String(this.getMinutes());
      case "mm":
        return `0${this.getMinutes()}`.slice(-2);
      case "s":
        return String(this.getSeconds());
      case "ss":
        return `0${this.getSeconds()}`.slice(-2);
      case "a":
        return this.getHours() < 12 || this.getHours() === 24 ? "am" : "pm";
      case "A":
        return this.getHours() < 12 || this.getHours() === 24 ? "AM" : "PM";
      default:
        return "";
    }
  }
}, h(d, "regex", /(\\)?(Y{2,4}|M{1,4}|D{1,2}|H{1,2}|h{1,2}|m{1,2}|s{1,2}|A|a)/g), h(d, "MONTH_JS", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]), d), Z = class {
  constructor(i) {
    h(this, "picker");
    this.picker = i;
  }
  render(i, e) {
    i || (i = new v()), i.setDate(1), i.setHours(0, 0, 0, 0), typeof this[`get${e}View`] == "function" && this[`get${e}View`](i);
  }
  getContainerView(i) {
    this.picker.ui.container.innerHTML = "", this.picker.options.header && this.picker.trigger("render", { date: i.clone(), view: "Header" }), this.picker.trigger("render", { date: i.clone(), view: "Main" }), this.picker.options.autoApply || this.picker.trigger("render", { date: i.clone(), view: "Footer" });
  }
  getHeaderView(i) {
    const e = document.createElement("header");
    this.picker.options.header instanceof HTMLElement && e.appendChild(this.picker.options.header), typeof this.picker.options.header == "string" && (e.innerHTML = this.picker.options.header), this.picker.ui.container.appendChild(e), this.picker.trigger("view", { target: e, date: i.clone(), view: "Header" });
  }
  getMainView(i) {
    const e = document.createElement("main");
    this.picker.ui.container.appendChild(e);
    const t = document.createElement("div");
    t.className = `calendars grid-${this.picker.options.grid}`;
    for (let s = 0; s < this.picker.options.calendars; s++) {
      const n = document.createElement("div");
      n.className = "calendar", t.appendChild(n);
      const r = this.getCalendarHeaderView(i.clone());
      n.appendChild(r), this.picker.trigger("view", { date: i.clone(), view: "CalendarHeader", index: s, target: r });
      const a = this.getCalendarDayNamesView();
      n.appendChild(a), this.picker.trigger("view", { date: i.clone(), view: "CalendarDayNames", index: s, target: a });
      const o = this.getCalendarDaysView(i.clone());
      n.appendChild(o), this.picker.trigger("view", { date: i.clone(), view: "CalendarDays", index: s, target: o });
      const l = this.getCalendarFooterView(this.picker.options.lang, i.clone());
      n.appendChild(l), this.picker.trigger("view", { date: i.clone(), view: "CalendarFooter", index: s, target: l }), this.picker.trigger("view", { date: i.clone(), view: "CalendarItem", index: s, target: n }), i.add(1, "month");
    }
    e.appendChild(t), this.picker.trigger("view", { date: i.clone(), view: "Calendars", target: t }), this.picker.trigger("view", { date: i.clone(), view: "Main", target: e });
  }
  getFooterView(i) {
    const e = document.createElement("footer"), t = document.createElement("div");
    t.className = "footer-buttons";
    const s = document.createElement("button");
    s.className = "cancel-button unit", s.innerHTML = this.picker.options.locale.cancel, t.appendChild(s);
    const n = document.createElement("button");
    n.className = "apply-button unit", n.innerHTML = this.picker.options.locale.apply, n.disabled = !0, t.appendChild(n), e.appendChild(t), this.picker.ui.container.appendChild(e), this.picker.trigger("view", { date: i, target: e, view: "Footer" });
  }
  getCalendarHeaderView(i) {
    const e = document.createElement("div");
    e.className = "header";
    const t = document.createElement("div");
    t.className = "month-name", t.innerHTML = `<span>${i.toLocaleString(this.picker.options.lang, { month: "long" })}</span> ${i.format("YYYY")}`, e.appendChild(t);
    const s = document.createElement("button");
    s.className = "previous-button unit", s.innerHTML = this.picker.options.locale.previousMonth, e.appendChild(s);
    const n = document.createElement("button");
    return n.className = "next-button unit", n.innerHTML = this.picker.options.locale.nextMonth, e.appendChild(n), e;
  }
  getCalendarDayNamesView() {
    const i = document.createElement("div");
    i.className = "daynames-row";
    for (let e = 1; e <= 7; e++) {
      const t = 3 + this.picker.options.firstDay + e, s = document.createElement("div");
      s.className = "dayname", s.innerHTML = new Date(1970, 0, t, 12, 0, 0, 0).toLocaleString(this.picker.options.lang, { weekday: "short" }), s.title = new Date(1970, 0, t, 12, 0, 0, 0).toLocaleString(this.picker.options.lang, { weekday: "long" }), i.appendChild(s), this.picker.trigger("view", { dayIdx: t, view: "CalendarDayName", target: s });
    }
    return i;
  }
  getCalendarDaysView(i) {
    const e = document.createElement("div");
    e.className = "days-grid";
    const t = this.calcOffsetDays(i, this.picker.options.firstDay), s = 32 - new Date(i.getFullYear(), i.getMonth(), 32).getDate();
    for (let n = 0; n < t; n++) {
      const r = document.createElement("div");
      r.className = "offset", e.appendChild(r);
    }
    for (let n = 1; n <= s; n++) {
      i.setDate(n);
      const r = this.getCalendarDayView(i);
      e.appendChild(r), this.picker.trigger("view", { date: i, view: "CalendarDay", target: r });
    }
    return e;
  }
  getCalendarDayView(i) {
    const e = this.picker.options.date ? new v(this.picker.options.date) : null, t = new v(), s = document.createElement("div");
    return s.className = "day unit", s.innerHTML = i.format("D"), s.dataset.time = String(i.getTime()), i.isSame(t, "day") && s.classList.add("today"), [0, 6].includes(i.getDay()) && s.classList.add("weekend"), this.picker.datePicked.length ? this.picker.datePicked[0].isSame(i, "day") && s.classList.add("selected") : e && i.isSame(e, "day") && s.classList.add("selected"), this.picker.trigger("view", { date: i, view: "CalendarDay", target: s }), s;
  }
  getCalendarFooterView(i, e) {
    const t = document.createElement("div");
    return t.className = "footer", t;
  }
  calcOffsetDays(i, e) {
    let t = i.getDay() - e;
    return t < 0 && (t += 7), t;
  }
}, G = class {
  constructor(i) {
    h(this, "picker");
    h(this, "instances", {});
    this.picker = i;
  }
  initialize() {
    const i = [];
    this.picker.options.plugins.forEach((e) => {
      typeof e == "function" ? i.push(new e()) : typeof e == "string" && typeof easepick < "u" && Object.prototype.hasOwnProperty.call(easepick, e) ? i.push(new easepick[e]()) : console.warn(`easepick: ${e} not found.`);
    }), i.sort((e, t) => e.priority > t.priority ? -1 : e.priority < t.priority || e.dependencies.length > t.dependencies.length ? 1 : e.dependencies.length < t.dependencies.length ? -1 : 0), i.forEach((e) => {
      e.attach(this.picker), this.instances[e.getName()] = e;
    });
  }
  getInstance(i) {
    return this.instances[i];
  }
  addInstance(i) {
    if (Object.prototype.hasOwnProperty.call(this.instances, i)) console.warn(`easepick: ${i} already added.`);
    else {
      if (typeof easepick < "u" && Object.prototype.hasOwnProperty.call(easepick, i)) {
        const e = new easepick[i]();
        return e.attach(this.picker), this.instances[e.getName()] = e, e;
      }
      if (this.getPluginFn(i) !== "undefined") {
        const e = new (this.getPluginFn(i))();
        return e.attach(this.picker), this.instances[e.getName()] = e, e;
      }
      console.warn(`easepick: ${i} not found.`);
    }
    return null;
  }
  removeInstance(i) {
    return i in this.instances && this.instances[i].detach(), delete this.instances[i];
  }
  reloadInstance(i) {
    return this.removeInstance(i), this.addInstance(i);
  }
  getPluginFn(i) {
    return [...this.picker.options.plugins].filter((e) => typeof e == "function" && new e().getName() === i).shift();
  }
};
class H {
  constructor(i) {
    h(this, "Calendar", new Z(this));
    h(this, "PluginManager", new G(this));
    h(this, "calendars", []);
    h(this, "datePicked", []);
    h(this, "cssLoaded", 0);
    h(this, "binds", { hidePicker: this.hidePicker.bind(this), show: this.show.bind(this) });
    h(this, "options", { doc: document, css: [], element: null, firstDay: 1, grid: 1, calendars: 1, lang: "en-US", date: null, format: "YYYY-MM-DD", readonly: !0, autoApply: !0, header: !1, inline: !1, scrollToDate: !0, locale: { nextMonth: '<svg width="11" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M2.748 16L0 13.333 5.333 8 0 2.667 2.748 0l7.919 8z" fill-rule="nonzero"/></svg>', previousMonth: '<svg width="11" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M7.919 0l2.748 2.667L5.333 8l5.334 5.333L7.919 16 0 8z" fill-rule="nonzero"/></svg>', cancel: "Cancel", apply: "Apply" }, documentClick: this.binds.hidePicker, plugins: [] });
    h(this, "ui", { container: null, shadowRoot: null, wrapper: null });
    h(this, "version", "1.2.1");
    const e = { ...this.options.locale, ...i.locale };
    this.options = { ...this.options, ...i }, this.options.locale = e, this.handleOptions(), this.ui.wrapper = document.createElement("span"), this.ui.wrapper.style.display = "none", this.ui.wrapper.style.position = "absolute", this.ui.wrapper.style.pointerEvents = "none", this.ui.wrapper.className = "easepick-wrapper", this.ui.wrapper.attachShadow({ mode: "open" }), this.ui.shadowRoot = this.ui.wrapper.shadowRoot, this.ui.container = document.createElement("div"), this.ui.container.className = "container", this.options.zIndex && (this.ui.container.style.zIndex = String(this.options.zIndex)), this.options.inline && (this.ui.wrapper.style.position = "relative", this.ui.container.classList.add("inline")), this.ui.shadowRoot.appendChild(this.ui.container), this.options.element.after(this.ui.wrapper), this.handleCSS(), this.options.element.addEventListener("click", this.binds.show), this.on("view", this.onView.bind(this)), this.on("render", this.onRender.bind(this)), this.PluginManager.initialize(), this.parseValues(), typeof this.options.setup == "function" && this.options.setup(this), this.on("click", this.onClick.bind(this));
    const t = this.options.scrollToDate ? this.getDate() : null;
    this.renderAll(t);
  }
  on(i, e, t = {}) {
    this.ui.container.addEventListener(i, e, t);
  }
  off(i, e, t = {}) {
    this.ui.container.removeEventListener(i, e, t);
  }
  trigger(i, e = {}) {
    return this.ui.container.dispatchEvent(new CustomEvent(i, { detail: e }));
  }
  destroy() {
    this.options.element.removeEventListener("click", this.binds.show), typeof this.options.documentClick == "function" && document.removeEventListener("click", this.options.documentClick, !0), Object.keys(this.PluginManager.instances).forEach((i) => {
      this.PluginManager.removeInstance(i);
    }), this.ui.wrapper.remove();
  }
  onRender(i) {
    const { view: e, date: t } = i.detail;
    this.Calendar.render(t, e);
  }
  onView(i) {
    const { view: e, target: t } = i.detail;
    e === "Footer" && this.datePicked.length && (t.querySelector(".apply-button").disabled = !1);
  }
  onClickHeaderButton(i) {
    this.isCalendarHeaderButton(i) && (i.classList.contains("next-button") ? this.calendars[0].add(1, "month") : this.calendars[0].subtract(1, "month"), this.renderAll(this.calendars[0]));
  }
  onClickCalendarDay(i) {
    if (this.isCalendarDay(i)) {
      const e = new v(i.dataset.time);
      this.options.autoApply ? (this.setDate(e), this.trigger("select", { date: this.getDate() }), this.hide()) : (this.datePicked[0] = e, this.trigger("preselect", { date: this.getDate() }), this.renderAll());
    }
  }
  onClickApplyButton(i) {
    if (this.isApplyButton(i)) {
      if (this.datePicked[0] instanceof Date) {
        const e = this.datePicked[0].clone();
        this.setDate(e);
      }
      this.hide(), this.trigger("select", { date: this.getDate() });
    }
  }
  onClickCancelButton(i) {
    this.isCancelButton(i) && this.hide();
  }
  onClick(i) {
    const e = i.target;
    if (e instanceof HTMLElement) {
      const t = e.closest(".unit");
      if (!(t instanceof HTMLElement)) return;
      this.onClickHeaderButton(t), this.onClickCalendarDay(t), this.onClickApplyButton(t), this.onClickCancelButton(t);
    }
  }
  isShown() {
    return this.ui.container.classList.contains("inline") || this.ui.container.classList.contains("show");
  }
  show(i) {
    if (this.isShown()) return;
    const e = i && "target" in i ? i.target : this.options.element, { top: t, left: s } = this.adjustPosition(e);
    this.ui.container.style.top = `${t}px`, this.ui.container.style.left = `${s}px`, this.ui.container.classList.add("show"), this.trigger("show", { target: e });
  }
  hide() {
    this.ui.container.classList.remove("show"), this.datePicked.length = 0, this.renderAll(), this.trigger("hide");
  }
  setDate(i) {
    const e = new v(i, this.options.format);
    this.options.date = e.clone(), this.updateValues(), this.calendars.length && this.renderAll();
  }
  getDate() {
    return this.options.date instanceof v ? this.options.date.clone() : null;
  }
  parseValues() {
    this.options.date ? this.setDate(this.options.date) : this.options.element instanceof HTMLInputElement && this.options.element.value.length && this.setDate(this.options.element.value), this.options.date instanceof Date || (this.options.date = null);
  }
  updateValues() {
    const i = this.getDate(), e = i instanceof Date ? i.format(this.options.format, this.options.lang) : "", t = this.options.element;
    t instanceof HTMLInputElement ? t.value = e : t instanceof HTMLElement && (t.innerText = e);
  }
  hidePicker(i) {
    let e = i.target, t = null;
    e.shadowRoot && (e = i.composedPath()[0], t = e.getRootNode().host), this.isShown() && t !== this.ui.wrapper && e !== this.options.element && this.hide();
  }
  renderAll(i) {
    this.trigger("render", { view: "Container", date: (i || this.calendars[0]).clone() });
  }
  isCalendarHeaderButton(i) {
    return ["previous-button", "next-button"].some((e) => i.classList.contains(e));
  }
  isCalendarDay(i) {
    return i.classList.contains("day");
  }
  isApplyButton(i) {
    return i.classList.contains("apply-button");
  }
  isCancelButton(i) {
    return i.classList.contains("cancel-button");
  }
  gotoDate(i) {
    const e = new v(i, this.options.format);
    e.setDate(1), this.calendars[0] = e.clone(), this.renderAll();
  }
  clear() {
    this.options.date = null, this.datePicked.length = 0, this.updateValues(), this.renderAll(), this.trigger("clear");
  }
  handleOptions() {
    this.options.element instanceof HTMLElement || (this.options.element = this.options.doc.querySelector(this.options.element)), typeof this.options.documentClick == "function" && document.addEventListener("click", this.options.documentClick, !0), this.options.element instanceof HTMLInputElement && (this.options.element.readOnly = this.options.readonly), this.options.date ? this.calendars[0] = new v(this.options.date, this.options.format) : this.calendars[0] = new v();
  }
  handleCSS() {
    if (Array.isArray(this.options.css)) this.options.css.forEach((i) => {
      const e = document.createElement("link");
      e.href = i, e.rel = "stylesheet";
      const t = () => {
        this.cssLoaded++, this.cssLoaded === this.options.css.length && (this.ui.wrapper.style.display = "");
      };
      e.addEventListener("load", t), e.addEventListener("error", t), this.ui.shadowRoot.append(e);
    });
    else if (typeof this.options.css == "string") {
      const i = document.createElement("style"), e = document.createTextNode(this.options.css);
      i.appendChild(e), this.ui.shadowRoot.append(i), this.ui.wrapper.style.display = "";
    } else typeof this.options.css == "function" && (this.options.css.call(this, this), this.ui.wrapper.style.display = "");
  }
  adjustPosition(i) {
    const e = i.getBoundingClientRect(), t = this.ui.wrapper.getBoundingClientRect();
    this.ui.container.classList.add("calc");
    const s = this.ui.container.getBoundingClientRect();
    this.ui.container.classList.remove("calc");
    let n = e.bottom - t.bottom, r = e.left - t.left;
    return typeof window < "u" && (window.innerHeight < n + s.height && n - s.height >= 0 && (n = e.top - t.top - s.height), window.innerWidth < r + s.width && e.right - s.width >= 0 && (r = e.right - t.right - s.width)), { left: r, top: n };
  }
}
var Q = Object.freeze({ __proto__: null, Core: H, create: H });
const p = class p extends Date {
  constructor(e = null, t = "YYYY-MM-DD", s = "en-US") {
    super(p.parseDateTime(e, t, s));
    h(this, "lang");
    this.lang = s;
  }
  static parseDateTime(e, t = "YYYY-MM-DD", s = "en-US") {
    if (!e) return new Date((/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0));
    if (e instanceof p) return e.toJSDate();
    if (e instanceof Date) return e;
    if (/^-?\d{10,}$/.test(String(e))) return new Date(Number(e));
    if (typeof e == "string") {
      const n = [];
      let r = null;
      for (; (r = p.regex.exec(t)) != null; ) r[1] !== "\\" && n.push(r);
      if (n.length) {
        const a = { year: null, month: null, shortMonth: null, longMonth: null, day: null, hour: 0, minute: 0, second: 0, ampm: null, value: "" };
        n[0].index > 0 && (a.value += ".*?");
        for (const [l, u] of Object.entries(n)) {
          const g = Number(l), { group: w, pattern: b } = p.formatPatterns(u[0], s);
          a[w] = g + 1, a.value += b, a.value += ".*?";
        }
        const o = new RegExp(`^${a.value}$`);
        if (o.test(e)) {
          const l = o.exec(e), u = Number(l[a.year]);
          let g = null;
          a.month ? g = Number(l[a.month]) - 1 : a.shortMonth ? g = p.shortMonths(s).indexOf(l[a.shortMonth]) : a.longMonth && (g = p.longMonths(s).indexOf(l[a.longMonth]));
          const w = Number(l[a.day]) || 1, b = Number(l[a.hour]);
          let k = Number.isNaN(b) ? 0 : b;
          const f = Number(l[a.minute]), m = Number.isNaN(f) ? 0 : f, y = Number(l[a.second]), T = Number.isNaN(y) ? 0 : y, S = l[a.ampm];
          return S && S === "PM" && (k += 12, k === 24 && (k = 0)), new Date(u, g, w, k, m, T, 0);
        }
      }
    }
    return new Date((/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0));
  }
  static shortMonths(e) {
    return p.MONTH_JS.map((t) => new Date(2019, t).toLocaleString(e, { month: "short" }));
  }
  static longMonths(e) {
    return p.MONTH_JS.map((t) => new Date(2019, t).toLocaleString(e, { month: "long" }));
  }
  static formatPatterns(e, t) {
    switch (e) {
      case "YY":
      case "YYYY":
        return { group: "year", pattern: `(\\d{${e.length}})` };
      case "M":
        return { group: "month", pattern: "(\\d{1,2})" };
      case "MM":
        return { group: "month", pattern: "(\\d{2})" };
      case "MMM":
        return { group: "shortMonth", pattern: `(${p.shortMonths(t).join("|")})` };
      case "MMMM":
        return { group: "longMonth", pattern: `(${p.longMonths(t).join("|")})` };
      case "D":
        return { group: "day", pattern: "(\\d{1,2})" };
      case "DD":
        return { group: "day", pattern: "(\\d{2})" };
      case "h":
      case "H":
        return { group: "hour", pattern: "(\\d{1,2})" };
      case "hh":
      case "HH":
        return { group: "hour", pattern: "(\\d{2})" };
      case "m":
        return { group: "minute", pattern: "(\\d{1,2})" };
      case "mm":
        return { group: "minute", pattern: "(\\d{2})" };
      case "s":
        return { group: "second", pattern: "(\\d{1,2})" };
      case "ss":
        return { group: "second", pattern: "(\\d{2})" };
      case "a":
      case "A":
        return { group: "ampm", pattern: "(AM|PM|am|pm)" };
    }
  }
  getWeek(e) {
    const t = new Date(this.midnight_ts(this)), s = (this.getDay() + (7 - e)) % 7;
    t.setDate(t.getDate() - s);
    const n = t.getTime();
    return t.setMonth(0, 1), t.getDay() !== e && t.setMonth(0, 1 + (4 - t.getDay() + 7) % 7), 1 + Math.ceil((n - t.getTime()) / 6048e5);
  }
  clone() {
    return new p(this);
  }
  toJSDate() {
    return new Date(this);
  }
  inArray(e, t = "[]") {
    return e.some((s) => s instanceof Array ? this.isBetween(s[0], s[1], t) : this.isSame(s, "day"));
  }
  isBetween(e, t, s = "()") {
    switch (s) {
      default:
      case "()":
        return this.midnight_ts(this) > this.midnight_ts(e) && this.midnight_ts(this) < this.midnight_ts(t);
      case "[)":
        return this.midnight_ts(this) >= this.midnight_ts(e) && this.midnight_ts(this) < this.midnight_ts(t);
      case "(]":
        return this.midnight_ts(this) > this.midnight_ts(e) && this.midnight_ts(this) <= this.midnight_ts(t);
      case "[]":
        return this.midnight_ts() >= this.midnight_ts(e) && this.midnight_ts() <= this.midnight_ts(t);
    }
  }
  isBefore(e, t = "days") {
    switch (t) {
      case "day":
      case "days":
        return new Date(e.getFullYear(), e.getMonth(), e.getDate()).getTime() > new Date(this.getFullYear(), this.getMonth(), this.getDate()).getTime();
      case "month":
      case "months":
        return new Date(e.getFullYear(), e.getMonth(), 1).getTime() > new Date(this.getFullYear(), this.getMonth(), 1).getTime();
      case "year":
      case "years":
        return e.getFullYear() > this.getFullYear();
    }
    throw new Error("isBefore: Invalid unit!");
  }
  isSameOrBefore(e, t = "days") {
    switch (t) {
      case "day":
      case "days":
        return new Date(e.getFullYear(), e.getMonth(), e.getDate()).getTime() >= new Date(this.getFullYear(), this.getMonth(), this.getDate()).getTime();
      case "month":
      case "months":
        return new Date(e.getFullYear(), e.getMonth(), 1).getTime() >= new Date(this.getFullYear(), this.getMonth(), 1).getTime();
    }
    throw new Error("isSameOrBefore: Invalid unit!");
  }
  isAfter(e, t = "days") {
    switch (t) {
      case "day":
      case "days":
        return new Date(this.getFullYear(), this.getMonth(), this.getDate()).getTime() > new Date(e.getFullYear(), e.getMonth(), e.getDate()).getTime();
      case "month":
      case "months":
        return new Date(this.getFullYear(), this.getMonth(), 1).getTime() > new Date(e.getFullYear(), e.getMonth(), 1).getTime();
      case "year":
      case "years":
        return this.getFullYear() > e.getFullYear();
    }
    throw new Error("isAfter: Invalid unit!");
  }
  isSameOrAfter(e, t = "days") {
    switch (t) {
      case "day":
      case "days":
        return new Date(this.getFullYear(), this.getMonth(), this.getDate()).getTime() >= new Date(e.getFullYear(), e.getMonth(), e.getDate()).getTime();
      case "month":
      case "months":
        return new Date(this.getFullYear(), this.getMonth(), 1).getTime() >= new Date(e.getFullYear(), e.getMonth(), 1).getTime();
    }
    throw new Error("isSameOrAfter: Invalid unit!");
  }
  isSame(e, t = "days") {
    switch (t) {
      case "day":
      case "days":
        return new Date(this.getFullYear(), this.getMonth(), this.getDate()).getTime() === new Date(e.getFullYear(), e.getMonth(), e.getDate()).getTime();
      case "month":
      case "months":
        return new Date(this.getFullYear(), this.getMonth(), 1).getTime() === new Date(e.getFullYear(), e.getMonth(), 1).getTime();
    }
    throw new Error("isSame: Invalid unit!");
  }
  add(e, t = "days") {
    switch (t) {
      case "day":
      case "days":
        this.setDate(this.getDate() + e);
        break;
      case "month":
      case "months":
        this.setMonth(this.getMonth() + e);
    }
    return this;
  }
  subtract(e, t = "days") {
    switch (t) {
      case "day":
      case "days":
        this.setDate(this.getDate() - e);
        break;
      case "month":
      case "months":
        this.setMonth(this.getMonth() - e);
    }
    return this;
  }
  diff(e, t = "days") {
    switch (t) {
      default:
      case "day":
      case "days":
        return Math.round((this.midnight_ts() - this.midnight_ts(e)) / 864e5);
      case "month":
      case "months":
        let s = 12 * (e.getFullYear() - this.getFullYear());
        return s -= e.getMonth(), s += this.getMonth(), s;
    }
  }
  format(e, t = "en-US") {
    let s = "";
    const n = [];
    let r = null;
    for (; (r = p.regex.exec(e)) != null; ) r[1] !== "\\" && n.push(r);
    if (n.length) {
      n[0].index > 0 && (s += e.substring(0, n[0].index));
      for (const [a, o] of Object.entries(n)) {
        const l = Number(a);
        s += this.formatTokens(o[0], t), n[l + 1] && (s += e.substring(o.index + o[0].length, n[l + 1].index)), l === n.length - 1 && (s += e.substring(o.index + o[0].length));
      }
    }
    return s.replace(/\\/g, "");
  }
  midnight_ts(e) {
    return e ? new Date(e.getFullYear(), e.getMonth(), e.getDate(), 0, 0, 0, 0).getTime() : new Date(this.getFullYear(), this.getMonth(), this.getDate(), 0, 0, 0, 0).getTime();
  }
  formatTokens(e, t) {
    switch (e) {
      case "YY":
        return String(this.getFullYear()).slice(-2);
      case "YYYY":
        return String(this.getFullYear());
      case "M":
        return String(this.getMonth() + 1);
      case "MM":
        return `0${this.getMonth() + 1}`.slice(-2);
      case "MMM":
        return p.shortMonths(t)[this.getMonth()];
      case "MMMM":
        return p.longMonths(t)[this.getMonth()];
      case "D":
        return String(this.getDate());
      case "DD":
        return `0${this.getDate()}`.slice(-2);
      case "H":
        return String(this.getHours());
      case "HH":
        return `0${this.getHours()}`.slice(-2);
      case "h":
        return String(this.getHours() % 12 || 12);
      case "hh":
        return `0${this.getHours() % 12 || 12}`.slice(-2);
      case "m":
        return String(this.getMinutes());
      case "mm":
        return `0${this.getMinutes()}`.slice(-2);
      case "s":
        return String(this.getSeconds());
      case "ss":
        return `0${this.getSeconds()}`.slice(-2);
      case "a":
        return this.getHours() < 12 || this.getHours() === 24 ? "am" : "pm";
      case "A":
        return this.getHours() < 12 || this.getHours() === 24 ? "AM" : "PM";
      default:
        return "";
    }
  }
};
h(p, "regex", /(\\)?(Y{2,4}|M{1,4}|D{1,2}|H{1,2}|h{1,2}|m{1,2}|s{1,2}|A|a)/g), h(p, "MONTH_JS", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
let D = p;
class X {
  constructor() {
    h(this, "picker");
    h(this, "options");
    h(this, "priority", 0);
    h(this, "dependencies", []);
  }
  attach(i) {
    const e = this.getName(), t = { ...this.options };
    this.options = { ...this.options, ...i.options[e] || {} };
    for (const n of Object.keys(t)) if (t[n] !== null && typeof t[n] == "object" && Object.keys(t[n]).length && e in i.options && n in i.options[e]) {
      const r = { ...i.options[e][n] };
      r !== null && typeof r == "object" && Object.keys(r).length && Object.keys(r).every((a) => Object.keys(t[n]).includes(a)) && (this.options[n] = { ...t[n], ...r });
    }
    if (this.picker = i, this.dependenciesNotFound()) {
      const n = this.dependencies.filter((r) => !this.pluginsAsStringArray().includes(r));
      return void console.warn(`${this.getName()}: required dependencies (${n.join(", ")}).`);
    }
    const s = this.camelCaseToKebab(this.getName());
    this.picker.ui.container.classList.add(s), this.onAttach();
  }
  detach() {
    const i = this.camelCaseToKebab(this.getName());
    this.picker.ui.container.classList.remove(i), typeof this.onDetach == "function" && this.onDetach();
  }
  dependenciesNotFound() {
    return this.dependencies.length && !this.dependencies.every((i) => this.pluginsAsStringArray().includes(i));
  }
  pluginsAsStringArray() {
    return this.picker.options.plugins.map((i) => typeof i == "function" ? new i().getName() : i);
  }
  camelCaseToKebab(i) {
    return i.replace(/([a-zA-Z])(?=[A-Z])/g, "$1-").toLowerCase();
  }
}
class ee extends X {
  constructor() {
    super(...arguments);
    h(this, "tooltipElement");
    h(this, "triggerElement");
    h(this, "binds", { setStartDate: this.setStartDate.bind(this), setEndDate: this.setEndDate.bind(this), setDateRange: this.setDateRange.bind(this), getStartDate: this.getStartDate.bind(this), getEndDate: this.getEndDate.bind(this), onView: this.onView.bind(this), onShow: this.onShow.bind(this), onMouseEnter: this.onMouseEnter.bind(this), onMouseLeave: this.onMouseLeave.bind(this), onClickCalendarDay: this.onClickCalendarDay.bind(this), onClickApplyButton: this.onClickApplyButton.bind(this), parseValues: this.parseValues.bind(this), updateValues: this.updateValues.bind(this), clear: this.clear.bind(this) });
    h(this, "options", { elementEnd: null, startDate: null, endDate: null, repick: !1, strict: !0, delimiter: " - ", tooltip: !0, tooltipNumber: (e) => e, locale: { zero: "", one: "day", two: "", few: "", many: "", other: "days" }, documentClick: this.hidePicker.bind(this) });
  }
  getName() {
    return "RangePlugin";
  }
  onAttach() {
    this.binds._setStartDate = this.picker.setStartDate, this.binds._setEndDate = this.picker.setEndDate, this.binds._setDateRange = this.picker.setDateRange, this.binds._getStartDate = this.picker.getStartDate, this.binds._getEndDate = this.picker.getEndDate, this.binds._parseValues = this.picker.parseValues, this.binds._updateValues = this.picker.updateValues, this.binds._clear = this.picker.clear, this.binds._onClickCalendarDay = this.picker.onClickCalendarDay, this.binds._onClickApplyButton = this.picker.onClickApplyButton, Object.defineProperties(this.picker, { setStartDate: { configurable: !0, value: this.binds.setStartDate }, setEndDate: { configurable: !0, value: this.binds.setEndDate }, setDateRange: { configurable: !0, value: this.binds.setDateRange }, getStartDate: { configurable: !0, value: this.binds.getStartDate }, getEndDate: { configurable: !0, value: this.binds.getEndDate }, parseValues: { configurable: !0, value: this.binds.parseValues }, updateValues: { configurable: !0, value: this.binds.updateValues }, clear: { configurable: !0, value: this.binds.clear }, onClickCalendarDay: { configurable: !0, value: this.binds.onClickCalendarDay }, onClickApplyButton: { configurable: !0, value: this.binds.onClickApplyButton } }), this.options.elementEnd && (this.options.elementEnd instanceof HTMLElement || (this.options.elementEnd = this.picker.options.doc.querySelector(this.options.elementEnd)), this.options.elementEnd instanceof HTMLInputElement && (this.options.elementEnd.readOnly = this.picker.options.readonly), typeof this.picker.options.documentClick == "function" && (document.removeEventListener("click", this.picker.options.documentClick, !0), typeof this.options.documentClick == "function" && document.addEventListener("click", this.options.documentClick, !0)), this.options.elementEnd.addEventListener("click", this.picker.show.bind(this.picker))), this.options.repick = this.options.repick && this.options.elementEnd instanceof HTMLElement, this.picker.options.date = null, this.picker.on("view", this.binds.onView), this.picker.on("show", this.binds.onShow), this.picker.on("mouseenter", this.binds.onMouseEnter, !0), this.picker.on("mouseleave", this.binds.onMouseLeave, !0), this.checkIntlPluralLocales();
  }
  onDetach() {
    Object.defineProperties(this.picker, { setStartDate: { configurable: !0, value: this.binds._setStartDate }, setEndDate: { configurable: !0, value: this.binds._setEndDate }, setDateRange: { configurable: !0, value: this.binds._setDateRange }, getStartDate: { configurable: !0, value: this.binds._getStartDate }, getEndDate: { configurable: !0, value: this.binds._getEndDate }, parseValues: { configurable: !0, value: this.binds._parseValues }, updateValues: { configurable: !0, value: this.binds._updateValues }, clear: { configurable: !0, value: this.binds._clear }, onClickCalendarDay: { configurable: !0, value: this.binds._onClickCalendarDay }, onClickApplyButton: { configurable: !0, value: this.binds._onClickApplyButton } }), this.picker.off("view", this.binds.onView), this.picker.off("show", this.binds.onShow), this.picker.off("mouseenter", this.binds.onMouseEnter, !0), this.picker.off("mouseleave", this.binds.onMouseLeave, !0);
  }
  parseValues() {
    if (this.options.startDate || this.options.endDate) this.options.strict ? this.options.startDate && this.options.endDate ? this.setDateRange(this.options.startDate, this.options.endDate) : (this.options.startDate = null, this.options.endDate = null) : (this.options.startDate && this.setStartDate(this.options.startDate), this.options.endDate && this.setEndDate(this.options.endDate));
    else if (this.options.elementEnd) this.options.strict ? this.picker.options.element instanceof HTMLInputElement && this.picker.options.element.value.length && this.options.elementEnd instanceof HTMLInputElement && this.options.elementEnd.value.length && this.setDateRange(this.picker.options.element.value, this.options.elementEnd.value) : (this.picker.options.element instanceof HTMLInputElement && this.picker.options.element.value.length && this.setStartDate(this.picker.options.element.value), this.options.elementEnd instanceof HTMLInputElement && this.options.elementEnd.value.length && this.setEndDate(this.options.elementEnd.value));
    else if (this.picker.options.element instanceof HTMLInputElement && this.picker.options.element.value.length) {
      const [e, t] = this.picker.options.element.value.split(this.options.delimiter);
      this.options.strict ? e && t && this.setDateRange(e, t) : (e && this.setStartDate(e), t && this.setEndDate(t));
    }
  }
  updateValues() {
    const e = this.picker.options.element, t = this.options.elementEnd, s = this.picker.getStartDate(), n = this.picker.getEndDate(), r = s instanceof Date ? s.format(this.picker.options.format, this.picker.options.lang) : "", a = n instanceof Date ? n.format(this.picker.options.format, this.picker.options.lang) : "";
    if (t) e instanceof HTMLInputElement ? e.value = r : e instanceof HTMLElement && (e.innerText = r), t instanceof HTMLInputElement ? t.value = a : t instanceof HTMLElement && (t.innerText = a);
    else {
      const o = `${r}${r || a ? this.options.delimiter : ""}${a}`;
      e instanceof HTMLInputElement ? e.value = o : e instanceof HTMLElement && (e.innerText = o);
    }
  }
  clear() {
    this.options.startDate = null, this.options.endDate = null, this.picker.datePicked.length = 0, this.updateValues(), this.picker.renderAll(), this.picker.trigger("clear");
  }
  onShow(e) {
    const { target: t } = e.detail;
    this.triggerElement = t, this.picker.options.scrollToDate && this.getStartDate() instanceof Date && this.picker.gotoDate(this.getStartDate()), this.initializeRepick();
  }
  onView(e) {
    const { view: t, target: s } = e.detail;
    if (t === "Main" && (this.tooltipElement = document.createElement("span"), this.tooltipElement.className = "range-plugin-tooltip", s.appendChild(this.tooltipElement)), t === "CalendarDay") {
      const n = new D(s.dataset.time), r = this.picker.datePicked, a = r.length ? this.picker.datePicked[0] : this.getStartDate(), o = r.length ? this.picker.datePicked[1] : this.getEndDate();
      a && a.isSame(n, "day") && s.classList.add("start"), a && o && (o.isSame(n, "day") && s.classList.add("end"), n.isBetween(a, o) && s.classList.add("in-range"));
    }
    if (t === "Footer") {
      const n = this.picker.datePicked.length === 1 && !this.options.strict || this.picker.datePicked.length === 2;
      s.querySelector(".apply-button").disabled = !n;
    }
  }
  hidePicker(e) {
    let t = e.target, s = null;
    t.shadowRoot && (t = e.composedPath()[0], s = t.getRootNode().host), this.picker.isShown() && s !== this.picker.ui.wrapper && t !== this.picker.options.element && t !== this.options.elementEnd && this.picker.hide();
  }
  setStartDate(e) {
    const t = new D(e, this.picker.options.format);
    this.options.startDate = t ? t.clone() : null, this.updateValues(), this.picker.renderAll();
  }
  setEndDate(e) {
    const t = new D(e, this.picker.options.format);
    this.options.endDate = t ? t.clone() : null, this.updateValues(), this.picker.renderAll();
  }
  setDateRange(e, t) {
    const s = new D(e, this.picker.options.format), n = new D(t, this.picker.options.format);
    this.options.startDate = s ? s.clone() : null, this.options.endDate = n ? n.clone() : null, this.updateValues(), this.picker.renderAll();
  }
  getStartDate() {
    return this.options.startDate instanceof Date ? this.options.startDate.clone() : null;
  }
  getEndDate() {
    return this.options.endDate instanceof Date ? this.options.endDate.clone() : null;
  }
  onMouseEnter(e) {
    const t = e.target;
    if (t instanceof HTMLElement) {
      this.isContainer(t) && this.initializeRepick();
      const s = t.closest(".unit");
      if (!(s instanceof HTMLElement)) return;
      if (this.picker.isCalendarDay(s)) {
        if (this.picker.datePicked.length !== 1) return;
        let n = this.picker.datePicked[0].clone(), r = new D(s.dataset.time), a = !1;
        if (n.isAfter(r, "day")) {
          const o = n.clone();
          n = r.clone(), r = o.clone(), a = !0;
        }
        if ([...this.picker.ui.container.querySelectorAll(".day")].forEach((o) => {
          const l = new D(o.dataset.time), u = this.picker.Calendar.getCalendarDayView(l);
          l.isBetween(n, r) && u.classList.add("in-range"), l.isSame(this.picker.datePicked[0], "day") && (u.classList.add("start"), u.classList.toggle("flipped", a)), o === s && (u.classList.add("end"), u.classList.toggle("flipped", a)), o.className = u.className;
        }), this.options.tooltip) {
          const o = this.options.tooltipNumber(r.diff(n, "day") + 1);
          if (o > 0) {
            const l = new Intl.PluralRules(this.picker.options.lang).select(o), u = `${o} ${this.options.locale[l]}`;
            this.showTooltip(s, u);
          } else this.hideTooltip();
        }
      }
    }
  }
  onMouseLeave(e) {
    if (this.isContainer(e.target) && this.options.repick) {
      const t = this.getStartDate(), s = this.getEndDate();
      t && s && (this.picker.datePicked.length = 0, this.picker.renderAll());
    }
  }
  onClickCalendarDay(e) {
    if (this.picker.isCalendarDay(e)) {
      this.picker.datePicked.length === 2 && (this.picker.datePicked.length = 0);
      const t = new D(e.dataset.time);
      if (this.picker.datePicked[this.picker.datePicked.length] = t, this.picker.datePicked.length === 2 && this.picker.datePicked[0].isAfter(this.picker.datePicked[1])) {
        const s = this.picker.datePicked[1].clone();
        this.picker.datePicked[1] = this.picker.datePicked[0].clone(), this.picker.datePicked[0] = s.clone();
      }
      this.picker.datePicked.length !== 1 && this.picker.options.autoApply || this.picker.trigger("preselect", { start: this.picker.datePicked[0] instanceof Date ? this.picker.datePicked[0].clone() : null, end: this.picker.datePicked[1] instanceof Date ? this.picker.datePicked[1].clone() : null }), this.picker.datePicked.length === 1 && (!this.options.strict && this.picker.options.autoApply && (this.picker.options.element === this.triggerElement && this.setStartDate(this.picker.datePicked[0]), this.options.elementEnd === this.triggerElement && this.setEndDate(this.picker.datePicked[0]), this.picker.trigger("select", { start: this.picker.getStartDate(), end: this.picker.getEndDate() })), this.picker.renderAll()), this.picker.datePicked.length === 2 && (this.picker.options.autoApply ? (this.setDateRange(this.picker.datePicked[0], this.picker.datePicked[1]), this.picker.trigger("select", { start: this.picker.getStartDate(), end: this.picker.getEndDate() }), this.picker.hide()) : (this.hideTooltip(), this.picker.renderAll()));
    }
  }
  onClickApplyButton(e) {
    this.picker.isApplyButton(e) && (this.picker.datePicked.length !== 1 || this.options.strict || (this.picker.options.element === this.triggerElement && (this.options.endDate = null, this.setStartDate(this.picker.datePicked[0])), this.options.elementEnd === this.triggerElement && (this.options.startDate = null, this.setEndDate(this.picker.datePicked[0]))), this.picker.datePicked.length === 2 && this.setDateRange(this.picker.datePicked[0], this.picker.datePicked[1]), this.picker.trigger("select", { start: this.picker.getStartDate(), end: this.picker.getEndDate() }), this.picker.hide());
  }
  showTooltip(e, t) {
    this.tooltipElement.style.visibility = "visible", this.tooltipElement.innerHTML = t;
    const s = this.picker.ui.container.getBoundingClientRect(), n = this.tooltipElement.getBoundingClientRect(), r = e.getBoundingClientRect();
    let a = r.top, o = r.left;
    a -= s.top, o -= s.left, a -= n.height, o -= n.width / 2, o += r.width / 2, this.tooltipElement.style.top = `${a}px`, this.tooltipElement.style.left = `${o}px`;
  }
  hideTooltip() {
    this.tooltipElement.style.visibility = "hidden";
  }
  checkIntlPluralLocales() {
    if (!this.options.tooltip) return;
    const e = [.../* @__PURE__ */ new Set([new Intl.PluralRules(this.picker.options.lang).select(0), new Intl.PluralRules(this.picker.options.lang).select(1), new Intl.PluralRules(this.picker.options.lang).select(2), new Intl.PluralRules(this.picker.options.lang).select(6), new Intl.PluralRules(this.picker.options.lang).select(18)])], t = Object.keys(this.options.locale);
    e.every((s) => t.includes(s)) || console.warn(`${this.getName()}: provide locales (${e.join(", ")}) for correct tooltip text.`);
  }
  initializeRepick() {
    if (!this.options.repick) return;
    const e = this.getStartDate(), t = this.getEndDate();
    t && this.triggerElement === this.picker.options.element && (this.picker.datePicked[0] = t), e && this.triggerElement === this.options.elementEnd && (this.picker.datePicked[0] = e);
  }
  isContainer(e) {
    return e === this.picker.ui.container;
  }
}
const C = {
  en: {
    search: "Search",
    checkInOut: "CheckIn\\Out",
    promoCode: "Promo codes",
    dateRange: {
      one: "night",
      other: "nights"
    }
  },
  ru: {
    search: "Искать",
    checkInOut: "Заезд\\Выезд",
    promoCode: "Промо код",
    dateRange: {
      one: "ночь",
      few: "ночи",
      many: "ночей",
      other: "ночи"
    }
  }
}, te = {
  __name: "DatePicker",
  props: {
    modelValue: {
      type: Object,
      required: !0
    },
    locale: {
      type: String,
      required: !0
    }
  },
  emits: ["update:modelValue"],
  setup(c, { emit: i }) {
    const e = c, t = x(null);
    let s = x(null);
    const n = x({ ...e.modelValue }), r = i;
    L(() => {
      n.value = { ...e.modelValue };
    }), L(() => {
      s.value && (s.value.setStartDate(n.value.start), s.value.setEndDate(n.value.end));
    });
    const a = B(() => e.locale && C[e.locale].dateRange ? C[e.locale].dateRange : C.en.dateRange);
    return A(() => {
      s.value = new Q.create({
        element: t.value,
        css: ["https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.css"],
        setup(o) {
          o.on("select", (l) => {
            n.value.start = l.detail.start ? l.detail.start.format("YYYY-MM-DD") : null, n.value.end = l.detail.end ? l.detail.end.format("YYYY-MM-DD") : null, r("update:modelValue", n.value);
          });
        },
        autoApply: !0,
        readonly: !0,
        plugins: [ee],
        calendars: 2,
        grid: 2,
        lang: e.locale,
        RangePlugin: {
          delimiter: " - ",
          tooltipNumber(o) {
            return o - 1;
          },
          locale: a.value
        },
        zIndex: 10
      });
    }), (o, l) => (E(), Y("input", {
      ref_key: "calendarRef",
      ref: t,
      type: "text",
      class: "datepicker__input"
    }, null, 512));
  }
}, ie = { class: "field-decorator" }, se = { class: "field-decorator__input-group" }, ne = { class: "field-decorator__label" }, ae = { class: "field-decorator__slot" }, F = {
  __name: "FieldDecorator",
  props: {
    label: {
      type: String,
      required: !0
    }
  },
  setup(c) {
    return (i, e) => (E(), Y("div", ie, [
      M("div", se, [
        M("label", ne, V(c.label), 1),
        M("div", ae, [
          I(i.$slots, "default")
        ])
      ])
    ]));
  }
}, re = { class: "searchbar-widget" }, oe = { class: "searchbar" }, le = { class: "date-range" }, ce = { class: "search-button" }, $ = {
  __name: "SearchBarWidget",
  props: {
    start: {
      type: String,
      default: () => {
        let c = /* @__PURE__ */ new Date();
        return c.setDate((/* @__PURE__ */ new Date()).getDate() + 1), c.toISOString().split("T")[0];
      }
    },
    end: {
      type: String,
      default: () => {
        let c = /* @__PURE__ */ new Date();
        return c.setDate((/* @__PURE__ */ new Date()).getDate() + 2), c.toISOString().split("T")[0];
      }
    },
    promoCode: {
      type: String,
      default: ""
    },
    showPromoCode: {
      type: Boolean,
      default: !1
    },
    locale: {
      type: String
    }
  },
  setup(c) {
    var g, w, b, k;
    const i = c, e = x({ start: i.start, end: i.end }), t = x(i.promoCode), s = () => {
      if (!e.value.start || !e.value.end)
        return;
      const f = { ...e.value, promoCode: t.value };
      window.dispatchEvent(new CustomEvent("bflex:search-bar:search", { detail: f })), console.log("dispatch event: bflex:search-bar:search", f);
    }, n = x(null), r = () => {
      n.value && n.value.focus();
    }, a = (f) => {
      const m = f.detail;
      console.log("listen event: bflex:booking-widget:changed", m), (e.value.start !== m.start || e.value.end !== m.end) && (e.value.start = m.start, e.value.end = m.end);
    };
    A(() => {
      window.addEventListener("bflex:booking-widget:changed", a);
    }), j(() => {
      window.removeEventListener("bflex:booking-widget:changed", a);
    });
    let o = "en";
    i.locale ? o = i.locale : globalThis.window && (o = ((w = (g = window == null ? void 0 : window.BookiFlex) == null ? void 0 : g.widget) == null ? void 0 : w.locale) || "en");
    let l = C[o] || {};
    globalThis.window && (l = Object.assign(l, ((k = (b = window == null ? void 0 : window.BookiFlex) == null ? void 0 : b.widget) == null ? void 0 : k.l10n) || {}));
    const u = (f, m) => l[f] || m;
    return (f, m) => (E(), Y("div", re, [
      M("div", oe, [
        M("div", le, [
          _(F, {
            class: "check-in-out",
            label: u("checkInOut", "Check-in\\out date"),
            "hide-hint": ""
          }, {
            default: N(() => [
              _(te, {
                modelValue: e.value,
                "onUpdate:modelValue": m[0] || (m[0] = (y) => e.value = y),
                locale: J(o)
              }, null, 8, ["modelValue", "locale"])
            ]),
            _: 1
          }, 8, ["label"])
        ]),
        c.showPromoCode ? (E(), P(F, {
          key: 0,
          class: "promo-code",
          onClick: r,
          label: u("promoCode", "Promo code"),
          "hide-hint": ""
        }, {
          default: N(() => [
            U(M("input", {
              ref_key: "promoCodeRef",
              ref: n,
              "onUpdate:modelValue": m[1] || (m[1] = (y) => t.value = y)
            }, null, 512), [
              [q, t.value]
            ])
          ]),
          _: 1
        }, 8, ["label"])) : z("", !0),
        M("div", ce, [
          M("button", {
            type: "button",
            onClick: s
          }, V(u("search", "Search")), 1)
        ])
      ])
    ]));
  }
}, he = "*,*:before,*:after{box-sizing:border-box;margin:0;padding:0}:host,.searchbar-widget{container-type:inline-size;container-name:searchbar}.searchbar{font-size:var(--bflex-search-bar--font-size);display:flex;flex-direction:row;justify-content:space-between;gap:var(--bflex-search-bar--field-gap);padding:var(--bflex-search-bar--padding);background:var(--bflex-search-bar--bg);border-radius:var(--bflex-search-bar--border-radius)}.searchbar .date-range{flex:1 1 80%}.searchbar .promo-code{flex:1 0 auto;max-width:200px}.searchbar .search-button{flex:1 0 auto}.searchbar .search-button button{min-width:100px;width:100%;height:100%}.searchbar button{border-radius:var(--bflex-search-bar--button-border-radius);font-size:var(--bflex-search-bar--button-font-size);padding:var(--bflex-search-bar--button-padding);-webkit-user-select:none;user-select:none;display:inline-flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center;transition:border-color .25s ease-in-out 0s,box-shadow .1s ease-in-out 0s,background-color .25s ease-in-out 0s,color .25s ease-in-out 0s;margin:0;cursor:pointer;text-decoration:none;text-overflow:ellipsis;white-space:nowrap;position:relative;color:var(--bflex-search-bar--button-color);background:var(--bflex-search-bar--button-bg);border:var(--bflex-search-bar--button-border);opacity:1}.searchbar button:hover{border-color:var(--bflex-search-bar--button-hover-border-color);background:var(--bflex-search-bar--button-hover-bg)}.searchbar button:active{border-color:var(--bflex-search-bar--button-active-border-color, #1c7430);background:var(--bflex-search-bar--button-active-bg, #1c7430)}@container searchbar (max-width: 480px){:host,.searchbar-widget{font-size:14px}.searchbar{flex-direction:column;min-width:300px}.searchbar .date-range{flex:0 0 auto}.searchbar .promo-code{max-width:100%}}.field-decorator__input-group{border:var(--bflex-search-bar--field-border);border-radius:var(--bflex-search-bar--field-border-radius);background-color:var(--bflex-search-bar--field-bg);padding:var(--bflex-search-bar--field-padding);display:flex;flex-direction:column}.field-decorator__label{font-size:var(--bflex-search-bar--field-label-font-size);margin-bottom:var(--bflex-search-bar--field-label-mb);line-height:1;color:var(--bflex-search-bar--field-label-color);-webkit-user-select:none;user-select:none}.field-decorator__slot{display:flex;flex-direction:column;width:100%;height:auto}.field-decorator textarea,.field-decorator select,.field-decorator input{border:0!important;outline:0!important;background:var(--bflex-search-bar--field-bg);border-color:var(--bflex-search-bar--field-bg);width:100%;height:100%;font-size:var(--bflex-search-bar--field-font-size);color:var(--bflex-search-bar--field-text-color)}.field-decorator textarea{resize:vertical}.easepick-wrapper{--day-height: var(--bflex-date-range--day-height);--color-bg-inrange: var(--bflex-date-range--color-bg-inrange);--color-fg-primary: var(--bflex-date-range--color-fg-primary)}:host,.searchbar-widget{--bflex-search-bar--font-size: 16px;--bflex-search-bar--padding: 1rem;--bflex-search-bar--bg: #ecebea;--bflex-search-bar--border-radius: 5px;--bflex-search-bar--field-gap: 1rem;--bflex-search-bar--field-bg: #fff;--bflex-search-bar--field-padding: .5rem 1rem;--bflex-search-bar--field-border: 1px solid rgba(34, 34, 34, .2);--bflex-search-bar--field-border-radius: 5px;--bflex-search-bar--field-font-size: .875rem;--bflex-search-bar--field-text-color: inherit;--bflex-search-bar--field-label-font-size: .75rem;--bflex-search-bar--field-label-color: #1f1f1f;--bflex-search-bar--field-label-mb: .25rem;--bflex-search-bar--button-border-radius: 5px;--bflex-search-bar--button-font-size: 1rem;--bflex-search-bar--button-padding: .75rem;--bflex-search-bar--button-color: #fff;--bflex-search-bar--button-bg: #28a745;--bflex-search-bar--button-border: solid 1px #28a745;--bflex-search-bar--button-hover-border-color: #1e7e34;--bflex-search-bar--button-hover-bg: #1e7e34;--bflex-search-bar--button-active-border-color: #1c7430;--bflex-search-bar--button-active-bg: #1c7430;--bflex-date-range--day-height: 37px;--bflex-date-range--color-bg-inrange: #43cd62;--bflex-date-range--color-fg-primary: #28a745}", de = (c, i) => {
  const e = c.__vccOpts || c;
  for (const [t, s] of i)
    e[t] = s;
  return e;
}, ue = {
  __name: "SearchBarWidget.ce",
  props: {
    start: {
      type: String
    },
    end: {
      type: String
    },
    promoCode: {
      type: String
    },
    locale: {
      type: String
    }
  },
  setup(c) {
    return (i, e) => (E(), P($, {
      start: c.start,
      end: c.end,
      "promo-code": c.promoCode,
      locale: c.locale
    }, null, 8, ["start", "end", "promo-code", "locale"]));
  }
}, pe = /* @__PURE__ */ de(ue, [["styles", [he]]]), ge = {
  __name: "App",
  props: {
    start: {
      type: String
    },
    end: {
      type: String
    },
    promoCode: {
      type: String
    },
    locale: {
      type: String
    }
  },
  setup(c) {
    return (i, e) => (E(), P($, {
      start: c.start,
      end: c.end,
      "promo-code": c.promoCode,
      locale: c.locale
    }, null, 8, ["start", "end", "promo-code", "locale"]));
  }
};
globalThis.window && window.customElements.define("bflex-search-bar-widget", W(pe));
function we(c) {
  K(ge, { initOptions: c }).mount("#bflex-search-bar-widget");
}
export {
  $ as SearchBarWidget,
  we as mountWidget
};
