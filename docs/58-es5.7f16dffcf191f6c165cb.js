(window.webpackJsonp=window.webpackJsonp||[]).push([[58],{z0lq:function(e,t,o){"use strict";o.r(t),o.d(t,"ion_popover",function(){return f});var i=o("mrSG"),r=o("3eIi"),n=(o("lSdy"),o("bjU6"),o("XIrJ")),s=o("fXh5"),a=o("6WfQ"),p=o("i7WA"),l=function(e,t,o){var i="top",r="left",n=t.querySelector(".popover-content"),s=n.getBoundingClientRect(),a=s.width,p=s.height,l=t.ownerDocument.defaultView.innerWidth,c=t.ownerDocument.defaultView.innerHeight,h=o&&o.target&&o.target.getBoundingClientRect(),m=null!=h&&"top"in h?h.top:c/2-p/2,v=null!=h&&"left"in h?h.left:l/2,f=h&&h.width||0,u=h&&h.height||0,b=t.querySelector(".popover-arrow"),w=b.getBoundingClientRect(),g=w.width,y=w.height;null==h&&(b.style.display="none");var x={top:m+u,left:v+f/2-g/2},D={top:m+u+(y-1),left:v+f/2-a/2},P=!1,j=!1;D.left<d+25?(P=!0,D.left=d):a+d+D.left+25>l&&(j=!0,D.left=l-a-d,r="right"),m+u+p>c&&m-p>0?(x.top=m-(y+1),D.top=m-p-(y-1),t.className=t.className+" popover-bottom",i="bottom"):m+u+p>c&&(n.style.bottom=d+"%"),b.style.top=x.top+"px",b.style.left=x.left+"px",n.style.top=D.top+"px",n.style.left=D.left+"px",P&&(n.style.left="calc("+D.left+"px + var(--ion-safe-area-left, 0px))"),j&&(n.style.left="calc("+D.left+"px - var(--ion-safe-area-right, 0px))"),n.style.transformOrigin=i+" "+r;var O=new e,k=new e;k.addElement(t.querySelector("ion-backdrop")),k.fromTo("opacity",.01,.08);var E=new e;return E.addElement(t.querySelector(".popover-wrapper")),E.fromTo("opacity",.01,1),Promise.resolve(O.addElement(t).easing("ease").duration(100).add(k).add(E))},d=5,c=function(e,t){var o=new e,i=new e;i.addElement(t.querySelector("ion-backdrop"));var r=new e;return r.addElement(t.querySelector(".popover-wrapper")),r.fromTo("opacity",.99,0),i.fromTo("opacity",.08,0),Promise.resolve(o.addElement(t).easing("ease").duration(500).add(i).add(r))},h=function(e,t,o){var i=t.ownerDocument,r="rtl"===i.dir,n="top",s=r?"right":"left",a=t.querySelector(".popover-content"),p=a.getBoundingClientRect(),l=p.width,d=p.height,c=i.defaultView.innerWidth,h=i.defaultView.innerHeight,v=o&&o.target&&o.target.getBoundingClientRect(),f=null!=v&&"bottom"in v?v.bottom:h/2-d/2,u=v&&v.height||0,b={top:f,left:null!=v&&"left"in v?r?v.left-l+v.width:v.left:c/2-l/2};b.left<m?(b.left=m,s="left"):l+m+b.left>c&&(b.left=c-l-m,s="right"),f+u+d>h&&f-d>0?(b.top=f-d-u,t.className=t.className+" popover-bottom",n="bottom"):f+u+d>h&&(a.style.bottom=m+"px"),a.style.top=b.top+"px",a.style.left=b.left+"px",a.style.transformOrigin=n+" "+s;var w=new e,g=new e;g.addElement(t.querySelector("ion-backdrop")),g.fromTo("opacity",.01,.32);var y=new e;y.addElement(t.querySelector(".popover-wrapper")),y.fromTo("opacity",.01,1);var x=new e;x.addElement(t.querySelector(".popover-content")),x.fromTo("scale",.001,1);var D=new e;return D.addElement(t.querySelector(".popover-viewport")),D.fromTo("opacity",.01,1),Promise.resolve(w.addElement(t).easing("cubic-bezier(0.36,0.66,0.04,1)").duration(300).add(g).add(y).add(x).add(D))},m=12,v=function(e,t){var o=new e,i=new e;i.addElement(t.querySelector("ion-backdrop"));var r=new e;return r.addElement(t.querySelector(".popover-wrapper")),r.fromTo("opacity",.99,0),i.fromTo("opacity",.32,0),Promise.resolve(o.addElement(t).easing("ease").duration(500).add(i).add(r))},f=function(){function e(e){var t=this;Object(r.m)(this,e),this.presented=!1,this.mode=Object(r.e)(this),this.keyboardClose=!0,this.backdropDismiss=!0,this.showBackdrop=!0,this.translucent=!1,this.animated=!0,this.onDismiss=function(e){e.stopPropagation(),e.preventDefault(),t.dismiss()},this.onBackdropTap=function(){t.dismiss(void 0,n.a)},this.onLifecycle=function(e){var o=t.usersElement,i=u[e.type];if(o&&i){var r=new CustomEvent(i,{bubbles:!1,cancelable:!1,detail:e.detail});o.dispatchEvent(r)}},this.didPresent=Object(r.d)(this,"ionPopoverDidPresent",7),this.willPresent=Object(r.d)(this,"ionPopoverWillPresent",7),this.willDismiss=Object(r.d)(this,"ionPopoverWillDismiss",7),this.didDismiss=Object(r.d)(this,"ionPopoverDidDismiss",7)}return e.prototype.present=function(){return i.b(this,void 0,void 0,function(){var e,t,o;return i.e(this,function(i){switch(i.label){case 0:if(this.presented)return[2];if(!(e=this.el.querySelector(".popover-content")))throw new Error("container is undefined");return t=Object.assign({},this.componentProps,{popover:this.el}),o=this,[4,Object(a.a)(this.delegate,e,this.component,["popover-viewport",this.el["s-sc"]],t)];case 1:return o.usersElement=i.sent(),[4,Object(p.a)(this.usersElement)];case 2:return i.sent(),[2,Object(n.e)(this,"popoverEnter",l,h,this.event)]}})})},e.prototype.dismiss=function(e,t){return i.b(this,void 0,void 0,function(){var o;return i.e(this,function(i){switch(i.label){case 0:return[4,Object(n.f)(this,e,t,"popoverLeave",c,v,this.event)];case 1:return(o=i.sent())?[4,Object(a.b)(this.delegate,this.usersElement)]:[3,3];case 2:i.sent(),i.label=3;case 3:return[2,o]}})})},e.prototype.onDidDismiss=function(){return Object(n.g)(this.el,"ionPopoverDidDismiss")},e.prototype.onWillDismiss=function(){return Object(n.g)(this.el,"ionPopoverWillDismiss")},e.prototype.render=function(){var e,t=Object(r.e)(this),o=this.onLifecycle;return Object(r.i)(r.a,{"aria-modal":"true","no-router":!0,style:{zIndex:""+(2e4+this.overlayIndex)},class:Object.assign({},Object(s.b)(this.cssClass),(e={},e[t]=!0,e["popover-translucent"]=this.translucent,e)),onIonPopoverDidPresent:o,onIonPopoverWillPresent:o,onIonPopoverWillDismiss:o,onIonPopoverDidDismiss:o,onIonDismiss:this.onDismiss,onIonBackdropTap:this.onBackdropTap},Object(r.i)("ion-backdrop",{tappable:this.backdropDismiss,visible:this.showBackdrop}),Object(r.i)("div",{class:"popover-wrapper"},Object(r.i)("div",{class:"popover-arrow"}),Object(r.i)("div",{class:"popover-content"})))},Object.defineProperty(e.prototype,"el",{get:function(){return Object(r.f)(this)},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return".sc-ion-popover-md-h{--background:var(--ion-background-color,#fff);--min-width:0;--min-height:0;--max-width:auto;--height:auto;left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:fixed;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;color:var(--ion-text-color,#000);z-index:1000}.overlay-hidden.sc-ion-popover-md-h{display:none}.popover-wrapper.sc-ion-popover-md{opacity:0;z-index:10}.popover-content.sc-ion-popover-md{display:-ms-flexbox;display:flex;position:absolute;-ms-flex-direction:column;flex-direction:column;width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);background:var(--background);-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow);overflow:auto;z-index:10}.popover-viewport.sc-ion-popover-md{--ion-safe-area-top:0px;--ion-safe-area-right:0px;--ion-safe-area-bottom:0px;--ion-safe-area-left:0px}.sc-ion-popover-md-h{--width:250px;--max-height:90%;--box-shadow:0 5px 5px -3px rgba(0,0,0,0.2),0 8px 10px 1px rgba(0,0,0,0.14),0 3px 14px 2px rgba(0,0,0,0.12)}.popover-content.sc-ion-popover-md{border-radius:4px;-webkit-transform-origin:left top;transform-origin:left top}[dir=rtl].sc-ion-popover-md-h .popover-content.sc-ion-popover-md, [dir=rtl] .sc-ion-popover-md-h .popover-content.sc-ion-popover-md, [dir=rtl].sc-ion-popover-md .popover-content.sc-ion-popover-md{-webkit-transform-origin:right top;transform-origin:right top}.popover-viewport.sc-ion-popover-md{-webkit-transition-delay:.1s;transition-delay:.1s}"},enumerable:!0,configurable:!0}),e}(),u={ionPopoverDidPresent:"ionViewDidEnter",ionPopoverWillPresent:"ionViewWillEnter",ionPopoverWillDismiss:"ionViewWillLeave",ionPopoverDidDismiss:"ionViewDidLeave"}}}]);