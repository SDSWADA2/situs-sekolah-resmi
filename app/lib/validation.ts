import { ValidationError } from './errors';

interface ValidationRule {
  type: 'required' | 'email' | 'minLength' | 'maxLength' | 'pattern' | 'match' | 'custom';
  value?: any;
  message?: string;
  validator?: (value: any) => boolean;
}

interface ValidationSchema {
  [field: string]: ValidationRule[];
}

export function validate(
  data: Record<string, any>,
  schema: ValidationSchema
): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  for (const [field, rules] of Object.entries(schema)) {
    const value = data[field];

    for (const rule of rules) {
      switch (rule.type) {
        case 'required':
          if (!value || value.toString().trim() === '') {
            errors[field] = rule.message || `${field} wajib diisi`;
          }
          break;

        case 'email':
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (value && !emailRegex.test(value)) {
            errors[field] = rule.message || 'Email tidak valid';
          }
          break;

        case 'minLength':
          if (value && value.length < rule.value) {
            errors[field] = rule.message || `Minimal ${rule.value} karakter`;
          }
          break;

        case 'maxLength':
          if (value && value.length > rule.value) {
            errors[field] = rule.message || `Maksimal ${rule.value} karakter`;
          }
          break;

        case 'pattern':
          if (value && !rule.value.test(value)) {
            errors[field] = rule.message || 'Format tidak valid';
          }
          break;

        case 'custom':
          if (rule.validator && !rule.validator(value)) {
            errors[field] = rule.message || 'Validasi gagal';
          }
          break;
      }

      if (errors[field]) break; // Stop validation for this field
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
