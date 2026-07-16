# Push Notification Architecture (Enterprise React Native)

## Overview

In an enterprise React Native application, push notifications should **not** be handled inside the authentication feature or individual screens.

Push notifications are a **cross-cutting concern** used throughout the application and should live inside the **core** layer.

This keeps the implementation:

- Modular
- Reusable
- Testable
- Easy to maintain
- Easy to replace (FCM → APNS → OneSignal, etc.)

---

# Folder Structure

```text
src/

core/

    notification/

        firebase.ts
        notification.service.ts
        push.service.ts
        permissions.ts
        device-token.service.ts

        handlers/

            foreground.ts
            background.ts
            opened.ts
            initial.ts

        listeners/

            token.listener.ts
            message.listener.ts

        constants.ts
        types.ts
        index.ts
```

---

# Responsibilities

## firebase.ts

Responsible only for Firebase Cloud Messaging (FCM).

Responsibilities

- Initialize Firebase
- Get FCM Token
- Delete FCM Token
- Subscribe to Topic
- Unsubscribe from Topic

Example

```ts
initializeFirebase()

getToken()

deleteToken()

subscribeTopic(topic)

unsubscribeTopic(topic)
```

---

## permissions.ts

Responsible only for notification permissions.

Responsibilities

- Request notification permission
- Check permission status

Example

```ts
requestNotificationPermission()

hasPermission()
```

---

## push.service.ts

Responsible only for local notifications (Notifee).

Responsibilities

- Display notification
- Cancel notification
- Cancel all notifications
- Badge count
- Android notification channels
- iOS notification categories

Example

```ts
showNotification()

cancelNotification()

cancelAll()

setBadgeCount()
```

---

## notification.service.ts

This is the **main entry point**.

Everything starts here.

Responsibilities

- Initialize Firebase
- Request permissions
- Register the device
- Retrieve the FCM token
- Listen for token refresh
- Register foreground listeners
- Register background listeners
- Handle notification taps
- Handle deep links

Flow

```text
initialize()

    │

    ▼

Firebase

    │

    ▼

Permissions

    │

    ▼

Get FCM Token

    │

    ▼

Register Device

    │

    ▼

Register Listeners

    │

    ▼

Application Ready
```

---

# Device Token Service

Keep the FCM token separate from authentication tokens.

```text
core/

storage/

    token.service.ts

notification/

    device-token.service.ts
```

Responsibilities

```ts
saveFCMToken()

getFCMToken()

deleteFCMToken()
```

---

# Notification Handlers

## foreground.ts

Runs when the application is currently open.

Flow

```text
Notification Received

        │

        ▼

Display Local Notification

        │

        ▼

Update Store

        │

        ▼

Refresh Badge Count
```

Responsibilities

- Show notification
- Update Redux/Zustand
- Refresh unread count
- Refresh badge count

---

## background.ts

Runs while the application is minimized.

Flow

```text
Receive FCM

        │

        ▼

Save Data

        │

        ▼

Synchronize

        │

        ▼

Schedule Local Notification
```

Responsibilities

- Save payload
- Synchronize local cache
- Schedule notification
- Update badge count

---

## opened.ts

Runs when the user taps a notification.

Flow

```text
Notification Tap

        │

        ▼

Read Payload

        │

        ▼

Navigate

        │

        ▼

Open Screen
```

Possible destinations

- Chat
- Job
- Profile
- Notification Details
- Settings

---

## initial.ts

Runs when the application is launched by tapping a notification while the application was completely closed.

Flow

```text
App Killed

        │

        ▼

Tap Notification

        │

        ▼

Read Initial Notification

        │

        ▼

Navigate
```

---

# Notification Listeners

## token.listener.ts

Runs whenever Firebase refreshes the device token.

Flow

```text
Token Changed

        │

        ▼

Update Local Storage

        │

        ▼

Update Backend
```

Responsibilities

- Save new FCM token
- Call backend API
- Replace previous device token

---

## message.listener.ts

Runs whenever a foreground notification arrives.

Flow

```text
Foreground Notification

        │

        ▼

Update Store

        │

        ▼

Refresh Badge

        │

        ▼

Show Toast

        │

        ▼

Display Local Notification
```

---

# Provider Initialization

Initialize notifications only once.

Example

```tsx
useEffect(() => {
    notificationService.initialize();
}, []);
```

Application startup

```text
App

    │

    ▼

Providers

    │

    ├── OTA.initialize()

    ├── Analytics.initialize()

    ├── Crash.initialize()

    ├── Notification.initialize()

    └── ThemeProvider
```

---

# Enterprise Notification Flow

```text
App Starts

        │

        ▼

notificationService.initialize()

        │

        ▼

Request Permission

        │

        ▼

Get FCM Token

        │

        ▼

Register Token with Backend

        │

        ▼

Start Listening

        │

        ▼

────────────────────────────────────

Foreground

        │

        ▼

Show Local Notification

────────────────────────────────────

Background

        │

        ▼

Background Handler

────────────────────────────────────

Notification Tap

        │

        ▼

Navigate Screen
```

---

# Backend Flow

```text
NestJS

Notification Service

        │

        ▼

Firebase Cloud Messaging

        │

        ▼

Android / iOS Device

        │

        ▼

Foreground Handler

OR

Background Handler

        │

        ▼

Notification Click

        │

        ▼

Navigation
```

---

# Token Storage Strategy

Separate authentication tokens from notification tokens.

```text
core/

storage/

    token.service.ts

        Access Token

        Refresh Token

notification/

    device-token.service.ts

        FCM Token
```

Example

```ts
tokenService.saveAccessToken()

tokenService.saveRefreshToken()

deviceTokenService.saveFCMToken()
```

---

# Complete Architecture

```text
core/

├── api/

├── analytics/

├── auth/

├── biometric/

├── crash/

├── logger/

├── network/

├── ota/

├── storage/

└── notification/

    ├── firebase.ts

    ├── notification.service.ts

    ├── push.service.ts

    ├── permissions.ts

    ├── device-token.service.ts

    ├── handlers/

    │   ├── foreground.ts

    │   ├── background.ts

    │   ├── opened.ts

    │   └── initial.ts

    ├── listeners/

    │   ├── token.listener.ts

    │   └── message.listener.ts

    ├── constants.ts

    ├── types.ts

    └── index.ts
```

---

# Best Practices

- Initialize notification services only once in the application lifecycle.
- Store authentication tokens separately from FCM device tokens.
- Keep Firebase-specific code isolated in `firebase.ts`.
- Handle notification permissions in a dedicated module.
- Separate foreground, background, and notification tap logic into independent handlers.
- Register token refresh listeners to keep the backend synchronized.
- Route notification taps through a central navigation service instead of directly from screens.
- Use local notifications (e.g., Notifee) to provide a consistent user experience while the app is in the foreground.
- Keep notification logic independent from feature modules so it can be reused across the entire application.

---

# Summary

This architecture separates responsibilities into dedicated modules:

- **firebase.ts** → Firebase Cloud Messaging integration
- **permissions.ts** → Notification permission management
- **push.service.ts** → Local notification display
- **notification.service.ts** → Application entry point for notifications
- **device-token.service.ts** → FCM token persistence
- **handlers/** → Foreground, background, and notification click handling
- **listeners/** → FCM token and message listeners

This modular structure is scalable, maintainable, and well suited for enterprise React Native applications that use Firebase Cloud Messaging and local notifications.