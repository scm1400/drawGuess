/**
 * Copyright (c) 2023 ZEP Co., LTD
 */

import "zep-script";
import {ScriptPlayer} from "zep-script";

const Language = {
    ko: "ko",
    en: "en",
    ja: "ja",
}

let _language = Language.ko;

const LocalizeContainer = {
    [Language.ko]: {
        game_turn_info: "((name))님의 그림 | 주제: ((category))",
        choose_topic: "주제 선택",
        category_free: "✏️ 직접 입력",
        category_food: "🍔 음식",
        category_animal: "🐘 동물",
        category_object: "🔎 사물",
        category_job: "👩‍🚀 직업",
        category_pokemon: "🦄 포켓몬스터",
        category_lol: "⚔️ 리그오브레전드",
        prompt_desc: "문제의 답을 입력해주세요.",
        prompt_placeholder: "답을 입력해주세요.",
        label_wrong_text: "오답입니다!",
        label_game_ing: "현재 게임이 진행중 입니다. 잠시만 기다려주세요.\n⏰ 라운드 종료까지 ((time))초",
        label_game_info: "🌈 정답이라고 생각하는 단어를 채팅으로 입력해보세요.\n⏰ 라운드 종료까지 ((time))초",
        label_selecting: "((name))님이 주제를 선택하고 있습니다..\n⏰ ((time)) 초 후 다른 플레이어에게 선택권이 넘어갑니다.",
        label_answer: "정답은 ((answer))!",
        label_answer_player: "((name))님 정답!\n [ 정답: ((answer)) ]",
        text_answer: "정답"
    },
    [Language.en]: {
        game_turn_info: "((name))'s drawing | Topic: ((category))",
        choose_topic: "Choose a topic",
        category_free: "✏️ Enter directly",
        category_food: "🍔Food",
        category_animal: "🐘Animal",
        category_object: "🔎 Object",
        category_job: "👩‍🚀 Job",
        category_pokemon: "🦄 Pokemon",
        category_lol: "⚔️ League of Legends",
        prompt_desc: "Please enter the answer to the question.",
        prompt_placeholder: "Please enter your answer.",
        label_wrong_text: "Wrong answer!",
        label_game_ing: "The game is currently in progress. Please wait a moment.\n⏰ ((time)) seconds until round ends",
        label_game_info: "🌈 Enter the word you think is the correct answer in chat.\n⏰ ((time)) seconds until round ends",
        label_selecting: "((name)) is selecting a topic...\n⏰ The choice will pass to another player in ((time)) seconds.",
        label_answer: "The correct answer is ((answer))!",
        label_answer_player: "((name))'s correct answer!\n [ Answer: ((answer)) ]",
        text_answer: "Correct answer"
    },
    [Language.ja]: {
        game_turn_info: "((name))さんの画像 | トピック: ((category))",
        choose_topic: "トピックの選択",
        category_free: "✏️直接入力",
        category_food: "🍔食品",
        category_animal: "🐘動物",
        category_object: "🔎モノ",
        category_job: "👩‍🚀職業",
        category_pokemon: "🦄ポケットモンスター",
        category_lol: "⚔️リーグオブレジェンド",
        prompt_desc: "問題の答えを入力してください。",
        prompt_placeholder: "答えを入力してください。",
        label_wrong_text: "誤解です！",
        label_game_ing: "現在ゲームが進行中です。しばらくお待ちください。\n⏰ ラウンド終了まで（(time))秒",
        label_game_info: "🌈 正解だと思う単語をチャットに入力してください。\n⏰ ラウンド終了まで((time))秒",
        label_selecting: "((name)) さんがトピックを選択しています。\n ⏰ ((time)) 秒後、他のプレイヤーに選択権があります。",
        label_answer: "正解は((answer))!",
        label_answer_player: "((name)) 正解!\n [ 正解: ((answer)) ]",
        text_answer: "正解"
    }
}

enum DrawCategory {
    FREE = "category_free",
    ANIMAL = "category_animal",
    OBJECT = "category_object",
    JOB = "category_job",
    FOOD = "category_food",
    LOL = "category_lol",
    SPORT = "스포츠",
    POKEMON = "category_pokemon"
}

interface CategoryDB extends Record<string, Record<DrawCategory, string[]>> {
}

const _quizDB: CategoryDB = {
    [Language.ko]: {
        [DrawCategory.FREE]: [],
        [DrawCategory.ANIMAL]: ["쥐", "개", "상어", "앵무새", "거북이", "토끼", "뱀", "사자", "호랑이", "표범", "치타", "하이애나", "기린", "코끼리", "코뿔소", "하마", "악어", "펭귄", "부엉이", "올배미", "곰", "돼지", "소", "닭", "독수리", "타조", "고릴라", "오랑우탄", "원숭이", "코알라", "캥거루", "고래", "상어", "칠면조", "청설모", "판다", "오리", "백조", "고슴도치", "두더지", "두루미", "우파루파", "너구리", "개구리", "두꺼비", "카멜레온", "이구아나", "노루", "제비", "염소", "순록", "바다표범", "박쥐", "참새", "얼룩말", "도롱뇽", "북극곰", "미어캣", "스컹크", "까마귀", "매", "낙타", "여우", "알파카", "사슴", "다람쥐"],
        [DrawCategory.OBJECT]: ["자동차", "자전거", "텔레비전", "컴퓨터", "전화기", "냉장고", "시계", "카메라", "책상", "의자", "침대", "쇼파", "거울", "옷장", "램프", "커피포트", "전기밥솥", "빗자루", "칫솔", "비누", "샴푸", "핸드폰", "컵", "접시", "포크", "스푼", "나이프", "쟁반", "마이크", "헤드폰", "신발", "모자", "가방", "우산", "선글라스", "시계", "장갑", "스카프", "벨트", "목걸이", "팔찌", "귀걸이", "반지", "머리핀", "바지", "셔츠", "드레스", "스커트", "양말", "수영복", "타월", "목욕가운", "파자마", "슬리퍼", "신문", "잡지", "노트북", "연필", "볼펜", "지우개", "자", "테이프", "가위", "붙이", "필통", "색연필", "모니터", "키보드", "마우스", "프린터", "스피커", "이어폰", "충전기", "플래시드라이브", "외장하드", "SD카드", "배터리", "전선", "포스트잇", "스테이플러", "고무줄", "필터", "먼지봉투", "청소기", "압력솥", "토스터", "믹서기", "오븐", "가스레인지", "전기그릴", "전자레인지", "냉동고", "에어컨", "선풍기", "히터", "가습기", "제습기", "물걸레", "먼지뚜껑", "빨래건조대", "빨래세제", "섬유유연제", "휴지", "티슈", "면도기", "폼클렌징", "헤어드라이어", "헤어스프레이", "핸드크림", "립밤", "화장품", "향수", "바디로션", "타투", "피아노", "기타", "드럼", "플루트", "바이올린", "트럼펫", "사진", "그림", "액자", "벽시계", "촛불", "조명", "구슬", "인형", "보드게임", "퍼즐", "레고", "동전", "우표", "엽서", "뱃지", "스티커", "매거진", "포스터"],
        [DrawCategory.JOB]: ["의사", "변호사", "선생님", "공무원", "경찰", "소방관", "간호사", "연구원", "기자", "아나운서", "엔지니어", "디자이너", "작가", "배우", "음악가", "요리사", "피아니스트", "건축가", "편집자", "사진작가", "조종사", "해군", "육군", "승무원", "택시기사", "프로그래머", "비서", "화가", "조각가", "작곡가", "댄서", "코미디언", "사업가", "농부", "어부", "광부", "세무사", "전문가", "스포츠선수", "운동강사", "목수", "금융가", "판매원", "임원", "회계사", "심리학자", "약사", "백화점직원", "중개인", "통역사", "번역가", "광고인", "헤어디자이너", "화장사", "마술사", "조련사", "식품과학자", "화학자", "물리학자", "천문학자", "생물학자", "수학자", "정치가", "사회학자", "역사학자", "철학자", "대통령", "고고학자", "박물관사", "선장", "청소부", "DJ", "영화감독", "치과의사", "통계학자", "생명과학자", "환경과학자", "은행원", "호텔리어", "축구선수", "배구선수", "농구선수", "야구선수", "테니스선수"],
        [DrawCategory.FOOD]: ["김치", "불고기", "비빔밥", "삼겹살", "김밥", "된장찌개", "탕수육", "짬뽕", "라면", "만두", "피자", "스파게티", "햄버거", "치킨", "샌드위치", "초밥", "라자냐", "타코", "부리토", "파스타", "스테이크", "샐러드", "타이 카레", "바비큐", "파이", "케이크", "아이스크림", "도넛", "초콜릿", "크루아상", "와플", "빵", "프렌치토스트", "브런치", "샤브샤브", "해물탕", "갈비탕", "설렁탕", "막걸리", "소주", "떡볶이", "순대", "튀김", "감자튀김", "나초", "치즈볼", "퀘사디아", "마르게리타", "카레", "디미섬", "후라이드 치킨", "양념치킨", "곱창", "족발", "떡갈비", "포키", "핫도그", "막창", "치즈", "무시", "케밥", "팔라펠", "라떼", "아메리카노", "와인", "맥주", "칵테일", "라떼마끼아또", "에스프레소", "샤워크라우트", "치킨커리", "푸드득", "콜라", "팬케이크", "브리토", "텐더론", "소시지", "전", "바게트", "바나나 브레드", "머핀", "요거트", "푸딩", "마카론", "타르트", "닭강정", "빙수", "삼계탕", "국수"],
        [DrawCategory.LOL]: ["가렌", "갈리오", "갱플랭크", "그라가스", "그레이브즈", "그웬", "나르", "나미", "나서스", "나피리", "노틸러스", "녹턴", "누누와 윌럼프", "니달리", "니코", "닐라", "다리우스", "다이애나", "드레이븐", "라이즈", "라칸", "람머스", "럭스", "럼블", "레나타 글라스크", "레넥톤", "레오나", "렉사이", "렐", "렝가", "루시안", "룰루", "르블랑", "리 신", "리븐", "리산드라", "릴리아", "마스터 이", "마오카이", "말자하", "말파이트", "모데카이저", "모르가나", "문도 박사", "미스 포츈", "밀리오", "바드", "바루스", "바이", "베이가", "베인", "벡스", "벨베스", "벨코즈", "볼리베어", "브라움", "브랜드", "블라디미르", "블리츠크랭크", "비에고", "빅토르", "뽀삐", "사미라", "사이온", "사일러스", "샤코", "세나", "세라핀", "세주아니", "세트", "소나", "소라카", "쉔", "쉬바나", "스웨인", "스카너", "시비르", "신 짜오", "신드라", "신지드", "쓰레쉬", "아리", "아무무", "아우렐리온 솔", "아이번", "아지르", "아칼리", "아크샨", "아트록스", "아펠리오스", "알리스타", "애니", "애니비아", "애쉬", "야스오", "에코", "엘리스", "오공", "오른", "오리아나", "올라프", "요네", "요릭", "우디르", "우르곳", "워윅", "유미", "이렐리아", "이블린", "이즈리얼", "일라오이", "자르반 4세", "자야", "자이라", "자크", "잔나", "잭스", "제드", "제라스", "제리", "제이스", "조이", "직스", "진", "질리언", "징크스", "초가스", "카르마", "카밀", "카사딘", "카서스", "카시오페아", "카이사", "카직스", "카타리나", "칼리스타", "케넨", "케이틀린", "케인", "케일", "코그모", "코르키", "퀸", "크산테", "클레드", "키아나", "킨드레드", "타릭", "탈론", "탈리야", "탐 켄치", "트런들", "트리스타나", "트린다미어", "트위스티드 페이트", "트위치", "티모", "파이크", "판테온", "피들스틱", "피오라", "피즈", "하이머딩거", "헤카림"],
        [DrawCategory.SPORT]: [],
        [DrawCategory.POKEMON]: ["피카츄", "이브이", "찰리", "꼬부기", "파이리", "이상해씨", "주뱃", "뮤", "뮤츠", "메타몽", "라이츄", "또가스", "또도", "나옹", "망나뇽", "가디", "포켓볼", "초크볼", "하이퍼볼", "마스터볼", "쥬레곤", "몸통박치기", "냉동펀치", "불대문자", "천둥", "풀묶기", "지진", "스피드스타", "공간왜곡", "씨뿌리기", "용의숨결", "물대포", "회전부리", "솔라빔", "하이드로펌프", "무척동", "토네로스", "아보", "아보크", "피존투", "루주라", "쁘사이저", "꼬마돌", "데구리", "딱구리", "포니타", "날쌩마", "야돈", "야도란", "코일", "레어코일", "파오리", "두두", "두트리오", "쥬쥬", "쥬레곤", "질퍽이", "질뻐기", "셀러", "파르셀", "고오스", "고우스트", "팬텀", "뮤츠", "아라리", "나시", "탕구리", "텅구리", "시라소몬", "홍수몬", "내루미", "또콘", "또도가스", "뿔카노", "코뿌리", "럭키", "덩쿠리", "캥카", "쏘드라", "시드라", "콘치", "왕콘치", "별가사리", "아쿠스타", "마임맨", "스라크", "루주라", "에레브", "마그마", "쁘사이저", "켄타로스", "잉어킹", "갸라도스", "라프라스", "메타몽", "이브이", "샤미드", "쥬피썬더", "부스터", "폴리곤", "암나이트", "암스타", "투구", "투구푸스", "프테라", "잠만보", "프리져", "썬더", "파이어", "카부톱스", "투구푸스", "프테라", "아르코", "마크탕", "리자몽", "후딘", "캥카", "켄타로스", "리자몽", "후딘", "후딘보", "앱솔", "스누림", "피콘", "쏘콘", "코코파스", "코코도라", "코리갑", "티고라스", "마치짱", "헬가", "킬로가", "프로토가", "늑골라", "아켄", "아케오스", "발챙이", "슈륙챙이", "갈모매", "텅비드"],
    },
    [Language.en]: {
        [DrawCategory.FREE]: [],
        [DrawCategory.ANIMAL]: ["Dog", "Cow", "Cat", "Horse", "Donkey", "Tiger", "Lion", "Panther", "Leopard", "Cheetah", "Bear", "Elephant", "Polar bear", "Turtle", "Tortoise", "Crocodile", "Rabbit", "Porcupine", "Hare", "Hen", "Pigeon", "Albatross", "Crow", "Fish", "Dolphin", "Frog", "Whale", "Alligator", "Eagle", "Flying squirrel", "Ostrich", "Fox", "Goat", "Jackal", "Emu", "Armadillo", "Eel", "Goose", "Arctic fox", "Wolf", "Beagle", "Gorilla", "Chimpanzee", "Monkey", "Beaver", "Orangutan", "Antelope", "Bat", "Badger", "Giraffe", "Hermit Crab", "Giant Panda", "Hamster", "Cobra", "Hammerhead shark", "Camel", "Hawk", "Deer", "Chameleon", "Hippopotamus", "Jaguar", "Chihuahua", "King Cobra", "Ibex", "Lizard", "Koala", "Kangaroo", "Iguana", "Llama", "Chinchillas", "Dodo", "Jellyfish", "Rhinoceros", "Hedgehog", "Zebra", "Possum", "Wombat", "Bison", "Bull", "Buffalo", "Sheep", "Meerkat", "Mouse", "Otter", "Sloth", "Owl", "Vulture", "Flamingo", "Racoon", "Mole", "Duck", "Swan", "Lynx", "Monitor lizard", "Elk", "Boar", "Lemur", "Mule", "Baboon", "Mammoth", "Blue whale", "Rat", "Snake", "Peacock",],
        [DrawCategory.OBJECT]: ["Car", "Bicycle", "Television", "Computer", "Telephone", "Refrigerator", "Clock", "Camera", "Desk", "Chair", "Bed", "Sofa", "Mirror", "wardrobe", "lamp", "coffee pot", "rice cooker", "broom", "toothbrush", "soap", "shampoo", "cell phone", "cup", "plate", "fork ", "spoon", "knife", "tray", "microphone", "headphones", "shoes", "hat", "bag", "umbrella", "sunglasses", "watch", "gloves", "Scarf", "Belt", "Necklace", "Bracelet", "Earrings", "Ring", "Hairpin", "Pants", "Shirt", "Dress", "Skirt", "Socks", "Swimsuit", "towel", "bathrobe", "pajamas", "slippers", "newspaper", "magazine", "notebook", "pencil", "ballpoint pen", "eraser", "ruler", "tape", "scissors", "glue", "pencil case", "colored pencils", "monitor", "keyboard", "mouse", "printer", "speakers", "earphones", "charger", "flash drive", "External hard drive", "SD card", "Battery", "Wire", "Post-it", "Stapler", "Rubber band", "Filter", "Dust bag", "Vacuum cleaner", "Pressure cooker", "Toaster", "blender", "oven", "gas range", "electric grill", "microwave", "freezer", "air conditioner", "fan", "heater", "humidifier", "dehumidifier", "wet mop", "dust lid", "clothes drying rack", "laundry detergent", "fabric softener", "toilet paper", "tissue", "razor", "foam cleansing", "hair dryer", "hair spray", "Hand cream", "lip balm", "cosmetics", "perfume", "body lotion", "tattoo", "piano", "guitar", "drum", "flute", "violin", "trumpet", "Photos", "Pictures", "Frames", "Wall clocks", "Candles", "Lights", "Beads", "Dolls", "Board games", "Puzzles", "Lego", "Coins", "Stamps", "Postcard", "Badge", "Sticker", "Magazine", "Poster"],
        [DrawCategory.JOB]: ["Doctor", "Lawyer", "Teacher", "Police", "Firefighter", "Nursing", "Research", "Reporter", "Announcer", "Engineer", "Designer", "Writer", "Actor", "Musician", "Chef", "Pianist", "Architect", "Photographer", "Pilot", "Navy", "Army", "Crew", "Taxi Driver", "Programmer", "Secretary", "Painter", "Composer", "Dancer", "Comedian", "Businessman", "Farmers", "Taxxers", "Professionals", "Sports Player", "Motorists", "Funders", "Financiers", "Executive", "Executive", "Accountants", "Psychologists", "Pharmacists", "Department Store Employees", "Brokers", "Translators", "Translators", "Explainers", "Explainers", "Translator", "Advertiser", "Hair designer", "Cremator", "Magicist", "Trainer", "Food scientist", "Chehemist", "Physicist", "Astronomy", "Biologist", "Mathematician", "Politician", "Sociologist", "Historian", "Philosopher", "President", "Archeologist", "Museum History", "Captain", "DJ", "Film Director", "Dentist", "Bioscientist", "Environmental Scientist", "Banker", "Soccer Player", "Basketball Player", "Baseball Player", "Tennis Player"],
        [DrawCategory.FOOD]: ["acorn squash", "alfalfa sprouts", "almond", "anchovy", "anise", "appetite", "appetizer", "apple", "apricot", "artichoke", "asparagus", "aspic", "ate", "avocado", "bacon", "bagel", "bake", "baked Alaska", "bamboo shoots", "banana", "barbecue", "barley", "basil", "batter", "beancurd", "beans", "beef", "beet", "bell pepper", "berry", "biscuit", "bitter", "black beans", "black tea", "black-eyed peas", "blackberry", "bland", "blood orange", "blueberry", "boil", "bowl", "boysenberry", "bran", "bread", "breadfruit", "breakfast", "brisket", "broccoli", "broil", "brown rice", "brownie", "brunch", "Brussels sprouts", "buckwheat", "buns", "burrito", "butter", "butter bean", "cake", "calorie", "candy", "candy apple", "cantaloupe", "capers", "caramel", "caramel apple", "carbohydrate", "carrot", "cashew", "cassava", "casserole", "cater", "cauliflower", "caviar", "cayenne pepper", "celery", "cereal", "chard", "cheddar", "cheese", "cheesecake", "chef", "cherry", "chew", "chick peas", "chicken", "chili", "chips", "chives", "chocolate", "chopsticks", "chow", "chutney", "cilantro", "cinnamon", "citron", "citrus", "clam", "cloves", "cobbler", "coconut", "cod", "coffee", "coleslaw", "collard greens", "comestibles", "cook", "cookbook", "cookie", "corn", "cornflakes", "cornmeal", "cottage cheese", "crab", "crackers", "cranberry", "cream", "cream cheese", "crepe", "crisp", "crunch", "crust", "cucumber", "cuisine", "cupboard", "cupcake", "curds", "currants", "curry", "custard", "daikon", "daily bread", "dairy", "dandelion greens", "Danish pastry", "dates", "dessert", "diet", "digest", "digestive system", "dill", "dine", "diner", "dinner", "dip", "dish", "dough", "doughnut", "dragonfruit", "dressing", "dried", "drink", "dry", "durian", "eat", "Edam cheese", "edible", "egg", "eggplant", "elderberry", "endive", "entree", "fast", "fat", "fava beans", "feast", "fed", "feed", "fennel", "fig", "fillet", "fire", "fish", "flan", "flax", "flour", "food", "food pyramid", "foodstuffs", "fork", "freezer", "French fries", "fried", "fritter", "frosting", "fruit", "fry", "garlic", "gastronomy", "gelatin", "ginger", "ginger ale", "gingerbread", "glasses", "Gouda cheese", "grain", "granola", "grape", "grapefruit", "grated", "gravy", "green bean", "green tea", "greens", "grub", "guacamole", "guava", "gyro", "halibut", "ham", "hamburger", "hash", "hazelnut", "herbs", "honey", "honeydew", "horseradish", "hot", "hot dog", "hot sauce", "hummus", "hunger", "hungry", "ice", "ice cream", "ice cream cone", "iceberg lettuce", "iced tea", "icing", "jackfruit", "jalapeño", "jam", "jelly", "jellybeans", "jicama", "jimmies", "Jordan almonds", "jug", "juice", "julienne", "junk food", "kale", "kebab", "ketchup", "kettle", "kettle corn", "kidney beans", "kitchen", "kiwi", "knife", "kohlrabi", "kumquat", "ladle", "lamb", "lard", "lasagna", "legumes", "lemon", "lemonade", "lentils", "lettuce", "licorice", "lima beans", "lime", "liver", "loaf", "lobster", "lollipop", "loquat", "lox", "lunch", "lunch box", "lunchmeat", "lychee", "macaroni", "macaroon", "main course", "maize", "mandarin orange", "mango", "maple syrup", "margarine", "marionberry", "marmalade", "marshmallow", "mashed potatoes", "mayonnaise", "meat", "meatball", "meatloaf", "melon", "menu", "meringue", "micronutrient", "milk", "milkshake", "millet", "mincemeat", "minerals", "mint", "mints", "mochi", "molasses", "mole sauce", "mozzarella", "muffin", "mug", "munch", "mushroom", "mussels", "mustard", "mustard greens", "mutton", "napkin", "nectar", "nectarine", "nibble", "noodles", "nosh", "nourish", "nourishment", "nut", "nutmeg", "nutrient", "nutrition", "nutritious", "oatmeal", "oats", "oil", "okra", "oleo", "olive", "omelet", "omnivore", "onion", "orange", "order", "oregano", "oven", "oyster", "pan", "pancake", "papaya", "parsley", "parsnip", "pasta", "pastry", "pate", "patty", "pattypan squash", "pea", "pea pod", "peach", "peanut", "peanut butter", "pear", "pecan", "pepper", "pepperoni", "persimmon", "pickle", "picnic", "pie", "pilaf", "pineapple", "pita bread", "pitcher", "pizza", "plate", "platter", "plum", "poached", "pomegranate", "pomelo", "pop", "popcorn", "popovers", "popsicle", "pork", "pork chops", "pot", "pot roast", "potato", "preserves", "pretzel", "prime rib", "protein", "provisions", "prune", "pudding", "pumpernickel", "pumpkin", "punch", "quiche", "quinoa", "radish", "raisin", "raspberry", "rations", "ravioli", "recipe", "refreshments", "refrigerator", "relish", "restaurant", "rhubarb", "ribs", "rice", "roast", "roll", "rolling pin", "romaine", "rosemary", "rye", "saffron", "sage", "salad", "salami", "salmon", "salsa", "salt", "sandwich", "sauce", "sauerkraut", "sausage", "savory", "scallops", "scrambled", "seaweed", "seeds", "sesame seed", "shallots", "sherbet", "shish kebab", "shrimp", "slaw", "slice", "smoked", "snack", "soda", "soda bread", "sole", "sorbet", "sorghum", "sorrel", "soup", "sour", "sour cream", "soy", "soy sauce", "soybeans", "spaghetti", "spareribs", "spatula", "spices", "spicy", "spinach", "split peas", "spoon", "spork", "sprinkles", "sprouts", "spuds", "squash", "squid", "steak", "stew", "stir-fry", "stomach", "stove", "straw", "strawberry", "string bean", "stringy", "strudel", "sub sandwich", "submarine sandwich", "succotash", "suet", "sugar", "summer squash", "sundae", "sunflower", "supper", "sushi", "sustenance", "sweet", "sweet potato", "Swiss chard", "syrup", "taco", "take-out", "tamale", "tangerine", "tapioca", "taro", "tarragon", "tart", "tea", "teapot", "teriyaki", "thyme", "toast", "toaster", "toffee", "tofu", "tomatillo", "tomato", "torte", "tortilla", "tuber", "tuna", "turkey", "turmeric", "turnip", "ugli fruit", "unleavened", "utensils", "vanilla", "veal", "vegetable", "venison", "vinegar", "vitamin", "wafer", "waffle", "walnut", "wasabi", "water", "water chestnut", "watercress", "watermelon", "wheat", "whey", "whipped cream", "wok", "yam", "yeast", "yogurt", "yolk", "zucchini"],
        [DrawCategory.LOL]: ["AATROX", "AHRI", "AKALI", "AKSHAN", "ALISTAR", "AMUMU", "ANIVIA", "ANNIE", "APHELIOS", "ASHE", "AURELION SOL", "AZIR", "BARD", "BEL'VETH", "BLITZCRANK", "BRAND", "BRAUM", "BRIAR", "CAITLYN", "CAMILLE", "CASSIOPEIA", "CHO'GATH", "CORKI", "DARIUS", "DIANA", "DR. MUNDO", "DRAVEN", "EKKO", "ELISE", "EVELYNN", "EZREAL", "FIDDLESTICKS", "FIORA", "FIZZ", "GALIO", "GANGPLANK", "GAREN", "GNAR", "GRAGAS", "GRAVES", "GWEN", "HECARIM", "HEIMERDINGER", "ILLAOI", "IRELIA", "IVERN", "JANNA", "JARVAN IV", "JAX", "JAYCE", "JHIN", "JINX", "K'SANTE", "KAI'SA", "KALISTA", "KARMA", "KARTHUS", "KASSADIN", "KATARINA", "KAYLE", "KAYN", "KENNEN", "KHA'ZIX", "KINDRED", "KLED", "KOG'MAW", "LEBLANC", "LEE SIN", "LEONA", "LILLIA", "LISSANDRA", "LUCIAN", "LULU", "LUX", "MALPHITE", "MALZAHAR", "MAOKAI", "MASTER YI", "MILIO", "MISS FORTUNE", "MORDEKAISER", "MORGANA", "NAAFIRI", "NAMI", "NASUS", "NAUTILUS", "NEEKO", "NIDALEE", "NILAH", "NOCTURNE", "NUNU & WILLUMP", "OLAF", "ORIANNA", "ORNN", "PANTHEON", "POPPY", "PYKE", "QIYANA", "QUINN", "RAKAN", "RAMMUS", "REK'SAI", "RELL", "RENATA GLASC", "RENEKTON", "RENGAR", "RIVEN", "RUMBLE", "RYZE", "SAMIRA", "SEJUANI", "SENNA", "SERAPHINE", "SETT", "SHACO", "SHEN", "SHYVANA", "SINGED", "SION", "SIVIR", "SKARNER", "SONA", "SORAKA", "SWAIN", "SYLAS", "SYNDRA", "TAHM KENCH", "TALIYAH", "TALON", "TARIC", "TEEMO", "THRESH", "TRISTANA", "TRUNDLE", "TRYNDAMERE", "TWISTED FATE", "TWITCH", "UDYR", "URGOT", "VARUS", "VAYNE", "VEIGAR", "VEL'KOZ", "VEX", "VI", "VIEGO", "VIKTOR", "VLADIMIR", "VOLIBEAR", "WARWICK", "WUKONG", "XAYAH", "XERATH", "XIN ZHAO", "YASUO", "YONE", "YORICK", "YUUMI", "ZAC", "ZED", "ZERI", "ZIGGS", "ZILEAN", "ZOE", "ZYRA"],
        [DrawCategory.SPORT]: [],
        [DrawCategory.POKEMON]: ["Abomasnow", "Abra", "Absol", "Accelgor", "Aegislash", "Aerodactyl", "Aggron", "Aipom", "Alakazam", "Alcremie", "Alomomola", "Altaria", "Amaura", "Ambipom", "Amoonguss", "Ampharos", "Annihilape", "Anorith", "Appletun", "Applin", "Araquanid", "Arbok", "Arboliva", "Arcanine", "Arceus", "Archaludon", "Archen", "Archeops", "Arctibax", "Arctovish", "Arctozolt", "Ariados", "Armaldo", "Armarouge", "Aromatisse", "Aron", "Arrokuda", "Articuno", "Audino", "Aurorus", "Avalugg", "Axew", "Azelf", "Azumarill", "Azurill", "Bagon", "Baltoy", "Banette", "Barbaracle", "Barboach", "Barraskewda", "Basculegion", "Basculin", "Bastiodon", "Baxcalibur", "Bayleef", "Beartic", "Beautifly", "Beedrill", "Beheeyem", "Beldum", "Bellibolt", "Bellossom", "Bellsprout", "Bergmite", "Bewear", "Bibarel", "Bidoof", "Binacle", "Bisharp", "Blacephalon", "Blastoise", "Blaziken", "Blipbug", "Blissey", "Blitzle", "Boldore", "Boltund", "Bombirdier", "Bonsly", "Bouffalant", "Bounsweet", "Braixen", "Brambleghast", "Bramblin", "Braviary", "Breloom", "Brionne", "Bronzong", "Bronzor", "Brute Bonnet", "Bruxish", "Budew", "Buizel", "Bulbasaur", "Buneary", "Bunnelby", "Burmy", "Butterfree", "Buzzwole", "Cacnea", "Cacturne", "Calyrex", "Camerupt", "Capsakid", "Carbink", "Carkol", "Carnivine", "Carracosta", "Carvanha", "Cascoon", "Castform", "Caterpie", "Celebi", "Celesteela", "Centiskorch", "Ceruledge", "Cetitan", "Cetoddle", "Chandelure", "Chansey", "Charcadet", "Charizard", "Charjabug", "Charmander", "Charmeleon", "Chatot", "Cherrim", "Cherubi", "Chesnaught", "Chespin", "Chewtle", "Chi-Yu", "Chien-Pao", "Chikorita", "Chimchar", "Chimecho", "Chinchou", "Chingling", "Cinccino", "Cinderace", "Clamperl", "Clauncher", "Clawitzer", "Claydol", "Clefable", "Clefairy", "Cleffa", "Clobbopus", "Clodsire", "Cloyster", "Coalossal", "Cobalion", "Cofagrigus", "Combee", "Combusken", "Comfey", "Conkeldurr", "Copperajah", "Corphish", "Corsola", "Corviknight", "Corvisquire", "Cosmoem", "Cosmog", "Cottonee", "Crabominable", "Crabrawler", "Cradily", "Cramorant", "Cranidos", "Crawdaunt", "Cresselia", "Croagunk", "Crobat", "Crocalor", "Croconaw", "Crustle", "Cryogonal", "Cubchoo", "Cubone", "Cufant", "Cursola", "Cutiefly", "Cyclizar", "Cyndaquil", "Dachsbun", "Darkrai", "Darmanitan", "Dartrix", "Darumaka", "Decidueye", "Dedenne", "Deerling", "Deino", "Delcatty", "Delibird", "Delphox", "Deoxys", "Dewgong", "Dewott", "Dewpider", "Dhelmise", "Dialga", "Diancie", "Diggersby", "Diglett", "Dipplin", "Ditto", "Dodrio", "Doduo", "Dolliv", "Dondozo", "Donphan", "Dottler", "Doublade", "Dracovish", "Dracozolt", "Dragalge", "Dragapult", "Dragonair", "Dragonite", "Drakloak", "Drampa", "Drapion", "Dratini", "Drednaw", "Dreepy", "Drifblim", "Drifloon", "Drilbur", "Drizzile", "Drowzee", "Druddigon", "Dubwool", "Ducklett", "Dudunsparce", "Dugtrio", "Dunsparce", "Duosion", "Duraludon", "Durant", "Dusclops", "Dusknoir", "Duskull", "Dustox", "Dwebble", "Eelektrik", "Eelektross", "Eevee", "Eiscue", "Ekans", "Eldegoss", "Electabuzz", "Electivire", "Electrike", "Electrode", "Elekid", "Elgyem", "Emboar", "Emolga", "Empoleon", "Enamorus", "Entei", "Escavalier", "Espathra", "Espeon", "Espurr", "Eternatus", "Excadrill", "Exeggcute", "Exeggutor", "Exploud", "Falinks", "Farfetch'd", "Farigiraf", "Fearow", "Feebas", "Fennekin", "Feraligatr", "Ferroseed", "Ferrothorn", "Fezandipiti", "Fidough", "Finizen", "Finneon", "Flaaffy", "Flabébé", "Flamigo", "Flapple", "Flareon", "Fletchinder", "Fletchling", "Flittle", "Floatzel", "Floette", "Floragato", "Florges", "Flutter Mane", "Flygon", "Fomantis", "Foongus", "Forretress", "Fraxure", "Frigibax", "Frillish", "Froakie", "Frogadier", "Froslass", "Frosmoth", "Fuecoco", "Furfrou", "Furret", "Gabite", "Gallade", "Galvantula", "Garbodor", "Garchomp", "Gardevoir", "Garganacl", "Gastly", "Gastrodon", "Genesect", "Gengar", "Geodude", "Gholdengo", "Gible", "Gigalith", "Gimmighoul", "Girafarig", "Giratina", "Glaceon", "Glalie", "Glameow", "Glastrier", "Gligar", "Glimmet", "Glimmora", "Gliscor", "Gloom", "Gogoat", "Golbat", "Goldeen", "Golduck", "Golem", "Golett", "Golisopod", "Golurk", "Goodra", "Goomy", "Gorebyss", "Gossifleur", "Gothita", "Gothitelle", "Gothorita", "Gourgeist", "Grafaiai", "Granbull", "Grapploct", "Graveler", "Great Tusk", "Greavard", "Greedent", "Greninja", "Grimer", "Grimmsnarl", "Grookey", "Grotle", "Groudon", "Grovyle", "Growlithe", "Grubbin", "Grumpig", "Gulpin", "Gumshoos", "Gurdurr", "Guzzlord", "Gyarados", "Hakamo-o", "Happiny", "Hariyama", "Hatenna", "Hatterene", "Hattrem", "Haunter", "Hawlucha", "Haxorus", "Heatmor", "Heatran", "Heliolisk", "Helioptile", "Heracross", "Herdier", "Hippopotas", "Hippowdon", "Hitmonchan", "Hitmonlee", "Hitmontop", "Ho-Oh", "Honchkrow", "Honedge", "Hoopa", "Hoothoot", "Hoppip", "Horsea", "Houndoom", "Houndour", "Houndstone", "Huntail", "Hydreigon", "Hypno", "Igglybuff", "Illumise", "Impidimp", "Incineroar", "Indeedee", "Infernape", "Inkay", "Inteleon", "Iron Bundle", "Iron Crown", "Iron Hands", "Iron Jugulis", "Iron Leaves", "Iron Moth", "Iron Thorns", "Iron Treads", "Iron Valiant", "Ivysaur", "Jangmo-o", "Jellicent", "Jigglypuff", "Jirachi", "Jolteon", "Joltik", "Jumpluff", "Jynx", "Kabuto", "Kabutops", "Kadabra", "Kakuna", "Kangaskhan", "Karrablast", "Kartana", "Kecleon", "Keldeo", "Kilowattrel", "Kingambit", "Kingdra", "Kingler", "Kirlia", "Klang", "Klawf", "Kleavor", "Klefki", "Klink", "Klinklang", "Koffing", "Komala", "Kommo-o", "Koraidon", "Krabby", "Kricketot", "Kricketune", "Krokorok", "Krookodile", "Kubfu", "Kyogre", "Kyurem", "Lairon", "Lampent", "Landorus", "Lanturn", "Lapras", "Larvesta", "Larvitar", "Latias", "Latios", "Leafeon", "Leavanny", "Lechonk", "Ledian", "Ledyba", "Lickilicky", "Lickitung", "Liepard", "Lileep", "Lilligant", "Lillipup", "Linoone", "Litleo", "Litten", "Litwick", "Lokix", "Lombre", "Lopunny", "Lotad", "Loudred", "Lucario", "Ludicolo", "Lugia", "Lumineon", "Lunala", "Lunatone", "Lurantis", "Luvdisc", "Luxio", "Luxray", "Lycanroc", "Mabosstiff", "Machamp", "Machoke", "Machop", "Magby", "Magcargo", "Magearna", "Magikarp", "Magmar", "Magmortar", "Magnemite", "Magneton", "Magnezone", "Makuhita", "Malamar", "Mamoswine", "Manaphy", "Mandibuzz", "Manectric", "Mankey", "Mantine", "Mantyke", "Maractus", "Mareanie", "Mareep", "Marill", "Marowak", "Marshadow", "Marshtomp", "Maschiff", "Masquerain", "Maushold", "Mawile", "Medicham", "Meditite", "Meganium", "Melmetal", "Meloetta", "Meltan", "Meowscarada", "Meowstic", "Meowth", "Mesprit", "Metagross", "Metang", "Metapod", "Mew", "Mewtwo", "Mienfoo", "Mienshao", "Mightyena", "Milcery", "Milotic", "Miltank", "Mime Jr.", "Mimikyu", "Minccino", "Minior", "Minun", "Miraidon", "Misdreavus", "Mismagius", "Moltres", "Monferno", "Morelull", "Morgrem", "Morpeko", "Mothim", "Mr. Mime", "Mr. Rime", "Mudbray", "Mudkip", "Mudsdale", "Muk", "Munchlax", "Munkidori", "Munna", "Murkrow", "Musharna", "Nacli", "Naclstack", "Naganadel", "Natu", "Necrozma", "Nickit", "Nidoking", "Nidoqueen", "Nidoran♀", "Nidoran♂", "Nidorina", "Nidorino", "Nihilego", "Nincada", "Ninetales", "Ninjask", "Noctowl", "Noibat", "Noivern", "Nosepass", "Numel", "Nuzleaf", "Nymble", "Obstagoon", "Octillery", "Oddish", "Ogerpon", "Oinkologne", "Okidogi", "Omanyte", "Omastar", "Onix", "Oranguru", "Orbeetle", "Oricorio", "Orthworm", "Oshawott", "Overqwil", "Pachirisu", "Palafin", "Palkia", "Palossand", "Palpitoad", "Pancham", "Pangoro", "Panpour", "Pansage", "Pansear", "Paras", "Parasect", "Passimian", "Patrat", "Pawmi", "Pawmo", "Pawmot", "Pawniard", "Pelipper", "Perrserker", "Persian", "Petilil", "Phanpy", "Phantump", "Pheromosa", "Phione", "Pichu", "Pidgeot", "Pidgeotto", "Pidgey", "Pidove", "Pignite", "Pikachu", "Pikipek", "Piloswine", "Pincurchin", "Pineco", "Pinsir", "Piplup", "Plusle", "Poipole", "Politoed", "Poliwag", "Poliwhirl", "Poliwrath", "Poltchageist", "Polteageist", "Ponyta", "Poochyena", "Popplio", "Porygon", "Porygon-Z", "Porygon2", "Primarina", "Primeape", "Prinplup", "Probopass", "Psyduck", "Pumpkaboo", "Pupitar", "Purrloin", "Purugly", "Pyroar", "Pyukumuku", "Quagsire", "Quaquaval", "Quaxly", "Quaxwell", "Quilava", "Quilladin", "Qwilfish", "Raboot", "Rabsca", "Raging Bolt", "Raichu", "Raikou", "Ralts", "Rampardos", "Rapidash", "Raticate", "Rattata", "Rayquaza", "Regice", "Regidrago", "Regieleki", "Regigigas", "Regirock", "Registeel", "Relicanth", "Rellor", "Remoraid", "Reshiram", "Reuniclus", "Revavroom", "Rhydon", "Rhyhorn", "Rhyperior", "Ribombee", "Rillaboom", "Riolu", "Roaring Moon", "Rockruff", "Roggenrola", "Rolycoly", "Rookidee", "Roselia", "Roserade", "Rotom", "Rowlet", "Rufflet", "Runerigus", "Sableye", "Salamence", "Salandit", "Salazzle", "Samurott", "Sandaconda", "Sandile", "Sandshrew", "Sandslash", "Sandygast", "Sandy Shocks", "Sawk", "Sawsbuck", "Scatterbug", "Sceptile", "Scizor", "Scolipede", "Scorbunny", "Scovillain", "Scrafty", "Scraggy", "Scream Tail", "Scyther", "Seadra", "Seaking", "Sealeo", "Seedot", "Seel", "Seismitoad", "Sentret", "Serperior", "Servine", "Seviper", "Sewaddle", "Sharpedo", "Shaymin", "Shedinja", "Shelgon", "Shellder", "Shellos", "Shelmet", "Shieldon", "Shiftry", "Shiinotic", "Shinx", "Shroodle", "Shroomish", "Shuckle", "Shuppet", "Sigilyph", "Silcoon", "Silicobra", "Silvally", "Simipour", "Simisage", "Simisear", "Sinistcha", "Sinistea", "Sirfetch'd", "Sizzlipede", "Skarmory", "Skeledirge", "Skiddo", "Skiploom", "Skitty", "Skorupi", "Skrelp", "Skuntank", "Skwovet", "Slaking", "Slakoth", "Sliggoo", "Slither Wing", "Slowbro", "Slowking", "Slowpoke", "Slugma", "Slurpuff", "Smeargle", "Smoliv", "Smoochum", "Sneasel", "Sneasler", "Snivy", "Snom", "Snorlax", "Snorunt", "Snover", "Snubbull", "Sobble", "Solgaleo", "Solosis", "Solrock", "Spearow", "Spectrier", "Spewpa", "Spheal", "Spidops", "Spinarak", "Spinda", "Spiritomb", "Spoink", "Sprigatito", "Spritzee", "Squawkabilly", "Squirtle", "Stakataka", "Stantler", "Staraptor", "Staravia", "Starly", "Starmie", "Staryu", "Steelix", "Steenee", "Stonjourner", "Stoutland", "Stufful", "Stunfisk", "Stunky", "Sudowoodo", "Suicune", "Sunflora", "Sunkern", "Surskit", "Swablu", "Swadloon", "Swalot", "Swampert", "Swanna", "Swellow", "Swinub", "Swirlix", "Swoobat", "Sylveon", "Tadbulb", "Taillow", "Talonflame", "Tandemaus", "Tangela", "Tangrowth", "Tapu Bulu", "Tapu Fini", "Tapu Koko", "Tapu Lele", "Tarountula", "Tatsugiri", "Tauros", "Teddiursa", "Tentacool", "Tentacruel", "Tepig", "Terapagos", "Terrakion", "Thievul", "Throh", "Thundurus", "Thwackey", "Ting-Lu", "Tinkatink", "Tinkaton", "Tinkatuff", "Timburr", "Tirtouga", "Toedscool", "Toedscruel", "Togedemaru", "Togekiss", "Togepi", "Togetic", "Torchic", "Torkoal", "Tornadus", "Torracat", "Torterra", "Totodile", "Toucannon", "Toxapex", "Toxel", "Toxicroak", "Toxtricity", "Tranquill", "Trapinch", "Treecko", "Trevenant", "Tropius", "Trubbish", "Trumbeak", "Tsareena", "Turtonator", "Turtwig", "Tympole", "Tynamo", "Type: Null", "Typhlosion", "Tyranitar", "Tyrantrum", "Tyrogue", "Tyrunt", "Umbreon", "Unfezant", "Unown", "Ursaluna", "Ursaring", "Urshifu", "Uxie", "Vanillish", "Vanillite", "Vanilluxe", "Vaporeon", "Varoom", "Veluza", "Venipede", "Venomoth", "Venonat", "Venusaur", "Vespiquen", "Vibrava", "Victini", "Victreebel", "Vigoroth", "Vikavolt", "Vileplume", "Virizion", "Vivillon", "Volbeat", "Volcanion", "Volcarona", "Voltorb", "Vullaby", "Vulpix", "Wailmer", "Wailord", "Walking Wake", "Walrein", "Wartortle", "Watchog", "Wattrel", "Weavile", "Weedle", "Weepinbell", "Weezing", "Whimsicott", "Whirlipede", "Whiscash", "Whismur", "Wigglytuff", "Wiglett", "Wimpod", "Wingull", "Wishiwashi", "Wo-Chien", "Wobbuffet", "Woobat", "Wooloo", "Wooper", "Wormadam", "Wugtrio", "Wurmple", "Wynaut", "Wyrdeer", "Xatu", "Xerneas", "Xurkitree", "Yamask", "Yamper", "Yanma", "Yanmega", "Yungoos", "Yveltal", "Zacian", "Zamazenta", "Zangoose", "Zapdos", "Zarude", "Zebstrika", "Zekrom", "Zeraora", "Zigzagoon", "Zoroark", "Zorua", "Zubat", "Zweilous", "Zygarde"],
    },
    [Language.ja]: {
        [DrawCategory.FREE]: [],
        [DrawCategory.ANIMAL]: ["犬", "牛", "猫", "馬", "ロバ", "トラ", "ライオン", "ヒョウ", "ヒョウ", "チーター", "クマ", "ゾウ", "シロクマ", "クマ", "カメ", "カメ", "ワニ", "ウサギ", "ヤマアラシ", "ノウサギ", "メンドリ", "ハト", "アホウドリ", "カラス", "魚", "イルカ", "カエル", "クジラ", "ワニ", "ワシ", "ムササビ", "ダチョウ", "キツネ", "ヤギ", "ジャッカル", "エミュー", "アルマジロ", "ウナギ", "ガチョウ", "ホッキョクキツネ", "オオカミ", "ビーグル", "ゴリラ", "チンパンジー", "サル", "ビーバー", "オランウータン", "アンテロープ", "コウモリ", "アナグマ", "キリン,ヤドカリ", "ジャイアントパンダ", "ハムスター", "コブラ", "シュモクザメ", "ラクダ", "タカ", "シカ", "カメレオン", "カバ", "ジャガー", "チワワ", "キングコブラ", "アイベックス", "トカゲ", "コアラ", "カンガルー", "イグアナ", "ラマ", "チンチラ", "ドードー", "クラゲ", "サイ", " ハリネズミ", "シマウマ", "ポッサム", "ウォンバット", "バイソン", "雄牛", "バッファロー", "羊", "ミーアキャット", "ネズミ", "カワウソ", "ナマケモノ", "フクロウ", "ハゲワシ", "フラミンゴ", "アライグマ", "モグラ", "アヒル", "白鳥", "オオヤマネコ", "オオトカゲ", "ヘラジカ", "イノシシ", "キツネザル", "ラバ", "ヒヒ", "マンモス", "シロナガスクジラ", "ネズミ", "ヘビ", "クジャク",],
        [DrawCategory.OBJECT]: ["自動車", "自転車", "テレビ", "コンピューター", "電話", "冷蔵庫", "時計", "カメラ", "机", "椅子", "ベッド", "ショパ", "ミラー ", "ワードローブ", "ランプ", "コーヒーポット", "電気炊飯器", "ほうき", "歯ブラシ", "石鹸", "シャンプー", "携帯電話", "カップ", "皿", "フォーク", "スプーン", "ナイフ", "トレイ", "マイク", "ヘッドフォン", "靴", "帽子", "バッグ", "傘", "サングラス", "時計", "手袋", "スカーフ", "ベルト", "ネックレス", "ブレスレット", "イヤリング", "リング", "ヘアピン", "パンツ", "シャツ", "ドレス", "スカート", "靴下", "水着 ", "タオル", "バスローブ", "パジャマ", "スリッパ", "新聞", "雑誌", "ノートブック", "鉛筆", "ボールペン", "消しゴム", "定規", "テープ", "はさみ", "貼り付け", "ペンケース", "色鉛筆", "モニター", "キーボード", "マウス", "プリンター", "スピーカー", "イヤホン", "充電器", "フラッシュドライブ", "外部ハード", "SDカード", "バッテリー", "電線", "ポストイット", "ステープラー", "ゴム糸", "フィルター", "ダストバッグ", "掃除機", "圧力鍋", "トースター", "ミキサー", "オーブン", "ガスレンジ", "電気グリル", "電子レンジ", "冷凍庫", "エアコン", "扇風機", "ヒーター", "加湿器", "除湿機", "水モップ", "ほこりふた", "洗濯乾燥機", "洗濯洗剤", "繊維柔軟剤", "休止", "ティッシュ", "かみそり", "フォームクレンジング", "ヘアドライヤー", "ヘアスプレー", " ハンドクリーム", "リップクリーム", "化粧品", "香水", "ボディローション", "タトゥー", "ピアノ", "その他", "ドラム", "フルート", "バイオリン", "トランペット", " 写真", "絵", "額縁", "壁時計", "キャンドル", "照明", "ビーズ", "人形", "ボードゲーム", "パズル", "レゴ", "コイン", "切手", "はがき", "バッジ", "ステッカー", "マガジン", "ポスター"],
        [DrawCategory.JOB]: ["医師", "弁護士", "先生", "公務員", "警察", "消防士", "看護師", "研究員", "記者", "アナウンサー", "エンジニア", "デザイナー", "作家", "俳優", "音楽家", "料理人", "ピアニスト", "建築家", "編集者", "写真作家", "操縦士", "海軍", "陸軍", "乗務員", "タクシー運転手", "プログラマー", "作曲家", "彫刻家", "翻訳家", "広告人", "ヘアデザイナー", "化粧師", "魔術師", "調教師", "食品科学者", "化学者", "物理学者", "天文学者", "生物学者", "数学者", "政治家", "社会学者", "歴史学者", "哲学者", "大統領", "考古学者", "博物館史", "船長", "掃除婦", "DJ", "科学社", "統計学者", "科学社", "生命保険", "科学社", "科学", "科学社", "科学", "生命科学社"],
        [DrawCategory.FOOD]: ["ドングリかぼちゃ", "アルファルファの芽", "アーモンド", "アンチョビ", "アニス", "食欲", "前菜", "リンゴ", "アプリコット", "アーティチョーク", "アスパラガス", "アスピック", "アテ", "アボカド", "ベーコン", "ベーグル", "ベイク", "ベイクドアラスカ", "タケノコ", "バナナ", "バーベキュー", "大麦", "バジル", "バッター", "豆腐", "豆", "牛肉", "ビート", "ピーマン", "ベリー", "ビスケット", "ビター", "黒豆", "紅茶", "黒目豆", "ブラックベリー", "ブラント", "ブラッドオレンジ", "ブルーベリー", "ボイル", "ボウル", "ボイセンベリー", "ふすま", "パン", "ブレッドフルーツ", "朝食", "ブリスケット", "ブロッコリー", "ブロイル", "玄米", "ブラウニー", "ブランチ", "芽キャベツ", "そば", "バンズ", "ブリトー", "バター", "バタービーン", "ケーキ", "カロリー", "キャンディー", "アップルキャンディー", "マスクメロン", "ケッパー", "キャラメル", "キャラメルアップル", "炭水化物", "ニンジン", "カシューナッツ", "キャッサバ", "キャセロール", "ケータ", "カリフラワー", "キャビア", "カイエンペッパー", "セロリ", "シリアル", "チャード", "チェダー", "チーズ", "チーズケーキ", "シェフ", "チェリー", "チュー", "ひよこ豆", "チキン", "チリ", "チップス", "チャイブ", "チョコレート", "箸", "チャウ", "チャツネ", "コリアンダー", "シナモン", "シトロン", "柑橘類", "ハマグリ", "クローブ", "靴屋", "ココナッツ", "タラ", "コーヒー", "コールスロー", "コラードグリーン", "食料品", "料理", "料理本", "クッキー", "コーン", "コーンフレーク", "コーンミール", "カッテージチーズ", "カニ", "クラッカー", "クランベリー", "クリーム", "クリームチーズ", "クレープ", "クリスプ", "クランチ", "クラスト", "キュウリ", "料理", "食器棚", "カップケーキ", "カード", "カラント", "カレー", "カスタード", "大根", "デイリーブレッド", "乳製品", "タンポポの葉", "デニッシュ", "デーツ", "デザート", "ダイエット", "ダイジェスト", "消化器系", "ディル", "ディナー", "ダイナー", "ディナー", "ディップ", "ディッシュ", "生地", "ドーナツ", "ドラゴンフルーツ", "ドレッシング", "ドライ", "飲む", "ドライ", "ドリアン", "食べる", "エダムチーズ", "食用", "卵", "ナス", "エルダーベリー", "エンダイブ", "メインディッシュ", "ファスト", "脂肪", "ソラマメ", "ごちそう", "餌", "餌", "フェンネル", "イチジク", "フィレ", "火", "魚", "フラン", "亜麻", "小麦粉", "食品", "食品ピラミッド", "食材", "フォーク", "冷凍庫", "フライドポテト", "フライ", "フリッター", "フロスティング", "フルーツ", "フライ", "ガーリック", "ガストロノミー", "ゼラチン", "ジンジャー", "ジンジャーエール", "ジンジャーブレッド", "グラス", "ゴーダチーズ", "穀物", "グラノーラ", "グレープ", "グレープフルーツ", "すりおろし", "グレービーソース", "いんげん", "緑茶", "野菜", " グラブ", "ワカモレ", "グアバ", "ジャイロ", "オヒョウ", "ハム", "ハンバーガー", "ハッシュ", "ヘーゼルナッツ", "ハーブ", "ハチミツ", "ハニーデュー", "ホースラディッシュ", "ホット", "ホットドッグ", "ホットソース", "フムス", "空腹", "空腹", "アイス", "アイスクリーム", "アイスクリームコーン", "アイスバーグレタス", "アイスティー", "アイシング", "ジャックフルーツ", "ハラペーニョ", "ジャム", "ゼリー", "ジェリービーンズ", "ヒカマ", "ジミー", "ジョーダン アーモンド", "ジャグ", "ジュース", "千切り", "ジャンクフード", "ケール", "ケバブ", "ケチャップ", "ケトル", "ケトルコーン", "インゲン", "キッチン", "キウイ", "ナイフ", "コールラビ", "キンカン", "お玉", "子羊肉", "ラード", "ラザニア", "豆類", "レモン", "レモネード", "レンズ豆", "レタス", "甘草", "ライマメ", "ライム", "レバー", "ローフ", "ロブスター", "ロリポップ", "ビワ", "ロックス", "ランチ", "ランチボックス", "ランチミート", "ライチ", "マカロニ", "マカロン", "メインコース", "トウモロコシ", "みかん", "マンゴー", "メープルシロップ", "マーガリン", "マリオンベリー", "マーマレード", "マシュマロ", "マッシュポテト", "マヨネーズ", "肉", "ミートボール", "ミートローフ", "メロン", "メニュー", "メレンゲ", "微量栄養素", "牛乳", "ミルクセーキ", "キビ", "ミンスミート", "ミネラル", "ミント", "ミント", "もち", "糖蜜", "モールソース", "モッツァレラ", "マフィン", "マグカップ", "マンチ", "マッシュルーム", "ムール貝", "マスタード", "からし菜", "マトン", "ナプキン", "ネクター", "ネクタリン", "ニブル", "ヌードル", "ノシュ", "栄養", "栄養", "ナッツ", "ナツメグ", "栄養", "栄養", "栄養価の高い", "オートミール", "オーツ麦", "油", "オクラ", "オレオ", "オリーブ", "オムレツ", "雑食動物", "玉ねぎ", "オレンジ", "注文", "オレガノ", "オーブン", "オイスター", "パン", "パンケーキ", "パパイヤ", "パセリ", "パースニップ", "パスタ", "ペストリー", "パテ", "パティ", "パティパン", "スカッシュ", "エンドウ豆", "エンドウ豆のさや", "ピーチ", "ピーナッツ", "ピーナッツバター", "洋梨", "ピーカン", "胡椒", "ペパロニ", "柿", "ピクルス", "ピクニック", "パイ", "ピラフ", "パイナップル", "ピタパン", "ピッチャー", "ピザ", "プレート", "大皿", "プラム", "ポーチド", "ザクロ", "ザボン", "ポップ", "ポップコーン", "ポップオーバー", "アイスキャンディー", "ポーク", "ポークチョップ", "ポット", "ポットロースト", "ポテト", "プリザーブ", "プレッツェル", "プライム リブ", "プロテイン", "プロビジョニング", "プルーン", "プリン", "パンパーニッケル", "カボチャ", "パンチ", "キッシュ", "キヌア", "大根", "レーズン", "ラズベリー", "配給", "ラビオリ", "レシピ", "軽食", "冷蔵庫", "レリッシュ", "レストラン", "ルバーブ", "リブ", "ライス", "ロースト", "ロール", "めん棒", "ロメイン", "ローズマリー", "ライ麦", "サフラン", "セージ", "サラダ", "サラミ", "サーモン", "サルサ", "塩", "サンドイッチ", "ソース", "ザワークラウト", "ソーセージ", "セイボリー", "ホタテ", "スクランブル", "海藻", "種子", "ゴマ", "エシャロット", "シャーベット", "シシカバブ", "エビ", "スロー", "スライス", "スモーク", "スナック", "ソーダ", "ソーダブレッド", "舌平目", "シャーベット", "ソルガム", "スイバ", "スープ", "サワー", "サワークリーム", "醤油", "醤油", "大豆", "スパゲッティ", "スペアリブ", "スパチュラ", "スパイス", "スパイシー", "ほうれん草", "スプリットピー", "スプーン", "スポーク", "スプリンクル", "もやし", "スパッド", "スカッシュ", "イカ", "ステーキ", "シチュー", "炒め物", "胃", "ストーブ", "わら", "イチゴ", "いんげん", "ひもの", "シュトルーデル", "サブサンドイッチ", "サブマリンサンドイッチ", "サコタッシュ", "スエット", "砂糖", "夏かぼちゃ", "サンデー", "ひまわり", "夕食", "寿司", "栄養", "甘い", "サツマイモ", "スイスチャード", "シロップ", " タコス", "テイクアウト", "タマーレ", "タンジェリン", "タピオカ", "タロイモ", "タラゴン", "タルト", "紅茶", "ティーポット", "テリヤキ", "タイム", "トースト", "トースター", "トフィー", "豆腐", "トマティージョ", "トマト", "トルテ", "トルティーヤ", "塊茎", "マグロ", "七面鳥", "ターメリック", "カブ", "アグリフルーツ", "種なし", "調理器具", "バニラ", "子牛肉", "野菜", "鹿肉", "酢", "ビタミン", "ウエハース", "ワッフル", "クルミ", "わさび", "水", "ヒシ", "クレソン", "スイカ", "小麦", "ホエー", "ホイップクリーム", "中華鍋", "山芋", "イースト", "ヨーグルト", "卵黄", "ズッキーニ"],
        [DrawCategory.LOL]: ["アーゴット", "アーリ", "アイバーン", "アカリ", "アクシャン", "アジール", "アッシュ", "アニー", "アニビア", "アフェリオス", "アムム", "アリスター", "イブリン", "イラオイ", "イレリア", "ヴァイ", "ヴァルス", "ヴィエゴ", "ウーコン", "ヴェイン", "ヴェックス", "ヴェル＝コズ", "ウディア", "エイトロックス", "エコー", "エズリアル", "エリス", "オーン", "オラフ", "オリアナ", "オレリオン・ソル", "カ・サンテ", "カ＝ジックス", "カーサス", "カイ＝サ", "カサディン", "カシオペア", "カタリナ", "カミール", "ガリオ", "カリスタ", "カルマ", "ガレン", "ガングプランク", "キヤナ", "キンドレッド", "クイン", "グウェン", "グラガス", "グレイブス", "クレッド", "ケイトリン", "ケイル", "ケイン", "ケネン", "コーキ", "コグ＝マウ", "サイオン", "ザイラ", "サイラス", "ザック", "サミーラ", "ザヤ", "シヴァーナ", "シヴィア", "ジェイス", "シェン", "ジグス", "ジャーヴァンⅣ", "シャコ", "ジャックス", "ジャンナ", "ジリアン", "ジン", "シン・ジャオ", "ジンクス", "シンジド", "シンドラ", "スウェイン", "スカーナー", "スレッシュ", "セジュアニ", "セト", "ゼド", "セナ", "ゼラス", "セラフィーン", "ゼリ", "ゾーイ", "ソナ", "ソラカ", "ダイアナ", "タム・ケンチ", "ダリウス", "タリック", "タリヤ", "タロン", "チョ＝ガス", "ツイステッド・フェイト", "ティーモ", "トゥイッチ", "ドクター・ムンド", "トランドル", "トリスターナ", "トリンダメア", "ドレイヴン", "ナー", "ナサス", "ナフィーリ", "ナミ", "ニーコ", "ニーラ", "ニダリー", "ヌヌ＆ウィルンプ", "ノーチラス", "ノクターン", "バード", "パイク", "ハイマーディンガー", "パンテオン", "ビクター", "フィオラ", "フィズ", "フィドルスティックス", "ブライアー", "ブラウム", "ブラッドミア", "ブランド", "ブリッツクランク", "ベイガー", "ヘカリム", "ベル＝ヴェス", "ポッピー", "ボリベア", "マオカイ", "マスター・イー", "マルザハール", "マルファイト", "ミス・フォーチュン", "ミリオ", "モルガナ", "モルデカイザー", "ヤスオ", "ユーミ", "ヨネ", "ヨリック", "ライズ", "ラカン", "ラックス", "ラムス", "ランブル", "リー・シン", "リヴェン", "リサンドラ", "リリア", "ルシアン", "ルブラン", "ルル", "レオナ", "レク＝サイ", "レナータ・グラスク", "レネクトン", "レル", "レンガー", "ワーウィック"],
        [DrawCategory.SPORT]: [],
        [DrawCategory.POKEMON]: ["フシギダネ", "フシギソウ", "フシギバナ", "ヒトカゲ", "リザード", "リザードン", "ゼニガメ", "カメール", "カメックス", "キャタピー", "トランセル", "バタフリー", "ビードル", "コクーン", "スピアー", "ポッポ", "ピジョン", "ピジョット", "コラッタ", "ラッタ", "オニスズメ", "オニドリル", "アーボ", "アーボック", "ピカチュウ", "ライチュウ", "サンド", "サンドパン", "ニドラン♀", "ニドリーナ", "ニドクイン", "ニドラン♂", "ニドリーノ", "ニドキング", "ピッピ", "ピクシー", "ロコン", "キュウコン", "プリン", "プクリン", "ズバット", "ゴルバット", "ナゾノクサ", "クサイハナ", "ラフレシア", "パラス", "パラセクト", "コンパン", "モルフォン", "ディグダ", "ダグトリオ", "ニャース", "ペルシアン", "コダック", "ゴルダック", "マンキー", "オコリザル", "ガーディ", "ウインディ", "ニョロモ", "ニョロゾ", "ニョロボン", "ケーシィ", "ユンゲラー", "フーディン", "ワンリキー", "ゴーリキー", "カイリキー", "マダツボミ", "ウツドン", "ウツボット", "メノクラゲ", "ドククラゲ", "イシツブテ", "ゴローン", "ゴローニャ", "ポニータ", "ギャロップ", "ヤドン", "ヤドラン", "コイル", "レアコイル", "カモネギ", "ドードー", "ドードリオ", "パウワウ", "ジュゴン", "ベトベター", "ベトベトン", "シェルダー", "パルシェン", "ゴース", "ゴースト", "ゲンガー", "イワーク", "スリープ", "スリーパー", "クラブ", "キングラー", "ビリリダマ", "マルマイン", "タマタマ", "ナッシー", "カラカラ", "ガラガラ", "サワムラー", "エビワラー", "ベロリンガ", "ドガース", "マタドガス", "サイホーン", "サイドン", "ラッキー", "モンジャラ", "ガルーラ", "タッツー", "シードラ", "トサキント", "アズマオウ", "ヒトデマン", "スターミー", "バリヤード", "ストライク", "ルージュラ", "エレブー", "ブーバー", "カイロス", "ケンタロス", "コイキング", "ギャラドス", "ラプラス", "メタモン", "イーブイ", "シャワーズ", "サンダース", "ブースター", "ポリゴン", "オムナイト", "オムスター", "カブト", "カブトプス", "プテラ", "カビゴン", "フリーザー", "サンダー", "ファイヤー", "ミニリュウ", "ハクリュー", "カイリュー", "ミュウツー", "ミュウ", "チコリータ", "ベイリーフ", "メガニウム", "ヒノアラシ", "マグマラシ", "バクフーン", "ワニノコ", "アリゲイツ", "オーダイル", "オタチ", "オオタチ", "ホーホー", "ヨルノズク", "レディバ", "レディアン", "イトマル", "アリアドス", "クロバット", "チョンチー", "ランターン", "ピチュー", "ピィ", "ププリン", "トゲピー", "トゲチック", "ネイティ", "ネイティオ", "メリープ", "モココ", "デンリュウ", "キレイハナ", "マリル", "マリルリ", "ウソッキー", "ニョロトノ", "ハネッコ", "ポポッコ", "ワタッコ", "エイパム", "ヒマナッツ", "キマワリ", "ヤンヤンマ", "ウパー", "ヌオー", "エーフィ", "ブラッキー", "ヤミカラス", "ヤドキング", "ムウマ", "アンノーン", "ソーナンス", "キリンリキ", "クヌギダマ", "フォレトス", "ノコッチ", "グライガー", "ハガネール", "ブルー", "グランブル", "ハリーセン", "ハッサム", "ツボツボ", "ヘラクロス", "ニューラ", "ヒメグマ", "リングマ", "マグマッグ", "マグカルゴ", "ウリムー", "イノムー", "サニーゴ", "テッポウオ", "オクタン", "デリバード", "マンタイン", "エアームド", "デルビル", "ヘルガー", "キングドラ", "ゴマゾウ", "ドンファン", "ポリゴン２", "オドシシ", "ドーブル", "バルキー", "カポエラー", "ムチュール", "エレキッド", "ブビィ", "ミルタンク", "ハピナス", "ライコウ", "エンテイ", "スイクン", "ヨーギラス", "サナギラス", "バンギラス", "ルギア", "ホウオウ", "セレビィ", "キモリ", "ジュプトル", "ジュカイン", "アチャモ", "ワカシャモ", "バシャーモ", "ミズゴロウ", "ヌマクロー", "ラグラージ", "ポチエナ", "グラエナ", "ジグザグマ", "マッスグマ", "ケムッソ", "カラサリス", "アゲハント", "マユルド", "ドクケイル", "ハスボー", "ハスブレロ", "ルンパッパ", "タネボー", "コノハナ", "ダーテング", "スバメ", "オオスバメ", "キャモメ", "ペリッパー", "ラルトス", "キルリア", "サーナイト", "アメタマ", "アメモース", "キノココ", "キノガッサ", "ナマケロ", "ヤルキモノ", "ケッキング", "ツチニン", "テッカニン", "ヌケニン", "ゴニョニョ", "ドゴーム", "バクオング", "マクノシタ", "ハリテヤマ", "ルリリ", "ノズパス", "エネコ", "エネコロロ", "ヤミラミ", "クチート", "ココドラ", "コドラ", "ボスゴドラ", "アサナン", "チャーレム", "ラクライ", "ライボルト", "プラスル", "マイナン", "バルビート", "イルミーゼ", "ロゼリア", "ゴクリン", "マルノーム", "キバニア", "サメハダー", "ホエルコ", "ホエルオー", "ドンメル", "バクーダ", "コータス", "バネブー", "ブーピッグ", "パッチール", "ナックラー", "ビブラーバ", "フライゴン", "サボネア", "ノクタス", "チルット", "チルタリス", "ザングース", "ハブネーク", "ルナトーン", "ソルロック", "ドジョッチ", "ナマズン", "ヘイガニ", "シザリガー", "ヤジロン", "ネンドール", "リリーラ", "ユレイドル", "アノプス", "アーマルド", "ヒンバス", "ミロカロス", "ポワルン", "カクレオン", "カゲボウズ", "ジュペッタ", "ヨマワル", "サマヨール", "トロピウス", "チリーン", "アブソル", "ソーナノ", "ユキワラシ", "オニゴーリ", "タマザラシ", "トドグラー", "トドゼルガ", "パールル", "ハンテール", "サクラビス", "ジーランス", "ラブカス", "タツベイ", "コモルー", "ボーマンダ", "ダンバル", "メタング", "メタグロス", "レジロック", "レジアイス", "レジスチル", "ラティアス", "ラティオス", "カイオーガ", "グラードン", "レックウザ", "ジラーチ", "デオキシス", "ナエトル", "ハヤシガメ", "ドダイトス", "ヒコザル", "モウカザル", "ゴウカザル", "ポッチャマ", "ポッタイシ", "エンペルト", "ムックル", "ムクバード", "ムクホーク", "ビッパ", "ビーダル", "コロボーシ", "コロトック", "コリンク", "ルクシオ", "レントラー", "スボミー", "ロズレイド", "ズガイドス", "ラムパルド", "タテトプス", "トリデプス", "ミノムッチ", "ミノマダム", "ガーメイル", "ミツハニー", "ビークイン", "パチリス", "ブイゼル", "フローゼル", "チェリンボ", "チェリム", "カラナクシ", "トリトドン", "エテボース", "フワンテ", "フワライド", "ミミロル", "ミミロップ", "ムウマージ", "ドンカラス", "ニャルマー", "ブニャット", "リーシャン", "スカンプー", "スカタンク", "ドーミラー", "ドータクン", "ウソハチ", "マネネ", "ピンプク", "ペラップ", "ミカルゲ", "フカマル", "ガバイト", "ガブリアス", "ゴンベ", "リオル", "ルカリオ", "ヒポポタス", "カバルドン", "スコルピ", "ドラピオン", "グレッグル", "ドクロッグ", "マスキッパ", "ケイコウオ", "ネオラント", "タマンタ", "ユキカブリ", "ユキノオー", "マニューラ", "ジバコイル", "ベロベルト", "ドサイドン", "モジャンボ", "エレキブル", "ブーバーン", "トゲキッス", "メガヤンマ", "リーフィア", "グレイシア", "グライオン", "マンムー", "ポリゴンＺ", "エルレイド", "ダイノーズ", "ヨノワール", "ユキメノコ", "ロトム", "ユクシー", "エムリット", "アグノム", "ディアルガ", "パルキア", "ヒードラン", "レジギガス", "ギラティナ", "クレセリア", "フィオネ", "マナフィ", "ダークライ", "シェイミ", "アルセウス", "ビクティニ", "ツタージャ", "ジャノビー", "ジャローダ", "ポカブ", "チャオブー", "エンブオー", "ミジュマル", "フタチマル", "ダイケンキ", "ミネズミ", "ミルホッグ", "ヨーテリー", "ハーデリア", "ムーランド", "チョロネコ", "レパルダス", "ヤナップ", "ヤナッキー", "バオップ", "バオッキー", "ヒヤップ", "ヒヤッキー", "ムンナ", "ムシャーナ", "マメパト", "ハトーボー", "ケンホロウ", "シママ", "ゼブライカ", "ダンゴロ", "ガントル", "ギガイアス", "コロモリ", "ココロモリ", "モグリュー", "ドリュウズ", "タブンネ", "ドッコラー", "ドテッコツ", "ローブシン", "オタマロ", "ガマガル", "ガマゲロゲ", "ナゲキ", "ダゲキ", "クルミル", "クルマユ", "ハハコモリ", "フシデ", "ホイーガ", "ペンドラー", "モンメン", "エルフーン", "チュリネ", "ドレディア", "バスラオ", "メグロコ", "ワルビル", "ワルビアル", "ダルマッカ", "ヒヒダルマ", "マラカッチ", "イシズマイ", "イワパレス", "ズルッグ", "ズルズキン", "シンボラー", "デスマス", "デスカーン", "プロトーガ", "アバゴーラ", "アーケン", "アーケオス", "ヤブクロン", "ダストダス", "ゾロア", "ゾロアーク", "チラーミィ", "チラチーノ", "ゴチム", "ゴチミル", "ゴチルゼル", "ユニラン", "ダブラン", "ランクルス", "コアルヒー", "スワンナ", "バニプッチ", "バニリッチ", "バイバニラ", "シキジカ", "メブキジカ", "エモンガ", "カブルモ", "シュバルゴ", "タマゲタケ", "モロバレル", "プルリル", "ブルンゲル", "ママンボウ", "バチュル", "デンチュラ", "テッシード", "ナットレイ", "ギアル", "ギギアル", "ギギギアル", "シビシラス", "シビビール", "シビルドン", "リグレー", "オーベム", "ヒトモシ", "ランプラー", "シャンデラ", "キバゴ", "オノンド", "オノノクス", "クマシュン", "ツンベアー", "フリージオ", "チョボマキ", "アギルダー", "マッギョ", "コジョフー", "コジョンド", "クリムガン", "ゴビット", "ゴルーグ", "コマタナ", "キリキザン", "バッフロン", "ワシボン", "ウォーグル", "バルチャイ", "バルジーナ", "クイタラン", "アイアント", "モノズ", "ジヘッド", "サザンドラ", "メラルバ", "ウルガモス", "コバルオン", "テラキオン", "ビリジオン", "トルネロス", "ボルトロス", "レシラム", "ゼクロム", "ランドロス", "キュレム", "ケルディオ", "メロエッタ", "ゲノセクト", "ハリマロン", "ハリボーグ", "ブリガロン", "フォッコ", "テールナー", "マフォクシー", "ケロマツ", "ゲコガシラ", "ゲッコウガ", "ホルビー", "ホルード", "ヤヤコマ", "ヒノヤコマ", "ファイアロー", "コフキムシ", "コフーライ", "ビビヨン", "シシコ", "カエンジシ", "フラベベ", "フラエッテ", "フラージェス", "メェークル", "ゴーゴート", "ヤンチャム", "ゴロンダ", "トリミアン", "ニャスパー", "ニャオニクス", "ヒトツキ", "ニダンギル", "ギルガルド", "シュシュプ", "フレフワン", "ペロッパフ", "ペロリーム", "マーイーカ", "カラマネロ", "カメテテ", "ガメノデス", "クズモー", "ドラミドロ", "ウデッポウ", "ブロスター", "エリキテル", "エレザード", "チゴラス", "ガチゴラス", "アマルス", "アマルルガ", "ニンフィア", "ルチャブル", "デデンネ", "メレシー", "ヌメラ", "ヌメイル", "ヌメルゴン", "クレッフィ", "ボクレー", "オーロット", "バケッチャ", "パンプジン", "カチコール", "クレベース", "オンバット", "オンバーン", "ゼルネアス", "イベルタル", "ジガルデ", "ディアンシー", "フーパ", "ボルケニオン", "モクロー", "フクスロー", "ジュナイパー", "ニャビー", "ニャヒート", "ガオガエン", "アシマリ", "オシャマリ", "アシレーヌ", "ツツケラ", "ケララッパ", "ドデカバシ", "ヤングース", "デカグース", "アゴジムシ", "デンヂムシ", "クワガノン", "マケンカニ", "ケケンカニ", "オドリドリ", "アブリー", "アブリボン", "イワンコ", "ルガルガン", "ヨワシ", "ヒドイデ", "ドヒドイデ", "ドロバンコ", "バンバドロ", "シズクモ", "オニシズクモ", "カリキリ", "ラランテス", "ネマシュ", "マシェード", "ヤトウモリ", "エンニュート", "ヌイコグマ", "キテルグマ", "アマカジ", "アママイコ", "アマージョ", "キュワワー", "ヤレユータン", "ナゲツケサル", "コソクムシ", "グソクムシャ", "スナバァ", "シロデスナ", "ナマコブシ", "タイプ：ヌル", "シルヴァディ", "メテノ", "ネッコアラ", "バクガメス", "トゲデマル", "ミミッキュ", "ハギギシリ", "ジジーロン", "ダダリン", "ジャラコ", "ジャランゴ", "ジャラランガ", "カプ・コケコ", "カプ・テテフ", "カプ・ブルル", "カプ・レヒレ", "コスモッグ", "コスモウム", "ソルガレオ", "ルナアーラ", "ウツロイド", "マッシブーン", "フェローチェ", "デンジュモク", "テッカグヤ", "カミツルギ", "アクジキング", "ネクロズマ", "マギアナ", "マーシャドー", "ベベノム", "アーゴヨン", "ツンデツンデ", "ズガドーン", "ゼラオラ", "メルタン", "メルメタル", "サルノリ", "バチンキー", "ゴリランダー", "ヒバニー", "ラビフット", "エースバーン", "メッソン", "ジメレオン", "インテレオン", "ホシガリス", "ヨクバリス", "ココガラ", "アオガラス", "アーマーガア", "サッチムシ", "レドームシ", "イオルブ", "クスネ", "フォクスライ", "ヒメンカ", "ワタシラガ", "ウールー", "バイウールー", "カムカメ", "カジリガメ", "ワンパチ", "パルスワン", "タンドン", "トロッゴン", "セキタンザン", "カジッチュ", "アップリュー", "タルップル", "スナヘビ", "サダイジャ", "ウッウ", "サシカマス", "カマスジョー", "エレズン", "ストリンダー", "ヤクデ", "マルヤクデ", "タタッコ", "オトスパス", "ヤバチャ", "ポットデス", "ミブリム", "テブリム", "ブリムオン", "ベロバー", "ギモー", "オーロンゲ", "タチフサグマ", "ニャイキング", "サニゴーン", "ネギガナイト", "バリコオル", "デスバーン", "マホミル", "マホイップ", "タイレーツ", "バチンウニ", "ユキハミ", "モスノウ", "イシヘンジン", "コオリッポ", "イエッサン", "モルペコ", "ゾウドウ", "ダイオウドウ", "パッチラゴン", "パッチルドン", "ウオノラゴン", "ウオチルドン", "ジュラルドン", "ドラメシヤ", "ドロンチ", "ドラパルト", "ザシアン", "ザマゼンタ", "ムゲンダイナ", "ダクマ", "ウーラオス", "ザルード", "レジエレキ", "レジドラゴ", "ブリザポス", "レイスポス", "バドレックス", "アヤシシ", "バサギリ", "ガチグマ", "イダイトウ", "オオニューラ", "ハリーマン", "ラブトロス", "ニャオハ", "ニャローテ", "マスカーニャ", "ホゲータ", "アチゲータ", "ラウドボーン", "クワッス", "ウェルカモ", "ウェーニバル", "グルトン", "パフュートン", "タマンチュラ", "ワナイダー", "マメバッタ", "エクスレッグ", "パモ", "パモット", "パーモット", "ワッカネズミ", "イッカネズミ", "パピモッチ", "バウッツェル", "ミニーブ", "オリーニョ", "オリーヴァ", "イキリンコ", "コジオ", "ジオヅム", "キョジオーン", "カルボウ", "グレンアルマ", "ソウブレイズ", "ズピカ", "ハラバリー", "カイデン", "タイカイデン", "オラチフ", "マフィティフ", "シルシュルー", "タギングル", "アノクサ", "アノホラグサ", "ノノクラゲ", "リククラゲ", "ガケガニ", "カプサイジ", "スコヴィラン", "シガロコ", "ベラカス", "ヒラヒナ", "クエスパトラ", "カヌチャン", "ナカヌチャン", "デカヌチャン", "ウミディグダ", "ウミトリオ", "オトシドリ", "ナミイルカ", "イルカマン", "ブロロン", "ブロロローム", "モトトカゲ", "ミミズズ", "キラーメ", "キラフロル", "ボチ", "ハカドッグ", "カラミンゴ", "アルクジラ", "ハルクジラ", "ミガルーサ", "ヘイラッシャ", "シャリタツ", "コノヨザル", "ドオー", "リキキリン", "ノココッチ", "ドドゲザン", "イダイナキバ", "サケブシッポ", "アラブルタケ", "ハバタクカミ", "チヲハウハネ", "スナノケガワ", "テツノワダチ", "テツノツツミ", "テツノカイナ", "テツノコウベ", "テツノドクガ", "テツノイバラ", "セビエ", "セゴール", "セグレイブ", "コレクレー", "サーフゴー", "チオンジェン", "パオジアン", "ディンルー", "イーユイ", "トドロクツキ", "テツノブジン", "コライドン", "ミライドン", "ウネルミナモ", "テツノイサハ", "カミッチュ", "チャデス", "ヤバソチャ", "イイネイヌ", "マシマシラ", "キチキギス", "オーガポン", "ブリジュラス", "タケルライコ", "テツノカシラ", "テラパゴス"],
    }
}

const GAME_ROOM_LOCATION_NAME_PREFIX = "GameRoom-";

class GameRoomManager {
    roomList: Record<number, GameRoom>;

    constructor() {
        this.roomList = {};
        for (let num = 1; num <= 10; num++) {
            const locationName = `${GAME_ROOM_LOCATION_NAME_PREFIX}${num}`;
            if (ScriptMap.hasLocation(locationName)) {
                //@ts-ignore
                this.roomList[num] = new GameRoom(num, ScriptMap.getLocation(locationName));
            }
        }
    }

    getRoomByRoomNum(roomNum: number) {
        return this.roomList[roomNum];
    }

    refreshGameLobbyWidget() {
        for (let player of ScriptApp.players) {
            if (player.tag.gameLobbyWidget) {
                player.tag.gameLobbyWidget.sendMessage({
                    type: "refreshGameLobbyWidget",
                    roomList: this.roomList,
                });
            }
        }
    }
}

interface GameRoomPlayerInfo {
    name: string;
    title: string;
    level: number;
    abandonCount: number;
    agreedKickPlayerIDs: String[];
    isReady: boolean;
}

interface Coordinate {
    x: number;
    y: number;
}

const GAMEROOM_MAX_PLAYER_COUNT = 6;
const GAMEROOM_WIDTH = 10;
const GAMEROOM_HEIGHT = 10;

let DEBUG = true;

class GameRoom {
    gameStarted: boolean;
    // state
    roomNum: number;
    kickList: string[];
    participatingPlayers: Record<string, GameRoomPlayerInfo>;
    turnCount: number;

    gameTime: number;

    currentQuiz: string;
    currentQuizCategory: string;

    locationInstalledCoordinate: Coordinate;

    constructor(roomNum: number, locationInstalledCoordinate: Coordinate) {
        this.gameStarted = false;
        this.roomNum = roomNum;
        this.kickList = [];
        this.participatingPlayers = {};
        this.turnCount = 0;
        this.currentQuiz = "";
        this.currentQuizCategory = ""
        this.gameTime = 0;
        this.locationInstalledCoordinate = locationInstalledCoordinate;
    }

    handleJoinPlayer(player: ScriptPlayer) {
        if (player.tag.kickUntil) {
            //@ts-ignore
            if (player.tag.kickUntil > Time.GetUtcTime()) {
                player.showCenterLabel("강퇴를 당해서 30초간 게임에 참가할 수 없습니다.");
                return;
            }
        }

        if (this.getPlayerCount() > GAMEROOM_MAX_PLAYER_COUNT) {
            player.showCenterLabel("인원이 가득 차서 참여 할 수 없습니다.");
            return;
        }

        if (!player.tag.participatingRoomNum) {
            player.tag.participatingRoomNum = this.roomNum;
            this.participatingPlayers[player.id] = {
                name: player.name,
                title: player.isGuest ? "비로그인" : "로그인",
                level: player.tag.level ?? 1,
                abandonCount: player.tag.abandonCount ?? 0,
                agreedKickPlayerIDs: [],
                isReady: false
            };
            this.playSoundToPlayers("joinSound.mp3");
            player.spawnAt(Math.floor(this.locationInstalledCoordinate.x + GAMEROOM_WIDTH / 2), Math.floor(this.locationInstalledCoordinate.y + GAMEROOM_HEIGHT / 2), 1);
            this.sendMessageToPlayerWidget({
                type: "join",
                roomData: this,
                id: player.id,
            });

            _gameRoomManager.refreshGameLobbyWidget();
        }
    }

    playSoundToPlayers(fileName: string) {
        for (const playerId of Object.keys(this.participatingPlayers)) {
            const player = ScriptApp.getPlayerByID(playerId);
            if (player) {
                player.playSound(fileName, false, true);
            }
        }
    }

    handleLeavePlayer(player: ScriptPlayer, leaveMap = false) {
        if (!this.validatePlayer(player)) return;
        delete this.participatingPlayers[player.id];
        if (!leaveMap) {
            player.tag.participatingRoomNum = null;
            player.spawnAtLocation("lobby", 1);
        }
    }

    startGame() {
        if (DEBUG) {
            ScriptApp.sayToAll("게임 시작!")
        }
    }

    handlePlayerToggleReady(player: ScriptPlayer) {
        if (!this.validatePlayer(player)) return;
        if (this.participatingPlayers[player.id].isReady) {
            this.participatingPlayers[player.id].isReady = false;
            this.sendMessageToPlayerWidget({
                type: "cancel-ready",
                id: player.id,
            });
        } else {
            this.participatingPlayers[player.id].isReady = true;
            this.sendMessageToPlayerWidget({
                type: "ready",
                id: player.id,
            });
            if (this.checkAllPlayerIsReady()) {
                this.startGame();
            }
        }
    }

    checkAllPlayerIsReady() {
        const playerCount = this.getPlayerCount();
        let readyCount = 0;
        for (const playerId of Object.keys(this.participatingPlayers)) {
            const gameRoomPlayerStatus = this.participatingPlayers[playerId];
            if (gameRoomPlayerStatus.isReady) readyCount++;
        }

        return playerCount === readyCount;
    }

    getPlayerCount() {
        return Object.keys(this.participatingPlayers).length;
    }

    processPlayerKickVote(player: ScriptPlayer, targetId: string) {
        if (!this.validatePlayer(player)) return;
        let kickCount = 0;

        if (this.participatingPlayers[player.id].agreedKickPlayerIDs.indexOf(targetId) === -1) {
            this.participatingPlayers[player.id].agreedKickPlayerIDs.push(targetId)
            this.sendMessageToPlayerWidget({
                type: "kick",
                id: targetId,
            });
        } else {
            this.participatingPlayers[player.id].agreedKickPlayerIDs.splice(this.participatingPlayers[player.id].agreedKickPlayerIDs.indexOf(targetId), 1);
            this.sendMessageToPlayerWidget({
                type: "cancle-kick",
                id: targetId,
            });
        }

        //targetId 의 강퇴 투표 수 세기
        for (const playerId of Object.keys(this.participatingPlayers)) {
            const gameRoomPlayerStatus = this.participatingPlayers[playerId];
            if (gameRoomPlayerStatus.agreedKickPlayerIDs.indexOf(targetId) > -1) {
                kickCount++;
            }
        }

        if (kickCount >= 3) {
            const targetPlayer = ScriptApp.getPlayerByID(targetId);
            if (targetPlayer) {
                this.handleLeavePlayer(targetPlayer);
            }
        }
    }

    sendMessageToPlayerWidget(data: any) {
        for (let id of Object.keys(this.participatingPlayers)) {
            let player = ScriptApp.getPlayerByID(id);
            if (!player) continue;
            const widget = player.tag.gameLobbyWidget;
            if (widget) {
                switch (data?.type) {
                    case "join":
                        widget.sendMessage({
                            type: "join",
                            data: data,
                        });
                        break;
                    case "ready":
                        widget.sendMessage({
                            type: "ready",
                            id: data.id,
                        });
                        break;
                    case "cancel-ready":
                        widget.sendMessage({
                            type: "cancel-ready",
                            id: data.id,
                        });
                        break;
                    case "kick":
                        widget.sendMessage({
                            type: "kick",
                            id: data.id,
                        });
                        break;
                    case "cancle-kick":
                        widget.sendMessage({
                            type: "cancle-kick",
                            id: data.id,
                        });
                        break;
                    case "leave":
                        widget.sendMessage({
                            type: "leave",
                            id: data.id,
                            kickList: data.kickList,
                        });
                        break;
                }
            }

        }
    }

    private validatePlayer(player: ScriptPlayer) {
        return this.roomNum === player.tag.participatingRoomNum && this.participatingPlayers.hasOwnProperty(player.id);
    }
}

let _currentQuiz = "";
let _currentCategory = "";
let _drawerId = "";
let _start = false;
let _creatorId = "";
let _isMiniGame = false;
let _gameTime = 0;

let _gameRoomManager: GameRoomManager;

ScriptApp.onInit.Add(() => {
    if (!_gameRoomManager) {
        _gameRoomManager = new GameRoomManager();
    }
})

ScriptApp.onJoinPlayer.Add(function (player: ScriptPlayer) {
    player.tag = {};

    if (ScriptApp.mapHashID == "yPzLZ7") {
        //@ts-ignore
        player.setCameraTarget(70, 27, 0);
    }

    // 미니게임으로 실행한 경우
    if (player.id == ScriptApp.creatorID) {
        _isMiniGame = true;
        //@ts-ignore
        _language = Language[player.language];
        initGame(player);
    }
    // 노멀앱으로 실행한 경우
    else if (!_creatorId) {
        if (player.isMobile) {
            player.tag.widget = player.showWidget("GameLobby.html", "top", 400, 350);
            ScriptApp.putMobilePunch();
        } else {
            player.tag.widget = player.showWidget("GameLobby.html", "topright", 400, 350);
        }
        player.tag.gameLobbyWidget.sendMessage({
            type: "init",
            id: player.id,
            isMobile: player.isMobile,
            roomList: _gameRoomManager.roomList
        });

        // @ts-ignore
        player.tag.gameLobbyWidget.onMessage.Add((player, data) => handleGameLobbyWidgetMessage(player, data))

        // _creatorId = player.id;
        // initGame(player);
    }
});

ScriptApp.onLeavePlayer.Add(function (player) {
    if (_drawerId === player.id) {
        ScriptApp.runLater(() => {
            initGame(ScriptApp.players[Math.floor(Math.random() * ScriptApp.players.length)]);

        }, 0.1)
    }
})

function handleGameLobbyWidgetMessage(player: ScriptPlayer, data: any) {
    switch (data.type) {
        case "join": {
            if (player.tag.participatingRoomNum) {
                player.showCenterLabel("이미 참여중입니다.", 0xffffff, 0x000000, 300, 5000);
                return;
            }

            const gameRoom = _gameRoomManager.getRoomByRoomNum(parseInt(data.roomNum));
            if (gameRoom.gameStarted) {
                player.showCenterLabel("이미 게임을 시작했습니다.", 0xffffff, 0x000000, 300, 5000);
                return;
            }

            gameRoom.handleJoinPlayer(player);
        }

            break;
        case "ready": {
            if (player.tag.participatingRoomNum) {
                const gameRoom = _gameRoomManager.getRoomByRoomNum(player.tag.participatingRoomNum);
                gameRoom.handlePlayerToggleReady(player);
            }
        }
            break;
        case "cancel-ready": {
            if (player.tag.participatingRoomNum) {
                const gameRoom = _gameRoomManager.getRoomByRoomNum(player.tag.participatingRoomNum);
                gameRoom.handlePlayerToggleReady(player);
            }
        }
            break;
        case "kick": {
            if (player.tag.participatingRoomNum) {
                const gameRoom = _gameRoomManager.getRoomByRoomNum(player.tag.participatingRoomNum);
                gameRoom.processPlayerKickVote(player, data.targetId)
            }
        }
            break;
        case "quit": {
            if (player.tag.participatingRoomNum) {
                const gameRoom = _gameRoomManager.getRoomByRoomNum(player.tag.participatingRoomNum);
                gameRoom.handleLeavePlayer(player);
            }
        }
            break;
    }
}

function initGame(player: ScriptPlayer) {
    _start = false;
    for (let player of ScriptApp.players) {
        player.tag.join = false;
        if (player.tag.widget) {
            player.tag.widget.destroy();
            player.tag.widget = null;
        }
        if (player.tag.selectWidget) {
            player.tag.selectWidget.destroy();
            player.tag.selectWidget = null;
        }
    }

    _drawerId = player.id;
    player.tag.initCount = 10;
    player.tag.selectWidget = player.showWidget("selectCategory.html", "middle", 360, 400);
    player.tag.selectWidget.sendMessage({
        type: "init",
        //@ts-ignore
        localizeContainer: LocalizeContainer[player.language]
    })
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
                const playerId = player.id;
                //@ts-ignore
                player.showPrompt(LocalizeContainer[player.language].category_free, function (inputText) {
                        if (_drawerId !== playerId) return;
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
                        //@ts-ignore
                        content: LocalizeContainer[player.language].prompt_desc, // 설명
                        confirmVariant: 'primary', // 확인 버튼 색상 'primary' | 'alert'
                        //@ts-ignore
                        placeholder: LocalizeContainer[player.language].prompt_placeholder,// 입력칸의 placeholder
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
                if (_start === false) return;
                initGame(ScriptApp.players[Math.floor(Math.random() * ScriptApp.players.length)]);
            }
        } else if (type == "closeWidget") {
            if (_isMiniGame) {
                ScriptApp.forceDestroy();
            } else {
                player.tag.selectWidget.destroy();
                player.tag.selectWidget = null;
                if (_start === false) return;
                initGame(ScriptApp.players[Math.floor(Math.random() * ScriptApp.players.length)]);
            }
        }
    })
}

const _GAMETIME = 70;

function startGame() {
    ScriptApp.playSound("init.mp3", false, true);
    _gameTime = _GAMETIME;
    _start = true;
    // let category = DrawCategory.FREE
    // if (!quiz) {
    //     category = getRandomCategory();
    //     _currentQuiz = getRandomQuiz(category);
    // }

    // _drawerId = ScriptApp.players[Math.floor(Math.random() * ScriptApp.players.length)].id;
    const drawerName = ScriptApp.getPlayerByID(_drawerId).name;
    for (const player of ScriptApp.players) {
        if (!player) continue;
        player.tag.join = true;
        if (player.tag.widget) {
            player.tag.widget.destroy();
        }
        if (player.tag.selectWidget) {
            player.tag.selectWidget.destroy();
            player.tag.selectWidget = null;
        }
        if (player.isMobile) {
            player.tag.widget = player.showWidget("canvas.html", "sidebar", 750, 500);
        } else {
            player.tag.widget = player.showWidget("canvas.html", "middleleft", 750, 500);
        }

        player.tag.widget.sendMessage({
            type: "init",
            //@ts-ignore
            category: LocalizeContainer[_language][_currentCategory],
            quiz: player.id === _drawerId ? _currentQuiz : "",
            drawerName: drawerName,
            isMobile: player.isMobile,
            isDrawer: player.id === _drawerId,
            //@ts-ignore
            localizeContainer: LocalizeContainer[player.language]
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
    let quizArr = _quizDB[_language][getCategoryDescription(category)];
    return quizArr[Math.floor(Math.random() * quizArr.length)]
}

function getCategoryDescription(key: keyof typeof DrawCategory): DrawCategory {
    return DrawCategory[key];
}

function showLabelTypeF(player: ScriptPlayer, key: string, text1: string, text2: string) {
    const isMobile = player.isMobile;
    const topGap = isMobile ? 10 : -2; // 60px from the top on mobile and 48px on PC.
    /**
     * size-based @labelPercentWidth
     * XL: isMobile ? 90 : 50;
     * L: isMobile ? 80 : 40;
     * M: isMobile ? 70 : 28;
     * S: isMobile ? 60 : 20
     */
    const labelPercentWidth = isMobile ? 90 : 50;
    const labelDisplayTime = 2000;

    const parentStyle = `
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    text-align: center;
    `;

    const firstRowStyle = `
    font-size: ${isMobile ? "16px" : "18px"};
    font-weight: 700; 
    color: #FFEB3A;`;

    const secondRowStyle = `
    font-size: ${isMobile ? "16px" : "18px"};
    font-weight: 700;
    color: white;`;

    const customLabelOption = {
        key: key,
        borderRadius: '12px',
        fontOpacity: false,
        padding: '8px',
    }

    let htmlStr = `<span style="${parentStyle}">
        <span style="${firstRowStyle}">${text1}</span>
        <span style="${secondRowStyle}">${text2}</span>
    </span>`;
    //@ts-ignore
    player.showCustomLabel(htmlStr, 0xffffff, 0x27262e, topGap, labelPercentWidth, 0.64, labelDisplayTime, customLabelOption);
}

function showSubLabelTypeI(player: ScriptPlayer, key: string, text1: string) {
    const isMobile = player.isMobile;
    // 10 : -2 //  58 : 49;
    const topGap = isMobile ? 76 : 76; // 모바일은 상단으로 부터 60px, pc는 48px이 되도록 설정한 값
    /**
     * 사이즈에 따른 @labelPercentWidth
     * XL: isMobile ? 90 : 50;
     * L: isMobile ? 80 : 40;
     * M: isMobile ? 70 : 28;
     * S: isMobile ? 60 : 20
     */
    const labelPercentWidth = isMobile ? 60 : 20;
    const labelDisplayTime = 4000;

    const parentStyle = `
    display: flex; 
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    `;

    const firstRowStyle = `
    font-size: ${isMobile ? "14px" : "18px"};
    font-weight: 700; 
    color: white;`;

    const highlightSpanStyle = `
    font-size: ${isMobile ? "14px" : "18px"};
    font-weight: 700; 
    color: #74FADA;
    `;

    const customLabelOption = {
        key: key,
        borderRadius: '12px',
        fontOpacity: false,
        padding: '8px',
    }

    let htmlStr = `<span style="${parentStyle}">
        <span style="${highlightSpanStyle}">${text1}</span>
    </span>`;

    //@ts-ignore
    player.showCustomLabel(htmlStr, 0xffffff, 0x27262e, topGap, labelPercentWidth, 0.64, labelDisplayTime, customLabelOption);
}

let one_sec = 1;


function handleDrawerSelectionTimeout() {
    const drawerPlayer = ScriptApp.getPlayerByID(_drawerId);

    if (!drawerPlayer) return;
    drawerPlayer.tag.initCount--;
    for (const player of ScriptApp.players) {
        //@ts-ignore
        const text = LocalizeContainer[player.language].label_selecting.replace("((name))", drawerPlayer.name).replace("((time))", String(drawerPlayer.tag.initCount)).split("\n");
        showLabelTypeF(player, "main", text[0], text[1]);
    }

    if (!_start && drawerPlayer.tag.initCount <= 0) {
        initGame(ScriptApp.players[Math.floor(Math.random() * ScriptApp.players.length)]);
    }
}

function handleGameInProgress() {
    _gameTime--;
    for (const player of ScriptApp.players) {
        if (player.tag.join) {
            //@ts-ignore
            const text = LocalizeContainer[player.language].label_game_info.replace("((time))", String(_gameTime)).split("\n");
            showLabelTypeF(player, "main", text[0], text[1]);
            if (_gameTime <= 0) {
                //@ts-ignore
                showSubLabelTypeI(player, "sub", LocalizeContainer[player.language].label_answer.replace("((answer))", _currentQuiz))
                initGame(ScriptApp.players[Math.floor(Math.random() * ScriptApp.players.length)])
            }
        } else {
            //@ts-ignore
            const text = LocalizeContainer[player.language].label_game_ing.replace("((time))", String(_gameTime)).split("\n");
            showLabelTypeF(player, "main", text[0], text[1]);
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
        if (text === _currentQuiz || text === String(_currentQuiz).toLowerCase() || text === String(_currentQuiz).toUpperCase()) {
            _start = false;
            ScriptApp.playSound("correct.mp3", false, true);
            for (const otherPlayer of ScriptApp.players) {
                //@ts-ignore
                showSubLabelTypeI(otherPlayer, "sub", LocalizeContainer[otherPlayer.language].label_answer_player.replace("((name))", player.name).replace("((answer))", _currentQuiz))
            }

            initGame(player);
            // for (const player of ScriptApp.players) {
            //     if (!player) continue;
            //     if (player.tag.widget) {
            //         player.tag.widget.destroy();
            //         player.tag.widget = null;
            //     }
            // }
        } else {
            //@ts-ignore
            showSubLabelTypeI(player, "sub", `${LocalizeContainer[player.language].label_wrong_text}`);
            //@ts-ignore
            player.playSound("incorrect.mp3", false, true, "wrong", 0.6);
        }
    }
})