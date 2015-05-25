// Angular Rails Templates 0.2.0
//
// angular_templates.ignore_prefix: ["templates/"]
// angular_templates.markups: ["erb", "str"]
// angular_templates.htmlcompressor: false

angular.module("templates", []);

/**
 * @license Angular UI Tree v2.4.0
 * (c) 2010-2015. https://github.com/angular-ui-tree/angular-ui-tree
 * License: MIT
 */

!function(){"use strict";angular.module("ui.tree",[]).constant("treeConfig",{treeClass:"angular-ui-tree",emptyTreeClass:"angular-ui-tree-empty",hiddenClass:"angular-ui-tree-hidden",nodesClass:"angular-ui-tree-nodes",nodeClass:"angular-ui-tree-node",handleClass:"angular-ui-tree-handle",placeHolderClass:"angular-ui-tree-placeholder",dragClass:"angular-ui-tree-drag",dragThreshold:3,levelThreshold:30})}(),function(){"use strict";angular.module("ui.tree").controller("TreeHandleController",["$scope","$element",function(e,n){this.scope=e,e.$element=n,e.$nodeScope=null,e.$type="uiTreeHandle"}])}(),function(){"use strict";angular.module("ui.tree").controller("TreeNodeController",["$scope","$element",function(e,n){function t(e){var n,l,r=0,i=e.childNodes();for(n=0;n<i.length;n++)l=i[n].$childNodesScope,l&&(r=1,t(l));o+=r}this.scope=e,e.$element=n,e.$modelValue=null,e.$parentNodeScope=null,e.$childNodesScope=null,e.$parentNodesScope=null,e.$treeScope=null,e.$handleScope=null,e.$type="uiTreeNode",e.$$apply=!1,e.collapsed=!1,e.init=function(t){var o=t[0];e.$treeScope=t[1]?t[1].scope:null,e.$parentNodeScope=o.scope.$nodeScope,e.$modelValue=o.scope.$modelValue[e.$index],e.$parentNodesScope=o.scope,o.scope.initSubNode(e),n.on("$destroy",function(){o.scope.destroySubNode(e)})},e.index=function(){return e.$parentNodesScope.$modelValue.indexOf(e.$modelValue)},e.dragEnabled=function(){return!(e.$treeScope&&!e.$treeScope.dragEnabled)},e.isSibling=function(n){return e.$parentNodesScope==n.$parentNodesScope},e.isChild=function(n){var t=e.childNodes();return t&&t.indexOf(n)>-1},e.prev=function(){var n=e.index();return n>0?e.siblings()[n-1]:null},e.siblings=function(){return e.$parentNodesScope.childNodes()},e.childNodesCount=function(){return e.childNodes()?e.childNodes().length:0},e.hasChild=function(){return e.childNodesCount()>0},e.childNodes=function(){return e.$childNodesScope&&e.$childNodesScope.$modelValue?e.$childNodesScope.childNodes():null},e.accept=function(n,t){return e.$childNodesScope&&e.$childNodesScope.$modelValue&&e.$childNodesScope.accept(n,t)},e.removeNode=function(){var n=e.remove();return e.$callbacks.removed(n),n},e.remove=function(){return e.$parentNodesScope.removeNode(e)},e.toggle=function(){e.collapsed=!e.collapsed},e.collapse=function(){e.collapsed=!0},e.expand=function(){e.collapsed=!1},e.depth=function(){var n=e.$parentNodeScope;return n?n.depth()+1:1};var o=0;e.maxSubDepth=function(){return o=0,e.$childNodesScope&&t(e.$childNodesScope),o}}])}(),function(){"use strict";angular.module("ui.tree").controller("TreeNodesController",["$scope","$element",function(e,n){this.scope=e,e.$element=n,e.$modelValue=null,e.$nodeScope=null,e.$treeScope=null,e.$type="uiTreeNodes",e.$nodesMap={},e.nodropEnabled=!1,e.maxDepth=0,e.cloneEnabled=!1,e.initSubNode=function(n){return n.$modelValue?void(e.$nodesMap[n.$modelValue.$$hashKey]=n):null},e.destroySubNode=function(n){return n.$modelValue?void(e.$nodesMap[n.$modelValue.$$hashKey]=null):null},e.accept=function(n,t){return e.$treeScope.$callbacks.accept(n,e,t)},e.beforeDrag=function(n){return e.$treeScope.$callbacks.beforeDrag(n)},e.isParent=function(n){return n.$parentNodesScope==e},e.hasChild=function(){return e.$modelValue.length>0},e.safeApply=function(e){var n=this.$root.$$phase;"$apply"==n||"$digest"==n?e&&"function"==typeof e&&e():this.$apply(e)},e.removeNode=function(n){var t=e.$modelValue.indexOf(n.$modelValue);return t>-1?(e.safeApply(function(){e.$modelValue.splice(t,1)[0]}),n):null},e.insertNode=function(n,t){e.safeApply(function(){e.$modelValue.splice(n,0,t)})},e.childNodes=function(){var n,t=[];if(e.$modelValue)for(n=0;n<e.$modelValue.length;n++)t.push(e.$nodesMap[e.$modelValue[n].$$hashKey]);return t},e.depth=function(){return e.$nodeScope?e.$nodeScope.depth():0},e.outOfDepth=function(n){var t=e.maxDepth||e.$treeScope.maxDepth;return t>0?e.depth()+n.maxSubDepth()+1>t:!1}}])}(),function(){"use strict";angular.module("ui.tree").controller("TreeController",["$scope","$element",function(e,n){this.scope=e,e.$element=n,e.$nodesScope=null,e.$type="uiTree",e.$emptyElm=null,e.$callbacks=null,e.dragEnabled=!0,e.emptyPlaceHolderEnabled=!0,e.maxDepth=0,e.dragDelay=0,e.cloneEnabled=!1,e.nodropEnabled=!1,e.isEmpty=function(){return e.$nodesScope&&e.$nodesScope.$modelValue&&0===e.$nodesScope.$modelValue.length},e.place=function(n){e.$nodesScope.$element.append(n),e.$emptyElm.remove()},e.resetEmptyElement=function(){0===e.$nodesScope.$modelValue.length&&e.emptyPlaceHolderEnabled?n.append(e.$emptyElm):e.$emptyElm.remove()};var t=function(e,n){var o,l,r=e.childNodes();for(o=0;o<r.length;o++)n?r[o].collapse():r[o].expand(),l=r[o].$childNodesScope,l&&t(l,n)};e.collapseAll=function(){t(e.$nodesScope,!0)},e.expandAll=function(){t(e.$nodesScope,!1)}}])}(),function(){"use strict";angular.module("ui.tree").directive("uiTree",["treeConfig","$window",function(e,n){return{restrict:"A",scope:!0,controller:"TreeController",link:function(t,o,l){var r={accept:null,beforeDrag:null},i={};angular.extend(i,e),i.treeClass&&o.addClass(i.treeClass),t.$emptyElm=angular.element(n.document.createElement("div")),i.emptyTreeClass&&t.$emptyElm.addClass(i.emptyTreeClass),t.$watch("$nodesScope.$modelValue.length",function(){t.$nodesScope.$modelValue&&t.resetEmptyElement()},!0),t.$watch(l.dragEnabled,function(e){"boolean"==typeof e&&(t.dragEnabled=e)}),t.$watch(l.emptyPlaceHolderEnabled,function(e){"boolean"==typeof e&&(t.emptyPlaceHolderEnabled=e)}),t.$watch(l.nodropEnabled,function(e){"boolean"==typeof e&&(t.nodropEnabled=e)}),t.$watch(l.cloneEnabled,function(e){"boolean"==typeof e&&(t.cloneEnabled=e)}),t.$watch(l.maxDepth,function(e){"number"==typeof e&&(t.maxDepth=e)}),t.$watch(l.dragDelay,function(e){"number"==typeof e&&(t.dragDelay=e)}),r.accept=function(e,n,t){return n.nodropEnabled||n.outOfDepth(e)?!1:!0},r.beforeDrag=function(e){return!0},r.removed=function(e){},r.dropped=function(e){},r.dragStart=function(e){},r.dragMove=function(e){},r.dragStop=function(e){},r.beforeDrop=function(e){},t.$watch(l.uiTree,function(e,n){angular.forEach(e,function(e,n){r[n]&&"function"==typeof e&&(r[n]=e)}),t.$callbacks=r},!0)}}}])}(),function(){"use strict";angular.module("ui.tree").directive("uiTreeHandle",["treeConfig",function(e){return{require:"^uiTreeNode",restrict:"A",scope:!0,controller:"TreeHandleController",link:function(n,t,o,l){var r={};angular.extend(r,e),r.handleClass&&t.addClass(r.handleClass),n!=l.scope&&(n.$nodeScope=l.scope,l.scope.$handleScope=n)}}}])}(),function(){"use strict";angular.module("ui.tree").directive("uiTreeNode",["treeConfig","$uiTreeHelper","$window","$document","$timeout",function(e,n,t,o,l){return{require:["^uiTreeNodes","^uiTree"],restrict:"A",controller:"TreeNodeController",link:function(r,i,a,d){var c,s,u,p,f,$,m,h,g,b,y,S,v,N,x,C,E,T,w,D={},X="ontouchstart"in window,Y=null,A=document.body,V=document.documentElement;angular.extend(D,e),D.nodeClass&&i.addClass(D.nodeClass),r.init(d),r.collapsed=!!n.getNodeAttribute(r,"collapsed"),r.$watch(a.collapsed,function(e){"boolean"==typeof e&&(r.collapsed=e)}),r.$watch("collapsed",function(e){n.setNodeAttribute(r,"collapsed",e),a.$set("collapsed",e)}),b=function(e){if((X||2!=e.button&&3!=e.which)&&!(e.uiTreeDragging||e.originalEvent&&e.originalEvent.uiTreeDragging)){var l,a,d,b,y,S=angular.element(e.target),v=S.scope();if(v&&v.$type&&!("uiTreeNode"!=v.$type&&"uiTreeHandle"!=v.$type||"uiTreeNode"==v.$type&&v.$handleScope||(l=S.prop("tagName").toLowerCase(),"input"==l||"textarea"==l||"button"==l||"select"==l))){for(;S&&S[0]&&S[0]!=i;){if(n.nodrag(S))return;S=S.parent()}r.beforeDrag(r)&&(e.uiTreeDragging=!0,e.originalEvent&&(e.originalEvent.uiTreeDragging=!0),e.preventDefault(),d=n.eventObj(e),c=!0,s=n.dragInfo(r),r.$apply(function(){r.$treeScope.$callbacks.dragStart(s.eventArgs(m,u))}),a=r.$element.prop("tagName"),"tr"===a.toLowerCase()?(p=angular.element(t.document.createElement(a)),b=angular.element(t.document.createElement("td")).addClass(D.placeHolderClass),p.append(b)):p=angular.element(t.document.createElement(a)).addClass(D.placeHolderClass),f=angular.element(t.document.createElement(a)),D.hiddenClass&&f.addClass(D.hiddenClass),u=n.positionStarted(d,r.$element),p.css("height",n.height(r.$element)+"px"),$=angular.element(t.document.createElement(r.$parentNodesScope.$element.prop("tagName"))).addClass(r.$parentNodesScope.$element.attr("class")).addClass(D.dragClass),$.css("width",n.width(r.$element)+"px"),$.css("z-index",9999),y=(r.$element[0].querySelector(".angular-ui-tree-handle")||r.$element[0]).currentStyle,y&&(document.body.setAttribute("ui-tree-cursor",o.find("body").css("cursor")||""),o.find("body").css({cursor:y.cursor+"!important"})),r.$element.after(p),r.$element.after(f),$.append(r.$element),o.find("body").append($),$.css({left:d.pageX-u.offsetX+"px",top:d.pageY-u.offsetY+"px"}),m={placeholder:p,dragging:$},angular.element(o).bind("touchend",x),angular.element(o).bind("touchcancel",x),angular.element(o).bind("touchmove",N),angular.element(o).bind("mouseup",x),angular.element(o).bind("mousemove",N),angular.element(o).bind("mouseleave",C),h=Math.max(A.scrollHeight,A.offsetHeight,V.clientHeight,V.scrollHeight,V.offsetHeight),g=Math.max(A.scrollWidth,A.offsetWidth,V.clientWidth,V.scrollWidth,V.offsetWidth))}}},y=function(e){var o,l,i,a,d,f,b,y,S,v,N,x,C,E,T,w,X=n.eventObj(e);if($){if(e.preventDefault(),t.getSelection?t.getSelection().removeAllRanges():t.document.selection&&t.document.selection.empty(),i=X.pageX-u.offsetX,a=X.pageY-u.offsetY,0>i&&(i=0),0>a&&(a=0),a+10>h&&(a=h-10),i+10>g&&(i=g-10),$.css({left:i+"px",top:a+"px"}),d=window.pageYOffset||t.document.documentElement.scrollTop,f=d+(window.innerHeight||t.document.clientHeight||t.document.clientHeight),f<X.pageY&&h>=f&&window.scrollBy(0,10),d>X.pageY&&window.scrollBy(0,-10),n.positionMoved(e,u,c),c)return void(c=!1);if(u.dirAx&&u.distAxX>=D.levelThreshold&&(u.distAxX=0,u.distX>0&&(o=s.prev(),o&&!o.collapsed&&o.accept(r,o.childNodesCount())&&(o.$childNodesScope.$element.append(p),s.moveTo(o.$childNodesScope,o.childNodes(),o.childNodesCount()))),u.distX<0&&(l=s.next(),l||(b=s.parentNode(),b&&b.$parentNodesScope.accept(r,b.index()+1)&&(b.$element.after(p),s.moveTo(b.$parentNodesScope,b.siblings(),b.index()+1))))),y=n.offset($).left-n.offset(p).left>=D.threshold,S=X.pageX-t.document.body.scrollLeft,v=X.pageY-(window.pageYOffset||t.document.documentElement.scrollTop),angular.isFunction($.hide)?$.hide():(N=$[0].style.display,$[0].style.display="none"),t.document.elementFromPoint(S,v),C=angular.element(t.document.elementFromPoint(S,v)),angular.isFunction($.show)?$.show():$[0].style.display=N,!u.dirAx){if(x=C.scope(),E=!1,!x)return;if("uiTree"==x.$type&&x.dragEnabled&&(E=x.isEmpty()),"uiTreeHandle"==x.$type&&(x=x.$nodeScope),"uiTreeNode"!=x.$type&&!E)return;Y&&p.parent()[0]!=Y.$element[0]&&(Y.resetEmptyElement(),Y=null),E?(Y=x,x.$nodesScope.accept(r,0)&&(x.place(p),s.moveTo(x.$nodesScope,x.$nodesScope.childNodes(),0))):x.dragEnabled()&&(C=x.$element,T=n.offset(C),w=x.horizontal?X.pageX<T.left+n.width(C)/2:X.pageY<T.top+n.height(C)/2,x.$parentNodesScope.accept(r,x.index())?w?(C[0].parentNode.insertBefore(p[0],C[0]),s.moveTo(x.$parentNodesScope,x.siblings(),x.index())):(C.after(p),s.moveTo(x.$parentNodesScope,x.siblings(),x.index()+1)):!w&&x.accept(r,x.childNodesCount())&&(x.$childNodesScope.$element.append(p),s.moveTo(x.$childNodesScope,x.childNodes(),x.childNodesCount())))}r.$apply(function(){r.$treeScope.$callbacks.dragMove(s.eventArgs(m,u))})}},S=function(e){e.preventDefault(),$&&(r.$treeScope.$apply(function(){r.$treeScope.$callbacks.beforeDrop(s.eventArgs(m,u))}),f.replaceWith(r.$element),p.remove(),$.remove(),$=null,r.$$apply?r.$treeScope.$apply(function(){s.apply(),r.$treeScope.$callbacks.dropped(s.eventArgs(m,u))}):T(),r.$treeScope.$apply(function(){r.$treeScope.$callbacks.dragStop(s.eventArgs(m,u))}),r.$$apply=!1,s=null);var n=document.body.getAttribute("ui-tree-cursor");null!==n&&(o.find("body").css({cursor:n}),document.body.removeAttribute("ui-tree-cursor")),angular.element(o).unbind("touchend",x),angular.element(o).unbind("touchcancel",x),angular.element(o).unbind("touchmove",N),angular.element(o).unbind("mouseup",x),angular.element(o).unbind("mousemove",N),angular.element(t.document.body).unbind("mouseleave",C)},v=function(e){r.dragEnabled()&&b(e)},N=function(e){y(e)},x=function(e){r.$$apply=!0,S(e)},C=function(e){S(e)},E=function(){var e;return{exec:function(n,t){t||(t=0),this.cancel(),e=l(n,t)},cancel:function(){l.cancel(e)}}}(),T=function(){i.bind("touchstart mousedown",function(e){E.exec(function(){v(e)},r.dragDelay||0)}),i.bind("touchend touchcancel mouseup",function(){E.cancel()})},T(),w=function(e){27==e.keyCode&&(r.$$apply=!1,S(e))},angular.element(t.document.body).bind("keydown",w),r.$on("$destroy",function(){angular.element(t.document.body).unbind("keydown",w)})}}}])}(),function(){"use strict";angular.module("ui.tree").directive("uiTreeNodes",["treeConfig","$window",function(e){return{require:["ngModel","?^uiTreeNode","^uiTree"],restrict:"A",scope:!0,controller:"TreeNodesController",link:function(n,t,o,l){var r={},i=l[0],a=l[1],d=l[2];angular.extend(r,e),r.nodesClass&&t.addClass(r.nodesClass),a?(a.scope.$childNodesScope=n,n.$nodeScope=a.scope):d.scope.$nodesScope=n,n.$treeScope=d.scope,i&&(i.$render=function(){i.$modelValue&&angular.isArray(i.$modelValue)||(n.$modelValue=[]),n.$modelValue=i.$modelValue}),n.$watch(o.maxDepth,function(e){"number"==typeof e&&(n.maxDepth=e)}),n.$watch(function(){return o.nodropEnabled},function(e){"undefined"!=typeof e&&(n.nodropEnabled=!0)},!0),o.$observe("horizontal",function(e){n.horizontal="undefined"!=typeof e})}}}])}(),function(){"use strict";angular.module("ui.tree").factory("$uiTreeHelper",["$document","$window",function(e,n){return{nodesData:{},setNodeAttribute:function(e,n,t){if(!e.$modelValue)return null;var o=this.nodesData[e.$modelValue.$$hashKey];o||(o={},this.nodesData[e.$modelValue.$$hashKey]=o),o[n]=t},getNodeAttribute:function(e,n){if(!e.$modelValue)return null;var t=this.nodesData[e.$modelValue.$$hashKey];return t?t[n]:null},nodrag:function(e){return"undefined"!=typeof e.attr("data-nodrag")?"false"===e.attr("data-nodrag")?!1:!0:!1},eventObj:function(e){var n=e;return void 0!==e.targetTouches?n=e.targetTouches.item(0):void 0!==e.originalEvent&&void 0!==e.originalEvent.targetTouches&&(n=e.originalEvent.targetTouches.item(0)),n},dragInfo:function(e){return{source:e,sourceInfo:{nodeScope:e,index:e.index(),nodesScope:e.$parentNodesScope},index:e.index(),siblings:e.siblings().slice(0),parent:e.$parentNodesScope,moveTo:function(e,n,t){this.parent=e,this.siblings=n.slice(0);var o=this.siblings.indexOf(this.source);o>-1&&(this.siblings.splice(o,1),this.source.index()<t&&t--),this.siblings.splice(t,0,this.source),this.index=t},parentNode:function(){return this.parent.$nodeScope},prev:function(){return this.index>0?this.siblings[this.index-1]:null},next:function(){return this.index<this.siblings.length-1?this.siblings[this.index+1]:null},isDirty:function(){return this.source.$parentNodesScope!=this.parent||this.source.index()!=this.index},eventArgs:function(e,n){return{source:this.sourceInfo,dest:{index:this.index,nodesScope:this.parent},elements:e,pos:n}},apply:function(){if(this.parent.$treeScope.nodropEnabled!==!0){var e=this.source.$modelValue;if(this.source.$treeScope.cloneEnabled!==!0&&this.source.remove(),this.source.$treeScope.cloneEnabled===!0&&this.source.$treeScope===this.parent.$treeScope)return!1;this.parent.insertNode(this.index,e)}}}},height:function(e){return e.prop("scrollHeight")},width:function(e){return e.prop("scrollWidth")},offset:function(t){var o=t[0].getBoundingClientRect();return{width:t.prop("offsetWidth"),height:t.prop("offsetHeight"),top:o.top+(n.pageYOffset||e[0].body.scrollTop||e[0].documentElement.scrollTop),left:o.left+(n.pageXOffset||e[0].body.scrollLeft||e[0].documentElement.scrollLeft)}},positionStarted:function(e,n){var t={};return t.offsetX=e.pageX-this.offset(n).left,t.offsetY=e.pageY-this.offset(n).top,t.startX=t.lastX=e.pageX,t.startY=t.lastY=e.pageY,t.nowX=t.nowY=t.distX=t.distY=t.dirAx=0,t.dirX=t.dirY=t.lastDirX=t.lastDirY=t.distAxX=t.distAxY=0,t},positionMoved:function(e,n,t){n.lastX=n.nowX,n.lastY=n.nowY,n.nowX=e.pageX,n.nowY=e.pageY,n.distX=n.nowX-n.lastX,n.distY=n.nowY-n.lastY,n.lastDirX=n.dirX,n.lastDirY=n.dirY,n.dirX=0===n.distX?0:n.distX>0?1:-1,n.dirY=0===n.distY?0:n.distY>0?1:-1;var o=Math.abs(n.distX)>Math.abs(n.distY)?1:0;return t?(n.dirAx=o,void(n.moving=!0)):(n.dirAx!==o?(n.distAxX=0,n.distAxY=0):(n.distAxX+=Math.abs(n.distX),0!==n.dirX&&n.dirX!==n.lastDirX&&(n.distAxX=0),n.distAxY+=Math.abs(n.distY),0!==n.dirY&&n.dirY!==n.lastDirY&&(n.distAxY=0)),void(n.dirAx=o))}}}])}();
// AngularDevise
// -------------------
// v1.0.2
//
// Copyright (c)2014 Justin Ridgewell
// Distributed under MIT license
//
// https://github.com/cloudspace/angular_devise

!function(a){"use strict";var b=a.module("Devise",[]);b.provider("AuthIntercept",function(){var a=!1;this.interceptAuth=function(b){return a=!!b||void 0===b,this},this.$get=["$rootScope","$q",function(b,c){return{responseError:function(d){var e=d.config.interceptAuth;if(e=!!e||a&&void 0===e,e&&401===d.status){var f=c.defer();return b.$broadcast("devise:unauthorized",d,f),f.promise}return c.reject(d)}}}]}).config(["$httpProvider",function(a){a.interceptors.push("AuthIntercept")}]),b.provider("Auth",function(){function b(a,b){var c={method:f[a].toLowerCase(),url:e[a]};return b&&(g?(c.data={},c.data[g]=b):c.data=b),c}function c(b,c){a.forEach(b,function(a,d){this[d+c]=function(a){return void 0===a?b[d]:(b[d]=a,this)}},this)}function d(a){return function(){return a}}var e={login:"/users/sign_in.json",logout:"/users/sign_out.json",register:"/users.json"},f={login:"POST",logout:"DELETE",register:"POST"},g="user",h=function(a){return a.data};c.call(this,f,"Method"),c.call(this,e,"Path"),this.resourceName=function(a){return void 0===a?g:(g=a,this)},this.parse=function(a){return"function"!=typeof a?h:(h=a,this)},this.$get=["$q","$http","$rootScope",function(a,c,e){function f(a){return j._currentUser=a,a}function g(){f(null)}function i(a){return function(b){return e.$broadcast("devise:"+a,b),b}}var j={_currentUser:null,parse:h,login:function(a){var d=arguments.length>0,e=j.isAuthenticated();return a=a||{},c(b("login",a)).then(j.parse).then(f).then(function(a){return d&&!e?i("new-session")(a):a}).then(i("login"))},logout:function(){var a=d(j._currentUser);return c(b("logout")).then(g).then(a).then(i("logout"))},register:function(a){return a=a||{},c(b("register",a)).then(j.parse).then(f).then(i("new-registration"))},currentUser:function(){return j.isAuthenticated()?a.when(j._currentUser):j.login()},isAuthenticated:function(){return!!j._currentUser}};return j}]})}(angular);
/*! 
 * angular-loading-bar v0.7.1
 * https://chieffancypants.github.io/angular-loading-bar
 * Copyright (c) 2015 Wes Cruver
 * License: MIT
 */
/*
 * angular-loading-bar
 *
 * intercepts XHR requests and creates a loading bar.
 * Based on the excellent nprogress work by rstacruz (more info in readme)
 *
 * (c) 2013 Wes Cruver
 * License: MIT
 */



(function() {

'use strict';

// Alias the loading bar for various backwards compatibilities since the project has matured:
angular.module('angular-loading-bar', ['cfp.loadingBarInterceptor']);
angular.module('chieffancypants.loadingBar', ['cfp.loadingBarInterceptor']);


/**
 * loadingBarInterceptor service
 *
 * Registers itself as an Angular interceptor and listens for XHR requests.
 */
angular.module('cfp.loadingBarInterceptor', ['cfp.loadingBar'])
  .config(['$httpProvider', function ($httpProvider) {

    var interceptor = ['$q', '$cacheFactory', '$timeout', '$rootScope', '$log', 'cfpLoadingBar', function ($q, $cacheFactory, $timeout, $rootScope, $log, cfpLoadingBar) {

      /**
       * The total number of requests made
       */
      var reqsTotal = 0;

      /**
       * The number of requests completed (either successfully or not)
       */
      var reqsCompleted = 0;

      /**
       * The amount of time spent fetching before showing the loading bar
       */
      var latencyThreshold = cfpLoadingBar.latencyThreshold;

      /**
       * $timeout handle for latencyThreshold
       */
      var startTimeout;


      /**
       * calls cfpLoadingBar.complete() which removes the
       * loading bar from the DOM.
       */
      function setComplete() {
        $timeout.cancel(startTimeout);
        cfpLoadingBar.complete();
        reqsCompleted = 0;
        reqsTotal = 0;
      }

      /**
       * Determine if the response has already been cached
       * @param  {Object}  config the config option from the request
       * @return {Boolean} retrns true if cached, otherwise false
       */
      function isCached(config) {
        var cache;
        var defaultCache = $cacheFactory.get('$http');
        var defaults = $httpProvider.defaults;

        // Choose the proper cache source. Borrowed from angular: $http service
        if ((config.cache || defaults.cache) && config.cache !== false &&
          (config.method === 'GET' || config.method === 'JSONP')) {
            cache = angular.isObject(config.cache) ? config.cache
              : angular.isObject(defaults.cache) ? defaults.cache
              : defaultCache;
        }

        var cached = cache !== undefined ?
          cache.get(config.url) !== undefined : false;

        if (config.cached !== undefined && cached !== config.cached) {
          return config.cached;
        }
        config.cached = cached;
        return cached;
      }


      return {
        'request': function(config) {
          // Check to make sure this request hasn't already been cached and that
          // the requester didn't explicitly ask us to ignore this request:
          if (!config.ignoreLoadingBar && !isCached(config)) {
            $rootScope.$broadcast('cfpLoadingBar:loading', {url: config.url});
            if (reqsTotal === 0) {
              startTimeout = $timeout(function() {
                cfpLoadingBar.start();
              }, latencyThreshold);
            }
            reqsTotal++;
            cfpLoadingBar.set(reqsCompleted / reqsTotal);
          }
          return config;
        },

        'response': function(response) {
          if (!response || !response.config) {
            $log.error('Broken interceptor detected: Config object not supplied in response:\n https://github.com/chieffancypants/angular-loading-bar/pull/50');
            return response;
          }

          if (!response.config.ignoreLoadingBar && !isCached(response.config)) {
            reqsCompleted++;
            $rootScope.$broadcast('cfpLoadingBar:loaded', {url: response.config.url, result: response});
            if (reqsCompleted >= reqsTotal) {
              setComplete();
            } else {
              cfpLoadingBar.set(reqsCompleted / reqsTotal);
            }
          }
          return response;
        },

        'responseError': function(rejection) {
          if (!rejection || !rejection.config) {
            $log.error('Broken interceptor detected: Config object not supplied in rejection:\n https://github.com/chieffancypants/angular-loading-bar/pull/50');
            return $q.reject(rejection);
          }

          if (!rejection.config.ignoreLoadingBar && !isCached(rejection.config)) {
            reqsCompleted++;
            $rootScope.$broadcast('cfpLoadingBar:loaded', {url: rejection.config.url, result: rejection});
            if (reqsCompleted >= reqsTotal) {
              setComplete();
            } else {
              cfpLoadingBar.set(reqsCompleted / reqsTotal);
            }
          }
          return $q.reject(rejection);
        }
      };
    }];

    $httpProvider.interceptors.push(interceptor);
  }]);


/**
 * Loading Bar
 *
 * This service handles adding and removing the actual element in the DOM.
 * Generally, best practices for DOM manipulation is to take place in a
 * directive, but because the element itself is injected in the DOM only upon
 * XHR requests, and it's likely needed on every view, the best option is to
 * use a service.
 */
angular.module('cfp.loadingBar', [])
  .provider('cfpLoadingBar', function() {

    this.includeSpinner = true;
    this.includeBar = true;
    this.latencyThreshold = 100;
    this.startSize = 0.02;
    this.parentSelector = 'body';
    this.spinnerTemplate = '<div id="loading-bar-spinner"><div class="spinner-icon"></div></div>';
    this.loadingBarTemplate = '<div id="loading-bar"><div class="bar"><div class="peg"></div></div></div>';

    this.$get = ['$injector', '$document', '$timeout', '$rootScope', function ($injector, $document, $timeout, $rootScope) {
      var $animate;
      var $parentSelector = this.parentSelector,
        loadingBarContainer = angular.element(this.loadingBarTemplate),
        loadingBar = loadingBarContainer.find('div').eq(0),
        spinner = angular.element(this.spinnerTemplate);

      var incTimeout,
        completeTimeout,
        started = false,
        status = 0;

      var includeSpinner = this.includeSpinner;
      var includeBar = this.includeBar;
      var startSize = this.startSize;

      /**
       * Inserts the loading bar element into the dom, and sets it to 2%
       */
      function _start() {
        if (!$animate) {
          $animate = $injector.get('$animate');
        }

        var $parent = $document.find($parentSelector).eq(0);
        $timeout.cancel(completeTimeout);

        // do not continually broadcast the started event:
        if (started) {
          return;
        }

        $rootScope.$broadcast('cfpLoadingBar:started');
        started = true;

        if (includeBar) {
          $animate.enter(loadingBarContainer, $parent, angular.element($parent[0].lastChild));
        }

        if (includeSpinner) {
          $animate.enter(spinner, $parent, angular.element($parent[0].lastChild));
        }

        _set(startSize);
      }

      /**
       * Set the loading bar's width to a certain percent.
       *
       * @param n any value between 0 and 1
       */
      function _set(n) {
        if (!started) {
          return;
        }
        var pct = (n * 100) + '%';
        loadingBar.css('width', pct);
        status = n;

        // increment loadingbar to give the illusion that there is always
        // progress but make sure to cancel the previous timeouts so we don't
        // have multiple incs running at the same time.
        $timeout.cancel(incTimeout);
        incTimeout = $timeout(function() {
          _inc();
        }, 250);
      }

      /**
       * Increments the loading bar by a random amount
       * but slows down as it progresses
       */
      function _inc() {
        if (_status() >= 1) {
          return;
        }

        var rnd = 0;

        // TODO: do this mathmatically instead of through conditions

        var stat = _status();
        if (stat >= 0 && stat < 0.25) {
          // Start out between 3 - 6% increments
          rnd = (Math.random() * (5 - 3 + 1) + 3) / 100;
        } else if (stat >= 0.25 && stat < 0.65) {
          // increment between 0 - 3%
          rnd = (Math.random() * 3) / 100;
        } else if (stat >= 0.65 && stat < 0.9) {
          // increment between 0 - 2%
          rnd = (Math.random() * 2) / 100;
        } else if (stat >= 0.9 && stat < 0.99) {
          // finally, increment it .5 %
          rnd = 0.005;
        } else {
          // after 99%, don't increment:
          rnd = 0;
        }

        var pct = _status() + rnd;
        _set(pct);
      }

      function _status() {
        return status;
      }

      function _completeAnimation() {
        status = 0;
        started = false;
      }

      function _complete() {
        if (!$animate) {
          $animate = $injector.get('$animate');
        }

        $rootScope.$broadcast('cfpLoadingBar:completed');
        _set(1);

        $timeout.cancel(completeTimeout);

        // Attempt to aggregate any start/complete calls within 500ms:
        completeTimeout = $timeout(function() {
          var promise = $animate.leave(loadingBarContainer, _completeAnimation);
          if (promise && promise.then) {
            promise.then(_completeAnimation);
          }
          $animate.leave(spinner);
        }, 500);
      }

      return {
        start            : _start,
        set              : _set,
        status           : _status,
        inc              : _inc,
        complete         : _complete,
        includeSpinner   : this.includeSpinner,
        latencyThreshold : this.latencyThreshold,
        parentSelector   : this.parentSelector,
        startSize        : this.startSize
      };


    }];     //
  });       // wtf javascript. srsly
})();       //
;
$(document).ready(function () {
    // Word settings
    // --------------------------------
    $("#display-menu-text").click(function () {
        // display
        $("#page-overlay, #sort-options").show();
    });
    // hide
    $("#page-overlay").click(function () {
        $("#page-overlay, #word-settings").hide();
    });
});



$(document).on("click", ".display-menu-text", function() {
        $("#sort-options").toggle();
});

$(document).on("mouseover", ".word-container", function() {
        $(".delete-word").show();

        // hide
        $("#words-container").mouseover(function () {
            $(".delete-word").hide();
        });

});

// Angular Rails Template
// source: app/assets/javascripts/templates/_login.html

angular.module("templates").run(["$templateCache", function($templateCache) {
  $templateCache.put("_login.html", '<div class="page-header">\n  <h1>Log In</h1>\n</div>\n\n<form ng-submit="login()">\n  <div class="input-group">\n    <input type="email" class="form-control" placeholder="Email" ng-model="user.email">\n  </div>\n  <div class="input-group">\n    <input type="password" class="form-control" placeholder="Password" ng-model="user.password">\n  </div>\n  <input type="submit" class="btn btn-default" value="Log In">\n</form>')
}]);

// Angular Rails Template
// source: app/assets/javascripts/templates/_register.html

angular.module("templates").run(["$templateCache", function($templateCache) {
  $templateCache.put("_register.html", '<div class="page-header">\n  <h1>Register</h1>\n</div>\n\n<form ng-submit="register()">\n  <div class="input-group">\n    <input type="email" class="form-control" placeholder="Email" ng-model="user.email">\n  </div>\n  <div class="input-group">\n    <input type="text" class="form-control" placeholder="Username" ng-model="user.username">\n  </div>\n  <div class="input-group">\n    <input type="password" class="form-control" placeholder="Password" ng-model="user.password">\n  </div>\n  <input type="submit" class="btn btn-default" value="Register">\n</form>')
}]);

// Angular Rails Template
// source: app/assets/javascripts/templates/dashboard.html

angular.module("templates").run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboard.html", '<div ng-controller="MainCtrl">\n\n    <!-- list dashboard -->\n    <section id="list-dashboard">\n\n      <!-- list all lists -->\n      <select class="list-select" ng-model="list" ng-options="list as list.title for list in lists">\n          <option value="">Select List</option>\n      </select>\n      <!-- end list -->\n\n      <!-- delete list -->\n      <form ng-if="list.id !== nil" ng-submit="deleteList($index)" id="delete-list">\n        <input class="icon" type="image" src="delete.png" alt="Submit">\n      </form>\n      <!-- end delete -->\n\n      <!-- add a list -->\n      <form ng-submit="addList()" id="add-list">\n        <input class="search-form add-list" type="text" ng-model="title" placeholder="Create a list"></input>\n        <input class="icon" type="image" src="add.png" alt="Submit">\n      </form>\n      <!-- end add -->\n\n\n    </section>\n    <!-- end list dashboard -->\n\n\n    <hr class="dash">\n\n\n    <!-- words dashboard -->\n    <section id="words-dashboard">\n\n      <div ng-if="list.id === nil">\n        <span>Select/Create a list</span>\n      </div>\n\n      <div ng-if="list.id !== nil">\n\n        <!-- add word -->\n        <form ng-submit="addWord()" id="add-word">\n          <input type="text" class="search-form" ng-model="$parent.word" placeholder="Add word(s)"></input>\n          <input class="icon search-icon" type="image" src="search-icon.png" alt="Submit">\n        </form>\n        <!-- end add -->\n\n        <div id="display-options-container">\n          <!-- sort -->\n          <span class="display-menu-text blue"><select class="sort-option" ng-model="$parent.selectedOrder" ng-options="option.name for option in options"></select></span>\n\n          <span class="display-menu-text"><input class="sort-option" ng-model="$parent.searchText" placeholder="name, speech, etc."></span>\n\n          <span class="display-menu-text"><input type="checkbox" ng-model="$parent.minimal" aria-label="Toggle ngHide">Collapse</span>\n          <!-- end -->\n\n\n\n            <!--<table id="sort-options">\n              <tr>\n                <td>Sort:</td>\n                <td>Filter:</td>    \n                <td>Display:</td>\n              </tr>\n              <tr>\n                <td>\n                  <select class="sort-option" ng-model="$parent.selectedOrder" ng-options="option.value for option in options"></select>\n                </td>\n                <td><input class="search-form sort-option" ng-model="$parent.searchText" placeholder="name, speech, etc."></td>    \n                <td>Collapse: <input type="checkbox" ng-model="$parent.minimal" aria-label="Toggle ngHide"></td>\n              </tr>\n              <tr>\n                <td></td>\n                <td></td>    \n                <td>Date: <input type="checkbox" ng-model="$parent.minimal" aria-label="Toggle ngHide"></td>\n              </tr>\n            </table>-->\n\n\n        </div>\n\n      </div>\n\n    </section>\n\n    <!-- list all words in list -->\n    <div id="words-container" ui-tree>\n\n      <ol ui-tree-nodes="" ng-model="list.words">\n\n        <!-- words in list -->\n        <li ng-repeat="word in list.words | orderBy:selectedOrder.value:selectedOrder.reversed | filter:searchText" class=\'word word-container\' id="word-{{word.id}}" ui-tree-node>\n\n          <!-- delete word -->\n          <form ng-submit="deleteWord(word.id, word)">\n            <abbr title="Delete"><input class="delete-icon icon delete-word" type="image" src="delete.png" alt="Submit"></abbr>\n          </form>\n          <!-- end delete -->\n\n          <p ui-tree-handle class="word">{{ word.title }}</p>\n\n          <section id="minimal" ng-hide="minimal">\n\n            <p class="speech">{{ word.speech }}</p>\n\n            <ol ng-repeat="w in word.definitions">\n              <li role="definition">{{ w.meaning }}</li>\n              <p class="example" ng-if="w.examples[0] !== nil">{{ w.examples[0] }}</p>\n            </ol>\n\n            <p>Created at: {{word.created_at}}</p>\n\n          </section>\n\n        </li>\n      </ol>\n\n    </div>\n    <!-- end words -->\n\n\n</div>')
}]);

// Angular Rails Template
// source: app/assets/javascripts/templates/home.html

angular.module("templates").run(["$templateCache", function($templateCache) {
  $templateCache.put("home.html", '	<!-- start search -->\n	<div class="search">\n		<abbr title="Search">\n\n        <!-- add word -->\n        <form ng-submit="addWord()" id="add-word">\n          <input type="text" class="search-form" id="index-search" ng-model="$parent.word" placeholder="Enter words to find definitions..." autofocus></input>\n          <input class="search-glass" type="image" src="search-icon.png" alt="Submit">\n        </form>\n        <!-- end add -->\n\n		</abbr>									\n	</div>\n	<!-- /search -->\n\n	<!-- welcome message -->\n	<div id="welcome-message">\n\n		<!-- heroku test -->\n		\n		<p>Welcome,</p>\n		<p>Search and create vocabulary lists from Google\'s Definition API...</p>\n		\n		<p style="margin-top: 25px;" class="grey-text">\n			[ <a class="underline-hover" href="http://github.com/blnr/Diction#readme">continue reading...</a> ]\n		</p>\n		\n	</div>\n	<!-- /welcome message -->\n\n	<!-- page transition -->\n	<div class="loader">\n	    <div class="bar"></div>\n	    <div class="bar"></div>\n	    <div class="bar"></div>\n	</div>\n	<!-- /page transition -->\n\n	<!-- start footer -->\n	<footer>\n		<div id="footer-container"><hr>\n\n			<span>( <a href="http://github.com/blnr/Diction">GitHub</a> )</span>\n			<span>( &lt;/> in Baltimore by: Kyle Belanger )</span>\n\n		</div>\n	</footer>\n	<!-- /footer -->')
}]);

// Angular Rails Template
// source: app/assets/javascripts/templates/list.html

angular.module("templates").run(["$templateCache", function($templateCache) {
  $templateCache.put("list.html", '<h3>{{list.title}}</h3>\n\n<!-- add word -->\n<form ng-submit="addWord()">\n  <input type="text" ng-model="title"></input>\n  <button type="submit">Add</button>\n</form>\n<!-- end add -->\n\n\n<div ng-repeat="word in list.words">\n\n {{ word.title }}\n {{ word.date }}<br>\n {{ word.full_data.data[0]["dictionary"]["definitionData"][0]["meanings"][1]["meaning"] }}\n\n<!-- add word -->\n<form ng-submit="deleteWord()">\n  <button type="submit">delete</button>\n</form>\n<!-- end add -->\n\n    <!-- definitions -->\n    <ol ng-repeat="d in word.full_data.data[0]["dictionary"]["definitionData"][0]["meanings"]">\n    	<li>{{ d.meaning }}\n    </ol>\n\n<hr>\n</div>\n\n<hr>\n</div>')
}]);

// Angular Rails Template
// source: app/assets/javascripts/templates/search.html

angular.module("templates").run(["$templateCache", function($templateCache) {
  $templateCache.put("search.html", '<div ng-controller="SearchCtrl">\n\n    <!-- list dashboard -->\n    <section id="list-dashboard">\n\n      <!-- list all lists -->\n      <select id="list-select" class="list-select" ng-model="list" ng-init="list = lists[0]" ng-options="list as list.title for list in lists">\n          <option value="">Select List</option>\n      </select>\n      <!-- end list -->\n\n      <!-- delete list -->\n      <form ng-if="lists.length > 0" ng-submit="deleteList($index)" id="delete-list">\n        <input class="icon" type="image" src="delete.png" alt="Submit">\n      </form>\n      <!-- end delete -->\n\n      <!-- add a list -->\n      <form ng-submit="addList()" id="add-list">\n        <input class="search-form add-list" type="text" ng-model="title" placeholder="Create a list"></input>\n        <input class="icon" type="image" src="add.png" alt="Submit">\n      </form>\n      <!-- end add -->\n\n    </section>\n    <!-- end list dashboard -->\n\n\n    <hr class="dash">\n\n\n    <!-- words dashboard -->\n    <section id="words-dashboard">\n\n      <div ng-if="lists.length <= 0">\n        <span>Select/Create a list</span>\n      </div>\n\n      <div ng-if="lists.length > 0">\n\n        <!-- add word -->\n        <form ng-submit="addWord()" id="add-word">\n          <input type="text" class="search-form" ng-model="$parent.word" placeholder="Add word(s)"></input>\n          <input class="icon search-icon" type="image" src="search-icon.png" alt="Submit">\n        </form>\n        <!-- end add -->\n\n        <div id="display-options-container">\n          <!-- sort -->\n          <span class="display-menu-text blue"><select class="sort-option" ng-init="option = options[0]" ng-model="$parent.selectedOrder" ng-options="option.name for option in options"></select></span>\n\n          <span class="display-menu-text"><input class="sort-option" ng-model="$parent.searchText" placeholder="name, speech, etc."></span>\n\n          <span class="display-menu-text"><input type="checkbox" ng-model="$parent.minimal" aria-label="Toggle ngHide">Collapse</span>\n          <!-- end -->\n\n        </div>\n\n      </div>\n\n    </section>\n\n    <!-- list all words in list -->\n    <div id="words-container" ui-tree>\n\n      <ol ui-tree-nodes="" ng-model="list.words">\n\n        <!-- words in list -->\n        <li ng-repeat="word in list.words | orderBy:selectedOrder.value:selectedOrder.reversed | filter:searchText" class=\'word word-container\' id="word-{{word.id}}" ui-tree-node>\n\n          <!-- delete word -->\n          <form ng-submit="deleteWord(word.id, word)">\n            <abbr title="Delete"><input class="delete-icon icon delete-word" type="image" src="delete.png" alt="Submit"></abbr>\n          </form>\n          <!-- end delete -->\n\n          <p ui-tree-handle class="word">{{ word.title }}</p>\n\n          <section id="minimal" ng-hide="minimal">\n\n            <p class="speech">{{ word.speech }}</p>\n\n            <ol class="definitions" ng-repeat="w in word.definitions">\n              <li role="definition">{{ w.meaning }}</li>\n              <p class="example" ng-if="w.examples[0] !== nil">{{ w.examples[0] }}</p>\n            </ol>\n\n            <p>Created at: {{word.date}}</p>\n\n          </section>\n\n        </li>\n      </ol>\n\n    </div>\n    <!-- end words -->\n\n\n</div>')
}]);





angular.module('d-angular', ['ui.router', 'templates', 'ui.tree', 'Devise', 'angular-loading-bar'])

// Set routing/configuration
// ------------------------------
.config(['$stateProvider', '$urlRouterProvider',

	// Set state providers
	function($stateProvider, $urlRouterProvider) {$stateProvider

		// Splash state
		.state('home', {
		  url: '/home',
		  templateUrl: 'home.html',
		  controller: 'SearchCtrl',
	      onEnter: ['$state', 'Auth', function($state, Auth) {
	        Auth.currentUser().then(function (){
	          $state.go('dashboard');
	        })
	      }]
		})

		// Search state
	    .state('search', {
	      url: '/search',
	      templateUrl: 'search.html',
	      controller: 'SearchCtrl',
	      onEnter: ['$state', 'Auth', function($state, Auth) {
	        Auth.currentUser().then(function (){
	          $state.go('dashboard');
	        })
	      }]
	    })

		// Dashboard state
		.state('dashboard', {
		  url: '/dashboard',
		  templateUrl: 'dashboard.html',
		  controller: 'MainCtrl',
		  resolve: {
			  listPromise: ['lists', function(lists){
			    return lists.getAll();
			  }]
		  }
		})

		// Login state
	    .state('login', {
	      url: '/login',
	      templateUrl: '_login.html',
	      controller: 'AuthCtrl',
	      onEnter: ['$state', 'Auth', function($state, Auth) {
	        Auth.currentUser().then(function (){
	          $state.go('dashboard');
	        })
	      }]
	    })

	    // Register state
	    .state('register', {
	      url: '/register',
	      templateUrl: '_register.html',
	      controller: 'AuthCtrl',
	      onEnter: ['$state', 'Auth', function($state, Auth) {
	        Auth.currentUser().then(function (){
	          $state.go('dashboard');
	        })
	      }]
	    })

		$urlRouterProvider.otherwise('home');
	}
])


// lists factory
// Factories are used to organize and share code across the app.
// ------------------------------
.factory('lists', ['$http',

	function($http){
		// create new obect with array of lists
		var o = { lists: [] };

	  	// get all lists
		o.getAll = function() {
			return $http.get('/lists.json').success(function(data){
		  		angular.copy(data, o.lists);
			});
		};

		// get specific list
		o.get = function(id) {
		  return $http.get('/lists/' + id + '.json').then(function(res){
		    return res.data;
		  });
		};

		// create list
		o.create = function(post) {
		  return $http.post('/lists.json', post).success(function(data){
		    o.lists.push(data);
		  });
		};

		// delete list
		o.delete = function(id) {
			$http.delete('/lists/' + id + '.json');
		}

		// add word to list
		o.addWord = function(id, word) {
		  return $http.post('/lists/' + id + '/words.json', word);
		};

		o.deleteWord = function(id, word) {
			$http.delete('/lists/' + id + '/words/' + word + '.json');
		}

	  	return o;

	}
])


// Main controller
// ------------------------------
.controller('MainCtrl', ['$scope', '$stateParams', 'Auth', 'lists', '$http',

	// Main scope (used in views)
	function($scope, $stateParams, Auth, lists, $http) {
		
		// array of lists
		$scope.lists = lists.lists;
		$scope.list = lists.lists[$stateParams.id];

	  	// order by options
		$scope.options = [{name: 'Custom Sort', value : null, reversed : false}, {name: 'A > Z', value : 'title', reversed : false}, {name: 'Z > A', value : 'title', reversed : true}, {name: 'Date', value : 'created_at', reversed : true}, {name: 'Speech', value : 'speech', reversed : true}];


		// List functions
		// ------------------------------

		// Add list function
		// Creates a new list
		$scope.addList = function(){
			// prevent empty titles
			if(!$scope.title || $scope.title === '') { 
				return;
			}

			lists.create({
				title: $scope.title,
				date: new Date().toJSON().slice(0,10),
			});

			// reset title
			$scope.title = '';
		};

		$scope.deleteList = function(index) {
			lists.delete($scope.list.id);		// delete in database
			$scope.lists.splice(index, 1);		// delete client side
			// delete all words in list on client side
			$scope.list.words.splice(0, $scope.list.words.length);
		};


		// Word functions
		// ------------------------------

		// Add word function
		$scope.addWord = function(){

			// API URL
			var api_url = "https://www.googleapis.com/scribe/v1/research?key=AIzaSyDqVYORLCUXxSv7zneerIgC2UYMnxvPeqQ&dataset=dictionary&dictionaryLanguage=en&query=";

			// get data from API
			$http.get(api_url + $scope.word)
			.success(function (response) {

				// push new word to array
				lists.addWord($scope.list.id, {
				  	title: 			$scope.word,
				  	pronunciation: 	response.data[0]["groupResult"]["displayName"].replace("<b>", "").replace("</b>", ""),
				  	speech: 		response.data[0]["dictionary"]["definitionData"][0]["wordForms"][0]["form"],
					definitions: 	response.data[0]["dictionary"]["definitionData"][0]["meanings"]
				})
				.success(function(word) {
					$scope.list.words.push(word);
				});

				// reset title
				$scope.word = '';
			});

		};

		// Delete word from list
		$scope.deleteWord = function(word_id, word) {
			lists.deleteWord($scope.list.id, word_id);						// delete from database
			$scope.list.words.splice($scope.list.words.indexOf(word), 1);	// delete on cleint side
		};


	}

])


// Search controller
// Static client side if users are not logged in
// ------------------------------
.controller('SearchCtrl', ['$scope', '$stateParams', 'Auth', 'lists', '$http', '$window',

	// Main scope (used in views)
	function($scope, $stateParams, Auth, lists, $http, $window) {
		
		// array of lists
		$scope.lists = lists.lists;
		$scope.list = lists.lists[$stateParams.id];


	  	// order by options
		$scope.options = [{name: 'Custom Sort', value : null, reversed : false}, {name: 'A > Z', value : 'title', reversed : false}, {name: 'Z > A', value : 'title', reversed : true}, {name: 'Date', value : 'created_at', reversed : true}, {name: 'Speech', value : 'speech', reversed : true}];


		// List functions
		// ------------------------------
		// Add list function
		// Creates a new list
		$scope.addList = function(){
			// prevent empty titles
			if(!$scope.title || $scope.title === '') { 
				return;
			}

			// push new list to array
			$scope.lists.push({
				title: $scope.title, 
				date: new Date(),
				words: []
			});

			// reset title
			$scope.title = '';
		};

		$scope.deleteList = function(index) {
			$scope.lists.splice(index, 1);		// delete client side
			// delete all words in list on client side
			$scope.list.words.splice(0, $scope.list.words.length);
		};


		// Word functions
		// ------------------------------
		// Add word function
		$scope.addWord = function(){

			// if no lists exist, create one
			if($scope.lists.length === 0) {
				// push new list to array
				$scope.lists.push({
					title: "search", 
					date: new Date(),
					value: 0,
					words: []
				});
			}

			// API URL
			var api_url = "https://www.googleapis.com/scribe/v1/research?key=AIzaSyDqVYORLCUXxSv7zneerIgC2UYMnxvPeqQ&dataset=dictionary&dictionaryLanguage=en&query=";

			// split multiple words
			var split = $scope.word.split(", ");
			var	the_word;

			// for each word
			for(i = 0; i < split.length; i++) {
				
				// get data from API
				$http.get(api_url + split[i])

					// handle successful
					.success(function (response) {
						// push new word to array
						$scope.lists[0].words.push({
							title: response.data[0]["groupResult"]["query"],
							// meta
							display: response.data[0]["groupResult"]["displayName"].replace("<b>", "").replace("</b>", ""),
							date: new Date(),
							speech: response.data[0]["dictionary"]["definitionData"][0]["wordForms"][0]["form"],
							definitions: response.data[0]["dictionary"]["definitionData"][0]["meanings"]
						});

						// reset title
						$scope.word = '';

						// load search page
				      	$window.location.assign('/#/search');

				});
			} 
		};

		// Delete word from list
		$scope.deleteWord = function(word_id, word) {
			$scope.list.words.splice($scope.list.words.indexOf(word), 1);	// delete on cleint side
		};
	}
])


// NAV controller
// ------------------------------
.controller('NavCtrl', ['$scope', 'Auth',

	// Main scope (used in views)
	function($scope, Auth) {

		$scope.signedIn = Auth.isAuthenticated;
		$scope.logout = Auth.logout;

		Auth.currentUser().then(function (user){
			$scope.user = user;
		});

		$scope.$on('devise:new-registration', function (e, user){
			$scope.user = user;
		});

		$scope.$on('devise:login', function (e, user){
			$scope.user = user;
		});

		$scope.$on('devise:logout', function (e, user){
			$scope.user = {};
		});
	}

])

// Authentification controller
// ------------------------------
.controller('AuthCtrl', ['$scope', '$state', 'Auth',

// Main scope (used in views)
function($scope, $state, Auth) {

	$scope.login = function() {
		Auth.login($scope.user).then(function(){
		  $state.go('home');
		});
	};

	$scope.register = function() {
		Auth.register($scope.user).then(function(){
		  $state.go('home');
		});
	};

}

]);

