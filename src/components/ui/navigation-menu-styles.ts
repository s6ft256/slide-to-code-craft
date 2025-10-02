import { cva } from "class-variance-authority";

const navigationMenuTriggerStyle = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-background hover:bg-accent hover:text-accent-foreground data-[active]:bg-accent data-[state=open]:bg-accent h-10 py-2 px-4 group w-max",
);

export { navigationMenuTriggerStyle };