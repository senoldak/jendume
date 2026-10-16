import type { APIRoute } from 'astro';
import { haftalikVeri } from '../../lib/bulten';

// Haftalık bülten verisi (İngilizce). Worker bunu okur: worker/gonder.ts.
export const GET: APIRoute = async () =>
  new Response(JSON.stringify(await haftalikVeri('en')), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
