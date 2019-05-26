/*
 * change signature of method this.createPageObject
 */
export default (fileInfo, api) => {
    const j = api.jscodeshift;
    const root = j(fileInfo.source);

    function buildProperty(name, value) {
        return j.property(
            'init',
            j.identifier(name),
            (typeof value === 'string') ? j.literal(value) : value,
        )
    }

    function isThisBrowser(node) {
        return node.object &&
            node.object.type === 'ThisExpression' &&
            node.property.name === 'browser';
    }

    return root
        .find(j.CallExpression, {
            callee: {
                type: 'MemberExpression',
                object: {
                    type: 'ThisExpression',
                },
                property: {
                    name: 'createPageObject',
                },
            }
        })
        .replaceWith(nodePath => {
            const {node} = nodePath;
            const {arguments: args} = node;

            // one argument
            if (args.length === 1) {
                return node;
            }

            // two arguments
            if (args.length === 2) {
                if (isThisBrowser(args[1])) {
                    node.arguments = [args[0]];
                    return node;
                }

                args[1] = j.objectExpression([
                    buildProperty('parent', args[1])
                ]);

                return node;
            }

            // three arguments
            if (isThisBrowser(args[1])) {
                args[1] = j.objectExpression([
                    buildProperty('root', args[2])
                ]);
                node.arguments = [args[0], args[1]];
                return node;
            }

            node.arguments = [
                args[0],
                j.objectExpression([
                    buildProperty('parent', args[1]),
                    buildProperty('root', args[2])
                ]),
            ];

            return node;
        })
        .toSource({quote: 'single', trailingComma: true});
};
