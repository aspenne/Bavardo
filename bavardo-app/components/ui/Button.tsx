import { forwardRef } from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

type ButtonProps = {
  title: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  size?: 'sm' | 'md' | 'lg';
} & TouchableOpacityProps;

export const Button = forwardRef<View, ButtonProps>(
  ({ title, variant = 'primary', size = 'md', ...touchableProps }, ref) => {
    const variantStyles = {
      primary: 'bg-primary',
      secondary: 'bg-secondary',
      accent: 'bg-accent',
      outline: 'bg-transparent border-2 border-primary',
    };

    const sizeStyles = {
      sm: 'px-md py-sm',
      md: 'px-lg py-md',
      lg: 'px-xl py-lg',
    };

    const textStyles = {
      primary: 'text-white',
      secondary: 'text-white',
      accent: 'text-white',
      outline: 'text-primary',
    };

    return (
      <TouchableOpacity
        ref={ref}
        {...touchableProps}
        className={`items-center rounded-md shadow-sm ${variantStyles[variant]} ${sizeStyles[size]} ${touchableProps.className || ''}`}>
        <Text className={`text-base font-semibold ${textStyles[variant]}`}>{title}</Text>
      </TouchableOpacity>
    );
  }
);

Button.displayName = 'Button';
