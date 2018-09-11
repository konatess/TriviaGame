// variables
    // array of objects for questions
        // each question needs 
            // question
            // four answers
            // marker for correct answer
    var quesArr = [
        {
            ques: "What is the largest muscle in the human body by volume?",
            cAns: "gluteus maximus",
            wAns: ["vastus lateralis", "pectoralis major", "soleus"]
        },
        {
            ques: "What is the longest muscle in the human body?",
            cAns: "sartorius",
            wAns: ["gracilis", "rectus femoris", "peroneus longus"]
        },
        {
            ques: "Which of these muscles is the strongest?",
            cAns: "masseter",
            wAns: ["biceps brachii", "rectus abdominis", "flexor digitorum profundus"]
        },
        {
            ques: "Of the rotator cuff muscles, which one does NOT rotate the humerus?",
            cAns: "supraspinatus",
            wAns: ["infraspinatus", "teres minor", "subscapularis"]
        },
        {
            ques: "Which quadriceps muscle crosses the hip?",
            cAns: "rectus femoris",
            wAns: ["vastus lateralis", "vastus intermedius", "vastus medialis"]
        },
        {
            ques: "Which muscle is the shortest?",
            cAns: "stapedius",
            wAns: ["flexor digiti minimi", "adductor brevis", "geniohyoid"]
        }
    ]

    // answer classes array
    var ansDivsArr = [".ans1", ".ans2", ".ans3", ".ans4"];
    // tracker for questions already answered
    var doneQues = [];
    // tracker for current question as index of quesArr
    var currentQues = 0;
    // countdown start
    var countdown = 30;
    // holder for interval function
    var startTimer;
    // count right answers
    var countCorrect = 0;
    // count wrong answers
    var countWrong = 0;
    // count time outs
    var countTimeouts = 0;
    // to keep things from being clickable after answer shows
    var clickable = false


// functions
    // start button on click
    $(document).on("click", ".startbtn", function() {
        // start button disappears
        $(".startbtn").addClass("invisible");
        // calls choose and display question function
        displayQA();
    });
    // choose and display question
    function displayQA() {
        $(".ans").addClass("hoverable")
        clickable = true;
        // remove .correct from all answers
        $(".ans").removeClass("correct")
        // set countdown
        countdown = 30;
        // randomly choose a question
        var fulfilled = false;
        while (fulfilled === false) {
            var random = Math.floor(Math.random() * quesArr.length)
            if (doneQues.includes(random)===false) {
                currentQues = random
                console.log("Current question is " +currentQues)
                // save question to chosen questions tracker
                doneQues.push(currentQues);
                console.log("Done questions are " +doneQues)
                fulfilled = true
            }  
        };
        // question displays
        $(".question").text(quesArr[currentQues]['ques'])
        // answers display and mark correct answer
        var b = []
        for (var j = 0; j < ansDivsArr.length; j++) {
            var c = Math.floor((Math.random() * ansDivsArr.length))
            if (!(b.includes(c))) {
                b.push(c)
            }
            else {
                j--
            }
        };
        $(ansDivsArr[ b[0] ]).text(quesArr[currentQues]['cAns']);
        $(ansDivsArr[ b[0] ]).addClass("correct")
        for (var i = 1; i < ansDivsArr.length; i++ ) {   
            $(ansDivsArr[ b[i] ]).text(quesArr[currentQues]['wAns'][i-1]);
        };
        b.length = 0
        $(".answers").removeClass("hidden")
        // clock time displays and clock begins countdown
            // set interval
            startTimer = setInterval(displayTime, 1000)
    }

    function displayTime() {
        countdown--
        $(".timer").text(countdown)
         // if timer runs out, call check answer function
        if (countdown === 0) {
            answer();
        }
    };

    // check answer 
    // if answer is clicked, stop timer
    $(".ans").on("click", answer)

    // next step function --> what to do after each option of answer
    function nextStep() {
        clickable = false;
        console.log("Clickable = " + clickable);
        // if doneQues.length === quesArr.length, call end function
        if (doneQues.length === quesArr.length) {
            setTimeout(endQuiz, 4000);
        }
        else {
            setTimeout(displayQA, 4000);
        }
    }

        
    function answer() {
        // stop timer
        clearInterval(startTimer)
        // make the hover effects disappear from answer divs
        $(".ans").removeClass("hoverable");
        // if out of time
        if (clickable === true) {
            if (countdown === 0) {
                $(".ans1").text("Oh no! You ran out of time.");
                $(".ans2").text("Correct answer is:   " + quesArr[currentQues]['cAns']);
                $(".ans3").text("");
                $(".ans4").text("");
                countTimeouts++;
                nextStep();
            }
            // if clicked before time runs out 
            else {
                // check answer
                // if correct
                if ( $(this).hasClass("correct") ) {
                    $(".ans1").text("Yes, " + quesArr[currentQues]['cAns'] + " is correct!")
                    $(".ans2").text("");
                    $(".ans3").text("");
                    $(".ans4").text("");
                    countCorrect++
                    nextStep();
                }
                // else
                else {
                    $(".ans1").text("Oh no! That's not right!")
                    $(".ans2").text("The correct answer was " + quesArr[currentQues]['cAns'] + ".");
                    $(".ans3").text("");
                    $(".ans4").text("");
                    countWrong++
                    nextStep();
                }
            } 
        }
    };  

    // end function
    function endQuiz() {
        clickable = false;
        console.log("clickable = " + clickable)
        // display "the end" in .timer
        $(".timer").text("The End")
        // display "right answers #" in ans1
        $(".ans1").text("You got " +countCorrect+ " right answers")
        // display "wrong answers #" in ans2
        $(".ans2").text("You got " +countWrong+ " wrong answers")
        // display "ran out of time # times" in ans3
        $(".ans3").text("You ran out of time " +countTimeouts+ " times")
        // put "start over" button in .question
        $(".question").text("")
        $(".question").append('<button class="restartbtn btn btn-outline-dark btn-lg w-50">restart?</button>')
    };
        
    // start over function
    function startOver() {
        // empty .question
        $(".question").empty();
        // clear doneQues
        doneQues.length = 0;
        // clear countCorrect
        countCorrect = 0;
        // clear countWrong
        countWrong = 0;
        // clear countTimeouts
        countTimeouts = 0;
        // call displayQA
        displayQA();
    }

    $(document).on("click", ".restartbtn", startOver);

// stretch goals
    // easy, medium and hard option, with different times for each
    // 