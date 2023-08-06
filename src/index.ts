/**
 * Copyright (c) 2023 ZEP Co., LTD
 */

import "zep-script";
import {ScriptPlayer} from "zep-script";

enum DrawCategory {
    FREE = "자유",
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
    [DrawCategory.FREE]: [],
    [DrawCategory.ANIMAL]: ["쥐", "개", "상어", "앵무새", "거북이", "토끼", "뱀", "사자", "호랑이", "표범", "치타", "하이애나", "기린", "코끼리", "코뿔소", "하마", "악어", "펭귄", "부엉이", "올배미", "곰", "돼지", "소", "닭", "독수리", "타조", "고릴라", "오랑우탄", "원숭이", "코알라", "캥거루", "고래", "상어", "칠면조", "청설모", "판다", "오리", "백조", "고슴도치", "두더지", "두루미", "우파루파", "너구리", "개구리", "두꺼비", "카멜레온", "이구아나", "노루", "제비", "염소", "순록", "바다표범", "박쥐", "참새", "얼룩말", "도롱뇽", "북극곰", "미어캣", "스컹크", "까마귀", "매", "낙타", "여우", "알파카", "사슴", "다람쥐"],
    [DrawCategory.OBJECT]: ["자동차", "자전거", "텔레비전", "컴퓨터", "전화기", "냉장고", "시계", "카메라", "책상", "의자", "침대", "쇼파", "거울", "옷장", "램프", "커피포트", "전기밥솥", "빗자루", "칫솔", "비누", "샴푸", "핸드폰", "컵", "접시", "포크", "스푼", "나이프", "쟁반", "마이크", "헤드폰", "신발", "모자", "가방", "우산", "선글라스", "시계", "장갑", "스카프", "벨트", "목걸이", "팔찌", "귀걸이", "반지", "머리핀", "바지", "셔츠", "드레스", "스커트", "양말", "수영복", "타월", "목욕가운", "파자마", "슬리퍼", "신문", "잡지", "노트북", "연필", "볼펜", "지우개", "자", "테이프", "가위", "붙이", "필통", "색연필", "모니터", "키보드", "마우스", "프린터", "스피커", "이어폰", "충전기", "플래시드라이브", "외장하드", "SD카드", "배터리", "전선", "포스트잇", "스테이플러", "고무줄", "필터", "먼지봉투", "청소기", "압력솥", "토스터", "믹서기", "오븐", "가스레인지", "전기그릴", "전자레인지", "냉동고", "에어컨", "선풍기", "히터", "가습기", "제습기", "물걸레", "먼지뚜껑", "빨래건조대", "빨래세제", "섬유유연제", "휴지", "티슈", "면도기", "폼클렌징", "헤어드라이어", "헤어스프레이", "핸드크림", "립밤", "화장품", "향수", "바디로션", "타투", "피아노", "기타", "드럼", "플루트", "바이올린", "트럼펫", "사진", "그림", "액자", "벽시계", "촛불", "조명", "구슬", "인형", "보드게임", "퍼즐", "레고", "동전", "우표", "엽서", "뱃지", "스티커", "매거진", "포스터"],
    [DrawCategory.JOB]: ["의사", "변호사", "선생님", "공무원", "경찰", "소방관", "간호사", "연구원", "기자", "아나운서", "엔지니어", "디자이너", "작가", "배우", "음악가", "요리사", "피아니스트", "건축가", "편집자", "사진작가", "조종사", "해군", "육군", "승무원", "택시기사", "프로그래머", "비서", "화가", "조각가", "작곡가", "댄서", "코미디언", "사업가", "농부", "어부", "광부", "세무사", "전문가", "스포츠선수", "운동강사", "목수", "금융가", "판매원", "임원", "회계사", "심리학자", "약사", "백화점직원", "중개인", "통역사", "번역가", "광고인", "헤어디자이너", "화장사", "마술사", "조련사", "식품과학자", "화학자", "물리학자", "천문학자", "생물학자", "수학자", "정치가", "사회학자", "역사학자", "철학자", "대통령", "고고학자", "박물관사", "선장", "청소부", "DJ", "영화감독", "치과의사", "통계학자", "생명과학자", "환경과학자", "은행원", "호텔리어", "축구선수", "배구선수", "농구선수", "야구선수", "테니스선수"],
    [DrawCategory.FOOD]: ["김치", "불고기", "비빔밥", "삼겹살", "김밥", "된장찌개", "탕수육", "짬뽕", "라면", "만두", "피자", "스파게티", "햄버거", "치킨", "샌드위치", "초밥", "라자냐", "타코", "부리토", "파스타", "스테이크", "샐러드", "타이 카레", "바비큐", "파이", "케이크", "아이스크림", "도넛", "초콜릿", "크루아상", "와플", "빵", "프렌치토스트", "브런치", "샤브샤브", "해물탕", "갈비탕", "설렁탕", "막걸리", "소주", "떡볶이", "순대", "튀김", "감자튀김", "나초", "치즈볼", "퀘사디아", "마르게리타", "카레", "디미섬", "후라이드 치킨", "양념치킨", "곱창", "족발", "떡갈비", "포키", "핫도그", "막창", "치즈", "무시", "케밥", "팔라펠", "라떼", "아메리카노", "와인", "맥주", "칵테일", "라떼마끼아또", "에스프레소", "샤워크라우트", "치킨커리", "푸드득", "콜라", "팬케이크", "브리토", "텐더론", "소시지", "전", "바게트", "바나나 브레드", "머핀", "요거트", "푸딩", "마카론", "타르트", "닭강정", "빙수", "삼계탕", "국수"],
    [DrawCategory.LOL]: ["가렌", "갈리오", "갱플랭크", "그라가스", "그레이브즈", "그웬", "나르", "나미", "나서스", "나피리", "노틸러스", "녹턴", "누누와 윌럼프", "니달리", "니코", "닐라", "다리우스", "다이애나", "드레이븐", "라이즈", "라칸", "람머스", "럭스", "럼블", "레나타 글라스크", "레넥톤", "레오나", "렉사이", "렐", "렝가", "루시안", "룰루", "르블랑", "리 신", "리븐", "리산드라", "릴리아", "마스터 이", "마오카이", "말자하", "말파이트", "모데카이저", "모르가나", "문도 박사", "미스 포츈", "밀리오", "바드", "바루스", "바이", "베이가", "베인", "벡스", "벨베스", "벨코즈", "볼리베어", "브라움", "브랜드", "블라디미르", "블리츠크랭크", "비에고", "빅토르", "뽀삐", "사미라", "사이온", "사일러스", "샤코", "세나", "세라핀", "세주아니", "세트", "소나", "소라카", "쉔", "쉬바나", "스웨인", "스카너", "시비르", "신 짜오", "신드라", "신지드", "쓰레쉬", "아리", "아무무", "아우렐리온 솔", "아이번", "아지르", "아칼리", "아크샨", "아트록스", "아펠리오스", "알리스타", "애니", "애니비아", "애쉬", "야스오", "에코", "엘리스", "오공", "오른", "오리아나", "올라프", "요네", "요릭", "우디르", "우르곳", "워윅", "유미", "이렐리아", "이블린", "이즈리얼", "일라오이", "자르반 4세", "자야", "자이라", "자크", "잔나", "잭스", "제드", "제라스", "제리", "제이스", "조이", "직스", "진", "질리언", "징크스", "초가스", "카르마", "카밀", "카사딘", "카서스", "카시오페아", "카이사", "카직스", "카타리나", "칼리스타", "케넨", "케이틀린", "케인", "케일", "코그모", "코르키", "퀸", "크산테", "클레드", "키아나", "킨드레드", "타릭", "탈론", "탈리야", "탐 켄치", "트런들", "트리스타나", "트린다미어", "트위스티드 페이트", "트위치", "티모", "파이크", "판테온", "피들스틱", "피오라", "피즈", "하이머딩거", "헤카림"],
    [DrawCategory.SPORT]: [],
    [DrawCategory.POKEMON]: ["피카츄", "이브이", "찰리", "꼬부기", "파이리", "이상해씨", "주뱃", "뮤", "뮤츠", "메타몽", "라이츄", "또가스", "또도", "나옹", "망나뇽", "가디", "포켓볼", "초크볼", "하이퍼볼", "마스터볼", "쥬레곤", "몸통박치기", "냉동펀치", "불대문자", "천둥", "풀묶기", "지진", "스피드스타", "공간왜곡", "씨뿌리기", "용의숨결", "물대포", "회전부리", "솔라빔", "하이드로펌프", "무척동", "토네로스", "아보", "아보크", "피존투", "루주라", "쁘사이저", "꼬마돌", "데구리", "딱구리", "포니타", "날쌩마", "야돈", "야도란", "코일", "레어코일", "파오리", "두두", "두트리오", "쥬쥬", "쥬레곤", "질퍽이", "질뻐기", "셀러", "파르셀", "고오스", "고우스트", "팬텀", "뮤츠", "아라리", "나시", "탕구리", "텅구리", "시라소몬", "홍수몬", "내루미", "또콘", "또도가스", "뿔카노", "코뿌리", "럭키", "덩쿠리", "캥카", "쏘드라", "시드라", "콘치", "왕콘치", "별가사리", "아쿠스타", "마임맨", "스라크", "루주라", "에레브", "마그마", "쁘사이저", "켄타로스", "잉어킹", "갸라도스", "라프라스", "메타몽", "이브이", "샤미드", "쥬피썬더", "부스터", "폴리곤", "암나이트", "암스타", "투구", "투구푸스", "프테라", "잠만보", "프리져", "썬더", "파이어", "카부톱스", "투구푸스", "프테라", "아에로다ク틸", "아르코", "마크탕", "켄타로스", "리자몽", "후딘", "캥카", "켄타로스", "리자몽", "후딘", "후딘보", "앱솔", "스누림", "피콘", "쏘콘", "코코파스", "코코도라", "코리갑", "티고라스", "마치짱", "헬가", "킬로가", "프로토가", "늑골라", "아켄", "아케오스", "발챙이", "슈륙챙이", "갈모매", "비키니몽", "텅비드"],
}

let _currentQuiz = "";
let _currentCategory = "";
let _drawerId = "";
let _start = false;
let _creatorId = "";
let _isMiniGame = false;
let _gameTime = 0;

ScriptApp.onJoinPlayer.Add(function (player: ScriptPlayer) {
    player.tag = {};

    if (ScriptApp.mapHashID == "yPzLZ7") {
        //@ts-ignore
        player.setCameraTarget(70, 27, 0);

    }

    if (player.id == ScriptApp.creatorID) {
        _isMiniGame = true;
        initGame(player);
    } else if (!_creatorId) {
        _creatorId = player.id;
        initGame(player);
    }
});

ScriptApp.onLeavePlayer.Add(function (player) {
    if (_drawerId === player.id) {
        initGame(ScriptApp.players[Math.floor(Math.random() * ScriptApp.players.length)]);
    }
})

function initGame(player: ScriptPlayer) {
    _start = false;
    for (let player of ScriptApp.players) {
        player.tag.join = false;
    }
    if (player.tag.widget) {
        player.tag.widget.destroy();
        player.tag.widget = null;
    }
    if (player.tag.selectWidget) {
        player.tag.selectWidget.destroy();
        player.tag.selectWidget = null;
    }
    _drawerId = player.id;
    player.tag.initCount = 10;
    player.tag.selectWidget = player.showWidget("selectCategory.html", "middle", 360, 400);
    //@ts-ignore
    player.tag.selectWidget.onMessage.Add(function (player: ScriptPlayer, data) {
        const type = data.type;
        if (type == "selectCategory") {
            let category = data.category;
            if (category === "FREE") {
                if (player.tag.selectWidget) {
                    player.tag.selectWidget.destroy();
                    player.tag.selectWidget = null;
                }
                player.showPrompt("문제 직접 입력", function (inputText) {
                        if (inputText) {
                            _currentQuiz = inputText;
                            _currentCategory = DrawCategory.FREE;
                            startGame();
                        } else {
                            if (_isMiniGame) {
                                ScriptApp.forceDestroy();
                            } else {
                                initGame(ScriptApp.players[Math.floor(Math.random() * ScriptApp.players.length)]);
                            }
                        }
                    },
                    //@ts-ignore
                    {
                        content: "문제의 답을 입력해주세요", // 설명
                        confirmVariant: 'primary', // 확인 버튼 색상 'primary' | 'alert'
                        placeholder: '답을 입력해주세요',// 입력칸의 placeholder
                    }
                )
            } else if (Object.keys(DrawCategory).indexOf(category) > 0) {
                if (player.tag.selectWidget) {
                    player.tag.selectWidget.destroy();
                    player.tag.selectWidget = null;
                }
                _currentCategory = DrawCategory[category as keyof typeof DrawCategory];
                _currentQuiz = getRandomQuiz(category);
                startGame();
            } else {
                initGame(ScriptApp.players[Math.floor(Math.random() * ScriptApp.players.length)]);
            }
        } else if (type == "closeWidget") {
            if (_isMiniGame) {
                ScriptApp.forceDestroy();
            } else {
                player.tag.selectWidget.destroy();
                player.tag.selectWidget = null;
                initGame(ScriptApp.players[Math.floor(Math.random() * ScriptApp.players.length)]);
            }
        }
    })
}

function startGame() {
    _gameTime = 60;
    _start = true;
    for (let player of ScriptApp.players) {
        player.tag.join = true;
    }
    // let category = DrawCategory.FREE
    // if (!quiz) {
    //     category = getRandomCategory();
    //     _currentQuiz = getRandomQuiz(category);
    // }

    // _drawerId = ScriptApp.players[Math.floor(Math.random() * ScriptApp.players.length)].id;
    const drawerName = ScriptApp.getPlayerByID(_drawerId).name;
    for (const player of ScriptApp.players) {
        if (!player) continue;
        if (player.tag.widget) {
            player.tag.widget.destroy();
        }
        if (player.isMobile) {
            player.tag.widget = player.showWidget("canvas.html", "sidebar", 750, 500);
        } else {
            player.tag.widget = player.showWidget("canvas.html", "middleleft", 750, 500);
        }
        player.tag.widget.sendMessage({
            type: "init",
            category: _currentCategory,
            quiz: _currentQuiz,
            drawerName: drawerName,
            isMobile: player.isMobile,
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

function getRandomCategory(): DrawCategory {
    return DrawCategory.ANIMAL;
}

function getRandomQuiz(category: keyof typeof DrawCategory) {
    let quizArr = _quizDB[getCategoryDescription(category)];
    return quizArr[Math.floor(Math.random() * quizArr.length)]
}

function getCategoryDescription(key: keyof typeof DrawCategory): DrawCategory {
    return DrawCategory[key];
}

function showCorrectLabel(player: ScriptPlayer | null, key: string, correct = true) {
    let str = "";
    let emoji = "🌈 ";
    let fontColor = "#270";
    let color = "rgba(223, 242, 191, 0.8)";
    let borderColor = "rgba(36, 241, 6, 0.46)";
    let boxShadow = "box-shadow: 0px 0px 2px #259c08";
    if (correct === false) {
        emoji = "❌ ";
        fontColor = "#D8000C";
        color = "rgba(255, 186, 186, 0.8)";
        borderColor = "rgba(241, 6, 6, 0.81)";
    }
    str = `<span
		style="
		color: ${fontColor};
			position: absolute;
			margin: auto;
			display: flex;
			align-items: center;
			justify-content: center;
			height: 75px;
			width: 90%;
			background-color: ${color};
			border-radius: 5px;
			border-style: solid;
			border-color: ${borderColor};
			border-width: 1px;
			box-shadow: ${boxShadow};
		"
	>${emoji} ${key}</span>`;
    if (player) {
        player.showCustomLabel(str, 0xffffff, 0x000000, 0, 100, 1, 1500);
    } else {
        ScriptApp.showCustomLabel(str, 0xffffff, 0x000000, 0, 100, 1, 1500);
    }
}

let one_sec = 1;


function handleDrawerSelectionTimeout() {
    const drawerPlayer = ScriptApp.getPlayerByID(_drawerId);

    if (!drawerPlayer) return;

    showCorrectLabel(
        null,
        `${drawerPlayer.name}님이 주제를 선택하고 있습니다..\n [ ${drawerPlayer.tag.initCount--} 초 후 다른 플레이어에게 선택권이 넘어갑니다. ]`
    );

    if (drawerPlayer.tag.initCount <= 0) {
        initGame(ScriptApp.players[Math.floor(Math.random() * ScriptApp.players.length)]);
    }
}

function handleGameInProgress() {
    for (const player of ScriptApp.players) {
        if (player.tag.join) {
            showCorrectLabel(player, `정답이라고 생각하는 단어를 채팅으로 입력해보세요.\n[ 라운드 종료까지 ${_gameTime--}초 ]`);
            if (_gameTime <= 0) {
                initGame(ScriptApp.players[Math.floor(Math.random() * ScriptApp.players.length)])
            }
        } else {
            showCorrectLabel(player, `현재 게임이 진행중 입니다. 잠시만 기다려주세요.`);
        }
    }
}

ScriptApp.onUpdate.Add((dt) => {
    if (one_sec > 0) {
        one_sec -= dt;
        if (one_sec < 0) {
            one_sec = 1;
            if (!_start) {
                handleDrawerSelectionTimeout();
            } else {
                handleGameInProgress();
            }
        }
    }
});

ScriptApp.onSay.Add((player, text) => {
    if (text == "!start") {
        startGame();
    }

    if (_start === true) {
        if (player.id === _drawerId) return;
        if (text === _currentQuiz) {
            _start = false;
            ScriptApp.playSound("correct.mp3", false, true);
            ScriptApp.showCenterLabel(`\n${player.name}님 정답!\n`, 0x000000, 0xffffff, 120, 6000);

            initGame(player);
            // for (const player of ScriptApp.players) {
            //     if (!player) continue;
            //     if (player.tag.widget) {
            //         player.tag.widget.destroy();
            //         player.tag.widget = null;
            //     }
            // }
        } else {
            showCorrectLabel(player, `\n틀렸습니다!\n`, false)
            player.playSound("incorrect.mp3", false, true);
        }
    }
})