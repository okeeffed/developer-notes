(window.webpackJsonp=window.webpackJsonp||[]).push([[78],{"lW/A":function(e,t,a){"use strict";a.r(t),a.d(t,"_frontmatter",(function(){return o})),a.d(t,"default",(function(){return c}));a("1c7q"),a("abGl"),a("gZHo"),a("Fdmb"),a("Ir+3"),a("2mQt"),a("mXGw");var n=a("/FXl"),i=a("TjRS");a("aD51");function r(){return(r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}var o={};void 0!==o&&o&&o===Object(o)&&Object.isExtensible(o)&&!o.hasOwnProperty("__filemeta")&&Object.defineProperty(o,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"manual/AWS/AWS-Transit-Gateway.md"}});var l={_frontmatter:o},s=i.a;function c(e){var t=e.components,a=function(e,t){if(null==e)return{};var a,n,i={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(i[a]=e[a]);return i}(e,["components"]);return Object(n.b)(s,r({},l,a,{components:t,mdxType:"MDXLayout"}),Object(n.b)("h1",{id:"aws-transit-gateway"},"AWS Transit Gateway"),Object(n.b)("p",null,"As AWS infrastructure grows is can become distributed and complex. Common challenges include:"),Object(n.b)("ol",null,Object(n.b)("li",{parentName:"ol"},"Inability to create transitive relationships"),Object(n.b)("li",{parentName:"ol"},"A lack of edge-to-edge routing meaning any VPN will have to be connected directly to each VPC that it needs connectivity with"),Object(n.b)("li",{parentName:"ol"},"A complex management structure with no centralized management point")),Object(n.b)("h2",{id:"transit-gateway-overview"},"Transit Gateway Overview"),Object(n.b)("p",null,"TG takes complex and distributed infrastructures and simplifies them into a hub-spoke model."),Object(n.b)("h2",{id:"transit-gateway-benefits"},"Transit Gateway Benefits"),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},"Only a single connection is required from each VPC, VPN and Direct Connect connection. This simplifies scalability."),Object(n.b)("li",{parentName:"ul"},"Transit Gateway is used as a hub that controls how traffic is routed between all connected networks."),Object(n.b)("li",{parentName:"ul"},"Management connectivity is simplified."),Object(n.b)("li",{parentName:"ul"},"Routes from connected VPCs/networks can be automatically propagated to Transit Gateway. Transit Gateway maintains a routing table with routes for all connected networks. Static and Dynamic routing are supported."),Object(n.b)("li",{parentName:"ul"},"Equal Cost Multipath (ECMP) is supposed between on-premises gateway connections, enabling load balancing over multiple paths. ECMP can be used to aggregate bandwidth."),Object(n.b)("li",{parentName:"ul"},"Currently, 5 Transit Gateways per account are supported, and a single VPC can have a maximum of 5 Transit Gateway attachments. Other TG limits include 5000 attachments, 1.25 Gbps per VPN, 50 Gbps maximum bandwidth per VPC, and up to 10000 routes."),Object(n.b)("li",{parentName:"ul"},"Transit gateway routes do not propagate to VPC route tables. Entries must be made manually."),Object(n.b)("li",{parentName:"ul"},"Overlapping CIDRs are not support.")),Object(n.b)("p",null,Object(n.b)("img",{alt:"Transit Gateway overview",src:"https://res.cloudinary.com/gitgoodclub/image/upload/v1563922441/developer-notes/Screen_Shot_2019-07-24_at_8.53.23_am.webp"})))}c&&c===Object(c)&&Object.isExtensible(c)&&!c.hasOwnProperty("__filemeta")&&Object.defineProperty(c,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"manual/AWS/AWS-Transit-Gateway.md"}}),c.isMDXComponent=!0}}]);
//# sourceMappingURL=component---manual-aws-aws-transit-gateway-md-2b3edb26284fa919a2a4.js.map