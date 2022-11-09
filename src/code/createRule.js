const { ESLintUtils } = require('@typescript-eslint/utils');

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://dev-docs.woovi.com/docs/category/eslint/rules/eslint-${name}-rule`
);

module.exports.createRule = createRule;
