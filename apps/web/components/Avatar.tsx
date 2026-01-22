'use client';

import { cn } from '@/lib/cn';
import { resolveMediaUrl } from '@/lib/api';
import { User } from 'lucide-react';
import { useMemo, useState } from 'react';

type SizePreset = 'sm' | 'md' | 'lg';

type Props =
  | {
      url?: string | null;
      alt?: string;
      size?: number;
      className?: string;
    }
  | {
      imageUrl?: string | null;
      username?: string;
      size?: SizePreset;
      className?: string;
    };

function sizeToPx(size?: SizePreset): number {
  if (size === 'sm') return 28;
  if (size === 'lg') return 52;
  return 40; // md default
}

export default function Avatar(props: Props) {
  // Support both prop styles (legacy + new)
  const url = 'url' in props ? props.url : props.imageUrl;
  const alt =
    'alt' in props
      ? props.alt || 'Avatar'
      : props.username
        ? `Avatar de ${props.username}`
        : 'Avatar';

  const px =
    'size' in props && typeof props.size === 'number'
      ? props.size
      : 'size' in props && typeof props.size === 'string'
        ? sizeToPx(props.size as SizePreset)
        : 40;

  const className = props.className;

  const [failed, setFailed] = useState(false);

  const src = useMemo(() => {
    if (!url) return null;
    try {
      const resolved = resolveMediaUrl(url);
      if (!resolved || resolved === 'undefined' || resolved === 'null') return null;
      return resolved;
    } catch {
      return null;
    }
  }, [url]);

  const showImg = !!src && !failed;

  return (
    <div
      className={cn(
        'relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/10 ring-1 ring-white/10',
        className,
      )}
      style={{ width: px, height: px }}
      aria-label={alt}
    >
      {showImg ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src!}
          alt={alt}
          className="h-full w-full object-cover"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
        />
      ) : (
        <User className="h-1/2 w-1/2 text-white/60" aria-hidden="true" />
      )}
    </div>
  );
}
