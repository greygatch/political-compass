import React from 'react';
import { Link } from 'react-router';
import * as content from '../../content/questions.json';

class Compass extends React.Component {
  constructor(props){
      super()
      this.constructQuestions = this.constructQuestions.bind(this);

      this.state = {
        questions: content.questions
      }
  }

  constructQuestions(questions) {
    return questions.map((q, i) => {
      return (
        <div className="question-block" key={i}>
          <h3>{q.title}</h3>
          {q.completed.toString()}
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
