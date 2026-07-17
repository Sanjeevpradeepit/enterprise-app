import {
  launchCamera,
  CameraOptions,
} from 'react-native-image-picker';

import { ocrPermissions } from './permissions';

import {
  CameraResult,
} from './types';

import {
  OCR_CONSTANTS,
} from './constants';

class CameraService {
  async capture(): Promise<CameraResult | null> {
    const granted =
      await ocrPermissions.ensurePermission();

    if (!granted) {
      return null;
    }

    const options: CameraOptions = {
      mediaType: 'photo',

      quality: OCR_CONSTANTS.IMAGE_QUALITY,

      maxWidth:
        OCR_CONSTANTS.MAX_IMAGE_WIDTH,

      maxHeight:
        OCR_CONSTANTS.MAX_IMAGE_HEIGHT,

      saveToPhotos: false,
    };

    const response =
      await launchCamera(options);

    if (response.didCancel) {
      return null;
    }

    if (response.errorCode) {
      throw new Error(response.errorMessage);
    }

    const asset = response.assets?.[0];

    if (!asset?.uri) {
      return null;
    }

    return {
      uri: asset.uri,

      width: asset.width ?? 0,

      height: asset.height ?? 0,

      fileName: asset.fileName,

      fileSize: asset.fileSize,

      type: asset.type,
    };
  }
}

export const cameraService =
  new CameraService();