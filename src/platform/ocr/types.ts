export interface OCRResult {
  text: string;

  blocks: OCRBlock[];
}

export interface OCRBlock {
  text: string;

  confidence?: number;
}

export interface CameraResult {
  uri: string;

  width: number;

  height: number;

  fileName?: string;

  fileSize?: number;

  type?: string;
}

export interface CandidateOCR {
  name?: string;

  email?: string;

  phone?: string;

  experience?: string;

  skills?: string[];

  address?: string;

  designation?: string;
}

export interface BusinessCardOCR {
  name?: string;

  designation?: string;

  company?: string;

  email?: string;

  phone?: string;

  website?: string;

  address?: string;
}