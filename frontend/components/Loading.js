import React from 'react';

export const Loading = props => {
  let cssClasses = 'loader ';
  if (props.center) cssClasses += 'uk-position-center';
  return (
    <div className={cssClasses}>
      <span className="svg-spinner" uk-spinner="ratio: 4.5"></span>
    </div>
  );
};

export default Loading;
