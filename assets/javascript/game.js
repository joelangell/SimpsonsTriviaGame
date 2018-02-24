$(document).ready(function () {



    var questionsRemaining = 10
    var correctAnswers = 0
    var wrongAnswers = 0
    var answered = 0
    var timer = 20
    var countDown;
    var stopTimer = false
    var newQuestion
    var randNum
    var questions = [

        [
            "Who won the Diorama contest at Springfield Elementary?",
            "Lisa",
            "Ralph",
            "Allison",
            "Bart",
            "Ralph",
            "diorama.gif"
        ],

        [
            "What did Milhouse do with the money he got for selling Bart's soul",
            "Bought a Krustyburger",
            "Built a boxcar racer",
            "Bought Alf pogs",
            "Bought new flood pants",
            "Bought Alf pogs",
            "alf.gif"
        ],

        [
            "What ailment does Dr. Nick diagnose Grandpa Simpson with?",
            "Flu",
            "Protein Deficiency",
            "Pneumonoultramicroscopicsilicovolcanoconiosis",
            "Bonus eruptus",
            "Bonus eruptus",
            "drnick2.gif"
        ],

        [
            "What does Kent Brockman call the snowstorm that hits Springfield?",
            "Class 3 Killstorm",
            "Snowmageddon",
            "Snowpocalypse",
            "Stormsplosion",
            "Class 3 Killstorm",
            "brockman.gif"
        ],

        [
            "What does Ned Flanders have a season pass for?",
            "Wax Museum",
            "Dollywood",
            "Church Fair",
            "Cider Mill",
            "Cider Mill",
            "cider.gif"
        ],

        [
            "Who does Mr. Burns have working in the Nuclear Plant's reactor core?",
            "Homer",
            "A robot with Smithers' voice",
            "A missing Brazilian soccer team",
            "Zutroy",
            "A missing Brazilian soccer team",
            "stewart.gif"
        ],

        [
            "What does Chief Wiggum get his tie caught in?",
            "An elevator",
            "A hot dog warmer",
            "An esclator",
            "A sliding glass door at the police station",
            "A hot dog warmer",
            "wiggum.gif"
        ],

        [
            "What is Moe hiding in the back when the FBI visits the bar?",
            "A box of smuggled Pandas",
            "Shamu",
            "Boxes of bootleg Jordache jeans",
            "Zutroy",
            "Shamu",
            "moe1.gif"
        ],

        [
            "Who does Lisa meet when she becomes a vegetarian?",
            "Ellen Degeneres",
            "Morrisey",
            "Paul and Linda McCartney",
            "Prince",
            "Paul and Linda McCartney",
            "lisa2.gif"
        ],

        [
            "Where does Bart serve community service after causing Springfield to lose the Olypmics?",
            "Fireworks, Candy, and Puppy Dogs Store",
            "Springfield Retirement Castle",
            "Cleaning up the Springfield tire fire",
            "Shelbyville",
            "Springfield Retirement Castle",
            "hacha.gif"
        ]

    ]

    $("#answerBox").on("click", function () {
        if (questionsRemaining <= 0) {
            gameOver()
        }
        else {
            startGame()
        }
    })



    function startGame() {
        $("#answerBox").hide()
        var timer = 20
        stopTimer = false
        $("#timerText").text("Time Remaining:  " + timer)
        countDown = setInterval(function timerFunction() {
            timer--
            $("#timerText").text("Time Remaining:  " + timer)
            if (timer === 0) {
                clearInterval(countDown)
                questionsRemaining--
                $("#answerBox").show()
                $("#answerText").text("Sorry you're out of time! The correct answer is '" + questions[answered][5] + "'.")
                $("#picBox").attr("src", "./assets/images/" + questions[answered][6] + "")
                var newQuestion = setTimeout(function () {
                    answered++
                    emptyQuestion()
                }, 7000)

            }
            else if (stopTimer) {
                clearInterval(countDown)
            }
        }, 1000)
        generateQuestion()
    }

    var randNum = Math.floor(Math.random() * questions.length)

    function generateQuestion() {

        $("#questionBox").text(questions[answered][0])
        $("#q1Text").text(questions[answered][1])
        $("#q2Text").text(questions[answered][2])
        $("#q3Text").text(questions[answered][3])
        $("#q4Text").text(questions[answered][4])
    }


    $(".list-group-item-success").on("click", function () {
        $(this).off('click')
        $("#answerBox").show()
        stopTimer = true
        if (($(this).text()) === questions[answered][5]) {
            correctAnswers++
            questionsRemaining--
            console.log(questionsRemaining)
            $("#answerText").text("You did it! Correct answer!")
            $("#picBox").attr("src", "./assets/images/" + questions[answered][6] + "")
            var newQuestion = setTimeout(function () {
                answered++
                emptyQuestion()
                $(this).off('click')
            }, 7000)
        }
        else if (($(this).text()) !== questions[answered][5]) {
            wrongAnswers++
            questionsRemaining--
            console.log(questionsRemaining)
            $("#answerText").text("Sorry the correct answer is " + questions[answered][5] + ".")
            $("#picBox").attr("src", "./assets/images/" + questions[answered][6] + "")
            var newQuestion = setTimeout(function () {
                answered++
                emptyQuestion()
                $(this).off('click')
            }, 7000)
        }

        // if (questionsRemaining <= 0) {
        //     gameOver()
        // }
    })

    function emptyQuestion() {
        $("#questionBox").text('')
        $("#q1Text").text('')
        $("#q2Text").text('')
        $("#q3Text").text('')
        $("#q4Text").text('')
        $("#picBox").attr("src", "./assets/images/simpsons2.png")
        if (questionsRemaining > 0) {
            startGame()
        }
        else {
            gameOver()
        }

    }

    function nextQuestion() {
        for (var i = 0; i < 4; i++) {
            var timer = 20
            $("#questionBox").text(questions[randNum][0])
            $("#q1Text").text(questions[randNum][1])
            $("#q2Text").text(questions[randNum][2])
            $("#q3Text").text(questions[randNum][3])
            $("#q4Text").text(questions[randNum][4])
        }
    }


    function gameOver() {
        $("#questionBox").text('')
        $("#q1Text").text('')
        $("#q2Text").text('')
        $("#q3Text").text('')
        $("#q4Text").text('')
        $("#timerText").text('')
        if (correctAnswers > 7) {
            $("#answerText").text("Game over! You got " + wrongAnswers + " answers wrong and " + correctAnswers + " answers correct. Congrats! We're all very proud. Click here to play again!")
            $("#picBox").attr("src", "./assets/images/nelson.gif")
        }
        else if (correctAnswers >= 5 && correctAnswers <= 7) {
            $("#answerText").text("Game over! You got " + wrongAnswers + " answers wrong and " + correctAnswers + " answers correct. At least you tried. Click here to play again!")
            $("#picBox").attr("src", "./assets/images/lenny3.gif")
        }
        else {
            $("#answerText").text("Game over! You got " + wrongAnswers + " answers wrong and " + correctAnswers + " answers correct. The lesson is never try... Click to play again!")
            $("#picBox").attr("src", "./assets/images/boourns.gif")
        }
        $("#answerBox").on("click", function () {
            resetStats()
        })
    }
    
    function resetStats() {
        questionsRemaining = 10
        correctAnswers = 0
        wrongAnswers = 0
        answered = 0
        timer = 20
        stopTimer = false
        emptyQuestion()
    }

});




//Create button to start playing game

    //Timer with 20 seconds to select an anser

        //if correct answer is selected, display congratulations message and gif/video
            //increment correct answers 
            //decrement questions left

        //else if incorrect answer, display correct answer
            //increment wrong answers
            //decrement questions left

        //else if timer runs out, display correct answer
            //increment wrong answers
            //decrement questions left


    //if questions left <= 0        
        //Display Play Again button
            //reset questions left
            //reset correct answers
            //reset wrong answers
