import React, { Component } from "react";
import { connect } from "react-redux";
import { readEvents } from "../actions";
import _ from "lodash"; //配列を整理する
import { Link } from "react-router-dom";

class EventsIndex extends Component {
  componentDidMount() {
    //mount後にやりたい処理
    this.props.readEvents();
  }

  renderEvents() {
    return _.map(this.props.events, (event) => (
      <tr key={event.id}>
        <td>{event.id}</td>
        <td>{event.title}</td>
        <td>{event.body}</td>
      </tr>
    ));
  }

  render() {
    return (
      <>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Body</th>
            </tr>
          </thead>
          <tbody>{this.renderEvents()}</tbody>
        </table>

        <Link to="/events/new">New Event</Link>
      </>
    );
  }
}

const mapStateToProps = (state) => ({ events: state.events });
const mapDispatchToProps = { readEvents };

export default connect(mapStateToProps, mapDispatchToProps)(EventsIndex);
