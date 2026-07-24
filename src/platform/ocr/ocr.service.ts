import TextRecognition, {
  TextRecognitionResult,
} from '@react-native-ml-kit/text-recognition';

import type {
  OCRBlock,
  OCRResult,
} from './types';

class OCRService {
  /**
   * Perform OCR on an image.
   */
  async recognize(
    imagePath: string,
  ): Promise<OCRResult> {
    try {
      const result: TextRecognitionResult =
        await TextRecognition.recognize(
          imagePath,
        );

      return {
        text: result.text,

        blocks:
          result.blocks?.map(block => ({
            text: block.text,

            confidence:
              block.recognizedLanguages?.length
                ? 1
                : undefined,
          })) ?? [],
      };
    } catch (error) {
      console.error(
        '[OCR] Recognition Failed',
        error,
      );

      throw error;
    }
  }

  /**
   * Only return extracted text.
   */
  async recognizeText(
    imagePath: string,
  ): Promise<string> {
    const result =
      await this.recognize(imagePath);

    return result.text;
  }

  /**
   * Validate image.
   */
  async isReadable(
    imagePath: string,
  ): Promise<boolean> {
    const text =
      await this.recognizeText(imagePath);

    return text.trim().length > 0;
  }
}

export const ocrService =
  new OCRService();