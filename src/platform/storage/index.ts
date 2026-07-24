export * from './asyncStorage';
export * from './mmkv';
export * from './secureStorage';
export * from './storageKeys';




// Enterprise Usage
// Save Token
// import {
//   mmkvStorage,
//   StorageKeys,
// } from '@/core/storage';

// mmkvStorage.set(
//   StorageKeys.ACCESS_TOKEN,
//   token,
// );
// Get Token
// const token = mmkvStorage.getString(
//   StorageKeys.ACCESS_TOKEN,
// );
// Remove Token
// mmkvStorage.remove(
//   StorageKeys.ACCESS_TOKEN,
// );
// Save User Object
// await asyncStorage.set('user', user);
// Read User Object
// const user = await asyncStorage.get<User>('user');
// Secure Credentials
// await secureStorage.save(
//   email,
//   refreshToken,
// );
// const credential =
//   await secureStorage.get();