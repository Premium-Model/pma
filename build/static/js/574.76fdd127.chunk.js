"use strict";(self.webpackChunkadmin=self.webpackChunkadmin||[]).push([[574],{927:function(e,n,r){r(2791);n.Z=r.p+"static/media/avatar.bed0beba0e8bf953080b665e81b37c57.svg"},5050:function(e,n,r){r.d(n,{Z:function(){return s}});var a=r(8182),t=(r(2791),r(184)),i="default",s=function(e){var n=e.onClick,r=void 0===n?function(e){}:n,s=e.variant,c=e.children,l=e.className,d=e.isDisabled;switch(s){case"normal":l=(0,a.Z)("btn-normal");break;case"blur":l=(0,a.Z)("btn-blur");break;case"primary":l=(0,a.Z)(i,"btn-primary");break;case"secondary":l=(0,a.Z)(i,"btn-secondary");break;case"transparent":l=(0,a.Z)(i,"btn-transparent");break;case"outlined":l=(0,a.Z)(i,"btn-outlined")}return(0,t.jsx)("button",{onClick:function(e){return r(e)},className:l,isDisabled:d,children:c})}},7290:function(e,n,r){r.d(n,{Z:function(){return t}});r(2791);var a=r(184),t=function(e){var n=e.variant,r=e.children,t=e.className;switch(n){case"flexFit":t="flex-fit";break;case"flexed":t="flex-bw";break;case"normal":t="container";break;case"container_fit":t="container_fit";break;case"gapped":t="gapped";break;case"gapped-spaced":t="nav-flex-bw";break;case"gapped-top":t="gapped-top";break;case"gapped-top-center":t="gapped-top-center";break;case"flex-around":t="flex-around"}return(0,a.jsx)("main",{className:t,variant:n,children:r})}},307:function(e,n,r){r.d(n,{Z:function(){return t}});r(2791);var a=r(184),t=function(e){var n=e.onChange,r=void 0===n?function(e){return null}:n,t=e.type,i=void 0===t?"":t,s=e.className,c=e.name,l=e.checked,d=e.placeholder,o=void 0===d?"":d,u=e.variant,h=e.max,p=e.value;switch(u){case"normal":s="input";break;case"checkbox":s="checkbox";break;case"number":s="number";break;case"search":s="search"}return(0,a.jsx)("input",{placeholder:o,name:c,type:i,value:p,max:h,checked:l,onChange:r,className:s})}},3631:function(e,n,r){var a=r(9439),t=r(2791),i=(r(7676),r(184));n.Z=function(e){var n=e.isOpen,r=(e.onClose,e.children),s=(0,t.useState)(n),c=(0,a.Z)(s,2);c[0],c[1];return(0,i.jsx)("div",{className:n?"modal-overlay ":"modal-hiden",children:(0,i.jsx)("div",{className:"modal",children:(0,i.jsx)("div",{className:"modal-content",children:r})})})}},4574:function(e,n,r){r.r(n),r.d(n,{default:function(){return C}});var a=r(3433),t=r(9439),i=r(2791),s=r(5050),c=r(7290),l=r(4261),d=(r(389),r(8077)),o=r(184),u=r(7689),h=r(9515),p=r(1552),x=function(e){var n=e.users,r=e.handleQuery,a=(0,u.s0)(),t=n.filter((function(e){return"model"===e.role})),i=n.filter((function(e){return"agency"===e.role})),d=n.filter((function(e){return"client"===e.role})),x=[{name:"All",number:null===n||void 0===n?void 0:n.length},{name:"Model",number:null===t||void 0===t?void 0:t.length},{name:"Client",number:null===d||void 0===d?void 0:d.length},{name:"Agency",number:null===i||void 0===i?void 0:i.length}];return(0,o.jsxs)("div",{className:"user-header",children:[(0,o.jsxs)(c.Z,{variant:"gapped",children:[(0,o.jsx)(s.Z,{variant:"transparent",children:"Users"}),(0,o.jsx)(s.Z,{variant:"outlined",onClick:function(){a("/adminpage/users/add_user")},children:"Add New"})]}),(0,o.jsxs)(c.Z,{variant:"flexed",children:[(0,o.jsx)(c.Z,{variant:"gapped",children:x.map((function(e){return(0,o.jsxs)("div",{id:l.Z,className:"wrapper",children:[(0,o.jsxs)("p",{className:"item",children:[e.name," ",(0,o.jsx)("span",{children:e.number})]}),(0,o.jsx)("div",{className:"vr"})]})}))}),(0,o.jsx)("input",{placeholder:"Search for user by email...",onChange:r,style:{padding:"15px",borderRadius:"10px"}})]}),(0,o.jsxs)(c.Z,{variant:"flex-around",children:[(0,o.jsx)(s.Z,{variant:"transparent",children:"Apply"}),(0,o.jsxs)("section",{className:"top-pagination",children:[(0,o.jsx)("div",{children:(0,o.jsxs)("p",{children:[null===n||void 0===n?void 0:n.length," users"]})}),(0,o.jsxs)("div",{className:"users-calc",children:[(0,o.jsx)(s.Z,{children:(0,o.jsx)(h.Z,{})}),(0,o.jsxs)("div",{children:[(0,o.jsx)("p",{children:"4"}),(0,o.jsx)("p",{children:"of"}),(0,o.jsx)("p",{children:"50"})]}),(0,o.jsx)(s.Z,{children:(0,o.jsx)(p.Z,{})})]})]})]})]})},v=r(4165),m=r(5861),f=r(307),j=r(8914),b=(r(3241),r(927)),Z=r(3631),g=r(1087),k=function(e){var n=e.data,r=e.setIsDelete,a=e.isDelete,c=(0,i.useState)(!1),l=(0,t.Z)(c,2),u=l[0],h=l[1],p=(0,i.useState)(""),x=(0,t.Z)(p,2),k=x[0],y=x[1],N=function(){var e=(0,m.Z)((0,v.Z)().mark((function e(n){return(0,v.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,j.W.delete("/user/".concat(n));case 2:r(!a),h(!1);case 4:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),w=function(){h(!1)};return(0,o.jsxs)("div",{className:"table_container",children:[(0,o.jsxs)(Z.Z,{isOpen:u,onClose:w,children:[(0,o.jsx)("p",{className:"modal-text",children:"Are you sure you want to delete this user? Action cannot be undone!"}),(0,o.jsxs)("div",{className:"btn-group",children:[(0,o.jsx)(s.Z,{variant:"outlined",onClick:w,children:"Cancel"}),(0,o.jsx)(s.Z,{variant:"secondary",onClick:function(){return N(k)},children:"delete"})]})]}),(0,o.jsxs)("table",{className:"data-table2",children:[(0,o.jsx)("thead",{children:(0,o.jsxs)("tr",{children:[(0,o.jsx)("th",{children:(0,o.jsx)("label",{children:(0,o.jsx)(f.Z,{variant:"checkbox",type:"checkbox"})})}),(0,o.jsx)("th",{children:"User"}),(0,o.jsx)("th",{children:"Name"}),(0,o.jsx)("th",{children:"Email"}),(0,o.jsx)("th",{children:"Role"})]})}),(0,o.jsx)("tbody",{children:null===n||void 0===n?void 0:n.map((function(e,n){return(0,o.jsxs)("tr",{children:[(0,o.jsx)("td",{children:(0,o.jsx)("label",{children:(0,o.jsx)(f.Z,{variant:"checkbox",type:"checkbox",name:e._id,value:e._id})})}),(0,o.jsx)("td",{children:(0,o.jsx)("div",{className:"table_img",children:(0,o.jsx)(d.Z,{width:60,height:50,src:e.picture?e.picture:b.Z,alt:e.picture})})}),(0,o.jsxs)("td",{children:[e.firstName," ",e.lastName]}),(0,o.jsx)("td",{children:e.email}),(0,o.jsx)("td",{children:e.role}),(0,o.jsx)("td",{children:(0,o.jsx)(g.rU,{to:"model"===e.role?"/adminpage/manage_models/".concat(e._id):"agency"===e.role?"/adminpage/manage_agency/".concat(e._id):"/adminpage/manage_clients/".concat(e._id),variant:"transparent",children:"edit"})}),(0,o.jsx)("td",{children:(0,o.jsx)(s.Z,{variant:"transparent",onClick:function(){return n=e._id,h(!0),void y(n);var n},children:"delete"})})]},n)}))})]})]})},y=function(e){var n=e.reverse,r=e.setIsDelete,a=e.isDelete;return(0,o.jsx)("div",{className:"table_container",children:(0,o.jsx)(k,{data:n,setIsDelete:r,isDelete:a})})},N=r(9434),w=r(4338),C=function(){var e=(0,N.I0)(),n=(0,i.useState)([]),r=(0,t.Z)(n,2),s=r[0],c=r[1],l=(0,i.useState)(!1),d=(0,t.Z)(l,2),u=d[0],h=d[1],p=(0,i.useState)(""),v=(0,t.Z)(p,2),m=v[0],f=v[1];(0,i.useEffect)((function(){var n=void(0,w.PD)(e,"/user/?user=".concat(m),c);return function(){return n}}),[u,m]);var j=(0,a.Z)(s).reverse();return(0,o.jsxs)("div",{children:[(0,o.jsx)(x,{users:s,handleQuery:function(e){f(e.target.value.toLowerCase())}}),(0,o.jsx)(y,{reverse:j,isDelete:u,setIsDelete:h})]})}},9515:function(e,n,r){var a=r(6189),t=r(184);n.Z=(0,a.Z)((0,t.jsx)("path",{d:"M15.61 7.41 14.2 6l-6 6 6 6 1.41-1.41L11.03 12l4.58-4.59z"}),"NavigateBeforeOutlined")},1552:function(e,n,r){var a=r(6189),t=r(184);n.Z=(0,a.Z)((0,t.jsx)("path",{d:"M10.02 6 8.61 7.41 13.19 12l-4.58 4.59L10.02 18l6-6-6-6z"}),"NavigateNextOutlined")},4261:function(e,n,r){r.d(n,{Z:function(){return o}});var a,t={randomUUID:"undefined"!==typeof crypto&&crypto.randomUUID&&crypto.randomUUID.bind(crypto)},i=new Uint8Array(16);function s(){if(!a&&!(a="undefined"!==typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return a(i)}for(var c=[],l=0;l<256;++l)c.push((l+256).toString(16).slice(1));function d(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return(c[e[n+0]]+c[e[n+1]]+c[e[n+2]]+c[e[n+3]]+"-"+c[e[n+4]]+c[e[n+5]]+"-"+c[e[n+6]]+c[e[n+7]]+"-"+c[e[n+8]]+c[e[n+9]]+"-"+c[e[n+10]]+c[e[n+11]]+c[e[n+12]]+c[e[n+13]]+c[e[n+14]]+c[e[n+15]]).toLowerCase()}var o=function(e,n,r){if(t.randomUUID&&!n&&!e)return t.randomUUID();var a=(e=e||{}).random||(e.rng||s)();if(a[6]=15&a[6]|64,a[8]=63&a[8]|128,n){r=r||0;for(var i=0;i<16;++i)n[r+i]=a[i];return n}return d(a)}},3241:function(){},7676:function(){},389:function(){}}]);
//# sourceMappingURL=574.76fdd127.chunk.js.map