type Props = { className?: string; size?: number };

export function Sparkle({ className = "", size = 48 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="sg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.95 0.16 100)" />
          <stop offset="100%" stopColor="oklch(0.78 0.18 90)" />
        </linearGradient>
      </defs>
      <path
        d="M50 5 L57 43 L95 50 L57 57 L50 95 L43 57 L5 50 L43 43 Z"
        fill="url(#sg)"
      />
    </svg>
  );
}
