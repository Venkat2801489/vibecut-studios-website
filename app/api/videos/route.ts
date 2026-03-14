import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const categorySlug = searchParams.get('category');
  const categoryId = searchParams.get('category_id');

  try {
    const supabase = createServiceClient();
    if (!supabase) throw new Error('Supabase configuration missing');
    let query = supabase
      .from('videos')
      .select('*, category:categories(*)')
      .order('position')
      .limit(10);

    if (categoryId) {
      query = query.eq('category_id', categoryId);
    } else if (categorySlug) {
      // Look up category by slug first
      const { data: cat } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', categorySlug)
        .single();
      if (cat) query = query.eq('category_id', cat.id);
    }

    const { data, error } = await query;
    if (error) throw error;
    return NextResponse.json(data || []);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const supabase = createServiceClient();
    if (!supabase) throw new Error('Supabase configuration missing');
    const { data, error } = await supabase.from('videos').insert(body).select().single();
    if (error) throw error;
    return NextResponse.json(data);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
