window.__require=function e(t,n,i){function o(c,a){if(!n[c]){if(!t[c]){var r=c.split("/");if(r=r[r.length-1],!t[r]){var u="function"==typeof __require&&__require;if(!a&&u)return u(r,!0);if(s)return s(r,!0);throw new Error("Cannot find module '"+c+"'")}}var l=n[c]={exports:{}};t[c][0].call(l.exports,function(e){return o(t[c][1][e]||e)},l,l.exports,e,t,n,i)}return n[c].exports}for(var s="function"==typeof __require&&__require,c=0;c<i.length;c++)o(i[c]);return o}({1:[function(e,t,n){function i(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function o(e){return"function"==typeof e}function s(e){return"number"==typeof e}function c(e){return"object"==typeof e&&null!==e}function a(e){return void 0===e}t.exports=i,i.EventEmitter=i,i.prototype._events=void 0,i.prototype._maxListeners=void 0,i.defaultMaxListeners=10,i.prototype.setMaxListeners=function(e){if(!s(e)||e<0||isNaN(e))throw TypeError("n must be a positive number");return this._maxListeners=e,this},i.prototype.emit=function(e){var t,n,i,s,r,u;if(this._events||(this._events={}),"error"===e&&(!this._events.error||c(this._events.error)&&!this._events.error.length)){if((t=arguments[1])instanceof Error)throw t;var l=new Error('Uncaught, unspecified "error" event. ('+t+")");throw l.context=t,l}if(a(n=this._events[e]))return!1;if(o(n))switch(arguments.length){case 1:n.call(this);break;case 2:n.call(this,arguments[1]);break;case 3:n.call(this,arguments[1],arguments[2]);break;default:s=Array.prototype.slice.call(arguments,1),n.apply(this,s)}else if(c(n))for(s=Array.prototype.slice.call(arguments,1),i=(u=n.slice()).length,r=0;r<i;r++)u[r].apply(this,s);return!0},i.prototype.addListener=function(e,t){var n;if(!o(t))throw TypeError("listener must be a function");return this._events||(this._events={}),this._events.newListener&&this.emit("newListener",e,o(t.listener)?t.listener:t),this._events[e]?c(this._events[e])?this._events[e].push(t):this._events[e]=[this._events[e],t]:this._events[e]=t,c(this._events[e])&&!this._events[e].warned&&(n=a(this._maxListeners)?i.defaultMaxListeners:this._maxListeners)&&n>0&&this._events[e].length>n&&(this._events[e].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[e].length),"function"==typeof console.trace&&console.trace()),this},i.prototype.on=i.prototype.addListener,i.prototype.once=function(e,t){if(!o(t))throw TypeError("listener must be a function");var n=!1;function i(){this.removeListener(e,i),n||(n=!0,t.apply(this,arguments))}return i.listener=t,this.on(e,i),this},i.prototype.removeListener=function(e,t){var n,i,s,a;if(!o(t))throw TypeError("listener must be a function");if(!this._events||!this._events[e])return this;if(s=(n=this._events[e]).length,i=-1,n===t||o(n.listener)&&n.listener===t)delete this._events[e],this._events.removeListener&&this.emit("removeListener",e,t);else if(c(n)){for(a=s;a-- >0;)if(n[a]===t||n[a].listener&&n[a].listener===t){i=a;break}if(i<0)return this;1===n.length?(n.length=0,delete this._events[e]):n.splice(i,1),this._events.removeListener&&this.emit("removeListener",e,t)}return this},i.prototype.removeAllListeners=function(e){var t,n;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[e]&&delete this._events[e],this;if(0===arguments.length){for(t in this._events)"removeListener"!==t&&this.removeAllListeners(t);return this.removeAllListeners("removeListener"),this._events={},this}if(o(n=this._events[e]))this.removeListener(e,n);else if(n)for(;n.length;)this.removeListener(e,n[n.length-1]);return delete this._events[e],this},i.prototype.listeners=function(e){return this._events&&this._events[e]?o(this._events[e])?[this._events[e]]:this._events[e].slice():[]},i.prototype.listenerCount=function(e){if(this._events){var t=this._events[e];if(o(t))return 1;if(t)return t.length}return 0},i.listenerCount=function(e,t){return e.listenerCount(t)}},{}],LoseGame:[function(e,t,n){"use strict";cc._RF.push(t,"23a29CTqBlC1bFaQF0Hwhuw","LoseGame");var i=e("mEmitter"),o=e("Variables");cc.Class({extends:cc.Component,properties:{playAgainBtn:cc.Node,labelScore:cc.Label,boardGame:cc.Node,Ala:cc.Node},onLoad:function(){i.instance.registerEvent("showPopupLoseGame",this._animOpenPopup.bind(this)),this.node.y=1e3,this.node.active=!1},_animOpenPopup:function(e){var t=this;this.node.active=!0,o.game.enabled=!1,o.audio.playSoundLose(),this._animAla(),cc.tween(this.boardGame).to(.5,{opacity:50}).start(),cc.tween(this.node).to(1,{position:cc.v2(0,0)},{easing:"backInOut"}).call(function(){t._animOpenBtnPlayAgain(),t.labelScore.string=0,t._animScore(e)}).start()},_animationBtn:function(){},_animHidePopup:function(){cc.tween(this.boardGame).to(.5,{opacity:255}).start(),cc.tween(this.node).to(1,{position:cc.v2(0,1e3)}).start()},_animOpenBtnPlayAgain:function(){var e=cc.repeatForever(cc.sequence(cc.scaleBy(1,.9,1.1),cc.scaleTo(1,1,1))).easing(cc.easeBackInOut(.5));this.playAgainBtn.runAction(e).easing(cc.easeBackInOut(.5))},_animScore:function(e){var t=this;cc.tween({value:0}).to(2,{value:e},{progress:function(e,n,i,o){var s=Math.round(n*o);t.labelScore.string=String(s)}}).start()},_animAla:function(){var e=cc.scaleTo(2,1.2,1.2),t=cc.scaleTo(2,1,1),n=cc.repeatForever(cc.sequence(e,t));this.Ala.runAction(n)},start:function(){},onClickPlayAgainBtn:function(){this._animHidePopup(),this.boardGame.opacity=255,o.audio.pauseSoundLose(),o.game.enabled=!0}}),cc._RF.pop()},{Variables:"Variables",mEmitter:"mEmitter"}],Variables:[function(e,t,n){"use strict";cc._RF.push(t,"53c315CYmVAgraEqJPqbzKy","Variables");t.exports={rows:4,cols:4,numbers:[2,4],blocks:[],data:[],positions:[],scoreGame:0,scoreExtra:0,bestScoreGame:0,isNoneSound:!1,isNondMusic:!1,isCompleted:!0,isMoved:!1,score:null,bestScore:null,blocksLayout:null,block:null,audio:null,audio1:null,game:null,userData:{score:0,moveStep:0}},cc.Class({extends:cc.Component,properties:{},start:function(){}}),cc._RF.pop()},{}],audio:[function(e,t,n){"use strict";cc._RF.push(t,"30383OlFsZDOo0f0LMTyDQN","audio");var i=e("mEmitter");e("Variables");cc.Class({extends:cc.Component,properties:{musicBackGround:{default:null,type:cc.AudioClip},soundLose:{default:null,type:cc.AudioClip},soundWin:{default:null,type:cc.AudioClip},soundClick:{default:null,type:cc.AudioClip},_isNoneSound:!1,_isNoneMusic:!1},get isNoneSound(){return this._isNoneSound},set isNoneSound(e){return this._isNoneSound=e},get isNoneMusic(){return this._isNoneMusic},set isNoneMusic(e){return this._isNoneMusic=e},onLoad:function(){this.isNoneMusic=!1,i.instance.emit("transAudio",this)},playMusicBackground:function(e){this.pauseAll(),console.log(this.isNoneMusic),this.isNoneMusic||cc.audioEngine.play(this.musicBackGround,e)},playSoundLose:function(){this.pauseAll(),this.isNoneSound||cc.audioEngine.play(this.soundLose,!1)},playSoundWin:function(){if(this.pauseAll(),!this.isNoneSound)return cc.audioEngine.play(this.soundWin,!1)},playSoundClick:function(){if(!this.isNoneSound)return cc.audioEngine.play(this.soundClick,!1)},pauseSoundClick:function(){cc.audioEngine.stop(this.playSoundClick())},pauseSoundWin:function(){cc.audioEngine.stop(this.playSoundWin()),this.playMusicBackground(!1)},pauseSoundLose:function(){cc.audioEngine.stop(this.playSoundWin()),this.playMusicBackground(!1)},pauseAll:function(){cc.audioEngine.pauseAll()},start:function(){}}),cc._RF.pop()},{Variables:"Variables",mEmitter:"mEmitter"}],bestScore:[function(e,t,n){"use strict";cc._RF.push(t,"ac303s7qJNGgbZQ6UpUYXr7","bestScore");var i=e("mEmitter"),o=e("Variables");cc.Class({extends:cc.Component,properties:{bestScoreNumber:cc.Label},onLoad:function(){i.instance.emit("transBestScore",this)},updateBestScore:function(e){this.bestScoreNumber.string=e},saveBestScore:function(e){cc.sys.localStorage.setItem("userData",JSON.stringify(e))},loadBestScore:function(){var e=JSON.parse(cc.sys.localStorage.getItem("userData"));if(null!=e)return this.updateBestScore(e.score),e;this.saveBestScore(o.userData)},start:function(){}}),cc._RF.pop()},{Variables:"Variables",mEmitter:"mEmitter"}],block:[function(e,t,n){"use strict";cc._RF.push(t,"34b8fYIuhBOVbel+3QMMdfw","block");var i=e("mEmitter"),o=e("colors");cc.Class({extends:cc.Component,properties:{labelNum:{default:null,type:cc.Label},background:{default:null,type:cc.Node}},onLoad:function(){i.instance.emit("transBlock",this)},setLabel:function(e){return this.labelNum.string=0==e?"":e,this.node.color=o[e],1},appear:function(){var e=[cc.scaleTo(0,0),cc.scaleTo(.05,1)];this.node.runAction(cc.sequence(e))},merge:function(){var e=[cc.scaleTo(.05,1.3),cc.scaleTo(.05,1)];this.node.runAction(cc.sequence(e))}}),cc._RF.pop()},{colors:"colors",mEmitter:"mEmitter"}],board:[function(e,t,n){"use strict";cc._RF.push(t,"eacb9rmiiNOg5I83YAHp9T6","board");var i=e("Variables"),o=e("mEmitter");cc.Class({extends:cc.Component,properties:{blockPrefab:{default:null,type:cc.Prefab}},onLoad:function(){o.instance.emit("transBlocksLayout",this),o.instance.registerEvent("transAudioSceneWelcomeToMain",this.transAudioSceneWelcomeToMain,this)},transAudioSceneWelcomeToMain:function(e){},start:function(){this.createBlocksLayout(),this.gameInit()},countScore:function(){if(0!=i.scoreExtra){i.scoreGame+=i.scoreExtra;var e=new Object;e.score=i.scoreGame,e.moveStep=10;var t=i.bestScore.loadBestScore();e.score>t.score&&(i.bestScore.saveBestScore(e),i.bestScore.loadBestScore()),i.score.updateExtraScore(i.scoreExtra),i.score.updateScore(i.scoreGame),i.scoreExtra=0}},createdBlock:function(e,t,n,i,o){var s=cc.instantiate(this.blockPrefab);return s.width=e,s.height=t,s.parent=this.node,s.setPosition(cc.v2(n,i)),s.getComponent("block").setLabel(o),s.getComponent("block").appear(),s},createBlocksLayout:function(){for(var e=250,t=0;t<4;t++){i.positions.push([0,0,0,0]);for(var n=-250,o=0;o<i.cols;o++)this.createdBlock(150,150,n,e,0),i.positions[t][o]=cc.v2(n,e),n+=170;e-=170}},getEmptyLocations:function(){for(var e=[],t=0;t<4;t++)for(var n=0;n<4;n++)null==i.blocks[t][n]&&e.push({x:t,y:n});return e},createArray2D:function(e,t,n){for(var i=new Array,o=0;o<e;o++){i[o]=new Array;for(var s=0;s<t;s++)i[o][s]=n}return i},gameInit:function(){i.scoreExtra=0,i.scoreGame=0,i.isCompleted=!0,i.score.updateScore(i.scoreGame),i.blocks=this.createArray2D(4,4,null),i.data=this.createArray2D(4,4,0),this.randomBlock(),this.randomBlock()},randomBlock:function(){var e=this.getEmptyLocations();if(e.length>0){var t=e[Math.floor(Math.random()*e.length)],n=t.x,s=t.y,c=i.numbers[Math.floor(Math.random()*i.numbers.length)],a=this.createdBlock(150,150,i.positions[n][s].x,i.positions[n][s].y,c);i.blocks[n][s]=a,i.data[n][s]=c,a.getComponent("block").appear(),0==(e=this.getEmptyLocations()).length&&this.checkLose()&&(o.instance.emit("showPopupLoseGame",i.scoreGame),o.instance.emit("onDisableKeyDownLoseGame"))}},afterMove:function(){var e=this;if(0!=i.isMoved){var t=[cc.callFunc(function(){e.countScore()}),cc.callFunc(function(){e.randomBlock()}),cc.callFunc(function(){e.checkWin()&&(o.instance.emit("showPopupWinGame",i.scoreGame),o.instance.emit("onDisabledKeyDown"))}),cc.callFunc(function(){i.isCompleted=!0})];this.node.runAction(cc.sequence(t))}else i.isCompleted=!0},moveNode:function(e,t,n){var o=[cc.moveTo(.05,t),cc.callFunc(function(){i.isMoved=!0}),cc.callFunc(function(){n()})];e.runAction(cc.sequence(o))},mergeNode:function(e,t,n,o){e.destroy();var s=[cc.callFunc(function(){t.getComponent("block").setLabel(n)}),cc.callFunc(function(){t.getComponent("block").merge()}),cc.callFunc(function(){i.isMoved=!0}),cc.callFunc(function(){o()})];t.runAction(cc.sequence(s))},moveLeft:function(e,t,n){var o=this;if(0!=t&&0!=i.data[e][t])if(0==i.data[e][t-1]){var s=i.blocks[e][t],c=i.positions[e][t-1];i.blocks[e][t-1]=s,i.data[e][t-1]=i.data[e][t],i.data[e][t]=0,i.blocks[e][t]=null,this.moveNode(s,c,function(){i.isMoved=!0,o.moveLeft(e,t-1,n)})}else{if(i.data[e][t-1]!=i.data[e][t])return void n();var a=i.blocks[e][t],r=i.positions[e][t-1];i.data[e][t-1]*=2,i.scoreExtra+=i.data[e][t-1],i.data[e][t]=0,i.blocks[e][t]=null,this.moveNode(a,r,function(){o.mergeNode(a,i.blocks[e][t-1],i.data[e][t-1],function(){i.isMoved=!0,n()})})}else n()},moveRight:function(e,t,n){var o=this;if(t!=i.rows-1&&0!=i.data[e][t])if(0==i.data[e][t+1]){var s=i.blocks[e][t],c=i.positions[e][t+1];i.blocks[e][t+1]=s,i.data[e][t+1]=i.data[e][t],i.data[e][t]=0,i.blocks[e][t]=null,this.moveNode(s,c,function(){i.isMoved=!0,o.moveRight(e,t+1,n)})}else{if(i.data[e][t+1]!=i.data[e][t])return void n();var a=i.blocks[e][t],r=i.positions[e][t+1];i.data[e][t+1]*=2,i.scoreExtra+=i.data[e][t+1],i.data[e][t]=0,i.blocks[e][t]=null,this.moveNode(a,r,function(){o.mergeNode(a,i.blocks[e][t+1],i.data[e][t+1],function(){i.isMoved=!0,n()})})}else n()},inputRight:function(){for(var e=this,t=[],n=0;n<i.rows;n++)for(var o=i.rows-1;o>=0;o--)0!=i.data[n][o]&&t.push({x:n,y:o});for(var s=0,c=0;c<t.length;++c)this.moveRight(t[c].x,t[c].y,function(){s++,e.checkCounter(s,t)})},inputLeft:function(){for(var e=this,t=[],n=0;n<i.rows;++n)for(var o=0;o<i.rows;++o)0!=i.data[n][o]&&t.push({x:n,y:o});for(var s=0,c=0;c<t.length;++c)this.moveLeft(t[c].x,t[c].y,function(){s++,e.checkCounter(s,t)})},moveUp:function(e,t,n){var o=this;if(0!=e&&0!=i.data[e][t])if(0==i.data[e-1][t]){var s=i.blocks[e][t],c=i.positions[e-1][t];i.blocks[e-1][t]=s,i.data[e-1][t]=i.data[e][t],i.data[e][t]=0,i.blocks[e][t]=null,this.moveNode(s,c,function(){i.isMoved=!0,o.moveUp(e-1,t,n)})}else{if(i.data[e-1][t]!=i.data[e][t])return void n();var a=i.blocks[e][t],r=i.positions[e-1][t];i.data[e-1][t]*=2,i.scoreExtra+=i.data[e-1][t],i.data[e][t]=0,i.blocks[e][t]=null,this.moveNode(a,r,function(){o.mergeNode(a,i.blocks[e-1][t],i.data[e-1][t],function(){i.isMoved=!0,n()})})}else n()},inputUp:function(){for(var e=this,t=[],n=0;n<i.rows;n++)for(var o=0;o<i.rows;o++)0!=i.data[n][o]&&t.push({x:n,y:o});for(var s=0,c=0;c<t.length;++c)this.moveUp(t[c].x,t[c].y,function(){s++,e.checkCounter(s,t)})},moveDown:function(e,t,n){var o=this;if(e!=i.rows-1&&0!=i.data[e][t])if(0==i.data[e+1][t]){var s=i.blocks[e][t],c=i.positions[e+1][t];i.blocks[e+1][t]=s,i.data[e+1][t]=i.data[e][t],i.data[e][t]=0,i.blocks[e][t]=null,this.moveNode(s,c,function(){i.isMoved=!0,o.moveDown(e+1,t,n)})}else{if(i.data[e+1][t]!=i.data[e][t])return void n();var a=i.blocks[e][t],r=i.positions[e+1][t];i.data[e+1][t]*=2,i.scoreExtra+=i.data[e+1][t],i.data[e][t]=0,i.blocks[e][t]=null,this.moveNode(a,r,function(){o.mergeNode(a,i.blocks[e+1][t],i.data[e+1][t],function(){i.isMoved=!0,n()})})}else n()},inputDown:function(){for(var e=this,t=[],n=i.rows-1;n>=0;n--)for(var o=0;o<i.rows;o++)0!=i.data[n][o]&&t.push({x:n,y:o});for(var s=0,c=0;c<t.length;c++)this.moveDown(t[c].x,t[c].y,function(){s++,e.checkCounter(s,t)})},checkCounter:function(e,t){e==t.length&&this.afterMove()},newGame:function(){for(var e=0;e<4;e++)for(var t=0;t<4;t++)null!=i.blocks[e][t]&&i.blocks[e][t].destroy();this.gameInit(),o.instance.emit("onEnableKeyDown"),i.audio1.playSoundClick()},checkWin:function(){for(var e=0;e<i.rows;e++)for(var t=0;t<i.rows;t++)if(2048==i.data[e][t])return!0;return!1},checkLose:function(){for(var e=0;e<4;e++)for(var t=0;t<4;t++)if(3==e&&t<3){if(i.data[e][t]==i.data[e][t+1])return!1}else if(3==t){if(e<3&&i.data[e][t]==i.data[e+1][t])return!1}else if(i.data[e][t]==i.data[e+1][t]||i.data[e][t]==i.data[e][t+1])return!1;return!0}}),cc._RF.pop()},{Variables:"Variables",mEmitter:"mEmitter"}],colors:[function(e,t,n){"use strict";cc._RF.push(t,"a6b59/ai4dHFJwInlj5Eg62","colors");var i={0:cc.color(205,193,179,255),2:cc.color(19,123,192,255),4:cc.color(53,7,172,255),8:cc.color(240,167,110,255),16:cc.color(244,138,89,255),32:cc.color(245,112,85,255),64:cc.color(245,83,52,255),128:cc.color(234,200,103,255),256:cc.color(234,197,87,255),512:cc.color(234,192,71,255),1024:cc.color(146,208,80,255),2048:cc.color(0,176,240,255)};t.exports=i,cc._RF.pop()},{}],game:[function(e,t,n){"use strict";cc._RF.push(t,"59911lEJEtPNLpcVcx2XlqX","game");var i=e("Variables"),o=e("mEmitter");cc.Class({extends:cc.Component,properties:{btnNewGame:cc.Button},onLoad:function(){o.instance.registerEvent("transBlocksLayout",this.transBlocksLayout,this),o.instance.registerEvent("transBlock",this.transBlock,this),o.instance.registerEvent("transScore",this.transScore,this),o.instance.registerEvent("transBestScore",this.transBestScore,this),o.instance.registerEvent("transAudio",this.transAudio,this),o.instance.registerEvent("onEnableKeyDown",this.initEvent.bind(this)),o.instance.registerEvent("onDisabledKeyDown",this.onDisabledKeyDown.bind(this)),o.instance.registerEvent("onDisableKeyDownLoseGame",this.onDisabledKeyDown.bind(this)),i.game=this.btnNewGame,this.initEvent()},init:function(){i.bestScore.loadBestScore()},initEvent:function(){var e=this;cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this),this.node.on("touchstart",function(t){e.startPoint=t.getLocation()}),this.node.on("touchend",function(t){e.TouchEnd(t)})},transAudio:function(e){i.audio1=e,i.audio1.isNoneSound=i.isNoneSound,i.audio1.isNoneMusic=i.isNoneMusic},transBestScore:function(e){i.bestScore=e},transBlocksLayout:function(e){i.blocksLayout=e},transBlock:function(e){i.block=e},transScore:function(e){i.score=e},TouchEnd:function(e){this.endPoint=e.getLocation();var t=this.endPoint.sub(this.startPoint),n=t.mag();1==i.isCompleted&&n>50&&(Math.abs(t.x)>Math.abs(t.y)?t.x>0?(i.isCompleted=!1,i.audio1.playSoundClick(),i.blocksLayout.inputRight(),i.isMoved=!1):(i.isCompleted=!1,i.audio1.playSoundClick(),i.blocksLayout.inputLeft(),i.isMoved=!1):t.y>0?(i.isCompleted=!1,cc.log("up"),i.audio1.playSoundClick(),i.blocksLayout.inputUp(),i.isMoved=!1):(i.isCompleted=!1,i.audio1.playSoundClick(),i.blocksLayout.inputDown(),i.isMoved=!1))},onKeyDown:function(e){if(0!=i.isCompleted)switch(i.isCompleted=!1,e.keyCode){case cc.macro.KEY.down:i.audio1.playSoundClick(),i.blocksLayout.inputDown(),i.isMoved=!1;break;case cc.macro.KEY.up:i.audio1.playSoundClick(),i.blocksLayout.inputUp(),i.isMoved=!1;break;case cc.macro.KEY.left:i.audio1.playSoundClick(),i.blocksLayout.inputLeft(),i.isMoved=!1;break;case cc.macro.KEY.right:i.audio1.playSoundClick(),i.blocksLayout.inputRight(),i.isMoved=!1;break;default:return void(i.isCompleted=!0)}else console.log("not Completed")},onDisabledKeyDown:function(){cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this),this.node.off("touchstart"),this.node.off("touchend")},start:function(){i.bestScore.loadBestScore()},update:function(e){}}),cc._RF.pop()},{Variables:"Variables",mEmitter:"mEmitter"}],mEmitter:[function(e,t,n){"use strict";cc._RF.push(t,"13a4d9O26VMwodN2yJsPgGZ","mEmitter");var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}();function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var s=e("events"),c=function(){function e(){o(this,e),this._emiter=new s,this._emiter.setMaxListeners(100)}return i(e,[{key:"emit",value:function(){var e;(e=this._emiter).emit.apply(e,arguments)}},{key:"registerEvent",value:function(e,t){this._emiter.on(e,t)}},{key:"registerOnce",value:function(e,t){this._emiter.once(e,t)}},{key:"removeEvent",value:function(e,t){this._emiter.removeListener(e,t)}},{key:"destroy",value:function(){this._emiter.removeAllListeners(),this._emiter=null,e.instance=null}}]),e}();c.instance=null,t.exports=c,cc.Class({extends:cc.Component,properties:{},start:function(){}}),cc._RF.pop()},{events:1}],popup:[function(e,t,n){"use strict";cc._RF.push(t,"fe97b87LJ9Mkrk6rTulrKMn","popup");var i=e("mEmitter"),o=e("Variables");cc.Class({extends:cc.Component,properties:{playAgainBtn:cc.Node,labelScore:cc.Label,particle:cc.Node,boardGame:cc.Node},onLoad:function(){i.instance.registerEvent("showPopupWinGame",this._animOpenPopup.bind(this)),this.node.y=1100,this.node.active=!1},_animOpenPopup:function(e){var t=this;o.audio.playSoundWin(),this.node.active=!0,this.particle.active=!1,cc.tween(this.boardGame).to(.5,{opacity:50}).start(),cc.tween(this.node).to(1,{position:cc.v2(0,0)},{easing:"backInOut"}).call(function(){t._animOpenBtnPlayAgain(),t.labelScore.string=0,t._animScore(e)}).start()},_animationBtn:function(){},_animHidePopup:function(){cc.tween(this.boardGame).to(.5,{opacity:255}).start(),cc.tween(this.node).to(1,{position:cc.v2(0,1e3)}).start()},_animOpenBtnPlayAgain:function(){var e=cc.repeatForever(cc.sequence(cc.scaleBy(1,.9,1.1),cc.scaleTo(1,1,1))).easing(cc.easeBackInOut(.5));this.playAgainBtn.runAction(e).easing(cc.easeBackInOut(.5))},_animScore:function(e){var t=this;cc.tween({value:0}).to(2,{value:e},{progress:function(e,n,i,o){var s=Math.round(n*o);t.labelScore.string=String(s)}}).call(function(){t.particle.active=!0}).start()},start:function(){},onClickPlayAgainBtn:function(){this.node.active=!1,this._animHidePopup(),this.particle.active=!1,this.boardGame.opacity=255,o.audio.pauseSoundWin()}}),cc._RF.pop()},{Variables:"Variables",mEmitter:"mEmitter"}],score:[function(e,t,n){"use strict";cc._RF.push(t,"43036c9A1VAnK4eP1MQguIb","score");e("Variables");var i=e("mEmitter");cc.Class({extends:cc.Component,properties:{scoreNumber:cc.Label,scoreExtra:cc.Label,score:0},onLoad:function(){},start:function(){i.instance.emit("transScore",this),this.scoreExtra.node.active=!1},updateExtraScore:function(e){var t=this;if(0!=e){this.scoreExtra.node.active=!0,this.scoreExtra.string="+ "+e;var n=[cc.moveTo(0,0,0),cc.moveTo(.5,0,20),cc.moveTo(0,0,-20),cc.callFunc(function(){t.scoreExtra.node.active=!1}),this.scoreExtra.node.stopAllActions()];this.scoreExtra.node.runAction(cc.sequence(n))}},updateScore:function(e){this.scoreNumber.string=e}}),cc._RF.pop()},{Variables:"Variables",mEmitter:"mEmitter"}],setting:[function(e,t,n){"use strict";cc._RF.push(t,"3e370K5sXlBeps6fYQ66z/F","setting");var i=e("Variables");e("mEmitter");cc.Class({extends:cc.Component,properties:{mainMenu:cc.Node,noneSound:cc.Node,noneMusic:cc.Node,playBtn:cc.Node,_isNoneSound:!1,_isNoneMusic:!1,_isClick:!1},get isClick(){return this._isClick},set isClick(e){return this._isClick=e},onLoad:function(){this.isClick=!1,this.node.y=1e3,this.node.active=!1,this.noneSound.active=this._isNoneSound,this.noneMusic.active=this._isNoneMusic},start:function(){},onClickBtn:function(){console.log(this.isClick),this.isClick?console.log("destroy"):(this.isClick=!1,console.log("open"),this.openPopup())},onClickBtnClose:function(){1==this.isClick&&(i.audio.playSoundClick(),this.hidePopup(),this.isClick=!1)},openPopup:function(){this.isClick||(i.audio.playSoundClick(),this.isClick=!0,this.node.active=!0,this.playBtn.active=!1,cc.tween(this.mainMenu).to(.5,{opacity:20}).start(),cc.tween(this.node).to(1,{position:cc.v2(0,0)},{easing:"backInOut"}).start())},hidePopup:function(){this.playBtn.active=!0,cc.tween(this.mainMenu).to(.5,{opacity:255}).start(),cc.tween(this.node).to(1,{position:cc.v2(0,1e3)}).start()},onClickSound:function(){this.isNoneSound=!this.isNoneSound,this.isNoneSound?(i.audio.pauseSoundClick(),i.audio.isNoneSound=!0,i.isNoneSound=i.audio.isNoneSound):(i.audio.isNoneSound=!1,i.isNoneSound=i.audio.isNoneSound,i.audio.playSoundClick()),this.noneSound.active=this.isNoneSound},onClickMusic:function(){this.isNoneMusic=!this.isNoneMusic,this.isNoneMusic?(i.audio.pauseAll(),i.audio.isNoneMusic=!0,i.isNoneMusic=i.audio.isNoneMusic):(i.audio.playMusicBackground(),i.audio.isNoneMusic=!1,i.isNoneMusic=i.audio.isNoneMusic),this.noneMusic.active=this.isNoneMusic}}),cc._RF.pop()},{Variables:"Variables",mEmitter:"mEmitter"}],welcome:[function(e,t,n){"use strict";cc._RF.push(t,"280c3rsZJJKnZ9RqbALVwtK","welcome");var i=e("Variables"),o=e("mEmitter");cc.Class({extends:cc.Component,properties:{label:{default:null,type:cc.Label},_text:"2048",_isClick:!1,mainMenu:cc.Node,btnPlay:cc.Node,btnSetting:cc.Node,cloud1:cc.Node,cloud2:cc.Node,logo:cc.Node},get isClick(){return this._isClick},set isClick(e){return this._isClick=e},onLoad:function(){var e=this;this.isClick=!1,this.label.string=this._text,this.label.fontSize=200,this.mainMenu.active=!1,cc.tween(this.label.node).to(2,{opacity:0}).call(function(){e._initMainScreen()}).call(function(){i.audio.playMusicBackground(!0)}).start(),o.instance=new o,o.instance.registerEvent("transAudio",this.transAudio,this)},transAudio:function(e){i.audio=e},_initMainScreen:function(){this.mainMenu.active=!0,this.btnPlay.runAction(this._animationBtn()),this.btnSetting.runAction(this._animationBtn()),this.cloud1.runAction(this._animationCloud()),this.cloud2.runAction(this._animationCloud()),this.logo.runAction(this._animLogo())},_animationBtn:function(){return this.anim=cc.repeatForever(cc.sequence(cc.scaleBy(1,.9,1.1),cc.scaleTo(1,1,1))).easing(cc.easeBackInOut(.5))},_animationCloud:function(){return this.anim2=cc.repeatForever(cc.sequence(cc.moveBy(1,cc.v2(-15,0)),cc.moveBy(1,cc.v2(15,0)))).easing(cc.easeBackInOut(.5))},_animLogo:function(){return this.anim3=cc.rotateTo(5,0).easing(cc.easeBackInOut(.5))},onClickBtnPlay:function(){0==this.isClick&&(console.log(i.isNoneSound),i.audio.playSoundClick(),o.instance.emit("transAudioSceneWelcomeToMain",i.audio.isNoneSound),cc.director.loadScene("Main"),this.isClick=!0)}}),cc._RF.pop()},{Variables:"Variables",mEmitter:"mEmitter"}]},{},["LoseGame","Variables","audio","bestScore","block","board","colors","game","mEmitter","popup","score","setting","welcome"]);