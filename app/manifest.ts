import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ASA Platform Demo',
    short_name: 'ASA Demo',
    description: 'ตัวอย่างระบบ ASA Platform สำหรับทดลองใช้งาน',
    start_url: '/',
    display: 'standalone',
    background_color: '#f8fafc',
    theme_color: '#0f172a',
    icons: [
      {
        src: '/icons/logo.png',
        sizes: '192x192 512x512',
        type: 'image/png',
      },
    ],
  };
}