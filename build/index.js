module.exports=function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=6)}([function(e,t){e.exports=require("react")},function(e,t,r){e.exports=r(4)()},function(e,t){e.exports=require("styled-components")},function(e,t){e.exports=require("react-dom")},function(e,t,r){"use strict";var n=r(5);function o(){}function a(){}a.resetWarningCache=o,e.exports=function(){function e(e,t,r,o,a,u){if(u!==n){var c=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw c.name="Invariant Violation",c}}function t(){return e}e.isRequired=e;var r={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:a,resetWarningCache:o};return r.PropTypes=r,r}},function(e,t,r){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,t,r){"use strict";r.r(t),r.d(t,"ModalProvider",(function(){return m})),r.d(t,"BaseModalBackground",(function(){return a}));var n=r(2),o=r.n(n),a=o.a.div.withConfig({displayName:"baseStyles__BaseModalBackground"})(["display:flex;position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:30;background-color:rgba(0,0,0,0.5);align-items:center;justify-content:center;"]),u=r(0),c=r.n(u),i=r(1),l=r.n(i),f=c.a.createContext({}),s=f.Provider,p=f.Consumer;function d(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var r=[],n=!0,o=!1,a=void 0;try{for(var u,c=e[Symbol.iterator]();!(n=(u=c.next()).done)&&(r.push(u.value),!t||r.length!==t);n=!0);}catch(e){o=!0,a=e}finally{try{n||null==c.return||c.return()}finally{if(o)throw a}}return r}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return y(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return y(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function y(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function b(e){var t=e.backgroundComponent,r=e.children,n=Object(u.useRef)(null),o=d(Object(u.useState)(null),2),i=o[0],l=o[1],f=d(Object(u.useState)(a),2),p=f[0],y=f[1];return Object(u.useEffect)((function(){t&&y(t)}),[y,t]),Object(u.useEffect)((function(){l(n.current)}),[l,n]),c.a.createElement(s,{value:{modalNode:i,BackgroundComponent:p}},r,c.a.createElement("div",{ref:n}))}b.propTypes={backgroundComponent:l.a.oneOfType([l.a.element,l.a.object])};var m=b,v=r(3),O=r.n(v);function g(){return(g=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function h(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var r=[],n=!0,o=!1,a=void 0;try{for(var u,c=e[Symbol.iterator]();!(n=(u=c.next()).done)&&(r.push(u.value),!t||r.length!==t);n=!0);}catch(e){o=!0,a=e}finally{try{n||null==c.return||c.return()}finally{if(o)throw a}}return r}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return j(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return j(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function j(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function w(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}function S(e){var t,r=e.WrapperComponent,n=e.children,o=e.onBackgroundClick,a=e.onEscapeKeydown,i=e.allowScroll,l=e.beforeOpen,f=e.afterOpen,s=e.beforeClose,d=e.afterClose,y=e.backgroundProps,b=e.isOpen,m=w(e,["WrapperComponent","children","onBackgroundClick","onEscapeKeydown","allowScroll","beforeOpen","afterOpen","beforeClose","afterClose","backgroundProps","isOpen"]),v=Object(u.useRef)(null),j=Object(u.useRef)(null),S=Object(u.useRef)(!1),C=h(Object(u.useState)(!1),2),E=C[0],k=C[1];function P(e){v.current===e.target&&o&&o(e)}return Object(u.useEffect)((function(){function e(e){if(e)try{e().then((function(){return k(b)}))}catch(e){k(b)}else k(b)}E!==b&&e(b?l:s)}),[S,E,k,b,l,s]),Object(u.useEffect)((function(){E?f&&f():S.current&&d&&d()}),[S,E,f,d]),Object(u.useEffect)((function(){function e(e){"Escape"===e.key&&a&&a(e)}return E&&document.addEventListener("keydown",e),function(){document.removeEventListener("keydown",e)}}),[E,a]),Object(u.useEffect)((function(){return E&&!i&&(j.current=document.body.style.overflow,document.body.style.overflow="hidden"),function(){i||(document.body.style.overflow=j.current||"")}}),[E,i]),Object(u.useEffect)((function(){S.current=!0}),[S]),t=r?c.a.createElement(r,m,n):n,c.a.createElement(p,null,(function(e){var r=e.modalNode,n=e.BackgroundComponent;return r&&n&&E?O.a.createPortal(c.a.createElement(n,g({},y,{onClick:P,ref:v}),t),r):null}))}S.styled=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];var n=t?o.a.div.withConfig({displayName:"Modal__wrap"}).apply(void 0,t):o.a.div.withConfig({displayName:"Modal__wrap"})();return function(e){return c.a.createElement(S,g({WrapperComponent:n},e))}},S.defaultProps={backgroundProps:{}},S.propTypes={WrapperComponent:l.a.oneOfType([l.a.element,l.a.object]),onBackgroundClick:l.a.func,onEscapeKeydown:l.a.func,allowScroll:l.a.bool,beforeOpen:l.a.func,afterOpen:l.a.func,beforeClose:l.a.func,afterClose:l.a.func,backgroundProps:l.a.object,isOpen:l.a.bool};var C=S;t.default=C}]);