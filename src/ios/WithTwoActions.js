import React from 'react';
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
  Type as ListType,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';

import { colors } from '../data.js';
import { DeleteIcon } from '../images/icons';

import './WithTwoActions.css';

const WithTwoActions = ({
  people,
  fullSwipe,
  setStatus,
  setPeople,
  setSwipeAction,
  setSwipeProgress,
  setTriggeredItemAction,
}) => {
  const handleSwipeStart = () => {
    setSwipeAction('Swipe started');
    setTriggeredItemAction('None');
  };

  const handleSwipeEnd = () => {
    setSwipeAction('Swipe ended');
    setSwipeProgress();
  };

  const handleAccept = id => () => {
    console.log('[Handle ACCEPT]', id);
    setTriggeredItemAction(`[Handle ACCEPT] - ${id}`);
    setStatus(id, 'accepted');
  };

  const handleDelete = id => () => {
    console.log('[Handle DELETE]', id);
    setTriggeredItemAction(`[Handle DELETE] - ${id}`);
    setPeople(people.filter(person => person.id !== id));
  };

  const handleWaitlist = id => () => {
    console.log('[Handle WAITLIST]', id);
    setTriggeredItemAction(`[Handle WAITLIST] - ${id}`);
    setStatus(id, 'waitlist');
  };

  const handleReject = id => () => {
    console.log('[Handle REJECT]', id);
    setTriggeredItemAction(`[Handle REJECT] - ${id}`);
    setStatus(id, 'rejected');
  };

  const leadingActions = ({ id }) => (
    <LeadingActions>
      <SwipeAction onClick={handleAccept(id)}>
        <div className='ActionContent' style={{ backgroundColor: colors.accepted }}>
          Accept
        </div>
      </SwipeAction>
      <SwipeAction onClick={handleWaitlist(id)}>
        <div className='ActionContent' style={{ backgroundColor: colors.waitlist }}>
          Waitlist
        </div>
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = ({ id }) => (
    <TrailingActions>
      <SwipeAction onClick={handleReject(id)}>
        <div className='ActionContent' style={{ backgroundColor: colors.rejected }}>
          Reject
        </div>
      </SwipeAction>
      <SwipeAction destructive={true} onClick={handleDelete(id)}>
        <div className='ActionContent' style={{ backgroundColor: colors.deleted }}>
          <div className='ItemColumnCentered'>
            <span className="icon">
              <DeleteIcon />
            </span>
            Delete
          </div>
        </div>
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <div className="basic-swipeable-list__container">
      <SwipeableList
        fullSwipe={fullSwipe}
        style={{ backgroundColor: '#555878' }}
        type={ListType.IOS}
      >
        {people.map(({ avatar, id, name, info, status }) => (
          <SwipeableListItem
            key={id}
            leadingActions={leadingActions({ id })}
            trailingActions={trailingActions({ id })}
            onSwipeEnd={handleSwipeEnd}
            onSwipeProgress={setSwipeProgress}
            onSwipeStart={handleSwipeStart}
          >
            <div className='ItemContent'>
              <div className='ItemRow'>
                <img className='Avatar' alt="avatar" src={avatar} />
                <div className='ItemColumn'>
                  <span className='ItemNameLine'>{name}</span>
                  <div className='ItemInfoLine'>
                    {info}{' '}
                    <span
                      style={{
                        backgroundColor: colors[status] || 'transparent',
                      }}
                    >
                      ({status})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </SwipeableListItem>
        ))}
      </SwipeableList>
    </div>
  );
};

export default WithTwoActions;
