(this.webpackJsonppokedex=this.webpackJsonppokedex||[]).push([[0],{116:function(e,t,n){var a=n(144),r=["fetch"];e.exports=function(){var e=new Worker(n.p+"061e58ee5301f793355f.worker.js",{name:"[hash].worker.js"});return a(e,r),e}},135:function(e,t,n){e.exports=n(273)},140:function(e,t,n){},142:function(e,t,n){},143:function(e,t,n){},273:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(19),o=n.n(c),s=(n(140),n(25)),i=n(52),u=n(10),l=n.n(u),f=n(20),m=n(11),p=n(17),h=(n(142),n(143),window.speechSynthesis);var b,d,v=function(e){var t=e.details,n=new SpeechSynthesisUtterance(t.name);return r.a.createElement("div",{className:"card ".concat(t.types[0].type.name)},r.a.createElement("div",{className:"details"},r.a.createElement("div",null,r.a.createElement("p",{className:"id"},"#".concat(t.id)),r.a.createElement("p",{className:"name",onClick:function(){h.speak(n)}},t.name),r.a.createElement("div",{className:"types"},t.types.map((function(e){return r.a.createElement("span",{className:"type ".concat(e.type.name)},"\u2b24")}))))),t.id>=1e4?null:r.a.createElement("img",{className:"img",src:"".concat("https://raw.githubusercontent.com/cotyhamilton/pokemon/master/img/detail","/").concat(t.id,".png")}))},j=n(28),O=n(283),k=n(116),w=n.n(k),g=n(47),y=n(48),E=function(){function e(t,n){Object(g.a)(this,e);var a=(this.workerFactory=t)();for(var r in this.poolSize=n||4,this.used=1,this.pool=[a],this.jobs=[],a)a.hasOwnProperty(r)&&"function"===typeof a[r]&&(this[r]=this._method(r))}return Object(y.a)(e,[{key:"_method",value:function(e){var t=this;return function(){for(var n=arguments.length,a=new Array(n),r=0;r<n;r++)a[r]=arguments[r];return t._queueJob(e,a)}}},{key:"_queueJob",value:function(e,t){var n=this;return new Promise((function(a,r){n.jobs.push({method:e,args:t,y:a,n:r}),n._nextJob()}))}},{key:"_nextJob",value:function(){var e,t=this,n=this.pool.pop();if(!n){if(this.used>=this.poolSize)return;this.used++,n=this.workerFactory()}var a=this.jobs.shift();a&&(e=n)[a.method].apply(e,Object(m.a)(a.args)).then(a.y).catch(a.n).finally((function(){t.pool.push(n),t._nextJob()}))}}]),e}(),x=["normal","fighting","flying","poison","ground","rock","bug","ghost","steel","fire","water","grass","electric","psychic","ice","dragon","dark","fairy"],S=new(n(274).Pokedex),N=(b=w.a,d=navigator.hardwareConcurrency>4?navigator.hardwareConcurrency:4,new E(b,d));var P=function(){var e=Object(a.useState)([]),t=Object(p.a)(e,2),n=t[0],c=t[1],o=Object(a.useState)(0),u=Object(p.a)(o,2),h=u[0],b=u[1],d=Object(a.useState)(50),k=Object(p.a)(d,1)[0],w=Object(a.useState)({}),g=Object(p.a)(w,2),y=g[0],E=g[1],P=Object(a.useState)([]),C=Object(p.a)(P,2),J=C[0],_=C[1],L=Object(a.useState)(""),B=Object(p.a)(L,2),W=B[0],z=B[1],q=Object(a.useState)({}),A=Object(p.a)(q,2),F=A[0],I=A[1];Object(a.useEffect)((function(){M()}),[h]),Object(a.useEffect)((function(){n.length&&n.map((function(e){T(e.name)}))}),[n]),Object(a.useEffect)((function(){U()}),[]),Object(a.useEffect)((function(){J.length&&J.map((function(e){return D(e)}))}),[J]),Object(a.useEffect)((function(){x.map((function(e){G(e)}))}),[]),Object(a.useEffect)((function(){if(""===W){var e=J.slice(h,h+k);c((function(t){return Object(m.a)(e)}))}else if(x.includes(W.toLowerCase()))c(Object(m.a)(F[W.toLowerCase()]));else{var t=J.filter((function(e,t){return e.name.includes(W.toLowerCase())||(t+1).toString().includes(W)}));c(Object(m.a)(t))}}),[W]);var M=function(){var e=Object(f.a)(l.a.mark((function e(){var t,n,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(J.length>h+k)){e.next=5;break}t=J.slice(h,h+k),c((function(e){return[].concat(Object(m.a)(e),Object(m.a)(t))})),e.next=10;break;case 5:return n={offset:h,limit:k},e.next=8,S.getPokemonsList(n);case 8:a=e.sent,c((function(e){return[].concat(Object(m.a)(e),Object(m.a)(a.results))}));case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),T=function(){var e=Object(f.a)(l.a.mark((function e(t){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(y.pokemon){e.next=5;break}return e.next=3,S.getPokemonByName(t);case 3:n=e.sent,E((function(e){return Object(i.a)({},e,Object(s.a)({},n.name,n))}));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),U=function(){var e=Object(f.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,S.getPokemonsList();case 2:t=e.sent,_(Object(m.a)(t.results));case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),$=function(){var e=Object(f.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b(h+k);case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),D=function(){var e=Object(f.a)(l.a.mark((function e(t){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,N.fetch(t);case 2:n=e.sent,E((function(e){return Object(i.a)({},e,Object(s.a)({},n.name,n))}));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),G=function(){var e=Object(f.a)(l.a.mark((function e(t){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=[],e.next=3,S.getTypeByName(t);case 3:e.sent.pokemon.map((function(e){n.push(e.pokemon)})),I((function(e){return Object(i.a)({},e,Object(s.a)({},t,n))}));case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return r.a.createElement("div",{className:"App"},r.a.createElement("header",null,r.a.createElement(j.a,{className:"icon",name:"sliders",size:"large"})),r.a.createElement("div",{className:"home"},r.a.createElement("h1",null,"Pok\xe9dex"),r.a.createElement("p",null,"Search for Pok\xe9mon by name or using the National Pok\xe9dex number"),r.a.createElement(O.a,{fluid:!0,icon:"search",iconPosition:"left",placeholder:"What Pok\xe9mon are you looking for?",onChange:function(e){z(e.target.value)}}),n.length?n.map((function(e,t){return y[e.name]?r.a.createElement(v,{details:y[e.name]?y[e.name]:null}):null})):null),""===W?r.a.createElement("div",{className:"page-navigation"},r.a.createElement("span",{onClick:$},"more")):null)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(272);o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(P,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[135,1,2]]]);
//# sourceMappingURL=main.6286f705.chunk.js.map