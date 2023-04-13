function t() { }
function e(t, e) {
	for (const n in e) t[n] = e[n];
	return t;
}
function n(t) {
	return t();
}
function a() {
	return Object.create(null);
}
function l(t) {
	t.forEach(n);
}
function s(t) {
	return "function" == typeof t;
}
function r(t, e) {
	return t != t ? e == e : t !== e || (t && "object" == typeof t) || "function" == typeof t;
}
function o(e, ...n) {
	if (null == e) return t;
	const a = e.subscribe(...n);
	return a.unsubscribe ? () => a.unsubscribe() : a;
}
function i(t, e, n) {
	t.$$.on_destroy.push(o(e, n));
}
function c(t) {
	const e = {};
	for (const n in t) "$" !== n[0] && (e[n] = t[n]);
	return e;
}
function u(t, e, n = e) {
	return t.set(n), e;
}
function h(t, e) {
	t.appendChild(e);
}
function d(t, e, n) {
	t.insertBefore(e, n || null);
}
function f(t) {
	t.parentNode.removeChild(t);
}
function p(t) {
	return document.createElement(t);
}
function v(t) {
	return document.createElementNS("http://www.w3.org/2000/svg", t);
}
function m(t) {
	return document.createTextNode(t);
}
function g() {
	return m(" ");
}
function y() {
	return m("");
}
function x(t, e, n, a) {
	return t.addEventListener(e, n, a), () => t.removeEventListener(e, n, a);
}
function w(t, e, n) {
	null == n ? t.removeAttribute(e) : t.getAttribute(e) !== n && t.setAttribute(e, n);
}
function $(t) {
	return Array.from(t.childNodes);
}
function E(t, e, n, a) {
	for (let l = 0; l < t.length; l += 1) {
		const a = t[l];
		if (a.nodeName === e) {
			let e = 0;
			const s = [];
			for (; e < a.attributes.length;) {
				const t = a.attributes[e++];
				n[t.name] || s.push(t.name);
			}
			for (let t = 0; t < s.length; t++) a.removeAttribute(s[t]);
			return t.splice(l, 1)[0];
		}
	}
	return a ? v(e) : p(e);
}
function b(t, e) {
	for (let n = 0; n < t.length; n += 1) {
		const a = t[n];
		if (3 === a.nodeType) return (a.data = "" + e), t.splice(n, 1)[0];
	}
	return m(e);
}
function z(t) {
	return b(t, " ");
}
function M(t, e) {
	(e = "" + e), t.wholeText !== e && (t.data = e);
}
function T(t, e, n, a) {
	t.style.setProperty(e, n, a ? "important" : "");
}
function _(t, e, n) {
	t.classList[n ? "add" : "remove"](e);
}
class I {
	constructor(t = null) {
		(this.a = t), (this.e = this.n = null);
	}
	m(t, e, n = null) {
		this.e || ((this.e = p(e.nodeName)), (this.t = e), this.h(t)), this.i(n);
	}
	h(t) {
		(this.e.innerHTML = t), (this.n = Array.from(this.e.childNodes));
	}
	i(t) {
		for (let e = 0; e < this.n.length; e += 1) d(this.t, this.n[e], t);
	}
	p(t) {
		this.d(), this.h(t), this.i(this.a);
	}
	d() {
		this.n.forEach(f);
	}
}
let D;
function A(t) {
	D = t;
}
function S() {
	if (!D) throw new Error("Function called outside component initialization");
	return D;
}
function k() {
	const t = S();
	return (e, n) => {
		const a = t.$$.callbacks[e];
		if (a) {
			const l = (function (t, e) {
				const n = document.createEvent("CustomEvent");
				return n.initCustomEvent(t, !1, !1, e), n;
			})(e, n);
			a.slice().forEach((e) => {
				e.call(t, l);
			});
		}
	};
}
const L = [],
	q = [],
	B = [],
	N = [],
	P = Promise.resolve();
let V = !1;
function C(t) {
	B.push(t);
}
let H = !1;
const O = new Set();
function R() {
	if (!H) {
		H = !0;
		do {
			for (let t = 0; t < L.length; t += 1) {
				const e = L[t];
				A(e), U(e.$$);
			}
			for (A(null), L.length = 0; q.length;) q.pop()();
			for (let t = 0; t < B.length; t += 1) {
				const e = B[t];
				O.has(e) || (O.add(e), e());
			}
			B.length = 0;
		} while (L.length);
		for (; N.length;) N.pop()();
		(V = !1), (H = !1), O.clear();
	}
}
function U(t) {
	if (null !== t.fragment) {
		t.update(), l(t.before_update);
		const e = t.dirty;
		(t.dirty = [-1]), t.fragment && t.fragment.p(t.ctx, e), t.after_update.forEach(C);
	}
}
const Y = new Set();
function j(t, e) {
	t && t.i && (Y.delete(t), t.i(e));
}
function X(t, e) {
	t.d(1), e.delete(t.key);
}
function W(t, e) {
	-1 === t.$$.dirty[0] && (L.push(t), V || ((V = !0), P.then(R)), t.$$.dirty.fill(0)), (t.$$.dirty[(e / 31) | 0] |= 1 << e % 31);
}
function F(e, r, o, i, c, u, h = [-1]) {
	const d = D;
	A(e);
	const p = (e.$$ = {
		fragment: null,
		ctx: null,
		props: u,
		update: t,
		not_equal: c,
		bound: a(),
		on_mount: [],
		on_destroy: [],
		on_disconnect: [],
		before_update: [],
		after_update: [],
		context: new Map(d ? d.$$.context : []),
		callbacks: a(),
		dirty: h,
		skip_bound: !1,
	});
	let v = !1;
	if (
		((p.ctx = o
			? o(e, r.props || {}, (t, n, ...a) => {
				const l = a.length ? a[0] : n;
				return p.ctx && c(p.ctx[t], (p.ctx[t] = l)) && (!p.skip_bound && p.bound[t] && p.bound[t](l), v && W(e, t)), n;
			})
			: []),
			p.update(),
			(v = !0),
			l(p.before_update),
			(p.fragment = !!i && i(p.ctx)),
			r.target)
	) {
		if (r.hydrate) {
			const t = $(r.target);
			p.fragment && p.fragment.l(t), t.forEach(f);
		} else p.fragment && p.fragment.c();
		r.intro && j(e.$$.fragment),
			(function (t, e, a, r) {
				const { fragment: o, on_mount: i, on_destroy: c, after_update: u } = t.$$;
				o && o.m(e, a),
					r ||
					C(() => {
						const e = i.map(n).filter(s);
						c ? c.push(...e) : l(e), (t.$$.on_mount = []);
					}),
					u.forEach(C);
			})(e, r.target, r.anchor, r.customElement),
			R();
	}
	A(d);
}
const J = [];
function G(e, n = t) {
	let a;
	const l = [];
	function s(t) {
		if (r(e, t) && ((e = t), a)) {
			const t = !J.length;
			for (let n = 0; n < l.length; n += 1) {
				const t = l[n];
				t[1](), J.push(t, e);
			}
			if (t) {
				for (let t = 0; t < J.length; t += 2) J[t][0](J[t + 1]);
				J.length = 0;
			}
		}
	}
	return {
		set: s,
		update: function (t) {
			s(t(e));
		},
		subscribe: function (r, o = t) {
			const i = [r, o];
			return (
				l.push(i),
				1 === l.length && (a = n(s) || t),
				r(e),
				() => {
					const t = l.indexOf(i);
					-1 !== t && l.splice(t, 1), 0 === l.length && (a(), (a = null));
				}
			);
		},
	};
}
function K(e, n, a) {
	const r = !Array.isArray(e),
		i = r ? [e] : e,
		c = n.length < 2;
	return {
		subscribe: G(a, (e) => {
			let a = !1;
			const u = [];
			let h = 0,
				d = t;
			const f = () => {
				if (h) return;
				d();
				const a = n(r ? u[0] : u, e);
				c ? e(a) : (d = s(a) ? a : t);
			},
				p = i.map((t, e) =>
					o(
						t,
						(t) => {
							(u[e] = t), (h &= ~(1 << e)), a && f();
						},
						() => {
							h |= 1 << e;
						}
					)
				);
			return (
				(a = !0),
				f(),
				function () {
					l(p), d();
				}
			);
		}).subscribe,
	};
}
const Q = (t) => {
	const e = Math.floor(t / 3600),
		n = Math.floor((t - 3600 * e) / 60),
		a = Math.floor(t - 3600 * e - 60 * n);
	return (e > 0 ? [e, n, a] : [n, a]).map((t) => (t < 10 ? "0" + t : "" + t)).join(":");
},
	Z = !("undefined" == typeof window) && /mobile/i.test(window.navigator.userAgent);
function tt(t) {
	if (t) {
		const e = (t = t.replace(/([^\]^\n])\[/g, (t, e) => e + "\n[")).split("\n");
		let n = [];
		const a = e.length;
		for (let t = 0; t < a; t++) {
			const a = e[t].match(/\[(\d{2}):(\d{2})(\.(\d{2,3}))?]/g),
				l = e[t]
					.replace(/.*\[(\d{2}):(\d{2})(\.(\d{2,3}))?]/g, "")
					.replace(/<(\d{2}):(\d{2})(\.(\d{2,3}))?>/g, "")
					.replace(/^\s+|\s+$/g, "");
			if (a) {
				const t = a.length;
				for (let e = 0; e < t; e++) {
					const t = /\[(\d{2}):(\d{2})(\.(\d{2,3}))?]/.exec(a[e]),
						s = 60 * t[1] + parseInt(t[2]) + (t[4] ? parseInt(t[4]) / (2 === (t[4] + "").length ? 100 : 1e3) : 0);
					n.push([s, l]);
				}
			}
		}
		return (n = n.filter((t) => t[1])), n.sort((t, e) => t[0] - e[0]), n;
	}
	return [];
}
// console.log("\n %c Svelte APlayer v0.1.1 %c http://svelte-aplayer.js.org \n\n", "color: #fff; background: #ff3e00; padding:5px 0;", "background: #fadfa3; padding:5px 0;");
const et = [];
function nt(t, e, n) {
	const a = t.slice();
	return (a[74] = e[n]), (a[76] = n), a;
}
function at(t, e, n) {
	const a = t.slice();
	return (a[77] = e[n]), (a[79] = n), a;
}
function lt(t) {
	let e, n, a;
	return {
		c() {
			(e = p("div")), (n = v("svg")), (a = v("path")), this.h();
		},
		l(t) {
			e = E(t, "DIV", { class: !0 });
			var l = $(e);
			n = E(l, "svg", { xmlns: !0, version: !0, viewBox: !0, class: !0 }, 1);
			var s = $(n);
			(a = E(s, "path", { d: !0, class: !0 }, 1)), $(a).forEach(f), s.forEach(f), l.forEach(f), this.h();
		},
		h() {
			w(a, "d", "M15.552 15.168q0.448 0.32 0.448 0.832 0 0.448-0.448 0.768l-13.696 8.512q-0.768 0.512-1.312 0.192t-0.544-1.28v-16.448q0-0.96 0.544-1.28t1.312 0.192z"),
				w(a, "class", "svelte-afaxzx"),
				w(n, "xmlns", "http://www.w3.org/2000/svg"),
				w(n, "version", "1.1"),
				w(n, "viewBox", "0 0 16 31"),
				w(n, "class", "svelte-afaxzx"),
				w(e, "class", "aplayer-button aplayer-play svelte-afaxzx");
		},
		m(t, l) {
			d(t, e, l), h(e, n), h(n, a);
		},
		d(t) {
			t && f(e);
		},
	};
}
function st(t) {
	let e, n, a;
	return {
		c() {
			(e = p("div")), (n = v("svg")), (a = v("path")), this.h();
		},
		l(t) {
			e = E(t, "DIV", { class: !0 });
			var l = $(e);
			n = E(l, "svg", { xmlns: !0, version: !0, viewBox: !0, class: !0 }, 1);
			var s = $(n);
			(a = E(s, "path", { d: !0, class: !0 }, 1)), $(a).forEach(f), s.forEach(f), l.forEach(f), this.h();
		},
		h() {
			w(a, "d", "M14.080 4.8q2.88 0 2.88 2.048v18.24q0 2.112-2.88 2.112t-2.88-2.112v-18.24q0-2.048 2.88-2.048zM2.88 4.8q2.88 0 2.88 2.048v18.24q0 2.112-2.88 2.112t-2.88-2.112v-18.24q0-2.048 2.88-2.048z"),
				w(a, "class", "svelte-afaxzx"),
				w(n, "xmlns", "http://www.w3.org/2000/svg"),
				w(n, "version", "1.1"),
				w(n, "viewBox", "0 0 17 32"),
				w(n, "class", "svelte-afaxzx"),
				w(e, "class", "aplayer-button aplayer-pause svelte-afaxzx");
		},
		m(t, l) {
			d(t, e, l), h(e, n), h(n, a);
		},
		d(t) {
			t && f(e);
		},
	};
}
function rt(t) {
	let e,
		n,
		a = [],
		l = new Map(),
		s = t[6];
	const r = (t) => t[77][0];
	for (let o = 0; o < s.length; o += 1) {
		let e = at(t, s, o),
			n = r(e);
		l.set(n, (a[o] = ot(n, e)));
	}
	return {
		c() {
			(e = p("div")), (n = p("div"));
			for (let t = 0; t < a.length; t += 1) a[t].c();
			this.h();
		},
		l(t) {
			e = E(t, "DIV", { class: !0 });
			var l = $(e);
			n = E(l, "DIV", { class: !0, style: !0 });
			var s = $(n);
			for (let e = 0; e < a.length; e += 1) a[e].l(s);
			s.forEach(f), l.forEach(f), this.h();
		},
		h() {
			w(n, "class", "aplayer-lrc-contents svelte-afaxzx"), T(n, "transform", "translateY(calc(" + Math.max(t[7], 0) + " * -1 * calc(var(--base-font-size) + 4px)))"), w(e, "class", "aplayer-lrc svelte-afaxzx");
		},
		m(t, l) {
			d(t, e, l), h(e, n);
			for (let e = 0; e < a.length; e += 1) a[e].m(n, null);
		},
		p(t, e) {
			192 & e[0] &&
				((s = t[6]),
					(a = (function (t, e, n, a, l, s, r, o, i, c, u, h) {
						let d = t.length,
							f = s.length,
							p = d;
						const v = {};
						for (; p--;) v[t[p].key] = p;
						const m = [],
							g = new Map(),
							y = new Map();
						for (p = f; p--;) {
							const t = h(l, s, p),
								o = n(t);
							let i = r.get(o);
							i ? a && i.p(t, e) : ((i = c(o, t)), i.c()), g.set(o, (m[p] = i)), o in v && y.set(o, Math.abs(p - v[o]));
						}
						const x = new Set(),
							w = new Set();
						function $(t) {
							j(t, 1), t.m(o, u), r.set(t.key, t), (u = t.first), f--;
						}
						for (; d && f;) {
							const e = m[f - 1],
								n = t[d - 1],
								a = e.key,
								l = n.key;
							e === n ? ((u = e.first), d--, f--) : g.has(l) ? (!r.has(a) || x.has(a) ? $(e) : w.has(l) ? d-- : y.get(a) > y.get(l) ? (w.add(a), $(e)) : (x.add(l), d--)) : (i(n, r), d--);
						}
						for (; d--;) {
							const e = t[d];
							g.has(e.key) || i(e, r);
						}
						for (; f;) $(m[f - 1]);
						return m;
					})(a, e, r, 1, t, s, l, n, X, ot, null, at))),
				128 & e[0] && T(n, "transform", "translateY(calc(" + Math.max(t[7], 0) + " * -1 * calc(var(--base-font-size) + 4px)))");
		},
		d(t) {
			t && f(e);
			for (let e = 0; e < a.length; e += 1) a[e].d();
		},
	};
}
function ot(t, e) {
	let n,
		a,
		l,
		s = e[77][1] + "";
	return {
		key: t,
		first: null,
		c() {
			(n = p("p")), (a = m(s)), (l = g()), this.h();
		},
		l(t) {
			n = E(t, "P", { class: !0 });
			var e = $(n);
			(a = b(e, s)), (l = z(e)), e.forEach(f), this.h();
		},
		h() {
			w(n, "class", "svelte-afaxzx"), _(n, "aplayer-lrc-current", e[79] === e[7]), (this.first = n);
		},
		m(t, e) {
			d(t, n, e), h(n, a), h(n, l);
		},
		p(t, l) {
			(e = t), 64 & l[0] && s !== (s = e[77][1] + "") && M(a, s), 192 & l[0] && _(n, "aplayer-lrc-current", e[79] === e[7]);
		},
		d(t) {
			t && f(n);
		},
	};
}
function it(e) {
	let n, a;
	return {
		c() {
			(a = y()), this.h();
		},
		l(t) {
			(a = y()), this.h();
		},
		h() {
			n = new I(a);
		},
		m(t, e) {
			n.m(
				'<svg\n                  xmlns="http://www.w3.org/2000/svg"\n                  version="1.1"\n                  viewBox="0 0 28 32"\n                  ><path\n                    d="M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8zM20.576 16q0 1.344-0.768 2.528t-2.016 1.664q-0.16 0.096-0.448 0.096-0.448 0-0.8-0.32t-0.32-0.832q0-0.384 0.192-0.64t0.544-0.448 0.608-0.384 0.512-0.64 0.192-1.024-0.192-1.024-0.512-0.64-0.608-0.384-0.544-0.448-0.192-0.64q0-0.48 0.32-0.832t0.8-0.32q0.288 0 0.448 0.096 1.248 0.48 2.016 1.664t0.768 2.528z"\n                  /></svg\n        >',
				t,
				e
			),
				d(t, a, e);
		},
		p: t,
		d(t) {
			t && f(a), t && n.d();
		},
	};
}
function ct(e) {
	let n, a;
	return {
		c() {
			(a = y()), this.h();
		},
		l(t) {
			(a = y()), this.h();
		},
		h() {
			n = new I(a);
		},
		m(t, e) {
			n.m(
				'<svg\n                  xmlns="http://www.w3.org/2000/svg"\n                  version="1.1"\n                  viewBox="0 0 28 32"\n                  ><path\n                    d="M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8z"\n                  /></svg\n                >',
				t,
				e
			),
				d(t, a, e);
		},
		p: t,
		d(t) {
			t && f(a), t && n.d();
		},
	};
}
function ut(e) {
	let n, a;
	return {
		c() {
			(a = y()), this.h();
		},
		l(t) {
			(a = y()), this.h();
		},
		h() {
			n = new I(a);
		},
		m(t, e) {
			n.m(
				'<svg\n                xmlns="http://www.w3.org/2000/svg"\n                version="1.1"\n                viewBox="0 0 32 32"\n                ><path\n                  d="M0.622 18.334h19.54v7.55l11.052-9.412-11.052-9.413v7.549h-19.54v3.725z"\n                /></svg\n              >',
				t,
				e
			),
				d(t, a, e);
		},
		p: t,
		d(t) {
			t && f(a), t && n.d();
		},
	};
}
function ht(e) {
	let n, a;
	return {
		c() {
			(a = y()), this.h();
		},
		l(t) {
			(a = y()), this.h();
		},
		h() {
			n = new I(a);
		},
		m(t, e) {
			n.m(
				'<svg\n                xmlns="http://www.w3.org/2000/svg"\n                version="1.1"\n                viewBox="0 0 32 32"\n                ><path\n                  d="M22.667 4l7 6-7 6 7 6-7 6v-4h-3.653l-3.76-3.76 2.827-2.827 2.587 2.587h2v-8h-2l-12 12h-6v-4h4.347l12-12h3.653v-4zM2.667 8h6l3.76 3.76-2.827 2.827-2.587-2.587h-4.347v-4z"\n                /></svg\n              >',
				t,
				e
			),
				d(t, a, e);
		},
		p: t,
		d(t) {
			t && f(a), t && n.d();
		},
	};
}
function dt(e) {
	let n, a;
	return {
		c() {
			(a = y()), this.h();
		},
		l(t) {
			(a = y()), this.h();
		},
		h() {
			n = new I(a);
		},
		m(t, e) {
			n.m(
				' <svg\n                xmlns="http://www.w3.org/2000/svg"\n                version="1.1"\n                viewBox="0 0 29 32"\n                ><path\n                  d="M9.333 9.333h13.333v4l5.333-5.333-5.333-5.333v4h-16v8h2.667v-5.333zM22.667 22.667h-13.333v-4l-5.333 5.333 5.333 5.333v-4h16v-8h-2.667v5.333z"\n                /></svg\n              >',
				t,
				e
			),
				d(t, a, e);
		},
		p: t,
		d(t) {
			t && f(a), t && n.d();
		},
	};
}
function ft(e) {
	let n, a;
	return {
		c() {
			(a = y()), this.h();
		},
		l(t) {
			(a = y()), this.h();
		},
		h() {
			n = new I(a);
		},
		m(t, e) {
			n.m(
				'<svg\n                xmlns="http://www.w3.org/2000/svg"\n                version="1.1"\n                viewBox="0 0 33 32"\n                ><path\n                  d="M9.333 9.333h13.333v4l5.333-5.333-5.333-5.333v4h-16v8h2.667v-5.333zM22.667 22.667h-13.333v-4l-5.333 5.333 5.333 5.333v-4h16v-8h-2.667v5.333zM17.333 20v-8h-1.333l-2.667 1.333v1.333h2v5.333h2z"\n                /></svg\n              >',
				t,
				e
			),
				d(t, a, e);
		},
		p: t,
		d(t) {
			t && f(a), t && n.d();
		},
	};
}
function pt(e) {
	let n, a;
	return {
		c() {
			(a = y()), this.h();
		},
		l(t) {
			(a = y()), this.h();
		},
		h() {
			n = new I(a);
		},
		m(t, e) {
			n.m(
				'<svg\n                xmlns="http://www.w3.org/2000/svg"\n                version="1.1"\n                viewBox="0 0 29 32"\n                ><path\n                  d="M2.667 7.027l1.707-1.693 22.293 22.293-1.693 1.707-4-4h-11.64v4l-5.333-5.333 5.333-5.333v4h8.973l-8.973-8.973v0.973h-2.667v-3.64l-4-4zM22.667 17.333h2.667v5.573l-2.667-2.667v-2.907zM22.667 6.667v-4l5.333 5.333-5.333 5.333v-4h-10.907l-2.667-2.667h13.573z"\n                /></svg\n              >',
				t,
				e
			),
				d(t, a, e);
		},
		p: t,
		d(t) {
			t && f(a), t && n.d();
		},
	};
}
function vt(e) {
	let n, a, l, s, r;
	return {
		c() {
			(n = p("button")), (a = v("svg")), (l = v("path")), this.h();
		},
		l(t) {
			n = E(t, "BUTTON", { type: !0, class: !0 });
			var e = $(n);
			a = E(e, "svg", { xmlns: !0, version: !0, viewBox: !0, class: !0 }, 1);
			var s = $(a);
			(l = E(s, "path", { d: !0, class: !0 }, 1)), $(l).forEach(f), s.forEach(f), e.forEach(f), this.h();
		},
		h() {
			w(
				l,
				"d",
				"M20.8 14.4q0.704 0 1.152 0.48t0.448 1.12-0.48 1.12-1.12 0.48h-19.2q-0.64 0-1.12-0.48t-0.48-1.12 0.448-1.12 1.152-0.48h19.2zM1.6 11.2q-0.64 0-1.12-0.48t-0.48-1.12 0.448-1.12 1.152-0.48h19.2q0.704 0 1.152 0.48t0.448 1.12-0.48 1.12-1.12 0.48h-19.2zM20.8 20.8q0.704 0 1.152 0.48t0.448 1.12-0.48 1.12-1.12 0.48h-19.2q-0.64 0-1.12-0.48t-0.48-1.12 0.448-1.12 1.152-0.48h19.2z"
			),
				w(l, "class", "svelte-afaxzx"),
				w(a, "xmlns", "http://www.w3.org/2000/svg"),
				w(a, "version", "1.1"),
				w(a, "viewBox", "0 0 22 32"),
				w(a, "class", "svelte-afaxzx"),
				w(n, "type", "button"),
				w(n, "class", "aplayer-icon aplayer-icon-menu svelte-afaxzx");
		},
		m(t, o) {
			d(t, n, o), h(n, a), h(a, l), s || ((r = x(n, "click", e[60])), (s = !0));
		},
		p: t,
		d(t) {
			t && f(n), (s = !1), r();
		},
	};
}
function mt(t) {
	let e;
	return {
		c() {
			(e = p("span")), this.h();
		},
		l(t) {
			(e = E(t, "SPAN", { class: !0 })), $(e).forEach(f), this.h();
		},
		h() {
			w(e, "class", "aplayer-list-cur svelte-afaxzx");
		},
		m(t, n) {
			d(t, e, n);
		},
		d(t) {
			t && f(e);
		},
	};
}
function gt(t) {
	let e,
		n,
		a,
		l,
		s,
		r,
		o,
		i,
		c,
		u,
		v,
		y,
		T,
		_ = t[76] + 1 + "",
		I = t[74].name + "",
		D = t[74].artist + "",
		A = t[76] === t[17].playingIndex && mt();
	function S() {
		return t[61](t[76]);
	}
	return {
		c() {
			(e = p("li")), A && A.c(), (n = g()), (a = p("span")), (l = m(_)), (s = g()), (r = p("span")), (o = m(I)), (i = g()), (c = p("span")), (u = m(D)), (v = g()), this.h();
		},
		l(t) {
			e = E(t, "LI", { class: !0 });
			var h = $(e);
			A && A.l(h), (n = z(h)), (a = E(h, "SPAN", { class: !0 }));
			var d = $(a);
			(l = b(d, _)), d.forEach(f), (s = z(h)), (r = E(h, "SPAN", { class: !0 }));
			var p = $(r);
			(o = b(p, I)), p.forEach(f), (i = z(h)), (c = E(h, "SPAN", { class: !0 }));
			var m = $(c);
			(u = b(m, D)), m.forEach(f), (v = z(h)), h.forEach(f), this.h();
		},
		h() {
			w(a, "class", "aplayer-list-index svelte-afaxzx"), w(r, "class", "aplayer-list-title"), w(c, "class", "aplayer-list-artist svelte-afaxzx"), w(e, "class", "svelte-afaxzx");
		},
		m(t, f) {
			d(t, e, f), A && A.m(e, null), h(e, n), h(e, a), h(a, l), h(e, s), h(e, r), h(r, o), h(e, i), h(e, c), h(c, u), h(e, v), y || ((T = x(e, "click", S)), (y = !0));
		},
		p(a, l) {
			(t = a)[76] === t[17].playingIndex ? A || ((A = mt()), A.c(), A.m(e, n)) : A && (A.d(1), (A = null)), 16 & l[0] && I !== (I = t[74].name + "") && M(o, I), 16 & l[0] && D !== (D = t[74].artist + "") && M(u, D);
		},
		d(t) {
			t && f(e), A && A.d(), (y = !1), T();
		},
	};
}
function yt(e) {
	let n,
		a,
		r,
		o,
		i,
		c,
		u,
		v,
		y,
		I,
		D,
		A,
		S,
		k,
		L,
		q,
		B,
		N,
		P,
		V,
		C,
		H,
		O,
		R,
		U,
		Y,
		j,
		X,
		W,
		F,
		J,
		G,
		K,
		Q,
		tt,
		et,
		at,
		ot,
		mt,
		yt,
		xt,
		wt,
		$t,
		Et,
		bt,
		zt,
		Mt,
		Tt,
		_t = e[5].name + "",
		It = e[5].artist + "",
		Dt = e[20].ptime + "",
		At = e[20].duration + "";
	function St(t, e) {
		return t[1].paused ? lt : st;
	}
	let kt = St(e),
		Lt = kt(e),
		qt = e[5].lrc && rt(e);
	function Bt(t, e) {
		return t[22].muted || t[1].muted ? ct : it;
	}
	let Nt = Bt(e),
		Pt = Nt(e);
	function Vt(t, e) {
		return "random" === t[16].order ? ht : ut;
	}
	let Ct = Vt(e),
		Ht = Ct(e);
	function Ot(t, e) {
		return "none" === t[16].loop ? pt : "one" === t[16].loop ? ft : "all" === t[16].loop ? dt : void 0;
	}
	let Rt = Ot(e),
		Ut = Rt && Rt(e),
		Yt = e[4].length > 1 && vt(e),
		jt = e[4],
		Xt = [];
	for (let t = 0; t < jt.length; t += 1) Xt[t] = gt(nt(e, jt, t));
	return {
		c() {
			(n = p("div")),
				(a = p("div")),
				(r = p("div")),
				Lt.c(),
				(o = g()),
				(i = p("div")),
				(c = p("div")),
				(u = p("span")),
				(v = m(_t)),
				(y = g()),
				(I = p("span")),
				(D = m(It)),
				(A = g()),
				qt && qt.c(),
				(S = g()),
				(k = p("div")),
				(L = p("div")),
				(q = p("div")),
				(B = p("div")),
				(N = g()),
				(P = p("div")),
				(V = p("div")),
				(C = p("span")),
				(H = g()),
				(O = p("div")),
				(R = p("span")),
				(U = p("span")),
				(Y = m(Dt)),
				(j = m(" /\n            ")),
				(X = p("span")),
				(W = m(At)),
				(F = g()),
				(J = p("span")),
				(G = g()),
				(K = p("div")),
				(Q = p("button")),
				Pt.c(),
				(tt = g()),
				(et = p("div")),
				(at = p("div")),
				(ot = p("div")),
				(mt = g()),
				(yt = p("button")),
				Ht.c(),
				(xt = g()),
				(wt = p("button")),
				Ut && Ut.c(),
				($t = g()),
				Yt && Yt.c(),
				(Et = g()),
				(bt = p("div")),
				(zt = p("ol"));
			for (let t = 0; t < Xt.length; t += 1) Xt[t].c();
			this.h();
		},
		l(t) {
			n = E(t, "DIV", { class: !0 });
			var e = $(n);
			a = E(e, "DIV", { class: !0 });
			var l = $(a);
			r = E(l, "DIV", { class: !0, style: !0 });
			var s = $(r);
			Lt.l(s), s.forEach(f), (o = z(l)), (i = E(l, "DIV", { class: !0 }));
			var h = $(i);
			c = E(h, "DIV", { class: !0 });
			var d = $(c);
			u = E(d, "SPAN", { class: !0 });
			var p = $(u);
			(v = b(p, _t)), p.forEach(f), (y = z(d)), (I = E(d, "SPAN", { class: !0 }));
			var m = $(I);
			(D = b(m, It)), m.forEach(f), d.forEach(f), (A = z(h)), qt && qt.l(h), (S = z(h)), (k = E(h, "DIV", { class: !0 }));
			var g = $(k);
			L = E(g, "DIV", { class: !0 });
			var x = $(L);
			q = E(x, "DIV", { class: !0 });
			var w = $(q);
			(B = E(w, "DIV", { class: !0, style: !0 })), $(B).forEach(f), (N = z(w)), (P = E(w, "DIV", { class: !0, style: !0 }));
			var M = $(P);
			V = E(M, "DIV", { class: !0 });
			var T = $(V);
			(C = E(T, "SPAN", { class: !0, style: !0 })), $(C).forEach(f), T.forEach(f), M.forEach(f), w.forEach(f), x.forEach(f), (H = z(g)), (O = E(g, "DIV", { class: !0 }));
			var _ = $(O);
			R = E(_, "SPAN", { class: !0 });
			var Z = $(R);
			U = E(Z, "SPAN", { class: !0 });
			var nt = $(U);
			(Y = b(nt, Dt)), nt.forEach(f), (j = b(Z, " /\n            ")), (X = E(Z, "SPAN", { class: !0 }));
			var lt = $(X);
			(W = b(lt, At)), lt.forEach(f), Z.forEach(f), (F = z(_)), (J = E(_, "SPAN", { hidden: !0 })), $(J).forEach(f), (G = z(_)), (K = E(_, "DIV", { class: !0 }));
			var st = $(K);
			Q = E(st, "BUTTON", { type: !0, class: !0 });
			var rt = $(Q);
			Pt.l(rt), rt.forEach(f), (tt = z(st)), (et = E(st, "DIV", { class: !0 }));
			var it = $(et);
			at = E(it, "DIV", { class: !0 });
			var ct = $(at);
			(ot = E(ct, "DIV", { class: !0, style: !0 })), $(ot).forEach(f), ct.forEach(f), it.forEach(f), st.forEach(f), (mt = z(_)), (yt = E(_, "BUTTON", { type: !0, class: !0 }));
			var ut = $(yt);
			Ht.l(ut), ut.forEach(f), (xt = z(_)), (wt = E(_, "BUTTON", { type: !0, class: !0 }));
			var ht = $(wt);
			Ut && Ut.l(ht), ht.forEach(f), ($t = z(_)), Yt && Yt.l(_), _.forEach(f), g.forEach(f), h.forEach(f), (Et = z(l)), (bt = E(l, "DIV", { class: !0, style: !0 }));
			var dt = $(bt);
			zt = E(dt, "OL", { class: !0 });
			var ft = $(zt);
			for (let n = 0; n < Xt.length; n += 1) Xt[n].l(ft);
			ft.forEach(f), dt.forEach(f), l.forEach(f), e.forEach(f), this.h();
		},
		h() {
			w(r, "class", "aplayer-pic svelte-afaxzx"),
				T(r, "background-image", "url( " + e[5].cover + " )"),
				w(u, "class", "aplayer-title svelte-afaxzx"),
				w(I, "class", "aplayer-artist svelte-afaxzx"),
				w(c, "class", "aplayer-music svelte-afaxzx"),
				w(B, "class", "aplayer-loaded svelte-afaxzx"),
				T(B, "width", e[19].bufferPercentage),
				w(C, "class", "aplayer-loading-icon"),
				T(C, "display", e[21] ? "inline" : "none"),
				w(V, "class", "aplayer-thumb svelte-afaxzx"),
				w(P, "class", "aplayer-played svelte-afaxzx"),
				T(P, "width", e[20].playPercentage),
				w(q, "class", "aplayer-bar svelte-afaxzx"),
				w(L, "class", "aplayer-bar-wrap svelte-afaxzx"),
				w(U, "class", "aplayer-ptime"),
				w(X, "class", "aplayer-dtime"),
				w(R, "class", "aplayer-time-inner svelte-afaxzx"),
				(J.hidden = !0),
				w(Q, "type", "button"),
				w(Q, "class", "aplayer-icon aplayer-icon-volume-down svelte-afaxzx"),
				w(ot, "class", "aplayer-volume svelte-afaxzx"),
				T(ot, "height", e[1].muted ? "0px" : e[22].volumePercentage),
				w(at, "class", "aplayer-volume-bar svelte-afaxzx"),
				w(et, "class", "aplayer-volume-bar-wrap svelte-afaxzx"),
				w(K, "class", "aplayer-volume-wrap svelte-afaxzx"),
				w(yt, "type", "button"),
				w(yt, "class", "aplayer-icon aplayer-icon-order svelte-afaxzx"),
				w(wt, "type", "button"),
				w(wt, "class", "aplayer-icon aplayer-icon-loop svelte-afaxzx"),
				w(O, "class", "aplayer-time svelte-afaxzx"),
				w(k, "class", "aplayer-controller svelte-afaxzx"),
				w(i, "class", "aplayer-info svelte-afaxzx"),
				w(zt, "class", "svelte-afaxzx"),
				w(bt, "class", "aplayer-list svelte-afaxzx"),
				T(bt, "height", e[16].showList ? `${e[18]}px` : "0px"),
				w(a, "class", "aplayer-body  svelte-afaxzx"),
				w(n, "class", "aplayer svelte-afaxzx"),
				_(n, "aplayer-withlrc", e[6].length > 0),
				_(n, "aplayer-withlist", e[4].length > 1),
				_(n, "aplayer-narrow", e[0]),
				_(n, "aplayer-mobile", Z);
		},
		m(t, l) {
			d(t, n, l),
				h(n, a),
				h(a, r),
				Lt.m(r, null),
				h(a, o),
				h(a, i),
				h(i, c),
				h(c, u),
				h(u, v),
				h(c, y),
				h(c, I),
				h(I, D),
				h(i, A),
				qt && qt.m(i, null),
				h(i, S),
				h(i, k),
				h(k, L),
				h(L, q),
				h(q, B),
				h(q, N),
				h(q, P),
				h(P, V),
				h(V, C),
				(C.innerHTML =
					'<svg\n                    xmlns="http://www.w3.org/2000/svg"\n                    version="1.1"\n                    viewBox="0 0 32 32"\n                    ><path\n                      d="M4 16c0-6.6 5.4-12 12-12s12 5.4 12 12c0 1.2-0.8 2-2 2s-2-0.8-2-2c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8c1.2 0 2 0.8 2 2s-0.8 2-2 2c-6.6 0-12-5.4-12-12z"\n                    /></svg\n                  >'),
				e[55](L),
				h(k, H),
				h(k, O),
				h(O, R),
				h(R, U),
				h(U, Y),
				h(R, j),
				h(R, X),
				h(X, W),
				h(O, F),
				h(O, J),
				h(O, G),
				h(O, K),
				h(K, Q),
				Pt.m(Q, null),
				h(K, tt),
				h(K, et),
				h(et, at),
				h(at, ot),
				e[57](at),
				h(O, mt),
				h(O, yt),
				Ht.m(yt, null),
				h(O, xt),
				h(O, wt),
				Ut && Ut.m(wt, null),
				h(O, $t),
				Yt && Yt.m(O, null),
				h(a, Et),
				h(a, bt),
				h(bt, zt);
			for (let e = 0; e < Xt.length; e += 1) Xt[e].m(zt, null);
			e[62](bt),
				e[63](n),
				Mt ||
				((Tt = [
					x(r, "click", e[54]),
					x(L, "mousedown", function () {
						s(e[13]) && e[13].apply(this, arguments);
					}),
					x(L, "mousemove", function () {
						s(e[14]) && e[14].apply(this, arguments);
					}),
					x(L, "mouseup", function () {
						s(e[15]) && e[15].apply(this, arguments);
					}),
					x(L, "mouseleave", function () {
						s(e[15]) && e[15].apply(this, arguments);
					}),
					x(L, "touchstart", function () {
						s(e[13]) && e[13].apply(this, arguments);
					}),
					x(L, "touchmove", function () {
						s(e[14]) && e[14].apply(this, arguments);
					}),
					x(L, "touchend", function () {
						s(e[15]) && e[15].apply(this, arguments);
					}),
					x(Q, "click", e[56], !0),
					x(et, "mousedown", function () {
						s(e[10]) && e[10].apply(this, arguments);
					}),
					x(et, "mousemove", function () {
						s(e[11]) && e[11].apply(this, arguments);
					}),
					x(et, "mouseup", function () {
						s(e[12]) && e[12].apply(this, arguments);
					}),
					x(et, "mouseleave", function () {
						s(e[12]) && e[12].apply(this, arguments);
					}),
					x(et, "touchstart", function () {
						s(e[10]) && e[10].apply(this, arguments);
					}),
					x(et, "touchmove", function () {
						s(e[11]) && e[11].apply(this, arguments);
					}),
					x(et, "touchend", function () {
						s(e[12]) && e[12].apply(this, arguments);
					}),
					x(yt, "click", e[58]),
					x(wt, "click", e[59]),
				]),
					(Mt = !0));
		},
		p(t, a) {
			if (
				(kt !== (kt = St((e = t))) && (Lt.d(1), (Lt = kt(e)), Lt && (Lt.c(), Lt.m(r, null))),
					32 & a[0] && T(r, "background-image", "url( " + e[5].cover + " )"),
					32 & a[0] && _t !== (_t = e[5].name + "") && M(v, _t),
					32 & a[0] && It !== (It = e[5].artist + "") && M(D, It),
					e[5].lrc ? (qt ? qt.p(e, a) : ((qt = rt(e)), qt.c(), qt.m(i, S))) : qt && (qt.d(1), (qt = null)),
					524288 & a[0] && T(B, "width", e[19].bufferPercentage),
					2097152 & a[0] && T(C, "display", e[21] ? "inline" : "none"),
					1048576 & a[0] && T(P, "width", e[20].playPercentage),
					1048576 & a[0] && Dt !== (Dt = e[20].ptime + "") && M(Y, Dt),
					1048576 & a[0] && At !== (At = e[20].duration + "") && M(W, At),
					Nt === (Nt = Bt(e)) && Pt ? Pt.p(e, a) : (Pt.d(1), (Pt = Nt(e)), Pt && (Pt.c(), Pt.m(Q, null))),
					4194306 & a[0] && T(ot, "height", e[1].muted ? "0px" : e[22].volumePercentage),
					Ct === (Ct = Vt(e)) && Ht ? Ht.p(e, a) : (Ht.d(1), (Ht = Ct(e)), Ht && (Ht.c(), Ht.m(yt, null))),
					Rt === (Rt = Ot(e)) && Ut ? Ut.p(e, a) : (Ut && Ut.d(1), (Ut = Rt && Rt(e)), Ut && (Ut.c(), Ut.m(wt, null))),
					e[4].length > 1 ? (Yt ? Yt.p(e, a) : ((Yt = vt(e)), Yt.c(), Yt.m(O, null))) : Yt && (Yt.d(1), (Yt = null)),
					131090 & a[0])
			) {
				let t;
				for (jt = e[4], t = 0; t < jt.length; t += 1) {
					const n = nt(e, jt, t);
					Xt[t] ? Xt[t].p(n, a) : ((Xt[t] = gt(n)), Xt[t].c(), Xt[t].m(zt, null));
				}
				for (; t < Xt.length; t += 1) Xt[t].d(1);
				Xt.length = jt.length;
			}
			327680 & a[0] && T(bt, "height", e[16].showList ? `${e[18]}px` : "0px"), 64 & a[0] && _(n, "aplayer-withlrc", e[6].length > 0), 16 & a[0] && _(n, "aplayer-withlist", e[4].length > 1), 1 & a[0] && _(n, "aplayer-narrow", e[0]);
		},
		i: t,
		o: t,
		d(t) {
			t && f(n),
				Lt.d(),
				qt && qt.d(),
				e[55](null),
				Pt.d(),
				e[57](null),
				Ht.d(),
				Ut && Ut.d(),
				Yt && Yt.d(),
				(function (t, e) {
					for (let n = 0; n < t.length; n += 1) t[n] && t[n].d(e);
				})(Xt, t),
				e[62](null),
				e[63](null),
				(Mt = !1),
				l(Tt);
		},
	};
}
function xt(t, n, a) {
	let l, s, r, o, h, d, f, p, v, m, g, y, x, w, $, E, b, z;
	var M, T;
	const _ = S(),
		I = k(),
		D = (t, e) => {
			I(t, e), _.dispatchEvent && _.dispatchEvent(new CustomEvent(t, { detail: e }));
		},
		{ player: A, playList: L, audioList: B, currentSong: N, rdTime: P, currentTime: V, duration: C, rdBufTime: H, wtBufTime: O, loading: R, lrc: U, controlState: Y, volumeState: j } = (function (t) {
			const e = document.createElement("audio");
			et.push(e),
				(function (t, e) {
					[
						"abort",
						"canplay",
						"canplaythrough",
						"durationchange",
						"emptied",
						"ended",
						"error",
						"loadeddata",
						"loadedmetadata",
						"loadstart",
						"mozaudioavailable",
						"pause",
						"play",
						"playing",
						"progress",
						"ratechange",
						"seeked",
						"seeking",
						"stalled",
						"suspend",
						"timeupdate",
						"volumechange",
						"waiting",
					].forEach((n) => {
						t.addEventListener(n, (t) => {
							e(n, t);
						});
					});
				})(e, t);
			let n = G(0),
				a = G(NaN);
			const l = K([n, a], ([t, e]) => {
				let n = t / e;
				return (n = Math.max(n, 0)), (n = Math.min(n, 1)), (n *= 100), { ptime: Q(t), duration: Q(e), playPercentage: `${n}%` };
			});
			let s = G(0);
			const r = K([s, a], ([t, e]) => {
				let n = t / e;
				return (n = Math.max(n, 0)), (n = Math.min(n, 1)), (n *= 100), { bufferPercentage: `${n}%`, bufTime: t };
			}),
				o = G({ playingIndex: 0, audio: [] }),
				i = K(o, (t) => t.audio),
				c = G({ volume: 0.7, loop: "all", order: "list", showList: !0 }),
				u = K(c, (t) => ({ volumePercentage: 100 * t.volume + "%", muted: 0 === t.volume })),
				h = K(o, (t) => t.audio[t.playingIndex]),
				d = K([r, n], ([{ bufTime: t }, n]) => !e.paused && (e.readyState <= HTMLMediaElement.HAVE_CURRENT_DATA || (t - n < 2 && e.readyState === HTMLMediaElement.HAVE_FUTURE_DATA))),
				f = K(
					h,
					(t, e) => {
						if (!t || !t.lrc) return void e([]);
						const n = t.lrc;
						n.startsWith("http")
							? fetch(n)
								.then((t) => {
									if (!t.ok) throw new Error(`${t.statusText} canot loading lrc from ${n}`);
									return t.text();
								})
								.then((t) => {
									e(tt(t));
								})
								.catch((t) => {
									throw (e([]), console.error(t), t);
								})
							: e(tt(n));
					},
					[]
				);
			let p = !1;
			h.subscribe((e) => {
				p && t("listswitch", e), (p = !0);
			});
			let v = !1;
			return (
				i.subscribe((e) => {
					v && t("listchange", e), (v = !0);
				}),
				f.subscribe((e) => {
					e.length > 0 ? t("lrcshow") : t("lrchide");
				}),
				{ player: e, playList: o, audioList: i, currentSong: h, rdTime: l, currentTime: n, duration: a, rdBufTime: r, wtBufTime: s, loading: d, lrc: f, controlState: c, volumeState: u }
			);
		})(D);
	i(t, L, (t) => a(17, (p = t))),
		i(t, B, (t) => a(4, (v = t))),
		i(t, N, (t) => a(5, (m = t))),
		i(t, P, (t) => a(20, (E = t))),
		i(t, V, (t) => a(66, (y = t))),
		i(t, C, (t) => a(67, (x = t))),
		i(t, H, (t) => a(19, ($ = t))),
		i(t, O, (t) => a(68, (w = t))),
		i(t, R, (t) => a(21, (b = t))),
		i(t, U, (t) => a(6, (g = t))),
		i(t, Y, (t) => a(16, (f = t))),
		i(t, j, (t) => a(22, (z = t)));
	let X,
		{ audio: W } = n,
		{ order: F = f.order } = n,
		{ loop: J = f.loop } = n,
		{ volume: Z = f.volume } = n,
		{ mini: nt = !1 } = n,
		{ mutex: at = !0 } = n,
		{ autoplay: lt = !1 } = n,
		{ theme: st = "#fadfa3" } = n,
		{ list_max_height: rt = 1 / 0 } = n,
		ot = !1,
		{ base_font_size: it = "12" } = n;
	const ct = () => {
		at && et.forEach((t) => t.pause()),
			A.play().catch((t) => {
				console.error(t);
			});
	};
	let ut = -1;
	A.addEventListener("timeupdate", () => {
		if ((u(V, (y = A.currentTime), y), d.includes("lrc"))) {
			for (; ut > 0 && A.currentTime < g[ut][0];) a(7, ut--, ut);
			for (; ut + 1 < g.length && A.currentTime >= g[ut + 1][0];) a(7, ut++, ut);
		}
	}),
		A.addEventListener("volumechange", () => {
			u(Y, (f.volume = A.volume), f);
		}),
		A.addEventListener("loadedmetadata", () => {
			u(C, (x = A.duration), x);
		}),
		A.addEventListener("error", () => {
			console.warn("An audio error has occurred, player will skip forward in 2 seconds."),
				v.length > 1 &&
				setTimeout(() => {
					u(L, (p.playingIndex = (p.playingIndex + 1) % v.length), p), A.paused && ct();
				}, 2e3);
		});
	const ht = () => {
		const t = A.buffered.length ? A.buffered.end(A.buffered.length - 1) : 0;
		u(O, (w = t), w);
	};
	A.addEventListener("progress", ht),
		A.addEventListener("canplay", ht),
		A.addEventListener("durationchange", () => {
			u(C, (x = A.duration), x);
		});
	let dt, ft, pt, vt, mt, gt, yt, xt, wt, $t;
	var Et;
	A.addEventListener("ended", () => {
		A.paused ||
			(() => {
				const t = v,
					e = (p.playingIndex + 1) % t.length;
				if ("none" === f.loop) {
					if ("list" === f.order) p.playingIndex < t.length - 1 ? (u(L, (p.playingIndex = e), p), a(1, (A.currentTime = 0), A)) : (u(L, (p.playingIndex = (p.playingIndex + 1) % t.length), p), a(48, (X = !0)), A.pause());
					else if ("random" === f.order) {
						const n = Math.floor(t.length * Math.random());
						n === p.playingIndex ? u(L, (p.playingIndex = e), p) : u(L, (p.playingIndex = n), p), a(1, (A.currentTime = 0), A);
					}
				} else "one" === f.loop ? a(1, (A.currentTime = 0), A) : "all" === f.loop && u(L, (p.playingIndex = e), p);
			})();
	}),
		(Et = () => {
			"localhost" === location.hostname && window && (window.theAudio = A);
			const t = (function (t, e) {
				let n = !1;
				return {
					volumeDragStart: () => {
						n = !0;
					},
					volumeDragMove: (a) => {
						if (n) {
							let n = 1 - ((a.clientY || a.changedTouches[0].clientY) - e.getBoundingClientRect().top) / e.clientHeight;
							(n = Math.max(n, 0)), (n = Math.min(n, 1)), (t.volume = n);
						}
					},
					volumeDragEnd: (a) => {
						if (n) {
							let l = 1 - ((a.clientY || a.changedTouches[0].clientY) - e.getBoundingClientRect().top) / e.clientHeight;
							(l = Math.max(l, 0)), (l = Math.min(l, 1)), (t.volume = l), (n = !1);
						}
					},
				};
			})(A, dt);
			a(10, (pt = t.volumeDragStart)), a(11, (vt = t.volumeDragMove)), a(12, (mt = t.volumeDragEnd));
			const e = (function (t, e) {
				let n = !1;
				return {
					progressDragStart: () => {
						n = !0;
					},
					progressDragMove: (a) => {
						if (n) {
							let n = ((a.clientX || a.changedTouches[0].clientX) - e.getBoundingClientRect().left) / e.clientWidth;
							(n = Math.max(n, 0)), (n = Math.min(n, 1)), (t.currentTime = t.duration * n);
						}
					},
					progressDragEnd: (a) => {
						if (n) {
							n = !1;
							console.log("progressDragEnd", e)
							let l = ((a.clientX || a.changedTouches[0].clientX) - e.getBoundingClientRect().left) / e.clientWidth;
							(l = Math.max(l, 0)), (l = Math.min(l, 1)), (t.currentTime = t.duration * l);
						}
					},
				};
			})(A, ft);
			a(13, (gt = e.progressDragStart)),
				a(14, (yt = e.progressDragMove)),
				a(15, (xt = e.progressDragEnd)),
				null == wt ||
				wt.addEventListener("transitionend", () => {
					var t;
					a(18, (r = Math.min(null !== (t = null == wt ? void 0 : wt.scrollHeight) && void 0 !== t ? t : 0, rt)));
				});
		}),
		S().$$.on_mount.push(Et),
		(function (t) {
			S().$$.on_destroy.push(t);
		})(() => {
			D("destroy");
		});
	return (
		(t.$$set = (t) => {
			a(73, (n = e(e({}, n), c(t)))),
				"audio" in t && a(37, (W = t.audio)),
				"order" in t && a(38, (F = t.order)),
				"loop" in t && a(39, (J = t.loop)),
				"volume" in t && a(40, (Z = t.volume)),
				"mini" in t && a(0, (nt = t.mini)),
				"mutex" in t && a(41, (at = t.mutex)),
				"autoplay" in t && a(42, (lt = t.autoplay)),
				"theme" in t && a(43, (st = t.theme)),
				"list_max_height" in t && a(44, (rt = t.list_max_height)),
				"base_font_size" in t && a(45, (it = t.base_font_size));
		}),
		(t.$$.update = () => {
			264256 & t.$$.dirty[1] && (a(48, (X = !!ot || !lt)), a(49, (ot = !0))),
				64 & t.$$.dirty[1] && a(50, (l = "string" == typeof W ? JSON.parse(W) : W)),
				524288 & t.$$.dirty[1] && u(L, (p.audio = Array.isArray(l) ? l : [l]), p),
				a(
					51,
					(s =
						!(function (t, e) {
							const n = t[e];
							return !(null == n || "false" === n);
						})(n, "list_folded") && v.length > 1)
				),
				1048576 & t.$$.dirty[1] && u(Y, (f.showList = s), f),
				256 & t.$$.dirty[1] && u(Y, (f.loop = J), f),
				128 & t.$$.dirty[1] && u(Y, (f.order = F), f),
				512 & t.$$.dirty[1] && u(Y, (f.volume = Z), f),
				(4 & t.$$.dirty[0]) | (40960 & t.$$.dirty[1]) && a(18, (r = Math.min(null !== a(46, (M = null == wt ? void 0 : wt.scrollHeight)) && void 0 !== M ? M : 0, rt))),
				512 & t.$$.dirty[1] && a(1, (A.volume = Z), A),
				32 & t.$$.dirty[0] && a(1, (A.src = m.url), A),
				(32 & t.$$.dirty[0]) | (69632 & t.$$.dirty[1]) && a(52, (o = null !== a(47, (T = m.theme)) && void 0 !== T ? T : st)),
				16384 & t.$$.dirty[1] && a(53, (h = String(it).match(/^\d+/)[0] + "px")),
				(8 & t.$$.dirty[0]) | (6291456 & t.$$.dirty[1]) && $t && ($t.style.setProperty("--theme-color", o), $t.style.setProperty("--base-font-size", h)),
				64 & t.$$.dirty[0] && (d = g && g.length > 0 ? "withlrc" : ""),
				(2 & t.$$.dirty[0]) | (131072 & t.$$.dirty[1]) && (A.src, a(7, (ut = -1)), X || ct(), a(48, (X = !1)));
		}),
		(n = c(n)),
		[
			nt,
			A,
			wt,
			$t,
			v,
			m,
			g,
			ut,
			dt,
			ft,
			pt,
			vt,
			mt,
			gt,
			yt,
			xt,
			f,
			p,
			r,
			$,
			E,
			b,
			z,
			D,
			L,
			B,
			N,
			P,
			V,
			C,
			H,
			O,
			R,
			U,
			Y,
			j,
			ct,
			W,
			F,
			J,
			Z,
			at,
			lt,
			st,
			rt,
			it,
			M,
			T,
			X,
			ot,
			l,
			s,
			o,
			h,
			() => {
				A.paused ? ct() : A.pause();
			},
			function (t) {
				q[t ? "unshift" : "push"](() => {
					(ft = t), a(9, ft);
				});
			},
			() => {
				a(1, (A.muted = !A.muted), A);
			},
			function (t) {
				q[t ? "unshift" : "push"](() => {
					(dt = t), a(8, dt);
				});
			},
			() => {
				u(Y, (f.order = "list" === f.order ? "random" : "list"), f);
			},
			() => {
				"all" === f.loop ? u(Y, (f.loop = "one"), f) : "one" === f.loop ? u(Y, (f.loop = "none"), f) : "none" === f.loop && u(Y, (f.loop = "all"), f);
			},
			() => {
				u(Y, (f.showList = !f.showList), f), f.showList ? D("listshow") : D("listhide");
			},
			(t) => {
				u(L, (p.playingIndex = t), p), a(1, (A.currentTime = 0), A);
			},
			function (t) {
				q[t ? "unshift" : "push"](() => {
					(wt = t), a(2, wt);
				});
			},
			function (t) {
				q[t ? "unshift" : "push"](() => {
					($t = t), a(3, $t);
				});
			},
		]
	);
}
export default class extends class {
	$destroy() {
		!(function (t, e) {
			const n = t.$$;
			null !== n.fragment && (l(n.on_destroy), n.fragment && n.fragment.d(e), (n.on_destroy = n.fragment = null), (n.ctx = []));
		})(this, 1),
			(this.$destroy = t);
	}
	$on(t, e) {
		const n = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
		return (
			n.push(e),
			() => {
				const t = n.indexOf(e);
				-1 !== t && n.splice(t, 1);
			}
		);
	}
	$set(t) {
		var e;
		this.$$set && ((e = t), 0 !== Object.keys(e).length) && ((this.$$.skip_bound = !0), this.$$set(t), (this.$$.skip_bound = !1));
	}
} {
	constructor(t) {
		super(), F(this, t, xt, yt, r, { audio: 37, order: 38, loop: 39, volume: 40, mini: 0, mutex: 41, autoplay: 42, theme: 43, list_max_height: 44, base_font_size: 45 }, [-1, -1, -1]);
	}
}
