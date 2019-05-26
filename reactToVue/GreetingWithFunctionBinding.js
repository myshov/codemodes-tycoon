// vim: ai ts=2 sts=2 et sw=2
import React from 'react';

function Greeting({name}) {
  const phrase = 'Hi';
  return (
    <div>
      {phrase}, {name}
    </div>
  );
};

export default Greeting;
