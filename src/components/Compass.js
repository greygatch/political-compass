import React from 'react';
import { Link } from 'react-router';
import * as content from '../../content/questions.json';

class Compass extends React.Component {
  constructor(props){
      super()
      this.constructQuestions = this.constructQuestion.bind(this);
      this.computeChoice = this.computeChoice.bind(this);
      this.resetApp = this.resetApp.bind(this);

      this.state = {
        questions: content.questions,
        questionIndex: 0,
        socialScore: 0,
        economicsScore: 0
      }
  }


  computeChoice(option, question) {
    const { socialScore, economicsScore } = this.state;
    const completedQuestion = Object.assign(question, {completed: true });
    const updatedQuestions = this.state.questions.map((q,i) => q.id === question.id ? completedQuestion : q);
    const updatedIndex = this.state.questionIndex + 1;
    const updatedSocialScore = question.type === 'social' ? socialScore + option : socialScore;
    const updatedEconomicsScore = question.type === 'economic' ? economicsScore + option : economicsScore;

    this.setState({
      questions: updatedQuestions,
      questionIndex: updatedIndex,
      socialScore: updatedSocialScore,
      economicsScore: updatedEconomicsScore,
    })
  }

  constructQuestion(question) {
    return (
      <div className="question-block">
        <h3>{question.title}</h3>
        <p>{question.content}</p>
        <p>Type: {question.type}</p>

        {question.options.map((option,i)=>{
          return (
            <div key={i}>
              <button onClick={this.computeChoice.bind(this, option, question)}>{option}</button>
            </div>
          )
        })}
      </div>
    );
  }

  resetApp() {
    console.log('foobar');
    this.setState({
      questions: content.questions,
      questionIndex: 0,
      socialScore: 0,
      economicsScore: 0
    })
  }

  render() {
    const { questions, questionIndex, socialScore, economicsScore } = this.state;
    if(this.state.questions[this.state.questionIndex]){
      const formattedQuestions = this.constructQuestion(questions[questionIndex]);
      return (
        <div>
        {formattedQuestions}
        </div>
      );
    }else {
      return (
        <div>
          <h1>Game Over</h1>
          <p>Social: {socialScore}</p>
          <p>Economic: {economicsScore}</p>
          <button onClick={this.resetApp}>Reset</button>
        </div>
      )
    }
  }
}

Compass.propTypes = { children: React.PropTypes.object };

export default Compass;
