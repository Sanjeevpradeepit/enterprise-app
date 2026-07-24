import { otaListener } from './ota.listener';
import { OTAStatus, OTAUpdate } from './ota.constants';

class OTAService {
  async checkForUpdate(): Promise<OTAUpdate | null> {
    otaListener.notify(OTAStatus.CHECKING);

    // TODO:
    // Replace with Expo Updates
    // or CodePush
    // or Self Hosted OTA

    console.log('[OTA] Checking for update...');

    otaListener.notify(OTAStatus.UP_TO_DATE);

    return null;
  }

  async downloadUpdate() {
    otaListener.notify(OTAStatus.DOWNLOADING);

    console.log('[OTA] Downloading...');

    otaListener.notify(OTAStatus.UPDATED);
  }

  async installUpdate() {
    otaListener.notify(OTAStatus.INSTALLING);

    console.log('[OTA] Installing...');
  }

  async sync() {
    const update = await this.checkForUpdate();

    if (update) {
      await this.downloadUpdate();
      await this.installUpdate();
    }
  }
}

export const otaService = new OTAService();