import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  Segment,
  Header,
  Grid,
  Divider,
  Form,
  Dimmer,
  Loader,
} from "semantic-ui-react";

export class NewPoll extends Component {
  static propTypes = {
    authUser: PropTypes.string.isRequired,
    handleSaveQuestion: PropTypes.func.isRequired,
  };
  state = {
    validSubmit: false,
    isLoading: false,
    option1: "",
    option2: "",
  };
  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { authUser, handleSaveQuestion } = this.props;
    const { option1, option2 } = this.state;

    new Promise((res, rej) => {
      this.setState({ isLoading: true });
      handleSaveQuestion(option1, option2, authUser);
      setTimeout(() => res("success"), 1000);
    }).then(() => {
      this.setState({
        option1: "",
        option2: "",
      });
      this.setState({ validSubmit: true });
    });
  };
  render() {
    const disabled = this.state.option1 === "" || this.state.option2 === "";

    if (this.state.validSubmit === true) {
      return <Redirect to="/" />;
    }
    return (
      <Segment basic>
        <Header as="h3" textAlign="center" block attached="top" style={{backgroundColor:"teal",margin:"1% 32%", color: "white"}}>
Add new question        </Header>
        <Grid padded>
          <Grid.Column>
            {this.state.isLoading && (
              <Dimmer active inverted>
                <Loader content="Updating" />
              </Dimmer>
            )}
            <p style={{fontSize: "14px"}}>
              <strong >Would you rather...</strong>
            </p>
            <Form size={'large'} onSubmit={this.handleSubmit}>
              <Form.Input style={{width: '50%'}}
                id="option1"
                label= "First Option"
                placeholder="Enter option one..."
                value={this.state.option1}
                onChange={this.handleChange}
                required
              />
              <Divider horizontal style={{width: "auto"}}> Or</Divider>
              <Form.Input style={{width: '50%'}}
                id="option2"
                label= "Second Option"
                placeholder="Enter option two..."
                value={this.state.option2}
                onChange={this.handleChange}
                required
              />
              <Form.Button color='teal'>
                Submit
              </Form.Button>
            </Form>
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}

function mapStateToProps({ authUser }) {
  return {
    authUser,
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    handleSaveQuestion: (optionOneText, optionTwoText, author) =>
      dispatch({
        type: "handleSaveQuestion",
        optionOneText: optionOneText,
        optionTwoText: optionTwoText,
        author: author,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPoll);
