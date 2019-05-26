/*
 * Delete all usage of console.
 * E.g. console.log, console.warn etc.
 */
export default (fileInfo, api) => {
  const j = api.jscodeshift;

  return j(fileInfo.source)
    .find(j.CallExpression, {
      callee: {
        type: 'MemberExpression',
        object: {
          type: 'Identifier',
          name: 'console',
        },
      },
    })
    .remove()
    .toSource();
};
