"use strict";(self.webpackChunkadmin=self.webpackChunkadmin||[]).push([[971],{927:function(e,n,t){t(2791);n.Z=t.p+"static/media/avatar.bed0beba0e8bf953080b665e81b37c57.svg"},9947:function(e,n,t){t.d(n,{Z:function(){return c}});var a=t(8182),i=t(184),r="default",c=function(e){var n=e.children,t=e.className,c=e.variant;switch(c){case"fill_light_green":t=(0,a.Z)(r,"card-light-green");break;case"fill_light_green-md":t=(0,a.Z)(r,"card-light-green_md");break;case"fill_red":t=(0,a.Z)(r,"card-red");break;case"fill_red-md":t=(0,a.Z)(r,"card-red_md");break;case"fill_black":t=(0,a.Z)(r,"card-black");break;case"full_width":t="full_width"}return(0,i.jsx)("div",{variant:c,className:(0,a.Z)(r,t),children:n})}},7290:function(e,n,t){t.d(n,{Z:function(){return i}});t(2791);var a=t(184),i=function(e){var n=e.variant,t=e.children,i=e.className;switch(n){case"flexFit":i="flex-fit";break;case"flexed":i="flex-bw";break;case"normal":i="container";break;case"container_fit":i="container_fit";break;case"gapped":i="gapped";break;case"gapped-spaced":i="nav-flex-bw";break;case"gapped-top":i="gapped-top";break;case"gapped-top-center":i="gapped-top-center";break;case"flex-around":i="flex-around"}return(0,a.jsx)("main",{className:i,variant:n,children:t})}},307:function(e,n,t){t.d(n,{Z:function(){return i}});t(2791);var a=t(184),i=function(e){var n=e.onChange,t=void 0===n?function(e){return null}:n,i=e.type,r=void 0===i?"":i,c=e.className,l=e.name,s=e.checked,d=e.placeholder,o=void 0===d?"":d,u=e.variant,h=e.max,x=e.value;switch(u){case"normal":c="input";break;case"checkbox":c="checkbox";break;case"number":c="number";break;case"search":c="search"}return(0,a.jsx)("input",{placeholder:o,name:l,type:r,value:x,max:h,checked:s,onChange:t,className:c})}},3022:function(e,n,t){t.d(n,{Z:function(){return d}});t(2791);var a=t(5050),i=t(7290),r=t(6189),c=t(184),l=(0,r.Z)((0,c.jsx)("path",{d:"M15.61 7.41 14.2 6l-6 6 6 6 1.41-1.41L11.03 12l4.58-4.59z"}),"NavigateBeforeOutlined"),s=(0,r.Z)((0,c.jsx)("path",{d:"M10.02 6 8.61 7.41 13.19 12l-4.58 4.59L10.02 18l6-6-6-6z"}),"NavigateNextOutlined"),d=function(e){var n=e.currentPage,t=e.totalPages,r=e.onPageChange,d=e.handleNextClick,o=e.handlePrevClick,u=Array.from({length:t},(function(e,n){return n+1}));return(0,c.jsxs)(i.Z,{className:"Pagination",children:[(0,c.jsx)(a.Z,{className:"Pagination__button Pagination__button--arrow",onClick:o,disabled:n<=1,children:(0,c.jsx)(l,{})}),(t<=5?u:n<=3?u.slice(0,5):n>t-3?u.slice(t-5,t):u.slice(n-3,n+2)).map((function(e){return(0,c.jsx)("button",{className:"Pagination__button ".concat(e===n?"Pagination__button--active":""),onClick:function(){return function(e){e<1||e>t||e===n||r(e)}(e)},children:e},e)})),(0,c.jsx)(a.Z,{className:"Pagination__button Pagination__button--arrow",onClick:d,disabled:n>=t,children:(0,c.jsx)(s,{})})]})}},3631:function(e,n,t){var a=t(9439),i=t(2791),r=(t(7676),t(184));n.Z=function(e){var n=e.isOpen,t=(e.onClose,e.children),c=(0,i.useState)(n),l=(0,a.Z)(c,2);l[0],l[1];return(0,r.jsx)("div",{className:n?"modal-overlay ":"modal-hiden",children:(0,r.jsx)("div",{className:"modal",children:(0,r.jsx)("div",{className:"modal-content",children:t})})})}},3883:function(e,n,t){t(2791);var a=t(307),i=t(7290),r=t(184);n.Z=function(e){var n=e.pageSize,t=e.handlePageSizeChange,c=e.totalRows,l=e.handleQuery;return(0,r.jsxs)(i.Z,{variant:"gapped-top",children:[(0,r.jsxs)(i.Z,{variant:"gapped",children:[(0,r.jsx)("div",{children:"Search"}),(0,r.jsx)(a.Z,{variant:"normal",type:"text",onChange:l,placeholder:"Enter name or email"})]}),(0,r.jsxs)(i.Z,{variant:"gapped",children:[(0,r.jsx)("div",{children:"Show"}),(0,r.jsx)(a.Z,{variant:"number",type:"number",max:c,value:n,onChange:t}),(0,r.jsx)("div",{children:"entries"})]})]})}},7296:function(e,n,t){t.d(n,{Z:function(){return i}});t(2791);var a=t(184),i=function(e){var n=e.children;return(0,a.jsx)("main",{className:"layout",children:(0,a.jsx)("main",{children:n})})}},3971:function(e,n,t){t.r(n),t.d(n,{default:function(){return w}});var a=t(9439),i=t(2791),r=t(7296),c=t(9947),l=t(7290),s=t(184),d=function(e){var n=e.client,t=n.filter((function(e){return e.isVerified})),a=n.filter((function(e){return!e.isVerified})),i=[{id:1,variant:"fill_light_green-md",txt_1:t.length,desc:"Verified"},{id:2,variant:"fill_red-md",txt_1:a.length,desc:"Not Verified"}];return(0,s.jsxs)("div",{children:[(0,s.jsx)(l.Z,{variant:"flexed",children:i.map((function(e){var n=e.id,t=e.variant,a=e.txt_1,i=e.desc;return(0,s.jsxs)(c.Z,{variant:t,children:[(0,s.jsx)("p",{children:a}),(0,s.jsx)("p",{children:i})]},n)}))}),(0,s.jsx)("div",{children:(0,s.jsx)(c.Z,{variant:"full_width",children:"MANAGE CLIENTS"})})]})},o=t(3433),u=t(4165),h=t(5861),x=t(3883),f=(t(8675),t(8077)),v=t(5050),j=t(307),p=t(1087),g=t(927),m=t(9434),b=t(3022),Z=t(4650),k=t(8914),_=t(3631),y=(t(7676),function(e){var n=e.client,t=e.isDelete,r=e.setIsDelete,c=e.handleQuery,l=(0,i.useState)(!1),d=(0,a.Z)(l,2),y=d[0],N=d[1],w=(0,m.I0)(),C=(0,i.useState)(1),P=(0,a.Z)(C,2),S=P[0],A=P[1],D=(0,i.useState)(5),z=(0,a.Z)(D,2),E=z[0],I=z[1],L=(0,i.useState)([]),M=(0,a.Z)(L,2),O=M[0],Q=M[1],V=n.length,F=Math.ceil(V/E),R=(S-1)*E,B=R+E,G=function(){var e=(0,h.Z)((0,u.Z)().mark((function e(n){return(0,u.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,k.W.delete("/admin/client/".concat(n));case 2:r(!t);case 3:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),T=(0,o.Z)(n).reverse(),U=n.slice(R,B),W=function(e){var n=e.target.value;e.target.checked?Q([].concat((0,o.Z)(O),[n])):Q(O.filter((function(e){return e!==n})))},q=function(){N(!0)},H=function(){N(!1)};return(0,s.jsxs)("main",{children:[(0,s.jsxs)(_.Z,{isOpen:y,onClose:H,children:[(0,s.jsx)("p",{className:"modal-text",children:"Are you sure you want to delete this user?"}),(0,s.jsxs)("div",{className:"btn-group",children:[(0,s.jsx)(v.Z,{variant:"outlined",onClick:H,children:"Cancel"}),(0,s.jsx)(v.Z,{variant:"secondary",onClick:function(){var e=Math.floor(Math.random()*U.length),n=U[e]._id;G(n),N(!1)},children:"delete"})]})]}),(0,s.jsxs)("div",{children:[(0,s.jsxs)("div",{className:"table_container",children:[(0,s.jsx)(x.Z,{pageSize:E,handlePageSizeChange:function(e){!function(e){I(e),A(1)}(parseInt(e.target.value))},totalRows:V,handleQuery:c}),(0,s.jsx)("div",{className:"table",children:(0,s.jsxs)("table",{className:"data-table",children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:"#"}),(0,s.jsx)("th",{children:"Picture"}),(0,s.jsx)("th",{style:{width:"150px"},children:"Location"}),(0,s.jsx)("th",{style:{width:"150px"},children:"Name"}),(0,s.jsx)("th",{style:{width:"150px"},children:"Edit"}),(0,s.jsx)("th",{style:{width:"150px"},children:"Delete"}),(0,s.jsx)("th",{style:{width:"150px"},children:"Select"})]})}),(0,s.jsx)("tbody",{children:0!==U?(0,s.jsx)(s.Fragment,{children:T.map((function(e,n){return(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:n+1}),(0,s.jsx)("td",{children:(0,s.jsx)("div",{className:"table_img",children:(0,s.jsx)(f.Z,{width:100,height:97,src:e.picture?e.picture:g.Z,alt:e.picture})})}),(0,s.jsx)("td",{style:{width:"150px",textAlign:"center"},children:(0,s.jsx)("div",{children:e.country&&e.state?(0,s.jsxs)("p",{children:[e.country,", ",e.state]}):(0,s.jsx)("span",{children:"No Location"})})}),(0,s.jsx)("td",{style:{width:"150px",textAlign:"center"},children:e.fullName}),(0,s.jsx)("td",{style:{width:"150px",textAlign:"center"},children:(0,s.jsx)(p.rU,{to:"/adminpage/manage_clients/".concat(e.uuid),children:(0,s.jsx)(v.Z,{variant:"primary",onClick:function(){return n=e._id,void w((0,Z.k0)(n));var n},children:"Edit"})})}),(0,s.jsx)("td",{style:{width:"150px",textAlign:"center"},children:(0,s.jsx)(v.Z,{variant:"secondary",onClick:q,children:"Delete"})}),(0,s.jsx)("td",{style:{width:"150px",textAlign:"center"},children:(0,s.jsx)("label",{children:(0,s.jsx)(j.Z,{variant:"checkbox",type:"checkbox",name:e._id,value:e._id,checked:O.includes(e._id),onChange:W})})})]},n)}))}):(0,s.jsx)("div",{children:"no users yet!"})})]})})]}),(0,s.jsx)(b.Z,{currentPage:S,totalPages:F,onPageChange:function(e){A(e)},handlePrevClick:function(){S>1&&A(S-1)},handleNextClick:function(){S<F&&A(S+1)}})]})]})}),N=t(4338),w=function(){var e=(0,m.I0)(),n=(0,i.useState)([]),t=(0,a.Z)(n,2),c=t[0],o=t[1],u=(0,i.useState)(!1),h=(0,a.Z)(u,2),x=h[0],f=h[1],v=(0,i.useState)(""),j=(0,a.Z)(v,2),p=j[0],g=j[1];return(0,i.useEffect)((function(){var n=void(0,N.PD)(e,"/client/clients/?client=".concat(p),o);return function(){return n}}),[x,p]),(0,s.jsx)(l.Z,{variant:"normal",children:(0,s.jsx)(l.Z,{variant:"container_fit",children:(0,s.jsxs)(r.Z,{children:[(0,s.jsx)(d,{client:c}),(0,s.jsx)(y,{client:c,isDelete:x,setIsDelete:f,handleQuery:function(e){g(e.target.value.toLowerCase())}})]})})})}},7676:function(){},8675:function(){}}]);
//# sourceMappingURL=971.6aaa7d7a.chunk.js.map