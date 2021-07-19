interface ValidationConfig {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

export function isValid(data: ValidationConfig): boolean {
  if (data.required) {
    return data.value.toString().trim().length !== 0;
  }

  if (typeof data.value === 'string' && data.minLength) {
    return data.value.length >= data.minLength;
  }

  if (typeof data.value === 'string' && data.maxLength) {
    return data.value.length <= data.maxLength;
  }

  if (typeof data.value === 'number' && data.min !== undefined) {
    return data.value >= data.min;
  }

  if (typeof data.value === 'number' && data.max !== undefined) {
    return data.value <= data.max;
  }

  return true;
}
