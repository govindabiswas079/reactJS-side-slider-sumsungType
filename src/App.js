import React from 'react';
import AndroidExample from './android/WithOneAction';
import IosWithOneActionExample from './ios/WithOneAction';
import IosWithTwoActionsExample from './ios/WithTwoActions';
import WithOneActionsExample from './ios/WithOneAction';
import { people as data } from './data';

import Aos from "aos";
import "aos/dist/aos.css"

const Example = {
  IOS1ACTION: 'IOS1ACTION',
  IOS2ACTIONS: 'IOS2ACTIONS',
  ANDROID: 'ANDROID',
  MS: 'MS',
  SIZE_TO_CONTENT: 'SIZE_TO_CONTENT',
  PROGRAMMATICALLY: 'PROGRAMMATICALLY',
};



const App = () => {
  const [people, setPeople] = React.useState(data);
  const [fullSwipe, setFullSwipe] = React.useState(false);
  const [threshold, setThreshold] = React.useState(0.5);
  const [swipeProgress, setSwipeProgress] = React.useState(0);
  const [swipeAction, setSwipeAction] = React.useState();
  const [triggeredItemAction, setTriggeredItemAction] = React.useState('None');
  const [selectedExample, setSelectedExample] = React.useState(
    Example.IOS1ACTION
  );

  const setStatus = (id, status) => {
    setPeople(
      people.map(person => (person.id === id ? { ...person, status } : person))
    );
  };

  const renderExample = () => {
    const props = {
      fullSwipe,
      people,
      setPeople,
      setStatus,
      threshold,
      setThreshold,
      setSwipeProgress,
      setSwipeAction,
      setTriggeredItemAction,
    };

    return <AndroidExample {...props} />;
    // return <IosWithOneActionExample {...props} />;
    // return <IosWithTwoActionsExample {...props} />;
    // return <WithOneActionsExample {...props} />;

  };

  React.useEffect(() => {
    Aos.init({duration:1200});
    
  },[])

  return (
    <div className="page-content">
      {renderExample()}
    </div>
  );
};

export default App;
