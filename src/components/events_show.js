import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";

import { getEvent, deleteEvent, putEvent } from "../actions";

class EventsShow extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  componentDidMount() {
    //mount後にやりたい処理
    const { id } = this.props.match.params;
    if (id) this.props.getEvent(id);
  }

  renderField(field) {
    const {
      input,
      label,
      type,
      meta: { touched, error },
    } = field;

    return (
      <TextField
        hintText={label}
        floatingLabelText={label}
        type={type}
        errorText={touched && error}
        {...input}
        fullWidth={true}
      ></TextField>
    );
  }

  async onDeleteClick() {
    // console.log(this.props.match); //何が渡るか確認
    const { id } = this.props.match.params;
    await this.props.deleteEvent(id);
    this.props.history.push("/");
  }

  async onSubmit(values) {
    await this.props.putEvent(values);
    this.props.history.push("/");
  }

  render() {
    const { handleSubmit, pristine, submitting, invalid } = this.props; //pristine:何も入力されていない状態 submitting:submitされたらtrueになる
    const style = {
      margin: 12,
    };

    return (
      <>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <div>
            <Field
              label="Title"
              name="title"
              type="text"
              component={this.renderField}
            />
          </div>
          <div>
            <Field
              label="Body"
              name="body"
              type="text"
              component={this.renderField}
            />
          </div>
          <div>
            <RaisedButton
              label="Submit"
              type="submit"
              style={style}
              disabled={pristine || submitting || invalid} //何も入力されていない、またはsubmitボタンが押されたあと、invalidはdisabled
            ></RaisedButton>
            <RaisedButton
              label="Cancel"
              style={style}
              containerElement={<Link to="/" />}
            ></RaisedButton>
            <RaisedButton
              label="Delete"
              style={style}
              onClick={this.onDeleteClick}
              containerElement={<Link to="/" />}
            ></RaisedButton>
          </div>
        </form>
      </>
    );
  }
}

const validate = (values) => {
  const errors = {};
  if (!values.title) errors.title = "Titleを入力してください";
  if (!values.body) errors.body = "Bodyを入力してください";

  return errors;
};

const mapStateToProps = (state, ownProps) => {
  const event = state.events[ownProps.match.params.id];
  return { initialValues: event, event }; //eventが返り、eventを渡す
};

const mapDispatchToProps = { getEvent, deleteEvent, putEvent };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({ validate, form: "eventShowForm", enableReinitialize: true })(
    EventsShow
  )
);
//enableReinitialize: trueにすると、initialValueが変わるたびにフォームが初期化される（defaultはfalseになっている）
