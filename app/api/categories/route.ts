import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';

// Demo fallback data when Supabase isn't configured
const demoCategories = [
  { id: '1', name: 'Boutique & Fashion', slug: 'boutique-fashion', description: 'Trendy lifestyle & apparel content', icon: '👗', drive_link: '#', display_order: 1 },
  { id: '2', name: 'Bridal Showrooms', slug: 'bridal', description: 'Dreamy wedding & bridal content', icon: '💍', drive_link: '#', display_order: 2 },
  { id: '3', name: 'Textiles & Sarees', slug: 'textiles', description: 'Heritage & modern textile brands', icon: '🧵', drive_link: '#', display_order: 3 },
  { id: '4', name: 'Interior Design', slug: 'interior', description: 'Spaces that inspire and sell', icon: '🏡', drive_link: '#', display_order: 4 },
  { id: '5', name: 'Healthcare Clinics', slug: 'healthcare', description: 'Trust-building medical content', icon: '🏥', drive_link: '#', display_order: 5 },
  { id: '6', name: 'Real Estate', slug: 'real-estate', description: 'Property tours that convert', icon: '🏢', drive_link: '#', display_order: 6 },
  { id: '7', name: 'Education', slug: 'education', description: 'Learning & coaching brands', icon: '📚', drive_link: '#', display_order: 7 },
];

export async function GET() {
  try {
    const supabase = createServiceClient();
    if (!supabase) throw new Error('Supabase configuration missing');
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('display_order');
    if (error || !data) throw error;
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(demoCategories);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const supabase = createServiceClient();
    if (!supabase) throw new Error('Supabase configuration missing');
    const { data, error } = await supabase.from('categories').insert(body).select().single();
    if (error) throw error;
    return NextResponse.json(data);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
