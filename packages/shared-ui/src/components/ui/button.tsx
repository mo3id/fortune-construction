import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-full border border-transparent bg-clip-padding text-sm font-semibold whitespace-nowrap transition-all duration-300 outline-none select-none focus-visible:border-teal-500 focus-visible:ring-4 focus-visible:ring-teal-500/10 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 hover:shadow-md active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-teal-600 text-white hover:bg-teal-500 shadow-lg shadow-teal-900/10 hover:shadow-teal-500/20",
        outline:
          "border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900",
        secondary:
          "bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700",
        ghost:
          "hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-100",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30",
        link: "text-teal-600 underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-11 gap-2 px-6",
        xs: "h-7 gap-1 rounded-full px-3 text-xs",
        sm: "h-9 gap-1.5 rounded-full px-4 text-sm",
        lg: "h-13 gap-2 px-8 text-base",
        icon: "size-11",
        "icon-xs": "size-7 rounded-full",
        "icon-sm": "size-9 rounded-full",
        "icon-lg": "size-13",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
