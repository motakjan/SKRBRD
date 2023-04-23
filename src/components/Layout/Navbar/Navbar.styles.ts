import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles(theme => ({
  link: {
    width: rem(30),
    marginBottom: rem(15),
    height: rem(30),
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[6],

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  active: {
    '&, &:hover': {
      backgroundColor: theme.fn.rgba(theme.colors.yellow[5], 0.2),
      color: theme.colors.yellow[8],
    },
  },
}));
