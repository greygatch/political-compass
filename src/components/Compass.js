import React from 'react';
import * as content from '../../content/questions.json';

class Compass extends React.Component {
  constructor(props) {
    super(props);
    this.constructQuestions = this.constructQuestion.bind(this);
    this.resetApp = this.resetApp.bind(this);

    this.state = this.returnOriginalState();
  }

  returnOriginalState() {
    return {
      questions: content.questions,
      questionIndex: 0,
      socialScore: 0,
      socialCount: 0,
      economicsScore: 0,
      economicsCount: 0
    }
  }


  computeChoice(option, question) {
    const { socialScore, economicsScore, socialCount, economicsCount } = this.state;
    const completedQuestion = Object.assign(question, { completed: true });
    const updatedQuestions = this.state.questions.map(q => q.id === question.id ? completedQuestion : q);
    const updatedIndex = this.state.questionIndex + 1;
    const updatedSocialScore = question.type === 'social' ? socialScore + option : socialScore;
    const updatedSocialCount = question.type === 'social' ? socialCount + 1 : socialCount
    const updatedEconomicsScore = question.type === 'economic' ? economicsScore + option : economicsScore;
    const updatedEconomicsCount = question.type === 'economic' ? economicsCount + 1 : economicsCount;

    this.setState({
      questions: updatedQuestions,
      questionIndex: updatedIndex,
      socialScore: updatedSocialScore,
      economicsScore: updatedEconomicsScore,
      socialCount: updatedSocialCount,
      economicsCount: updatedEconomicsCount
    });
  }



  constructQuestion(question) {
    // TODO
    const QuestionOptions = question.options.map((option, i) => {
      return (
        <div key={i}>
          <button onClick={() => this.computeChoice(option, question)}>{option}</button>
        </div>
      );
    });

    return (
      <div className="question-block">
        <h3>{question.title}</h3>
        <p>{question.content}</p>
        <p>Type: {question.type}</p>
        {QuestionOptions}
      </div>
    );
  }

  resetApp() {
    this.setState(this.returnOriginalState());
  }

  render() {
    const { questions, questionIndex, socialScore, socialCount, economicsScore, economicsCount } = this.state;
    const socialAverage = socialScore / socialCount;
    const economicsAverage = economicsScore / economicsCount;
    const currentQuestion = questions[questionIndex];
    if (currentQuestion) {
      const formattedQuestion = this.constructQuestion(currentQuestion);
      return (
        <div>
          {formattedQuestion}
        </div>
      );
    }
    return (
      <div>
        <h1>Game Over</h1>
        <div id="compass-container">
          Compass
        </div>
        <p>Social Score: {socialScore} | Social Count: {socialCount} | X-Axis: {socialAverage}</p>
        <p>Economics Score: {economicsScore} | Economics Count: {economicsCount} | Y-Axis: {economicsAverage}</p>
        <button onClick={this.resetApp}>Reset</button>
      </div>
    );
  }
}

Compass.propTypes = { children: React.PropTypes.object };

export default Compass;
