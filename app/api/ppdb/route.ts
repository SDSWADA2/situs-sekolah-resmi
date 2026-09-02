import { supabase } from '@/lib/supabase';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { ValidationError } from '@/lib/errors';
import { validate } from '@/lib/validation';

// GET /api/ppdb
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');

    let query = supabase.from('ppdb_applications').select('*', { count: 'exact' });

    if (status) {
      query = query.eq('status', status);
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
    console.error('GET /api/ppdb error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// POST /api/ppdb
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { valid, errors } = validate(body, {
      student_name: [{ type: 'required' }],
      email: [{ type: 'required' }, { type: 'email' }],
      phone: [{ type: 'required' }],
    });

    if (!valid) {
      throw new ValidationError('Validation failed', errors);
    }

    const { data, error } = await supabase
      .from('ppdb_applications')
      .insert([body])
      .select();

    if (error) throw error;

    return NextResponse.json(
      { success: true, data: data?.[0], message: 'PPDB application created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST /api/ppdb error:', error);
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
