"use strict";App.onJoinPlayer.Add((function(t){t.tag={},t.tag.widget=t.showWidget("canvas.html","middle",600,600),t.tag.widget.onMessage.Add((function(t,e){if("sendDrawingData"==e.type)for(var a=0,g=App.players;a<g.length;a++){var d=g[a];d.tag.widget&&(e.type="drawingNotify",d.tag.widget.sendMessage(e))}}))}));
//# sourceMappingURL=main.js.map
