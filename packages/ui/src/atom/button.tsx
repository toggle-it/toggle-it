import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, forwardRef } from "react";

import { cn } from "../util";

const buttonVariants = cva(
  "inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-indigo-600 text-white focus-visible:ring-indigo-300 enabled:hover:bg-indigo-500",
        secondary:
          "bg-zinc-600 text-white focus-visible:ring-zinc-300 enabled:hover:bg-zinc-500",
        destructive:
          "bg-rose-600 text-white focus-visible:ring-rose-300 enabled:hover:bg-rose-500",
        outline:
          "bg-white text-slate-900 ring-1 ring-slate-200 enabled:hover:bg-slate-100",
        ghost:
          "enabled:hover:bg-gray-400/10 enabled:focus-visible:ring-slate-100 dark:text-white",
        link: "text-indigo-600 underline-offset-4 hover:underline",
      },
      size: {
        sm: "rounded-md px-3 py-0.5 text-sm",
        md: "text-md rounded-md px-5 py-1 font-medium",
        lg: "rounded-lg px-6 py-1 text-lg font-semibold",
      },
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
