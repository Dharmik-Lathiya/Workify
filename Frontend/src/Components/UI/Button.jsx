import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

const Button = React.forwardRef(({ className, variant = 'default', size = 'default', asChild = false, children, ...props }, ref) => {
  const variants = {
    default: 'bg-green-600 text-white hover:bg-green-700 shadow-sm',
    destructive: 'bg-red-500 text-white hover:bg-red-600 shadow-sm',
    outline: 'border border-gray-300 bg-transparent hover:bg-gray-100 text-gray-900',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
    ghost: 'hover:bg-gray-100 hover:text-gray-900',
    link: 'text-green-600 underline-offset-4 hover:underline',
  };

  const sizes = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 rounded-md px-3 text-sm',
    lg: 'h-11 rounded-md px-8 text-lg',
    icon: 'h-10 w-10',
  };

  const Comp = motion.button;

  return (
    <Comp
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizes[size],
        className
      )}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </Comp>
  );
});

Button.displayName = 'Button';

export { Button };
