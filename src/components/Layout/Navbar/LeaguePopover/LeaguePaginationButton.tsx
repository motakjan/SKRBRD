import { Text } from '@mantine/core';

type LeaguePaginationButtonProps = {
  disabled?: boolean;
  onClick: () => void;
  icon: React.ReactNode;
};

export const LeaguePaginationButton: React.FC<LeaguePaginationButtonProps> = ({
  disabled = false,
  onClick,
  icon,
}) => {
  return (
    <Text
      fz="xs"
      fw={700}
      color={disabled ? 'gray.3' : 'yellow.5'}
      sx={{
        cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        '&:hover': !disabled && {
          color: 'yellow.6',
        },
      }}
      onClick={!disabled ? onClick : undefined}
    >
      {icon}
    </Text>
  );
};
