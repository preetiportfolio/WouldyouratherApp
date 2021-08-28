import { useState } from "react";
import { connect } from "react-redux";
import { Container, Form } from "semantic-ui-react";
const Login = (props) => {
  const [value, onChange] = useState(null);
  const generateData = () => {
    const { users } = props;

    return users.map((user) => ({
      key: user.id,
      text: user.name,
      value: user.id,
      image: { avatar: true, src: user.avatarURL },
    }));
  };
  const handleSubmit = () => {
    props.setAuthUser(value);
  };
  return (
<Container text>     
 <h1 style={{color:"black"}}>Select your profile Name</h1>

      <Form onSubmit={() => handleSubmit()}>
      <div style={{margin:"5% 20%"}}>

        <Form.Dropdown
          placeholder="Who is playing"
          fluid
          selection
          scrolling
          options={generateData()}
          value={value}
          onChange={(e, { value }) => onChange(value)}
          required
        />
        </div>
        <div style={{margin:"5% 30%"}}>

        <Form.Button content="Login" style={{backgroundColor:"teal",color:"white"}} positive fluid />

        </div>
      </Form>
    </Container>
  );
};
const mapStateToProps = (state) => {
  return {
    users: Object.values(state.users),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setAuthUser: (data) => dispatch({ type: "SET_AUTH_USER", id: data }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
