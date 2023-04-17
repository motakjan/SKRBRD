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
      color={disabled ? 'gray.3' : 'indigo.5'}
      sx={{
        cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        '&:hover': !disabled && {
          color: 'indigo.6',
        },
      }}
      onClick={!disabled ? onClick : undefined}
    >
      {icon}
    </Text>
  );
};
