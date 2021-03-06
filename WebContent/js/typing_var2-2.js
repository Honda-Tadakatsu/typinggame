
    var wordlist2 = ["abuse","abstract","absurd","exhibit","expose...to~","reveal","reward","prejudice","burden",
    "defect","obstacle","be an abstract to ...","threat"]//13

    var jaword2 = ["虐待","抽象的","不合理な","を展示する","を(危険に)さらす","を明らかにする","に報いる","偏見",
    "重荷","欠点","障害物","...の障害になる","脅かすもの"]

    var time_limit = 30;
    var readytime = 3;
    var score;
    var correct;
    var mistake;
    var char_num = 0;
    var word_char;
    var random;

        function ready(){
            readytime = 3;
            scoredis.innerHTML="";
            start_button.style.visibility ="hidden";
            var readytimer = setInterval(function(){
                count.innerHTML=readytime;
                readytime--;
                if(readytime < 0){
                    clearInterval(readytimer);
                    gameStart();
                }
            },1000);
        }

        function gameStart(){
            score = 0.0;
            mistake = 0;
            correct = 0;
            wordDisplay();
            var time_remaining = time_limit;
            var gametimer = setInterval(function(){
                count.innerHTML="残り時間："+time_remaining;
                time_remaining--;
                if(time_remaining <= 0){
                    clearInterval(gametimer);
                    finish();
                }
            },1000);
        }

    //補助を消したい 自分で打ち込んだ文字のみを表示したい
        function wordDisplay(){
            random = Math.floor( Math.random() * wordlist2.length );
            // word.innerHTML = wordlist[random];//->英単語
            japanese.innerHTML =jaword2[random];//英単語(打ち込む用)
            charInsort();
        }
    //word.innerHTML～を消す → キーボード押したら単語が表示される易しい仕様になった


        function charInsort(){
            word_char = wordlist2[random].charAt(char_num);
        }

        function finish(){
            score = Math.floor(Math.pow(correct,2) * Math.pow((correct/(correct+mistake)),5));
            scoredis.innerHTML="スコア:"+score+"点<br>"+"正タイプ数:"+correct+"<br>ミスタイプ数:"+mistake+"<br>正答率"+(correct/(correct+mistake)*100).toFixed(1)+"%";
            count.innerHTML="";
            word.innerHTML="";
            japanese.innerHTML="";
            start_button.style.visibility ="visible";
            word_char = 0;
            char_num = 0;
        }

    document.onkeydown = function(e) {
        var keyStr = String.fromCharCode(e.keyCode);
        keyStr = keyStr.toLowerCase();
        if(keyStr == word_char){
            word.innerHTML="<span style='color:blue;'>"+wordlist2[random].substr(0,char_num+1)+"</span>";
            +wordlist2[random].substr(char_num+1,wordlist2[random].length);
            char_num++;
            correct++;
            charInsort();
        }else{
            mistake++;
        }
        if(char_num == wordlist2[random].length){
            word.innerHTML='';
            char_num = 0;
            wordDisplay();
        }
    };

    //wordlist[random].substr(char_num+1,wordlist[random].length)で単語が配列[0]から消える
    //word[random]を消すと[list]のみの、補助なしの使用,,,どこ打ってんのかわからん

    //1.wordDisplay()と+wordlist[random].substr～を消した -> 打った文字は表示されたが次に行かない
    //2.wordDisplay()と.substr(char_num+1,wordlist[random]を消した
    //   → 正解の文字が<span>で表示されるが、問題のみ次が表示され打った文字がリセットされない

    //そのまま -> == 次の単語が表示されても、打った単語がリセットされないからあってるのかわかりにくい
    //                  打ったら消える...

    //word.innerHTML = ''; を追記で解決

