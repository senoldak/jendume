import type { APIRoute } from 'astro';
import { haftalikVeri } from '../../lib/bulten';

// Haftalık bülten verisi (Türkçe). Worker bunu okur: worker/gonder.ts.
export const GET: APIRoute = async () =>
  new Response(JSON.stringify(await haftalikVeri('tr')), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
