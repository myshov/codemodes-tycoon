import _ from 'lodash';

const arr = [-2, -1, 1, 2, 3];
const r = _.sortBy();
// l.sortBy must not change
const r2 = l.sortBy(() => _.sortBy());
_.find(null).sortBy(null).test();
_.sortBy(null).all(null).test();
_.test(null).all(null).sortBy();
_.sortBy();
_([1,2,3]).filter(i => i % 2 === 0).sortBy()
_([1,2,3]).sortBy()

