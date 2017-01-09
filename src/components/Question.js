import React from 'react';

class Question extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const question = this.props.question;
    const QuestionOptions = this.props.question.options.map((option, i) => {
      return (
        <div key={i}>
          <button onClick={() => this.props.computeChoice(option, question)}>{option}</button>
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
}

Question.propTypes = { children: React.PropTypes.object };

export default Question;
