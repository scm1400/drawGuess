/**
 * Copyright (c) 2023 ZEP Co., LTD
 */

import "zep-script";
import {ScriptPlayer} from "zep-script";

enum DrawCategory {
    ANIMAL = "동물",
    OBJECT = "사물",
    JOB = "직업",
    FOOD = "음식",
    LOL = "리그오브레전드",
    SPORT = "스포츠",
    POKEMON = "포켓몬"
}

interface CategoryDB extends Record<DrawCategory, string[]> {
}

const _quizDB: CategoryDB = {
    [DrawCategory.ANIMAL]: ["쥐", "개", "상어", "앵무새", "거북이", "토끼", "뱀", "사자", "호랑이", "표범", "치타", "하이애나", "기린", "코끼리", "코뿔소", "하마", "악어", "펭귄", "부엉이", "올배미", "곰", "돼지", "소", "닭", "독수리", "타조", "고릴라", "오랑우탄", "원숭이", "코알라", "캥거루", "고래", "상어", "칠면조", "청설모", "판다", "오리", "백조", "고슴도치", "두더지", "두루미", "우파루파", "너구리", "개구리", "두꺼비", "카멜레온", "이구아나", "노루", "제비", "염소", "순록", "바다표범", "박쥐", "참새", "얼룩말", "도롱뇽", "북극곰", "미어캣", "스컹크", "까마귀", "매", "낙타", "여우", "알파카", "사슴", "다람쥐"],
    [DrawCategory.OBJECT]: [],
    [DrawCategory.JOB]: [],
    [DrawCategory.FOOD]: [],
    [DrawCategory.LOL]: [],
    [DrawCategory.SPORT]: [],
    [DrawCategory.POKEMON]: [],
}


ScriptApp.onJoinPlayer.Add(function (player: ScriptPlayer) {
    player.tag = {};
});

ScriptApp.onSay.Add((player, text) => {
    if (text == "!start") {
        startGame();
    }

    if (_start === true) {
        if (player.id === _drawerId) return;
        if (text === _currentQuiz) {
            _start = false;
            ScriptApp.showCenterLabel(`${player.name}님 정답!`, 0x000000, 0xffffff, 120, 6000);
            for (const player of ScriptApp.players) {
                if (!player) continue;
                if (player.tag.widget) {
                    player.tag.widget.destroy();
                    player.tag.widget = null;
                }
            }
        } else {
            player.showCenterLabel(`땡!`, 0x000000, 0xff0000, 120, 6000);
        }
    }
})

let _currentQuiz = "";
let _drawerId = "";
let _start = false;

function startGame() {
    _start = true;
    let category = getRandomCategory();
    _currentQuiz = getRandomQuiz(category);
    _drawerId = ScriptApp.players[Math.floor(Math.random() * ScriptApp.players.length)].id;
    const drawerName = ScriptApp.getPlayerByID(_drawerId).name;
    for (const player of ScriptApp.players) {
        if (!player) continue;
        player.tag.widget = player.showWidget("canvas.html", "middle", 750, 500);
        player.tag.widget.sendMessage({
            type: "init",
            category: category,
            quiz: _currentQuiz,
            drawerName: drawerName,
            isDrawer: player.id === _drawerId
        })
        //@ts-ignore
        player.tag.widget.onMessage.Add(function (player, data) {
            if (data.type == "sendDrawingData") {
                for (const p of ScriptApp.players) {
                    if (p === player) continue;
                    if (p.tag.widget) {
                        data.type = "drawingNotify";
                        p.tag.widget.sendMessage(data);
                    }
                }
            } else if (data.type == "batchedDrawingData") {
                for (const p of ScriptApp.players) {
                    if (p === player) continue;
                    if (p.tag.widget) {
                        data.type = "batchedDrawingData";
                        p.tag.widget.sendMessage(data);
                    }
                }
            }
        });
    }
}

function getRandomCategory() {
    return DrawCategory.ANIMAL;
}

function getRandomQuiz(category: DrawCategory) {
    let quizArr = _quizDB[category];
    return quizArr[Math.floor(Math.random() * quizArr.length)]
}