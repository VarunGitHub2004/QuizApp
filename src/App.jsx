import React, { useEffect, useState } from "react";
import data from "../public/assets/data";
import Questions from "../public/assets/data";
const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [missed, setMissed] = useState(0);
  const [score, setScore] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [skipped, setSkipped] = useState(0);
  const [counter, setCounter] = useState(0);
  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setCorrect(correct + 1);
      setScore(score + 1);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < Questions.length) {
      console.log(nextQuestion);
      setCurrentQuestion(nextQuestion);
    } else setShowScore(true);

    setIncorrect(score - correct + missed + skipped);
  };
  function doSkip() {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < Questions.length) {
      setSkipped(skipped + 1);
      setCurrentQuestion(nextQuestion);
    } else setShowScore(true);
  }


  useEffect(()=>{
    var IntervalId
  var i=0
    if(i<=5)
    {
  var IntervalId= setInterval(()=>{
      setCounter(counter+1)
   },1000)
   i++
  }
  else{
    setCurrentQuestion(currentQuestion+1)
    setCounter(0)
  }

  return ()=>{
    clearInterval(IntervalId)
  }
  },[counter])
  return (
    <div className="app">
      {showScore ? (
        <div className="score-section">
          <div className="score">
            {" "}
            You scored {score} out of {Questions.length}
          </div>
          <div>Correct:{correct}</div>
          <div>incorrect:{incorrect}</div>
          <div>Skipped : {skipped}</div>
          <div>Missed : {missed}</div>
        </div>
      ) : (
        <>
          <div className="question-section">
            <div className="questionCount">
              <span>Question{currentQuestion + 1}</span>/{Questions.length}
            </div>
            <div className="question-text">
              {Questions[currentQuestion].questionText}
            </div>
        {counter}
            <button class="custom-btn btn-1" onClick={() => doSkip()}>
              Skip
            </button>
          </div>
          <div className="answer-section">
            {Questions[currentQuestion].answerOptions.map((options) => (
              <button
                onClick={() => handleAnswerOptionClick(options.isCorrect)}
              >
                {options.answerText}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
