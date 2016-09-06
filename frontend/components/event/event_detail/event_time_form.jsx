import React from 'react';
import { fill } from 'lodash';

class EventTimeForm extends React.Component {
  constructor(props) {
    super(props);
    let timeForm = {};
    this.getAllDates().forEach(date => {
      timeForm[date] = fill(Array(24), 0);
    });
    this.state = {
      timeForm
    };
  }

  handleClick(date, hour) {
    const toggleValue = this.state.timeForm[date][hour] ? 0 : 1;
    const dateCol = [...this.state.timeForm[date]];
    dateCol[hour] = toggleValue;
    const timeForm = Object.assign({},
                                   this.state.timeForm,
                                   { [date]: dateCol }
                                   );
    this.setState({ timeForm });
  }

  dateEqual(date, otherDate) {
    return date.getFullYear() === otherDate.getFullYear() &&
      date.getMonth() === otherDate.getMonth() &&
      date.getDate() === otherDate.getDate();
  }

  formatDate(date) {
    return `${ date.getMonth() }/${ date.getDate() }`;
  }

  getAllDates() {
    let date = new Date(this.props.eventData.start_date);
    let endDate = new Date(this.props.eventData.end_date);
    date.setTime(date.getTime() + date.getTimezoneOffset()*60*1000);
    let allDates = [];
    while (!this.dateEqual(date, endDate)) {
      allDates.push(this.formatDate(date));
      date.setDate(date.getDate() + 1);
    }
    return allDates;
  }

  render() {
    let date = new Date(this.props.eventData.start_date);
    let endDate = new Date(this.props.eventData.end_date);
    date.setTime(date.getTime() + date.getTimezoneOffset()*60*1000);

    let dateCols = [];
    while (!this.dateEqual(date, endDate)) {
      let dateCol = [<div className='date-time'>
                      { this.formatDate(date) }
                    </div>];
      for (let i = 0; i < 24; i++) {
        const selectedClass = this.state.timeForm[this.formatDate(date)][i] ?
                              'selected' :
                              '';

        dateCol.push(
          <div key={ `${this.formatDate(date)}-${i}` }
               className={ `date-time ${ selectedClass }` }
               onClick={
                 this.handleClick.bind(this, this.formatDate(date), i)
               }>
          </div>);
      }
      dateCols.push(
        <div key={ this.formatDate(date) } className='date-col'>
          { dateCol }
        </div>
      );
      date.setDate(date.getDate() + 1);
    }

    let hourCol = [<div className='date-time'></div>];
    for (let i = 0; i < 24; i++) {
      hourCol.push(<div key={ `hour-${i}` } className='date-time'>
                    { `${i}:00` }
                  </div>);
    }

    return (
      <div className='date-table'>
        <div className='date-col'>{ hourCol }</div>
        { dateCols }
      </div>
    );
  }
}

export default EventTimeForm;
