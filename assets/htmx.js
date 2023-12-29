var commonjsGlobal = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function getDefaultExportFromCjs(Fe) {
  return Fe && Fe.__esModule && Object.prototype.hasOwnProperty.call(Fe, "default") ? Fe.default : Fe;
}
var htmx_min = { exports: {} };
(function(module) {
  (function(Fe, _r) {
    module.exports ? module.exports = _r() : Fe.htmx = Fe.htmx || _r();
  })(typeof self < "u" ? self : commonjsGlobal, function() {
    return function() {
      var Q = { onLoad: t, process: Bt, on: Z, off: K, trigger: ce, ajax: Or, find: C, findAll: f, closest: v, values: function(Fe, _r) {
        var Fr = ur(Fe, _r || "post");
        return Fr.values;
      }, remove: B, addClass: F, removeClass: n, toggleClass: V, takeClass: j, defineExtension: kr, removeExtension: Pr, logAll: X, logNone: U, logger: null, config: { historyEnabled: !0, historyCacheSize: 10, refreshOnHistoryMiss: !1, defaultSwapStyle: "innerHTML", defaultSwapDelay: 0, defaultSettleDelay: 20, includeIndicatorStyles: !0, indicatorClass: "htmx-indicator", requestClass: "htmx-request", addedClass: "htmx-added", settlingClass: "htmx-settling", swappingClass: "htmx-swapping", allowEval: !0, allowScriptTags: !0, inlineScriptNonce: "", attributesToSettle: ["class", "style", "width", "height"], withCredentials: !1, timeout: 0, wsReconnectDelay: "full-jitter", wsBinaryType: "blob", disableSelector: "[hx-disable], [data-hx-disable]", useTemplateFragments: !1, scrollBehavior: "smooth", defaultFocusScroll: !1, getCacheBusterParam: !1, globalViewTransitions: !1, methodsThatUseUrlParams: ["get"], selfRequestsOnly: !1, ignoreTitle: !1, scrollIntoViewOnBoost: !0 }, parseInterval: d, _: e, createEventSource: function(Fe) {
        return new EventSource(Fe, { withCredentials: !0 });
      }, createWebSocket: function(Fe) {
        var _r = new WebSocket(Fe, []);
        return _r.binaryType = Q.config.wsBinaryType, _r;
      }, version: "1.9.9" }, r = { addTriggerHandler: Tt, bodyContains: se, canAccessLocalStorage: M, findThisElement: de, filterValues: dr, hasAttribute: o, getAttributeValue: te, getClosestAttributeValue: ne, getClosestMatch: c, getExpressionVars: Cr, getHeaders: vr, getInputValues: ur, getInternalData: ae, getSwapSpecification: mr, getTriggerSpecs: Qe, getTarget: ge, makeFragment: l, mergeObjects: le, makeSettleInfo: R, oobSwap: xe, querySelectorExt: ue, selectAndSwap: Ue, settleImmediately: Yt, shouldCancel: it, triggerEvent: ce, triggerErrorEvent: fe, withExtensions: T }, b = ["get", "post", "put", "delete", "patch"], w = b.map(function(Fe) {
        return "[hx-" + Fe + "], [data-hx-" + Fe + "]";
      }).join(", ");
      function d(Fe) {
        if (Fe != null)
          return Fe.slice(-2) == "ms" ? parseFloat(Fe.slice(0, -2)) || void 0 : Fe.slice(-1) == "s" ? parseFloat(Fe.slice(0, -1)) * 1e3 || void 0 : Fe.slice(-1) == "m" ? parseFloat(Fe.slice(0, -1)) * 1e3 * 60 || void 0 : parseFloat(Fe) || void 0;
      }
      function ee(Fe, _r) {
        return Fe.getAttribute && Fe.getAttribute(_r);
      }
      function o(Fe, _r) {
        return Fe.hasAttribute && (Fe.hasAttribute(_r) || Fe.hasAttribute("data-" + _r));
      }
      function te(Fe, _r) {
        return ee(Fe, _r) || ee(Fe, "data-" + _r);
      }
      function u(Fe) {
        return Fe.parentElement;
      }
      function re() {
        return document;
      }
      function c(Fe, _r) {
        for (; Fe && !_r(Fe); )
          Fe = u(Fe);
        return Fe || null;
      }
      function S(Fe, _r, Fr) {
        var jr = te(_r, Fr), $r = te(_r, "hx-disinherit");
        return Fe !== _r && $r && ($r === "*" || $r.split(" ").indexOf(Fr) >= 0) ? "unset" : jr;
      }
      function ne(Fe, _r) {
        var Fr = null;
        if (c(Fe, function(jr) {
          return Fr = S(Fe, jr, _r);
        }), Fr !== "unset")
          return Fr;
      }
      function h(Fe, _r) {
        var Fr = Fe.matches || Fe.matchesSelector || Fe.msMatchesSelector || Fe.mozMatchesSelector || Fe.webkitMatchesSelector || Fe.oMatchesSelector;
        return Fr && Fr.call(Fe, _r);
      }
      function q(Fe) {
        var _r = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i, Fr = _r.exec(Fe);
        return Fr ? Fr[1].toLowerCase() : "";
      }
      function i(Fe, _r) {
        for (var Fr = new DOMParser(), jr = Fr.parseFromString(Fe, "text/html"), $r = jr.body; _r > 0; )
          _r--, $r = $r.firstChild;
        return $r == null && ($r = re().createDocumentFragment()), $r;
      }
      function H(Fe) {
        return Fe.match(/<body/);
      }
      function l(Fe) {
        var _r = !H(Fe);
        if (Q.config.useTemplateFragments && _r) {
          var Fr = i("<body><template>" + Fe + "</template></body>", 0);
          return Fr.querySelector("template").content;
        } else {
          var jr = q(Fe);
          switch (jr) {
            case "thead":
            case "tbody":
            case "tfoot":
            case "colgroup":
            case "caption":
              return i("<table>" + Fe + "</table>", 1);
            case "col":
              return i("<table><colgroup>" + Fe + "</colgroup></table>", 2);
            case "tr":
              return i("<table><tbody>" + Fe + "</tbody></table>", 2);
            case "td":
            case "th":
              return i("<table><tbody><tr>" + Fe + "</tr></tbody></table>", 3);
            case "script":
            case "style":
              return i("<div>" + Fe + "</div>", 1);
            default:
              return i(Fe, 0);
          }
        }
      }
      function ie(Fe) {
        Fe && Fe();
      }
      function L(Fe, _r) {
        return Object.prototype.toString.call(Fe) === "[object " + _r + "]";
      }
      function A(Fe) {
        return L(Fe, "Function");
      }
      function N(Fe) {
        return L(Fe, "Object");
      }
      function ae(Fe) {
        var _r = "htmx-internal-data", Fr = Fe[_r];
        return Fr || (Fr = Fe[_r] = {}), Fr;
      }
      function I(Fe) {
        var _r = [];
        if (Fe)
          for (var Fr = 0; Fr < Fe.length; Fr++)
            _r.push(Fe[Fr]);
        return _r;
      }
      function oe(Fe, _r) {
        if (Fe)
          for (var Fr = 0; Fr < Fe.length; Fr++)
            _r(Fe[Fr]);
      }
      function k(Fe) {
        var _r = Fe.getBoundingClientRect(), Fr = _r.top, jr = _r.bottom;
        return Fr < window.innerHeight && jr >= 0;
      }
      function se(Fe) {
        return Fe.getRootNode && Fe.getRootNode() instanceof window.ShadowRoot ? re().body.contains(Fe.getRootNode().host) : re().body.contains(Fe);
      }
      function P(Fe) {
        return Fe.trim().split(/\s+/);
      }
      function le(Fe, _r) {
        for (var Fr in _r)
          _r.hasOwnProperty(Fr) && (Fe[Fr] = _r[Fr]);
        return Fe;
      }
      function E(Fe) {
        try {
          return JSON.parse(Fe);
        } catch (_r) {
          return x(_r), null;
        }
      }
      function M() {
        var Fe = "htmx:localStorageTest";
        try {
          return localStorage.setItem(Fe, Fe), localStorage.removeItem(Fe), !0;
        } catch {
          return !1;
        }
      }
      function D(Fe) {
        try {
          var _r = new URL(Fe);
          return _r && (Fe = _r.pathname + _r.search), Fe.match("^/$") || (Fe = Fe.replace(/\/+$/, "")), Fe;
        } catch {
          return Fe;
        }
      }
      function e(e) {
        return wr(re().body, function() {
          return eval(e);
        });
      }
      function t(Fe) {
        var _r = Q.on("htmx:load", function(Fr) {
          Fe(Fr.detail.elt);
        });
        return _r;
      }
      function X() {
        Q.logger = function(Fe, _r, Fr) {
          console && console.log(_r, Fe, Fr);
        };
      }
      function U() {
        Q.logger = null;
      }
      function C(Fe, _r) {
        return _r ? Fe.querySelector(_r) : C(re(), Fe);
      }
      function f(Fe, _r) {
        return _r ? Fe.querySelectorAll(_r) : f(re(), Fe);
      }
      function B(Fe, _r) {
        Fe = s(Fe), _r ? setTimeout(function() {
          B(Fe), Fe = null;
        }, _r) : Fe.parentElement.removeChild(Fe);
      }
      function F(Fe, _r, Fr) {
        Fe = s(Fe), Fr ? setTimeout(function() {
          F(Fe, _r), Fe = null;
        }, Fr) : Fe.classList && Fe.classList.add(_r);
      }
      function n(Fe, _r, Fr) {
        Fe = s(Fe), Fr ? setTimeout(function() {
          n(Fe, _r), Fe = null;
        }, Fr) : Fe.classList && (Fe.classList.remove(_r), Fe.classList.length === 0 && Fe.removeAttribute("class"));
      }
      function V(Fe, _r) {
        Fe = s(Fe), Fe.classList.toggle(_r);
      }
      function j(Fe, _r) {
        Fe = s(Fe), oe(Fe.parentElement.children, function(Fr) {
          n(Fr, _r);
        }), F(Fe, _r);
      }
      function v(Fe, _r) {
        if (Fe = s(Fe), Fe.closest)
          return Fe.closest(_r);
        do
          if (Fe == null || h(Fe, _r))
            return Fe;
        while (Fe = Fe && u(Fe));
        return null;
      }
      function g(Fe, _r) {
        return Fe.substring(0, _r.length) === _r;
      }
      function _(Fe, _r) {
        return Fe.substring(Fe.length - _r.length) === _r;
      }
      function z(Fe) {
        var _r = Fe.trim();
        return g(_r, "<") && _(_r, "/>") ? _r.substring(1, _r.length - 2) : _r;
      }
      function W(Fe, _r) {
        return _r.indexOf("closest ") === 0 ? [v(Fe, z(_r.substr(8)))] : _r.indexOf("find ") === 0 ? [C(Fe, z(_r.substr(5)))] : _r === "next" ? [Fe.nextElementSibling] : _r.indexOf("next ") === 0 ? [$(Fe, z(_r.substr(5)))] : _r === "previous" ? [Fe.previousElementSibling] : _r.indexOf("previous ") === 0 ? [G(Fe, z(_r.substr(9)))] : _r === "document" ? [document] : _r === "window" ? [window] : _r === "body" ? [document.body] : re().querySelectorAll(z(_r));
      }
      var $ = function(Fe, _r) {
        for (var Fr = re().querySelectorAll(_r), jr = 0; jr < Fr.length; jr++) {
          var $r = Fr[jr];
          if ($r.compareDocumentPosition(Fe) === Node.DOCUMENT_POSITION_PRECEDING)
            return $r;
        }
      }, G = function(Fe, _r) {
        for (var Fr = re().querySelectorAll(_r), jr = Fr.length - 1; jr >= 0; jr--) {
          var $r = Fr[jr];
          if ($r.compareDocumentPosition(Fe) === Node.DOCUMENT_POSITION_FOLLOWING)
            return $r;
        }
      };
      function ue(Fe, _r) {
        return _r ? W(Fe, _r)[0] : W(re().body, Fe)[0];
      }
      function s(Fe) {
        return L(Fe, "String") ? C(Fe) : Fe;
      }
      function J(Fe, _r, Fr) {
        return A(_r) ? { target: re().body, event: Fe, listener: _r } : { target: s(Fe), event: _r, listener: Fr };
      }
      function Z(Fe, _r, Fr) {
        Dr(function() {
          var $r = J(Fe, _r, Fr);
          $r.target.addEventListener($r.event, $r.listener);
        });
        var jr = A(_r);
        return jr ? _r : Fr;
      }
      function K(Fe, _r, Fr) {
        return Dr(function() {
          var jr = J(Fe, _r, Fr);
          jr.target.removeEventListener(jr.event, jr.listener);
        }), A(_r) ? _r : Fr;
      }
      var ve = re().createElement("output");
      function Y(Fe, _r) {
        var Fr = ne(Fe, _r);
        if (Fr) {
          if (Fr === "this")
            return [de(Fe, _r)];
          var jr = W(Fe, Fr);
          return jr.length === 0 ? (x('The selector "' + Fr + '" on ' + _r + " returned no matches!"), [ve]) : jr;
        }
      }
      function de(Fe, _r) {
        return c(Fe, function(Fr) {
          return te(Fr, _r) != null;
        });
      }
      function ge(Fe) {
        var _r = ne(Fe, "hx-target");
        if (_r)
          return _r === "this" ? de(Fe, "hx-target") : ue(Fe, _r);
        var Fr = ae(Fe);
        return Fr.boosted ? re().body : Fe;
      }
      function me(Fe) {
        for (var _r = Q.config.attributesToSettle, Fr = 0; Fr < _r.length; Fr++)
          if (Fe === _r[Fr])
            return !0;
        return !1;
      }
      function pe(Fe, _r) {
        oe(Fe.attributes, function(Fr) {
          !_r.hasAttribute(Fr.name) && me(Fr.name) && Fe.removeAttribute(Fr.name);
        }), oe(_r.attributes, function(Fr) {
          me(Fr.name) && Fe.setAttribute(Fr.name, Fr.value);
        });
      }
      function ye(Fe, _r) {
        for (var Fr = Mr(_r), jr = 0; jr < Fr.length; jr++) {
          var $r = Fr[jr];
          try {
            if ($r.isInlineSwap(Fe))
              return !0;
          } catch (Qr) {
            x(Qr);
          }
        }
        return Fe === "outerHTML";
      }
      function xe(Fe, _r, Fr) {
        var jr = "#" + ee(_r, "id"), $r = "outerHTML";
        Fe === "true" || (Fe.indexOf(":") > 0 ? ($r = Fe.substr(0, Fe.indexOf(":")), jr = Fe.substr(Fe.indexOf(":") + 1, Fe.length)) : $r = Fe);
        var Qr = re().querySelectorAll(jr);
        return Qr ? (oe(Qr, function(Kr) {
          var zr, Vr = _r.cloneNode(!0);
          zr = re().createDocumentFragment(), zr.appendChild(Vr), ye($r, Kr) || (zr = Vr);
          var Wr = { shouldSwap: !0, target: Kr, fragment: zr };
          ce(Kr, "htmx:oobBeforeSwap", Wr) && (Kr = Wr.target, Wr.shouldSwap && De($r, Kr, Kr, zr, Fr), oe(Fr.elts, function(Yr) {
            ce(Yr, "htmx:oobAfterSwap", Wr);
          }));
        }), _r.parentNode.removeChild(_r)) : (_r.parentNode.removeChild(_r), fe(re().body, "htmx:oobErrorNoTarget", { content: _r })), Fe;
      }
      function be(Fe, _r, Fr) {
        var jr = ne(Fe, "hx-select-oob");
        if (jr) {
          var $r = jr.split(",");
          for (let Wr = 0; Wr < $r.length; Wr++) {
            var Qr = $r[Wr].split(":", 2), Kr = Qr[0].trim();
            Kr.indexOf("#") === 0 && (Kr = Kr.substring(1));
            var zr = Qr[1] || "true", Vr = _r.querySelector("#" + Kr);
            Vr && xe(zr, Vr, Fr);
          }
        }
        oe(f(_r, "[hx-swap-oob], [data-hx-swap-oob]"), function(Wr) {
          var Yr = te(Wr, "hx-swap-oob");
          Yr != null && xe(Yr, Wr, Fr);
        });
      }
      function we(Fe) {
        oe(f(Fe, "[hx-preserve], [data-hx-preserve]"), function(_r) {
          var Fr = te(_r, "id"), jr = re().getElementById(Fr);
          jr != null && _r.parentNode.replaceChild(jr, _r);
        });
      }
      function Se(Fe, _r, Fr) {
        oe(_r.querySelectorAll("[id]"), function(jr) {
          var $r = ee(jr, "id");
          if ($r && $r.length > 0) {
            var Qr = $r.replace("'", "\\'"), Kr = jr.tagName.replace(":", "\\:"), zr = Fe.querySelector(Kr + "[id='" + Qr + "']");
            if (zr && zr !== Fe) {
              var Vr = jr.cloneNode();
              pe(jr, zr), Fr.tasks.push(function() {
                pe(jr, Vr);
              });
            }
          }
        });
      }
      function Ee(Fe) {
        return function() {
          n(Fe, Q.config.addedClass), Bt(Fe), Ot(Fe), Ce(Fe), ce(Fe, "htmx:load");
        };
      }
      function Ce(Fe) {
        var _r = "[autofocus]", Fr = h(Fe, _r) ? Fe : Fe.querySelector(_r);
        Fr != null && Fr.focus();
      }
      function a(Fe, _r, Fr, jr) {
        for (Se(Fe, Fr, jr); Fr.childNodes.length > 0; ) {
          var $r = Fr.firstChild;
          F($r, Q.config.addedClass), Fe.insertBefore($r, _r), $r.nodeType !== Node.TEXT_NODE && $r.nodeType !== Node.COMMENT_NODE && jr.tasks.push(Ee($r));
        }
      }
      function Te(Fe, _r) {
        for (var Fr = 0; Fr < Fe.length; )
          _r = (_r << 5) - _r + Fe.charCodeAt(Fr++) | 0;
        return _r;
      }
      function Re(Fe) {
        var _r = 0;
        if (Fe.attributes)
          for (var Fr = 0; Fr < Fe.attributes.length; Fr++) {
            var jr = Fe.attributes[Fr];
            jr.value && (_r = Te(jr.name, _r), _r = Te(jr.value, _r));
          }
        return _r;
      }
      function Oe(Fe) {
        var _r = ae(Fe);
        if (_r.onHandlers) {
          for (let Fr = 0; Fr < _r.onHandlers.length; Fr++) {
            const jr = _r.onHandlers[Fr];
            Fe.removeEventListener(jr.event, jr.listener);
          }
          delete _r.onHandlers;
        }
      }
      function qe(Fe) {
        var _r = ae(Fe);
        _r.timeout && clearTimeout(_r.timeout), _r.webSocket && _r.webSocket.close(), _r.sseEventSource && _r.sseEventSource.close(), _r.listenerInfos && oe(_r.listenerInfos, function(Fr) {
          Fr.on && Fr.on.removeEventListener(Fr.trigger, Fr.listener);
        }), _r.initHash && (_r.initHash = null), Oe(Fe);
      }
      function m(Fe) {
        ce(Fe, "htmx:beforeCleanupElement"), qe(Fe), Fe.children && oe(Fe.children, function(_r) {
          m(_r);
        });
      }
      function He(Fe, _r, Fr) {
        if (Fe.tagName === "BODY")
          return Pe(Fe, _r, Fr);
        var jr, $r = Fe.previousSibling;
        for (a(u(Fe), Fe, _r, Fr), $r == null ? jr = u(Fe).firstChild : jr = $r.nextSibling, ae(Fe).replacedWith = jr, Fr.elts = Fr.elts.filter(function(Qr) {
          return Qr != Fe;
        }); jr && jr !== Fe; )
          jr.nodeType === Node.ELEMENT_NODE && Fr.elts.push(jr), jr = jr.nextElementSibling;
        m(Fe), u(Fe).removeChild(Fe);
      }
      function Le(Fe, _r, Fr) {
        return a(Fe, Fe.firstChild, _r, Fr);
      }
      function Ae(Fe, _r, Fr) {
        return a(u(Fe), Fe, _r, Fr);
      }
      function Ne(Fe, _r, Fr) {
        return a(Fe, null, _r, Fr);
      }
      function Ie(Fe, _r, Fr) {
        return a(u(Fe), Fe.nextSibling, _r, Fr);
      }
      function ke(Fe, _r, Fr) {
        return m(Fe), u(Fe).removeChild(Fe);
      }
      function Pe(Fe, _r, Fr) {
        var jr = Fe.firstChild;
        if (a(Fe, jr, _r, Fr), jr) {
          for (; jr.nextSibling; )
            m(jr.nextSibling), Fe.removeChild(jr.nextSibling);
          m(jr), Fe.removeChild(jr);
        }
      }
      function Me(Fe, _r, Fr) {
        var jr = Fr || ne(Fe, "hx-select");
        if (jr) {
          var $r = re().createDocumentFragment();
          oe(_r.querySelectorAll(jr), function(Qr) {
            $r.appendChild(Qr);
          }), _r = $r;
        }
        return _r;
      }
      function De(Fe, _r, Fr, jr, $r) {
        switch (Fe) {
          case "none":
            return;
          case "outerHTML":
            He(Fr, jr, $r);
            return;
          case "afterbegin":
            Le(Fr, jr, $r);
            return;
          case "beforebegin":
            Ae(Fr, jr, $r);
            return;
          case "beforeend":
            Ne(Fr, jr, $r);
            return;
          case "afterend":
            Ie(Fr, jr, $r);
            return;
          case "delete":
            ke(Fr);
            return;
          default:
            for (var Qr = Mr(_r), Kr = 0; Kr < Qr.length; Kr++) {
              var zr = Qr[Kr];
              try {
                var Vr = zr.handleSwap(Fe, Fr, jr, $r);
                if (Vr) {
                  if (typeof Vr.length < "u")
                    for (var Wr = 0; Wr < Vr.length; Wr++) {
                      var Yr = Vr[Wr];
                      Yr.nodeType !== Node.TEXT_NODE && Yr.nodeType !== Node.COMMENT_NODE && $r.tasks.push(Ee(Yr));
                    }
                  return;
                }
              } catch (Jr) {
                x(Jr);
              }
            }
            Fe === "innerHTML" ? Pe(Fr, jr, $r) : De(Q.config.defaultSwapStyle, _r, Fr, jr, $r);
        }
      }
      function Xe(Fe) {
        if (Fe.indexOf("<title") > -1) {
          var _r = Fe.replace(/<svg(\s[^>]*>|>)([\s\S]*?)<\/svg>/gim, ""), Fr = _r.match(/<title(\s[^>]*>|>)([\s\S]*?)<\/title>/im);
          if (Fr)
            return Fr[2];
        }
      }
      function Ue(Fe, _r, Fr, jr, $r, Qr) {
        $r.title = Xe(jr);
        var Kr = l(jr);
        if (Kr)
          return be(Fr, Kr, $r), Kr = Me(Fr, Kr, Qr), we(Kr), De(Fe, Fr, _r, Kr, $r);
      }
      function Be(Fe, _r, Fr) {
        var jr = Fe.getResponseHeader(_r);
        if (jr.indexOf("{") === 0) {
          var $r = E(jr);
          for (var Qr in $r)
            if ($r.hasOwnProperty(Qr)) {
              var Kr = $r[Qr];
              N(Kr) || (Kr = { value: Kr }), ce(Fr, Qr, Kr);
            }
        } else
          for (var zr = jr.split(","), Vr = 0; Vr < zr.length; Vr++)
            ce(Fr, zr[Vr].trim(), []);
      }
      var p = /[\s,]/, Ve = /[_$a-zA-Z]/, je = /[_$a-zA-Z0-9]/, _e = ['"', "'", "/"], ze = /[^\s]/, We = /[{(]/, $e = /[})]/;
      function Ge(Fe) {
        for (var _r = [], Fr = 0; Fr < Fe.length; ) {
          if (Ve.exec(Fe.charAt(Fr))) {
            for (var jr = Fr; je.exec(Fe.charAt(Fr + 1)); )
              Fr++;
            _r.push(Fe.substr(jr, Fr - jr + 1));
          } else if (_e.indexOf(Fe.charAt(Fr)) !== -1) {
            var $r = Fe.charAt(Fr), jr = Fr;
            for (Fr++; Fr < Fe.length && Fe.charAt(Fr) !== $r; )
              Fe.charAt(Fr) === "\\" && Fr++, Fr++;
            _r.push(Fe.substr(jr, Fr - jr + 1));
          } else {
            var Qr = Fe.charAt(Fr);
            _r.push(Qr);
          }
          Fr++;
        }
        return _r;
      }
      function Je(Fe, _r, Fr) {
        return Ve.exec(Fe.charAt(0)) && Fe !== "true" && Fe !== "false" && Fe !== "this" && Fe !== Fr && _r !== ".";
      }
      function Ze(Fe, _r, Fr) {
        if (_r[0] === "[") {
          _r.shift();
          for (var jr = 1, $r = " return (function(" + Fr + "){ return (", Qr = null; _r.length > 0; ) {
            var Kr = _r[0];
            if (Kr === "]") {
              if (jr--, jr === 0) {
                Qr === null && ($r = $r + "true"), _r.shift(), $r += ")})";
                try {
                  var zr = wr(Fe, function() {
                    return Function($r)();
                  }, function() {
                    return !0;
                  });
                  return zr.source = $r, zr;
                } catch (Vr) {
                  return fe(re().body, "htmx:syntax:error", { error: Vr, source: $r }), null;
                }
              }
            } else
              Kr === "[" && jr++;
            Je(Kr, Qr, Fr) ? $r += "((" + Fr + "." + Kr + ") ? (" + Fr + "." + Kr + ") : (window." + Kr + "))" : $r = $r + Kr, Qr = _r.shift();
          }
        }
      }
      function y(Fe, _r) {
        for (var Fr = ""; Fe.length > 0 && !Fe[0].match(_r); )
          Fr += Fe.shift();
        return Fr;
      }
      function Ke(Fe) {
        var _r;
        return Fe.length > 0 && We.test(Fe[0]) ? (Fe.shift(), _r = y(Fe, $e).trim(), Fe.shift()) : _r = y(Fe, p), _r;
      }
      var Ye = "input, textarea, select";
      function Qe(Fe) {
        var _r = te(Fe, "hx-trigger"), Fr = [];
        if (_r) {
          var jr = Ge(_r);
          do {
            y(jr, ze);
            var $r = jr.length, Qr = y(jr, /[,\[\s]/);
            if (Qr !== "")
              if (Qr === "every") {
                var Kr = { trigger: "every" };
                y(jr, ze), Kr.pollInterval = d(y(jr, /[,\[\s]/)), y(jr, ze);
                var zr = Ze(Fe, jr, "event");
                zr && (Kr.eventFilter = zr), Fr.push(Kr);
              } else if (Qr.indexOf("sse:") === 0)
                Fr.push({ trigger: "sse", sseEvent: Qr.substr(4) });
              else {
                var Vr = { trigger: Qr }, zr = Ze(Fe, jr, "event");
                for (zr && (Vr.eventFilter = zr); jr.length > 0 && jr[0] !== ","; ) {
                  y(jr, ze);
                  var Wr = jr.shift();
                  if (Wr === "changed")
                    Vr.changed = !0;
                  else if (Wr === "once")
                    Vr.once = !0;
                  else if (Wr === "consume")
                    Vr.consume = !0;
                  else if (Wr === "delay" && jr[0] === ":")
                    jr.shift(), Vr.delay = d(y(jr, p));
                  else if (Wr === "from" && jr[0] === ":") {
                    if (jr.shift(), We.test(jr[0]))
                      var Yr = Ke(jr);
                    else {
                      var Yr = y(jr, p);
                      if (Yr === "closest" || Yr === "find" || Yr === "next" || Yr === "previous") {
                        jr.shift();
                        var Jr = Ke(jr);
                        Jr.length > 0 && (Yr += " " + Jr);
                      }
                    }
                    Vr.from = Yr;
                  } else
                    Wr === "target" && jr[0] === ":" ? (jr.shift(), Vr.target = Ke(jr)) : Wr === "throttle" && jr[0] === ":" ? (jr.shift(), Vr.throttle = d(y(jr, p))) : Wr === "queue" && jr[0] === ":" ? (jr.shift(), Vr.queue = y(jr, p)) : Wr === "root" && jr[0] === ":" ? (jr.shift(), Vr[Wr] = Ke(jr)) : Wr === "threshold" && jr[0] === ":" ? (jr.shift(), Vr[Wr] = y(jr, p)) : fe(Fe, "htmx:syntax:error", { token: jr.shift() });
                }
                Fr.push(Vr);
              }
            jr.length === $r && fe(Fe, "htmx:syntax:error", { token: jr.shift() }), y(jr, ze);
          } while (jr[0] === "," && jr.shift());
        }
        return Fr.length > 0 ? Fr : h(Fe, "form") ? [{ trigger: "submit" }] : h(Fe, 'input[type="button"], input[type="submit"]') ? [{ trigger: "click" }] : h(Fe, Ye) ? [{ trigger: "change" }] : [{ trigger: "click" }];
      }
      function et(Fe) {
        ae(Fe).cancelled = !0;
      }
      function tt(Fe, _r, Fr) {
        var jr = ae(Fe);
        jr.timeout = setTimeout(function() {
          se(Fe) && jr.cancelled !== !0 && (ot(Fr, Fe, Vt("hx:poll:trigger", { triggerSpec: Fr, target: Fe })) || _r(Fe), tt(Fe, _r, Fr));
        }, Fr.pollInterval);
      }
      function rt(Fe) {
        return location.hostname === Fe.hostname && ee(Fe, "href") && ee(Fe, "href").indexOf("#") !== 0;
      }
      function nt(Fe, _r, Fr) {
        if (Fe.tagName === "A" && rt(Fe) && (Fe.target === "" || Fe.target === "_self") || Fe.tagName === "FORM") {
          _r.boosted = !0;
          var jr, $r;
          if (Fe.tagName === "A")
            jr = "get", $r = ee(Fe, "href");
          else {
            var Qr = ee(Fe, "method");
            jr = Qr ? Qr.toLowerCase() : "get", $r = ee(Fe, "action");
          }
          Fr.forEach(function(Kr) {
            st(Fe, function(zr, Vr) {
              if (v(zr, Q.config.disableSelector)) {
                m(zr);
                return;
              }
              he(jr, $r, zr, Vr);
            }, _r, Kr, !0);
          });
        }
      }
      function it(Fe, _r) {
        return !!((Fe.type === "submit" || Fe.type === "click") && (_r.tagName === "FORM" || h(_r, 'input[type="submit"], button') && v(_r, "form") !== null || _r.tagName === "A" && _r.href && (_r.getAttribute("href") === "#" || _r.getAttribute("href").indexOf("#") !== 0)));
      }
      function at(Fe, _r) {
        return ae(Fe).boosted && Fe.tagName === "A" && _r.type === "click" && (_r.ctrlKey || _r.metaKey);
      }
      function ot(Fe, _r, Fr) {
        var jr = Fe.eventFilter;
        if (jr)
          try {
            return jr.call(_r, Fr) !== !0;
          } catch ($r) {
            return fe(re().body, "htmx:eventFilter:error", { error: $r, source: jr.source }), !0;
          }
        return !1;
      }
      function st(Fe, _r, Fr, jr, $r) {
        var Qr = ae(Fe), Kr;
        jr.from ? Kr = W(Fe, jr.from) : Kr = [Fe], jr.changed && Kr.forEach(function(zr) {
          var Vr = ae(zr);
          Vr.lastValue = zr.value;
        }), oe(Kr, function(zr) {
          var Vr = function(Wr) {
            if (!se(Fe)) {
              zr.removeEventListener(jr.trigger, Vr);
              return;
            }
            if (!at(Fe, Wr) && (($r || it(Wr, Fe)) && Wr.preventDefault(), !ot(jr, Fe, Wr))) {
              var Yr = ae(Wr);
              if (Yr.triggerSpec = jr, Yr.handledFor == null && (Yr.handledFor = []), Yr.handledFor.indexOf(Fe) < 0) {
                if (Yr.handledFor.push(Fe), jr.consume && Wr.stopPropagation(), jr.target && Wr.target && !h(Wr.target, jr.target))
                  return;
                if (jr.once) {
                  if (Qr.triggeredOnce)
                    return;
                  Qr.triggeredOnce = !0;
                }
                if (jr.changed) {
                  var Jr = ae(zr);
                  if (Jr.lastValue === zr.value)
                    return;
                  Jr.lastValue = zr.value;
                }
                if (Qr.delayed && clearTimeout(Qr.delayed), Qr.throttle)
                  return;
                jr.throttle ? Qr.throttle || (_r(Fe, Wr), Qr.throttle = setTimeout(function() {
                  Qr.throttle = null;
                }, jr.throttle)) : jr.delay ? Qr.delayed = setTimeout(function() {
                  _r(Fe, Wr);
                }, jr.delay) : (ce(Fe, "htmx:trigger"), _r(Fe, Wr));
              }
            }
          };
          Fr.listenerInfos == null && (Fr.listenerInfos = []), Fr.listenerInfos.push({ trigger: jr.trigger, listener: Vr, on: zr }), zr.addEventListener(jr.trigger, Vr);
        });
      }
      var lt = !1, ut = null;
      function ft() {
        ut || (ut = function() {
          lt = !0;
        }, window.addEventListener("scroll", ut), setInterval(function() {
          lt && (lt = !1, oe(re().querySelectorAll("[hx-trigger='revealed'],[data-hx-trigger='revealed']"), function(Fe) {
            ct(Fe);
          }));
        }, 200));
      }
      function ct(Fe) {
        if (!o(Fe, "data-hx-revealed") && k(Fe)) {
          Fe.setAttribute("data-hx-revealed", "true");
          var _r = ae(Fe);
          _r.initHash ? ce(Fe, "revealed") : Fe.addEventListener("htmx:afterProcessNode", function(Fr) {
            ce(Fe, "revealed");
          }, { once: !0 });
        }
      }
      function ht(Fe, _r, Fr) {
        for (var jr = P(Fr), $r = 0; $r < jr.length; $r++) {
          var Qr = jr[$r].split(/:(.+)/);
          Qr[0] === "connect" && vt(Fe, Qr[1], 0), Qr[0] === "send" && gt(Fe);
        }
      }
      function vt(Fe, _r, Fr) {
        if (se(Fe)) {
          if (_r.indexOf("/") == 0) {
            var jr = location.hostname + (location.port ? ":" + location.port : "");
            location.protocol == "https:" ? _r = "wss://" + jr + _r : location.protocol == "http:" && (_r = "ws://" + jr + _r);
          }
          var $r = Q.createWebSocket(_r);
          $r.onerror = function(Qr) {
            fe(Fe, "htmx:wsError", { error: Qr, socket: $r }), dt(Fe);
          }, $r.onclose = function(Qr) {
            if ([1006, 1012, 1013].indexOf(Qr.code) >= 0) {
              var Kr = mt(Fr);
              setTimeout(function() {
                vt(Fe, _r, Fr + 1);
              }, Kr);
            }
          }, $r.onopen = function(Qr) {
            Fr = 0;
          }, ae(Fe).webSocket = $r, $r.addEventListener("message", function(Qr) {
            if (!dt(Fe)) {
              var Kr = Qr.data;
              T(Fe, function(Gr) {
                Kr = Gr.transformResponse(Kr, null, Fe);
              });
              for (var zr = R(Fe), Vr = l(Kr), Wr = I(Vr.children), Yr = 0; Yr < Wr.length; Yr++) {
                var Jr = Wr[Yr];
                xe(te(Jr, "hx-swap-oob") || "true", Jr, zr);
              }
              Yt(zr.tasks);
            }
          });
        }
      }
      function dt(Fe) {
        if (!se(Fe))
          return ae(Fe).webSocket.close(), !0;
      }
      function gt(Fe) {
        var _r = c(Fe, function(Fr) {
          return ae(Fr).webSocket != null;
        });
        _r ? Fe.addEventListener(Qe(Fe)[0].trigger, function(Fr) {
          var jr = ae(_r).webSocket, $r = vr(Fe, _r), Qr = ur(Fe, "post"), Kr = Qr.errors, zr = Qr.values, Vr = Cr(Fe), Wr = le(zr, Vr), Yr = dr(Wr, Fe);
          if (Yr.HEADERS = $r, Kr && Kr.length > 0) {
            ce(Fe, "htmx:validation:halted", Kr);
            return;
          }
          jr.send(JSON.stringify(Yr)), it(Fr, Fe) && Fr.preventDefault();
        }) : fe(Fe, "htmx:noWebSocketSourceError");
      }
      function mt(Fe) {
        var _r = Q.config.wsReconnectDelay;
        if (typeof _r == "function")
          return _r(Fe);
        if (_r === "full-jitter") {
          var Fr = Math.min(Fe, 6), jr = 1e3 * Math.pow(2, Fr);
          return jr * Math.random();
        }
        x('htmx.config.wsReconnectDelay must either be a function or the string "full-jitter"');
      }
      function pt(Fe, _r, Fr) {
        for (var jr = P(Fr), $r = 0; $r < jr.length; $r++) {
          var Qr = jr[$r].split(/:(.+)/);
          Qr[0] === "connect" && yt(Fe, Qr[1]), Qr[0] === "swap" && xt(Fe, Qr[1]);
        }
      }
      function yt(Fe, _r) {
        var Fr = Q.createEventSource(_r);
        Fr.onerror = function(jr) {
          fe(Fe, "htmx:sseError", { error: jr, source: Fr }), wt(Fe);
        }, ae(Fe).sseEventSource = Fr;
      }
      function xt(Fe, _r) {
        var Fr = c(Fe, St);
        if (Fr) {
          var jr = ae(Fr).sseEventSource, $r = function(Qr) {
            if (!wt(Fr)) {
              if (!se(Fe)) {
                jr.removeEventListener(_r, $r);
                return;
              }
              var Kr = Qr.data;
              T(Fe, function(Yr) {
                Kr = Yr.transformResponse(Kr, null, Fe);
              });
              var zr = mr(Fe), Vr = ge(Fe), Wr = R(Fe);
              Ue(zr.swapStyle, Vr, Fe, Kr, Wr), Yt(Wr.tasks), ce(Fe, "htmx:sseMessage", Qr);
            }
          };
          ae(Fe).sseListener = $r, jr.addEventListener(_r, $r);
        } else
          fe(Fe, "htmx:noSSESourceError");
      }
      function bt(Fe, _r, Fr) {
        var jr = c(Fe, St);
        if (jr) {
          var $r = ae(jr).sseEventSource, Qr = function() {
            wt(jr) || (se(Fe) ? _r(Fe) : $r.removeEventListener(Fr, Qr));
          };
          ae(Fe).sseListener = Qr, $r.addEventListener(Fr, Qr);
        } else
          fe(Fe, "htmx:noSSESourceError");
      }
      function wt(Fe) {
        if (!se(Fe))
          return ae(Fe).sseEventSource.close(), !0;
      }
      function St(Fe) {
        return ae(Fe).sseEventSource != null;
      }
      function Et(Fe, _r, Fr, jr) {
        var $r = function() {
          Fr.loaded || (Fr.loaded = !0, _r(Fe));
        };
        jr ? setTimeout($r, jr) : $r();
      }
      function Ct(Fe, _r, Fr) {
        var jr = !1;
        return oe(b, function($r) {
          if (o(Fe, "hx-" + $r)) {
            var Qr = te(Fe, "hx-" + $r);
            jr = !0, _r.path = Qr, _r.verb = $r, Fr.forEach(function(Kr) {
              Tt(Fe, Kr, _r, function(zr, Vr) {
                if (v(zr, Q.config.disableSelector)) {
                  m(zr);
                  return;
                }
                he($r, Qr, zr, Vr);
              });
            });
          }
        }), jr;
      }
      function Tt(Fe, _r, Fr, jr) {
        if (_r.sseEvent)
          bt(Fe, jr, _r.sseEvent);
        else if (_r.trigger === "revealed")
          ft(), st(Fe, jr, Fr, _r), ct(Fe);
        else if (_r.trigger === "intersect") {
          var $r = {};
          _r.root && ($r.root = ue(Fe, _r.root)), _r.threshold && ($r.threshold = parseFloat(_r.threshold));
          var Qr = new IntersectionObserver(function(Kr) {
            for (var zr = 0; zr < Kr.length; zr++) {
              var Vr = Kr[zr];
              if (Vr.isIntersecting) {
                ce(Fe, "intersect");
                break;
              }
            }
          }, $r);
          Qr.observe(Fe), st(Fe, jr, Fr, _r);
        } else
          _r.trigger === "load" ? ot(_r, Fe, Vt("load", { elt: Fe })) || Et(Fe, jr, Fr, _r.delay) : _r.pollInterval ? (Fr.polling = !0, tt(Fe, jr, _r)) : st(Fe, jr, Fr, _r);
      }
      function Rt(Fe) {
        if (Q.config.allowScriptTags && (Fe.type === "text/javascript" || Fe.type === "module" || Fe.type === "")) {
          var _r = re().createElement("script");
          oe(Fe.attributes, function(jr) {
            _r.setAttribute(jr.name, jr.value);
          }), _r.textContent = Fe.textContent, _r.async = !1, Q.config.inlineScriptNonce && (_r.nonce = Q.config.inlineScriptNonce);
          var Fr = Fe.parentElement;
          try {
            Fr.insertBefore(_r, Fe);
          } catch (jr) {
            x(jr);
          } finally {
            Fe.parentElement && Fe.parentElement.removeChild(Fe);
          }
        }
      }
      function Ot(Fe) {
        h(Fe, "script") && Rt(Fe), oe(f(Fe, "script"), function(_r) {
          Rt(_r);
        });
      }
      function qt() {
        return document.querySelector("[hx-boost], [data-hx-boost]");
      }
      function Ht(Fe) {
        var _r = null, Fr = [];
        if (document.evaluate)
          for (var jr = document.evaluate('//*[@*[ starts-with(name(), "hx-on:") or starts-with(name(), "data-hx-on:") ]]', Fe); _r = jr.iterateNext(); )
            Fr.push(_r);
        else
          for (var $r = document.getElementsByTagName("*"), Qr = 0; Qr < $r.length; Qr++)
            for (var Kr = $r[Qr].attributes, zr = 0; zr < Kr.length; zr++) {
              var Vr = Kr[zr].name;
              (g(Vr, "hx-on:") || g(Vr, "data-hx-on:")) && Fr.push($r[Qr]);
            }
        return Fr;
      }
      function Lt(Fe) {
        if (Fe.querySelectorAll) {
          var _r = qt() ? ", a" : "", Fr = Fe.querySelectorAll(w + _r + ", form, [type='submit'], [hx-sse], [data-hx-sse], [hx-ws], [data-hx-ws], [hx-ext], [data-hx-ext], [hx-trigger], [data-hx-trigger], [hx-on], [data-hx-on]");
          return Fr;
        } else
          return [];
      }
      function At(Fe) {
        var _r = v(Fe.target, "button, input[type='submit']"), Fr = It(Fe);
        Fr && (Fr.lastButtonClicked = _r);
      }
      function Nt(Fe) {
        var _r = It(Fe);
        _r && (_r.lastButtonClicked = null);
      }
      function It(Fe) {
        var _r = v(Fe.target, "button, input[type='submit']");
        if (_r) {
          var Fr = s("#" + ee(_r, "form")) || v(_r, "form");
          if (Fr)
            return ae(Fr);
        }
      }
      function kt(Fe) {
        Fe.addEventListener("click", At), Fe.addEventListener("focusin", At), Fe.addEventListener("focusout", Nt);
      }
      function Pt(Fe) {
        var _r = Ge(Fe), Fr = 0;
        for (let jr = 0; jr < _r.length; jr++) {
          const $r = _r[jr];
          $r === "{" ? Fr++ : $r === "}" && Fr--;
        }
        return Fr;
      }
      function Mt(Fe, _r, Fr) {
        var jr = ae(Fe);
        Array.isArray(jr.onHandlers) || (jr.onHandlers = []);
        var $r, Qr = function(Kr) {
          return wr(Fe, function() {
            $r || ($r = new Function("event", Fr)), $r.call(Fe, Kr);
          });
        };
        Fe.addEventListener(_r, Qr), jr.onHandlers.push({ event: _r, listener: Qr });
      }
      function Dt(Fe) {
        var _r = te(Fe, "hx-on");
        if (_r) {
          for (var Fr = {}, jr = _r.split(`
`), $r = null, Qr = 0; jr.length > 0; ) {
            var Kr = jr.shift(), zr = Kr.match(/^\s*([a-zA-Z:\-\.]+:)(.*)/);
            Qr === 0 && zr ? (Kr.split(":"), $r = zr[1].slice(0, -1), Fr[$r] = zr[2]) : Fr[$r] += Kr, Qr += Pt(Kr);
          }
          for (var Vr in Fr)
            Mt(Fe, Vr, Fr[Vr]);
        }
      }
      function Xt(Fe) {
        Oe(Fe);
        for (var _r = 0; _r < Fe.attributes.length; _r++) {
          var Fr = Fe.attributes[_r].name, jr = Fe.attributes[_r].value;
          if (g(Fr, "hx-on:") || g(Fr, "data-hx-on:")) {
            let $r = Fr.slice(Fr.indexOf(":") + 1);
            g($r, ":") && ($r = "htmx" + $r), Mt(Fe, $r, jr);
          }
        }
      }
      function Ut(Fe) {
        if (v(Fe, Q.config.disableSelector)) {
          m(Fe);
          return;
        }
        var _r = ae(Fe);
        if (_r.initHash !== Re(Fe)) {
          qe(Fe), _r.initHash = Re(Fe), Dt(Fe), ce(Fe, "htmx:beforeProcessNode"), Fe.value && (_r.lastValue = Fe.value);
          var Fr = Qe(Fe), jr = Ct(Fe, _r, Fr);
          jr || (ne(Fe, "hx-boost") === "true" ? nt(Fe, _r, Fr) : o(Fe, "hx-trigger") && Fr.forEach(function(Kr) {
            Tt(Fe, Kr, _r, function() {
            });
          })), (Fe.tagName === "FORM" || ee(Fe, "type") === "submit" && o(Fe, "form")) && kt(Fe);
          var $r = te(Fe, "hx-sse");
          $r && pt(Fe, _r, $r);
          var Qr = te(Fe, "hx-ws");
          Qr && ht(Fe, _r, Qr), ce(Fe, "htmx:afterProcessNode");
        }
      }
      function Bt(Fe) {
        if (Fe = s(Fe), v(Fe, Q.config.disableSelector)) {
          m(Fe);
          return;
        }
        Ut(Fe), oe(Lt(Fe), function(_r) {
          Ut(_r);
        }), oe(Ht(Fe), Xt);
      }
      function Ft(Fe) {
        return Fe.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
      }
      function Vt(Fe, _r) {
        var Fr;
        return window.CustomEvent && typeof window.CustomEvent == "function" ? Fr = new CustomEvent(Fe, { bubbles: !0, cancelable: !0, detail: _r }) : (Fr = re().createEvent("CustomEvent"), Fr.initCustomEvent(Fe, !0, !0, _r)), Fr;
      }
      function fe(Fe, _r, Fr) {
        ce(Fe, _r, le({ error: _r }, Fr));
      }
      function jt(Fe) {
        return Fe === "htmx:afterProcessNode";
      }
      function T(Fe, _r) {
        oe(Mr(Fe), function(Fr) {
          try {
            _r(Fr);
          } catch (jr) {
            x(jr);
          }
        });
      }
      function x(Fe) {
        console.error ? console.error(Fe) : console.log && console.log("ERROR: ", Fe);
      }
      function ce(Fe, _r, Fr) {
        Fe = s(Fe), Fr == null && (Fr = {}), Fr.elt = Fe;
        var jr = Vt(_r, Fr);
        Q.logger && !jt(_r) && Q.logger(Fe, _r, Fr), Fr.error && (x(Fr.error), ce(Fe, "htmx:error", { errorInfo: Fr }));
        var $r = Fe.dispatchEvent(jr), Qr = Ft(_r);
        if ($r && Qr !== _r) {
          var Kr = Vt(Qr, jr.detail);
          $r = $r && Fe.dispatchEvent(Kr);
        }
        return T(Fe, function(zr) {
          $r = $r && zr.onEvent(_r, jr) !== !1 && !jr.defaultPrevented;
        }), $r;
      }
      var _t = location.pathname + location.search;
      function zt() {
        var Fe = re().querySelector("[hx-history-elt],[data-hx-history-elt]");
        return Fe || re().body;
      }
      function Wt(Fe, _r, Fr, jr) {
        if (M()) {
          if (Q.config.historyCacheSize <= 0) {
            localStorage.removeItem("htmx-history-cache");
            return;
          }
          Fe = D(Fe);
          for (var $r = E(localStorage.getItem("htmx-history-cache")) || [], Qr = 0; Qr < $r.length; Qr++)
            if ($r[Qr].url === Fe) {
              $r.splice(Qr, 1);
              break;
            }
          var Kr = { url: Fe, content: _r, title: Fr, scroll: jr };
          for (ce(re().body, "htmx:historyItemCreated", { item: Kr, cache: $r }), $r.push(Kr); $r.length > Q.config.historyCacheSize; )
            $r.shift();
          for (; $r.length > 0; )
            try {
              localStorage.setItem("htmx-history-cache", JSON.stringify($r));
              break;
            } catch (zr) {
              fe(re().body, "htmx:historyCacheError", { cause: zr, cache: $r }), $r.shift();
            }
        }
      }
      function $t(Fe) {
        if (!M())
          return null;
        Fe = D(Fe);
        for (var _r = E(localStorage.getItem("htmx-history-cache")) || [], Fr = 0; Fr < _r.length; Fr++)
          if (_r[Fr].url === Fe)
            return _r[Fr];
        return null;
      }
      function Gt(Fe) {
        var _r = Q.config.requestClass, Fr = Fe.cloneNode(!0);
        return oe(f(Fr, "." + _r), function(jr) {
          n(jr, _r);
        }), Fr.innerHTML;
      }
      function Jt() {
        var Fe = zt(), _r = _t || location.pathname + location.search, Fr;
        try {
          Fr = re().querySelector('[hx-history="false" i],[data-hx-history="false" i]');
        } catch {
          Fr = re().querySelector('[hx-history="false"],[data-hx-history="false"]');
        }
        Fr || (ce(re().body, "htmx:beforeHistorySave", { path: _r, historyElt: Fe }), Wt(_r, Gt(Fe), re().title, window.scrollY)), Q.config.historyEnabled && history.replaceState({ htmx: !0 }, re().title, window.location.href);
      }
      function Zt(Fe) {
        Q.config.getCacheBusterParam && (Fe = Fe.replace(/org\.htmx\.cache-buster=[^&]*&?/, ""), (_(Fe, "&") || _(Fe, "?")) && (Fe = Fe.slice(0, -1))), Q.config.historyEnabled && history.pushState({ htmx: !0 }, "", Fe), _t = Fe;
      }
      function Kt(Fe) {
        Q.config.historyEnabled && history.replaceState({ htmx: !0 }, "", Fe), _t = Fe;
      }
      function Yt(Fe) {
        oe(Fe, function(_r) {
          _r.call();
        });
      }
      function Qt(Fe) {
        var _r = new XMLHttpRequest(), Fr = { path: Fe, xhr: _r };
        ce(re().body, "htmx:historyCacheMiss", Fr), _r.open("GET", Fe, !0), _r.setRequestHeader("HX-History-Restore-Request", "true"), _r.onload = function() {
          if (this.status >= 200 && this.status < 400) {
            ce(re().body, "htmx:historyCacheMissLoad", Fr);
            var jr = l(this.response);
            jr = jr.querySelector("[hx-history-elt],[data-hx-history-elt]") || jr;
            var $r = zt(), Qr = R($r), Kr = Xe(this.response);
            if (Kr) {
              var zr = C("title");
              zr ? zr.innerHTML = Kr : window.document.title = Kr;
            }
            Pe($r, jr, Qr), Yt(Qr.tasks), _t = Fe, ce(re().body, "htmx:historyRestore", { path: Fe, cacheMiss: !0, serverResponse: this.response });
          } else
            fe(re().body, "htmx:historyCacheMissLoadError", Fr);
        }, _r.send();
      }
      function er(Fe) {
        Jt(), Fe = Fe || location.pathname + location.search;
        var _r = $t(Fe);
        if (_r) {
          var Fr = l(_r.content), jr = zt(), $r = R(jr);
          Pe(jr, Fr, $r), Yt($r.tasks), document.title = _r.title, setTimeout(function() {
            window.scrollTo(0, _r.scroll);
          }, 0), _t = Fe, ce(re().body, "htmx:historyRestore", { path: Fe, item: _r });
        } else
          Q.config.refreshOnHistoryMiss ? window.location.reload(!0) : Qt(Fe);
      }
      function tr(Fe) {
        var _r = Y(Fe, "hx-indicator");
        return _r == null && (_r = [Fe]), oe(_r, function(Fr) {
          var jr = ae(Fr);
          jr.requestCount = (jr.requestCount || 0) + 1, Fr.classList.add.call(Fr.classList, Q.config.requestClass);
        }), _r;
      }
      function rr(Fe) {
        var _r = Y(Fe, "hx-disabled-elt");
        return _r == null && (_r = []), oe(_r, function(Fr) {
          var jr = ae(Fr);
          jr.requestCount = (jr.requestCount || 0) + 1, Fr.setAttribute("disabled", "");
        }), _r;
      }
      function nr(Fe, _r) {
        oe(Fe, function(Fr) {
          var jr = ae(Fr);
          jr.requestCount = (jr.requestCount || 0) - 1, jr.requestCount === 0 && Fr.classList.remove.call(Fr.classList, Q.config.requestClass);
        }), oe(_r, function(Fr) {
          var jr = ae(Fr);
          jr.requestCount = (jr.requestCount || 0) - 1, jr.requestCount === 0 && Fr.removeAttribute("disabled");
        });
      }
      function ir(Fe, _r) {
        for (var Fr = 0; Fr < Fe.length; Fr++) {
          var jr = Fe[Fr];
          if (jr.isSameNode(_r))
            return !0;
        }
        return !1;
      }
      function ar(Fe) {
        return Fe.name === "" || Fe.name == null || Fe.disabled || Fe.type === "button" || Fe.type === "submit" || Fe.tagName === "image" || Fe.tagName === "reset" || Fe.tagName === "file" ? !1 : Fe.type === "checkbox" || Fe.type === "radio" ? Fe.checked : !0;
      }
      function or(Fe, _r, Fr) {
        if (Fe != null && _r != null) {
          var jr = Fr[Fe];
          jr === void 0 ? Fr[Fe] = _r : Array.isArray(jr) ? Array.isArray(_r) ? Fr[Fe] = jr.concat(_r) : jr.push(_r) : Array.isArray(_r) ? Fr[Fe] = [jr].concat(_r) : Fr[Fe] = [jr, _r];
        }
      }
      function sr(Fe, _r, Fr, jr, $r) {
        if (!(jr == null || ir(Fe, jr))) {
          if (Fe.push(jr), ar(jr)) {
            var Qr = ee(jr, "name"), Kr = jr.value;
            jr.multiple && jr.tagName === "SELECT" && (Kr = I(jr.querySelectorAll("option:checked")).map(function(Vr) {
              return Vr.value;
            })), jr.files && (Kr = I(jr.files)), or(Qr, Kr, _r), $r && lr(jr, Fr);
          }
          if (h(jr, "form")) {
            var zr = jr.elements;
            oe(zr, function(Vr) {
              sr(Fe, _r, Fr, Vr, $r);
            });
          }
        }
      }
      function lr(Fe, _r) {
        Fe.willValidate && (ce(Fe, "htmx:validation:validate"), Fe.checkValidity() || (_r.push({ elt: Fe, message: Fe.validationMessage, validity: Fe.validity }), ce(Fe, "htmx:validation:failed", { message: Fe.validationMessage, validity: Fe.validity })));
      }
      function ur(Fe, _r) {
        var Fr = [], jr = {}, $r = {}, Qr = [], Kr = ae(Fe);
        Kr.lastButtonClicked && !se(Kr.lastButtonClicked) && (Kr.lastButtonClicked = null);
        var zr = h(Fe, "form") && Fe.noValidate !== !0 || te(Fe, "hx-validate") === "true";
        if (Kr.lastButtonClicked && (zr = zr && Kr.lastButtonClicked.formNoValidate !== !0), _r !== "get" && sr(Fr, $r, Qr, v(Fe, "form"), zr), sr(Fr, jr, Qr, Fe, zr), Kr.lastButtonClicked || Fe.tagName === "BUTTON" || Fe.tagName === "INPUT" && ee(Fe, "type") === "submit") {
          var Vr = Kr.lastButtonClicked || Fe, Wr = ee(Vr, "name");
          or(Wr, Vr.value, $r);
        }
        var Yr = Y(Fe, "hx-include");
        return oe(Yr, function(Jr) {
          sr(Fr, jr, Qr, Jr, zr), h(Jr, "form") || oe(Jr.querySelectorAll(Ye), function(Gr) {
            sr(Fr, jr, Qr, Gr, zr);
          });
        }), jr = le(jr, $r), { errors: Qr, values: jr };
      }
      function fr(Fe, _r, Fr) {
        Fe !== "" && (Fe += "&"), String(Fr) === "[object Object]" && (Fr = JSON.stringify(Fr));
        var jr = encodeURIComponent(Fr);
        return Fe += encodeURIComponent(_r) + "=" + jr, Fe;
      }
      function cr(Fe) {
        var _r = "";
        for (var Fr in Fe)
          if (Fe.hasOwnProperty(Fr)) {
            var jr = Fe[Fr];
            Array.isArray(jr) ? oe(jr, function($r) {
              _r = fr(_r, Fr, $r);
            }) : _r = fr(_r, Fr, jr);
          }
        return _r;
      }
      function hr(Fe) {
        var _r = new FormData();
        for (var Fr in Fe)
          if (Fe.hasOwnProperty(Fr)) {
            var jr = Fe[Fr];
            Array.isArray(jr) ? oe(jr, function($r) {
              _r.append(Fr, $r);
            }) : _r.append(Fr, jr);
          }
        return _r;
      }
      function vr(Fe, _r, Fr) {
        var jr = { "HX-Request": "true", "HX-Trigger": ee(Fe, "id"), "HX-Trigger-Name": ee(Fe, "name"), "HX-Target": te(_r, "id"), "HX-Current-URL": re().location.href };
        return br(Fe, "hx-headers", !1, jr), Fr !== void 0 && (jr["HX-Prompt"] = Fr), ae(Fe).boosted && (jr["HX-Boosted"] = "true"), jr;
      }
      function dr(Fe, _r) {
        var Fr = ne(_r, "hx-params");
        if (Fr) {
          if (Fr === "none")
            return {};
          if (Fr === "*")
            return Fe;
          if (Fr.indexOf("not ") === 0)
            return oe(Fr.substr(4).split(","), function($r) {
              $r = $r.trim(), delete Fe[$r];
            }), Fe;
          var jr = {};
          return oe(Fr.split(","), function($r) {
            $r = $r.trim(), jr[$r] = Fe[$r];
          }), jr;
        } else
          return Fe;
      }
      function gr(Fe) {
        return ee(Fe, "href") && ee(Fe, "href").indexOf("#") >= 0;
      }
      function mr(Fe, _r) {
        var Fr = _r || ne(Fe, "hx-swap"), jr = { swapStyle: ae(Fe).boosted ? "innerHTML" : Q.config.defaultSwapStyle, swapDelay: Q.config.defaultSwapDelay, settleDelay: Q.config.defaultSettleDelay };
        if (Q.config.scrollIntoViewOnBoost && ae(Fe).boosted && !gr(Fe) && (jr.show = "top"), Fr) {
          var $r = P(Fr);
          if ($r.length > 0)
            for (var Qr = 0; Qr < $r.length; Qr++) {
              var Kr = $r[Qr];
              if (Kr.indexOf("swap:") === 0)
                jr.swapDelay = d(Kr.substr(5));
              else if (Kr.indexOf("settle:") === 0)
                jr.settleDelay = d(Kr.substr(7));
              else if (Kr.indexOf("transition:") === 0)
                jr.transition = Kr.substr(11) === "true";
              else if (Kr.indexOf("ignoreTitle:") === 0)
                jr.ignoreTitle = Kr.substr(12) === "true";
              else if (Kr.indexOf("scroll:") === 0) {
                var zr = Kr.substr(7), Vr = zr.split(":"), Wr = Vr.pop(), Yr = Vr.length > 0 ? Vr.join(":") : null;
                jr.scroll = Wr, jr.scrollTarget = Yr;
              } else if (Kr.indexOf("show:") === 0) {
                var Jr = Kr.substr(5), Vr = Jr.split(":"), Gr = Vr.pop(), Yr = Vr.length > 0 ? Vr.join(":") : null;
                jr.show = Gr, jr.showTarget = Yr;
              } else if (Kr.indexOf("focus-scroll:") === 0) {
                var tn = Kr.substr(13);
                jr.focusScroll = tn == "true";
              } else
                Qr == 0 ? jr.swapStyle = Kr : x("Unknown modifier in hx-swap: " + Kr);
            }
        }
        return jr;
      }
      function pr(Fe) {
        return ne(Fe, "hx-encoding") === "multipart/form-data" || h(Fe, "form") && ee(Fe, "enctype") === "multipart/form-data";
      }
      function yr(Fe, _r, Fr) {
        var jr = null;
        return T(_r, function($r) {
          jr == null && (jr = $r.encodeParameters(Fe, Fr, _r));
        }), jr ?? (pr(_r) ? hr(Fr) : cr(Fr));
      }
      function R(Fe) {
        return { tasks: [], elts: [Fe] };
      }
      function xr(Fe, _r) {
        var Fr = Fe[0], jr = Fe[Fe.length - 1];
        if (_r.scroll) {
          var $r = null;
          _r.scrollTarget && ($r = ue(Fr, _r.scrollTarget)), _r.scroll === "top" && (Fr || $r) && ($r = $r || Fr, $r.scrollTop = 0), _r.scroll === "bottom" && (jr || $r) && ($r = $r || jr, $r.scrollTop = $r.scrollHeight);
        }
        if (_r.show) {
          var $r = null;
          if (_r.showTarget) {
            var Qr = _r.showTarget;
            _r.showTarget === "window" && (Qr = "body"), $r = ue(Fr, Qr);
          }
          _r.show === "top" && (Fr || $r) && ($r = $r || Fr, $r.scrollIntoView({ block: "start", behavior: Q.config.scrollBehavior })), _r.show === "bottom" && (jr || $r) && ($r = $r || jr, $r.scrollIntoView({ block: "end", behavior: Q.config.scrollBehavior }));
        }
      }
      function br(Fe, _r, Fr, jr) {
        if (jr == null && (jr = {}), Fe == null)
          return jr;
        var $r = te(Fe, _r);
        if ($r) {
          var Qr = $r.trim(), Kr = Fr;
          if (Qr === "unset")
            return null;
          Qr.indexOf("javascript:") === 0 ? (Qr = Qr.substr(11), Kr = !0) : Qr.indexOf("js:") === 0 && (Qr = Qr.substr(3), Kr = !0), Qr.indexOf("{") !== 0 && (Qr = "{" + Qr + "}");
          var zr;
          Kr ? zr = wr(Fe, function() {
            return Function("return (" + Qr + ")")();
          }, {}) : zr = E(Qr);
          for (var Vr in zr)
            zr.hasOwnProperty(Vr) && jr[Vr] == null && (jr[Vr] = zr[Vr]);
        }
        return br(u(Fe), _r, Fr, jr);
      }
      function wr(Fe, _r, Fr) {
        return Q.config.allowEval ? _r() : (fe(Fe, "htmx:evalDisallowedError"), Fr);
      }
      function Sr(Fe, _r) {
        return br(Fe, "hx-vars", !0, _r);
      }
      function Er(Fe, _r) {
        return br(Fe, "hx-vals", !1, _r);
      }
      function Cr(Fe) {
        return le(Sr(Fe), Er(Fe));
      }
      function Tr(Fe, _r, Fr) {
        if (Fr !== null)
          try {
            Fe.setRequestHeader(_r, Fr);
          } catch {
            Fe.setRequestHeader(_r, encodeURIComponent(Fr)), Fe.setRequestHeader(_r + "-URI-AutoEncoded", "true");
          }
      }
      function Rr(Fe) {
        if (Fe.responseURL && typeof URL < "u")
          try {
            var _r = new URL(Fe.responseURL);
            return _r.pathname + _r.search;
          } catch {
            fe(re().body, "htmx:badResponseUrl", { url: Fe.responseURL });
          }
      }
      function O(Fe, _r) {
        return Fe.getAllResponseHeaders().match(_r);
      }
      function Or(Fe, _r, Fr) {
        return Fe = Fe.toLowerCase(), Fr ? Fr instanceof Element || L(Fr, "String") ? he(Fe, _r, null, null, { targetOverride: s(Fr), returnPromise: !0 }) : he(Fe, _r, s(Fr.source), Fr.event, { handler: Fr.handler, headers: Fr.headers, values: Fr.values, targetOverride: s(Fr.target), swapOverride: Fr.swap, select: Fr.select, returnPromise: !0 }) : he(Fe, _r, null, null, { returnPromise: !0 });
      }
      function qr(Fe) {
        for (var _r = []; Fe; )
          _r.push(Fe), Fe = Fe.parentElement;
        return _r;
      }
      function Hr(Fe, _r, Fr) {
        var jr, $r;
        if (typeof URL == "function") {
          $r = new URL(_r, document.location.href);
          var Qr = document.location.origin;
          jr = Qr === $r.origin;
        } else
          $r = _r, jr = g(_r, document.location.origin);
        return Q.config.selfRequestsOnly && !jr ? !1 : ce(Fe, "htmx:validateUrl", le({ url: $r, sameHost: jr }, Fr));
      }
      function he(Fe, _r, Fr, jr, $r, Qr) {
        var Kr = null, zr = null;
        if ($r = $r ?? {}, $r.returnPromise && typeof Promise < "u")
          var Vr = new Promise(function(yn, _n) {
            Kr = yn, zr = _n;
          });
        Fr == null && (Fr = re().body);
        var Wr = $r.handler || Ar, Yr = $r.select || null;
        if (!se(Fr))
          return ie(Kr), Vr;
        var Jr = $r.targetOverride || ge(Fr);
        if (Jr == null || Jr == ve)
          return fe(Fr, "htmx:targetError", { target: te(Fr, "hx-target") }), ie(zr), Vr;
        var Gr = ae(Fr), tn = Gr.lastButtonClicked;
        if (tn) {
          var un = ee(tn, "formaction");
          un != null && (_r = un);
          var gn = ee(tn, "formmethod");
          gn != null && gn.toLowerCase() !== "dialog" && (Fe = gn);
        }
        var Zr = ne(Fr, "hx-confirm");
        if (Qr === void 0) {
          var en = function(yn) {
            return he(Fe, _r, Fr, jr, $r, !!yn);
          }, rn = { target: Jr, elt: Fr, path: _r, verb: Fe, triggeringEvent: jr, etc: $r, issueRequest: en, question: Zr };
          if (ce(Fr, "htmx:confirm", rn) === !1)
            return ie(Kr), Vr;
        }
        var nn = Fr, an = ne(Fr, "hx-sync"), cn = null, wn = !1;
        if (an) {
          var fn = an.split(":"), dn = fn[0].trim();
          if (dn === "this" ? nn = de(Fr, "hx-sync") : nn = ue(Fr, dn), an = (fn[1] || "drop").trim(), Gr = ae(nn), an === "drop" && Gr.xhr && Gr.abortable !== !0)
            return ie(Kr), Vr;
          if (an === "abort") {
            if (Gr.xhr)
              return ie(Kr), Vr;
            wn = !0;
          } else if (an === "replace")
            ce(nn, "htmx:abort");
          else if (an.indexOf("queue") === 0) {
            var Sn = an.split(" ");
            cn = (Sn[1] || "last").trim();
          }
        }
        if (Gr.xhr)
          if (Gr.abortable)
            ce(nn, "htmx:abort");
          else {
            if (cn == null) {
              if (jr) {
                var hn = ae(jr);
                hn && hn.triggerSpec && hn.triggerSpec.queue && (cn = hn.triggerSpec.queue);
              }
              cn == null && (cn = "last");
            }
            return Gr.queuedRequests == null && (Gr.queuedRequests = []), cn === "first" && Gr.queuedRequests.length === 0 ? Gr.queuedRequests.push(function() {
              he(Fe, _r, Fr, jr, $r);
            }) : cn === "all" ? Gr.queuedRequests.push(function() {
              he(Fe, _r, Fr, jr, $r);
            }) : cn === "last" && (Gr.queuedRequests = [], Gr.queuedRequests.push(function() {
              he(Fe, _r, Fr, jr, $r);
            })), ie(Kr), Vr;
          }
        var sn = new XMLHttpRequest();
        Gr.xhr = sn, Gr.abortable = wn;
        var mn = function() {
          if (Gr.xhr = null, Gr.abortable = !1, Gr.queuedRequests != null && Gr.queuedRequests.length > 0) {
            var yn = Gr.queuedRequests.shift();
            yn();
          }
        }, On = ne(Fr, "hx-prompt");
        if (On) {
          var An = prompt(On);
          if (An === null || !ce(Fr, "htmx:prompt", { prompt: An, target: Jr }))
            return ie(Kr), mn(), Vr;
        }
        if (Zr && !Qr && !confirm(Zr))
          return ie(Kr), mn(), Vr;
        var ln = vr(Fr, Jr, An);
        Fe !== "get" && !pr(Fr) && (ln["Content-Type"] = "application/x-www-form-urlencoded"), $r.headers && (ln = le(ln, $r.headers));
        var Rn = ur(Fr, Fe), En = Rn.errors, bn = Rn.values;
        $r.values && (bn = le(bn, $r.values));
        var jn = Cr(Fr), Hn = le(bn, jn), Cn = dr(Hn, Fr);
        Q.config.getCacheBusterParam && Fe === "get" && (Cn["org.htmx.cache-buster"] = ee(Jr, "id") || "true"), (_r == null || _r === "") && (_r = re().location.href);
        var Pn = br(Fr, "hx-request"), Dn = ae(Fr).boosted, Mn = Q.config.methodsThatUseUrlParams.indexOf(Fe) >= 0, vn = { boosted: Dn, useUrlParams: Mn, parameters: Cn, unfilteredParameters: Hn, headers: ln, target: Jr, verb: Fe, errors: En, withCredentials: $r.credentials || Pn.credentials || Q.config.withCredentials, timeout: $r.timeout || Pn.timeout || Q.config.timeout, path: _r, triggeringEvent: jr };
        if (!ce(Fr, "htmx:configRequest", vn))
          return ie(Kr), mn(), Vr;
        if (_r = vn.path, Fe = vn.verb, ln = vn.headers, Cn = vn.parameters, En = vn.errors, Mn = vn.useUrlParams, En && En.length > 0)
          return ce(Fr, "htmx:validation:halted", vn), ie(Kr), mn(), Vr;
        var qn = _r.split("#"), Bn = qn[0], Ln = qn[1], xn = _r;
        if (Mn) {
          xn = Bn;
          var $n = Object.keys(Cn).length !== 0;
          $n && (xn.indexOf("?") < 0 ? xn += "?" : xn += "&", xn += cr(Cn), Ln && (xn += "#" + Ln));
        }
        if (!Hr(Fr, xn, vn))
          return fe(Fr, "htmx:invalidPath", vn), ie(zr), Vr;
        if (sn.open(Fe.toUpperCase(), xn, !0), sn.overrideMimeType("text/html"), sn.withCredentials = vn.withCredentials, sn.timeout = vn.timeout, !Pn.noHeaders) {
          for (var Nn in ln)
            if (ln.hasOwnProperty(Nn)) {
              var Qn = ln[Nn];
              Tr(sn, Nn, Qn);
            }
        }
        var pn = { xhr: sn, target: Jr, requestConfig: vn, etc: $r, boosted: Dn, select: Yr, pathInfo: { requestPath: _r, finalRequestPath: xn, anchor: Ln } };
        if (sn.onload = function() {
          try {
            var yn = qr(Fr);
            if (pn.pathInfo.responsePath = Rr(sn), Wr(Fr, pn), nr(In, kn), ce(Fr, "htmx:afterRequest", pn), ce(Fr, "htmx:afterOnLoad", pn), !se(Fr)) {
              for (var _n = null; yn.length > 0 && _n == null; ) {
                var Tn = yn.shift();
                se(Tn) && (_n = Tn);
              }
              _n && (ce(_n, "htmx:afterRequest", pn), ce(_n, "htmx:afterOnLoad", pn));
            }
            ie(Kr), mn();
          } catch (Fn) {
            throw fe(Fr, "htmx:onLoadError", le({ error: Fn }, pn)), Fn;
          }
        }, sn.onerror = function() {
          nr(In, kn), fe(Fr, "htmx:afterRequest", pn), fe(Fr, "htmx:sendError", pn), ie(zr), mn();
        }, sn.onabort = function() {
          nr(In, kn), fe(Fr, "htmx:afterRequest", pn), fe(Fr, "htmx:sendAbort", pn), ie(zr), mn();
        }, sn.ontimeout = function() {
          nr(In, kn), fe(Fr, "htmx:afterRequest", pn), fe(Fr, "htmx:timeout", pn), ie(zr), mn();
        }, !ce(Fr, "htmx:beforeRequest", pn))
          return ie(Kr), mn(), Vr;
        var In = tr(Fr), kn = rr(Fr);
        oe(["loadstart", "loadend", "progress", "abort"], function(yn) {
          oe([sn, sn.upload], function(_n) {
            _n.addEventListener(yn, function(Tn) {
              ce(Fr, "htmx:xhr:" + yn, { lengthComputable: Tn.lengthComputable, loaded: Tn.loaded, total: Tn.total });
            });
          });
        }), ce(Fr, "htmx:beforeSend", pn);
        var Kn = Mn ? null : yr(sn, Fr, Cn);
        return sn.send(Kn), Vr;
      }
      function Lr(Fe, _r) {
        var Fr = _r.xhr, jr = null, $r = null;
        if (O(Fr, /HX-Push:/i) ? (jr = Fr.getResponseHeader("HX-Push"), $r = "push") : O(Fr, /HX-Push-Url:/i) ? (jr = Fr.getResponseHeader("HX-Push-Url"), $r = "push") : O(Fr, /HX-Replace-Url:/i) && (jr = Fr.getResponseHeader("HX-Replace-Url"), $r = "replace"), jr)
          return jr === "false" ? {} : { type: $r, path: jr };
        var Qr = _r.pathInfo.finalRequestPath, Kr = _r.pathInfo.responsePath, zr = ne(Fe, "hx-push-url"), Vr = ne(Fe, "hx-replace-url"), Wr = ae(Fe).boosted, Yr = null, Jr = null;
        return zr ? (Yr = "push", Jr = zr) : Vr ? (Yr = "replace", Jr = Vr) : Wr && (Yr = "push", Jr = Kr || Qr), Jr ? Jr === "false" ? {} : (Jr === "true" && (Jr = Kr || Qr), _r.pathInfo.anchor && Jr.indexOf("#") === -1 && (Jr = Jr + "#" + _r.pathInfo.anchor), { type: Yr, path: Jr }) : {};
      }
      function Ar(Fe, _r) {
        var Fr = _r.xhr, jr = _r.target, $r = _r.etc;
        _r.requestConfig;
        var Qr = _r.select;
        if (ce(Fe, "htmx:beforeOnLoad", _r)) {
          if (O(Fr, /HX-Trigger:/i) && Be(Fr, "HX-Trigger", Fe), O(Fr, /HX-Location:/i)) {
            Jt();
            var Kr = Fr.getResponseHeader("HX-Location"), zr;
            Kr.indexOf("{") === 0 && (zr = E(Kr), Kr = zr.path, delete zr.path), Or("GET", Kr, zr).then(function() {
              Zt(Kr);
            });
            return;
          }
          var Vr = O(Fr, /HX-Refresh:/i) && Fr.getResponseHeader("HX-Refresh") === "true";
          if (O(Fr, /HX-Redirect:/i)) {
            location.href = Fr.getResponseHeader("HX-Redirect"), Vr && location.reload();
            return;
          }
          if (Vr) {
            location.reload();
            return;
          }
          O(Fr, /HX-Retarget:/i) && (_r.target = re().querySelector(Fr.getResponseHeader("HX-Retarget")));
          var Wr = Lr(Fe, _r), Yr = Fr.status >= 200 && Fr.status < 400 && Fr.status !== 204, Jr = Fr.response, Gr = Fr.status >= 400, tn = Q.config.ignoreTitle, un = le({ shouldSwap: Yr, serverResponse: Jr, isError: Gr, ignoreTitle: tn }, _r);
          if (ce(jr, "htmx:beforeSwap", un)) {
            if (jr = un.target, Jr = un.serverResponse, Gr = un.isError, tn = un.ignoreTitle, _r.target = jr, _r.failed = Gr, _r.successful = !Gr, un.shouldSwap) {
              Fr.status === 286 && et(Fe), T(Fe, function(fn) {
                Jr = fn.transformResponse(Jr, Fr, Fe);
              }), Wr.type && Jt();
              var gn = $r.swapOverride;
              O(Fr, /HX-Reswap:/i) && (gn = Fr.getResponseHeader("HX-Reswap"));
              var zr = mr(Fe, gn);
              zr.hasOwnProperty("ignoreTitle") && (tn = zr.ignoreTitle), jr.classList.add(Q.config.swappingClass);
              var Zr = null, en = null, rn = function() {
                try {
                  var fn = document.activeElement, dn = {};
                  try {
                    dn = { elt: fn, start: fn ? fn.selectionStart : null, end: fn ? fn.selectionEnd : null };
                  } catch {
                  }
                  var Sn;
                  Qr && (Sn = Qr), O(Fr, /HX-Reselect:/i) && (Sn = Fr.getResponseHeader("HX-Reselect")), Wr.type && (ce(re().body, "htmx:beforeHistoryUpdate", le({ history: Wr }, _r)), Wr.type === "push" ? (Zt(Wr.path), ce(re().body, "htmx:pushedIntoHistory", { path: Wr.path })) : (Kt(Wr.path), ce(re().body, "htmx:replacedInHistory", { path: Wr.path })));
                  var hn = R(jr);
                  if (Ue(zr.swapStyle, jr, Fe, Jr, hn, Sn), dn.elt && !se(dn.elt) && ee(dn.elt, "id")) {
                    var sn = document.getElementById(ee(dn.elt, "id")), mn = { preventScroll: zr.focusScroll !== void 0 ? !zr.focusScroll : !Q.config.defaultFocusScroll };
                    if (sn) {
                      if (dn.start && sn.setSelectionRange)
                        try {
                          sn.setSelectionRange(dn.start, dn.end);
                        } catch {
                        }
                      sn.focus(mn);
                    }
                  }
                  if (jr.classList.remove(Q.config.swappingClass), oe(hn.elts, function(ln) {
                    ln.classList && ln.classList.add(Q.config.settlingClass), ce(ln, "htmx:afterSwap", _r);
                  }), O(Fr, /HX-Trigger-After-Swap:/i)) {
                    var On = Fe;
                    se(Fe) || (On = re().body), Be(Fr, "HX-Trigger-After-Swap", On);
                  }
                  var An = function() {
                    if (oe(hn.tasks, function(bn) {
                      bn.call();
                    }), oe(hn.elts, function(bn) {
                      bn.classList && bn.classList.remove(Q.config.settlingClass), ce(bn, "htmx:afterSettle", _r);
                    }), _r.pathInfo.anchor) {
                      var ln = re().getElementById(_r.pathInfo.anchor);
                      ln && ln.scrollIntoView({ block: "start", behavior: "auto" });
                    }
                    if (hn.title && !tn) {
                      var Rn = C("title");
                      Rn ? Rn.innerHTML = hn.title : window.document.title = hn.title;
                    }
                    if (xr(hn.elts, zr), O(Fr, /HX-Trigger-After-Settle:/i)) {
                      var En = Fe;
                      se(Fe) || (En = re().body), Be(Fr, "HX-Trigger-After-Settle", En);
                    }
                    ie(Zr);
                  };
                  zr.settleDelay > 0 ? setTimeout(An, zr.settleDelay) : An();
                } catch (ln) {
                  throw fe(Fe, "htmx:swapError", _r), ie(en), ln;
                }
              }, nn = Q.config.globalViewTransitions;
              if (zr.hasOwnProperty("transition") && (nn = zr.transition), nn && ce(Fe, "htmx:beforeTransition", _r) && typeof Promise < "u" && document.startViewTransition) {
                var an = new Promise(function(fn, dn) {
                  Zr = fn, en = dn;
                }), cn = rn;
                rn = function() {
                  document.startViewTransition(function() {
                    return cn(), an;
                  });
                };
              }
              zr.swapDelay > 0 ? setTimeout(rn, zr.swapDelay) : rn();
            }
            Gr && fe(Fe, "htmx:responseError", le({ error: "Response Status Error Code " + Fr.status + " from " + _r.pathInfo.requestPath }, _r));
          }
        }
      }
      var Nr = {};
      function Ir() {
        return { init: function(Fe) {
          return null;
        }, onEvent: function(Fe, _r) {
          return !0;
        }, transformResponse: function(Fe, _r, Fr) {
          return Fe;
        }, isInlineSwap: function(Fe) {
          return !1;
        }, handleSwap: function(Fe, _r, Fr, jr) {
          return !1;
        }, encodeParameters: function(Fe, _r, Fr) {
          return null;
        } };
      }
      function kr(Fe, _r) {
        _r.init && _r.init(r), Nr[Fe] = le(Ir(), _r);
      }
      function Pr(Fe) {
        delete Nr[Fe];
      }
      function Mr(Fe, _r, Fr) {
        if (Fe == null)
          return _r;
        _r == null && (_r = []), Fr == null && (Fr = []);
        var jr = te(Fe, "hx-ext");
        return jr && oe(jr.split(","), function($r) {
          if ($r = $r.replace(/ /g, ""), $r.slice(0, 7) == "ignore:") {
            Fr.push($r.slice(7));
            return;
          }
          if (Fr.indexOf($r) < 0) {
            var Qr = Nr[$r];
            Qr && _r.indexOf(Qr) < 0 && _r.push(Qr);
          }
        }), Mr(u(Fe), _r, Fr);
      }
      function Dr(Fe) {
        var _r = function() {
          Fe && (Fe(), Fe = null);
        };
        re().readyState === "complete" ? _r() : (re().addEventListener("DOMContentLoaded", function() {
          _r();
        }), re().addEventListener("readystatechange", function() {
          re().readyState === "complete" && _r();
        }));
      }
      function Xr() {
        Q.config.includeIndicatorStyles !== !1 && re().head.insertAdjacentHTML("beforeend", "<style>                      ." + Q.config.indicatorClass + "{opacity:0}                      ." + Q.config.requestClass + " ." + Q.config.indicatorClass + "{opacity:1; transition: opacity 200ms ease-in;}                      ." + Q.config.requestClass + "." + Q.config.indicatorClass + "{opacity:1; transition: opacity 200ms ease-in;}                    </style>");
      }
      function Ur() {
        var Fe = re().querySelector('meta[name="htmx-config"]');
        return Fe ? E(Fe.content) : null;
      }
      function Br() {
        var Fe = Ur();
        Fe && (Q.config = le(Q.config, Fe));
      }
      return Dr(function() {
        Br(), Xr();
        var Fe = re().body;
        Bt(Fe);
        var _r = re().querySelectorAll("[hx-trigger='restored'],[data-hx-trigger='restored']");
        Fe.addEventListener("htmx:abort", function(jr) {
          var $r = jr.target, Qr = ae($r);
          Qr && Qr.xhr && Qr.xhr.abort();
        });
        var Fr = window.onpopstate;
        window.onpopstate = function(jr) {
          jr.state && jr.state.htmx ? (er(), oe(_r, function($r) {
            ce($r, "htmx:restored", { document: re(), triggerEvent: ce });
          })) : Fr && Fr(jr);
        }, setTimeout(function() {
          ce(Fe, "htmx:load", {}), Fe = null;
        }, 0);
      }), Q;
    }();
  });
})(htmx_min);
var htmx_minExports = htmx_min.exports;
const htmx = /* @__PURE__ */ getDefaultExportFromCjs(htmx_minExports);
var flushPending = !1, flushing = !1, queue = [], lastFlushedIndex = -1;
function scheduler(Fe) {
  queueJob(Fe);
}
function queueJob(Fe) {
  queue.includes(Fe) || queue.push(Fe), queueFlush();
}
function dequeueJob(Fe) {
  let _r = queue.indexOf(Fe);
  _r !== -1 && _r > lastFlushedIndex && queue.splice(_r, 1);
}
function queueFlush() {
  !flushing && !flushPending && (flushPending = !0, queueMicrotask(flushJobs));
}
function flushJobs() {
  flushPending = !1, flushing = !0;
  for (let Fe = 0; Fe < queue.length; Fe++)
    queue[Fe](), lastFlushedIndex = Fe;
  queue.length = 0, lastFlushedIndex = -1, flushing = !1;
}
var reactive, effect, release, raw, shouldSchedule = !0;
function disableEffectScheduling(Fe) {
  shouldSchedule = !1, Fe(), shouldSchedule = !0;
}
function setReactivityEngine(Fe) {
  reactive = Fe.reactive, release = Fe.release, effect = (_r) => Fe.effect(_r, { scheduler: (Fr) => {
    shouldSchedule ? scheduler(Fr) : Fr();
  } }), raw = Fe.raw;
}
function overrideEffect(Fe) {
  effect = Fe;
}
function elementBoundEffect(Fe) {
  let _r = () => {
  };
  return [(jr) => {
    let $r = effect(jr);
    return Fe._x_effects || (Fe._x_effects = /* @__PURE__ */ new Set(), Fe._x_runEffects = () => {
      Fe._x_effects.forEach((Qr) => Qr());
    }), Fe._x_effects.add($r), _r = () => {
      $r !== void 0 && (Fe._x_effects.delete($r), release($r));
    }, $r;
  }, () => {
    _r();
  }];
}
function dispatch(Fe, _r, Fr = {}) {
  Fe.dispatchEvent(
    new CustomEvent(_r, {
      detail: Fr,
      bubbles: !0,
      // Allows events to pass the shadow DOM barrier.
      composed: !0,
      cancelable: !0
    })
  );
}
function walk(Fe, _r) {
  if (typeof ShadowRoot == "function" && Fe instanceof ShadowRoot) {
    Array.from(Fe.children).forEach(($r) => walk($r, _r));
    return;
  }
  let Fr = !1;
  if (_r(Fe, () => Fr = !0), Fr)
    return;
  let jr = Fe.firstElementChild;
  for (; jr; )
    walk(jr, _r), jr = jr.nextElementSibling;
}
function warn(Fe, ..._r) {
  console.warn(`Alpine Warning: ${Fe}`, ..._r);
}
var started = !1;
function start() {
  started && warn("Alpine has already been initialized on this page. Calling Alpine.start() more than once can cause problems."), started = !0, document.body || warn("Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?"), dispatch(document, "alpine:init"), dispatch(document, "alpine:initializing"), startObservingMutations(), onElAdded((_r) => initTree(_r, walk)), onElRemoved((_r) => destroyTree(_r)), onAttributesAdded((_r, Fr) => {
    directives(_r, Fr).forEach((jr) => jr());
  });
  let Fe = (_r) => !closestRoot(_r.parentElement, !0);
  Array.from(document.querySelectorAll(allSelectors().join(","))).filter(Fe).forEach((_r) => {
    initTree(_r);
  }), dispatch(document, "alpine:initialized");
}
var rootSelectorCallbacks = [], initSelectorCallbacks = [];
function rootSelectors() {
  return rootSelectorCallbacks.map((Fe) => Fe());
}
function allSelectors() {
  return rootSelectorCallbacks.concat(initSelectorCallbacks).map((Fe) => Fe());
}
function addRootSelector(Fe) {
  rootSelectorCallbacks.push(Fe);
}
function addInitSelector(Fe) {
  initSelectorCallbacks.push(Fe);
}
function closestRoot(Fe, _r = !1) {
  return findClosest(Fe, (Fr) => {
    if ((_r ? allSelectors() : rootSelectors()).some(($r) => Fr.matches($r)))
      return !0;
  });
}
function findClosest(Fe, _r) {
  if (Fe) {
    if (_r(Fe))
      return Fe;
    if (Fe._x_teleportBack && (Fe = Fe._x_teleportBack), !!Fe.parentElement)
      return findClosest(Fe.parentElement, _r);
  }
}
function isRoot(Fe) {
  return rootSelectors().some((_r) => Fe.matches(_r));
}
var initInterceptors = [];
function interceptInit(Fe) {
  initInterceptors.push(Fe);
}
function initTree(Fe, _r = walk, Fr = () => {
}) {
  deferHandlingDirectives(() => {
    _r(Fe, (jr, $r) => {
      Fr(jr, $r), initInterceptors.forEach((Qr) => Qr(jr, $r)), directives(jr, jr.attributes).forEach((Qr) => Qr()), jr._x_ignore && $r();
    });
  });
}
function destroyTree(Fe) {
  walk(Fe, (_r) => {
    cleanupAttributes(_r), cleanupElement(_r);
  });
}
var onAttributeAddeds = [], onElRemoveds = [], onElAddeds = [];
function onElAdded(Fe) {
  onElAddeds.push(Fe);
}
function onElRemoved(Fe, _r) {
  typeof _r == "function" ? (Fe._x_cleanups || (Fe._x_cleanups = []), Fe._x_cleanups.push(_r)) : (_r = Fe, onElRemoveds.push(_r));
}
function onAttributesAdded(Fe) {
  onAttributeAddeds.push(Fe);
}
function onAttributeRemoved(Fe, _r, Fr) {
  Fe._x_attributeCleanups || (Fe._x_attributeCleanups = {}), Fe._x_attributeCleanups[_r] || (Fe._x_attributeCleanups[_r] = []), Fe._x_attributeCleanups[_r].push(Fr);
}
function cleanupAttributes(Fe, _r) {
  Fe._x_attributeCleanups && Object.entries(Fe._x_attributeCleanups).forEach(([Fr, jr]) => {
    (_r === void 0 || _r.includes(Fr)) && (jr.forEach(($r) => $r()), delete Fe._x_attributeCleanups[Fr]);
  });
}
function cleanupElement(Fe) {
  if (Fe._x_cleanups)
    for (; Fe._x_cleanups.length; )
      Fe._x_cleanups.pop()();
}
var observer = new MutationObserver(onMutate), currentlyObserving = !1;
function startObservingMutations() {
  observer.observe(document, { subtree: !0, childList: !0, attributes: !0, attributeOldValue: !0 }), currentlyObserving = !0;
}
function stopObservingMutations() {
  flushObserver(), observer.disconnect(), currentlyObserving = !1;
}
var recordQueue = [], willProcessRecordQueue = !1;
function flushObserver() {
  recordQueue = recordQueue.concat(observer.takeRecords()), recordQueue.length && !willProcessRecordQueue && (willProcessRecordQueue = !0, queueMicrotask(() => {
    processRecordQueue(), willProcessRecordQueue = !1;
  }));
}
function processRecordQueue() {
  onMutate(recordQueue), recordQueue.length = 0;
}
function mutateDom(Fe) {
  if (!currentlyObserving)
    return Fe();
  stopObservingMutations();
  let _r = Fe();
  return startObservingMutations(), _r;
}
var isCollecting = !1, deferredMutations = [];
function deferMutations() {
  isCollecting = !0;
}
function flushAndStopDeferringMutations() {
  isCollecting = !1, onMutate(deferredMutations), deferredMutations = [];
}
function onMutate(Fe) {
  if (isCollecting) {
    deferredMutations = deferredMutations.concat(Fe);
    return;
  }
  let _r = [], Fr = [], jr = /* @__PURE__ */ new Map(), $r = /* @__PURE__ */ new Map();
  for (let Qr = 0; Qr < Fe.length; Qr++)
    if (!Fe[Qr].target._x_ignoreMutationObserver && (Fe[Qr].type === "childList" && (Fe[Qr].addedNodes.forEach((Kr) => Kr.nodeType === 1 && _r.push(Kr)), Fe[Qr].removedNodes.forEach((Kr) => Kr.nodeType === 1 && Fr.push(Kr))), Fe[Qr].type === "attributes")) {
      let Kr = Fe[Qr].target, zr = Fe[Qr].attributeName, Vr = Fe[Qr].oldValue, Wr = () => {
        jr.has(Kr) || jr.set(Kr, []), jr.get(Kr).push({ name: zr, value: Kr.getAttribute(zr) });
      }, Yr = () => {
        $r.has(Kr) || $r.set(Kr, []), $r.get(Kr).push(zr);
      };
      Kr.hasAttribute(zr) && Vr === null ? Wr() : Kr.hasAttribute(zr) ? (Yr(), Wr()) : Yr();
    }
  $r.forEach((Qr, Kr) => {
    cleanupAttributes(Kr, Qr);
  }), jr.forEach((Qr, Kr) => {
    onAttributeAddeds.forEach((zr) => zr(Kr, Qr));
  });
  for (let Qr of Fr)
    _r.includes(Qr) || (onElRemoveds.forEach((Kr) => Kr(Qr)), destroyTree(Qr));
  _r.forEach((Qr) => {
    Qr._x_ignoreSelf = !0, Qr._x_ignore = !0;
  });
  for (let Qr of _r)
    Fr.includes(Qr) || Qr.isConnected && (delete Qr._x_ignoreSelf, delete Qr._x_ignore, onElAddeds.forEach((Kr) => Kr(Qr)), Qr._x_ignore = !0, Qr._x_ignoreSelf = !0);
  _r.forEach((Qr) => {
    delete Qr._x_ignoreSelf, delete Qr._x_ignore;
  }), _r = null, Fr = null, jr = null, $r = null;
}
function scope(Fe) {
  return mergeProxies(closestDataStack(Fe));
}
function addScopeToNode(Fe, _r, Fr) {
  return Fe._x_dataStack = [_r, ...closestDataStack(Fr || Fe)], () => {
    Fe._x_dataStack = Fe._x_dataStack.filter((jr) => jr !== _r);
  };
}
function closestDataStack(Fe) {
  return Fe._x_dataStack ? Fe._x_dataStack : typeof ShadowRoot == "function" && Fe instanceof ShadowRoot ? closestDataStack(Fe.host) : Fe.parentNode ? closestDataStack(Fe.parentNode) : [];
}
function mergeProxies(Fe) {
  return new Proxy({ objects: Fe }, mergeProxyTrap);
}
var mergeProxyTrap = {
  ownKeys({ objects: Fe }) {
    return Array.from(
      new Set(Fe.flatMap((_r) => Object.keys(_r)))
    );
  },
  has({ objects: Fe }, _r) {
    return _r == Symbol.unscopables ? !1 : Fe.some(
      (Fr) => Object.prototype.hasOwnProperty.call(Fr, _r)
    );
  },
  get({ objects: Fe }, _r, Fr) {
    return _r == "toJSON" ? collapseProxies : Reflect.get(
      Fe.find(
        (jr) => Object.prototype.hasOwnProperty.call(jr, _r)
      ) || {},
      _r,
      Fr
    );
  },
  set({ objects: Fe }, _r, Fr, jr) {
    const $r = Fe.find(
      (Kr) => Object.prototype.hasOwnProperty.call(Kr, _r)
    ) || Fe[Fe.length - 1], Qr = Object.getOwnPropertyDescriptor($r, _r);
    return Qr != null && Qr.set && (Qr != null && Qr.get) ? Reflect.set($r, _r, Fr, jr) : Reflect.set($r, _r, Fr);
  }
};
function collapseProxies() {
  return Reflect.ownKeys(this).reduce((_r, Fr) => (_r[Fr] = Reflect.get(this, Fr), _r), {});
}
function initInterceptors2(Fe) {
  let _r = (jr) => typeof jr == "object" && !Array.isArray(jr) && jr !== null, Fr = (jr, $r = "") => {
    Object.entries(Object.getOwnPropertyDescriptors(jr)).forEach(([Qr, { value: Kr, enumerable: zr }]) => {
      if (zr === !1 || Kr === void 0)
        return;
      let Vr = $r === "" ? Qr : `${$r}.${Qr}`;
      typeof Kr == "object" && Kr !== null && Kr._x_interceptor ? jr[Qr] = Kr.initialize(Fe, Vr, Qr) : _r(Kr) && Kr !== jr && !(Kr instanceof Element) && Fr(Kr, Vr);
    });
  };
  return Fr(Fe);
}
function interceptor(Fe, _r = () => {
}) {
  let Fr = {
    initialValue: void 0,
    _x_interceptor: !0,
    initialize(jr, $r, Qr) {
      return Fe(this.initialValue, () => get(jr, $r), (Kr) => set(jr, $r, Kr), $r, Qr);
    }
  };
  return _r(Fr), (jr) => {
    if (typeof jr == "object" && jr !== null && jr._x_interceptor) {
      let $r = Fr.initialize.bind(Fr);
      Fr.initialize = (Qr, Kr, zr) => {
        let Vr = jr.initialize(Qr, Kr, zr);
        return Fr.initialValue = Vr, $r(Qr, Kr, zr);
      };
    } else
      Fr.initialValue = jr;
    return Fr;
  };
}
function get(Fe, _r) {
  return _r.split(".").reduce((Fr, jr) => Fr[jr], Fe);
}
function set(Fe, _r, Fr) {
  if (typeof _r == "string" && (_r = _r.split(".")), _r.length === 1)
    Fe[_r[0]] = Fr;
  else {
    if (_r.length === 0)
      throw error;
    return Fe[_r[0]] || (Fe[_r[0]] = {}), set(Fe[_r[0]], _r.slice(1), Fr);
  }
}
var magics = {};
function magic(Fe, _r) {
  magics[Fe] = _r;
}
function injectMagics(Fe, _r) {
  return Object.entries(magics).forEach(([Fr, jr]) => {
    let $r = null;
    function Qr() {
      if ($r)
        return $r;
      {
        let [Kr, zr] = getElementBoundUtilities(_r);
        return $r = { interceptor, ...Kr }, onElRemoved(_r, zr), $r;
      }
    }
    Object.defineProperty(Fe, `$${Fr}`, {
      get() {
        return jr(_r, Qr());
      },
      enumerable: !1
    });
  }), Fe;
}
function tryCatch(Fe, _r, Fr, ...jr) {
  try {
    return Fr(...jr);
  } catch ($r) {
    handleError($r, Fe, _r);
  }
}
function handleError(Fe, _r, Fr = void 0) {
  Object.assign(Fe, { el: _r, expression: Fr }), console.warn(`Alpine Expression Error: ${Fe.message}

${Fr ? 'Expression: "' + Fr + `"

` : ""}`, _r), setTimeout(() => {
    throw Fe;
  }, 0);
}
var shouldAutoEvaluateFunctions = !0;
function dontAutoEvaluateFunctions(Fe) {
  let _r = shouldAutoEvaluateFunctions;
  shouldAutoEvaluateFunctions = !1;
  let Fr = Fe();
  return shouldAutoEvaluateFunctions = _r, Fr;
}
function evaluate(Fe, _r, Fr = {}) {
  let jr;
  return evaluateLater(Fe, _r)(($r) => jr = $r, Fr), jr;
}
function evaluateLater(...Fe) {
  return theEvaluatorFunction(...Fe);
}
var theEvaluatorFunction = normalEvaluator;
function setEvaluator(Fe) {
  theEvaluatorFunction = Fe;
}
function normalEvaluator(Fe, _r) {
  let Fr = {};
  injectMagics(Fr, Fe);
  let jr = [Fr, ...closestDataStack(Fe)], $r = typeof _r == "function" ? generateEvaluatorFromFunction(jr, _r) : generateEvaluatorFromString(jr, _r, Fe);
  return tryCatch.bind(null, Fe, _r, $r);
}
function generateEvaluatorFromFunction(Fe, _r) {
  return (Fr = () => {
  }, { scope: jr = {}, params: $r = [] } = {}) => {
    let Qr = _r.apply(mergeProxies([jr, ...Fe]), $r);
    runIfTypeOfFunction(Fr, Qr);
  };
}
var evaluatorMemo = {};
function generateFunctionFromString(Fe, _r) {
  if (evaluatorMemo[Fe])
    return evaluatorMemo[Fe];
  let Fr = Object.getPrototypeOf(async function() {
  }).constructor, jr = /^[\n\s]*if.*\(.*\)/.test(Fe.trim()) || /^(let|const)\s/.test(Fe.trim()) ? `(async()=>{ ${Fe} })()` : Fe, Qr = (() => {
    try {
      let Kr = new Fr(
        ["__self", "scope"],
        `with (scope) { __self.result = ${jr} }; __self.finished = true; return __self.result;`
      );
      return Object.defineProperty(Kr, "name", {
        value: `[Alpine] ${Fe}`
      }), Kr;
    } catch (Kr) {
      return handleError(Kr, _r, Fe), Promise.resolve();
    }
  })();
  return evaluatorMemo[Fe] = Qr, Qr;
}
function generateEvaluatorFromString(Fe, _r, Fr) {
  let jr = generateFunctionFromString(_r, Fr);
  return ($r = () => {
  }, { scope: Qr = {}, params: Kr = [] } = {}) => {
    jr.result = void 0, jr.finished = !1;
    let zr = mergeProxies([Qr, ...Fe]);
    if (typeof jr == "function") {
      let Vr = jr(jr, zr).catch((Wr) => handleError(Wr, Fr, _r));
      jr.finished ? (runIfTypeOfFunction($r, jr.result, zr, Kr, Fr), jr.result = void 0) : Vr.then((Wr) => {
        runIfTypeOfFunction($r, Wr, zr, Kr, Fr);
      }).catch((Wr) => handleError(Wr, Fr, _r)).finally(() => jr.result = void 0);
    }
  };
}
function runIfTypeOfFunction(Fe, _r, Fr, jr, $r) {
  if (shouldAutoEvaluateFunctions && typeof _r == "function") {
    let Qr = _r.apply(Fr, jr);
    Qr instanceof Promise ? Qr.then((Kr) => runIfTypeOfFunction(Fe, Kr, Fr, jr)).catch((Kr) => handleError(Kr, $r, _r)) : Fe(Qr);
  } else
    typeof _r == "object" && _r instanceof Promise ? _r.then((Qr) => Fe(Qr)) : Fe(_r);
}
var prefixAsString = "x-";
function prefix(Fe = "") {
  return prefixAsString + Fe;
}
function setPrefix(Fe) {
  prefixAsString = Fe;
}
var directiveHandlers = {};
function directive(Fe, _r) {
  return directiveHandlers[Fe] = _r, {
    before(Fr) {
      if (!directiveHandlers[Fr]) {
        console.warn(
          "Cannot find directive `${directive}`. `${name}` will use the default order of execution"
        );
        return;
      }
      const jr = directiveOrder.indexOf(Fr);
      directiveOrder.splice(jr >= 0 ? jr : directiveOrder.indexOf("DEFAULT"), 0, Fe);
    }
  };
}
function directives(Fe, _r, Fr) {
  if (_r = Array.from(_r), Fe._x_virtualDirectives) {
    let Qr = Object.entries(Fe._x_virtualDirectives).map(([zr, Vr]) => ({ name: zr, value: Vr })), Kr = attributesOnly(Qr);
    Qr = Qr.map((zr) => Kr.find((Vr) => Vr.name === zr.name) ? {
      name: `x-bind:${zr.name}`,
      value: `"${zr.value}"`
    } : zr), _r = _r.concat(Qr);
  }
  let jr = {};
  return _r.map(toTransformedAttributes((Qr, Kr) => jr[Qr] = Kr)).filter(outNonAlpineAttributes).map(toParsedDirectives(jr, Fr)).sort(byPriority).map((Qr) => getDirectiveHandler(Fe, Qr));
}
function attributesOnly(Fe) {
  return Array.from(Fe).map(toTransformedAttributes()).filter((_r) => !outNonAlpineAttributes(_r));
}
var isDeferringHandlers = !1, directiveHandlerStacks = /* @__PURE__ */ new Map(), currentHandlerStackKey = Symbol();
function deferHandlingDirectives(Fe) {
  isDeferringHandlers = !0;
  let _r = Symbol();
  currentHandlerStackKey = _r, directiveHandlerStacks.set(_r, []);
  let Fr = () => {
    for (; directiveHandlerStacks.get(_r).length; )
      directiveHandlerStacks.get(_r).shift()();
    directiveHandlerStacks.delete(_r);
  }, jr = () => {
    isDeferringHandlers = !1, Fr();
  };
  Fe(Fr), jr();
}
function getElementBoundUtilities(Fe) {
  let _r = [], Fr = (zr) => _r.push(zr), [jr, $r] = elementBoundEffect(Fe);
  return _r.push($r), [{
    Alpine: alpine_default,
    effect: jr,
    cleanup: Fr,
    evaluateLater: evaluateLater.bind(evaluateLater, Fe),
    evaluate: evaluate.bind(evaluate, Fe)
  }, () => _r.forEach((zr) => zr())];
}
function getDirectiveHandler(Fe, _r) {
  let Fr = () => {
  }, jr = directiveHandlers[_r.type] || Fr, [$r, Qr] = getElementBoundUtilities(Fe);
  onAttributeRemoved(Fe, _r.original, Qr);
  let Kr = () => {
    Fe._x_ignore || Fe._x_ignoreSelf || (jr.inline && jr.inline(Fe, _r, $r), jr = jr.bind(jr, Fe, _r, $r), isDeferringHandlers ? directiveHandlerStacks.get(currentHandlerStackKey).push(jr) : jr());
  };
  return Kr.runCleanups = Qr, Kr;
}
var startingWith = (Fe, _r) => ({ name: Fr, value: jr }) => (Fr.startsWith(Fe) && (Fr = Fr.replace(Fe, _r)), { name: Fr, value: jr }), into = (Fe) => Fe;
function toTransformedAttributes(Fe = () => {
}) {
  return ({ name: _r, value: Fr }) => {
    let { name: jr, value: $r } = attributeTransformers.reduce((Qr, Kr) => Kr(Qr), { name: _r, value: Fr });
    return jr !== _r && Fe(jr, _r), { name: jr, value: $r };
  };
}
var attributeTransformers = [];
function mapAttributes(Fe) {
  attributeTransformers.push(Fe);
}
function outNonAlpineAttributes({ name: Fe }) {
  return alpineAttributeRegex().test(Fe);
}
var alpineAttributeRegex = () => new RegExp(`^${prefixAsString}([^:^.]+)\\b`);
function toParsedDirectives(Fe, _r) {
  return ({ name: Fr, value: jr }) => {
    let $r = Fr.match(alpineAttributeRegex()), Qr = Fr.match(/:([a-zA-Z0-9\-_:]+)/), Kr = Fr.match(/\.[^.\]]+(?=[^\]]*$)/g) || [], zr = _r || Fe[Fr] || Fr;
    return {
      type: $r ? $r[1] : null,
      value: Qr ? Qr[1] : null,
      modifiers: Kr.map((Vr) => Vr.replace(".", "")),
      expression: jr,
      original: zr
    };
  };
}
var DEFAULT = "DEFAULT", directiveOrder = [
  "ignore",
  "ref",
  "data",
  "id",
  "anchor",
  "bind",
  "init",
  "for",
  "model",
  "modelable",
  "transition",
  "show",
  "if",
  DEFAULT,
  "teleport"
];
function byPriority(Fe, _r) {
  let Fr = directiveOrder.indexOf(Fe.type) === -1 ? DEFAULT : Fe.type, jr = directiveOrder.indexOf(_r.type) === -1 ? DEFAULT : _r.type;
  return directiveOrder.indexOf(Fr) - directiveOrder.indexOf(jr);
}
var tickStack = [], isHolding = !1;
function nextTick(Fe = () => {
}) {
  return queueMicrotask(() => {
    isHolding || setTimeout(() => {
      releaseNextTicks();
    });
  }), new Promise((_r) => {
    tickStack.push(() => {
      Fe(), _r();
    });
  });
}
function releaseNextTicks() {
  for (isHolding = !1; tickStack.length; )
    tickStack.shift()();
}
function holdNextTicks() {
  isHolding = !0;
}
function setClasses(Fe, _r) {
  return Array.isArray(_r) ? setClassesFromString(Fe, _r.join(" ")) : typeof _r == "object" && _r !== null ? setClassesFromObject(Fe, _r) : typeof _r == "function" ? setClasses(Fe, _r()) : setClassesFromString(Fe, _r);
}
function setClassesFromString(Fe, _r) {
  let Fr = ($r) => $r.split(" ").filter((Qr) => !Fe.classList.contains(Qr)).filter(Boolean), jr = ($r) => (Fe.classList.add(...$r), () => {
    Fe.classList.remove(...$r);
  });
  return _r = _r === !0 ? _r = "" : _r || "", jr(Fr(_r));
}
function setClassesFromObject(Fe, _r) {
  let Fr = (zr) => zr.split(" ").filter(Boolean), jr = Object.entries(_r).flatMap(([zr, Vr]) => Vr ? Fr(zr) : !1).filter(Boolean), $r = Object.entries(_r).flatMap(([zr, Vr]) => Vr ? !1 : Fr(zr)).filter(Boolean), Qr = [], Kr = [];
  return $r.forEach((zr) => {
    Fe.classList.contains(zr) && (Fe.classList.remove(zr), Kr.push(zr));
  }), jr.forEach((zr) => {
    Fe.classList.contains(zr) || (Fe.classList.add(zr), Qr.push(zr));
  }), () => {
    Kr.forEach((zr) => Fe.classList.add(zr)), Qr.forEach((zr) => Fe.classList.remove(zr));
  };
}
function setStyles(Fe, _r) {
  return typeof _r == "object" && _r !== null ? setStylesFromObject(Fe, _r) : setStylesFromString(Fe, _r);
}
function setStylesFromObject(Fe, _r) {
  let Fr = {};
  return Object.entries(_r).forEach(([jr, $r]) => {
    Fr[jr] = Fe.style[jr], jr.startsWith("--") || (jr = kebabCase(jr)), Fe.style.setProperty(jr, $r);
  }), setTimeout(() => {
    Fe.style.length === 0 && Fe.removeAttribute("style");
  }), () => {
    setStyles(Fe, Fr);
  };
}
function setStylesFromString(Fe, _r) {
  let Fr = Fe.getAttribute("style", _r);
  return Fe.setAttribute("style", _r), () => {
    Fe.setAttribute("style", Fr || "");
  };
}
function kebabCase(Fe) {
  return Fe.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
function once(Fe, _r = () => {
}) {
  let Fr = !1;
  return function() {
    Fr ? _r.apply(this, arguments) : (Fr = !0, Fe.apply(this, arguments));
  };
}
directive("transition", (Fe, { value: _r, modifiers: Fr, expression: jr }, { evaluate: $r }) => {
  typeof jr == "function" && (jr = $r(jr)), jr !== !1 && (!jr || typeof jr == "boolean" ? registerTransitionsFromHelper(Fe, Fr, _r) : registerTransitionsFromClassString(Fe, jr, _r));
});
function registerTransitionsFromClassString(Fe, _r, Fr) {
  registerTransitionObject(Fe, setClasses, ""), {
    enter: ($r) => {
      Fe._x_transition.enter.during = $r;
    },
    "enter-start": ($r) => {
      Fe._x_transition.enter.start = $r;
    },
    "enter-end": ($r) => {
      Fe._x_transition.enter.end = $r;
    },
    leave: ($r) => {
      Fe._x_transition.leave.during = $r;
    },
    "leave-start": ($r) => {
      Fe._x_transition.leave.start = $r;
    },
    "leave-end": ($r) => {
      Fe._x_transition.leave.end = $r;
    }
  }[Fr](_r);
}
function registerTransitionsFromHelper(Fe, _r, Fr) {
  registerTransitionObject(Fe, setStyles);
  let jr = !_r.includes("in") && !_r.includes("out") && !Fr, $r = jr || _r.includes("in") || ["enter"].includes(Fr), Qr = jr || _r.includes("out") || ["leave"].includes(Fr);
  _r.includes("in") && !jr && (_r = _r.filter((en, rn) => rn < _r.indexOf("out"))), _r.includes("out") && !jr && (_r = _r.filter((en, rn) => rn > _r.indexOf("out")));
  let Kr = !_r.includes("opacity") && !_r.includes("scale"), zr = Kr || _r.includes("opacity"), Vr = Kr || _r.includes("scale"), Wr = zr ? 0 : 1, Yr = Vr ? modifierValue(_r, "scale", 95) / 100 : 1, Jr = modifierValue(_r, "delay", 0) / 1e3, Gr = modifierValue(_r, "origin", "center"), tn = "opacity, transform", un = modifierValue(_r, "duration", 150) / 1e3, gn = modifierValue(_r, "duration", 75) / 1e3, Zr = "cubic-bezier(0.4, 0.0, 0.2, 1)";
  $r && (Fe._x_transition.enter.during = {
    transformOrigin: Gr,
    transitionDelay: `${Jr}s`,
    transitionProperty: tn,
    transitionDuration: `${un}s`,
    transitionTimingFunction: Zr
  }, Fe._x_transition.enter.start = {
    opacity: Wr,
    transform: `scale(${Yr})`
  }, Fe._x_transition.enter.end = {
    opacity: 1,
    transform: "scale(1)"
  }), Qr && (Fe._x_transition.leave.during = {
    transformOrigin: Gr,
    transitionDelay: `${Jr}s`,
    transitionProperty: tn,
    transitionDuration: `${gn}s`,
    transitionTimingFunction: Zr
  }, Fe._x_transition.leave.start = {
    opacity: 1,
    transform: "scale(1)"
  }, Fe._x_transition.leave.end = {
    opacity: Wr,
    transform: `scale(${Yr})`
  });
}
function registerTransitionObject(Fe, _r, Fr = {}) {
  Fe._x_transition || (Fe._x_transition = {
    enter: { during: Fr, start: Fr, end: Fr },
    leave: { during: Fr, start: Fr, end: Fr },
    in(jr = () => {
    }, $r = () => {
    }) {
      transition(Fe, _r, {
        during: this.enter.during,
        start: this.enter.start,
        end: this.enter.end
      }, jr, $r);
    },
    out(jr = () => {
    }, $r = () => {
    }) {
      transition(Fe, _r, {
        during: this.leave.during,
        start: this.leave.start,
        end: this.leave.end
      }, jr, $r);
    }
  });
}
window.Element.prototype._x_toggleAndCascadeWithTransitions = function(Fe, _r, Fr, jr) {
  const $r = document.visibilityState === "visible" ? requestAnimationFrame : setTimeout;
  let Qr = () => $r(Fr);
  if (_r) {
    Fe._x_transition && (Fe._x_transition.enter || Fe._x_transition.leave) ? Fe._x_transition.enter && (Object.entries(Fe._x_transition.enter.during).length || Object.entries(Fe._x_transition.enter.start).length || Object.entries(Fe._x_transition.enter.end).length) ? Fe._x_transition.in(Fr) : Qr() : Fe._x_transition ? Fe._x_transition.in(Fr) : Qr();
    return;
  }
  Fe._x_hidePromise = Fe._x_transition ? new Promise((Kr, zr) => {
    Fe._x_transition.out(() => {
    }, () => Kr(jr)), Fe._x_transitioning && Fe._x_transitioning.beforeCancel(() => zr({ isFromCancelledTransition: !0 }));
  }) : Promise.resolve(jr), queueMicrotask(() => {
    let Kr = closestHide(Fe);
    Kr ? (Kr._x_hideChildren || (Kr._x_hideChildren = []), Kr._x_hideChildren.push(Fe)) : $r(() => {
      let zr = (Vr) => {
        let Wr = Promise.all([
          Vr._x_hidePromise,
          ...(Vr._x_hideChildren || []).map(zr)
        ]).then(([Yr]) => Yr());
        return delete Vr._x_hidePromise, delete Vr._x_hideChildren, Wr;
      };
      zr(Fe).catch((Vr) => {
        if (!Vr.isFromCancelledTransition)
          throw Vr;
      });
    });
  });
};
function closestHide(Fe) {
  let _r = Fe.parentNode;
  if (_r)
    return _r._x_hidePromise ? _r : closestHide(_r);
}
function transition(Fe, _r, { during: Fr, start: jr, end: $r } = {}, Qr = () => {
}, Kr = () => {
}) {
  if (Fe._x_transitioning && Fe._x_transitioning.cancel(), Object.keys(Fr).length === 0 && Object.keys(jr).length === 0 && Object.keys($r).length === 0) {
    Qr(), Kr();
    return;
  }
  let zr, Vr, Wr;
  performTransition(Fe, {
    start() {
      zr = _r(Fe, jr);
    },
    during() {
      Vr = _r(Fe, Fr);
    },
    before: Qr,
    end() {
      zr(), Wr = _r(Fe, $r);
    },
    after: Kr,
    cleanup() {
      Vr(), Wr();
    }
  });
}
function performTransition(Fe, _r) {
  let Fr, jr, $r, Qr = once(() => {
    mutateDom(() => {
      Fr = !0, jr || _r.before(), $r || (_r.end(), releaseNextTicks()), _r.after(), Fe.isConnected && _r.cleanup(), delete Fe._x_transitioning;
    });
  });
  Fe._x_transitioning = {
    beforeCancels: [],
    beforeCancel(Kr) {
      this.beforeCancels.push(Kr);
    },
    cancel: once(function() {
      for (; this.beforeCancels.length; )
        this.beforeCancels.shift()();
      Qr();
    }),
    finish: Qr
  }, mutateDom(() => {
    _r.start(), _r.during();
  }), holdNextTicks(), requestAnimationFrame(() => {
    if (Fr)
      return;
    let Kr = Number(getComputedStyle(Fe).transitionDuration.replace(/,.*/, "").replace("s", "")) * 1e3, zr = Number(getComputedStyle(Fe).transitionDelay.replace(/,.*/, "").replace("s", "")) * 1e3;
    Kr === 0 && (Kr = Number(getComputedStyle(Fe).animationDuration.replace("s", "")) * 1e3), mutateDom(() => {
      _r.before();
    }), jr = !0, requestAnimationFrame(() => {
      Fr || (mutateDom(() => {
        _r.end();
      }), releaseNextTicks(), setTimeout(Fe._x_transitioning.finish, Kr + zr), $r = !0);
    });
  });
}
function modifierValue(Fe, _r, Fr) {
  if (Fe.indexOf(_r) === -1)
    return Fr;
  const jr = Fe[Fe.indexOf(_r) + 1];
  if (!jr || _r === "scale" && isNaN(jr))
    return Fr;
  if (_r === "duration" || _r === "delay") {
    let $r = jr.match(/([0-9]+)ms/);
    if ($r)
      return $r[1];
  }
  return _r === "origin" && ["top", "right", "left", "center", "bottom"].includes(Fe[Fe.indexOf(_r) + 2]) ? [jr, Fe[Fe.indexOf(_r) + 2]].join(" ") : jr;
}
var isCloning = !1;
function skipDuringClone(Fe, _r = () => {
}) {
  return (...Fr) => isCloning ? _r(...Fr) : Fe(...Fr);
}
function onlyDuringClone(Fe) {
  return (..._r) => isCloning && Fe(..._r);
}
var interceptors = [];
function interceptClone(Fe) {
  interceptors.push(Fe);
}
function cloneNode(Fe, _r) {
  interceptors.forEach((Fr) => Fr(Fe, _r)), isCloning = !0, dontRegisterReactiveSideEffects(() => {
    initTree(_r, (Fr, jr) => {
      jr(Fr, () => {
      });
    });
  }), isCloning = !1;
}
var isCloningLegacy = !1;
function clone(Fe, _r) {
  _r._x_dataStack || (_r._x_dataStack = Fe._x_dataStack), isCloning = !0, isCloningLegacy = !0, dontRegisterReactiveSideEffects(() => {
    cloneTree(_r);
  }), isCloning = !1, isCloningLegacy = !1;
}
function cloneTree(Fe) {
  let _r = !1;
  initTree(Fe, (jr, $r) => {
    walk(jr, (Qr, Kr) => {
      if (_r && isRoot(Qr))
        return Kr();
      _r = !0, $r(Qr, Kr);
    });
  });
}
function dontRegisterReactiveSideEffects(Fe) {
  let _r = effect;
  overrideEffect((Fr, jr) => {
    let $r = _r(Fr);
    return release($r), () => {
    };
  }), Fe(), overrideEffect(_r);
}
function bind(Fe, _r, Fr, jr = []) {
  switch (Fe._x_bindings || (Fe._x_bindings = reactive({})), Fe._x_bindings[_r] = Fr, _r = jr.includes("camel") ? camelCase(_r) : _r, _r) {
    case "value":
      bindInputValue(Fe, Fr);
      break;
    case "style":
      bindStyles(Fe, Fr);
      break;
    case "class":
      bindClasses(Fe, Fr);
      break;
    case "selected":
    case "checked":
      bindAttributeAndProperty(Fe, _r, Fr);
      break;
    default:
      bindAttribute(Fe, _r, Fr);
      break;
  }
}
function bindInputValue(Fe, _r) {
  if (Fe.type === "radio")
    Fe.attributes.value === void 0 && (Fe.value = _r), window.fromModel && (typeof _r == "boolean" ? Fe.checked = safeParseBoolean(Fe.value) === _r : Fe.checked = checkedAttrLooseCompare(Fe.value, _r));
  else if (Fe.type === "checkbox")
    Number.isInteger(_r) ? Fe.value = _r : !Array.isArray(_r) && typeof _r != "boolean" && ![null, void 0].includes(_r) ? Fe.value = String(_r) : Array.isArray(_r) ? Fe.checked = _r.some((Fr) => checkedAttrLooseCompare(Fr, Fe.value)) : Fe.checked = !!_r;
  else if (Fe.tagName === "SELECT")
    updateSelect(Fe, _r);
  else {
    if (Fe.value === _r)
      return;
    Fe.value = _r === void 0 ? "" : _r;
  }
}
function bindClasses(Fe, _r) {
  Fe._x_undoAddedClasses && Fe._x_undoAddedClasses(), Fe._x_undoAddedClasses = setClasses(Fe, _r);
}
function bindStyles(Fe, _r) {
  Fe._x_undoAddedStyles && Fe._x_undoAddedStyles(), Fe._x_undoAddedStyles = setStyles(Fe, _r);
}
function bindAttributeAndProperty(Fe, _r, Fr) {
  bindAttribute(Fe, _r, Fr), setPropertyIfChanged(Fe, _r, Fr);
}
function bindAttribute(Fe, _r, Fr) {
  [null, void 0, !1].includes(Fr) && attributeShouldntBePreservedIfFalsy(_r) ? Fe.removeAttribute(_r) : (isBooleanAttr(_r) && (Fr = _r), setIfChanged(Fe, _r, Fr));
}
function setIfChanged(Fe, _r, Fr) {
  Fe.getAttribute(_r) != Fr && Fe.setAttribute(_r, Fr);
}
function setPropertyIfChanged(Fe, _r, Fr) {
  Fe[_r] !== Fr && (Fe[_r] = Fr);
}
function updateSelect(Fe, _r) {
  const Fr = [].concat(_r).map((jr) => jr + "");
  Array.from(Fe.options).forEach((jr) => {
    jr.selected = Fr.includes(jr.value);
  });
}
function camelCase(Fe) {
  return Fe.toLowerCase().replace(/-(\w)/g, (_r, Fr) => Fr.toUpperCase());
}
function checkedAttrLooseCompare(Fe, _r) {
  return Fe == _r;
}
function safeParseBoolean(Fe) {
  return [1, "1", "true", "on", "yes", !0].includes(Fe) ? !0 : [0, "0", "false", "off", "no", !1].includes(Fe) ? !1 : Fe ? !!Fe : null;
}
function isBooleanAttr(Fe) {
  return [
    "disabled",
    "checked",
    "required",
    "readonly",
    "hidden",
    "open",
    "selected",
    "autofocus",
    "itemscope",
    "multiple",
    "novalidate",
    "allowfullscreen",
    "allowpaymentrequest",
    "formnovalidate",
    "autoplay",
    "controls",
    "loop",
    "muted",
    "playsinline",
    "default",
    "ismap",
    "reversed",
    "async",
    "defer",
    "nomodule"
  ].includes(Fe);
}
function attributeShouldntBePreservedIfFalsy(Fe) {
  return !["aria-pressed", "aria-checked", "aria-expanded", "aria-selected"].includes(Fe);
}
function getBinding(Fe, _r, Fr) {
  return Fe._x_bindings && Fe._x_bindings[_r] !== void 0 ? Fe._x_bindings[_r] : getAttributeBinding(Fe, _r, Fr);
}
function extractProp(Fe, _r, Fr, jr = !0) {
  if (Fe._x_bindings && Fe._x_bindings[_r] !== void 0)
    return Fe._x_bindings[_r];
  if (Fe._x_inlineBindings && Fe._x_inlineBindings[_r] !== void 0) {
    let $r = Fe._x_inlineBindings[_r];
    return $r.extract = jr, dontAutoEvaluateFunctions(() => evaluate(Fe, $r.expression));
  }
  return getAttributeBinding(Fe, _r, Fr);
}
function getAttributeBinding(Fe, _r, Fr) {
  let jr = Fe.getAttribute(_r);
  return jr === null ? typeof Fr == "function" ? Fr() : Fr : jr === "" ? !0 : isBooleanAttr(_r) ? !![_r, "true"].includes(jr) : jr;
}
function debounce(Fe, _r) {
  var Fr;
  return function() {
    var jr = this, $r = arguments, Qr = function() {
      Fr = null, Fe.apply(jr, $r);
    };
    clearTimeout(Fr), Fr = setTimeout(Qr, _r);
  };
}
function throttle(Fe, _r) {
  let Fr;
  return function() {
    let jr = this, $r = arguments;
    Fr || (Fe.apply(jr, $r), Fr = !0, setTimeout(() => Fr = !1, _r));
  };
}
function entangle({ get: Fe, set: _r }, { get: Fr, set: jr }) {
  let $r = !0, Qr, Kr = effect(() => {
    const zr = Fe(), Vr = Fr();
    if ($r)
      jr(cloneIfObject(zr)), $r = !1, Qr = JSON.stringify(zr);
    else {
      const Wr = JSON.stringify(zr);
      Wr !== Qr ? (jr(cloneIfObject(zr)), Qr = Wr) : (_r(cloneIfObject(Vr)), Qr = JSON.stringify(Vr));
    }
    JSON.stringify(Fr()), JSON.stringify(Fe());
  });
  return () => {
    release(Kr);
  };
}
function cloneIfObject(Fe) {
  return typeof Fe == "object" ? JSON.parse(JSON.stringify(Fe)) : Fe;
}
function plugin(Fe) {
  (Array.isArray(Fe) ? Fe : [Fe]).forEach((Fr) => Fr(alpine_default));
}
var stores = {}, isReactive = !1;
function store(Fe, _r) {
  if (isReactive || (stores = reactive(stores), isReactive = !0), _r === void 0)
    return stores[Fe];
  stores[Fe] = _r, typeof _r == "object" && _r !== null && _r.hasOwnProperty("init") && typeof _r.init == "function" && stores[Fe].init(), initInterceptors2(stores[Fe]);
}
function getStores() {
  return stores;
}
var binds = {};
function bind2(Fe, _r) {
  let Fr = typeof _r != "function" ? () => _r : _r;
  return Fe instanceof Element ? applyBindingsObject(Fe, Fr()) : (binds[Fe] = Fr, () => {
  });
}
function injectBindingProviders(Fe) {
  return Object.entries(binds).forEach(([_r, Fr]) => {
    Object.defineProperty(Fe, _r, {
      get() {
        return (...jr) => Fr(...jr);
      }
    });
  }), Fe;
}
function applyBindingsObject(Fe, _r, Fr) {
  let jr = [];
  for (; jr.length; )
    jr.pop()();
  let $r = Object.entries(_r).map(([Kr, zr]) => ({ name: Kr, value: zr })), Qr = attributesOnly($r);
  return $r = $r.map((Kr) => Qr.find((zr) => zr.name === Kr.name) ? {
    name: `x-bind:${Kr.name}`,
    value: `"${Kr.value}"`
  } : Kr), directives(Fe, $r, Fr).map((Kr) => {
    jr.push(Kr.runCleanups), Kr();
  }), () => {
    for (; jr.length; )
      jr.pop()();
  };
}
var datas = {};
function data(Fe, _r) {
  datas[Fe] = _r;
}
function injectDataProviders(Fe, _r) {
  return Object.entries(datas).forEach(([Fr, jr]) => {
    Object.defineProperty(Fe, Fr, {
      get() {
        return (...$r) => jr.bind(_r)(...$r);
      },
      enumerable: !1
    });
  }), Fe;
}
var Alpine = {
  get reactive() {
    return reactive;
  },
  get release() {
    return release;
  },
  get effect() {
    return effect;
  },
  get raw() {
    return raw;
  },
  version: "3.13.3",
  flushAndStopDeferringMutations,
  dontAutoEvaluateFunctions,
  disableEffectScheduling,
  startObservingMutations,
  stopObservingMutations,
  setReactivityEngine,
  onAttributeRemoved,
  onAttributesAdded,
  closestDataStack,
  skipDuringClone,
  onlyDuringClone,
  addRootSelector,
  addInitSelector,
  interceptClone,
  addScopeToNode,
  deferMutations,
  mapAttributes,
  evaluateLater,
  interceptInit,
  setEvaluator,
  mergeProxies,
  extractProp,
  findClosest,
  onElRemoved,
  closestRoot,
  destroyTree,
  interceptor,
  // INTERNAL: not public API and is subject to change without major release.
  transition,
  // INTERNAL
  setStyles,
  // INTERNAL
  mutateDom,
  directive,
  entangle,
  throttle,
  debounce,
  evaluate,
  initTree,
  nextTick,
  prefixed: prefix,
  prefix: setPrefix,
  plugin,
  magic,
  store,
  start,
  clone,
  // INTERNAL
  cloneNode,
  // INTERNAL
  bound: getBinding,
  $data: scope,
  walk,
  data,
  bind: bind2
}, alpine_default = Alpine;
function makeMap(Fe, _r) {
  const Fr = /* @__PURE__ */ Object.create(null), jr = Fe.split(",");
  for (let $r = 0; $r < jr.length; $r++)
    Fr[jr[$r]] = !0;
  return _r ? ($r) => !!Fr[$r.toLowerCase()] : ($r) => !!Fr[$r];
}
var EMPTY_OBJ = Object.freeze({}), hasOwnProperty = Object.prototype.hasOwnProperty, hasOwn = (Fe, _r) => hasOwnProperty.call(Fe, _r), isArray = Array.isArray, isMap = (Fe) => toTypeString(Fe) === "[object Map]", isString = (Fe) => typeof Fe == "string", isSymbol = (Fe) => typeof Fe == "symbol", isObject = (Fe) => Fe !== null && typeof Fe == "object", objectToString = Object.prototype.toString, toTypeString = (Fe) => objectToString.call(Fe), toRawType = (Fe) => toTypeString(Fe).slice(8, -1), isIntegerKey = (Fe) => isString(Fe) && Fe !== "NaN" && Fe[0] !== "-" && "" + parseInt(Fe, 10) === Fe, cacheStringFunction = (Fe) => {
  const _r = /* @__PURE__ */ Object.create(null);
  return (Fr) => _r[Fr] || (_r[Fr] = Fe(Fr));
}, capitalize = cacheStringFunction((Fe) => Fe.charAt(0).toUpperCase() + Fe.slice(1)), hasChanged = (Fe, _r) => Fe !== _r && (Fe === Fe || _r === _r), targetMap = /* @__PURE__ */ new WeakMap(), effectStack = [], activeEffect, ITERATE_KEY = Symbol("iterate"), MAP_KEY_ITERATE_KEY = Symbol("Map key iterate");
function isEffect(Fe) {
  return Fe && Fe._isEffect === !0;
}
function effect2(Fe, _r = EMPTY_OBJ) {
  isEffect(Fe) && (Fe = Fe.raw);
  const Fr = createReactiveEffect(Fe, _r);
  return _r.lazy || Fr(), Fr;
}
function stop(Fe) {
  Fe.active && (cleanup(Fe), Fe.options.onStop && Fe.options.onStop(), Fe.active = !1);
}
var uid = 0;
function createReactiveEffect(Fe, _r) {
  const Fr = function() {
    if (!Fr.active)
      return Fe();
    if (!effectStack.includes(Fr)) {
      cleanup(Fr);
      try {
        return enableTracking(), effectStack.push(Fr), activeEffect = Fr, Fe();
      } finally {
        effectStack.pop(), resetTracking(), activeEffect = effectStack[effectStack.length - 1];
      }
    }
  };
  return Fr.id = uid++, Fr.allowRecurse = !!_r.allowRecurse, Fr._isEffect = !0, Fr.active = !0, Fr.raw = Fe, Fr.deps = [], Fr.options = _r, Fr;
}
function cleanup(Fe) {
  const { deps: _r } = Fe;
  if (_r.length) {
    for (let Fr = 0; Fr < _r.length; Fr++)
      _r[Fr].delete(Fe);
    _r.length = 0;
  }
}
var shouldTrack = !0, trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack), shouldTrack = !1;
}
function enableTracking() {
  trackStack.push(shouldTrack), shouldTrack = !0;
}
function resetTracking() {
  const Fe = trackStack.pop();
  shouldTrack = Fe === void 0 ? !0 : Fe;
}
function track(Fe, _r, Fr) {
  if (!shouldTrack || activeEffect === void 0)
    return;
  let jr = targetMap.get(Fe);
  jr || targetMap.set(Fe, jr = /* @__PURE__ */ new Map());
  let $r = jr.get(Fr);
  $r || jr.set(Fr, $r = /* @__PURE__ */ new Set()), $r.has(activeEffect) || ($r.add(activeEffect), activeEffect.deps.push($r), activeEffect.options.onTrack && activeEffect.options.onTrack({
    effect: activeEffect,
    target: Fe,
    type: _r,
    key: Fr
  }));
}
function trigger(Fe, _r, Fr, jr, $r, Qr) {
  const Kr = targetMap.get(Fe);
  if (!Kr)
    return;
  const zr = /* @__PURE__ */ new Set(), Vr = (Yr) => {
    Yr && Yr.forEach((Jr) => {
      (Jr !== activeEffect || Jr.allowRecurse) && zr.add(Jr);
    });
  };
  if (_r === "clear")
    Kr.forEach(Vr);
  else if (Fr === "length" && isArray(Fe))
    Kr.forEach((Yr, Jr) => {
      (Jr === "length" || Jr >= jr) && Vr(Yr);
    });
  else
    switch (Fr !== void 0 && Vr(Kr.get(Fr)), _r) {
      case "add":
        isArray(Fe) ? isIntegerKey(Fr) && Vr(Kr.get("length")) : (Vr(Kr.get(ITERATE_KEY)), isMap(Fe) && Vr(Kr.get(MAP_KEY_ITERATE_KEY)));
        break;
      case "delete":
        isArray(Fe) || (Vr(Kr.get(ITERATE_KEY)), isMap(Fe) && Vr(Kr.get(MAP_KEY_ITERATE_KEY)));
        break;
      case "set":
        isMap(Fe) && Vr(Kr.get(ITERATE_KEY));
        break;
    }
  const Wr = (Yr) => {
    Yr.options.onTrigger && Yr.options.onTrigger({
      effect: Yr,
      target: Fe,
      key: Fr,
      type: _r,
      newValue: jr,
      oldValue: $r,
      oldTarget: Qr
    }), Yr.options.scheduler ? Yr.options.scheduler(Yr) : Yr();
  };
  zr.forEach(Wr);
}
var isNonTrackableKeys = /* @__PURE__ */ makeMap("__proto__,__v_isRef,__isVue"), builtInSymbols = new Set(Object.getOwnPropertyNames(Symbol).map((Fe) => Symbol[Fe]).filter(isSymbol)), get2 = /* @__PURE__ */ createGetter(), readonlyGet = /* @__PURE__ */ createGetter(!0), arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
function createArrayInstrumentations() {
  const Fe = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((_r) => {
    Fe[_r] = function(...Fr) {
      const jr = toRaw(this);
      for (let Qr = 0, Kr = this.length; Qr < Kr; Qr++)
        track(jr, "get", Qr + "");
      const $r = jr[_r](...Fr);
      return $r === -1 || $r === !1 ? jr[_r](...Fr.map(toRaw)) : $r;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((_r) => {
    Fe[_r] = function(...Fr) {
      pauseTracking();
      const jr = toRaw(this)[_r].apply(this, Fr);
      return resetTracking(), jr;
    };
  }), Fe;
}
function createGetter(Fe = !1, _r = !1) {
  return function(jr, $r, Qr) {
    if ($r === "__v_isReactive")
      return !Fe;
    if ($r === "__v_isReadonly")
      return Fe;
    if ($r === "__v_raw" && Qr === (Fe ? _r ? shallowReadonlyMap : readonlyMap : _r ? shallowReactiveMap : reactiveMap).get(jr))
      return jr;
    const Kr = isArray(jr);
    if (!Fe && Kr && hasOwn(arrayInstrumentations, $r))
      return Reflect.get(arrayInstrumentations, $r, Qr);
    const zr = Reflect.get(jr, $r, Qr);
    return (isSymbol($r) ? builtInSymbols.has($r) : isNonTrackableKeys($r)) || (Fe || track(jr, "get", $r), _r) ? zr : isRef(zr) ? !Kr || !isIntegerKey($r) ? zr.value : zr : isObject(zr) ? Fe ? readonly(zr) : reactive2(zr) : zr;
  };
}
var set2 = /* @__PURE__ */ createSetter();
function createSetter(Fe = !1) {
  return function(Fr, jr, $r, Qr) {
    let Kr = Fr[jr];
    if (!Fe && ($r = toRaw($r), Kr = toRaw(Kr), !isArray(Fr) && isRef(Kr) && !isRef($r)))
      return Kr.value = $r, !0;
    const zr = isArray(Fr) && isIntegerKey(jr) ? Number(jr) < Fr.length : hasOwn(Fr, jr), Vr = Reflect.set(Fr, jr, $r, Qr);
    return Fr === toRaw(Qr) && (zr ? hasChanged($r, Kr) && trigger(Fr, "set", jr, $r, Kr) : trigger(Fr, "add", jr, $r)), Vr;
  };
}
function deleteProperty(Fe, _r) {
  const Fr = hasOwn(Fe, _r), jr = Fe[_r], $r = Reflect.deleteProperty(Fe, _r);
  return $r && Fr && trigger(Fe, "delete", _r, void 0, jr), $r;
}
function has(Fe, _r) {
  const Fr = Reflect.has(Fe, _r);
  return (!isSymbol(_r) || !builtInSymbols.has(_r)) && track(Fe, "has", _r), Fr;
}
function ownKeys(Fe) {
  return track(Fe, "iterate", isArray(Fe) ? "length" : ITERATE_KEY), Reflect.ownKeys(Fe);
}
var mutableHandlers = {
  get: get2,
  set: set2,
  deleteProperty,
  has,
  ownKeys
}, readonlyHandlers = {
  get: readonlyGet,
  set(Fe, _r) {
    return console.warn(`Set operation on key "${String(_r)}" failed: target is readonly.`, Fe), !0;
  },
  deleteProperty(Fe, _r) {
    return console.warn(`Delete operation on key "${String(_r)}" failed: target is readonly.`, Fe), !0;
  }
}, toReactive = (Fe) => isObject(Fe) ? reactive2(Fe) : Fe, toReadonly = (Fe) => isObject(Fe) ? readonly(Fe) : Fe, toShallow = (Fe) => Fe, getProto = (Fe) => Reflect.getPrototypeOf(Fe);
function get$1(Fe, _r, Fr = !1, jr = !1) {
  Fe = Fe.__v_raw;
  const $r = toRaw(Fe), Qr = toRaw(_r);
  _r !== Qr && !Fr && track($r, "get", _r), !Fr && track($r, "get", Qr);
  const { has: Kr } = getProto($r), zr = jr ? toShallow : Fr ? toReadonly : toReactive;
  if (Kr.call($r, _r))
    return zr(Fe.get(_r));
  if (Kr.call($r, Qr))
    return zr(Fe.get(Qr));
  Fe !== $r && Fe.get(_r);
}
function has$1(Fe, _r = !1) {
  const Fr = this.__v_raw, jr = toRaw(Fr), $r = toRaw(Fe);
  return Fe !== $r && !_r && track(jr, "has", Fe), !_r && track(jr, "has", $r), Fe === $r ? Fr.has(Fe) : Fr.has(Fe) || Fr.has($r);
}
function size(Fe, _r = !1) {
  return Fe = Fe.__v_raw, !_r && track(toRaw(Fe), "iterate", ITERATE_KEY), Reflect.get(Fe, "size", Fe);
}
function add(Fe) {
  Fe = toRaw(Fe);
  const _r = toRaw(this);
  return getProto(_r).has.call(_r, Fe) || (_r.add(Fe), trigger(_r, "add", Fe, Fe)), this;
}
function set$1(Fe, _r) {
  _r = toRaw(_r);
  const Fr = toRaw(this), { has: jr, get: $r } = getProto(Fr);
  let Qr = jr.call(Fr, Fe);
  Qr ? checkIdentityKeys(Fr, jr, Fe) : (Fe = toRaw(Fe), Qr = jr.call(Fr, Fe));
  const Kr = $r.call(Fr, Fe);
  return Fr.set(Fe, _r), Qr ? hasChanged(_r, Kr) && trigger(Fr, "set", Fe, _r, Kr) : trigger(Fr, "add", Fe, _r), this;
}
function deleteEntry(Fe) {
  const _r = toRaw(this), { has: Fr, get: jr } = getProto(_r);
  let $r = Fr.call(_r, Fe);
  $r ? checkIdentityKeys(_r, Fr, Fe) : (Fe = toRaw(Fe), $r = Fr.call(_r, Fe));
  const Qr = jr ? jr.call(_r, Fe) : void 0, Kr = _r.delete(Fe);
  return $r && trigger(_r, "delete", Fe, void 0, Qr), Kr;
}
function clear() {
  const Fe = toRaw(this), _r = Fe.size !== 0, Fr = isMap(Fe) ? new Map(Fe) : new Set(Fe), jr = Fe.clear();
  return _r && trigger(Fe, "clear", void 0, void 0, Fr), jr;
}
function createForEach(Fe, _r) {
  return function(jr, $r) {
    const Qr = this, Kr = Qr.__v_raw, zr = toRaw(Kr), Vr = _r ? toShallow : Fe ? toReadonly : toReactive;
    return !Fe && track(zr, "iterate", ITERATE_KEY), Kr.forEach((Wr, Yr) => jr.call($r, Vr(Wr), Vr(Yr), Qr));
  };
}
function createIterableMethod(Fe, _r, Fr) {
  return function(...jr) {
    const $r = this.__v_raw, Qr = toRaw($r), Kr = isMap(Qr), zr = Fe === "entries" || Fe === Symbol.iterator && Kr, Vr = Fe === "keys" && Kr, Wr = $r[Fe](...jr), Yr = Fr ? toShallow : _r ? toReadonly : toReactive;
    return !_r && track(Qr, "iterate", Vr ? MAP_KEY_ITERATE_KEY : ITERATE_KEY), {
      // iterator protocol
      next() {
        const { value: Jr, done: Gr } = Wr.next();
        return Gr ? { value: Jr, done: Gr } : {
          value: zr ? [Yr(Jr[0]), Yr(Jr[1])] : Yr(Jr),
          done: Gr
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(Fe) {
  return function(..._r) {
    {
      const Fr = _r[0] ? `on key "${_r[0]}" ` : "";
      console.warn(`${capitalize(Fe)} operation ${Fr}failed: target is readonly.`, toRaw(this));
    }
    return Fe === "delete" ? !1 : this;
  };
}
function createInstrumentations() {
  const Fe = {
    get(Qr) {
      return get$1(this, Qr);
    },
    get size() {
      return size(this);
    },
    has: has$1,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(!1, !1)
  }, _r = {
    get(Qr) {
      return get$1(this, Qr, !1, !0);
    },
    get size() {
      return size(this);
    },
    has: has$1,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(!1, !0)
  }, Fr = {
    get(Qr) {
      return get$1(this, Qr, !0);
    },
    get size() {
      return size(this, !0);
    },
    has(Qr) {
      return has$1.call(this, Qr, !0);
    },
    add: createReadonlyMethod(
      "add"
      /* ADD */
    ),
    set: createReadonlyMethod(
      "set"
      /* SET */
    ),
    delete: createReadonlyMethod(
      "delete"
      /* DELETE */
    ),
    clear: createReadonlyMethod(
      "clear"
      /* CLEAR */
    ),
    forEach: createForEach(!0, !1)
  }, jr = {
    get(Qr) {
      return get$1(this, Qr, !0, !0);
    },
    get size() {
      return size(this, !0);
    },
    has(Qr) {
      return has$1.call(this, Qr, !0);
    },
    add: createReadonlyMethod(
      "add"
      /* ADD */
    ),
    set: createReadonlyMethod(
      "set"
      /* SET */
    ),
    delete: createReadonlyMethod(
      "delete"
      /* DELETE */
    ),
    clear: createReadonlyMethod(
      "clear"
      /* CLEAR */
    ),
    forEach: createForEach(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((Qr) => {
    Fe[Qr] = createIterableMethod(Qr, !1, !1), Fr[Qr] = createIterableMethod(Qr, !0, !1), _r[Qr] = createIterableMethod(Qr, !1, !0), jr[Qr] = createIterableMethod(Qr, !0, !0);
  }), [
    Fe,
    Fr,
    _r,
    jr
  ];
}
var [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* @__PURE__ */ createInstrumentations();
function createInstrumentationGetter(Fe, _r) {
  const Fr = _r ? Fe ? shallowReadonlyInstrumentations : shallowInstrumentations : Fe ? readonlyInstrumentations : mutableInstrumentations;
  return (jr, $r, Qr) => $r === "__v_isReactive" ? !Fe : $r === "__v_isReadonly" ? Fe : $r === "__v_raw" ? jr : Reflect.get(hasOwn(Fr, $r) && $r in jr ? Fr : jr, $r, Qr);
}
var mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(!1, !1)
}, readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(!0, !1)
};
function checkIdentityKeys(Fe, _r, Fr) {
  const jr = toRaw(Fr);
  if (jr !== Fr && _r.call(Fe, jr)) {
    const $r = toRawType(Fe);
    console.warn(`Reactive ${$r} contains both the raw and reactive versions of the same object${$r === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
var reactiveMap = /* @__PURE__ */ new WeakMap(), shallowReactiveMap = /* @__PURE__ */ new WeakMap(), readonlyMap = /* @__PURE__ */ new WeakMap(), shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(Fe) {
  switch (Fe) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(Fe) {
  return Fe.__v_skip || !Object.isExtensible(Fe) ? 0 : targetTypeMap(toRawType(Fe));
}
function reactive2(Fe) {
  return Fe && Fe.__v_isReadonly ? Fe : createReactiveObject(Fe, !1, mutableHandlers, mutableCollectionHandlers, reactiveMap);
}
function readonly(Fe) {
  return createReactiveObject(Fe, !0, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
}
function createReactiveObject(Fe, _r, Fr, jr, $r) {
  if (!isObject(Fe))
    return console.warn(`value cannot be made reactive: ${String(Fe)}`), Fe;
  if (Fe.__v_raw && !(_r && Fe.__v_isReactive))
    return Fe;
  const Qr = $r.get(Fe);
  if (Qr)
    return Qr;
  const Kr = getTargetType(Fe);
  if (Kr === 0)
    return Fe;
  const zr = new Proxy(Fe, Kr === 2 ? jr : Fr);
  return $r.set(Fe, zr), zr;
}
function toRaw(Fe) {
  return Fe && toRaw(Fe.__v_raw) || Fe;
}
function isRef(Fe) {
  return !!(Fe && Fe.__v_isRef === !0);
}
magic("nextTick", () => nextTick);
magic("dispatch", (Fe) => dispatch.bind(dispatch, Fe));
magic("watch", (Fe, { evaluateLater: _r, effect: Fr }) => (jr, $r) => {
  let Qr = _r(jr), Kr = !0, zr, Vr = Fr(() => Qr((Wr) => {
    JSON.stringify(Wr), Kr ? zr = Wr : queueMicrotask(() => {
      $r(Wr, zr), zr = Wr;
    }), Kr = !1;
  }));
  Fe._x_effects.delete(Vr);
});
magic("store", getStores);
magic("data", (Fe) => scope(Fe));
magic("root", (Fe) => closestRoot(Fe));
magic("refs", (Fe) => (Fe._x_refs_proxy || (Fe._x_refs_proxy = mergeProxies(getArrayOfRefObject(Fe))), Fe._x_refs_proxy));
function getArrayOfRefObject(Fe) {
  let _r = [], Fr = Fe;
  for (; Fr; )
    Fr._x_refs && _r.push(Fr._x_refs), Fr = Fr.parentNode;
  return _r;
}
var globalIdMemo = {};
function findAndIncrementId(Fe) {
  return globalIdMemo[Fe] || (globalIdMemo[Fe] = 0), ++globalIdMemo[Fe];
}
function closestIdRoot(Fe, _r) {
  return findClosest(Fe, (Fr) => {
    if (Fr._x_ids && Fr._x_ids[_r])
      return !0;
  });
}
function setIdRoot(Fe, _r) {
  Fe._x_ids || (Fe._x_ids = {}), Fe._x_ids[_r] || (Fe._x_ids[_r] = findAndIncrementId(_r));
}
magic("id", (Fe) => (_r, Fr = null) => {
  let jr = closestIdRoot(Fe, _r), $r = jr ? jr._x_ids[_r] : findAndIncrementId(_r);
  return Fr ? `${_r}-${$r}-${Fr}` : `${_r}-${$r}`;
});
magic("el", (Fe) => Fe);
warnMissingPluginMagic("Focus", "focus", "focus");
warnMissingPluginMagic("Persist", "persist", "persist");
function warnMissingPluginMagic(Fe, _r, Fr) {
  magic(_r, (jr) => warn(`You can't use [$${_r}] without first installing the "${Fe}" plugin here: https://alpinejs.dev/plugins/${Fr}`, jr));
}
directive("modelable", (Fe, { expression: _r }, { effect: Fr, evaluateLater: jr, cleanup: $r }) => {
  let Qr = jr(_r), Kr = () => {
    let Yr;
    return Qr((Jr) => Yr = Jr), Yr;
  }, zr = jr(`${_r} = __placeholder`), Vr = (Yr) => zr(() => {
  }, { scope: { __placeholder: Yr } }), Wr = Kr();
  Vr(Wr), queueMicrotask(() => {
    if (!Fe._x_model)
      return;
    Fe._x_removeModelListeners.default();
    let Yr = Fe._x_model.get, Jr = Fe._x_model.set, Gr = entangle(
      {
        get() {
          return Yr();
        },
        set(tn) {
          Jr(tn);
        }
      },
      {
        get() {
          return Kr();
        },
        set(tn) {
          Vr(tn);
        }
      }
    );
    $r(Gr);
  });
});
directive("teleport", (Fe, { modifiers: _r, expression: Fr }, { cleanup: jr }) => {
  Fe.tagName.toLowerCase() !== "template" && warn("x-teleport can only be used on a <template> tag", Fe);
  let $r = getTarget(Fr), Qr = Fe.content.cloneNode(!0).firstElementChild;
  Fe._x_teleport = Qr, Qr._x_teleportBack = Fe, Fe.setAttribute("data-teleport-template", !0), Qr.setAttribute("data-teleport-target", !0), Fe._x_forwardEvents && Fe._x_forwardEvents.forEach((zr) => {
    Qr.addEventListener(zr, (Vr) => {
      Vr.stopPropagation(), Fe.dispatchEvent(new Vr.constructor(Vr.type, Vr));
    });
  }), addScopeToNode(Qr, {}, Fe);
  let Kr = (zr, Vr, Wr) => {
    Wr.includes("prepend") ? Vr.parentNode.insertBefore(zr, Vr) : Wr.includes("append") ? Vr.parentNode.insertBefore(zr, Vr.nextSibling) : Vr.appendChild(zr);
  };
  mutateDom(() => {
    Kr(Qr, $r, _r), initTree(Qr), Qr._x_ignore = !0;
  }), Fe._x_teleportPutBack = () => {
    let zr = getTarget(Fr);
    mutateDom(() => {
      Kr(Fe._x_teleport, zr, _r);
    });
  }, jr(() => Qr.remove());
});
var teleportContainerDuringClone = document.createElement("div");
function getTarget(Fe) {
  let _r = skipDuringClone(() => document.querySelector(Fe), () => teleportContainerDuringClone)();
  return _r || warn(`Cannot find x-teleport element for selector: "${Fe}"`), _r;
}
var handler = () => {
};
handler.inline = (Fe, { modifiers: _r }, { cleanup: Fr }) => {
  _r.includes("self") ? Fe._x_ignoreSelf = !0 : Fe._x_ignore = !0, Fr(() => {
    _r.includes("self") ? delete Fe._x_ignoreSelf : delete Fe._x_ignore;
  });
};
directive("ignore", handler);
directive("effect", skipDuringClone((Fe, { expression: _r }, { effect: Fr }) => {
  Fr(evaluateLater(Fe, _r));
}));
function on(Fe, _r, Fr, jr) {
  let $r = Fe, Qr = (Vr) => jr(Vr), Kr = {}, zr = (Vr, Wr) => (Yr) => Wr(Vr, Yr);
  if (Fr.includes("dot") && (_r = dotSyntax(_r)), Fr.includes("camel") && (_r = camelCase2(_r)), Fr.includes("passive") && (Kr.passive = !0), Fr.includes("capture") && (Kr.capture = !0), Fr.includes("window") && ($r = window), Fr.includes("document") && ($r = document), Fr.includes("debounce")) {
    let Vr = Fr[Fr.indexOf("debounce") + 1] || "invalid-wait", Wr = isNumeric(Vr.split("ms")[0]) ? Number(Vr.split("ms")[0]) : 250;
    Qr = debounce(Qr, Wr);
  }
  if (Fr.includes("throttle")) {
    let Vr = Fr[Fr.indexOf("throttle") + 1] || "invalid-wait", Wr = isNumeric(Vr.split("ms")[0]) ? Number(Vr.split("ms")[0]) : 250;
    Qr = throttle(Qr, Wr);
  }
  return Fr.includes("prevent") && (Qr = zr(Qr, (Vr, Wr) => {
    Wr.preventDefault(), Vr(Wr);
  })), Fr.includes("stop") && (Qr = zr(Qr, (Vr, Wr) => {
    Wr.stopPropagation(), Vr(Wr);
  })), Fr.includes("self") && (Qr = zr(Qr, (Vr, Wr) => {
    Wr.target === Fe && Vr(Wr);
  })), (Fr.includes("away") || Fr.includes("outside")) && ($r = document, Qr = zr(Qr, (Vr, Wr) => {
    Fe.contains(Wr.target) || Wr.target.isConnected !== !1 && (Fe.offsetWidth < 1 && Fe.offsetHeight < 1 || Fe._x_isShown !== !1 && Vr(Wr));
  })), Fr.includes("once") && (Qr = zr(Qr, (Vr, Wr) => {
    Vr(Wr), $r.removeEventListener(_r, Qr, Kr);
  })), Qr = zr(Qr, (Vr, Wr) => {
    isKeyEvent(_r) && isListeningForASpecificKeyThatHasntBeenPressed(Wr, Fr) || Vr(Wr);
  }), $r.addEventListener(_r, Qr, Kr), () => {
    $r.removeEventListener(_r, Qr, Kr);
  };
}
function dotSyntax(Fe) {
  return Fe.replace(/-/g, ".");
}
function camelCase2(Fe) {
  return Fe.toLowerCase().replace(/-(\w)/g, (_r, Fr) => Fr.toUpperCase());
}
function isNumeric(Fe) {
  return !Array.isArray(Fe) && !isNaN(Fe);
}
function kebabCase2(Fe) {
  return [" ", "_"].includes(
    Fe
  ) ? Fe : Fe.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[_\s]/, "-").toLowerCase();
}
function isKeyEvent(Fe) {
  return ["keydown", "keyup"].includes(Fe);
}
function isListeningForASpecificKeyThatHasntBeenPressed(Fe, _r) {
  let Fr = _r.filter((Qr) => !["window", "document", "prevent", "stop", "once", "capture"].includes(Qr));
  if (Fr.includes("debounce")) {
    let Qr = Fr.indexOf("debounce");
    Fr.splice(Qr, isNumeric((Fr[Qr + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
  }
  if (Fr.includes("throttle")) {
    let Qr = Fr.indexOf("throttle");
    Fr.splice(Qr, isNumeric((Fr[Qr + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
  }
  if (Fr.length === 0 || Fr.length === 1 && keyToModifiers(Fe.key).includes(Fr[0]))
    return !1;
  const $r = ["ctrl", "shift", "alt", "meta", "cmd", "super"].filter((Qr) => Fr.includes(Qr));
  return Fr = Fr.filter((Qr) => !$r.includes(Qr)), !($r.length > 0 && $r.filter((Kr) => ((Kr === "cmd" || Kr === "super") && (Kr = "meta"), Fe[`${Kr}Key`])).length === $r.length && keyToModifiers(Fe.key).includes(Fr[0]));
}
function keyToModifiers(Fe) {
  if (!Fe)
    return [];
  Fe = kebabCase2(Fe);
  let _r = {
    ctrl: "control",
    slash: "/",
    space: " ",
    spacebar: " ",
    cmd: "meta",
    esc: "escape",
    up: "arrow-up",
    down: "arrow-down",
    left: "arrow-left",
    right: "arrow-right",
    period: ".",
    equal: "=",
    minus: "-",
    underscore: "_"
  };
  return _r[Fe] = Fe, Object.keys(_r).map((Fr) => {
    if (_r[Fr] === Fe)
      return Fr;
  }).filter((Fr) => Fr);
}
directive("model", (Fe, { modifiers: _r, expression: Fr }, { effect: jr, cleanup: $r }) => {
  let Qr = Fe;
  _r.includes("parent") && (Qr = Fe.parentNode);
  let Kr = evaluateLater(Qr, Fr), zr;
  typeof Fr == "string" ? zr = evaluateLater(Qr, `${Fr} = __placeholder`) : typeof Fr == "function" && typeof Fr() == "string" ? zr = evaluateLater(Qr, `${Fr()} = __placeholder`) : zr = () => {
  };
  let Vr = () => {
    let Gr;
    return Kr((tn) => Gr = tn), isGetterSetter(Gr) ? Gr.get() : Gr;
  }, Wr = (Gr) => {
    let tn;
    Kr((un) => tn = un), isGetterSetter(tn) ? tn.set(Gr) : zr(() => {
    }, {
      scope: { __placeholder: Gr }
    });
  };
  typeof Fr == "string" && Fe.type === "radio" && mutateDom(() => {
    Fe.hasAttribute("name") || Fe.setAttribute("name", Fr);
  });
  var Yr = Fe.tagName.toLowerCase() === "select" || ["checkbox", "radio"].includes(Fe.type) || _r.includes("lazy") ? "change" : "input";
  let Jr = isCloning ? () => {
  } : on(Fe, Yr, _r, (Gr) => {
    Wr(getInputValue(Fe, _r, Gr, Vr()));
  });
  if (_r.includes("fill") && ([null, ""].includes(Vr()) || Fe.type === "checkbox" && Array.isArray(Vr())) && Fe.dispatchEvent(new Event(Yr, {})), Fe._x_removeModelListeners || (Fe._x_removeModelListeners = {}), Fe._x_removeModelListeners.default = Jr, $r(() => Fe._x_removeModelListeners.default()), Fe.form) {
    let Gr = on(Fe.form, "reset", [], (tn) => {
      nextTick(() => Fe._x_model && Fe._x_model.set(Fe.value));
    });
    $r(() => Gr());
  }
  Fe._x_model = {
    get() {
      return Vr();
    },
    set(Gr) {
      Wr(Gr);
    }
  }, Fe._x_forceModelUpdate = (Gr) => {
    Gr === void 0 && typeof Fr == "string" && Fr.match(/\./) && (Gr = ""), window.fromModel = !0, mutateDom(() => bind(Fe, "value", Gr)), delete window.fromModel;
  }, jr(() => {
    let Gr = Vr();
    _r.includes("unintrusive") && document.activeElement.isSameNode(Fe) || Fe._x_forceModelUpdate(Gr);
  });
});
function getInputValue(Fe, _r, Fr, jr) {
  return mutateDom(() => {
    if (Fr instanceof CustomEvent && Fr.detail !== void 0)
      return Fr.detail !== null && Fr.detail !== void 0 ? Fr.detail : Fr.target.value;
    if (Fe.type === "checkbox")
      if (Array.isArray(jr)) {
        let $r = null;
        return _r.includes("number") ? $r = safeParseNumber(Fr.target.value) : _r.includes("boolean") ? $r = safeParseBoolean(Fr.target.value) : $r = Fr.target.value, Fr.target.checked ? jr.concat([$r]) : jr.filter((Qr) => !checkedAttrLooseCompare2(Qr, $r));
      } else
        return Fr.target.checked;
    else
      return Fe.tagName.toLowerCase() === "select" && Fe.multiple ? _r.includes("number") ? Array.from(Fr.target.selectedOptions).map(($r) => {
        let Qr = $r.value || $r.text;
        return safeParseNumber(Qr);
      }) : _r.includes("boolean") ? Array.from(Fr.target.selectedOptions).map(($r) => {
        let Qr = $r.value || $r.text;
        return safeParseBoolean(Qr);
      }) : Array.from(Fr.target.selectedOptions).map(($r) => $r.value || $r.text) : _r.includes("number") ? safeParseNumber(Fr.target.value) : _r.includes("boolean") ? safeParseBoolean(Fr.target.value) : _r.includes("trim") ? Fr.target.value.trim() : Fr.target.value;
  });
}
function safeParseNumber(Fe) {
  let _r = Fe ? parseFloat(Fe) : null;
  return isNumeric2(_r) ? _r : Fe;
}
function checkedAttrLooseCompare2(Fe, _r) {
  return Fe == _r;
}
function isNumeric2(Fe) {
  return !Array.isArray(Fe) && !isNaN(Fe);
}
function isGetterSetter(Fe) {
  return Fe !== null && typeof Fe == "object" && typeof Fe.get == "function" && typeof Fe.set == "function";
}
directive("cloak", (Fe) => queueMicrotask(() => mutateDom(() => Fe.removeAttribute(prefix("cloak")))));
addInitSelector(() => `[${prefix("init")}]`);
directive("init", skipDuringClone((Fe, { expression: _r }, { evaluate: Fr }) => typeof _r == "string" ? !!_r.trim() && Fr(_r, {}, !1) : Fr(_r, {}, !1)));
directive("text", (Fe, { expression: _r }, { effect: Fr, evaluateLater: jr }) => {
  let $r = jr(_r);
  Fr(() => {
    $r((Qr) => {
      mutateDom(() => {
        Fe.textContent = Qr;
      });
    });
  });
});
directive("html", (Fe, { expression: _r }, { effect: Fr, evaluateLater: jr }) => {
  let $r = jr(_r);
  Fr(() => {
    $r((Qr) => {
      mutateDom(() => {
        Fe.innerHTML = Qr, Fe._x_ignoreSelf = !0, initTree(Fe), delete Fe._x_ignoreSelf;
      });
    });
  });
});
mapAttributes(startingWith(":", into(prefix("bind:"))));
var handler2 = (Fe, { value: _r, modifiers: Fr, expression: jr, original: $r }, { effect: Qr }) => {
  if (!_r) {
    let zr = {};
    injectBindingProviders(zr), evaluateLater(Fe, jr)((Wr) => {
      applyBindingsObject(Fe, Wr, $r);
    }, { scope: zr });
    return;
  }
  if (_r === "key")
    return storeKeyForXFor(Fe, jr);
  if (Fe._x_inlineBindings && Fe._x_inlineBindings[_r] && Fe._x_inlineBindings[_r].extract)
    return;
  let Kr = evaluateLater(Fe, jr);
  Qr(() => Kr((zr) => {
    zr === void 0 && typeof jr == "string" && jr.match(/\./) && (zr = ""), mutateDom(() => bind(Fe, _r, zr, Fr));
  }));
};
handler2.inline = (Fe, { value: _r, modifiers: Fr, expression: jr }) => {
  _r && (Fe._x_inlineBindings || (Fe._x_inlineBindings = {}), Fe._x_inlineBindings[_r] = { expression: jr, extract: !1 });
};
directive("bind", handler2);
function storeKeyForXFor(Fe, _r) {
  Fe._x_keyExpression = _r;
}
addRootSelector(() => `[${prefix("data")}]`);
directive("data", (Fe, { expression: _r }, { cleanup: Fr }) => {
  if (shouldSkipRegisteringDataDuringClone(Fe))
    return;
  _r = _r === "" ? "{}" : _r;
  let jr = {};
  injectMagics(jr, Fe);
  let $r = {};
  injectDataProviders($r, jr);
  let Qr = evaluate(Fe, _r, { scope: $r });
  (Qr === void 0 || Qr === !0) && (Qr = {}), injectMagics(Qr, Fe);
  let Kr = reactive(Qr);
  initInterceptors2(Kr);
  let zr = addScopeToNode(Fe, Kr);
  Kr.init && evaluate(Fe, Kr.init), Fr(() => {
    Kr.destroy && evaluate(Fe, Kr.destroy), zr();
  });
});
interceptClone((Fe, _r) => {
  Fe._x_dataStack && (_r._x_dataStack = Fe._x_dataStack, _r.setAttribute("data-has-alpine-state", !0));
});
function shouldSkipRegisteringDataDuringClone(Fe) {
  return isCloning ? isCloningLegacy ? !0 : Fe.hasAttribute("data-has-alpine-state") : !1;
}
directive("show", (Fe, { modifiers: _r, expression: Fr }, { effect: jr }) => {
  let $r = evaluateLater(Fe, Fr);
  Fe._x_doHide || (Fe._x_doHide = () => {
    mutateDom(() => {
      Fe.style.setProperty("display", "none", _r.includes("important") ? "important" : void 0);
    });
  }), Fe._x_doShow || (Fe._x_doShow = () => {
    mutateDom(() => {
      Fe.style.length === 1 && Fe.style.display === "none" ? Fe.removeAttribute("style") : Fe.style.removeProperty("display");
    });
  });
  let Qr = () => {
    Fe._x_doHide(), Fe._x_isShown = !1;
  }, Kr = () => {
    Fe._x_doShow(), Fe._x_isShown = !0;
  }, zr = () => setTimeout(Kr), Vr = once(
    (Jr) => Jr ? Kr() : Qr(),
    (Jr) => {
      typeof Fe._x_toggleAndCascadeWithTransitions == "function" ? Fe._x_toggleAndCascadeWithTransitions(Fe, Jr, Kr, Qr) : Jr ? zr() : Qr();
    }
  ), Wr, Yr = !0;
  jr(() => $r((Jr) => {
    !Yr && Jr === Wr || (_r.includes("immediate") && (Jr ? zr() : Qr()), Vr(Jr), Wr = Jr, Yr = !1);
  }));
});
directive("for", (Fe, { expression: _r }, { effect: Fr, cleanup: jr }) => {
  let $r = parseForExpression(_r), Qr = evaluateLater(Fe, $r.items), Kr = evaluateLater(
    Fe,
    // the x-bind:key expression is stored for our use instead of evaluated.
    Fe._x_keyExpression || "index"
  );
  Fe._x_prevKeys = [], Fe._x_lookup = {}, Fr(() => loop(Fe, $r, Qr, Kr)), jr(() => {
    Object.values(Fe._x_lookup).forEach((zr) => zr.remove()), delete Fe._x_prevKeys, delete Fe._x_lookup;
  });
});
function loop(Fe, _r, Fr, jr) {
  let $r = (Kr) => typeof Kr == "object" && !Array.isArray(Kr), Qr = Fe;
  Fr((Kr) => {
    isNumeric3(Kr) && Kr >= 0 && (Kr = Array.from(Array(Kr).keys(), (Zr) => Zr + 1)), Kr === void 0 && (Kr = []);
    let zr = Fe._x_lookup, Vr = Fe._x_prevKeys, Wr = [], Yr = [];
    if ($r(Kr))
      Kr = Object.entries(Kr).map(([Zr, en]) => {
        let rn = getIterationScopeVariables(_r, en, Zr, Kr);
        jr((nn) => Yr.push(nn), { scope: { index: Zr, ...rn } }), Wr.push(rn);
      });
    else
      for (let Zr = 0; Zr < Kr.length; Zr++) {
        let en = getIterationScopeVariables(_r, Kr[Zr], Zr, Kr);
        jr((rn) => Yr.push(rn), { scope: { index: Zr, ...en } }), Wr.push(en);
      }
    let Jr = [], Gr = [], tn = [], un = [];
    for (let Zr = 0; Zr < Vr.length; Zr++) {
      let en = Vr[Zr];
      Yr.indexOf(en) === -1 && tn.push(en);
    }
    Vr = Vr.filter((Zr) => !tn.includes(Zr));
    let gn = "template";
    for (let Zr = 0; Zr < Yr.length; Zr++) {
      let en = Yr[Zr], rn = Vr.indexOf(en);
      if (rn === -1)
        Vr.splice(Zr, 0, en), Jr.push([gn, Zr]);
      else if (rn !== Zr) {
        let nn = Vr.splice(Zr, 1)[0], an = Vr.splice(rn - 1, 1)[0];
        Vr.splice(Zr, 0, an), Vr.splice(rn, 0, nn), Gr.push([nn, an]);
      } else
        un.push(en);
      gn = en;
    }
    for (let Zr = 0; Zr < tn.length; Zr++) {
      let en = tn[Zr];
      zr[en]._x_effects && zr[en]._x_effects.forEach(dequeueJob), zr[en].remove(), zr[en] = null, delete zr[en];
    }
    for (let Zr = 0; Zr < Gr.length; Zr++) {
      let [en, rn] = Gr[Zr], nn = zr[en], an = zr[rn], cn = document.createElement("div");
      mutateDom(() => {
        an || warn('x-for ":key" is undefined or invalid', Qr), an.after(cn), nn.after(an), an._x_currentIfEl && an.after(an._x_currentIfEl), cn.before(nn), nn._x_currentIfEl && nn.after(nn._x_currentIfEl), cn.remove();
      }), an._x_refreshXForScope(Wr[Yr.indexOf(rn)]);
    }
    for (let Zr = 0; Zr < Jr.length; Zr++) {
      let [en, rn] = Jr[Zr], nn = en === "template" ? Qr : zr[en];
      nn._x_currentIfEl && (nn = nn._x_currentIfEl);
      let an = Wr[rn], cn = Yr[rn], wn = document.importNode(Qr.content, !0).firstElementChild, fn = reactive(an);
      addScopeToNode(wn, fn, Qr), wn._x_refreshXForScope = (dn) => {
        Object.entries(dn).forEach(([Sn, hn]) => {
          fn[Sn] = hn;
        });
      }, mutateDom(() => {
        nn.after(wn), initTree(wn);
      }), typeof cn == "object" && warn("x-for key cannot be an object, it must be a string or an integer", Qr), zr[cn] = wn;
    }
    for (let Zr = 0; Zr < un.length; Zr++)
      zr[un[Zr]]._x_refreshXForScope(Wr[Yr.indexOf(un[Zr])]);
    Qr._x_prevKeys = Yr;
  });
}
function parseForExpression(Fe) {
  let _r = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/, Fr = /^\s*\(|\)\s*$/g, jr = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/, $r = Fe.match(jr);
  if (!$r)
    return;
  let Qr = {};
  Qr.items = $r[2].trim();
  let Kr = $r[1].replace(Fr, "").trim(), zr = Kr.match(_r);
  return zr ? (Qr.item = Kr.replace(_r, "").trim(), Qr.index = zr[1].trim(), zr[2] && (Qr.collection = zr[2].trim())) : Qr.item = Kr, Qr;
}
function getIterationScopeVariables(Fe, _r, Fr, jr) {
  let $r = {};
  return /^\[.*\]$/.test(Fe.item) && Array.isArray(_r) ? Fe.item.replace("[", "").replace("]", "").split(",").map((Kr) => Kr.trim()).forEach((Kr, zr) => {
    $r[Kr] = _r[zr];
  }) : /^\{.*\}$/.test(Fe.item) && !Array.isArray(_r) && typeof _r == "object" ? Fe.item.replace("{", "").replace("}", "").split(",").map((Kr) => Kr.trim()).forEach((Kr) => {
    $r[Kr] = _r[Kr];
  }) : $r[Fe.item] = _r, Fe.index && ($r[Fe.index] = Fr), Fe.collection && ($r[Fe.collection] = jr), $r;
}
function isNumeric3(Fe) {
  return !Array.isArray(Fe) && !isNaN(Fe);
}
function handler3() {
}
handler3.inline = (Fe, { expression: _r }, { cleanup: Fr }) => {
  let jr = closestRoot(Fe);
  jr._x_refs || (jr._x_refs = {}), jr._x_refs[_r] = Fe, Fr(() => delete jr._x_refs[_r]);
};
directive("ref", handler3);
directive("if", (Fe, { expression: _r }, { effect: Fr, cleanup: jr }) => {
  Fe.tagName.toLowerCase() !== "template" && warn("x-if can only be used on a <template> tag", Fe);
  let $r = evaluateLater(Fe, _r), Qr = () => {
    if (Fe._x_currentIfEl)
      return Fe._x_currentIfEl;
    let zr = Fe.content.cloneNode(!0).firstElementChild;
    return addScopeToNode(zr, {}, Fe), mutateDom(() => {
      Fe.after(zr), initTree(zr);
    }), Fe._x_currentIfEl = zr, Fe._x_undoIf = () => {
      walk(zr, (Vr) => {
        Vr._x_effects && Vr._x_effects.forEach(dequeueJob);
      }), zr.remove(), delete Fe._x_currentIfEl;
    }, zr;
  }, Kr = () => {
    Fe._x_undoIf && (Fe._x_undoIf(), delete Fe._x_undoIf);
  };
  Fr(() => $r((zr) => {
    zr ? Qr() : Kr();
  })), jr(() => Fe._x_undoIf && Fe._x_undoIf());
});
directive("id", (Fe, { expression: _r }, { evaluate: Fr }) => {
  Fr(_r).forEach(($r) => setIdRoot(Fe, $r));
});
mapAttributes(startingWith("@", into(prefix("on:"))));
directive("on", skipDuringClone((Fe, { value: _r, modifiers: Fr, expression: jr }, { cleanup: $r }) => {
  let Qr = jr ? evaluateLater(Fe, jr) : () => {
  };
  Fe.tagName.toLowerCase() === "template" && (Fe._x_forwardEvents || (Fe._x_forwardEvents = []), Fe._x_forwardEvents.includes(_r) || Fe._x_forwardEvents.push(_r));
  let Kr = on(Fe, _r, Fr, (zr) => {
    Qr(() => {
    }, { scope: { $event: zr }, params: [zr] });
  });
  $r(() => Kr());
}));
warnMissingPluginDirective("Collapse", "collapse", "collapse");
warnMissingPluginDirective("Intersect", "intersect", "intersect");
warnMissingPluginDirective("Focus", "trap", "focus");
warnMissingPluginDirective("Mask", "mask", "mask");
function warnMissingPluginDirective(Fe, _r, Fr) {
  directive(_r, (jr) => warn(`You can't use [x-${_r}] without first installing the "${Fe}" plugin here: https://alpinejs.dev/plugins/${Fr}`, jr));
}
alpine_default.setEvaluator(normalEvaluator);
alpine_default.setReactivityEngine({ reactive: reactive2, effect: effect2, release: stop, raw: toRaw });
var src_default = alpine_default, module_default = src_default;
window.htmx = htmx;
window.Alpine = module_default;
module_default.start();
