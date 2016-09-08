import React from 'react';
import Select from 'react-select';

class SpecificFriendsCondition extends React.Component {
  constructor(props) {
    super(props);
    let friendsInput = [];
    if (this.props.friendConditions) {
      friendsInput = this.props.friendConditions.map(cond => {
        return {
          value: cond.friend_user_id,
          label: cond.username,
          id: cond.id
        };
      });
    }

    this.state = {
      errors: '',
      friendConditions: [],
      friendsInput
    };
  }

  getFriendsInputDict() {
    const friendsInputDict = {};
    this.state.friendsInput.forEach(input => {
      friendsInputDict[input.id] = input;
    });
  }

  componentWillReceiveProps(nextProps) {
    let friendsInput = [];
    if (nextProps.friendConditions) {
      friendsInput = nextProps.friendConditions.map(cond => {
        return {
          value: cond.friend_user_id,
          label: cond.username,
          id: cond.id
        };
      });
    }

    this.setState({ friendsInput });
  }

  setConditions() {
    const deleteFriendConditionsAttributes =
      this.props.friendConditions.map(cond => {
        return {
          id: cond.id,
          _destroy: true
        };
      });

    const deleteCondition = {
      friend_conditions_attributes: deleteFriendConditionsAttributes
    };

    let addFriendConditionsAttributes;
    if (this.state.friendsInput) {
      addFriendConditionsAttributes = this.state.friendsInput.map(input => {
        return {
          friend_user_id: input.value
        };
      });
    }

    const addCondition = {
      friend_conditions_attributes: addFriendConditionsAttributes
    };

    console.log('condition', this.props.condition);
    console.log('friendConditions', this.props.friendConditions);
    console.log('friendsInput', this.state.friendsInput);
    if (this.props.condition.event_response_id === this.props.eventResponseId) {
      if (this.props.friendConditions.length >= 1) {
        this.props.updateCondition(this.props.eventResponseId, deleteCondition);
      }

      // TODO: ASK TA TOMORROW HOW TO FIX THIS
      if (this.state.friendsInput && this.state.friendsInput.length >= 1) {
        let addConditionCb = () => {
          this.props.updateCondition(this.props.eventResponseId, addCondition);
        };
        window.setTimeout(addConditionCb, 300);
      }
    } else {
      this.props.createCondition(this.props.eventResponseId, addCondition);
    }
  }

  addFriends(val) {
    this.setState({ friendsInput: val });
  }

  render() {
    return (
      <div>
        Friends going:
        <Select
            multi={ true }
            value={ this.state.friendsInput }
            options={ this.props.members }
            onChange={ this.addFriends.bind(this) }
            onBlur={ this.setConditions.bind(this) }
        />
      </div>
    );
  }
}

export default SpecificFriendsCondition;
