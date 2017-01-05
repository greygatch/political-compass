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
        questionIndex: 0
      }
  }


  computeChoice(option, question) {
    const completedQuestion = Object.assign(question, {completed: true });
    const updatedQuestions = this.state.questions.map((q,i) => q.id === question.id ? completedQuestion : q);

    this.setState({
      questions: updatedQuestions
    })
  }

  constructQuestions(questions) {
    return questions.map((q, i) => {
      return (
        <div className="question-block" key={i}>
          <h3>{q.title}</h3>
          <p>{q.content}</p>
          <p>Type: {q.type}</p>
          <p>Completed: {q.completed.toString()}</p>

          {q.options.map((o,i)=>{
            return (
              <div key={i}>
                <button onClick={this.computeChoice.bind(this, o, q)}>{o}</button>
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
      <div>
        {formattedQuestions}
      </div>
    );
  }
}

Compass.propTypes = { children: React.PropTypes.object };

export default Compass;
