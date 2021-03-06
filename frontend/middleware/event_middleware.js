import { hashHistory } from 'react-router';
import { EventConstants, EventActions } from '../actions/event_actions';
import { fetchEvents, fetchSingleEvent, createEvent, updateEvent, deleteEvent,
         closeResponsePoll, closeTimePoll }
  from '../util/event_api_util';

const EventMiddleware = ({ dispatch }) => next => action => {
  const receiveSingleEvent = eventData =>
    dispatch(EventActions.receiveSingleEvent(eventData));
  const receiveEvents = events =>
    dispatch(EventActions.receiveEvents(events));
  const errorCb = xhr => {
    dispatch(EventActions.receiveEventErrors(xhr.responseJSON));
  };

  switch(action.type) {
    case EventConstants.FETCH_EVENTS:
      fetchEvents(receiveEvents, errorCb);
      return next(action);
    case EventConstants.FETCH_SINGLE_EVENT:
      fetchSingleEvent(action.eventId, receiveSingleEvent, errorCb);
      return next(action);
    case EventConstants.CREATE_EVENT:
      const successCb = eventData => {
        hashHistory.push(`/events/${ eventData.id }`);
      };
      createEvent(action.eventData,
                  successCb,
                  errorCb
                 );
      return next(action);
    case EventConstants.CLOSE_RESPONSE_POLL:
      closeResponsePoll(action.eventId, receiveSingleEvent, errorCb);
      return next(action);
    case EventConstants.CLOSE_TIME_POLL:
      closeTimePoll(action.eventId, receiveSingleEvent, errorCb);
      return next(action);
    default:
      return next(action);
  }
};

export default EventMiddleware;
