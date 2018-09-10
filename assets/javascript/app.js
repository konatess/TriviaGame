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
        }
    ]

    // answer classes array
    var ansDivsArr = [".ans1", ".ans2", ".ans3", ".ans4"];
    // tracker for questions already answered
    var doneQues = [];
    // tracker for current question as index of quesArr
    var currentQues = 0;
    // countdown start
    var countdown = 10;
    // to keep start button from triggering clearInterval
    var playing = false;
    // holder for interval function
    var startTimer;
    // count right answers
    var countCorrect = 0;
    // count wrong answers
    var countWrong = 0;
    // count time outs
    var countTimeouts = 0;


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
        // set countdown
        countdown = 10
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
        }
        console.log(b);
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
            playing = true
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
        
    function answer() {
        // stop timer
        clearInterval(startTimer)
        // if doneQues.length === quesArr.length, call end function
        if (doneQues.length === quesArr.length) {
            endQuiz();
        }
        // else 
        else {
            // if out of time
            if (countdown === 0) {
                // FIXME: timeouts counts up on click
                $(".ans1").text("Oh no! You ran out of time.");
                $(".ans2").text("Correct answer is:   " + quesArr[currentQues]['cAns']);
                $(".ans3").text("");
                $(".ans4").text("");
                countTimeouts++;
                console.log("Timeouts: " +countTimeouts)
                setTimeout(displayQA, 3000);
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
                    console.log("countCorrect: " +countCorrect)
                    setTimeout(displayQA, 3000);
                }
                // else
                else {
                    $(".ans1").text("Oh no! That's not right!")
                    $(".ans2").text("The correct answer was " + quesArr[currentQues]['cAns'] + ".");
                    $(".ans3").text("");
                    $(".ans4").text("");
                    countWrong++
                    console.log("countWrong: " +countWrong)
                    setTimeout(displayQA, 3000);
                }
            }
        };  
    };  
    // end function
    function endQuiz() {
        // display "the end" in .question
        $(".question").text("The End")
        // display "right answers #" in ans1
        // display "wrong answers #" in ans2
        // display "ran out of time # times" in ans3
        // put "start over" button in ans4
    };
        
    // start over function
        // clear doneQues
        // call displayQA

// plan:
    // click start button to begin
    // play begins
        // question displays
        // answers display
        // clock begins countdown
    // on click, answers
        // clock stops
        // determines clicked is correct or not
            // if correct, diplays "yes" and correct answer
            // if not, displays "no" and correct answer
        // after 5 seconds, goes to next question

// stretch goals
    // easy, medium and hard option, with different times for each