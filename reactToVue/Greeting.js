// vim: ai ts=2 sts=2 et sw=2
import React from 'react';

export default ({ name }) => {
  const greeting = 'Hi';
  return (
    <div>
      {greeting}, {name}
    </div>
  );
};
