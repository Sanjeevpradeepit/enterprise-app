# Enterprise Authentication + Home Widget Flow

This document describes a production-ready authentication flow with secure token storage, biometric authentication, and Home Screen Widget integration for an enterprise React Native application.

---

# Authentication Flow

```text
                    User Login
                         │
                         ▼
              API Authentication Request
                         │
                         ▼
              Server Returns Tokens
        ┌────────────────┴────────────────┐
        │                                 │
        ▼                                 ▼
   Access Token                    Refresh Token
        │                                 │
        ▼                                 ▼
 Store in MMKV                 Store in Keychain /
 (Fast Local Storage)            Android Keystore
        │
        ▼
 Is Biometric Enabled?
        │
   ┌────┴─────┐
   │          │
   ▼          ▼
  No         Yes
   │          │
   ▼          ▼
 Continue   Authenticate
              │
              ▼
      biometricStorage.enable()
              │
              ▼
        Navigate to Home
```

---

# Token Storage Strategy

| Token | Storage | Reason |
|---------|----------|--------|
| Access Token | MMKV | Fast access for every API request |
| Refresh Token | Keychain (iOS) / Android Keystore | Hardware-backed secure storage |
| Biometric Flag | MMKV | Simple application setting |

---

# Login Flow

```ts
const response = await authService.login({
  email,
  password,
});

await tokenService.saveAccessToken(
  response.accessToken,
);

await tokenService.saveRefreshToken(
  response.refreshToken,
);

if (!biometricStorage.isEnabled()) {
  showEnableBiometricModal();
} else {
  navigation.replace('Home');
}
```

---

# Enable Biometrics

```ts
const success =
  await biometricService.authenticate();

if (success) {
  biometricStorage.enable();

  navigation.replace('Home');
}
```

---

# App Startup Flow

```text
App Starts
     │
     ▼
Load Refresh Token
     │
 ┌───┴────┐
 │        │
 ▼        ▼
No       Exists
 │        │
 ▼        ▼
Login   Biometric Enabled?
             │
      ┌──────┴──────┐
      │             │
      ▼             ▼
     No            Yes
      │             │
      ▼             ▼
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

# Home Widget Architecture

The widget module provides a bridge between React Native and the native Home Screen Widget implementation.

```text
React Native
      │
      ▼
WidgetService
      │
      ▼
WidgetBridge
      │
      ├───────────────┐
      │               │
      ▼               ▼
Android         iOS WidgetKit
AppWidget       WidgetCenter
```

---

# Native Bridge

## Android (Kotlin)

```kotlin
@ReactMethod
fun updateWidget(data: ReadableMap)

@ReactMethod
fun refreshWidget()

@ReactMethod
fun clearWidget()
```

---

## iOS (Swift)

```swift
@objc(updateWidget:)
func updateWidget(_ data: NSDictionary)

@objc
func reloadWidget()

@objc
func clearWidget()
```

---

# Widget Runtime Flow

```text
Login Success
      │
      ▼
WidgetService.update()
      │
      ▼
WidgetBridge
      │
      ├─────────────┐
      │             │
      ▼             ▼
Android       iOS WidgetKit
AppWidget     WidgetCenter
      │             │
      ▼             ▼
Refresh Widget
      │
      ▼
Home Screen
```

---

# Widget Update Example

```ts
await widgetService.update({
  title: 'Welcome',
  subtitle: 'John Doe',
  message: 'You have 5 new notifications',
  badge: 5,
});
```

---

# Clear Widget on Logout

```ts
await widgetService.clear();
```

---

# Enterprise Authentication Lifecycle

```text
User Opens App
        │
        ▼
Splash Screen
        │
        ▼
Load Refresh Token
        │
        ▼
Validate Session
        │
        ▼
Biometric Authentication
        │
        ▼
Generate New Access Token
        │
        ▼
Update Home Widget
        │
        ▼
Navigate to Home
```

---

# Recommended Project Structure

```text
src/
├── core/
│
├── auth/
│
├── biometric/
│
├── storage/
│   ├── token.service.ts
│   ├── keychain.service.ts
│   └── mmkv.service.ts
│
├── widget/
│   ├── widget.service.ts
│   ├── widget.bridge.ts
│   ├── widget.types.ts
│   └── index.ts
│
├── notification/
├── websocket/
├── analytics/
├── ota/
├── crash/
└── location/
```

---

# Best Practices

- Store **Access Token** in MMKV for fast retrieval.
- Store **Refresh Token** in Keychain (iOS) or Android Keystore for maximum security.
- Make biometric login **opt-in**, requiring a successful biometric authentication before enabling it.
- Use a **Splash/AuthGuard** screen to centralize authentication and navigation decisions.
- Keep widget updates in a dedicated `WidgetService`; avoid updating widgets directly from feature screens.
- Expose only a minimal native bridge (`updateWidget`, `reloadWidget`, `clearWidget`) and keep platform-specific logic on the native side.
- Clear sensitive widget data on logout and refresh widgets only when relevant data changes.