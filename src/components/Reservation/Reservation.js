import React, { Component } from "react";
import "./Reservation.css";

class MiniFormik extends Component {
  state = {
    values: this.props.initialValues || {},
    touched: {},
    errors: {}
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.values);
  };

  handleChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    event.persist();

    this.setState(prevState => ({
      values: {
        ...prevState.values,
        [name]: value
      }
    }));
  };

  handleBlur = event => {
    const target = event.target;
    const name = target.name;
    event.persist();

    this.setState(prevState => ({
      values: {
        ...prevState.touched,
        [name]: true
      }
    }));
  };

  render() {
    return this.props.children({
      ...this.state,
      handleChange: this.handleChange,
      handleBlur: this.handleBlur,
      handleSubmit: this.handleSubmit
    });
  }
}

class Reservation extends React.Component {
  render() {
    return (
      <div className="ReservationBox">
        <MiniFormik
          initialValues={{ isGoing: true, numberOfGuests: 2 }}
          onSubmit={values => alert(JSON.stringify(values, null, 2))}
        >
          {props => {
            const {
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit
            } = props;
            return (
              <form onSubmit={handleSubmit}>
                <label>
                  Is going:
                  <input
                    name="isGoing"
                    type="checkbox"
                    checked={values.isGoing}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </label>
                <br />
                <label>
                  Number of guests:
                  <input
                    name="numberOfGuests"
                    type="number"
                    value={values.numberOfGuests}
                    onChange={handleChange}
                  />
                </label>
                <pre>{JSON.stringify(props, null, 2)}</pre>
              </form>
            );
          }}
        </MiniFormik>
      </div>
    );
  }
}

export default Reservation;
