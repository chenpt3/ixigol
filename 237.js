"use strict";(self.webpackChunkIxigol=self.webpackChunkIxigol||[]).push([[237],{237:(e,n,t)=>{t.r(n),t.d(n,{CLSThresholds:()=>P,FCPThresholds:()=>w,FIDThresholds:()=>ee,INPThresholds:()=>j,LCPThresholds:()=>z,TTFBThresholds:()=>K,onCLS:()=>A,onFCP:()=>I,onFID:()=>ne,onINP:()=>_,onLCP:()=>J,onTTFB:()=>U});var r,i,o,a,c,u=-1,s=function(e){addEventListener("pageshow",(function(n){n.persisted&&(u=n.timeStamp,e(n))}),!0)},f=function(){var e=self.performance&&performance.getEntriesByType&&performance.getEntriesByType("navigation")[0];if(e&&e.responseStart>0&&e.responseStart<performance.now())return e},d=function(){var e=f();return e&&e.activationStart||0},l=function(e,n){var t=f(),r="navigate";return u>=0?r="back-forward-cache":t&&(document.prerendering||d()>0?r="prerender":document.wasDiscarded?r="restore":t.type&&(r=t.type.replace(/_/g,"-"))),{name:e,value:void 0===n?-1:n,rating:"good",delta:0,entries:[],id:"v4-".concat(Date.now(),"-").concat(Math.floor(8999999999999*Math.random())+1e12),navigationType:r}},p=function(e,n,t){try{if(PerformanceObserver.supportedEntryTypes.includes(e)){var r=new PerformanceObserver((function(e){Promise.resolve().then((function(){n(e.getEntries())}))}));return r.observe(Object.assign({type:e,buffered:!0},t||{})),r}}catch(e){}},v=function(e,n,t,r){var i,o;return function(a){n.value>=0&&(a||r)&&((o=n.value-(i||0))||void 0===i)&&(i=n.value,n.delta=o,n.rating=function(e,n){return e>n[1]?"poor":e>n[0]?"needs-improvement":"good"}(n.value,t),e(n))}},m=function(e){requestAnimationFrame((function(){return requestAnimationFrame((function(){return e()}))}))},h=function(e){document.addEventListener("visibilitychange",(function(){"hidden"===document.visibilityState&&e()}))},g=function(e){var n=!1;return function(){n||(e(),n=!0)}},T=-1,y=function(){return"hidden"!==document.visibilityState||document.prerendering?1/0:0},E=function(e){"hidden"===document.visibilityState&&T>-1&&(T="visibilitychange"===e.type?e.timeStamp:0,b())},C=function(){addEventListener("visibilitychange",E,!0),addEventListener("prerenderingchange",E,!0)},b=function(){removeEventListener("visibilitychange",E,!0),removeEventListener("prerenderingchange",E,!0)},L=function(){return T<0&&(T=y(),C(),s((function(){setTimeout((function(){T=y(),C()}),0)}))),{get firstHiddenTime(){return T}}},S=function(e){document.prerendering?addEventListener("prerenderingchange",(function(){return e()}),!0):e()},w=[1800,3e3],I=function(e,n){n=n||{},S((function(){var t,r=L(),i=l("FCP"),o=p("paint",(function(e){e.forEach((function(e){"first-contentful-paint"===e.name&&(o.disconnect(),e.startTime<r.firstHiddenTime&&(i.value=Math.max(e.startTime-d(),0),i.entries.push(e),t(!0)))}))}));o&&(t=v(e,i,w,n.reportAllChanges),s((function(r){i=l("FCP"),t=v(e,i,w,n.reportAllChanges),m((function(){i.value=performance.now()-r.timeStamp,t(!0)}))})))}))},P=[.1,.25],A=function(e,n){n=n||{},I(g((function(){var t,r=l("CLS",0),i=0,o=[],a=function(e){e.forEach((function(e){if(!e.hadRecentInput){var n=o[0],t=o[o.length-1];i&&e.startTime-t.startTime<1e3&&e.startTime-n.startTime<5e3?(i+=e.value,o.push(e)):(i=e.value,o=[e])}})),i>r.value&&(r.value=i,r.entries=o,t())},c=p("layout-shift",a);c&&(t=v(e,r,P,n.reportAllChanges),h((function(){a(c.takeRecords()),t(!0)})),s((function(){i=0,r=l("CLS",0),t=v(e,r,P,n.reportAllChanges),m((function(){return t()}))})),setTimeout(t,0))})))},F=0,k=1/0,M=0,D=function(e){e.forEach((function(e){e.interactionId&&(k=Math.min(k,e.interactionId),M=Math.max(M,e.interactionId),F=M?(M-k)/7+1:0)}))},x=function(){"interactionCount"in performance||r||(r=p("event",D,{type:"event",buffered:!0,durationThreshold:0}))},B=[],R=new Map,H=0,N=function(){return(r?F:performance.interactionCount||0)-H},q=[],O=function(e){if(q.forEach((function(n){return n(e)})),e.interactionId||"first-input"===e.entryType){var n=B[B.length-1],t=R.get(e.interactionId);if(t||B.length<10||e.duration>n.latency){if(t)e.duration>t.latency?(t.entries=[e],t.latency=e.duration):e.duration===t.latency&&e.startTime===t.entries[0].startTime&&t.entries.push(e);else{var r={id:e.interactionId,latency:e.duration,entries:[e]};R.set(r.id,r),B.push(r)}B.sort((function(e,n){return n.latency-e.latency})),B.length>10&&B.splice(10).forEach((function(e){return R.delete(e.id)}))}}},j=[200,500],_=function(e,n){n=n||{},S((function(){var t;x();var r,i=l("INP"),o=function(e){e.forEach(O);var n,t=(n=Math.min(B.length-1,Math.floor(N()/50)),B[n]);t&&t.latency!==i.value&&(i.value=t.latency,i.entries=t.entries,r())},a=p("event",o,{durationThreshold:null!==(t=n.durationThreshold)&&void 0!==t?t:40});r=v(e,i,j,n.reportAllChanges),a&&("PerformanceEventTiming"in self&&"interactionId"in PerformanceEventTiming.prototype&&a.observe({type:"first-input",buffered:!0}),h((function(){o(a.takeRecords()),r(!0)})),s((function(){H=0,B.length=0,R.clear(),i=l("INP"),r=v(e,i,j,n.reportAllChanges)})))}))},z=[2500,4e3],G={},J=function(e,n){n=n||{},S((function(){var t,r=L(),i=l("LCP"),o=function(e){n.reportAllChanges||(e=e.slice(-1)),e.forEach((function(e){e.startTime<r.firstHiddenTime&&(i.value=Math.max(e.startTime-d(),0),i.entries=[e],t())}))},a=p("largest-contentful-paint",o);if(a){t=v(e,i,z,n.reportAllChanges);var c=g((function(){G[i.id]||(o(a.takeRecords()),a.disconnect(),G[i.id]=!0,t(!0))}));["keydown","click"].forEach((function(e){addEventListener(e,(function(){return e=c,n=self.requestIdleCallback||self.setTimeout,t=-1,e=g(e),"hidden"===document.visibilityState?e():(t=n(e),h(e)),t;var e,n,t}),!0)})),h(c),s((function(r){i=l("LCP"),t=v(e,i,z,n.reportAllChanges),m((function(){i.value=performance.now()-r.timeStamp,G[i.id]=!0,t(!0)}))}))}}))},K=[800,1800],Q=function e(n){document.prerendering?S((function(){return e(n)})):"complete"!==document.readyState?addEventListener("load",(function(){return e(n)}),!0):setTimeout(n,0)},U=function(e,n){n=n||{};var t=l("TTFB"),r=v(e,t,K,n.reportAllChanges);Q((function(){var i=f();i&&(t.value=Math.max(i.responseStart-d(),0),t.entries=[i],r(!0),s((function(){t=l("TTFB",0),(r=v(e,t,K,n.reportAllChanges))(!0)})))}))},V={passive:!0,capture:!0},W=new Date,X=function(e,n){i||(i=n,o=e,a=new Date,$(removeEventListener),Y())},Y=function(){if(o>=0&&o<a-W){var e={entryType:"first-input",name:i.type,target:i.target,cancelable:i.cancelable,startTime:i.timeStamp,processingStart:i.timeStamp+o};c.forEach((function(n){n(e)})),c=[]}},Z=function(e){if(e.cancelable){var n=(e.timeStamp>1e12?new Date:performance.now())-e.timeStamp;"pointerdown"==e.type?function(e,n){var t=function(){X(e,n),i()},r=function(){i()},i=function(){removeEventListener("pointerup",t,V),removeEventListener("pointercancel",r,V)};addEventListener("pointerup",t,V),addEventListener("pointercancel",r,V)}(n,e):X(n,e)}},$=function(e){["mousedown","keydown","touchstart","pointerdown"].forEach((function(n){return e(n,Z,V)}))},ee=[100,300],ne=function(e,n){n=n||{},S((function(){var t,r=L(),a=l("FID"),u=function(e){e.startTime<r.firstHiddenTime&&(a.value=e.processingStart-e.startTime,a.entries.push(e),t(!0))},f=function(e){e.forEach(u)},d=p("first-input",f);t=v(e,a,ee,n.reportAllChanges),d&&(h(g((function(){f(d.takeRecords()),d.disconnect()}))),s((function(){var r;a=l("FID"),t=v(e,a,ee,n.reportAllChanges),c=[],o=-1,i=null,$(addEventListener),r=u,c.push(r),Y()})))}))}}}]);