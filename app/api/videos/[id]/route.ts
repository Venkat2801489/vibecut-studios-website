import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from('videos')
      .update(body)
      .eq('id', params.id)
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = createServiceClient();
    const { error } = await supabase.from('videos').delete().eq('id', params.id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
