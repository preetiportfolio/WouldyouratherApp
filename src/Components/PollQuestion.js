import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Header, Button, Form, Radio } from "semantic-ui-react";

export class PollQuestion extends Component {

  state = {
    value: "",
  };

  handleChange = (e, { value }) => this.setState({ value });

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.value !== "") {
      const { authUser, question, handleSaveQuestionAnswer } = this.props;
      handleSaveQuestionAnswer(authUser, question.id, this.state.value);
    }
  };

  render() {
    const { question } = this.props;
    const disabled = this.state.value === "" ? true : false;

    return (
      <Fragment>
        <Header as="h4">Would you rather</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <Radio
              label={question.optionOne.text}
              name="radioGroup"
              value="optionOne"
              checked={this.state.value === "optionOne"}
              onChange={this.handleChange}
            />
            <br />
            <Radio
              label={question.optionTwo.text}
              name="radioGroup"
              value="optionTwo"
              checked={this.state.value === "optionTwo"}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Button
              color="teal"
              size="tiny"
              fluid
              positive
              disabled={disabled}
              content="Submit"
            />
          </Form.Field>
        </Form>
      </Fragment>
    );
  }
}

function mapStateToProps({ authUser }, { match }) {


  return {
    authUser,
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    handleSaveQuestionAnswer: (authUser, qid, answer) =>
      dispatch({
        type: "handleSaveQuestionAnswer",
        authUser: authUser,
        qid: qid,
        answer: answer,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PollQuestion);
