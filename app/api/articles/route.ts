import { supabase } from '@/lib/supabase';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { ValidationError } from '@/lib/errors';
import { validate } from '@/lib/validation';

// GET /api/articles
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const published = searchParams.get('published');

    let query = supabase.from('articles').select('*', { count: 'exact' });

    if (search) {
      query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
    }

    if (published !== null) {
      query = query.eq('published', published === 'true');
    }

    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range((page - 1) * limit, page * limit - 1);

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data,
      pagination: {
        page,
        limit,
        total: count || 0,
      },
    });
  } catch (error) {
    console.error('GET /api/articles error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// POST /api/articles
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Generate slug from title
    const slug = body.title
      .toLowerCase()
      .replace(/[^\w-]/g, '-')
      .replace(/-+/g, '-')
      .trim('-');

    const articleData = {
      ...body,
      slug,
    };

    const { valid, errors } = validate(articleData, {
      title: [{ type: 'required' }, { type: 'minLength', value: 3 }],
      content: [{ type: 'required' }],
      author: [{ type: 'required' }],
    });

    if (!valid) {
      throw new ValidationError('Validation failed', errors);
    }

    const { data, error } = await supabase
      .from('articles')
      .insert([articleData])
      .select();

    if (error) throw error;

    return NextResponse.json(
      { success: true, data: data?.[0], message: 'Article created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST /api/articles error:', error);
    if (error instanceof ValidationError) {
      return NextResponse.json(
        { success: false, error: error.message, details: error.details },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
