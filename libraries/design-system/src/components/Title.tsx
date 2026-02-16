import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../utils/cn'

const titleVariants = cva('font-bold tracking-tight text-white', {
  variants: {
    size: {
      h1: 'text-4xl md:text-5xl',
      h2: 'text-3xl md:text-4xl',
      h3: 'text-2xl md:text-3xl',
      h4: 'text-xl md:text-2xl',
    },
  },
  defaultVariants: {
    size: 'h1',
  },
})

export interface TitleProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof titleVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4'
}

const Title = React.forwardRef<HTMLHeadingElement, TitleProps>(
  ({ className, size, as, children, ...props }, ref) => {
    const Component = as || size || 'h1'
    return (
      <Component
        className={cn(titleVariants({ size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Component>
    )
  }
)
Title.displayName = 'Title'

export { Title, titleVariants }
