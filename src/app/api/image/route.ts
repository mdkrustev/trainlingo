// app/api/image/route.ts

import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic'; // disable caching on Vercel etc.

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');

  if (!url || !url.startsWith('https://i.ytimg.com/vi/'))  {
    return new Response('Invalid image URL', { status: 400 });
  }

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch image');

    const contentType = res.headers.get('content-type');
    const blob = await res.blob();

    return new Response(blob, {
      headers: {
        'Content-Type': contentType || 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000, immutable', // 1 година
      },
    });
  } catch (error) {
    console.error('Image proxy error:', error);
    return new Response('/fallback-thumbnail.jpg', {
      status: 302,
      headers: {
        Location: '/fallback-thumbnail.jpg', // Трябва да имаш тази снимка в public/
      },
    });
  }
}