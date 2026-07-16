# Biometric Authentication Flow

## Overview

For a production SaaS application, biometric authentication should be **opt-in**.

Users should always authenticate with their email/password the first time. After a successful login, they can choose to enable Face ID or Fingerprint authentication for future logins.

---

# Complete Authentication Flow

```text
                 First Install
                      │
                      ▼
               Login Screen
                      │
                      ▼
      Email + Password + API Login
                      │
                      ▼
          Login Success (JWT Tokens)
                      │
          ┌───────────┴────────────┐
          │                        │
 Store Access Token          Store Refresh Token
     (MMKV)                  (Keychain)
          │
          ▼
Is biometric already enabled?
          │
    ┌─────┴─────┐
    │           │
   No          Yes
    │           │
    ▼           ▼
Show dialog   Skip dialog
"Enable Face ID?"
    │
 ┌──┴──┐
 │     │
Yes    No
 │      │
 ▼      ▼
Authenticate
with Face ID
 │
 ▼
biometricStorage.enable()
 │
 ▼
Go Home
```

---

# Project Structure

```text
src/

core/
    biometric/
        biometric.service.ts
        biometric.storage.ts
        biometric.constants.ts
        biometric.types.ts
        useBiometric.ts

features/
    auth/

        screens/

            Login/

            Register/

            Biometric/

                BiometricScreen.tsx
                styles.ts

        hooks/

        services/

        components/
```

---

# Step 1 — User Login

After a successful API login:

```ts
async function login() {
  const response = await authService.login({
    email,
    password,
  });

  tokenService.saveAccessToken(response.accessToken);

  keychainService.saveRefreshToken(
    response.refreshToken,
  );

  if (!biometricStorage.isEnabled()) {
    showEnableBiometricModal();
  } else {
    navigation.replace('Home');
  }
}
```

---

# Step 2 — Ask User Permission

Display a modal after the first successful login.

```
Enable Face ID?

✔ Faster login

✔ More secure

────────────────────────

[ Enable ]

[ Not Now ]
```

If the user taps **Not Now**, continue to Home.

If the user taps **Enable**, continue to biometric verification.

---

# Step 3 — Verify Face ID / Fingerprint

```ts
async function enableBiometric() {
  const success =
    await biometricService.authenticate();

  if (success) {
    biometricStorage.enable();

    navigation.replace('Home');
  }
}
```

Why verify?

Because anyone could have logged into the device.

The operating system verifies the real device owner before enabling biometric login.

---

# Step 4 — App Launch

Every time the application starts:

```ts
const refreshToken =
  keychainService.getRefreshToken();

if (!refreshToken) {
  navigation.replace('Login');
  return;
}

if (biometricStorage.isEnabled()) {
  navigation.replace('Biometric');
} else {
  navigation.replace('Home');
}
```

---

# Step 5 — Biometric Screen

Example:

```tsx
export function BiometricScreen() {
  const navigation = useNavigation();

  async function authenticate() {
    const success =
      await biometricService.authenticate();

    if (success) {
      navigation.replace('Home');
    }
  }

  useEffect(() => {
    authenticate();
  }, []);

  return (
    <Screen>
      <Button
        title="Continue with Face ID"
        onPress={authenticate}
      />
    </Screen>
  );
}
```

UI

```
🔐

Authentication

Continue with Face ID

[ Authenticate ]
```

---

# Step 6 — Settings Screen

Users can enable or disable biometric authentication anytime.

```
Security

Face ID Login

───────────────

ON / OFF
```

Implementation

```ts
const onToggle = async (value: boolean) => {
  if (value) {
    const success =
      await biometricService.authenticate();

    if (success) {
      biometricStorage.enable();
    }
  } else {
    biometricStorage.disable();
  }
};
```

---

# App Startup Flow

```text
App Starts
     │
     ▼
Refresh Token Exists?
     │
 ┌───┴────┐
 │        │
 No      Yes
 │        │
 ▼        ▼
Login   Biometrics Enabled?
            │
      ┌─────┴──────┐
      │            │
     No           Yes
      │            │
      ▼            ▼
     Home    Authenticate
                   │
            ┌──────┴──────┐
            │             │
         Success        Failed
            │             │
            ▼             ▼
          Home          Login
```

---

# Token Storage Strategy

| Item | Storage |
|------|----------|
| Access Token | MMKV |
| Refresh Token | Keychain / Android Keystore |
| Biometric Enabled | MMKV |
| Password | Never Store |

---

# Why Access Token Goes in MMKV

Access tokens are:

- Short-lived
- Frequently accessed
- Safe to cache
- Easy to replace using the refresh token

---

# Why Refresh Token Goes in Keychain

Refresh tokens:

- Live much longer
- Can generate new access tokens
- Must be encrypted
- Should never be stored in MMKV

---

# Enterprise Architecture

Instead of putting biometric logic inside LoginScreen or RegisterScreen, centralize it inside an authentication guard.

```text
App
 │
 ▼
Splash Screen
 │
 ▼
Auth Guard
 │
 ├───────────────┐
 │               │
 ▼               ▼
No Token     Refresh Token
 │               │
 ▼               ▼
Login      Biometrics Enabled?
                │
         ┌──────┴──────┐
         │             │
        No            Yes
         │             │
         ▼             ▼
       Home      Biometric Screen
                      │
             ┌────────┴────────┐
             │                 │
          Success           Failed
             │                 │
             ▼                 ▼
           Home             Login
```

---

# Security Best Practices

✅ Never store the user's password.

✅ Store only a boolean (`biometric_enabled`) in MMKV.

✅ Store refresh tokens in the iOS Keychain or Android Keystore.

✅ Always verify the user with Face ID or Fingerprint before enabling biometric login.

✅ Keep access tokens short-lived.

✅ Rotate refresh tokens when issuing new access tokens.

✅ Clear all tokens on logout.

---

# Recommended Login Sequence

```text
User Login
     │
     ▼
Backend Authentication
     │
     ▼
Receive JWT Tokens
     │
     ▼
Store Access Token (MMKV)
     │
     ▼
Store Refresh Token (Keychain)
     │
     ▼
Ask to Enable Biometrics
     │
 ┌───┴────┐
 │        │
Yes      No
 │        │
 ▼        ▼
Authenticate   Home
 │
 ▼
Enable Biometrics
 │
 ▼
Home
```

---

# Benefits of This Architecture

- Enterprise-grade security
- Separation of concerns
- Centralized authentication flow
- Easy to maintain
- Easy to extend with MFA, Passkeys, or PIN authentication
- Matches the authentication flow used by banking and enterprise SaaS applications