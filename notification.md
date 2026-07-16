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




# Enterprise React Native Push Notification Architecture

## Overview

In an enterprise React Native application, push notification functionality should be isolated inside the **core** layer.

Notification logic should **not** be implemented inside:

- Authentication
- Home
- Chat
- Job
- Profile
- Individual screens

Notifications are a **cross-cutting concern** shared by the entire application.

Benefits:

- Single Responsibility Principle (SRP)
- Easy to maintain
- Easy to test
- Reusable
- Scalable
- Enterprise-ready architecture

---

# Folder Structure

```text
src/

core/

└── notification/

    ├── constants.ts
    ├── types.ts
    ├── index.ts

    ├── firebase.ts
    ├── permissions.ts
    ├── notification.service.ts
    ├── push.service.ts
    ├── device-token.service.ts

    ├── handlers/

    │   ├── foreground.ts
    │   ├── background.ts
    │   ├── opened.ts
    │   └── initial.ts

    └── listeners/

        ├── token.listener.ts
        └── message.listener.ts
```

---

# Module Responsibilities

## firebase.ts

This file is a thin wrapper around **Firebase Cloud Messaging (FCM)**.

It should contain **only Firebase SDK calls**.

Responsibilities

- Initialize Firebase
- Get FCM Token
- Delete FCM Token
- Subscribe to Topic
- Unsubscribe from Topic
- Listen for foreground messages
- Listen for token refresh
- Listen for notification open events
- Read the initial notification

Example

```ts
initializeFirebase()

getToken()

deleteToken()

subscribeTopic()

unsubscribeTopic()

onMessage()

onTokenRefresh()

onNotificationOpenedApp()

getInitialNotification()
```

> **No business logic belongs here.**

---

## permissions.ts

Responsible only for requesting notification permissions.

Responsibilities

- Request permission
- Check current permission status

Example

```ts
requestPermission()

hasPermission()
```

Nothing else.

---

## device-token.service.ts

Responsible only for storing the device's FCM token.

The implementation can use MMKV.

Responsibilities

```ts
saveToken()

getToken()

removeToken()
```

Example

```text
FCM Token

↓

MMKV Storage

↓

Read Later
```

No Firebase SDK code belongs here.

---

## push.service.ts

Responsible only for local notifications.

Uses **Notifee**.

Responsibilities

```text
Create Notification Channel

↓

Show Notification

↓

Cancel Notification

↓

Cancel All Notifications

↓

Set Badge Count

↓

Clear Badge Count
```

Example

```ts
createChannel()

show()

cancel()

cancelAll()

setBadge()

clearBadge()
```

No Firebase.

No listeners.

No API calls.

Only local notification functionality.

---

# Handlers

Handlers contain the application logic for notification events.

---

## foreground.ts

Runs while the application is open.

Flow

```text
FCM Message

        │

        ▼

Display Notification

        │

        ▼

Update Store

        │

        ▼

Update Badge
```

Example

```ts
export async function handleForeground(message) {

    await pushService.show(...);

    unreadStore.increment();

}
```

Responsibilities

- Display local notification
- Update Redux/Zustand
- Increase unread count
- Refresh badge

---

## background.ts

Runs while the application is in the background.

Flow

```text
FCM

        │

        ▼

Cache Data

        │

        ▼

Synchronize

        │

        ▼

Display Notification
```

Responsibilities

- Cache payload
- Sync local data
- Schedule notification
- Refresh badge

---

## opened.ts

Runs when the user taps a notification while the application is in the background.

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
- Notification Detail
- Settings

---

## initial.ts

Runs when the application was killed and launched by tapping a notification.

Flow

```text
Killed Application

        │

        ▼

Notification Tap

        │

        ▼

Read Initial Notification

        │

        ▼

Navigate
```

---

# Listeners

Listeners register Firebase events.

---

## token.listener.ts

Registers the Firebase token refresh listener.

Flow

```text
Firebase

        │

        ▼

New Device Token

        │

        ▼

Save Token

        │

        ▼

Update Backend
```

Example

```ts
firebase.onTokenRefresh(token => {

    deviceTokenService.saveToken(token);

    api.updateDeviceToken(token);

});
```

Responsibilities

- Save new token
- Replace old token
- Notify backend

---

## message.listener.ts

Registers the foreground message listener.

Flow

```text
Firebase

        │

        ▼

Foreground Message

        │

        ▼

handleForeground()
```

Responsibilities

- Listen for FCM messages
- Delegate handling to `foreground.ts`

---

# notification.service.ts

This is the **orchestrator**.

It coordinates every notification component.

It does **not** directly communicate with Firebase.

Instead, it delegates responsibilities to specialized modules.

Flow

```text
initialize()

        │

        ▼

Permissions

        │

        ▼

Firebase

        │

        ▼

Save Device Token

        │

        ▼

Register Listeners

        │

        ▼

Register Handlers
```

Example

```ts
class NotificationService {

    async initialize() {

        await requestPermission();

        await pushService.createChannel();

        const token = await firebase.getToken();

        await deviceTokenService.saveToken(token);

        registerMessageListener();

        registerTokenListener();

        registerOpenedHandler();

        registerInitialHandler();

        registerBackgroundHandler();

    }

}
```

Notice:

- No Firebase implementation
- No Notifee implementation
- No navigation logic

Everything is delegated.

---

# Providers Initialization

Notification initialization should happen **once** during application startup.

```tsx
useEffect(() => {

    notificationService.initialize();

}, []);
```

Nothing else is required inside Providers.

---

# Runtime Flow

```text
App Starts

        │

        ▼

notificationService.initialize()

        │

        ├────────────────────┐
        │                    │

        ▼                    ▼

Permission          Create Channel

        │

        ▼

Retrieve FCM Token

        │

        ▼

deviceTokenService.save()

        │

        ▼

Update Backend

        │

        ▼

Register Listeners

        │

 ┌──────┼───────────────┐

 │      │               │

 ▼      ▼               ▼

Foreground Background Notification Tap

 │           │               │

 ▼           ▼               ▼

Handler   Handler      Navigation
```

---

# Backend Flow

```text
NestJS Notification Service

            │

            ▼

Firebase Cloud Messaging

            │

            ▼

Android / iOS Device

            │

            ▼

firebase.ts

            │

            ▼

message.listener.ts

            │

            ▼

foreground.ts

            │

            ▼

push.service.ts

            │

            ▼

Display Notification
```

---

# Notification Lifecycle

```text
Backend

    │

    ▼

Firebase Cloud Messaging

    │

    ▼

Device

    │

    ▼

Firebase SDK

    │

    ▼

Listener

    │

    ▼

Handler

    │

    ▼

Push Service

    │

    ▼

Display Notification

    │

    ▼

User Interaction

    │

    ▼

Navigation
```

---

# Single Responsibility Principle

| File | Responsibility |
|------|----------------|
| **firebase.ts** | Firebase SDK wrapper (tokens, topics, message streams) |
| **permissions.ts** | Notification permission management |
| **push.service.ts** | Local notifications (Notifee) |
| **device-token.service.ts** | Persist the FCM token locally |
| **foreground.ts** | Handle notifications while the app is active |
| **background.ts** | Handle background notifications |
| **opened.ts** | Handle notification taps while the app is running/background |
| **initial.ts** | Handle app launch from a notification |
| **message.listener.ts** | Register foreground message listener |
| **token.listener.ts** | Register token refresh listener |
| **notification.service.ts** | Orchestrate initialization and wire all components together |

---

# Enterprise Best Practices

- Initialize notification services only once.
- Keep Firebase-specific code isolated.
- Keep Notifee-specific code isolated.
- Store the FCM token separately from authentication tokens.
- Delegate notification handling to dedicated handlers.
- Keep listeners responsible only for subscribing to events.
- Use the notification service as the single orchestration point.
- Keep feature modules independent of notification implementation.
- Handle navigation centrally instead of inside Firebase callbacks.
- Synchronize refreshed FCM tokens with the backend.

---

# Summary

This architecture provides a clean separation of concerns:

- **firebase.ts** → Firebase Cloud Messaging integration
- **permissions.ts** → Notification permission handling
- **device-token.service.ts** → Local FCM token storage
- **push.service.ts** → Local notifications using Notifee
- **handlers/** → Business logic for notification events
- **listeners/** → Firebase event registration
- **notification.service.ts** → Coordinates initialization and application-wide notification setup

This design follows the **Single Responsibility Principle**, is easy to test, and scales well for enterprise React Native applications.