/*
 * EXPERIMENTAL
 * transformation of react functional components
 * to vue functional components (with jsx)
 */
export default function(fileInfo, api) {
  const j = api.jscodeshift;
  const doc = j(fileInfo.source);

  function getClosestFunctionDeclaration(path) {
    return j(path).closest(j.FunctionDeclaration);
  }

  function isJSXInReturn(path) {
    const JSXElements = j(path)
      .find(j.ReturnStatement)
      .findJSXElements();
    return JSXElements.length > 0;
  }

  function isJSXInArrowBody(path) {
    const { type } = path.node.body;
    return type === 'JSXElement';
  }

  function replaceProps(path, type) {
    if (!isJSXInReturn(path) && !isJSXInArrowBody(path)) {
      return path;
    }

    let collection;
    if (type === 'FunctionDeclaration') {
      collection = j(path).find(j.FunctionDeclaration);
    }
    if (type === 'ArrowFunctionExpression') {
      collection = j(path);
    }

    let parameter = collection.get(0).node.params[0];
    let parameterNames = [];
    if (parameter) {
      if (parameter.type === 'ObjectPattern') {
        parameterNames = parameter.properties.map(p => p.value.name);
      }
    }

    collection.forEach(path => {
      // if there is no parameters
      if (!path.value.params[0]) {
        return path;
      }
      const type = path.value.params[0].type;
      // when parameter is indentifier, then already
      // everything is fine, we need just to change signature
      if (type === 'Identifier') {
        const name = path.value.params[0].name;
        path.value.params[0] = '{' + name + '}';
      }
      // when parameter is destructuring, then we
      // need to update jsx
      if (type === 'ObjectPattern') {
        path.value.params[0] = '{props}';
        j(path)
          .find(j.JSXExpressionContainer)
          .forEach(path => {
            return j(path)
              .find(j.Identifier)
              .forEach(path => {
                const name = path.node.name;
                if (parameterNames.includes(name)) {
                  path.node.name = 'props.' + name;
                }
                return path;
              });
          });
      }
    });

    return path;
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

  // regular functions
  doc
    .find(j.ExportNamedDeclaration, {
      declaration: {
        type: 'FunctionDeclaration',
      },
    })
    .forEach(path => replaceProps(path, 'FunctionDeclaration'));

  doc
    .find(j.ExportDefaultDeclaration, {
      declaration: {
        type: 'FunctionDeclaration',
      },
    })
    .forEach(path => replaceProps(path, 'FunctionDeclaration'));

  // arrow functions
  doc.find(j.ExportNamedDeclaration).forEach(path =>
    j(path)
      .find(j.ArrowFunctionExpression)
      .forEach(path => replaceProps(path, 'ArrowFunctionExpression'))
  );

  doc.find(j.ExportDefaultDeclaration).forEach(path =>
    j(path)
      .find(j.ArrowFunctionExpression)
      .forEach(path => replaceProps(path, 'ArrowFunctionExpression'))
  );

  return '<script>\n' + doc.toSource() + '\n</script>';
}
