import React from 'react';
import Compass from './Compass';
import Question from './Question';
import * as content from '../../content/questions.json';

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.constructQuestions = this.constructQuestion.bind(this);
    this.computeChoice = this.computeChoice.bind(this);
    this.resetApp = this.resetApp.bind(this);

    this.state = this.returnOriginalState();
  }

  returnOriginalState() {
    return {
      questions: content.questions,
      questionIndex: 0,
      socialScore: 0,
      socialCount: 0,
      socialAverage: 0,
      economicsScore: 0,
      economicsCount: 0,
      economicsAverage: 0
    }
  }


  computeChoice(option, question) {
    const { socialScore, economicsScore, socialCount, economicsCount } = this.state;
    const completedQuestion = Object.assign(question, { completed: true });
    const updatedQuestions = this.state.questions.map(q => q.id === question.id ? completedQuestion : q);
    const updatedIndex = this.state.questionIndex + 1;
    const updatedSocialScore = question.type === 'social' ? socialScore + option : socialScore;
    const updatedSocialCount = question.type === 'social' ? socialCount + 1 : socialCount
    const updatedSocialAverage = updatedSocialScore / updatedSocialCount || 0;
    const updatedEconomicsScore = question.type === 'economic' ? economicsScore + option : economicsScore;
    const updatedEconomicsCount = question.type === 'economic' ? economicsCount + 1 : economicsCount;
    const updatedEconomicsAverage = updatedEconomicsScore / updatedEconomicsCount || 0;

    this.setState({
      questions: updatedQuestions,
      questionIndex: updatedIndex,
      socialScore: updatedSocialScore,
      socialCount: updatedSocialCount,
      socialAverage: updatedSocialAverage,
      economicsScore: updatedEconomicsScore,
      economicsCount: updatedEconomicsCount,
      economicsAverage: updatedEconomicsAverage
    });
  }

  computeAffiliation(socialAverage, economicsAverage) {
    const isModerate = socialAverage < 3.5 && socialAverage > 1.5 && economicsAverage < 3.5 && economicsAverage > 1.5;
    let socialLeaning;
    let economicsLeaning;

    if(socialAverage === 2.5){
      socialLeaning = 'Centrist';
    } else {
      socialLeaning = socialAverage > 2.5 ? 'Authoritarian' : 'Libertarian';
    }

    if(economicsAverage === 2.5){
      economicsLeaning = 'Centrist';
    } else {
      economicsLeaning = economicsAverage > 2.5 ? 'Right' : 'Left';
    }

    return { socialLeaning, economicsLeaning, isModerate };
  }

  constructQuestion(question) {
    return (
      <Question question={question} computeChoice={this.computeChoice} />
    );
  }

  constructAffiliationDisplay(affiliation){

    return (
      <div>
        <div>
          Moderate: {affiliation.isModerate.toString()}
        </div>
        <div>
          Social: {affiliation.socialLeaning}
        </div>
        <div>
          Economic: {affiliation.economicsLeaning}
        </div>
      </div>
    )
  }

  resetApp() {
    this.setState(this.returnOriginalState());
  }

  render() {

    const { questions, questionIndex, socialScore, socialCount, socialAverage, economicsScore, economicsCount, economicsAverage } = this.state;
    const currentQuestion = questions[questionIndex];
    const politicalAffiliation = this.computeAffiliation(socialAverage, economicsAverage);
    const politicalAffiliationDisplay = this.constructAffiliationDisplay(politicalAffiliation);
    if (currentQuestion) {
      const formattedQuestion = this.constructQuestion(currentQuestion);
      return (
        <div>
          <Compass economicsAverage={economicsAverage} socialAverage={socialAverage} />
          {politicalAffiliationDisplay}
          {formattedQuestion}
        </div>
      );
    }
    return (
      <div>
        <Compass economicsAverage={economicsAverage} socialAverage={socialAverage} />
        {politicalAffiliationDisplay}
        <h1>Game Over</h1>
        <p>Social Score: {socialScore} | Social Count: {socialCount} | X-Axis: {socialAverage}</p>
        <p>Economics Score: {economicsScore} | Economics Count: {economicsCount} | Y-Axis: {economicsAverage}</p>
        <button onClick={this.resetApp}>Reset</button>
      </div>
    );
  }
}

Quiz.propTypes = { children: React.PropTypes.object };

export default Quiz;
