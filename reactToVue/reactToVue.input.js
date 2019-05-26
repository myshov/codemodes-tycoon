// vim: ai ts=2 sts=2 et sw=2
import React from 'react';

export const component1 = props => {
  return <div>Hi {props.name}</div>;
};

export const component2 = props => <div>Hi {props.name}</div>;

export const component3 = ({ name }) => {
  return <div>Hi {name}</div>;
};

export function component4({ someProp }) {
  const greeting = 'Hi';
  return (
    <a>
      <div>
        {greeting} {someProp}
      </div>
    </a>
  );
}

export function component5(props) {
  const greeting = 'Hi';
  return (
    <a>
      <div>
        {greeting} {props.someProp}
      </div>
    </a>
  );
}

export function component6(otherParamForProps) {
  const greeting = 'Hi';
  return (
    <a>
      <div>
        {greeting} {otherParamForProps.someProp}
      </div>
    </a>
  );
}

export default function component7({ prop }) {
  const greeting = 'Hi';
  return (
    <a>
      <div>
        {greeting} {prop}
      </div>
    </a>
  );
}

// only one default export is permitted in jscodeshift
// for testing use below one and comment out former
//export default function (props) {
//const greeting = 'Hi';
//return <a><div>{greeting} {props.someProp}</div></a>
//}

// only one default export is permitted in jscodeshift
// for testing use below one and comment out former
//export default ({name}) => (
//<div>Hi {name}</div>
//);
