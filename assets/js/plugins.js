//TYPED

!(function (t) {
  "use strict";
  var s = function (s, e) {
    (this.el = t(s)),
      (this.options = t.extend({}, t.fn.typed.defaults, e)),
      (this.isInput = this.el.is("input")),
      (this.attr = this.options.attr),
      (this.showCursor = !this.isInput && this.options.showCursor),
      (this.elContent = this.attr ? this.el.attr(this.attr) : this.el.text()),
      (this.contentType = this.options.contentType),
      (this.typeSpeed = this.options.typeSpeed),
      (this.startDelay = this.options.startDelay),
      (this.backSpeed = this.options.backSpeed),
      (this.backDelay = this.options.backDelay),
      (this.stringsElement = this.options.stringsElement),
      (this.strings = this.options.strings),
      (this.strPos = 0),
      (this.arrayPos = 0),
      (this.stopNum = 0),
      (this.loop = this.options.loop),
      (this.loopCount = this.options.loopCount),
      (this.curLoop = 0),
      (this.stop = !1),
      (this.cursorChar = this.options.cursorChar),
      (this.shuffle = this.options.shuffle),
      (this.sequence = []),
      this.build();
  };
  (s.prototype = {
    constructor: s,
    init: function () {
      var t = this;
      t.timeout = setTimeout(function () {
        for (var s = 0; s < t.strings.length; ++s) t.sequence[s] = s;
        t.shuffle && (t.sequence = t.shuffleArray(t.sequence)),
          t.typewrite(t.strings[t.sequence[t.arrayPos]], t.strPos);
      }, t.startDelay);
    },
    build: function () {
      var s = this;
      if (
        (!0 === this.showCursor &&
          ((this.cursor = t(
            '<span class="typed-cursor">' + this.cursorChar + "</span>"
          )),
          this.el.after(this.cursor)),
        this.stringsElement)
      ) {
        (this.strings = []),
          this.stringsElement.hide(),
          console.log(this.stringsElement.children());
        var e = this.stringsElement.children();
        t.each(e, function (e, i) {
          s.strings.push(t(i).html());
        });
      }
      this.init();
    },
    typewrite: function (t, s) {
      if (!0 !== this.stop) {
        var e = Math.round(70 * Math.random()) + this.typeSpeed,
          i = this;
        i.timeout = setTimeout(function () {
          var e = 0,
            r = t.substr(s);
          if ("^" === r.charAt(0)) {
            var o = 1;
            /^\^\d+/.test(r) &&
              ((o += (r = /\d+/.exec(r)[0]).length), (e = parseInt(r))),
              (t = t.substring(0, s) + t.substring(s + o));
          }
          if ("html" === i.contentType) {
            var n = t.substr(s).charAt(0);
            if ("<" === n || "&" === n) {
              var a = "";
              for (
                a = "<" === n ? ">" : ";";
                t.substr(s + 1).charAt(0) !== a &&
                (t.substr(s).charAt(0), !(++s + 1 > t.length));

              );
              s++, a;
            }
          }
          i.timeout = setTimeout(function () {
            if (s === t.length) {
              if (
                (i.options.onStringTyped(i.arrayPos),
                i.arrayPos === i.strings.length - 1 &&
                  (i.options.callback(),
                  i.curLoop++,
                  !1 === i.loop || i.curLoop === i.loopCount))
              )
                return;
              i.timeout = setTimeout(function () {
                i.backspace(t, s);
              }, i.backDelay);
            } else {
              0 === s && i.options.preStringTyped(i.arrayPos);
              var e = t.substr(0, s + 1);
              i.attr
                ? i.el.attr(i.attr, e)
                : i.isInput
                ? i.el.val(e)
                : "html" === i.contentType
                ? i.el.html(e)
                : i.el.text(e),
                s++,
                i.typewrite(t, s);
            }
          }, e);
        }, e);
      }
    },
    backspace: function (t, s) {
      if (!0 !== this.stop) {
        var e = Math.round(70 * Math.random()) + this.backSpeed,
          i = this;
        i.timeout = setTimeout(function () {
          if ("html" === i.contentType && ">" === t.substr(s).charAt(0)) {
            for (
              ;
              "<" !== t.substr(s - 1).charAt(0) &&
              (t.substr(s).charAt(0), !(--s < 0));

            );
            s--, "<";
          }
          var e = t.substr(0, s);
          i.attr
            ? i.el.attr(i.attr, e)
            : i.isInput
            ? i.el.val(e)
            : "html" === i.contentType
            ? i.el.html(e)
            : i.el.text(e),
            s > i.stopNum
              ? (s--, i.backspace(t, s))
              : s <= i.stopNum &&
                (i.arrayPos++,
                i.arrayPos === i.strings.length
                  ? ((i.arrayPos = 0),
                    i.shuffle && (i.sequence = i.shuffleArray(i.sequence)),
                    i.init())
                  : i.typewrite(i.strings[i.sequence[i.arrayPos]], s));
        }, e);
      }
    },
    shuffleArray: function (t) {
      var s,
        e,
        i = t.length;
      if (i)
        for (; --i; )
          (s = t[(e = Math.floor(Math.random() * (i + 1)))]),
            (t[e] = t[i]),
            (t[i] = s);
      return t;
    },
    reset: function () {
      clearInterval(this.timeout);
      this.el.attr("id");
      this.el.empty(),
        void 0 !== this.cursor && this.cursor.remove(),
        (this.strPos = 0),
        (this.arrayPos = 0),
        (this.curLoop = 0),
        this.options.resetCallback();
    },
  }),
    (t.fn.typed = function (e) {
      return this.each(function () {
        var i = t(this),
          r = i.data("typed"),
          o = "object" == typeof e && e;
        r && r.reset(),
          i.data("typed", (r = new s(this, o))),
          "string" == typeof e && r[e]();
      });
    }),
    (t.fn.typed.defaults = {
      strings: [
        "These are the default values...",
        "You know what you should do?",
        "Use your own!",
        "Have a great day!",
      ],
      stringsElement: null,
      typeSpeed: 0,
      startDelay: 0,
      backSpeed: 0,
      shuffle: !1,
      backDelay: 500,
      loop: !1,
      loopCount: !1,
      showCursor: !0,
      cursorChar: "|",
      attr: null,
      contentType: "html",
      callback: function () {},
      preStringTyped: function () {},
      onStringTyped: function () {},
      resetCallback: function () {},
    });
})(window.jQuery);

// SWIPER JS

!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define(t)
    : ((e = "undefined" != typeof globalThis ? globalThis : e || self).Swiper =
        t());
})(this, function () {
  "use strict";
  function e(e) {
    return (
      null !== e &&
      "object" == typeof e &&
      "constructor" in e &&
      e.constructor === Object
    );
  }
  function t(s = {}, a = {}) {
    Object.keys(a).forEach((i) => {
      void 0 === s[i]
        ? (s[i] = a[i])
        : e(a[i]) && e(s[i]) && Object.keys(a[i]).length > 0 && t(s[i], a[i]);
    });
  }
  const s = {
    body: {},
    addEventListener() {},
    removeEventListener() {},
    activeElement: { blur() {}, nodeName: "" },
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementById: () => null,
    createEvent: () => ({ initEvent() {} }),
    createElement: () => ({
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {},
      getElementsByTagName: () => [],
    }),
    createElementNS: () => ({}),
    importNode: () => null,
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
  };
  function a() {
    const e = "undefined" != typeof document ? document : {};
    return t(e, s), e;
  }
  const i = {
    document: s,
    navigator: { userAgent: "" },
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
    history: { replaceState() {}, pushState() {}, go() {}, back() {} },
    CustomEvent: function () {
      return this;
    },
    addEventListener() {},
    removeEventListener() {},
    getComputedStyle: () => ({ getPropertyValue: () => "" }),
    Image() {},
    Date() {},
    screen: {},
    setTimeout() {},
    clearTimeout() {},
    matchMedia: () => ({}),
    requestAnimationFrame: (e) =>
      "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0),
    cancelAnimationFrame(e) {
      "undefined" != typeof setTimeout && clearTimeout(e);
    },
  };
  function r() {
    const e = "undefined" != typeof window ? window : {};
    return t(e, i), e;
  }
  class n extends Array {
    constructor(e) {
      super(...(e || [])),
        (function (e) {
          const t = e.__proto__;
          Object.defineProperty(e, "__proto__", {
            get: () => t,
            set(e) {
              t.__proto__ = e;
            },
          });
        })(this);
    }
  }
  function l(e = []) {
    const t = [];
    return (
      e.forEach((e) => {
        Array.isArray(e) ? t.push(...l(e)) : t.push(e);
      }),
      t
    );
  }
  function o(e, t) {
    return Array.prototype.filter.call(e, t);
  }
  function d(e, t) {
    const s = r(),
      i = a();
    let l = [];
    if (!t && e instanceof n) return e;
    if (!e) return new n(l);
    if ("string" == typeof e) {
      const s = e.trim();
      if (s.indexOf("<") >= 0 && s.indexOf(">") >= 0) {
        let e = "div";
        0 === s.indexOf("<li") && (e = "ul"),
          0 === s.indexOf("<tr") && (e = "tbody"),
          (0 !== s.indexOf("<td") && 0 !== s.indexOf("<th")) || (e = "tr"),
          0 === s.indexOf("<tbody") && (e = "table"),
          0 === s.indexOf("<option") && (e = "select");
        const t = i.createElement(e);
        t.innerHTML = s;
        for (let e = 0; e < t.childNodes.length; e += 1)
          l.push(t.childNodes[e]);
      } else
        l = (function (e, t) {
          if ("string" != typeof e) return [e];
          const s = [],
            a = t.querySelectorAll(e);
          for (let e = 0; e < a.length; e += 1) s.push(a[e]);
          return s;
        })(e.trim(), t || i);
    } else if (e.nodeType || e === s || e === i) l.push(e);
    else if (Array.isArray(e)) {
      if (e instanceof n) return e;
      l = e;
    }
    return new n(
      (function (e) {
        const t = [];
        for (let s = 0; s < e.length; s += 1)
          -1 === t.indexOf(e[s]) && t.push(e[s]);
        return t;
      })(l)
    );
  }
  d.fn = n.prototype;
  const p = {
    addClass: function (...e) {
      const t = l(e.map((e) => e.split(" ")));
      return (
        this.forEach((e) => {
          e.classList.add(...t);
        }),
        this
      );
    },
    removeClass: function (...e) {
      const t = l(e.map((e) => e.split(" ")));
      return (
        this.forEach((e) => {
          e.classList.remove(...t);
        }),
        this
      );
    },
    hasClass: function (...e) {
      const t = l(e.map((e) => e.split(" ")));
      return (
        o(this, (e) => t.filter((t) => e.classList.contains(t)).length > 0)
          .length > 0
      );
    },
    toggleClass: function (...e) {
      const t = l(e.map((e) => e.split(" ")));
      this.forEach((e) => {
        t.forEach((t) => {
          e.classList.toggle(t);
        });
      });
    },
    attr: function (e, t) {
      if (1 === arguments.length && "string" == typeof e)
        return this[0] ? this[0].getAttribute(e) : void 0;
      for (let s = 0; s < this.length; s += 1)
        if (2 === arguments.length) this[s].setAttribute(e, t);
        else
          for (const t in e) (this[s][t] = e[t]), this[s].setAttribute(t, e[t]);
      return this;
    },
    removeAttr: function (e) {
      for (let t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
      return this;
    },
    transform: function (e) {
      for (let t = 0; t < this.length; t += 1) this[t].style.transform = e;
      return this;
    },
    transition: function (e) {
      for (let t = 0; t < this.length; t += 1)
        this[t].style.transitionDuration = "string" != typeof e ? `${e}ms` : e;
      return this;
    },
    on: function (...e) {
      let [t, s, a, i] = e;
      function r(e) {
        const t = e.target;
        if (!t) return;
        const i = e.target.dom7EventData || [];
        if ((i.indexOf(e) < 0 && i.unshift(e), d(t).is(s))) a.apply(t, i);
        else {
          const e = d(t).parents();
          for (let t = 0; t < e.length; t += 1)
            d(e[t]).is(s) && a.apply(e[t], i);
        }
      }
      function n(e) {
        const t = (e && e.target && e.target.dom7EventData) || [];
        t.indexOf(e) < 0 && t.unshift(e), a.apply(this, t);
      }
      "function" == typeof e[1] && (([t, a, i] = e), (s = void 0)),
        i || (i = !1);
      const l = t.split(" ");
      let o;
      for (let e = 0; e < this.length; e += 1) {
        const t = this[e];
        if (s)
          for (o = 0; o < l.length; o += 1) {
            const e = l[o];
            t.dom7LiveListeners || (t.dom7LiveListeners = {}),
              t.dom7LiveListeners[e] || (t.dom7LiveListeners[e] = []),
              t.dom7LiveListeners[e].push({ listener: a, proxyListener: r }),
              t.addEventListener(e, r, i);
          }
        else
          for (o = 0; o < l.length; o += 1) {
            const e = l[o];
            t.dom7Listeners || (t.dom7Listeners = {}),
              t.dom7Listeners[e] || (t.dom7Listeners[e] = []),
              t.dom7Listeners[e].push({ listener: a, proxyListener: n }),
              t.addEventListener(e, n, i);
          }
      }
      return this;
    },
    off: function (...e) {
      let [t, s, a, i] = e;
      "function" == typeof e[1] && (([t, a, i] = e), (s = void 0)),
        i || (i = !1);
      const r = t.split(" ");
      for (let e = 0; e < r.length; e += 1) {
        const t = r[e];
        for (let e = 0; e < this.length; e += 1) {
          const r = this[e];
          let n;
          if (
            (!s && r.dom7Listeners
              ? (n = r.dom7Listeners[t])
              : s && r.dom7LiveListeners && (n = r.dom7LiveListeners[t]),
            n && n.length)
          )
            for (let e = n.length - 1; e >= 0; e -= 1) {
              const s = n[e];
              (a && s.listener === a) ||
              (a &&
                s.listener &&
                s.listener.dom7proxy &&
                s.listener.dom7proxy === a)
                ? (r.removeEventListener(t, s.proxyListener, i), n.splice(e, 1))
                : a ||
                  (r.removeEventListener(t, s.proxyListener, i),
                  n.splice(e, 1));
            }
        }
      }
      return this;
    },
    trigger: function (...e) {
      const t = r(),
        s = e[0].split(" "),
        a = e[1];
      for (let i = 0; i < s.length; i += 1) {
        const r = s[i];
        for (let s = 0; s < this.length; s += 1) {
          const i = this[s];
          if (t.CustomEvent) {
            const s = new t.CustomEvent(r, {
              detail: a,
              bubbles: !0,
              cancelable: !0,
            });
            (i.dom7EventData = e.filter((e, t) => t > 0)),
              i.dispatchEvent(s),
              (i.dom7EventData = []),
              delete i.dom7EventData;
          }
        }
      }
      return this;
    },
    transitionEnd: function (e) {
      const t = this;
      return (
        e &&
          t.on("transitionend", function s(a) {
            a.target === this && (e.call(this, a), t.off("transitionend", s));
          }),
        this
      );
    },
    outerWidth: function (e) {
      if (this.length > 0) {
        if (e) {
          const e = this.styles();
          return (
            this[0].offsetWidth +
            parseFloat(e.getPropertyValue("margin-right")) +
            parseFloat(e.getPropertyValue("margin-left"))
          );
        }
        return this[0].offsetWidth;
      }
      return null;
    },
    outerHeight: function (e) {
      if (this.length > 0) {
        if (e) {
          const e = this.styles();
          return (
            this[0].offsetHeight +
            parseFloat(e.getPropertyValue("margin-top")) +
            parseFloat(e.getPropertyValue("margin-bottom"))
          );
        }
        return this[0].offsetHeight;
      }
      return null;
    },
    styles: function () {
      const e = r();
      return this[0] ? e.getComputedStyle(this[0], null) : {};
    },
    offset: function () {
      if (this.length > 0) {
        const e = r(),
          t = a(),
          s = this[0],
          i = s.getBoundingClientRect(),
          n = t.body,
          l = s.clientTop || n.clientTop || 0,
          o = s.clientLeft || n.clientLeft || 0,
          d = s === e ? e.scrollY : s.scrollTop,
          p = s === e ? e.scrollX : s.scrollLeft;
        return { top: i.top + d - l, left: i.left + p - o };
      }
      return null;
    },
    css: function (e, t) {
      const s = r();
      let a;
      if (1 === arguments.length) {
        if ("string" != typeof e) {
          for (a = 0; a < this.length; a += 1)
            for (const t in e) this[a].style[t] = e[t];
          return this;
        }
        if (this[0])
          return s.getComputedStyle(this[0], null).getPropertyValue(e);
      }
      if (2 === arguments.length && "string" == typeof e) {
        for (a = 0; a < this.length; a += 1) this[a].style[e] = t;
        return this;
      }
      return this;
    },
    each: function (e) {
      return e
        ? (this.forEach((t, s) => {
            e.apply(t, [t, s]);
          }),
          this)
        : this;
    },
    html: function (e) {
      if (void 0 === e) return this[0] ? this[0].innerHTML : null;
      for (let t = 0; t < this.length; t += 1) this[t].innerHTML = e;
      return this;
    },
    text: function (e) {
      if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
      for (let t = 0; t < this.length; t += 1) this[t].textContent = e;
      return this;
    },
    is: function (e) {
      const t = r(),
        s = a(),
        i = this[0];
      let l, o;
      if (!i || void 0 === e) return !1;
      if ("string" == typeof e) {
        if (i.matches) return i.matches(e);
        if (i.webkitMatchesSelector) return i.webkitMatchesSelector(e);
        if (i.msMatchesSelector) return i.msMatchesSelector(e);
        for (l = d(e), o = 0; o < l.length; o += 1) if (l[o] === i) return !0;
        return !1;
      }
      if (e === s) return i === s;
      if (e === t) return i === t;
      if (e.nodeType || e instanceof n) {
        for (l = e.nodeType ? [e] : e, o = 0; o < l.length; o += 1)
          if (l[o] === i) return !0;
        return !1;
      }
      return !1;
    },
    index: function () {
      let e,
        t = this[0];
      if (t) {
        for (e = 0; null !== (t = t.previousSibling); )
          1 === t.nodeType && (e += 1);
        return e;
      }
    },
    eq: function (e) {
      if (void 0 === e) return this;
      const t = this.length;
      if (e > t - 1) return d([]);
      if (e < 0) {
        const s = t + e;
        return d(s < 0 ? [] : [this[s]]);
      }
      return d([this[e]]);
    },
    append: function (...e) {
      let t;
      const s = a();
      for (let a = 0; a < e.length; a += 1) {
        t = e[a];
        for (let e = 0; e < this.length; e += 1)
          if ("string" == typeof t) {
            const a = s.createElement("div");
            for (a.innerHTML = t; a.firstChild; )
              this[e].appendChild(a.firstChild);
          } else if (t instanceof n)
            for (let s = 0; s < t.length; s += 1) this[e].appendChild(t[s]);
          else this[e].appendChild(t);
      }
      return this;
    },
    prepend: function (e) {
      const t = a();
      let s, i;
      for (s = 0; s < this.length; s += 1)
        if ("string" == typeof e) {
          const a = t.createElement("div");
          for (a.innerHTML = e, i = a.childNodes.length - 1; i >= 0; i -= 1)
            this[s].insertBefore(a.childNodes[i], this[s].childNodes[0]);
        } else if (e instanceof n)
          for (i = 0; i < e.length; i += 1)
            this[s].insertBefore(e[i], this[s].childNodes[0]);
        else this[s].insertBefore(e, this[s].childNodes[0]);
      return this;
    },
    next: function (e) {
      return this.length > 0
        ? e
          ? this[0].nextElementSibling && d(this[0].nextElementSibling).is(e)
            ? d([this[0].nextElementSibling])
            : d([])
          : this[0].nextElementSibling
          ? d([this[0].nextElementSibling])
          : d([])
        : d([]);
    },
    nextAll: function (e) {
      const t = [];
      let s = this[0];
      if (!s) return d([]);
      for (; s.nextElementSibling; ) {
        const a = s.nextElementSibling;
        e ? d(a).is(e) && t.push(a) : t.push(a), (s = a);
      }
      return d(t);
    },
    prev: function (e) {
      if (this.length > 0) {
        const t = this[0];
        return e
          ? t.previousElementSibling && d(t.previousElementSibling).is(e)
            ? d([t.previousElementSibling])
            : d([])
          : t.previousElementSibling
          ? d([t.previousElementSibling])
          : d([]);
      }
      return d([]);
    },
    prevAll: function (e) {
      const t = [];
      let s = this[0];
      if (!s) return d([]);
      for (; s.previousElementSibling; ) {
        const a = s.previousElementSibling;
        e ? d(a).is(e) && t.push(a) : t.push(a), (s = a);
      }
      return d(t);
    },
    parent: function (e) {
      const t = [];
      for (let s = 0; s < this.length; s += 1)
        null !== this[s].parentNode &&
          (e
            ? d(this[s].parentNode).is(e) && t.push(this[s].parentNode)
            : t.push(this[s].parentNode));
      return d(t);
    },
    parents: function (e) {
      const t = [];
      for (let s = 0; s < this.length; s += 1) {
        let a = this[s].parentNode;
        for (; a; ) e ? d(a).is(e) && t.push(a) : t.push(a), (a = a.parentNode);
      }
      return d(t);
    },
    closest: function (e) {
      let t = this;
      return void 0 === e ? d([]) : (t.is(e) || (t = t.parents(e).eq(0)), t);
    },
    find: function (e) {
      const t = [];
      for (let s = 0; s < this.length; s += 1) {
        const a = this[s].querySelectorAll(e);
        for (let e = 0; e < a.length; e += 1) t.push(a[e]);
      }
      return d(t);
    },
    children: function (e) {
      const t = [];
      for (let s = 0; s < this.length; s += 1) {
        const a = this[s].children;
        for (let s = 0; s < a.length; s += 1)
          (e && !d(a[s]).is(e)) || t.push(a[s]);
      }
      return d(t);
    },
    filter: function (e) {
      return d(o(this, e));
    },
    remove: function () {
      for (let e = 0; e < this.length; e += 1)
        this[e].parentNode && this[e].parentNode.removeChild(this[e]);
      return this;
    },
  };
  function c(e, t = 0) {
    return setTimeout(e, t);
  }
  function u() {
    return Date.now();
  }
  function h(e, t = "x") {
    const s = r();
    let a, i, n;
    const l = (function (e) {
      const t = r();
      let s;
      return (
        t.getComputedStyle && (s = t.getComputedStyle(e, null)),
        !s && e.currentStyle && (s = e.currentStyle),
        s || (s = e.style),
        s
      );
    })(e);
    return (
      s.WebKitCSSMatrix
        ? ((i = l.transform || l.webkitTransform),
          i.split(",").length > 6 &&
            (i = i
              .split(", ")
              .map((e) => e.replace(",", "."))
              .join(", ")),
          (n = new s.WebKitCSSMatrix("none" === i ? "" : i)))
        : ((n =
            l.MozTransform ||
            l.OTransform ||
            l.MsTransform ||
            l.msTransform ||
            l.transform ||
            l
              .getPropertyValue("transform")
              .replace("translate(", "matrix(1, 0, 0, 1,")),
          (a = n.toString().split(","))),
      "x" === t &&
        (i = s.WebKitCSSMatrix
          ? n.m41
          : 16 === a.length
          ? parseFloat(a[12])
          : parseFloat(a[4])),
      "y" === t &&
        (i = s.WebKitCSSMatrix
          ? n.m42
          : 16 === a.length
          ? parseFloat(a[13])
          : parseFloat(a[5])),
      i || 0
    );
  }
  function m(e) {
    return (
      "object" == typeof e &&
      null !== e &&
      e.constructor &&
      "Object" === Object.prototype.toString.call(e).slice(8, -1)
    );
  }
  function f(...e) {
    const t = Object(e[0]),
      s = ["__proto__", "constructor", "prototype"];
    for (let i = 1; i < e.length; i += 1) {
      const r = e[i];
      if (
        null != r &&
        ((a = r),
        !("undefined" != typeof window && void 0 !== window.HTMLElement
          ? a instanceof HTMLElement
          : a && (1 === a.nodeType || 11 === a.nodeType)))
      ) {
        const e = Object.keys(Object(r)).filter((e) => s.indexOf(e) < 0);
        for (let s = 0, a = e.length; s < a; s += 1) {
          const a = e[s],
            i = Object.getOwnPropertyDescriptor(r, a);
          void 0 !== i &&
            i.enumerable &&
            (m(t[a]) && m(r[a])
              ? r[a].__swiper__
                ? (t[a] = r[a])
                : f(t[a], r[a])
              : !m(t[a]) && m(r[a])
              ? ((t[a] = {}), r[a].__swiper__ ? (t[a] = r[a]) : f(t[a], r[a]))
              : (t[a] = r[a]));
        }
      }
    }
    var a;
    return t;
  }
  function g(e, t, s) {
    e.style.setProperty(t, s);
  }
  function v({ swiper: e, targetPosition: t, side: s }) {
    const a = r(),
      i = -e.translate;
    let n,
      l = null;
    const o = e.params.speed;
    (e.wrapperEl.style.scrollSnapType = "none"),
      a.cancelAnimationFrame(e.cssModeFrameID);
    const d = t > i ? "next" : "prev",
      p = (e, t) => ("next" === d && e >= t) || ("prev" === d && e <= t),
      c = () => {
        (n = new Date().getTime()), null === l && (l = n);
        const r = Math.max(Math.min((n - l) / o, 1), 0),
          d = 0.5 - Math.cos(r * Math.PI) / 2;
        let u = i + d * (t - i);
        if ((p(u, t) && (u = t), e.wrapperEl.scrollTo({ [s]: u }), p(u, t)))
          return (
            (e.wrapperEl.style.overflow = "hidden"),
            (e.wrapperEl.style.scrollSnapType = ""),
            setTimeout(() => {
              (e.wrapperEl.style.overflow = ""),
                e.wrapperEl.scrollTo({ [s]: u });
            }),
            void a.cancelAnimationFrame(e.cssModeFrameID)
          );
        e.cssModeFrameID = a.requestAnimationFrame(c);
      };
    c();
  }
  let w, b, x;
  function y() {
    return (
      w ||
        (w = (function () {
          const e = r(),
            t = a();
          return {
            smoothScroll:
              t.documentElement && "scrollBehavior" in t.documentElement.style,
            touch: !!(
              "ontouchstart" in e ||
              (e.DocumentTouch && t instanceof e.DocumentTouch)
            ),
            passiveListener: (function () {
              let t = !1;
              try {
                const s = Object.defineProperty({}, "passive", {
                  get() {
                    t = !0;
                  },
                });
                e.addEventListener("testPassiveListener", null, s);
              } catch (e) {}
              return t;
            })(),
            gestures: "ongesturestart" in e,
          };
        })()),
      w
    );
  }
  function E(e = {}) {
    return (
      b ||
        (b = (function ({ userAgent: e } = {}) {
          const t = y(),
            s = r(),
            a = s.navigator.platform,
            i = e || s.navigator.userAgent,
            n = { ios: !1, android: !1 },
            l = s.screen.width,
            o = s.screen.height,
            d = i.match(/(Android);?[\s\/]+([\d.]+)?/);
          let p = i.match(/(iPad).*OS\s([\d_]+)/);
          const c = i.match(/(iPod)(.*OS\s([\d_]+))?/),
            u = !p && i.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
            h = "Win32" === a;
          let m = "MacIntel" === a;
          return (
            !p &&
              m &&
              t.touch &&
              [
                "1024x1366",
                "1366x1024",
                "834x1194",
                "1194x834",
                "834x1112",
                "1112x834",
                "768x1024",
                "1024x768",
                "820x1180",
                "1180x820",
                "810x1080",
                "1080x810",
              ].indexOf(`${l}x${o}`) >= 0 &&
              ((p = i.match(/(Version)\/([\d.]+)/)),
              p || (p = [0, 1, "13_0_0"]),
              (m = !1)),
            d && !h && ((n.os = "android"), (n.android = !0)),
            (p || u || c) && ((n.os = "ios"), (n.ios = !0)),
            n
          );
        })(e)),
      b
    );
  }
  function T() {
    return (
      x ||
        (x = (function () {
          const e = r();
          return {
            isSafari: (function () {
              const t = e.navigator.userAgent.toLowerCase();
              return (
                t.indexOf("safari") >= 0 &&
                t.indexOf("chrome") < 0 &&
                t.indexOf("android") < 0
              );
            })(),
            isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
              e.navigator.userAgent
            ),
          };
        })()),
      x
    );
  }
  Object.keys(p).forEach((e) => {
    Object.defineProperty(d.fn, e, { value: p[e], writable: !0 });
  });
  var C = {
    on(e, t, s) {
      const a = this;
      if ("function" != typeof t) return a;
      const i = s ? "unshift" : "push";
      return (
        e.split(" ").forEach((e) => {
          a.eventsListeners[e] || (a.eventsListeners[e] = []),
            a.eventsListeners[e][i](t);
        }),
        a
      );
    },
    once(e, t, s) {
      const a = this;
      if ("function" != typeof t) return a;
      function i(...s) {
        a.off(e, i), i.__emitterProxy && delete i.__emitterProxy, t.apply(a, s);
      }
      return (i.__emitterProxy = t), a.on(e, i, s);
    },
    onAny(e, t) {
      const s = this;
      if ("function" != typeof e) return s;
      const a = t ? "unshift" : "push";
      return (
        s.eventsAnyListeners.indexOf(e) < 0 && s.eventsAnyListeners[a](e), s
      );
    },
    offAny(e) {
      const t = this;
      if (!t.eventsAnyListeners) return t;
      const s = t.eventsAnyListeners.indexOf(e);
      return s >= 0 && t.eventsAnyListeners.splice(s, 1), t;
    },
    off(e, t) {
      const s = this;
      return s.eventsListeners
        ? (e.split(" ").forEach((e) => {
            void 0 === t
              ? (s.eventsListeners[e] = [])
              : s.eventsListeners[e] &&
                s.eventsListeners[e].forEach((a, i) => {
                  (a === t || (a.__emitterProxy && a.__emitterProxy === t)) &&
                    s.eventsListeners[e].splice(i, 1);
                });
          }),
          s)
        : s;
    },
    emit(...e) {
      const t = this;
      if (!t.eventsListeners) return t;
      let s, a, i;
      "string" == typeof e[0] || Array.isArray(e[0])
        ? ((s = e[0]), (a = e.slice(1, e.length)), (i = t))
        : ((s = e[0].events), (a = e[0].data), (i = e[0].context || t)),
        a.unshift(i);
      return (
        (Array.isArray(s) ? s : s.split(" ")).forEach((e) => {
          t.eventsAnyListeners &&
            t.eventsAnyListeners.length &&
            t.eventsAnyListeners.forEach((t) => {
              t.apply(i, [e, ...a]);
            }),
            t.eventsListeners &&
              t.eventsListeners[e] &&
              t.eventsListeners[e].forEach((e) => {
                e.apply(i, a);
              });
        }),
        t
      );
    },
  };
  function $({ swiper: e, runCallbacks: t, direction: s, step: a }) {
    const { activeIndex: i, previousIndex: r } = e;
    let n = s;
    if (
      (n || (n = i > r ? "next" : i < r ? "prev" : "reset"),
      e.emit(`transition${a}`),
      t && i !== r)
    ) {
      if ("reset" === n) return void e.emit(`slideResetTransition${a}`);
      e.emit(`slideChangeTransition${a}`),
        "next" === n
          ? e.emit(`slideNextTransition${a}`)
          : e.emit(`slidePrevTransition${a}`);
    }
  }
  function S(e) {
    const t = this,
      s = a(),
      i = r(),
      n = t.touchEventsData,
      { params: l, touches: o, enabled: p } = t;
    if (!p) return;
    if (t.animating && l.preventInteractionOnTransition) return;
    !t.animating && l.cssMode && l.loop && t.loopFix();
    let c = e;
    c.originalEvent && (c = c.originalEvent);
    let h = d(c.target);
    if ("wrapper" === l.touchEventsTarget && !h.closest(t.wrapperEl).length)
      return;
    if (
      ((n.isTouchEvent = "touchstart" === c.type),
      !n.isTouchEvent && "which" in c && 3 === c.which)
    )
      return;
    if (!n.isTouchEvent && "button" in c && c.button > 0) return;
    if (n.isTouched && n.isMoved) return;
    !!l.noSwipingClass &&
      "" !== l.noSwipingClass &&
      c.target &&
      c.target.shadowRoot &&
      e.path &&
      e.path[0] &&
      (h = d(e.path[0]));
    const m = l.noSwipingSelector
        ? l.noSwipingSelector
        : `.${l.noSwipingClass}`,
      f = !(!c.target || !c.target.shadowRoot);
    if (
      l.noSwiping &&
      (f
        ? (function (e, t = this) {
            return (function t(s) {
              return s && s !== a() && s !== r()
                ? (s.assignedSlot && (s = s.assignedSlot),
                  s.closest(e) || t(s.getRootNode().host))
                : null;
            })(t);
          })(m, c.target)
        : h.closest(m)[0])
    )
      return void (t.allowClick = !0);
    if (l.swipeHandler && !h.closest(l.swipeHandler)[0]) return;
    (o.currentX = "touchstart" === c.type ? c.targetTouches[0].pageX : c.pageX),
      (o.currentY =
        "touchstart" === c.type ? c.targetTouches[0].pageY : c.pageY);
    const g = o.currentX,
      v = o.currentY,
      w = l.edgeSwipeDetection || l.iOSEdgeSwipeDetection,
      b = l.edgeSwipeThreshold || l.iOSEdgeSwipeThreshold;
    if (w && (g <= b || g >= i.innerWidth - b)) {
      if ("prevent" !== w) return;
      e.preventDefault();
    }
    if (
      (Object.assign(n, {
        isTouched: !0,
        isMoved: !1,
        allowTouchCallbacks: !0,
        isScrolling: void 0,
        startMoving: void 0,
      }),
      (o.startX = g),
      (o.startY = v),
      (n.touchStartTime = u()),
      (t.allowClick = !0),
      t.updateSize(),
      (t.swipeDirection = void 0),
      l.threshold > 0 && (n.allowThresholdMove = !1),
      "touchstart" !== c.type)
    ) {
      let e = !0;
      h.is(n.focusableElements) && (e = !1),
        s.activeElement &&
          d(s.activeElement).is(n.focusableElements) &&
          s.activeElement !== h[0] &&
          s.activeElement.blur();
      const a = e && t.allowTouchMove && l.touchStartPreventDefault;
      (!l.touchStartForcePreventDefault && !a) ||
        h[0].isContentEditable ||
        c.preventDefault();
    }
    t.emit("touchStart", c);
  }
  function M(e) {
    const t = a(),
      s = this,
      i = s.touchEventsData,
      { params: r, touches: n, rtlTranslate: l, enabled: o } = s;
    if (!o) return;
    let p = e;
    if ((p.originalEvent && (p = p.originalEvent), !i.isTouched))
      return void (
        i.startMoving &&
        i.isScrolling &&
        s.emit("touchMoveOpposite", p)
      );
    if (i.isTouchEvent && "touchmove" !== p.type) return;
    const c =
        "touchmove" === p.type &&
        p.targetTouches &&
        (p.targetTouches[0] || p.changedTouches[0]),
      h = "touchmove" === p.type ? c.pageX : p.pageX,
      m = "touchmove" === p.type ? c.pageY : p.pageY;
    if (p.preventedByNestedSwiper) return (n.startX = h), void (n.startY = m);
    if (!s.allowTouchMove)
      return (
        (s.allowClick = !1),
        void (
          i.isTouched &&
          (Object.assign(n, { startX: h, startY: m, currentX: h, currentY: m }),
          (i.touchStartTime = u()))
        )
      );
    if (i.isTouchEvent && r.touchReleaseOnEdges && !r.loop)
      if (s.isVertical()) {
        if (
          (m < n.startY && s.translate <= s.maxTranslate()) ||
          (m > n.startY && s.translate >= s.minTranslate())
        )
          return (i.isTouched = !1), void (i.isMoved = !1);
      } else if (
        (h < n.startX && s.translate <= s.maxTranslate()) ||
        (h > n.startX && s.translate >= s.minTranslate())
      )
        return;
    if (
      i.isTouchEvent &&
      t.activeElement &&
      p.target === t.activeElement &&
      d(p.target).is(i.focusableElements)
    )
      return (i.isMoved = !0), void (s.allowClick = !1);
    if (
      (i.allowTouchCallbacks && s.emit("touchMove", p),
      p.targetTouches && p.targetTouches.length > 1)
    )
      return;
    (n.currentX = h), (n.currentY = m);
    const f = n.currentX - n.startX,
      g = n.currentY - n.startY;
    if (s.params.threshold && Math.sqrt(f ** 2 + g ** 2) < s.params.threshold)
      return;
    if (void 0 === i.isScrolling) {
      let e;
      (s.isHorizontal() && n.currentY === n.startY) ||
      (s.isVertical() && n.currentX === n.startX)
        ? (i.isScrolling = !1)
        : f * f + g * g >= 25 &&
          ((e = (180 * Math.atan2(Math.abs(g), Math.abs(f))) / Math.PI),
          (i.isScrolling = s.isHorizontal()
            ? e > r.touchAngle
            : 90 - e > r.touchAngle));
    }
    if (
      (i.isScrolling && s.emit("touchMoveOpposite", p),
      void 0 === i.startMoving &&
        ((n.currentX === n.startX && n.currentY === n.startY) ||
          (i.startMoving = !0)),
      i.isScrolling)
    )
      return void (i.isTouched = !1);
    if (!i.startMoving) return;
    (s.allowClick = !1),
      !r.cssMode && p.cancelable && p.preventDefault(),
      r.touchMoveStopPropagation && !r.nested && p.stopPropagation(),
      i.isMoved ||
        (r.loop && !r.cssMode && s.loopFix(),
        (i.startTranslate = s.getTranslate()),
        s.setTransition(0),
        s.animating &&
          s.$wrapperEl.trigger("webkitTransitionEnd transitionend"),
        (i.allowMomentumBounce = !1),
        !r.grabCursor ||
          (!0 !== s.allowSlideNext && !0 !== s.allowSlidePrev) ||
          s.setGrabCursor(!0),
        s.emit("sliderFirstMove", p)),
      s.emit("sliderMove", p),
      (i.isMoved = !0);
    let v = s.isHorizontal() ? f : g;
    (n.diff = v),
      (v *= r.touchRatio),
      l && (v = -v),
      (s.swipeDirection = v > 0 ? "prev" : "next"),
      (i.currentTranslate = v + i.startTranslate);
    let w = !0,
      b = r.resistanceRatio;
    if (
      (r.touchReleaseOnEdges && (b = 0),
      v > 0 && i.currentTranslate > s.minTranslate()
        ? ((w = !1),
          r.resistance &&
            (i.currentTranslate =
              s.minTranslate() -
              1 +
              (-s.minTranslate() + i.startTranslate + v) ** b))
        : v < 0 &&
          i.currentTranslate < s.maxTranslate() &&
          ((w = !1),
          r.resistance &&
            (i.currentTranslate =
              s.maxTranslate() +
              1 -
              (s.maxTranslate() - i.startTranslate - v) ** b)),
      w && (p.preventedByNestedSwiper = !0),
      !s.allowSlideNext &&
        "next" === s.swipeDirection &&
        i.currentTranslate < i.startTranslate &&
        (i.currentTranslate = i.startTranslate),
      !s.allowSlidePrev &&
        "prev" === s.swipeDirection &&
        i.currentTranslate > i.startTranslate &&
        (i.currentTranslate = i.startTranslate),
      s.allowSlidePrev ||
        s.allowSlideNext ||
        (i.currentTranslate = i.startTranslate),
      r.threshold > 0)
    ) {
      if (!(Math.abs(v) > r.threshold || i.allowThresholdMove))
        return void (i.currentTranslate = i.startTranslate);
      if (!i.allowThresholdMove)
        return (
          (i.allowThresholdMove = !0),
          (n.startX = n.currentX),
          (n.startY = n.currentY),
          (i.currentTranslate = i.startTranslate),
          void (n.diff = s.isHorizontal()
            ? n.currentX - n.startX
            : n.currentY - n.startY)
        );
    }
    r.followFinger &&
      !r.cssMode &&
      (((r.freeMode && r.freeMode.enabled && s.freeMode) ||
        r.watchSlidesProgress) &&
        (s.updateActiveIndex(), s.updateSlidesClasses()),
      s.params.freeMode &&
        r.freeMode.enabled &&
        s.freeMode &&
        s.freeMode.onTouchMove(),
      s.updateProgress(i.currentTranslate),
      s.setTranslate(i.currentTranslate));
  }
  function P(e) {
    const t = this,
      s = t.touchEventsData,
      { params: a, touches: i, rtlTranslate: r, slidesGrid: n, enabled: l } = t;
    if (!l) return;
    let o = e;
    if (
      (o.originalEvent && (o = o.originalEvent),
      s.allowTouchCallbacks && t.emit("touchEnd", o),
      (s.allowTouchCallbacks = !1),
      !s.isTouched)
    )
      return (
        s.isMoved && a.grabCursor && t.setGrabCursor(!1),
        (s.isMoved = !1),
        void (s.startMoving = !1)
      );
    a.grabCursor &&
      s.isMoved &&
      s.isTouched &&
      (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
      t.setGrabCursor(!1);
    const d = u(),
      p = d - s.touchStartTime;
    if (t.allowClick) {
      const e = o.path || (o.composedPath && o.composedPath());
      t.updateClickedSlide((e && e[0]) || o.target),
        t.emit("tap click", o),
        p < 300 &&
          d - s.lastClickTime < 300 &&
          t.emit("doubleTap doubleClick", o);
    }
    if (
      ((s.lastClickTime = u()),
      c(() => {
        t.destroyed || (t.allowClick = !0);
      }),
      !s.isTouched ||
        !s.isMoved ||
        !t.swipeDirection ||
        0 === i.diff ||
        s.currentTranslate === s.startTranslate)
    )
      return (s.isTouched = !1), (s.isMoved = !1), void (s.startMoving = !1);
    let h;
    if (
      ((s.isTouched = !1),
      (s.isMoved = !1),
      (s.startMoving = !1),
      (h = a.followFinger
        ? r
          ? t.translate
          : -t.translate
        : -s.currentTranslate),
      a.cssMode)
    )
      return;
    if (t.params.freeMode && a.freeMode.enabled)
      return void t.freeMode.onTouchEnd({ currentPos: h });
    let m = 0,
      f = t.slidesSizesGrid[0];
    for (
      let e = 0;
      e < n.length;
      e += e < a.slidesPerGroupSkip ? 1 : a.slidesPerGroup
    ) {
      const t = e < a.slidesPerGroupSkip - 1 ? 1 : a.slidesPerGroup;
      void 0 !== n[e + t]
        ? h >= n[e] && h < n[e + t] && ((m = e), (f = n[e + t] - n[e]))
        : h >= n[e] && ((m = e), (f = n[n.length - 1] - n[n.length - 2]));
    }
    const g = (h - n[m]) / f,
      v = m < a.slidesPerGroupSkip - 1 ? 1 : a.slidesPerGroup;
    if (p > a.longSwipesMs) {
      if (!a.longSwipes) return void t.slideTo(t.activeIndex);
      "next" === t.swipeDirection &&
        (g >= a.longSwipesRatio ? t.slideTo(m + v) : t.slideTo(m)),
        "prev" === t.swipeDirection &&
          (g > 1 - a.longSwipesRatio ? t.slideTo(m + v) : t.slideTo(m));
    } else {
      if (!a.shortSwipes) return void t.slideTo(t.activeIndex);
      t.navigation &&
      (o.target === t.navigation.nextEl || o.target === t.navigation.prevEl)
        ? o.target === t.navigation.nextEl
          ? t.slideTo(m + v)
          : t.slideTo(m)
        : ("next" === t.swipeDirection && t.slideTo(m + v),
          "prev" === t.swipeDirection && t.slideTo(m));
    }
  }
  function k() {
    const e = this,
      { params: t, el: s } = e;
    if (s && 0 === s.offsetWidth) return;
    t.breakpoints && e.setBreakpoint();
    const { allowSlideNext: a, allowSlidePrev: i, snapGrid: r } = e;
    (e.allowSlideNext = !0),
      (e.allowSlidePrev = !0),
      e.updateSize(),
      e.updateSlides(),
      e.updateSlidesClasses(),
      ("auto" === t.slidesPerView || t.slidesPerView > 1) &&
      e.isEnd &&
      !e.isBeginning &&
      !e.params.centeredSlides
        ? e.slideTo(e.slides.length - 1, 0, !1, !0)
        : e.slideTo(e.activeIndex, 0, !1, !0),
      e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.run(),
      (e.allowSlidePrev = i),
      (e.allowSlideNext = a),
      e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow();
  }
  function z(e) {
    const t = this;
    t.enabled &&
      (t.allowClick ||
        (t.params.preventClicks && e.preventDefault(),
        t.params.preventClicksPropagation &&
          t.animating &&
          (e.stopPropagation(), e.stopImmediatePropagation())));
  }
  function O() {
    const e = this,
      { wrapperEl: t, rtlTranslate: s, enabled: a } = e;
    if (!a) return;
    let i;
    (e.previousTranslate = e.translate),
      e.isHorizontal()
        ? (e.translate = -t.scrollLeft)
        : (e.translate = -t.scrollTop),
      -0 === e.translate && (e.translate = 0),
      e.updateActiveIndex(),
      e.updateSlidesClasses();
    const r = e.maxTranslate() - e.minTranslate();
    (i = 0 === r ? 0 : (e.translate - e.minTranslate()) / r),
      i !== e.progress && e.updateProgress(s ? -e.translate : e.translate),
      e.emit("setTranslate", e.translate, !1);
  }
  let I = !1;
  function L() {}
  const A = (e, t) => {
    const s = a(),
      {
        params: i,
        touchEvents: r,
        el: n,
        wrapperEl: l,
        device: o,
        support: d,
      } = e,
      p = !!i.nested,
      c = "on" === t ? "addEventListener" : "removeEventListener",
      u = t;
    if (d.touch) {
      const t = !(
        "touchstart" !== r.start ||
        !d.passiveListener ||
        !i.passiveListeners
      ) && { passive: !0, capture: !1 };
      n[c](r.start, e.onTouchStart, t),
        n[c](
          r.move,
          e.onTouchMove,
          d.passiveListener ? { passive: !1, capture: p } : p
        ),
        n[c](r.end, e.onTouchEnd, t),
        r.cancel && n[c](r.cancel, e.onTouchEnd, t);
    } else
      n[c](r.start, e.onTouchStart, !1),
        s[c](r.move, e.onTouchMove, p),
        s[c](r.end, e.onTouchEnd, !1);
    (i.preventClicks || i.preventClicksPropagation) &&
      n[c]("click", e.onClick, !0),
      i.cssMode && l[c]("scroll", e.onScroll),
      i.updateOnWindowResize
        ? e[u](
            o.ios || o.android
              ? "resize orientationchange observerUpdate"
              : "resize observerUpdate",
            k,
            !0
          )
        : e[u]("observerUpdate", k, !0);
  };
  const D = (e, t) => e.grid && t.grid && t.grid.rows > 1;
  var G = {
    init: !0,
    direction: "horizontal",
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: !1,
    updateOnWindowResize: !0,
    resizeObserver: !0,
    nested: !1,
    createElements: !1,
    enabled: !0,
    focusableElements: "input, select, option, textarea, button, video, label",
    width: null,
    height: null,
    preventInteractionOnTransition: !1,
    userAgent: null,
    url: null,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: "slide",
    breakpoints: void 0,
    breakpointsBase: "window",
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: !1,
    centeredSlides: !1,
    centeredSlidesBounds: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    watchOverflow: !0,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 0,
    touchMoveStopPropagation: !1,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: 0.85,
    watchSlidesProgress: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    preloadImages: !0,
    updateOnImagesReady: !0,
    loop: !1,
    loopAdditionalSlides: 0,
    loopedSlides: null,
    loopFillGroupWithBlank: !1,
    loopPreventsSlide: !0,
    rewind: !1,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    passiveListeners: !0,
    containerModifierClass: "swiper-",
    slideClass: "swiper-slide",
    slideBlankClass: "swiper-slide-invisible-blank",
    slideActiveClass: "swiper-slide-active",
    slideDuplicateActiveClass: "swiper-slide-duplicate-active",
    slideVisibleClass: "swiper-slide-visible",
    slideDuplicateClass: "swiper-slide-duplicate",
    slideNextClass: "swiper-slide-next",
    slideDuplicateNextClass: "swiper-slide-duplicate-next",
    slidePrevClass: "swiper-slide-prev",
    slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
    wrapperClass: "swiper-wrapper",
    runCallbacksOnInit: !0,
    _emitClasses: !1,
  };
  function N(e, t) {
    return function (s = {}) {
      const a = Object.keys(s)[0],
        i = s[a];
      "object" == typeof i && null !== i
        ? (["navigation", "pagination", "scrollbar"].indexOf(a) >= 0 &&
            !0 === e[a] &&
            (e[a] = { auto: !0 }),
          a in e && "enabled" in i
            ? (!0 === e[a] && (e[a] = { enabled: !0 }),
              "object" != typeof e[a] ||
                "enabled" in e[a] ||
                (e[a].enabled = !0),
              e[a] || (e[a] = { enabled: !1 }),
              f(t, s))
            : f(t, s))
        : f(t, s);
    };
  }
  const B = {
      eventsEmitter: C,
      update: {
        updateSize: function () {
          const e = this;
          let t, s;
          const a = e.$el;
          (t =
            void 0 !== e.params.width && null !== e.params.width
              ? e.params.width
              : a[0].clientWidth),
            (s =
              void 0 !== e.params.height && null !== e.params.height
                ? e.params.height
                : a[0].clientHeight),
            (0 === t && e.isHorizontal()) ||
              (0 === s && e.isVertical()) ||
              ((t =
                t -
                parseInt(a.css("padding-left") || 0, 10) -
                parseInt(a.css("padding-right") || 0, 10)),
              (s =
                s -
                parseInt(a.css("padding-top") || 0, 10) -
                parseInt(a.css("padding-bottom") || 0, 10)),
              Number.isNaN(t) && (t = 0),
              Number.isNaN(s) && (s = 0),
              Object.assign(e, {
                width: t,
                height: s,
                size: e.isHorizontal() ? t : s,
              }));
        },
        updateSlides: function () {
          const e = this;
          function t(t) {
            return e.isHorizontal()
              ? t
              : {
                  width: "height",
                  "margin-top": "margin-left",
                  "margin-bottom ": "margin-right",
                  "margin-left": "margin-top",
                  "margin-right": "margin-bottom",
                  "padding-left": "padding-top",
                  "padding-right": "padding-bottom",
                  marginRight: "marginBottom",
                }[t];
          }
          function s(e, s) {
            return parseFloat(e.getPropertyValue(t(s)) || 0);
          }
          const a = e.params,
            { $wrapperEl: i, size: r, rtlTranslate: n, wrongRTL: l } = e,
            o = e.virtual && a.virtual.enabled,
            d = o ? e.virtual.slides.length : e.slides.length,
            p = i.children(`.${e.params.slideClass}`),
            c = o ? e.virtual.slides.length : p.length;
          let u = [];
          const h = [],
            m = [];
          let f = a.slidesOffsetBefore;
          "function" == typeof f && (f = a.slidesOffsetBefore.call(e));
          let v = a.slidesOffsetAfter;
          "function" == typeof v && (v = a.slidesOffsetAfter.call(e));
          const w = e.snapGrid.length,
            b = e.slidesGrid.length;
          let x = a.spaceBetween,
            y = -f,
            E = 0,
            T = 0;
          if (void 0 === r) return;
          "string" == typeof x &&
            x.indexOf("%") >= 0 &&
            (x = (parseFloat(x.replace("%", "")) / 100) * r),
            (e.virtualSize = -x),
            n
              ? p.css({ marginLeft: "", marginBottom: "", marginTop: "" })
              : p.css({ marginRight: "", marginBottom: "", marginTop: "" }),
            a.centeredSlides &&
              a.cssMode &&
              (g(e.wrapperEl, "--swiper-centered-offset-before", ""),
              g(e.wrapperEl, "--swiper-centered-offset-after", ""));
          const C = a.grid && a.grid.rows > 1 && e.grid;
          let $;
          C && e.grid.initSlides(c);
          const S =
            "auto" === a.slidesPerView &&
            a.breakpoints &&
            Object.keys(a.breakpoints).filter(
              (e) => void 0 !== a.breakpoints[e].slidesPerView
            ).length > 0;
          for (let i = 0; i < c; i += 1) {
            $ = 0;
            const n = p.eq(i);
            if (
              (C && e.grid.updateSlide(i, n, c, t), "none" !== n.css("display"))
            ) {
              if ("auto" === a.slidesPerView) {
                S && (p[i].style[t("width")] = "");
                const r = getComputedStyle(n[0]),
                  l = n[0].style.transform,
                  o = n[0].style.webkitTransform;
                if (
                  (l && (n[0].style.transform = "none"),
                  o && (n[0].style.webkitTransform = "none"),
                  a.roundLengths)
                )
                  $ = e.isHorizontal() ? n.outerWidth(!0) : n.outerHeight(!0);
                else {
                  const e = s(r, "width"),
                    t = s(r, "padding-left"),
                    a = s(r, "padding-right"),
                    i = s(r, "margin-left"),
                    l = s(r, "margin-right"),
                    o = r.getPropertyValue("box-sizing");
                  if (o && "border-box" === o) $ = e + i + l;
                  else {
                    const { clientWidth: s, offsetWidth: r } = n[0];
                    $ = e + t + a + i + l + (r - s);
                  }
                }
                l && (n[0].style.transform = l),
                  o && (n[0].style.webkitTransform = o),
                  a.roundLengths && ($ = Math.floor($));
              } else
                ($ = (r - (a.slidesPerView - 1) * x) / a.slidesPerView),
                  a.roundLengths && ($ = Math.floor($)),
                  p[i] && (p[i].style[t("width")] = `${$}px`);
              p[i] && (p[i].swiperSlideSize = $),
                m.push($),
                a.centeredSlides
                  ? ((y = y + $ / 2 + E / 2 + x),
                    0 === E && 0 !== i && (y = y - r / 2 - x),
                    0 === i && (y = y - r / 2 - x),
                    Math.abs(y) < 0.001 && (y = 0),
                    a.roundLengths && (y = Math.floor(y)),
                    T % a.slidesPerGroup == 0 && u.push(y),
                    h.push(y))
                  : (a.roundLengths && (y = Math.floor(y)),
                    (T - Math.min(e.params.slidesPerGroupSkip, T)) %
                      e.params.slidesPerGroup ==
                      0 && u.push(y),
                    h.push(y),
                    (y = y + $ + x)),
                (e.virtualSize += $ + x),
                (E = $),
                (T += 1);
            }
          }
          if (
            ((e.virtualSize = Math.max(e.virtualSize, r) + v),
            n &&
              l &&
              ("slide" === a.effect || "coverflow" === a.effect) &&
              i.css({ width: `${e.virtualSize + a.spaceBetween}px` }),
            a.setWrapperSize &&
              i.css({ [t("width")]: `${e.virtualSize + a.spaceBetween}px` }),
            C && e.grid.updateWrapperSize($, u, t),
            !a.centeredSlides)
          ) {
            const t = [];
            for (let s = 0; s < u.length; s += 1) {
              let i = u[s];
              a.roundLengths && (i = Math.floor(i)),
                u[s] <= e.virtualSize - r && t.push(i);
            }
            (u = t),
              Math.floor(e.virtualSize - r) - Math.floor(u[u.length - 1]) > 1 &&
                u.push(e.virtualSize - r);
          }
          if ((0 === u.length && (u = [0]), 0 !== a.spaceBetween)) {
            const s = e.isHorizontal() && n ? "marginLeft" : t("marginRight");
            p.filter((e, t) => !a.cssMode || t !== p.length - 1).css({
              [s]: `${x}px`,
            });
          }
          if (a.centeredSlides && a.centeredSlidesBounds) {
            let e = 0;
            m.forEach((t) => {
              e += t + (a.spaceBetween ? a.spaceBetween : 0);
            }),
              (e -= a.spaceBetween);
            const t = e - r;
            u = u.map((e) => (e < 0 ? -f : e > t ? t + v : e));
          }
          if (a.centerInsufficientSlides) {
            let e = 0;
            if (
              (m.forEach((t) => {
                e += t + (a.spaceBetween ? a.spaceBetween : 0);
              }),
              (e -= a.spaceBetween),
              e < r)
            ) {
              const t = (r - e) / 2;
              u.forEach((e, s) => {
                u[s] = e - t;
              }),
                h.forEach((e, s) => {
                  h[s] = e + t;
                });
            }
          }
          if (
            (Object.assign(e, {
              slides: p,
              snapGrid: u,
              slidesGrid: h,
              slidesSizesGrid: m,
            }),
            a.centeredSlides && a.cssMode && !a.centeredSlidesBounds)
          ) {
            g(e.wrapperEl, "--swiper-centered-offset-before", -u[0] + "px"),
              g(
                e.wrapperEl,
                "--swiper-centered-offset-after",
                e.size / 2 - m[m.length - 1] / 2 + "px"
              );
            const t = -e.snapGrid[0],
              s = -e.slidesGrid[0];
            (e.snapGrid = e.snapGrid.map((e) => e + t)),
              (e.slidesGrid = e.slidesGrid.map((e) => e + s));
          }
          c !== d && e.emit("slidesLengthChange"),
            u.length !== w &&
              (e.params.watchOverflow && e.checkOverflow(),
              e.emit("snapGridLengthChange")),
            h.length !== b && e.emit("slidesGridLengthChange"),
            a.watchSlidesProgress && e.updateSlidesOffset();
        },
        updateAutoHeight: function (e) {
          const t = this,
            s = [],
            a = t.virtual && t.params.virtual.enabled;
          let i,
            r = 0;
          "number" == typeof e
            ? t.setTransition(e)
            : !0 === e && t.setTransition(t.params.speed);
          const n = (e) =>
            a
              ? t.slides.filter(
                  (t) =>
                    parseInt(t.getAttribute("data-swiper-slide-index"), 10) ===
                    e
                )[0]
              : t.slides.eq(e)[0];
          if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
            if (t.params.centeredSlides)
              t.visibleSlides.each((e) => {
                s.push(e);
              });
            else
              for (i = 0; i < Math.ceil(t.params.slidesPerView); i += 1) {
                const e = t.activeIndex + i;
                if (e > t.slides.length && !a) break;
                s.push(n(e));
              }
          else s.push(n(t.activeIndex));
          for (i = 0; i < s.length; i += 1)
            if (void 0 !== s[i]) {
              const e = s[i].offsetHeight;
              r = e > r ? e : r;
            }
          (r || 0 === r) && t.$wrapperEl.css("height", `${r}px`);
        },
        updateSlidesOffset: function () {
          const e = this,
            t = e.slides;
          for (let s = 0; s < t.length; s += 1)
            t[s].swiperSlideOffset = e.isHorizontal()
              ? t[s].offsetLeft
              : t[s].offsetTop;
        },
        updateSlidesProgress: function (e = (this && this.translate) || 0) {
          const t = this,
            s = t.params,
            { slides: a, rtlTranslate: i, snapGrid: r } = t;
          if (0 === a.length) return;
          void 0 === a[0].swiperSlideOffset && t.updateSlidesOffset();
          let n = -e;
          i && (n = e),
            a.removeClass(s.slideVisibleClass),
            (t.visibleSlidesIndexes = []),
            (t.visibleSlides = []);
          for (let e = 0; e < a.length; e += 1) {
            const l = a[e];
            let o = l.swiperSlideOffset;
            s.cssMode && s.centeredSlides && (o -= a[0].swiperSlideOffset);
            const d =
                (n + (s.centeredSlides ? t.minTranslate() : 0) - o) /
                (l.swiperSlideSize + s.spaceBetween),
              p =
                (n - r[0] + (s.centeredSlides ? t.minTranslate() : 0) - o) /
                (l.swiperSlideSize + s.spaceBetween),
              c = -(n - o),
              u = c + t.slidesSizesGrid[e];
            ((c >= 0 && c < t.size - 1) ||
              (u > 1 && u <= t.size) ||
              (c <= 0 && u >= t.size)) &&
              (t.visibleSlides.push(l),
              t.visibleSlidesIndexes.push(e),
              a.eq(e).addClass(s.slideVisibleClass)),
              (l.progress = i ? -d : d),
              (l.originalProgress = i ? -p : p);
          }
          t.visibleSlides = d(t.visibleSlides);
        },
        updateProgress: function (e) {
          const t = this;
          if (void 0 === e) {
            const s = t.rtlTranslate ? -1 : 1;
            e = (t && t.translate && t.translate * s) || 0;
          }
          const s = t.params,
            a = t.maxTranslate() - t.minTranslate();
          let { progress: i, isBeginning: r, isEnd: n } = t;
          const l = r,
            o = n;
          0 === a
            ? ((i = 0), (r = !0), (n = !0))
            : ((i = (e - t.minTranslate()) / a), (r = i <= 0), (n = i >= 1)),
            Object.assign(t, { progress: i, isBeginning: r, isEnd: n }),
            (s.watchSlidesProgress || (s.centeredSlides && s.autoHeight)) &&
              t.updateSlidesProgress(e),
            r && !l && t.emit("reachBeginning toEdge"),
            n && !o && t.emit("reachEnd toEdge"),
            ((l && !r) || (o && !n)) && t.emit("fromEdge"),
            t.emit("progress", i);
        },
        updateSlidesClasses: function () {
          const e = this,
            {
              slides: t,
              params: s,
              $wrapperEl: a,
              activeIndex: i,
              realIndex: r,
            } = e,
            n = e.virtual && s.virtual.enabled;
          let l;
          t.removeClass(
            `${s.slideActiveClass} ${s.slideNextClass} ${s.slidePrevClass} ${s.slideDuplicateActiveClass} ${s.slideDuplicateNextClass} ${s.slideDuplicatePrevClass}`
          ),
            (l = n
              ? e.$wrapperEl.find(
                  `.${s.slideClass}[data-swiper-slide-index="${i}"]`
                )
              : t.eq(i)),
            l.addClass(s.slideActiveClass),
            s.loop &&
              (l.hasClass(s.slideDuplicateClass)
                ? a
                    .children(
                      `.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${r}"]`
                    )
                    .addClass(s.slideDuplicateActiveClass)
                : a
                    .children(
                      `.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${r}"]`
                    )
                    .addClass(s.slideDuplicateActiveClass));
          let o = l
            .nextAll(`.${s.slideClass}`)
            .eq(0)
            .addClass(s.slideNextClass);
          s.loop &&
            0 === o.length &&
            ((o = t.eq(0)), o.addClass(s.slideNextClass));
          let d = l
            .prevAll(`.${s.slideClass}`)
            .eq(0)
            .addClass(s.slidePrevClass);
          s.loop &&
            0 === d.length &&
            ((d = t.eq(-1)), d.addClass(s.slidePrevClass)),
            s.loop &&
              (o.hasClass(s.slideDuplicateClass)
                ? a
                    .children(
                      `.${s.slideClass}:not(.${
                        s.slideDuplicateClass
                      })[data-swiper-slide-index="${o.attr(
                        "data-swiper-slide-index"
                      )}"]`
                    )
                    .addClass(s.slideDuplicateNextClass)
                : a
                    .children(
                      `.${s.slideClass}.${
                        s.slideDuplicateClass
                      }[data-swiper-slide-index="${o.attr(
                        "data-swiper-slide-index"
                      )}"]`
                    )
                    .addClass(s.slideDuplicateNextClass),
              d.hasClass(s.slideDuplicateClass)
                ? a
                    .children(
                      `.${s.slideClass}:not(.${
                        s.slideDuplicateClass
                      })[data-swiper-slide-index="${d.attr(
                        "data-swiper-slide-index"
                      )}"]`
                    )
                    .addClass(s.slideDuplicatePrevClass)
                : a
                    .children(
                      `.${s.slideClass}.${
                        s.slideDuplicateClass
                      }[data-swiper-slide-index="${d.attr(
                        "data-swiper-slide-index"
                      )}"]`
                    )
                    .addClass(s.slideDuplicatePrevClass)),
            e.emitSlidesClasses();
        },
        updateActiveIndex: function (e) {
          const t = this,
            s = t.rtlTranslate ? t.translate : -t.translate,
            {
              slidesGrid: a,
              snapGrid: i,
              params: r,
              activeIndex: n,
              realIndex: l,
              snapIndex: o,
            } = t;
          let d,
            p = e;
          if (void 0 === p) {
            for (let e = 0; e < a.length; e += 1)
              void 0 !== a[e + 1]
                ? s >= a[e] && s < a[e + 1] - (a[e + 1] - a[e]) / 2
                  ? (p = e)
                  : s >= a[e] && s < a[e + 1] && (p = e + 1)
                : s >= a[e] && (p = e);
            r.normalizeSlideIndex && (p < 0 || void 0 === p) && (p = 0);
          }
          if (i.indexOf(s) >= 0) d = i.indexOf(s);
          else {
            const e = Math.min(r.slidesPerGroupSkip, p);
            d = e + Math.floor((p - e) / r.slidesPerGroup);
          }
          if ((d >= i.length && (d = i.length - 1), p === n))
            return void (
              d !== o && ((t.snapIndex = d), t.emit("snapIndexChange"))
            );
          const c = parseInt(
            t.slides.eq(p).attr("data-swiper-slide-index") || p,
            10
          );
          Object.assign(t, {
            snapIndex: d,
            realIndex: c,
            previousIndex: n,
            activeIndex: p,
          }),
            t.emit("activeIndexChange"),
            t.emit("snapIndexChange"),
            l !== c && t.emit("realIndexChange"),
            (t.initialized || t.params.runCallbacksOnInit) &&
              t.emit("slideChange");
        },
        updateClickedSlide: function (e) {
          const t = this,
            s = t.params,
            a = d(e).closest(`.${s.slideClass}`)[0];
          let i,
            r = !1;
          if (a)
            for (let e = 0; e < t.slides.length; e += 1)
              if (t.slides[e] === a) {
                (r = !0), (i = e);
                break;
              }
          if (!a || !r)
            return (t.clickedSlide = void 0), void (t.clickedIndex = void 0);
          (t.clickedSlide = a),
            t.virtual && t.params.virtual.enabled
              ? (t.clickedIndex = parseInt(
                  d(a).attr("data-swiper-slide-index"),
                  10
                ))
              : (t.clickedIndex = i),
            s.slideToClickedSlide &&
              void 0 !== t.clickedIndex &&
              t.clickedIndex !== t.activeIndex &&
              t.slideToClickedSlide();
        },
      },
      translate: {
        getTranslate: function (e = this.isHorizontal() ? "x" : "y") {
          const {
            params: t,
            rtlTranslate: s,
            translate: a,
            $wrapperEl: i,
          } = this;
          if (t.virtualTranslate) return s ? -a : a;
          if (t.cssMode) return a;
          let r = h(i[0], e);
          return s && (r = -r), r || 0;
        },
        setTranslate: function (e, t) {
          const s = this,
            {
              rtlTranslate: a,
              params: i,
              $wrapperEl: r,
              wrapperEl: n,
              progress: l,
            } = s;
          let o,
            d = 0,
            p = 0;
          s.isHorizontal() ? (d = a ? -e : e) : (p = e),
            i.roundLengths && ((d = Math.floor(d)), (p = Math.floor(p))),
            i.cssMode
              ? (n[s.isHorizontal() ? "scrollLeft" : "scrollTop"] =
                  s.isHorizontal() ? -d : -p)
              : i.virtualTranslate ||
                r.transform(`translate3d(${d}px, ${p}px, 0px)`),
            (s.previousTranslate = s.translate),
            (s.translate = s.isHorizontal() ? d : p);
          const c = s.maxTranslate() - s.minTranslate();
          (o = 0 === c ? 0 : (e - s.minTranslate()) / c),
            o !== l && s.updateProgress(e),
            s.emit("setTranslate", s.translate, t);
        },
        minTranslate: function () {
          return -this.snapGrid[0];
        },
        maxTranslate: function () {
          return -this.snapGrid[this.snapGrid.length - 1];
        },
        translateTo: function (
          e = 0,
          t = this.params.speed,
          s = !0,
          a = !0,
          i
        ) {
          const r = this,
            { params: n, wrapperEl: l } = r;
          if (r.animating && n.preventInteractionOnTransition) return !1;
          const o = r.minTranslate(),
            d = r.maxTranslate();
          let p;
          if (
            ((p = a && e > o ? o : a && e < d ? d : e),
            r.updateProgress(p),
            n.cssMode)
          ) {
            const e = r.isHorizontal();
            if (0 === t) l[e ? "scrollLeft" : "scrollTop"] = -p;
            else {
              if (!r.support.smoothScroll)
                return (
                  v({
                    swiper: r,
                    targetPosition: -p,
                    side: e ? "left" : "top",
                  }),
                  !0
                );
              l.scrollTo({ [e ? "left" : "top"]: -p, behavior: "smooth" });
            }
            return !0;
          }
          return (
            0 === t
              ? (r.setTransition(0),
                r.setTranslate(p),
                s &&
                  (r.emit("beforeTransitionStart", t, i),
                  r.emit("transitionEnd")))
              : (r.setTransition(t),
                r.setTranslate(p),
                s &&
                  (r.emit("beforeTransitionStart", t, i),
                  r.emit("transitionStart")),
                r.animating ||
                  ((r.animating = !0),
                  r.onTranslateToWrapperTransitionEnd ||
                    (r.onTranslateToWrapperTransitionEnd = function (e) {
                      r &&
                        !r.destroyed &&
                        e.target === this &&
                        (r.$wrapperEl[0].removeEventListener(
                          "transitionend",
                          r.onTranslateToWrapperTransitionEnd
                        ),
                        r.$wrapperEl[0].removeEventListener(
                          "webkitTransitionEnd",
                          r.onTranslateToWrapperTransitionEnd
                        ),
                        (r.onTranslateToWrapperTransitionEnd = null),
                        delete r.onTranslateToWrapperTransitionEnd,
                        s && r.emit("transitionEnd"));
                    }),
                  r.$wrapperEl[0].addEventListener(
                    "transitionend",
                    r.onTranslateToWrapperTransitionEnd
                  ),
                  r.$wrapperEl[0].addEventListener(
                    "webkitTransitionEnd",
                    r.onTranslateToWrapperTransitionEnd
                  ))),
            !0
          );
        },
      },
      transition: {
        setTransition: function (e, t) {
          const s = this;
          s.params.cssMode || s.$wrapperEl.transition(e),
            s.emit("setTransition", e, t);
        },
        transitionStart: function (e = !0, t) {
          const s = this,
            { params: a } = s;
          a.cssMode ||
            (a.autoHeight && s.updateAutoHeight(),
            $({ swiper: s, runCallbacks: e, direction: t, step: "Start" }));
        },
        transitionEnd: function (e = !0, t) {
          const s = this,
            { params: a } = s;
          (s.animating = !1),
            a.cssMode ||
              (s.setTransition(0),
              $({ swiper: s, runCallbacks: e, direction: t, step: "End" }));
        },
      },
      slide: {
        slideTo: function (e = 0, t = this.params.speed, s = !0, a, i) {
          if ("number" != typeof e && "string" != typeof e)
            throw new Error(
              `The 'index' argument cannot have type other than 'number' or 'string'. [${typeof e}] given.`
            );
          if ("string" == typeof e) {
            const t = parseInt(e, 10);
            if (!isFinite(t))
              throw new Error(
                `The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`
              );
            e = t;
          }
          const r = this;
          let n = e;
          n < 0 && (n = 0);
          const {
            params: l,
            snapGrid: o,
            slidesGrid: d,
            previousIndex: p,
            activeIndex: c,
            rtlTranslate: u,
            wrapperEl: h,
            enabled: m,
          } = r;
          if (
            (r.animating && l.preventInteractionOnTransition) ||
            (!m && !a && !i)
          )
            return !1;
          const f = Math.min(r.params.slidesPerGroupSkip, n);
          let g = f + Math.floor((n - f) / r.params.slidesPerGroup);
          g >= o.length && (g = o.length - 1),
            (c || l.initialSlide || 0) === (p || 0) &&
              s &&
              r.emit("beforeSlideChangeStart");
          const w = -o[g];
          if ((r.updateProgress(w), l.normalizeSlideIndex))
            for (let e = 0; e < d.length; e += 1) {
              const t = -Math.floor(100 * w),
                s = Math.floor(100 * d[e]),
                a = Math.floor(100 * d[e + 1]);
              void 0 !== d[e + 1]
                ? t >= s && t < a - (a - s) / 2
                  ? (n = e)
                  : t >= s && t < a && (n = e + 1)
                : t >= s && (n = e);
            }
          if (r.initialized && n !== c) {
            if (!r.allowSlideNext && w < r.translate && w < r.minTranslate())
              return !1;
            if (
              !r.allowSlidePrev &&
              w > r.translate &&
              w > r.maxTranslate() &&
              (c || 0) !== n
            )
              return !1;
          }
          let b;
          if (
            ((b = n > c ? "next" : n < c ? "prev" : "reset"),
            (u && -w === r.translate) || (!u && w === r.translate))
          )
            return (
              r.updateActiveIndex(n),
              l.autoHeight && r.updateAutoHeight(),
              r.updateSlidesClasses(),
              "slide" !== l.effect && r.setTranslate(w),
              "reset" !== b && (r.transitionStart(s, b), r.transitionEnd(s, b)),
              !1
            );
          if (l.cssMode) {
            const e = r.isHorizontal(),
              s = u ? w : -w;
            if (0 === t) {
              const t = r.virtual && r.params.virtual.enabled;
              t &&
                ((r.wrapperEl.style.scrollSnapType = "none"),
                (r._immediateVirtual = !0)),
                (h[e ? "scrollLeft" : "scrollTop"] = s),
                t &&
                  requestAnimationFrame(() => {
                    (r.wrapperEl.style.scrollSnapType = ""),
                      (r._swiperImmediateVirtual = !1);
                  });
            } else {
              if (!r.support.smoothScroll)
                return (
                  v({ swiper: r, targetPosition: s, side: e ? "left" : "top" }),
                  !0
                );
              h.scrollTo({ [e ? "left" : "top"]: s, behavior: "smooth" });
            }
            return !0;
          }
          return (
            r.setTransition(t),
            r.setTranslate(w),
            r.updateActiveIndex(n),
            r.updateSlidesClasses(),
            r.emit("beforeTransitionStart", t, a),
            r.transitionStart(s, b),
            0 === t
              ? r.transitionEnd(s, b)
              : r.animating ||
                ((r.animating = !0),
                r.onSlideToWrapperTransitionEnd ||
                  (r.onSlideToWrapperTransitionEnd = function (e) {
                    r &&
                      !r.destroyed &&
                      e.target === this &&
                      (r.$wrapperEl[0].removeEventListener(
                        "transitionend",
                        r.onSlideToWrapperTransitionEnd
                      ),
                      r.$wrapperEl[0].removeEventListener(
                        "webkitTransitionEnd",
                        r.onSlideToWrapperTransitionEnd
                      ),
                      (r.onSlideToWrapperTransitionEnd = null),
                      delete r.onSlideToWrapperTransitionEnd,
                      r.transitionEnd(s, b));
                  }),
                r.$wrapperEl[0].addEventListener(
                  "transitionend",
                  r.onSlideToWrapperTransitionEnd
                ),
                r.$wrapperEl[0].addEventListener(
                  "webkitTransitionEnd",
                  r.onSlideToWrapperTransitionEnd
                )),
            !0
          );
        },
        slideToLoop: function (e = 0, t = this.params.speed, s = !0, a) {
          const i = this;
          let r = e;
          return i.params.loop && (r += i.loopedSlides), i.slideTo(r, t, s, a);
        },
        slideNext: function (e = this.params.speed, t = !0, s) {
          const a = this,
            { animating: i, enabled: r, params: n } = a;
          if (!r) return a;
          let l = n.slidesPerGroup;
          "auto" === n.slidesPerView &&
            1 === n.slidesPerGroup &&
            n.slidesPerGroupAuto &&
            (l = Math.max(a.slidesPerViewDynamic("current", !0), 1));
          const o = a.activeIndex < n.slidesPerGroupSkip ? 1 : l;
          if (n.loop) {
            if (i && n.loopPreventsSlide) return !1;
            a.loopFix(), (a._clientLeft = a.$wrapperEl[0].clientLeft);
          }
          return n.rewind && a.isEnd
            ? a.slideTo(0, e, t, s)
            : a.slideTo(a.activeIndex + o, e, t, s);
        },
        slidePrev: function (e = this.params.speed, t = !0, s) {
          const a = this,
            {
              params: i,
              animating: r,
              snapGrid: n,
              slidesGrid: l,
              rtlTranslate: o,
              enabled: d,
            } = a;
          if (!d) return a;
          if (i.loop) {
            if (r && i.loopPreventsSlide) return !1;
            a.loopFix(), (a._clientLeft = a.$wrapperEl[0].clientLeft);
          }
          function p(e) {
            return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
          }
          const c = p(o ? a.translate : -a.translate),
            u = n.map((e) => p(e));
          let h = n[u.indexOf(c) - 1];
          if (void 0 === h && i.cssMode) {
            let e;
            n.forEach((t, s) => {
              c >= t && (e = s);
            }),
              void 0 !== e && (h = n[e > 0 ? e - 1 : e]);
          }
          let m = 0;
          return (
            void 0 !== h &&
              ((m = l.indexOf(h)),
              m < 0 && (m = a.activeIndex - 1),
              "auto" === i.slidesPerView &&
                1 === i.slidesPerGroup &&
                i.slidesPerGroupAuto &&
                ((m = m - a.slidesPerViewDynamic("previous", !0) + 1),
                (m = Math.max(m, 0)))),
            i.rewind && a.isBeginning
              ? a.slideTo(a.slides.length - 1, e, t, s)
              : a.slideTo(m, e, t, s)
          );
        },
        slideReset: function (e = this.params.speed, t = !0, s) {
          return this.slideTo(this.activeIndex, e, t, s);
        },
        slideToClosest: function (e = this.params.speed, t = !0, s, a = 0.5) {
          const i = this;
          let r = i.activeIndex;
          const n = Math.min(i.params.slidesPerGroupSkip, r),
            l = n + Math.floor((r - n) / i.params.slidesPerGroup),
            o = i.rtlTranslate ? i.translate : -i.translate;
          if (o >= i.snapGrid[l]) {
            const e = i.snapGrid[l];
            o - e > (i.snapGrid[l + 1] - e) * a &&
              (r += i.params.slidesPerGroup);
          } else {
            const e = i.snapGrid[l - 1];
            o - e <= (i.snapGrid[l] - e) * a && (r -= i.params.slidesPerGroup);
          }
          return (
            (r = Math.max(r, 0)),
            (r = Math.min(r, i.slidesGrid.length - 1)),
            i.slideTo(r, e, t, s)
          );
        },
        slideToClickedSlide: function () {
          const e = this,
            { params: t, $wrapperEl: s } = e,
            a =
              "auto" === t.slidesPerView
                ? e.slidesPerViewDynamic()
                : t.slidesPerView;
          let i,
            r = e.clickedIndex;
          if (t.loop) {
            if (e.animating) return;
            (i = parseInt(
              d(e.clickedSlide).attr("data-swiper-slide-index"),
              10
            )),
              t.centeredSlides
                ? r < e.loopedSlides - a / 2 ||
                  r > e.slides.length - e.loopedSlides + a / 2
                  ? (e.loopFix(),
                    (r = s
                      .children(
                        `.${t.slideClass}[data-swiper-slide-index="${i}"]:not(.${t.slideDuplicateClass})`
                      )
                      .eq(0)
                      .index()),
                    c(() => {
                      e.slideTo(r);
                    }))
                  : e.slideTo(r)
                : r > e.slides.length - a
                ? (e.loopFix(),
                  (r = s
                    .children(
                      `.${t.slideClass}[data-swiper-slide-index="${i}"]:not(.${t.slideDuplicateClass})`
                    )
                    .eq(0)
                    .index()),
                  c(() => {
                    e.slideTo(r);
                  }))
                : e.slideTo(r);
          } else e.slideTo(r);
        },
      },
      loop: {
        loopCreate: function () {
          const e = this,
            t = a(),
            { params: s, $wrapperEl: i } = e,
            r = i.children().length > 0 ? d(i.children()[0].parentNode) : i;
          r.children(`.${s.slideClass}.${s.slideDuplicateClass}`).remove();
          let n = r.children(`.${s.slideClass}`);
          if (s.loopFillGroupWithBlank) {
            const e = s.slidesPerGroup - (n.length % s.slidesPerGroup);
            if (e !== s.slidesPerGroup) {
              for (let a = 0; a < e; a += 1) {
                const e = d(t.createElement("div")).addClass(
                  `${s.slideClass} ${s.slideBlankClass}`
                );
                r.append(e);
              }
              n = r.children(`.${s.slideClass}`);
            }
          }
          "auto" !== s.slidesPerView ||
            s.loopedSlides ||
            (s.loopedSlides = n.length),
            (e.loopedSlides = Math.ceil(
              parseFloat(s.loopedSlides || s.slidesPerView, 10)
            )),
            (e.loopedSlides += s.loopAdditionalSlides),
            e.loopedSlides > n.length && (e.loopedSlides = n.length);
          const l = [],
            o = [];
          n.each((t, s) => {
            const a = d(t);
            s < e.loopedSlides && o.push(t),
              s < n.length && s >= n.length - e.loopedSlides && l.push(t),
              a.attr("data-swiper-slide-index", s);
          });
          for (let e = 0; e < o.length; e += 1)
            r.append(d(o[e].cloneNode(!0)).addClass(s.slideDuplicateClass));
          for (let e = l.length - 1; e >= 0; e -= 1)
            r.prepend(d(l[e].cloneNode(!0)).addClass(s.slideDuplicateClass));
        },
        loopFix: function () {
          const e = this;
          e.emit("beforeLoopFix");
          const {
            activeIndex: t,
            slides: s,
            loopedSlides: a,
            allowSlidePrev: i,
            allowSlideNext: r,
            snapGrid: n,
            rtlTranslate: l,
          } = e;
          let o;
          (e.allowSlidePrev = !0), (e.allowSlideNext = !0);
          const d = -n[t] - e.getTranslate();
          if (t < a) {
            (o = s.length - 3 * a + t), (o += a);
            e.slideTo(o, 0, !1, !0) &&
              0 !== d &&
              e.setTranslate((l ? -e.translate : e.translate) - d);
          } else if (t >= s.length - a) {
            (o = -s.length + t + a), (o += a);
            e.slideTo(o, 0, !1, !0) &&
              0 !== d &&
              e.setTranslate((l ? -e.translate : e.translate) - d);
          }
          (e.allowSlidePrev = i), (e.allowSlideNext = r), e.emit("loopFix");
        },
        loopDestroy: function () {
          const { $wrapperEl: e, params: t, slides: s } = this;
          e
            .children(
              `.${t.slideClass}.${t.slideDuplicateClass},.${t.slideClass}.${t.slideBlankClass}`
            )
            .remove(),
            s.removeAttr("data-swiper-slide-index");
        },
      },
      grabCursor: {
        setGrabCursor: function (e) {
          const t = this;
          if (
            t.support.touch ||
            !t.params.simulateTouch ||
            (t.params.watchOverflow && t.isLocked) ||
            t.params.cssMode
          )
            return;
          const s =
            "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
          (s.style.cursor = "move"),
            (s.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab"),
            (s.style.cursor = e ? "-moz-grabbin" : "-moz-grab"),
            (s.style.cursor = e ? "grabbing" : "grab");
        },
        unsetGrabCursor: function () {
          const e = this;
          e.support.touch ||
            (e.params.watchOverflow && e.isLocked) ||
            e.params.cssMode ||
            (e[
              "container" === e.params.touchEventsTarget ? "el" : "wrapperEl"
            ].style.cursor = "");
        },
      },
      events: {
        attachEvents: function () {
          const e = this,
            t = a(),
            { params: s, support: i } = e;
          (e.onTouchStart = S.bind(e)),
            (e.onTouchMove = M.bind(e)),
            (e.onTouchEnd = P.bind(e)),
            s.cssMode && (e.onScroll = O.bind(e)),
            (e.onClick = z.bind(e)),
            i.touch && !I && (t.addEventListener("touchstart", L), (I = !0)),
            A(e, "on");
        },
        detachEvents: function () {
          A(this, "off");
        },
      },
      breakpoints: {
        setBreakpoint: function () {
          const e = this,
            {
              activeIndex: t,
              initialized: s,
              loopedSlides: a = 0,
              params: i,
              $el: r,
            } = e,
            n = i.breakpoints;
          if (!n || (n && 0 === Object.keys(n).length)) return;
          const l = e.getBreakpoint(n, e.params.breakpointsBase, e.el);
          if (!l || e.currentBreakpoint === l) return;
          const o = (l in n ? n[l] : void 0) || e.originalParams,
            d = D(e, i),
            p = D(e, o),
            c = i.enabled;
          d && !p
            ? (r.removeClass(
                `${i.containerModifierClass}grid ${i.containerModifierClass}grid-column`
              ),
              e.emitContainerClasses())
            : !d &&
              p &&
              (r.addClass(`${i.containerModifierClass}grid`),
              ((o.grid.fill && "column" === o.grid.fill) ||
                (!o.grid.fill && "column" === i.grid.fill)) &&
                r.addClass(`${i.containerModifierClass}grid-column`),
              e.emitContainerClasses());
          const u = o.direction && o.direction !== i.direction,
            h = i.loop && (o.slidesPerView !== i.slidesPerView || u);
          u && s && e.changeDirection(), f(e.params, o);
          const m = e.params.enabled;
          Object.assign(e, {
            allowTouchMove: e.params.allowTouchMove,
            allowSlideNext: e.params.allowSlideNext,
            allowSlidePrev: e.params.allowSlidePrev,
          }),
            c && !m ? e.disable() : !c && m && e.enable(),
            (e.currentBreakpoint = l),
            e.emit("_beforeBreakpoint", o),
            h &&
              s &&
              (e.loopDestroy(),
              e.loopCreate(),
              e.updateSlides(),
              e.slideTo(t - a + e.loopedSlides, 0, !1)),
            e.emit("breakpoint", o);
        },
        getBreakpoint: function (e, t = "window", s) {
          if (!e || ("container" === t && !s)) return;
          let a = !1;
          const i = r(),
            n = "window" === t ? i.innerHeight : s.clientHeight,
            l = Object.keys(e).map((e) => {
              if ("string" == typeof e && 0 === e.indexOf("@")) {
                const t = parseFloat(e.substr(1));
                return { value: n * t, point: e };
              }
              return { value: e, point: e };
            });
          l.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
          for (let e = 0; e < l.length; e += 1) {
            const { point: r, value: n } = l[e];
            "window" === t
              ? i.matchMedia(`(min-width: ${n}px)`).matches && (a = r)
              : n <= s.clientWidth && (a = r);
          }
          return a || "max";
        },
      },
      checkOverflow: {
        checkOverflow: function () {
          const e = this,
            { isLocked: t, params: s } = e,
            { slidesOffsetBefore: a } = s;
          if (a) {
            const t = e.slides.length - 1,
              s = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * a;
            e.isLocked = e.size > s;
          } else e.isLocked = 1 === e.snapGrid.length;
          !0 === s.allowSlideNext && (e.allowSlideNext = !e.isLocked),
            !0 === s.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
            t && t !== e.isLocked && (e.isEnd = !1),
            t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
        },
      },
      classes: {
        addClasses: function () {
          const e = this,
            {
              classNames: t,
              params: s,
              rtl: a,
              $el: i,
              device: r,
              support: n,
            } = e,
            l = (function (e, t) {
              const s = [];
              return (
                e.forEach((e) => {
                  "object" == typeof e
                    ? Object.keys(e).forEach((a) => {
                        e[a] && s.push(t + a);
                      })
                    : "string" == typeof e && s.push(t + e);
                }),
                s
              );
            })(
              [
                "initialized",
                s.direction,
                { "pointer-events": !n.touch },
                { "free-mode": e.params.freeMode && s.freeMode.enabled },
                { autoheight: s.autoHeight },
                { rtl: a },
                { grid: s.grid && s.grid.rows > 1 },
                {
                  "grid-column":
                    s.grid && s.grid.rows > 1 && "column" === s.grid.fill,
                },
                { android: r.android },
                { ios: r.ios },
                { "css-mode": s.cssMode },
                { centered: s.cssMode && s.centeredSlides },
              ],
              s.containerModifierClass
            );
          t.push(...l), i.addClass([...t].join(" ")), e.emitContainerClasses();
        },
        removeClasses: function () {
          const { $el: e, classNames: t } = this;
          e.removeClass(t.join(" ")), this.emitContainerClasses();
        },
      },
      images: {
        loadImage: function (e, t, s, a, i, n) {
          const l = r();
          let o;
          function p() {
            n && n();
          }
          d(e).parent("picture")[0] || (e.complete && i)
            ? p()
            : t
            ? ((o = new l.Image()),
              (o.onload = p),
              (o.onerror = p),
              a && (o.sizes = a),
              s && (o.srcset = s),
              t && (o.src = t))
            : p();
        },
        preloadImages: function () {
          const e = this;
          function t() {
            null != e &&
              e &&
              !e.destroyed &&
              (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1),
              e.imagesLoaded === e.imagesToLoad.length &&
                (e.params.updateOnImagesReady && e.update(),
                e.emit("imagesReady")));
          }
          e.imagesToLoad = e.$el.find("img");
          for (let s = 0; s < e.imagesToLoad.length; s += 1) {
            const a = e.imagesToLoad[s];
            e.loadImage(
              a,
              a.currentSrc || a.getAttribute("src"),
              a.srcset || a.getAttribute("srcset"),
              a.sizes || a.getAttribute("sizes"),
              !0,
              t
            );
          }
        },
      },
    },
    X = {};
  class H {
    constructor(...e) {
      let t, s;
      if (
        (1 === e.length &&
        e[0].constructor &&
        "Object" === Object.prototype.toString.call(e[0]).slice(8, -1)
          ? (s = e[0])
          : ([t, s] = e),
        s || (s = {}),
        (s = f({}, s)),
        t && !s.el && (s.el = t),
        s.el && d(s.el).length > 1)
      ) {
        const e = [];
        return (
          d(s.el).each((t) => {
            const a = f({}, s, { el: t });
            e.push(new H(a));
          }),
          e
        );
      }
      const a = this;
      (a.__swiper__ = !0),
        (a.support = y()),
        (a.device = E({ userAgent: s.userAgent })),
        (a.browser = T()),
        (a.eventsListeners = {}),
        (a.eventsAnyListeners = []),
        (a.modules = [...a.__modules__]),
        s.modules && Array.isArray(s.modules) && a.modules.push(...s.modules);
      const i = {};
      a.modules.forEach((e) => {
        e({
          swiper: a,
          extendParams: N(s, i),
          on: a.on.bind(a),
          once: a.once.bind(a),
          off: a.off.bind(a),
          emit: a.emit.bind(a),
        });
      });
      const r = f({}, G, i);
      return (
        (a.params = f({}, r, X, s)),
        (a.originalParams = f({}, a.params)),
        (a.passedParams = f({}, s)),
        a.params &&
          a.params.on &&
          Object.keys(a.params.on).forEach((e) => {
            a.on(e, a.params.on[e]);
          }),
        a.params && a.params.onAny && a.onAny(a.params.onAny),
        (a.$ = d),
        Object.assign(a, {
          enabled: a.params.enabled,
          el: t,
          classNames: [],
          slides: d(),
          slidesGrid: [],
          snapGrid: [],
          slidesSizesGrid: [],
          isHorizontal: () => "horizontal" === a.params.direction,
          isVertical: () => "vertical" === a.params.direction,
          activeIndex: 0,
          realIndex: 0,
          isBeginning: !0,
          isEnd: !1,
          translate: 0,
          previousTranslate: 0,
          progress: 0,
          velocity: 0,
          animating: !1,
          allowSlideNext: a.params.allowSlideNext,
          allowSlidePrev: a.params.allowSlidePrev,
          touchEvents: (function () {
            const e = ["touchstart", "touchmove", "touchend", "touchcancel"],
              t = ["pointerdown", "pointermove", "pointerup"];
            return (
              (a.touchEventsTouch = {
                start: e[0],
                move: e[1],
                end: e[2],
                cancel: e[3],
              }),
              (a.touchEventsDesktop = { start: t[0], move: t[1], end: t[2] }),
              a.support.touch || !a.params.simulateTouch
                ? a.touchEventsTouch
                : a.touchEventsDesktop
            );
          })(),
          touchEventsData: {
            isTouched: void 0,
            isMoved: void 0,
            allowTouchCallbacks: void 0,
            touchStartTime: void 0,
            isScrolling: void 0,
            currentTranslate: void 0,
            startTranslate: void 0,
            allowThresholdMove: void 0,
            focusableElements: a.params.focusableElements,
            lastClickTime: u(),
            clickTimeout: void 0,
            velocities: [],
            allowMomentumBounce: void 0,
            isTouchEvent: void 0,
            startMoving: void 0,
          },
          allowClick: !0,
          allowTouchMove: a.params.allowTouchMove,
          touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
          imagesToLoad: [],
          imagesLoaded: 0,
        }),
        a.emit("_swiper"),
        a.params.init && a.init(),
        a
      );
    }
    enable() {
      const e = this;
      e.enabled ||
        ((e.enabled = !0),
        e.params.grabCursor && e.setGrabCursor(),
        e.emit("enable"));
    }
    disable() {
      const e = this;
      e.enabled &&
        ((e.enabled = !1),
        e.params.grabCursor && e.unsetGrabCursor(),
        e.emit("disable"));
    }
    setProgress(e, t) {
      const s = this;
      e = Math.min(Math.max(e, 0), 1);
      const a = s.minTranslate(),
        i = (s.maxTranslate() - a) * e + a;
      s.translateTo(i, void 0 === t ? 0 : t),
        s.updateActiveIndex(),
        s.updateSlidesClasses();
    }
    emitContainerClasses() {
      const e = this;
      if (!e.params._emitClasses || !e.el) return;
      const t = e.el.className
        .split(" ")
        .filter(
          (t) =>
            0 === t.indexOf("swiper") ||
            0 === t.indexOf(e.params.containerModifierClass)
        );
      e.emit("_containerClasses", t.join(" "));
    }
    getSlideClasses(e) {
      const t = this;
      return e.className
        .split(" ")
        .filter(
          (e) =>
            0 === e.indexOf("swiper-slide") ||
            0 === e.indexOf(t.params.slideClass)
        )
        .join(" ");
    }
    emitSlidesClasses() {
      const e = this;
      if (!e.params._emitClasses || !e.el) return;
      const t = [];
      e.slides.each((s) => {
        const a = e.getSlideClasses(s);
        t.push({ slideEl: s, classNames: a }), e.emit("_slideClass", s, a);
      }),
        e.emit("_slideClasses", t);
    }
    slidesPerViewDynamic(e = "current", t = !1) {
      const {
        params: s,
        slides: a,
        slidesGrid: i,
        slidesSizesGrid: r,
        size: n,
        activeIndex: l,
      } = this;
      let o = 1;
      if (s.centeredSlides) {
        let e,
          t = a[l].swiperSlideSize;
        for (let s = l + 1; s < a.length; s += 1)
          a[s] &&
            !e &&
            ((t += a[s].swiperSlideSize), (o += 1), t > n && (e = !0));
        for (let s = l - 1; s >= 0; s -= 1)
          a[s] &&
            !e &&
            ((t += a[s].swiperSlideSize), (o += 1), t > n && (e = !0));
      } else if ("current" === e)
        for (let e = l + 1; e < a.length; e += 1) {
          (t ? i[e] + r[e] - i[l] < n : i[e] - i[l] < n) && (o += 1);
        }
      else
        for (let e = l - 1; e >= 0; e -= 1) {
          i[l] - i[e] < n && (o += 1);
        }
      return o;
    }
    update() {
      const e = this;
      if (!e || e.destroyed) return;
      const { snapGrid: t, params: s } = e;
      function a() {
        const t = e.rtlTranslate ? -1 * e.translate : e.translate,
          s = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
        e.setTranslate(s), e.updateActiveIndex(), e.updateSlidesClasses();
      }
      let i;
      s.breakpoints && e.setBreakpoint(),
        e.updateSize(),
        e.updateSlides(),
        e.updateProgress(),
        e.updateSlidesClasses(),
        e.params.freeMode && e.params.freeMode.enabled
          ? (a(), e.params.autoHeight && e.updateAutoHeight())
          : ((i =
              ("auto" === e.params.slidesPerView ||
                e.params.slidesPerView > 1) &&
              e.isEnd &&
              !e.params.centeredSlides
                ? e.slideTo(e.slides.length - 1, 0, !1, !0)
                : e.slideTo(e.activeIndex, 0, !1, !0)),
            i || a()),
        s.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
        e.emit("update");
    }
    changeDirection(e, t = !0) {
      const s = this,
        a = s.params.direction;
      return (
        e || (e = "horizontal" === a ? "vertical" : "horizontal"),
        e === a ||
          ("horizontal" !== e && "vertical" !== e) ||
          (s.$el
            .removeClass(`${s.params.containerModifierClass}${a}`)
            .addClass(`${s.params.containerModifierClass}${e}`),
          s.emitContainerClasses(),
          (s.params.direction = e),
          s.slides.each((t) => {
            "vertical" === e ? (t.style.width = "") : (t.style.height = "");
          }),
          s.emit("changeDirection"),
          t && s.update()),
        s
      );
    }
    mount(e) {
      const t = this;
      if (t.mounted) return !0;
      const s = d(e || t.params.el);
      if (!(e = s[0])) return !1;
      e.swiper = t;
      const i = () =>
        `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
      let r = (() => {
        if (e && e.shadowRoot && e.shadowRoot.querySelector) {
          const t = d(e.shadowRoot.querySelector(i()));
          return (t.children = (e) => s.children(e)), t;
        }
        return s.children(i());
      })();
      if (0 === r.length && t.params.createElements) {
        const e = a().createElement("div");
        (r = d(e)),
          (e.className = t.params.wrapperClass),
          s.append(e),
          s.children(`.${t.params.slideClass}`).each((e) => {
            r.append(e);
          });
      }
      return (
        Object.assign(t, {
          $el: s,
          el: e,
          $wrapperEl: r,
          wrapperEl: r[0],
          mounted: !0,
          rtl: "rtl" === e.dir.toLowerCase() || "rtl" === s.css("direction"),
          rtlTranslate:
            "horizontal" === t.params.direction &&
            ("rtl" === e.dir.toLowerCase() || "rtl" === s.css("direction")),
          wrongRTL: "-webkit-box" === r.css("display"),
        }),
        !0
      );
    }
    init(e) {
      const t = this;
      if (t.initialized) return t;
      return (
        !1 === t.mount(e) ||
          (t.emit("beforeInit"),
          t.params.breakpoints && t.setBreakpoint(),
          t.addClasses(),
          t.params.loop && t.loopCreate(),
          t.updateSize(),
          t.updateSlides(),
          t.params.watchOverflow && t.checkOverflow(),
          t.params.grabCursor && t.enabled && t.setGrabCursor(),
          t.params.preloadImages && t.preloadImages(),
          t.params.loop
            ? t.slideTo(
                t.params.initialSlide + t.loopedSlides,
                0,
                t.params.runCallbacksOnInit,
                !1,
                !0
              )
            : t.slideTo(
                t.params.initialSlide,
                0,
                t.params.runCallbacksOnInit,
                !1,
                !0
              ),
          t.attachEvents(),
          (t.initialized = !0),
          t.emit("init"),
          t.emit("afterInit")),
        t
      );
    }
    destroy(e = !0, t = !0) {
      const s = this,
        { params: a, $el: i, $wrapperEl: r, slides: n } = s;
      return (
        void 0 === s.params ||
          s.destroyed ||
          (s.emit("beforeDestroy"),
          (s.initialized = !1),
          s.detachEvents(),
          a.loop && s.loopDestroy(),
          t &&
            (s.removeClasses(),
            i.removeAttr("style"),
            r.removeAttr("style"),
            n &&
              n.length &&
              n
                .removeClass(
                  [
                    a.slideVisibleClass,
                    a.slideActiveClass,
                    a.slideNextClass,
                    a.slidePrevClass,
                  ].join(" ")
                )
                .removeAttr("style")
                .removeAttr("data-swiper-slide-index")),
          s.emit("destroy"),
          Object.keys(s.eventsListeners).forEach((e) => {
            s.off(e);
          }),
          !1 !== e &&
            ((s.$el[0].swiper = null),
            (function (e) {
              const t = e;
              Object.keys(t).forEach((e) => {
                try {
                  t[e] = null;
                } catch (e) {}
                try {
                  delete t[e];
                } catch (e) {}
              });
            })(s)),
          (s.destroyed = !0)),
        null
      );
    }
    static extendDefaults(e) {
      f(X, e);
    }
    static get extendedDefaults() {
      return X;
    }
    static get defaults() {
      return G;
    }
    static installModule(e) {
      H.prototype.__modules__ || (H.prototype.__modules__ = []);
      const t = H.prototype.__modules__;
      "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
    }
    static use(e) {
      return Array.isArray(e)
        ? (e.forEach((e) => H.installModule(e)), H)
        : (H.installModule(e), H);
    }
  }
  function Y(e, t, s, i) {
    const r = a();
    return (
      e.params.createElements &&
        Object.keys(i).forEach((a) => {
          if (!s[a] && !0 === s.auto) {
            let n = e.$el.children(`.${i[a]}`)[0];
            n ||
              ((n = r.createElement("div")),
              (n.className = i[a]),
              e.$el.append(n)),
              (s[a] = n),
              (t[a] = n);
          }
        }),
      s
    );
  }
  function W(e = "") {
    return `.${e
      .trim()
      .replace(/([\.:!\/])/g, "\\$1")
      .replace(/ /g, ".")}`;
  }
  function R(e) {
    const t = this,
      { $wrapperEl: s, params: a } = t;
    if ((a.loop && t.loopDestroy(), "object" == typeof e && "length" in e))
      for (let t = 0; t < e.length; t += 1) e[t] && s.append(e[t]);
    else s.append(e);
    a.loop && t.loopCreate(), a.observer || t.update();
  }
  function j(e) {
    const t = this,
      { params: s, $wrapperEl: a, activeIndex: i } = t;
    s.loop && t.loopDestroy();
    let r = i + 1;
    if ("object" == typeof e && "length" in e) {
      for (let t = 0; t < e.length; t += 1) e[t] && a.prepend(e[t]);
      r = i + e.length;
    } else a.prepend(e);
    s.loop && t.loopCreate(), s.observer || t.update(), t.slideTo(r, 0, !1);
  }
  function _(e, t) {
    const s = this,
      { $wrapperEl: a, params: i, activeIndex: r } = s;
    let n = r;
    i.loop &&
      ((n -= s.loopedSlides),
      s.loopDestroy(),
      (s.slides = a.children(`.${i.slideClass}`)));
    const l = s.slides.length;
    if (e <= 0) return void s.prependSlide(t);
    if (e >= l) return void s.appendSlide(t);
    let o = n > e ? n + 1 : n;
    const d = [];
    for (let t = l - 1; t >= e; t -= 1) {
      const e = s.slides.eq(t);
      e.remove(), d.unshift(e);
    }
    if ("object" == typeof t && "length" in t) {
      for (let e = 0; e < t.length; e += 1) t[e] && a.append(t[e]);
      o = n > e ? n + t.length : n;
    } else a.append(t);
    for (let e = 0; e < d.length; e += 1) a.append(d[e]);
    i.loop && s.loopCreate(),
      i.observer || s.update(),
      i.loop ? s.slideTo(o + s.loopedSlides, 0, !1) : s.slideTo(o, 0, !1);
  }
  function V(e) {
    const t = this,
      { params: s, $wrapperEl: a, activeIndex: i } = t;
    let r = i;
    s.loop &&
      ((r -= t.loopedSlides),
      t.loopDestroy(),
      (t.slides = a.children(`.${s.slideClass}`)));
    let n,
      l = r;
    if ("object" == typeof e && "length" in e) {
      for (let s = 0; s < e.length; s += 1)
        (n = e[s]), t.slides[n] && t.slides.eq(n).remove(), n < l && (l -= 1);
      l = Math.max(l, 0);
    } else (n = e), t.slides[n] && t.slides.eq(n).remove(), n < l && (l -= 1), (l = Math.max(l, 0));
    s.loop && t.loopCreate(),
      s.observer || t.update(),
      s.loop ? t.slideTo(l + t.loopedSlides, 0, !1) : t.slideTo(l, 0, !1);
  }
  function q() {
    const e = this,
      t = [];
    for (let s = 0; s < e.slides.length; s += 1) t.push(s);
    e.removeSlide(t);
  }
  function F(e) {
    const {
      effect: t,
      swiper: s,
      on: a,
      setTranslate: i,
      setTransition: r,
      overwriteParams: n,
      perspective: l,
    } = e;
    a("beforeInit", () => {
      if (s.params.effect !== t) return;
      s.classNames.push(`${s.params.containerModifierClass}${t}`),
        l && l() && s.classNames.push(`${s.params.containerModifierClass}3d`);
      const e = n ? n() : {};
      Object.assign(s.params, e), Object.assign(s.originalParams, e);
    }),
      a("setTranslate", () => {
        s.params.effect === t && i();
      }),
      a("setTransition", (e, a) => {
        s.params.effect === t && r(a);
      });
  }
  function U(e, t) {
    return e.transformEl
      ? t.find(e.transformEl).css({
          "backface-visibility": "hidden",
          "-webkit-backface-visibility": "hidden",
        })
      : t;
  }
  function K({ swiper: e, duration: t, transformEl: s, allSlides: a }) {
    const { slides: i, activeIndex: r, $wrapperEl: n } = e;
    if (e.params.virtualTranslate && 0 !== t) {
      let t,
        l = !1;
      (t = a ? (s ? i.find(s) : i) : s ? i.eq(r).find(s) : i.eq(r)),
        t.transitionEnd(() => {
          if (l) return;
          if (!e || e.destroyed) return;
          (l = !0), (e.animating = !1);
          const t = ["webkitTransitionEnd", "transitionend"];
          for (let e = 0; e < t.length; e += 1) n.trigger(t[e]);
        });
    }
  }
  function Z(e, t, s) {
    const a = "swiper-slide-shadow" + (s ? `-${s}` : ""),
      i = e.transformEl ? t.find(e.transformEl) : t;
    let r = i.children(`.${a}`);
    return (
      r.length ||
        ((r = d(`<div class="swiper-slide-shadow${s ? `-${s}` : ""}"></div>`)),
        i.append(r)),
      r
    );
  }
  Object.keys(B).forEach((e) => {
    Object.keys(B[e]).forEach((t) => {
      H.prototype[t] = B[e][t];
    });
  }),
    H.use([
      function ({ swiper: e, on: t, emit: s }) {
        const a = r();
        let i = null;
        const n = () => {
            e &&
              !e.destroyed &&
              e.initialized &&
              (s("beforeResize"), s("resize"));
          },
          l = () => {
            e && !e.destroyed && e.initialized && s("orientationchange");
          };
        t("init", () => {
          e.params.resizeObserver && void 0 !== a.ResizeObserver
            ? e &&
              !e.destroyed &&
              e.initialized &&
              ((i = new ResizeObserver((t) => {
                const { width: s, height: a } = e;
                let i = s,
                  r = a;
                t.forEach(
                  ({ contentBoxSize: t, contentRect: s, target: a }) => {
                    (a && a !== e.el) ||
                      ((i = s ? s.width : (t[0] || t).inlineSize),
                      (r = s ? s.height : (t[0] || t).blockSize));
                  }
                ),
                  (i === s && r === a) || n();
              })),
              i.observe(e.el))
            : (a.addEventListener("resize", n),
              a.addEventListener("orientationchange", l));
        }),
          t("destroy", () => {
            i && i.unobserve && e.el && (i.unobserve(e.el), (i = null)),
              a.removeEventListener("resize", n),
              a.removeEventListener("orientationchange", l);
          });
      },
      function ({ swiper: e, extendParams: t, on: s, emit: a }) {
        const i = [],
          n = r(),
          l = (e, t = {}) => {
            const s = new (n.MutationObserver || n.WebkitMutationObserver)(
              (e) => {
                if (1 === e.length) return void a("observerUpdate", e[0]);
                const t = function () {
                  a("observerUpdate", e[0]);
                };
                n.requestAnimationFrame
                  ? n.requestAnimationFrame(t)
                  : n.setTimeout(t, 0);
              }
            );
            s.observe(e, {
              attributes: void 0 === t.attributes || t.attributes,
              childList: void 0 === t.childList || t.childList,
              characterData: void 0 === t.characterData || t.characterData,
            }),
              i.push(s);
          };
        t({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
          s("init", () => {
            if (e.params.observer) {
              if (e.params.observeParents) {
                const t = e.$el.parents();
                for (let e = 0; e < t.length; e += 1) l(t[e]);
              }
              l(e.$el[0], { childList: e.params.observeSlideChildren }),
                l(e.$wrapperEl[0], { attributes: !1 });
            }
          }),
          s("destroy", () => {
            i.forEach((e) => {
              e.disconnect();
            }),
              i.splice(0, i.length);
          });
      },
    ]);
  const J = [
    function ({ swiper: e, extendParams: t, on: s }) {
      let a;
      function i(t, s) {
        const a = e.params.virtual;
        if (a.cache && e.virtual.cache[s]) return e.virtual.cache[s];
        const i = a.renderSlide
          ? d(a.renderSlide.call(e, t, s))
          : d(
              `<div class="${e.params.slideClass}" data-swiper-slide-index="${s}">${t}</div>`
            );
        return (
          i.attr("data-swiper-slide-index") ||
            i.attr("data-swiper-slide-index", s),
          a.cache && (e.virtual.cache[s] = i),
          i
        );
      }
      function r(t) {
        const {
            slidesPerView: s,
            slidesPerGroup: a,
            centeredSlides: r,
          } = e.params,
          { addSlidesBefore: n, addSlidesAfter: l } = e.params.virtual,
          { from: o, to: d, slides: p, slidesGrid: c, offset: u } = e.virtual;
        e.params.cssMode || e.updateActiveIndex();
        const h = e.activeIndex || 0;
        let m, f, g;
        (m = e.rtlTranslate ? "right" : e.isHorizontal() ? "left" : "top"),
          r
            ? ((f = Math.floor(s / 2) + a + l), (g = Math.floor(s / 2) + a + n))
            : ((f = s + (a - 1) + l), (g = a + n));
        const v = Math.max((h || 0) - g, 0),
          w = Math.min((h || 0) + f, p.length - 1),
          b = (e.slidesGrid[v] || 0) - (e.slidesGrid[0] || 0);
        function x() {
          e.updateSlides(),
            e.updateProgress(),
            e.updateSlidesClasses(),
            e.lazy && e.params.lazy.enabled && e.lazy.load();
        }
        if (
          (Object.assign(e.virtual, {
            from: v,
            to: w,
            offset: b,
            slidesGrid: e.slidesGrid,
          }),
          o === v && d === w && !t)
        )
          return (
            e.slidesGrid !== c && b !== u && e.slides.css(m, `${b}px`),
            void e.updateProgress()
          );
        if (e.params.virtual.renderExternal)
          return (
            e.params.virtual.renderExternal.call(e, {
              offset: b,
              from: v,
              to: w,
              slides: (function () {
                const e = [];
                for (let t = v; t <= w; t += 1) e.push(p[t]);
                return e;
              })(),
            }),
            void (e.params.virtual.renderExternalUpdate && x())
          );
        const y = [],
          E = [];
        if (t) e.$wrapperEl.find(`.${e.params.slideClass}`).remove();
        else
          for (let t = o; t <= d; t += 1)
            (t < v || t > w) &&
              e.$wrapperEl
                .find(`.${e.params.slideClass}[data-swiper-slide-index="${t}"]`)
                .remove();
        for (let e = 0; e < p.length; e += 1)
          e >= v &&
            e <= w &&
            (void 0 === d || t
              ? E.push(e)
              : (e > d && E.push(e), e < o && y.push(e)));
        E.forEach((t) => {
          e.$wrapperEl.append(i(p[t], t));
        }),
          y
            .sort((e, t) => t - e)
            .forEach((t) => {
              e.$wrapperEl.prepend(i(p[t], t));
            }),
          e.$wrapperEl.children(".swiper-slide").css(m, `${b}px`),
          x();
      }
      t({
        virtual: {
          enabled: !1,
          slides: [],
          cache: !0,
          renderSlide: null,
          renderExternal: null,
          renderExternalUpdate: !0,
          addSlidesBefore: 0,
          addSlidesAfter: 0,
        },
      }),
        (e.virtual = {
          cache: {},
          from: void 0,
          to: void 0,
          slides: [],
          offset: 0,
          slidesGrid: [],
        }),
        s("beforeInit", () => {
          e.params.virtual.enabled &&
            ((e.virtual.slides = e.params.virtual.slides),
            e.classNames.push(`${e.params.containerModifierClass}virtual`),
            (e.params.watchSlidesProgress = !0),
            (e.originalParams.watchSlidesProgress = !0),
            e.params.initialSlide || r());
        }),
        s("setTranslate", () => {
          e.params.virtual.enabled &&
            (e.params.cssMode && !e._immediateVirtual
              ? (clearTimeout(a),
                (a = setTimeout(() => {
                  r();
                }, 100)))
              : r());
        }),
        s("init update resize", () => {
          e.params.virtual.enabled &&
            e.params.cssMode &&
            g(e.wrapperEl, "--swiper-virtual-size", `${e.virtualSize}px`);
        }),
        Object.assign(e.virtual, {
          appendSlide: function (t) {
            if ("object" == typeof t && "length" in t)
              for (let s = 0; s < t.length; s += 1)
                t[s] && e.virtual.slides.push(t[s]);
            else e.virtual.slides.push(t);
            r(!0);
          },
          prependSlide: function (t) {
            const s = e.activeIndex;
            let a = s + 1,
              i = 1;
            if (Array.isArray(t)) {
              for (let s = 0; s < t.length; s += 1)
                t[s] && e.virtual.slides.unshift(t[s]);
              (a = s + t.length), (i = t.length);
            } else e.virtual.slides.unshift(t);
            if (e.params.virtual.cache) {
              const t = e.virtual.cache,
                s = {};
              Object.keys(t).forEach((e) => {
                const a = t[e],
                  r = a.attr("data-swiper-slide-index");
                r && a.attr("data-swiper-slide-index", parseInt(r, 10) + i),
                  (s[parseInt(e, 10) + i] = a);
              }),
                (e.virtual.cache = s);
            }
            r(!0), e.slideTo(a, 0);
          },
          removeSlide: function (t) {
            if (null == t) return;
            let s = e.activeIndex;
            if (Array.isArray(t))
              for (let a = t.length - 1; a >= 0; a -= 1)
                e.virtual.slides.splice(t[a], 1),
                  e.params.virtual.cache && delete e.virtual.cache[t[a]],
                  t[a] < s && (s -= 1),
                  (s = Math.max(s, 0));
            else
              e.virtual.slides.splice(t, 1),
                e.params.virtual.cache && delete e.virtual.cache[t],
                t < s && (s -= 1),
                (s = Math.max(s, 0));
            r(!0), e.slideTo(s, 0);
          },
          removeAllSlides: function () {
            (e.virtual.slides = []),
              e.params.virtual.cache && (e.virtual.cache = {}),
              r(!0),
              e.slideTo(0, 0);
          },
          update: r,
        });
    },
    function ({ swiper: e, extendParams: t, on: s, emit: i }) {
      const n = a(),
        l = r();
      function o(t) {
        if (!e.enabled) return;
        const { rtlTranslate: s } = e;
        let a = t;
        a.originalEvent && (a = a.originalEvent);
        const r = a.keyCode || a.charCode,
          o = e.params.keyboard.pageUpDown,
          d = o && 33 === r,
          p = o && 34 === r,
          c = 37 === r,
          u = 39 === r,
          h = 38 === r,
          m = 40 === r;
        if (
          !e.allowSlideNext &&
          ((e.isHorizontal() && u) || (e.isVertical() && m) || p)
        )
          return !1;
        if (
          !e.allowSlidePrev &&
          ((e.isHorizontal() && c) || (e.isVertical() && h) || d)
        )
          return !1;
        if (
          !(
            a.shiftKey ||
            a.altKey ||
            a.ctrlKey ||
            a.metaKey ||
            (n.activeElement &&
              n.activeElement.nodeName &&
              ("input" === n.activeElement.nodeName.toLowerCase() ||
                "textarea" === n.activeElement.nodeName.toLowerCase()))
          )
        ) {
          if (
            e.params.keyboard.onlyInViewport &&
            (d || p || c || u || h || m)
          ) {
            let t = !1;
            if (
              e.$el.parents(`.${e.params.slideClass}`).length > 0 &&
              0 === e.$el.parents(`.${e.params.slideActiveClass}`).length
            )
              return;
            const a = e.$el,
              i = a[0].clientWidth,
              r = a[0].clientHeight,
              n = l.innerWidth,
              o = l.innerHeight,
              d = e.$el.offset();
            s && (d.left -= e.$el[0].scrollLeft);
            const p = [
              [d.left, d.top],
              [d.left + i, d.top],
              [d.left, d.top + r],
              [d.left + i, d.top + r],
            ];
            for (let e = 0; e < p.length; e += 1) {
              const s = p[e];
              if (s[0] >= 0 && s[0] <= n && s[1] >= 0 && s[1] <= o) {
                if (0 === s[0] && 0 === s[1]) continue;
                t = !0;
              }
            }
            if (!t) return;
          }
          e.isHorizontal()
            ? ((d || p || c || u) &&
                (a.preventDefault ? a.preventDefault() : (a.returnValue = !1)),
              (((p || u) && !s) || ((d || c) && s)) && e.slideNext(),
              (((d || c) && !s) || ((p || u) && s)) && e.slidePrev())
            : ((d || p || h || m) &&
                (a.preventDefault ? a.preventDefault() : (a.returnValue = !1)),
              (p || m) && e.slideNext(),
              (d || h) && e.slidePrev()),
            i("keyPress", r);
        }
      }
      function p() {
        e.keyboard.enabled ||
          (d(n).on("keydown", o), (e.keyboard.enabled = !0));
      }
      function c() {
        e.keyboard.enabled &&
          (d(n).off("keydown", o), (e.keyboard.enabled = !1));
      }
      (e.keyboard = { enabled: !1 }),
        t({ keyboard: { enabled: !1, onlyInViewport: !0, pageUpDown: !0 } }),
        s("init", () => {
          e.params.keyboard.enabled && p();
        }),
        s("destroy", () => {
          e.keyboard.enabled && c();
        }),
        Object.assign(e.keyboard, { enable: p, disable: c });
    },
    function ({ swiper: e, extendParams: t, on: s, emit: a }) {
      const i = r();
      let n;
      t({
        mousewheel: {
          enabled: !1,
          releaseOnEdges: !1,
          invert: !1,
          forceToAxis: !1,
          sensitivity: 1,
          eventsTarget: "container",
          thresholdDelta: null,
          thresholdTime: null,
        },
      }),
        (e.mousewheel = { enabled: !1 });
      let l,
        o = u();
      const p = [];
      function h() {
        e.enabled && (e.mouseEntered = !0);
      }
      function m() {
        e.enabled && (e.mouseEntered = !1);
      }
      function f(t) {
        return (
          !(
            e.params.mousewheel.thresholdDelta &&
            t.delta < e.params.mousewheel.thresholdDelta
          ) &&
          !(
            e.params.mousewheel.thresholdTime &&
            u() - o < e.params.mousewheel.thresholdTime
          ) &&
          ((t.delta >= 6 && u() - o < 60) ||
            (t.direction < 0
              ? (e.isEnd && !e.params.loop) ||
                e.animating ||
                (e.slideNext(), a("scroll", t.raw))
              : (e.isBeginning && !e.params.loop) ||
                e.animating ||
                (e.slidePrev(), a("scroll", t.raw)),
            (o = new i.Date().getTime()),
            !1))
        );
      }
      function g(t) {
        let s = t,
          i = !0;
        if (!e.enabled) return;
        const r = e.params.mousewheel;
        e.params.cssMode && s.preventDefault();
        let o = e.$el;
        if (
          ("container" !== e.params.mousewheel.eventsTarget &&
            (o = d(e.params.mousewheel.eventsTarget)),
          !e.mouseEntered && !o[0].contains(s.target) && !r.releaseOnEdges)
        )
          return !0;
        s.originalEvent && (s = s.originalEvent);
        let h = 0;
        const m = e.rtlTranslate ? -1 : 1,
          g = (function (e) {
            let t = 0,
              s = 0,
              a = 0,
              i = 0;
            return (
              "detail" in e && (s = e.detail),
              "wheelDelta" in e && (s = -e.wheelDelta / 120),
              "wheelDeltaY" in e && (s = -e.wheelDeltaY / 120),
              "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120),
              "axis" in e && e.axis === e.HORIZONTAL_AXIS && ((t = s), (s = 0)),
              (a = 10 * t),
              (i = 10 * s),
              "deltaY" in e && (i = e.deltaY),
              "deltaX" in e && (a = e.deltaX),
              e.shiftKey && !a && ((a = i), (i = 0)),
              (a || i) &&
                e.deltaMode &&
                (1 === e.deltaMode
                  ? ((a *= 40), (i *= 40))
                  : ((a *= 800), (i *= 800))),
              a && !t && (t = a < 1 ? -1 : 1),
              i && !s && (s = i < 1 ? -1 : 1),
              { spinX: t, spinY: s, pixelX: a, pixelY: i }
            );
          })(s);
        if (r.forceToAxis)
          if (e.isHorizontal()) {
            if (!(Math.abs(g.pixelX) > Math.abs(g.pixelY))) return !0;
            h = -g.pixelX * m;
          } else {
            if (!(Math.abs(g.pixelY) > Math.abs(g.pixelX))) return !0;
            h = -g.pixelY;
          }
        else
          h =
            Math.abs(g.pixelX) > Math.abs(g.pixelY) ? -g.pixelX * m : -g.pixelY;
        if (0 === h) return !0;
        r.invert && (h = -h);
        let v = e.getTranslate() + h * r.sensitivity;
        if (
          (v >= e.minTranslate() && (v = e.minTranslate()),
          v <= e.maxTranslate() && (v = e.maxTranslate()),
          (i =
            !!e.params.loop ||
            !(v === e.minTranslate() || v === e.maxTranslate())),
          i && e.params.nested && s.stopPropagation(),
          e.params.freeMode && e.params.freeMode.enabled)
        ) {
          const t = { time: u(), delta: Math.abs(h), direction: Math.sign(h) },
            i =
              l &&
              t.time < l.time + 500 &&
              t.delta <= l.delta &&
              t.direction === l.direction;
          if (!i) {
            (l = void 0), e.params.loop && e.loopFix();
            let o = e.getTranslate() + h * r.sensitivity;
            const d = e.isBeginning,
              u = e.isEnd;
            if (
              (o >= e.minTranslate() && (o = e.minTranslate()),
              o <= e.maxTranslate() && (o = e.maxTranslate()),
              e.setTransition(0),
              e.setTranslate(o),
              e.updateProgress(),
              e.updateActiveIndex(),
              e.updateSlidesClasses(),
              ((!d && e.isBeginning) || (!u && e.isEnd)) &&
                e.updateSlidesClasses(),
              e.params.freeMode.sticky)
            ) {
              clearTimeout(n), (n = void 0), p.length >= 15 && p.shift();
              const s = p.length ? p[p.length - 1] : void 0,
                a = p[0];
              if (
                (p.push(t),
                s && (t.delta > s.delta || t.direction !== s.direction))
              )
                p.splice(0);
              else if (
                p.length >= 15 &&
                t.time - a.time < 500 &&
                a.delta - t.delta >= 1 &&
                t.delta <= 6
              ) {
                const s = h > 0 ? 0.8 : 0.2;
                (l = t),
                  p.splice(0),
                  (n = c(() => {
                    e.slideToClosest(e.params.speed, !0, void 0, s);
                  }, 0));
              }
              n ||
                (n = c(() => {
                  (l = t),
                    p.splice(0),
                    e.slideToClosest(e.params.speed, !0, void 0, 0.5);
                }, 500));
            }
            if (
              (i || a("scroll", s),
              e.params.autoplay &&
                e.params.autoplayDisableOnInteraction &&
                e.autoplay.stop(),
              o === e.minTranslate() || o === e.maxTranslate())
            )
              return !0;
          }
        } else {
          const s = {
            time: u(),
            delta: Math.abs(h),
            direction: Math.sign(h),
            raw: t,
          };
          p.length >= 2 && p.shift();
          const a = p.length ? p[p.length - 1] : void 0;
          if (
            (p.push(s),
            a
              ? (s.direction !== a.direction ||
                  s.delta > a.delta ||
                  s.time > a.time + 150) &&
                f(s)
              : f(s),
            (function (t) {
              const s = e.params.mousewheel;
              if (t.direction < 0) {
                if (e.isEnd && !e.params.loop && s.releaseOnEdges) return !0;
              } else if (e.isBeginning && !e.params.loop && s.releaseOnEdges)
                return !0;
              return !1;
            })(s))
          )
            return !0;
        }
        return s.preventDefault ? s.preventDefault() : (s.returnValue = !1), !1;
      }
      function v(t) {
        let s = e.$el;
        "container" !== e.params.mousewheel.eventsTarget &&
          (s = d(e.params.mousewheel.eventsTarget)),
          s[t]("mouseenter", h),
          s[t]("mouseleave", m),
          s[t]("wheel", g);
      }
      function w() {
        return e.params.cssMode
          ? (e.wrapperEl.removeEventListener("wheel", g), !0)
          : !e.mousewheel.enabled && (v("on"), (e.mousewheel.enabled = !0), !0);
      }
      function b() {
        return e.params.cssMode
          ? (e.wrapperEl.addEventListener(event, g), !0)
          : !!e.mousewheel.enabled &&
              (v("off"), (e.mousewheel.enabled = !1), !0);
      }
      s("init", () => {
        !e.params.mousewheel.enabled && e.params.cssMode && b(),
          e.params.mousewheel.enabled && w();
      }),
        s("destroy", () => {
          e.params.cssMode && w(), e.mousewheel.enabled && b();
        }),
        Object.assign(e.mousewheel, { enable: w, disable: b });
    },
    function ({ swiper: e, extendParams: t, on: s, emit: a }) {
      function i(t) {
        let s;
        return (
          t &&
            ((s = d(t)),
            e.params.uniqueNavElements &&
              "string" == typeof t &&
              s.length > 1 &&
              1 === e.$el.find(t).length &&
              (s = e.$el.find(t))),
          s
        );
      }
      function r(t, s) {
        const a = e.params.navigation;
        t &&
          t.length > 0 &&
          (t[s ? "addClass" : "removeClass"](a.disabledClass),
          t[0] && "BUTTON" === t[0].tagName && (t[0].disabled = s),
          e.params.watchOverflow &&
            e.enabled &&
            t[e.isLocked ? "addClass" : "removeClass"](a.lockClass));
      }
      function n() {
        if (e.params.loop) return;
        const { $nextEl: t, $prevEl: s } = e.navigation;
        r(s, e.isBeginning && !e.params.rewind),
          r(t, e.isEnd && !e.params.rewind);
      }
      function l(t) {
        t.preventDefault(),
          (!e.isBeginning || e.params.loop || e.params.rewind) && e.slidePrev();
      }
      function o(t) {
        t.preventDefault(),
          (!e.isEnd || e.params.loop || e.params.rewind) && e.slideNext();
      }
      function p() {
        const t = e.params.navigation;
        if (
          ((e.params.navigation = Y(
            e,
            e.originalParams.navigation,
            e.params.navigation,
            { nextEl: "swiper-button-next", prevEl: "swiper-button-prev" }
          )),
          !t.nextEl && !t.prevEl)
        )
          return;
        const s = i(t.nextEl),
          a = i(t.prevEl);
        s && s.length > 0 && s.on("click", o),
          a && a.length > 0 && a.on("click", l),
          Object.assign(e.navigation, {
            $nextEl: s,
            nextEl: s && s[0],
            $prevEl: a,
            prevEl: a && a[0],
          }),
          e.enabled ||
            (s && s.addClass(t.lockClass), a && a.addClass(t.lockClass));
      }
      function c() {
        const { $nextEl: t, $prevEl: s } = e.navigation;
        t &&
          t.length &&
          (t.off("click", o), t.removeClass(e.params.navigation.disabledClass)),
          s &&
            s.length &&
            (s.off("click", l),
            s.removeClass(e.params.navigation.disabledClass));
      }
      t({
        navigation: {
          nextEl: null,
          prevEl: null,
          hideOnClick: !1,
          disabledClass: "swiper-button-disabled",
          hiddenClass: "swiper-button-hidden",
          lockClass: "swiper-button-lock",
        },
      }),
        (e.navigation = {
          nextEl: null,
          $nextEl: null,
          prevEl: null,
          $prevEl: null,
        }),
        s("init", () => {
          p(), n();
        }),
        s("toEdge fromEdge lock unlock", () => {
          n();
        }),
        s("destroy", () => {
          c();
        }),
        s("enable disable", () => {
          const { $nextEl: t, $prevEl: s } = e.navigation;
          t &&
            t[e.enabled ? "removeClass" : "addClass"](
              e.params.navigation.lockClass
            ),
            s &&
              s[e.enabled ? "removeClass" : "addClass"](
                e.params.navigation.lockClass
              );
        }),
        s("click", (t, s) => {
          const { $nextEl: i, $prevEl: r } = e.navigation,
            n = s.target;
          if (e.params.navigation.hideOnClick && !d(n).is(r) && !d(n).is(i)) {
            if (
              e.pagination &&
              e.params.pagination &&
              e.params.pagination.clickable &&
              (e.pagination.el === n || e.pagination.el.contains(n))
            )
              return;
            let t;
            i
              ? (t = i.hasClass(e.params.navigation.hiddenClass))
              : r && (t = r.hasClass(e.params.navigation.hiddenClass)),
              a(!0 === t ? "navigationShow" : "navigationHide"),
              i && i.toggleClass(e.params.navigation.hiddenClass),
              r && r.toggleClass(e.params.navigation.hiddenClass);
          }
        }),
        Object.assign(e.navigation, { update: n, init: p, destroy: c });
    },
    function ({ swiper: e, extendParams: t, on: s, emit: a }) {
      const i = "swiper-pagination";
      let r;
      t({
        pagination: {
          el: null,
          bulletElement: "span",
          clickable: !1,
          hideOnClick: !1,
          renderBullet: null,
          renderProgressbar: null,
          renderFraction: null,
          renderCustom: null,
          progressbarOpposite: !1,
          type: "bullets",
          dynamicBullets: !1,
          dynamicMainBullets: 1,
          formatFractionCurrent: (e) => e,
          formatFractionTotal: (e) => e,
          bulletClass: `${i}-bullet`,
          bulletActiveClass: `${i}-bullet-active`,
          modifierClass: `${i}-`,
          currentClass: `${i}-current`,
          totalClass: `${i}-total`,
          hiddenClass: `${i}-hidden`,
          progressbarFillClass: `${i}-progressbar-fill`,
          progressbarOppositeClass: `${i}-progressbar-opposite`,
          clickableClass: `${i}-clickable`,
          lockClass: `${i}-lock`,
          horizontalClass: `${i}-horizontal`,
          verticalClass: `${i}-vertical`,
        },
      }),
        (e.pagination = { el: null, $el: null, bullets: [] });
      let n = 0;
      function l() {
        return (
          !e.params.pagination.el ||
          !e.pagination.el ||
          !e.pagination.$el ||
          0 === e.pagination.$el.length
        );
      }
      function o(t, s) {
        const { bulletActiveClass: a } = e.params.pagination;
        t[s]().addClass(`${a}-${s}`)[s]().addClass(`${a}-${s}-${s}`);
      }
      function p() {
        const t = e.rtl,
          s = e.params.pagination;
        if (l()) return;
        const i =
            e.virtual && e.params.virtual.enabled
              ? e.virtual.slides.length
              : e.slides.length,
          p = e.pagination.$el;
        let c;
        const u = e.params.loop
          ? Math.ceil((i - 2 * e.loopedSlides) / e.params.slidesPerGroup)
          : e.snapGrid.length;
        if (
          (e.params.loop
            ? ((c = Math.ceil(
                (e.activeIndex - e.loopedSlides) / e.params.slidesPerGroup
              )),
              c > i - 1 - 2 * e.loopedSlides && (c -= i - 2 * e.loopedSlides),
              c > u - 1 && (c -= u),
              c < 0 && "bullets" !== e.params.paginationType && (c = u + c))
            : (c = void 0 !== e.snapIndex ? e.snapIndex : e.activeIndex || 0),
          "bullets" === s.type &&
            e.pagination.bullets &&
            e.pagination.bullets.length > 0)
        ) {
          const a = e.pagination.bullets;
          let i, l, u;
          if (
            (s.dynamicBullets &&
              ((r = a
                .eq(0)
                [e.isHorizontal() ? "outerWidth" : "outerHeight"](!0)),
              p.css(
                e.isHorizontal() ? "width" : "height",
                r * (s.dynamicMainBullets + 4) + "px"
              ),
              s.dynamicMainBullets > 1 &&
                void 0 !== e.previousIndex &&
                ((n += c - (e.previousIndex - e.loopedSlides || 0)),
                n > s.dynamicMainBullets - 1
                  ? (n = s.dynamicMainBullets - 1)
                  : n < 0 && (n = 0)),
              (i = Math.max(c - n, 0)),
              (l = i + (Math.min(a.length, s.dynamicMainBullets) - 1)),
              (u = (l + i) / 2)),
            a.removeClass(
              ["", "-next", "-next-next", "-prev", "-prev-prev", "-main"]
                .map((e) => `${s.bulletActiveClass}${e}`)
                .join(" ")
            ),
            p.length > 1)
          )
            a.each((e) => {
              const t = d(e),
                a = t.index();
              a === c && t.addClass(s.bulletActiveClass),
                s.dynamicBullets &&
                  (a >= i &&
                    a <= l &&
                    t.addClass(`${s.bulletActiveClass}-main`),
                  a === i && o(t, "prev"),
                  a === l && o(t, "next"));
            });
          else {
            const t = a.eq(c),
              r = t.index();
            if ((t.addClass(s.bulletActiveClass), s.dynamicBullets)) {
              const t = a.eq(i),
                n = a.eq(l);
              for (let e = i; e <= l; e += 1)
                a.eq(e).addClass(`${s.bulletActiveClass}-main`);
              if (e.params.loop)
                if (r >= a.length) {
                  for (let e = s.dynamicMainBullets; e >= 0; e -= 1)
                    a.eq(a.length - e).addClass(`${s.bulletActiveClass}-main`);
                  a.eq(a.length - s.dynamicMainBullets - 1).addClass(
                    `${s.bulletActiveClass}-prev`
                  );
                } else o(t, "prev"), o(n, "next");
              else o(t, "prev"), o(n, "next");
            }
          }
          if (s.dynamicBullets) {
            const i = Math.min(a.length, s.dynamicMainBullets + 4),
              n = (r * i - r) / 2 - u * r,
              l = t ? "right" : "left";
            a.css(e.isHorizontal() ? l : "top", `${n}px`);
          }
        }
        if (
          ("fraction" === s.type &&
            (p.find(W(s.currentClass)).text(s.formatFractionCurrent(c + 1)),
            p.find(W(s.totalClass)).text(s.formatFractionTotal(u))),
          "progressbar" === s.type)
        ) {
          let t;
          t = s.progressbarOpposite
            ? e.isHorizontal()
              ? "vertical"
              : "horizontal"
            : e.isHorizontal()
            ? "horizontal"
            : "vertical";
          const a = (c + 1) / u;
          let i = 1,
            r = 1;
          "horizontal" === t ? (i = a) : (r = a),
            p
              .find(W(s.progressbarFillClass))
              .transform(`translate3d(0,0,0) scaleX(${i}) scaleY(${r})`)
              .transition(e.params.speed);
        }
        "custom" === s.type && s.renderCustom
          ? (p.html(s.renderCustom(e, c + 1, u)), a("paginationRender", p[0]))
          : a("paginationUpdate", p[0]),
          e.params.watchOverflow &&
            e.enabled &&
            p[e.isLocked ? "addClass" : "removeClass"](s.lockClass);
      }
      function c() {
        const t = e.params.pagination;
        if (l()) return;
        const s =
            e.virtual && e.params.virtual.enabled
              ? e.virtual.slides.length
              : e.slides.length,
          i = e.pagination.$el;
        let r = "";
        if ("bullets" === t.type) {
          let a = e.params.loop
            ? Math.ceil((s - 2 * e.loopedSlides) / e.params.slidesPerGroup)
            : e.snapGrid.length;
          e.params.freeMode &&
            e.params.freeMode.enabled &&
            !e.params.loop &&
            a > s &&
            (a = s);
          for (let s = 0; s < a; s += 1)
            t.renderBullet
              ? (r += t.renderBullet.call(e, s, t.bulletClass))
              : (r += `<${t.bulletElement} class="${t.bulletClass}"></${t.bulletElement}>`);
          i.html(r), (e.pagination.bullets = i.find(W(t.bulletClass)));
        }
        "fraction" === t.type &&
          ((r = t.renderFraction
            ? t.renderFraction.call(e, t.currentClass, t.totalClass)
            : `<span class="${t.currentClass}"></span> / <span class="${t.totalClass}"></span>`),
          i.html(r)),
          "progressbar" === t.type &&
            ((r = t.renderProgressbar
              ? t.renderProgressbar.call(e, t.progressbarFillClass)
              : `<span class="${t.progressbarFillClass}"></span>`),
            i.html(r)),
          "custom" !== t.type && a("paginationRender", e.pagination.$el[0]);
      }
      function u() {
        e.params.pagination = Y(
          e,
          e.originalParams.pagination,
          e.params.pagination,
          { el: "swiper-pagination" }
        );
        const t = e.params.pagination;
        if (!t.el) return;
        let s = d(t.el);
        0 !== s.length &&
          (e.params.uniqueNavElements &&
            "string" == typeof t.el &&
            s.length > 1 &&
            ((s = e.$el.find(t.el)),
            s.length > 1 &&
              (s = s.filter((t) => d(t).parents(".swiper")[0] === e.el))),
          "bullets" === t.type && t.clickable && s.addClass(t.clickableClass),
          s.addClass(t.modifierClass + t.type),
          s.addClass(t.modifierClass + e.params.direction),
          "bullets" === t.type &&
            t.dynamicBullets &&
            (s.addClass(`${t.modifierClass}${t.type}-dynamic`),
            (n = 0),
            t.dynamicMainBullets < 1 && (t.dynamicMainBullets = 1)),
          "progressbar" === t.type &&
            t.progressbarOpposite &&
            s.addClass(t.progressbarOppositeClass),
          t.clickable &&
            s.on("click", W(t.bulletClass), function (t) {
              t.preventDefault();
              let s = d(this).index() * e.params.slidesPerGroup;
              e.params.loop && (s += e.loopedSlides), e.slideTo(s);
            }),
          Object.assign(e.pagination, { $el: s, el: s[0] }),
          e.enabled || s.addClass(t.lockClass));
      }
      function h() {
        const t = e.params.pagination;
        if (l()) return;
        const s = e.pagination.$el;
        s.removeClass(t.hiddenClass),
          s.removeClass(t.modifierClass + t.type),
          s.removeClass(t.modifierClass + e.params.direction),
          e.pagination.bullets &&
            e.pagination.bullets.removeClass &&
            e.pagination.bullets.removeClass(t.bulletActiveClass),
          t.clickable && s.off("click", W(t.bulletClass));
      }
      s("init", () => {
        u(), c(), p();
      }),
        s("activeIndexChange", () => {
          (e.params.loop || void 0 === e.snapIndex) && p();
        }),
        s("snapIndexChange", () => {
          e.params.loop || p();
        }),
        s("slidesLengthChange", () => {
          e.params.loop && (c(), p());
        }),
        s("snapGridLengthChange", () => {
          e.params.loop || (c(), p());
        }),
        s("destroy", () => {
          h();
        }),
        s("enable disable", () => {
          const { $el: t } = e.pagination;
          t &&
            t[e.enabled ? "removeClass" : "addClass"](
              e.params.pagination.lockClass
            );
        }),
        s("lock unlock", () => {
          p();
        }),
        s("click", (t, s) => {
          const i = s.target,
            { $el: r } = e.pagination;
          if (
            e.params.pagination.el &&
            e.params.pagination.hideOnClick &&
            r.length > 0 &&
            !d(i).hasClass(e.params.pagination.bulletClass)
          ) {
            if (
              e.navigation &&
              ((e.navigation.nextEl && i === e.navigation.nextEl) ||
                (e.navigation.prevEl && i === e.navigation.prevEl))
            )
              return;
            const t = r.hasClass(e.params.pagination.hiddenClass);
            a(!0 === t ? "paginationShow" : "paginationHide"),
              r.toggleClass(e.params.pagination.hiddenClass);
          }
        }),
        Object.assign(e.pagination, {
          render: c,
          update: p,
          init: u,
          destroy: h,
        });
    },
    function ({ swiper: e, extendParams: t, on: s, emit: i }) {
      const r = a();
      let n,
        l,
        o,
        p,
        u = !1,
        h = null,
        m = null;
      function f() {
        if (!e.params.scrollbar.el || !e.scrollbar.el) return;
        const { scrollbar: t, rtlTranslate: s, progress: a } = e,
          { $dragEl: i, $el: r } = t,
          n = e.params.scrollbar;
        let d = l,
          p = (o - l) * a;
        s
          ? ((p = -p),
            p > 0 ? ((d = l - p), (p = 0)) : -p + l > o && (d = o + p))
          : p < 0
          ? ((d = l + p), (p = 0))
          : p + l > o && (d = o - p),
          e.isHorizontal()
            ? (i.transform(`translate3d(${p}px, 0, 0)`),
              (i[0].style.width = `${d}px`))
            : (i.transform(`translate3d(0px, ${p}px, 0)`),
              (i[0].style.height = `${d}px`)),
          n.hide &&
            (clearTimeout(h),
            (r[0].style.opacity = 1),
            (h = setTimeout(() => {
              (r[0].style.opacity = 0), r.transition(400);
            }, 1e3)));
      }
      function g() {
        if (!e.params.scrollbar.el || !e.scrollbar.el) return;
        const { scrollbar: t } = e,
          { $dragEl: s, $el: a } = t;
        (s[0].style.width = ""),
          (s[0].style.height = ""),
          (o = e.isHorizontal() ? a[0].offsetWidth : a[0].offsetHeight),
          (p =
            e.size /
            (e.virtualSize +
              e.params.slidesOffsetBefore -
              (e.params.centeredSlides ? e.snapGrid[0] : 0))),
          (l =
            "auto" === e.params.scrollbar.dragSize
              ? o * p
              : parseInt(e.params.scrollbar.dragSize, 10)),
          e.isHorizontal()
            ? (s[0].style.width = `${l}px`)
            : (s[0].style.height = `${l}px`),
          (a[0].style.display = p >= 1 ? "none" : ""),
          e.params.scrollbar.hide && (a[0].style.opacity = 0),
          e.params.watchOverflow &&
            e.enabled &&
            t.$el[e.isLocked ? "addClass" : "removeClass"](
              e.params.scrollbar.lockClass
            );
      }
      function v(t) {
        return e.isHorizontal()
          ? "touchstart" === t.type || "touchmove" === t.type
            ? t.targetTouches[0].clientX
            : t.clientX
          : "touchstart" === t.type || "touchmove" === t.type
          ? t.targetTouches[0].clientY
          : t.clientY;
      }
      function w(t) {
        const { scrollbar: s, rtlTranslate: a } = e,
          { $el: i } = s;
        let r;
        (r =
          (v(t) -
            i.offset()[e.isHorizontal() ? "left" : "top"] -
            (null !== n ? n : l / 2)) /
          (o - l)),
          (r = Math.max(Math.min(r, 1), 0)),
          a && (r = 1 - r);
        const d = e.minTranslate() + (e.maxTranslate() - e.minTranslate()) * r;
        e.updateProgress(d),
          e.setTranslate(d),
          e.updateActiveIndex(),
          e.updateSlidesClasses();
      }
      function b(t) {
        const s = e.params.scrollbar,
          { scrollbar: a, $wrapperEl: r } = e,
          { $el: l, $dragEl: o } = a;
        (u = !0),
          (n =
            t.target === o[0] || t.target === o
              ? v(t) -
                t.target.getBoundingClientRect()[
                  e.isHorizontal() ? "left" : "top"
                ]
              : null),
          t.preventDefault(),
          t.stopPropagation(),
          r.transition(100),
          o.transition(100),
          w(t),
          clearTimeout(m),
          l.transition(0),
          s.hide && l.css("opacity", 1),
          e.params.cssMode && e.$wrapperEl.css("scroll-snap-type", "none"),
          i("scrollbarDragStart", t);
      }
      function x(t) {
        const { scrollbar: s, $wrapperEl: a } = e,
          { $el: r, $dragEl: n } = s;
        u &&
          (t.preventDefault ? t.preventDefault() : (t.returnValue = !1),
          w(t),
          a.transition(0),
          r.transition(0),
          n.transition(0),
          i("scrollbarDragMove", t));
      }
      function y(t) {
        const s = e.params.scrollbar,
          { scrollbar: a, $wrapperEl: r } = e,
          { $el: n } = a;
        u &&
          ((u = !1),
          e.params.cssMode &&
            (e.$wrapperEl.css("scroll-snap-type", ""), r.transition("")),
          s.hide &&
            (clearTimeout(m),
            (m = c(() => {
              n.css("opacity", 0), n.transition(400);
            }, 1e3))),
          i("scrollbarDragEnd", t),
          s.snapOnRelease && e.slideToClosest());
      }
      function E(t) {
        const {
            scrollbar: s,
            touchEventsTouch: a,
            touchEventsDesktop: i,
            params: n,
            support: l,
          } = e,
          o = s.$el[0],
          d = !(!l.passiveListener || !n.passiveListeners) && {
            passive: !1,
            capture: !1,
          },
          p = !(!l.passiveListener || !n.passiveListeners) && {
            passive: !0,
            capture: !1,
          };
        if (!o) return;
        const c = "on" === t ? "addEventListener" : "removeEventListener";
        l.touch
          ? (o[c](a.start, b, d), o[c](a.move, x, d), o[c](a.end, y, p))
          : (o[c](i.start, b, d), r[c](i.move, x, d), r[c](i.end, y, p));
      }
      function T() {
        const { scrollbar: t, $el: s } = e;
        e.params.scrollbar = Y(
          e,
          e.originalParams.scrollbar,
          e.params.scrollbar,
          { el: "swiper-scrollbar" }
        );
        const a = e.params.scrollbar;
        if (!a.el) return;
        let i = d(a.el);
        e.params.uniqueNavElements &&
          "string" == typeof a.el &&
          i.length > 1 &&
          1 === s.find(a.el).length &&
          (i = s.find(a.el));
        let r = i.find(`.${e.params.scrollbar.dragClass}`);
        0 === r.length &&
          ((r = d(`<div class="${e.params.scrollbar.dragClass}"></div>`)),
          i.append(r)),
          Object.assign(t, { $el: i, el: i[0], $dragEl: r, dragEl: r[0] }),
          a.draggable && e.params.scrollbar.el && E("on"),
          i &&
            i[e.enabled ? "removeClass" : "addClass"](
              e.params.scrollbar.lockClass
            );
      }
      function C() {
        e.params.scrollbar.el && E("off");
      }
      t({
        scrollbar: {
          el: null,
          dragSize: "auto",
          hide: !1,
          draggable: !1,
          snapOnRelease: !0,
          lockClass: "swiper-scrollbar-lock",
          dragClass: "swiper-scrollbar-drag",
        },
      }),
        (e.scrollbar = { el: null, dragEl: null, $el: null, $dragEl: null }),
        s("init", () => {
          T(), g(), f();
        }),
        s("update resize observerUpdate lock unlock", () => {
          g();
        }),
        s("setTranslate", () => {
          f();
        }),
        s("setTransition", (t, s) => {
          !(function (t) {
            e.params.scrollbar.el &&
              e.scrollbar.el &&
              e.scrollbar.$dragEl.transition(t);
          })(s);
        }),
        s("enable disable", () => {
          const { $el: t } = e.scrollbar;
          t &&
            t[e.enabled ? "removeClass" : "addClass"](
              e.params.scrollbar.lockClass
            );
        }),
        s("destroy", () => {
          C();
        }),
        Object.assign(e.scrollbar, {
          updateSize: g,
          setTranslate: f,
          init: T,
          destroy: C,
        });
    },
    function ({ swiper: e, extendParams: t, on: s }) {
      t({ parallax: { enabled: !1 } });
      const a = (t, s) => {
          const { rtl: a } = e,
            i = d(t),
            r = a ? -1 : 1,
            n = i.attr("data-swiper-parallax") || "0";
          let l = i.attr("data-swiper-parallax-x"),
            o = i.attr("data-swiper-parallax-y");
          const p = i.attr("data-swiper-parallax-scale"),
            c = i.attr("data-swiper-parallax-opacity");
          if (
            (l || o
              ? ((l = l || "0"), (o = o || "0"))
              : e.isHorizontal()
              ? ((l = n), (o = "0"))
              : ((o = n), (l = "0")),
            (l =
              l.indexOf("%") >= 0
                ? parseInt(l, 10) * s * r + "%"
                : l * s * r + "px"),
            (o =
              o.indexOf("%") >= 0 ? parseInt(o, 10) * s + "%" : o * s + "px"),
            null != c)
          ) {
            const e = c - (c - 1) * (1 - Math.abs(s));
            i[0].style.opacity = e;
          }
          if (null == p) i.transform(`translate3d(${l}, ${o}, 0px)`);
          else {
            const e = p - (p - 1) * (1 - Math.abs(s));
            i.transform(`translate3d(${l}, ${o}, 0px) scale(${e})`);
          }
        },
        i = () => {
          const { $el: t, slides: s, progress: i, snapGrid: r } = e;
          t
            .children(
              "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]"
            )
            .each((e) => {
              a(e, i);
            }),
            s.each((t, s) => {
              let n = t.progress;
              e.params.slidesPerGroup > 1 &&
                "auto" !== e.params.slidesPerView &&
                (n += Math.ceil(s / 2) - i * (r.length - 1)),
                (n = Math.min(Math.max(n, -1), 1)),
                d(t)
                  .find(
                    "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]"
                  )
                  .each((e) => {
                    a(e, n);
                  });
            });
        };
      s("beforeInit", () => {
        e.params.parallax.enabled &&
          ((e.params.watchSlidesProgress = !0),
          (e.originalParams.watchSlidesProgress = !0));
      }),
        s("init", () => {
          e.params.parallax.enabled && i();
        }),
        s("setTranslate", () => {
          e.params.parallax.enabled && i();
        }),
        s("setTransition", (t, s) => {
          e.params.parallax.enabled &&
            ((t = e.params.speed) => {
              const { $el: s } = e;
              s.find(
                "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]"
              ).each((e) => {
                const s = d(e);
                let a =
                  parseInt(s.attr("data-swiper-parallax-duration"), 10) || t;
                0 === t && (a = 0), s.transition(a);
              });
            })(s);
        });
    },
    function ({ swiper: e, extendParams: t, on: s, emit: a }) {
      const i = r();
      t({
        zoom: {
          enabled: !1,
          maxRatio: 3,
          minRatio: 1,
          toggle: !0,
          containerClass: "swiper-zoom-container",
          zoomedSlideClass: "swiper-slide-zoomed",
        },
      }),
        (e.zoom = { enabled: !1 });
      let n,
        l,
        o,
        p = 1,
        c = !1;
      const u = {
          $slideEl: void 0,
          slideWidth: void 0,
          slideHeight: void 0,
          $imageEl: void 0,
          $imageWrapEl: void 0,
          maxRatio: 3,
        },
        m = {
          isTouched: void 0,
          isMoved: void 0,
          currentX: void 0,
          currentY: void 0,
          minX: void 0,
          minY: void 0,
          maxX: void 0,
          maxY: void 0,
          width: void 0,
          height: void 0,
          startX: void 0,
          startY: void 0,
          touchesStart: {},
          touchesCurrent: {},
        },
        f = {
          x: void 0,
          y: void 0,
          prevPositionX: void 0,
          prevPositionY: void 0,
          prevTime: void 0,
        };
      let g = 1;
      function v(e) {
        if (e.targetTouches.length < 2) return 1;
        const t = e.targetTouches[0].pageX,
          s = e.targetTouches[0].pageY,
          a = e.targetTouches[1].pageX,
          i = e.targetTouches[1].pageY;
        return Math.sqrt((a - t) ** 2 + (i - s) ** 2);
      }
      function w(t) {
        const s = e.support,
          a = e.params.zoom;
        if (((l = !1), (o = !1), !s.gestures)) {
          if (
            "touchstart" !== t.type ||
            ("touchstart" === t.type && t.targetTouches.length < 2)
          )
            return;
          (l = !0), (u.scaleStart = v(t));
        }
        (u.$slideEl && u.$slideEl.length) ||
        ((u.$slideEl = d(t.target).closest(`.${e.params.slideClass}`)),
        0 === u.$slideEl.length && (u.$slideEl = e.slides.eq(e.activeIndex)),
        (u.$imageEl = u.$slideEl
          .find(`.${a.containerClass}`)
          .eq(0)
          .find("picture, img, svg, canvas, .swiper-zoom-target")
          .eq(0)),
        (u.$imageWrapEl = u.$imageEl.parent(`.${a.containerClass}`)),
        (u.maxRatio = u.$imageWrapEl.attr("data-swiper-zoom") || a.maxRatio),
        0 !== u.$imageWrapEl.length)
          ? (u.$imageEl && u.$imageEl.transition(0), (c = !0))
          : (u.$imageEl = void 0);
      }
      function b(t) {
        const s = e.support,
          a = e.params.zoom,
          i = e.zoom;
        if (!s.gestures) {
          if (
            "touchmove" !== t.type ||
            ("touchmove" === t.type && t.targetTouches.length < 2)
          )
            return;
          (o = !0), (u.scaleMove = v(t));
        }
        u.$imageEl && 0 !== u.$imageEl.length
          ? (s.gestures
              ? (i.scale = t.scale * p)
              : (i.scale = (u.scaleMove / u.scaleStart) * p),
            i.scale > u.maxRatio &&
              (i.scale = u.maxRatio - 1 + (i.scale - u.maxRatio + 1) ** 0.5),
            i.scale < a.minRatio &&
              (i.scale = a.minRatio + 1 - (a.minRatio - i.scale + 1) ** 0.5),
            u.$imageEl.transform(`translate3d(0,0,0) scale(${i.scale})`))
          : "gesturechange" === t.type && w(t);
      }
      function x(t) {
        const s = e.device,
          a = e.support,
          i = e.params.zoom,
          r = e.zoom;
        if (!a.gestures) {
          if (!l || !o) return;
          if (
            "touchend" !== t.type ||
            ("touchend" === t.type && t.changedTouches.length < 2 && !s.android)
          )
            return;
          (l = !1), (o = !1);
        }
        u.$imageEl &&
          0 !== u.$imageEl.length &&
          ((r.scale = Math.max(Math.min(r.scale, u.maxRatio), i.minRatio)),
          u.$imageEl
            .transition(e.params.speed)
            .transform(`translate3d(0,0,0) scale(${r.scale})`),
          (p = r.scale),
          (c = !1),
          1 === r.scale && (u.$slideEl = void 0));
      }
      function y(t) {
        const s = e.zoom;
        if (!u.$imageEl || 0 === u.$imageEl.length) return;
        if (((e.allowClick = !1), !m.isTouched || !u.$slideEl)) return;
        m.isMoved ||
          ((m.width = u.$imageEl[0].offsetWidth),
          (m.height = u.$imageEl[0].offsetHeight),
          (m.startX = h(u.$imageWrapEl[0], "x") || 0),
          (m.startY = h(u.$imageWrapEl[0], "y") || 0),
          (u.slideWidth = u.$slideEl[0].offsetWidth),
          (u.slideHeight = u.$slideEl[0].offsetHeight),
          u.$imageWrapEl.transition(0));
        const a = m.width * s.scale,
          i = m.height * s.scale;
        if (!(a < u.slideWidth && i < u.slideHeight)) {
          if (
            ((m.minX = Math.min(u.slideWidth / 2 - a / 2, 0)),
            (m.maxX = -m.minX),
            (m.minY = Math.min(u.slideHeight / 2 - i / 2, 0)),
            (m.maxY = -m.minY),
            (m.touchesCurrent.x =
              "touchmove" === t.type ? t.targetTouches[0].pageX : t.pageX),
            (m.touchesCurrent.y =
              "touchmove" === t.type ? t.targetTouches[0].pageY : t.pageY),
            !m.isMoved && !c)
          ) {
            if (
              e.isHorizontal() &&
              ((Math.floor(m.minX) === Math.floor(m.startX) &&
                m.touchesCurrent.x < m.touchesStart.x) ||
                (Math.floor(m.maxX) === Math.floor(m.startX) &&
                  m.touchesCurrent.x > m.touchesStart.x))
            )
              return void (m.isTouched = !1);
            if (
              !e.isHorizontal() &&
              ((Math.floor(m.minY) === Math.floor(m.startY) &&
                m.touchesCurrent.y < m.touchesStart.y) ||
                (Math.floor(m.maxY) === Math.floor(m.startY) &&
                  m.touchesCurrent.y > m.touchesStart.y))
            )
              return void (m.isTouched = !1);
          }
          t.cancelable && t.preventDefault(),
            t.stopPropagation(),
            (m.isMoved = !0),
            (m.currentX = m.touchesCurrent.x - m.touchesStart.x + m.startX),
            (m.currentY = m.touchesCurrent.y - m.touchesStart.y + m.startY),
            m.currentX < m.minX &&
              (m.currentX = m.minX + 1 - (m.minX - m.currentX + 1) ** 0.8),
            m.currentX > m.maxX &&
              (m.currentX = m.maxX - 1 + (m.currentX - m.maxX + 1) ** 0.8),
            m.currentY < m.minY &&
              (m.currentY = m.minY + 1 - (m.minY - m.currentY + 1) ** 0.8),
            m.currentY > m.maxY &&
              (m.currentY = m.maxY - 1 + (m.currentY - m.maxY + 1) ** 0.8),
            f.prevPositionX || (f.prevPositionX = m.touchesCurrent.x),
            f.prevPositionY || (f.prevPositionY = m.touchesCurrent.y),
            f.prevTime || (f.prevTime = Date.now()),
            (f.x =
              (m.touchesCurrent.x - f.prevPositionX) /
              (Date.now() - f.prevTime) /
              2),
            (f.y =
              (m.touchesCurrent.y - f.prevPositionY) /
              (Date.now() - f.prevTime) /
              2),
            Math.abs(m.touchesCurrent.x - f.prevPositionX) < 2 && (f.x = 0),
            Math.abs(m.touchesCurrent.y - f.prevPositionY) < 2 && (f.y = 0),
            (f.prevPositionX = m.touchesCurrent.x),
            (f.prevPositionY = m.touchesCurrent.y),
            (f.prevTime = Date.now()),
            u.$imageWrapEl.transform(
              `translate3d(${m.currentX}px, ${m.currentY}px,0)`
            );
        }
      }
      function E() {
        const t = e.zoom;
        u.$slideEl &&
          e.previousIndex !== e.activeIndex &&
          (u.$imageEl && u.$imageEl.transform("translate3d(0,0,0) scale(1)"),
          u.$imageWrapEl && u.$imageWrapEl.transform("translate3d(0,0,0)"),
          (t.scale = 1),
          (p = 1),
          (u.$slideEl = void 0),
          (u.$imageEl = void 0),
          (u.$imageWrapEl = void 0));
      }
      function T(t) {
        const s = e.zoom,
          a = e.params.zoom;
        if (
          (u.$slideEl ||
            (t &&
              t.target &&
              (u.$slideEl = d(t.target).closest(`.${e.params.slideClass}`)),
            u.$slideEl ||
              (e.params.virtual && e.params.virtual.enabled && e.virtual
                ? (u.$slideEl = e.$wrapperEl.children(
                    `.${e.params.slideActiveClass}`
                  ))
                : (u.$slideEl = e.slides.eq(e.activeIndex))),
            (u.$imageEl = u.$slideEl
              .find(`.${a.containerClass}`)
              .eq(0)
              .find("picture, img, svg, canvas, .swiper-zoom-target")
              .eq(0)),
            (u.$imageWrapEl = u.$imageEl.parent(`.${a.containerClass}`))),
          !u.$imageEl ||
            0 === u.$imageEl.length ||
            !u.$imageWrapEl ||
            0 === u.$imageWrapEl.length)
        )
          return;
        let r, n, l, o, c, h, f, g, v, w, b, x, y, E, T, C, $, S;
        e.params.cssMode &&
          ((e.wrapperEl.style.overflow = "hidden"),
          (e.wrapperEl.style.touchAction = "none")),
          u.$slideEl.addClass(`${a.zoomedSlideClass}`),
          void 0 === m.touchesStart.x && t
            ? ((r =
                "touchend" === t.type ? t.changedTouches[0].pageX : t.pageX),
              (n = "touchend" === t.type ? t.changedTouches[0].pageY : t.pageY))
            : ((r = m.touchesStart.x), (n = m.touchesStart.y)),
          (s.scale = u.$imageWrapEl.attr("data-swiper-zoom") || a.maxRatio),
          (p = u.$imageWrapEl.attr("data-swiper-zoom") || a.maxRatio),
          t
            ? (($ = u.$slideEl[0].offsetWidth),
              (S = u.$slideEl[0].offsetHeight),
              (l = u.$slideEl.offset().left + i.scrollX),
              (o = u.$slideEl.offset().top + i.scrollY),
              (c = l + $ / 2 - r),
              (h = o + S / 2 - n),
              (v = u.$imageEl[0].offsetWidth),
              (w = u.$imageEl[0].offsetHeight),
              (b = v * s.scale),
              (x = w * s.scale),
              (y = Math.min($ / 2 - b / 2, 0)),
              (E = Math.min(S / 2 - x / 2, 0)),
              (T = -y),
              (C = -E),
              (f = c * s.scale),
              (g = h * s.scale),
              f < y && (f = y),
              f > T && (f = T),
              g < E && (g = E),
              g > C && (g = C))
            : ((f = 0), (g = 0)),
          u.$imageWrapEl
            .transition(300)
            .transform(`translate3d(${f}px, ${g}px,0)`),
          u.$imageEl
            .transition(300)
            .transform(`translate3d(0,0,0) scale(${s.scale})`);
      }
      function C() {
        const t = e.zoom,
          s = e.params.zoom;
        u.$slideEl ||
          (e.params.virtual && e.params.virtual.enabled && e.virtual
            ? (u.$slideEl = e.$wrapperEl.children(
                `.${e.params.slideActiveClass}`
              ))
            : (u.$slideEl = e.slides.eq(e.activeIndex)),
          (u.$imageEl = u.$slideEl
            .find(`.${s.containerClass}`)
            .eq(0)
            .find("picture, img, svg, canvas, .swiper-zoom-target")
            .eq(0)),
          (u.$imageWrapEl = u.$imageEl.parent(`.${s.containerClass}`))),
          u.$imageEl &&
            0 !== u.$imageEl.length &&
            u.$imageWrapEl &&
            0 !== u.$imageWrapEl.length &&
            (e.params.cssMode &&
              ((e.wrapperEl.style.overflow = ""),
              (e.wrapperEl.style.touchAction = "")),
            (t.scale = 1),
            (p = 1),
            u.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"),
            u.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"),
            u.$slideEl.removeClass(`${s.zoomedSlideClass}`),
            (u.$slideEl = void 0));
      }
      function $(t) {
        const s = e.zoom;
        s.scale && 1 !== s.scale ? C() : T(t);
      }
      function S() {
        const t = e.support;
        return {
          passiveListener: !(
            "touchstart" !== e.touchEvents.start ||
            !t.passiveListener ||
            !e.params.passiveListeners
          ) && { passive: !0, capture: !1 },
          activeListenerWithCapture: !t.passiveListener || {
            passive: !1,
            capture: !0,
          },
        };
      }
      function M() {
        return `.${e.params.slideClass}`;
      }
      function P(t) {
        const { passiveListener: s } = S(),
          a = M();
        e.$wrapperEl[t]("gesturestart", a, w, s),
          e.$wrapperEl[t]("gesturechange", a, b, s),
          e.$wrapperEl[t]("gestureend", a, x, s);
      }
      function k() {
        n || ((n = !0), P("on"));
      }
      function z() {
        n && ((n = !1), P("off"));
      }
      function O() {
        const t = e.zoom;
        if (t.enabled) return;
        t.enabled = !0;
        const s = e.support,
          { passiveListener: a, activeListenerWithCapture: i } = S(),
          r = M();
        s.gestures
          ? (e.$wrapperEl.on(e.touchEvents.start, k, a),
            e.$wrapperEl.on(e.touchEvents.end, z, a))
          : "touchstart" === e.touchEvents.start &&
            (e.$wrapperEl.on(e.touchEvents.start, r, w, a),
            e.$wrapperEl.on(e.touchEvents.move, r, b, i),
            e.$wrapperEl.on(e.touchEvents.end, r, x, a),
            e.touchEvents.cancel &&
              e.$wrapperEl.on(e.touchEvents.cancel, r, x, a)),
          e.$wrapperEl.on(
            e.touchEvents.move,
            `.${e.params.zoom.containerClass}`,
            y,
            i
          );
      }
      function I() {
        const t = e.zoom;
        if (!t.enabled) return;
        const s = e.support;
        t.enabled = !1;
        const { passiveListener: a, activeListenerWithCapture: i } = S(),
          r = M();
        s.gestures
          ? (e.$wrapperEl.off(e.touchEvents.start, k, a),
            e.$wrapperEl.off(e.touchEvents.end, z, a))
          : "touchstart" === e.touchEvents.start &&
            (e.$wrapperEl.off(e.touchEvents.start, r, w, a),
            e.$wrapperEl.off(e.touchEvents.move, r, b, i),
            e.$wrapperEl.off(e.touchEvents.end, r, x, a),
            e.touchEvents.cancel &&
              e.$wrapperEl.off(e.touchEvents.cancel, r, x, a)),
          e.$wrapperEl.off(
            e.touchEvents.move,
            `.${e.params.zoom.containerClass}`,
            y,
            i
          );
      }
      Object.defineProperty(e.zoom, "scale", {
        get: () => g,
        set(e) {
          if (g !== e) {
            const t = u.$imageEl ? u.$imageEl[0] : void 0,
              s = u.$slideEl ? u.$slideEl[0] : void 0;
            a("zoomChange", e, t, s);
          }
          g = e;
        },
      }),
        s("init", () => {
          e.params.zoom.enabled && O();
        }),
        s("destroy", () => {
          I();
        }),
        s("touchStart", (t, s) => {
          e.zoom.enabled &&
            (function (t) {
              const s = e.device;
              u.$imageEl &&
                0 !== u.$imageEl.length &&
                (m.isTouched ||
                  (s.android && t.cancelable && t.preventDefault(),
                  (m.isTouched = !0),
                  (m.touchesStart.x =
                    "touchstart" === t.type
                      ? t.targetTouches[0].pageX
                      : t.pageX),
                  (m.touchesStart.y =
                    "touchstart" === t.type
                      ? t.targetTouches[0].pageY
                      : t.pageY)));
            })(s);
        }),
        s("touchEnd", (t, s) => {
          e.zoom.enabled &&
            (function () {
              const t = e.zoom;
              if (!u.$imageEl || 0 === u.$imageEl.length) return;
              if (!m.isTouched || !m.isMoved)
                return (m.isTouched = !1), void (m.isMoved = !1);
              (m.isTouched = !1), (m.isMoved = !1);
              let s = 300,
                a = 300;
              const i = f.x * s,
                r = m.currentX + i,
                n = f.y * a,
                l = m.currentY + n;
              0 !== f.x && (s = Math.abs((r - m.currentX) / f.x)),
                0 !== f.y && (a = Math.abs((l - m.currentY) / f.y));
              const o = Math.max(s, a);
              (m.currentX = r), (m.currentY = l);
              const d = m.width * t.scale,
                p = m.height * t.scale;
              (m.minX = Math.min(u.slideWidth / 2 - d / 2, 0)),
                (m.maxX = -m.minX),
                (m.minY = Math.min(u.slideHeight / 2 - p / 2, 0)),
                (m.maxY = -m.minY),
                (m.currentX = Math.max(Math.min(m.currentX, m.maxX), m.minX)),
                (m.currentY = Math.max(Math.min(m.currentY, m.maxY), m.minY)),
                u.$imageWrapEl
                  .transition(o)
                  .transform(`translate3d(${m.currentX}px, ${m.currentY}px,0)`);
            })();
        }),
        s("doubleTap", (t, s) => {
          !e.animating &&
            e.params.zoom.enabled &&
            e.zoom.enabled &&
            e.params.zoom.toggle &&
            $(s);
        }),
        s("transitionEnd", () => {
          e.zoom.enabled && e.params.zoom.enabled && E();
        }),
        s("slideChange", () => {
          e.zoom.enabled && e.params.zoom.enabled && e.params.cssMode && E();
        }),
        Object.assign(e.zoom, {
          enable: O,
          disable: I,
          in: T,
          out: C,
          toggle: $,
        });
    },
    function ({ swiper: e, extendParams: t, on: s, emit: a }) {
      t({
        lazy: {
          checkInView: !1,
          enabled: !1,
          loadPrevNext: !1,
          loadPrevNextAmount: 1,
          loadOnTransitionStart: !1,
          scrollingElement: "",
          elementClass: "swiper-lazy",
          loadingClass: "swiper-lazy-loading",
          loadedClass: "swiper-lazy-loaded",
          preloaderClass: "swiper-lazy-preloader",
        },
      }),
        (e.lazy = {});
      let i = !1,
        n = !1;
      function l(t, s = !0) {
        const i = e.params.lazy;
        if (void 0 === t) return;
        if (0 === e.slides.length) return;
        const r =
            e.virtual && e.params.virtual.enabled
              ? e.$wrapperEl.children(
                  `.${e.params.slideClass}[data-swiper-slide-index="${t}"]`
                )
              : e.slides.eq(t),
          n = r.find(
            `.${i.elementClass}:not(.${i.loadedClass}):not(.${i.loadingClass})`
          );
        !r.hasClass(i.elementClass) ||
          r.hasClass(i.loadedClass) ||
          r.hasClass(i.loadingClass) ||
          n.push(r[0]),
          0 !== n.length &&
            n.each((t) => {
              const n = d(t);
              n.addClass(i.loadingClass);
              const o = n.attr("data-background"),
                p = n.attr("data-src"),
                c = n.attr("data-srcset"),
                u = n.attr("data-sizes"),
                h = n.parent("picture");
              e.loadImage(n[0], p || o, c, u, !1, () => {
                if (null != e && e && (!e || e.params) && !e.destroyed) {
                  if (
                    (o
                      ? (n.css("background-image", `url("${o}")`),
                        n.removeAttr("data-background"))
                      : (c &&
                          (n.attr("srcset", c), n.removeAttr("data-srcset")),
                        u && (n.attr("sizes", u), n.removeAttr("data-sizes")),
                        h.length &&
                          h.children("source").each((e) => {
                            const t = d(e);
                            t.attr("data-srcset") &&
                              (t.attr("srcset", t.attr("data-srcset")),
                              t.removeAttr("data-srcset"));
                          }),
                        p && (n.attr("src", p), n.removeAttr("data-src"))),
                    n.addClass(i.loadedClass).removeClass(i.loadingClass),
                    r.find(`.${i.preloaderClass}`).remove(),
                    e.params.loop && s)
                  ) {
                    const t = r.attr("data-swiper-slide-index");
                    if (r.hasClass(e.params.slideDuplicateClass)) {
                      l(
                        e.$wrapperEl
                          .children(
                            `[data-swiper-slide-index="${t}"]:not(.${e.params.slideDuplicateClass})`
                          )
                          .index(),
                        !1
                      );
                    } else {
                      l(
                        e.$wrapperEl
                          .children(
                            `.${e.params.slideDuplicateClass}[data-swiper-slide-index="${t}"]`
                          )
                          .index(),
                        !1
                      );
                    }
                  }
                  a("lazyImageReady", r[0], n[0]),
                    e.params.autoHeight && e.updateAutoHeight();
                }
              }),
                a("lazyImageLoad", r[0], n[0]);
            });
      }
      function o() {
        const { $wrapperEl: t, params: s, slides: a, activeIndex: i } = e,
          r = e.virtual && s.virtual.enabled,
          o = s.lazy;
        let p = s.slidesPerView;
        function c(e) {
          if (r) {
            if (
              t.children(`.${s.slideClass}[data-swiper-slide-index="${e}"]`)
                .length
            )
              return !0;
          } else if (a[e]) return !0;
          return !1;
        }
        function u(e) {
          return r ? d(e).attr("data-swiper-slide-index") : d(e).index();
        }
        if (
          ("auto" === p && (p = 0), n || (n = !0), e.params.watchSlidesProgress)
        )
          t.children(`.${s.slideVisibleClass}`).each((e) => {
            l(r ? d(e).attr("data-swiper-slide-index") : d(e).index());
          });
        else if (p > 1) for (let e = i; e < i + p; e += 1) c(e) && l(e);
        else l(i);
        if (o.loadPrevNext)
          if (p > 1 || (o.loadPrevNextAmount && o.loadPrevNextAmount > 1)) {
            const e = o.loadPrevNextAmount,
              t = p,
              s = Math.min(i + t + Math.max(e, t), a.length),
              r = Math.max(i - Math.max(t, e), 0);
            for (let e = i + p; e < s; e += 1) c(e) && l(e);
            for (let e = r; e < i; e += 1) c(e) && l(e);
          } else {
            const e = t.children(`.${s.slideNextClass}`);
            e.length > 0 && l(u(e));
            const a = t.children(`.${s.slidePrevClass}`);
            a.length > 0 && l(u(a));
          }
      }
      function p() {
        const t = r();
        if (!e || e.destroyed) return;
        const s = e.params.lazy.scrollingElement
            ? d(e.params.lazy.scrollingElement)
            : d(t),
          a = s[0] === t,
          n = a ? t.innerWidth : s[0].offsetWidth,
          l = a ? t.innerHeight : s[0].offsetHeight,
          c = e.$el.offset(),
          { rtlTranslate: u } = e;
        let h = !1;
        u && (c.left -= e.$el[0].scrollLeft);
        const m = [
          [c.left, c.top],
          [c.left + e.width, c.top],
          [c.left, c.top + e.height],
          [c.left + e.width, c.top + e.height],
        ];
        for (let e = 0; e < m.length; e += 1) {
          const t = m[e];
          if (t[0] >= 0 && t[0] <= n && t[1] >= 0 && t[1] <= l) {
            if (0 === t[0] && 0 === t[1]) continue;
            h = !0;
          }
        }
        const f = !(
          "touchstart" !== e.touchEvents.start ||
          !e.support.passiveListener ||
          !e.params.passiveListeners
        ) && { passive: !0, capture: !1 };
        h
          ? (o(), s.off("scroll", p, f))
          : i || ((i = !0), s.on("scroll", p, f));
      }
      s("beforeInit", () => {
        e.params.lazy.enabled &&
          e.params.preloadImages &&
          (e.params.preloadImages = !1);
      }),
        s("init", () => {
          e.params.lazy.enabled && (e.params.lazy.checkInView ? p() : o());
        }),
        s("scroll", () => {
          e.params.freeMode &&
            e.params.freeMode.enabled &&
            !e.params.freeMode.sticky &&
            o();
        }),
        s("scrollbarDragMove resize _freeModeNoMomentumRelease", () => {
          e.params.lazy.enabled && (e.params.lazy.checkInView ? p() : o());
        }),
        s("transitionStart", () => {
          e.params.lazy.enabled &&
            (e.params.lazy.loadOnTransitionStart ||
              (!e.params.lazy.loadOnTransitionStart && !n)) &&
            (e.params.lazy.checkInView ? p() : o());
        }),
        s("transitionEnd", () => {
          e.params.lazy.enabled &&
            !e.params.lazy.loadOnTransitionStart &&
            (e.params.lazy.checkInView ? p() : o());
        }),
        s("slideChange", () => {
          const {
            lazy: t,
            cssMode: s,
            watchSlidesProgress: a,
            touchReleaseOnEdges: i,
            resistanceRatio: r,
          } = e.params;
          t.enabled && (s || (a && (i || 0 === r))) && o();
        }),
        Object.assign(e.lazy, { load: o, loadInSlide: l });
    },
    function ({ swiper: e, extendParams: t, on: s }) {
      function a(e, t) {
        const s = (function () {
          let e, t, s;
          return (a, i) => {
            for (t = -1, e = a.length; e - t > 1; )
              (s = (e + t) >> 1), a[s] <= i ? (t = s) : (e = s);
            return e;
          };
        })();
        let a, i;
        return (
          (this.x = e),
          (this.y = t),
          (this.lastIndex = e.length - 1),
          (this.interpolate = function (e) {
            return e
              ? ((i = s(this.x, e)),
                (a = i - 1),
                ((e - this.x[a]) * (this.y[i] - this.y[a])) /
                  (this.x[i] - this.x[a]) +
                  this.y[a])
              : 0;
          }),
          this
        );
      }
      function i() {
        e.controller.control &&
          e.controller.spline &&
          ((e.controller.spline = void 0), delete e.controller.spline);
      }
      t({ controller: { control: void 0, inverse: !1, by: "slide" } }),
        (e.controller = { control: void 0 }),
        s("beforeInit", () => {
          e.controller.control = e.params.controller.control;
        }),
        s("update", () => {
          i();
        }),
        s("resize", () => {
          i();
        }),
        s("observerUpdate", () => {
          i();
        }),
        s("setTranslate", (t, s, a) => {
          e.controller.control && e.controller.setTranslate(s, a);
        }),
        s("setTransition", (t, s, a) => {
          e.controller.control && e.controller.setTransition(s, a);
        }),
        Object.assign(e.controller, {
          setTranslate: function (t, s) {
            const i = e.controller.control;
            let r, n;
            const l = e.constructor;
            function o(t) {
              const s = e.rtlTranslate ? -e.translate : e.translate;
              "slide" === e.params.controller.by &&
                (!(function (t) {
                  e.controller.spline ||
                    (e.controller.spline = e.params.loop
                      ? new a(e.slidesGrid, t.slidesGrid)
                      : new a(e.snapGrid, t.snapGrid));
                })(t),
                (n = -e.controller.spline.interpolate(-s))),
                (n && "container" !== e.params.controller.by) ||
                  ((r =
                    (t.maxTranslate() - t.minTranslate()) /
                    (e.maxTranslate() - e.minTranslate())),
                  (n = (s - e.minTranslate()) * r + t.minTranslate())),
                e.params.controller.inverse && (n = t.maxTranslate() - n),
                t.updateProgress(n),
                t.setTranslate(n, e),
                t.updateActiveIndex(),
                t.updateSlidesClasses();
            }
            if (Array.isArray(i))
              for (let e = 0; e < i.length; e += 1)
                i[e] !== s && i[e] instanceof l && o(i[e]);
            else i instanceof l && s !== i && o(i);
          },
          setTransition: function (t, s) {
            const a = e.constructor,
              i = e.controller.control;
            let r;
            function n(s) {
              s.setTransition(t, e),
                0 !== t &&
                  (s.transitionStart(),
                  s.params.autoHeight &&
                    c(() => {
                      s.updateAutoHeight();
                    }),
                  s.$wrapperEl.transitionEnd(() => {
                    i &&
                      (s.params.loop &&
                        "slide" === e.params.controller.by &&
                        s.loopFix(),
                      s.transitionEnd());
                  }));
            }
            if (Array.isArray(i))
              for (r = 0; r < i.length; r += 1)
                i[r] !== s && i[r] instanceof a && n(i[r]);
            else i instanceof a && s !== i && n(i);
          },
        });
    },
    function ({ swiper: e, extendParams: t, on: s }) {
      t({
        a11y: {
          enabled: !0,
          notificationClass: "swiper-notification",
          prevSlideMessage: "Previous slide",
          nextSlideMessage: "Next slide",
          firstSlideMessage: "This is the first slide",
          lastSlideMessage: "This is the last slide",
          paginationBulletMessage: "Go to slide {{index}}",
          slideLabelMessage: "{{index}} / {{slidesLength}}",
          containerMessage: null,
          containerRoleDescriptionMessage: null,
          itemRoleDescriptionMessage: null,
          slideRole: "group",
        },
      });
      let a = null;
      function i(e) {
        const t = a;
        0 !== t.length && (t.html(""), t.html(e));
      }
      function r(e) {
        e.attr("tabIndex", "0");
      }
      function n(e) {
        e.attr("tabIndex", "-1");
      }
      function l(e, t) {
        e.attr("role", t);
      }
      function o(e, t) {
        e.attr("aria-roledescription", t);
      }
      function p(e, t) {
        e.attr("aria-label", t);
      }
      function c(e) {
        e.attr("aria-disabled", !0);
      }
      function u(e) {
        e.attr("aria-disabled", !1);
      }
      function h(t) {
        if (13 !== t.keyCode && 32 !== t.keyCode) return;
        const s = e.params.a11y,
          a = d(t.target);
        e.navigation &&
          e.navigation.$nextEl &&
          a.is(e.navigation.$nextEl) &&
          ((e.isEnd && !e.params.loop) || e.slideNext(),
          e.isEnd ? i(s.lastSlideMessage) : i(s.nextSlideMessage)),
          e.navigation &&
            e.navigation.$prevEl &&
            a.is(e.navigation.$prevEl) &&
            ((e.isBeginning && !e.params.loop) || e.slidePrev(),
            e.isBeginning ? i(s.firstSlideMessage) : i(s.prevSlideMessage)),
          e.pagination &&
            a.is(W(e.params.pagination.bulletClass)) &&
            a[0].click();
      }
      function m() {
        if (e.params.loop || e.params.rewind || !e.navigation) return;
        const { $nextEl: t, $prevEl: s } = e.navigation;
        s && s.length > 0 && (e.isBeginning ? (c(s), n(s)) : (u(s), r(s))),
          t && t.length > 0 && (e.isEnd ? (c(t), n(t)) : (u(t), r(t)));
      }
      function f() {
        return (
          e.pagination && e.pagination.bullets && e.pagination.bullets.length
        );
      }
      function g() {
        return f() && e.params.pagination.clickable;
      }
      const v = (e, t, s) => {
        r(e),
          "BUTTON" !== e[0].tagName && (l(e, "button"), e.on("keydown", h)),
          p(e, s),
          (function (e, t) {
            e.attr("aria-controls", t);
          })(e, t);
      };
      function w() {
        const t = e.params.a11y;
        e.$el.append(a);
        const s = e.$el;
        t.containerRoleDescriptionMessage &&
          o(s, t.containerRoleDescriptionMessage),
          t.containerMessage && p(s, t.containerMessage);
        const i = e.$wrapperEl,
          r =
            i.attr("id") ||
            `swiper-wrapper-${(function (e = 16) {
              return "x"
                .repeat(e)
                .replace(/x/g, () =>
                  Math.round(16 * Math.random()).toString(16)
                );
            })(16)}`,
          n = e.params.autoplay && e.params.autoplay.enabled ? "off" : "polite";
        var c;
        (c = r),
          i.attr("id", c),
          (function (e, t) {
            e.attr("aria-live", t);
          })(i, n),
          t.itemRoleDescriptionMessage &&
            o(d(e.slides), t.itemRoleDescriptionMessage),
          l(d(e.slides), t.slideRole);
        const u = e.params.loop
          ? e.slides.filter(
              (t) => !t.classList.contains(e.params.slideDuplicateClass)
            ).length
          : e.slides.length;
        let m, f;
        e.slides.each((s, a) => {
          const i = d(s),
            r = e.params.loop
              ? parseInt(i.attr("data-swiper-slide-index"), 10)
              : a;
          p(
            i,
            t.slideLabelMessage
              .replace(/\{\{index\}\}/, r + 1)
              .replace(/\{\{slidesLength\}\}/, u)
          );
        }),
          e.navigation && e.navigation.$nextEl && (m = e.navigation.$nextEl),
          e.navigation && e.navigation.$prevEl && (f = e.navigation.$prevEl),
          m && m.length && v(m, r, t.nextSlideMessage),
          f && f.length && v(f, r, t.prevSlideMessage),
          g() &&
            e.pagination.$el.on(
              "keydown",
              W(e.params.pagination.bulletClass),
              h
            );
      }
      s("beforeInit", () => {
        a = d(
          `<span class="${e.params.a11y.notificationClass}" aria-live="assertive" aria-atomic="true"></span>`
        );
      }),
        s("afterInit", () => {
          e.params.a11y.enabled && (w(), m());
        }),
        s("toEdge", () => {
          e.params.a11y.enabled && m();
        }),
        s("fromEdge", () => {
          e.params.a11y.enabled && m();
        }),
        s("paginationUpdate", () => {
          e.params.a11y.enabled &&
            (function () {
              const t = e.params.a11y;
              f() &&
                e.pagination.bullets.each((s) => {
                  const a = d(s);
                  e.params.pagination.clickable &&
                    (r(a),
                    e.params.pagination.renderBullet ||
                      (l(a, "button"),
                      p(
                        a,
                        t.paginationBulletMessage.replace(
                          /\{\{index\}\}/,
                          a.index() + 1
                        )
                      ))),
                    a.is(`.${e.params.pagination.bulletActiveClass}`)
                      ? a.attr("aria-current", "true")
                      : a.removeAttr("aria-current");
                });
            })();
        }),
        s("destroy", () => {
          e.params.a11y.enabled &&
            (function () {
              let t, s;
              a && a.length > 0 && a.remove(),
                e.navigation &&
                  e.navigation.$nextEl &&
                  (t = e.navigation.$nextEl),
                e.navigation &&
                  e.navigation.$prevEl &&
                  (s = e.navigation.$prevEl),
                t && t.off("keydown", h),
                s && s.off("keydown", h),
                g() &&
                  e.pagination.$el.off(
                    "keydown",
                    W(e.params.pagination.bulletClass),
                    h
                  );
            })();
        });
    },
    function ({ swiper: e, extendParams: t, on: s }) {
      t({
        history: { enabled: !1, root: "", replaceState: !1, key: "slides" },
      });
      let a = !1,
        i = {};
      const n = (e) =>
          e
            .toString()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]+/g, "")
            .replace(/--+/g, "-")
            .replace(/^-+/, "")
            .replace(/-+$/, ""),
        l = (e) => {
          const t = r();
          let s;
          s = e ? new URL(e) : t.location;
          const a = s.pathname
              .slice(1)
              .split("/")
              .filter((e) => "" !== e),
            i = a.length;
          return { key: a[i - 2], value: a[i - 1] };
        },
        o = (t, s) => {
          const i = r();
          if (!a || !e.params.history.enabled) return;
          let l;
          l = e.params.url ? new URL(e.params.url) : i.location;
          const o = e.slides.eq(s);
          let d = n(o.attr("data-history"));
          if (e.params.history.root.length > 0) {
            let s = e.params.history.root;
            "/" === s[s.length - 1] && (s = s.slice(0, s.length - 1)),
              (d = `${s}/${t}/${d}`);
          } else l.pathname.includes(t) || (d = `${t}/${d}`);
          const p = i.history.state;
          (p && p.value === d) ||
            (e.params.history.replaceState
              ? i.history.replaceState({ value: d }, null, d)
              : i.history.pushState({ value: d }, null, d));
        },
        d = (t, s, a) => {
          if (s)
            for (let i = 0, r = e.slides.length; i < r; i += 1) {
              const r = e.slides.eq(i);
              if (
                n(r.attr("data-history")) === s &&
                !r.hasClass(e.params.slideDuplicateClass)
              ) {
                const s = r.index();
                e.slideTo(s, t, a);
              }
            }
          else e.slideTo(0, t, a);
        },
        p = () => {
          (i = l(e.params.url)), d(e.params.speed, e.paths.value, !1);
        };
      s("init", () => {
        e.params.history.enabled &&
          (() => {
            const t = r();
            if (e.params.history) {
              if (!t.history || !t.history.pushState)
                return (
                  (e.params.history.enabled = !1),
                  void (e.params.hashNavigation.enabled = !0)
                );
              (a = !0),
                (i = l(e.params.url)),
                (i.key || i.value) &&
                  (d(0, i.value, e.params.runCallbacksOnInit),
                  e.params.history.replaceState ||
                    t.addEventListener("popstate", p));
            }
          })();
      }),
        s("destroy", () => {
          e.params.history.enabled &&
            (() => {
              const t = r();
              e.params.history.replaceState ||
                t.removeEventListener("popstate", p);
            })();
        }),
        s("transitionEnd _freeModeNoMomentumRelease", () => {
          a && o(e.params.history.key, e.activeIndex);
        }),
        s("slideChange", () => {
          a && e.params.cssMode && o(e.params.history.key, e.activeIndex);
        });
    },
    function ({ swiper: e, extendParams: t, emit: s, on: i }) {
      let n = !1;
      const l = a(),
        o = r();
      t({ hashNavigation: { enabled: !1, replaceState: !1, watchState: !1 } });
      const p = () => {
          s("hashChange");
          const t = l.location.hash.replace("#", "");
          if (t !== e.slides.eq(e.activeIndex).attr("data-hash")) {
            const s = e.$wrapperEl
              .children(`.${e.params.slideClass}[data-hash="${t}"]`)
              .index();
            if (void 0 === s) return;
            e.slideTo(s);
          }
        },
        c = () => {
          if (n && e.params.hashNavigation.enabled)
            if (
              e.params.hashNavigation.replaceState &&
              o.history &&
              o.history.replaceState
            )
              o.history.replaceState(
                null,
                null,
                `#${e.slides.eq(e.activeIndex).attr("data-hash")}` || ""
              ),
                s("hashSet");
            else {
              const t = e.slides.eq(e.activeIndex),
                a = t.attr("data-hash") || t.attr("data-history");
              (l.location.hash = a || ""), s("hashSet");
            }
        };
      i("init", () => {
        e.params.hashNavigation.enabled &&
          (() => {
            if (
              !e.params.hashNavigation.enabled ||
              (e.params.history && e.params.history.enabled)
            )
              return;
            n = !0;
            const t = l.location.hash.replace("#", "");
            if (t) {
              const s = 0;
              for (let a = 0, i = e.slides.length; a < i; a += 1) {
                const i = e.slides.eq(a);
                if (
                  (i.attr("data-hash") || i.attr("data-history")) === t &&
                  !i.hasClass(e.params.slideDuplicateClass)
                ) {
                  const t = i.index();
                  e.slideTo(t, s, e.params.runCallbacksOnInit, !0);
                }
              }
            }
            e.params.hashNavigation.watchState && d(o).on("hashchange", p);
          })();
      }),
        i("destroy", () => {
          e.params.hashNavigation.enabled &&
            e.params.hashNavigation.watchState &&
            d(o).off("hashchange", p);
        }),
        i("transitionEnd _freeModeNoMomentumRelease", () => {
          n && c();
        }),
        i("slideChange", () => {
          n && e.params.cssMode && c();
        });
    },
    function ({ swiper: e, extendParams: t, on: s, emit: i }) {
      let r;
      function n() {
        const t = e.slides.eq(e.activeIndex);
        let s = e.params.autoplay.delay;
        t.attr("data-swiper-autoplay") &&
          (s = t.attr("data-swiper-autoplay") || e.params.autoplay.delay),
          clearTimeout(r),
          (r = c(() => {
            let t;
            e.params.autoplay.reverseDirection
              ? e.params.loop
                ? (e.loopFix(),
                  (t = e.slidePrev(e.params.speed, !0, !0)),
                  i("autoplay"))
                : e.isBeginning
                ? e.params.autoplay.stopOnLastSlide
                  ? o()
                  : ((t = e.slideTo(
                      e.slides.length - 1,
                      e.params.speed,
                      !0,
                      !0
                    )),
                    i("autoplay"))
                : ((t = e.slidePrev(e.params.speed, !0, !0)), i("autoplay"))
              : e.params.loop
              ? (e.loopFix(),
                (t = e.slideNext(e.params.speed, !0, !0)),
                i("autoplay"))
              : e.isEnd
              ? e.params.autoplay.stopOnLastSlide
                ? o()
                : ((t = e.slideTo(0, e.params.speed, !0, !0)), i("autoplay"))
              : ((t = e.slideNext(e.params.speed, !0, !0)), i("autoplay")),
              ((e.params.cssMode && e.autoplay.running) || !1 === t) && n();
          }, s));
      }
      function l() {
        return (
          void 0 === r &&
          !e.autoplay.running &&
          ((e.autoplay.running = !0), i("autoplayStart"), n(), !0)
        );
      }
      function o() {
        return (
          !!e.autoplay.running &&
          void 0 !== r &&
          (r && (clearTimeout(r), (r = void 0)),
          (e.autoplay.running = !1),
          i("autoplayStop"),
          !0)
        );
      }
      function d(t) {
        e.autoplay.running &&
          (e.autoplay.paused ||
            (r && clearTimeout(r),
            (e.autoplay.paused = !0),
            0 !== t && e.params.autoplay.waitForTransition
              ? ["transitionend", "webkitTransitionEnd"].forEach((t) => {
                  e.$wrapperEl[0].addEventListener(t, u);
                })
              : ((e.autoplay.paused = !1), n())));
      }
      function p() {
        const t = a();
        "hidden" === t.visibilityState && e.autoplay.running && d(),
          "visible" === t.visibilityState &&
            e.autoplay.paused &&
            (n(), (e.autoplay.paused = !1));
      }
      function u(t) {
        e &&
          !e.destroyed &&
          e.$wrapperEl &&
          t.target === e.$wrapperEl[0] &&
          (["transitionend", "webkitTransitionEnd"].forEach((t) => {
            e.$wrapperEl[0].removeEventListener(t, u);
          }),
          (e.autoplay.paused = !1),
          e.autoplay.running ? n() : o());
      }
      function h() {
        e.params.autoplay.disableOnInteraction ? o() : d(),
          ["transitionend", "webkitTransitionEnd"].forEach((t) => {
            e.$wrapperEl[0].removeEventListener(t, u);
          });
      }
      function m() {
        e.params.autoplay.disableOnInteraction ||
          ((e.autoplay.paused = !1), n());
      }
      (e.autoplay = { running: !1, paused: !1 }),
        t({
          autoplay: {
            enabled: !1,
            delay: 3e3,
            waitForTransition: !0,
            disableOnInteraction: !0,
            stopOnLastSlide: !1,
            reverseDirection: !1,
            pauseOnMouseEnter: !1,
          },
        }),
        s("init", () => {
          if (e.params.autoplay.enabled) {
            l();
            a().addEventListener("visibilitychange", p),
              e.params.autoplay.pauseOnMouseEnter &&
                (e.$el.on("mouseenter", h), e.$el.on("mouseleave", m));
          }
        }),
        s("beforeTransitionStart", (t, s, a) => {
          e.autoplay.running &&
            (a || !e.params.autoplay.disableOnInteraction
              ? e.autoplay.pause(s)
              : o());
        }),
        s("sliderFirstMove", () => {
          e.autoplay.running &&
            (e.params.autoplay.disableOnInteraction ? o() : d());
        }),
        s("touchEnd", () => {
          e.params.cssMode &&
            e.autoplay.paused &&
            !e.params.autoplay.disableOnInteraction &&
            n();
        }),
        s("destroy", () => {
          e.$el.off("mouseenter", h),
            e.$el.off("mouseleave", m),
            e.autoplay.running && o();
          a().removeEventListener("visibilitychange", p);
        }),
        Object.assign(e.autoplay, { pause: d, run: n, start: l, stop: o });
    },
    function ({ swiper: e, extendParams: t, on: s }) {
      t({
        thumbs: {
          swiper: null,
          multipleActiveThumbs: !0,
          autoScrollOffset: 0,
          slideThumbActiveClass: "swiper-slide-thumb-active",
          thumbsContainerClass: "swiper-thumbs",
        },
      });
      let a = !1,
        i = !1;
      function r() {
        const t = e.thumbs.swiper;
        if (!t) return;
        const s = t.clickedIndex,
          a = t.clickedSlide;
        if (a && d(a).hasClass(e.params.thumbs.slideThumbActiveClass)) return;
        if (null == s) return;
        let i;
        if (
          ((i = t.params.loop
            ? parseInt(d(t.clickedSlide).attr("data-swiper-slide-index"), 10)
            : s),
          e.params.loop)
        ) {
          let t = e.activeIndex;
          e.slides.eq(t).hasClass(e.params.slideDuplicateClass) &&
            (e.loopFix(),
            (e._clientLeft = e.$wrapperEl[0].clientLeft),
            (t = e.activeIndex));
          const s = e.slides
              .eq(t)
              .prevAll(`[data-swiper-slide-index="${i}"]`)
              .eq(0)
              .index(),
            a = e.slides
              .eq(t)
              .nextAll(`[data-swiper-slide-index="${i}"]`)
              .eq(0)
              .index();
          i = void 0 === s ? a : void 0 === a ? s : a - t < t - s ? a : s;
        }
        e.slideTo(i);
      }
      function n() {
        const { thumbs: t } = e.params;
        if (a) return !1;
        a = !0;
        const s = e.constructor;
        if (t.swiper instanceof s)
          (e.thumbs.swiper = t.swiper),
            Object.assign(e.thumbs.swiper.originalParams, {
              watchSlidesProgress: !0,
              slideToClickedSlide: !1,
            }),
            Object.assign(e.thumbs.swiper.params, {
              watchSlidesProgress: !0,
              slideToClickedSlide: !1,
            });
        else if (m(t.swiper)) {
          const a = Object.assign({}, t.swiper);
          Object.assign(a, {
            watchSlidesProgress: !0,
            slideToClickedSlide: !1,
          }),
            (e.thumbs.swiper = new s(a)),
            (i = !0);
        }
        return (
          e.thumbs.swiper.$el.addClass(e.params.thumbs.thumbsContainerClass),
          e.thumbs.swiper.on("tap", r),
          !0
        );
      }
      function l(t) {
        const s = e.thumbs.swiper;
        if (!s) return;
        const a =
            "auto" === s.params.slidesPerView
              ? s.slidesPerViewDynamic()
              : s.params.slidesPerView,
          i = e.params.thumbs.autoScrollOffset,
          r = i && !s.params.loop;
        if (e.realIndex !== s.realIndex || r) {
          let n,
            l,
            o = s.activeIndex;
          if (s.params.loop) {
            s.slides.eq(o).hasClass(s.params.slideDuplicateClass) &&
              (s.loopFix(),
              (s._clientLeft = s.$wrapperEl[0].clientLeft),
              (o = s.activeIndex));
            const t = s.slides
                .eq(o)
                .prevAll(`[data-swiper-slide-index="${e.realIndex}"]`)
                .eq(0)
                .index(),
              a = s.slides
                .eq(o)
                .nextAll(`[data-swiper-slide-index="${e.realIndex}"]`)
                .eq(0)
                .index();
            (n =
              void 0 === t
                ? a
                : void 0 === a
                ? t
                : a - o == o - t
                ? s.params.slidesPerGroup > 1
                  ? a
                  : o
                : a - o < o - t
                ? a
                : t),
              (l = e.activeIndex > e.previousIndex ? "next" : "prev");
          } else (n = e.realIndex), (l = n > e.previousIndex ? "next" : "prev");
          r && (n += "next" === l ? i : -1 * i),
            s.visibleSlidesIndexes &&
              s.visibleSlidesIndexes.indexOf(n) < 0 &&
              (s.params.centeredSlides
                ? (n =
                    n > o
                      ? n - Math.floor(a / 2) + 1
                      : n + Math.floor(a / 2) - 1)
                : n > o && s.params.slidesPerGroup,
              s.slideTo(n, t ? 0 : void 0));
        }
        let n = 1;
        const l = e.params.thumbs.slideThumbActiveClass;
        if (
          (e.params.slidesPerView > 1 &&
            !e.params.centeredSlides &&
            (n = e.params.slidesPerView),
          e.params.thumbs.multipleActiveThumbs || (n = 1),
          (n = Math.floor(n)),
          s.slides.removeClass(l),
          s.params.loop || (s.params.virtual && s.params.virtual.enabled))
        )
          for (let t = 0; t < n; t += 1)
            s.$wrapperEl
              .children(`[data-swiper-slide-index="${e.realIndex + t}"]`)
              .addClass(l);
        else
          for (let t = 0; t < n; t += 1)
            s.slides.eq(e.realIndex + t).addClass(l);
      }
      (e.thumbs = { swiper: null }),
        s("beforeInit", () => {
          const { thumbs: t } = e.params;
          t && t.swiper && (n(), l(!0));
        }),
        s("slideChange update resize observerUpdate", () => {
          e.thumbs.swiper && l();
        }),
        s("setTransition", (t, s) => {
          const a = e.thumbs.swiper;
          a && a.setTransition(s);
        }),
        s("beforeDestroy", () => {
          const t = e.thumbs.swiper;
          t && i && t && t.destroy();
        }),
        Object.assign(e.thumbs, { init: n, update: l });
    },
    function ({ swiper: e, extendParams: t, emit: s, once: a }) {
      t({
        freeMode: {
          enabled: !1,
          momentum: !0,
          momentumRatio: 1,
          momentumBounce: !0,
          momentumBounceRatio: 1,
          momentumVelocityRatio: 1,
          sticky: !1,
          minimumVelocity: 0.02,
        },
      }),
        Object.assign(e, {
          freeMode: {
            onTouchMove: function () {
              const { touchEventsData: t, touches: s } = e;
              0 === t.velocities.length &&
                t.velocities.push({
                  position: s[e.isHorizontal() ? "startX" : "startY"],
                  time: t.touchStartTime,
                }),
                t.velocities.push({
                  position: s[e.isHorizontal() ? "currentX" : "currentY"],
                  time: u(),
                });
            },
            onTouchEnd: function ({ currentPos: t }) {
              const {
                  params: i,
                  $wrapperEl: r,
                  rtlTranslate: n,
                  snapGrid: l,
                  touchEventsData: o,
                } = e,
                d = u() - o.touchStartTime;
              if (t < -e.minTranslate()) e.slideTo(e.activeIndex);
              else if (t > -e.maxTranslate())
                e.slides.length < l.length
                  ? e.slideTo(l.length - 1)
                  : e.slideTo(e.slides.length - 1);
              else {
                if (i.freeMode.momentum) {
                  if (o.velocities.length > 1) {
                    const t = o.velocities.pop(),
                      s = o.velocities.pop(),
                      a = t.position - s.position,
                      r = t.time - s.time;
                    (e.velocity = a / r),
                      (e.velocity /= 2),
                      Math.abs(e.velocity) < i.freeMode.minimumVelocity &&
                        (e.velocity = 0),
                      (r > 150 || u() - t.time > 300) && (e.velocity = 0);
                  } else e.velocity = 0;
                  (e.velocity *= i.freeMode.momentumVelocityRatio),
                    (o.velocities.length = 0);
                  let t = 1e3 * i.freeMode.momentumRatio;
                  const d = e.velocity * t;
                  let p = e.translate + d;
                  n && (p = -p);
                  let c,
                    h = !1;
                  const m =
                    20 * Math.abs(e.velocity) * i.freeMode.momentumBounceRatio;
                  let f;
                  if (p < e.maxTranslate())
                    i.freeMode.momentumBounce
                      ? (p + e.maxTranslate() < -m &&
                          (p = e.maxTranslate() - m),
                        (c = e.maxTranslate()),
                        (h = !0),
                        (o.allowMomentumBounce = !0))
                      : (p = e.maxTranslate()),
                      i.loop && i.centeredSlides && (f = !0);
                  else if (p > e.minTranslate())
                    i.freeMode.momentumBounce
                      ? (p - e.minTranslate() > m && (p = e.minTranslate() + m),
                        (c = e.minTranslate()),
                        (h = !0),
                        (o.allowMomentumBounce = !0))
                      : (p = e.minTranslate()),
                      i.loop && i.centeredSlides && (f = !0);
                  else if (i.freeMode.sticky) {
                    let t;
                    for (let e = 0; e < l.length; e += 1)
                      if (l[e] > -p) {
                        t = e;
                        break;
                      }
                    (p =
                      Math.abs(l[t] - p) < Math.abs(l[t - 1] - p) ||
                      "next" === e.swipeDirection
                        ? l[t]
                        : l[t - 1]),
                      (p = -p);
                  }
                  if (
                    (f &&
                      a("transitionEnd", () => {
                        e.loopFix();
                      }),
                    0 !== e.velocity)
                  ) {
                    if (
                      ((t = n
                        ? Math.abs((-p - e.translate) / e.velocity)
                        : Math.abs((p - e.translate) / e.velocity)),
                      i.freeMode.sticky)
                    ) {
                      const s = Math.abs((n ? -p : p) - e.translate),
                        a = e.slidesSizesGrid[e.activeIndex];
                      t =
                        s < a
                          ? i.speed
                          : s < 2 * a
                          ? 1.5 * i.speed
                          : 2.5 * i.speed;
                    }
                  } else if (i.freeMode.sticky) return void e.slideToClosest();
                  i.freeMode.momentumBounce && h
                    ? (e.updateProgress(c),
                      e.setTransition(t),
                      e.setTranslate(p),
                      e.transitionStart(!0, e.swipeDirection),
                      (e.animating = !0),
                      r.transitionEnd(() => {
                        e &&
                          !e.destroyed &&
                          o.allowMomentumBounce &&
                          (s("momentumBounce"),
                          e.setTransition(i.speed),
                          setTimeout(() => {
                            e.setTranslate(c),
                              r.transitionEnd(() => {
                                e && !e.destroyed && e.transitionEnd();
                              });
                          }, 0));
                      }))
                    : e.velocity
                    ? (s("_freeModeNoMomentumRelease"),
                      e.updateProgress(p),
                      e.setTransition(t),
                      e.setTranslate(p),
                      e.transitionStart(!0, e.swipeDirection),
                      e.animating ||
                        ((e.animating = !0),
                        r.transitionEnd(() => {
                          e && !e.destroyed && e.transitionEnd();
                        })))
                    : e.updateProgress(p),
                    e.updateActiveIndex(),
                    e.updateSlidesClasses();
                } else {
                  if (i.freeMode.sticky) return void e.slideToClosest();
                  i.freeMode && s("_freeModeNoMomentumRelease");
                }
                (!i.freeMode.momentum || d >= i.longSwipesMs) &&
                  (e.updateProgress(),
                  e.updateActiveIndex(),
                  e.updateSlidesClasses());
              }
            },
          },
        });
    },
    function ({ swiper: e, extendParams: t }) {
      let s, a, i;
      t({ grid: { rows: 1, fill: "column" } }),
        (e.grid = {
          initSlides: (t) => {
            const { slidesPerView: r } = e.params,
              { rows: n, fill: l } = e.params.grid;
            (a = s / n),
              (i = Math.floor(t / n)),
              (s = Math.floor(t / n) === t / n ? t : Math.ceil(t / n) * n),
              "auto" !== r && "row" === l && (s = Math.max(s, r * n));
          },
          updateSlide: (t, r, n, l) => {
            const { slidesPerGroup: o, spaceBetween: d } = e.params,
              { rows: p, fill: c } = e.params.grid;
            let u, h, m;
            if ("row" === c && o > 1) {
              const e = Math.floor(t / (o * p)),
                a = t - p * o * e,
                i = 0 === e ? o : Math.min(Math.ceil((n - e * p * o) / p), o);
              (m = Math.floor(a / i)),
                (h = a - m * i + e * o),
                (u = h + (m * s) / p),
                r.css({ "-webkit-order": u, order: u });
            } else
              "column" === c
                ? ((h = Math.floor(t / p)),
                  (m = t - h * p),
                  (h > i || (h === i && m === p - 1)) &&
                    ((m += 1), m >= p && ((m = 0), (h += 1))))
                : ((m = Math.floor(t / a)), (h = t - m * a));
            r.css(l("margin-top"), 0 !== m ? d && `${d}px` : "");
          },
          updateWrapperSize: (t, a, i) => {
            const {
                spaceBetween: r,
                centeredSlides: n,
                roundLengths: l,
              } = e.params,
              { rows: o } = e.params.grid;
            if (
              ((e.virtualSize = (t + r) * s),
              (e.virtualSize = Math.ceil(e.virtualSize / o) - r),
              e.$wrapperEl.css({ [i("width")]: `${e.virtualSize + r}px` }),
              n)
            ) {
              a.splice(0, a.length);
              const t = [];
              for (let s = 0; s < a.length; s += 1) {
                let i = a[s];
                l && (i = Math.floor(i)),
                  a[s] < e.virtualSize + a[0] && t.push(i);
              }
              a.push(...t);
            }
          },
        });
    },
    function ({ swiper: e }) {
      Object.assign(e, {
        appendSlide: R.bind(e),
        prependSlide: j.bind(e),
        addSlide: _.bind(e),
        removeSlide: V.bind(e),
        removeAllSlides: q.bind(e),
      });
    },
    function ({ swiper: e, extendParams: t, on: s }) {
      t({ fadeEffect: { crossFade: !1, transformEl: null } }),
        F({
          effect: "fade",
          swiper: e,
          on: s,
          setTranslate: () => {
            const { slides: t } = e,
              s = e.params.fadeEffect;
            for (let a = 0; a < t.length; a += 1) {
              const t = e.slides.eq(a);
              let i = -t[0].swiperSlideOffset;
              e.params.virtualTranslate || (i -= e.translate);
              let r = 0;
              e.isHorizontal() || ((r = i), (i = 0));
              const n = e.params.fadeEffect.crossFade
                ? Math.max(1 - Math.abs(t[0].progress), 0)
                : 1 + Math.min(Math.max(t[0].progress, -1), 0);
              U(s, t)
                .css({ opacity: n })
                .transform(`translate3d(${i}px, ${r}px, 0px)`);
            }
          },
          setTransition: (t) => {
            const { transformEl: s } = e.params.fadeEffect;
            (s ? e.slides.find(s) : e.slides).transition(t),
              K({ swiper: e, duration: t, transformEl: s, allSlides: !0 });
          },
          overwriteParams: () => ({
            slidesPerView: 1,
            slidesPerGroup: 1,
            watchSlidesProgress: !0,
            spaceBetween: 0,
            virtualTranslate: !e.params.cssMode,
          }),
        });
    },
    function ({ swiper: e, extendParams: t, on: s }) {
      t({
        cubeEffect: {
          slideShadows: !0,
          shadow: !0,
          shadowOffset: 20,
          shadowScale: 0.94,
        },
      }),
        F({
          effect: "cube",
          swiper: e,
          on: s,
          setTranslate: () => {
            const {
                $el: t,
                $wrapperEl: s,
                slides: a,
                width: i,
                height: r,
                rtlTranslate: n,
                size: l,
                browser: o,
              } = e,
              p = e.params.cubeEffect,
              c = e.isHorizontal(),
              u = e.virtual && e.params.virtual.enabled;
            let h,
              m = 0;
            p.shadow &&
              (c
                ? ((h = s.find(".swiper-cube-shadow")),
                  0 === h.length &&
                    ((h = d('<div class="swiper-cube-shadow"></div>')),
                    s.append(h)),
                  h.css({ height: `${i}px` }))
                : ((h = t.find(".swiper-cube-shadow")),
                  0 === h.length &&
                    ((h = d('<div class="swiper-cube-shadow"></div>')),
                    t.append(h))));
            for (let e = 0; e < a.length; e += 1) {
              const t = a.eq(e);
              let s = e;
              u && (s = parseInt(t.attr("data-swiper-slide-index"), 10));
              let i = 90 * s,
                r = Math.floor(i / 360);
              n && ((i = -i), (r = Math.floor(-i / 360)));
              const o = Math.max(Math.min(t[0].progress, 1), -1);
              let h = 0,
                f = 0,
                g = 0;
              s % 4 == 0
                ? ((h = 4 * -r * l), (g = 0))
                : (s - 1) % 4 == 0
                ? ((h = 0), (g = 4 * -r * l))
                : (s - 2) % 4 == 0
                ? ((h = l + 4 * r * l), (g = l))
                : (s - 3) % 4 == 0 && ((h = -l), (g = 3 * l + 4 * l * r)),
                n && (h = -h),
                c || ((f = h), (h = 0));
              const v = `rotateX(${c ? 0 : -i}deg) rotateY(${
                c ? i : 0
              }deg) translate3d(${h}px, ${f}px, ${g}px)`;
              if (
                (o <= 1 &&
                  o > -1 &&
                  ((m = 90 * s + 90 * o), n && (m = 90 * -s - 90 * o)),
                t.transform(v),
                p.slideShadows)
              ) {
                let e = c
                    ? t.find(".swiper-slide-shadow-left")
                    : t.find(".swiper-slide-shadow-top"),
                  s = c
                    ? t.find(".swiper-slide-shadow-right")
                    : t.find(".swiper-slide-shadow-bottom");
                0 === e.length &&
                  ((e = d(
                    `<div class="swiper-slide-shadow-${
                      c ? "left" : "top"
                    }"></div>`
                  )),
                  t.append(e)),
                  0 === s.length &&
                    ((s = d(
                      `<div class="swiper-slide-shadow-${
                        c ? "right" : "bottom"
                      }"></div>`
                    )),
                    t.append(s)),
                  e.length && (e[0].style.opacity = Math.max(-o, 0)),
                  s.length && (s[0].style.opacity = Math.max(o, 0));
              }
            }
            if (
              (s.css({
                "-webkit-transform-origin": `50% 50% -${l / 2}px`,
                "transform-origin": `50% 50% -${l / 2}px`,
              }),
              p.shadow)
            )
              if (c)
                h.transform(
                  `translate3d(0px, ${i / 2 + p.shadowOffset}px, ${
                    -i / 2
                  }px) rotateX(90deg) rotateZ(0deg) scale(${p.shadowScale})`
                );
              else {
                const e = Math.abs(m) - 90 * Math.floor(Math.abs(m) / 90),
                  t =
                    1.5 -
                    (Math.sin((2 * e * Math.PI) / 360) / 2 +
                      Math.cos((2 * e * Math.PI) / 360) / 2),
                  s = p.shadowScale,
                  a = p.shadowScale / t,
                  i = p.shadowOffset;
                h.transform(
                  `scale3d(${s}, 1, ${a}) translate3d(0px, ${r / 2 + i}px, ${
                    -r / 2 / a
                  }px) rotateX(-90deg)`
                );
              }
            const f = o.isSafari || o.isWebView ? -l / 2 : 0;
            s.transform(
              `translate3d(0px,0,${f}px) rotateX(${
                e.isHorizontal() ? 0 : m
              }deg) rotateY(${e.isHorizontal() ? -m : 0}deg)`
            );
          },
          setTransition: (t) => {
            const { $el: s, slides: a } = e;
            a
              .transition(t)
              .find(
                ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
              )
              .transition(t),
              e.params.cubeEffect.shadow &&
                !e.isHorizontal() &&
                s.find(".swiper-cube-shadow").transition(t);
          },
          perspective: () => !0,
          overwriteParams: () => ({
            slidesPerView: 1,
            slidesPerGroup: 1,
            watchSlidesProgress: !0,
            resistanceRatio: 0,
            spaceBetween: 0,
            centeredSlides: !1,
            virtualTranslate: !0,
          }),
        });
    },
    function ({ swiper: e, extendParams: t, on: s }) {
      t({
        flipEffect: { slideShadows: !0, limitRotation: !0, transformEl: null },
      }),
        F({
          effect: "flip",
          swiper: e,
          on: s,
          setTranslate: () => {
            const { slides: t, rtlTranslate: s } = e,
              a = e.params.flipEffect;
            for (let i = 0; i < t.length; i += 1) {
              const r = t.eq(i);
              let n = r[0].progress;
              e.params.flipEffect.limitRotation &&
                (n = Math.max(Math.min(r[0].progress, 1), -1));
              const l = r[0].swiperSlideOffset;
              let o = -180 * n,
                d = 0,
                p = e.params.cssMode ? -l - e.translate : -l,
                c = 0;
              if (
                (e.isHorizontal()
                  ? s && (o = -o)
                  : ((c = p), (p = 0), (d = -o), (o = 0)),
                (r[0].style.zIndex = -Math.abs(Math.round(n)) + t.length),
                a.slideShadows)
              ) {
                let t = e.isHorizontal()
                    ? r.find(".swiper-slide-shadow-left")
                    : r.find(".swiper-slide-shadow-top"),
                  s = e.isHorizontal()
                    ? r.find(".swiper-slide-shadow-right")
                    : r.find(".swiper-slide-shadow-bottom");
                0 === t.length &&
                  (t = Z(a, r, e.isHorizontal() ? "left" : "top")),
                  0 === s.length &&
                    (s = Z(a, r, e.isHorizontal() ? "right" : "bottom")),
                  t.length && (t[0].style.opacity = Math.max(-n, 0)),
                  s.length && (s[0].style.opacity = Math.max(n, 0));
              }
              const u = `translate3d(${p}px, ${c}px, 0px) rotateX(${d}deg) rotateY(${o}deg)`;
              U(a, r).transform(u);
            }
          },
          setTransition: (t) => {
            const { transformEl: s } = e.params.flipEffect;
            (s ? e.slides.find(s) : e.slides)
              .transition(t)
              .find(
                ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
              )
              .transition(t),
              K({ swiper: e, duration: t, transformEl: s });
          },
          perspective: () => !0,
          overwriteParams: () => ({
            slidesPerView: 1,
            slidesPerGroup: 1,
            watchSlidesProgress: !0,
            spaceBetween: 0,
            virtualTranslate: !e.params.cssMode,
          }),
        });
    },
    function ({ swiper: e, extendParams: t, on: s }) {
      t({
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          scale: 1,
          modifier: 1,
          slideShadows: !0,
          transformEl: null,
        },
      }),
        F({
          effect: "coverflow",
          swiper: e,
          on: s,
          setTranslate: () => {
            const { width: t, height: s, slides: a, slidesSizesGrid: i } = e,
              r = e.params.coverflowEffect,
              n = e.isHorizontal(),
              l = e.translate,
              o = n ? t / 2 - l : s / 2 - l,
              d = n ? r.rotate : -r.rotate,
              p = r.depth;
            for (let e = 0, t = a.length; e < t; e += 1) {
              const t = a.eq(e),
                s = i[e],
                l = ((o - t[0].swiperSlideOffset - s / 2) / s) * r.modifier;
              let c = n ? d * l : 0,
                u = n ? 0 : d * l,
                h = -p * Math.abs(l),
                m = r.stretch;
              "string" == typeof m &&
                -1 !== m.indexOf("%") &&
                (m = (parseFloat(r.stretch) / 100) * s);
              let f = n ? 0 : m * l,
                g = n ? m * l : 0,
                v = 1 - (1 - r.scale) * Math.abs(l);
              Math.abs(g) < 0.001 && (g = 0),
                Math.abs(f) < 0.001 && (f = 0),
                Math.abs(h) < 0.001 && (h = 0),
                Math.abs(c) < 0.001 && (c = 0),
                Math.abs(u) < 0.001 && (u = 0),
                Math.abs(v) < 0.001 && (v = 0);
              const w = `translate3d(${g}px,${f}px,${h}px)  rotateX(${u}deg) rotateY(${c}deg) scale(${v})`;
              if (
                (U(r, t).transform(w),
                (t[0].style.zIndex = 1 - Math.abs(Math.round(l))),
                r.slideShadows)
              ) {
                let e = n
                    ? t.find(".swiper-slide-shadow-left")
                    : t.find(".swiper-slide-shadow-top"),
                  s = n
                    ? t.find(".swiper-slide-shadow-right")
                    : t.find(".swiper-slide-shadow-bottom");
                0 === e.length && (e = Z(r, t, n ? "left" : "top")),
                  0 === s.length && (s = Z(r, t, n ? "right" : "bottom")),
                  e.length && (e[0].style.opacity = l > 0 ? l : 0),
                  s.length && (s[0].style.opacity = -l > 0 ? -l : 0);
              }
            }
          },
          setTransition: (t) => {
            const { transformEl: s } = e.params.coverflowEffect;
            (s ? e.slides.find(s) : e.slides)
              .transition(t)
              .find(
                ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
              )
              .transition(t);
          },
          perspective: () => !0,
          overwriteParams: () => ({ watchSlidesProgress: !0 }),
        });
    },
    function ({ swiper: e, extendParams: t, on: s }) {
      t({
        creativeEffect: {
          transformEl: null,
          limitProgress: 1,
          shadowPerProgress: !1,
          progressMultiplier: 1,
          perspective: !0,
          prev: {
            translate: [0, 0, 0],
            rotate: [0, 0, 0],
            opacity: 1,
            scale: 1,
          },
          next: {
            translate: [0, 0, 0],
            rotate: [0, 0, 0],
            opacity: 1,
            scale: 1,
          },
        },
      });
      const a = (e) => ("string" == typeof e ? e : `${e}px`);
      F({
        effect: "creative",
        swiper: e,
        on: s,
        setTranslate: () => {
          const { slides: t, $wrapperEl: s, slidesSizesGrid: i } = e,
            r = e.params.creativeEffect,
            { progressMultiplier: n } = r,
            l = e.params.centeredSlides;
          if (l) {
            const t = i[0] / 2 - e.params.slidesOffsetBefore || 0;
            s.transform(`translateX(calc(50% - ${t}px))`);
          }
          for (let s = 0; s < t.length; s += 1) {
            const i = t.eq(s),
              o = i[0].progress,
              d = Math.min(
                Math.max(i[0].progress, -r.limitProgress),
                r.limitProgress
              );
            let p = d;
            l ||
              (p = Math.min(
                Math.max(i[0].originalProgress, -r.limitProgress),
                r.limitProgress
              ));
            const c = i[0].swiperSlideOffset,
              u = [e.params.cssMode ? -c - e.translate : -c, 0, 0],
              h = [0, 0, 0];
            let m = !1;
            e.isHorizontal() || ((u[1] = u[0]), (u[0] = 0));
            let f = {
              translate: [0, 0, 0],
              rotate: [0, 0, 0],
              scale: 1,
              opacity: 1,
            };
            d < 0
              ? ((f = r.next), (m = !0))
              : d > 0 && ((f = r.prev), (m = !0)),
              u.forEach((e, t) => {
                u[t] = `calc(${e}px + (${a(f.translate[t])} * ${Math.abs(
                  d * n
                )}))`;
              }),
              h.forEach((e, t) => {
                h[t] = f.rotate[t] * Math.abs(d * n);
              }),
              (i[0].style.zIndex = -Math.abs(Math.round(o)) + t.length);
            const g = u.join(", "),
              v = `rotateX(${h[0]}deg) rotateY(${h[1]}deg) rotateZ(${h[2]}deg)`,
              w =
                p < 0
                  ? `scale(${1 + (1 - f.scale) * p * n})`
                  : `scale(${1 - (1 - f.scale) * p * n})`,
              b =
                p < 0
                  ? 1 + (1 - f.opacity) * p * n
                  : 1 - (1 - f.opacity) * p * n,
              x = `translate3d(${g}) ${v} ${w}`;
            if ((m && f.shadow) || !m) {
              let e = i.children(".swiper-slide-shadow");
              if ((0 === e.length && f.shadow && (e = Z(r, i)), e.length)) {
                const t = r.shadowPerProgress ? d * (1 / r.limitProgress) : d;
                e[0].style.opacity = Math.min(Math.max(Math.abs(t), 0), 1);
              }
            }
            const y = U(r, i);
            y.transform(x).css({ opacity: b }),
              f.origin && y.css("transform-origin", f.origin);
          }
        },
        setTransition: (t) => {
          const { transformEl: s } = e.params.creativeEffect;
          (s ? e.slides.find(s) : e.slides)
            .transition(t)
            .find(".swiper-slide-shadow")
            .transition(t),
            K({ swiper: e, duration: t, transformEl: s, allSlides: !0 });
        },
        perspective: () => e.params.creativeEffect.perspective,
        overwriteParams: () => ({
          watchSlidesProgress: !0,
          virtualTranslate: !e.params.cssMode,
        }),
      });
    },
    function ({ swiper: e, extendParams: t, on: s }) {
      t({ cardsEffect: { slideShadows: !0, transformEl: null } }),
        F({
          effect: "cards",
          swiper: e,
          on: s,
          setTranslate: () => {
            const { slides: t, activeIndex: s } = e,
              a = e.params.cardsEffect,
              { startTranslate: i, isTouched: r } = e.touchEventsData,
              n = e.translate;
            for (let l = 0; l < t.length; l += 1) {
              const o = t.eq(l),
                d = o[0].progress,
                p = Math.min(Math.max(d, -4), 4);
              let c = o[0].swiperSlideOffset;
              e.params.centeredSlides &&
                !e.params.cssMode &&
                e.$wrapperEl.transform(`translateX(${e.minTranslate()}px)`),
                e.params.centeredSlides &&
                  e.params.cssMode &&
                  (c -= t[0].swiperSlideOffset);
              let u = e.params.cssMode ? -c - e.translate : -c,
                h = 0;
              const m = -100 * Math.abs(p);
              let f = 1,
                g = -2 * p,
                v = 8 - 0.75 * Math.abs(p);
              const w =
                  (l === s || l === s - 1) &&
                  p > 0 &&
                  p < 1 &&
                  (r || e.params.cssMode) &&
                  n < i,
                b =
                  (l === s || l === s + 1) &&
                  p < 0 &&
                  p > -1 &&
                  (r || e.params.cssMode) &&
                  n > i;
              if (w || b) {
                const e = (1 - Math.abs((Math.abs(p) - 0.5) / 0.5)) ** 0.5;
                (g += -28 * p * e),
                  (f += -0.5 * e),
                  (v += 96 * e),
                  (h = -25 * e * Math.abs(p) + "%");
              }
              if (
                ((u =
                  p < 0
                    ? `calc(${u}px + (${v * Math.abs(p)}%))`
                    : p > 0
                    ? `calc(${u}px + (-${v * Math.abs(p)}%))`
                    : `${u}px`),
                !e.isHorizontal())
              ) {
                const e = h;
                (h = u), (u = e);
              }
              const x = `\n        translate3d(${u}, ${h}, ${m}px)\n        rotateZ(${g}deg)\n        scale(${
                p < 0 ? "" + (1 + (1 - f) * p) : "" + (1 - (1 - f) * p)
              })\n      `;
              if (a.slideShadows) {
                let e = o.find(".swiper-slide-shadow");
                0 === e.length && (e = Z(a, o)),
                  e.length &&
                    (e[0].style.opacity = Math.min(
                      Math.max((Math.abs(p) - 0.5) / 0.5, 0),
                      1
                    ));
              }
              o[0].style.zIndex = -Math.abs(Math.round(d)) + t.length;
              U(a, o).transform(x);
            }
          },
          setTransition: (t) => {
            const { transformEl: s } = e.params.cardsEffect;
            (s ? e.slides.find(s) : e.slides)
              .transition(t)
              .find(".swiper-slide-shadow")
              .transition(t),
              K({ swiper: e, duration: t, transformEl: s });
          },
          perspective: () => !0,
          overwriteParams: () => ({
            watchSlidesProgress: !0,
            virtualTranslate: !e.params.cssMode,
          }),
        });
    },
  ];
  return H.use(J), H;
});
//# sourceMappingURL=swiper-bundle.min.js.map

// SCROLLBAR

!(function (t, e) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define([], e)
    : "object" == typeof exports
    ? (exports.Scrollbar = e())
    : (t.Scrollbar = e());
})(this, function () {
  return (function (t) {
    var e = {};
    function n(r) {
      if (e[r]) return e[r].exports;
      var o = (e[r] = { i: r, l: !1, exports: {} });
      return t[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
    }
    return (
      (n.m = t),
      (n.c = e),
      (n.d = function (t, e, r) {
        n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: r });
      }),
      (n.r = function (t) {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(t, "__esModule", { value: !0 });
      }),
      (n.t = function (t, e) {
        if ((1 & e && (t = n(t)), 8 & e)) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var r = Object.create(null);
        if (
          (n.r(r),
          Object.defineProperty(r, "default", { enumerable: !0, value: t }),
          2 & e && "string" != typeof t)
        )
          for (var o in t)
            n.d(
              r,
              o,
              function (e) {
                return t[e];
              }.bind(null, o)
            );
        return r;
      }),
      (n.n = function (t) {
        var e =
          t && t.__esModule
            ? function () {
                return t.default;
              }
            : function () {
                return t;
              };
        return n.d(e, "a", e), e;
      }),
      (n.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
      }),
      (n.p = ""),
      n((n.s = 67))
    );
  })([
    function (t, e, n) {
      (function (e) {
        var n = function (t) {
          return t && t.Math == Math && t;
        };
        t.exports =
          n("object" == typeof globalThis && globalThis) ||
          n("object" == typeof window && window) ||
          n("object" == typeof self && self) ||
          n("object" == typeof e && e) ||
          Function("return this")();
      }).call(this, n(43));
    },
    function (t, e, n) {
      var r = n(0),
        o = n(51),
        i = n(3),
        u = n(29),
        c = n(56),
        a = n(76),
        s = o("wks"),
        f = r.Symbol,
        l = a ? f : (f && f.withoutSetter) || u;
      t.exports = function (t) {
        return (
          i(s, t) || (c && i(f, t) ? (s[t] = f[t]) : (s[t] = l("Symbol." + t))),
          s[t]
        );
      };
    },
    function (t, e) {
      t.exports = function (t) {
        return "object" == typeof t ? null !== t : "function" == typeof t;
      };
    },
    function (t, e) {
      var n = {}.hasOwnProperty;
      t.exports = function (t, e) {
        return n.call(t, e);
      };
    },
    function (t, e) {
      t.exports = function (t) {
        try {
          return !!t();
        } catch (t) {
          return !0;
        }
      };
    },
    function (t, e, n) {
      var r = n(6),
        o = n(46),
        i = n(7),
        u = n(25),
        c = Object.defineProperty;
      e.f = r
        ? c
        : function (t, e, n) {
            if ((i(t), (e = u(e, !0)), i(n), o))
              try {
                return c(t, e, n);
              } catch (t) {}
            if ("get" in n || "set" in n)
              throw TypeError("Accessors not supported");
            return "value" in n && (t[e] = n.value), t;
          };
    },
    function (t, e, n) {
      var r = n(4);
      t.exports = !r(function () {
        return (
          7 !=
          Object.defineProperty({}, 1, {
            get: function () {
              return 7;
            },
          })[1]
        );
      });
    },
    function (t, e, n) {
      var r = n(2);
      t.exports = function (t) {
        if (!r(t)) throw TypeError(String(t) + " is not an object");
        return t;
      };
    },
    function (t, e, n) {
      var r = n(6),
        o = n(5),
        i = n(14);
      t.exports = r
        ? function (t, e, n) {
            return o.f(t, e, i(1, n));
          }
        : function (t, e, n) {
            return (t[e] = n), t;
          };
    },
    function (t, e, n) {
      var r,
        o,
        i,
        u = n(50),
        c = n(0),
        a = n(2),
        s = n(8),
        f = n(3),
        l = n(27),
        p = n(16),
        h = c.WeakMap;
      if (u) {
        var d = new h(),
          v = d.get,
          y = d.has,
          m = d.set;
        (r = function (t, e) {
          return m.call(d, t, e), e;
        }),
          (o = function (t) {
            return v.call(d, t) || {};
          }),
          (i = function (t) {
            return y.call(d, t);
          });
      } else {
        var g = l("state");
        (p[g] = !0),
          (r = function (t, e) {
            return s(t, g, e), e;
          }),
          (o = function (t) {
            return f(t, g) ? t[g] : {};
          }),
          (i = function (t) {
            return f(t, g);
          });
      }
      t.exports = {
        set: r,
        get: o,
        has: i,
        enforce: function (t) {
          return i(t) ? o(t) : r(t, {});
        },
        getterFor: function (t) {
          return function (e) {
            var n;
            if (!a(e) || (n = o(e)).type !== t)
              throw TypeError("Incompatible receiver, " + t + " required");
            return n;
          };
        },
      };
    },
    function (t, e, n) {
      var r = n(0);
      t.exports = r;
    },
    function (t, e, n) {
      var r = n(0),
        o = n(8),
        i = n(3),
        u = n(26),
        c = n(48),
        a = n(9),
        s = a.get,
        f = a.enforce,
        l = String(String).split("String");
      (t.exports = function (t, e, n, c) {
        var a = !!c && !!c.unsafe,
          s = !!c && !!c.enumerable,
          p = !!c && !!c.noTargetGet;
        "function" == typeof n &&
          ("string" != typeof e || i(n, "name") || o(n, "name", e),
          (f(n).source = l.join("string" == typeof e ? e : ""))),
          t !== r
            ? (a ? !p && t[e] && (s = !0) : delete t[e],
              s ? (t[e] = n) : o(t, e, n))
            : s
            ? (t[e] = n)
            : u(e, n);
      })(Function.prototype, "toString", function () {
        return ("function" == typeof this && s(this).source) || c(this);
      });
    },
    function (t, e) {
      t.exports = {};
    },
    function (t, e, n) {
      var r = n(0),
        o = n(44).f,
        i = n(8),
        u = n(11),
        c = n(26),
        a = n(70),
        s = n(54);
      t.exports = function (t, e) {
        var n,
          f,
          l,
          p,
          h,
          d = t.target,
          v = t.global,
          y = t.stat;
        if ((n = v ? r : y ? r[d] || c(d, {}) : (r[d] || {}).prototype))
          for (f in e) {
            if (
              ((p = e[f]),
              (l = t.noTargetGet ? (h = o(n, f)) && h.value : n[f]),
              !s(v ? f : d + (y ? "." : "#") + f, t.forced) && void 0 !== l)
            ) {
              if (typeof p == typeof l) continue;
              a(p, l);
            }
            (t.sham || (l && l.sham)) && i(p, "sham", !0), u(n, f, p, t);
          }
      };
    },
    function (t, e) {
      t.exports = function (t, e) {
        return {
          enumerable: !(1 & t),
          configurable: !(2 & t),
          writable: !(4 & t),
          value: e,
        };
      };
    },
    function (t, e, n) {
      var r = n(22),
        o = n(24);
      t.exports = function (t) {
        return r(o(t));
      };
    },
    function (t, e) {
      t.exports = {};
    },
    function (t, e, n) {
      var r = n(31),
        o = Math.min;
      t.exports = function (t) {
        return t > 0 ? o(r(t), 9007199254740991) : 0;
      };
    },
    function (t, e, n) {
      var r = n(16),
        o = n(2),
        i = n(3),
        u = n(5).f,
        c = n(29),
        a = n(75),
        s = c("meta"),
        f = 0,
        l =
          Object.isExtensible ||
          function () {
            return !0;
          },
        p = function (t) {
          u(t, s, { value: { objectID: "O" + ++f, weakData: {} } });
        },
        h = (t.exports = {
          REQUIRED: !1,
          fastKey: function (t, e) {
            if (!o(t))
              return "symbol" == typeof t
                ? t
                : ("string" == typeof t ? "S" : "P") + t;
            if (!i(t, s)) {
              if (!l(t)) return "F";
              if (!e) return "E";
              p(t);
            }
            return t[s].objectID;
          },
          getWeakData: function (t, e) {
            if (!i(t, s)) {
              if (!l(t)) return !0;
              if (!e) return !1;
              p(t);
            }
            return t[s].weakData;
          },
          onFreeze: function (t) {
            return a && h.REQUIRED && l(t) && !i(t, s) && p(t), t;
          },
        });
      r[s] = !0;
    },
    function (t, e, n) {
      var r = n(77);
      t.exports = function (t, e, n) {
        if ((r(t), void 0 === e)) return t;
        switch (n) {
          case 0:
            return function () {
              return t.call(e);
            };
          case 1:
            return function (n) {
              return t.call(e, n);
            };
          case 2:
            return function (n, r) {
              return t.call(e, n, r);
            };
          case 3:
            return function (n, r, o) {
              return t.call(e, n, r, o);
            };
        }
        return function () {
          return t.apply(e, arguments);
        };
      };
    },
    function (t, e, n) {
      var r = n(24);
      t.exports = function (t) {
        return Object(r(t));
      };
    },
    function (t, e, n) {
      "use strict";
      var r = n(13),
        o = n(0),
        i = n(54),
        u = n(11),
        c = n(18),
        a = n(33),
        s = n(35),
        f = n(2),
        l = n(4),
        p = n(60),
        h = n(36),
        d = n(78);
      t.exports = function (t, e, n) {
        var v = -1 !== t.indexOf("Map"),
          y = -1 !== t.indexOf("Weak"),
          m = v ? "set" : "add",
          g = o[t],
          b = g && g.prototype,
          x = g,
          w = {},
          S = function (t) {
            var e = b[t];
            u(
              b,
              t,
              "add" == t
                ? function (t) {
                    return e.call(this, 0 === t ? 0 : t), this;
                  }
                : "delete" == t
                ? function (t) {
                    return !(y && !f(t)) && e.call(this, 0 === t ? 0 : t);
                  }
                : "get" == t
                ? function (t) {
                    return y && !f(t) ? void 0 : e.call(this, 0 === t ? 0 : t);
                  }
                : "has" == t
                ? function (t) {
                    return !(y && !f(t)) && e.call(this, 0 === t ? 0 : t);
                  }
                : function (t, n) {
                    return e.call(this, 0 === t ? 0 : t, n), this;
                  }
            );
          };
        if (
          i(
            t,
            "function" != typeof g ||
              !(
                y ||
                (b.forEach &&
                  !l(function () {
                    new g().entries().next();
                  }))
              )
          )
        )
          (x = n.getConstructor(e, t, v, m)), (c.REQUIRED = !0);
        else if (i(t, !0)) {
          var O = new x(),
            E = O[m](y ? {} : -0, 1) != O,
            _ = l(function () {
              O.has(1);
            }),
            T = p(function (t) {
              new g(t);
            }),
            A =
              !y &&
              l(function () {
                for (var t = new g(), e = 5; e--; ) t[m](e, e);
                return !t.has(-0);
              });
          T ||
            (((x = e(function (e, n) {
              s(e, x, t);
              var r = d(new g(), e, x);
              return null != n && a(n, r[m], r, v), r;
            })).prototype = b),
            (b.constructor = x)),
            (_ || A) && (S("delete"), S("has"), v && S("get")),
            (A || E) && S(m),
            y && b.clear && delete b.clear;
        }
        return (
          (w[t] = x),
          r({ global: !0, forced: x != g }, w),
          h(x, t),
          y || n.setStrong(x, t, v),
          x
        );
      };
    },
    function (t, e, n) {
      var r = n(4),
        o = n(23),
        i = "".split;
      t.exports = r(function () {
        return !Object("z").propertyIsEnumerable(0);
      })
        ? function (t) {
            return "String" == o(t) ? i.call(t, "") : Object(t);
          }
        : Object;
    },
    function (t, e) {
      var n = {}.toString;
      t.exports = function (t) {
        return n.call(t).slice(8, -1);
      };
    },
    function (t, e) {
      t.exports = function (t) {
        if (null == t) throw TypeError("Can't call method on " + t);
        return t;
      };
    },
    function (t, e, n) {
      var r = n(2);
      t.exports = function (t, e) {
        if (!r(t)) return t;
        var n, o;
        if (e && "function" == typeof (n = t.toString) && !r((o = n.call(t))))
          return o;
        if ("function" == typeof (n = t.valueOf) && !r((o = n.call(t))))
          return o;
        if (!e && "function" == typeof (n = t.toString) && !r((o = n.call(t))))
          return o;
        throw TypeError("Can't convert object to primitive value");
      };
    },
    function (t, e, n) {
      var r = n(0),
        o = n(8);
      t.exports = function (t, e) {
        try {
          o(r, t, e);
        } catch (n) {
          r[t] = e;
        }
        return e;
      };
    },
    function (t, e, n) {
      var r = n(51),
        o = n(29),
        i = r("keys");
      t.exports = function (t) {
        return i[t] || (i[t] = o(t));
      };
    },
    function (t, e) {
      t.exports = !1;
    },
    function (t, e) {
      var n = 0,
        r = Math.random();
      t.exports = function (t) {
        return (
          "Symbol(" +
          String(void 0 === t ? "" : t) +
          ")_" +
          (++n + r).toString(36)
        );
      };
    },
    function (t, e, n) {
      var r = n(10),
        o = n(0),
        i = function (t) {
          return "function" == typeof t ? t : void 0;
        };
      t.exports = function (t, e) {
        return arguments.length < 2
          ? i(r[t]) || i(o[t])
          : (r[t] && r[t][e]) || (o[t] && o[t][e]);
      };
    },
    function (t, e) {
      var n = Math.ceil,
        r = Math.floor;
      t.exports = function (t) {
        return isNaN((t = +t)) ? 0 : (t > 0 ? r : n)(t);
      };
    },
    function (t, e) {
      t.exports = [
        "constructor",
        "hasOwnProperty",
        "isPrototypeOf",
        "propertyIsEnumerable",
        "toLocaleString",
        "toString",
        "valueOf",
      ];
    },
    function (t, e, n) {
      var r = n(7),
        o = n(55),
        i = n(17),
        u = n(19),
        c = n(57),
        a = n(59),
        s = function (t, e) {
          (this.stopped = t), (this.result = e);
        };
      (t.exports = function (t, e, n, f, l) {
        var p,
          h,
          d,
          v,
          y,
          m,
          g,
          b = u(e, n, f ? 2 : 1);
        if (l) p = t;
        else {
          if ("function" != typeof (h = c(t)))
            throw TypeError("Target is not iterable");
          if (o(h)) {
            for (d = 0, v = i(t.length); v > d; d++)
              if (
                (y = f ? b(r((g = t[d]))[0], g[1]) : b(t[d])) &&
                y instanceof s
              )
                return y;
            return new s(!1);
          }
          p = h.call(t);
        }
        for (m = p.next; !(g = m.call(p)).done; )
          if (
            "object" == typeof (y = a(p, b, g.value, f)) &&
            y &&
            y instanceof s
          )
            return y;
        return new s(!1);
      }).stop = function (t) {
        return new s(!0, t);
      };
    },
    function (t, e, n) {
      var r = {};
      (r[n(1)("toStringTag")] = "z"), (t.exports = "[object z]" === String(r));
    },
    function (t, e) {
      t.exports = function (t, e, n) {
        if (!(t instanceof e))
          throw TypeError("Incorrect " + (n ? n + " " : "") + "invocation");
        return t;
      };
    },
    function (t, e, n) {
      var r = n(5).f,
        o = n(3),
        i = n(1)("toStringTag");
      t.exports = function (t, e, n) {
        t &&
          !o((t = n ? t : t.prototype), i) &&
          r(t, i, { configurable: !0, value: e });
      };
    },
    function (t, e, n) {
      var r,
        o = n(7),
        i = n(80),
        u = n(32),
        c = n(16),
        a = n(81),
        s = n(47),
        f = n(27)("IE_PROTO"),
        l = function () {},
        p = function (t) {
          return "<script>" + t + "</script>";
        },
        h = function () {
          try {
            r = document.domain && new ActiveXObject("htmlfile");
          } catch (t) {}
          h = r
            ? (function (t) {
                t.write(p("")), t.close();
                var e = t.parentWindow.Object;
                return (t = null), e;
              })(r)
            : (function () {
                var t,
                  e = s("iframe");
                return (
                  (e.style.display = "none"),
                  a.appendChild(e),
                  (e.src = String("javascript:")),
                  (t = e.contentWindow.document).open(),
                  t.write(p("document.F=Object")),
                  t.close(),
                  t.F
                );
              })();
          for (var t = u.length; t--; ) delete h.prototype[u[t]];
          return h();
        };
      (c[f] = !0),
        (t.exports =
          Object.create ||
          function (t, e) {
            var n;
            return (
              null !== t
                ? ((l.prototype = o(t)),
                  (n = new l()),
                  (l.prototype = null),
                  (n[f] = t))
                : (n = h()),
              void 0 === e ? n : i(n, e)
            );
          });
    },
    function (t, e, n) {
      var r = n(11);
      t.exports = function (t, e, n) {
        for (var o in e) r(t, o, e[o], n);
        return t;
      };
    },
    function (t, e, n) {
      "use strict";
      var r = n(13),
        o = n(82),
        i = n(65),
        u = n(61),
        c = n(36),
        a = n(8),
        s = n(11),
        f = n(1),
        l = n(28),
        p = n(12),
        h = n(64),
        d = h.IteratorPrototype,
        v = h.BUGGY_SAFARI_ITERATORS,
        y = f("iterator"),
        m = function () {
          return this;
        };
      t.exports = function (t, e, n, f, h, g, b) {
        o(n, e, f);
        var x,
          w,
          S,
          O = function (t) {
            if (t === h && j) return j;
            if (!v && t in T) return T[t];
            switch (t) {
              case "keys":
              case "values":
              case "entries":
                return function () {
                  return new n(this, t);
                };
            }
            return function () {
              return new n(this);
            };
          },
          E = e + " Iterator",
          _ = !1,
          T = t.prototype,
          A = T[y] || T["@@iterator"] || (h && T[h]),
          j = (!v && A) || O(h),
          P = ("Array" == e && T.entries) || A;
        if (
          (P &&
            ((x = i(P.call(new t()))),
            d !== Object.prototype &&
              x.next &&
              (l ||
                i(x) === d ||
                (u ? u(x, d) : "function" != typeof x[y] && a(x, y, m)),
              c(x, E, !0, !0),
              l && (p[E] = m))),
          "values" == h &&
            A &&
            "values" !== A.name &&
            ((_ = !0),
            (j = function () {
              return A.call(this);
            })),
          (l && !b) || T[y] === j || a(T, y, j),
          (p[e] = j),
          h)
        )
          if (
            ((w = {
              values: O("values"),
              keys: g ? j : O("keys"),
              entries: O("entries"),
            }),
            b)
          )
            for (S in w) (!v && !_ && S in T) || s(T, S, w[S]);
          else r({ target: e, proto: !0, forced: v || _ }, w);
        return w;
      };
    },
    function (t, e, n) {
      var r = n(34),
        o = n(11),
        i = n(85);
      r || o(Object.prototype, "toString", i, { unsafe: !0 });
    },
    function (t, e, n) {
      "use strict";
      var r = n(86).charAt,
        o = n(9),
        i = n(39),
        u = o.set,
        c = o.getterFor("String Iterator");
      i(
        String,
        "String",
        function (t) {
          u(this, { type: "String Iterator", string: String(t), index: 0 });
        },
        function () {
          var t,
            e = c(this),
            n = e.string,
            o = e.index;
          return o >= n.length
            ? { value: void 0, done: !0 }
            : ((t = r(n, o)), (e.index += t.length), { value: t, done: !1 });
        }
      );
    },
    function (t, e, n) {
      var r = n(0),
        o = n(87),
        i = n(88),
        u = n(8),
        c = n(1),
        a = c("iterator"),
        s = c("toStringTag"),
        f = i.values;
      for (var l in o) {
        var p = r[l],
          h = p && p.prototype;
        if (h) {
          if (h[a] !== f)
            try {
              u(h, a, f);
            } catch (t) {
              h[a] = f;
            }
          if ((h[s] || u(h, s, l), o[l]))
            for (var d in i)
              if (h[d] !== i[d])
                try {
                  u(h, d, i[d]);
                } catch (t) {
                  h[d] = i[d];
                }
        }
      }
    },
    function (t, e) {
      var n;
      n = (function () {
        return this;
      })();
      try {
        n = n || new Function("return this")();
      } catch (t) {
        "object" == typeof window && (n = window);
      }
      t.exports = n;
    },
    function (t, e, n) {
      var r = n(6),
        o = n(45),
        i = n(14),
        u = n(15),
        c = n(25),
        a = n(3),
        s = n(46),
        f = Object.getOwnPropertyDescriptor;
      e.f = r
        ? f
        : function (t, e) {
            if (((t = u(t)), (e = c(e, !0)), s))
              try {
                return f(t, e);
              } catch (t) {}
            if (a(t, e)) return i(!o.f.call(t, e), t[e]);
          };
    },
    function (t, e, n) {
      "use strict";
      var r = {}.propertyIsEnumerable,
        o = Object.getOwnPropertyDescriptor,
        i = o && !r.call({ 1: 2 }, 1);
      e.f = i
        ? function (t) {
            var e = o(this, t);
            return !!e && e.enumerable;
          }
        : r;
    },
    function (t, e, n) {
      var r = n(6),
        o = n(4),
        i = n(47);
      t.exports =
        !r &&
        !o(function () {
          return (
            7 !=
            Object.defineProperty(i("div"), "a", {
              get: function () {
                return 7;
              },
            }).a
          );
        });
    },
    function (t, e, n) {
      var r = n(0),
        o = n(2),
        i = r.document,
        u = o(i) && o(i.createElement);
      t.exports = function (t) {
        return u ? i.createElement(t) : {};
      };
    },
    function (t, e, n) {
      var r = n(49),
        o = Function.toString;
      "function" != typeof r.inspectSource &&
        (r.inspectSource = function (t) {
          return o.call(t);
        }),
        (t.exports = r.inspectSource);
    },
    function (t, e, n) {
      var r = n(0),
        o = n(26),
        i = r["__core-js_shared__"] || o("__core-js_shared__", {});
      t.exports = i;
    },
    function (t, e, n) {
      var r = n(0),
        o = n(48),
        i = r.WeakMap;
      t.exports = "function" == typeof i && /native code/.test(o(i));
    },
    function (t, e, n) {
      var r = n(28),
        o = n(49);
      (t.exports = function (t, e) {
        return o[t] || (o[t] = void 0 !== e ? e : {});
      })("versions", []).push({
        version: "3.6.4",
        mode: r ? "pure" : "global",
        copyright: "Â© 2020 Denis Pushkarev (zloirock.ru)",
      });
    },
    function (t, e, n) {
      var r = n(3),
        o = n(15),
        i = n(73).indexOf,
        u = n(16);
      t.exports = function (t, e) {
        var n,
          c = o(t),
          a = 0,
          s = [];
        for (n in c) !r(u, n) && r(c, n) && s.push(n);
        for (; e.length > a; ) r(c, (n = e[a++])) && (~i(s, n) || s.push(n));
        return s;
      };
    },
    function (t, e) {
      e.f = Object.getOwnPropertySymbols;
    },
    function (t, e, n) {
      var r = n(4),
        o = /#|\.prototype\./,
        i = function (t, e) {
          var n = c[u(t)];
          return n == s || (n != a && ("function" == typeof e ? r(e) : !!e));
        },
        u = (i.normalize = function (t) {
          return String(t).replace(o, ".").toLowerCase();
        }),
        c = (i.data = {}),
        a = (i.NATIVE = "N"),
        s = (i.POLYFILL = "P");
      t.exports = i;
    },
    function (t, e, n) {
      var r = n(1),
        o = n(12),
        i = r("iterator"),
        u = Array.prototype;
      t.exports = function (t) {
        return void 0 !== t && (o.Array === t || u[i] === t);
      };
    },
    function (t, e, n) {
      var r = n(4);
      t.exports =
        !!Object.getOwnPropertySymbols &&
        !r(function () {
          return !String(Symbol());
        });
    },
    function (t, e, n) {
      var r = n(58),
        o = n(12),
        i = n(1)("iterator");
      t.exports = function (t) {
        if (null != t) return t[i] || t["@@iterator"] || o[r(t)];
      };
    },
    function (t, e, n) {
      var r = n(34),
        o = n(23),
        i = n(1)("toStringTag"),
        u =
          "Arguments" ==
          o(
            (function () {
              return arguments;
            })()
          );
      t.exports = r
        ? o
        : function (t) {
            var e, n, r;
            return void 0 === t
              ? "Undefined"
              : null === t
              ? "Null"
              : "string" ==
                typeof (n = (function (t, e) {
                  try {
                    return t[e];
                  } catch (t) {}
                })((e = Object(t)), i))
              ? n
              : u
              ? o(e)
              : "Object" == (r = o(e)) && "function" == typeof e.callee
              ? "Arguments"
              : r;
          };
    },
    function (t, e, n) {
      var r = n(7);
      t.exports = function (t, e, n, o) {
        try {
          return o ? e(r(n)[0], n[1]) : e(n);
        } catch (e) {
          var i = t.return;
          throw (void 0 !== i && r(i.call(t)), e);
        }
      };
    },
    function (t, e, n) {
      var r = n(1)("iterator"),
        o = !1;
      try {
        var i = 0,
          u = {
            next: function () {
              return { done: !!i++ };
            },
            return: function () {
              o = !0;
            },
          };
        (u[r] = function () {
          return this;
        }),
          Array.from(u, function () {
            throw 2;
          });
      } catch (t) {}
      t.exports = function (t, e) {
        if (!e && !o) return !1;
        var n = !1;
        try {
          var i = {};
          (i[r] = function () {
            return {
              next: function () {
                return { done: (n = !0) };
              },
            };
          }),
            t(i);
        } catch (t) {}
        return n;
      };
    },
    function (t, e, n) {
      var r = n(7),
        o = n(79);
      t.exports =
        Object.setPrototypeOf ||
        ("__proto__" in {}
          ? (function () {
              var t,
                e = !1,
                n = {};
              try {
                (t = Object.getOwnPropertyDescriptor(
                  Object.prototype,
                  "__proto__"
                ).set).call(n, []),
                  (e = n instanceof Array);
              } catch (t) {}
              return function (n, i) {
                return r(n), o(i), e ? t.call(n, i) : (n.__proto__ = i), n;
              };
            })()
          : void 0);
    },
    function (t, e, n) {
      "use strict";
      var r = n(5).f,
        o = n(37),
        i = n(38),
        u = n(19),
        c = n(35),
        a = n(33),
        s = n(39),
        f = n(84),
        l = n(6),
        p = n(18).fastKey,
        h = n(9),
        d = h.set,
        v = h.getterFor;
      t.exports = {
        getConstructor: function (t, e, n, s) {
          var f = t(function (t, r) {
              c(t, f, e),
                d(t, {
                  type: e,
                  index: o(null),
                  first: void 0,
                  last: void 0,
                  size: 0,
                }),
                l || (t.size = 0),
                null != r && a(r, t[s], t, n);
            }),
            h = v(e),
            y = function (t, e, n) {
              var r,
                o,
                i = h(t),
                u = m(t, e);
              return (
                u
                  ? (u.value = n)
                  : ((i.last = u =
                      {
                        index: (o = p(e, !0)),
                        key: e,
                        value: n,
                        previous: (r = i.last),
                        next: void 0,
                        removed: !1,
                      }),
                    i.first || (i.first = u),
                    r && (r.next = u),
                    l ? i.size++ : t.size++,
                    "F" !== o && (i.index[o] = u)),
                t
              );
            },
            m = function (t, e) {
              var n,
                r = h(t),
                o = p(e);
              if ("F" !== o) return r.index[o];
              for (n = r.first; n; n = n.next) if (n.key == e) return n;
            };
          return (
            i(f.prototype, {
              clear: function () {
                for (var t = h(this), e = t.index, n = t.first; n; )
                  (n.removed = !0),
                    n.previous && (n.previous = n.previous.next = void 0),
                    delete e[n.index],
                    (n = n.next);
                (t.first = t.last = void 0), l ? (t.size = 0) : (this.size = 0);
              },
              delete: function (t) {
                var e = h(this),
                  n = m(this, t);
                if (n) {
                  var r = n.next,
                    o = n.previous;
                  delete e.index[n.index],
                    (n.removed = !0),
                    o && (o.next = r),
                    r && (r.previous = o),
                    e.first == n && (e.first = r),
                    e.last == n && (e.last = o),
                    l ? e.size-- : this.size--;
                }
                return !!n;
              },
              forEach: function (t) {
                for (
                  var e,
                    n = h(this),
                    r = u(t, arguments.length > 1 ? arguments[1] : void 0, 3);
                  (e = e ? e.next : n.first);

                )
                  for (r(e.value, e.key, this); e && e.removed; )
                    e = e.previous;
              },
              has: function (t) {
                return !!m(this, t);
              },
            }),
            i(
              f.prototype,
              n
                ? {
                    get: function (t) {
                      var e = m(this, t);
                      return e && e.value;
                    },
                    set: function (t, e) {
                      return y(this, 0 === t ? 0 : t, e);
                    },
                  }
                : {
                    add: function (t) {
                      return y(this, (t = 0 === t ? 0 : t), t);
                    },
                  }
            ),
            l &&
              r(f.prototype, "size", {
                get: function () {
                  return h(this).size;
                },
              }),
            f
          );
        },
        setStrong: function (t, e, n) {
          var r = e + " Iterator",
            o = v(e),
            i = v(r);
          s(
            t,
            e,
            function (t, e) {
              d(this, {
                type: r,
                target: t,
                state: o(t),
                kind: e,
                last: void 0,
              });
            },
            function () {
              for (var t = i(this), e = t.kind, n = t.last; n && n.removed; )
                n = n.previous;
              return t.target && (t.last = n = n ? n.next : t.state.first)
                ? "keys" == e
                  ? { value: n.key, done: !1 }
                  : "values" == e
                  ? { value: n.value, done: !1 }
                  : { value: [n.key, n.value], done: !1 }
                : ((t.target = void 0), { value: void 0, done: !0 });
            },
            n ? "entries" : "values",
            !n,
            !0
          ),
            f(e);
        },
      };
    },
    function (t, e, n) {
      var r = n(52),
        o = n(32);
      t.exports =
        Object.keys ||
        function (t) {
          return r(t, o);
        };
    },
    function (t, e, n) {
      "use strict";
      var r,
        o,
        i,
        u = n(65),
        c = n(8),
        a = n(3),
        s = n(1),
        f = n(28),
        l = s("iterator"),
        p = !1;
      [].keys &&
        ("next" in (i = [].keys())
          ? (o = u(u(i))) !== Object.prototype && (r = o)
          : (p = !0)),
        null == r && (r = {}),
        f ||
          a(r, l) ||
          c(r, l, function () {
            return this;
          }),
        (t.exports = { IteratorPrototype: r, BUGGY_SAFARI_ITERATORS: p });
    },
    function (t, e, n) {
      var r = n(3),
        o = n(20),
        i = n(27),
        u = n(83),
        c = i("IE_PROTO"),
        a = Object.prototype;
      t.exports = u
        ? Object.getPrototypeOf
        : function (t) {
            return (
              (t = o(t)),
              r(t, c)
                ? t[c]
                : "function" == typeof t.constructor &&
                  t instanceof t.constructor
                ? t.constructor.prototype
                : t instanceof Object
                ? a
                : null
            );
          };
    },
    function (t, e, n) {
      "use strict";
      (function (t) {
        var n = "object" == typeof t && t && t.Object === Object && t;
        e.a = n;
      }).call(this, n(43));
    },
    function (t, e, n) {
      t.exports = n(105);
    },
    function (t, e, n) {
      n(69), n(40), n(41), n(42);
      var r = n(10);
      t.exports = r.Map;
    },
    function (t, e, n) {
      "use strict";
      var r = n(21),
        o = n(62);
      t.exports = r(
        "Map",
        function (t) {
          return function () {
            return t(this, arguments.length ? arguments[0] : void 0);
          };
        },
        o
      );
    },
    function (t, e, n) {
      var r = n(3),
        o = n(71),
        i = n(44),
        u = n(5);
      t.exports = function (t, e) {
        for (var n = o(e), c = u.f, a = i.f, s = 0; s < n.length; s++) {
          var f = n[s];
          r(t, f) || c(t, f, a(e, f));
        }
      };
    },
    function (t, e, n) {
      var r = n(30),
        o = n(72),
        i = n(53),
        u = n(7);
      t.exports =
        r("Reflect", "ownKeys") ||
        function (t) {
          var e = o.f(u(t)),
            n = i.f;
          return n ? e.concat(n(t)) : e;
        };
    },
    function (t, e, n) {
      var r = n(52),
        o = n(32).concat("length", "prototype");
      e.f =
        Object.getOwnPropertyNames ||
        function (t) {
          return r(t, o);
        };
    },
    function (t, e, n) {
      var r = n(15),
        o = n(17),
        i = n(74),
        u = function (t) {
          return function (e, n, u) {
            var c,
              a = r(e),
              s = o(a.length),
              f = i(u, s);
            if (t && n != n) {
              for (; s > f; ) if ((c = a[f++]) != c) return !0;
            } else
              for (; s > f; f++)
                if ((t || f in a) && a[f] === n) return t || f || 0;
            return !t && -1;
          };
        };
      t.exports = { includes: u(!0), indexOf: u(!1) };
    },
    function (t, e, n) {
      var r = n(31),
        o = Math.max,
        i = Math.min;
      t.exports = function (t, e) {
        var n = r(t);
        return n < 0 ? o(n + e, 0) : i(n, e);
      };
    },
    function (t, e, n) {
      var r = n(4);
      t.exports = !r(function () {
        return Object.isExtensible(Object.preventExtensions({}));
      });
    },
    function (t, e, n) {
      var r = n(56);
      t.exports = r && !Symbol.sham && "symbol" == typeof Symbol.iterator;
    },
    function (t, e) {
      t.exports = function (t) {
        if ("function" != typeof t)
          throw TypeError(String(t) + " is not a function");
        return t;
      };
    },
    function (t, e, n) {
      var r = n(2),
        o = n(61);
      t.exports = function (t, e, n) {
        var i, u;
        return (
          o &&
            "function" == typeof (i = e.constructor) &&
            i !== n &&
            r((u = i.prototype)) &&
            u !== n.prototype &&
            o(t, u),
          t
        );
      };
    },
    function (t, e, n) {
      var r = n(2);
      t.exports = function (t) {
        if (!r(t) && null !== t)
          throw TypeError("Can't set " + String(t) + " as a prototype");
        return t;
      };
    },
    function (t, e, n) {
      var r = n(6),
        o = n(5),
        i = n(7),
        u = n(63);
      t.exports = r
        ? Object.defineProperties
        : function (t, e) {
            i(t);
            for (var n, r = u(e), c = r.length, a = 0; c > a; )
              o.f(t, (n = r[a++]), e[n]);
            return t;
          };
    },
    function (t, e, n) {
      var r = n(30);
      t.exports = r("document", "documentElement");
    },
    function (t, e, n) {
      "use strict";
      var r = n(64).IteratorPrototype,
        o = n(37),
        i = n(14),
        u = n(36),
        c = n(12),
        a = function () {
          return this;
        };
      t.exports = function (t, e, n) {
        var s = e + " Iterator";
        return (
          (t.prototype = o(r, { next: i(1, n) })),
          u(t, s, !1, !0),
          (c[s] = a),
          t
        );
      };
    },
    function (t, e, n) {
      var r = n(4);
      t.exports = !r(function () {
        function t() {}
        return (
          (t.prototype.constructor = null),
          Object.getPrototypeOf(new t()) !== t.prototype
        );
      });
    },
    function (t, e, n) {
      "use strict";
      var r = n(30),
        o = n(5),
        i = n(1),
        u = n(6),
        c = i("species");
      t.exports = function (t) {
        var e = r(t),
          n = o.f;
        u &&
          e &&
          !e[c] &&
          n(e, c, {
            configurable: !0,
            get: function () {
              return this;
            },
          });
      };
    },
    function (t, e, n) {
      "use strict";
      var r = n(34),
        o = n(58);
      t.exports = r
        ? {}.toString
        : function () {
            return "[object " + o(this) + "]";
          };
    },
    function (t, e, n) {
      var r = n(31),
        o = n(24),
        i = function (t) {
          return function (e, n) {
            var i,
              u,
              c = String(o(e)),
              a = r(n),
              s = c.length;
            return a < 0 || a >= s
              ? t
                ? ""
                : void 0
              : (i = c.charCodeAt(a)) < 55296 ||
                i > 56319 ||
                a + 1 === s ||
                (u = c.charCodeAt(a + 1)) < 56320 ||
                u > 57343
              ? t
                ? c.charAt(a)
                : i
              : t
              ? c.slice(a, a + 2)
              : u - 56320 + ((i - 55296) << 10) + 65536;
          };
        };
      t.exports = { codeAt: i(!1), charAt: i(!0) };
    },
    function (t, e) {
      t.exports = {
        CSSRuleList: 0,
        CSSStyleDeclaration: 0,
        CSSValueList: 0,
        ClientRectList: 0,
        DOMRectList: 0,
        DOMStringList: 0,
        DOMTokenList: 1,
        DataTransferItemList: 0,
        FileList: 0,
        HTMLAllCollection: 0,
        HTMLCollection: 0,
        HTMLFormElement: 0,
        HTMLSelectElement: 0,
        MediaList: 0,
        MimeTypeArray: 0,
        NamedNodeMap: 0,
        NodeList: 1,
        PaintRequestList: 0,
        Plugin: 0,
        PluginArray: 0,
        SVGLengthList: 0,
        SVGNumberList: 0,
        SVGPathSegList: 0,
        SVGPointList: 0,
        SVGStringList: 0,
        SVGTransformList: 0,
        SourceBufferList: 0,
        StyleSheetList: 0,
        TextTrackCueList: 0,
        TextTrackList: 0,
        TouchList: 0,
      };
    },
    function (t, e, n) {
      "use strict";
      var r = n(15),
        o = n(89),
        i = n(12),
        u = n(9),
        c = n(39),
        a = u.set,
        s = u.getterFor("Array Iterator");
      (t.exports = c(
        Array,
        "Array",
        function (t, e) {
          a(this, { type: "Array Iterator", target: r(t), index: 0, kind: e });
        },
        function () {
          var t = s(this),
            e = t.target,
            n = t.kind,
            r = t.index++;
          return !e || r >= e.length
            ? ((t.target = void 0), { value: void 0, done: !0 })
            : "keys" == n
            ? { value: r, done: !1 }
            : "values" == n
            ? { value: e[r], done: !1 }
            : { value: [r, e[r]], done: !1 };
        },
        "values"
      )),
        (i.Arguments = i.Array),
        o("keys"),
        o("values"),
        o("entries");
    },
    function (t, e, n) {
      var r = n(1),
        o = n(37),
        i = n(5),
        u = r("unscopables"),
        c = Array.prototype;
      null == c[u] && i.f(c, u, { configurable: !0, value: o(null) }),
        (t.exports = function (t) {
          c[u][t] = !0;
        });
    },
    function (t, e, n) {
      n(91), n(40), n(41), n(42);
      var r = n(10);
      t.exports = r.Set;
    },
    function (t, e, n) {
      "use strict";
      var r = n(21),
        o = n(62);
      t.exports = r(
        "Set",
        function (t) {
          return function () {
            return t(this, arguments.length ? arguments[0] : void 0);
          };
        },
        o
      );
    },
    function (t, e, n) {
      n(40), n(93), n(42);
      var r = n(10);
      t.exports = r.WeakMap;
    },
    function (t, e, n) {
      "use strict";
      var r,
        o = n(0),
        i = n(38),
        u = n(18),
        c = n(21),
        a = n(94),
        s = n(2),
        f = n(9).enforce,
        l = n(50),
        p = !o.ActiveXObject && "ActiveXObject" in o,
        h = Object.isExtensible,
        d = function (t) {
          return function () {
            return t(this, arguments.length ? arguments[0] : void 0);
          };
        },
        v = (t.exports = c("WeakMap", d, a));
      if (l && p) {
        (r = a.getConstructor(d, "WeakMap", !0)), (u.REQUIRED = !0);
        var y = v.prototype,
          m = y.delete,
          g = y.has,
          b = y.get,
          x = y.set;
        i(y, {
          delete: function (t) {
            if (s(t) && !h(t)) {
              var e = f(this);
              return (
                e.frozen || (e.frozen = new r()),
                m.call(this, t) || e.frozen.delete(t)
              );
            }
            return m.call(this, t);
          },
          has: function (t) {
            if (s(t) && !h(t)) {
              var e = f(this);
              return (
                e.frozen || (e.frozen = new r()),
                g.call(this, t) || e.frozen.has(t)
              );
            }
            return g.call(this, t);
          },
          get: function (t) {
            if (s(t) && !h(t)) {
              var e = f(this);
              return (
                e.frozen || (e.frozen = new r()),
                g.call(this, t) ? b.call(this, t) : e.frozen.get(t)
              );
            }
            return b.call(this, t);
          },
          set: function (t, e) {
            if (s(t) && !h(t)) {
              var n = f(this);
              n.frozen || (n.frozen = new r()),
                g.call(this, t) ? x.call(this, t, e) : n.frozen.set(t, e);
            } else x.call(this, t, e);
            return this;
          },
        });
      }
    },
    function (t, e, n) {
      "use strict";
      var r = n(38),
        o = n(18).getWeakData,
        i = n(7),
        u = n(2),
        c = n(35),
        a = n(33),
        s = n(95),
        f = n(3),
        l = n(9),
        p = l.set,
        h = l.getterFor,
        d = s.find,
        v = s.findIndex,
        y = 0,
        m = function (t) {
          return t.frozen || (t.frozen = new g());
        },
        g = function () {
          this.entries = [];
        },
        b = function (t, e) {
          return d(t.entries, function (t) {
            return t[0] === e;
          });
        };
      (g.prototype = {
        get: function (t) {
          var e = b(this, t);
          if (e) return e[1];
        },
        has: function (t) {
          return !!b(this, t);
        },
        set: function (t, e) {
          var n = b(this, t);
          n ? (n[1] = e) : this.entries.push([t, e]);
        },
        delete: function (t) {
          var e = v(this.entries, function (e) {
            return e[0] === t;
          });
          return ~e && this.entries.splice(e, 1), !!~e;
        },
      }),
        (t.exports = {
          getConstructor: function (t, e, n, s) {
            var l = t(function (t, r) {
                c(t, l, e),
                  p(t, { type: e, id: y++, frozen: void 0 }),
                  null != r && a(r, t[s], t, n);
              }),
              d = h(e),
              v = function (t, e, n) {
                var r = d(t),
                  u = o(i(e), !0);
                return !0 === u ? m(r).set(e, n) : (u[r.id] = n), t;
              };
            return (
              r(l.prototype, {
                delete: function (t) {
                  var e = d(this);
                  if (!u(t)) return !1;
                  var n = o(t);
                  return !0 === n
                    ? m(e).delete(t)
                    : n && f(n, e.id) && delete n[e.id];
                },
                has: function (t) {
                  var e = d(this);
                  if (!u(t)) return !1;
                  var n = o(t);
                  return !0 === n ? m(e).has(t) : n && f(n, e.id);
                },
              }),
              r(
                l.prototype,
                n
                  ? {
                      get: function (t) {
                        var e = d(this);
                        if (u(t)) {
                          var n = o(t);
                          return !0 === n ? m(e).get(t) : n ? n[e.id] : void 0;
                        }
                      },
                      set: function (t, e) {
                        return v(this, t, e);
                      },
                    }
                  : {
                      add: function (t) {
                        return v(this, t, !0);
                      },
                    }
              ),
              l
            );
          },
        });
    },
    function (t, e, n) {
      var r = n(19),
        o = n(22),
        i = n(20),
        u = n(17),
        c = n(96),
        a = [].push,
        s = function (t) {
          var e = 1 == t,
            n = 2 == t,
            s = 3 == t,
            f = 4 == t,
            l = 6 == t,
            p = 5 == t || l;
          return function (h, d, v, y) {
            for (
              var m,
                g,
                b = i(h),
                x = o(b),
                w = r(d, v, 3),
                S = u(x.length),
                O = 0,
                E = y || c,
                _ = e ? E(h, S) : n ? E(h, 0) : void 0;
              S > O;
              O++
            )
              if ((p || O in x) && ((g = w((m = x[O]), O, b)), t))
                if (e) _[O] = g;
                else if (g)
                  switch (t) {
                    case 3:
                      return !0;
                    case 5:
                      return m;
                    case 6:
                      return O;
                    case 2:
                      a.call(_, m);
                  }
                else if (f) return !1;
            return l ? -1 : s || f ? f : _;
          };
        };
      t.exports = {
        forEach: s(0),
        map: s(1),
        filter: s(2),
        some: s(3),
        every: s(4),
        find: s(5),
        findIndex: s(6),
      };
    },
    function (t, e, n) {
      var r = n(2),
        o = n(97),
        i = n(1)("species");
      t.exports = function (t, e) {
        var n;
        return (
          o(t) &&
            ("function" != typeof (n = t.constructor) ||
            (n !== Array && !o(n.prototype))
              ? r(n) && null === (n = n[i]) && (n = void 0)
              : (n = void 0)),
          new (void 0 === n ? Array : n)(0 === e ? 0 : e)
        );
      };
    },
    function (t, e, n) {
      var r = n(23);
      t.exports =
        Array.isArray ||
        function (t) {
          return "Array" == r(t);
        };
    },
    function (t, e, n) {
      n(41), n(99);
      var r = n(10);
      t.exports = r.Array.from;
    },
    function (t, e, n) {
      var r = n(13),
        o = n(100);
      r(
        {
          target: "Array",
          stat: !0,
          forced: !n(60)(function (t) {
            Array.from(t);
          }),
        },
        { from: o }
      );
    },
    function (t, e, n) {
      "use strict";
      var r = n(19),
        o = n(20),
        i = n(59),
        u = n(55),
        c = n(17),
        a = n(101),
        s = n(57);
      t.exports = function (t) {
        var e,
          n,
          f,
          l,
          p,
          h,
          d = o(t),
          v = "function" == typeof this ? this : Array,
          y = arguments.length,
          m = y > 1 ? arguments[1] : void 0,
          g = void 0 !== m,
          b = s(d),
          x = 0;
        if (
          (g && (m = r(m, y > 2 ? arguments[2] : void 0, 2)),
          null == b || (v == Array && u(b)))
        )
          for (n = new v((e = c(d.length))); e > x; x++)
            (h = g ? m(d[x], x) : d[x]), a(n, x, h);
        else
          for (
            p = (l = b.call(d)).next, n = new v();
            !(f = p.call(l)).done;
            x++
          )
            (h = g ? i(l, m, [f.value, x], !0) : f.value), a(n, x, h);
        return (n.length = x), n;
      };
    },
    function (t, e, n) {
      "use strict";
      var r = n(25),
        o = n(5),
        i = n(14);
      t.exports = function (t, e, n) {
        var u = r(e);
        u in t ? o.f(t, u, i(0, n)) : (t[u] = n);
      };
    },
    function (t, e, n) {
      n(103);
      var r = n(10);
      t.exports = r.Object.assign;
    },
    function (t, e, n) {
      var r = n(13),
        o = n(104);
      r(
        { target: "Object", stat: !0, forced: Object.assign !== o },
        { assign: o }
      );
    },
    function (t, e, n) {
      "use strict";
      var r = n(6),
        o = n(4),
        i = n(63),
        u = n(53),
        c = n(45),
        a = n(20),
        s = n(22),
        f = Object.assign,
        l = Object.defineProperty;
      t.exports =
        !f ||
        o(function () {
          if (
            r &&
            1 !==
              f(
                { b: 1 },
                f(
                  l({}, "a", {
                    enumerable: !0,
                    get: function () {
                      l(this, "b", { value: 3, enumerable: !1 });
                    },
                  }),
                  { b: 2 }
                )
              ).b
          )
            return !0;
          var t = {},
            e = {},
            n = Symbol();
          return (
            (t[n] = 7),
            "abcdefghijklmnopqrst".split("").forEach(function (t) {
              e[t] = t;
            }),
            7 != f({}, t)[n] || "abcdefghijklmnopqrst" != i(f({}, e)).join("")
          );
        })
          ? function (t, e) {
              for (
                var n = a(t), o = arguments.length, f = 1, l = u.f, p = c.f;
                o > f;

              )
                for (
                  var h,
                    d = s(arguments[f++]),
                    v = l ? i(d).concat(l(d)) : i(d),
                    y = v.length,
                    m = 0;
                  y > m;

                )
                  (h = v[m++]), (r && !p.call(d, h)) || (n[h] = d[h]);
              return n;
            }
          : f;
    },
    function (t, e, n) {
      "use strict";
      n.r(e);
      var r = {};
      n.r(r),
        n.d(r, "keyboardHandler", function () {
          return ot;
        }),
        n.d(r, "mouseHandler", function () {
          return it;
        }),
        n.d(r, "resizeHandler", function () {
          return ut;
        }),
        n.d(r, "selectHandler", function () {
          return ct;
        }),
        n.d(r, "touchHandler", function () {
          return at;
        }),
        n.d(r, "wheelHandler", function () {
          return st;
        });
      /*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
      var o = function (t, e) {
          return (o =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (t, e) {
                t.__proto__ = e;
              }) ||
            function (t, e) {
              for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
            })(t, e);
        },
        i = function () {
          return (i =
            Object.assign ||
            function (t) {
              for (var e, n = 1, r = arguments.length; n < r; n++)
                for (var o in (e = arguments[n]))
                  Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
              return t;
            }).apply(this, arguments);
        };
      function u(t, e, n, r) {
        var o,
          i = arguments.length,
          u =
            i < 3
              ? e
              : null === r
              ? (r = Object.getOwnPropertyDescriptor(e, n))
              : r;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
          u = Reflect.decorate(t, e, n, r);
        else
          for (var c = t.length - 1; c >= 0; c--)
            (o = t[c]) &&
              (u = (i < 3 ? o(u) : i > 3 ? o(e, n, u) : o(e, n)) || u);
        return i > 3 && u && Object.defineProperty(e, n, u), u;
      }
      n(68), n(90), n(92), n(98), n(102);
      var c = /\s/,
        a = /^\s+/,
        s = function (t) {
          return t
            ? t
                .slice(
                  0,
                  (function (t) {
                    for (var e = t.length; e-- && c.test(t.charAt(e)); );
                    return e;
                  })(t) + 1
                )
                .replace(a, "")
            : t;
        },
        f = function (t) {
          var e = typeof t;
          return null != t && ("object" == e || "function" == e);
        },
        l = n(66),
        p = "object" == typeof self && self && self.Object === Object && self,
        h = l.a || p || Function("return this")(),
        d = h.Symbol,
        v = Object.prototype,
        y = v.hasOwnProperty,
        m = v.toString,
        g = d ? d.toStringTag : void 0,
        b = Object.prototype.toString,
        x = d ? d.toStringTag : void 0,
        w = function (t) {
          return null == t
            ? void 0 === t
              ? "[object Undefined]"
              : "[object Null]"
            : x && x in Object(t)
            ? (function (t) {
                var e = y.call(t, g),
                  n = t[g];
                try {
                  t[g] = void 0;
                  var r = !0;
                } catch (t) {}
                var o = m.call(t);
                return r && (e ? (t[g] = n) : delete t[g]), o;
              })(t)
            : (function (t) {
                return b.call(t);
              })(t);
        },
        S = /^[-+]0x[0-9a-f]+$/i,
        O = /^0b[01]+$/i,
        E = /^0o[0-7]+$/i,
        _ = parseInt,
        T = function (t) {
          if ("number" == typeof t) return t;
          if (
            (function (t) {
              return (
                "symbol" == typeof t ||
                ((function (t) {
                  return null != t && "object" == typeof t;
                })(t) &&
                  "[object Symbol]" == w(t))
              );
            })(t)
          )
            return NaN;
          if (f(t)) {
            var e = "function" == typeof t.valueOf ? t.valueOf() : t;
            t = f(e) ? e + "" : e;
          }
          if ("string" != typeof t) return 0 === t ? t : +t;
          t = s(t);
          var n = O.test(t);
          return n || E.test(t)
            ? _(t.slice(2), n ? 2 : 8)
            : S.test(t)
            ? NaN
            : +t;
        },
        A = function (t, e, n) {
          return (
            void 0 === n && ((n = e), (e = void 0)),
            void 0 !== n && (n = (n = T(n)) == n ? n : 0),
            void 0 !== e && (e = (e = T(e)) == e ? e : 0),
            (function (t, e, n) {
              return (
                t == t &&
                  (void 0 !== n && (t = t <= n ? t : n),
                  void 0 !== e && (t = t >= e ? t : e)),
                t
              );
            })(T(t), e, n)
          );
        };
      function j(t, e) {
        return (
          void 0 === t && (t = -1 / 0),
          void 0 === e && (e = 1 / 0),
          function (n, r) {
            var o = "_" + r;
            Object.defineProperty(n, r, {
              get: function () {
                return this[o];
              },
              set: function (n) {
                Object.defineProperty(this, o, {
                  value: A(n, t, e),
                  enumerable: !1,
                  writable: !0,
                  configurable: !0,
                });
              },
              enumerable: !0,
              configurable: !0,
            });
          }
        );
      }
      function P(t, e) {
        var n = "_" + e;
        Object.defineProperty(t, e, {
          get: function () {
            return this[n];
          },
          set: function (t) {
            Object.defineProperty(this, n, {
              value: !!t,
              enumerable: !1,
              writable: !0,
              configurable: !0,
            });
          },
          enumerable: !0,
          configurable: !0,
        });
      }
      var M = function () {
          return h.Date.now();
        },
        k = Math.max,
        D = Math.min,
        z = function (t, e, n) {
          var r,
            o,
            i,
            u,
            c,
            a,
            s = 0,
            l = !1,
            p = !1,
            h = !0;
          if ("function" != typeof t)
            throw new TypeError("Expected a function");
          function d(e) {
            var n = r,
              i = o;
            return (r = o = void 0), (s = e), (u = t.apply(i, n));
          }
          function v(t) {
            var n = t - a;
            return void 0 === a || n >= e || n < 0 || (p && t - s >= i);
          }
          function y() {
            var t = M();
            if (v(t)) return m(t);
            c = setTimeout(
              y,
              (function (t) {
                var n = e - (t - a);
                return p ? D(n, i - (t - s)) : n;
              })(t)
            );
          }
          function m(t) {
            return (c = void 0), h && r ? d(t) : ((r = o = void 0), u);
          }
          function g() {
            var t = M(),
              n = v(t);
            if (((r = arguments), (o = this), (a = t), n)) {
              if (void 0 === c)
                return (function (t) {
                  return (s = t), (c = setTimeout(y, e)), l ? d(t) : u;
                })(a);
              if (p) return clearTimeout(c), (c = setTimeout(y, e)), d(a);
            }
            return void 0 === c && (c = setTimeout(y, e)), u;
          }
          return (
            (e = T(e) || 0),
            f(n) &&
              ((l = !!n.leading),
              (i = (p = "maxWait" in n) ? k(T(n.maxWait) || 0, e) : i),
              (h = "trailing" in n ? !!n.trailing : h)),
            (g.cancel = function () {
              void 0 !== c && clearTimeout(c),
                (s = 0),
                (r = a = o = c = void 0);
            }),
            (g.flush = function () {
              return void 0 === c ? u : m(M());
            }),
            g
          );
        };
      function L() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        return function (e, n, r) {
          var o = r.value;
          return {
            get: function () {
              return (
                this.hasOwnProperty(n) ||
                  Object.defineProperty(this, n, {
                    value: z.apply(
                      void 0,
                      (function () {
                        for (var t = 0, e = 0, n = arguments.length; e < n; e++)
                          t += arguments[e].length;
                        var r = Array(t),
                          o = 0;
                        for (e = 0; e < n; e++)
                          for (
                            var i = arguments[e], u = 0, c = i.length;
                            u < c;
                            u++, o++
                          )
                            r[o] = i[u];
                        return r;
                      })([o], t)
                    ),
                  }),
                this[n]
              );
            },
          };
        };
      }
      var I,
        R = (function () {
          function t(t) {
            var e = this;
            void 0 === t && (t = {}),
              (this.damping = 0.1),
              (this.thumbMinSize = 20),
              (this.renderByPixels = !0),
              (this.alwaysShowTracks = !1),
              (this.continuousScrolling = !0),
              (this.delegateTo = null),
              (this.plugins = {}),
              Object.keys(t).forEach(function (n) {
                e[n] = t[n];
              });
          }
          return (
            Object.defineProperty(t.prototype, "wheelEventTarget", {
              get: function () {
                return this.delegateTo;
              },
              set: function (t) {
                console.warn(
                  "[smooth-scrollbar]: `options.wheelEventTarget` is deprecated and will be removed in the future, use `options.delegateTo` instead."
                ),
                  (this.delegateTo = t);
              },
              enumerable: !0,
              configurable: !0,
            }),
            u([j(0, 1)], t.prototype, "damping", void 0),
            u([j(0, 1 / 0)], t.prototype, "thumbMinSize", void 0),
            u([P], t.prototype, "renderByPixels", void 0),
            u([P], t.prototype, "alwaysShowTracks", void 0),
            u([P], t.prototype, "continuousScrolling", void 0),
            t
          );
        })(),
        C = new WeakMap();
      function N() {
        if (void 0 !== I) return I;
        var t = !1;
        try {
          var e = function () {},
            n = Object.defineProperty({}, "passive", {
              get: function () {
                t = !0;
              },
            });
          window.addEventListener("testPassive", e, n),
            window.removeEventListener("testPassive", e, n);
        } catch (t) {}
        return (I = !!t && { passive: !1 });
      }
      function F(t) {
        var e = C.get(t) || [];
        return (
          C.set(t, e),
          function (t, n, r) {
            function o(t) {
              t.defaultPrevented || r(t);
            }
            n.split(/\s+/g).forEach(function (n) {
              e.push({ elem: t, eventName: n, handler: o }),
                t.addEventListener(n, o, N());
            });
          }
        );
      }
      function H(t) {
        var e = (function (t) {
          return t.touches ? t.touches[t.touches.length - 1] : t;
        })(t);
        return { x: e.clientX, y: e.clientY };
      }
      function W(t, e) {
        return (
          void 0 === e && (e = []),
          e.some(function (e) {
            return t === e;
          })
        );
      }
      var B = ["webkit", "moz", "ms", "o"],
        G = new RegExp("^-(?!(?:" + B.join("|") + ")-)");
      function U(t, e) {
        (e = (function (t) {
          var e = {};
          return (
            Object.keys(t).forEach(function (n) {
              if (G.test(n)) {
                var r = t[n];
                (n = n.replace(/^-/, "")),
                  (e[n] = r),
                  B.forEach(function (t) {
                    e["-" + t + "-" + n] = r;
                  });
              } else e[n] = t[n];
            }),
            e
          );
        })(e)),
          Object.keys(e).forEach(function (n) {
            var r = n.replace(/^-/, "").replace(/-([a-z])/g, function (t, e) {
              return e.toUpperCase();
            });
            t.style[r] = e[n];
          });
      }
      var X,
        V = (function () {
          function t(t) {
            (this.velocityMultiplier = /Android/.test(navigator.userAgent)
              ? window.devicePixelRatio
              : 1),
              (this.updateTime = Date.now()),
              (this.delta = { x: 0, y: 0 }),
              (this.velocity = { x: 0, y: 0 }),
              (this.lastPosition = { x: 0, y: 0 }),
              (this.lastPosition = H(t));
          }
          return (
            (t.prototype.update = function (t) {
              var e = this.velocity,
                n = this.updateTime,
                r = this.lastPosition,
                o = Date.now(),
                i = H(t),
                u = { x: -(i.x - r.x), y: -(i.y - r.y) },
                c = o - n || 16.7,
                a = (u.x / c) * 16.7,
                s = (u.y / c) * 16.7;
              (e.x = a * this.velocityMultiplier),
                (e.y = s * this.velocityMultiplier),
                (this.delta = u),
                (this.updateTime = o),
                (this.lastPosition = i);
            }),
            t
          );
        })(),
        Y = (function () {
          function t() {
            this._touchList = {};
          }
          return (
            Object.defineProperty(t.prototype, "_primitiveValue", {
              get: function () {
                return { x: 0, y: 0 };
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.isActive = function () {
              return void 0 !== this._activeTouchID;
            }),
            (t.prototype.getDelta = function () {
              var t = this._getActiveTracker();
              return t ? i({}, t.delta) : this._primitiveValue;
            }),
            (t.prototype.getVelocity = function () {
              var t = this._getActiveTracker();
              return t ? i({}, t.velocity) : this._primitiveValue;
            }),
            (t.prototype.getEasingDistance = function (t) {
              var e = 1 - t,
                n = { x: 0, y: 0 },
                r = this.getVelocity();
              return (
                Object.keys(r).forEach(function (t) {
                  for (var o = Math.abs(r[t]) <= 10 ? 0 : r[t]; 0 !== o; )
                    (n[t] += o), (o = (o * e) | 0);
                }),
                n
              );
            }),
            (t.prototype.track = function (t) {
              var e = this,
                n = t.targetTouches;
              return (
                Array.from(n).forEach(function (t) {
                  e._add(t);
                }),
                this._touchList
              );
            }),
            (t.prototype.update = function (t) {
              var e = this,
                n = t.touches,
                r = t.changedTouches;
              return (
                Array.from(n).forEach(function (t) {
                  e._renew(t);
                }),
                this._setActiveID(r),
                this._touchList
              );
            }),
            (t.prototype.release = function (t) {
              var e = this;
              delete this._activeTouchID,
                Array.from(t.changedTouches).forEach(function (t) {
                  e._delete(t);
                });
            }),
            (t.prototype._add = function (t) {
              if (!this._has(t)) {
                var e = new V(t);
                this._touchList[t.identifier] = e;
              }
            }),
            (t.prototype._renew = function (t) {
              this._has(t) && this._touchList[t.identifier].update(t);
            }),
            (t.prototype._delete = function (t) {
              delete this._touchList[t.identifier];
            }),
            (t.prototype._has = function (t) {
              return this._touchList.hasOwnProperty(t.identifier);
            }),
            (t.prototype._setActiveID = function (t) {
              this._activeTouchID = t[t.length - 1].identifier;
            }),
            (t.prototype._getActiveTracker = function () {
              return this._touchList[this._activeTouchID];
            }),
            t
          );
        })();
      !(function (t) {
        (t.X = "x"), (t.Y = "y");
      })(X || (X = {}));
      var q = (function () {
          function t(t, e) {
            void 0 === e && (e = 0),
              (this._direction = t),
              (this._minSize = e),
              (this.element = document.createElement("div")),
              (this.displaySize = 0),
              (this.realSize = 0),
              (this.offset = 0),
              (this.element.className = "scrollbar-thumb scrollbar-thumb-" + t);
          }
          return (
            (t.prototype.attachTo = function (t) {
              t.appendChild(this.element);
            }),
            (t.prototype.update = function (t, e, n) {
              (this.realSize = Math.min(e / n, 1) * e),
                (this.displaySize = Math.max(this.realSize, this._minSize)),
                (this.offset =
                  (t / n) * (e + (this.realSize - this.displaySize))),
                U(this.element, this._getStyle());
            }),
            (t.prototype._getStyle = function () {
              switch (this._direction) {
                case X.X:
                  return {
                    width: this.displaySize + "px",
                    "-transform": "translate3d(" + this.offset + "px, 0, 0)",
                  };
                case X.Y:
                  return {
                    height: this.displaySize + "px",
                    "-transform": "translate3d(0, " + this.offset + "px, 0)",
                  };
                default:
                  return null;
              }
            }),
            t
          );
        })(),
        Q = (function () {
          function t(t, e) {
            void 0 === e && (e = 0),
              (this.element = document.createElement("div")),
              (this._isShown = !1),
              (this.element.className = "scrollbar-track scrollbar-track-" + t),
              (this.thumb = new q(t, e)),
              this.thumb.attachTo(this.element);
          }
          return (
            (t.prototype.attachTo = function (t) {
              t.appendChild(this.element);
            }),
            (t.prototype.show = function () {
              this._isShown ||
                ((this._isShown = !0), this.element.classList.add("show"));
            }),
            (t.prototype.hide = function () {
              this._isShown &&
                ((this._isShown = !1), this.element.classList.remove("show"));
            }),
            (t.prototype.update = function (t, e, n) {
              U(this.element, { display: n <= e ? "none" : "block" }),
                this.thumb.update(t, e, n);
            }),
            t
          );
        })(),
        K = (function () {
          function t(t) {
            this._scrollbar = t;
            var e = t.options.thumbMinSize;
            (this.xAxis = new Q(X.X, e)),
              (this.yAxis = new Q(X.Y, e)),
              this.xAxis.attachTo(t.containerEl),
              this.yAxis.attachTo(t.containerEl),
              t.options.alwaysShowTracks &&
                (this.xAxis.show(), this.yAxis.show());
          }
          return (
            (t.prototype.update = function () {
              var t = this._scrollbar,
                e = t.size,
                n = t.offset;
              this.xAxis.update(n.x, e.container.width, e.content.width),
                this.yAxis.update(n.y, e.container.height, e.content.height);
            }),
            (t.prototype.autoHideOnIdle = function () {
              this._scrollbar.options.alwaysShowTracks ||
                (this.xAxis.hide(), this.yAxis.hide());
            }),
            u([L(300)], t.prototype, "autoHideOnIdle", null),
            t
          );
        })(),
        $ = new WeakMap();
      function J(t) {
        return Math.pow(t - 1, 3) + 1;
      }
      var Z,
        tt,
        et,
        nt = (function () {
          function t(t, e) {
            var n = this.constructor;
            (this.scrollbar = t),
              (this.name = n.pluginName),
              (this.options = i(i({}, n.defaultOptions), e));
          }
          return (
            (t.prototype.onInit = function () {}),
            (t.prototype.onDestroy = function () {}),
            (t.prototype.onUpdate = function () {}),
            (t.prototype.onRender = function (t) {}),
            (t.prototype.transformDelta = function (t, e) {
              return i({}, t);
            }),
            (t.pluginName = ""),
            (t.defaultOptions = {}),
            t
          );
        })(),
        rt = { order: new Set(), constructors: {} };
      function ot(t) {
        var e = F(t),
          n = t.containerEl;
        e(n, "keydown", function (e) {
          var r = document.activeElement;
          if (
            (r === n || n.contains(r)) &&
            !(function (t) {
              return (
                !(
                  "INPUT" !== t.tagName &&
                  "SELECT" !== t.tagName &&
                  "TEXTAREA" !== t.tagName &&
                  !t.isContentEditable
                ) && !t.disabled
              );
            })(r)
          ) {
            var o = (function (t, e) {
              var n = t.size,
                r = t.limit,
                o = t.offset;
              switch (e) {
                case Z.TAB:
                  return (function (t) {
                    requestAnimationFrame(function () {
                      t.scrollIntoView(document.activeElement, {
                        offsetTop: t.size.container.height / 2,
                        onlyScrollIfNeeded: !0,
                      });
                    });
                  })(t);
                case Z.SPACE:
                  return [0, 200];
                case Z.PAGE_UP:
                  return [0, 40 - n.container.height];
                case Z.PAGE_DOWN:
                  return [0, n.container.height - 40];
                case Z.END:
                  return [0, r.y - o.y];
                case Z.HOME:
                  return [0, -o.y];
                case Z.LEFT:
                  return [-40, 0];
                case Z.UP:
                  return [0, -40];
                case Z.RIGHT:
                  return [40, 0];
                case Z.DOWN:
                  return [0, 40];
                default:
                  return null;
              }
            })(t, e.keyCode || e.which);
            if (o) {
              var i = o[0],
                u = o[1];
              t.addTransformableMomentum(i, u, e, function (n) {
                n
                  ? e.preventDefault()
                  : (t.containerEl.blur(),
                    t.parent && t.parent.containerEl.focus());
              });
            }
          }
        });
      }
      function it(t) {
        var e,
          n,
          r,
          o,
          i,
          u = F(t),
          c = t.containerEl,
          a = t.track,
          s = a.xAxis,
          f = a.yAxis;
        function l(e, n) {
          var r = t.size,
            o = t.limit,
            i = t.offset;
          if (e === tt.X) {
            var u =
              r.container.width + (s.thumb.realSize - s.thumb.displaySize);
            return A((n / u) * r.content.width, 0, o.x) - i.x;
          }
          if (e === tt.Y) {
            var c =
              r.container.height + (f.thumb.realSize - f.thumb.displaySize);
            return A((n / c) * r.content.height, 0, o.y) - i.y;
          }
          return 0;
        }
        function p(t) {
          return W(t, [s.element, s.thumb.element])
            ? tt.X
            : W(t, [f.element, f.thumb.element])
            ? tt.Y
            : void 0;
        }
        u(c, "click", function (e) {
          if (!n && W(e.target, [s.element, f.element])) {
            var r = e.target,
              o = p(r),
              i = r.getBoundingClientRect(),
              u = H(e);
            if (o === tt.X) {
              var c = u.x - i.left - s.thumb.displaySize / 2;
              t.setMomentum(l(o, c), 0);
            }
            o === tt.Y &&
              ((c = u.y - i.top - f.thumb.displaySize / 2),
              t.setMomentum(0, l(o, c)));
          }
        }),
          u(c, "mousedown", function (n) {
            if (W(n.target, [s.thumb.element, f.thumb.element])) {
              e = !0;
              var u = n.target,
                a = H(n),
                l = u.getBoundingClientRect();
              (o = p(u)),
                (r = { x: a.x - l.left, y: a.y - l.top }),
                (i = c.getBoundingClientRect()),
                U(t.containerEl, { "-user-select": "none" });
            }
          }),
          u(window, "mousemove", function (u) {
            if (e) {
              n = !0;
              var c = H(u);
              if (o === tt.X) {
                var a = c.x - r.x - i.left;
                t.setMomentum(l(o, a), 0);
              }
              o === tt.Y &&
                ((a = c.y - r.y - i.top), t.setMomentum(0, l(o, a)));
            }
          }),
          u(window, "mouseup blur", function () {
            (e = n = !1), U(t.containerEl, { "-user-select": "" });
          });
      }
      function ut(t) {
        F(t)(window, "resize", z(t.update.bind(t), 300));
      }
      function ct(t) {
        var e,
          n = F(t),
          r = t.containerEl,
          o = t.contentEl,
          i = !1;
        n(window, "mousemove", function (n) {
          i &&
            (cancelAnimationFrame(e),
            (function n(r) {
              var o = r.x,
                i = r.y;
              if (o || i) {
                var u = t.offset,
                  c = t.limit;
                t.setMomentum(
                  A(u.x + o, 0, c.x) - u.x,
                  A(u.y + i, 0, c.y) - u.y
                ),
                  (e = requestAnimationFrame(function () {
                    n({ x: o, y: i });
                  }));
              }
            })(
              (function (t, e) {
                var n = t.bounding,
                  r = n.top,
                  o = n.right,
                  i = n.bottom,
                  u = n.left,
                  c = H(e),
                  a = c.x,
                  s = c.y,
                  f = { x: 0, y: 0 };
                return (
                  (0 === a && 0 === s) ||
                    (a > o - 20
                      ? (f.x = a - o + 20)
                      : a < u + 20 && (f.x = a - u - 20),
                    s > i - 20
                      ? (f.y = s - i + 20)
                      : s < r + 20 && (f.y = s - r - 20),
                    (f.x *= 2),
                    (f.y *= 2)),
                  f
                );
              })(t, n)
            ));
        }),
          n(o, "selectstart", function (t) {
            t.stopPropagation(), cancelAnimationFrame(e), (i = !0);
          }),
          n(window, "mouseup blur", function () {
            cancelAnimationFrame(e), (i = !1);
          }),
          n(r, "scroll", function (t) {
            t.preventDefault(), (r.scrollTop = r.scrollLeft = 0);
          });
      }
      function at(t) {
        var e,
          n = t.options.delegateTo || t.containerEl,
          r = new Y(),
          o = F(t),
          i = 0;
        o(n, "touchstart", function (n) {
          r.track(n),
            t.setMomentum(0, 0),
            0 === i &&
              ((e = t.options.damping), (t.options.damping = Math.max(e, 0.5))),
            i++;
        }),
          o(n, "touchmove", function (e) {
            if (!et || et === t) {
              r.update(e);
              var n = r.getDelta(),
                o = n.x,
                i = n.y;
              t.addTransformableMomentum(o, i, e, function (n) {
                n && e.cancelable && (e.preventDefault(), (et = t));
              });
            }
          }),
          o(n, "touchcancel touchend", function (n) {
            var o = r.getEasingDistance(e);
            t.addTransformableMomentum(o.x, o.y, n),
              0 == --i && (t.options.damping = e),
              r.release(n),
              (et = null);
          });
      }
      function st(t) {
        F(t)(
          t.options.delegateTo || t.containerEl,
          "onwheel" in window ||
            document.implementation.hasFeature("Events.wheel", "3.0")
            ? "wheel"
            : "mousewheel",
          function (e) {
            var n = (function (t) {
                if ("deltaX" in t) {
                  var e = pt(t.deltaMode);
                  return {
                    x: (t.deltaX / ft.STANDARD) * e,
                    y: (t.deltaY / ft.STANDARD) * e,
                  };
                }
                return "wheelDeltaX" in t
                  ? {
                      x: t.wheelDeltaX / ft.OTHERS,
                      y: t.wheelDeltaY / ft.OTHERS,
                    }
                  : { x: 0, y: t.wheelDelta / ft.OTHERS };
              })(e),
              r = n.x,
              o = n.y;
            t.addTransformableMomentum(r, o, e, function (t) {
              t && e.preventDefault();
            });
          }
        );
      }
      !(function (t) {
        (t[(t.TAB = 9)] = "TAB"),
          (t[(t.SPACE = 32)] = "SPACE"),
          (t[(t.PAGE_UP = 33)] = "PAGE_UP"),
          (t[(t.PAGE_DOWN = 34)] = "PAGE_DOWN"),
          (t[(t.END = 35)] = "END"),
          (t[(t.HOME = 36)] = "HOME"),
          (t[(t.LEFT = 37)] = "LEFT"),
          (t[(t.UP = 38)] = "UP"),
          (t[(t.RIGHT = 39)] = "RIGHT"),
          (t[(t.DOWN = 40)] = "DOWN");
      })(Z || (Z = {})),
        (function (t) {
          (t[(t.X = 0)] = "X"), (t[(t.Y = 1)] = "Y");
        })(tt || (tt = {}));
      var ft = { STANDARD: 1, OTHERS: -3 },
        lt = [1, 28, 500],
        pt = function (t) {
          return lt[t] || lt[0];
        },
        ht = new Map(),
        dt = (function () {
          function t(t, e) {
            var n = this;
            (this.offset = { x: 0, y: 0 }),
              (this.limit = { x: 1 / 0, y: 1 / 0 }),
              (this.bounding = { top: 0, right: 0, bottom: 0, left: 0 }),
              (this._plugins = []),
              (this._momentum = { x: 0, y: 0 }),
              (this._listeners = new Set()),
              (this.containerEl = t);
            var r = (this.contentEl = document.createElement("div"));
            (this.options = new R(e)),
              t.setAttribute("data-scrollbar", "true"),
              t.setAttribute("tabindex", "-1"),
              U(t, { overflow: "hidden", outline: "none" }),
              window.navigator.msPointerEnabled &&
                (t.style.msTouchAction = "none"),
              (r.className = "scroll-content"),
              Array.from(t.childNodes).forEach(function (t) {
                r.appendChild(t);
              }),
              t.appendChild(r),
              (this.track = new K(this)),
              (this.size = this.getSize()),
              (this._plugins = (function (t, e) {
                return Array.from(rt.order)
                  .filter(function (t) {
                    return !1 !== e[t];
                  })
                  .map(function (n) {
                    var r = new (0, rt.constructors[n])(t, e[n]);
                    return (e[n] = r.options), r;
                  });
              })(this, this.options.plugins));
            var o = t.scrollLeft,
              i = t.scrollTop;
            (t.scrollLeft = t.scrollTop = 0),
              this.setPosition(o, i, { withoutCallbacks: !0 });
            var u = window.ResizeObserver;
            "function" == typeof u &&
              ((this._observer = new u(function () {
                n.update();
              })),
              this._observer.observe(r)),
              ht.set(t, this),
              requestAnimationFrame(function () {
                n._init();
              });
          }
          return (
            Object.defineProperty(t.prototype, "parent", {
              get: function () {
                for (var t = this.containerEl.parentElement; t; ) {
                  var e = ht.get(t);
                  if (e) return e;
                  t = t.parentElement;
                }
                return null;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "scrollTop", {
              get: function () {
                return this.offset.y;
              },
              set: function (t) {
                this.setPosition(this.scrollLeft, t);
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "scrollLeft", {
              get: function () {
                return this.offset.x;
              },
              set: function (t) {
                this.setPosition(t, this.scrollTop);
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.getSize = function () {
              return (function (t) {
                var e = t.containerEl,
                  n = t.contentEl,
                  r = getComputedStyle(e),
                  o = [
                    "paddingTop",
                    "paddingBottom",
                    "paddingLeft",
                    "paddingRight",
                  ].map(function (t) {
                    return r[t] ? parseFloat(r[t]) : 0;
                  }),
                  i = o[0] + o[1],
                  u = o[2] + o[3];
                return {
                  container: { width: e.clientWidth, height: e.clientHeight },
                  content: {
                    width: n.offsetWidth - n.clientWidth + n.scrollWidth + u,
                    height:
                      n.offsetHeight - n.clientHeight + n.scrollHeight + i,
                  },
                };
              })(this);
            }),
            (t.prototype.update = function () {
              !(function (t) {
                var e = t.getSize(),
                  n = {
                    x: Math.max(e.content.width - e.container.width, 0),
                    y: Math.max(e.content.height - e.container.height, 0),
                  },
                  r = t.containerEl.getBoundingClientRect(),
                  o = {
                    top: Math.max(r.top, 0),
                    right: Math.min(r.right, window.innerWidth),
                    bottom: Math.min(r.bottom, window.innerHeight),
                    left: Math.max(r.left, 0),
                  };
                (t.size = e),
                  (t.limit = n),
                  (t.bounding = o),
                  t.track.update(),
                  t.setPosition();
              })(this),
                this._plugins.forEach(function (t) {
                  t.onUpdate();
                });
            }),
            (t.prototype.isVisible = function (t) {
              return (function (t, e) {
                var n = t.bounding,
                  r = e.getBoundingClientRect(),
                  o = Math.max(n.top, r.top),
                  i = Math.max(n.left, r.left),
                  u = Math.min(n.right, r.right);
                return o < Math.min(n.bottom, r.bottom) && i < u;
              })(this, t);
            }),
            (t.prototype.setPosition = function (t, e, n) {
              var r = this;
              void 0 === t && (t = this.offset.x),
                void 0 === e && (e = this.offset.y),
                void 0 === n && (n = {});
              var o = (function (t, e, n) {
                var r = t.options,
                  o = t.offset,
                  u = t.limit,
                  c = t.track,
                  a = t.contentEl;
                return (
                  r.renderByPixels &&
                    ((e = Math.round(e)), (n = Math.round(n))),
                  (e = A(e, 0, u.x)),
                  (n = A(n, 0, u.y)),
                  e !== o.x && c.xAxis.show(),
                  n !== o.y && c.yAxis.show(),
                  r.alwaysShowTracks || c.autoHideOnIdle(),
                  e === o.x && n === o.y
                    ? null
                    : ((o.x = e),
                      (o.y = n),
                      U(a, {
                        "-transform":
                          "translate3d(" + -e + "px, " + -n + "px, 0)",
                      }),
                      c.update(),
                      { offset: i({}, o), limit: i({}, u) })
                );
              })(this, t, e);
              o &&
                !n.withoutCallbacks &&
                this._listeners.forEach(function (t) {
                  t.call(r, o);
                });
            }),
            (t.prototype.scrollTo = function (t, e, n, r) {
              void 0 === t && (t = this.offset.x),
                void 0 === e && (e = this.offset.y),
                void 0 === n && (n = 0),
                void 0 === r && (r = {}),
                (function (t, e, n, r, o) {
                  void 0 === r && (r = 0);
                  var i = void 0 === o ? {} : o,
                    u = i.easing,
                    c = void 0 === u ? J : u,
                    a = i.callback,
                    s = t.options,
                    f = t.offset,
                    l = t.limit;
                  s.renderByPixels &&
                    ((e = Math.round(e)), (n = Math.round(n)));
                  var p = f.x,
                    h = f.y,
                    d = A(e, 0, l.x) - p,
                    v = A(n, 0, l.y) - h,
                    y = Date.now();
                  cancelAnimationFrame($.get(t)),
                    (function e() {
                      var n = Date.now() - y,
                        o = r ? c(Math.min(n / r, 1)) : 1;
                      if ((t.setPosition(p + d * o, h + v * o), n >= r))
                        "function" == typeof a && a.call(t);
                      else {
                        var i = requestAnimationFrame(e);
                        $.set(t, i);
                      }
                    })();
                })(this, t, e, n, r);
            }),
            (t.prototype.scrollIntoView = function (t, e) {
              void 0 === e && (e = {}),
                (function (t, e, n) {
                  var r = void 0 === n ? {} : n,
                    o = r.alignToTop,
                    i = void 0 === o || o,
                    u = r.onlyScrollIfNeeded,
                    c = void 0 !== u && u,
                    a = r.offsetTop,
                    s = void 0 === a ? 0 : a,
                    f = r.offsetLeft,
                    l = void 0 === f ? 0 : f,
                    p = r.offsetBottom,
                    h = void 0 === p ? 0 : p,
                    d = t.containerEl,
                    v = t.bounding,
                    y = t.offset,
                    m = t.limit;
                  if (e && d.contains(e)) {
                    var g = e.getBoundingClientRect();
                    if (!c || !t.isVisible(e)) {
                      var b = i ? g.top - v.top - s : g.bottom - v.bottom + h;
                      t.setMomentum(g.left - v.left - l, A(b, -y.y, m.y - y.y));
                    }
                  }
                })(this, t, e);
            }),
            (t.prototype.addListener = function (t) {
              if ("function" != typeof t)
                throw new TypeError(
                  "[smooth-scrollbar] scrolling listener should be a function"
                );
              this._listeners.add(t);
            }),
            (t.prototype.removeListener = function (t) {
              this._listeners.delete(t);
            }),
            (t.prototype.addTransformableMomentum = function (t, e, n, r) {
              this._updateDebounced();
              var o = this._plugins.reduce(
                  function (t, e) {
                    return e.transformDelta(t, n) || t;
                  },
                  { x: t, y: e }
                ),
                i = !this._shouldPropagateMomentum(o.x, o.y);
              i && this.addMomentum(o.x, o.y), r && r.call(this, i);
            }),
            (t.prototype.addMomentum = function (t, e) {
              this.setMomentum(this._momentum.x + t, this._momentum.y + e);
            }),
            (t.prototype.setMomentum = function (t, e) {
              0 === this.limit.x && (t = 0),
                0 === this.limit.y && (e = 0),
                this.options.renderByPixels &&
                  ((t = Math.round(t)), (e = Math.round(e))),
                (this._momentum.x = t),
                (this._momentum.y = e);
            }),
            (t.prototype.updatePluginOptions = function (t, e) {
              this._plugins.forEach(function (n) {
                n.name === t && Object.assign(n.options, e);
              });
            }),
            (t.prototype.destroy = function () {
              var t = this.containerEl,
                e = this.contentEl;
              !(function (t) {
                var e = C.get(t);
                e &&
                  (e.forEach(function (t) {
                    var e = t.elem,
                      n = t.eventName,
                      r = t.handler;
                    e.removeEventListener(n, r, N());
                  }),
                  C.delete(t));
              })(this),
                this._listeners.clear(),
                this.setMomentum(0, 0),
                cancelAnimationFrame(this._renderID),
                this._observer && this._observer.disconnect(),
                ht.delete(this.containerEl);
              for (var n = Array.from(e.childNodes); t.firstChild; )
                t.removeChild(t.firstChild);
              n.forEach(function (e) {
                t.appendChild(e);
              }),
                U(t, { overflow: "" }),
                (t.scrollTop = this.scrollTop),
                (t.scrollLeft = this.scrollLeft),
                this._plugins.forEach(function (t) {
                  t.onDestroy();
                }),
                (this._plugins.length = 0);
            }),
            (t.prototype._init = function () {
              var t = this;
              this.update(),
                Object.keys(r).forEach(function (e) {
                  r[e](t);
                }),
                this._plugins.forEach(function (t) {
                  t.onInit();
                }),
                this._render();
            }),
            (t.prototype._updateDebounced = function () {
              this.update();
            }),
            (t.prototype._shouldPropagateMomentum = function (t, e) {
              void 0 === t && (t = 0), void 0 === e && (e = 0);
              var n = this.options,
                r = this.offset,
                o = this.limit;
              if (!n.continuousScrolling) return !1;
              0 === o.x && 0 === o.y && this._updateDebounced();
              var i = A(t + r.x, 0, o.x),
                u = A(e + r.y, 0, o.y),
                c = !0;
              return (
                (c = (c = c && i === r.x) && u === r.y) &&
                (r.x === o.x || 0 === r.x || r.y === o.y || 0 === r.y)
              );
            }),
            (t.prototype._render = function () {
              var t = this._momentum;
              if (t.x || t.y) {
                var e = this._nextTick("x"),
                  n = this._nextTick("y");
                (t.x = e.momentum),
                  (t.y = n.momentum),
                  this.setPosition(e.position, n.position);
              }
              var r = i({}, this._momentum);
              this._plugins.forEach(function (t) {
                t.onRender(r);
              }),
                (this._renderID = requestAnimationFrame(
                  this._render.bind(this)
                ));
            }),
            (t.prototype._nextTick = function (t) {
              var e = this.options,
                n = this.offset,
                r = this._momentum,
                o = n[t],
                i = r[t];
              if (Math.abs(i) <= 0.1) return { momentum: 0, position: o + i };
              var u = i * (1 - e.damping);
              return (
                e.renderByPixels && (u |= 0),
                { momentum: u, position: o + i - u }
              );
            }),
            u([L(100, { leading: !0 })], t.prototype, "_updateDebounced", null),
            t
          );
        })(),
        vt = "smooth-scrollbar-style",
        yt = !1;
      function mt() {
        if (!yt && "undefined" != typeof window) {
          var t = document.createElement("style");
          (t.id = vt),
            (t.textContent =
              "\n[data-scrollbar] {\n  display: block;\n  position: relative;\n}\n\n.scroll-content {\n  display: flow-root;\n  -webkit-transform: translate3d(0, 0, 0);\n          transform: translate3d(0, 0, 0);\n}\n\n.scrollbar-track {\n  position: absolute;\n  opacity: 0;\n  z-index: 1;\n  background: rgba(222, 222, 222, .75);\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  -webkit-transition: opacity 0.5s 0.5s ease-out;\n          transition: opacity 0.5s 0.5s ease-out;\n}\n.scrollbar-track.show,\n.scrollbar-track:hover {\n  opacity: 1;\n  -webkit-transition-delay: 0s;\n          transition-delay: 0s;\n}\n\n.scrollbar-track-x {\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  height: 8px;\n}\n.scrollbar-track-y {\n  top: 0;\n  right: 0;\n  width: 8px;\n  height: 100%;\n}\n.scrollbar-thumb {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 8px;\n  height: 8px;\n  background: rgba(0, 0, 0, .5);\n  border-radius: 4px;\n}\n"),
            document.head && document.head.appendChild(t),
            (yt = !0);
        }
      }
      n.d(e, "ScrollbarPlugin", function () {
        return nt;
      });
      var gt = (function (t) {
        function e() {
          return (null !== t && t.apply(this, arguments)) || this;
        }
        return (
          (function (t, e) {
            function n() {
              this.constructor = t;
            }
            o(t, e),
              (t.prototype =
                null === e
                  ? Object.create(e)
                  : ((n.prototype = e.prototype), new n()));
          })(e, t),
          (e.init = function (t, e) {
            if (!t || 1 !== t.nodeType)
              throw new TypeError(
                "expect element to be DOM Element, but got " + t
              );
            return mt(), ht.has(t) ? ht.get(t) : new dt(t, e);
          }),
          (e.initAll = function (t) {
            return Array.from(
              document.querySelectorAll("[data-scrollbar]"),
              function (n) {
                return e.init(n, t);
              }
            );
          }),
          (e.has = function (t) {
            return ht.has(t);
          }),
          (e.get = function (t) {
            return ht.get(t);
          }),
          (e.getAll = function () {
            return Array.from(ht.values());
          }),
          (e.destroy = function (t) {
            var e = ht.get(t);
            e && e.destroy();
          }),
          (e.destroyAll = function () {
            ht.forEach(function (t) {
              t.destroy();
            });
          }),
          (e.use = function () {
            for (var t = [], e = 0; e < arguments.length; e++)
              t[e] = arguments[e];
            return function () {
              for (var t = [], e = 0; e < arguments.length; e++)
                t[e] = arguments[e];
              t.forEach(function (t) {
                var e = t.pluginName;
                if (!e) throw new TypeError("plugin name is required");
                rt.order.add(e), (rt.constructors[e] = t);
              });
            }.apply(void 0, t);
          }),
          (e.attachStyle = function () {
            return mt();
          }),
          (e.detachStyle = function () {
            return (function () {
              if (yt && "undefined" != typeof window) {
                var t = document.getElementById(vt);
                t && t.parentNode && (t.parentNode.removeChild(t), (yt = !1));
              }
            })();
          }),
          (e.version = "8.7.3"),
          (e.ScrollbarPlugin = nt),
          e
        );
      })(dt);
      e.default = gt;
    },
  ]).default;
});

//ISOTOPE

!(function (a) {
  function b() {}
  function c(a) {
    function c(b) {
      b.prototype.option ||
        (b.prototype.option = function (b) {
          a.isPlainObject(b) && (this.options = a.extend(!0, this.options, b));
        });
    }
    function e(b, c) {
      a.fn[b] = function (e) {
        if ("string" == typeof e) {
          for (
            var g = d.call(arguments, 1), h = 0, i = this.length;
            i > h;
            h++
          ) {
            var j = this[h],
              k = a.data(j, b);
            if (k)
              if (a.isFunction(k[e]) && "_" !== e.charAt(0)) {
                var l = k[e].apply(k, g);
                if (void 0 !== l) return l;
              } else f("no such method '" + e + "' for " + b + " instance");
            else
              f(
                "cannot call methods on " +
                  b +
                  " prior to initialization; attempted to call '" +
                  e +
                  "'"
              );
          }
          return this;
        }
        return this.each(function () {
          var d = a.data(this, b);
          d
            ? (d.option(e), d._init())
            : ((d = new c(this, e)), a.data(this, b, d));
        });
      };
    }
    if (a) {
      var f =
        "undefined" == typeof console
          ? b
          : function (a) {
              console.error(a);
            };
      return (
        (a.bridget = function (a, b) {
          c(b), e(a, b);
        }),
        a.bridget
      );
    }
  }
  var d = Array.prototype.slice;
  "function" == typeof define && define.amd
    ? define("jquery-bridget/jquery.bridget", ["jquery"], c)
    : c("object" == typeof exports ? require("jquery") : a.jQuery);
})(window),
  (function (a) {
    function b(b) {
      var c = a.event;
      return (c.target = c.target || c.srcElement || b), c;
    }
    var c = document.documentElement,
      d = function () {};
    c.addEventListener
      ? (d = function (a, b, c) {
          a.addEventListener(b, c, !1);
        })
      : c.attachEvent &&
        (d = function (a, c, d) {
          (a[c + d] = d.handleEvent
            ? function () {
                var c = b(a);
                d.handleEvent.call(d, c);
              }
            : function () {
                var c = b(a);
                d.call(a, c);
              }),
            a.attachEvent("on" + c, a[c + d]);
        });
    var e = function () {};
    c.removeEventListener
      ? (e = function (a, b, c) {
          a.removeEventListener(b, c, !1);
        })
      : c.detachEvent &&
        (e = function (a, b, c) {
          a.detachEvent("on" + b, a[b + c]);
          try {
            delete a[b + c];
          } catch (d) {
            a[b + c] = void 0;
          }
        });
    var f = { bind: d, unbind: e };
    "function" == typeof define && define.amd
      ? define("eventie/eventie", f)
      : "object" == typeof exports
      ? (module.exports = f)
      : (a.eventie = f);
  })(window),
  function () {
    "use strict";
    function a() {}
    function b(a, b) {
      for (var c = a.length; c--; ) if (a[c].listener === b) return c;
      return -1;
    }
    function c(a) {
      return function () {
        return this[a].apply(this, arguments);
      };
    }
    var d = a.prototype,
      e = this,
      f = e.EventEmitter;
    (d.getListeners = function (a) {
      var b,
        c,
        d = this._getEvents();
      if (a instanceof RegExp) {
        b = {};
        for (c in d) d.hasOwnProperty(c) && a.test(c) && (b[c] = d[c]);
      } else b = d[a] || (d[a] = []);
      return b;
    }),
      (d.flattenListeners = function (a) {
        var b,
          c = [];
        for (b = 0; b < a.length; b += 1) c.push(a[b].listener);
        return c;
      }),
      (d.getListenersAsObject = function (a) {
        var b,
          c = this.getListeners(a);
        return c instanceof Array && ((b = {}), (b[a] = c)), b || c;
      }),
      (d.addListener = function (a, c) {
        var d,
          e = this.getListenersAsObject(a),
          f = "object" == typeof c;
        for (d in e)
          e.hasOwnProperty(d) &&
            -1 === b(e[d], c) &&
            e[d].push(f ? c : { listener: c, once: !1 });
        return this;
      }),
      (d.on = c("addListener")),
      (d.addOnceListener = function (a, b) {
        return this.addListener(a, { listener: b, once: !0 });
      }),
      (d.once = c("addOnceListener")),
      (d.defineEvent = function (a) {
        return this.getListeners(a), this;
      }),
      (d.defineEvents = function (a) {
        for (var b = 0; b < a.length; b += 1) this.defineEvent(a[b]);
        return this;
      }),
      (d.removeListener = function (a, c) {
        var d,
          e,
          f = this.getListenersAsObject(a);
        for (e in f)
          f.hasOwnProperty(e) &&
            ((d = b(f[e], c)), -1 !== d && f[e].splice(d, 1));
        return this;
      }),
      (d.off = c("removeListener")),
      (d.addListeners = function (a, b) {
        return this.manipulateListeners(!1, a, b);
      }),
      (d.removeListeners = function (a, b) {
        return this.manipulateListeners(!0, a, b);
      }),
      (d.manipulateListeners = function (a, b, c) {
        var d,
          e,
          f = a ? this.removeListener : this.addListener,
          g = a ? this.removeListeners : this.addListeners;
        if ("object" != typeof b || b instanceof RegExp)
          for (d = c.length; d--; ) f.call(this, b, c[d]);
        else
          for (d in b)
            b.hasOwnProperty(d) &&
              (e = b[d]) &&
              ("function" == typeof e
                ? f.call(this, d, e)
                : g.call(this, d, e));
        return this;
      }),
      (d.removeEvent = function (a) {
        var b,
          c = typeof a,
          d = this._getEvents();
        if ("string" === c) delete d[a];
        else if (a instanceof RegExp)
          for (b in d) d.hasOwnProperty(b) && a.test(b) && delete d[b];
        else delete this._events;
        return this;
      }),
      (d.removeAllListeners = c("removeEvent")),
      (d.emitEvent = function (a, b) {
        var c,
          d,
          e,
          f,
          g = this.getListenersAsObject(a);
        for (e in g)
          if (g.hasOwnProperty(e))
            for (d = g[e].length; d--; )
              (c = g[e][d]),
                c.once === !0 && this.removeListener(a, c.listener),
                (f = c.listener.apply(this, b || [])),
                f === this._getOnceReturnValue() &&
                  this.removeListener(a, c.listener);
        return this;
      }),
      (d.trigger = c("emitEvent")),
      (d.emit = function (a) {
        var b = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(a, b);
      }),
      (d.setOnceReturnValue = function (a) {
        return (this._onceReturnValue = a), this;
      }),
      (d._getOnceReturnValue = function () {
        return this.hasOwnProperty("_onceReturnValue")
          ? this._onceReturnValue
          : !0;
      }),
      (d._getEvents = function () {
        return this._events || (this._events = {});
      }),
      (a.noConflict = function () {
        return (e.EventEmitter = f), a;
      }),
      "function" == typeof define && define.amd
        ? define("eventEmitter/EventEmitter", [], function () {
            return a;
          })
        : "object" == typeof module && module.exports
        ? (module.exports = a)
        : (e.EventEmitter = a);
  }.call(this),
  (function (a) {
    function b(a) {
      if (a) {
        if ("string" == typeof d[a]) return a;
        a = a.charAt(0).toUpperCase() + a.slice(1);
        for (var b, e = 0, f = c.length; f > e; e++)
          if (((b = c[e] + a), "string" == typeof d[b])) return b;
      }
    }
    var c = "Webkit Moz ms Ms O".split(" "),
      d = document.documentElement.style;
    "function" == typeof define && define.amd
      ? define("get-style-property/get-style-property", [], function () {
          return b;
        })
      : "object" == typeof exports
      ? (module.exports = b)
      : (a.getStyleProperty = b);
  })(window),
  (function (a, b) {
    function c(a) {
      var b = parseFloat(a),
        c = -1 === a.indexOf("%") && !isNaN(b);
      return c && b;
    }
    function d() {}
    function e() {
      for (
        var a = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0,
          },
          b = 0,
          c = h.length;
        c > b;
        b++
      ) {
        var d = h[b];
        a[d] = 0;
      }
      return a;
    }
    function f(b) {
      function d() {
        if (!m) {
          m = !0;
          var d = a.getComputedStyle;
          if (
            ((j = (function () {
              var a = d
                ? function (a) {
                    return d(a, null);
                  }
                : function (a) {
                    return a.currentStyle;
                  };
              return function (b) {
                var c = a(b);
                return (
                  c ||
                    g(
                      "Style returned " +
                        c +
                        ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"
                    ),
                  c
                );
              };
            })()),
            (k = b("boxSizing")))
          ) {
            var e = document.createElement("div");
            (e.style.width = "200px"),
              (e.style.padding = "1px 2px 3px 4px"),
              (e.style.borderStyle = "solid"),
              (e.style.borderWidth = "1px 2px 3px 4px"),
              (e.style[k] = "border-box");
            var f = document.body || document.documentElement;
            f.appendChild(e);
            var h = j(e);
            (l = 200 === c(h.width)), f.removeChild(e);
          }
        }
      }
      function f(a) {
        if (
          (d(),
          "string" == typeof a && (a = document.querySelector(a)),
          a && "object" == typeof a && a.nodeType)
        ) {
          var b = j(a);
          if ("none" === b.display) return e();
          var f = {};
          (f.width = a.offsetWidth), (f.height = a.offsetHeight);
          for (
            var g = (f.isBorderBox = !(!k || !b[k] || "border-box" !== b[k])),
              m = 0,
              n = h.length;
            n > m;
            m++
          ) {
            var o = h[m],
              p = b[o];
            p = i(a, p);
            var q = parseFloat(p);
            f[o] = isNaN(q) ? 0 : q;
          }
          var r = f.paddingLeft + f.paddingRight,
            s = f.paddingTop + f.paddingBottom,
            t = f.marginLeft + f.marginRight,
            u = f.marginTop + f.marginBottom,
            v = f.borderLeftWidth + f.borderRightWidth,
            w = f.borderTopWidth + f.borderBottomWidth,
            x = g && l,
            y = c(b.width);
          y !== !1 && (f.width = y + (x ? 0 : r + v));
          var z = c(b.height);
          return (
            z !== !1 && (f.height = z + (x ? 0 : s + w)),
            (f.innerWidth = f.width - (r + v)),
            (f.innerHeight = f.height - (s + w)),
            (f.outerWidth = f.width + t),
            (f.outerHeight = f.height + u),
            f
          );
        }
      }
      function i(b, c) {
        if (a.getComputedStyle || -1 === c.indexOf("%")) return c;
        var d = b.style,
          e = d.left,
          f = b.runtimeStyle,
          g = f && f.left;
        return (
          g && (f.left = b.currentStyle.left),
          (d.left = c),
          (c = d.pixelLeft),
          (d.left = e),
          g && (f.left = g),
          c
        );
      }
      var j,
        k,
        l,
        m = !1;
      return f;
    }
    var g =
        "undefined" == typeof console
          ? d
          : function (a) {
              console.error(a);
            },
      h = [
        "paddingLeft",
        "paddingRight",
        "paddingTop",
        "paddingBottom",
        "marginLeft",
        "marginRight",
        "marginTop",
        "marginBottom",
        "borderLeftWidth",
        "borderRightWidth",
        "borderTopWidth",
        "borderBottomWidth",
      ];
    "function" == typeof define && define.amd
      ? define(
          "get-size/get-size",
          ["get-style-property/get-style-property"],
          f
        )
      : "object" == typeof exports
      ? (module.exports = f(require("desandro-get-style-property")))
      : (a.getSize = f(a.getStyleProperty));
  })(window),
  (function (a) {
    function b(a) {
      "function" == typeof a && (b.isReady ? a() : g.push(a));
    }
    function c(a) {
      var c = "readystatechange" === a.type && "complete" !== f.readyState;
      b.isReady || c || d();
    }
    function d() {
      b.isReady = !0;
      for (var a = 0, c = g.length; c > a; a++) {
        var d = g[a];
        d();
      }
    }
    function e(e) {
      return (
        "complete" === f.readyState
          ? d()
          : (e.bind(f, "DOMContentLoaded", c),
            e.bind(f, "readystatechange", c),
            e.bind(a, "load", c)),
        b
      );
    }
    var f = a.document,
      g = [];
    (b.isReady = !1),
      "function" == typeof define && define.amd
        ? define("doc-ready/doc-ready", ["eventie/eventie"], e)
        : "object" == typeof exports
        ? (module.exports = e(require("eventie")))
        : (a.docReady = e(a.eventie));
  })(window),
  (function (a) {
    "use strict";
    function b(a, b) {
      return a[g](b);
    }
    function c(a) {
      if (!a.parentNode) {
        var b = document.createDocumentFragment();
        b.appendChild(a);
      }
    }
    function d(a, b) {
      c(a);
      for (
        var d = a.parentNode.querySelectorAll(b), e = 0, f = d.length;
        f > e;
        e++
      )
        if (d[e] === a) return !0;
      return !1;
    }
    function e(a, d) {
      return c(a), b(a, d);
    }
    var f,
      g = (function () {
        if (a.matches) return "matches";
        if (a.matchesSelector) return "matchesSelector";
        for (
          var b = ["webkit", "moz", "ms", "o"], c = 0, d = b.length;
          d > c;
          c++
        ) {
          var e = b[c],
            f = e + "MatchesSelector";
          if (a[f]) return f;
        }
      })();
    if (g) {
      var h = document.createElement("div"),
        i = b(h, "div");
      f = i ? b : e;
    } else f = d;
    "function" == typeof define && define.amd
      ? define("matches-selector/matches-selector", [], function () {
          return f;
        })
      : "object" == typeof exports
      ? (module.exports = f)
      : (window.matchesSelector = f);
  })(Element.prototype),
  (function (a, b) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(
          "fizzy-ui-utils/utils",
          ["doc-ready/doc-ready", "matches-selector/matches-selector"],
          function (c, d) {
            return b(a, c, d);
          }
        )
      : "object" == typeof exports
      ? (module.exports = b(
          a,
          require("doc-ready"),
          require("desandro-matches-selector")
        ))
      : (a.fizzyUIUtils = b(a, a.docReady, a.matchesSelector));
  })(window, function (a, b, c) {
    var d = {};
    (d.extend = function (a, b) {
      for (var c in b) a[c] = b[c];
      return a;
    }),
      (d.modulo = function (a, b) {
        return ((a % b) + b) % b;
      });
    var e = Object.prototype.toString;
    (d.isArray = function (a) {
      return "[object Array]" == e.call(a);
    }),
      (d.makeArray = function (a) {
        var b = [];
        if (d.isArray(a)) b = a;
        else if (a && "number" == typeof a.length)
          for (var c = 0, e = a.length; e > c; c++) b.push(a[c]);
        else b.push(a);
        return b;
      }),
      (d.indexOf = Array.prototype.indexOf
        ? function (a, b) {
            return a.indexOf(b);
          }
        : function (a, b) {
            for (var c = 0, d = a.length; d > c; c++) if (a[c] === b) return c;
            return -1;
          }),
      (d.removeFrom = function (a, b) {
        var c = d.indexOf(a, b);
        -1 != c && a.splice(c, 1);
      }),
      (d.isElement =
        "function" == typeof HTMLElement || "object" == typeof HTMLElement
          ? function (a) {
              return a instanceof HTMLElement;
            }
          : function (a) {
              return (
                a &&
                "object" == typeof a &&
                1 == a.nodeType &&
                "string" == typeof a.nodeName
              );
            }),
      (d.setText = (function () {
        function a(a, c) {
          (b =
            b ||
            (void 0 !== document.documentElement.textContent
              ? "textContent"
              : "innerText")),
            (a[b] = c);
        }
        var b;
        return a;
      })()),
      (d.getParent = function (a, b) {
        for (; a != document.body; )
          if (((a = a.parentNode), c(a, b))) return a;
      }),
      (d.getQueryElement = function (a) {
        return "string" == typeof a ? document.querySelector(a) : a;
      }),
      (d.handleEvent = function (a) {
        var b = "on" + a.type;
        this[b] && this[b](a);
      }),
      (d.filterFindElements = function (a, b) {
        a = d.makeArray(a);
        for (var e = [], f = 0, g = a.length; g > f; f++) {
          var h = a[f];
          if (d.isElement(h))
            if (b) {
              c(h, b) && e.push(h);
              for (
                var i = h.querySelectorAll(b), j = 0, k = i.length;
                k > j;
                j++
              )
                e.push(i[j]);
            } else e.push(h);
        }
        return e;
      }),
      (d.debounceMethod = function (a, b, c) {
        var d = a.prototype[b],
          e = b + "Timeout";
        a.prototype[b] = function () {
          var a = this[e];
          a && clearTimeout(a);
          var b = arguments,
            f = this;
          this[e] = setTimeout(function () {
            d.apply(f, b), delete f[e];
          }, c || 100);
        };
      }),
      (d.toDashed = function (a) {
        return a
          .replace(/(.)([A-Z])/g, function (a, b, c) {
            return b + "-" + c;
          })
          .toLowerCase();
      });
    var f = a.console;
    return (
      (d.htmlInit = function (c, e) {
        b(function () {
          for (
            var b = d.toDashed(e),
              g = document.querySelectorAll(".js-" + b),
              h = "data-" + b + "-options",
              i = 0,
              j = g.length;
            j > i;
            i++
          ) {
            var k,
              l = g[i],
              m = l.getAttribute(h);
            try {
              k = m && JSON.parse(m);
            } catch (n) {
              f &&
                f.error(
                  "Error parsing " +
                    h +
                    " on " +
                    l.nodeName.toLowerCase() +
                    (l.id ? "#" + l.id : "") +
                    ": " +
                    n
                );
              continue;
            }
            var o = new c(l, k),
              p = a.jQuery;
            p && p.data(l, e, o);
          }
        });
      }),
      d
    );
  }),
  (function (a, b) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(
          "outlayer/item",
          [
            "eventEmitter/EventEmitter",
            "get-size/get-size",
            "get-style-property/get-style-property",
            "fizzy-ui-utils/utils",
          ],
          function (c, d, e, f) {
            return b(a, c, d, e, f);
          }
        )
      : "object" == typeof exports
      ? (module.exports = b(
          a,
          require("wolfy87-eventemitter"),
          require("get-size"),
          require("desandro-get-style-property"),
          require("fizzy-ui-utils")
        ))
      : ((a.Outlayer = {}),
        (a.Outlayer.Item = b(
          a,
          a.EventEmitter,
          a.getSize,
          a.getStyleProperty,
          a.fizzyUIUtils
        )));
  })(window, function (a, b, c, d, e) {
    "use strict";
    function f(a) {
      for (var b in a) return !1;
      return (b = null), !0;
    }
    function g(a, b) {
      a &&
        ((this.element = a),
        (this.layout = b),
        (this.position = { x: 0, y: 0 }),
        this._create());
    }
    function h(a) {
      return a.replace(/([A-Z])/g, function (a) {
        return "-" + a.toLowerCase();
      });
    }
    var i = a.getComputedStyle,
      j = i
        ? function (a) {
            return i(a, null);
          }
        : function (a) {
            return a.currentStyle;
          },
      k = d("transition"),
      l = d("transform"),
      m = k && l,
      n = !!d("perspective"),
      o = {
        WebkitTransition: "webkitTransitionEnd",
        MozTransition: "transitionend",
        OTransition: "otransitionend",
        transition: "transitionend",
      }[k],
      p = [
        "transform",
        "transition",
        "transitionDuration",
        "transitionProperty",
      ],
      q = (function () {
        for (var a = {}, b = 0, c = p.length; c > b; b++) {
          var e = p[b],
            f = d(e);
          f && f !== e && (a[e] = f);
        }
        return a;
      })();
    e.extend(g.prototype, b.prototype),
      (g.prototype._create = function () {
        (this._transn = { ingProperties: {}, clean: {}, onEnd: {} }),
          this.css({ position: "absolute" });
      }),
      (g.prototype.handleEvent = function (a) {
        var b = "on" + a.type;
        this[b] && this[b](a);
      }),
      (g.prototype.getSize = function () {
        this.size = c(this.element);
      }),
      (g.prototype.css = function (a) {
        var b = this.element.style;
        for (var c in a) {
          var d = q[c] || c;
          b[d] = a[c];
        }
      }),
      (g.prototype.getPosition = function () {
        var a = j(this.element),
          b = this.layout.options,
          c = b.isOriginLeft,
          d = b.isOriginTop,
          e = a[c ? "left" : "right"],
          f = a[d ? "top" : "bottom"],
          g = this.layout.size,
          h =
            -1 != e.indexOf("%")
              ? (parseFloat(e) / 100) * g.width
              : parseInt(e, 10),
          i =
            -1 != f.indexOf("%")
              ? (parseFloat(f) / 100) * g.height
              : parseInt(f, 10);
        (h = isNaN(h) ? 0 : h),
          (i = isNaN(i) ? 0 : i),
          (h -= c ? g.paddingLeft : g.paddingRight),
          (i -= d ? g.paddingTop : g.paddingBottom),
          (this.position.x = h),
          (this.position.y = i);
      }),
      (g.prototype.layoutPosition = function () {
        var a = this.layout.size,
          b = this.layout.options,
          c = {},
          d = b.isOriginLeft ? "paddingLeft" : "paddingRight",
          e = b.isOriginLeft ? "left" : "right",
          f = b.isOriginLeft ? "right" : "left",
          g = this.position.x + a[d];
        (c[e] = this.getXValue(g)), (c[f] = "");
        var h = b.isOriginTop ? "paddingTop" : "paddingBottom",
          i = b.isOriginTop ? "top" : "bottom",
          j = b.isOriginTop ? "bottom" : "top",
          k = this.position.y + a[h];
        (c[i] = this.getYValue(k)),
          (c[j] = ""),
          this.css(c),
          this.emitEvent("layout", [this]);
      }),
      (g.prototype.getXValue = function (a) {
        var b = this.layout.options;
        return b.percentPosition && !b.isHorizontal
          ? (a / this.layout.size.width) * 100 + "%"
          : a + "px";
      }),
      (g.prototype.getYValue = function (a) {
        var b = this.layout.options;
        return b.percentPosition && b.isHorizontal
          ? (a / this.layout.size.height) * 100 + "%"
          : a + "px";
      }),
      (g.prototype._transitionTo = function (a, b) {
        this.getPosition();
        var c = this.position.x,
          d = this.position.y,
          e = parseInt(a, 10),
          f = parseInt(b, 10),
          g = e === this.position.x && f === this.position.y;
        if ((this.setPosition(a, b), g && !this.isTransitioning))
          return void this.layoutPosition();
        var h = a - c,
          i = b - d,
          j = {};
        (j.transform = this.getTranslate(h, i)),
          this.transition({
            to: j,
            onTransitionEnd: { transform: this.layoutPosition },
            isCleaning: !0,
          });
      }),
      (g.prototype.getTranslate = function (a, b) {
        var c = this.layout.options;
        return (
          (a = c.isOriginLeft ? a : -a),
          (b = c.isOriginTop ? b : -b),
          n
            ? "translate3d(" + a + "px, " + b + "px, 0)"
            : "translate(" + a + "px, " + b + "px)"
        );
      }),
      (g.prototype.goTo = function (a, b) {
        this.setPosition(a, b), this.layoutPosition();
      }),
      (g.prototype.moveTo = m ? g.prototype._transitionTo : g.prototype.goTo),
      (g.prototype.setPosition = function (a, b) {
        (this.position.x = parseInt(a, 10)),
          (this.position.y = parseInt(b, 10));
      }),
      (g.prototype._nonTransition = function (a) {
        this.css(a.to), a.isCleaning && this._removeStyles(a.to);
        for (var b in a.onTransitionEnd) a.onTransitionEnd[b].call(this);
      }),
      (g.prototype._transition = function (a) {
        if (!parseFloat(this.layout.options.transitionDuration))
          return void this._nonTransition(a);
        var b = this._transn;
        for (var c in a.onTransitionEnd) b.onEnd[c] = a.onTransitionEnd[c];
        for (c in a.to)
          (b.ingProperties[c] = !0), a.isCleaning && (b.clean[c] = !0);
        if (a.from) {
          this.css(a.from);
          var d = this.element.offsetHeight;
          d = null;
        }
        this.enableTransition(a.to),
          this.css(a.to),
          (this.isTransitioning = !0);
      });
    var r = "opacity," + h(q.transform || "transform");
    (g.prototype.enableTransition = function () {
      this.isTransitioning ||
        (this.css({
          transitionProperty: r,
          transitionDuration: this.layout.options.transitionDuration,
        }),
        this.element.addEventListener(o, this, !1));
    }),
      (g.prototype.transition =
        g.prototype[k ? "_transition" : "_nonTransition"]),
      (g.prototype.onwebkitTransitionEnd = function (a) {
        this.ontransitionend(a);
      }),
      (g.prototype.onotransitionend = function (a) {
        this.ontransitionend(a);
      });
    var s = {
      "-webkit-transform": "transform",
      "-moz-transform": "transform",
      "-o-transform": "transform",
    };
    (g.prototype.ontransitionend = function (a) {
      if (a.target === this.element) {
        var b = this._transn,
          c = s[a.propertyName] || a.propertyName;
        if (
          (delete b.ingProperties[c],
          f(b.ingProperties) && this.disableTransition(),
          c in b.clean &&
            ((this.element.style[a.propertyName] = ""), delete b.clean[c]),
          c in b.onEnd)
        ) {
          var d = b.onEnd[c];
          d.call(this), delete b.onEnd[c];
        }
        this.emitEvent("transitionEnd", [this]);
      }
    }),
      (g.prototype.disableTransition = function () {
        this.removeTransitionStyles(),
          this.element.removeEventListener(o, this, !1),
          (this.isTransitioning = !1);
      }),
      (g.prototype._removeStyles = function (a) {
        var b = {};
        for (var c in a) b[c] = "";
        this.css(b);
      });
    var t = { transitionProperty: "", transitionDuration: "" };
    return (
      (g.prototype.removeTransitionStyles = function () {
        this.css(t);
      }),
      (g.prototype.removeElem = function () {
        this.element.parentNode.removeChild(this.element),
          this.css({ display: "" }),
          this.emitEvent("remove", [this]);
      }),
      (g.prototype.remove = function () {
        if (!k || !parseFloat(this.layout.options.transitionDuration))
          return void this.removeElem();
        var a = this;
        this.once("transitionEnd", function () {
          a.removeElem();
        }),
          this.hide();
      }),
      (g.prototype.reveal = function () {
        delete this.isHidden, this.css({ display: "" });
        var a = this.layout.options,
          b = {},
          c = this.getHideRevealTransitionEndProperty("visibleStyle");
        (b[c] = this.onRevealTransitionEnd),
          this.transition({
            from: a.hiddenStyle,
            to: a.visibleStyle,
            isCleaning: !0,
            onTransitionEnd: b,
          });
      }),
      (g.prototype.onRevealTransitionEnd = function () {
        this.isHidden || this.emitEvent("reveal");
      }),
      (g.prototype.getHideRevealTransitionEndProperty = function (a) {
        var b = this.layout.options[a];
        if (b.opacity) return "opacity";
        for (var c in b) return c;
      }),
      (g.prototype.hide = function () {
        (this.isHidden = !0), this.css({ display: "" });
        var a = this.layout.options,
          b = {},
          c = this.getHideRevealTransitionEndProperty("hiddenStyle");
        (b[c] = this.onHideTransitionEnd),
          this.transition({
            from: a.visibleStyle,
            to: a.hiddenStyle,
            isCleaning: !0,
            onTransitionEnd: b,
          });
      }),
      (g.prototype.onHideTransitionEnd = function () {
        this.isHidden &&
          (this.css({ display: "none" }), this.emitEvent("hide"));
      }),
      (g.prototype.destroy = function () {
        this.css({
          position: "",
          left: "",
          right: "",
          top: "",
          bottom: "",
          transition: "",
          transform: "",
        });
      }),
      g
    );
  }),
  (function (a, b) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(
          "outlayer/outlayer",
          [
            "eventie/eventie",
            "eventEmitter/EventEmitter",
            "get-size/get-size",
            "fizzy-ui-utils/utils",
            "./item",
          ],
          function (c, d, e, f, g) {
            return b(a, c, d, e, f, g);
          }
        )
      : "object" == typeof exports
      ? (module.exports = b(
          a,
          require("eventie"),
          require("wolfy87-eventemitter"),
          require("get-size"),
          require("fizzy-ui-utils"),
          require("./item")
        ))
      : (a.Outlayer = b(
          a,
          a.eventie,
          a.EventEmitter,
          a.getSize,
          a.fizzyUIUtils,
          a.Outlayer.Item
        ));
  })(window, function (a, b, c, d, e, f) {
    "use strict";
    function g(a, b) {
      var c = e.getQueryElement(a);
      if (!c)
        return void (
          h &&
          h.error(
            "Bad element for " + this.constructor.namespace + ": " + (c || a)
          )
        );
      (this.element = c),
        i && (this.$element = i(this.element)),
        (this.options = e.extend({}, this.constructor.defaults)),
        this.option(b);
      var d = ++k;
      (this.element.outlayerGUID = d),
        (l[d] = this),
        this._create(),
        this.options.isInitLayout && this.layout();
    }
    var h = a.console,
      i = a.jQuery,
      j = function () {},
      k = 0,
      l = {};
    return (
      (g.namespace = "outlayer"),
      (g.Item = f),
      (g.defaults = {
        containerStyle: { position: "relative" },
        isInitLayout: !0,
        isOriginLeft: !0,
        isOriginTop: !0,
        isResizeBound: !0,
        isResizingContainer: !0,
        transitionDuration: "0.4s",
        hiddenStyle: { opacity: 0, transform: "scale(0.001)" },
        visibleStyle: { opacity: 1, transform: "scale(1)" },
      }),
      e.extend(g.prototype, c.prototype),
      (g.prototype.option = function (a) {
        e.extend(this.options, a);
      }),
      (g.prototype._create = function () {
        this.reloadItems(),
          (this.stamps = []),
          this.stamp(this.options.stamp),
          e.extend(this.element.style, this.options.containerStyle),
          this.options.isResizeBound && this.bindResize();
      }),
      (g.prototype.reloadItems = function () {
        this.items = this._itemize(this.element.children);
      }),
      (g.prototype._itemize = function (a) {
        for (
          var b = this._filterFindItemElements(a),
            c = this.constructor.Item,
            d = [],
            e = 0,
            f = b.length;
          f > e;
          e++
        ) {
          var g = b[e],
            h = new c(g, this);
          d.push(h);
        }
        return d;
      }),
      (g.prototype._filterFindItemElements = function (a) {
        return e.filterFindElements(a, this.options.itemSelector);
      }),
      (g.prototype.getItemElements = function () {
        for (var a = [], b = 0, c = this.items.length; c > b; b++)
          a.push(this.items[b].element);
        return a;
      }),
      (g.prototype.layout = function () {
        this._resetLayout(), this._manageStamps();
        var a =
          void 0 !== this.options.isLayoutInstant
            ? this.options.isLayoutInstant
            : !this._isLayoutInited;
        this.layoutItems(this.items, a), (this._isLayoutInited = !0);
      }),
      (g.prototype._init = g.prototype.layout),
      (g.prototype._resetLayout = function () {
        this.getSize();
      }),
      (g.prototype.getSize = function () {
        this.size = d(this.element);
      }),
      (g.prototype._getMeasurement = function (a, b) {
        var c,
          f = this.options[a];
        f
          ? ("string" == typeof f
              ? (c = this.element.querySelector(f))
              : e.isElement(f) && (c = f),
            (this[a] = c ? d(c)[b] : f))
          : (this[a] = 0);
      }),
      (g.prototype.layoutItems = function (a, b) {
        (a = this._getItemsForLayout(a)),
          this._layoutItems(a, b),
          this._postLayout();
      }),
      (g.prototype._getItemsForLayout = function (a) {
        for (var b = [], c = 0, d = a.length; d > c; c++) {
          var e = a[c];
          e.isIgnored || b.push(e);
        }
        return b;
      }),
      (g.prototype._layoutItems = function (a, b) {
        if ((this._emitCompleteOnItems("layout", a), a && a.length)) {
          for (var c = [], d = 0, e = a.length; e > d; d++) {
            var f = a[d],
              g = this._getItemLayoutPosition(f);
            (g.item = f), (g.isInstant = b || f.isLayoutInstant), c.push(g);
          }
          this._processLayoutQueue(c);
        }
      }),
      (g.prototype._getItemLayoutPosition = function () {
        return { x: 0, y: 0 };
      }),
      (g.prototype._processLayoutQueue = function (a) {
        for (var b = 0, c = a.length; c > b; b++) {
          var d = a[b];
          this._positionItem(d.item, d.x, d.y, d.isInstant);
        }
      }),
      (g.prototype._positionItem = function (a, b, c, d) {
        d ? a.goTo(b, c) : a.moveTo(b, c);
      }),
      (g.prototype._postLayout = function () {
        this.resizeContainer();
      }),
      (g.prototype.resizeContainer = function () {
        if (this.options.isResizingContainer) {
          var a = this._getContainerSize();
          a &&
            (this._setContainerMeasure(a.width, !0),
            this._setContainerMeasure(a.height, !1));
        }
      }),
      (g.prototype._getContainerSize = j),
      (g.prototype._setContainerMeasure = function (a, b) {
        if (void 0 !== a) {
          var c = this.size;
          c.isBorderBox &&
            (a += b
              ? c.paddingLeft +
                c.paddingRight +
                c.borderLeftWidth +
                c.borderRightWidth
              : c.paddingBottom +
                c.paddingTop +
                c.borderTopWidth +
                c.borderBottomWidth),
            (a = Math.max(a, 0)),
            (this.element.style[b ? "width" : "height"] = a + "px");
        }
      }),
      (g.prototype._emitCompleteOnItems = function (a, b) {
        function c() {
          e.dispatchEvent(a + "Complete", null, [b]);
        }
        function d() {
          g++, g === f && c();
        }
        var e = this,
          f = b.length;
        if (!b || !f) return void c();
        for (var g = 0, h = 0, i = b.length; i > h; h++) {
          var j = b[h];
          j.once(a, d);
        }
      }),
      (g.prototype.dispatchEvent = function (a, b, c) {
        var d = b ? [b].concat(c) : c;
        if ((this.emitEvent(a, d), i))
          if (((this.$element = this.$element || i(this.element)), b)) {
            var e = i.Event(b);
            (e.type = a), this.$element.trigger(e, c);
          } else this.$element.trigger(a, c);
      }),
      (g.prototype.ignore = function (a) {
        var b = this.getItem(a);
        b && (b.isIgnored = !0);
      }),
      (g.prototype.unignore = function (a) {
        var b = this.getItem(a);
        b && delete b.isIgnored;
      }),
      (g.prototype.stamp = function (a) {
        if ((a = this._find(a))) {
          this.stamps = this.stamps.concat(a);
          for (var b = 0, c = a.length; c > b; b++) {
            var d = a[b];
            this.ignore(d);
          }
        }
      }),
      (g.prototype.unstamp = function (a) {
        if ((a = this._find(a)))
          for (var b = 0, c = a.length; c > b; b++) {
            var d = a[b];
            e.removeFrom(this.stamps, d), this.unignore(d);
          }
      }),
      (g.prototype._find = function (a) {
        return a
          ? ("string" == typeof a && (a = this.element.querySelectorAll(a)),
            (a = e.makeArray(a)))
          : void 0;
      }),
      (g.prototype._manageStamps = function () {
        if (this.stamps && this.stamps.length) {
          this._getBoundingRect();
          for (var a = 0, b = this.stamps.length; b > a; a++) {
            var c = this.stamps[a];
            this._manageStamp(c);
          }
        }
      }),
      (g.prototype._getBoundingRect = function () {
        var a = this.element.getBoundingClientRect(),
          b = this.size;
        this._boundingRect = {
          left: a.left + b.paddingLeft + b.borderLeftWidth,
          top: a.top + b.paddingTop + b.borderTopWidth,
          right: a.right - (b.paddingRight + b.borderRightWidth),
          bottom: a.bottom - (b.paddingBottom + b.borderBottomWidth),
        };
      }),
      (g.prototype._manageStamp = j),
      (g.prototype._getElementOffset = function (a) {
        var b = a.getBoundingClientRect(),
          c = this._boundingRect,
          e = d(a),
          f = {
            left: b.left - c.left - e.marginLeft,
            top: b.top - c.top - e.marginTop,
            right: c.right - b.right - e.marginRight,
            bottom: c.bottom - b.bottom - e.marginBottom,
          };
        return f;
      }),
      (g.prototype.handleEvent = function (a) {
        var b = "on" + a.type;
        this[b] && this[b](a);
      }),
      (g.prototype.bindResize = function () {
        this.isResizeBound ||
          (b.bind(a, "resize", this), (this.isResizeBound = !0));
      }),
      (g.prototype.unbindResize = function () {
        this.isResizeBound && b.unbind(a, "resize", this),
          (this.isResizeBound = !1);
      }),
      (g.prototype.onresize = function () {
        function a() {
          b.resize(), delete b.resizeTimeout;
        }
        this.resizeTimeout && clearTimeout(this.resizeTimeout);
        var b = this;
        this.resizeTimeout = setTimeout(a, 100);
      }),
      (g.prototype.resize = function () {
        this.isResizeBound && this.needsResizeLayout() && this.layout();
      }),
      (g.prototype.needsResizeLayout = function () {
        var a = d(this.element),
          b = this.size && a;
        return b && a.innerWidth !== this.size.innerWidth;
      }),
      (g.prototype.addItems = function (a) {
        var b = this._itemize(a);
        return b.length && (this.items = this.items.concat(b)), b;
      }),
      (g.prototype.appended = function (a) {
        var b = this.addItems(a);
        b.length && (this.layoutItems(b, !0), this.reveal(b));
      }),
      (g.prototype.prepended = function (a) {
        var b = this._itemize(a);
        if (b.length) {
          var c = this.items.slice(0);
          (this.items = b.concat(c)),
            this._resetLayout(),
            this._manageStamps(),
            this.layoutItems(b, !0),
            this.reveal(b),
            this.layoutItems(c);
        }
      }),
      (g.prototype.reveal = function (a) {
        this._emitCompleteOnItems("reveal", a);
        for (var b = a && a.length, c = 0; b && b > c; c++) {
          var d = a[c];
          d.reveal();
        }
      }),
      (g.prototype.hide = function (a) {
        this._emitCompleteOnItems("hide", a);
        for (var b = a && a.length, c = 0; b && b > c; c++) {
          var d = a[c];
          d.hide();
        }
      }),
      (g.prototype.revealItemElements = function (a) {
        var b = this.getItems(a);
        this.reveal(b);
      }),
      (g.prototype.hideItemElements = function (a) {
        var b = this.getItems(a);
        this.hide(b);
      }),
      (g.prototype.getItem = function (a) {
        for (var b = 0, c = this.items.length; c > b; b++) {
          var d = this.items[b];
          if (d.element === a) return d;
        }
      }),
      (g.prototype.getItems = function (a) {
        a = e.makeArray(a);
        for (var b = [], c = 0, d = a.length; d > c; c++) {
          var f = a[c],
            g = this.getItem(f);
          g && b.push(g);
        }
        return b;
      }),
      (g.prototype.remove = function (a) {
        var b = this.getItems(a);
        if ((this._emitCompleteOnItems("remove", b), b && b.length))
          for (var c = 0, d = b.length; d > c; c++) {
            var f = b[c];
            f.remove(), e.removeFrom(this.items, f);
          }
      }),
      (g.prototype.destroy = function () {
        var a = this.element.style;
        (a.height = ""), (a.position = ""), (a.width = "");
        for (var b = 0, c = this.items.length; c > b; b++) {
          var d = this.items[b];
          d.destroy();
        }
        this.unbindResize();
        var e = this.element.outlayerGUID;
        delete l[e],
          delete this.element.outlayerGUID,
          i && i.removeData(this.element, this.constructor.namespace);
      }),
      (g.data = function (a) {
        a = e.getQueryElement(a);
        var b = a && a.outlayerGUID;
        return b && l[b];
      }),
      (g.create = function (a, b) {
        function c() {
          g.apply(this, arguments);
        }
        return (
          Object.create
            ? (c.prototype = Object.create(g.prototype))
            : e.extend(c.prototype, g.prototype),
          (c.prototype.constructor = c),
          (c.defaults = e.extend({}, g.defaults)),
          e.extend(c.defaults, b),
          (c.prototype.settings = {}),
          (c.namespace = a),
          (c.data = g.data),
          (c.Item = function () {
            f.apply(this, arguments);
          }),
          (c.Item.prototype = new f()),
          e.htmlInit(c, a),
          i && i.bridget && i.bridget(a, c),
          c
        );
      }),
      (g.Item = f),
      g
    );
  }),
  (function (a, b) {
    "use strict";
    "function" == typeof define && define.amd
      ? define("isotope/js/item", ["outlayer/outlayer"], b)
      : "object" == typeof exports
      ? (module.exports = b(require("outlayer")))
      : ((a.Isotope = a.Isotope || {}), (a.Isotope.Item = b(a.Outlayer)));
  })(window, function (a) {
    "use strict";
    function b() {
      a.Item.apply(this, arguments);
    }
    (b.prototype = new a.Item()),
      (b.prototype._create = function () {
        (this.id = this.layout.itemGUID++),
          a.Item.prototype._create.call(this),
          (this.sortData = {});
      }),
      (b.prototype.updateSortData = function () {
        if (!this.isIgnored) {
          (this.sortData.id = this.id),
            (this.sortData["original-order"] = this.id),
            (this.sortData.random = Math.random());
          var a = this.layout.options.getSortData,
            b = this.layout._sorters;
          for (var c in a) {
            var d = b[c];
            this.sortData[c] = d(this.element, this);
          }
        }
      });
    var c = b.prototype.destroy;
    return (
      (b.prototype.destroy = function () {
        c.apply(this, arguments), this.css({ display: "" });
      }),
      b
    );
  }),
  (function (a, b) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(
          "isotope/js/layout-mode",
          ["get-size/get-size", "outlayer/outlayer"],
          b
        )
      : "object" == typeof exports
      ? (module.exports = b(require("get-size"), require("outlayer")))
      : ((a.Isotope = a.Isotope || {}),
        (a.Isotope.LayoutMode = b(a.getSize, a.Outlayer)));
  })(window, function (a, b) {
    "use strict";
    function c(a) {
      (this.isotope = a),
        a &&
          ((this.options = a.options[this.namespace]),
          (this.element = a.element),
          (this.items = a.filteredItems),
          (this.size = a.size));
    }
    return (
      (function () {
        function a(a) {
          return function () {
            return b.prototype[a].apply(this.isotope, arguments);
          };
        }
        for (
          var d = [
              "_resetLayout",
              "_getItemLayoutPosition",
              "_manageStamp",
              "_getContainerSize",
              "_getElementOffset",
              "needsResizeLayout",
            ],
            e = 0,
            f = d.length;
          f > e;
          e++
        ) {
          var g = d[e];
          c.prototype[g] = a(g);
        }
      })(),
      (c.prototype.needsVerticalResizeLayout = function () {
        var b = a(this.isotope.element),
          c = this.isotope.size && b;
        return c && b.innerHeight != this.isotope.size.innerHeight;
      }),
      (c.prototype._getMeasurement = function () {
        this.isotope._getMeasurement.apply(this, arguments);
      }),
      (c.prototype.getColumnWidth = function () {
        this.getSegmentSize("column", "Width");
      }),
      (c.prototype.getRowHeight = function () {
        this.getSegmentSize("row", "Height");
      }),
      (c.prototype.getSegmentSize = function (a, b) {
        var c = a + b,
          d = "outer" + b;
        if ((this._getMeasurement(c, d), !this[c])) {
          var e = this.getFirstItemSize();
          this[c] = (e && e[d]) || this.isotope.size["inner" + b];
        }
      }),
      (c.prototype.getFirstItemSize = function () {
        var b = this.isotope.filteredItems[0];
        return b && b.element && a(b.element);
      }),
      (c.prototype.layout = function () {
        this.isotope.layout.apply(this.isotope, arguments);
      }),
      (c.prototype.getSize = function () {
        this.isotope.getSize(), (this.size = this.isotope.size);
      }),
      (c.modes = {}),
      (c.create = function (a, b) {
        function d() {
          c.apply(this, arguments);
        }
        return (
          (d.prototype = new c()),
          b && (d.options = b),
          (d.prototype.namespace = a),
          (c.modes[a] = d),
          d
        );
      }),
      c
    );
  }),
  (function (a, b) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(
          "masonry/masonry",
          ["outlayer/outlayer", "get-size/get-size", "fizzy-ui-utils/utils"],
          b
        )
      : "object" == typeof exports
      ? (module.exports = b(
          require("outlayer"),
          require("get-size"),
          require("fizzy-ui-utils")
        ))
      : (a.Masonry = b(a.Outlayer, a.getSize, a.fizzyUIUtils));
  })(window, function (a, b, c) {
    var d = a.create("masonry");
    return (
      (d.prototype._resetLayout = function () {
        this.getSize(),
          this._getMeasurement("columnWidth", "outerWidth"),
          this._getMeasurement("gutter", "outerWidth"),
          this.measureColumns();
        var a = this.cols;
        for (this.colYs = []; a--; ) this.colYs.push(0);
        this.maxY = 0;
      }),
      (d.prototype.measureColumns = function () {
        if ((this.getContainerWidth(), !this.columnWidth)) {
          var a = this.items[0],
            c = a && a.element;
          this.columnWidth = (c && b(c).outerWidth) || this.containerWidth;
        }
        var d = (this.columnWidth += this.gutter),
          e = this.containerWidth + this.gutter,
          f = e / d,
          g = d - (e % d),
          h = g && 1 > g ? "round" : "floor";
        (f = Math[h](f)), (this.cols = Math.max(f, 1));
      }),
      (d.prototype.getContainerWidth = function () {
        var a = this.options.isFitWidth
            ? this.element.parentNode
            : this.element,
          c = b(a);
        this.containerWidth = c && c.innerWidth;
      }),
      (d.prototype._getItemLayoutPosition = function (a) {
        a.getSize();
        var b = a.size.outerWidth % this.columnWidth,
          d = b && 1 > b ? "round" : "ceil",
          e = Math[d](a.size.outerWidth / this.columnWidth);
        e = Math.min(e, this.cols);
        for (
          var f = this._getColGroup(e),
            g = Math.min.apply(Math, f),
            h = c.indexOf(f, g),
            i = { x: this.columnWidth * h, y: g },
            j = g + a.size.outerHeight,
            k = this.cols + 1 - f.length,
            l = 0;
          k > l;
          l++
        )
          this.colYs[h + l] = j;
        return i;
      }),
      (d.prototype._getColGroup = function (a) {
        if (2 > a) return this.colYs;
        for (var b = [], c = this.cols + 1 - a, d = 0; c > d; d++) {
          var e = this.colYs.slice(d, d + a);
          b[d] = Math.max.apply(Math, e);
        }
        return b;
      }),
      (d.prototype._manageStamp = function (a) {
        var c = b(a),
          d = this._getElementOffset(a),
          e = this.options.isOriginLeft ? d.left : d.right,
          f = e + c.outerWidth,
          g = Math.floor(e / this.columnWidth);
        g = Math.max(0, g);
        var h = Math.floor(f / this.columnWidth);
        (h -= f % this.columnWidth ? 0 : 1), (h = Math.min(this.cols - 1, h));
        for (
          var i = (this.options.isOriginTop ? d.top : d.bottom) + c.outerHeight,
            j = g;
          h >= j;
          j++
        )
          this.colYs[j] = Math.max(i, this.colYs[j]);
      }),
      (d.prototype._getContainerSize = function () {
        this.maxY = Math.max.apply(Math, this.colYs);
        var a = { height: this.maxY };
        return (
          this.options.isFitWidth && (a.width = this._getContainerFitWidth()), a
        );
      }),
      (d.prototype._getContainerFitWidth = function () {
        for (var a = 0, b = this.cols; --b && 0 === this.colYs[b]; ) a++;
        return (this.cols - a) * this.columnWidth - this.gutter;
      }),
      (d.prototype.needsResizeLayout = function () {
        var a = this.containerWidth;
        return this.getContainerWidth(), a !== this.containerWidth;
      }),
      d
    );
  }),
  (function (a, b) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(
          "isotope/js/layout-modes/masonry",
          ["../layout-mode", "masonry/masonry"],
          b
        )
      : "object" == typeof exports
      ? (module.exports = b(
          require("../layout-mode"),
          require("masonry-layout")
        ))
      : b(a.Isotope.LayoutMode, a.Masonry);
  })(window, function (a, b) {
    "use strict";
    function c(a, b) {
      for (var c in b) a[c] = b[c];
      return a;
    }
    var d = a.create("masonry"),
      e = d.prototype._getElementOffset,
      f = d.prototype.layout,
      g = d.prototype._getMeasurement;
    c(d.prototype, b.prototype),
      (d.prototype._getElementOffset = e),
      (d.prototype.layout = f),
      (d.prototype._getMeasurement = g);
    var h = d.prototype.measureColumns;
    d.prototype.measureColumns = function () {
      (this.items = this.isotope.filteredItems), h.call(this);
    };
    var i = d.prototype._manageStamp;
    return (
      (d.prototype._manageStamp = function () {
        (this.options.isOriginLeft = this.isotope.options.isOriginLeft),
          (this.options.isOriginTop = this.isotope.options.isOriginTop),
          i.apply(this, arguments);
      }),
      d
    );
  }),
  (function (a, b) {
    "use strict";
    "function" == typeof define && define.amd
      ? define("isotope/js/layout-modes/fit-rows", ["../layout-mode"], b)
      : "object" == typeof exports
      ? (module.exports = b(require("../layout-mode")))
      : b(a.Isotope.LayoutMode);
  })(window, function (a) {
    "use strict";
    var b = a.create("fitRows");
    return (
      (b.prototype._resetLayout = function () {
        (this.x = 0),
          (this.y = 0),
          (this.maxY = 0),
          this._getMeasurement("gutter", "outerWidth");
      }),
      (b.prototype._getItemLayoutPosition = function (a) {
        a.getSize();
        var b = a.size.outerWidth + this.gutter,
          c = this.isotope.size.innerWidth + this.gutter;
        0 !== this.x && b + this.x > c && ((this.x = 0), (this.y = this.maxY));
        var d = { x: this.x, y: this.y };
        return (
          (this.maxY = Math.max(this.maxY, this.y + a.size.outerHeight)),
          (this.x += b),
          d
        );
      }),
      (b.prototype._getContainerSize = function () {
        return { height: this.maxY };
      }),
      b
    );
  }),
  (function (a, b) {
    "use strict";
    "function" == typeof define && define.amd
      ? define("isotope/js/layout-modes/vertical", ["../layout-mode"], b)
      : "object" == typeof exports
      ? (module.exports = b(require("../layout-mode")))
      : b(a.Isotope.LayoutMode);
  })(window, function (a) {
    "use strict";
    var b = a.create("vertical", { horizontalAlignment: 0 });
    return (
      (b.prototype._resetLayout = function () {
        this.y = 0;
      }),
      (b.prototype._getItemLayoutPosition = function (a) {
        a.getSize();
        var b =
            (this.isotope.size.innerWidth - a.size.outerWidth) *
            this.options.horizontalAlignment,
          c = this.y;
        return (this.y += a.size.outerHeight), { x: b, y: c };
      }),
      (b.prototype._getContainerSize = function () {
        return { height: this.y };
      }),
      b
    );
  }),
  (function (a, b) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(
          [
            "outlayer/outlayer",
            "get-size/get-size",
            "matches-selector/matches-selector",
            "fizzy-ui-utils/utils",
            "isotope/js/item",
            "isotope/js/layout-mode",
            "isotope/js/layout-modes/masonry",
            "isotope/js/layout-modes/fit-rows",
            "isotope/js/layout-modes/vertical",
          ],
          function (c, d, e, f, g, h) {
            return b(a, c, d, e, f, g, h);
          }
        )
      : "object" == typeof exports
      ? (module.exports = b(
          a,
          require("outlayer"),
          require("get-size"),
          require("desandro-matches-selector"),
          require("fizzy-ui-utils"),
          require("./item"),
          require("./layout-mode"),
          require("./layout-modes/masonry"),
          require("./layout-modes/fit-rows"),
          require("./layout-modes/vertical")
        ))
      : (a.Isotope = b(
          a,
          a.Outlayer,
          a.getSize,
          a.matchesSelector,
          a.fizzyUIUtils,
          a.Isotope.Item,
          a.Isotope.LayoutMode
        ));
  })(window, function (a, b, c, d, e, f, g) {
    function h(a, b) {
      return function (c, d) {
        for (var e = 0, f = a.length; f > e; e++) {
          var g = a[e],
            h = c.sortData[g],
            i = d.sortData[g];
          if (h > i || i > h) {
            var j = void 0 !== b[g] ? b[g] : b,
              k = j ? 1 : -1;
            return (h > i ? 1 : -1) * k;
          }
        }
        return 0;
      };
    }
    var i = a.jQuery,
      j = String.prototype.trim
        ? function (a) {
            return a.trim();
          }
        : function (a) {
            return a.replace(/^\s+|\s+$/g, "");
          },
      k = document.documentElement,
      l = k.textContent
        ? function (a) {
            return a.textContent;
          }
        : function (a) {
            return a.innerText;
          },
      m = b.create("isotope", {
        layoutMode: "masonry",
        isJQueryFiltering: !0,
        sortAscending: !0,
      });
    (m.Item = f),
      (m.LayoutMode = g),
      (m.prototype._create = function () {
        (this.itemGUID = 0),
          (this._sorters = {}),
          this._getSorters(),
          b.prototype._create.call(this),
          (this.modes = {}),
          (this.filteredItems = this.items),
          (this.sortHistory = ["original-order"]);
        for (var a in g.modes) this._initLayoutMode(a);
      }),
      (m.prototype.reloadItems = function () {
        (this.itemGUID = 0), b.prototype.reloadItems.call(this);
      }),
      (m.prototype._itemize = function () {
        for (
          var a = b.prototype._itemize.apply(this, arguments),
            c = 0,
            d = a.length;
          d > c;
          c++
        ) {
          var e = a[c];
          e.id = this.itemGUID++;
        }
        return this._updateItemsSortData(a), a;
      }),
      (m.prototype._initLayoutMode = function (a) {
        var b = g.modes[a],
          c = this.options[a] || {};
        (this.options[a] = b.options ? e.extend(b.options, c) : c),
          (this.modes[a] = new b(this));
      }),
      (m.prototype.layout = function () {
        return !this._isLayoutInited && this.options.isInitLayout
          ? void this.arrange()
          : void this._layout();
      }),
      (m.prototype._layout = function () {
        var a = this._getIsInstant();
        this._resetLayout(),
          this._manageStamps(),
          this.layoutItems(this.filteredItems, a),
          (this._isLayoutInited = !0);
      }),
      (m.prototype.arrange = function (a) {
        function b() {
          d.reveal(c.needReveal), d.hide(c.needHide);
        }
        this.option(a), this._getIsInstant();
        var c = this._filter(this.items);
        this.filteredItems = c.matches;
        var d = this;
        this._bindArrangeComplete(),
          this._isInstant ? this._noTransition(b) : b(),
          this._sort(),
          this._layout();
      }),
      (m.prototype._init = m.prototype.arrange),
      (m.prototype._getIsInstant = function () {
        var a =
          void 0 !== this.options.isLayoutInstant
            ? this.options.isLayoutInstant
            : !this._isLayoutInited;
        return (this._isInstant = a), a;
      }),
      (m.prototype._bindArrangeComplete = function () {
        function a() {
          b &&
            c &&
            d &&
            e.dispatchEvent("arrangeComplete", null, [e.filteredItems]);
        }
        var b,
          c,
          d,
          e = this;
        this.once("layoutComplete", function () {
          (b = !0), a();
        }),
          this.once("hideComplete", function () {
            (c = !0), a();
          }),
          this.once("revealComplete", function () {
            (d = !0), a();
          });
      }),
      (m.prototype._filter = function (a) {
        var b = this.options.filter;
        b = b || "*";
        for (
          var c = [],
            d = [],
            e = [],
            f = this._getFilterTest(b),
            g = 0,
            h = a.length;
          h > g;
          g++
        ) {
          var i = a[g];
          if (!i.isIgnored) {
            var j = f(i);
            j && c.push(i),
              j && i.isHidden ? d.push(i) : j || i.isHidden || e.push(i);
          }
        }
        return { matches: c, needReveal: d, needHide: e };
      }),
      (m.prototype._getFilterTest = function (a) {
        return i && this.options.isJQueryFiltering
          ? function (b) {
              return i(b.element).is(a);
            }
          : "function" == typeof a
          ? function (b) {
              return a(b.element);
            }
          : function (b) {
              return d(b.element, a);
            };
      }),
      (m.prototype.updateSortData = function (a) {
        var b;
        a ? ((a = e.makeArray(a)), (b = this.getItems(a))) : (b = this.items),
          this._getSorters(),
          this._updateItemsSortData(b);
      }),
      (m.prototype._getSorters = function () {
        var a = this.options.getSortData;
        for (var b in a) {
          var c = a[b];
          this._sorters[b] = n(c);
        }
      }),
      (m.prototype._updateItemsSortData = function (a) {
        for (var b = a && a.length, c = 0; b && b > c; c++) {
          var d = a[c];
          d.updateSortData();
        }
      });
    var n = (function () {
      function a(a) {
        if ("string" != typeof a) return a;
        var c = j(a).split(" "),
          d = c[0],
          e = d.match(/^\[(.+)\]$/),
          f = e && e[1],
          g = b(f, d),
          h = m.sortDataParsers[c[1]];
        return (a = h
          ? function (a) {
              return a && h(g(a));
            }
          : function (a) {
              return a && g(a);
            });
      }
      function b(a, b) {
        var c;
        return (c = a
          ? function (b) {
              return b.getAttribute(a);
            }
          : function (a) {
              var c = a.querySelector(b);
              return c && l(c);
            });
      }
      return a;
    })();
    (m.sortDataParsers = {
      parseInt: function (a) {
        return parseInt(a, 10);
      },
      parseFloat: function (a) {
        return parseFloat(a);
      },
    }),
      (m.prototype._sort = function () {
        var a = this.options.sortBy;
        if (a) {
          var b = [].concat.apply(a, this.sortHistory),
            c = h(b, this.options.sortAscending);
          this.filteredItems.sort(c),
            a != this.sortHistory[0] && this.sortHistory.unshift(a);
        }
      }),
      (m.prototype._mode = function () {
        var a = this.options.layoutMode,
          b = this.modes[a];
        if (!b) throw new Error("No layout mode: " + a);
        return (b.options = this.options[a]), b;
      }),
      (m.prototype._resetLayout = function () {
        b.prototype._resetLayout.call(this), this._mode()._resetLayout();
      }),
      (m.prototype._getItemLayoutPosition = function (a) {
        return this._mode()._getItemLayoutPosition(a);
      }),
      (m.prototype._manageStamp = function (a) {
        this._mode()._manageStamp(a);
      }),
      (m.prototype._getContainerSize = function () {
        return this._mode()._getContainerSize();
      }),
      (m.prototype.needsResizeLayout = function () {
        return this._mode().needsResizeLayout();
      }),
      (m.prototype.appended = function (a) {
        var b = this.addItems(a);
        if (b.length) {
          var c = this._filterRevealAdded(b);
          this.filteredItems = this.filteredItems.concat(c);
        }
      }),
      (m.prototype.prepended = function (a) {
        var b = this._itemize(a);
        if (b.length) {
          this._resetLayout(), this._manageStamps();
          var c = this._filterRevealAdded(b);
          this.layoutItems(this.filteredItems),
            (this.filteredItems = c.concat(this.filteredItems)),
            (this.items = b.concat(this.items));
        }
      }),
      (m.prototype._filterRevealAdded = function (a) {
        var b = this._filter(a);
        return (
          this.hide(b.needHide),
          this.reveal(b.matches),
          this.layoutItems(b.matches, !0),
          b.matches
        );
      }),
      (m.prototype.insert = function (a) {
        var b = this.addItems(a);
        if (b.length) {
          var c,
            d,
            e = b.length;
          for (c = 0; e > c; c++)
            (d = b[c]), this.element.appendChild(d.element);
          var f = this._filter(b).matches;
          for (c = 0; e > c; c++) b[c].isLayoutInstant = !0;
          for (this.arrange(), c = 0; e > c; c++) delete b[c].isLayoutInstant;
          this.reveal(f);
        }
      });
    var o = m.prototype.remove;
    return (
      (m.prototype.remove = function (a) {
        a = e.makeArray(a);
        var b = this.getItems(a);
        o.call(this, a);
        var c = b && b.length;
        if (c)
          for (var d = 0; c > d; d++) {
            var f = b[d];
            e.removeFrom(this.filteredItems, f);
          }
      }),
      (m.prototype.shuffle = function () {
        for (var a = 0, b = this.items.length; b > a; a++) {
          var c = this.items[a];
          c.sortData.random = Math.random();
        }
        (this.options.sortBy = "random"), this._sort(), this._layout();
      }),
      (m.prototype._noTransition = function (a) {
        var b = this.options.transitionDuration;
        this.options.transitionDuration = 0;
        var c = a.call(this);
        return (this.options.transitionDuration = b), c;
      }),
      (m.prototype.getFilteredItemElements = function () {
        for (var a = [], b = 0, c = this.filteredItems.length; c > b; b++)
          a.push(this.filteredItems[b].element);
        return a;
      }),
      m
    );
  });

/*!
 * GSAP 3.8.0
 * https://greensock.com
 *
 * @license Copyright 2021, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */

!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? e(exports)
    : "function" == typeof define && define.amd
    ? define(["exports"], e)
    : e(((t = t || self).window = t.window || {}));
})(this, function (e) {
  "use strict";
  function _inheritsLoose(t, e) {
    (t.prototype = Object.create(e.prototype)),
      ((t.prototype.constructor = t).__proto__ = e);
  }
  function _assertThisInitialized(t) {
    if (void 0 === t)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called"
      );
    return t;
  }
  function o(t) {
    return "string" == typeof t;
  }
  function p(t) {
    return "function" == typeof t;
  }
  function q(t) {
    return "number" == typeof t;
  }
  function r(t) {
    return void 0 === t;
  }
  function s(t) {
    return "object" == typeof t;
  }
  function t(t) {
    return !1 !== t;
  }
  function u() {
    return "undefined" != typeof window;
  }
  function v(t) {
    return p(t) || o(t);
  }
  function M(t) {
    return (h = mt(t, ot)) && oe;
  }
  function N(t, e) {
    return console.warn(
      "Invalid property",
      t,
      "set to",
      e,
      "Missing plugin? gsap.registerPlugin()"
    );
  }
  function O(t, e) {
    return !e && console.warn(t);
  }
  function P(t, e) {
    return (t && (ot[t] = e) && h && (h[t] = e)) || ot;
  }
  function Q() {
    return 0;
  }
  function $(t) {
    var e,
      r,
      i = t[0];
    if ((s(i) || p(i) || (t = [t]), !(e = (i._gsap || {}).harness))) {
      for (r = ct.length; r-- && !ct[r].targetTest(i); );
      e = ct[r];
    }
    for (r = t.length; r--; )
      (t[r] && (t[r]._gsap || (t[r]._gsap = new Lt(t[r], e)))) ||
        t.splice(r, 1);
    return t;
  }
  function _(t) {
    return t._gsap || $(xt(t))[0]._gsap;
  }
  function aa(t, e, i) {
    return (i = t[e]) && p(i)
      ? t[e]()
      : (r(i) && t.getAttribute && t.getAttribute(e)) || i;
  }
  function ba(t, e) {
    return (t = t.split(",")).forEach(e) || t;
  }
  function ca(t) {
    return Math.round(1e5 * t) / 1e5 || 0;
  }
  function da(t) {
    return Math.round(1e7 * t) / 1e7 || 0;
  }
  function ea(t, e) {
    for (var r = e.length, i = 0; t.indexOf(e[i]) < 0 && ++i < r; );
    return i < r;
  }
  function fa() {
    var t,
      e,
      r = ht.length,
      i = ht.slice(0);
    for (lt = {}, t = ht.length = 0; t < r; t++)
      (e = i[t]) && e._lazy && (e.render(e._lazy[0], e._lazy[1], !0)._lazy = 0);
  }
  function ga(t, e, r, i) {
    ht.length && fa(), t.render(e, r, i), ht.length && fa();
  }
  function ha(t) {
    var e = parseFloat(t);
    return (e || 0 === e) && (t + "").match(at).length < 2
      ? e
      : o(t)
      ? t.trim()
      : t;
  }
  function ia(t) {
    return t;
  }
  function ja(t, e) {
    for (var r in e) r in t || (t[r] = e[r]);
    return t;
  }
  function ka(t, e) {
    for (var r in e)
      r in t || "duration" === r || "ease" === r || (t[r] = e[r]);
  }
  function ma(t, e) {
    for (var r in e)
      "__proto__" !== r &&
        "constructor" !== r &&
        "prototype" !== r &&
        (t[r] = s(e[r]) ? ma(t[r] || (t[r] = {}), e[r]) : e[r]);
    return t;
  }
  function na(t, e) {
    var r,
      i = {};
    for (r in t) r in e || (i[r] = t[r]);
    return i;
  }
  function oa(e) {
    var r = e.parent || I,
      i = e.keyframes ? ka : ja;
    if (t(e.inherit))
      for (; r; ) i(e, r.vars.defaults), (r = r.parent || r._dp);
    return e;
  }
  function ra(t, e, r, i) {
    void 0 === r && (r = "_first"), void 0 === i && (i = "_last");
    var n = e._prev,
      a = e._next;
    n ? (n._next = a) : t[r] === e && (t[r] = a),
      a ? (a._prev = n) : t[i] === e && (t[i] = n),
      (e._next = e._prev = e.parent = null);
  }
  function sa(t, e) {
    !t.parent || (e && !t.parent.autoRemoveChildren) || t.parent.remove(t),
      (t._act = 0);
  }
  function ta(t, e) {
    if (t && (!e || e._end > t._dur || e._start < 0))
      for (var r = t; r; ) (r._dirty = 1), (r = r.parent);
    return t;
  }
  function wa(t) {
    return t._repeat ? gt(t._tTime, (t = t.duration() + t._rDelay)) * t : 0;
  }
  function ya(t, e) {
    return (
      (t - e._start) * e._ts +
      (0 <= e._ts ? 0 : e._dirty ? e.totalDuration() : e._tDur)
    );
  }
  function za(t) {
    return (t._end = da(
      t._start + (t._tDur / Math.abs(t._ts || t._rts || X) || 0)
    ));
  }
  function Aa(t, e) {
    var r = t._dp;
    return (
      r &&
        r.smoothChildTiming &&
        t._ts &&
        ((t._start = da(
          r._time -
            (0 < t._ts
              ? e / t._ts
              : ((t._dirty ? t.totalDuration() : t._tDur) - e) / -t._ts)
        )),
        za(t),
        r._dirty || ta(r, t)),
      t
    );
  }
  function Ba(t, e) {
    var r;
    if (
      ((e._time || (e._initted && !e._dur)) &&
        ((r = ya(t.rawTime(), e)),
        (!e._dur || Tt(0, e.totalDuration(), r) - e._tTime > X) &&
          e.render(r, !0)),
      ta(t, e)._dp && t._initted && t._time >= t._dur && t._ts)
    ) {
      if (t._dur < t.duration())
        for (r = t; r._dp; )
          0 <= r.rawTime() && r.totalTime(r._tTime), (r = r._dp);
      t._zTime = -X;
    }
  }
  function Ca(t, e, r, i) {
    return (
      e.parent && sa(e),
      (e._start = da(
        (q(r) ? r : r || t !== I ? bt(t, r, e) : t._time) + e._delay
      )),
      (e._end = da(
        e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0)
      )),
      (function _addLinkedListItem(t, e, r, i, n) {
        void 0 === r && (r = "_first"), void 0 === i && (i = "_last");
        var a,
          s = t[i];
        if (n) for (a = e[n]; s && s[n] > a; ) s = s._prev;
        s
          ? ((e._next = s._next), (s._next = e))
          : ((e._next = t[r]), (t[r] = e)),
          e._next ? (e._next._prev = e) : (t[i] = e),
          (e._prev = s),
          (e.parent = e._dp = t);
      })(t, e, "_first", "_last", t._sort ? "_start" : 0),
      vt(e) || (t._recent = e),
      i || Ba(t, e),
      t
    );
  }
  function Da(t, e) {
    return (
      (ot.ScrollTrigger || N("scrollTrigger", e)) &&
      ot.ScrollTrigger.create(e, t)
    );
  }
  function Ea(t, e, r, i) {
    return (
      jt(t, e),
      t._initted
        ? !r &&
          t._pt &&
          ((t._dur && !1 !== t.vars.lazy) || (!t._dur && t.vars.lazy)) &&
          f !== St.frame
          ? (ht.push(t), (t._lazy = [e, i]), 1)
          : void 0
        : 1
    );
  }
  function Ja(t, e, r, i) {
    var n = t._repeat,
      a = da(e) || 0,
      s = t._tTime / t._tDur;
    return (
      s && !i && (t._time *= a / t._dur),
      (t._dur = a),
      (t._tDur = n ? (n < 0 ? 1e10 : da(a * (n + 1) + t._rDelay * n)) : a),
      s && !i ? Aa(t, (t._tTime = t._tDur * s)) : t.parent && za(t),
      r || ta(t.parent, t),
      t
    );
  }
  function Ka(t) {
    return t instanceof Nt ? ta(t) : Ja(t, t._dur);
  }
  function Na(e, r, i) {
    var n,
      a,
      s = q(r[1]),
      o = (s ? 2 : 1) + (e < 2 ? 0 : 1),
      u = r[o];
    if ((s && (u.duration = r[1]), (u.parent = i), e)) {
      for (n = u, a = i; a && !("immediateRender" in n); )
        (n = a.vars.defaults || {}), (a = t(a.vars.inherit) && a.parent);
      (u.immediateRender = t(n.immediateRender)),
        e < 2 ? (u.runBackwards = 1) : (u.startAt = r[o - 1]);
    }
    return new Vt(r[0], u, r[1 + o]);
  }
  function Oa(t, e) {
    return t || 0 === t ? e(t) : e;
  }
  function Qa(t) {
    if ("string" != typeof t) return "";
    var e = st.exec(t);
    return e ? t.substr(e.index + e[0].length) : "";
  }
  function Ta(t, e) {
    return (
      t &&
      s(t) &&
      "length" in t &&
      ((!e && !t.length) || (t.length - 1 in t && s(t[0]))) &&
      !t.nodeType &&
      t !== i
    );
  }
  function Xa(t) {
    return t.sort(function () {
      return 0.5 - Math.random();
    });
  }
  function Ya(t) {
    if (p(t)) return t;
    var c = s(t) ? t : { each: t },
      _ = Bt(c.ease),
      m = c.from || 0,
      g = parseFloat(c.base) || 0,
      v = {},
      e = 0 < m && m < 1,
      y = isNaN(m) || e,
      b = c.axis,
      T = m,
      w = m;
    return (
      o(m)
        ? (T = w = { center: 0.5, edges: 0.5, end: 1 }[m] || 0)
        : !e && y && ((T = m[0]), (w = m[1])),
      function (t, e, r) {
        var i,
          n,
          a,
          s,
          o,
          u,
          h,
          l,
          f,
          d = (r || c).length,
          p = v[d];
        if (!p) {
          if (!(f = "auto" === c.grid ? 0 : (c.grid || [1, j])[1])) {
            for (
              h = -j;
              h < (h = r[f++].getBoundingClientRect().left) && f < d;

            );
            f--;
          }
          for (
            p = v[d] = [],
              i = y ? Math.min(f, d) * T - 0.5 : m % f,
              n = y ? (d * w) / f - 0.5 : (m / f) | 0,
              l = j,
              u = h = 0;
            u < d;
            u++
          )
            (a = (u % f) - i),
              (s = n - ((u / f) | 0)),
              (p[u] = o = b ? Math.abs("y" === b ? s : a) : W(a * a + s * s)),
              h < o && (h = o),
              o < l && (l = o);
          "random" === m && Xa(p),
            (p.max = h - l),
            (p.min = l),
            (p.v = d =
              (parseFloat(c.amount) ||
                parseFloat(c.each) *
                  (d < f
                    ? d - 1
                    : b
                    ? "y" === b
                      ? d / f
                      : f
                    : Math.max(f, d / f)) ||
                0) * ("edges" === m ? -1 : 1)),
            (p.b = d < 0 ? g - d : g),
            (p.u = Qa(c.amount || c.each) || 0),
            (_ = _ && d < 0 ? Rt(_) : _);
        }
        return (
          (d = (p[t] - p.min) / p.max || 0),
          da(p.b + (_ ? _(d) : d) * p.v) + p.u
        );
      }
    );
  }
  function Za(r) {
    var i = Math.pow(10, ((r + "").split(".")[1] || "").length);
    return function (t) {
      var e = Math.round(parseFloat(t) / r) * r * i;
      return (e - (e % 1)) / i + (q(t) ? 0 : Qa(t));
    };
  }
  function $a(u, t) {
    var h,
      l,
      e = Z(u);
    return (
      !e &&
        s(u) &&
        ((h = e = u.radius || j),
        u.values
          ? ((u = xt(u.values)), (l = !q(u[0])) && (h *= h))
          : (u = Za(u.increment))),
      Oa(
        t,
        e
          ? p(u)
            ? function (t) {
                return (l = u(t)), Math.abs(l - t) <= h ? l : t;
              }
            : function (t) {
                for (
                  var e,
                    r,
                    i = parseFloat(l ? t.x : t),
                    n = parseFloat(l ? t.y : 0),
                    a = j,
                    s = 0,
                    o = u.length;
                  o--;

                )
                  (e = l
                    ? (e = u[o].x - i) * e + (r = u[o].y - n) * r
                    : Math.abs(u[o] - i)) < a && ((a = e), (s = o));
                return (
                  (s = !h || a <= h ? u[s] : t),
                  l || s === t || q(t) ? s : s + Qa(t)
                );
              }
          : Za(u)
      )
    );
  }
  function _a(t, e, r, i) {
    return Oa(Z(t) ? !e : !0 === r ? !!(r = 0) : !i, function () {
      return Z(t)
        ? t[~~(Math.random() * t.length)]
        : (r = r || 1e-5) &&
            (i = r < 1 ? Math.pow(10, (r + "").length - 2) : 1) &&
            Math.floor(
              Math.round((t - r / 2 + Math.random() * (e - t + 0.99 * r)) / r) *
                r *
                i
            ) / i;
    });
  }
  function db(e, r, t) {
    return Oa(t, function (t) {
      return e[~~r(t)];
    });
  }
  function gb(t) {
    for (var e, r, i, n, a = 0, s = ""; ~(e = t.indexOf("random(", a)); )
      (i = t.indexOf(")", e)),
        (n = "[" === t.charAt(e + 7)),
        (r = t.substr(e + 7, i - e - 7).match(n ? at : tt)),
        (s +=
          t.substr(a, e - a) + _a(n ? r : +r[0], n ? 0 : +r[1], +r[2] || 1e-5)),
        (a = i + 1);
    return s + t.substr(a, t.length - a);
  }
  function jb(t, e, r) {
    var i,
      n,
      a,
      s = t.labels,
      o = j;
    for (i in s)
      (n = s[i] - e) < 0 == !!r &&
        n &&
        o > (n = Math.abs(n)) &&
        ((a = i), (o = n));
    return a;
  }
  function lb(t) {
    return (
      sa(t),
      t.scrollTrigger && t.scrollTrigger.kill(!1),
      t.progress() < 1 && Mt(t, "onInterrupt"),
      t
    );
  }
  function qb(t, e, r) {
    return (
      ((6 * (t = t < 0 ? t + 1 : 1 < t ? t - 1 : t) < 1
        ? e + (r - e) * t * 6
        : t < 0.5
        ? r
        : 3 * t < 2
        ? e + (r - e) * (2 / 3 - t) * 6
        : e) *
        kt +
        0.5) |
      0
    );
  }
  function rb(t, e, r) {
    var i,
      n,
      a,
      s,
      o,
      u,
      h,
      l,
      f,
      d,
      p = t ? (q(t) ? [t >> 16, (t >> 8) & kt, t & kt] : 0) : At.black;
    if (!p) {
      if (("," === t.substr(-1) && (t = t.substr(0, t.length - 1)), At[t]))
        p = At[t];
      else if ("#" === t.charAt(0)) {
        if (
          (t.length < 6 &&
            (t =
              "#" +
              (i = t.charAt(1)) +
              i +
              (n = t.charAt(2)) +
              n +
              (a = t.charAt(3)) +
              a +
              (5 === t.length ? t.charAt(4) + t.charAt(4) : "")),
          9 === t.length)
        )
          return [
            (p = parseInt(t.substr(1, 6), 16)) >> 16,
            (p >> 8) & kt,
            p & kt,
            parseInt(t.substr(7), 16) / 255,
          ];
        p = [(t = parseInt(t.substr(1), 16)) >> 16, (t >> 8) & kt, t & kt];
      } else if ("hsl" === t.substr(0, 3))
        if (((p = d = t.match(tt)), e)) {
          if (~t.indexOf("="))
            return (p = t.match(et)), r && p.length < 4 && (p[3] = 1), p;
        } else
          (s = (+p[0] % 360) / 360),
            (o = p[1] / 100),
            (i =
              2 * (u = p[2] / 100) -
              (n = u <= 0.5 ? u * (o + 1) : u + o - u * o)),
            3 < p.length && (p[3] *= 1),
            (p[0] = qb(s + 1 / 3, i, n)),
            (p[1] = qb(s, i, n)),
            (p[2] = qb(s - 1 / 3, i, n));
      else p = t.match(tt) || At.transparent;
      p = p.map(Number);
    }
    return (
      e &&
        !d &&
        ((i = p[0] / kt),
        (n = p[1] / kt),
        (a = p[2] / kt),
        (u = ((h = Math.max(i, n, a)) + (l = Math.min(i, n, a))) / 2),
        h === l
          ? (s = o = 0)
          : ((f = h - l),
            (o = 0.5 < u ? f / (2 - h - l) : f / (h + l)),
            (s =
              h === i
                ? (n - a) / f + (n < a ? 6 : 0)
                : h === n
                ? (a - i) / f + 2
                : (i - n) / f + 4),
            (s *= 60)),
        (p[0] = ~~(s + 0.5)),
        (p[1] = ~~(100 * o + 0.5)),
        (p[2] = ~~(100 * u + 0.5))),
      r && p.length < 4 && (p[3] = 1),
      p
    );
  }
  function sb(t) {
    var r = [],
      i = [],
      n = -1;
    return (
      t.split(Pt).forEach(function (t) {
        var e = t.match(rt) || [];
        r.push.apply(r, e), i.push((n += e.length + 1));
      }),
      (r.c = i),
      r
    );
  }
  function tb(t, e, r) {
    var i,
      n,
      a,
      s,
      o = "",
      u = (t + o).match(Pt),
      h = e ? "hsla(" : "rgba(",
      l = 0;
    if (!u) return t;
    if (
      ((u = u.map(function (t) {
        return (
          (t = rb(t, e, 1)) &&
          h +
            (e ? t[0] + "," + t[1] + "%," + t[2] + "%," + t[3] : t.join(",")) +
            ")"
        );
      })),
      r && ((a = sb(t)), (i = r.c).join(o) !== a.c.join(o)))
    )
      for (s = (n = t.replace(Pt, "1").split(rt)).length - 1; l < s; l++)
        o +=
          n[l] +
          (~i.indexOf(l)
            ? u.shift() || h + "0,0,0,0)"
            : (a.length ? a : u.length ? u : r).shift());
    if (!n) for (s = (n = t.split(Pt)).length - 1; l < s; l++) o += n[l] + u[l];
    return o + n[s];
  }
  function wb(t) {
    var e,
      r = t.join(" ");
    if (((Pt.lastIndex = 0), Pt.test(r)))
      return (
        (e = Ct.test(r)),
        (t[1] = tb(t[1], e)),
        (t[0] = tb(t[0], e, sb(t[1]))),
        !0
      );
  }
  function Fb(t) {
    var e = (t + "").split("("),
      r = zt[e[0]];
    return r && 1 < e.length && r.config
      ? r.config.apply(
          null,
          ~t.indexOf("{")
            ? [
                (function _parseObjectInString(t) {
                  for (
                    var e,
                      r,
                      i,
                      n = {},
                      a = t.substr(1, t.length - 3).split(":"),
                      s = a[0],
                      o = 1,
                      u = a.length;
                    o < u;
                    o++
                  )
                    (r = a[o]),
                      (e = o !== u - 1 ? r.lastIndexOf(",") : r.length),
                      (i = r.substr(0, e)),
                      (n[s] = isNaN(i) ? i.replace(Ft, "").trim() : +i),
                      (s = r.substr(e + 1).trim());
                  return n;
                })(e[1]),
              ]
            : (function _valueInParentheses(t) {
                var e = t.indexOf("(") + 1,
                  r = t.indexOf(")"),
                  i = t.indexOf("(", e);
                return t.substring(e, ~i && i < r ? t.indexOf(")", r + 1) : r);
              })(t)
                .split(",")
                .map(ha)
        )
      : zt._CE && Et.test(t)
      ? zt._CE("", t)
      : r;
  }
  function Hb(t, e) {
    for (var r, i = t._first; i; )
      i instanceof Nt
        ? Hb(i, e)
        : !i.vars.yoyoEase ||
          (i._yoyo && i._repeat) ||
          i._yoyo === e ||
          (i.timeline
            ? Hb(i.timeline, e)
            : ((r = i._ease),
              (i._ease = i._yEase),
              (i._yEase = r),
              (i._yoyo = e))),
        (i = i._next);
  }
  function Jb(t, e, r, i) {
    void 0 === r &&
      (r = function easeOut(t) {
        return 1 - e(1 - t);
      }),
      void 0 === i &&
        (i = function easeInOut(t) {
          return t < 0.5 ? e(2 * t) / 2 : 1 - e(2 * (1 - t)) / 2;
        });
    var n,
      a = { easeIn: e, easeOut: r, easeInOut: i };
    return (
      ba(t, function (t) {
        for (var e in ((zt[t] = ot[t] = a), (zt[(n = t.toLowerCase())] = r), a))
          zt[
            n + ("easeIn" === e ? ".in" : "easeOut" === e ? ".out" : ".inOut")
          ] = zt[t + "." + e] = a[e];
      }),
      a
    );
  }
  function Kb(e) {
    return function (t) {
      return t < 0.5 ? (1 - e(1 - 2 * t)) / 2 : 0.5 + e(2 * (t - 0.5)) / 2;
    };
  }
  function Lb(r, t, e) {
    function Ql(t) {
      return 1 === t ? 1 : i * Math.pow(2, -10 * t) * H((t - a) * n) + 1;
    }
    var i = 1 <= t ? t : 1,
      n = (e || (r ? 0.3 : 0.45)) / (t < 1 ? t : 1),
      a = (n / U) * (Math.asin(1 / i) || 0),
      s =
        "out" === r
          ? Ql
          : "in" === r
          ? function (t) {
              return 1 - Ql(1 - t);
            }
          : Kb(Ql);
    return (
      (n = U / n),
      (s.config = function (t, e) {
        return Lb(r, t, e);
      }),
      s
    );
  }
  function Mb(e, r) {
    function Yl(t) {
      return t ? --t * t * ((r + 1) * t + r) + 1 : 0;
    }
    void 0 === r && (r = 1.70158);
    var t =
      "out" === e
        ? Yl
        : "in" === e
        ? function (t) {
            return 1 - Yl(1 - t);
          }
        : Kb(Yl);
    return (
      (t.config = function (t) {
        return Mb(e, t);
      }),
      t
    );
  }
  var B,
    I,
    i,
    n,
    a,
    h,
    l,
    f,
    d,
    c,
    m,
    g,
    y,
    b,
    T,
    w,
    x,
    k,
    A,
    C,
    S,
    D,
    z,
    E,
    F,
    R,
    Y = {
      autoSleep: 120,
      force3D: "auto",
      nullTargetWarn: 1,
      units: { lineHeight: "" },
    },
    L = { duration: 0.5, overwrite: !1, delay: 0 },
    j = 1e8,
    X = 1 / j,
    U = 2 * Math.PI,
    J = U / 4,
    V = 0,
    W = Math.sqrt,
    G = Math.cos,
    H = Math.sin,
    K =
      ("function" == typeof ArrayBuffer && ArrayBuffer.isView) ||
      function () {},
    Z = Array.isArray,
    tt = /(?:-?\.?\d|\.)+/gi,
    et = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
    rt = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
    it = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
    nt = /[+-]=-?[.\d]+/,
    at = /[^,'"\[\]\s]+/gi,
    st = /[\d.+\-=]+(?:e[-+]\d*)*/i,
    ot = {},
    ut = {},
    ht = [],
    lt = {},
    ft = {},
    dt = {},
    pt = 30,
    ct = [],
    _t = "",
    mt = function _merge(t, e) {
      for (var r in e) t[r] = e[r];
      return t;
    },
    gt = function _animationCycle(t, e) {
      var r = Math.floor((t /= e));
      return t && r === t ? r - 1 : r;
    },
    vt = function _isFromOrFromStart(t) {
      var e = t.data;
      return "isFromStart" === e || "isStart" === e;
    },
    yt = { _start: 0, endTime: Q, totalDuration: Q },
    bt = function _parsePosition(t, e, r) {
      var i,
        n,
        a,
        s = t.labels,
        u = t._recent || yt,
        h = t.duration() >= j ? u.endTime(!1) : t._dur;
      return o(e) && (isNaN(e) || e in s)
        ? ((n = e.charAt(0)),
          (a = "%" === e.substr(-1)),
          (i = e.indexOf("=")),
          "<" === n || ">" === n
            ? (0 <= i && (e = e.replace(/=/, "")),
              ("<" === n ? u._start : u.endTime(0 <= u._repeat)) +
                (parseFloat(e.substr(1)) || 0) *
                  (a ? (i < 0 ? u : r).totalDuration() / 100 : 1))
            : i < 0
            ? (e in s || (s[e] = h), s[e])
            : ((n = parseFloat(e.charAt(i - 1) + e.substr(i + 1))),
              a && r && (n = (n / 100) * (Z(r) ? r[0] : r).totalDuration()),
              1 < i ? _parsePosition(t, e.substr(0, i - 1), r) + n : h + n))
        : null == e
        ? h
        : +e;
    },
    Tt = function _clamp(t, e, r) {
      return r < t ? t : e < r ? e : r;
    },
    wt = [].slice,
    xt = function toArray(t, e, r) {
      return !o(t) || r || (!n && Dt())
        ? Z(t)
          ? (function _flatten(t, e, r) {
              return (
                void 0 === r && (r = []),
                t.forEach(function (t) {
                  return (o(t) && !e) || Ta(t, 1)
                    ? r.push.apply(r, xt(t))
                    : r.push(t);
                }) || r
              );
            })(t, r)
          : Ta(t)
          ? wt.call(t, 0)
          : t
          ? [t]
          : []
        : wt.call((e || a).querySelectorAll(t), 0);
    },
    Ot = function mapRange(e, t, r, i, n) {
      var a = t - e,
        s = i - r;
      return Oa(n, function (t) {
        return r + (((t - e) / a) * s || 0);
      });
    },
    Mt = function _callback(t, e, r) {
      var i,
        n,
        a = t.vars,
        s = a[e];
      if (s)
        return (
          (i = a[e + "Params"]),
          (n = a.callbackScope || t),
          r && ht.length && fa(),
          i ? s.apply(n, i) : s.call(n)
        );
    },
    kt = 255,
    At = {
      aqua: [0, kt, kt],
      lime: [0, kt, 0],
      silver: [192, 192, 192],
      black: [0, 0, 0],
      maroon: [128, 0, 0],
      teal: [0, 128, 128],
      blue: [0, 0, kt],
      navy: [0, 0, 128],
      white: [kt, kt, kt],
      olive: [128, 128, 0],
      yellow: [kt, kt, 0],
      orange: [kt, 165, 0],
      gray: [128, 128, 128],
      purple: [128, 0, 128],
      green: [0, 128, 0],
      red: [kt, 0, 0],
      pink: [kt, 192, 203],
      cyan: [0, kt, kt],
      transparent: [kt, kt, kt, 0],
    },
    Pt = (function () {
      var t,
        e =
          "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b";
      for (t in At) e += "|" + t + "\\b";
      return new RegExp(e + ")", "gi");
    })(),
    Ct = /hsl[a]?\(/,
    St =
      ((x = Date.now),
      (k = 500),
      (A = 33),
      (C = x()),
      (S = C),
      (z = D = 1e3 / 240),
      (b = {
        time: 0,
        frame: 0,
        tick: function tick() {
          Mk(!0);
        },
        deltaRatio: function deltaRatio(t) {
          return T / (1e3 / (t || 60));
        },
        wake: function wake() {
          l &&
            (!n &&
              u() &&
              ((i = n = window),
              (a = i.document || {}),
              (ot.gsap = oe),
              (i.gsapVersions || (i.gsapVersions = [])).push(oe.version),
              M(h || i.GreenSockGlobals || (!i.gsap && i) || {}),
              (y = i.requestAnimationFrame)),
            m && b.sleep(),
            (g =
              y ||
              function (t) {
                return setTimeout(t, (z - 1e3 * b.time + 1) | 0);
              }),
            (c = 1),
            Mk(2));
        },
        sleep: function sleep() {
          (y ? i.cancelAnimationFrame : clearTimeout)(m), (c = 0), (g = Q);
        },
        lagSmoothing: function lagSmoothing(t, e) {
          (k = t || 1e8), (A = Math.min(e, k, 0));
        },
        fps: function fps(t) {
          (D = 1e3 / (t || 240)), (z = 1e3 * b.time + D);
        },
        add: function add(t) {
          E.indexOf(t) < 0 && E.push(t), Dt();
        },
        remove: function remove(t) {
          var e;
          ~(e = E.indexOf(t)) && E.splice(e, 1) && e <= w && w--;
        },
        _listeners: (E = []),
      })),
    Dt = function _wake() {
      return !c && St.wake();
    },
    zt = {},
    Et = /^[\d.\-M][\d.\-,\s]/,
    Ft = /["']/g,
    Rt = function _invertEase(e) {
      return function (t) {
        return 1 - e(1 - t);
      };
    },
    Bt = function _parseEase(t, e) {
      return (t && (p(t) ? t : zt[t] || Fb(t))) || e;
    };
  function Mk(t) {
    var e,
      r,
      i,
      n,
      a = x() - S,
      s = !0 === t;
    if (
      (k < a && (C += a - A),
      (0 < (e = (i = (S += a) - C) - z) || s) &&
        ((n = ++b.frame),
        (T = i - 1e3 * b.time),
        (b.time = i /= 1e3),
        (z += e + (D <= e ? 4 : D - e)),
        (r = 1)),
      s || (m = g(Mk)),
      r)
    )
      for (w = 0; w < E.length; w++) E[w](i, T, n, t);
  }
  function nm(t) {
    return t < R
      ? F * t * t
      : t < 0.7272727272727273
      ? F * Math.pow(t - 1.5 / 2.75, 2) + 0.75
      : t < 0.9090909090909092
      ? F * (t -= 2.25 / 2.75) * t + 0.9375
      : F * Math.pow(t - 2.625 / 2.75, 2) + 0.984375;
  }
  ba("Linear,Quad,Cubic,Quart,Quint,Strong", function (t, e) {
    var r = e < 5 ? e + 1 : e;
    Jb(
      t + ",Power" + (r - 1),
      e
        ? function (t) {
            return Math.pow(t, r);
          }
        : function (t) {
            return t;
          },
      function (t) {
        return 1 - Math.pow(1 - t, r);
      },
      function (t) {
        return t < 0.5
          ? Math.pow(2 * t, r) / 2
          : 1 - Math.pow(2 * (1 - t), r) / 2;
      }
    );
  }),
    (zt.Linear.easeNone = zt.none = zt.Linear.easeIn),
    Jb("Elastic", Lb("in"), Lb("out"), Lb()),
    (F = 7.5625),
    (R = 1 / 2.75),
    Jb(
      "Bounce",
      function (t) {
        return 1 - nm(1 - t);
      },
      nm
    ),
    Jb("Expo", function (t) {
      return t ? Math.pow(2, 10 * (t - 1)) : 0;
    }),
    Jb("Circ", function (t) {
      return -(W(1 - t * t) - 1);
    }),
    Jb("Sine", function (t) {
      return 1 === t ? 1 : 1 - G(t * J);
    }),
    Jb("Back", Mb("in"), Mb("out"), Mb()),
    (zt.SteppedEase =
      zt.steps =
      ot.SteppedEase =
        {
          config: function config(t, e) {
            void 0 === t && (t = 1);
            var r = 1 / t,
              i = t + (e ? 0 : 1),
              n = e ? 1 : 0;
            return function (t) {
              return (((i * Tt(0, 0.99999999, t)) | 0) + n) * r;
            };
          },
        }),
    (L.ease = zt["quad.out"]),
    ba(
      "onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",
      function (t) {
        return (_t += t + "," + t + "Params,");
      }
    );
  var It,
    Lt = function GSCache(t, e) {
      (this.id = V++),
        ((t._gsap = this).target = t),
        (this.harness = e),
        (this.get = e ? e.get : aa),
        (this.set = e ? e.getSetter : Kt);
    },
    qt =
      (((It = Animation.prototype).delay = function delay(t) {
        return t || 0 === t
          ? (this.parent &&
              this.parent.smoothChildTiming &&
              this.startTime(this._start + t - this._delay),
            (this._delay = t),
            this)
          : this._delay;
      }),
      (It.duration = function duration(t) {
        return arguments.length
          ? this.totalDuration(
              0 < this._repeat ? t + (t + this._rDelay) * this._repeat : t
            )
          : this.totalDuration() && this._dur;
      }),
      (It.totalDuration = function totalDuration(t) {
        return arguments.length
          ? ((this._dirty = 0),
            Ja(
              this,
              this._repeat < 0
                ? t
                : (t - this._repeat * this._rDelay) / (this._repeat + 1)
            ))
          : this._tDur;
      }),
      (It.totalTime = function totalTime(t, e) {
        if ((Dt(), !arguments.length)) return this._tTime;
        var r = this._dp;
        if (r && r.smoothChildTiming && this._ts) {
          for (Aa(this, t), !r._dp || r.parent || Ba(r, this); r && r.parent; )
            r.parent._time !==
              r._start +
                (0 <= r._ts
                  ? r._tTime / r._ts
                  : (r.totalDuration() - r._tTime) / -r._ts) &&
              r.totalTime(r._tTime, !0),
              (r = r.parent);
          !this.parent &&
            this._dp.autoRemoveChildren &&
            ((0 < this._ts && t < this._tDur) ||
              (this._ts < 0 && 0 < t) ||
              (!this._tDur && !t)) &&
            Ca(this._dp, this, this._start - this._delay);
        }
        return (
          (this._tTime !== t ||
            (!this._dur && !e) ||
            (this._initted && Math.abs(this._zTime) === X) ||
            (!t && !this._initted && (this.add || this._ptLookup))) &&
            (this._ts || (this._pTime = t), ga(this, t, e)),
          this
        );
      }),
      (It.time = function time(t, e) {
        return arguments.length
          ? this.totalTime(
              Math.min(this.totalDuration(), t + wa(this)) %
                (this._dur + this._rDelay) || (t ? this._dur : 0),
              e
            )
          : this._time;
      }),
      (It.totalProgress = function totalProgress(t, e) {
        return arguments.length
          ? this.totalTime(this.totalDuration() * t, e)
          : this.totalDuration()
          ? Math.min(1, this._tTime / this._tDur)
          : this.ratio;
      }),
      (It.progress = function progress(t, e) {
        return arguments.length
          ? this.totalTime(
              this.duration() *
                (!this._yoyo || 1 & this.iteration() ? t : 1 - t) +
                wa(this),
              e
            )
          : this.duration()
          ? Math.min(1, this._time / this._dur)
          : this.ratio;
      }),
      (It.iteration = function iteration(t, e) {
        var r = this.duration() + this._rDelay;
        return arguments.length
          ? this.totalTime(this._time + (t - 1) * r, e)
          : this._repeat
          ? gt(this._tTime, r) + 1
          : 1;
      }),
      (It.timeScale = function timeScale(t) {
        if (!arguments.length) return this._rts === -X ? 0 : this._rts;
        if (this._rts === t) return this;
        var e =
          this.parent && this._ts ? ya(this.parent._time, this) : this._tTime;
        return (
          (this._rts = +t || 0),
          (this._ts = this._ps || t === -X ? 0 : this._rts),
          (function _recacheAncestors(t) {
            for (var e = t.parent; e && e.parent; )
              (e._dirty = 1), e.totalDuration(), (e = e.parent);
          })(this.totalTime(Tt(-this._delay, this._tDur, e), !0)),
          za(this),
          this
        );
      }),
      (It.paused = function paused(t) {
        return arguments.length
          ? (this._ps !== t &&
              ((this._ps = t)
                ? ((this._pTime =
                    this._tTime || Math.max(-this._delay, this.rawTime())),
                  (this._ts = this._act = 0))
                : (Dt(),
                  (this._ts = this._rts),
                  this.totalTime(
                    this.parent && !this.parent.smoothChildTiming
                      ? this.rawTime()
                      : this._tTime || this._pTime,
                    1 === this.progress() &&
                      Math.abs(this._zTime) !== X &&
                      (this._tTime -= X)
                  ))),
            this)
          : this._ps;
      }),
      (It.startTime = function startTime(t) {
        if (arguments.length) {
          this._start = t;
          var e = this.parent || this._dp;
          return (
            !e || (!e._sort && this.parent) || Ca(e, this, t - this._delay),
            this
          );
        }
        return this._start;
      }),
      (It.endTime = function endTime(e) {
        return (
          this._start +
          (t(e) ? this.totalDuration() : this.duration()) /
            Math.abs(this._ts || 1)
        );
      }),
      (It.rawTime = function rawTime(t) {
        var e = this.parent || this._dp;
        return e
          ? t &&
            (!this._ts ||
              (this._repeat && this._time && this.totalProgress() < 1))
            ? this._tTime % (this._dur + this._rDelay)
            : this._ts
            ? ya(e.rawTime(t), this)
            : this._tTime
          : this._tTime;
      }),
      (It.globalTime = function globalTime(t) {
        for (var e = this, r = arguments.length ? t : e.rawTime(); e; )
          (r = e._start + r / (e._ts || 1)), (e = e._dp);
        return r;
      }),
      (It.repeat = function repeat(t) {
        return arguments.length
          ? ((this._repeat = t === 1 / 0 ? -2 : t), Ka(this))
          : -2 === this._repeat
          ? 1 / 0
          : this._repeat;
      }),
      (It.repeatDelay = function repeatDelay(t) {
        if (arguments.length) {
          var e = this._time;
          return (this._rDelay = t), Ka(this), e ? this.time(e) : this;
        }
        return this._rDelay;
      }),
      (It.yoyo = function yoyo(t) {
        return arguments.length ? ((this._yoyo = t), this) : this._yoyo;
      }),
      (It.seek = function seek(e, r) {
        return this.totalTime(bt(this, e), t(r));
      }),
      (It.restart = function restart(e, r) {
        return this.play().totalTime(e ? -this._delay : 0, t(r));
      }),
      (It.play = function play(t, e) {
        return null != t && this.seek(t, e), this.reversed(!1).paused(!1);
      }),
      (It.reverse = function reverse(t, e) {
        return (
          null != t && this.seek(t || this.totalDuration(), e),
          this.reversed(!0).paused(!1)
        );
      }),
      (It.pause = function pause(t, e) {
        return null != t && this.seek(t, e), this.paused(!0);
      }),
      (It.resume = function resume() {
        return this.paused(!1);
      }),
      (It.reversed = function reversed(t) {
        return arguments.length
          ? (!!t !== this.reversed() &&
              this.timeScale(-this._rts || (t ? -X : 0)),
            this)
          : this._rts < 0;
      }),
      (It.invalidate = function invalidate() {
        return (this._initted = this._act = 0), (this._zTime = -X), this;
      }),
      (It.isActive = function isActive() {
        var t,
          e = this.parent || this._dp,
          r = this._start;
        return !(
          e &&
          !(
            this._ts &&
            this._initted &&
            e.isActive() &&
            (t = e.rawTime(!0)) >= r &&
            t < this.endTime(!0) - X
          )
        );
      }),
      (It.eventCallback = function eventCallback(t, e, r) {
        var i = this.vars;
        return 1 < arguments.length
          ? (e
              ? ((i[t] = e),
                r && (i[t + "Params"] = r),
                "onUpdate" === t && (this._onUpdate = e))
              : delete i[t],
            this)
          : i[t];
      }),
      (It.then = function then(t) {
        var i = this;
        return new Promise(function (e) {
          function En() {
            var t = i.then;
            (i.then = null),
              p(r) && (r = r(i)) && (r.then || r === i) && (i.then = t),
              e(r),
              (i.then = t);
          }
          var r = p(t) ? t : ia;
          (i._initted && 1 === i.totalProgress() && 0 <= i._ts) ||
          (!i._tTime && i._ts < 0)
            ? En()
            : (i._prom = En);
        });
      }),
      (It.kill = function kill() {
        lb(this);
      }),
      Animation);
  function Animation(t) {
    (this.vars = t),
      (this._delay = +t.delay || 0),
      (this._repeat = t.repeat === 1 / 0 ? -2 : t.repeat || 0) &&
        ((this._rDelay = t.repeatDelay || 0),
        (this._yoyo = !!t.yoyo || !!t.yoyoEase)),
      (this._ts = 1),
      Ja(this, +t.duration, 1, 1),
      (this.data = t.data),
      c || St.wake();
  }
  ja(qt.prototype, {
    _time: 0,
    _start: 0,
    _end: 0,
    _tTime: 0,
    _tDur: 0,
    _dirty: 0,
    _repeat: 0,
    _yoyo: !1,
    parent: null,
    _initted: !1,
    _rDelay: 0,
    _ts: 1,
    _dp: 0,
    ratio: 0,
    _zTime: -X,
    _prom: 0,
    _ps: !1,
    _rts: 1,
  });
  var Nt = (function (n) {
    function Timeline(e, r) {
      var i;
      return (
        void 0 === e && (e = {}),
        ((i = n.call(this, e) || this).labels = {}),
        (i.smoothChildTiming = !!e.smoothChildTiming),
        (i.autoRemoveChildren = !!e.autoRemoveChildren),
        (i._sort = t(e.sortChildren)),
        I && Ca(e.parent || I, _assertThisInitialized(i), r),
        e.reversed && i.reverse(),
        e.paused && i.paused(!0),
        e.scrollTrigger && Da(_assertThisInitialized(i), e.scrollTrigger),
        i
      );
    }
    _inheritsLoose(Timeline, n);
    var e = Timeline.prototype;
    return (
      (e.to = function to(t, e, r) {
        return Na(0, arguments, this), this;
      }),
      (e.from = function from(t, e, r) {
        return Na(1, arguments, this), this;
      }),
      (e.fromTo = function fromTo(t, e, r, i) {
        return Na(2, arguments, this), this;
      }),
      (e.set = function set(t, e, r) {
        return (
          (e.duration = 0),
          (e.parent = this),
          oa(e).repeatDelay || (e.repeat = 0),
          (e.immediateRender = !!e.immediateRender),
          new Vt(t, e, bt(this, r), 1),
          this
        );
      }),
      (e.call = function call(t, e, r) {
        return Ca(this, Vt.delayedCall(0, t, e), r);
      }),
      (e.staggerTo = function staggerTo(t, e, r, i, n, a, s) {
        return (
          (r.duration = e),
          (r.stagger = r.stagger || i),
          (r.onComplete = a),
          (r.onCompleteParams = s),
          (r.parent = this),
          new Vt(t, r, bt(this, n)),
          this
        );
      }),
      (e.staggerFrom = function staggerFrom(e, r, i, n, a, s, o) {
        return (
          (i.runBackwards = 1),
          (oa(i).immediateRender = t(i.immediateRender)),
          this.staggerTo(e, r, i, n, a, s, o)
        );
      }),
      (e.staggerFromTo = function staggerFromTo(e, r, i, n, a, s, o, u) {
        return (
          (n.startAt = i),
          (oa(n).immediateRender = t(n.immediateRender)),
          this.staggerTo(e, r, n, a, s, o, u)
        );
      }),
      (e.render = function render(t, e, r) {
        var i,
          n,
          a,
          s,
          o,
          u,
          h,
          l,
          f,
          d,
          p,
          c,
          _ = this._time,
          m = this._dirty ? this.totalDuration() : this._tDur,
          g = this._dur,
          v = t <= 0 ? 0 : da(t),
          y = this._zTime < 0 != t < 0 && (this._initted || !g);
        if (
          (this !== I && m < v && 0 <= t && (v = m),
          v !== this._tTime || r || y)
        ) {
          if (
            (_ !== this._time &&
              g &&
              ((v += this._time - _), (t += this._time - _)),
            (i = v),
            (f = this._start),
            (u = !(l = this._ts)),
            y && (g || (_ = this._zTime), (!t && e) || (this._zTime = t)),
            this._repeat)
          ) {
            if (
              ((p = this._yoyo),
              (o = g + this._rDelay),
              this._repeat < -1 && t < 0)
            )
              return this.totalTime(100 * o + t, e, r);
            if (
              ((i = da(v % o)),
              v === m
                ? ((s = this._repeat), (i = g))
                : ((s = ~~(v / o)) && s === v / o && ((i = g), s--),
                  g < i && (i = g)),
              (d = gt(this._tTime, o)),
              !_ && this._tTime && d !== s && (d = s),
              p && 1 & s && ((i = g - i), (c = 1)),
              s !== d && !this._lock)
            ) {
              var b = p && 1 & d,
                T = b === (p && 1 & s);
              if (
                (s < d && (b = !b),
                (_ = b ? 0 : g),
                (this._lock = 1),
                (this.render(_ || (c ? 0 : da(s * o)), e, !g)._lock = 0),
                (this._tTime = v),
                !e && this.parent && Mt(this, "onRepeat"),
                this.vars.repeatRefresh && !c && (this.invalidate()._lock = 1),
                (_ && _ !== this._time) ||
                  u != !this._ts ||
                  (this.vars.onRepeat && !this.parent && !this._act))
              )
                return this;
              if (
                ((g = this._dur),
                (m = this._tDur),
                T &&
                  ((this._lock = 2),
                  (_ = b ? g : -1e-4),
                  this.render(_, !0),
                  this.vars.repeatRefresh && !c && this.invalidate()),
                (this._lock = 0),
                !this._ts && !u)
              )
                return this;
              Hb(this, c);
            }
          }
          if (
            (this._hasPause &&
              !this._forcing &&
              this._lock < 2 &&
              (h = (function _findNextPauseTween(t, e, r) {
                var i;
                if (e < r)
                  for (i = t._first; i && i._start <= r; ) {
                    if (!i._dur && "isPause" === i.data && i._start > e)
                      return i;
                    i = i._next;
                  }
                else
                  for (i = t._last; i && i._start >= r; ) {
                    if (!i._dur && "isPause" === i.data && i._start < e)
                      return i;
                    i = i._prev;
                  }
              })(this, da(_), da(i))) &&
              (v -= i - (i = h._start)),
            (this._tTime = v),
            (this._time = i),
            (this._act = !l),
            this._initted ||
              ((this._onUpdate = this.vars.onUpdate),
              (this._initted = 1),
              (this._zTime = t),
              (_ = 0)),
            !_ && i && !e && (Mt(this, "onStart"), this._tTime !== v))
          )
            return this;
          if (_ <= i && 0 <= t)
            for (n = this._first; n; ) {
              if (
                ((a = n._next), (n._act || i >= n._start) && n._ts && h !== n)
              ) {
                if (n.parent !== this) return this.render(t, e, r);
                if (
                  (n.render(
                    0 < n._ts
                      ? (i - n._start) * n._ts
                      : (n._dirty ? n.totalDuration() : n._tDur) +
                          (i - n._start) * n._ts,
                    e,
                    r
                  ),
                  i !== this._time || (!this._ts && !u))
                ) {
                  (h = 0), a && (v += this._zTime = -X);
                  break;
                }
              }
              n = a;
            }
          else {
            n = this._last;
            for (var w = t < 0 ? t : i; n; ) {
              if (
                ((a = n._prev), (n._act || w <= n._end) && n._ts && h !== n)
              ) {
                if (n.parent !== this) return this.render(t, e, r);
                if (
                  (n.render(
                    0 < n._ts
                      ? (w - n._start) * n._ts
                      : (n._dirty ? n.totalDuration() : n._tDur) +
                          (w - n._start) * n._ts,
                    e,
                    r
                  ),
                  i !== this._time || (!this._ts && !u))
                ) {
                  (h = 0), a && (v += this._zTime = w ? -X : X);
                  break;
                }
              }
              n = a;
            }
          }
          if (
            h &&
            !e &&
            (this.pause(),
            (h.render(_ <= i ? 0 : -X)._zTime = _ <= i ? 1 : -1),
            this._ts)
          )
            return (this._start = f), za(this), this.render(t, e, r);
          this._onUpdate && !e && Mt(this, "onUpdate", !0),
            ((v === m && m >= this.totalDuration()) || (!v && _)) &&
              ((f !== this._start && Math.abs(l) === Math.abs(this._ts)) ||
                this._lock ||
                ((!t && g) ||
                  !((v === m && 0 < this._ts) || (!v && this._ts < 0)) ||
                  sa(this, 1),
                e ||
                  (t < 0 && !_) ||
                  (!v && !_ && m) ||
                  (Mt(
                    this,
                    v === m && 0 <= t ? "onComplete" : "onReverseComplete",
                    !0
                  ),
                  !this._prom ||
                    (v < m && 0 < this.timeScale()) ||
                    this._prom())));
        }
        return this;
      }),
      (e.add = function add(t, e) {
        var r = this;
        if ((q(e) || (e = bt(this, e, t)), !(t instanceof qt))) {
          if (Z(t))
            return (
              t.forEach(function (t) {
                return r.add(t, e);
              }),
              this
            );
          if (o(t)) return this.addLabel(t, e);
          if (!p(t)) return this;
          t = Vt.delayedCall(0, t);
        }
        return this !== t ? Ca(this, t, e) : this;
      }),
      (e.getChildren = function getChildren(t, e, r, i) {
        void 0 === t && (t = !0),
          void 0 === e && (e = !0),
          void 0 === r && (r = !0),
          void 0 === i && (i = -j);
        for (var n = [], a = this._first; a; )
          a._start >= i &&
            (a instanceof Vt
              ? e && n.push(a)
              : (r && n.push(a),
                t && n.push.apply(n, a.getChildren(!0, e, r)))),
            (a = a._next);
        return n;
      }),
      (e.getById = function getById(t) {
        for (var e = this.getChildren(1, 1, 1), r = e.length; r--; )
          if (e[r].vars.id === t) return e[r];
      }),
      (e.remove = function remove(t) {
        return o(t)
          ? this.removeLabel(t)
          : p(t)
          ? this.killTweensOf(t)
          : (ra(this, t),
            t === this._recent && (this._recent = this._last),
            ta(this));
      }),
      (e.totalTime = function totalTime(t, e) {
        return arguments.length
          ? ((this._forcing = 1),
            !this._dp &&
              this._ts &&
              (this._start = da(
                St.time -
                  (0 < this._ts
                    ? t / this._ts
                    : (this.totalDuration() - t) / -this._ts)
              )),
            n.prototype.totalTime.call(this, t, e),
            (this._forcing = 0),
            this)
          : this._tTime;
      }),
      (e.addLabel = function addLabel(t, e) {
        return (this.labels[t] = bt(this, e)), this;
      }),
      (e.removeLabel = function removeLabel(t) {
        return delete this.labels[t], this;
      }),
      (e.addPause = function addPause(t, e, r) {
        var i = Vt.delayedCall(0, e || Q, r);
        return (
          (i.data = "isPause"), (this._hasPause = 1), Ca(this, i, bt(this, t))
        );
      }),
      (e.removePause = function removePause(t) {
        var e = this._first;
        for (t = bt(this, t); e; )
          e._start === t && "isPause" === e.data && sa(e), (e = e._next);
      }),
      (e.killTweensOf = function killTweensOf(t, e, r) {
        for (var i = this.getTweensOf(t, r), n = i.length; n--; )
          Qt !== i[n] && i[n].kill(t, e);
        return this;
      }),
      (e.getTweensOf = function getTweensOf(t, e) {
        for (var r, i = [], n = xt(t), a = this._first, s = q(e); a; )
          a instanceof Vt
            ? ea(a._targets, n) &&
              (s
                ? (!Qt || (a._initted && a._ts)) &&
                  a.globalTime(0) <= e &&
                  a.globalTime(a.totalDuration()) > e
                : !e || a.isActive()) &&
              i.push(a)
            : (r = a.getTweensOf(n, e)).length && i.push.apply(i, r),
            (a = a._next);
        return i;
      }),
      (e.tweenTo = function tweenTo(t, e) {
        e = e || {};
        var r,
          i = this,
          n = bt(i, t),
          a = e.startAt,
          s = e.onStart,
          o = e.onStartParams,
          u = e.immediateRender,
          h = Vt.to(
            i,
            ja(
              {
                ease: e.ease || "none",
                lazy: !1,
                immediateRender: !1,
                time: n,
                overwrite: "auto",
                duration:
                  e.duration ||
                  Math.abs(
                    (n - (a && "time" in a ? a.time : i._time)) / i.timeScale()
                  ) ||
                  X,
                onStart: function onStart() {
                  if ((i.pause(), !r)) {
                    var t =
                      e.duration ||
                      Math.abs(
                        (n - (a && "time" in a ? a.time : i._time)) /
                          i.timeScale()
                      );
                    h._dur !== t && Ja(h, t, 0, 1).render(h._time, !0, !0),
                      (r = 1);
                  }
                  s && s.apply(h, o || []);
                },
              },
              e
            )
          );
        return u ? h.render(0) : h;
      }),
      (e.tweenFromTo = function tweenFromTo(t, e, r) {
        return this.tweenTo(e, ja({ startAt: { time: bt(this, t) } }, r));
      }),
      (e.recent = function recent() {
        return this._recent;
      }),
      (e.nextLabel = function nextLabel(t) {
        return void 0 === t && (t = this._time), jb(this, bt(this, t));
      }),
      (e.previousLabel = function previousLabel(t) {
        return void 0 === t && (t = this._time), jb(this, bt(this, t), 1);
      }),
      (e.currentLabel = function currentLabel(t) {
        return arguments.length
          ? this.seek(t, !0)
          : this.previousLabel(this._time + X);
      }),
      (e.shiftChildren = function shiftChildren(t, e, r) {
        void 0 === r && (r = 0);
        for (var i, n = this._first, a = this.labels; n; )
          n._start >= r && ((n._start += t), (n._end += t)), (n = n._next);
        if (e) for (i in a) a[i] >= r && (a[i] += t);
        return ta(this);
      }),
      (e.invalidate = function invalidate() {
        var t = this._first;
        for (this._lock = 0; t; ) t.invalidate(), (t = t._next);
        return n.prototype.invalidate.call(this);
      }),
      (e.clear = function clear(t) {
        void 0 === t && (t = !0);
        for (var e, r = this._first; r; )
          (e = r._next), this.remove(r), (r = e);
        return (
          this._dp && (this._time = this._tTime = this._pTime = 0),
          t && (this.labels = {}),
          ta(this)
        );
      }),
      (e.totalDuration = function totalDuration(t) {
        var e,
          r,
          i,
          n = 0,
          a = this,
          s = a._last,
          o = j;
        if (arguments.length)
          return a.timeScale(
            (a._repeat < 0 ? a.duration() : a.totalDuration()) /
              (a.reversed() ? -t : t)
          );
        if (a._dirty) {
          for (i = a.parent; s; )
            (e = s._prev),
              s._dirty && s.totalDuration(),
              o < (r = s._start) && a._sort && s._ts && !a._lock
                ? ((a._lock = 1), (Ca(a, s, r - s._delay, 1)._lock = 0))
                : (o = r),
              r < 0 &&
                s._ts &&
                ((n -= r),
                ((!i && !a._dp) || (i && i.smoothChildTiming)) &&
                  ((a._start += r / a._ts), (a._time -= r), (a._tTime -= r)),
                a.shiftChildren(-r, !1, -Infinity),
                (o = 0)),
              s._end > n && s._ts && (n = s._end),
              (s = e);
          Ja(a, a === I && a._time > n ? a._time : n, 1, 1), (a._dirty = 0);
        }
        return a._tDur;
      }),
      (Timeline.updateRoot = function updateRoot(t) {
        if ((I._ts && (ga(I, ya(t, I)), (f = St.frame)), St.frame >= pt)) {
          pt += Y.autoSleep || 120;
          var e = I._first;
          if ((!e || !e._ts) && Y.autoSleep && St._listeners.length < 2) {
            for (; e && !e._ts; ) e = e._next;
            e || St.sleep();
          }
        }
      }),
      Timeline
    );
  })(qt);
  ja(Nt.prototype, { _lock: 0, _hasPause: 0, _forcing: 0 });
  function Tb(t, e, r, i, n, a) {
    var u, h, l, f;
    if (
      ft[t] &&
      !1 !==
        (u = new ft[t]()).init(
          n,
          u.rawVars
            ? e[t]
            : (function _processVars(t, e, r, i, n) {
                if (
                  (p(t) && (t = Xt(t, n, e, r, i)),
                  !s(t) || (t.style && t.nodeType) || Z(t) || K(t))
                )
                  return o(t) ? Xt(t, n, e, r, i) : t;
                var a,
                  u = {};
                for (a in t) u[a] = Xt(t[a], n, e, r, i);
                return u;
              })(e[t], i, n, a, r),
          r,
          i,
          a
        ) &&
      ((r._pt = h = new ae(r._pt, n, t, 0, 1, u.render, u, 0, u.priority)),
      r !== d)
    )
      for (l = r._ptLookup[r._targets.indexOf(n)], f = u._props.length; f--; )
        l[u._props[f]] = h;
    return u;
  }
  var Qt,
    Yt = function _addPropTween(t, e, r, i, n, a, s, u, h) {
      p(i) && (i = i(n || 0, t, a));
      var l,
        f = t[e],
        d =
          "get" !== r
            ? r
            : p(f)
            ? h
              ? t[
                  e.indexOf("set") || !p(t["get" + e.substr(3)])
                    ? e
                    : "get" + e.substr(3)
                ](h)
              : t[e]()
            : f,
        c = p(f) ? (h ? Ht : Gt) : Wt;
      if (
        (o(i) &&
          (~i.indexOf("random(") && (i = gb(i)),
          "=" === i.charAt(1) &&
            ((!(l =
              parseFloat(d) +
              parseFloat(i.substr(2)) * ("-" === i.charAt(0) ? -1 : 1) +
              (Qa(d) || 0)) &&
              0 !== l) ||
              (i = l))),
        d !== i)
      )
        return isNaN(d * i) || "" === i
          ? (f || e in t || N(e, i),
            function _addComplexStringPropTween(t, e, r, i, n, a, s) {
              var o,
                u,
                h,
                l,
                f,
                d,
                p,
                c,
                _ = new ae(this._pt, t, e, 0, 1, te, null, n),
                m = 0,
                g = 0;
              for (
                _.b = r,
                  _.e = i,
                  r += "",
                  (p = ~(i += "").indexOf("random(")) && (i = gb(i)),
                  a && (a((c = [r, i]), t, e), (r = c[0]), (i = c[1])),
                  u = r.match(it) || [];
                (o = it.exec(i));

              )
                (l = o[0]),
                  (f = i.substring(m, o.index)),
                  h ? (h = (h + 1) % 5) : "rgba(" === f.substr(-5) && (h = 1),
                  l !== u[g++] &&
                    ((d = parseFloat(u[g - 1]) || 0),
                    (_._pt = {
                      _next: _._pt,
                      p: f || 1 === g ? f : ",",
                      s: d,
                      c:
                        "=" === l.charAt(1)
                          ? parseFloat(l.substr(2)) *
                            ("-" === l.charAt(0) ? -1 : 1)
                          : parseFloat(l) - d,
                      m: h && h < 4 ? Math.round : 0,
                    }),
                    (m = it.lastIndex));
              return (
                (_.c = m < i.length ? i.substring(m, i.length) : ""),
                (_.fp = s),
                (nt.test(i) || p) && (_.e = 0),
                (this._pt = _)
              );
            }.call(this, t, e, d, i, c, u || Y.stringFilter, h))
          : ((l = new ae(
              this._pt,
              t,
              e,
              +d || 0,
              i - (d || 0),
              "boolean" == typeof f ? $t : Zt,
              0,
              c
            )),
            h && (l.fp = h),
            s && l.modifier(s, this, t),
            (this._pt = l));
    },
    jt = function _initTween(e, r) {
      var i,
        n,
        a,
        s,
        o,
        u,
        h,
        l,
        f,
        d,
        p,
        c,
        m,
        g = e.vars,
        v = g.ease,
        y = g.startAt,
        b = g.immediateRender,
        T = g.lazy,
        w = g.onUpdate,
        x = g.onUpdateParams,
        O = g.callbackScope,
        M = g.runBackwards,
        k = g.yoyoEase,
        A = g.keyframes,
        P = g.autoRevert,
        C = e._dur,
        S = e._startAt,
        D = e._targets,
        z = e.parent,
        E = z && "nested" === z.data ? z.parent._targets : D,
        F = "auto" === e._overwrite && !B,
        R = e.timeline;
      if (
        (!R || (A && v) || (v = "none"),
        (e._ease = Bt(v, L.ease)),
        (e._yEase = k ? Rt(Bt(!0 === k ? v : k, L.ease)) : 0),
        k &&
          e._yoyo &&
          !e._repeat &&
          ((k = e._yEase), (e._yEase = e._ease), (e._ease = k)),
        (e._from = !R && !!g.runBackwards),
        !R)
      ) {
        if (
          ((c = (l = D[0] ? _(D[0]).harness : 0) && g[l.prop]),
          (i = na(g, ut)),
          S && S.render(-1, !0).kill(),
          y)
        )
          if (
            (sa(
              (e._startAt = Vt.set(
                D,
                ja(
                  {
                    data: "isStart",
                    overwrite: !1,
                    parent: z,
                    immediateRender: !0,
                    lazy: t(T),
                    startAt: null,
                    delay: 0,
                    onUpdate: w,
                    onUpdateParams: x,
                    callbackScope: O,
                    stagger: 0,
                  },
                  y
                )
              ))
            ),
            r < 0 && !b && !P && e._startAt.render(-1, !0),
            b)
          ) {
            if ((0 < r && !P && (e._startAt = 0), C && r <= 0))
              return void (r && (e._zTime = r));
          } else !1 === P && (e._startAt = 0);
        else if (M && C)
          if (S) P || (e._startAt = 0);
          else if (
            (r && (b = !1),
            (a = ja(
              {
                overwrite: !1,
                data: "isFromStart",
                lazy: b && t(T),
                immediateRender: b,
                stagger: 0,
                parent: z,
              },
              i
            )),
            c && (a[l.prop] = c),
            sa((e._startAt = Vt.set(D, a))),
            r < 0 && e._startAt.render(-1, !0),
            b)
          ) {
            if (!r) return;
          } else _initTween(e._startAt, X);
        for (
          e._pt = 0, T = (C && t(T)) || (T && !C), n = 0;
          n < D.length;
          n++
        ) {
          if (
            ((h = (o = D[n])._gsap || $(D)[n]._gsap),
            (e._ptLookup[n] = d = {}),
            lt[h.id] && ht.length && fa(),
            (p = E === D ? n : E.indexOf(o)),
            l &&
              !1 !== (f = new l()).init(o, c || i, e, p, E) &&
              ((e._pt = s =
                new ae(e._pt, o, f.name, 0, 1, f.render, f, 0, f.priority)),
              f._props.forEach(function (t) {
                d[t] = s;
              }),
              f.priority && (u = 1)),
            !l || c)
          )
            for (a in i)
              ft[a] && (f = Tb(a, i, e, p, o, E))
                ? f.priority && (u = 1)
                : (d[a] = s =
                    Yt.call(e, o, a, "get", i[a], p, E, 0, g.stringFilter));
          e._op && e._op[n] && e.kill(o, e._op[n]),
            F &&
              e._pt &&
              ((Qt = e),
              I.killTweensOf(o, d, e.globalTime(r)),
              (m = !e.parent),
              (Qt = 0)),
            e._pt && T && (lt[h.id] = 1);
        }
        u && ne(e), e._onInit && e._onInit(e);
      }
      (e._onUpdate = w), (e._initted = (!e._op || e._pt) && !m);
    },
    Xt = function _parseFuncOrString(t, e, r, i, n) {
      return p(t)
        ? t.call(e, r, i, n)
        : o(t) && ~t.indexOf("random(")
        ? gb(t)
        : t;
    },
    Ut = _t + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase",
    Jt = (Ut + ",id,stagger,delay,duration,paused,scrollTrigger").split(","),
    Vt = (function (C) {
      function Tween(e, r, i, n) {
        var a;
        "number" == typeof r && ((i.duration = r), (r = i), (i = null));
        var o,
          u,
          h,
          l,
          f,
          d,
          p,
          c,
          _ = (a = C.call(this, n ? r : oa(r)) || this).vars,
          m = _.duration,
          g = _.delay,
          y = _.immediateRender,
          b = _.stagger,
          T = _.overwrite,
          w = _.keyframes,
          x = _.defaults,
          M = _.scrollTrigger,
          k = _.yoyoEase,
          A = r.parent || I,
          P = (Z(e) || K(e) ? q(e[0]) : "length" in r) ? [e] : xt(e);
        if (
          ((a._targets = P.length
            ? $(P)
            : O(
                "GSAP target " + e + " not found. https://greensock.com",
                !Y.nullTargetWarn
              ) || []),
          (a._ptLookup = []),
          (a._overwrite = T),
          w || b || v(m) || v(g))
        ) {
          if (
            ((r = a.vars),
            (o = a.timeline =
              new Nt({ data: "nested", defaults: x || {} })).kill(),
            (o.parent = o._dp = _assertThisInitialized(a)),
            (o._start = 0),
            w)
          )
            oa(ja(o.vars.defaults, { ease: "none" })),
              b
                ? P.forEach(function (r, i) {
                    return w.forEach(function (t, e) {
                      return o.to(r, t, e ? ">" : i * b);
                    });
                  })
                : w.forEach(function (t) {
                    return o.to(P, t, ">");
                  });
          else {
            if (((l = P.length), (p = b ? Ya(b) : Q), s(b)))
              for (f in b) ~Ut.indexOf(f) && ((c = c || {})[f] = b[f]);
            for (u = 0; u < l; u++) {
              for (f in ((h = {}), r)) Jt.indexOf(f) < 0 && (h[f] = r[f]);
              (h.stagger = 0),
                k && (h.yoyoEase = k),
                c && mt(h, c),
                (d = P[u]),
                (h.duration = +Xt(m, _assertThisInitialized(a), u, d, P)),
                (h.delay =
                  (+Xt(g, _assertThisInitialized(a), u, d, P) || 0) - a._delay),
                !b &&
                  1 === l &&
                  h.delay &&
                  ((a._delay = g = h.delay), (a._start += g), (h.delay = 0)),
                o.to(d, h, p(u, d, P));
            }
            o.duration() ? (m = g = 0) : (a.timeline = 0);
          }
          m || a.duration((m = o.duration()));
        } else a.timeline = 0;
        return (
          !0 !== T ||
            B ||
            ((Qt = _assertThisInitialized(a)), I.killTweensOf(P), (Qt = 0)),
          Ca(A, _assertThisInitialized(a), i),
          r.reversed && a.reverse(),
          r.paused && a.paused(!0),
          (y ||
            (!m &&
              !w &&
              a._start === da(A._time) &&
              t(y) &&
              (function _hasNoPausedAncestors(t) {
                return !t || (t._ts && _hasNoPausedAncestors(t.parent));
              })(_assertThisInitialized(a)) &&
              "nested" !== A.data)) &&
            ((a._tTime = -X), a.render(Math.max(0, -g))),
          M && Da(_assertThisInitialized(a), M),
          a
        );
      }
      _inheritsLoose(Tween, C);
      var e = Tween.prototype;
      return (
        (e.render = function render(t, e, r) {
          var i,
            n,
            a,
            s,
            o,
            u,
            h,
            l,
            f,
            d = this._time,
            p = this._tDur,
            c = this._dur,
            _ = p - X < t && 0 <= t ? p : t < X ? 0 : t;
          if (c) {
            if (
              _ !== this._tTime ||
              !t ||
              r ||
              (!this._initted && this._tTime) ||
              (this._startAt && this._zTime < 0 != t < 0)
            ) {
              if (((i = _), (l = this.timeline), this._repeat)) {
                if (((s = c + this._rDelay), this._repeat < -1 && t < 0))
                  return this.totalTime(100 * s + t, e, r);
                if (
                  ((i = da(_ % s)),
                  _ === p
                    ? ((a = this._repeat), (i = c))
                    : ((a = ~~(_ / s)) && a === _ / s && ((i = c), a--),
                      c < i && (i = c)),
                  (u = this._yoyo && 1 & a) && ((f = this._yEase), (i = c - i)),
                  (o = gt(this._tTime, s)),
                  i === d && !r && this._initted)
                )
                  return this;
                a !== o &&
                  (l && this._yEase && Hb(l, u),
                  !this.vars.repeatRefresh ||
                    u ||
                    this._lock ||
                    ((this._lock = r = 1),
                    (this.render(da(s * a), !0).invalidate()._lock = 0)));
              }
              if (!this._initted) {
                if (Ea(this, t < 0 ? t : i, r, e))
                  return (this._tTime = 0), this;
                if (c !== this._dur) return this.render(t, e, r);
              }
              if (
                ((this._tTime = _),
                (this._time = i),
                !this._act && this._ts && ((this._act = 1), (this._lazy = 0)),
                (this.ratio = h = (f || this._ease)(i / c)),
                this._from && (this.ratio = h = 1 - h),
                i && !d && !e && (Mt(this, "onStart"), this._tTime !== _))
              )
                return this;
              for (n = this._pt; n; ) n.r(h, n.d), (n = n._next);
              (l && l.render(t < 0 ? t : !i && u ? -X : l._dur * h, e, r)) ||
                (this._startAt && (this._zTime = t)),
                this._onUpdate &&
                  !e &&
                  (t < 0 && this._startAt && this._startAt.render(t, !0, r),
                  Mt(this, "onUpdate")),
                this._repeat &&
                  a !== o &&
                  this.vars.onRepeat &&
                  !e &&
                  this.parent &&
                  Mt(this, "onRepeat"),
                (_ !== this._tDur && _) ||
                  this._tTime !== _ ||
                  (t < 0 &&
                    this._startAt &&
                    !this._onUpdate &&
                    this._startAt.render(t, !0, !0),
                  (!t && c) ||
                    !(
                      (_ === this._tDur && 0 < this._ts) ||
                      (!_ && this._ts < 0)
                    ) ||
                    sa(this, 1),
                  e ||
                    (t < 0 && !d) ||
                    (!_ && !d) ||
                    (Mt(this, _ === p ? "onComplete" : "onReverseComplete", !0),
                    !this._prom ||
                      (_ < p && 0 < this.timeScale()) ||
                      this._prom()));
            }
          } else
            !(function _renderZeroDurationTween(t, e, r, i) {
              var n,
                a,
                s,
                o = t.ratio,
                u =
                  e < 0 ||
                  (!e &&
                    ((!t._start &&
                      (function _parentPlayheadIsBeforeStart(t) {
                        var e = t.parent;
                        return (
                          e &&
                          e._ts &&
                          e._initted &&
                          !e._lock &&
                          (e.rawTime() < 0 || _parentPlayheadIsBeforeStart(e))
                        );
                      })(t) &&
                      (t._initted || !vt(t))) ||
                      ((t._ts < 0 || t._dp._ts < 0) && !vt(t))))
                    ? 0
                    : 1,
                h = t._rDelay,
                l = 0;
              if (
                (h &&
                  t._repeat &&
                  ((l = Tt(0, t._tDur, e)),
                  (a = gt(l, h)),
                  (s = gt(t._tTime, h)),
                  t._yoyo && 1 & a && (u = 1 - u),
                  a !== s &&
                    ((o = 1 - u),
                    t.vars.repeatRefresh && t._initted && t.invalidate())),
                u !== o || i || t._zTime === X || (!e && t._zTime))
              ) {
                if (!t._initted && Ea(t, e, i, r)) return;
                for (
                  s = t._zTime,
                    t._zTime = e || (r ? X : 0),
                    r = r || (e && !s),
                    t.ratio = u,
                    t._from && (u = 1 - u),
                    t._time = 0,
                    t._tTime = l,
                    n = t._pt;
                  n;

                )
                  n.r(u, n.d), (n = n._next);
                t._startAt && e < 0 && t._startAt.render(e, !0, !0),
                  t._onUpdate && !r && Mt(t, "onUpdate"),
                  l && t._repeat && !r && t.parent && Mt(t, "onRepeat"),
                  (e >= t._tDur || e < 0) &&
                    t.ratio === u &&
                    (u && sa(t, 1),
                    r ||
                      (Mt(t, u ? "onComplete" : "onReverseComplete", !0),
                      t._prom && t._prom()));
              } else t._zTime || (t._zTime = e);
            })(this, t, e, r);
          return this;
        }),
        (e.targets = function targets() {
          return this._targets;
        }),
        (e.invalidate = function invalidate() {
          return (
            (this._pt =
              this._op =
              this._startAt =
              this._onUpdate =
              this._lazy =
              this.ratio =
                0),
            (this._ptLookup = []),
            this.timeline && this.timeline.invalidate(),
            C.prototype.invalidate.call(this)
          );
        }),
        (e.kill = function kill(t, e) {
          if ((void 0 === e && (e = "all"), !(t || (e && "all" !== e))))
            return (this._lazy = this._pt = 0), this.parent ? lb(this) : this;
          if (this.timeline) {
            var r = this.timeline.totalDuration();
            return (
              this.timeline.killTweensOf(t, e, Qt && !0 !== Qt.vars.overwrite)
                ._first || lb(this),
              this.parent &&
                r !== this.timeline.totalDuration() &&
                Ja(this, (this._dur * this.timeline._tDur) / r, 0, 1),
              this
            );
          }
          var i,
            n,
            a,
            s,
            u,
            h,
            l,
            f = this._targets,
            d = t ? xt(t) : f,
            p = this._ptLookup,
            c = this._pt;
          if (
            (!e || "all" === e) &&
            (function _arraysMatch(t, e) {
              for (
                var r = t.length, i = r === e.length;
                i && r-- && t[r] === e[r];

              );
              return r < 0;
            })(f, d)
          )
            return "all" === e && (this._pt = 0), lb(this);
          for (
            i = this._op = this._op || [],
              "all" !== e &&
                (o(e) &&
                  ((u = {}),
                  ba(e, function (t) {
                    return (u[t] = 1);
                  }),
                  (e = u)),
                (e = (function _addAliasesToVars(t, e) {
                  var r,
                    i,
                    n,
                    a,
                    s = t[0] ? _(t[0]).harness : 0,
                    o = s && s.aliases;
                  if (!o) return e;
                  for (i in ((r = mt({}, e)), o))
                    if ((i in r))
                      for (n = (a = o[i].split(",")).length; n--; )
                        r[a[n]] = r[i];
                  return r;
                })(f, e))),
              l = f.length;
            l--;

          )
            if (~d.indexOf(f[l]))
              for (u in ((n = p[l]),
              "all" === e
                ? ((i[l] = e), (s = n), (a = {}))
                : ((a = i[l] = i[l] || {}), (s = e)),
              s))
                (h = n && n[u]) &&
                  (("kill" in h.d && !0 !== h.d.kill(u)) || ra(this, h, "_pt"),
                  delete n[u]),
                  "all" !== a && (a[u] = 1);
          return this._initted && !this._pt && c && lb(this), this;
        }),
        (Tween.to = function to(t, e, r) {
          return new Tween(t, e, r);
        }),
        (Tween.from = function from(t, e) {
          return Na(1, arguments);
        }),
        (Tween.delayedCall = function delayedCall(t, e, r, i) {
          return new Tween(e, 0, {
            immediateRender: !1,
            lazy: !1,
            overwrite: !1,
            delay: t,
            onComplete: e,
            onReverseComplete: e,
            onCompleteParams: r,
            onReverseCompleteParams: r,
            callbackScope: i,
          });
        }),
        (Tween.fromTo = function fromTo(t, e, r) {
          return Na(2, arguments);
        }),
        (Tween.set = function set(t, e) {
          return (
            (e.duration = 0), e.repeatDelay || (e.repeat = 0), new Tween(t, e)
          );
        }),
        (Tween.killTweensOf = function killTweensOf(t, e, r) {
          return I.killTweensOf(t, e, r);
        }),
        Tween
      );
    })(qt);
  ja(Vt.prototype, { _targets: [], _lazy: 0, _startAt: 0, _op: 0, _onInit: 0 }),
    ba("staggerTo,staggerFrom,staggerFromTo", function (r) {
      Vt[r] = function () {
        var t = new Nt(),
          e = wt.call(arguments, 0);
        return e.splice("staggerFromTo" === r ? 5 : 4, 0, 0), t[r].apply(t, e);
      };
    });
  function cc(t, e, r) {
    return t.setAttribute(e, r);
  }
  function kc(t, e, r, i) {
    i.mSet(t, e, i.m.call(i.tween, r, i.mt), i);
  }
  var Wt = function _setterPlain(t, e, r) {
      return (t[e] = r);
    },
    Gt = function _setterFunc(t, e, r) {
      return t[e](r);
    },
    Ht = function _setterFuncWithParam(t, e, r, i) {
      return t[e](i.fp, r);
    },
    Kt = function _getSetter(t, e) {
      return p(t[e]) ? Gt : r(t[e]) && t.setAttribute ? cc : Wt;
    },
    Zt = function _renderPlain(t, e) {
      return e.set(e.t, e.p, Math.round(1e6 * (e.s + e.c * t)) / 1e6, e);
    },
    $t = function _renderBoolean(t, e) {
      return e.set(e.t, e.p, !!(e.s + e.c * t), e);
    },
    te = function _renderComplexString(t, e) {
      var r = e._pt,
        i = "";
      if (!t && e.b) i = e.b;
      else if (1 === t && e.e) i = e.e;
      else {
        for (; r; )
          (i =
            r.p +
            (r.m
              ? r.m(r.s + r.c * t)
              : Math.round(1e4 * (r.s + r.c * t)) / 1e4) +
            i),
            (r = r._next);
        i += e.c;
      }
      e.set(e.t, e.p, i, e);
    },
    ee = function _renderPropTweens(t, e) {
      for (var r = e._pt; r; ) r.r(t, r.d), (r = r._next);
    },
    re = function _addPluginModifier(t, e, r, i) {
      for (var n, a = this._pt; a; )
        (n = a._next), a.p === i && a.modifier(t, e, r), (a = n);
    },
    ie = function _killPropTweensOf(t) {
      for (var e, r, i = this._pt; i; )
        (r = i._next),
          (i.p === t && !i.op) || i.op === t
            ? ra(this, i, "_pt")
            : i.dep || (e = 1),
          (i = r);
      return !e;
    },
    ne = function _sortPropTweensByPriority(t) {
      for (var e, r, i, n, a = t._pt; a; ) {
        for (e = a._next, r = i; r && r.pr > a.pr; ) r = r._next;
        (a._prev = r ? r._prev : n) ? (a._prev._next = a) : (i = a),
          (a._next = r) ? (r._prev = a) : (n = a),
          (a = e);
      }
      t._pt = i;
    },
    ae =
      ((PropTween.prototype.modifier = function modifier(t, e, r) {
        (this.mSet = this.mSet || this.set),
          (this.set = kc),
          (this.m = t),
          (this.mt = r),
          (this.tween = e);
      }),
      PropTween);
  function PropTween(t, e, r, i, n, a, s, o, u) {
    (this.t = e),
      (this.s = i),
      (this.c = n),
      (this.p = r),
      (this.r = a || Zt),
      (this.d = s || this),
      (this.set = o || Wt),
      (this.pr = u || 0),
      (this._next = t) && (t._prev = this);
  }
  ba(
    _t +
      "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",
    function (t) {
      return (ut[t] = 1);
    }
  ),
    (ot.TweenMax = ot.TweenLite = Vt),
    (ot.TimelineLite = ot.TimelineMax = Nt),
    (I = new Nt({
      sortChildren: !1,
      defaults: L,
      autoRemoveChildren: !0,
      id: "root",
      smoothChildTiming: !0,
    })),
    (Y.stringFilter = wb);
  var se = {
    registerPlugin: function registerPlugin() {
      for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)
        e[r] = arguments[r];
      e.forEach(function (t) {
        return (function _createPlugin(t) {
          var e = (t = (!t.name && t.default) || t).name,
            r = p(t),
            i =
              e && !r && t.init
                ? function () {
                    this._props = [];
                  }
                : t,
            n = {
              init: Q,
              render: ee,
              add: Yt,
              kill: ie,
              modifier: re,
              rawVars: 0,
            },
            a = {
              targetTest: 0,
              get: 0,
              getSetter: Kt,
              aliases: {},
              register: 0,
            };
          if ((Dt(), t !== i)) {
            if (ft[e]) return;
            ja(i, ja(na(t, n), a)),
              mt(i.prototype, mt(n, na(t, a))),
              (ft[(i.prop = e)] = i),
              t.targetTest && (ct.push(i), (ut[e] = 1)),
              (e =
                ("css" === e
                  ? "CSS"
                  : e.charAt(0).toUpperCase() + e.substr(1)) + "Plugin");
          }
          P(e, i), t.register && t.register(oe, i, ae);
        })(t);
      });
    },
    timeline: function timeline(t) {
      return new Nt(t);
    },
    getTweensOf: function getTweensOf(t, e) {
      return I.getTweensOf(t, e);
    },
    getProperty: function getProperty(i, t, e, r) {
      o(i) && (i = xt(i)[0]);
      var n = _(i || {}).get,
        a = e ? ia : ha;
      return (
        "native" === e && (e = ""),
        i
          ? t
            ? a(((ft[t] && ft[t].get) || n)(i, t, e, r))
            : function (t, e, r) {
                return a(((ft[t] && ft[t].get) || n)(i, t, e, r));
              }
          : i
      );
    },
    quickSetter: function quickSetter(r, e, i) {
      if (1 < (r = xt(r)).length) {
        var n = r.map(function (t) {
            return oe.quickSetter(t, e, i);
          }),
          a = n.length;
        return function (t) {
          for (var e = a; e--; ) n[e](t);
        };
      }
      r = r[0] || {};
      var s = ft[e],
        o = _(r),
        u = (o.harness && (o.harness.aliases || {})[e]) || e,
        h = s
          ? function (t) {
              var e = new s();
              (d._pt = 0),
                e.init(r, i ? t + i : t, d, 0, [r]),
                e.render(1, e),
                d._pt && ee(1, d);
            }
          : o.set(r, u);
      return s
        ? h
        : function (t) {
            return h(r, u, i ? t + i : t, o, 1);
          };
    },
    isTweening: function isTweening(t) {
      return 0 < I.getTweensOf(t, !0).length;
    },
    defaults: function defaults(t) {
      return t && t.ease && (t.ease = Bt(t.ease, L.ease)), ma(L, t || {});
    },
    config: function config(t) {
      return ma(Y, t || {});
    },
    registerEffect: function registerEffect(t) {
      var i = t.name,
        n = t.effect,
        e = t.plugins,
        a = t.defaults,
        r = t.extendTimeline;
      (e || "").split(",").forEach(function (t) {
        return (
          t && !ft[t] && !ot[t] && O(i + " effect requires " + t + " plugin.")
        );
      }),
        (dt[i] = function (t, e, r) {
          return n(xt(t), ja(e || {}, a), r);
        }),
        r &&
          (Nt.prototype[i] = function (t, e, r) {
            return this.add(dt[i](t, s(e) ? e : (r = e) && {}, this), r);
          });
    },
    registerEase: function registerEase(t, e) {
      zt[t] = Bt(e);
    },
    parseEase: function parseEase(t, e) {
      return arguments.length ? Bt(t, e) : zt;
    },
    getById: function getById(t) {
      return I.getById(t);
    },
    exportRoot: function exportRoot(e, r) {
      void 0 === e && (e = {});
      var i,
        n,
        a = new Nt(e);
      for (
        a.smoothChildTiming = t(e.smoothChildTiming),
          I.remove(a),
          a._dp = 0,
          a._time = a._tTime = I._time,
          i = I._first;
        i;

      )
        (n = i._next),
          (!r &&
            !i._dur &&
            i instanceof Vt &&
            i.vars.onComplete === i._targets[0]) ||
            Ca(a, i, i._start - i._delay),
          (i = n);
      return Ca(I, a, 0), a;
    },
    utils: {
      wrap: function wrap(e, t, r) {
        var i = t - e;
        return Z(e)
          ? db(e, wrap(0, e.length), t)
          : Oa(r, function (t) {
              return ((i + ((t - e) % i)) % i) + e;
            });
      },
      wrapYoyo: function wrapYoyo(e, t, r) {
        var i = t - e,
          n = 2 * i;
        return Z(e)
          ? db(e, wrapYoyo(0, e.length - 1), t)
          : Oa(r, function (t) {
              return e + (i < (t = (n + ((t - e) % n)) % n || 0) ? n - t : t);
            });
      },
      distribute: Ya,
      random: _a,
      snap: $a,
      normalize: function normalize(t, e, r) {
        return Ot(t, e, 0, 1, r);
      },
      getUnit: Qa,
      clamp: function clamp(e, r, t) {
        return Oa(t, function (t) {
          return Tt(e, r, t);
        });
      },
      splitColor: rb,
      toArray: xt,
      selector: function selector(r) {
        return (
          (r = xt(r)[0] || O("Invalid scope") || {}),
          function (t) {
            var e = r.current || r.nativeElement || r;
            return xt(
              t,
              e.querySelectorAll
                ? e
                : e === r
                ? O("Invalid scope") || a.createElement("div")
                : r
            );
          }
        );
      },
      mapRange: Ot,
      pipe: function pipe() {
        for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)
          e[r] = arguments[r];
        return function (t) {
          return e.reduce(function (t, e) {
            return e(t);
          }, t);
        };
      },
      unitize: function unitize(e, r) {
        return function (t) {
          return e(parseFloat(t)) + (r || Qa(t));
        };
      },
      interpolate: function interpolate(e, r, t, i) {
        var n = isNaN(e + r)
          ? 0
          : function (t) {
              return (1 - t) * e + t * r;
            };
        if (!n) {
          var a,
            s,
            u,
            h,
            l,
            f = o(e),
            d = {};
          if ((!0 === t && (i = 1) && (t = null), f))
            (e = { p: e }), (r = { p: r });
          else if (Z(e) && !Z(r)) {
            for (u = [], h = e.length, l = h - 2, s = 1; s < h; s++)
              u.push(interpolate(e[s - 1], e[s]));
            h--,
              (n = function func(t) {
                t *= h;
                var e = Math.min(l, ~~t);
                return u[e](t - e);
              }),
              (t = r);
          } else i || (e = mt(Z(e) ? [] : {}, e));
          if (!u) {
            for (a in r) Yt.call(d, e, a, "get", r[a]);
            n = function func(t) {
              return ee(t, d) || (f ? e.p : e);
            };
          }
        }
        return Oa(t, n);
      },
      shuffle: Xa,
    },
    install: M,
    effects: dt,
    ticker: St,
    updateRoot: Nt.updateRoot,
    plugins: ft,
    globalTimeline: I,
    core: {
      PropTween: ae,
      globals: P,
      Tween: Vt,
      Timeline: Nt,
      Animation: qt,
      getCache: _,
      _removeLinkedListItem: ra,
      suppressOverwrites: function suppressOverwrites(t) {
        return (B = t);
      },
    },
  };
  ba("to,from,fromTo,delayedCall,set,killTweensOf", function (t) {
    return (se[t] = Vt[t]);
  }),
    St.add(Nt.updateRoot),
    (d = se.to({}, { duration: 0 }));
  function oc(t, e) {
    for (var r = t._pt; r && r.p !== e && r.op !== e && r.fp !== e; )
      r = r._next;
    return r;
  }
  function qc(t, n) {
    return {
      name: t,
      rawVars: 1,
      init: function init(t, i, e) {
        e._onInit = function (t) {
          var e, r;
          if (
            (o(i) &&
              ((e = {}),
              ba(i, function (t) {
                return (e[t] = 1);
              }),
              (i = e)),
            n)
          ) {
            for (r in ((e = {}), i)) e[r] = n(i[r]);
            i = e;
          }
          !(function _addModifiers(t, e) {
            var r,
              i,
              n,
              a = t._targets;
            for (r in e)
              for (i = a.length; i--; )
                (n = (n = t._ptLookup[i][r]) && n.d) &&
                  (n._pt && (n = oc(n, r)),
                  n && n.modifier && n.modifier(e[r], t, a[i], r));
          })(t, i);
        };
      },
    };
  }
  var oe =
    se.registerPlugin(
      {
        name: "attr",
        init: function init(t, e, r, i, n) {
          var a, s;
          for (a in e)
            (s = this.add(
              t,
              "setAttribute",
              (t.getAttribute(a) || 0) + "",
              e[a],
              i,
              n,
              0,
              0,
              a
            )) && (s.op = a),
              this._props.push(a);
        },
      },
      {
        name: "endArray",
        init: function init(t, e) {
          for (var r = e.length; r--; ) this.add(t, r, t[r] || 0, e[r]);
        },
      },
      qc("roundProps", Za),
      qc("modifiers"),
      qc("snap", $a)
    ) || se;
  (Vt.version = Nt.version = oe.version = "3.8.0"), (l = 1), u() && Dt();
  function _c(t, e) {
    return e.set(e.t, e.p, Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u, e);
  }
  function ad(t, e) {
    return e.set(
      e.t,
      e.p,
      1 === t ? e.e : Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u,
      e
    );
  }
  function bd(t, e) {
    return e.set(
      e.t,
      e.p,
      t ? Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u : e.b,
      e
    );
  }
  function cd(t, e) {
    var r = e.s + e.c * t;
    e.set(e.t, e.p, ~~(r + (r < 0 ? -0.5 : 0.5)) + e.u, e);
  }
  function dd(t, e) {
    return e.set(e.t, e.p, t ? e.e : e.b, e);
  }
  function ed(t, e) {
    return e.set(e.t, e.p, 1 !== t ? e.b : e.e, e);
  }
  function fd(t, e, r) {
    return (t.style[e] = r);
  }
  function gd(t, e, r) {
    return t.style.setProperty(e, r);
  }
  function hd(t, e, r) {
    return (t._gsap[e] = r);
  }
  function id(t, e, r) {
    return (t._gsap.scaleX = t._gsap.scaleY = r);
  }
  function jd(t, e, r, i, n) {
    var a = t._gsap;
    (a.scaleX = a.scaleY = r), a.renderTransform(n, a);
  }
  function kd(t, e, r, i, n) {
    var a = t._gsap;
    (a[e] = r), a.renderTransform(n, a);
  }
  function od(t, e) {
    var r = he.createElementNS
      ? he.createElementNS(
          (e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"),
          t
        )
      : he.createElement(t);
    return r.style ? r : he.createElement(t);
  }
  function pd(t, e, r) {
    var i = getComputedStyle(t);
    return (
      i[e] ||
      i.getPropertyValue(e.replace(Ie, "-$1").toLowerCase()) ||
      i.getPropertyValue(e) ||
      (!r && pd(t, Xe(e) || e, 1)) ||
      ""
    );
  }
  function sd() {
    (function _windowExists() {
      return "undefined" != typeof window;
    })() &&
      window.document &&
      ((ue = window),
      (he = ue.document),
      (le = he.documentElement),
      (de = od("div") || { style: {} }),
      od("div"),
      (Qe = Xe(Qe)),
      (Ye = Qe + "Origin"),
      (de.style.cssText =
        "border-width:0;line-height:0;position:absolute;padding:0"),
      (ce = !!Xe("perspective")),
      (fe = 1));
  }
  function td(t) {
    var e,
      r = od(
        "svg",
        (this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns")) ||
          "http://www.w3.org/2000/svg"
      ),
      i = this.parentNode,
      n = this.nextSibling,
      a = this.style.cssText;
    if (
      (le.appendChild(r),
      r.appendChild(this),
      (this.style.display = "block"),
      t)
    )
      try {
        (e = this.getBBox()),
          (this._gsapBBox = this.getBBox),
          (this.getBBox = td);
      } catch (t) {}
    else this._gsapBBox && (e = this._gsapBBox());
    return (
      i && (n ? i.insertBefore(this, n) : i.appendChild(this)),
      le.removeChild(r),
      (this.style.cssText = a),
      e
    );
  }
  function ud(t, e) {
    for (var r = e.length; r--; )
      if (t.hasAttribute(e[r])) return t.getAttribute(e[r]);
  }
  function vd(e) {
    var r;
    try {
      r = e.getBBox();
    } catch (t) {
      r = td.call(e, !0);
    }
    return (
      (r && (r.width || r.height)) || e.getBBox === td || (r = td.call(e, !0)),
      !r || r.width || r.x || r.y
        ? r
        : {
            x: +ud(e, ["x", "cx", "x1"]) || 0,
            y: +ud(e, ["y", "cy", "y1"]) || 0,
            width: 0,
            height: 0,
          }
    );
  }
  function wd(t) {
    return !(!t.getCTM || (t.parentNode && !t.ownerSVGElement) || !vd(t));
  }
  function xd(t, e) {
    if (e) {
      var r = t.style;
      e in Ee && e !== Ye && (e = Qe),
        r.removeProperty
          ? (("ms" !== e.substr(0, 2) && "webkit" !== e.substr(0, 6)) ||
              (e = "-" + e),
            r.removeProperty(e.replace(Ie, "-$1").toLowerCase()))
          : r.removeAttribute(e);
    }
  }
  function yd(t, e, r, i, n, a) {
    var s = new ae(t._pt, e, r, 0, 1, a ? ed : dd);
    return ((t._pt = s).b = i), (s.e = n), t._props.push(r), s;
  }
  function Ad(t, e, r, i) {
    var n,
      a,
      s,
      o,
      u = parseFloat(r) || 0,
      h = (r + "").trim().substr((u + "").length) || "px",
      l = de.style,
      f = Le.test(e),
      d = "svg" === t.tagName.toLowerCase(),
      p = (d ? "client" : "offset") + (f ? "Width" : "Height"),
      c = "px" === i,
      m = "%" === i;
    return i === h || !u || Ue[i] || Ue[h]
      ? u
      : ("px" === h || c || (u = Ad(t, e, r, "px")),
        (o = t.getCTM && wd(t)),
        (!m && "%" !== h) || (!Ee[e] && !~e.indexOf("adius"))
          ? ((l[f ? "width" : "height"] = 100 + (c ? h : i)),
            (a =
              ~e.indexOf("adius") || ("em" === i && t.appendChild && !d)
                ? t
                : t.parentNode),
            o && (a = (t.ownerSVGElement || {}).parentNode),
            (a && a !== he && a.appendChild) || (a = he.body),
            (s = a._gsap) && m && s.width && f && s.time === St.time
              ? ca((u / s.width) * 100)
              : ((!m && "%" !== h) || (l.position = pd(t, "position")),
                a === t && (l.position = "static"),
                a.appendChild(de),
                (n = de[p]),
                a.removeChild(de),
                (l.position = "absolute"),
                f && m && (((s = _(a)).time = St.time), (s.width = a[p])),
                ca(c ? (n * u) / 100 : n && u ? (100 / n) * u : 0)))
          : ((n = o ? t.getBBox()[f ? "width" : "height"] : t[p]),
            ca(m ? (u / n) * 100 : (u / 100) * n)));
  }
  function Bd(t, e, r, i) {
    var n;
    return (
      fe || sd(),
      e in Ne &&
        "transform" !== e &&
        ~(e = Ne[e]).indexOf(",") &&
        (e = e.split(",")[0]),
      Ee[e] && "transform" !== e
        ? ((n = He(t, i)),
          (n =
            "transformOrigin" !== e
              ? n[e]
              : n.svg
              ? n.origin
              : Ke(pd(t, Ye)) + " " + n.zOrigin + "px"))
        : ((n = t.style[e]) &&
            "auto" !== n &&
            !i &&
            !~(n + "").indexOf("calc(")) ||
          (n =
            (Ve[e] && Ve[e](t, e, r)) ||
            pd(t, e) ||
            aa(t, e) ||
            ("opacity" === e ? 1 : 0)),
      r && !~(n + "").trim().indexOf(" ") ? Ad(t, e, n, r) + r : n
    );
  }
  function Cd(t, e, r, i) {
    if (!r || "none" === r) {
      var n = Xe(e, t, 1),
        a = n && pd(t, n, 1);
      a && a !== r
        ? ((e = n), (r = a))
        : "borderColor" === e && (r = pd(t, "borderTopColor"));
    }
    var s,
      o,
      u,
      h,
      l,
      f,
      d,
      p,
      c,
      _,
      m,
      g,
      v = new ae(this._pt, t.style, e, 0, 1, te),
      y = 0,
      b = 0;
    if (
      ((v.b = r),
      (v.e = i),
      (r += ""),
      "auto" === (i += "") &&
        ((t.style[e] = i), (i = pd(t, e) || i), (t.style[e] = r)),
      wb((s = [r, i])),
      (i = s[1]),
      (u = (r = s[0]).match(rt) || []),
      (i.match(rt) || []).length)
    ) {
      for (; (o = rt.exec(i)); )
        (d = o[0]),
          (c = i.substring(y, o.index)),
          l
            ? (l = (l + 1) % 5)
            : ("rgba(" !== c.substr(-5) && "hsla(" !== c.substr(-5)) || (l = 1),
          d !== (f = u[b++] || "") &&
            ((h = parseFloat(f) || 0),
            (m = f.substr((h + "").length)),
            (g = "=" === d.charAt(1) ? +(d.charAt(0) + "1") : 0) &&
              (d = d.substr(2)),
            (p = parseFloat(d)),
            (_ = d.substr((p + "").length)),
            (y = rt.lastIndex - _.length),
            _ ||
              ((_ = _ || Y.units[e] || m),
              y === i.length && ((i += _), (v.e += _))),
            m !== _ && (h = Ad(t, e, f, _) || 0),
            (v._pt = {
              _next: v._pt,
              p: c || 1 === b ? c : ",",
              s: h,
              c: g ? g * p : p - h,
              m: (l && l < 4) || "zIndex" === e ? Math.round : 0,
            }));
      v.c = y < i.length ? i.substring(y, i.length) : "";
    } else v.r = "display" === e && "none" === i ? ed : dd;
    return nt.test(i) && (v.e = 0), (this._pt = v);
  }
  function Ed(t) {
    var e = t.split(" "),
      r = e[0],
      i = e[1] || "50%";
    return (
      ("top" !== r && "bottom" !== r && "left" !== i && "right" !== i) ||
        ((t = r), (r = i), (i = t)),
      (e[0] = Je[r] || r),
      (e[1] = Je[i] || i),
      e.join(" ")
    );
  }
  function Fd(t, e) {
    if (e.tween && e.tween._time === e.tween._dur) {
      var r,
        i,
        n,
        a = e.t,
        s = a.style,
        o = e.u,
        u = a._gsap;
      if ("all" === o || !0 === o) (s.cssText = ""), (i = 1);
      else
        for (n = (o = o.split(",")).length; -1 < --n; )
          (r = o[n]),
            Ee[r] && ((i = 1), (r = "transformOrigin" === r ? Ye : Qe)),
            xd(a, r);
      i &&
        (xd(a, Qe),
        u &&
          (u.svg && a.removeAttribute("transform"), He(a, 1), (u.uncache = 1)));
    }
  }
  function Jd(t) {
    return "matrix(1, 0, 0, 1, 0, 0)" === t || "none" === t || !t;
  }
  function Kd(t) {
    var e = pd(t, Qe);
    return Jd(e) ? We : e.substr(7).match(et).map(ca);
  }
  function Ld(t, e) {
    var r,
      i,
      n,
      a,
      s = t._gsap || _(t),
      o = t.style,
      u = Kd(t);
    return s.svg && t.getAttribute("transform")
      ? "1,0,0,1,0,0" ===
        (u = [
          (n = t.transform.baseVal.consolidate().matrix).a,
          n.b,
          n.c,
          n.d,
          n.e,
          n.f,
        ]).join(",")
        ? We
        : u
      : (u !== We ||
          t.offsetParent ||
          t === le ||
          s.svg ||
          ((n = o.display),
          (o.display = "block"),
          ((r = t.parentNode) && t.offsetParent) ||
            ((a = 1), (i = t.nextSibling), le.appendChild(t)),
          (u = Kd(t)),
          n ? (o.display = n) : xd(t, "display"),
          a &&
            (i
              ? r.insertBefore(t, i)
              : r
              ? r.appendChild(t)
              : le.removeChild(t))),
        e && 6 < u.length ? [u[0], u[1], u[4], u[5], u[12], u[13]] : u);
  }
  function Md(t, e, r, i, n, a) {
    var s,
      o,
      u,
      h = t._gsap,
      l = n || Ld(t, !0),
      f = h.xOrigin || 0,
      d = h.yOrigin || 0,
      p = h.xOffset || 0,
      c = h.yOffset || 0,
      _ = l[0],
      m = l[1],
      g = l[2],
      v = l[3],
      y = l[4],
      b = l[5],
      T = e.split(" "),
      w = parseFloat(T[0]) || 0,
      x = parseFloat(T[1]) || 0;
    r
      ? l !== We &&
        (o = _ * v - m * g) &&
        ((u = w * (-m / o) + x * (_ / o) - (_ * b - m * y) / o),
        (w = w * (v / o) + x * (-g / o) + (g * b - v * y) / o),
        (x = u))
      : ((w = (s = vd(t)).x + (~T[0].indexOf("%") ? (w / 100) * s.width : w)),
        (x = s.y + (~(T[1] || T[0]).indexOf("%") ? (x / 100) * s.height : x))),
      i || (!1 !== i && h.smooth)
        ? ((y = w - f),
          (b = x - d),
          (h.xOffset = p + (y * _ + b * g) - y),
          (h.yOffset = c + (y * m + b * v) - b))
        : (h.xOffset = h.yOffset = 0),
      (h.xOrigin = w),
      (h.yOrigin = x),
      (h.smooth = !!i),
      (h.origin = e),
      (h.originIsAbsolute = !!r),
      (t.style[Ye] = "0px 0px"),
      a &&
        (yd(a, h, "xOrigin", f, w),
        yd(a, h, "yOrigin", d, x),
        yd(a, h, "xOffset", p, h.xOffset),
        yd(a, h, "yOffset", c, h.yOffset)),
      t.setAttribute("data-svg-origin", w + " " + x);
  }
  function Pd(t, e, r) {
    var i = Qa(e);
    return ca(parseFloat(e) + parseFloat(Ad(t, "x", r + "px", i))) + i;
  }
  function Wd(t, e, r, i, n, a) {
    var s,
      u,
      h = 360,
      l = o(n),
      f = parseFloat(n) * (l && ~n.indexOf("rad") ? Fe : 1),
      d = a ? f * a : f - i,
      p = i + d + "deg";
    return (
      l &&
        ("short" === (s = n.split("_")[1]) &&
          (d %= h) !== d % 180 &&
          (d += d < 0 ? h : -h),
        "cw" === s && d < 0
          ? (d = ((d + 36e9) % h) - ~~(d / h) * h)
          : "ccw" === s && 0 < d && (d = ((d - 36e9) % h) - ~~(d / h) * h)),
      (t._pt = u = new ae(t._pt, e, r, i, d, ad)),
      (u.e = p),
      (u.u = "deg"),
      t._props.push(r),
      u
    );
  }
  function Xd(t, e) {
    for (var r in e) t[r] = e[r];
    return t;
  }
  function Yd(t, e, r) {
    var i,
      n,
      a,
      s,
      o,
      u,
      h,
      l = Xd({}, r._gsap),
      f = r.style;
    for (n in (l.svg
      ? ((a = r.getAttribute("transform")),
        r.setAttribute("transform", ""),
        (f[Qe] = e),
        (i = He(r, 1)),
        xd(r, Qe),
        r.setAttribute("transform", a))
      : ((a = getComputedStyle(r)[Qe]),
        (f[Qe] = e),
        (i = He(r, 1)),
        (f[Qe] = a)),
    Ee))
      (a = l[n]) !== (s = i[n]) &&
        "perspective,force3D,transformOrigin,svgOrigin".indexOf(n) < 0 &&
        ((o = Qa(a) !== (h = Qa(s)) ? Ad(r, n, a, h) : parseFloat(a)),
        (u = parseFloat(s)),
        (t._pt = new ae(t._pt, i, n, o, u - o, _c)),
        (t._pt.u = h || 0),
        t._props.push(n));
    Xd(i, l);
  }
  var ue,
    he,
    le,
    fe,
    de,
    pe,
    ce,
    _e = zt.Power0,
    me = zt.Power1,
    ge = zt.Power2,
    ve = zt.Power3,
    ye = zt.Power4,
    be = zt.Linear,
    Te = zt.Quad,
    we = zt.Cubic,
    xe = zt.Quart,
    Oe = zt.Quint,
    Me = zt.Strong,
    ke = zt.Elastic,
    Ae = zt.Back,
    Pe = zt.SteppedEase,
    Ce = zt.Bounce,
    Se = zt.Sine,
    De = zt.Expo,
    ze = zt.Circ,
    Ee = {},
    Fe = 180 / Math.PI,
    Re = Math.PI / 180,
    Be = Math.atan2,
    Ie = /([A-Z])/g,
    Le = /(?:left|right|width|margin|padding|x)/i,
    qe = /[\s,\(]\S/,
    Ne = {
      autoAlpha: "opacity,visibility",
      scale: "scaleX,scaleY",
      alpha: "opacity",
    },
    Qe = "transform",
    Ye = Qe + "Origin",
    je = "O,Moz,ms,Ms,Webkit".split(","),
    Xe = function _checkPropPrefix(t, e, r) {
      var i = (e || de).style,
        n = 5;
      if (t in i && !r) return t;
      for (
        t = t.charAt(0).toUpperCase() + t.substr(1);
        n-- && !(je[n] + t in i);

      );
      return n < 0 ? null : (3 === n ? "ms" : 0 <= n ? je[n] : "") + t;
    },
    Ue = { deg: 1, rad: 1, turn: 1 },
    Je = {
      top: "0%",
      bottom: "100%",
      left: "0%",
      right: "100%",
      center: "50%",
    },
    Ve = {
      clearProps: function clearProps(t, e, r, i, n) {
        if ("isFromStart" !== n.data) {
          var a = (t._pt = new ae(t._pt, e, r, 0, 0, Fd));
          return (a.u = i), (a.pr = -10), (a.tween = n), t._props.push(r), 1;
        }
      },
    },
    We = [1, 0, 0, 1, 0, 0],
    Ge = {},
    He = function _parseTransform(t, e) {
      var r = t._gsap || new Lt(t);
      if ("x" in r && !e && !r.uncache) return r;
      var i,
        n,
        a,
        s,
        o,
        u,
        h,
        l,
        f,
        d,
        p,
        c,
        _,
        m,
        g,
        v,
        y,
        b,
        T,
        w,
        x,
        O,
        M,
        k,
        A,
        P,
        C,
        S,
        D,
        z,
        E,
        F,
        R = t.style,
        B = r.scaleX < 0,
        I = "deg",
        L = pd(t, Ye) || "0";
      return (
        (i = n = a = u = h = l = f = d = p = 0),
        (s = o = 1),
        (r.svg = !(!t.getCTM || !wd(t))),
        (m = Ld(t, r.svg)),
        r.svg &&
          ((k =
            (!r.uncache || "0px 0px" === L) &&
            !e &&
            t.getAttribute("data-svg-origin")),
          Md(t, k || L, !!k || r.originIsAbsolute, !1 !== r.smooth, m)),
        (c = r.xOrigin || 0),
        (_ = r.yOrigin || 0),
        m !== We &&
          ((b = m[0]),
          (T = m[1]),
          (w = m[2]),
          (x = m[3]),
          (i = O = m[4]),
          (n = M = m[5]),
          6 === m.length
            ? ((s = Math.sqrt(b * b + T * T)),
              (o = Math.sqrt(x * x + w * w)),
              (u = b || T ? Be(T, b) * Fe : 0),
              (f = w || x ? Be(w, x) * Fe + u : 0) &&
                (o *= Math.abs(Math.cos(f * Re))),
              r.svg && ((i -= c - (c * b + _ * w)), (n -= _ - (c * T + _ * x))))
            : ((F = m[6]),
              (z = m[7]),
              (C = m[8]),
              (S = m[9]),
              (D = m[10]),
              (E = m[11]),
              (i = m[12]),
              (n = m[13]),
              (a = m[14]),
              (h = (g = Be(F, D)) * Fe),
              g &&
                ((k = O * (v = Math.cos(-g)) + C * (y = Math.sin(-g))),
                (A = M * v + S * y),
                (P = F * v + D * y),
                (C = O * -y + C * v),
                (S = M * -y + S * v),
                (D = F * -y + D * v),
                (E = z * -y + E * v),
                (O = k),
                (M = A),
                (F = P)),
              (l = (g = Be(-w, D)) * Fe),
              g &&
                ((v = Math.cos(-g)),
                (E = x * (y = Math.sin(-g)) + E * v),
                (b = k = b * v - C * y),
                (T = A = T * v - S * y),
                (w = P = w * v - D * y)),
              (u = (g = Be(T, b)) * Fe),
              g &&
                ((k = b * (v = Math.cos(g)) + T * (y = Math.sin(g))),
                (A = O * v + M * y),
                (T = T * v - b * y),
                (M = M * v - O * y),
                (b = k),
                (O = A)),
              h &&
                359.9 < Math.abs(h) + Math.abs(u) &&
                ((h = u = 0), (l = 180 - l)),
              (s = ca(Math.sqrt(b * b + T * T + w * w))),
              (o = ca(Math.sqrt(M * M + F * F))),
              (g = Be(O, M)),
              (f = 2e-4 < Math.abs(g) ? g * Fe : 0),
              (p = E ? 1 / (E < 0 ? -E : E) : 0)),
          r.svg &&
            ((k = t.getAttribute("transform")),
            (r.forceCSS = t.setAttribute("transform", "") || !Jd(pd(t, Qe))),
            k && t.setAttribute("transform", k))),
        90 < Math.abs(f) &&
          Math.abs(f) < 270 &&
          (B
            ? ((s *= -1),
              (f += u <= 0 ? 180 : -180),
              (u += u <= 0 ? 180 : -180))
            : ((o *= -1), (f += f <= 0 ? 180 : -180))),
        (r.x =
          i -
          ((r.xPercent =
            i &&
            (r.xPercent ||
              (Math.round(t.offsetWidth / 2) === Math.round(-i) ? -50 : 0)))
            ? (t.offsetWidth * r.xPercent) / 100
            : 0) +
          "px"),
        (r.y =
          n -
          ((r.yPercent =
            n &&
            (r.yPercent ||
              (Math.round(t.offsetHeight / 2) === Math.round(-n) ? -50 : 0)))
            ? (t.offsetHeight * r.yPercent) / 100
            : 0) +
          "px"),
        (r.z = a + "px"),
        (r.scaleX = ca(s)),
        (r.scaleY = ca(o)),
        (r.rotation = ca(u) + I),
        (r.rotationX = ca(h) + I),
        (r.rotationY = ca(l) + I),
        (r.skewX = f + I),
        (r.skewY = d + I),
        (r.transformPerspective = p + "px"),
        (r.zOrigin = parseFloat(L.split(" ")[2]) || 0) && (R[Ye] = Ke(L)),
        (r.xOffset = r.yOffset = 0),
        (r.force3D = Y.force3D),
        (r.renderTransform = r.svg ? ir : ce ? rr : Ze),
        (r.uncache = 0),
        r
      );
    },
    Ke = function _firstTwoOnly(t) {
      return (t = t.split(" "))[0] + " " + t[1];
    },
    Ze = function _renderNon3DTransforms(t, e) {
      (e.z = "0px"),
        (e.rotationY = e.rotationX = "0deg"),
        (e.force3D = 0),
        rr(t, e);
    },
    $e = "0deg",
    tr = "0px",
    er = ") ",
    rr = function _renderCSSTransforms(t, e) {
      var r = e || this,
        i = r.xPercent,
        n = r.yPercent,
        a = r.x,
        s = r.y,
        o = r.z,
        u = r.rotation,
        h = r.rotationY,
        l = r.rotationX,
        f = r.skewX,
        d = r.skewY,
        p = r.scaleX,
        c = r.scaleY,
        _ = r.transformPerspective,
        m = r.force3D,
        g = r.target,
        v = r.zOrigin,
        y = "",
        b = ("auto" === m && t && 1 !== t) || !0 === m;
      if (v && (l !== $e || h !== $e)) {
        var T,
          w = parseFloat(h) * Re,
          x = Math.sin(w),
          O = Math.cos(w);
        (w = parseFloat(l) * Re),
          (T = Math.cos(w)),
          (a = Pd(g, a, x * T * -v)),
          (s = Pd(g, s, -Math.sin(w) * -v)),
          (o = Pd(g, o, O * T * -v + v));
      }
      _ !== tr && (y += "perspective(" + _ + er),
        (i || n) && (y += "translate(" + i + "%, " + n + "%) "),
        (!b && a === tr && s === tr && o === tr) ||
          (y +=
            o !== tr || b
              ? "translate3d(" + a + ", " + s + ", " + o + ") "
              : "translate(" + a + ", " + s + er),
        u !== $e && (y += "rotate(" + u + er),
        h !== $e && (y += "rotateY(" + h + er),
        l !== $e && (y += "rotateX(" + l + er),
        (f === $e && d === $e) || (y += "skew(" + f + ", " + d + er),
        (1 === p && 1 === c) || (y += "scale(" + p + ", " + c + er),
        (g.style[Qe] = y || "translate(0, 0)");
    },
    ir = function _renderSVGTransforms(t, e) {
      var r,
        i,
        n,
        a,
        s,
        o = e || this,
        u = o.xPercent,
        h = o.yPercent,
        l = o.x,
        f = o.y,
        d = o.rotation,
        p = o.skewX,
        c = o.skewY,
        _ = o.scaleX,
        m = o.scaleY,
        g = o.target,
        v = o.xOrigin,
        y = o.yOrigin,
        b = o.xOffset,
        T = o.yOffset,
        w = o.forceCSS,
        x = parseFloat(l),
        O = parseFloat(f);
      (d = parseFloat(d)),
        (p = parseFloat(p)),
        (c = parseFloat(c)) && ((p += c = parseFloat(c)), (d += c)),
        d || p
          ? ((d *= Re),
            (p *= Re),
            (r = Math.cos(d) * _),
            (i = Math.sin(d) * _),
            (n = Math.sin(d - p) * -m),
            (a = Math.cos(d - p) * m),
            p &&
              ((c *= Re),
              (s = Math.tan(p - c)),
              (n *= s = Math.sqrt(1 + s * s)),
              (a *= s),
              c &&
                ((s = Math.tan(c)), (r *= s = Math.sqrt(1 + s * s)), (i *= s))),
            (r = ca(r)),
            (i = ca(i)),
            (n = ca(n)),
            (a = ca(a)))
          : ((r = _), (a = m), (i = n = 0)),
        ((x && !~(l + "").indexOf("px")) || (O && !~(f + "").indexOf("px"))) &&
          ((x = Ad(g, "x", l, "px")), (O = Ad(g, "y", f, "px"))),
        (v || y || b || T) &&
          ((x = ca(x + v - (v * r + y * n) + b)),
          (O = ca(O + y - (v * i + y * a) + T))),
        (u || h) &&
          ((s = g.getBBox()),
          (x = ca(x + (u / 100) * s.width)),
          (O = ca(O + (h / 100) * s.height))),
        (s =
          "matrix(" +
          r +
          "," +
          i +
          "," +
          n +
          "," +
          a +
          "," +
          x +
          "," +
          O +
          ")"),
        g.setAttribute("transform", s),
        w && (g.style[Qe] = s);
    };
  ba("padding,margin,Width,Radius", function (e, r) {
    var t = "Right",
      i = "Bottom",
      n = "Left",
      o = (r < 3 ? ["Top", t, i, n] : ["Top" + n, "Top" + t, i + t, i + n]).map(
        function (t) {
          return r < 2 ? e + t : "border" + t + e;
        }
      );
    Ve[1 < r ? "border" + e : e] = function (e, t, r, i, n) {
      var a, s;
      if (arguments.length < 4)
        return (
          (a = o.map(function (t) {
            return Bd(e, t, r);
          })),
          5 === (s = a.join(" ")).split(a[0]).length ? a[0] : s
        );
      (a = (i + "").split(" ")),
        (s = {}),
        o.forEach(function (t, e) {
          return (s[t] = a[e] = a[e] || a[((e - 1) / 2) | 0]);
        }),
        e.init(t, s, n);
    };
  });
  var nr,
    ar,
    sr,
    or = {
      name: "css",
      register: sd,
      targetTest: function targetTest(t) {
        return t.style && t.nodeType;
      },
      init: function init(t, e, r, i, n) {
        var a,
          s,
          u,
          h,
          l,
          f,
          d,
          p,
          c,
          _,
          m,
          g,
          v,
          y,
          b,
          T = this._props,
          w = t.style,
          x = r.vars.startAt;
        for (d in (fe || sd(), e))
          if (
            "autoRound" !== d &&
            ((s = e[d]), !ft[d] || !Tb(d, e, r, i, t, n))
          )
            if (
              ((l = typeof s),
              (f = Ve[d]),
              "function" === l && (l = typeof (s = s.call(r, i, t, n))),
              "string" === l && ~s.indexOf("random(") && (s = gb(s)),
              f)
            )
              f(this, t, d, s, r) && (b = 1);
            else if ("--" === d.substr(0, 2))
              (a = (getComputedStyle(t).getPropertyValue(d) + "").trim()),
                (s += ""),
                (Pt.lastIndex = 0),
                Pt.test(a) || ((p = Qa(a)), (c = Qa(s))),
                c ? p !== c && (a = Ad(t, d, a, c) + c) : p && (s += p),
                this.add(w, "setProperty", a, s, i, n, 0, 0, d),
                T.push(d);
            else if ("undefined" !== l) {
              if (
                (x && d in x
                  ? ((a =
                      "function" == typeof x[d] ? x[d].call(r, i, t, n) : x[d]),
                    d in Y.units && !Qa(a) && (a += Y.units[d]),
                    o(a) && ~a.indexOf("random(") && (a = gb(a)),
                    "=" === (a + "").charAt(1) && (a = Bd(t, d)))
                  : (a = Bd(t, d)),
                (h = parseFloat(a)),
                (_ =
                  "string" === l && "=" === s.charAt(1)
                    ? +(s.charAt(0) + "1")
                    : 0) && (s = s.substr(2)),
                (u = parseFloat(s)),
                d in Ne &&
                  ("autoAlpha" === d &&
                    (1 === h &&
                      "hidden" === Bd(t, "visibility") &&
                      u &&
                      (h = 0),
                    yd(
                      this,
                      w,
                      "visibility",
                      h ? "inherit" : "hidden",
                      u ? "inherit" : "hidden",
                      !u
                    )),
                  "scale" !== d &&
                    "transform" !== d &&
                    ~(d = Ne[d]).indexOf(",") &&
                    (d = d.split(",")[0])),
                (m = d in Ee))
              )
                if (
                  (g ||
                    (((v = t._gsap).renderTransform && !e.parseTransform) ||
                      He(t, e.parseTransform),
                    (y = !1 !== e.smoothOrigin && v.smooth),
                    ((g = this._pt =
                      new ae(
                        this._pt,
                        w,
                        Qe,
                        0,
                        1,
                        v.renderTransform,
                        v,
                        0,
                        -1
                      )).dep = 1)),
                  "scale" === d)
                )
                  (this._pt = new ae(
                    this._pt,
                    v,
                    "scaleY",
                    v.scaleY,
                    (_ ? _ * u : u - v.scaleY) || 0
                  )),
                    T.push("scaleY", d),
                    (d += "X");
                else {
                  if ("transformOrigin" === d) {
                    (s = Ed(s)),
                      v.svg
                        ? Md(t, s, 0, y, 0, this)
                        : ((c = parseFloat(s.split(" ")[2]) || 0) !==
                            v.zOrigin && yd(this, v, "zOrigin", v.zOrigin, c),
                          yd(this, w, d, Ke(a), Ke(s)));
                    continue;
                  }
                  if ("svgOrigin" === d) {
                    Md(t, s, 1, y, 0, this);
                    continue;
                  }
                  if (d in Ge) {
                    Wd(this, v, d, h, s, _);
                    continue;
                  }
                  if ("smoothOrigin" === d) {
                    yd(this, v, "smooth", v.smooth, s);
                    continue;
                  }
                  if ("force3D" === d) {
                    v[d] = s;
                    continue;
                  }
                  if ("transform" === d) {
                    Yd(this, s, t);
                    continue;
                  }
                }
              else d in w || (d = Xe(d) || d);
              if (
                m ||
                ((u || 0 === u) && (h || 0 === h) && !qe.test(s) && d in w)
              )
                (u = u || 0),
                  (p = (a + "").substr((h + "").length)) !==
                    (c = Qa(s) || (d in Y.units ? Y.units[d] : p)) &&
                    (h = Ad(t, d, a, c)),
                  (this._pt = new ae(
                    this._pt,
                    m ? v : w,
                    d,
                    h,
                    _ ? _ * u : u - h,
                    m || ("px" !== c && "zIndex" !== d) || !1 === e.autoRound
                      ? _c
                      : cd
                  )),
                  (this._pt.u = c || 0),
                  p !== c && "%" !== c && ((this._pt.b = a), (this._pt.r = bd));
              else if (d in w) Cd.call(this, t, d, a, s);
              else {
                if (!(d in t)) {
                  N(d, s);
                  continue;
                }
                this.add(t, d, a || t[d], s, i, n);
              }
              T.push(d);
            }
        b && ne(this);
      },
      get: Bd,
      aliases: Ne,
      getSetter: function getSetter(t, e, i) {
        var n = Ne[e];
        return (
          n && n.indexOf(",") < 0 && (e = n),
          e in Ee && e !== Ye && (t._gsap.x || Bd(t, "x"))
            ? i && pe === i
              ? "scale" === e
                ? id
                : hd
              : (pe = i || {}) && ("scale" === e ? jd : kd)
            : t.style && !r(t.style[e])
            ? fd
            : ~e.indexOf("-")
            ? gd
            : Kt(t, e)
        );
      },
      core: { _removeProperty: xd, _getMatrix: Ld },
    };
  (oe.utils.checkPrefix = Xe),
    (sr = ba(
      (nr = "x,y,z,scale,scaleX,scaleY,xPercent,yPercent") +
        "," +
        (ar = "rotation,rotationX,rotationY,skewX,skewY") +
        ",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective",
      function (t) {
        Ee[t] = 1;
      }
    )),
    ba(ar, function (t) {
      (Y.units[t] = "deg"), (Ge[t] = 1);
    }),
    (Ne[sr[13]] = nr + "," + ar),
    ba(
      "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY",
      function (t) {
        var e = t.split(":");
        Ne[e[1]] = sr[e[0]];
      }
    ),
    ba(
      "x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",
      function (t) {
        Y.units[t] = "px";
      }
    ),
    oe.registerPlugin(or);
  var ur = oe.registerPlugin(or) || oe,
    hr = ur.core.Tween;
  (e.Back = Ae),
    (e.Bounce = Ce),
    (e.CSSPlugin = or),
    (e.Circ = ze),
    (e.Cubic = we),
    (e.Elastic = ke),
    (e.Expo = De),
    (e.Linear = be),
    (e.Power0 = _e),
    (e.Power1 = me),
    (e.Power2 = ge),
    (e.Power3 = ve),
    (e.Power4 = ye),
    (e.Quad = Te),
    (e.Quart = xe),
    (e.Quint = Oe),
    (e.Sine = Se),
    (e.SteppedEase = Pe),
    (e.Strong = Me),
    (e.TimelineLite = Nt),
    (e.TimelineMax = Nt),
    (e.TweenLite = Vt),
    (e.TweenMax = hr),
    (e.default = ur),
    (e.gsap = ur);
  if (typeof window === "undefined" || window !== e) {
    Object.defineProperty(e, "__esModule", { value: !0 });
  } else {
    delete e.default;
  }
});

/**!
 * easyPieChart
 * Lightweight plugin to render simple, animated and retina optimized pie charts
 *
 * @license Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 * @author Robert Fleischmann <rendro87@gmail.com> (http://robert-fleischmann.de)
 * @version 2.1.1
 **/
(function (e, t) {
  if (typeof exports === "object") {
    module.exports = t(require("jquery"));
  } else if (typeof define === "function" && define.amd) {
    define("EasyPieChart", ["jquery"], t);
  } else {
    t(e.jQuery);
  }
})(this, function (e) {
  var t = function (e, t) {
    var n;
    var r = document.createElement("canvas");
    if (typeof G_vmlCanvasManager !== "undefined") {
      G_vmlCanvasManager.initElement(r);
    }
    var i = r.getContext("2d");
    r.width = r.height = t.size;
    e.appendChild(r);
    var s = 1;
    if (window.devicePixelRatio > 1) {
      s = window.devicePixelRatio;
      r.style.width = r.style.height = [t.size, "px"].join("");
      r.width = r.height = t.size * s;
      i.scale(s, s);
    }
    i.translate(t.size / 2, t.size / 2);
    i.rotate((-1 / 2 + t.rotate / 180) * Math.PI);
    var o = (t.size - t.lineWidth) / 2;
    if (t.scaleColor && t.scaleLength) {
      o -= t.scaleLength + 2;
    }
    Date.now =
      Date.now ||
      function () {
        return +new Date();
      };
    var u = function (e, t, n) {
      n = Math.min(Math.max(0, n || 1), 1);
      i.beginPath();
      i.arc(0, 0, o, 0, Math.PI * 2 * n, false);
      i.strokeStyle = e;
      i.lineWidth = t;
      i.stroke();
    };
    var a = function () {
      var e;
      var n;
      var r = 24;
      i.lineWidth = 1;
      i.fillStyle = t.scaleColor;
      i.save();
      for (var r = 24; r > 0; --r) {
        if (r % 6 === 0) {
          n = t.scaleLength;
          e = 0;
        } else {
          n = t.scaleLength * 0.6;
          e = t.scaleLength - n;
        }
        i.fillRect(-t.size / 2 + e, 0, n, 1);
        i.rotate(Math.PI / 12);
      }
      i.restore();
    };
    var f = (function () {
      return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (e) {
          window.setTimeout(e, 1e3 / 60);
        }
      );
    })();
    var l = function () {
      t.scaleColor && a();
      t.trackColor && u(t.trackColor, t.lineWidth);
    };
    this.clear = function () {
      i.clearRect(t.size / -2, t.size / -2, t.size, t.size);
    };
    this.draw = function (e) {
      if (!!t.scaleColor || !!t.trackColor) {
        if (i.getImageData && i.putImageData) {
          if (!n) {
            l();
            n = i.getImageData(0, 0, t.size * s, t.size * s);
          } else {
            i.putImageData(n, 0, 0);
          }
        } else {
          this.clear();
          l();
        }
      } else {
        this.clear();
      }
      i.lineCap = t.lineCap;
      var r;
      if (typeof t.barColor === "function") {
        r = t.barColor(e);
      } else {
        r = t.barColor;
      }
      if (e > 0) {
        u(r, t.lineWidth, e / 100);
      }
    }.bind(this);
    this.animate = function (e, n) {
      var r = Date.now();
      t.onStart(e, n);
      var i = function () {
        var s = Math.min(Date.now() - r, t.animate);
        var o = t.easing(this, s, e, n - e, t.animate);
        this.draw(o);
        t.onStep(e, n, o);
        if (s >= t.animate) {
          t.onStop(e, n);
        } else {
          f(i);
        }
      }.bind(this);
      f(i);
    }.bind(this);
  };
  var n = function (e, n) {
    var r = {
      barColor: "#F54A4B",
      trackColor: "#ccc",
      scaleColor: "#ccc",
      scaleLength: 0,
      lineCap: "round",
      lineWidth: 10,
      size: 152,
      rotate: 0,
      animate: 4e3,
      easing: function (e, t, n, r, i) {
        t = t / (i / 2);
        if (t < 1) {
          return (r / 2) * t * t + n;
        }
        return (-r / 2) * (--t * (t - 2) - 1) + n;
      },
      onStart: function (e, t) {
        return;
      },
      onStep: function (e, t, n) {
        return;
      },
      onStop: function (e, t) {
        return;
      },
    };
    if (typeof t !== "undefined") {
      r.renderer = t;
    } else if (typeof SVGRenderer !== "undefined") {
      r.renderer = SVGRenderer;
    } else {
      throw new Error("Please load either the SVG- or the CanvasRenderer");
    }
    var i = {};
    var s = 0;
    var o = function () {
      this.el = e;
      this.options = i;
      for (var t in r) {
        if (r.hasOwnProperty(t)) {
          i[t] = n && typeof n[t] !== "undefined" ? n[t] : r[t];
          if (typeof i[t] === "function") {
            i[t] = i[t].bind(this);
          }
        }
      }
      if (
        typeof i.easing === "string" &&
        typeof jQuery !== "undefined" &&
        jQuery.isFunction(jQuery.easing[i.easing])
      ) {
        i.easing = jQuery.easing[i.easing];
      } else {
        i.easing = r.easing;
      }
      this.renderer = new i.renderer(e, i);
      this.renderer.draw(s);
      if (e.dataset && e.dataset.percent) {
        this.update(parseFloat(e.dataset.percent));
      } else if (e.getAttribute && e.getAttribute("data-percent")) {
        this.update(parseFloat(e.getAttribute("data-percent")));
      }
    }.bind(this);
    this.update = function (e) {
      e = parseFloat(e);
      if (i.animate) {
        this.renderer.animate(s, e);
      } else {
        this.renderer.draw(e);
      }
      s = e;
      return this;
    }.bind(this);
    o();
  };
  e.fn.easyPieChart = function (t) {
    return this.each(function () {
      if (!e.data(this, "easyPieChart")) {
        e.data(this, "easyPieChart", new n(this, t));
      }
    });
  };
});

/**
 * bxSlider v4.2.1d
 * Copyright 2013-2017 Steven Wanderski
 * Written while drinking Belgian ales and listening to jazz
 * Licensed under MIT (http://opensource.org/licenses/MIT)
 */
!(function (t) {
  var e = {
    mode: "horizontal",
    slideSelector: "",
    infiniteLoop: !0,
    hideControlOnEnd: !1,
    speed: 500,
    easing: null,
    slideMargin: 0,
    startSlide: 0,
    randomStart: !1,
    captions: !1,
    ticker: !1,
    tickerHover: !1,
    adaptiveHeight: !1,
    adaptiveHeightSpeed: 500,
    video: !1,
    useCSS: !0,
    preloadImages: "visible",
    responsive: !0,
    slideZIndex: 50,
    wrapperClass: "bx-wrapper",
    touchEnabled: !0,
    swipeThreshold: 50,
    oneToOneTouch: !0,
    preventDefaultSwipeX: !0,
    preventDefaultSwipeY: !1,
    ariaLive: !0,
    ariaHidden: !0,
    keyboardEnabled: !1,
    pager: !0,
    pagerType: "full",
    pagerShortSeparator: " / ",
    pagerSelector: null,
    buildPager: null,
    pagerCustom: null,
    controls: !0,
    nextText: "Next",
    prevText: "Prev",
    nextSelector: null,
    prevSelector: null,
    autoControls: !1,
    startText: "Start",
    stopText: "Stop",
    autoControlsCombine: !1,
    autoControlsSelector: null,
    auto: !1,
    pause: 4e3,
    autoStart: !0,
    autoDirection: "next",
    stopAutoOnClick: !1,
    autoHover: !1,
    autoDelay: 0,
    autoSlideForOnePage: !1,
    minSlides: 1,
    maxSlides: 1,
    moveSlides: 0,
    slideWidth: 0,
    shrinkItems: !1,
    onSliderLoad: function () {
      return !0;
    },
    onSlideBefore: function () {
      return !0;
    },
    onSlideAfter: function () {
      return !0;
    },
    onSlideNext: function () {
      return !0;
    },
    onSlidePrev: function () {
      return !0;
    },
    onSliderResize: function () {
      return !0;
    },
    onAutoChange: function () {
      return !0;
    },
  };
  t.fn.bxSlider = function (n) {
    if (0 === this.length) return this;
    if (this.length > 1)
      return (
        this.each(function () {
          t(this).bxSlider(n);
        }),
        this
      );
    var s = {},
      o = this,
      r = t(window).width(),
      a = t(window).height();
    if (!t(o).data("bxSlider")) {
      var l = function () {
          t(o).data("bxSlider") ||
            ((s.settings = t.extend({}, e, n)),
            (s.settings.slideWidth = parseInt(s.settings.slideWidth)),
            (s.children = o.children(s.settings.slideSelector)),
            s.children.length < s.settings.minSlides &&
              (s.settings.minSlides = s.children.length),
            s.children.length < s.settings.maxSlides &&
              (s.settings.maxSlides = s.children.length),
            s.settings.randomStart &&
              (s.settings.startSlide = Math.floor(
                Math.random() * s.children.length
              )),
            (s.active = { index: s.settings.startSlide }),
            (s.carousel = s.settings.minSlides > 1 || s.settings.maxSlides > 1),
            s.carousel && (s.settings.preloadImages = "all"),
            (s.minThreshold =
              s.settings.minSlides * s.settings.slideWidth +
              (s.settings.minSlides - 1) * s.settings.slideMargin),
            (s.maxThreshold =
              s.settings.maxSlides * s.settings.slideWidth +
              (s.settings.maxSlides - 1) * s.settings.slideMargin),
            (s.working = !1),
            (s.controls = {}),
            (s.interval = null),
            (s.animProp = "vertical" === s.settings.mode ? "top" : "left"),
            (s.usingCSS =
              s.settings.useCSS &&
              "fade" !== s.settings.mode &&
              (function () {
                for (
                  var t = document.createElement("div"),
                    e = [
                      "WebkitPerspective",
                      "MozPerspective",
                      "OPerspective",
                      "msPerspective",
                    ],
                    i = 0;
                  i < e.length;
                  i++
                )
                  if (void 0 !== t.style[e[i]])
                    return (
                      (s.cssPrefix = e[i]
                        .replace("Perspective", "")
                        .toLowerCase()),
                      (s.animProp = "-" + s.cssPrefix + "-transform"),
                      !0
                    );
                return !1;
              })()),
            "vertical" === s.settings.mode &&
              (s.settings.maxSlides = s.settings.minSlides),
            o.data("origStyle", o.attr("style")),
            o.children(s.settings.slideSelector).each(function () {
              t(this).data("origStyle", t(this).attr("style"));
            }),
            d());
        },
        d = function () {
          var e = s.children.eq(s.settings.startSlide);
          o.wrap(
            '<div class="' +
              s.settings.wrapperClass +
              '"><div class="bx-viewport"></div></div>'
          ),
            (s.viewport = o.parent()),
            s.settings.ariaLive &&
              !s.settings.ticker &&
              s.viewport.attr("aria-live", "polite"),
            (s.loader = t('<div class="bx-loading" />')),
            s.viewport.prepend(s.loader),
            o.css({
              width:
                "horizontal" === s.settings.mode
                  ? 1e3 * s.children.length + 215 + "%"
                  : "auto",
              position: "relative",
            }),
            s.usingCSS && s.settings.easing
              ? o.css(
                  "-" + s.cssPrefix + "-transition-timing-function",
                  s.settings.easing
                )
              : s.settings.easing || (s.settings.easing = "swing"),
            s.viewport.css({
              width: "100%",
              overflow: "hidden",
              position: "relative",
            }),
            s.viewport.parent().css({ maxWidth: u() }),
            s.children.css({
              float: "horizontal" === s.settings.mode ? "left" : "none",
              listStyle: "none",
              position: "relative",
            }),
            s.children.css("width", h()),
            "horizontal" === s.settings.mode &&
              s.settings.slideMargin > 0 &&
              s.children.css("marginRight", s.settings.slideMargin),
            "vertical" === s.settings.mode &&
              s.settings.slideMargin > 0 &&
              s.children.css("marginBottom", s.settings.slideMargin),
            "fade" === s.settings.mode &&
              (s.children.css({
                position: "absolute",
                zIndex: 0,
                display: "none",
              }),
              s.children
                .eq(s.settings.startSlide)
                .css({ zIndex: s.settings.slideZIndex, display: "block" })),
            (s.controls.el = t('<div class="bx-controls" />')),
            s.settings.captions && k(),
            (s.active.last = s.settings.startSlide === f() - 1),
            s.settings.video && o.fitVids(),
            "none" === s.settings.preloadImages
              ? (e = null)
              : ("all" === s.settings.preloadImages || s.settings.ticker) &&
                (e = s.children),
            s.settings.ticker
              ? (s.settings.pager = !1)
              : (s.settings.controls && C(),
                s.settings.auto && s.settings.autoControls && T(),
                s.settings.pager && b(),
                (s.settings.controls ||
                  s.settings.autoControls ||
                  s.settings.pager) &&
                  s.viewport.after(s.controls.el)),
            null === e ? g() : c(e, g);
        },
        c = function (e, i) {
          var n = e.find('img:not([src=""]), iframe').length,
            s = 0;
          if (0 === n) return void i();
          e.find('img:not([src=""]), iframe').each(function () {
            t(this)
              .one("load error", function () {
                ++s === n && i();
              })
              .each(function () {
                (this.complete || "" == this.src) && t(this).trigger("load");
              });
          });
        },
        g = function () {
          if (
            s.settings.infiniteLoop &&
            "fade" !== s.settings.mode &&
            !s.settings.ticker
          ) {
            var e =
                "vertical" === s.settings.mode
                  ? s.settings.minSlides
                  : s.settings.maxSlides,
              i = s.children.slice(0, e).clone(!0).addClass("bx-clone"),
              n = s.children.slice(-e).clone(!0).addClass("bx-clone");
            s.settings.ariaHidden &&
              (i.attr("aria-hidden", !0), n.attr("aria-hidden", !0)),
              o.append(i).prepend(n);
          }
          s.loader.remove(),
            m(),
            "vertical" === s.settings.mode && (s.settings.adaptiveHeight = !0),
            s.viewport.height(p()),
            o.redrawSlider(),
            s.settings.onSliderLoad.call(o, s.active.index),
            (s.initialized = !0),
            s.settings.responsive && t(window).on("resize", U),
            s.settings.auto &&
              s.settings.autoStart &&
              (f() > 1 || s.settings.autoSlideForOnePage) &&
              L(),
            s.settings.ticker && O(),
            s.settings.pager && z(s.settings.startSlide),
            s.settings.controls && q(),
            s.settings.touchEnabled && !s.settings.ticker && X(),
            s.settings.keyboardEnabled &&
              !s.settings.ticker &&
              t(document).keydown(B);
        },
        p = function () {
          var e = 0,
            n = t();
          if ("vertical" === s.settings.mode || s.settings.adaptiveHeight)
            if (s.carousel) {
              var o =
                1 === s.settings.moveSlides
                  ? s.active.index
                  : s.active.index * x();
              for (
                n = s.children.eq(o), i = 1;
                i <= s.settings.maxSlides - 1;
                i++
              )
                n =
                  o + i >= s.children.length
                    ? n.add(s.children.eq(i - 1))
                    : n.add(s.children.eq(o + i));
            } else n = s.children.eq(s.active.index);
          else n = s.children;
          return (
            "vertical" === s.settings.mode
              ? (n.each(function (i) {
                  e += t(this).outerHeight();
                }),
                s.settings.slideMargin > 0 &&
                  (e += s.settings.slideMargin * (s.settings.minSlides - 1)))
              : (e = Math.max.apply(
                  Math,
                  n
                    .map(function () {
                      return t(this).outerHeight(!1);
                    })
                    .get()
                )),
            "border-box" === s.viewport.css("box-sizing")
              ? (e +=
                  parseFloat(s.viewport.css("padding-top")) +
                  parseFloat(s.viewport.css("padding-bottom")) +
                  parseFloat(s.viewport.css("border-top-width")) +
                  parseFloat(s.viewport.css("border-bottom-width")))
              : "padding-box" === s.viewport.css("box-sizing") &&
                (e +=
                  parseFloat(s.viewport.css("padding-top")) +
                  parseFloat(s.viewport.css("padding-bottom"))),
            e
          );
        },
        u = function () {
          var t = "100%";
          return (
            s.settings.slideWidth > 0 &&
              (t =
                "horizontal" === s.settings.mode
                  ? s.settings.maxSlides * s.settings.slideWidth +
                    (s.settings.maxSlides - 1) * s.settings.slideMargin
                  : s.settings.slideWidth),
            t
          );
        },
        h = function () {
          var t = s.settings.slideWidth,
            e = s.viewport.width();
          if (
            0 === s.settings.slideWidth ||
            (s.settings.slideWidth > e && !s.carousel) ||
            "vertical" === s.settings.mode
          )
            t = e;
          else if (
            s.settings.maxSlides > 1 &&
            "horizontal" === s.settings.mode
          ) {
            if (e > s.maxThreshold) return t;
            e < s.minThreshold
              ? (t =
                  (e - s.settings.slideMargin * (s.settings.minSlides - 1)) /
                  s.settings.minSlides)
              : s.settings.shrinkItems &&
                (t = Math.floor(
                  (e + s.settings.slideMargin) /
                    Math.ceil(
                      (e + s.settings.slideMargin) /
                        (t + s.settings.slideMargin)
                    ) -
                    s.settings.slideMargin
                ));
          }
          return t;
        },
        v = function () {
          var t = 1,
            e = null;
          return (
            "horizontal" === s.settings.mode && s.settings.slideWidth > 0
              ? s.viewport.width() < s.minThreshold
                ? (t = s.settings.minSlides)
                : s.viewport.width() > s.maxThreshold
                ? (t = s.settings.maxSlides)
                : ((e = s.children.first().width() + s.settings.slideMargin),
                  (t =
                    Math.floor(
                      (s.viewport.width() + s.settings.slideMargin) / e
                    ) || 1))
              : "vertical" === s.settings.mode && (t = s.settings.minSlides),
            t
          );
        },
        f = function () {
          var t = 0,
            e = 0,
            i = 0;
          if (s.settings.moveSlides > 0) {
            if (!s.settings.infiniteLoop) {
              for (; e < s.children.length; )
                ++t,
                  (e = i + v()),
                  (i +=
                    s.settings.moveSlides <= v() ? s.settings.moveSlides : v());
              return i;
            }
            t = Math.ceil(s.children.length / x());
          } else t = Math.ceil(s.children.length / v());
          return t;
        },
        x = function () {
          return s.settings.moveSlides > 0 && s.settings.moveSlides <= v()
            ? s.settings.moveSlides
            : v();
        },
        m = function () {
          var t, e, i;
          s.children.length > s.settings.maxSlides &&
          s.active.last &&
          !s.settings.infiniteLoop
            ? "horizontal" === s.settings.mode
              ? ((e = s.children.last()),
                (t = e.position()),
                S(
                  -(t.left - (s.viewport.width() - e.outerWidth())),
                  "reset",
                  0
                ))
              : "vertical" === s.settings.mode &&
                ((i = s.children.length - s.settings.minSlides),
                (t = s.children.eq(i).position()),
                S(-t.top, "reset", 0))
            : ((t = s.children.eq(s.active.index * x()).position()),
              s.active.index === f() - 1 && (s.active.last = !0),
              void 0 !== t &&
                ("horizontal" === s.settings.mode
                  ? S(-t.left, "reset", 0)
                  : "vertical" === s.settings.mode && S(-t.top, "reset", 0)));
        },
        S = function (e, i, n, r) {
          var a, l;
          s.usingCSS
            ? ((l =
                "vertical" === s.settings.mode
                  ? "translate3d(0, " + e + "px, 0)"
                  : "translate3d(" + e + "px, 0, 0)"),
              o.css("-" + s.cssPrefix + "-transition-duration", n / 1e3 + "s"),
              "slide" === i
                ? (o.css(s.animProp, l),
                  0 !== n
                    ? o.on(
                        "transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",
                        function (e) {
                          t(e.target).is(o) &&
                            (o.off(
                              "transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"
                            ),
                            A());
                        }
                      )
                    : A())
                : "reset" === i
                ? o.css(s.animProp, l)
                : "ticker" === i &&
                  (o.css(
                    "-" + s.cssPrefix + "-transition-timing-function",
                    "linear"
                  ),
                  o.css(s.animProp, l),
                  0 !== n
                    ? o.on(
                        "transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",
                        function (e) {
                          t(e.target).is(o) &&
                            (o.off(
                              "transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"
                            ),
                            S(r.resetValue, "reset", 0),
                            F());
                        }
                      )
                    : (S(r.resetValue, "reset", 0), F())))
            : ((a = {}),
              (a[s.animProp] = e),
              "slide" === i
                ? o.animate(a, n, s.settings.easing, function () {
                    A();
                  })
                : "reset" === i
                ? o.css(s.animProp, e)
                : "ticker" === i &&
                  o.animate(a, n, "linear", function () {
                    S(r.resetValue, "reset", 0), F();
                  }));
        },
        w = function () {
          for (var e = "", i = "", n = f(), o = 0; o < n; o++)
            (i = ""),
              (s.settings.buildPager && t.isFunction(s.settings.buildPager)) ||
              s.settings.pagerCustom
                ? ((i = s.settings.buildPager(o)),
                  s.pagerEl.addClass("bx-custom-pager"))
                : ((i = o + 1), s.pagerEl.addClass("bx-default-pager")),
              (e +=
                '<div class="bx-pager-item"><a href="" data-slide-index="' +
                o +
                '" class="bx-pager-link">' +
                i +
                "</a></div>");
          s.pagerEl.html(e);
        },
        b = function () {
          s.settings.pagerCustom
            ? (s.pagerEl = t(s.settings.pagerCustom))
            : ((s.pagerEl = t('<div class="bx-pager" />')),
              s.settings.pagerSelector
                ? t(s.settings.pagerSelector).html(s.pagerEl)
                : s.controls.el.addClass("bx-has-pager").append(s.pagerEl),
              w()),
            s.pagerEl.on("click touchend", "a", I);
        },
        C = function () {
          (s.controls.next = t(
            '<a class="bx-next" href="">' + s.settings.nextText + "</a>"
          )),
            (s.controls.prev = t(
              '<a class="bx-prev" href="">' + s.settings.prevText + "</a>"
            )),
            s.controls.next.on("click touchend", P),
            s.controls.prev.on("click touchend", E),
            s.settings.nextSelector &&
              t(s.settings.nextSelector).append(s.controls.next),
            s.settings.prevSelector &&
              t(s.settings.prevSelector).append(s.controls.prev),
            s.settings.nextSelector ||
              s.settings.prevSelector ||
              ((s.controls.directionEl = t(
                '<div class="bx-controls-direction" />'
              )),
              s.controls.directionEl
                .append(s.controls.prev)
                .append(s.controls.next),
              s.controls.el
                .addClass("bx-has-controls-direction")
                .append(s.controls.directionEl));
        },
        T = function () {
          (s.controls.start = t(
            '<div class="bx-controls-auto-item"><a class="bx-start" href="">' +
              s.settings.startText +
              "</a></div>"
          )),
            (s.controls.stop = t(
              '<div class="bx-controls-auto-item"><a class="bx-stop" href="">' +
                s.settings.stopText +
                "</a></div>"
            )),
            (s.controls.autoEl = t('<div class="bx-controls-auto" />')),
            s.controls.autoEl.on("click", ".bx-start", M),
            s.controls.autoEl.on("click", ".bx-stop", y),
            s.settings.autoControlsCombine
              ? s.controls.autoEl.append(s.controls.start)
              : s.controls.autoEl
                  .append(s.controls.start)
                  .append(s.controls.stop),
            s.settings.autoControlsSelector
              ? t(s.settings.autoControlsSelector).html(s.controls.autoEl)
              : s.controls.el
                  .addClass("bx-has-controls-auto")
                  .append(s.controls.autoEl),
            D(s.settings.autoStart ? "stop" : "start");
        },
        k = function () {
          s.children.each(function (e) {
            var i = t(this).find("img:first").attr("title");
            void 0 !== i &&
              ("" + i).length &&
              t(this).append(
                '<div class="bx-caption"><span>' + i + "</span></div>"
              );
          });
        },
        P = function (t) {
          t.preventDefault(),
            s.controls.el.hasClass("disabled") ||
              (s.settings.auto && s.settings.stopAutoOnClick && o.stopAuto(),
              o.goToNextSlide());
        },
        E = function (t) {
          t.preventDefault(),
            s.controls.el.hasClass("disabled") ||
              (s.settings.auto && s.settings.stopAutoOnClick && o.stopAuto(),
              o.goToPrevSlide());
        },
        M = function (t) {
          o.startAuto(), t.preventDefault();
        },
        y = function (t) {
          o.stopAuto(), t.preventDefault();
        },
        I = function (e) {
          var i, n;
          e.preventDefault(),
            s.controls.el.hasClass("disabled") ||
              (s.settings.auto && s.settings.stopAutoOnClick && o.stopAuto(),
              (i = t(e.currentTarget)),
              void 0 !== i.attr("data-slide-index") &&
                (n = parseInt(i.attr("data-slide-index"))) !== s.active.index &&
                o.goToSlide(n));
        },
        z = function (e) {
          var i = s.children.length;
          if ("short" === s.settings.pagerType)
            return (
              s.settings.maxSlides > 1 &&
                (i = Math.ceil(s.children.length / s.settings.maxSlides)),
              void s.pagerEl.html(e + 1 + s.settings.pagerShortSeparator + i)
            );
          s.pagerEl.find("a").removeClass("active"),
            s.pagerEl.each(function (i, n) {
              t(n).find("a").eq(e).addClass("active");
            });
        },
        A = function () {
          if (s.settings.infiniteLoop) {
            var t = "";
            0 === s.active.index
              ? (t = s.children.eq(0).position())
              : s.active.index === f() - 1 && s.carousel
              ? (t = s.children.eq((f() - 1) * x()).position())
              : s.active.index === s.children.length - 1 &&
                (t = s.children.eq(s.children.length - 1).position()),
              t &&
                ("horizontal" === s.settings.mode
                  ? S(-t.left, "reset", 0)
                  : "vertical" === s.settings.mode && S(-t.top, "reset", 0));
          }
          (s.working = !1),
            s.settings.onSlideAfter.call(
              o,
              s.children.eq(s.active.index),
              s.oldIndex,
              s.active.index
            );
        },
        D = function (t) {
          s.settings.autoControlsCombine
            ? s.controls.autoEl.html(s.controls[t])
            : (s.controls.autoEl.find("a").removeClass("active"),
              s.controls.autoEl
                .find("a:not(.bx-" + t + ")")
                .addClass("active"));
        },
        q = function () {
          1 === f()
            ? (s.controls.prev.addClass("disabled"),
              s.controls.next.addClass("disabled"))
            : !s.settings.infiniteLoop &&
              s.settings.hideControlOnEnd &&
              (0 === s.active.index
                ? (s.controls.prev.addClass("disabled"),
                  s.controls.next.removeClass("disabled"))
                : s.active.index === f() - 1
                ? (s.controls.next.addClass("disabled"),
                  s.controls.prev.removeClass("disabled"))
                : (s.controls.prev.removeClass("disabled"),
                  s.controls.next.removeClass("disabled")));
        },
        H = function () {
          o.startAuto();
        },
        W = function () {
          o.stopAuto();
        },
        L = function () {
          s.settings.autoDelay > 0
            ? setTimeout(o.startAuto, s.settings.autoDelay)
            : (o.startAuto(), t(window).focus(H).blur(W)),
            s.settings.autoHover &&
              o.hover(
                function () {
                  s.interval && (o.stopAuto(!0), (s.autoPaused = !0));
                },
                function () {
                  s.autoPaused && (o.startAuto(!0), (s.autoPaused = null));
                }
              );
        },
        O = function () {
          var e,
            i,
            n,
            r,
            a,
            l,
            d,
            c,
            g = 0;
          "next" === s.settings.autoDirection
            ? o.append(s.children.clone().addClass("bx-clone"))
            : (o.prepend(s.children.clone().addClass("bx-clone")),
              (e = s.children.first().position()),
              (g = "horizontal" === s.settings.mode ? -e.left : -e.top)),
            S(g, "reset", 0),
            (s.settings.pager = !1),
            (s.settings.controls = !1),
            (s.settings.autoControls = !1),
            s.settings.tickerHover &&
              (s.usingCSS
                ? ((r = "horizontal" === s.settings.mode ? 4 : 5),
                  s.viewport.hover(
                    function () {
                      (i = o.css("-" + s.cssPrefix + "-transform")),
                        (n = parseFloat(i.split(",")[r])),
                        S(n, "reset", 0);
                    },
                    function () {
                      (c = 0),
                        s.children.each(function (e) {
                          c +=
                            "horizontal" === s.settings.mode
                              ? t(this).outerWidth(!0)
                              : t(this).outerHeight(!0);
                        }),
                        (a = s.settings.speed / c),
                        (l = "horizontal" === s.settings.mode ? "left" : "top"),
                        (d = a * (c - Math.abs(parseInt(n)))),
                        F(d);
                    }
                  ))
                : s.viewport.hover(
                    function () {
                      o.stop();
                    },
                    function () {
                      (c = 0),
                        s.children.each(function (e) {
                          c +=
                            "horizontal" === s.settings.mode
                              ? t(this).outerWidth(!0)
                              : t(this).outerHeight(!0);
                        }),
                        (a = s.settings.speed / c),
                        (l = "horizontal" === s.settings.mode ? "left" : "top"),
                        (d = a * (c - Math.abs(parseInt(o.css(l))))),
                        F(d);
                    }
                  )),
            F();
        },
        F = function (t) {
          var e,
            i,
            n,
            r = t || s.settings.speed,
            a = { left: 0, top: 0 },
            l = { left: 0, top: 0 };
          "next" === s.settings.autoDirection
            ? (a = o.find(".bx-clone").first().position())
            : (l = s.children.first().position()),
            (e = "horizontal" === s.settings.mode ? -a.left : -a.top),
            (i = "horizontal" === s.settings.mode ? -l.left : -l.top),
            (n = { resetValue: i }),
            S(e, "ticker", r, n);
        },
        N = function (e) {
          var i = t(window),
            n = { top: i.scrollTop(), left: i.scrollLeft() },
            s = e.offset();
          return (
            (n.right = n.left + i.width()),
            (n.bottom = n.top + i.height()),
            (s.right = s.left + e.outerWidth()),
            (s.bottom = s.top + e.outerHeight()),
            !(
              n.right < s.left ||
              n.left > s.right ||
              n.bottom < s.top ||
              n.top > s.bottom
            )
          );
        },
        B = function (t) {
          var e = document.activeElement.tagName.toLowerCase();
          if (null == new RegExp(e, ["i"]).exec("input|textarea") && N(o)) {
            if (39 === t.keyCode) return P(t), !1;
            if (37 === t.keyCode) return E(t), !1;
          }
        },
        X = function () {
          (s.touch = { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } }),
            s.viewport.on("touchstart MSPointerDown pointerdown", Y),
            s.viewport.on("click", ".bxslider a", function (t) {
              s.viewport.hasClass("click-disabled") &&
                (t.preventDefault(), s.viewport.removeClass("click-disabled"));
            });
        },
        Y = function (t) {
          if ("touchstart" === t.type || 0 === t.button)
            if (
              (t.preventDefault(),
              s.controls.el.addClass("disabled"),
              s.working)
            )
              s.controls.el.removeClass("disabled");
            else {
              s.touch.originalPos = o.position();
              var e = t.originalEvent,
                i = void 0 !== e.changedTouches ? e.changedTouches : [e],
                n = "function" == typeof PointerEvent;
              if (n && void 0 === e.pointerId) return;
              (s.touch.start.x = i[0].pageX),
                (s.touch.start.y = i[0].pageY),
                s.viewport.get(0).setPointerCapture &&
                  ((s.pointerId = e.pointerId),
                  s.viewport.get(0).setPointerCapture(s.pointerId)),
                (s.originalClickTarget = e.originalTarget || e.target),
                (s.originalClickButton = e.button),
                (s.originalClickButtons = e.buttons),
                (s.originalEventType = e.type),
                (s.hasMove = !1),
                s.viewport.on("touchmove MSPointerMove pointermove", R),
                s.viewport.on("touchend MSPointerUp pointerup", Z),
                s.viewport.on("MSPointerCancel pointercancel", V);
            }
        },
        V = function (t) {
          t.preventDefault(),
            S(s.touch.originalPos.left, "reset", 0),
            s.controls.el.removeClass("disabled"),
            s.viewport.off("MSPointerCancel pointercancel", V),
            s.viewport.off("touchmove MSPointerMove pointermove", R),
            s.viewport.off("touchend MSPointerUp pointerup", Z),
            s.viewport.get(0).releasePointerCapture &&
              s.viewport.get(0).releasePointerCapture(s.pointerId);
        },
        R = function (t) {
          var e = t.originalEvent,
            i = void 0 !== e.changedTouches ? e.changedTouches : [e],
            n = Math.abs(i[0].pageX - s.touch.start.x),
            o = Math.abs(i[0].pageY - s.touch.start.y),
            r = 0,
            a = 0;
          (s.hasMove = !0),
            3 * n > o && s.settings.preventDefaultSwipeX
              ? t.preventDefault()
              : 3 * o > n &&
                s.settings.preventDefaultSwipeY &&
                t.preventDefault(),
            "touchmove" !== t.type && t.preventDefault(),
            "fade" !== s.settings.mode &&
              s.settings.oneToOneTouch &&
              ("horizontal" === s.settings.mode
                ? ((a = i[0].pageX - s.touch.start.x),
                  (r = s.touch.originalPos.left + a))
                : ((a = i[0].pageY - s.touch.start.y),
                  (r = s.touch.originalPos.top + a)),
              S(r, "reset", 0));
        },
        Z = function (e) {
          e.preventDefault(),
            s.viewport.off("touchmove MSPointerMove pointermove", R),
            s.controls.el.removeClass("disabled");
          var i = e.originalEvent,
            n = void 0 !== i.changedTouches ? i.changedTouches : [i],
            r = 0,
            a = 0;
          (s.touch.end.x = n[0].pageX),
            (s.touch.end.y = n[0].pageY),
            "fade" === s.settings.mode
              ? (a = Math.abs(s.touch.start.x - s.touch.end.x)) >=
                  s.settings.swipeThreshold &&
                (s.touch.start.x > s.touch.end.x
                  ? o.goToNextSlide()
                  : o.goToPrevSlide(),
                o.stopAuto())
              : ("horizontal" === s.settings.mode
                  ? ((a = s.touch.end.x - s.touch.start.x),
                    (r = s.touch.originalPos.left))
                  : ((a = s.touch.end.y - s.touch.start.y),
                    (r = s.touch.originalPos.top)),
                !s.settings.infiniteLoop &&
                ((0 === s.active.index && a > 0) || (s.active.last && a < 0))
                  ? S(r, "reset", 200)
                  : Math.abs(a) >= s.settings.swipeThreshold
                  ? (a < 0 ? o.goToNextSlide() : o.goToPrevSlide(),
                    o.stopAuto())
                  : S(r, "reset", 200)),
            s.viewport.off("touchend MSPointerUp pointerup", Z),
            s.viewport.get(0).releasePointerCapture &&
              s.viewport.get(0).releasePointerCapture(s.pointerId),
            !1 !== s.hasMove ||
              (0 !== s.originalClickButton &&
                "touchstart" !== s.originalEventType) ||
              t(s.originalClickTarget).trigger({
                type: "click",
                button: s.originalClickButton,
                buttons: s.originalClickButtons,
              });
        },
        U = function (e) {
          if (s.initialized)
            if (s.working) window.setTimeout(U, 10);
            else {
              var i = t(window).width(),
                n = t(window).height();
              (r === i && a === n) ||
                ((r = i),
                (a = n),
                o.redrawSlider(),
                s.settings.onSliderResize.call(o, s.active.index));
            }
        },
        j = function (t) {
          var e = v();
          s.settings.ariaHidden &&
            !s.settings.ticker &&
            (s.children.attr("aria-hidden", "true"),
            s.children.slice(t, t + e).attr("aria-hidden", "false"));
        },
        Q = function (t) {
          return t < 0
            ? s.settings.infiniteLoop
              ? f() - 1
              : s.active.index
            : t >= f()
            ? s.settings.infiniteLoop
              ? 0
              : s.active.index
            : t;
        };
      return (
        (o.goToSlide = function (e, i) {
          var n,
            r,
            a,
            l,
            d = !0,
            c = 0,
            g = { left: 0, top: 0 },
            u = null;
          if (
            ((s.oldIndex = s.active.index),
            (s.active.index = Q(e)),
            !s.working && s.active.index !== s.oldIndex)
          ) {
            if (
              ((s.working = !0),
              void 0 !==
                (d = s.settings.onSlideBefore.call(
                  o,
                  s.children.eq(s.active.index),
                  s.oldIndex,
                  s.active.index
                )) && !d)
            )
              return (s.active.index = s.oldIndex), void (s.working = !1);
            "next" === i
              ? s.settings.onSlideNext.call(
                  o,
                  s.children.eq(s.active.index),
                  s.oldIndex,
                  s.active.index
                ) || (d = !1)
              : "prev" === i &&
                (s.settings.onSlidePrev.call(
                  o,
                  s.children.eq(s.active.index),
                  s.oldIndex,
                  s.active.index
                ) ||
                  (d = !1)),
              (s.active.last = s.active.index >= f() - 1),
              (s.settings.pager || s.settings.pagerCustom) && z(s.active.index),
              s.settings.controls && q(),
              "fade" === s.settings.mode
                ? (s.settings.adaptiveHeight &&
                    s.viewport.height() !== p() &&
                    s.viewport.animate(
                      { height: p() },
                      s.settings.adaptiveHeightSpeed
                    ),
                  s.children
                    .filter(":visible")
                    .fadeOut(s.settings.speed)
                    .css({ zIndex: 0 }),
                  s.children
                    .eq(s.active.index)
                    .css("zIndex", s.settings.slideZIndex + 1)
                    .fadeIn(s.settings.speed, function () {
                      t(this).css("zIndex", s.settings.slideZIndex), A();
                    }))
                : (s.settings.adaptiveHeight &&
                    s.viewport.height() !== p() &&
                    s.viewport.animate(
                      { height: p() },
                      s.settings.adaptiveHeightSpeed
                    ),
                  !s.settings.infiniteLoop && s.carousel && s.active.last
                    ? "horizontal" === s.settings.mode
                      ? ((u = s.children.eq(s.children.length - 1)),
                        (g = u.position()),
                        (c = s.viewport.width() - u.outerWidth()))
                      : ((n = s.children.length - s.settings.minSlides),
                        (g = s.children.eq(n).position()))
                    : s.carousel && s.active.last && "prev" === i
                    ? ((r =
                        1 === s.settings.moveSlides
                          ? s.settings.maxSlides - x()
                          : (f() - 1) * x() -
                            (s.children.length - s.settings.maxSlides)),
                      (u = o.children(".bx-clone").eq(r)),
                      (g = u.position()))
                    : "next" === i && 0 === s.active.index
                    ? ((g = o
                        .find("> .bx-clone")
                        .eq(s.settings.maxSlides)
                        .position()),
                      (s.active.last = !1))
                    : e >= 0 &&
                      ((l = e * parseInt(x())),
                      (g = s.children.eq(l).position())),
                  void 0 !== g &&
                    ((a =
                      "horizontal" === s.settings.mode
                        ? -(g.left - c)
                        : -g.top),
                    S(a, "slide", s.settings.speed)),
                  (s.working = !1)),
              s.settings.ariaHidden && j(s.active.index * x());
          }
        }),
        (o.goToNextSlide = function () {
          if ((s.settings.infiniteLoop || !s.active.last) && !0 !== s.working) {
            var t = parseInt(s.active.index) + 1;
            o.goToSlide(t, "next");
          }
        }),
        (o.goToPrevSlide = function () {
          if (
            (s.settings.infiniteLoop || 0 !== s.active.index) &&
            !0 !== s.working
          ) {
            var t = parseInt(s.active.index) - 1;
            o.goToSlide(t, "prev");
          }
        }),
        (o.startAuto = function (t) {
          s.interval ||
            ((s.interval = setInterval(function () {
              "next" === s.settings.autoDirection
                ? o.goToNextSlide()
                : o.goToPrevSlide();
            }, s.settings.pause)),
            s.settings.onAutoChange.call(o, !0),
            s.settings.autoControls && !0 !== t && D("stop"));
        }),
        (o.stopAuto = function (t) {
          s.autoPaused && (s.autoPaused = !1),
            s.interval &&
              (clearInterval(s.interval),
              (s.interval = null),
              s.settings.onAutoChange.call(o, !1),
              s.settings.autoControls && !0 !== t && D("start"));
        }),
        (o.getCurrentSlide = function () {
          return s.active.index;
        }),
        (o.getCurrentSlideElement = function () {
          return s.children.eq(s.active.index);
        }),
        (o.getSlideElement = function (t) {
          return s.children.eq(t);
        }),
        (o.getSlideCount = function () {
          return s.children.length;
        }),
        (o.isWorking = function () {
          return s.working;
        }),
        (o.redrawSlider = function () {
          s.children.add(o.find(".bx-clone")).outerWidth(h()),
            s.viewport.css("height", p()),
            s.settings.ticker || m(),
            s.active.last && (s.active.index = f() - 1),
            s.active.index >= f() && (s.active.last = !0),
            s.settings.pager &&
              !s.settings.pagerCustom &&
              (w(), z(s.active.index)),
            s.settings.ariaHidden && j(s.active.index * x());
        }),
        (o.destroySlider = function () {
          s.initialized &&
            ((s.initialized = !1),
            t(".bx-clone", this).remove(),
            s.children.each(function () {
              void 0 !== t(this).data("origStyle")
                ? t(this).attr("style", t(this).data("origStyle"))
                : t(this).removeAttr("style");
            }),
            void 0 !== t(this).data("origStyle")
              ? this.attr("style", t(this).data("origStyle"))
              : t(this).removeAttr("style"),
            t(this).unwrap().unwrap(),
            s.controls.el && s.controls.el.remove(),
            s.controls.next && s.controls.next.remove(),
            s.controls.prev && s.controls.prev.remove(),
            s.pagerEl &&
              s.settings.controls &&
              !s.settings.pagerCustom &&
              s.pagerEl.remove(),
            t(".bx-caption", this).remove(),
            s.controls.autoEl && s.controls.autoEl.remove(),
            clearInterval(s.interval),
            s.settings.responsive && t(window).off("resize", U),
            s.settings.keyboardEnabled && t(document).off("keydown", B),
            t(this).removeData("bxSlider"),
            t(window).off("blur", W).off("focus", H));
        }),
        (o.reloadSlider = function (e) {
          void 0 !== e && (n = e),
            o.destroySlider(),
            l(),
            t(o).data("bxSlider", this);
        }),
        l(),
        t(o).data("bxSlider", this),
        this
      );
    }
  };
})(jQuery);

//BARBA

!(function (n, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define(t)
    : (n.barba = t());
})(this, function () {
  var n = (function () {
    function n() {}
    return (
      (n.prototype.then = function (r, i) {
        var e = new n(),
          o = this.s;
        if (o) {
          var u = 1 & o ? r : i;
          if (u) {
            try {
              t(e, 1, u(this.v));
            } catch (n) {
              t(e, 2, n);
            }
            return e;
          }
          return this;
        }
        return (
          (this.o = function (n) {
            try {
              var o = n.v;
              1 & n.s ? t(e, 1, r ? r(o) : o) : i ? t(e, 1, i(o)) : t(e, 2, o);
            } catch (n) {
              t(e, 2, n);
            }
          }),
          e
        );
      }),
      n
    );
  })();
  function t(r, i, e) {
    if (!r.s) {
      if (e instanceof n) {
        if (!e.s) return void (e.o = t.bind(null, r, i));
        1 & i && (i = e.s), (e = e.v);
      }
      if (e && e.then)
        return void e.then(t.bind(null, r, i), t.bind(null, r, 2));
      (r.s = i), (r.v = e);
      var o = r.o;
      o && o(r);
    }
  }
  function r(n, t) {
    try {
      var r = n();
    } catch (n) {
      return t(n);
    }
    return r && r.then ? r.then(void 0, t) : r;
  }
  var i,
    e = {};
  !(function () {
    function r(n) {
      (this.t = n),
        (this.i = null),
        (this.u = null),
        (this.h = null),
        (this.l = null);
    }
    function i(n) {
      return { value: n, done: !0 };
    }
    function o(n) {
      return { value: n, done: !1 };
    }
    (r.prototype[
      Symbol.asyncIterator ||
        (Symbol.asyncIterator = Symbol("Symbol.asyncIterator"))
    ] = function () {
      return this;
    }),
      (r.prototype.p = function (t) {
        return this.u(t && t.then ? t.then(o) : o(t)), (this.i = new n());
      }),
      (r.prototype.next = function (r) {
        var o = this;
        return (o.l = new Promise(function (u) {
          var f = o.i;
          if (null === f) {
            var s = o.t;
            if (null === s) return u(o.l);
            function a(n) {
              o.u(n && n.then ? n.then(i) : i(n)), (o.i = null), (o.u = null);
            }
            (o.t = null),
              (o.u = u),
              s(o).then(a, function (t) {
                if (t === e) a(o.h);
                else {
                  var r = new n();
                  o.u(r), (o.i = null), (o.u = null), _resolve(r, 2, t);
                }
              });
          } else (o.i = null), (o.u = u), t(f, 1, r);
        }));
      }),
      (r.prototype.return = function (n) {
        var r = this;
        return (r.l = new Promise(function (o) {
          var u = r.i;
          if (null === u)
            return null === r.t
              ? o(r.l)
              : ((r.t = null), o(n && n.then ? n.then(i) : i(n)));
          (r.h = n), (r.u = o), (r.i = null), t(u, 2, e);
        }));
      }),
      (r.prototype.throw = function (n) {
        var r = this;
        return (r.l = new Promise(function (i, e) {
          var o = r.i;
          if (null === o) return null === r.t ? i(r.l) : ((r.t = null), e(n));
          (r.u = i), (r.i = null), t(o, 2, n);
        }));
      });
  })(),
    (function (n) {
      (n[(n.off = 0)] = "off"),
        (n[(n.error = 1)] = "error"),
        (n[(n.warning = 2)] = "warning"),
        (n[(n.info = 3)] = "info"),
        (n[(n.debug = 4)] = "debug");
    })(i || (i = {}));
  var o = i.off,
    u = function (n) {
      this.m = n;
    };
  (u.getLevel = function () {
    return o;
  }),
    (u.setLevel = function (n) {
      return (o = i[n]);
    }),
    (u.prototype.error = function () {
      for (var n = [], t = arguments.length; t--; ) n[t] = arguments[t];
      this.g(console.error, i.error, n);
    }),
    (u.prototype.warn = function () {
      for (var n = [], t = arguments.length; t--; ) n[t] = arguments[t];
      this.g(console.warn, i.warning, n);
    }),
    (u.prototype.info = function () {
      for (var n = [], t = arguments.length; t--; ) n[t] = arguments[t];
      this.g(console.info, i.info, n);
    }),
    (u.prototype.debug = function () {
      for (var n = [], t = arguments.length; t--; ) n[t] = arguments[t];
      this.g(console.log, i.debug, n);
    }),
    (u.prototype.g = function (n, t, r) {
      t <= u.getLevel() && n.apply(console, ["[" + this.m + "] "].concat(r));
    });
  var f = function () {
    (this.logger = new u("@barba/core")),
      (this.all = [
        "ready",
        "page",
        "reset",
        "currentAdded",
        "currentRemoved",
        "nextAdded",
        "nextRemoved",
        "beforeAppear",
        "appear",
        "afterAppear",
        "appearCanceled",
        "before",
        "beforeLeave",
        "leave",
        "afterLeave",
        "leaveCanceled",
        "beforeEnter",
        "enter",
        "afterEnter",
        "enterCanceled",
        "after",
      ]),
      (this.registered = new Map()),
      this.init();
  };
  (f.prototype.init = function () {
    var n = this;
    this.registered.clear(),
      this.all.forEach(function (t) {
        n[t] ||
          (n[t] = function (r, i) {
            void 0 === i && (i = null),
              n.registered.has(t) || n.registered.set(t, new Set()),
              n.registered.get(t).add({ ctx: i, fn: r });
          });
      });
  }),
    (f.prototype.do = function (n) {
      for (var t = [], r = arguments.length - 1; r-- > 0; )
        t[r] = arguments[r + 1];
      this.registered.has(n) &&
        this.registered.get(n).forEach(function (n) {
          n.fn.apply(n.ctx, t);
        });
    }),
    (f.prototype.clear = function () {
      var n = this;
      this.all.forEach(function (t) {
        delete n[t];
      }),
        this.init();
    }),
    (f.prototype.help = function () {
      this.logger.info("[@barba/core] Available hooks: " + this.all),
        this.logger.info(
          "[@barba/core] Registered hooks: " + Object.keys(this.registered)
        );
    });
  var s = new f(),
    a = function n(t, r, i) {
      return t instanceof RegExp
        ? (function (n, t) {
            if (!t) return n;
            var r = n.source.match(/\((?!\?)/g);
            if (r)
              for (var i = 0; i < r.length; i++)
                t.push({
                  name: i,
                  prefix: null,
                  delimiter: null,
                  optional: !1,
                  repeat: !1,
                  pattern: null,
                });
            return n;
          })(t, r)
        : Array.isArray(t)
        ? (function (t, r, i) {
            for (var e = [], o = 0; o < t.length; o++)
              e.push(n(t[o], r, i).source);
            return new RegExp("(?:" + e.join("|") + ")", y(i));
          })(t, r, i)
        : (function (n, t, r) {
            return g(d(n, r), t, r);
          })(t, r, i);
    },
    c = d,
    h = m,
    l = g,
    v = "/",
    p = new RegExp(
      [
        "(\\\\.)",
        "(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?",
      ].join("|"),
      "g"
    );
  function d(n, t) {
    for (
      var r,
        i = [],
        e = 0,
        o = 0,
        u = "",
        f = (t && t.delimiter) || v,
        s = (t && t.whitelist) || void 0,
        a = !1;
      null !== (r = p.exec(n));

    ) {
      var c = r[0],
        h = r[1],
        l = r.index;
      if (((u += n.slice(o, l)), (o = l + c.length), h)) (u += h[1]), (a = !0);
      else {
        var d = "",
          m = r[2],
          y = r[3],
          g = r[4],
          P = r[5];
        if (!a && u.length) {
          var E = u.length - 1,
            x = u[E];
          (!s || s.indexOf(x) > -1) && ((d = x), (u = u.slice(0, E)));
        }
        u && (i.push(u), (u = ""), (a = !1));
        var A = y || g,
          T = d || f;
        i.push({
          name: m || e++,
          prefix: d,
          delimiter: T,
          optional: "?" === P || "*" === P,
          repeat: "+" === P || "*" === P,
          pattern: A ? b(A) : "[^" + w(T === f ? T : T + f) + "]+?",
        });
      }
    }
    return (u || o < n.length) && i.push(u + n.substr(o)), i;
  }
  function m(n) {
    for (var t = new Array(n.length), r = 0; r < n.length; r++)
      "object" == typeof n[r] &&
        (t[r] = new RegExp("^(?:" + n[r].pattern + ")$"));
    return function (r, i) {
      for (
        var e = "", o = (i && i.encode) || encodeURIComponent, u = 0;
        u < n.length;
        u++
      ) {
        var f = n[u];
        if ("string" != typeof f) {
          var s,
            a = r ? r[f.name] : void 0;
          if (Array.isArray(a)) {
            if (!f.repeat)
              throw new TypeError(
                'Expected "' + f.name + '" to not repeat, but got array'
              );
            if (0 === a.length) {
              if (f.optional) continue;
              throw new TypeError('Expected "' + f.name + '" to not be empty');
            }
            for (var c = 0; c < a.length; c++) {
              if (((s = o(a[c], f)), !t[u].test(s)))
                throw new TypeError(
                  'Expected all "' + f.name + '" to match "' + f.pattern + '"'
                );
              e += (0 === c ? f.prefix : f.delimiter) + s;
            }
          } else if (
            "string" != typeof a &&
            "number" != typeof a &&
            "boolean" != typeof a
          ) {
            if (!f.optional)
              throw new TypeError(
                'Expected "' +
                  f.name +
                  '" to be ' +
                  (f.repeat ? "an array" : "a string")
              );
          } else {
            if (((s = o(String(a), f)), !t[u].test(s)))
              throw new TypeError(
                'Expected "' +
                  f.name +
                  '" to match "' +
                  f.pattern +
                  '", but got "' +
                  s +
                  '"'
              );
            e += f.prefix + s;
          }
        } else e += f;
      }
      return e;
    };
  }
  function w(n) {
    return n.replace(/([.+*?=^!:${}()[\]|\/\\])/g, "\\$1");
  }
  function b(n) {
    return n.replace(/([=!:$\/()])/g, "\\$1");
  }
  function y(n) {
    return n && n.sensitive ? "" : "i";
  }
  function g(n, t, r) {
    for (
      var i = (r = r || {}).strict,
        e = !1 !== r.start,
        o = !1 !== r.end,
        u = r.delimiter || v,
        f = []
          .concat(r.endsWith || [])
          .map(w)
          .concat("$")
          .join("|"),
        s = e ? "^" : "",
        a = 0;
      a < n.length;
      a++
    ) {
      var c = n[a];
      if ("string" == typeof c) s += w(c);
      else {
        var h = c.repeat
          ? "(?:" +
            c.pattern +
            ")(?:" +
            w(c.delimiter) +
            "(?:" +
            c.pattern +
            "))*"
          : c.pattern;
        t && t.push(c),
          (s += c.optional
            ? c.prefix
              ? "(?:" + w(c.prefix) + "(" + h + "))?"
              : "(" + h + ")?"
            : w(c.prefix) + "(" + h + ")");
      }
    }
    if (o)
      i || (s += "(?:" + w(u) + ")?"), (s += "$" === f ? "$" : "(?=" + f + ")");
    else {
      var l = n[n.length - 1],
        p = "string" == typeof l ? l[l.length - 1] === u : void 0 === l;
      i || (s += "(?:" + w(u) + "(?=" + f + "))?"),
        p || (s += "(?=" + w(u) + "|" + f + ")");
    }
    return new RegExp(s, y(r));
  }
  (a.parse = c),
    (a.compile = function (n, t) {
      return m(d(n, t));
    }),
    (a.tokensToFunction = h),
    (a.tokensToRegExp = l);
  var P = {
      container: "container",
      namespace: "namespace",
      prefix: "data-barba",
      prevent: "prevent",
      wrapper: "wrapper",
    },
    E = function () {
      (this.P = P), (this.A = new DOMParser());
    };
  (E.prototype.toString = function (n) {
    return n.outerHTML;
  }),
    (E.prototype.toDocument = function (n) {
      return this.A.parseFromString(n, "text/html");
    }),
    (E.prototype.toElement = function (n) {
      var t = document.createElement("div");
      return (t.innerHTML = n), t;
    }),
    (E.prototype.getHtml = function (n) {
      return void 0 === n && (n = document), this.toString(n.documentElement);
    }),
    (E.prototype.getWrapper = function (n) {
      return (
        void 0 === n && (n = document),
        n.querySelector("[" + this.P.prefix + '="' + this.P.wrapper + '"]')
      );
    }),
    (E.prototype.getContainer = function (n) {
      return (
        void 0 === n && (n = document),
        n.querySelector("[" + this.P.prefix + '="' + this.P.container + '"]')
      );
    }),
    (E.prototype.getNamespace = function (n) {
      void 0 === n && (n = document);
      var t = n.querySelector(
        "[" + this.P.prefix + "-" + this.P.namespace + "]"
      );
      return t ? t.getAttribute(this.P.prefix + "-" + this.P.namespace) : null;
    }),
    (E.prototype.getHref = function (n) {
      return n.getAttribute && n.getAttribute("href") ? n.href : null;
    });
  var x = new E(),
    A = function (n, t) {
      try {
        var r = (function () {
          if (!t.html)
            return Promise.resolve(n).then(function (n) {
              if (n) {
                var r = x.toElement(n);
                (t.namespace = x.getNamespace(r)),
                  (t.container = x.getContainer(r)),
                  (t.html = n);
              }
            });
        })();
        return Promise.resolve(r && r.then ? r.then(function () {}) : void 0);
      } catch (n) {
        return Promise.reject(n);
      }
    },
    T = a,
    j = { updateNext: A, pathToRegexp: T },
    R = function () {
      return window.location.origin;
    },
    O = function (n) {
      var t = n || window.location.port,
        r = window.location.protocol;
      return "" !== t ? parseInt(t, 10) : "https:" === r ? 443 : 80;
    },
    k = function (n) {
      return C(n).path;
    },
    C = function (n) {
      var t,
        r = M(n),
        i = {},
        e = r.indexOf("#");
      e >= 0 && ((t = r.slice(e + 1)), (r = r.slice(0, e)));
      var o = r.indexOf("?");
      return (
        o >= 0 && ((i = L(r.slice(o + 1))), (r = r.slice(0, o))),
        { hash: t, path: r, query: i }
      );
    },
    L = function (n) {
      return n.split("&").reduce(function (n, t) {
        var r = t.split("=");
        return (n[r[0]] = r[1]), n;
      }, {});
    },
    M = function (n, t) {
      return void 0 === t && (t = R()), n.replace(t, "");
    },
    S = {
      getHref: function () {
        return window.location.href;
      },
      getOrigin: R,
      getPort: O,
      getPath: k,
      parse: C,
      parseQuery: L,
      clean: M,
    },
    $ = function (n) {
      if (((this.T = []), "boolean" == typeof n)) this.j = n;
      else {
        var t = Array.isArray(n) ? n : [n];
        this.T = t.map(function (n) {
          return T(n);
        });
      }
    };
  $.prototype.checkUrl = function (n) {
    if ("boolean" == typeof this.j) return this.j;
    var t = C(n).path;
    return this.T.some(function (n) {
      return null !== n.exec(t);
    });
  };
  var q = (function (n) {
      function t(t) {
        n.call(this, t), (this.R = new Map());
      }
      return (
        n && (t.__proto__ = n),
        ((t.prototype = Object.create(n && n.prototype)).constructor = t),
        (t.prototype.set = function (n, t) {
          return this.checkUrl(n) || this.R.set(n, t), t;
        }),
        (t.prototype.get = function (n) {
          return this.R.get(n);
        }),
        (t.prototype.has = function (n) {
          return this.R.has(n);
        }),
        (t.prototype.delete = function (n) {
          return this.R.delete(n);
        }),
        t
      );
    })($),
    N = function () {
      this.R = [];
    },
    B = { current: { configurable: !0 }, previous: { configurable: !0 } };
  function H(n, t, r) {
    return (
      void 0 === t && (t = 2e3),
      new Promise(function (i, e) {
        var o = new XMLHttpRequest();
        (o.timeout = t),
          (o.onreadystatechange = function () {
            if (o.readyState === XMLHttpRequest.DONE)
              if (200 === o.status) i(o.responseText);
              else if (o.status) {
                var t = { status: o.status, statusText: o.statusText };
                r(n, t), e(t);
              }
          }),
          (o.ontimeout = function () {
            var i = new Error("Timeout error [" + t + "]");
            r(n, i), e(i);
          }),
          (o.onerror = function () {
            var t = new Error("Fetch error");
            r(n, t), e(t);
          }),
          o.open("GET", n),
          o.setRequestHeader(
            "Accept",
            "text/html,application/xhtml+xml,application/xml"
          ),
          o.setRequestHeader("x-barba", "yes"),
          o.send();
      })
    );
  }
  (N.prototype.add = function (n, t) {
    this.R.push({ url: n, ns: t });
  }),
    (N.prototype.remove = function () {
      this.R.pop();
    }),
    (N.prototype.push = function (n, t) {
      this.add(n, t), window.history && window.history.pushState(null, "", n);
    }),
    (N.prototype.cancel = function () {
      this.remove(), window.history && window.history.back();
    }),
    (B.current.get = function () {
      return this.R[this.R.length - 1];
    }),
    (B.previous.get = function () {
      return this.R.length < 2 ? null : this.R[this.R.length - 2];
    }),
    Object.defineProperties(N.prototype, B);
  var I,
    U = function () {
      return !window.history.pushState;
    },
    D = function (n) {
      return !n.el || !n.href;
    },
    X = function (n) {
      var t = n.event;
      return t.which > 1 || t.metaKey || t.ctrlKey || t.shiftKey || t.altKey;
    },
    _ = function (n) {
      var t = n.el;
      return t.hasAttribute("target") && "_blank" === t.target;
    },
    F = function (n) {
      var t = n.el;
      return (
        window.location.protocol !== t.protocol ||
        window.location.hostname !== t.hostname
      );
    },
    G = function (n) {
      var t = n.el;
      return O() !== O(t.port);
    },
    Q = function (n) {
      var t = n.el;
      return t.getAttribute && "string" == typeof t.getAttribute("download");
    },
    W = function (n) {
      return n.el.hasAttribute(P.prefix + "-" + P.prevent);
    },
    z = function (n) {
      return Boolean(
        n.el.closest("[" + P.prefix + "-" + P.prevent + '="all"]')
      );
    },
    J = function (n) {
      return k(n.href) === k(window.location.href);
    },
    K = (function (n) {
      function t(t) {
        n.call(this, t),
          (this.suite = []),
          (this.tests = new Map()),
          this.init();
      }
      return (
        n && (t.__proto__ = n),
        ((t.prototype = Object.create(n && n.prototype)).constructor = t),
        (t.prototype.init = function () {
          this.add("pushState", U),
            this.add("exists", D),
            this.add("newTab", X),
            this.add("blank", _),
            this.add("corsDomain", F),
            this.add("corsPort", G),
            this.add("download", Q),
            this.add("preventSelf", W),
            this.add("preventAll", z),
            this.add("sameUrl", J, !1);
        }),
        (t.prototype.add = function (n, t, r) {
          void 0 === r && (r = !0),
            this.tests.set(n, t),
            r && this.suite.push(n);
        }),
        (t.prototype.run = function (n, t, r, i) {
          return this.tests.get(n)({ el: t, event: r, href: i });
        }),
        (t.prototype.checkLink = function (n, t, r) {
          var i = this;
          return this.suite.some(function (e) {
            return i.run(e, n, t, r);
          });
        }),
        t
      );
    })($),
    V =
      ((function (n) {
        var t = (n.exports = function (n, t) {
          return (
            (t = t || function () {}),
            function () {
              var r = !1,
                i = arguments,
                e = new Promise(function (t, e) {
                  var o,
                    u = n.apply(
                      {
                        async: function () {
                          return (
                            (r = !0),
                            function (n, r) {
                              n ? e(n) : t(r);
                            }
                          );
                        },
                      },
                      Array.prototype.slice.call(i)
                    );
                  r ||
                    (!(o = u) ||
                    ("object" != typeof o && "function" != typeof o) ||
                    "function" != typeof o.then
                      ? t(u)
                      : u.then(t, e));
                });
              return e.then(t.bind(null, null), t), e;
            }
          );
        });
        t.cb = function (n, r) {
          return t(function () {
            var t = Array.prototype.slice.call(arguments);
            return (
              t.length === n.length - 1 && t.push(this.async()),
              n.apply(this, t)
            );
          }, r);
        };
      })((I = { exports: {} })),
      I.exports),
    Y = function (n) {
      void 0 === n && (n = []),
        (this.logger = new u("@barba/core")),
        (this.all = []),
        (this.appear = []),
        (this.O = [
          { name: "namespace", type: "strings" },
          { name: "custom", type: "function" },
        ]),
        n && (this.all = this.all.concat(n)),
        this.k();
    };
  (Y.prototype.add = function (n, t) {
    switch (n) {
      case "rule":
        this.O.splice(t.position || 0, 0, t.value);
        break;
      case "transition":
      default:
        this.all.push(t);
    }
    this.k();
  }),
    (Y.prototype.resolve = function (n, t) {
      var r = this;
      void 0 === t && (t = {});
      var i = t.appear ? this.appear : this.all;
      i = i.filter(
        t.self
          ? function (n) {
              return n.name && "self" === n.name;
            }
          : function (n) {
              return !n.name || "self" !== n.name;
            }
      );
      var e = new Map(),
        o = i.find(function (i) {
          var o = !0,
            u = {};
          return (
            !(!t.self || "self" !== i.name) ||
            (r.O.reverse().forEach(function (e) {
              o &&
                ((o = r.C(i, e, n, u)),
                t.appear ||
                  (i.from &&
                    i.to &&
                    (o = r.C(i, e, n, u, "from") && r.C(i, e, n, u, "to")),
                  i.from && !i.to && (o = r.C(i, e, n, u, "from")),
                  !i.from && i.to && (o = r.C(i, e, n, u, "to"))));
            }),
            e.set(i, u),
            o)
          );
        }),
        u = e.get(o),
        f = [];
      return (
        f.push(t.appear ? "appear" : "page"),
        t.self && f.push("self"),
        u
          ? this.logger.info("Transition found [" + f.join(",") + "]", u)
          : this.logger.info("No transition found [" + f.join(",") + "]"),
        o
      );
    }),
    (Y.prototype.k = function () {
      var n = this;
      (this.all = this.all
        .map(function (t) {
          return n.L(t);
        })
        .sort(function (n, t) {
          return n.priority - t.priority;
        })
        .reverse()
        .map(function (n) {
          return delete n.priority, n;
        })),
        (this.appear = this.all.filter(function (n) {
          return n.appear;
        }));
    }),
    (Y.prototype.C = function (n, t, r, i, e) {
      var o = !0,
        u = !1,
        f = n,
        s = t.name,
        a = s,
        c = s,
        h = s,
        l = e ? f[e] : f,
        v = "to" === e ? r.next : r.current;
      if (e ? l && l[s] : l[s]) {
        switch (t.type) {
          case "strings":
          default:
            var p = Array.isArray(l[a]) ? l[a] : [l[a]];
            v[a] && -1 !== p.indexOf(v[a]) && (u = !0),
              -1 === p.indexOf(v[a]) && (o = !1);
            break;
          case "object":
            var d = Array.isArray(l[c]) ? l[c] : [l[c]];
            v[c] && v[c].name && -1 !== d.indexOf(v[c].name) && (u = !0),
              -1 === d.indexOf(v[c].name) && (o = !1);
            break;
          case "function":
            l[h](r) ? (u = !0) : (o = !1);
        }
        u && (e ? ((i[e] = i[e] || {}), (i[e][s] = f[e][s])) : (i[s] = f[s]));
      }
      return o;
    }),
    (Y.prototype.M = function (n, t, r) {
      var i = 0;
      return (
        (n[t] || (n.from && n.from[t]) || (n.to && n.to[t])) &&
          ((i += Math.pow(10, r)),
          n.from && n.from[t] && (i += 1),
          n.to && n.to[t] && (i += 2)),
        i
      );
    }),
    (Y.prototype.L = function (n) {
      var t = this;
      n.priority = 0;
      var r = 0;
      return (
        this.O.forEach(function (i, e) {
          r += t.M(n, i.name, e + 1);
        }),
        (n.priority = r),
        n
      );
    });
  var Z = function (n) {
      void 0 === n && (n = []),
        (this.logger = new u("@barba/core")),
        (this.S = !1),
        (this.store = new Y(n));
    },
    nn = {
      isRunning: { configurable: !0 },
      hasAppear: { configurable: !0 },
      hasSelf: { configurable: !0 },
      shouldWait: { configurable: !0 },
    };
  (Z.prototype.get = function (n, t) {
    return this.store.resolve(n, t);
  }),
    (nn.isRunning.get = function () {
      return this.S;
    }),
    (nn.hasAppear.get = function () {
      return this.store.appear.length > 0;
    }),
    (nn.hasSelf.get = function () {
      return this.store.all.some(function (n) {
        return "self" === n.name;
      });
    }),
    (nn.shouldWait.get = function () {
      return this.store.all.some(function (n) {
        return (n.to && !n.to.route) || n.sync;
      });
    }),
    (Z.prototype.doAppear = function (n) {
      var t = n.data,
        i = n.transition;
      try {
        var e = this;
        function o(n) {
          e.S = !1;
        }
        var u = i || {};
        e.S = !0;
        var f = r(
          function () {
            return Promise.resolve(e.$("beforeAppear", t, u)).then(function () {
              return Promise.resolve(e.q(t, u)).then(function () {
                return Promise.resolve(e.$("afterAppear", t, u)).then(
                  function () {}
                );
              });
            });
          },
          function (n) {
            return (
              e.logger.error(n),
              Promise.resolve(e.$("appearCanceled", t, u)).then(function () {
                throw new Error("Transition error [appear]");
              })
            );
          }
        );
        return f && f.then ? f.then(o) : o();
      } catch (n) {
        return Promise.reject(n);
      }
    }),
    (Z.prototype.doPage = function (n) {
      var t = n.data,
        i = n.transition,
        e = n.page,
        o = n.wrapper;
      try {
        var u = this;
        function f(n) {
          u.S = !1;
        }
        var s = i || {},
          a = !0 === s.sync || !1;
        u.S = !0;
        var c = r(
          function () {
            function n() {
              return Promise.resolve(u.$("before", t, s)).then(function () {
                function n(n) {
                  u.$("after", t, s);
                }
                var i = (function () {
                  if (a)
                    return r(
                      function () {
                        return (
                          u.N(t, o),
                          Promise.resolve(u.$("beforeLeave", t, s)).then(
                            function () {
                              return Promise.resolve(
                                u.$("beforeEnter", t, s)
                              ).then(function () {
                                return Promise.resolve(
                                  Promise.all([u.B(t, s), u.H(t, s)])
                                ).then(function () {
                                  return Promise.resolve(
                                    u.$("afterLeave", t, s)
                                  ).then(function () {
                                    return Promise.resolve(
                                      u.$("afterEnter", t, s)
                                    ).then(function () {
                                      u.I(t);
                                    });
                                  });
                                });
                              });
                            }
                          )
                        );
                      },
                      function () {
                        return Promise.resolve(u.$("leaveCanceled", t, s)).then(
                          function () {
                            return Promise.resolve(
                              u.$("enterCanceled", t, s)
                            ).then(function () {
                              throw new Error("Transition error [page][sync]");
                            });
                          }
                        );
                      }
                    );
                  {
                    function n(n) {
                      return r(
                        function () {
                          var n = (function () {
                            if (!1 !== i)
                              return Promise.resolve(
                                u.$("beforeEnter", t, s)
                              ).then(function () {
                                return (
                                  u.N(t, o),
                                  Promise.resolve(u.H(t, s, i)).then(
                                    function () {
                                      return Promise.resolve(
                                        u.$("afterEnter", t, s)
                                      ).then(function () {});
                                    }
                                  )
                                );
                              });
                          })();
                          if (n && n.then) return n.then(function () {});
                        },
                        function () {
                          return Promise.resolve(
                            u.$("leaveCanceled", t, s)
                          ).then(function () {
                            return Promise.resolve(
                              u.$("enterCanceled", t, s)
                            ).then(function () {
                              throw new Error("Transition error [page][enter]");
                            });
                          });
                        }
                      );
                    }
                    var i = !1,
                      f = r(
                        function () {
                          return Promise.resolve(u.$("beforeLeave", t, s)).then(
                            function () {
                              return Promise.resolve(
                                Promise.all([u.B(t, s), A(e, t.next)]).then(
                                  function (n) {
                                    return n[0];
                                  }
                                )
                              ).then(function (n) {
                                return (
                                  (i = n),
                                  Promise.resolve(u.$("afterLeave", t, s)).then(
                                    function () {
                                      u.I(t);
                                    }
                                  )
                                );
                              });
                            }
                          );
                        },
                        function () {
                          return Promise.resolve(
                            u.$("leaveCanceled", t, s)
                          ).then(function () {
                            throw new Error("Transition error [page][leave]");
                          });
                        }
                      );
                    return f && f.then ? f.then(n) : n();
                  }
                })();
                return i && i.then ? i.then(n) : n();
              });
            }
            var i = (function () {
              if (a) return Promise.resolve(A(e, t.next)).then(function () {});
            })();
            return i && i.then ? i.then(n) : n();
          },
          function (n) {
            throw (u.logger.error(n), new Error("Transition error"));
          }
        );
        return c && c.then ? c.then(f) : f();
      } catch (n) {
        return Promise.reject(n);
      }
    }),
    (Z.prototype.q = function (n, t) {
      return (
        s.do("appear", n, t), t.appear ? V(t.appear)(n) : Promise.resolve()
      );
    }),
    (Z.prototype.B = function (n, t) {
      return s.do("leave", n, t), t.leave ? V(t.leave)(n) : Promise.resolve();
    }),
    (Z.prototype.H = function (n, t, r) {
      return (
        s.do("enter", n, t), t.enter ? V(t.enter)(n, r) : Promise.resolve()
      );
    }),
    (Z.prototype.$ = function (n, t, r) {
      return s.do(n, t, r), r[n] ? V(r[n])(t) : Promise.resolve();
    }),
    (Z.prototype.N = function (n, t) {
      t.appendChild(n.next.container), s.do("nextAdded", n);
    }),
    (Z.prototype.I = function (n) {
      n.current.container.remove(), s.do("currentRemoved", n);
    }),
    Object.defineProperties(Z.prototype, nn);
  var tn = function (n) {
    var t = this;
    (this.names = [
      "beforeAppear",
      "afterAppear",
      "beforeLeave",
      "afterLeave",
      "beforeEnter",
      "afterEnter",
    ]),
      (this.byNamespace = new Map()),
      0 !== n.length &&
        (n.forEach(function (n) {
          t.byNamespace.set(n.namespace, n);
        }),
        this.names.forEach(function (n) {
          s[n](t.U(n), t);
        }),
        s.ready(this.U("beforeEnter"), this));
  };
  (tn.prototype.U = function (n) {
    var t = this;
    return function (r) {
      var i = n.match(/enter/i) ? r.next : r.current,
        e = t.byNamespace.get(i.namespace);
      e && e[n] && e[n](r);
    };
  }),
    Element.prototype.matches ||
      (Element.prototype.matches =
        Element.prototype.msMatchesSelector ||
        Element.prototype.webkitMatchesSelector),
    Element.prototype.closest ||
      (Element.prototype.closest = function (n) {
        var t = this;
        do {
          if (t.matches(n)) return t;
          t = t.parentElement || t.parentNode;
        } while (null !== t && 1 === t.nodeType);
        return null;
      });
  var rn = {
      container: void 0,
      html: void 0,
      namespace: void 0,
      url: { hash: void 0, href: void 0, path: void 0, query: {} },
    },
    en = function () {
      (this.version = "2.1.0"),
        (this.schemaPage = rn),
        (this.Logger = u),
        (this.logger = new u("@barba/core")),
        (this.plugins = []),
        (this.hooks = s),
        (this.dom = x),
        (this.helpers = j),
        (this.request = H),
        (this.url = S);
    },
    on = { data: { configurable: !0 }, wrapper: { configurable: !0 } };
  return (
    (en.prototype.use = function (n, t) {
      var r = this.plugins;
      r.indexOf(n) > -1
        ? this.logger.warn("Plugin [" + n.name + "] already installed.")
        : "function" == typeof n.install
        ? (n.install(this, t), r.push(n))
        : this.logger.warn("Plugin [" + n.name + '] has no "install" method.');
    }),
    (en.prototype.init = function (n) {
      void 0 === n && (n = {});
      var t = n.transitions;
      void 0 === t && (t = []);
      var r = n.views;
      void 0 === r && (r = []);
      var i = n.prevent;
      void 0 === i && (i = null);
      var e = n.timeout;
      void 0 === e && (e = 2e3);
      var o = n.requestError,
        f = n.cacheIgnore;
      void 0 === f && (f = !1);
      var s = n.prefetchIgnore;
      void 0 === s && (s = !1);
      var a = n.schema;
      void 0 === a && (a = P);
      var c = n.debug;
      void 0 === c && (c = !1);
      var h = n.logLevel;
      if (
        (void 0 === h && (h = "off"),
        u.setLevel(!0 === c ? "debug" : h),
        Object.keys(a).forEach(function (n) {
          P[n] && (P[n] = a[n]);
        }),
        (this.D = o),
        (this.timeout = e),
        (this.cacheIgnore = f),
        (this.prefetchIgnore = s),
        (this.X = this.dom.getWrapper()),
        !this.X)
      )
        throw new Error("[@barba/core] No Barba wrapper found");
      this.X.setAttribute("aria-live", "polite"), this._();
      var l = this.data.current;
      if (!l.container)
        throw new Error("[@barba/core] No Barba container found");
      if (
        ((this.history = new N()),
        (this.cache = new q(f)),
        (this.prevent = new K(s)),
        (this.transitions = new Z(t)),
        (this.views = new tn(r)),
        null !== i)
      ) {
        if ("function" != typeof i)
          throw new Error("[@barba/core] Prevent should be a function");
        this.prevent.add("preventCustom", i);
      }
      this.history.add(l.url.href, l.namespace),
        this.cache.set(l.url.href, Promise.resolve(l.html)),
        (this.F = this.F.bind(this)),
        (this.G = this.G.bind(this)),
        (this.W = this.W.bind(this)),
        this.J(),
        this.plugins.forEach(function (n) {
          return n.init();
        });
      var v = this.data;
      (v.trigger = "barba"),
        (v.next = v.current),
        this.hooks.do("ready", v),
        this.appear(),
        this._();
    }),
    (en.prototype.destroy = function () {
      this._(), this.K(), this.hooks.clear(), (this.plugins = []);
    }),
    (on.data.get = function () {
      return this.V;
    }),
    (on.wrapper.get = function () {
      return this.X;
    }),
    (en.prototype.force = function (n) {
      window.location.assign(n);
    }),
    (en.prototype.go = function (n, t, r) {
      var i;
      if (
        (void 0 === t && (t = "barba"),
        !(i =
          "popstate" === t
            ? this.history &&
              this.url.getPath(this.history.current.url) === this.url.getPath(n)
            : this.prevent.run("sameUrl", null, null, n)) ||
          this.transitions.hasSelf)
      )
        return (
          r && (r.stopPropagation(), r.preventDefault()), this.page(n, t, i)
        );
    }),
    (en.prototype.appear = function () {
      try {
        var n = this,
          t = (function () {
            if (n.transitions.hasAppear) {
              var t = r(
                function () {
                  var t = n.V,
                    r = n.transitions.get(t, { appear: !0 });
                  return Promise.resolve(
                    n.transitions.doAppear({ transition: r, data: t })
                  ).then(function () {});
                },
                function (t) {
                  n.logger.error(t);
                }
              );
              if (t && t.then) return t.then(function () {});
            }
          })();
        return t && t.then ? t.then(function () {}) : void 0;
      } catch (n) {
        return Promise.reject(n);
      }
    }),
    (en.prototype.page = function (n, t, i) {
      try {
        var e = this;
        function o() {
          "popstate" === t
            ? e.history.add(n, e.data.next.namespace)
            : e.history.push(n, e.data.next.namespace);
          var o = e.data;
          e.hooks.do("page", o);
          var f = r(
            function () {
              var n = e.transitions.get(o, { appear: !1, self: i });
              return Promise.resolve(
                e.transitions.doPage({
                  data: o,
                  page: u,
                  transition: n,
                  wrapper: e.X,
                })
              ).then(function () {
                e.Y(o), e._();
              });
            },
            function (n) {
              e.history.cancel(), e.logger.error(n);
            }
          );
          if (f && f.then) return f.then(function () {});
        }
        if (e.transitions.isRunning) return void e.force(n);
        (e.data.next.url = Object.assign({}, { href: n }, e.url.parse(n))),
          (e.data.trigger = t);
        var u = e.cache.has(n)
            ? e.cache.get(n)
            : e.cache.set(
                n,
                e.request(n, e.timeout, e.onRequestError.bind(e, t, "click"))
              ),
          f = (function () {
            if (e.transitions.shouldWait)
              return Promise.resolve(A(u, e.data.next)).then(function () {});
          })();
        return f && f.then ? f.then(o) : o();
      } catch (n) {
        return Promise.reject(n);
      }
    }),
    (en.prototype.onRequestError = function (n, t) {
      for (var r = [], i = arguments.length - 2; i-- > 0; )
        r[i] = arguments[i + 2];
      var e = r[0],
        o = r[1];
      return (
        this.cache.delete(e),
        !(
          (this.D && !1 === this.D(n, t, e, o)) ||
          ("click" === t && this.force(e), 1)
        )
      );
    }),
    (en.prototype.J = function () {
      !0 !== this.prefetchIgnore &&
        (document.addEventListener("mouseover", this.F),
        document.addEventListener("touchstart", this.F)),
        document.addEventListener("click", this.G),
        window.addEventListener("popstate", this.W);
    }),
    (en.prototype.K = function () {
      !0 !== this.prefetchIgnore &&
        (document.removeEventListener("mouseover", this.F),
        document.removeEventListener("touchstart", this.F)),
        document.removeEventListener("click", this.G),
        window.removeEventListener("popstate", this.W);
    }),
    (en.prototype.F = function (n) {
      var t = this,
        r = this.Z(n);
      if (r) {
        var i = this.dom.getHref(r);
        this.prevent.checkUrl(i) ||
          this.cache.has(i) ||
          this.cache.set(
            i,
            this.request(
              i,
              this.timeout,
              this.onRequestError.bind(this, r, "enter")
            ).catch(function (n) {
              t.logger.error(n);
            })
          );
      }
    }),
    (en.prototype.G = function (n) {
      var t = this.Z(n);
      t && this.go(this.dom.getHref(t), t, n);
    }),
    (en.prototype.W = function () {
      this.go(this.url.getHref(), "popstate");
    }),
    (en.prototype.Z = function (n) {
      for (var t = n.target; t && !this.dom.getHref(t); ) t = t.parentNode;
      if (t && !this.prevent.checkLink(t, n, t.href)) return t;
    }),
    (en.prototype._ = function () {
      var n = this.url.getHref(),
        t = {
          container: this.dom.getContainer(),
          html: this.dom.getHtml(),
          namespace: this.dom.getNamespace(),
          url: Object.assign({}, { href: n }, this.url.parse(n)),
        };
      (this.V = {
        current: t,
        next: Object.assign({}, this.schemaPage),
        trigger: void 0,
      }),
        this.hooks.do("reset", this.data);
    }),
    (en.prototype.Y = function (n) {
      var t = this.dom.toDocument(n.next.html);
      document.title = t.title;
    }),
    Object.defineProperties(en.prototype, on),
    new en()
  );
});
//# sourceMappingURL=barba.umd.js.map

// MAGNIFIC POPUP

!(function (a) {
  "function" == typeof define && define.amd
    ? define(["jquery"], a)
    : a(
        "object" == typeof exports
          ? require("jquery")
          : window.jQuery || window.Zepto
      );
})(function (a) {
  var b,
    c,
    d,
    e,
    f,
    g,
    h = "Close",
    i = "BeforeClose",
    j = "AfterClose",
    k = "BeforeAppend",
    l = "MarkupParse",
    m = "Open",
    n = "Change",
    o = "mfp",
    p = "." + o,
    q = "mfp-ready",
    r = "mfp-removing",
    s = "mfp-prevent-close",
    t = function () {},
    u = !!window.jQuery,
    v = a(window),
    w = function (a, c) {
      b.ev.on(o + a + p, c);
    },
    x = function (b, c, d, e) {
      var f = document.createElement("div");
      return (
        (f.className = "mfp-" + b),
        d && (f.innerHTML = d),
        e ? c && c.appendChild(f) : ((f = a(f)), c && f.appendTo(c)),
        f
      );
    },
    y = function (c, d) {
      b.ev.triggerHandler(o + c, d),
        b.st.callbacks &&
          ((c = c.charAt(0).toLowerCase() + c.slice(1)),
          b.st.callbacks[c] &&
            b.st.callbacks[c].apply(b, a.isArray(d) ? d : [d]));
    },
    z = function (c) {
      return (
        (c === g && b.currTemplate.closeBtn) ||
          ((b.currTemplate.closeBtn = a(
            b.st.closeMarkup.replace("%title%", b.st.tClose)
          )),
          (g = c)),
        b.currTemplate.closeBtn
      );
    },
    A = function () {
      a.magnificPopup.instance ||
        ((b = new t()), b.init(), (a.magnificPopup.instance = b));
    },
    B = function () {
      var a = document.createElement("p").style,
        b = ["ms", "O", "Moz", "Webkit"];
      if (void 0 !== a.transition) return !0;
      for (; b.length; ) if (b.pop() + "Transition" in a) return !0;
      return !1;
    };
  (t.prototype = {
    constructor: t,
    init: function () {
      var c = navigator.appVersion;
      (b.isIE7 = -1 !== c.indexOf("MSIE 7.")),
        (b.isIE8 = -1 !== c.indexOf("MSIE 8.")),
        (b.isLowIE = b.isIE7 || b.isIE8),
        (b.isAndroid = /android/gi.test(c)),
        (b.isIOS = /iphone|ipad|ipod/gi.test(c)),
        (b.supportsTransition = B()),
        (b.probablyMobile =
          b.isAndroid ||
          b.isIOS ||
          /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(
            navigator.userAgent
          )),
        (d = a(document)),
        (b.popupsCache = {});
    },
    open: function (c) {
      var e;
      if (c.isObj === !1) {
        (b.items = c.items.toArray()), (b.index = 0);
        var g,
          h = c.items;
        for (e = 0; e < h.length; e++)
          if (((g = h[e]), g.parsed && (g = g.el[0]), g === c.el[0])) {
            b.index = e;
            break;
          }
      } else
        (b.items = a.isArray(c.items) ? c.items : [c.items]),
          (b.index = c.index || 0);
      if (b.isOpen) return void b.updateItemHTML();
      (b.types = []),
        (f = ""),
        c.mainEl && c.mainEl.length ? (b.ev = c.mainEl.eq(0)) : (b.ev = d),
        c.key
          ? (b.popupsCache[c.key] || (b.popupsCache[c.key] = {}),
            (b.currTemplate = b.popupsCache[c.key]))
          : (b.currTemplate = {}),
        (b.st = a.extend(!0, {}, a.magnificPopup.defaults, c)),
        (b.fixedContentPos =
          "auto" === b.st.fixedContentPos
            ? !b.probablyMobile
            : b.st.fixedContentPos),
        b.st.modal &&
          ((b.st.closeOnContentClick = !1),
          (b.st.closeOnBgClick = !1),
          (b.st.showCloseBtn = !1),
          (b.st.enableEscapeKey = !1)),
        b.bgOverlay ||
          ((b.bgOverlay = x("bg").on("click" + p, function () {
            b.close();
          })),
          (b.wrap = x("wrap")
            .attr("tabindex", -1)
            .on("click" + p, function (a) {
              b._checkIfClose(a.target) && b.close();
            })),
          (b.container = x("container", b.wrap))),
        (b.contentContainer = x("content")),
        b.st.preloader &&
          (b.preloader = x("preloader", b.container, b.st.tLoading));
      var i = a.magnificPopup.modules;
      for (e = 0; e < i.length; e++) {
        var j = i[e];
        (j = j.charAt(0).toUpperCase() + j.slice(1)), b["init" + j].call(b);
      }
      y("BeforeOpen"),
        b.st.showCloseBtn &&
          (b.st.closeBtnInside
            ? (w(l, function (a, b, c, d) {
                c.close_replaceWith = z(d.type);
              }),
              (f += " mfp-close-btn-in"))
            : b.wrap.append(z())),
        b.st.alignTop && (f += " mfp-align-top"),
        b.fixedContentPos
          ? b.wrap.css({
              overflow: b.st.overflowY,
              overflowX: "hidden",
              overflowY: b.st.overflowY,
            })
          : b.wrap.css({ top: v.scrollTop(), position: "absolute" }),
        (b.st.fixedBgPos === !1 ||
          ("auto" === b.st.fixedBgPos && !b.fixedContentPos)) &&
          b.bgOverlay.css({ height: d.height(), position: "absolute" }),
        b.st.enableEscapeKey &&
          d.on("keyup" + p, function (a) {
            27 === a.keyCode && b.close();
          }),
        v.on("resize" + p, function () {
          b.updateSize();
        }),
        b.st.closeOnContentClick || (f += " mfp-auto-cursor"),
        f && b.wrap.addClass(f);
      var k = (b.wH = v.height()),
        n = {};
      if (b.fixedContentPos && b._hasScrollBar(k)) {
        var o = b._getScrollbarSize();
        o && (n.marginRight = o);
      }
      b.fixedContentPos &&
        (b.isIE7
          ? a("body, html").css("overflow", "hidden")
          : (n.overflow = "hidden"));
      var r = b.st.mainClass;
      return (
        b.isIE7 && (r += " mfp-ie7"),
        r && b._addClassToMFP(r),
        b.updateItemHTML(),
        y("BuildControls"),
        a("html").css(n),
        b.bgOverlay.add(b.wrap).prependTo(b.st.prependTo || a(document.body)),
        (b._lastFocusedEl = document.activeElement),
        setTimeout(function () {
          b.content
            ? (b._addClassToMFP(q), b._setFocus())
            : b.bgOverlay.addClass(q),
            d.on("focusin" + p, b._onFocusIn);
        }, 16),
        (b.isOpen = !0),
        b.updateSize(k),
        y(m),
        c
      );
    },
    close: function () {
      b.isOpen &&
        (y(i),
        (b.isOpen = !1),
        b.st.removalDelay && !b.isLowIE && b.supportsTransition
          ? (b._addClassToMFP(r),
            setTimeout(function () {
              b._close();
            }, b.st.removalDelay))
          : b._close());
    },
    _close: function () {
      y(h);
      var c = r + " " + q + " ";
      if (
        (b.bgOverlay.detach(),
        b.wrap.detach(),
        b.container.empty(),
        b.st.mainClass && (c += b.st.mainClass + " "),
        b._removeClassFromMFP(c),
        b.fixedContentPos)
      ) {
        var e = { marginRight: "" };
        b.isIE7 ? a("body, html").css("overflow", "") : (e.overflow = ""),
          a("html").css(e);
      }
      d.off("keyup" + p + " focusin" + p),
        b.ev.off(p),
        b.wrap.attr("class", "mfp-wrap").removeAttr("style"),
        b.bgOverlay.attr("class", "mfp-bg"),
        b.container.attr("class", "mfp-container"),
        !b.st.showCloseBtn ||
          (b.st.closeBtnInside && b.currTemplate[b.currItem.type] !== !0) ||
          (b.currTemplate.closeBtn && b.currTemplate.closeBtn.detach()),
        b.st.autoFocusLast && b._lastFocusedEl && a(b._lastFocusedEl).focus(),
        (b.currItem = null),
        (b.content = null),
        (b.currTemplate = null),
        (b.prevHeight = 0),
        y(j);
    },
    updateSize: function (a) {
      if (b.isIOS) {
        var c = document.documentElement.clientWidth / window.innerWidth,
          d = window.innerHeight * c;
        b.wrap.css("height", d), (b.wH = d);
      } else b.wH = a || v.height();
      b.fixedContentPos || b.wrap.css("height", b.wH), y("Resize");
    },
    updateItemHTML: function () {
      var c = b.items[b.index];
      b.contentContainer.detach(),
        b.content && b.content.detach(),
        c.parsed || (c = b.parseEl(b.index));
      var d = c.type;
      if (
        (y("BeforeChange", [b.currItem ? b.currItem.type : "", d]),
        (b.currItem = c),
        !b.currTemplate[d])
      ) {
        var f = b.st[d] ? b.st[d].markup : !1;
        y("FirstMarkupParse", f),
          f ? (b.currTemplate[d] = a(f)) : (b.currTemplate[d] = !0);
      }
      e && e !== c.type && b.container.removeClass("mfp-" + e + "-holder");
      var g = b["get" + d.charAt(0).toUpperCase() + d.slice(1)](
        c,
        b.currTemplate[d]
      );
      b.appendContent(g, d),
        (c.preloaded = !0),
        y(n, c),
        (e = c.type),
        b.container.prepend(b.contentContainer),
        y("AfterChange");
    },
    appendContent: function (a, c) {
      (b.content = a),
        a
          ? b.st.showCloseBtn && b.st.closeBtnInside && b.currTemplate[c] === !0
            ? b.content.find(".mfp-close").length || b.content.append(z())
            : (b.content = a)
          : (b.content = ""),
        y(k),
        b.container.addClass("mfp-" + c + "-holder"),
        b.contentContainer.append(b.content);
    },
    parseEl: function (c) {
      var d,
        e = b.items[c];
      if (
        (e.tagName
          ? (e = { el: a(e) })
          : ((d = e.type), (e = { data: e, src: e.src })),
        e.el)
      ) {
        for (var f = b.types, g = 0; g < f.length; g++)
          if (e.el.hasClass("mfp-" + f[g])) {
            d = f[g];
            break;
          }
        (e.src = e.el.attr("data-mfp-src")),
          e.src || (e.src = e.el.attr("href"));
      }
      return (
        (e.type = d || b.st.type || "inline"),
        (e.index = c),
        (e.parsed = !0),
        (b.items[c] = e),
        y("ElementParse", e),
        b.items[c]
      );
    },
    addGroup: function (a, c) {
      var d = function (d) {
        (d.mfpEl = this), b._openClick(d, a, c);
      };
      c || (c = {});
      var e = "click.magnificPopup";
      (c.mainEl = a),
        c.items
          ? ((c.isObj = !0), a.off(e).on(e, d))
          : ((c.isObj = !1),
            c.delegate
              ? a.off(e).on(e, c.delegate, d)
              : ((c.items = a), a.off(e).on(e, d)));
    },
    _openClick: function (c, d, e) {
      var f =
        void 0 !== e.midClick ? e.midClick : a.magnificPopup.defaults.midClick;
      if (
        f ||
        !(2 === c.which || c.ctrlKey || c.metaKey || c.altKey || c.shiftKey)
      ) {
        var g =
          void 0 !== e.disableOn
            ? e.disableOn
            : a.magnificPopup.defaults.disableOn;
        if (g)
          if (a.isFunction(g)) {
            if (!g.call(b)) return !0;
          } else if (v.width() < g) return !0;
        c.type && (c.preventDefault(), b.isOpen && c.stopPropagation()),
          (e.el = a(c.mfpEl)),
          e.delegate && (e.items = d.find(e.delegate)),
          b.open(e);
      }
    },
    updateStatus: function (a, d) {
      if (b.preloader) {
        c !== a && b.container.removeClass("mfp-s-" + c),
          d || "loading" !== a || (d = b.st.tLoading);
        var e = { status: a, text: d };
        y("UpdateStatus", e),
          (a = e.status),
          (d = e.text),
          b.preloader.html(d),
          b.preloader.find("a").on("click", function (a) {
            a.stopImmediatePropagation();
          }),
          b.container.addClass("mfp-s-" + a),
          (c = a);
      }
    },
    _checkIfClose: function (c) {
      if (!a(c).hasClass(s)) {
        var d = b.st.closeOnContentClick,
          e = b.st.closeOnBgClick;
        if (d && e) return !0;
        if (
          !b.content ||
          a(c).hasClass("mfp-close") ||
          (b.preloader && c === b.preloader[0])
        )
          return !0;
        if (c === b.content[0] || a.contains(b.content[0], c)) {
          if (d) return !0;
        } else if (e && a.contains(document, c)) return !0;
        return !1;
      }
    },
    _addClassToMFP: function (a) {
      b.bgOverlay.addClass(a), b.wrap.addClass(a);
    },
    _removeClassFromMFP: function (a) {
      this.bgOverlay.removeClass(a), b.wrap.removeClass(a);
    },
    _hasScrollBar: function (a) {
      return (
        (b.isIE7 ? d.height() : document.body.scrollHeight) > (a || v.height())
      );
    },
    _setFocus: function () {
      (b.st.focus ? b.content.find(b.st.focus).eq(0) : b.wrap).focus();
    },
    _onFocusIn: function (c) {
      return c.target === b.wrap[0] || a.contains(b.wrap[0], c.target)
        ? void 0
        : (b._setFocus(), !1);
    },
    _parseMarkup: function (b, c, d) {
      var e;
      d.data && (c = a.extend(d.data, c)),
        y(l, [b, c, d]),
        a.each(c, function (a, c) {
          if (void 0 === c || c === !1) return !0;
          if (((e = a.split("_")), e.length > 1)) {
            var d = b.find(p + "-" + e[0]);
            if (d.length > 0) {
              var f = e[1];
              "replaceWith" === f
                ? d[0] !== c[0] && d.replaceWith(c)
                : "img" === f
                ? d.is("img")
                  ? d.attr("src", c)
                  : d.replaceWith(
                      '<img src="' + c + '" class="' + d.attr("class") + '" />'
                    )
                : d.attr(e[1], c);
            }
          } else b.find(p + "-" + a).html(c);
        });
    },
    _getScrollbarSize: function () {
      if (void 0 === b.scrollbarSize) {
        var a = document.createElement("div");
        (a.style.cssText =
          "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;"),
          document.body.appendChild(a),
          (b.scrollbarSize = a.offsetWidth - a.clientWidth),
          document.body.removeChild(a);
      }
      return b.scrollbarSize;
    },
  }),
    (a.magnificPopup = {
      instance: null,
      proto: t.prototype,
      modules: [],
      open: function (b, c) {
        return (
          A(),
          (b = b ? a.extend(!0, {}, b) : {}),
          (b.isObj = !0),
          (b.index = c || 0),
          this.instance.open(b)
        );
      },
      close: function () {
        return a.magnificPopup.instance && a.magnificPopup.instance.close();
      },
      registerModule: function (b, c) {
        c.options && (a.magnificPopup.defaults[b] = c.options),
          a.extend(this.proto, c.proto),
          this.modules.push(b);
      },
      defaults: {
        disableOn: 0,
        key: null,
        midClick: !1,
        mainClass: "",
        preloader: !0,
        focus: "",
        closeOnContentClick: !1,
        closeOnBgClick: !0,
        closeBtnInside: !0,
        showCloseBtn: !0,
        enableEscapeKey: !0,
        modal: !1,
        alignTop: !1,
        removalDelay: 0,
        prependTo: null,
        fixedContentPos: "auto",
        fixedBgPos: "auto",
        overflowY: "auto",
        closeMarkup:
          '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
        tClose: "Close (Esc)",
        tLoading: "Loading...",
        autoFocusLast: !0,
      },
    }),
    (a.fn.magnificPopup = function (c) {
      A();
      var d = a(this);
      if ("string" == typeof c)
        if ("open" === c) {
          var e,
            f = u ? d.data("magnificPopup") : d[0].magnificPopup,
            g = parseInt(arguments[1], 10) || 0;
          f.items
            ? (e = f.items[g])
            : ((e = d), f.delegate && (e = e.find(f.delegate)), (e = e.eq(g))),
            b._openClick({ mfpEl: e }, d, f);
        } else
          b.isOpen && b[c].apply(b, Array.prototype.slice.call(arguments, 1));
      else
        (c = a.extend(!0, {}, c)),
          u ? d.data("magnificPopup", c) : (d[0].magnificPopup = c),
          b.addGroup(d, c);
      return d;
    });
  var C,
    D,
    E,
    F = "inline",
    G = function () {
      E && (D.after(E.addClass(C)).detach(), (E = null));
    };
  a.magnificPopup.registerModule(F, {
    options: {
      hiddenClass: "hide",
      markup: "",
      tNotFound: "Content not found",
    },
    proto: {
      initInline: function () {
        b.types.push(F),
          w(h + "." + F, function () {
            G();
          });
      },
      getInline: function (c, d) {
        if ((G(), c.src)) {
          var e = b.st.inline,
            f = a(c.src);
          if (f.length) {
            var g = f[0].parentNode;
            g &&
              g.tagName &&
              (D || ((C = e.hiddenClass), (D = x(C)), (C = "mfp-" + C)),
              (E = f.after(D).detach().removeClass(C))),
              b.updateStatus("ready");
          } else b.updateStatus("error", e.tNotFound), (f = a("<div>"));
          return (c.inlineElement = f), f;
        }
        return b.updateStatus("ready"), b._parseMarkup(d, {}, c), d;
      },
    },
  });
  var H,
    I = "ajax",
    J = function () {
      H && a(document.body).removeClass(H);
    },
    K = function () {
      J(), b.req && b.req.abort();
    };
  a.magnificPopup.registerModule(I, {
    options: {
      settings: null,
      cursor: "mfp-ajax-cur",
      tError: '<a href="%url%">The content</a> could not be loaded.',
    },
    proto: {
      initAjax: function () {
        b.types.push(I),
          (H = b.st.ajax.cursor),
          w(h + "." + I, K),
          w("BeforeChange." + I, K);
      },
      getAjax: function (c) {
        H && a(document.body).addClass(H), b.updateStatus("loading");
        var d = a.extend(
          {
            url: c.src,
            success: function (d, e, f) {
              var g = { data: d, xhr: f };
              y("ParseAjax", g),
                b.appendContent(a(g.data), I),
                (c.finished = !0),
                J(),
                b._setFocus(),
                setTimeout(function () {
                  b.wrap.addClass(q);
                }, 16),
                b.updateStatus("ready"),
                y("AjaxContentAdded");
            },
            error: function () {
              J(),
                (c.finished = c.loadError = !0),
                b.updateStatus(
                  "error",
                  b.st.ajax.tError.replace("%url%", c.src)
                );
            },
          },
          b.st.ajax.settings
        );
        return (b.req = a.ajax(d)), "";
      },
    },
  });
  var L,
    M = function (c) {
      if (c.data && void 0 !== c.data.title) return c.data.title;
      var d = b.st.image.titleSrc;
      if (d) {
        if (a.isFunction(d)) return d.call(b, c);
        if (c.el) return c.el.attr(d) || "";
      }
      return "";
    };
  a.magnificPopup.registerModule("image", {
    options: {
      markup:
        '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
      cursor: "mfp-zoom-out-cur",
      titleSrc: "title",
      verticalFit: !0,
      tError: '<a href="%url%">The image</a> could not be loaded.',
    },
    proto: {
      initImage: function () {
        var c = b.st.image,
          d = ".image";
        b.types.push("image"),
          w(m + d, function () {
            "image" === b.currItem.type &&
              c.cursor &&
              a(document.body).addClass(c.cursor);
          }),
          w(h + d, function () {
            c.cursor && a(document.body).removeClass(c.cursor),
              v.off("resize" + p);
          }),
          w("Resize" + d, b.resizeImage),
          b.isLowIE && w("AfterChange", b.resizeImage);
      },
      resizeImage: function () {
        var a = b.currItem;
        if (a && a.img && b.st.image.verticalFit) {
          var c = 0;
          b.isLowIE &&
            (c =
              parseInt(a.img.css("padding-top"), 10) +
              parseInt(a.img.css("padding-bottom"), 10)),
            a.img.css("max-height", b.wH - c);
        }
      },
      _onImageHasSize: function (a) {
        a.img &&
          ((a.hasSize = !0),
          L && clearInterval(L),
          (a.isCheckingImgSize = !1),
          y("ImageHasSize", a),
          a.imgHidden &&
            (b.content && b.content.removeClass("mfp-loading"),
            (a.imgHidden = !1)));
      },
      findImageSize: function (a) {
        var c = 0,
          d = a.img[0],
          e = function (f) {
            L && clearInterval(L),
              (L = setInterval(function () {
                return d.naturalWidth > 0
                  ? void b._onImageHasSize(a)
                  : (c > 200 && clearInterval(L),
                    c++,
                    void (3 === c
                      ? e(10)
                      : 40 === c
                      ? e(50)
                      : 100 === c && e(500)));
              }, f));
          };
        e(1);
      },
      getImage: function (c, d) {
        var e = 0,
          f = function () {
            c &&
              (c.img[0].complete
                ? (c.img.off(".mfploader"),
                  c === b.currItem &&
                    (b._onImageHasSize(c), b.updateStatus("ready")),
                  (c.hasSize = !0),
                  (c.loaded = !0),
                  y("ImageLoadComplete"))
                : (e++, 200 > e ? setTimeout(f, 100) : g()));
          },
          g = function () {
            c &&
              (c.img.off(".mfploader"),
              c === b.currItem &&
                (b._onImageHasSize(c),
                b.updateStatus("error", h.tError.replace("%url%", c.src))),
              (c.hasSize = !0),
              (c.loaded = !0),
              (c.loadError = !0));
          },
          h = b.st.image,
          i = d.find(".mfp-img");
        if (i.length) {
          var j = document.createElement("img");
          (j.className = "mfp-img"),
            c.el &&
              c.el.find("img").length &&
              (j.alt = c.el.find("img").attr("alt")),
            (c.img = a(j).on("load.mfploader", f).on("error.mfploader", g)),
            (j.src = c.src),
            i.is("img") && (c.img = c.img.clone()),
            (j = c.img[0]),
            j.naturalWidth > 0 ? (c.hasSize = !0) : j.width || (c.hasSize = !1);
        }
        return (
          b._parseMarkup(d, { title: M(c), img_replaceWith: c.img }, c),
          b.resizeImage(),
          c.hasSize
            ? (L && clearInterval(L),
              c.loadError
                ? (d.addClass("mfp-loading"),
                  b.updateStatus("error", h.tError.replace("%url%", c.src)))
                : (d.removeClass("mfp-loading"), b.updateStatus("ready")),
              d)
            : (b.updateStatus("loading"),
              (c.loading = !0),
              c.hasSize ||
                ((c.imgHidden = !0),
                d.addClass("mfp-loading"),
                b.findImageSize(c)),
              d)
        );
      },
    },
  });
  var N,
    O = function () {
      return (
        void 0 === N &&
          (N = void 0 !== document.createElement("p").style.MozTransform),
        N
      );
    };
  a.magnificPopup.registerModule("zoom", {
    options: {
      enabled: !1,
      easing: "ease-in-out",
      duration: 300,
      opener: function (a) {
        return a.is("img") ? a : a.find("img");
      },
    },
    proto: {
      initZoom: function () {
        var a,
          c = b.st.zoom,
          d = ".zoom";
        if (c.enabled && b.supportsTransition) {
          var e,
            f,
            g = c.duration,
            j = function (a) {
              var b = a
                  .clone()
                  .removeAttr("style")
                  .removeAttr("class")
                  .addClass("mfp-animated-image"),
                d = "all " + c.duration / 1e3 + "s " + c.easing,
                e = {
                  position: "fixed",
                  zIndex: 9999,
                  left: 0,
                  top: 0,
                  "-webkit-backface-visibility": "hidden",
                },
                f = "transition";
              return (
                (e["-webkit-" + f] = e["-moz-" + f] = e["-o-" + f] = e[f] = d),
                b.css(e),
                b
              );
            },
            k = function () {
              b.content.css("visibility", "visible");
            };
          w("BuildControls" + d, function () {
            if (b._allowZoom()) {
              if (
                (clearTimeout(e),
                b.content.css("visibility", "hidden"),
                (a = b._getItemToZoom()),
                !a)
              )
                return void k();
              (f = j(a)),
                f.css(b._getOffset()),
                b.wrap.append(f),
                (e = setTimeout(function () {
                  f.css(b._getOffset(!0)),
                    (e = setTimeout(function () {
                      k(),
                        setTimeout(function () {
                          f.remove(), (a = f = null), y("ZoomAnimationEnded");
                        }, 16);
                    }, g));
                }, 16));
            }
          }),
            w(i + d, function () {
              if (b._allowZoom()) {
                if ((clearTimeout(e), (b.st.removalDelay = g), !a)) {
                  if (((a = b._getItemToZoom()), !a)) return;
                  f = j(a);
                }
                f.css(b._getOffset(!0)),
                  b.wrap.append(f),
                  b.content.css("visibility", "hidden"),
                  setTimeout(function () {
                    f.css(b._getOffset());
                  }, 16);
              }
            }),
            w(h + d, function () {
              b._allowZoom() && (k(), f && f.remove(), (a = null));
            });
        }
      },
      _allowZoom: function () {
        return "image" === b.currItem.type;
      },
      _getItemToZoom: function () {
        return b.currItem.hasSize ? b.currItem.img : !1;
      },
      _getOffset: function (c) {
        var d;
        d = c ? b.currItem.img : b.st.zoom.opener(b.currItem.el || b.currItem);
        var e = d.offset(),
          f = parseInt(d.css("padding-top"), 10),
          g = parseInt(d.css("padding-bottom"), 10);
        e.top -= a(window).scrollTop() - f;
        var h = {
          width: d.width(),
          height: (u ? d.innerHeight() : d[0].offsetHeight) - g - f,
        };
        return (
          O()
            ? (h["-moz-transform"] = h.transform =
                "translate(" + e.left + "px," + e.top + "px)")
            : ((h.left = e.left), (h.top = e.top)),
          h
        );
      },
    },
  });
  var P = "iframe",
    Q = "//about:blank",
    R = function (a) {
      if (b.currTemplate[P]) {
        var c = b.currTemplate[P].find("iframe");
        c.length &&
          (a || (c[0].src = Q),
          b.isIE8 && c.css("display", a ? "block" : "none"));
      }
    };
  a.magnificPopup.registerModule(P, {
    options: {
      markup:
        '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
      srcAction: "iframe_src",
      patterns: {
        youtube: {
          index: "youtube.com",
          id: "v=",
          src: "//www.youtube.com/embed/%id%?autoplay=1",
        },
        vimeo: {
          index: "vimeo.com/",
          id: "/",
          src: "//player.vimeo.com/video/%id%?autoplay=1",
        },
        gmaps: { index: "//maps.google.", src: "%id%&output=embed" },
      },
    },
    proto: {
      initIframe: function () {
        b.types.push(P),
          w("BeforeChange", function (a, b, c) {
            b !== c && (b === P ? R() : c === P && R(!0));
          }),
          w(h + "." + P, function () {
            R();
          });
      },
      getIframe: function (c, d) {
        var e = c.src,
          f = b.st.iframe;
        a.each(f.patterns, function () {
          return e.indexOf(this.index) > -1
            ? (this.id &&
                (e =
                  "string" == typeof this.id
                    ? e.substr(
                        e.lastIndexOf(this.id) + this.id.length,
                        e.length
                      )
                    : this.id.call(this, e)),
              (e = this.src.replace("%id%", e)),
              !1)
            : void 0;
        });
        var g = {};
        return (
          f.srcAction && (g[f.srcAction] = e),
          b._parseMarkup(d, g, c),
          b.updateStatus("ready"),
          d
        );
      },
    },
  });
  var S = function (a) {
      var c = b.items.length;
      return a > c - 1 ? a - c : 0 > a ? c + a : a;
    },
    T = function (a, b, c) {
      return a.replace(/%curr%/gi, b + 1).replace(/%total%/gi, c);
    };
  a.magnificPopup.registerModule("gallery", {
    options: {
      enabled: !1,
      arrowMarkup:
        '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
      preload: [0, 2],
      navigateByImgClick: !0,
      arrows: !0,
      tPrev: "Previous (Left arrow key)",
      tNext: "Next (Right arrow key)",
      tCounter: "%curr% of %total%",
    },
    proto: {
      initGallery: function () {
        var c = b.st.gallery,
          e = ".mfp-gallery",
          g = Boolean(a.fn.mfpFastClick);
        return (
          (b.direction = !0),
          c && c.enabled
            ? ((f += " mfp-gallery"),
              w(m + e, function () {
                c.navigateByImgClick &&
                  b.wrap.on("click" + e, ".mfp-img", function () {
                    return b.items.length > 1 ? (b.next(), !1) : void 0;
                  }),
                  d.on("keydown" + e, function (a) {
                    37 === a.keyCode ? b.prev() : 39 === a.keyCode && b.next();
                  });
              }),
              w("UpdateStatus" + e, function (a, c) {
                c.text &&
                  (c.text = T(c.text, b.currItem.index, b.items.length));
              }),
              w(l + e, function (a, d, e, f) {
                var g = b.items.length;
                e.counter = g > 1 ? T(c.tCounter, f.index, g) : "";
              }),
              w("BuildControls" + e, function () {
                if (b.items.length > 1 && c.arrows && !b.arrowLeft) {
                  var d = c.arrowMarkup,
                    e = (b.arrowLeft = a(
                      d.replace(/%title%/gi, c.tPrev).replace(/%dir%/gi, "left")
                    ).addClass(s)),
                    f = (b.arrowRight = a(
                      d
                        .replace(/%title%/gi, c.tNext)
                        .replace(/%dir%/gi, "right")
                    ).addClass(s)),
                    h = g ? "mfpFastClick" : "click";
                  e[h](function () {
                    b.prev();
                  }),
                    f[h](function () {
                      b.next();
                    }),
                    b.isIE7 &&
                      (x("b", e[0], !1, !0),
                      x("a", e[0], !1, !0),
                      x("b", f[0], !1, !0),
                      x("a", f[0], !1, !0)),
                    b.container.append(e.add(f));
                }
              }),
              w(n + e, function () {
                b._preloadTimeout && clearTimeout(b._preloadTimeout),
                  (b._preloadTimeout = setTimeout(function () {
                    b.preloadNearbyImages(), (b._preloadTimeout = null);
                  }, 16));
              }),
              void w(h + e, function () {
                d.off(e),
                  b.wrap.off("click" + e),
                  b.arrowLeft &&
                    g &&
                    b.arrowLeft.add(b.arrowRight).destroyMfpFastClick(),
                  (b.arrowRight = b.arrowLeft = null);
              }))
            : !1
        );
      },
      next: function () {
        (b.direction = !0), (b.index = S(b.index + 1)), b.updateItemHTML();
      },
      prev: function () {
        (b.direction = !1), (b.index = S(b.index - 1)), b.updateItemHTML();
      },
      goTo: function (a) {
        (b.direction = a >= b.index), (b.index = a), b.updateItemHTML();
      },
      preloadNearbyImages: function () {
        var a,
          c = b.st.gallery.preload,
          d = Math.min(c[0], b.items.length),
          e = Math.min(c[1], b.items.length);
        for (a = 1; a <= (b.direction ? e : d); a++)
          b._preloadItem(b.index + a);
        for (a = 1; a <= (b.direction ? d : e); a++)
          b._preloadItem(b.index - a);
      },
      _preloadItem: function (c) {
        if (((c = S(c)), !b.items[c].preloaded)) {
          var d = b.items[c];
          d.parsed || (d = b.parseEl(c)),
            y("LazyLoad", d),
            "image" === d.type &&
              (d.img = a('<img class="mfp-img" />')
                .on("load.mfploader", function () {
                  d.hasSize = !0;
                })
                .on("error.mfploader", function () {
                  (d.hasSize = !0), (d.loadError = !0), y("LazyLoadError", d);
                })
                .attr("src", d.src)),
            (d.preloaded = !0);
        }
      },
    },
  });
  var U = "retina";
  a.magnificPopup.registerModule(U, {
    options: {
      replaceSrc: function (a) {
        return a.src.replace(/\.\w+$/, function (a) {
          return "@2x" + a;
        });
      },
      ratio: 1,
    },
    proto: {
      initRetina: function () {
        if (window.devicePixelRatio > 1) {
          var a = b.st.retina,
            c = a.ratio;
          (c = isNaN(c) ? c() : c),
            c > 1 &&
              (w("ImageHasSize." + U, function (a, b) {
                b.img.css({
                  "max-width": b.img[0].naturalWidth / c,
                  width: "100%",
                });
              }),
              w("ElementParse." + U, function (b, d) {
                d.src = a.replaceSrc(d, c);
              }));
        }
      },
    },
  }),
    (function () {
      var b = 1e3,
        c = "ontouchstart" in window,
        d = function () {
          v.off("touchmove" + f + " touchend" + f);
        },
        e = "mfpFastClick",
        f = "." + e;
      (a.fn.mfpFastClick = function (e) {
        return a(this).each(function () {
          var g,
            h = a(this);
          if (c) {
            var i, j, k, l, m, n;
            h.on("touchstart" + f, function (a) {
              (l = !1),
                (n = 1),
                (m = a.originalEvent
                  ? a.originalEvent.touches[0]
                  : a.touches[0]),
                (j = m.clientX),
                (k = m.clientY),
                v
                  .on("touchmove" + f, function (a) {
                    (m = a.originalEvent ? a.originalEvent.touches : a.touches),
                      (n = m.length),
                      (m = m[0]),
                      (Math.abs(m.clientX - j) > 10 ||
                        Math.abs(m.clientY - k) > 10) &&
                        ((l = !0), d());
                  })
                  .on("touchend" + f, function (a) {
                    d(),
                      l ||
                        n > 1 ||
                        ((g = !0),
                        a.preventDefault(),
                        clearTimeout(i),
                        (i = setTimeout(function () {
                          g = !1;
                        }, b)),
                        e());
                  });
            });
          }
          h.on("click" + f, function () {
            g || e();
          });
        });
      }),
        (a.fn.destroyMfpFastClick = function () {
          a(this).off("touchstart" + f + " click" + f),
            c && v.off("touchmove" + f + " touchend" + f);
        });
    })(),
    A();
});

/*! ScrollMagic v2.0.7 | (c) 2019 Jan Paepke (@janpaepke) | license & info: http://scrollmagic.io */
!(function (e, t) {
  "function" == typeof define && define.amd
    ? define(t)
    : "object" == typeof exports
    ? (module.exports = t())
    : (e.ScrollMagic = t());
})(this, function () {
  "use strict";
  var _ = function () {};
  (_.version = "2.0.7"), window.addEventListener("mousewheel", function () {});
  var P = "data-scrollmagic-pin-spacer";
  _.Controller = function (e) {
    var n,
      r,
      i = "REVERSE",
      t = "PAUSED",
      o = z.defaults,
      s = this,
      a = R.extend({}, o, e),
      l = [],
      c = !1,
      f = 0,
      u = t,
      d = !0,
      h = 0,
      p = !0,
      g = function () {
        0 < a.refreshInterval && (r = window.setTimeout(E, a.refreshInterval));
      },
      v = function () {
        return a.vertical
          ? R.get.scrollTop(a.container)
          : R.get.scrollLeft(a.container);
      },
      m = function () {
        return a.vertical
          ? R.get.height(a.container)
          : R.get.width(a.container);
      },
      w = (this._setScrollPos = function (e) {
        a.vertical
          ? d
            ? window.scrollTo(R.get.scrollLeft(), e)
            : (a.container.scrollTop = e)
          : d
          ? window.scrollTo(e, R.get.scrollTop())
          : (a.container.scrollLeft = e);
      }),
      y = function () {
        if (p && c) {
          var e = R.type.Array(c) ? c : l.slice(0);
          c = !1;
          var t = f,
            n = (f = s.scrollPos()) - t;
          0 !== n && (u = 0 < n ? "FORWARD" : i),
            u === i && e.reverse(),
            e.forEach(function (e, t) {
              e.update(!0);
            });
        }
      },
      S = function () {
        n = R.rAF(y);
      },
      b = function (e) {
        "resize" == e.type && ((h = m()), (u = t)), !0 !== c && ((c = !0), S());
      },
      E = function () {
        if (!d && h != m()) {
          var t;
          try {
            t = new Event("resize", { bubbles: !1, cancelable: !1 });
          } catch (e) {
            (t = document.createEvent("Event")).initEvent("resize", !1, !1);
          }
          a.container.dispatchEvent(t);
        }
        l.forEach(function (e, t) {
          e.refresh();
        }),
          g();
      };
    this._options = a;
    var x = function (e) {
      if (e.length <= 1) return e;
      var t = e.slice(0);
      return (
        t.sort(function (e, t) {
          return e.scrollOffset() > t.scrollOffset() ? 1 : -1;
        }),
        t
      );
    };
    return (
      (this.addScene = function (e) {
        if (R.type.Array(e))
          e.forEach(function (e, t) {
            s.addScene(e);
          });
        else if (e instanceof _.Scene)
          if (e.controller() !== s) e.addTo(s);
          else if (l.indexOf(e) < 0)
            for (var t in (l.push(e),
            (l = x(l)),
            e.on("shift.controller_sort", function () {
              l = x(l);
            }),
            a.globalSceneOptions))
              e[t] && e[t].call(e, a.globalSceneOptions[t]);
        return s;
      }),
      (this.removeScene = function (e) {
        if (R.type.Array(e))
          e.forEach(function (e, t) {
            s.removeScene(e);
          });
        else {
          var t = l.indexOf(e);
          -1 < t &&
            (e.off("shift.controller_sort"), l.splice(t, 1), e.remove());
        }
        return s;
      }),
      (this.updateScene = function (e, n) {
        return (
          R.type.Array(e)
            ? e.forEach(function (e, t) {
                s.updateScene(e, n);
              })
            : n
            ? e.update(!0)
            : !0 !== c &&
              e instanceof _.Scene &&
              (-1 == (c = c || []).indexOf(e) && c.push(e), (c = x(c)), S()),
          s
        );
      }),
      (this.update = function (e) {
        return b({ type: "resize" }), e && y(), s;
      }),
      (this.scrollTo = function (e, t) {
        if (R.type.Number(e)) w.call(a.container, e, t);
        else if (e instanceof _.Scene)
          e.controller() === s && s.scrollTo(e.scrollOffset(), t);
        else if (R.type.Function(e)) w = e;
        else {
          var n = R.get.elements(e)[0];
          if (n) {
            for (; n.parentNode.hasAttribute(P); ) n = n.parentNode;
            var r = a.vertical ? "top" : "left",
              i = R.get.offset(a.container),
              o = R.get.offset(n);
            d || (i[r] -= s.scrollPos()), s.scrollTo(o[r] - i[r], t);
          }
        }
        return s;
      }),
      (this.scrollPos = function (e) {
        return arguments.length
          ? (R.type.Function(e) && (v = e), s)
          : v.call(s);
      }),
      (this.info = function (e) {
        var t = {
          size: h,
          vertical: a.vertical,
          scrollPos: f,
          scrollDirection: u,
          container: a.container,
          isDocument: d,
        };
        return arguments.length ? (void 0 !== t[e] ? t[e] : void 0) : t;
      }),
      (this.loglevel = function (e) {
        return s;
      }),
      (this.enabled = function (e) {
        return arguments.length
          ? (p != e && ((p = !!e), s.updateScene(l, !0)), s)
          : p;
      }),
      (this.destroy = function (e) {
        window.clearTimeout(r);
        for (var t = l.length; t--; ) l[t].destroy(e);
        return (
          a.container.removeEventListener("resize", b),
          a.container.removeEventListener("scroll", b),
          R.cAF(n),
          null
        );
      }),
      (function () {
        for (var e in a) o.hasOwnProperty(e) || delete a[e];
        if (((a.container = R.get.elements(a.container)[0]), !a.container))
          throw "ScrollMagic.Controller init failed.";
        (d =
          a.container === window ||
          a.container === document.body ||
          !document.body.contains(a.container)) && (a.container = window),
          (h = m()),
          a.container.addEventListener("resize", b),
          a.container.addEventListener("scroll", b);
        var t = parseInt(a.refreshInterval, 10);
        (a.refreshInterval = R.type.Number(t) ? t : o.refreshInterval), g();
      })(),
      s
    );
  };
  var z = {
    defaults: {
      container: window,
      vertical: !0,
      globalSceneOptions: {},
      loglevel: 2,
      refreshInterval: 100,
    },
  };
  (_.Controller.addOption = function (e, t) {
    z.defaults[e] = t;
  }),
    (_.Controller.extend = function (e) {
      var t = this;
      (_.Controller = function () {
        return (
          t.apply(this, arguments),
          (this.$super = R.extend({}, this)),
          e.apply(this, arguments) || this
        );
      }),
        R.extend(_.Controller, t),
        (_.Controller.prototype = t.prototype),
        (_.Controller.prototype.constructor = _.Controller);
    }),
    (_.Scene = function (e) {
      var n,
        l,
        c = "BEFORE",
        f = "DURING",
        u = "AFTER",
        r = D.defaults,
        d = this,
        h = R.extend({}, r, e),
        p = c,
        g = 0,
        a = { start: 0, end: 0 },
        v = 0,
        i = !0,
        s = {};
      (this.on = function (e, i) {
        return (
          R.type.Function(i) &&
            (e = e.trim().split(" ")).forEach(function (e) {
              var t = e.split("."),
                n = t[0],
                r = t[1];
              "*" != n &&
                (s[n] || (s[n] = []),
                s[n].push({ namespace: r || "", callback: i }));
            }),
          d
        );
      }),
        (this.off = function (e, o) {
          return (
            e &&
              (e = e.trim().split(" ")).forEach(function (e, t) {
                var n = e.split("."),
                  r = n[0],
                  i = n[1] || "";
                ("*" === r ? Object.keys(s) : [r]).forEach(function (e) {
                  for (var t = s[e] || [], n = t.length; n--; ) {
                    var r = t[n];
                    !r ||
                      (i !== r.namespace && "*" !== i) ||
                      (o && o != r.callback) ||
                      t.splice(n, 1);
                  }
                  t.length || delete s[e];
                });
              }),
            d
          );
        }),
        (this.trigger = function (e, n) {
          if (e) {
            var t = e.trim().split("."),
              r = t[0],
              i = t[1],
              o = s[r];
            o &&
              o.forEach(function (e, t) {
                (i && i !== e.namespace) ||
                  e.callback.call(d, new _.Event(r, e.namespace, d, n));
              });
          }
          return d;
        }),
        d
          .on("change.internal", function (e) {
            "loglevel" !== e.what &&
              "tweenChanges" !== e.what &&
              ("triggerElement" === e.what
                ? y()
                : "reverse" === e.what && d.update());
          })
          .on("shift.internal", function (e) {
            t(), d.update();
          }),
        (this.addTo = function (e) {
          return (
            e instanceof _.Controller &&
              l != e &&
              (l && l.removeScene(d),
              (l = e),
              E(),
              o(!0),
              y(!0),
              t(),
              l.info("container").addEventListener("resize", S),
              e.addScene(d),
              d.trigger("add", { controller: l }),
              d.update()),
            d
          );
        }),
        (this.enabled = function (e) {
          return arguments.length
            ? (i != e && ((i = !!e), d.update(!0)), d)
            : i;
        }),
        (this.remove = function () {
          if (l) {
            l.info("container").removeEventListener("resize", S);
            var e = l;
            (l = void 0), e.removeScene(d), d.trigger("remove");
          }
          return d;
        }),
        (this.destroy = function (e) {
          return (
            d.trigger("destroy", { reset: e }), d.remove(), d.off("*.*"), null
          );
        }),
        (this.update = function (e) {
          if (l)
            if (e)
              if (l.enabled() && i) {
                var t,
                  n = l.info("scrollPos");
                (t =
                  0 < h.duration
                    ? (n - a.start) / (a.end - a.start)
                    : n >= a.start
                    ? 1
                    : 0),
                  d.trigger("update", {
                    startPos: a.start,
                    endPos: a.end,
                    scrollPos: n,
                  }),
                  d.progress(t);
              } else m && p === f && C(!0);
            else l.updateScene(d, !1);
          return d;
        }),
        (this.refresh = function () {
          return o(), y(), d;
        }),
        (this.progress = function (e) {
          if (arguments.length) {
            var t = !1,
              n = p,
              r = l ? l.info("scrollDirection") : "PAUSED",
              i = h.reverse || g <= e;
            if (
              (0 === h.duration
                ? ((t = g != e), (p = 0 === (g = e < 1 && i ? 0 : 1) ? c : f))
                : e < 0 && p !== c && i
                ? ((p = c), (t = !(g = 0)))
                : 0 <= e && e < 1 && i
                ? ((g = e), (p = f), (t = !0))
                : 1 <= e && p !== u
                ? ((g = 1), (p = u), (t = !0))
                : p !== f || i || C(),
              t)
            ) {
              var o = { progress: g, state: p, scrollDirection: r },
                s = p != n,
                a = function (e) {
                  d.trigger(e, o);
                };
              s && n !== f && (a("enter"), a(n === c ? "start" : "end")),
                a("progress"),
                s && p !== f && (a(p === c ? "start" : "end"), a("leave"));
            }
            return d;
          }
          return g;
        });
      var m,
        w,
        t = function () {
          (a = { start: v + h.offset }),
            l &&
              h.triggerElement &&
              (a.start -= l.info("size") * h.triggerHook),
            (a.end = a.start + h.duration);
        },
        o = function (e) {
          if (n) {
            var t = "duration";
            x(t, n.call(d)) &&
              !e &&
              (d.trigger("change", { what: t, newval: h[t] }),
              d.trigger("shift", { reason: t }));
          }
        },
        y = function (e) {
          var t = 0,
            n = h.triggerElement;
          if (l && (n || 0 < v)) {
            if (n)
              if (n.parentNode) {
                for (
                  var r = l.info(),
                    i = R.get.offset(r.container),
                    o = r.vertical ? "top" : "left";
                  n.parentNode.hasAttribute(P);

                )
                  n = n.parentNode;
                var s = R.get.offset(n);
                r.isDocument || (i[o] -= l.scrollPos()), (t = s[o] - i[o]);
              } else d.triggerElement(void 0);
            var a = t != v;
            (v = t),
              a &&
                !e &&
                d.trigger("shift", { reason: "triggerElementPosition" });
          }
        },
        S = function (e) {
          0 < h.triggerHook &&
            d.trigger("shift", { reason: "containerResize" });
        },
        b = R.extend(D.validate, {
          duration: function (t) {
            if (R.type.String(t) && t.match(/^(\.|\d)*\d+%$/)) {
              var e = parseFloat(t) / 100;
              t = function () {
                return l ? l.info("size") * e : 0;
              };
            }
            if (R.type.Function(t)) {
              n = t;
              try {
                t = parseFloat(n.call(d));
              } catch (e) {
                t = -1;
              }
            }
            if (((t = parseFloat(t)), !R.type.Number(t) || t < 0))
              throw (n && (n = void 0), 0);
            return t;
          },
        }),
        E = function (e) {
          (e = arguments.length ? [e] : Object.keys(b)).forEach(function (
            t,
            e
          ) {
            var n;
            if (b[t])
              try {
                n = b[t](h[t]);
              } catch (e) {
                n = r[t];
              } finally {
                h[t] = n;
              }
          });
        },
        x = function (e, t) {
          var n = !1,
            r = h[e];
          return h[e] != t && ((h[e] = t), E(e), (n = r != h[e])), n;
        },
        z = function (t) {
          d[t] ||
            (d[t] = function (e) {
              return arguments.length
                ? ("duration" === t && (n = void 0),
                  x(t, e) &&
                    (d.trigger("change", { what: t, newval: h[t] }),
                    -1 < D.shifts.indexOf(t) &&
                      d.trigger("shift", { reason: t })),
                  d)
                : h[t];
            });
        };
      (this.controller = function () {
        return l;
      }),
        (this.state = function () {
          return p;
        }),
        (this.scrollOffset = function () {
          return a.start;
        }),
        (this.triggerPosition = function () {
          var e = h.offset;
          return (
            l &&
              (h.triggerElement
                ? (e += v)
                : (e += l.info("size") * d.triggerHook())),
            e
          );
        }),
        d
          .on("shift.internal", function (e) {
            var t = "duration" === e.reason;
            ((p === u && t) || (p === f && 0 === h.duration)) && C(), t && F();
          })
          .on("progress.internal", function (e) {
            C();
          })
          .on("add.internal", function (e) {
            F();
          })
          .on("destroy.internal", function (e) {
            d.removePin(e.reset);
          });
      var C = function (e) {
          if (m && l) {
            var t = l.info(),
              n = w.spacer.firstChild;
            if (e || p !== f) {
              var r = {
                  position: w.inFlow ? "relative" : "absolute",
                  top: 0,
                  left: 0,
                },
                i = R.css(n, "position") != r.position;
              w.pushFollowers
                ? 0 < h.duration &&
                  (p === u && 0 === parseFloat(R.css(w.spacer, "padding-top"))
                    ? (i = !0)
                    : p === c &&
                      0 === parseFloat(R.css(w.spacer, "padding-bottom")) &&
                      (i = !0))
                : (r[t.vertical ? "top" : "left"] = h.duration * g),
                R.css(n, r),
                i && F();
            } else {
              "fixed" != R.css(n, "position") &&
                (R.css(n, { position: "fixed" }), F());
              var o = R.get.offset(w.spacer, !0),
                s =
                  h.reverse || 0 === h.duration
                    ? t.scrollPos - a.start
                    : Math.round(g * h.duration * 10) / 10;
              (o[t.vertical ? "top" : "left"] += s),
                R.css(w.spacer.firstChild, { top: o.top, left: o.left });
            }
          }
        },
        F = function () {
          if (m && l && w.inFlow) {
            var e = p === f,
              t = l.info("vertical"),
              n = w.spacer.firstChild,
              r = R.isMarginCollapseType(R.css(w.spacer, "display")),
              i = {};
            w.relSize.width || w.relSize.autoFullWidth
              ? e
                ? R.css(m, { width: R.get.width(w.spacer) })
                : R.css(m, { width: "100%" })
              : ((i["min-width"] = R.get.width(t ? m : n, !0, !0)),
                (i.width = e ? i["min-width"] : "auto")),
              w.relSize.height
                ? e
                  ? R.css(m, {
                      height:
                        R.get.height(w.spacer) -
                        (w.pushFollowers ? h.duration : 0),
                    })
                  : R.css(m, { height: "100%" })
                : ((i["min-height"] = R.get.height(t ? n : m, !0, !r)),
                  (i.height = e ? i["min-height"] : "auto")),
              w.pushFollowers &&
                ((i["padding" + (t ? "Top" : "Left")] = h.duration * g),
                (i["padding" + (t ? "Bottom" : "Right")] =
                  h.duration * (1 - g))),
              R.css(w.spacer, i);
          }
        },
        L = function () {
          l && m && p === f && !l.info("isDocument") && C();
        },
        T = function () {
          l &&
            m &&
            p === f &&
            (((w.relSize.width || w.relSize.autoFullWidth) &&
              R.get.width(window) != R.get.width(w.spacer.parentNode)) ||
              (w.relSize.height &&
                R.get.height(window) != R.get.height(w.spacer.parentNode))) &&
            F();
        },
        A = function (e) {
          l &&
            m &&
            p === f &&
            !l.info("isDocument") &&
            (e.preventDefault(),
            l._setScrollPos(
              l.info("scrollPos") -
                ((e.wheelDelta ||
                  e[l.info("vertical") ? "wheelDeltaY" : "wheelDeltaX"]) / 3 ||
                  30 * -e.detail)
            ));
        };
      (this.setPin = function (e, t) {
        if (
          ((t = R.extend(
            {},
            { pushFollowers: !0, spacerClass: "scrollmagic-pin-spacer" },
            t
          )),
          !(e = R.get.elements(e)[0]))
        )
          return d;
        if ("fixed" === R.css(e, "position")) return d;
        if (m) {
          if (m === e) return d;
          d.removePin();
        }
        var n = (m = e).parentNode.style.display,
          r = [
            "top",
            "left",
            "bottom",
            "right",
            "margin",
            "marginLeft",
            "marginRight",
            "marginTop",
            "marginBottom",
          ];
        m.parentNode.style.display = "none";
        var i = "absolute" != R.css(m, "position"),
          o = R.css(m, r.concat(["display"])),
          s = R.css(m, ["width", "height"]);
        (m.parentNode.style.display = n),
          !i && t.pushFollowers && (t.pushFollowers = !1);
        var a = m.parentNode.insertBefore(document.createElement("div"), m),
          l = R.extend(o, {
            position: i ? "relative" : "absolute",
            boxSizing: "content-box",
            mozBoxSizing: "content-box",
            webkitBoxSizing: "content-box",
          });
        if (
          (i || R.extend(l, R.css(m, ["width", "height"])),
          R.css(a, l),
          a.setAttribute(P, ""),
          R.addClass(a, t.spacerClass),
          (w = {
            spacer: a,
            relSize: {
              width: "%" === s.width.slice(-1),
              height: "%" === s.height.slice(-1),
              autoFullWidth:
                "auto" === s.width && i && R.isMarginCollapseType(o.display),
            },
            pushFollowers: t.pushFollowers,
            inFlow: i,
          }),
          !m.___origStyle)
        ) {
          m.___origStyle = {};
          var c = m.style;
          r.concat([
            "width",
            "height",
            "position",
            "boxSizing",
            "mozBoxSizing",
            "webkitBoxSizing",
          ]).forEach(function (e) {
            m.___origStyle[e] = c[e] || "";
          });
        }
        return (
          w.relSize.width && R.css(a, { width: s.width }),
          w.relSize.height && R.css(a, { height: s.height }),
          a.appendChild(m),
          R.css(m, {
            position: i ? "relative" : "absolute",
            margin: "auto",
            top: "auto",
            left: "auto",
            bottom: "auto",
            right: "auto",
          }),
          (w.relSize.width || w.relSize.autoFullWidth) &&
            R.css(m, {
              boxSizing: "border-box",
              mozBoxSizing: "border-box",
              webkitBoxSizing: "border-box",
            }),
          window.addEventListener("scroll", L),
          window.addEventListener("resize", L),
          window.addEventListener("resize", T),
          m.addEventListener("mousewheel", A),
          m.addEventListener("DOMMouseScroll", A),
          C(),
          d
        );
      }),
        (this.removePin = function (e) {
          if (m) {
            if ((p === f && C(!0), e || !l)) {
              var t = w.spacer.firstChild;
              if (t.hasAttribute(P)) {
                var n = w.spacer.style,
                  r = {};
                [
                  "margin",
                  "marginLeft",
                  "marginRight",
                  "marginTop",
                  "marginBottom",
                ].forEach(function (e) {
                  r[e] = n[e] || "";
                }),
                  R.css(t, r);
              }
              w.spacer.parentNode.insertBefore(t, w.spacer),
                w.spacer.parentNode.removeChild(w.spacer),
                m.parentNode.hasAttribute(P) ||
                  (R.css(m, m.___origStyle), delete m.___origStyle);
            }
            window.removeEventListener("scroll", L),
              window.removeEventListener("resize", L),
              window.removeEventListener("resize", T),
              m.removeEventListener("mousewheel", A),
              m.removeEventListener("DOMMouseScroll", A),
              (m = void 0);
          }
          return d;
        });
      var N,
        O = [];
      return (
        d.on("destroy.internal", function (e) {
          d.removeClassToggle(e.reset);
        }),
        (this.setClassToggle = function (e, t) {
          var n = R.get.elements(e);
          return (
            0 !== n.length &&
              R.type.String(t) &&
              (0 < O.length && d.removeClassToggle(),
              (N = t),
              (O = n),
              d.on("enter.internal_class leave.internal_class", function (e) {
                var n = "enter" === e.type ? R.addClass : R.removeClass;
                O.forEach(function (e, t) {
                  n(e, N);
                });
              })),
            d
          );
        }),
        (this.removeClassToggle = function (e) {
          return (
            e &&
              O.forEach(function (e, t) {
                R.removeClass(e, N);
              }),
            d.off("start.internal_class end.internal_class"),
            (N = void 0),
            (O = []),
            d
          );
        }),
        (function () {
          for (var e in h) r.hasOwnProperty(e) || delete h[e];
          for (var t in r) z(t);
          E();
        })(),
        d
      );
    });
  var D = {
    defaults: {
      duration: 0,
      offset: 0,
      triggerElement: void 0,
      triggerHook: 0.5,
      reverse: !0,
      loglevel: 2,
    },
    validate: {
      offset: function (e) {
        if (((e = parseFloat(e)), !R.type.Number(e))) throw 0;
        return e;
      },
      triggerElement: function (e) {
        if ((e = e || void 0)) {
          var t = R.get.elements(e)[0];
          if (!t || !t.parentNode) throw 0;
          e = t;
        }
        return e;
      },
      triggerHook: function (e) {
        var t = { onCenter: 0.5, onEnter: 1, onLeave: 0 };
        if (R.type.Number(e)) e = Math.max(0, Math.min(parseFloat(e), 1));
        else {
          if (!(e in t)) throw 0;
          e = t[e];
        }
        return e;
      },
      reverse: function (e) {
        return !!e;
      },
    },
    shifts: ["duration", "offset", "triggerHook"],
  };
  (_.Scene.addOption = function (e, t, n, r) {
    e in D.defaults ||
      ((D.defaults[e] = t), (D.validate[e] = n), r && D.shifts.push(e));
  }),
    (_.Scene.extend = function (e) {
      var t = this;
      (_.Scene = function () {
        return (
          t.apply(this, arguments),
          (this.$super = R.extend({}, this)),
          e.apply(this, arguments) || this
        );
      }),
        R.extend(_.Scene, t),
        (_.Scene.prototype = t.prototype),
        (_.Scene.prototype.constructor = _.Scene);
    }),
    (_.Event = function (e, t, n, r) {
      for (var i in (r = r || {})) this[i] = r[i];
      return (
        (this.type = e),
        (this.target = this.currentTarget = n),
        (this.namespace = t || ""),
        (this.timeStamp = this.timestamp = Date.now()),
        this
      );
    });
  var R = (_._util = (function (s) {
    var n,
      e = {},
      a = function (e) {
        return parseFloat(e) || 0;
      },
      l = function (e) {
        return e.currentStyle ? e.currentStyle : s.getComputedStyle(e);
      },
      r = function (e, t, n, r) {
        if ((t = t === document ? s : t) === s) r = !1;
        else if (!u.DomElement(t)) return 0;
        e = e.charAt(0).toUpperCase() + e.substr(1).toLowerCase();
        var i =
          (n
            ? t["offset" + e] || t["outer" + e]
            : t["client" + e] || t["inner" + e]) || 0;
        if (n && r) {
          var o = l(t);
          i +=
            "Height" === e
              ? a(o.marginTop) + a(o.marginBottom)
              : a(o.marginLeft) + a(o.marginRight);
        }
        return i;
      },
      c = function (e) {
        return e
          .replace(/^[^a-z]+([a-z])/g, "$1")
          .replace(/-([a-z])/g, function (e) {
            return e[1].toUpperCase();
          });
      };
    (e.extend = function (e) {
      for (e = e || {}, n = 1; n < arguments.length; n++)
        if (arguments[n])
          for (var t in arguments[n])
            arguments[n].hasOwnProperty(t) && (e[t] = arguments[n][t]);
      return e;
    }),
      (e.isMarginCollapseType = function (e) {
        return (
          -1 < ["block", "flex", "list-item", "table", "-webkit-box"].indexOf(e)
        );
      });
    var i = 0,
      t = ["ms", "moz", "webkit", "o"],
      o = s.requestAnimationFrame,
      f = s.cancelAnimationFrame;
    for (n = 0; !o && n < 4; ++n)
      (o = s[t[n] + "RequestAnimationFrame"]),
        (f =
          s[t[n] + "CancelAnimationFrame"] ||
          s[t[n] + "CancelRequestAnimationFrame"]);
    o ||
      (o = function (e) {
        var t = new Date().getTime(),
          n = Math.max(0, 16 - (t - i)),
          r = s.setTimeout(function () {
            e(t + n);
          }, n);
        return (i = t + n), r;
      }),
      f ||
        (f = function (e) {
          s.clearTimeout(e);
        }),
      (e.rAF = o.bind(s)),
      (e.cAF = f.bind(s));
    var u = (e.type = function (e) {
      return Object.prototype.toString
        .call(e)
        .replace(/^\[object (.+)\]$/, "$1")
        .toLowerCase();
    });
    (u.String = function (e) {
      return "string" === u(e);
    }),
      (u.Function = function (e) {
        return "function" === u(e);
      }),
      (u.Array = function (e) {
        return Array.isArray(e);
      }),
      (u.Number = function (e) {
        return !u.Array(e) && 0 <= e - parseFloat(e) + 1;
      }),
      (u.DomElement = function (e) {
        return "object" == typeof HTMLElement ||
          "function" == typeof HTMLElement
          ? e instanceof HTMLElement || e instanceof SVGElement
          : e &&
              "object" == typeof e &&
              null !== e &&
              1 === e.nodeType &&
              "string" == typeof e.nodeName;
      });
    var d = (e.get = {});
    return (
      (d.elements = function (e) {
        var t = [];
        if (u.String(e))
          try {
            e = document.querySelectorAll(e);
          } catch (e) {
            return t;
          }
        if ("nodelist" === u(e) || u.Array(e) || e instanceof NodeList)
          for (var n = 0, r = (t.length = e.length); n < r; n++) {
            var i = e[n];
            t[n] = u.DomElement(i) ? i : d.elements(i);
          }
        else (u.DomElement(e) || e === document || e === s) && (t = [e]);
        return t;
      }),
      (d.scrollTop = function (e) {
        return e && "number" == typeof e.scrollTop
          ? e.scrollTop
          : s.pageYOffset || 0;
      }),
      (d.scrollLeft = function (e) {
        return e && "number" == typeof e.scrollLeft
          ? e.scrollLeft
          : s.pageXOffset || 0;
      }),
      (d.width = function (e, t, n) {
        return r("width", e, t, n);
      }),
      (d.height = function (e, t, n) {
        return r("height", e, t, n);
      }),
      (d.offset = function (e, t) {
        var n = { top: 0, left: 0 };
        if (e && e.getBoundingClientRect) {
          var r = e.getBoundingClientRect();
          (n.top = r.top),
            (n.left = r.left),
            t || ((n.top += d.scrollTop()), (n.left += d.scrollLeft()));
        }
        return n;
      }),
      (e.addClass = function (e, t) {
        t && (e.classList ? e.classList.add(t) : (e.className += " " + t));
      }),
      (e.removeClass = function (e, t) {
        t &&
          (e.classList
            ? e.classList.remove(t)
            : (e.className = e.className.replace(
                RegExp("(^|\\b)" + t.split(" ").join("|") + "(\\b|$)", "gi"),
                " "
              )));
      }),
      (e.css = function (e, t) {
        if (u.String(t)) return l(e)[c(t)];
        if (u.Array(t)) {
          var n = {},
            r = l(e);
          return (
            t.forEach(function (e, t) {
              n[e] = r[c(e)];
            }),
            n
          );
        }
        for (var i in t) {
          var o = t[i];
          o == parseFloat(o) && (o += "px"), (e.style[c(i)] = o);
        }
      }),
      e
    );
  })(window || {}));
  return _;
});

/*! ScrollMagic v2.0.7 | (c) 2019 Jan Paepke (@janpaepke) | license & info: http://scrollmagic.io */
!(function (e, n) {
  "function" == typeof define && define.amd
    ? define(["ScrollMagic", "TweenMax", "TimelineMax"], n)
    : "object" == typeof exports
    ? (require("gsap"), n(require("scrollmagic"), TweenMax, TimelineMax))
    : n(
        e.ScrollMagic || (e.jQuery && e.jQuery.ScrollMagic),
        e.TweenMax || e.TweenLite,
        e.TimelineMax || e.TimelineLite
      );
})(this, function (e, s, u) {
  "use strict";
  e.Scene.addOption("tweenChanges", !1, function (e) {
    return !!e;
  }),
    e.Scene.extend(function () {
      var i,
        o = this;
      o.on("progress.plugin_gsap", function () {
        a();
      }),
        o.on("destroy.plugin_gsap", function (e) {
          o.removeTween(e.reset);
        });
      var a = function () {
        if (i) {
          var e = o.progress(),
            n = o.state();
          i.repeat && -1 === i.repeat()
            ? "DURING" === n && i.paused()
              ? i.play()
              : "DURING" === n || i.paused() || i.pause()
            : e != i.progress() &&
              (0 === o.duration()
                ? 0 < e
                  ? i.play()
                  : i.reverse()
                : o.tweenChanges() && i.tweenTo
                ? i.tweenTo(e * i.duration())
                : i.progress(e).pause());
        }
      };
      (o.setTween = function (e, n, r) {
        var t;
        1 < arguments.length &&
          (arguments.length < 3 && ((r = n), (n = 1)), (e = s.to(e, n, r)));
        try {
          (t = u ? new u({ smoothChildTiming: !0 }).add(e) : e).pause();
        } catch (e) {
          return o;
        }
        return (
          i && o.removeTween(),
          (i = t),
          e.repeat && -1 === e.repeat() && (i.repeat(-1), i.yoyo(e.yoyo())),
          a(),
          o
        );
      }),
        (o.removeTween = function (e) {
          return i && (e && i.progress(0).pause(), i.kill(), (i = void 0)), o;
        });
    });
});
("    ");

// IMAGES LOADED

!(function (e, t) {
  "function" == typeof define && define.amd
    ? define("ev-emitter/ev-emitter", t)
    : "object" == typeof module && module.exports
    ? (module.exports = t())
    : (e.EvEmitter = t());
})("undefined" != typeof window ? window : this, function () {
  function e() {}
  var t = e.prototype;
  return (
    (t.on = function (e, t) {
      if (e && t) {
        var i = (this._events = this._events || {}),
          n = (i[e] = i[e] || []);
        return n.indexOf(t) == -1 && n.push(t), this;
      }
    }),
    (t.once = function (e, t) {
      if (e && t) {
        this.on(e, t);
        var i = (this._onceEvents = this._onceEvents || {}),
          n = (i[e] = i[e] || {});
        return (n[t] = !0), this;
      }
    }),
    (t.off = function (e, t) {
      var i = this._events && this._events[e];
      if (i && i.length) {
        var n = i.indexOf(t);
        return n != -1 && i.splice(n, 1), this;
      }
    }),
    (t.emitEvent = function (e, t) {
      var i = this._events && this._events[e];
      if (i && i.length) {
        (i = i.slice(0)), (t = t || []);
        for (
          var n = this._onceEvents && this._onceEvents[e], o = 0;
          o < i.length;
          o++
        ) {
          var r = i[o],
            s = n && n[r];
          s && (this.off(e, r), delete n[r]), r.apply(this, t);
        }
        return this;
      }
    }),
    (t.allOff = function () {
      delete this._events, delete this._onceEvents;
    }),
    e
  );
}),
  (function (e, t) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(["ev-emitter/ev-emitter"], function (i) {
          return t(e, i);
        })
      : "object" == typeof module && module.exports
      ? (module.exports = t(e, require("ev-emitter")))
      : (e.imagesLoaded = t(e, e.EvEmitter));
  })("undefined" != typeof window ? window : this, function (e, t) {
    function i(e, t) {
      for (var i in t) e[i] = t[i];
      return e;
    }
    function n(e) {
      if (Array.isArray(e)) return e;
      var t = "object" == typeof e && "number" == typeof e.length;
      return t ? d.call(e) : [e];
    }
    function o(e, t, r) {
      if (!(this instanceof o)) return new o(e, t, r);
      var s = e;
      return (
        "string" == typeof e && (s = document.querySelectorAll(e)),
        s
          ? ((this.elements = n(s)),
            (this.options = i({}, this.options)),
            "function" == typeof t ? (r = t) : i(this.options, t),
            r && this.on("always", r),
            this.getImages(),
            h && (this.jqDeferred = new h.Deferred()),
            void setTimeout(this.check.bind(this)))
          : void a.error("Bad element for imagesLoaded " + (s || e))
      );
    }
    function r(e) {
      this.img = e;
    }
    function s(e, t) {
      (this.url = e), (this.element = t), (this.img = new Image());
    }
    var h = e.jQuery,
      a = e.console,
      d = Array.prototype.slice;
    (o.prototype = Object.create(t.prototype)),
      (o.prototype.options = {}),
      (o.prototype.getImages = function () {
        (this.images = []), this.elements.forEach(this.addElementImages, this);
      }),
      (o.prototype.addElementImages = function (e) {
        "IMG" == e.nodeName && this.addImage(e),
          this.options.background === !0 && this.addElementBackgroundImages(e);
        var t = e.nodeType;
        if (t && u[t]) {
          for (var i = e.querySelectorAll("img"), n = 0; n < i.length; n++) {
            var o = i[n];
            this.addImage(o);
          }
          if ("string" == typeof this.options.background) {
            var r = e.querySelectorAll(this.options.background);
            for (n = 0; n < r.length; n++) {
              var s = r[n];
              this.addElementBackgroundImages(s);
            }
          }
        }
      });
    var u = { 1: !0, 9: !0, 11: !0 };
    return (
      (o.prototype.addElementBackgroundImages = function (e) {
        var t = getComputedStyle(e);
        if (t)
          for (
            var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(t.backgroundImage);
            null !== n;

          ) {
            var o = n && n[2];
            o && this.addBackground(o, e), (n = i.exec(t.backgroundImage));
          }
      }),
      (o.prototype.addImage = function (e) {
        var t = new r(e);
        this.images.push(t);
      }),
      (o.prototype.addBackground = function (e, t) {
        var i = new s(e, t);
        this.images.push(i);
      }),
      (o.prototype.check = function () {
        function e(e, i, n) {
          setTimeout(function () {
            t.progress(e, i, n);
          });
        }
        var t = this;
        return (
          (this.progressedCount = 0),
          (this.hasAnyBroken = !1),
          this.images.length
            ? void this.images.forEach(function (t) {
                t.once("progress", e), t.check();
              })
            : void this.complete()
        );
      }),
      (o.prototype.progress = function (e, t, i) {
        this.progressedCount++,
          (this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded),
          this.emitEvent("progress", [this, e, t]),
          this.jqDeferred &&
            this.jqDeferred.notify &&
            this.jqDeferred.notify(this, e),
          this.progressedCount == this.images.length && this.complete(),
          this.options.debug && a && a.log("progress: " + i, e, t);
      }),
      (o.prototype.complete = function () {
        var e = this.hasAnyBroken ? "fail" : "done";
        if (
          ((this.isComplete = !0),
          this.emitEvent(e, [this]),
          this.emitEvent("always", [this]),
          this.jqDeferred)
        ) {
          var t = this.hasAnyBroken ? "reject" : "resolve";
          this.jqDeferred[t](this);
        }
      }),
      (r.prototype = Object.create(t.prototype)),
      (r.prototype.check = function () {
        var e = this.getIsImageComplete();
        return e
          ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth")
          : ((this.proxyImage = new Image()),
            this.proxyImage.addEventListener("load", this),
            this.proxyImage.addEventListener("error", this),
            this.img.addEventListener("load", this),
            this.img.addEventListener("error", this),
            void (this.proxyImage.src = this.img.src));
      }),
      (r.prototype.getIsImageComplete = function () {
        return this.img.complete && this.img.naturalWidth;
      }),
      (r.prototype.confirm = function (e, t) {
        (this.isLoaded = e), this.emitEvent("progress", [this, this.img, t]);
      }),
      (r.prototype.handleEvent = function (e) {
        var t = "on" + e.type;
        this[t] && this[t](e);
      }),
      (r.prototype.onload = function () {
        this.confirm(!0, "onload"), this.unbindEvents();
      }),
      (r.prototype.onerror = function () {
        this.confirm(!1, "onerror"), this.unbindEvents();
      }),
      (r.prototype.unbindEvents = function () {
        this.proxyImage.removeEventListener("load", this),
          this.proxyImage.removeEventListener("error", this),
          this.img.removeEventListener("load", this),
          this.img.removeEventListener("error", this);
      }),
      (s.prototype = Object.create(r.prototype)),
      (s.prototype.check = function () {
        this.img.addEventListener("load", this),
          this.img.addEventListener("error", this),
          (this.img.src = this.url);
        var e = this.getIsImageComplete();
        e &&
          (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"),
          this.unbindEvents());
      }),
      (s.prototype.unbindEvents = function () {
        this.img.removeEventListener("load", this),
          this.img.removeEventListener("error", this);
      }),
      (s.prototype.confirm = function (e, t) {
        (this.isLoaded = e),
          this.emitEvent("progress", [this, this.element, t]);
      }),
      (o.makeJQueryPlugin = function (t) {
        (t = t || e.jQuery),
          t &&
            ((h = t),
            (h.fn.imagesLoaded = function (e, t) {
              var i = new o(this, e, t);
              return i.jqDeferred.promise(h(this));
            }));
      }),
      o.makeJQueryPlugin(),
      o
    );
  });
