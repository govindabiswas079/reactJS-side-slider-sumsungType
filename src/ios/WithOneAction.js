import React from 'react';
import { LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions, Type as ListType, } from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';

import { ActionContent, Avatar, ItemColumn, ItemColumnCentered, ItemContent, ItemInfoLine, ItemNameLine, ItemRow, } from '../styledComponents';
import { colors } from '../data.js';
import { DeleteIcon } from '../images/icons';

import './WithOneAction.css';

const WithOneAction = ({ people, fullSwipe, setStatus, setPeople, threshold, setThreshold, setSwipeAction, setSwipeProgress, setTriggeredItemAction, }) => {
  React.useEffect(() => {
    setThreshold(0.5);
  }, [setThreshold]);

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

  const leadingActions = ({ id }) => (
    <LeadingActions>
      <SwipeAction onClick={handleAccept(id)}>
        <div className='ActionContent' style={{ backgroundColor: colors.accepted }}>
          Accept
        </div>
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = ({ id }) => (
    <TrailingActions>
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
        threshold={threshold}
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
                  <span className='ItemInfoLine'>
                    {info}{' '}
                    <span
                      style={{
                        backgroundColor: colors[status] || 'transparent',
                      }}
                    >
                      ({status})
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </SwipeableListItem>
        ))}
      </SwipeableList>
    </div>
  );
};

export default WithOneAction;
