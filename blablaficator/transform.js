/*
 * replace all identifiers to 'bla'
 */
export default function transformer(file, api) {
  const j = api.jscodeshift;

  return j(file.source)
    .find(j.Identifier)
    .replaceWith(
      j.identifier('bla')
    )
    .toSource();
}
