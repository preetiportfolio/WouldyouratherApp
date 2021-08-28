import React  from "react";
import { connect } from "react-redux";
import { Divider, Tab } from "semantic-ui-react";
import UserCard from "./UserCard";

const panes = (props) => {
  const { userQuestionData } = props;
  return [
    {
      menuItem: "Unanswered Polls",
      render: () => (
        <Tab.Pane >
          {userQuestionData &&
            userQuestionData.answered.map((question) => (
              <UserCard
                key={question.id}
                question_id={question.id}
                unanswered={true}
                style={{color:"red"}}

              />
            ))}
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Answered Polls",
      render: () => (
        <Tab.Pane>
          {userQuestionData &&
            userQuestionData.unanswered.map((question) => (
              <UserCard
                key={question.id}
                question_id={question.id}
                unanswered={false}
              />
            ))}
        </Tab.Pane>
      ),
    },
  ];
};

const Home = (props) => {
  const { userQuestionData } = props;
  return (
    <div style={{ margin: "1% 17%" }}>
      <Divider hidden />
      <Tab panes={panes({ userQuestionData })} className="tab" menu={{backgroundColor:"#e0e1e2"}}/>
    </div>
  );
};

const mapStateToProps = ({ authUser, questions, users }) => {
  const answeredIds = Object.keys(users[authUser].answers);
  const answered = Object.values(questions)
    .filter((question) => !answeredIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);
  const unanswered = Object.values(questions)
    .filter((question) => answeredIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);
  return {
    userQuestionData: {
      answered,
      unanswered,
    },
  };
};

export default connect(mapStateToProps)(Home);
