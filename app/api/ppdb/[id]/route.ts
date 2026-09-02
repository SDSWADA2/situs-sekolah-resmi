import { supabase } from '@/lib/supabase';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { ValidationError } from '@/lib/errors';
import { validate } from '@/lib/validation';

// PUT /api/ppdb/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const { valid, errors } = validate(body, {
      status: [{ type: 'required' }],
    });

    if (!valid) {
      throw new ValidationError('Validation failed', errors);
    }

    const { data, error } = await supabase
      .from('ppdb_applications')
      .update({
        ...body,
        reviewed_at: new Date().toISOString(),
      })
      .eq('id', params.id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data,
      message: 'PPDB application updated successfully',
    });
  } catch (error) {
    console.error('PUT /api/ppdb/[id] error:', error);
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
