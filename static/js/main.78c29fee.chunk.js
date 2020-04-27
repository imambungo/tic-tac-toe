(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{14:function(e,t,n){},8:function(e,t,n){e.exports=n(9)},9:function(e,t,n){"use strict";n.r(t);var a=n(3),r=n(1),s=n(2),l=n(5),c=n(4),i=n(0),u=n.n(i),o=n(7),m=n.n(o);n(14);function h(e){return u.a.createElement("button",{className:"square",onClick:e.onClick,style:e.highlight?{backgroundColor:"#888"}:{}},e.value)}var g=function(e){Object(l.a)(n,e);var t=Object(c.a)(n);function n(){return Object(r.a)(this,n),t.apply(this,arguments)}return Object(s.a)(n,[{key:"renderSquare",value:function(e){var t=this.props,n=t.squares,a=t.onClick,r=t.winPattern;return u.a.createElement(h,{value:n[e],onClick:function(){return a(e)},highlight:r&&-1!==r.indexOf(e)})}},{key:"render",value:function(){for(var e=0,t=[],n=0;n<3;++n){for(var a=[],r=0;r<3;++r)a.push(this.renderSquare(e++));t.push(u.a.createElement("div",{className:"board-row"},a))}return u.a.createElement(u.a.Fragment,null,t)}}]),n}(u.a.Component);function v(e){var t=e.value,n=e.onToggle;return u.a.createElement("button",{onClick:n},t)}var f=function(e){Object(l.a)(n,e);var t=Object(c.a)(n);function n(e){var s;return Object(r.a)(this,n),(s=t.call(this,e)).calculateWinner=function(e){for(var t=0,n=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];t<n.length;t++){var r=n[t],s=Object(a.a)(r,3),l=s[0],c=s[1],i=s[2];if(e[l]&&e[l]===e[c]&&e[l]===e[i])return[e[l],r]}return[null]},s.handleClick=function(e){var t=s.state.history.slice(0,s.state.stepNumber+1),n=t[t.length-1].squares.slice();s.calculateWinner(n)[0]||n[e]||(n[e]=s.state.xIsNext?"X":"O",s.setState((function(a){return{history:t.concat([{squares:n,tile:e}]),stepNumber:a.stepNumber+1,xIsNext:!a.xIsNext}})))},s.onToggle=function(){console.log("cubo"),s.setState((function(e){var t=e.ascending;return{ascending:!t,toggleValue:t?"ascending":"descending"}}))},s.isTie=function(e){return!e.some((function(e){return null===e}))},s.state={history:[{squares:Array(9).fill(null)}],stepNumber:0,xIsNext:!0,ascending:!0,toggleValue:"descending",winPattern:null},s}return Object(s.a)(n,[{key:"jumpTo",value:function(e){this.setState({stepNumber:e,xIsNext:e%2===0})}},{key:"render",value:function(){var e,t=this,n=this.state.history,r=n[this.state.stepNumber],s=this.calculateWinner(r.squares),l=Object(a.a)(s,2),c=l[0],i=l[1],o=this.isTie(r.squares),m=n.map((function(e,n){var a=e.tile,r=a%3+1,s=Math.floor(a/3)+1,l=n?"Go to move #".concat(n," (").concat(r,",").concat(s,")"):"Go to game start";return n===t.state.stepNumber&&(l=u.a.createElement("b",null,l)),u.a.createElement("li",{key:n},u.a.createElement("button",{onClick:function(){return t.jumpTo(n)}},l))}));return this.state.ascending||m.reverse(),e=c?"Winner: "+c:o?"Draw":"Next player: "+(this.state.xIsNext?"X":"O"),u.a.createElement("div",{className:"game"},u.a.createElement("div",{className:"game-board"},u.a.createElement(g,{squares:r.squares,onClick:this.handleClick,winPattern:i})),u.a.createElement("div",{className:"game-info"},u.a.createElement("div",null,e),u.a.createElement(v,{value:this.state.toggleValue,onToggle:this.onToggle}),this.state.ascending?u.a.createElement("ol",null,m):u.a.createElement("ol",{reversed:!0},m)))}}]),n}(u.a.Component);m.a.render(u.a.createElement(f,null),document.getElementById("root"))}},[[8,1,2]]]);
//# sourceMappingURL=main.78c29fee.chunk.js.map