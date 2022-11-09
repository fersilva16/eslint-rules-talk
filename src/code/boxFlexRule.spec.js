const { ESLintUtils } = require('@typescript-eslint/utils');

const boxFlexRule = require('../boxFlexRule');

const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
});

ruleTester.run('box-flex', boxFlexRule, {
  valid: [
    `
      import { BoxFlex } from '@woovi/ui';

      const Component = () => {
        return (
          <BoxFlex>
            <Typography>something</Typography>
          </BoxFlex>
        );
      }
    `,
    `
      import { BoxFlex } from '@woovi/ui';

      const Component = () => {
        return (
          <BoxFlex sx={{ marginTop: '16px', marginBottom: '20px', padding: '8px' }}>
            <Typography>something</Typography>
          </BoxFlex>
        );
      };
    `,
    `
      import { Text } from 'rebass';
      import { BoxFlex } from '@woovi/ui';

      const Component = () => {
        return (
          <BoxFlex sx={{ marginTop: '16px', marginBottom: '20px', padding: '8px' }}>
            <Typography>something</Typography>
          </BoxFlex>
        );
      };
    `,
  ],
  invalid: [
    {
      code: `
        import { Flex } from 'rebass';

        const Component = () => {
          return (
            <Flex>
              <Typography>something</Typography>
            </Flex>
          );
        }
      `,
      output: `
        import { BoxFlex } from '@woovi/ui';


        const Component = () => {
          return (
            <BoxFlex>
              <Typography>something</Typography>
            </BoxFlex>
          );
        }
      `,
      errors: [{ message: 'Prefer <BoxFlex />' }],
    },
    {
      code: `
        const Component = () => {
          return (
            <Flex>
              <Typography>something</Typography>
            </Flex>
          );
        }
      `,
      output: `
        import { BoxFlex } from '@woovi/ui';
const Component = () => {
          return (
            <BoxFlex>
              <Typography>something</Typography>
            </BoxFlex>
          );
        }
      `,
      errors: [{ message: 'Prefer <BoxFlex />' }],
    },
    {
      code: `
        import { Text, Flex } from 'rebass';

        const Component = () => {
          return (
            <Flex>
              <Text>something</Text>
            </Flex>
          );
        }
      `,
      output: `
        import { BoxFlex } from '@woovi/ui';
import { Text,  } from 'rebass';

        const Component = () => {
          return (
            <BoxFlex>
              <Text>something</Text>
            </BoxFlex>
          );
        }
      `,
      errors: [{ message: 'Prefer <BoxFlex />' }],
    },
    {
      code: `
        import { Flex } from 'rebass';

        const Component = () => {
          return (
            <Flex marginTop='16px' marginBottom='20px' padding='8px'>
              <Typography>something</Typography>
            </Flex>
          );
        }
      `,
      output: `
        import { BoxFlex } from '@woovi/ui';


        const Component = () => {
          return (
            <BoxFlex sx={{ marginTop: '16px', marginBottom: '20px', padding: '8px' }}>
              <Typography>something</Typography>
            </BoxFlex>
          );
        }
      `,
      errors: [{ message: 'Prefer <BoxFlex />' }],
    },
    {
      code: `
        import { Flex } from 'rebass';

        const Component = () => {
          return (
            <Flex marginTop={'16px'} marginBottom={'20px'} padding={'8px'}>
              <Typography>something</Typography>
            </Flex>
          );
        }
      `,
      output: `
        import { BoxFlex } from '@woovi/ui';


        const Component = () => {
          return (
            <BoxFlex sx={{ marginTop: '16px', marginBottom: '20px', padding: '8px' }}>
              <Typography>something</Typography>
            </BoxFlex>
          );
        }
      `,
      errors: [{ message: 'Prefer <BoxFlex />' }],
    },
    {
      code: `
        import { Flex } from 'rebass';

        const Component = () => {
          return (
            <Flex marginTop={'16px'} marginBottom={'20px'} padding={'8px'} {...props}>
              <Typography>something</Typography>
            </Flex>
          );
        }
      `,
      output: `
        import { BoxFlex } from '@woovi/ui';


        const Component = () => {
          return (
            <BoxFlex sx={{ marginTop: '16px', marginBottom: '20px', padding: '8px', ...props }}>
              <Typography>something</Typography>
            </BoxFlex>
          );
        }
      `,
      errors: [{ message: 'Prefer <BoxFlex />' }],
    },
  ],
});
