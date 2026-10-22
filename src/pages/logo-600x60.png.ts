// Yayıncı logosu (NewsMediaOrganization.logo, Article publisher): 600×60 yatay PNG, derleme anında çizilir.
import type { APIRoute } from 'astro';
import sharp from 'sharp';
import { logoSvg } from '../kapak/ciz';

export const GET: APIRoute = async () => {
  const png = await sharp(Buffer.from(logoSvg())).png({ compressionLevel: 9 }).toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
