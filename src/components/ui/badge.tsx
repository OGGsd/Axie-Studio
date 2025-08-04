import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"
import { cn } from "../../lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-slate-900 text-white hover:bg-slate-800",
        secondary: "border-transparent bg-slate-100 text-slate-900 hover:bg-slate-200",
        destructive: "border-transparent bg-red-500 text-white hover:bg-red-600",
        outline: "text-slate-900 border-slate-200",
        gradient: "border-transparent bg-gradient-to-r from-blue-600 to-purple-600 text-white",
        glass: "border-2 border-slate-300 bg-white text-slate-900",
        glow: "border-transparent bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  animate?: boolean
}

function Badge({ className, variant, animate = true, ...props }: BadgeProps) {
  const badgeContent = (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.05 }}
      >
        {badgeContent}
      </motion.div>
    )
  }

  return badgeContent
}

export { Badge, badgeVariants } 