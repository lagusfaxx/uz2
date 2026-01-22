'use client';
import Image from 'next/image';
import { User } from 'lucide-react';
import { cn } from '@/lib/cn';
import { resolveMediaUrl } from '@/lib/api';

type Props = {
  /** Nuevo */
  url?: string | null;
  /** Legacy (para compatibilidad) */
  imageUrl?: string | null;
  alt?: string;
  size?: number;
  className?: string;
};

export default function Avatar({ url, imageUrl, alt, size = 36, className }: Props) {
  const raw = url ?? imageUrl ?? null;
  const src = raw ? resolveMediaUrl(raw) : null;
  const px = Math.max(18, size);

  return (
    <div
      className={cn(
        'relative shrink-0 overflow-hidden rounded-full border border-white/10 bg-white/5',
        className
      )}
      style={{ width: px, height: px }}
      aria-label={alt ?? 'Avatar'}
      title={alt ?? 'Avatar'}
    >
      {src ? (
        <Image
          src={src}
          alt={alt ?? 'Avatar'}
          fill
          sizes={`${px}px`}
          className="object-cover"
          unoptimized
        />
      ) : (
        // Fallback "incognito"/usuario cuando no hay foto
        <div className="grid h-full w-full place-items-center">
          <User className="h-1/2 w-1/2 opacity-70" />
        </div>
      )}
    </div>
  );
}
