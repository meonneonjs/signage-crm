import { cn } from "@/lib/utils"

interface BrandLogoProps {
  className?: string
  iconOnly?: boolean
  withoutIcon?: boolean
}

export function BrandLogo({ className, iconOnly, withoutIcon }: BrandLogoProps) {
  const src = withoutIcon
    ? '/brand/AtellierCRM logo without icon.svg'
    : iconOnly
    ? '/brand/atellierCRM icon only.svg'
    : '/brand/AtellierCRM logo with icon.svg';

  return (
    <img
      src={src}
      alt="AtellierCRM"
      className={cn(
        "h-8 w-auto dark:invert",
        className
      )}
    />
  )
}

export function BrandLogoWithSlogan({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-col items-center', className)}>
      <BrandLogo variant="full" />
      <p className="mt-2 text-sm text-gray-600 font-medium">
        Elevate Your Craft. Simplify Your Business.
      </p>
    </div>
  );
} 