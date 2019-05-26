// vim: ai ts=2 sts=2 et sw=2
/*
 * EXPERIMENTAL
 * simple transformation of react functional components
 * to vue functional components (with jsx)
 */
export default function(fileInfo, api) {
  const j = api.jscodeshift;
  const doc = j(fileInfo.source);

  function noJSXInReturn(path) {
    const JSXElements = j(path)
      .find(j.ReturnStatement)
      .findJSXElements();
    return JSXElements.length === 0;
  }

  function replaceProps(path) {
    if (noJSXInReturn(path)) {
      return path;
    }

    const collection = j(path);
    const parameter = collection.get(0).node.params[0];
    const parameterNames = parameter.properties.map(p => p.value.name);

    return collection.forEach(path => {
      path.value.params[0] = '{props}';
      j(path)
        .find(j.JSXExpressionContainer)
        .forEach(path =>
          j(path)
            .find(j.Identifier)
            .forEach(path => {
              const name = path.node.name;
              if (parameterNames.includes(name)) {
                path.node.name = 'props.' + name;
              }
              return path;
            })
        );
    });
  }

  // delete import of react
  doc
    .find(j.ImportDeclaration, {
      source: {
        type: 'Literal',
        value: 'react',
      },
    })
    .remove();

  doc.find(j.ExportDefaultDeclaration).forEach(path =>
    j(path)
      .find(j.ArrowFunctionExpression)
      .forEach(replaceProps)
  );

  return `<script>\n${doc.toSource()}</script>`;
}
