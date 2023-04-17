import { ActionIcon } from '@mantine/core';
import React from 'react';

type IconButtonProps = {
  icon: JSX.Element;
  onClick: () => void;
  active?: boolean;
};

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onClick,
  active,
}) => {
  return (
    <ActionIcon
      variant={active ? 'light' : 'subtle'}
      sx={theme => ({
        width: 30,
        marginBottom: 15,
        height: 30,
        borderRadius: theme.radius.md,
        '&.hover': {},
      })}
      onClick={onClick}
    >
      {icon}
    </ActionIcon>
  );
};
