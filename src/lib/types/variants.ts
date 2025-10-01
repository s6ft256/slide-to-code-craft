import { type VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button";
import { badgeVariants } from "@/components/ui/badge";
import { toggleVariants } from "@/components/ui/toggle";

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
export type BadgeVariantProps = VariantProps<typeof badgeVariants>;
export type ToggleVariantProps = VariantProps<typeof toggleVariants>;