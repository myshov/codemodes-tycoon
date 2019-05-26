/*
 * Replace method sortBy by method orderBy for lodash 5
 */
export default (fileInfo, api) => {
    const j = api.jscodeshift;
    const root = j(fileInfo.source);

    const importDeclarations = root.find(j.ImportDeclaration, {
        source: {
            type: 'Literal',
            value: 'lodash',
        },
    });

    const oldMethodName = 'sortBy';
    const newMethodName = 'orderBy';

    if (importDeclarations.size() === 0) {
        return null;
    };

    const localNameSpace = importDeclarations
        .find(j.Identifier)
        .get(0)
        .node.name;

    function isLodashChain(node) {
        while (
            node.type !== 'Identifier' &&
            node.object.type === 'CallExpression'
        ) {
            node = node.object.callee;
        }

        let name = node.name || node.object.name;
        return name === localNameSpace;
    }

    return root
        .find(j.MemberExpression, {
            property: {
                name: oldMethodName,
            },
        })
        .replaceWith(nodePath => {
            const {node} = nodePath;
            if (isLodashChain(node)) {
                node.property.name = newMethodName;
                return node;
            }
            return node;
        })
        .toSource();
};
