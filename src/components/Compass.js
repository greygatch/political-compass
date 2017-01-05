import React from 'react';
import { Link } from 'react-router';
import * as content from '../../content/questions.json';

class Compass extends React.Component {
  constructor(props){
      super()
      this.constructQuestions = this.constructQuestions.bind(this);
      this.checkCorrectAnswer = this.checkCorrectAnswer.bind(this);

      this.state = {
        questions: content.questions
      }
  }


  checkCorrectAnswer(choice, question, index) {
    if(choice === question.answer){
      alert('correctomundo');
    } else {
      alert('incorrect');
    }

    const updatedQuestion = Object.assign(question, {completed: true });
    const updatedQuestions = this.state.questions.filter(q => !q.completed).map((q,i) => index === i ? updatedQuestion : q);
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
          <p>Completed? {q.completed.toString()}</p>

          {q.options.map((o,i)=>{
            return (
              <div key={i}>
                <button onClick={this.checkCorrectAnswer.bind(this, o, q, i)}>
                {o}
                </button>
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
