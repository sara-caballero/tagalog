const ITEMS = {};
function I(id, lesson, topic, tl, en, o) {
  ITEMS[id] = Object.assign({ id, lesson, topic, tl, en }, o || {});
}

I("kumusta","trial","greet","Kumusta?","How are you?",{syl:"ku-mus-ta",em:"👋",alt:["Kamusta?"],es:"From Spanish ¿Cómo está?",mn:"Say “¿Cómo está?” fast and it melts into Kumusta.",note:"Also spelled Kamusta. Both are correct and you will see both."});
I("mabuti","trial","greet","Mabuti","Good / fine",{syl:"ma-bu-ti",em:"🙂",mn:"“Ma, BOO-tiful day!” Everything is good: mabuti.",ex:["Mabuti! Ikaw?","Good! And you?"]});
I("ayoslang","trial","greet","Ayos lang","I'm good / I'm fine",{syl:"a-yos lang",em:"👌",lit:[["ayos","okay, in order"],["lang","just, only"]],mn:"Ayos sounds like “eh, yes”: things are in order. Lang = just."});
I("okaylang","trial","greet","Okay lang","I'm okay / I'm fine",{syl:"o-kay lang",em:"👍",lit:[["okay","okay (English)"],["lang","just"]],note:"Pure Taglish: English okay + Tagalog lang."});
I("umaga","trial","greet","Magandang umaga","Good morning",{syl:"ma-GAN-dang u-MA-ga",em:"🌅",lit:[["maganda","beautiful, good"],["-ng","linker"],["umaga","morning"]],mn:"u-MA-ga: you wake up and shout “Ma!” for breakfast."});
I("tanghali","trial","greet","Magandang tanghali","Good noon",{syl:"ma-GAN-dang tang-HA-li",em:"☀️",lit:[["maganda","beautiful, good"],["-ng","linker"],["tanghali","noon"]],mn:"tang-HA-li: the sun is HIGH at noon.",note:"Used around midday, roughly 11 am to 1 pm."});
I("hapon","trial","greet","Magandang hapon","Good afternoon",{syl:"ma-GAN-dang HA-pon",em:"🌤️",lit:[["maganda","beautiful, good"],["-ng","linker"],["hapon","afternoon"]],mn:"Hapon also means Japanese. Picture a Japanese tea break every afternoon."});
I("gabi","trial","greet","Magandang gabi","Good evening",{syl:"ma-GAN-dang ga-BI",em:"🌙",lit:[["maganda","beautiful, good"],["-ng","linker"],["gabi","evening, night"]],mn:"ga-BI: gabby friends chatting late into the night.",note:"Stress the end: ga-BI. Said GA-bi, it means taro root."});
I("araw","trial","greet","Magandang araw","Good day",{syl:"ma-gan-dang a-raw",em:"🌞",lit:[["maganda","beautiful, good"],["-ng","linker"],["araw","day, sun"]],note:"Araw means both day and sun. This greeting works at any hour."});
I("ikina","trial","greet","Ikinagagalak kitang makilala","Nice to meet you",{syl:"i-ki-na-ga-ga-lak ki-tang ma-ki-la-la",em:"🤝",lit:[["ikina-","shows a feeling"],["gagalak","happy"],["kitang","you (from me)"],["makilala","to meet, get to know"]],mn:"Chunk it into three beats: ikinagagalak · kitang · makilala. “Ga-ga-lak” sounds like a giggle: you are happy."});
I("ikinadin","trial","greet","Ikinagagalak din kitang makilala","Nice to meet you too",{syl:"i-ki-na-ga-ga-lak din ki-tang ma-ki-la-la",em:"🤝",note:"Din = too. It follows ikinagagalak, which ends in a consonant (k)."});
I("paalam","trial","greet","Paalam","Goodbye",{syl:"pa-a-lam",em:"👋",mn:"Waving at a lamb: “Pa, a lamb!” Pa-a-lam, goodbye!"});
I("ingat","trial","greet","Ingat ka","Take care",{syl:"i-ngat ka",em:"🛡️",lit:[["ingat","care, be careful"],["ka","you"]],mn:"Stay IN the GATE where it is safe. Ingat!"});
I("ingatrin","trial","greet","Ingat ka rin","You take care too",{syl:"i-ngat ka rin",em:"🛡️",note:"Rin follows ka, which ends in a vowel."});
I("salamat","trial","greet","Salamat","Thank you",{syl:"sa-la-mat",em:"🙏",mn:"Someone gives you a MAT for your SALA (living room). Sala-mat!"});
I("maraming","trial","greet","Maraming salamat","Thank you very much",{syl:"ma-ra-ming sa-la-mat",em:"🙏",lit:[["marami","many"],["-ng","linker"],["salamat","thanks"]],mn:"Marami = many. Literally “many thanks”."});
I("po","trial","polite","po","(word of respect)",{syl:"po",em:"🙇",mn:"PO = POlite. Both start with P-O.",note:"Add po to sound respectful with elders, teachers and strangers. It usually goes after the first word or at the end."});
I("kumustapo","trial","polite","Kumusta po?","How are you? (polite)",{syl:"ku-mus-ta po",em:"🙇"});
I("mabutipo","trial","polite","Mabuti po!","I'm good! (polite)",{syl:"ma-bu-ti po",em:"🙂"});
I("oo","trial","polite","Oo","Yes",{syl:"o-o",pron:"oh-oh",em:"✅",mn:"Nodding “oh-oh!” means yes."});
I("hindi","trial","polite","Hindi","No / not",{syl:"hin-di",pron:"heen-dee",em:"❌",mn:"Shake your head: “heen-DEE”. Hindi is no."});
I("opo","trial","polite","Opo","Yes (polite)",{syl:"o-po",pron:"oh-poh",em:"🙇",mn:"Opo = Oo + po. Polite yes."});
I("pangalan","trial","intro","Anong pangalan mo?","What is your name?",{syl:"a-nong pa-nga-lan mo",em:"🏷️",lit:[["ano","what"],["-ng","linker"],["pangalan","name"],["mo","your"]],mn:"Hidden inside pangalan is “ngalan”, an old word for name."});
I("akosi","trial","intro","Ako si …","I am … (name)",{syl:"a-ko si",em:"🙋",pat:1,ex:["Ako si Maria.","I am Maria."],lit:[["ako","I, me"],["si","marker before one person's name"]],note:"Or simply say your name."});
I("buong","trial","intro","Anong buong pangalan mo?","What is your full name?",{syl:"a-nong bu-ong pa-nga-lan mo",em:"📛",lit:[["ano","what"],["-ng","linker"],["buo","whole, complete"],["-ng","linker"],["pangalan","name"],["mo","your"]],mn:"BUO = the whole thing, like a whole round BOWL."});
I("palayaw","trial","intro","Anong palayaw mo?","What is your nickname?",{syl:"a-nong pa-la-yaw mo",em:"😎",lit:[["ano","what"],["-ng","linker"],["palayaw","nickname"],["mo","your"]],mn:"Pa-LA-yaw sounds like PLAY: your playful name."});
I("angpalayaw","trial","intro","Ang palayaw ko ay …","My nickname is …",{em:"😎",pat:1,ex:["Ang palayaw ko ay Bea.","My nickname is Bea."],lit:[["ang","the (marks the subject)"],["palayaw","nickname"],["ko","my"],["ay","is (links subject and description)"]]});
I("walapalayaw","trial","intro","Wala po akong palayaw.","I don't have a nickname.",{em:"🚫",lit:[["wala","none, don't have"],["po","respect"],["akong","I + linker"],["palayaw","nickname"]]});
I("ilangtaon","trial","intro","Ilang taon ka na?","How old are you?",{syl:"i-lang ta-on ka na",em:"🎂",lit:[["ilang","how many"],["taon","year"],["ka","you"],["na","already, now"]],mn:"Literally: “How many years are you already?”"});
I("age28","trial","intro","Dalawampu't walong taon na ako.","I am 28 years old.",{em:"🎂",lit:[["dalawampu't","twenty and"],["walong","eight + linker"],["taon","years"],["na","already"],["ako","I"]]});
I("age24","trial","intro","Dalawampu't apat na taon na ako.","I am 24 years old.",{em:"🎂",note:"Apat ends in a consonant, so the linker is na (not -ng)."});
I("age28short","trial","intro","28 na ako.","I'm 28.",{em:"🎂",note:"Everyday Taglish: say the number in English."});
I("tagalogako","trial","taglish","Tagalog ako.","I am Tagalog.",{em:"🏝️"});
I("marunong","trial","taglish","Marunong ako ng Tagalog.","I know (how to speak) Tagalog.",{em:"🗣️",lit:[["marunong","knows how, skilled"],["ako","I"],["ng","object marker"],["Tagalog","Tagalog"]]});
I("lugar","trial","taglish","Maganda ang lugar.","The place is beautiful.",{em:"🏞️",es:"lugar is Spanish for place",note:"Taglish version: Maganda ang place."});

I("hilig","l1","hobby","Anong hilig mo?","What is your hobby?",{syl:"a-nong hi-lig mo",em:"🎨",lit:[["ano","what"],["-ng","linker"],["hilig","hobby, interest"],["mo","your"]],mn:"HI-lig ≈ “he likes”: what do you like doing?"});
I("hiligko","l1","hobby","Hilig ko ang …","My hobby is …",{em:"💛",pat:1,ex:["Hilig ko ang pagbabasa.","My hobby is reading."],lit:[["hilig","hobby"],["ko","my"],["ang","the"]]});
I("pagbabasa","l1","hobby","pagbabasa","reading",{syl:"pag-ba-ba-sa",em:"📚",mn:"Basa = read (and also wet: reading in the bath!).",ex:["Hilig ko ang pagbabasa.","My hobby is reading."]});
I("pagluluto","l1","hobby","pagluluto","cooking",{syl:"pag-lu-lu-to",em:"🍳",mn:"Luto = cook. LU-to: “Look, toast!”",ex:["Hilig ko ang pagluluto.","My hobby is cooking."]});
I("paglalakbay","l1","hobby","paglalakbay","traveling",{syl:"pag-la-lak-bay",em:"✈️",mn:"Lakbay = journey. Picture a LAKE by the BAY on your trip.",ex:["Hilig ko ang paglalakbay.","My hobby is traveling."]});
I("pagpipinta","l1","hobby","pagpipinta","painting",{syl:"pag-pi-pin-ta",em:"🖌️",es:"Spanish pintar, pintura",ex:["Hilig ko ang pagpipinta.","My hobby is painting."]});
I("pagsusulat","l1","hobby","pagsusulat","writing",{syl:"pag-su-su-lat",em:"✍️",mn:"Sulat = write, letter. Sue LAT-er writes you a letter.",ex:["Hilig ko ang pagsusulat.","My hobby is writing."]});
I("paghahalaman","l1","hobby","paghahalaman","gardening",{syl:"pag-ha-ha-la-man",em:"🌱",mn:"Halaman = plant. “Ha! la MAN loves plants.”",ex:["Hilig ko ang paghahalaman.","My hobby is gardening."]});
I("paghahiking","l1","hobby","pagha-hiking","hiking",{syl:"pag-ha-hi-king",em:"🥾",alt:["paghahiking"],note:"Taglish: pag + repeated sound + English hiking.",ex:["Hilig ko ang pagha-hiking.","My hobby is hiking."]});
I("pagkakamping","l1","hobby","pagkakamping","camping",{syl:"pag-ka-kam-ping",em:"⛺",note:"Taglish built on English camping.",ex:["Hilig ko ang pagkakamping.","My hobby is camping."]});
I("pagkanta","l1","hobby","pagkanta","singing",{syl:"pag-kan-ta",em:"🎤",es:"Spanish cantar",ex:["Hilig ko ang pagkanta.","My hobby is singing."]});
I("hobbyat","l1","hobby","Hilig ko ang pagkanta at pagbabasa.","My hobbies are singing and reading.",{em:"🎤",note:"At = and."});
I("tagasaan","l1","origin","Taga saan ka?","Where are you from?",{syl:"ta-ga sa-an ka",em:"🌍",alt:["Taga-saan ka?"],lit:[["taga","from, native of"],["saan","where"],["ka","you"]],mn:"Remember taga-ilog = “from the river”. Taga = from."});
I("tagaako","l1","origin","Taga … ako.","I'm from …",{em:"📍",pat:1,ex:["Taga France ako.","I'm from France."]});
I("tagapilipinas","l1","origin","Taga Pilipinas ako.","I'm from the Philippines.",{em:"🏝️"});
I("pinanganak","l1","origin","Saan ka pinanganak?","Where were you born?",{syl:"sa-an ka pi-na-nga-nak",em:"👶",lit:[["saan","where"],["ka","you"],["pinanganak","was born"]],mn:"Hear ANAK (child) hidden in pinang-ANAK: where were you a newborn?"});
I("sa","l1","origin","Sa …","In … / at …",{em:"📌",pat:1,ex:["Sa Maynila.","In Manila."],note:"Answer a saan (where) question with sa + place."});
I("lumaki","l1","origin","Saan ka lumaki?","Where did you grow up?",{syl:"sa-an ka lu-ma-ki",em:"🏡",lit:[["saan","where"],["ka","you"],["lumaki","grew up"]],mn:"Laki = big. Lumaki = became big, grew up."});
I("trabaho","l1","job","Anong trabaho mo?","What is your job?",{syl:"a-nong tra-ba-ho mo",em:"💼",es:"Spanish trabajo",lit:[["ano","what"],["-ng","linker"],["trabaho","job, work"],["mo","your"]]});
I("akoay","l1","job","Ako ay …","I am a … (job)",{em:"🙋",pat:1,ex:["Ako ay guro.","I am a teacher."]});
I("angtrabaho","l1","job","Ang trabaho ko ay …","My job is …",{em:"💼",pat:1,ex:["Ang trabaho ko ay inhinyero.","My job is engineer."]});
I("guro","l1","job","guro","teacher",{syl:"gu-ro",em:"🧑‍🏫",mn:"A guru is a teacher: guro.",ex:["Ako ay guro.","I am a teacher."]});
I("estudyante","l1","job","estudyante","student",{syl:"es-tu-dyan-te",em:"🎓",es:"Spanish estudiante",ex:["Ako ay estudyante.","I am a student."]});
I("doktor","l1","job","doktor / doktora","doctor",{syl:"dok-tor / dok-to-ra",em:"🩺",alt:["doktor","doktora"],es:"Spanish doctor / doctora",note:"Doktora for a woman.",ex:["Ako ay doktor.","I am a doctor."]});
I("inhinyero","l1","job","inhinyero","engineer",{syl:"in-hin-ye-ro",em:"⚙️",es:"Spanish ingeniero",ex:["Ako ay inhinyero.","I am an engineer."]});
I("mangaawit","l1","job","mang-aawit","singer",{syl:"mang-a-a-wit",em:"🎙️",alt:["mangaawit"],mn:"Awit = song. A mang-aawit makes songs.",ex:["Ako ay mang-aawit.","I am a singer."]});
I("abogado","l1","job","abogado / abogada","lawyer",{syl:"a-bo-ga-do / a-bo-ga-da",em:"⚖️",alt:["abogado","abogada"],es:"Spanish abogado / abogada",note:"Abogada for a woman.",ex:["Ako ay abogado.","I am a lawyer."]});
I("negosyante","l1","job","negosyante","businessperson",{syl:"ne-go-syan-te",em:"📈",es:"Spanish negociante",ex:["Ako ay negosyante.","I am a businessperson."]});

I("gusto","l2","gusto","gusto","like / want",{syl:"gus-to",em:"👍",es:"Spanish gusto (me gusta)"});
I("ayaw","l2","gusto","ayaw","don't want / dislike",{syl:"a-yaw",em:"👎",mn:"“Ay, aw, no thanks!” Ayaw."});
I("gustosorbetes","l2","gusto","Gusto ko ng sorbetes.","I want ice cream.",{em:"🍦",es:"sorbete",lit:[["gusto","want, like"],["ko","I"],["ng","object marker"],["sorbetes","ice cream"]]});
I("ayawsorbetes","l2","gusto","Ayaw ko ng sorbetes.","I don't want ice cream.",{em:"🍦",lit:[["ayaw","don't want"],["ko","I"],["ng","object marker"],["sorbetes","ice cream"]]});
I("anonggusto","l2","gusto","Anong gusto mo?","What do you like / want?",{syl:"a-nong gus-to mo",em:"🤔"});
I("anongayaw","l2","gusto","Anong ayaw mo?","What don't you like?",{syl:"a-nong a-yaw mo",em:"🙅"});
I("gustobasa","l2","gusto","Gusto ko ang pagbabasa.","I like reading.",{em:"📚",note:"Ang points to the specific thing you are talking about."});
I("ayawkanta","l2","gusto","Ayaw ko ang pagkanta.","I don't like singing.",{em:"🎤"});
I("sobranggusto","l2","gusto","Sobrang gusto ko ang pagluluto.","I really like cooking.",{em:"🍳",es:"Spanish sobra (excess)",lit:[["sobra","a lot, very"],["-ng","linker"],["gusto","like"],["ko","I"],["ang","the"],["pagluluto","cooking"]]});
I("gustonggusto","l2","gusto","Gustong gusto ko ang …","I really like …",{em:"💖",pat:1,ex:["Gustong gusto ko ang pagkanta.","I really like singing."]});
I("ayawnaayaw","l2","gusto","Ayaw na ayaw ko ang …","I really don't like …",{em:"🙅",pat:1,ex:["Ayaw na ayaw ko ang pagluluto.","I really don't like cooking."]});
I("gutom","l2","feel","Gutom po ako.","I'm hungry.",{syl:"gu-tom po a-ko",em:"😋",alt:["Nagugutom po ako."],lit:[["gutom","hungry"],["po","respect"],["ako","I"]],mn:"GOO-tom: Tom's tummy goes “goo” when he is hungry.",note:"Also: Nagugutom po ako."});
I("masaya","l2","feel","Masaya po ako.","I'm happy.",{syl:"ma-sa-ya po a-ko",em:"😄",lit:[["masaya","happy"],["po","respect"],["ako","I"]],mn:"Happy people SAY “YAH!”: ma-SA-YA."});
I("antok","l2","feel","Antok po ako.","I'm sleepy.",{syl:"an-tok po a-ko",em:"😴",alt:["Inaantok po ako."],mn:"ANTs TALK so slowly that you get sleepy.",note:"Also: Inaantok po ako."});
I("pagod","l2","feel","Pagod po ako.","I'm tired.",{syl:"pa-god po a-ko",em:"😩",alt:["Napapagod po ako."],mn:"“Pa, God, I'm so tired!” Pa-god.",note:"Also: Napapagod po ako."});
I("takot","l2","feel","Takot po ako.","I'm scared.",{syl:"ta-kot po a-ko",em:"😱",alt:["Natatakot po ako."],mn:"TA-KOT sounds like “a cat!” jumping out at you.",note:"Also: Natatakot po ako."});
I("malungkot","l2","feel","malungkot","sad",{syl:"ma-lung-kot",em:"😢",mn:"“My LUNG GOT heavy”: sad."});
I("nahihiya","l2","feel","nahihiya","shy / embarrassed",{syl:"na-hi-hi-ya",em:"😳",mn:"Na-hee-hee-ya: a shy little giggle."});
I("galit","l2","feel","galit","angry",{syl:"ga-lit",em:"😠",mn:"So angry you are LIT on fire: ga-LIT."});
I("inis","l2","feel","inis","annoyed",{syl:"i-nis",em:"😒",mn:"I-NIS ≈ “itchy”: an itch you cannot reach, so annoying."});
I("nasasabik","l2","feel","nasasabik","excited",{syl:"na-sa-sa-bik",em:"🤩",mn:"Excited about something BIG: na-sa-sa-BIK."});
I("nararamdaman","l2","feel","Anong nararamdaman mo?","How are you feeling?",{syl:"a-nong na-ra-ram-da-man mo",em:"💭",lit:[["ano","what"],["-ng","linker"],["nararamdaman","feeling, experiencing"],["mo","you, your"]],mn:"Hear DAMDAM (to feel) inside: nara-ram-DAM-an."});
I("sobrangmasaya","l2","feel","Sobrang masaya po ako.","I'm very happy.",{em:"😄"});
I("sobranggutom","l2","feel","Sobrang gutom po ako.","I'm very hungry.",{em:"😋"});
I("sobrangmalungkot","l2","feel","Sobrang malungkot po ako.","I'm very sad.",{em:"😢"});
I("masayangmasaya","l2","feel","Masayang masaya po ako.","I'm extremely happy.",{em:"🥳"});
I("hiyanghiya","l2","feel","Hiyang hiya po ako.","I'm very embarrassed.",{em:"😳"});
I("antoknaantok","l2","feel","Antok na antok po ako.","I'm extremely sleepy.",{em:"😴"});
I("takotnatakot","l2","feel","Takot na takot po ako.","I'm very scared.",{em:"😱"});
I("tatay","l2","family","tatay / ama","father",{syl:"ta-tay / a-ma",em:"👨",alt:["tatay","ama"],note:"Tatay is everyday, ama is formal."});
I("nanay","l2","family","nanay / ina","mother",{syl:"na-nay / i-na",em:"👩",alt:["nanay","ina"],note:"Nanay is everyday, ina is formal."});
I("magulang","l2","family","magulang","parents",{syl:"ma-gu-lang",em:"👨‍👩‍👧",mn:"Ma-GU-lang: Ma and Pa are the “gang” in charge."});
I("anak","l2","family","anak","child (son or daughter)",{syl:"a-nak",em:"👶",mn:"Your child has A KNACK for everything: a-nak."});
I("bata","l2","family","bata","child / kid",{syl:"ba-ta",em:"🧒",note:"Bata = any young kid. Anak = someone's son or daughter, at any age."});
I("kuya","l2","family","kuya","older brother",{syl:"ku-ya",em:"👦",mn:"KU-ya ≈ “cool guy”: your big brother.",note:"Also a friendly title for any older man, like a driver or a vendor."});
I("ate","l2","family","ate","older sister",{syl:"a-te",pron:"AH-teh",em:"👧",mn:"Say AH-teh, like “auntie” cut short.",note:"Also a friendly title for any older woman."});
I("kapatid","l2","family","kapatid","sibling",{syl:"ka-pa-tid",em:"👫",mn:"Share a CUP of TEA with your sibling: ka-pa-TID."});
I("lolo","l2","family","lolo","grandfather",{syl:"lo-lo",em:"👴",mn:"Lolo ends in -o like abuelo."});
I("lola","l2","family","lola","grandmother",{syl:"lo-la",em:"👵",mn:"Lola ends in -a like abuela."});
I("tito","l2","family","tito / tiyo","uncle",{syl:"ti-to / ti-yo",em:"🧔",alt:["tito","tiyo"],es:"Spanish tío"});
I("tita","l2","family","tita / tiya","aunt",{syl:"ti-ta / ti-ya",em:"👩‍🦱",alt:["tita","tiya"],es:"Spanish tía"});
I("pinsan","l2","family","pinsan","cousin",{syl:"pin-san",em:"🧑‍🤝‍🧑",mn:"Your cousin PINS you down when you play: PIN-san."});
I("pamangkin","l2","family","pamangkin","niece / nephew",{syl:"pa-mang-kin",em:"🧒",mn:"Pa-MANG-KIN: a little kin of yours."});
I("biyenan","l2","family","biyenan","parent-in-law",{syl:"bi-ye-nan",em:"🧓",mn:"“Be YEN-an” nice to your in-laws."});
I("bayaw","l2","family","bayaw","brother-in-law",{syl:"ba-yaw",em:"🤵",mn:"BA-YAW ≈ “bro-yo”: your brother-in-law."});
I("hipag","l2","family","hipag","sister-in-law",{syl:"hi-pag",em:"👰",mn:"HI-PAG: “Hi, Peg!” your sister-in-law."});
I("kamaganak","l2","family","kamag-anak","relatives",{syl:"ka-mag-a-nak",em:"👪",alt:["kamaganak"],mn:"Anak (child) is inside: people of the same family line."});
I("pangalannanay","l2","family","Ano ang pangalan ng nanay mo?","What is your mother's name?",{em:"👩",lit:[["ano","what"],["ang","the"],["pangalan","name"],["ng","of"],["nanay","mother"],["mo","your"]]});
I("angpangalannanay","l2","family","Ang pangalan ng nanay ko ay …","My mother's name is …",{em:"👩",pat:1,ex:["Ang pangalan ng nanay ko ay Elena.","My mother's name is Elena."]});
I("siyaaysi","l2","family","Siya ay si …","She / he is …",{em:"👤",pat:1,ex:["Siya ay si Elena.","She is Elena."],note:"Siya = he or she."});
I("kumustapamilya","l2","family","Kumusta ang pamilya mo?","How is your family?",{em:"🏠",alt:["Kamusta ang pamilya mo?"],es:"Spanish familia"});
I("masayapamilya","l2","family","Masaya ang pamilya ko.","My family is happy.",{em:"🏠"});
I("okaylangsila","l2","family","Okay lang sila.","They are okay.",{em:"👍",lit:[["okay","okay"],["lang","just"],["sila","they"]]});
I("masayakaba","l2","family","Masaya ka ba?","Are you happy?",{em:"😄",lit:[["masaya","happy"],["ka","you"],["ba","question marker (yes/no)"]]});
I("oomasaya","l2","family","Oo, masaya ako.","Yes, I'm happy.",{em:"✅"});
I("hindimasaya","l2","family","Hindi ako masaya.","I'm not happy.",{em:"❌",note:"Hindi goes right before ako. You can also say: Hindi, hindi ako masaya."});
I("manopo","l2","family","Mano po","(respectful greeting to an elder)",{em:"🙏",note:"Take the elder's hand and touch the back of it to your forehead."});
I("simaria","l2","siang","Si Maria ay nanay.","Maria is a mother.",{em:"👩"});
I("angnanay","l2","siang","Ang nanay ay masaya.","The mother is happy.",{em:"👩"});
I("silolaana","l2","siang","Si Lola Ana ay masaya.","Grandma Ana is happy.",{em:"👵"});
I("anglola","l2","siang","Ang lola ay masaya.","The grandmother is happy.",{em:"👵"});
I("sititarosa","l2","siang","Si Tita Rosa ay maganda.","Aunt Rosa is beautiful.",{em:"👩‍🦱"});
I("angtita","l2","siang","Ang tita ay maganda.","The aunt is beautiful.",{em:"👩‍🦱"});

I("gutomnaako","l3","napa","Gutom na ako.","I'm hungry now.",{em:"⏰",lit:[["gutom","hungry"],["na","already, now"],["ako","I"]]});
I("gutompaako","l3","napa","Gutom pa ako.","I'm still hungry.",{em:"🍽️",lit:[["gutom","hungry"],["pa","still, yet, more"],["ako","I"]]});
I("isapa","l3","napa","Isa pa.","One more.",{em:"☝️",lit:[["isa","one"],["pa","more"]]});
I("sigepa","l3","napa","Sige pa.","More. / Keep going.",{em:"➕",lit:[["sige","go on, okay"],["pa","more"]]});
I("gutomako","l3","napa","Gutom ako.","I'm hungry.",{em:"😋"});
I("gutomkaba","l3","napa","Gutom ka ba?","Are you hungry?",{em:"❓"});
I("oogutom","l3","napa","Oo, gutom ako.","Yes, I'm hungry.",{em:"✅"});
I("hindigutom","l3","napa","Hindi ako gutom.","I'm not hungry.",{em:"❌"});
I("gutomkanaba","l3","napa","Gutom ka na ba?","Are you hungry now?",{em:"⏰"});
I("oogutomna","l3","napa","Oo, gutom na ako.","Yes, I'm hungry now.",{em:"✅"});
I("hindipa","l3","napa","Hindi pa.","Not yet.",{em:"⏳"});
I("gutomkapaba","l3","napa","Gutom ka pa ba?","Are you still hungry?",{em:"🍽️"});
I("oogutompa","l3","napa","Oo, gutom pa ako.","Yes, I'm still hungry.",{em:"✅"});
I("hindina","l3","napa","Hindi na.","Not anymore.",{em:"🛑"});
I("pagkain","l3","food","pagkain","food",{syl:"pag-ka-in",em:"🍽️",mn:"Kain = eat. Pag-kain = the things you eat."});
I("kanin","l3","food","kanin","rice (cooked)",{syl:"ka-nin",em:"🍚",mn:"KAIN (eat) + N: rice is eaten at almost every Filipino meal."});
I("gulay","l3","food","gulay","vegetable",{syl:"gu-lay",em:"🥬",mn:"GOO-LIE: don't lie, eat your vegetables."});
I("tinapay","l3","food","tinapay","bread",{syl:"ti-na-pay",em:"🍞",mn:"TINA PAYs for the bread."});
I("isda","l3","food","isda","fish",{syl:"is-da",em:"🐟",mn:"“IS DAt a fish?” Is-da!"});
I("manok","l3","food","manok","chicken",{syl:"ma-nok",em:"🍗",mn:"Fried chicken makes everyone say “MAN, OK!”"});
I("baboy","l3","food","baboy","pork / pig",{syl:"ba-boy",em:"🐖",mn:"BA-BOY: a bad boy rolling in the mud like a pig."});
I("baka","l3","food","baka","beef / cow",{syl:"ba-ka",em:"🐄",es:"Spanish vaca (cow)",note:"Careful: baka also means “maybe”. Context tells you which."});
I("karne","l3","food","karne","meat",{syl:"kar-ne",em:"🥩",es:"Spanish carne"});
I("masarap","l3","taste","masarap","delicious",{syl:"ma-sa-rap",em:"😋",mn:"So good you want to RAP about it: ma-sa-RAP!",ex:["Masarap ang sinigang.","Sinigang is delicious."]});
I("matamis","l3","taste","matamis","sweet",{syl:"ma-ta-mis",em:"🍬",mn:"“Ma, TOM IS sweet!” ma-TA-MIS.",ex:["Matamis ang kendi.","The candy is sweet."]});
I("maalat","l3","taste","maalat","salty",{syl:"ma-a-lat",em:"🧂",mn:"Salt A LOT: ma-a-LAT.",ex:["Maalat ang chips.","The chips are salty."]});
I("maanghang","l3","taste","maanghang","spicy",{syl:"ma-ang-hang",em:"🌶️",mn:"So spicy your tongue HANGs out: ma-ang-HANG.",ex:["Maanghang ang sili.","The chili is spicy."]});
I("maasim","l3","taste","maasim","sour",{syl:"ma-a-sim",em:"🍋",mn:"A lemon makes you squint and hiss “sss”: ma-a-SIM.",ex:["Maasim ang lemon.","The lemon is sour."]});
I("lasa","l3","taste","lasa","taste",{syl:"la-sa",em:"👅",mn:"LA-SA: the taste of LASAgna."});
I("sinigang","l3","taste","Masarap ang sinigang.","Sinigang is delicious.",{em:"🍲",note:"Same meaning as Ang sinigang ay masarap. Filipinos usually put the description first."});
I("kendi","l3","taste","Matamis ang kendi.","The candy is sweet.",{em:"🍬",note:"Same as Ang kendi ay matamis."});
I("chips","l3","taste","Maalat ang chips.","The chips are salty.",{em:"🥔",note:"Same as Ang chips ay maalat."});
I("sili","l3","taste","Maanghang ang sili.","The chili is spicy.",{em:"🌶️",note:"Same as Ang sili ay maanghang."});
I("lemon","l3","taste","Maasim ang lemon.","The lemon is sour.",{em:"🍋",note:"Same as Ang lemon ay maasim."});
I("sobrangmasarap","l3","taste","Sobrang masarap!","Very delicious!",{em:"🤤",alt:["Masarap na masarap!"],note:"Or double it: Masarap na masarap!"});
I("angsarap","l3","taste","Ang sarap ng adobo!","The adobo is so delicious!",{em:"🍛",lit:[["ang","how (exclamation)"],["sarap","delicious (root)"],["ng","of"],["adobo","adobo"]]});
I("angtamis","l3","taste","Ang tamis ng kendi!","The candy is so sweet!",{em:"🍬"});
I("angalat","l3","taste","Ang alat ng chips!","The chips are so salty!",{em:"🥔"});
I("anganghang","l3","taste","Ang anghang ng sili!","The chili is so spicy!",{em:"🌶️"});
I("angasim","l3","taste","Ang asim ng lemon!","The lemon is so sour!",{em:"🍋"});
I("sarapnaman","l3","taste","Ang sarap naman!","It's so delicious!",{em:"🤤",note:"Naman adds feeling and warmth."});
I("tamisnaman","l3","taste","Ang tamis naman!","So sweet!",{em:"🥰",note:"Also used for a sweet gesture."});
I("alatnaman","l3","taste","Ang alat naman!","So salty!",{em:"🧂"});
I("anghangnaman","l3","taste","Ang anghang naman!","So spicy!",{em:"🥵"});
I("asimnaman","l3","taste","Ang asim naman!","So sour!",{em:"😖"});
I("sina","l3","plural","Sina Maria at Ana ay masaya.","Maria and Ana are happy.",{em:"👭",note:"Sina = si for two or more names."});
I("angmga","l3","plural","Ang mga bata ay masaya.","The kids are happy.",{em:"🧒",say:"Ang manga bata ay masaya.",note:"Ang mga = ang for more than one. Mga is pronounced ma-NGA."});
I("sinalolo","l3","plural","Sina Lolo at Lola ay masaya.","Grandpa and Grandma are happy.",{em:"👴"});
I("angmgapinsan","l3","plural","Ang mga pinsan ko ay masaya.","My cousins are happy.",{em:"🧑‍🤝‍🧑",say:"Ang manga pinsan ko ay masaya."});
I("mabait","l3","plural","mabait","kind",{syl:"ma-ba-it",em:"🤗",bonus:1,ex:["Mabait si Lola.","Grandma is kind."],mn:"“My BUY-it” friend who always buys you a snack: kind."});
I("matalino","l3","plural","matalino","smart",{syl:"ma-ta-li-no",em:"🧠",bonus:1,ex:["Matalino si Kuya Ryan.","Kuya Ryan is smart."],mn:"Smart enough to TALk IN NO time."});
I("matangkad","l3","plural","matangkad","tall",{syl:"ma-tang-kad",em:"🦒",bonus:1,ex:["Matangkad ang tatay ko.","My father is tall."]});
I("maganda","l3","plural","maganda","beautiful",{syl:"ma-gan-da",em:"🌺",ex:["Maganda si Tita Rosa.","Aunt Rosa is beautiful."],note:"The same maganda as in Magandang umaga."});
I("gwapo","l3","plural","gwapo","handsome",{syl:"gwa-po",em:"😎",bonus:1,es:"Spanish guapo",ex:["Gwapo ang kuya ko.","My older brother is handsome."]});

const LESSONS = [
{ id:"trial", num:"0", code:"SIMULA", title:"First Words", tlTitle:"Unang Salita",
  blurb:"Greet people at any time of day, show respect with po, and introduce yourself.",
  goals:["Greet others with common expressions like Kumusta and Magandang umaga","Introduce yourself with your name and basic information","Respond naturally to greetings and introductions"],
  color:"sea",
  topics:[
  { id:"greet", title:"Greetings", tl:"Pagbati", items:["kumusta","mabuti","ayoslang","okaylang","umaga","tanghali","hapon","gabi","araw","ikina","ikinadin","paalam","ingat","ingatrin","salamat","maraming"],
    notes:[
      {k:"grammar",t:"Maganda means beautiful, and also good",h:"<p>Maganda means <b>beautiful</b>, but in greetings it means <b>good</b>. The <b>-ng</b> on the end links it to the next word: maganda + umaga → <b>magandang umaga</b>.</p><table class='mini'><tr><th>Time</th><th>Greeting</th><th>Stress</th></tr><tr><td>Morning</td><td>Magandang umaga</td><td>ma-GAN-dang u-MA-ga</td></tr><tr><td>Noon</td><td>Magandang tanghali</td><td>ma-GAN-dang tang-HA-li</td></tr><tr><td>Afternoon</td><td>Magandang hapon</td><td>ma-GAN-dang HA-pon</td></tr><tr><td>Evening</td><td>Magandang gabi</td><td>ma-GAN-dang ga-BI</td></tr><tr><td>Any time</td><td>Magandang araw</td><td>Good day</td></tr></table>"},
      {k:"grammar",t:"Rin or din? Both mean too",h:"<p>Look at the last letter of the word before it.</p><ul><li>Ends in a <b>vowel or n</b> → <b>rin</b>: Ingat ka <b>rin</b>!</li><li>Ends in another <b>consonant</b> → <b>din</b>: Ikinagagalak <b>din</b> kitang makilala.</li></ul><p>Like English a / an: it just makes the words flow.</p>"},
      {k:"practice",t:"Model conversation",h:"<div class='dlg'><p><b>A:</b> Magandang umaga!</p><p><b>B:</b> Magandang umaga! Kumusta?</p><p><b>A:</b> Mabuti! Ikinagagalak kitang makilala.</p><p><b>B:</b> Ikinagagalak din kitang makilala.</p><p><b>A:</b> Paalam! Ingat ka!</p><p><b>B:</b> Ingat ka rin!</p></div>",say:"Magandang umaga! ... Magandang umaga! Kumusta? ... Mabuti! Ikinagagalak kitang makilala. ... Ikinagagalak din kitang makilala. ... Paalam! Ingat ka! ... Ingat ka rin!"}
    ]},
  { id:"polite", title:"Respect, yes and no", tl:"Po at opo", items:["po","kumustapo","mabutipo","oo","hindi","opo"],
    notes:[
      {k:"culture",t:"How to use po",h:"<p><b>Po</b> is a small word that shows respect, especially to elders, teachers, or anyone you want to be formal with. Put it after the first word or at the end.</p><p>Kumusta <b>po</b>? · Mabuti <b>po</b>! · <b>Opo</b> (polite yes).</p><p>Using po with adults and strangers is always safe. It shows good manners.</p>"}
    ]},
  { id:"intro", title:"Introducing yourself", tl:"Pagpapakilala", items:["pangalan","akosi","buong","palayaw","angpalayaw","walapalayaw","ilangtaon","age28","age24","age28short"],
    notes:[
      {k:"grammar",t:"The -ng connector",h:"<p><b>Ano</b> means what. Add <b>-ng</b> to link it to the next word: Ano + pangalan → <b>Anong pangalan</b> mo?</p><p>You will see this linker everywhere: magandang umaga, buong pangalan, maraming salamat.</p>"},
      {k:"grammar",t:"Ako si …",h:"<p><b>Ako</b> means I or me. <b>Si</b> goes before one person's name. Ako si Maria = I am Maria. Or simply say your name.</p>"},
      {k:"tool",t:"Say your own age",tool:"age"}
    ]},
  { id:"taglish", title:"Tagalog and Taglish", tl:"Wika", items:["tagalogako","marunong","lugar"],
    notes:[
      {k:"trivia",place:"culture",t:"Where the word Tagalog comes from",h:"<p>Tagalog comes from <b>taga-ilog</b>, “from the river” (taga = from, ilog = river). It first described the people living along the Pasig River in Luzon, and later their language.</p><p>In 1937 Tagalog was chosen as the basis of the national language, now called <b>Filipino</b>.</p>"},
      {k:"culture",place:"culture",t:"Taglish = Tagalog + English",h:"<p>Many Filipinos mix Tagalog and English in daily conversation. It is normal and natural, so use it whenever you are missing a word.</p><p>Tagalog: Maganda ang <b>lugar</b>.<br>Taglish: Maganda ang <b>place</b>.<br>English: The place is beautiful.</p>"}
    ]}
  ]},
{ id:"l1", num:"1", code:"ARALIN 1", title:"Better Tagalog", tlTitle:"Mas Mahusay na Tagalog",
  blurb:"Talk about your hobbies, where you're from, where you grew up and what you do.",
  goals:["Introduce yourself with name and basic information","Respond appropriately to greetings and self-introductions"],
  color:"mango",
  topics:[
  { id:"hobby", title:"Hobbies", tl:"Hilig", items:["hilig","hiligko","pagbabasa","pagluluto","paglalakbay","pagpipinta","pagsusulat","paghahalaman","paghahiking","pagkakamping","pagkanta","hobbyat"],
    notes:[
      {k:"grammar",t:"How hobby words are built",h:"<p>Take a verb root, put <b>pag-</b> in front and repeat its first syllable:</p><p>basa (read) → pag-<b>ba</b>-basa · luto (cook) → pag-<b>lu</b>-luto · kanta (sing) → pag-kanta</p><p>It even works with English: pag-<b>ha</b>-hiking, pag-<b>ka</b>-kamping.</p>"},
      {k:"grammar",t:"At = and",h:"<p>For more than one hobby, join them with <b>at</b>: Hilig ko ang pagkanta <b>at</b> pagbabasa.</p>"}
    ]},
  { id:"origin", title:"Where you're from", tl:"Pinagmulan", items:["tagasaan","tagaako","tagapilipinas","pinanganak","sa","lumaki"],
    notes:[
      {k:"grammar",t:"Taga for origin, sa for places",h:"<p><b>Taga</b> + place + ako → where you are from: Taga Pilipinas ako.</p><p><b>Sa</b> + place → in / at a place. It answers saan (where): Saan ka lumaki? <b>Sa</b> Maynila.</p><p>For a full sentence: <i>Ipinanganak ako sa …</i> (I was born in …), <i>Lumaki ako sa …</i> (I grew up in …).</p>"}
    ]},
  { id:"job", title:"Jobs", tl:"Trabaho", items:["trabaho","akoay","angtrabaho","guro","estudyante","doktor","inhinyero","mangaawit","abogado","negosyante"],
    notes:[
      {k:"spanish",t:"Your Spanish is a shortcut",h:"<p>Many job words come from Spanish: trabaho (trabajo), estudyante (estudiante), doktor, inhinyero (ingeniero), abogado, negosyante (negociante). Words ending in <b>-o</b> often have an <b>-a</b> version for women: doktor<b>a</b>, abogad<b>a</b>.</p>"},
      {k:"practice",t:"Getting to know you: 9 questions",h:"<ol class='qlist'><li>Anong pangalan mo?</li><li>Anong buong pangalan mo?</li><li>Anong palayaw mo?</li><li>Ilang taon ka na?</li><li>Anong hilig mo?</li><li>Taga saan ka?</li><li>Saan ka pinanganak?</li><li>Saan ka lumaki?</li><li>Anong trabaho mo?</li></ol><p>Answer all nine aloud with the <a href='#ako'>Self-intro builder</a>.</p>"}
    ]}
  ]},
{ id:"l2", num:"2", code:"ARALIN 2", title:"Likes, Feelings, Family", tlTitle:"Gusto, Damdamin, Pamilya",
  blurb:"Say what you want and don't want, how you feel, and talk about your family.",
  goals:["Use gusto ko and ayaw ko in meaningful sentences","Describe how you feel (Masaya po ako, Pagod po ako)","Talk about family members","Use si and ang correctly"],
  color:"gumamela",
  topics:[
  { id:"gusto", title:"Want and don't want", tl:"Gusto at ayaw", items:["gusto","ayaw","gustosorbetes","ayawsorbetes","anonggusto","anongayaw","gustobasa","ayawkanta","sobranggusto","gustonggusto","ayawnaayaw"],
    notes:[
      {k:"grammar",t:"Ng or ang after gusto?",h:"<p><b>ng</b> marks something you want in general: Gusto ko <b>ng</b> sorbetes (I want ice cream).</p><p><b>ang</b> points to the specific thing or activity: Gusto ko <b>ang</b> pagbabasa (I like reading).</p>"},
      {k:"grammar",t:"Double it for emphasis",h:"<p>Repeat the word with a linker in between:</p><ul><li>Word ends in a <b>vowel</b> → add <b>-ng</b>: gusto → gusto<b>ng</b> gusto</li><li>Word ends in a <b>consonant</b> → add <b>na</b>: ayaw → ayaw <b>na</b> ayaw</li></ul><p>Or put <b>sobrang</b> (very) in front: Sobrang gusto ko ang pagluluto.</p>"}
    ]},
  { id:"feel", title:"Feelings", tl:"Damdamin", items:["gutom","masaya","antok","pagod","takot","malungkot","nahihiya","galit","inis","nasasabik","nararamdaman","sobrangmasaya","sobranggutom","sobrangmalungkot","masayangmasaya","hiyanghiya","antoknaantok","takotnatakot"],
    notes:[
      {k:"grammar",t:"The feeling pattern: ___ po ako",h:"<p>Put the feeling first, then <b>po ako</b> (or just <b>ako</b> with friends): <b>Pagod</b> po ako. Taglish works too: <b>Excited</b> po ako!</p><p>Each feeling also has a longer verb form you will hear: gutom → nagugutom, antok → inaantok, pagod → napapagod, takot → natatakot.</p>"},
      {k:"grammar",t:"Very, very: sobra and doubling",h:"<p><b>Sobrang</b> + feeling: Sobrang masaya po ako.</p><p>Or double it: masaya<b>ng</b> masaya · hiya<b>ng</b> hiya · antok <b>na</b> antok · takot <b>na</b> takot.</p>"}
    ]},
  { id:"family", title:"Family", tl:"Pamilya", items:["tatay","nanay","magulang","anak","bata","kuya","ate","kapatid","lolo","lola","tito","tita","pinsan","pamangkin","biyenan","bayaw","hipag","kamaganak","pangalannanay","angpangalannanay","siyaaysi","kumustapamilya","masayapamilya","okaylangsila","masayakaba","oomasaya","hindimasaya","manopo"],
    notes:[
      {k:"culture",place:"culture",t:"Mano po",h:"<p>A traditional gesture of respect. Take an elder's hand and gently touch the back of it to your forehead while saying <b>“mano po”</b>. Do it with grandparents, older relatives and elders when you arrive, enter their house or say goodbye. It shows respect and asks for their blessing.</p>"},
      {k:"culture",t:"Kuya and ate are everywhere",h:"<p>Filipinos call older friends, drivers, vendors and staff <b>kuya</b> or <b>ate</b>. It is warm and polite: “Kuya, isa pa po!”</p>"},
      {k:"grammar",t:"Ba makes a yes/no question",h:"<p>Add <b>ba</b> after the first phrase: Masaya ka → Masaya ka <b>ba</b>? (Are you happy?)</p><p>To say <b>not</b>, start with hindi: <b>Hindi ako masaya.</b></p>"}
    ]},
  { id:"siang", title:"Si or ang?", tl:"Si at ang", items:["simaria","angnanay","silolaana","anglola","sititarosa","angtita"],
    notes:[
      {k:"grammar",t:"Name → si. General word → ang.",h:"<p><b>Si</b> goes before a person's name: <b>Si</b> Maria ay nanay.</p><p><b>Ang</b> goes before a general role or noun: <b>Ang</b> nanay ay masaya.</p><p>A title plus a name still counts as a name: <b>Si</b> Lola Ana, <b>Si</b> Tita Rosa, <b>Si</b> Kuya Ryan.</p>"},
      {k:"tool",t:"Homework: introduce yourself",h:"<p>State your name, nickname, age, work, hobbies and where you're from, out loud. The builder writes it in Tagalog for you and helps you memorize it.</p><p><a class='btn' href='#ako'>Open the Self-intro builder</a></p>"}
    ]}
  ]},
{ id:"l3", num:"3", code:"ARALIN 3", title:"Food, Taste, Na & Pa", tlTitle:"Pagkain at Lasa",
  blurb:"Use na and pa, name foods, describe tastes, and talk about more than one person.",
  goals:["Use na and pa correctly","Name and describe foods","Add adjectives to describe people and food","Use sina and ang mga"],
  color:"sky",
  topics:[
  { id:"napa", title:"Na and pa", tl:"Na at pa", items:["gutomnaako","gutompaako","isapa","sigepa","gutomako","gutomkaba","oogutom","hindigutom","gutomkanaba","oogutomna","hindipa","gutomkapaba","oogutompa","hindina"],
    notes:[
      {k:"grammar",t:"Na = already / now. Pa = still / yet / more.",h:"<table class='mini'><tr><th></th><th>Question</th><th>Yes</th><th>No</th></tr><tr><td>plain</td><td>Gutom ka ba?</td><td>Oo, gutom ako.</td><td>Hindi ako gutom.</td></tr><tr><td><b>na</b></td><td>Gutom ka <b>na</b> ba?</td><td>Oo, gutom <b>na</b> ako.</td><td>Hindi <b>pa</b>. (not yet)</td></tr><tr><td><b>pa</b></td><td>Gutom ka <b>pa</b> ba?</td><td>Oo, gutom <b>pa</b> ako.</td><td>Hindi <b>na</b>. (not anymore)</td></tr></table><p>Notice the flip: a <b>na</b> question gets “Hindi <b>pa</b>”, a <b>pa</b> question gets “Hindi <b>na</b>”.</p>"}
    ]},
  { id:"food", title:"Food", tl:"Pagkain", items:["pagkain","kanin","gulay","tinapay","isda","manok","baboy","baka","karne"],
    notes:[
      {k:"culture",place:"culture",t:"Rice at every meal",h:"<p>For many Filipinos a meal without <b>kanin</b> isn't really a meal. Two dishes you will meet everywhere: <b>adobo</b> (meat braised in vinegar, soy sauce and garlic) and <b>sinigang</b> (a sour tamarind soup).</p>"}
    ]},
  { id:"taste", title:"Taste", tl:"Lasa", items:["masarap","matamis","maalat","maanghang","maasim","lasa","sinigang","kendi","chips","sili","lemon","sobrangmasarap","angsarap","angtamis","angalat","anganghang","angasim","sarapnaman","tamisnaman","alatnaman","anghangnaman","asimnaman"],
    notes:[
      {k:"grammar",t:"Two ways to describe food",h:"<p><b>Ang sinigang ay masarap.</b> (subject first, with ay)<br><b>Masarap ang sinigang.</b> (description first, more natural)</p><p>Both mean: Sinigang is delicious.</p>"},
      {k:"grammar",t:"Exclaim it: Ang + root + ng",h:"<p>Drop the <b>ma-</b> to get the root, then: <b>Ang</b> + root + <b>ng</b> + food.</p><p>masarap → Ang <b>sarap</b> ng adobo! · matamis → Ang <b>tamis</b> ng kendi! · maalat → Ang <b>alat</b> ng chips! · maanghang → Ang <b>anghang</b> ng sili! · maasim → Ang <b>asim</b> ng lemon!</p>"},
      {k:"grammar",t:"Naman adds feeling",h:"<p><b>Naman</b> (na-man) makes a reaction softer and more expressive: Ang tamis <b>naman</b>! = That's so sweet! You will hear Taglish too: “So sweet naman!”</p>"}
    ]},
  { id:"plural", title:"People and plurals", tl:"Sina at ang mga", items:["sina","sinalolo","angmga","angmgapinsan","maganda","mabait","matalino","matangkad","gwapo"],
    notes:[
      {k:"grammar",t:"Sina and ang mga",h:"<p><b>Sina</b> is si for two or more names: <b>Sina</b> Maria at Ana ay masaya.</p><p><b>Ang mga</b> is ang for more than one thing: <b>Ang mga</b> bata ay masaya. (mga sounds like ma-NGA)</p>"},
      {k:"spanish",t:"Describing people",h:"<p>Same patterns as food: <b>Mabait</b> si Lola. · <b>Maganda</b> si Tita Rosa. Words marked <i>bonus</i> were added to cover this lesson goal.</p>"}
    ]}
  ]}
];

const CULTURE = [];

const DRILLS = [
 { id:"siang", lesson:"l2", title:"Si or ang?", tl:"Si o ang?", desc:"Name → si. General word → ang.", opts:["Si","Ang"], items:[
  {q:"___ Ate Jane ay gutom.",a:"Si",en:"Ate Jane is hungry.",why:"Ate Jane is a name (title + name)."},
  {q:"___ tatay ay galit.",a:"Ang",en:"Father is angry.",why:"Tatay alone is a general family word."},
  {q:"___ Kuya Ryan ay pagod.",a:"Si",en:"Kuya Ryan is tired.",why:"Kuya Ryan includes a name."},
  {q:"___ lola ay masaya.",a:"Ang",en:"Grandma is happy.",why:"Lola alone is a role, not a name."},
  {q:"___ tita ay malungkot.",a:"Ang",en:"The aunt is sad.",why:"Tita alone is a general word."},
  {q:"___ Maria ay nanay.",a:"Si",en:"Maria is a mother.",why:"Maria is a name."},
  {q:"___ Tita Rosa ay maganda.",a:"Si",en:"Aunt Rosa is beautiful.",why:"Tita Rosa includes a name."},
  {q:"___ nanay ay masaya.",a:"Ang",en:"The mother is happy.",why:"Nanay alone is a general word."},
  {q:"___ Lolo Ben ay masaya.",a:"Si",en:"Grandpa Ben is happy.",why:"Lolo Ben includes a name."},
  {q:"___ pinsan ay nasasabik.",a:"Ang",en:"The cousin is excited.",why:"Pinsan is a general word."}
 ]},
 { id:"napa", lesson:"l3", title:"Na or pa?", tl:"Na o pa?", desc:"Na = already / now. Pa = still / yet / more.", opts:["na","pa"], items:[
  {q:"Gutom ___ ako.",a:"na",en:"I'm hungry now.",why:"Now / already → na."},
  {q:"Gutom ___ ako.",a:"pa",en:"I'm still hungry.",why:"Still → pa."},
  {q:"Isa ___.",a:"pa",en:"One more.",why:"More → pa."},
  {q:"Sige ___.",a:"pa",en:"More. / Keep going.",why:"More → pa."},
  {q:"Gutom ka ___ ba?",a:"na",en:"Are you hungry now?",why:"Now → na."},
  {q:"Gutom ka ___ ba?",a:"pa",en:"Are you still hungry?",why:"Still → pa."},
  {q:"Hindi ___.",a:"pa",en:"Not yet.",why:"Not yet → hindi pa."},
  {q:"Hindi ___.",a:"na",en:"Not anymore.",why:"No longer → hindi na."},
  {q:"Ilang taon ka ___?",a:"na",en:"How old are you (already)?",why:"Literally: how many years are you already."},
  {q:"Pagod ___ ako.",a:"pa",en:"I'm still tired.",why:"Still → pa."}
 ]},
 { id:"rindin", lesson:"trial", title:"Rin or din?", tl:"Rin o din?", desc:"After a vowel or n → rin. After other consonants → din.", opts:["rin","din"], items:[
  {q:"Ingat ka ___!",a:"rin",en:"You take care too!",why:"Ka ends in a vowel."},
  {q:"Ikinagagalak ___ kitang makilala.",a:"din",en:"Nice to meet you too.",why:"Ikinagagalak ends in k, a consonant."},
  {q:"Gutom ___ ako.",a:"din",en:"I'm hungry too.",why:"Gutom ends in m, a consonant."},
  {q:"Masaya ___ ako.",a:"rin",en:"I'm happy too.",why:"Masaya ends in a vowel."},
  {q:"Pagod ___ ako.",a:"din",en:"I'm tired too.",why:"Pagod ends in d, a consonant."},
  {q:"Ako ___!",a:"rin",en:"Me too!",why:"Ako ends in a vowel."},
  {q:"Salamat ___!",a:"din",en:"Thank you too!",why:"Salamat ends in t, a consonant."},
  {q:"Mabuti ___ po ako.",a:"rin",en:"I'm fine too.",why:"Mabuti ends in a vowel."},
  {q:"Pinsan ko ___ siya.",a:"rin",en:"He is my cousin too.",why:"Ko ends in a vowel."}
 ]},
 { id:"linker", lesson:"l2", title:"-ng or na?", tl:"Pang-angkop", desc:"Doubling for emphasis: after a vowel add -ng, after a consonant use na.", opts:["-ng","na"], items:[
  {q:"masaya___ masaya",a:"-ng",en:"extremely happy",why:"Masaya ends in a vowel → masayang masaya."},
  {q:"antok ___ antok",a:"na",en:"extremely sleepy",why:"Antok ends in k → antok na antok."},
  {q:"takot ___ takot",a:"na",en:"very scared",why:"Takot ends in t → takot na takot."},
  {q:"hiya___ hiya",a:"-ng",en:"very embarrassed",why:"Hiya ends in a vowel → hiyang hiya."},
  {q:"gusto___ gusto",a:"-ng",en:"really like",why:"Gusto ends in a vowel → gustong gusto."},
  {q:"ayaw ___ ayaw",a:"na",en:"really don't like",why:"Ayaw ends in w → ayaw na ayaw."},
  {q:"masarap ___ masarap",a:"na",en:"very delicious",why:"Masarap ends in p → masarap na masarap."},
  {q:"matamis ___ matamis",a:"na",en:"very sweet",why:"Matamis ends in s → matamis na matamis."},
  {q:"Dalawampu't apat ___ taon",a:"na",en:"24 years",why:"Apat ends in t → apat na taon."},
  {q:"Dalawampu't walo___ taon",a:"-ng",en:"28 years",why:"Walo ends in a vowel → walong taon."}
 ]},
 { id:"gustoayaw", lesson:"l2", title:"Gusto or ayaw?", tl:"Gusto o ayaw?", desc:"Read the thumbs: 👍 gusto, 👎 ayaw, two thumbs = doubled.", opts:["Gusto","Ayaw","Gustong gusto","Ayaw na ayaw"], items:[
  {q:"👍 ___ ko ng sorbetes.",a:"Gusto",en:"I want ice cream.",why:"One thumb up → gusto."},
  {q:"👎 ___ ko ng sorbetes.",a:"Ayaw",en:"I don't want ice cream.",why:"Thumb down → ayaw."},
  {q:"👍👍 ___ ko ang pagkanta.",a:"Gustong gusto",en:"I really like singing.",why:"Two thumbs up → gustong gusto."},
  {q:"👎👎 ___ ko ang pagluluto.",a:"Ayaw na ayaw",en:"I really don't like cooking.",why:"Two thumbs down → ayaw na ayaw."},
  {q:"👍 ___ ko ang pagbabasa.",a:"Gusto",en:"I like reading.",why:"One thumb up → gusto."},
  {q:"👎 ___ ko ang pagkakamping.",a:"Ayaw",en:"I don't like camping.",why:"Thumb down → ayaw."},
  {q:"👍👍 ___ ko ang adobo.",a:"Gustong gusto",en:"I really like adobo.",why:"Two thumbs up → gustong gusto."},
  {q:"👎👎 ___ ko ng maanghang.",a:"Ayaw na ayaw",en:"I really don't want spicy food.",why:"Two thumbs down → ayaw na ayaw."}
 ]},
 { id:"exclaim", lesson:"l3", title:"How delicious!", tl:"Ang sarap!", desc:"Turn an adjective into an exclamation: Ang + root + ng.", opts:["Ang sarap","Ang tamis","Ang alat","Ang anghang","Ang asim"], items:[
  {q:"🍛 ___ ng adobo!",a:"Ang sarap",en:"The adobo is so delicious!",why:"masarap → sarap."},
  {q:"🍬 ___ ng kendi!",a:"Ang tamis",en:"The candy is so sweet!",why:"matamis → tamis."},
  {q:"🥔 ___ ng chips!",a:"Ang alat",en:"The chips are so salty!",why:"maalat → alat."},
  {q:"🌶️ ___ ng sili!",a:"Ang anghang",en:"The chili is so spicy!",why:"maanghang → anghang."},
  {q:"🍋 ___ ng lemon!",a:"Ang asim",en:"The lemon is so sour!",why:"maasim → asim."},
  {q:"🍲 ___ ng sinigang!",a:"Ang asim",en:"The sinigang is so sour!",why:"Sinigang is a sour soup: maasim → asim."},
  {q:"🍦 ___ ng sorbetes!",a:"Ang tamis",en:"The ice cream is so sweet!",why:"matamis → tamis."}
 ]},
 { id:"time", lesson:"trial", title:"Which greeting?", tl:"Anong oras?", desc:"Pick the greeting that matches the clock.", opts:["Magandang umaga","Magandang tanghali","Magandang hapon","Magandang gabi"], items:[
  {q:"🕗 8:00 am — ___!",a:"Magandang umaga",en:"Good morning!",why:"Morning → umaga."},
  {q:"🕛 12:00 noon — ___!",a:"Magandang tanghali",en:"Good noon!",why:"Midday → tanghali."},
  {q:"🕒 3:00 pm — ___!",a:"Magandang hapon",en:"Good afternoon!",why:"Afternoon → hapon."},
  {q:"🕘 9:00 pm — ___!",a:"Magandang gabi",en:"Good evening!",why:"Evening → gabi."},
  {q:"🕖 7:00 pm — ___!",a:"Magandang gabi",en:"Good evening!",why:"After dark → gabi."},
  {q:"🕙 10:00 am — ___!",a:"Magandang umaga",en:"Good morning!",why:"Before noon → umaga."},
  {q:"🕓 4:00 pm — ___!",a:"Magandang hapon",en:"Good afternoon!",why:"Afternoon → hapon."}
 ]}
];

const CAST = {
  joy:{name:"Joy",role:"your friend",hue:"sea"},
  lola:{name:"Lola Nena",role:"Joy's grandmother",hue:"gumamela"},
  rosa:{name:"Aling Rosa",role:"runs the karinderya",hue:"mango"},
  mika:{name:"Mika",role:"new coworker",hue:"sky"},
  paolo:{name:"Paolo",role:"your cousin",hue:"sea"}
};
const SCENES = [
 { id:"lola", title:"Meeting Lola", tl:"Bisita kay Lola", lessons:["trial","l2","l3"], time:"9:00 am",
   setup:"Your friend Joy brings you home to meet her grandmother. It's nine in the morning. Lola is an elder, so respect matters.",
   steps:[
   {who:"joy",tl:"Lola, siya po ang kaibigan ko.",en:"Grandma, this is my friend.",gloss:"kaibigan = friend"},
   {prompt:"Greet Lola.",opts:[
     {t:"Magandang umaga po!",en:"Good morning! (polite)",r:"good",fb:"Right time of day, and po for an elder. Perfect."},
     {t:"Magandang gabi!",en:"Good evening!",r:"bad",fb:"It's 9 am: gabi is evening. Use umaga."},
     {t:"Magandang umaga!",en:"Good morning!",r:"ok",fb:"Correct greeting. With an elder, add po: Magandang umaga po!"}]},
   {who:"lola",tl:"Magandang umaga rin!",en:"Good morning to you too!",act:"Lola holds out her hand toward you."},
   {prompt:"Lola offers her hand. What do you say?",opts:[
     {t:"Mano po.",en:"(respectful greeting)",r:"good",fb:"Touch the back of her hand to your forehead. Lola smiles: you know the custom."},
     {t:"Salamat.",en:"Thank you.",r:"bad",fb:"This is the moment for the mano gesture. Say “Mano po.”"},
     {t:"Paalam po.",en:"Goodbye.",r:"bad",fb:"Paalam is goodbye, and you just arrived."}]},
   {who:"lola",tl:"Kumusta ka?",en:"How are you?"},
   {prompt:"Answer Lola.",opts:[
     {t:"Mabuti po, salamat!",en:"I'm good, thank you!",r:"good",fb:"Warm and polite."},
     {t:"Mabuti!",en:"Good!",r:"ok",fb:"Fine, but add po for an elder: Mabuti po!"},
     {t:"Hindi po.",en:"No.",r:"bad",fb:"Hindi means no. Answer how you are: Mabuti po."}]},
   {who:"lola",tl:"Anong pangalan mo?",en:"What is your name?"},
   {prompt:"Tell her your name.",opts:[
     {t:"Ako po si {NAME}.",en:"I am {NAME}.",r:"good",fb:"Ako si + name, with po. Nicely done."},
     {t:"Anong pangalan mo?",en:"What is your name?",r:"bad",fb:"That repeats her question. Answer with Ako po si …"},
     {t:"Ang palayaw ko ay {NAME}.",en:"My nickname is {NAME}.",r:"ok",fb:"Understandable, but she asked for your name, not your nickname."}]},
   {who:"lola",tl:"Ikinagagalak kitang makilala.",en:"Nice to meet you."},
   {prompt:"Reply.",opts:[
     {t:"Ikinagagalak din po kitang makilala.",en:"Nice to meet you too.",r:"good",fb:"Din, because ikinagagalak ends in a consonant."},
     {t:"Ingat ka rin.",en:"You take care too.",r:"bad",fb:"That's for goodbyes."},
     {t:"Maraming salamat, paalam!",en:"Thanks a lot, bye!",r:"bad",fb:"Too soon to leave! Return the greeting with din."}]},
   {who:"lola",tl:"Ilang taon ka na?",en:"How old are you?"},
   {prompt:"Tell her your age.",opts:[
     {t:"{AGE_TL} po ako.",en:"I am {AGE} years old.",r:"good",fb:"Full Tagalog with po. Lola is impressed."},
     {t:"{AGE} na ako.",en:"I'm {AGE}.",r:"ok",fb:"Taglish works, but add po for Lola: {AGE} na po ako."},
     {t:"Taga {FROM} po ako.",en:"I'm from {FROM}.",r:"bad",fb:"That answers Taga saan ka? (where are you from)."}]},
   {who:"lola",tl:"Taga saan ka?",en:"Where are you from?"},
   {prompt:"Answer.",opts:[
     {t:"Taga {FROM} po ako.",en:"I'm from {FROM}.",r:"good",fb:"Taga + place + po ako."},
     {t:"Saan ka lumaki?",en:"Where did you grow up?",r:"bad",fb:"That's a new question. Answer with Taga … po ako."},
     {t:"Sa {FROM}.",en:"In {FROM}.",r:"ok",fb:"Understood, but Taga saan? is answered with Taga … ako."}]},
   {who:"lola",tl:"Gutom ka na ba?",en:"Are you hungry now?"},
   {prompt:"You are hungry. Answer politely.",opts:[
     {t:"Opo, gutom na po ako.",en:"Yes, I'm hungry now.",r:"good",fb:"Opo is the polite yes, and na matches her question."},
     {t:"Oo, gutom pa ako.",en:"Yes, I'm still hungry.",r:"ok",fb:"Pa means still; she asked with na (now). And use opo with Lola."},
     {t:"Gutom ka ba?",en:"Are you hungry?",r:"bad",fb:"That asks her back. Answer: Opo, gutom na po ako."}]},
   {who:"lola",tl:"Kain na! Masarap ba ang adobo?",en:"Let's eat! Is the adobo delicious?",gloss:"kain na = let's eat"},
   {prompt:"React to the adobo.",opts:[
     {t:"Opo! Ang sarap naman po!",en:"Yes! It's so delicious!",r:"good",fb:"Naman adds warmth. Lola will cook for you again."},
     {t:"Ang asim ng lemon.",en:"The lemon is so sour.",r:"bad",fb:"There's no lemon here. Try Ang sarap!"},
     {t:"Masarap.",en:"Delicious.",r:"ok",fb:"Correct. Add some feeling: Ang sarap naman po!"}]},
   {who:"joy",tl:"Tara na!",en:"Let's go!",gloss:"tara = let's go"},
   {prompt:"Say goodbye to Lola.",opts:[
     {t:"Maraming salamat po! Paalam po.",en:"Thank you very much! Goodbye.",r:"good",fb:"Grateful and polite. A perfect exit."},
     {t:"Paalam! Ingat ka!",en:"Bye! Take care!",r:"ok",fb:"Friendly, but add po for an elder."},
     {t:"Magandang umaga po!",en:"Good morning!",r:"bad",fb:"That's a hello. Use Paalam po."}]},
   {who:"lola",tl:"Ingat ka, anak!",en:"Take care, child!",gloss:"Elders often call young people anak, affectionately."}
 ]},
 { id:"karinderya", title:"Lunch at the eatery", tl:"Sa Karinderya", lessons:["l2","l3"], time:"12:00 noon",
   setup:"You walk into a small neighborhood eatery (karinderya) at lunchtime. Aling Rosa is behind the counter with trays of food.",
   steps:[
   {who:"rosa",tl:"Magandang tanghali! Anong gusto mo?",en:"Good noon! What would you like?"},
   {prompt:"Greet her and order adobo.",opts:[
     {t:"Magandang tanghali po! Gusto ko po ng adobo.",en:"Good noon! I'd like adobo.",r:"good",fb:"Greeting returned, and gusto ko ng + food."},
     {t:"Magandang gabi po!",en:"Good evening!",r:"bad",fb:"It's noon: tanghali."},
     {t:"Adobo.",en:"Adobo.",r:"ok",fb:"It works, but a greeting and gusto ko po ng … is nicer."}]},
   {who:"rosa",tl:"Gusto mo ba ng kanin?",en:"Do you want rice?"},
   {prompt:"Yes, you want rice.",opts:[
     {t:"Opo, gusto ko po ng kanin.",en:"Yes, I'd like rice.",r:"good",fb:"Polite and complete."},
     {t:"Ayaw ko ng sorbetes.",en:"I don't want ice cream.",r:"bad",fb:"She asked about rice! Opo, gusto ko po ng kanin."},
     {t:"Oo.",en:"Yes.",r:"ok",fb:"Understood. Opo is the polite version."}]},
   {who:"rosa",tl:"Gusto mo ba ng gulay?",en:"Do you want vegetables?"},
   {prompt:"Politely say no.",opts:[
     {t:"Hindi po, salamat.",en:"No, thank you.",r:"good",fb:"A polite no."},
     {t:"Ayaw ko!",en:"I don't want it!",r:"ok",fb:"Correct meaning, but blunt. Hindi po, salamat is kinder."},
     {t:"Gusto ko ang pagkanta.",en:"I like singing.",r:"bad",fb:"Aling Rosa laughs: she asked about vegetables."}]},
   {who:"rosa",tl:"Maanghang ito, ha.",en:"This one is spicy, okay?",gloss:"ito = this · ha = okay?"},
   {prompt:"You love spicy food.",opts:[
     {t:"Okay lang po! Gustong gusto ko ang maanghang.",en:"That's fine! I really like spicy.",r:"good",fb:"Gustong gusto: doubled for emphasis."},
     {t:"Ang tamis naman!",en:"So sweet!",r:"bad",fb:"Tamis is sweet. She said spicy: maanghang."},
     {t:"Takot po ako!",en:"I'm scared!",r:"ok",fb:"Grammatically perfect, and honest! But you said you love spicy food."}]},
   {who:"rosa",tl:"Masarap ba?",en:"Is it delicious?",act:"You take a bite."},
   {prompt:"React.",opts:[
     {t:"Ang sarap naman po!",en:"It's so delicious!",r:"good",fb:"Ang + sarap + naman. Very natural."},
     {t:"Maasim ang lemon.",en:"The lemon is sour.",r:"bad",fb:"True, but not about her adobo."},
     {t:"Sobrang maanghang!",en:"Very spicy!",r:"ok",fb:"Correct Tagalog, but she asked if it's delicious."}]},
   {who:"rosa",tl:"Gutom ka pa ba?",en:"Are you still hungry?"},
   {prompt:"You want one more serving of rice.",opts:[
     {t:"Opo! Isa pa pong kanin.",en:"Yes! One more rice, please.",r:"good",fb:"Isa pa = one more. Classic karinderya line."},
     {t:"Hindi pa po.",en:"Not yet.",r:"bad",fb:"Hindi pa answers a na question. To a pa question, answer Opo or Hindi na."},
     {t:"Hindi na po, salamat.",en:"Not anymore, thanks.",r:"ok",fb:"Correct Tagalog, but you wanted more rice!"}]},
   {who:"rosa",tl:"Heto. Salamat, ha!",en:"Here you go. Thanks!",gloss:"heto = here it is"},
   {prompt:"Thank her and leave.",opts:[
     {t:"Maraming salamat po! Paalam!",en:"Thank you very much! Bye!",r:"good",fb:"Many thanks and goodbye."},
     {t:"Ikinagagalak kitang makilala.",en:"Nice to meet you.",r:"ok",fb:"Sweet, but a bit formal for leaving a food stall."},
     {t:"Gutom na ako.",en:"I'm hungry now.",r:"bad",fb:"You just ate!"}]},
   {who:"rosa",tl:"Ingat ka!",en:"Take care!"}
 ]},
 { id:"katrabaho", title:"Your new coworker", tl:"Bagong Katrabaho", lessons:["trial","l1"], time:"2:00 pm",
   setup:"First week at a new office in Manila. Mika, about your age, stops by your desk after lunch. Between peers, po is optional.",
   steps:[
   {who:"mika",tl:"Hi! Magandang hapon! Ako si Mika. Anong pangalan mo?",en:"Hi! Good afternoon! I'm Mika. What's your name?"},
   {prompt:"Introduce yourself.",opts:[
     {t:"Magandang hapon! Ako si {NAME}.",en:"Good afternoon! I'm {NAME}.",r:"good",fb:"Greeting + Ako si + name."},
     {t:"Magandang umaga! Ako si {NAME}.",en:"Good morning! I'm {NAME}.",r:"bad",fb:"It's 2 pm: hapon."},
     {t:"{NAME}.",en:"{NAME}.",r:"ok",fb:"Fine! A full sentence sounds friendlier."}]},
   {who:"mika",tl:"Ikinagagalak kitang makilala!",en:"Nice to meet you!"},
   {prompt:"Reply.",opts:[
     {t:"Ikinagagalak din kitang makilala!",en:"Nice to meet you too!",r:"good",fb:"Din after ikinagagalak (ends in k)."},
     {t:"Ikinagagalak rin kitang makilala!",en:"Nice to meet you too!",r:"ok",fb:"Close! After a consonant like k, use din."},
     {t:"Ingat ka!",en:"Take care!",r:"bad",fb:"That's for goodbyes."}]},
   {who:"mika",tl:"Anong trabaho mo?",en:"What's your job?"},
   {prompt:"You're an engineer.",opts:[
     {t:"Ako ay inhinyero.",en:"I am an engineer.",r:"good",fb:"Ako ay + job."},
     {t:"Hilig ko ang pagluluto.",en:"My hobby is cooking.",r:"bad",fb:"That's your hobby, not your job."},
     {t:"Inhinyero.",en:"Engineer.",r:"ok",fb:"Understood. Ako ay inhinyero is a full answer."}]},
   {who:"mika",tl:"Ako ay negosyante dati. Anong palayaw mo?",en:"I used to be a businessperson. What's your nickname?",gloss:"dati = before, formerly"},
   {prompt:"Answer (either is right).",opts:[
     {t:"Ang palayaw ko ay {NICK}.",en:"My nickname is {NICK}.",r:"good",fb:"Ang palayaw ko ay …"},
     {t:"Wala akong palayaw.",en:"I don't have a nickname.",r:"good",fb:"Also correct."},
     {t:"Ako ay guro.",en:"I am a teacher.",r:"bad",fb:"She asked for your nickname."}]},
   {who:"mika",tl:"Taga saan ka?",en:"Where are you from?"},
   {prompt:"Answer.",opts:[
     {t:"Taga {FROM} ako.",en:"I'm from {FROM}.",r:"good",fb:"Taga + place + ako."},
     {t:"Taga saan ka?",en:"Where are you from?",r:"bad",fb:"That's her question."},
     {t:"Sa {FROM}.",en:"In {FROM}.",r:"ok",fb:"Understood, but use Taga … ako for origin."}]},
   {who:"mika",tl:"Ah, astig! Saan ka lumaki?",en:"Oh, cool! Where did you grow up?",gloss:"astig = cool (slang)"},
   {prompt:"You grew up in {GREW}.",opts:[
     {t:"Lumaki ako sa {GREW}.",en:"I grew up in {GREW}.",r:"good",fb:"Lumaki ako sa + place."},
     {t:"Sa {GREW}.",en:"In {GREW}.",r:"good",fb:"Short and natural."},
     {t:"Saan ka pinanganak?",en:"Where were you born?",r:"bad",fb:"That's a different question."}]},
   {who:"mika",tl:"Anong hilig mo?",en:"What are your hobbies?"},
   {prompt:"You like traveling and cooking.",opts:[
     {t:"Hilig ko ang paglalakbay at pagluluto.",en:"My hobbies are traveling and cooking.",r:"good",fb:"Two hobbies joined with at."},
     {t:"Ako ay paglalakbay.",en:"I am traveling (?)",r:"bad",fb:"Ako ay is for jobs. Use Hilig ko ang …"},
     {t:"Hilig ko ang pagluluto.",en:"My hobby is cooking.",r:"ok",fb:"Correct, you just left out traveling."}]},
   {who:"mika",tl:"Ako rin! Gusto ko rin ang pagluluto. Sige, paalam! Ingat ka!",en:"Me too! I like cooking too. Okay, bye! Take care!"},
   {prompt:"Say goodbye.",opts:[
     {t:"Ingat ka rin! Paalam!",en:"You take care too! Bye!",r:"good",fb:"Rin after ka (vowel)."},
     {t:"Ingat ka din! Paalam!",en:"You take care too! Bye!",r:"ok",fb:"People will understand, but after a vowel the rule is rin."},
     {t:"Magandang hapon!",en:"Good afternoon!",r:"bad",fb:"That's a greeting, not a goodbye."}]},
   {who:"mika",tl:"Bukas ulit!",en:"See you tomorrow!",gloss:"bukas = tomorrow · ulit = again"}
 ]},
 { id:"pinsan", title:"Video call with your cousin", tl:"Tawag kay Paolo", lessons:["trial","l2"], time:"8:00 pm",
   setup:"Your cousin Paolo video-calls you in the evening to catch up on the family.",
   steps:[
   {who:"paolo",tl:"Magandang gabi! Kumusta ka?",en:"Good evening! How are you?"},
   {prompt:"Answer casually.",opts:[
     {t:"Magandang gabi! Ayos lang ako.",en:"Good evening! I'm fine.",r:"good",fb:"Ayos lang: relaxed and natural."},
     {t:"Magandang hapon! Okay lang.",en:"Good afternoon! I'm okay.",r:"bad",fb:"It's 8 pm: gabi."},
     {t:"Okay lang!",en:"I'm okay!",r:"good",fb:"Perfect Taglish."}]},
   {who:"paolo",tl:"Kumusta ang pamilya mo?",en:"How's your family?"},
   {prompt:"Your family is doing well.",opts:[
     {t:"Masaya ang pamilya ko.",en:"My family is happy.",r:"good",fb:"Masaya ang + subject."},
     {t:"Okay lang sila.",en:"They're okay.",r:"good",fb:"Sila = they."},
     {t:"Masaya ka ba?",en:"Are you happy?",r:"bad",fb:"That asks him a question instead of answering."}]},
   {who:"paolo",tl:"Ano ang pangalan ng nanay mo? Nakalimutan ko!",en:"What's your mother's name? I forgot!",gloss:"nakalimutan ko = I forgot"},
   {prompt:"Her name is Elena.",opts:[
     {t:"Ang pangalan ng nanay ko ay Elena.",en:"My mother's name is Elena.",r:"good",fb:"Ang pangalan ng nanay ko ay …"},
     {t:"Ang pangalan ng tatay ko ay Elena.",en:"My father's name is Elena.",r:"bad",fb:"Tatay is father! Nanay is mother."},
     {t:"Siya ay si Elena.",en:"She is Elena.",r:"good",fb:"Also correct."}]},
   {who:"paolo",tl:"Si Kuya Ryan ay pagod. Si Ate Jane ay gutom. Ikaw, anong nararamdaman mo?",en:"Kuya Ryan is tired. Ate Jane is hungry. And you, how are you feeling?",gloss:"ikaw = you"},
   {prompt:"You are extremely sleepy.",opts:[
     {t:"Antok na antok ako.",en:"I'm extremely sleepy.",r:"good",fb:"Doubled with na because antok ends in k."},
     {t:"Antok ng antok ako.",en:"(linker mistake)",r:"bad",fb:"The linker is na after a consonant: antok na antok."},
     {t:"Sobrang antok ako.",en:"I'm very sleepy.",r:"good",fb:"Sobrang works too."}]},
   {who:"paolo",tl:"Haha! Masaya ka ba?",en:"Haha! Are you happy?"},
   {prompt:"Yes, you are happy.",opts:[
     {t:"Oo, masaya ako.",en:"Yes, I'm happy.",r:"good",fb:"Oo + full answer."},
     {t:"Oo, masaya ka.",en:"Yes, you are happy.",r:"bad",fb:"Ka = you. Say ako (I)."},
     {t:"Hindi ako masaya.",en:"I'm not happy.",r:"bad",fb:"Grammatically right, but that's the opposite."}]},
   {who:"paolo",tl:"Sige, matulog ka na. Paalam! Ingat ka!",en:"Okay, go to sleep now. Bye! Take care!",gloss:"matulog = to sleep"},
   {prompt:"Say goodbye.",opts:[
     {t:"Ingat ka rin! Paalam!",en:"You take care too! Bye!",r:"good",fb:"Rin after ka."},
     {t:"Magandang umaga!",en:"Good morning!",r:"bad",fb:"That's a morning hello."},
     {t:"Salamat! Paalam!",en:"Thanks! Bye!",r:"ok",fb:"Fine! Ingat ka rin returns his “take care”."}]},
   {who:"paolo",tl:"Bye!",en:"Bye!"}
 ]}
];

const SCIENCE = [
 {k:"Spaced repetition",where:"Review",s:"Each word comes back just before you would forget it, and the gap grows every time you remember it. Spacing beats cramming in hundreds of studies.",ref:"Ebbinghaus (1885); Cepeda et al., Psychological Bulletin (2006)"},
 {k:"Retrieval practice",where:"Every game",s:"Pulling a word out of memory strengthens it far more than rereading it. That's why you answer before you see the answer.",ref:"Roediger & Karpicke, Psychological Science (2006)"},
 {k:"Keyword mnemonics",where:"Memory hooks",s:"A vivid sound-alike image links the new word to one you know. It roughly doubles recall of foreign vocabulary for beginners.",ref:"Atkinson & Raugh (1975)"},
 {k:"Dual coding",where:"Cards",s:"A picture plus a word gives memory two routes back to the meaning.",ref:"Paivio (1971); Clark & Paivio (1991)"},
 {k:"Production effect",where:"Say it aloud",s:"Saying a word out loud makes it more memorable than reading it silently.",ref:"MacLeod et al., JEP: LMC (2010)"},
 {k:"Interleaving",where:"Daily review, mixed practice",s:"Mixing topics forces you to choose the right word for the situation, which builds stronger, more flexible memory.",ref:"Rohrer & Taylor (2007); Kornell & Bjork (2008)"},
 {k:"Generation effect",where:"Type it, Build it",s:"Producing the answer yourself, even with effort and mistakes, beats picking it from a list.",ref:"Slamecka & Graf (1978)"},
 {k:"Context and role-play",where:"Situations, Kausap",s:"Words learned inside a meaningful situation transfer to real conversations.",ref:"Godden & Baddeley (1975); task-based language teaching research"},
 {k:"Elaboration via known languages",where:"Spanish links",s:"Connecting new words to cognates you already know (trabaho ↔ trabajo) gives them an instant anchor.",ref:"de Groot & Keijzer (2000)"}
];
