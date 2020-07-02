/*
A resuable component wrapper. Wrap any component with this and, in place of the wrapped component,
it will render a placeholder component (passed via props) when a condition (also passed via props)
is not met.

condition: true or false determines whether component or placeholder is rendered
placeholder: component to render in place of wrapped component
multiplier: number of placeholder components to render
initialDelay: standard amount of time to render placeholder regardless of condition // in ms
checkOnce: true or false used when wrapping data that you don't need to load more than once
children: Wrapped component (whatever is between Suspend tag)
*/

import React, { Fragment, useEffect, useState } from 'react';

const Suspend = ({
  condition,
  placeholder: Placeholder,
  multiplier,
  initialDelay,
  checkOnce,
  children,
}) => {
  const [component, setComponent] = useState([<Placeholder />]);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    // skips the rest if this component wraps data that needs only load once
    if (checkOnce && isChecked) {
      setComponent([children]);
      return;
    }

    // Stabalize initial render of placeholder...so it's not instant and jerky on render
    // change btwn placeholder and component
    const delay = initialDelay || 0;
    let delayedTimeout = null;
    if (condition) {
      if (initialDelay) {
        delayedTimeout = setTimeout(() => {
          setComponent([children]);
        }, delay);
      } else {
        setComponent([children]);
      }
      setIsChecked(true); // half of the magic for data that needs only render once
    } else {
      const tempComponent = [];
      const placeholdersToRender = multiplier || 1;
      for (let i = 0; i < placeholdersToRender; i += 1) {
        tempComponent.push(<Placeholder key={i} />);
      }
      setComponent(tempComponent);
    }
    return () => {
      if (delayedTimeout) {
        clearTimeout(delayedTimeout);
      }
    };
  }, [condition, children]);

  return (
    <>
      {component.map((componentObj, ind) => (
        <Fragment key={ind}>{componentObj}</Fragment>
      ))}
    </>
  );
};

export default Suspend;
