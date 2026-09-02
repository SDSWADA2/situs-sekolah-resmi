import { supabase } from '@/lib/supabase';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { NotFoundError, ValidationError } from '@/lib/errors';
import { validate } from '@/lib/validation';

// GET /api/students/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('id', params.id)
      .single();

    if (error || !data) {
      throw new NotFoundError(`Student with id ${params.id} not found`);
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('GET /api/students/[id] error:', error);
    if (error instanceof NotFoundError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// PUT /api/students/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    // Validation
    const { valid, errors } = validate(body, {
      name: [{ type: 'required' }],
      email: [{ type: 'required' }, { type: 'email' }],
    });

    if (!valid) {
      throw new ValidationError('Validation failed', errors);
    }

    const { data, error } = await supabase
      .from('students')
      .update(body)
      .eq('id', params.id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data,
      message: 'Student updated successfully',
    });
  } catch (error) {
    console.error('PUT /api/students/[id] error:', error);
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

// DELETE /api/students/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { error } = await supabase
      .from('students')
      .delete()
      .eq('id', params.id);

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: 'Student deleted successfully',
    });
  } catch (error) {
    console.error('DELETE /api/students/[id] error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
