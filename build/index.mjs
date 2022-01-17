import e from"styled-components";import n,{useRef as r,useState as t,useEffect as o}from"react";import a from"react-dom";var c=e.div.withConfig({displayName:"baseStyles__BaseModalBackground"})(["display:flex;position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:30;background-color:rgba(0,0,0,0.5);align-items:center;justify-content:center;"]);var l=function(e){if(Array.isArray(e))return e};var i=function(e,n){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var r=[],t=!0,o=!1,a=void 0;try{for(var c,l=e[Symbol.iterator]();!(t=(c=l.next()).done)&&(r.push(c.value),!n||r.length!==n);t=!0);}catch(e){o=!0,a=e}finally{try{t||null==l.return||l.return()}finally{if(o)throw a}}return r}};var u=function(e,n){(null==n||n>e.length)&&(n=e.length);for(var r=0,t=new Array(n);r<n;r++)t[r]=e[r];return t};var p=function(e,n){if(e){if("string"==typeof e)return u(e,n);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(r):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?u(e,n):void 0}};var f=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")};var s=function(e,n){return l(e)||i(e,n)||p(e,n)||f()};function d(e,n){return e(n={exports:{}},n.exports),n.exports}function y(){}function m(){}m.resetWarningCache=y;var v=d((function(e){e.exports=function(){function e(e,n,r,t,o,a){if("SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"!==a){var c=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw c.name="Invariant Violation",c}}function n(){return e}e.isRequired=e;var r={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:n,element:e,elementType:e,instanceOf:n,node:e,objectOf:n,oneOf:n,oneOfType:n,shape:n,exact:n,checkPropTypes:m,resetWarningCache:y};return r.PropTypes=r,r}()})),b=n.createContext({}),g=b.Provider,h=b.Consumer;function O(e){var a=e.backgroundComponent,l=e.children,i=r(null),u=t(null),p=s(u,2),f=p[0],d=p[1],y=t(c),m=s(y,2),v=m[0],b=m[1];return o((function(){a&&b(a)}),[b,a]),o((function(){d(i.current)}),[d,i]),n.createElement(g,{value:{modalNode:f,BackgroundComponent:v}},l,n.createElement("div",{ref:i}))}O.propTypes={backgroundComponent:v.oneOfType([v.element,v.object])};var w=d((function(e){function n(){return e.exports=n=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var r=arguments[n];for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&(e[t]=r[t])}return e},n.apply(this,arguments)}e.exports=n}));var C=function(e,n){if(null==e)return{};var r,t,o={},a=Object.keys(e);for(t=0;t<a.length;t++)r=a[t],n.indexOf(r)>=0||(o[r]=e[r]);return o};var k=function(e,n){if(null==e)return{};var r,t,o=C(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(t=0;t<a.length;t++)r=a[t],n.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o};function E(e){for(var n=arguments.length,r=new Array(n>1?n-1:0),t=1;t<n;t++)r[t-1]=arguments[t];e&&e.apply(void 0,r)}function j(e){var c,l=e.WrapperComponent,i=e.children,u=e.onBackgroundClick,p=e.onEscapeKeydown,f=e.allowScroll,d=e.beforeOpen,y=e.afterOpen,m=e.beforeClose,v=e.afterClose,b=e.backgroundProps,g=e.isOpen,O=k(e,["WrapperComponent","children","onBackgroundClick","onEscapeKeydown","allowScroll","beforeOpen","afterOpen","beforeClose","afterClose","backgroundProps","isOpen"]),C=r(null),j=r(null),P=r(!1),S=t(!1),x=s(S,2),T=x[0],_=x[1];function A(e){C.current===e.target&&u&&u(e)}return o((function(){function e(e){_(e),E(e?y:v)}function n(n){if(n){var r=n();"function"==typeof(null==r?void 0:r.then)?(P.current=!0,r.then((function(){e(g),P.current=!1}))):e(g)}else e(g)}T===g||P.current||n(g?d:m)}),[P,T,g,d,m,v,y]),o((function(){function e(e){"Escape"===e.key&&p&&p(e)}return T&&document.addEventListener("keydown",e),function(){document.removeEventListener("keydown",e)}}),[T,p]),o((function(){return T&&!f&&(j.current=document.body.style.overflow,document.body.style.overflow="hidden"),function(){f||(document.body.style.overflow=j.current||"")}}),[T,f]),c=l?n.createElement(l,O,i):i,n.createElement(h,null,(function(e){var r=e.modalNode,t=e.BackgroundComponent;return r&&t&&T?a.createPortal(n.createElement(t,w({},b,{onClick:A,ref:C}),c),r):null}))}j.styled=function(){for(var r=arguments.length,t=new Array(r),o=0;o<r;o++)t[o]=arguments[o];var a=t?e.div.withConfig({displayName:"Modal__wrap"}).apply(void 0,t):e.div.withConfig({displayName:"Modal__wrap"})();return function(e){return n.createElement(j,w({WrapperComponent:a},e))}},j.defaultProps={backgroundProps:{}},j.propTypes={WrapperComponent:v.oneOfType([v.element,v.object]),onBackgroundClick:v.func,onEscapeKeydown:v.func,allowScroll:v.bool,beforeOpen:v.func,afterOpen:v.func,beforeClose:v.func,afterClose:v.func,backgroundProps:v.object,isOpen:v.bool};export{c as BaseModalBackground,O as ModalProvider,j as default};
