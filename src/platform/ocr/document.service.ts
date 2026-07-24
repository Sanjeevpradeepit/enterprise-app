import { cameraService } from './camera.service';
import { ocrService } from './ocr.service';
import { parserService } from './parser.service';

import type {
  CameraResult,
  OCRResult,
  CandidateOCR,
  BusinessCardOCR,
} from './types';

export interface CandidateDocumentResult {
  image: CameraResult;

  ocr: OCRResult;

  candidate: CandidateOCR;
}

export interface BusinessCardDocumentResult {
  image: CameraResult;

  ocr: OCRResult;

  contact: BusinessCardOCR;
}

/**
 * Enterprise OCR Document Service
 *
 * Flow
 *
 * Camera
 *   ↓
 * OCR
 *   ↓
 * Parser
 *   ↓
 * Structured Model
 */
class DocumentService {
  /**
   * Scan Resume
   */
  async scanResume(): Promise<CandidateDocumentResult | null> {
    const image = await cameraService.capture();

    if (!image) {
      return null;
    }

    const ocr =
      await ocrService.recognize(image.uri);

    const candidate =
      parserService.parseResume(ocr.text);

    return {
      image,
      ocr,
      candidate,
    };
  }

  /**
   * Scan Business Card
   */
  async scanBusinessCard(): Promise<BusinessCardDocumentResult | null> {
    const image = await cameraService.capture();

    if (!image) {
      return null;
    }

    const ocr =
      await ocrService.recognize(image.uri);

    const contact =
      parserService.parseBusinessCard(
        ocr.text,
      );

    return {
      image,
      ocr,
      contact,
    };
  }

  /**
   * OCR from existing image
   */
  async recognizeImage(
    imagePath: string,
  ): Promise<OCRResult> {
    return ocrService.recognize(imagePath);
  }

  /**
   * Parse Resume Text
   */
  parseResume(text: string): CandidateOCR {
    return parserService.parseResume(text);
  }

  /**
   * Parse Business Card Text
   */
  parseBusinessCard(
    text: string,
  ): BusinessCardOCR {
    return parserService.parseBusinessCard(
      text,
    );
  }
}

export const documentService =
  new DocumentService();