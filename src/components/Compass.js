import React from 'react';
import { Link } from 'react-router';
import * as content from '../../content/questions.json';

class Compass extends React.Component {
  constructor(props){
      super()
      this.constructQuestions = this.constructQuestions.bind(this);
      this.computeChoice = this.computeChoice.bind(this);

      this.state = {
        questions: content.questions,
        score: 0,
        currentQuestion: 0
      }
  }


  computeChoice(choice, question, index) {
    const isCorrect = choice === question.answer ? true : false;

    const updatedQuestion = Object.assign(question, {completed: true });
    const updatedQuestions = this.state.questions.filter(q => !q.completed).map((q,i) => index === i ? updatedQuestion : q);
    this.setState({
      questions: updatedQuestions
    })
  }

  constructQuestions(questions) {
    if(questions.length === 0){
      return (
        <h1> You lose, bitch. </h1>
      );
    }
    return questions.map((q, i) => {
      return (
        <div className="question-block" key={i}>
          <h3>{q.title}</h3>
          <p>{q.content}</p>
          <p>Completed? {q.completed.toString()}</p>

          {q.options.map((o,i)=>{
            return (
              <div key={i}>
                <button onClick={this.computeChoice.bind(this, o, q, i)}>{o}</button>
              </div>
            )
          })}
        </div>
      );
    });
  }

  render() {
    const formattedQuestions = this.constructQuestions(this.state.questions);
    return (
      <h1>{formattedQuestions}</h1>
    );
  }
}

Compass.propTypes = { children: React.PropTypes.object };

export default Compass;
