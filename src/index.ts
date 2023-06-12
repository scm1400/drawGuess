/**
 * Copyright (c) 2023 ZEP Co., LTD
 */

import "zep-script";
import { ScriptPlayer } from "zep-script";

ScriptApp.onJoinPlayer.Add(function (player: ScriptPlayer) {
	player.tag = {};
	player.tag.widget = player.showWidget("canvas.html", "middle", 600, 600);
	//@ts-ignore
	player.tag.widget.onMessage.Add(function (player, data) {
		if (data.type == "sendDrawingData") {
			for (const p of ScriptApp.players) {
				if (p.tag.widget) {
          data.type = "drawingNotify";
					p.tag.widget.sendMessage(data);
				}
			}
		}
	});
});
