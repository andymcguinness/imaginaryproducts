// React
import { useState } from 'react';

// Next.js
import Image from 'next/image';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

function BlurImage({ src, ...props }) {

  const [isLoading, setLoading] = useState(true);

  return (
    <Image
      {...props}
      src={src}
      className={cn(
        'duration-700 ease-in-out',
        isLoading
          ? 'grayscale blur-2xl scale-110'
          : 'grayscale-0 blur-0 scale-100'
      )}
      onLoadingComplete={() => setLoading(false)}
    />
  );
}

export default BlurImage;