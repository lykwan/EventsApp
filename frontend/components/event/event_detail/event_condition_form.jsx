import React from 'react';
import NumPeopleCondition from './condition/num_people_condition';
import SpecificFriendsCondition from './condition/specific_friends_condition';

class EventConditionForm extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchCondition(this.props.eventResponseId);
    this.props.fetchUsers();
  }

  render() {
    let minNumPeople, friendConditions = [];
    if (this.props.condition) {
      minNumPeople = this.props.condition.min_num_people;
      friendConditions = this.props.condition.friend_conditions;
    }

    const friendConditionsDict = {};
    friendConditions.map(cond => {
      friendConditionsDict[cond.id] = cond;
    });

    console.log(friendConditions);

    return (
      <div className='event-condition-form'>
        <NumPeopleCondition minNumPeople={ minNumPeople }
                            eventResponseId={ this.props.eventResponseId }
                            createCondition={ this.props.createCondition }
                            updateCondition={ this.props.updateCondition }
                            />
        <SpecificFriendsCondition friendConditions={ friendConditions }
                                  eventResponseId={ this.props.eventResponseId }
                                  createCondition={ this.props.createCondition }
                                  updateCondition={ this.props.updateCondition }
                                  users={ this.props.users }
                                  />
      </div>
    );
  }
}

export default EventConditionForm;