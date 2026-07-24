import NetInfo, {
  NetInfoState,
} from '@react-native-community/netinfo';

class NetworkService {
  async getState() {
    return NetInfo.fetch();
  }

  async isConnected() {
    const state = await NetInfo.fetch();

    return (
      state.isConnected === true &&
      state.isInternetReachable === true
    );
  }

  subscribe(
    callback: (state: NetInfoState) => void,
  ) {
    return NetInfo.addEventListener(callback);
  }
}

export const networkService =
  new NetworkService();