var exampleArray = ["ab","etwas","Holz","neun","stellen","Abend","fahren","hören","nicht","Straße","acht","Fahrrad","Hund","nichts","Stück","alle","fährt","Hunger","nie","Stunde","allein","fallen","ich","nimmt","suchen","als","Familie","ihm","noch","Tag","also","fangen","ihn","nun","Tante","alt","fast","ihr","nur","Teller","an","fehlen","im","ob","tief","andere","Fehler","immer","oben","Tier","anfangen","Feld","in","oder","Tisch","Angst","Fenster","ins","offen","tot","antworten","Ferien","ist","öffnen","tragen","Apfel","fertig","ja","oft","traurig","Arbeit","fest","Jahr","ohne","treffen","arbeiten","Feuer","jeder","Oma","trinken","Arzt","fiel","jetzt","Onkel","tun","auch","finden","jung","Opa","Tür","auf","fing","Junge","packen","turnen","Auge","Finger","kalt","Pferd","über","aus","Fisch","kam","Platz","überall","Auto","Flasche","kann","plötzlich","Uhr","baden","fliegen","Katze","Polizei","um","bald","Frage","kaufen","Rad","uns","Ball","fragen","kein","rechnen","unser","bauen","Frau","kennen","reden","unten","Bauer","frei","Kind","reich","unter","Baum","fressen","Klasse","reiten","Vater","beginnen","Freude","klein","rennen","vergessen","bei","freuen","klettern","richtig","verkaufen","beide","Freund","kochen","rot","verlieren","Bein","fröhlich","kommen","rufen","verstecken","Beispiel","früh","können","ruhig","verstehen","beißen","fuhr","Kopf","rund","versuchen","bekommen","führen","krank","Sache","viel","Berg","fünf","kurz","sagen","vielleicht","besser","für","lachen","sah","vier","Bett","Fuß","Land","sammeln","Vogel","Bild","Fußball","lang","schaffen","voll","bin","gab","langsam","schauen","vom","bis","ganz","las","scheinen","von","blau","gar","lassen","schenken","vor","bleiben","Garten","laufen","schicken","vorbei","Blume","geben","laut","Schiff","Wagen","Boden","Geburtstag","leben","schlafen","wahr","böse","gefährlich","legen","schlagen","Wald","brauchen","gegen","Lehrer","schlecht","war","braun","gehen","Lehrerin","schließen","warm","Brief","gehören","leicht","schlimm","warten","bringen","gelb","leise","Schluss","warum","Brot","Geld","lernen","Schnee","was","Bruder","genau","lesen","schnell","waschen","Buch","gerade","letzte","schon","Wasser","da","gern","Leute","schön","Weg","dabei","Geschenk","Licht","schreiben","weg","dafür","Geschichte","liegen","schreien","Weihnachten","damit","Gesicht","ließ","schrieb","weil","danach","gestern","Loch","Schule","weinen","dann","gesund","los","Schüler","weiß","daran","gewinnen","Luft","schwarz","weit","darauf","gibt","lustig","schwer","Welt","darin","ging","machen","Schwester","wenig","dauern","Glas","Mädchen","schwimmen","wenn","davon","glauben","mal","sechs","wer","dazu","gleich","man","See","werden","dem","Glück","Mann","sehen","werfen","den","glücklich","Maus","sehr","Wetter","denken","Gott","Meer","sein","wichtig","deshalb","groß","mehr","Seite","wie","dick","grün","mein","selbst","wieder","diese","gut","Mensch","setzen","Wiese","Ding","Haar","merken","sich","will","dir","haben","mich","sicher","Wind","doch","halb","Milch","sieben","Winter","Dorf","halten","Minute","sieht","wir","dort","Hand","mir","sind","wird","draußen","hängen","mit","singen","wirklich","drehen","hart","mögen","sitzen","wissen","drei","Hase","möglich","so","wo","dumm","hast","Monat","sofort","Woche","dunkel","hat","müde","Sohn","wohl","durch","hatte","Musik","soll","wohnen","dürfen","Haus","muss","sollen","Wohnung","eigentlich","heiß","müssen","Sommer","wollen","ein","heißen","Mutter","Sonne","Wort","einer","heißt","nach","Sonntag","wünschen","einfach","helfen","nächste","sonst","Zahl","einige","her","Nacht","Spaß","zehn","Eis","heraus","nah","spät","zeigen","Eltern","Herr","nahm","Spiel","Zeit","Ende","Herz","Name","spielen","Zeitung","endlich","heute","nämlich","sprechen","ziehen","er","hier","Nase","springen","Zimmer","Erde","Hilfe","nass","Stadt","zu","erklären","Himmel","natürlich","stand","Zug","erschrecken","hin","neben","stark","zum","erst","hinein","nehmen","stehen","zur","erzählen","hinter","nein","steigen","zurück","es","hoch","nennen","Stein","zusammen","essen","holen","neu","Stelle","zwei"];
var searchword=["Baum","abenddaemmerung","auto fahren","Fahrzeug","Tierart"];

const countProposals = 2;

function findOptimum(searchArray,searchWord,searchDepth=searchWord.length, wordMap=new Map()) {
    if ((searchDepth >= 2 && wordMap.size <= 25 * countProposals) || searchDepth >= searchWord.length - 3) {
        for (var i = 0; i <= searchWord.length - searchDepth; i++) {
            for (const entry of searchArray) {

                if (entry.toLowerCase().includes(searchWord.substring(i, i + searchDepth).toLowerCase())) {
                    wordMap.set(entry, (isNaN(wordMap.get(entry)) ?  searchDepth : wordMap.get(entry) + searchDepth));
                    if(searchDepth==searchWord.length&&entry.toLowerCase()==searchWord) {
                        wordMap.set(entry, (isNaN(wordMap.get(entry)) ? 2 * searchDepth : wordMap.get(entry) + 2 * searchDepth));
                    }
                }
            }
        }
        return findOptimum(searchArray, searchWord, searchDepth - 1, wordMap);
    } else {
        var proposalList = [];
        searchArray.sort(function (string1, string2) {
            if (isNaN(wordMap.get(string2))) return -1;
            if (isNaN(wordMap.get(string1))) return 1;
            return wordMap.get(string2) - wordMap.get(string1);
        });

        for (var i = 0; i < countProposals; i++) {
            if (wordMap.get(searchArray[i]) > searchWord.length && wordMap.get(searchArray[i]) > wordMap.get(searchArray[0]) / 2) {
                proposalList.push(searchArray[i]);
            }
        }
        return proposalList;
    }
}

for(const searchString  of searchword) {
     console.log(searchString + ":  " + findOptimum(exampleArray,searchString));
}