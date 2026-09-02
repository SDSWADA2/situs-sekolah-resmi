import { supabase } from '@/lib/supabase';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { ApiError, ValidationError, NotFoundError } from '@/lib/errors';
import { validate } from '@/lib/validation';

// GET /api/students
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';

    let query = supabase.from('students').select('*', { count: 'exact' });

    if (search) {
      query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%`);
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
    console.error('GET /api/students error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// POST /api/students
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validation
    const { valid, errors } = validate(body, {
      name: [{ type: 'required' }],
      email: [{ type: 'required' }, { type: 'email' }],
      phone: [{ type: 'required' }],
    });

    if (!valid) {
      throw new ValidationError('Validation failed', errors);
    }

    const { data, error } = await supabase
      .from('students')
      .insert([body])
      .select();

    if (error) throw error;

    return NextResponse.json(
      { success: true, data: data?.[0], message: 'Student created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST /api/students error:', error);
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
