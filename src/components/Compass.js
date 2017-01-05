import React from 'react';
import { Link } from 'react-router';
import * as content from '../../content/questions.json';

class Compass extends React.Component {
  constructor(props){
      super()
      this.constructQuestions = this.constructQuestion.bind(this);
      this.computeChoice = this.computeChoice.bind(this);

      this.state = {
        questions: content.questions,
        questionIndex: 0
      }
  }


  computeChoice(option, question) {
    const completedQuestion = Object.assign(question, {completed: true });
    const updatedQuestions = this.state.questions.map((q,i) => q.id === question.id ? completedQuestion : q);
    const updatedIndex = this.state.questionIndex + 1;
    this.setState({
      questions: updatedQuestions,
      questionIndex: updatedIndex
    })
  }

  constructQuestion(question) {
    return (
      <div className="question-block">
        <h3>{question.title}</h3>
        <p>{question.content}</p>
        <p>Type: {question.type}</p>
        <p>Completed: {question.completed.toString()}</p>

        {question.options.map((o,i)=>{
          return (
            <div key={i}>
              <button onClick={this.computeChoice.bind(this, o, question)}>{o}</button>
            </div>
          )
        })}
      </div>
    );
  }

  render() {
    if(this.state.questions[this.state.questionIndex]){
      const formattedQuestions = this.constructQuestion(this.state.questions[this.state.questionIndex]);
      return (
        <div>
        {formattedQuestions}
        </div>
      );
    }else {
      return <h1>Game Over</h1>
    }
  }
}

Compass.propTypes = { children: React.PropTypes.object };

export default Compass;
