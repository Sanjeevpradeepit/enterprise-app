Enterprise authentication flow


User Login
    │
    ▼
Server returns
Access Token
Refresh Token
    │
    ▼
Store Access Token
(MMKV)
    │
    ▼
Store Refresh Token
(Keychain / Keystore)
    │
    ▼
Enable Biometrics?
    │
 ┌──┴──┐
 │     │
No    Yes
 │      │
 ▼      ▼
Done  biometricStorage.enable()