import{_ as g}from"./ValaxyMain.vue_vue_type_style_index_0_lang.DMbapz5x.js";import{u as $}from"./chunks/@vueuse/motion.D6rQsSfL.js";import{o as b}from"./index.BCA-ZtNw.js";import{f as k,e as w,Q as f,P as u,$ as j,U as s,W as p,F as I,a0 as B,O as y,u as _,a4 as n,V as a,y as L,A as R}from"./framework.DntyxCiH.js";import{E as Y}from"./app.AVwD2ej9.js";import"./chunks/dayjs.CCYrSalk.js";import{f as z,a as D,u as E}from"./chunks/vue-router.D1Q24Px9.js";import"./YunComment.vue_vue_type_style_index_0_lang.Bl3rLV1P.js";import"./index.C5okkQwF.js";import"./chunks/vue-i18n.CrruEPAC.js";import"./YunPageHeader.vue_vue_type_script_setup_true_lang.CgGBEkNu.js";import"./post.CpBsICCh.js";import"./animation.C_ru2laA.js";import"./chunks/pinia.NfdmkE6C.js";import"./chunks/nprogress.BahbDzmd.js";const S=["href","title"],V={class:"yun-link-left"},N={class:"yun-link-avatar size-16 overflow-hidden flex-center"},O=["src","alt"],P={class:"yun-link-info",m:"l-2"},C={class:"yun-link-blog",font:"serif black"},F={class:"yun-link-desc"},M=k({__name:"YunLinkItem",props:{i:{},errorImg:{},link:{}},setup(r){const o=r;function l(e){b(e,o.errorImg)}const m=w();return $(m,{initial:{opacity:0,translateY:40},enter:{opacity:1,translateY:0,transition:{type:"spring",duration:400,damping:8,delay:o.i*50}}}),(e,i)=>(u(),f("li",{ref_key:"itemRef",ref:m,class:"yun-link-item inline-flex",style:j({"--primary-color":e.link.color})},[s("a",{class:"yun-link-url",p:"x-4 y-2",href:e.link.url,title:e.link.name,alt:"portrait",rel:"friend",target:"_blank"},[s("div",V,[s("div",N,[s("img",{class:"size-full object-center object-cover m-0! max-w-unset!",loading:"lazy",src:e.link.avatar,alt:e.link.name,onError:l},null,40,O)])]),s("div",P,[s("div",C,p(e.link.blog),1),s("div",F,p(e.link.desc),1)])],8,S)],4))}}),U={class:"yun-links"},A={class:"yun-link-items",flex:"center wrap"},J=k({__name:"YunLinks",props:{links:{},random:{type:Boolean},errorImg:{}},setup(r){const o=r,{data:l}=Y(o.links,o.random);return(m,e)=>{const i=M;return u(),f("div",U,[s("ul",A,[(u(!0),f(I,null,B(_(l),(c,d)=>(u(),y(i,{key:d,i:d,link:c,"error-img":m.errorImg},null,8,["i","link","error-img"]))),128))])])}}}),Q=z("/links",async r=>JSON.parse('{"title":"我的小伙伴们","description":"云游的小伙伴们","frontmatter":{"title":"我的小伙伴们","keywords":"链接","description":"云游的小伙伴们","links":"https://www.yunyoujun.cn/friends/links.json","random":true},"headers":[],"relativePath":"pages/links/index.md","lastUpdated":1743014432000}'),{lazy:(r,o)=>r.name===o.name}),ln={__name:"index",setup(r,{expose:o}){var d;const{data:l}=Q(),m=E(),e=D(),i=Object.assign(e.meta.frontmatter||{},((d=l.value)==null?void 0:d.frontmatter)||{});e.meta.frontmatter=i,m.currentRoute.value.data=l.value,R("valaxy:frontmatter",i),globalThis.$frontmatter=i;const c={title:"我的小伙伴们",keywords:"链接",description:"云游的小伙伴们",links:"https://www.yunyoujun.cn/friends/links.json",random:!0};return o({frontmatter:c}),(t,T)=>{const h=J,v=g;return u(),y(v,{frontmatter:_(i)},{"main-content-md":n(()=>[L(h,{links:c.links,random:c.random},null,8,["links","random"])]),"main-header":n(()=>[a(t.$slots,"main-header")]),"main-header-after":n(()=>[a(t.$slots,"main-header-after")]),"main-nav":n(()=>[a(t.$slots,"main-nav")]),"main-content-before":n(()=>[a(t.$slots,"main-content-before")]),"main-content":n(()=>[a(t.$slots,"main-content")]),"main-content-after":n(()=>[a(t.$slots,"main-content-after")]),"main-nav-before":n(()=>[a(t.$slots,"main-nav-before")]),"main-nav-after":n(()=>[a(t.$slots,"main-nav-after")]),comment:n(()=>[a(t.$slots,"comment")]),footer:n(()=>[a(t.$slots,"footer")]),aside:n(()=>[a(t.$slots,"aside")]),"aside-custom":n(()=>[a(t.$slots,"aside-custom")]),default:n(()=>[a(t.$slots,"default")]),_:3},8,["frontmatter"])}}};export{ln as default,Q as usePageData};
