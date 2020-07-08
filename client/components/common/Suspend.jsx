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
import PropTypes from 'prop-types';

const Suspend = ({
  condition,
  placeholder: Placeholder,
  numberOfPlaceholdersToRender,
  initialDelay,
  checkOnce,
  children,
}) => {
  const [component, setComponent] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  // Computes Placeholder Array to render
  const createArayOfPlaceholderElements = () => {
    const placeholderArray = [];
    for (let i = 0; i < numberOfPlaceholdersToRender; i += 1) {
      placeholderArray.push(<Placeholder key={i} />);
    }
    return placeholderArray;
  };

  useEffect(() => {
    // skips the rest if this component wraps data that needs only load once
    if (checkOnce && isChecked) {
      setComponent([children]);
      return undefined;
    }

    let delayedTimeout = null;
    if (condition) {
      const tempComponent = createArayOfPlaceholderElements();
      setComponent(tempComponent);
    } else {
      // Stabalize initial render of placeholder...so it's not instant and jerky on render
      // change btwn placeholder and component
      if (initialDelay) {
        setComponent(createArayOfPlaceholderElements());
        delayedTimeout = setTimeout(() => {
          setComponent([children]);
        }, initialDelay);
      } else {
        setComponent([children]);
      }
      setIsChecked(true); // half of the magic for data that needs only render once
    }

    return () => {
      if (delayedTimeout) {
        clearTimeout(delayedTimeout);
      }
    };
  }, [condition, children]);

  return (
    <>
      {component.map((componentObj, ind) => {
        const key = `Suspended${ind}`;
        return <Fragment key={key}>{componentObj}</Fragment>;
      })}
    </>
  );
};

export default Suspend;

Suspend.defaultProps = {
  numberOfPlaceholdersToRender: 1,
  initialDelay: 0,
  checkOnce: false,
};

Suspend.propTypes = {
  condition: PropTypes.bool.isRequired,
  placeholder: PropTypes.elementType.isRequired,
  numberOfPlaceholdersToRender: PropTypes.number,
  initialDelay: PropTypes.number,
  checkOnce: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};
