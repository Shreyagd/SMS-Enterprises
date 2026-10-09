import React, { useEffect, useState } from 'react';
import { isVideo, isLocalOnly, resolveMediaSrc } from '../../utils/media';

// Resolves stored media references (incl. videos kept in this browser) to a playable URL
export function useMediaSrc(src) {
  const [url, setUrl] = useState(() => (isLocalOnly(src) ? null : src));
  useEffect(() => {
    let alive = true;
    if (!isLocalOnly(src)) {
      setUrl(src);
      return;
    }
    setUrl(null);
    resolveMediaSrc(src).then(u => { if (alive) setUrl(u); }).catch(() => { if (alive) setUrl(null); });
    return () => { alive = false; };
  }, [src]);
  return url;
}

// Renders an image, or a muted looping video when the source is a video
export default function Media({ src, alt = '', className, onError, loading, controls = false }) {
  const url = useMediaSrc(src);

  // A browser-only video that isn't in this browser counts as a failed load
  useEffect(() => {
    if (isLocalOnly(src) && url === null) {
      let alive = true;
      resolveMediaSrc(src).then(u => { if (alive && !u && onError) onError(); });
      return () => { alive = false; };
    }
  }, [src, url]);

  if (!url) return null;
  if (isVideo(src)) {
    return (
      <video
        className={className}
        src={url}
        autoPlay
        muted
        loop
        playsInline
        controls={controls}
        onError={onError}
        aria-label={alt}
      />
    );
  }
  return <img className={className} src={url} alt={alt} onError={onError} loading={loading} />;
}
