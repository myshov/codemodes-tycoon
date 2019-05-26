import React from 'react';

export default ({ name }) => {
  const greeting = 'Hi';
  return (
    <div>
      {greeting}, {name}
    </div>
  );
};
