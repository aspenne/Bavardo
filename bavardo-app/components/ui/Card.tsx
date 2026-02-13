import { View, ViewProps } from 'react-native';

type CardProps = {
  children: React.ReactNode;
} & ViewProps;

export const Card = ({ children, className, ...props }: CardProps) => {
  return (
    <View className={`rounded-lg bg-white p-lg shadow-md ${className || ''}`} {...props}>
      {children}
    </View>
  );
};
