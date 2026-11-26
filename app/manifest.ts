import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ASA | สถาปนิก'70",
    short_name: "สถาปนิก'70",
    description: "ARCHITECT'70 UNHEARD HEIGHTS - 27 APR – 02 MAY 2027",
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#0038D1',
    icons: [
      {
        src: '/icons/logo.png',
        sizes: '192x192 512x512',
        type: 'image/png',
      },
    ],
  };
}