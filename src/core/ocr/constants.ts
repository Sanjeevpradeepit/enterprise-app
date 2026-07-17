export const OCR_CONSTANTS = {
  IMAGE_QUALITY: 0.8,

  MAX_IMAGE_WIDTH: 1920,

  MAX_IMAGE_HEIGHT: 1920,

  MAX_FILE_SIZE: 5 * 1024 * 1024,

  LANGUAGE: 'en',

  TIMEOUT: 30000,
} as const;

export const SUPPORTED_DOCUMENTS = {
  RESUME: 'resume',

  BUSINESS_CARD: 'business_card',

  PASSPORT: 'passport',

  ID_CARD: 'id_card',

  INVOICE: 'invoice',
} as const;

export const IMAGE_FORMAT = {
  JPG: 'jpg',

  JPEG: 'jpeg',

  PNG: 'png',
} as const;