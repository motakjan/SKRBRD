import { Tooltip, UnstyledButton } from '@mantine/core';
import Link from 'next/link';
import type { NavbarLinkProps } from '../Layout.types';
import { useStyles } from './Navbar.styles';

export const NavbarLink: React.FC<NavbarLinkProps> = ({
  icon: Icon,
  label,
  active,
  href,
  fill,
  onClick,
}) => {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      {onClick ? (
        <UnstyledButton
          onClick={onClick}
          className={cx(classes.link, { [classes.active]: active })}
          c={fill}
        >
          <Icon size="1.2rem" stroke={1.5} />
        </UnstyledButton>
      ) : (
        <Link
          href={href as string}
          className={cx(classes.link, { [classes.active]: active })}
        >
          <Icon size="1.2rem" stroke={1.5} />
        </Link>
      )}
    </Tooltip>
  );
};
