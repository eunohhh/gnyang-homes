import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

function ScrollArea({
  className,
  children,
  viewportClassName,
  scrollBarClassName,
  scrollbarOrientation = "vertical",
  thumbClassName,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root> & {
  viewportClassName?: string;
  scrollBarClassName?: string;
  scrollbarOrientation?: React.ComponentProps<
    typeof ScrollAreaPrimitive.ScrollAreaScrollbar
  >["orientation"];
  thumbClassName?: string;
}) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn("relative", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport 
        data-slot="scroll-area-viewport"
        className={cn("focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1", viewportClassName)} 
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar
        className={scrollBarClassName}
        orientation={scrollbarOrientation}
        thumbClassName={thumbClassName}
      />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

function ScrollBar({
  className,
  orientation = "vertical",
  thumbClassName,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar> & {
  thumbClassName?: string;
}) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        "flex touch-none p-px transition-colors select-none",
        orientation === "vertical" &&
          "h-full w-2.5 border-l border-l-transparent",
        orientation === "horizontal" &&
          "h-2.5 flex-col border-t border-t-transparent",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className={cn("bg-border relative flex-1 rounded-full", thumbClassName)}    
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
}

export { ScrollArea, ScrollBar }
