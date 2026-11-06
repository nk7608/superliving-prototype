import { avatarNames } from '../data/avatars.generated';

// Illustrated placeholder people (Notionists by Zoish, CC0 1.0), pre-rendered by
// scripts/gen-avatars.mjs. No real photos (§6.5).
export type Who = (typeof avatarNames)[number];
const src = (who: Who) => `${import.meta.env.BASE_URL}avatars/${who}.svg`;

export function Avatar({ who, size = 40, className = '', square = false }: { who: Who; size?: number; className?: string; square?: boolean }) {
  return (
    <img
      src={src(who)}
      alt=""
      aria-hidden
      width={size}
      height={size}
      className={`shrink-0 object-cover ${square ? 'rounded-[14px]' : 'rounded-full'} ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

/** Full-bleed illustration for card image areas. */
export function AvatarFill({ who, className = '' }: { who: Who; className?: string }) {
  return <img src={src(who)} alt="" aria-hidden className={`h-full w-full object-cover object-top ${className}`} />;
}
