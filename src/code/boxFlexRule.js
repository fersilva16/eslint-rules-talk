const { ESLintUtils, AST_NODE_TYPES } = require('@typescript-eslint/utils');

const { createRule } = require('../createRule');

const findRootNode = (node) => {
  if (node.parent !== null) {
    return findRootNode(node.parent);
  }

  return node;
};

module.exports = createRule({
  create: (context) => {
    let flexImport;
    let flexSpecifier;

    return {
      ImportDeclaration: (node) => {
        if (node.source.value !== 'rebass') {
          return;
        }

        const specifier = node.specifiers.find((specifier) => {
          if (specifier.type !== AST_NODE_TYPES.ImportSpecifier) {
            return false;
          }

          if (specifier.imported.name !== 'Flex') {
            return false;
          }

          return true;
        });

        if (!specifier) {
          return;
        }

        flexImport = node;
        flexSpecifier = specifier;
      },
      JSXElement: (node) => {
        if (node.openingElement.name.name !== 'Flex') {
          return;
        }

        if (node.closingElement && node.closingElement.name.name !== 'Flex') {
          return;
        }

        context.report({
          node,
          messageId: 'preferBoxFlex',
          *fix(fixer) {
            const attributes = node.openingElement.attributes.map(
              (attribute) => {
                if (attribute.type === AST_NODE_TYPES.JSXSpreadAttribute) {
                  return `...${attribute.argument.name}`;
                }

                const getValue = () => {
                  if (attribute.value.type === AST_NODE_TYPES.Literal) {
                    return attribute.value.raw;
                  }

                  return attribute.value.expression.raw;
                };

                return `${attribute.name.name}: ${getValue()}`;
              }
            );

            const sxProp = attributes.length
              ? ` sx={{ ${attributes.join(', ')} }}`
              : '';

            yield fixer.replaceText(node.openingElement, `<BoxFlex${sxProp}>`);

            if (node.closingElement) {
              yield fixer.replaceText(node.closingElement.name, 'BoxFlex');
            }

            if (flexImport && flexSpecifier) {
              yield fixer.remove(
                flexImport.specifiers.length > 1 ? flexSpecifier : flexImport
              );
            }

            const rootNode = findRootNode(node);

            yield fixer.insertTextBefore(
              rootNode,
              "import { BoxFlex } from '@woovi/ui';\n"
            );
          },
        });
      },
    };
  },
  name: 'box-flex',
  meta: {
    type: 'problem',
    fixable: 'code',
    docs: {
      description:
        'Rebass Flex is deprecated. Prefer to use BoxFlex from @woovi/ui',
      recommended: 'error',
    },
    messages: {
      preferBoxFlex: 'Prefer <BoxFlex />',
    },
    schema: [],
  },
  defaultOptions: [],
});
