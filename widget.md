# Enterprise React Native Home Widget Architecture

This document describes a production-ready Home Widget architecture for an enterprise React Native application. The design separates business logic from platform-specific widget rendering.

---

# Overview

A Home Screen Widget consists of two layers:

1. **React Native Layer**
   - Business logic
   - Widget data preparation
   - Native bridge communication

2. **Native Layer**
   - Android App Widget
   - iOS WidgetKit
   - Platform-specific rendering
   - Shared storage

The React Native application **does not render the widget**. It only sends data to the native implementation.

---

# Project Structure

```text
EnterpriseApp/

src/
└── core/
    └── widget/
        ├── widget.service.ts
        ├── widget.bridge.ts
        ├── widget.types.ts
        ├── widget.constants.ts
        ├── widget.storage.ts
        └── index.ts

ios/
├── EnterpriseApp/
│
└── Widgets/
    ├── WidgetBundle.swift
    ├── Widget.swift
    ├── Provider.swift
    ├── WidgetEntry.swift
    ├── WidgetStorage.swift
    ├── WidgetBridge.swift
    ├── Assets.xcassets/
    ├── Info.plist
    └── EnterpriseWidget.entitlements

android/
├── app/
│
├── widget/
│   ├── HomeWidget.kt
│   ├── WidgetProvider.kt
│   ├── WidgetBridgeModule.kt
│   ├── WidgetPackage.kt
│   ├── WidgetStorage.kt
│   ├── WidgetReceiver.kt
│   ├── WidgetUpdater.kt
│   └── WidgetWorker.kt
│
└── res/
    ├── layout/
    │   └── widget_layout.xml
    │
    ├── xml/
    │   └── widget_info.xml
    │
    └── drawable/
```

---

# Architecture Diagram

```text
                React Native
                     │
                     ▼
            Widget Service
                     │
                     ▼
            Widget Bridge
                     │
         ┌───────────┴───────────┐
         │                       │
         ▼                       ▼
     Android                 iOS WidgetKit
     Native Module           Native Module
         │                       │
         ▼                       ▼
SharedPreferences          App Groups Storage
         │                       │
         └───────────┬───────────┘
                     ▼
              Reload Widget
                     │
                     ▼
             Home Screen Widget
```

---

# Runtime Flow

```text
React Native
      │
      ▼
widgetService.update()
      │
      ▼
widget.bridge.ts
      │
      ▼
Native Module
      │
      ├───────────────┐
      │               │
      ▼               ▼
Android         iOS WidgetKit
      │               │
      ▼               ▼
Shared Storage (SharedPreferences / App Groups)
      │
      ▼
Reload Widget
      │
      ▼
Home Screen Widget
```

---

# React Native Layer

## widget.service.ts

Responsibilities:

- Business logic
- Update widget
- Refresh widget
- Clear widget
- Prepare widget data

---

## widget.bridge.ts

Responsibilities:

- React Native ↔ Native communication
- Invoke native methods
- Platform abstraction

---

## widget.storage.ts

Responsibilities:

- Optional JS cache
- Store latest widget state
- Offline support

---

## widget.types.ts

Responsibilities:

- Widget interfaces
- Widget models
- Type safety

---

## index.ts

Responsibilities:

- Export widget module

---

# iOS Architecture

```text
Widgets/
│
├── WidgetBundle.swift
├── Widget.swift
├── Provider.swift
├── WidgetEntry.swift
├── WidgetStorage.swift
├── WidgetBridge.swift
├── Assets.xcassets/
├── Info.plist
└── EnterpriseWidget.entitlements
```

---

# iOS Responsibilities

| File | Responsibility |
|------|----------------|
| WidgetBundle.swift | Register all widgets |
| Widget.swift | SwiftUI widget UI |
| Provider.swift | Timeline provider |
| WidgetEntry.swift | Widget model |
| WidgetStorage.swift | Read/write App Group storage |
| WidgetBridge.swift | React Native bridge |
| EnterpriseWidget.entitlements | Enable App Groups |

---

# Android Architecture

```text
widget/
│
├── HomeWidget.kt
├── WidgetProvider.kt
├── WidgetBridgeModule.kt
├── WidgetPackage.kt
├── WidgetStorage.kt
├── WidgetReceiver.kt
├── WidgetUpdater.kt
└── WidgetWorker.kt
```

---

# Android Responsibilities

| File | Responsibility |
|------|----------------|
| HomeWidget.kt | Update RemoteViews |
| WidgetProvider.kt | Widget lifecycle |
| WidgetBridgeModule.kt | React Native bridge |
| WidgetPackage.kt | Register bridge package |
| WidgetStorage.kt | SharedPreferences wrapper |
| WidgetReceiver.kt | Receive refresh broadcasts |
| WidgetUpdater.kt | Refresh helper |
| WidgetWorker.kt | Background updates |

---

# Login Flow

```text
User Login
      │
      ▼
Authentication API
      │
      ▼
Server Response
      │
      ├───────────────┐
      ▼               ▼
Access Token     Refresh Token
      │               │
      ▼               ▼
Store Token     Secure Storage
      │
      ▼
Load User Profile
      │
      ▼
widgetService.update()
      │
      ▼
Native Widget Updated
      │
      ▼
Home Screen
```

---

# Push Notification Flow

```text
Push Notification
       │
       ▼
Notification Handler
       │
       ▼
Unread Count Updated
       │
       ▼
widgetService.update()
       │
       ▼
Widget Bridge
       │
       ▼
Native Widget
       │
       ▼
Refresh Widget
```

---

# Logout Flow

```text
Logout
    │
    ▼
Clear Tokens
    │
    ▼
widgetService.clear()
    │
    ▼
Clear Native Storage
    │
    ▼
Reload Widget
    │
    ▼
Empty Widget
```

---

# Native Bridge Methods

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

# Widget Update Example

```ts
await widgetService.update({
  title: 'Welcome',
  subtitle: 'John Doe',
  message: 'You have 8 unread notifications',
  badge: 8,
});
```

---

# Clear Widget

```ts
await widgetService.clear();
```

---

# Enterprise Data Flow

```text
Backend
   │
   ▼
REST API
   │
   ▼
React Native
   │
   ▼
Widget Service
   │
   ▼
Widget Bridge
   │
   ▼
Native Storage
   │
   ▼
Widget Refresh
   │
   ▼
Home Screen Widget
```

---

# Best Practices

- Keep all business logic inside `widget.service.ts`.
- Keep native communication inside `widget.bridge.ts`.
- Never update widgets directly from feature screens.
- Cache the latest widget state to improve resilience.
- Store widget data using:
  - **Android:** SharedPreferences
  - **iOS:** App Groups
- Refresh widgets only when the displayed data changes.
- Clear widget content during logout to avoid exposing sensitive information.
- Keep platform-specific rendering in native code and React Native code platform-agnostic.

---

# Final Enterprise Structure

```text
src/
└── core/
    └── widget/
        ├── widget.service.ts
        ├── widget.bridge.ts
        ├── widget.types.ts
        ├── widget.constants.ts
        ├── widget.storage.ts
        └── index.ts

ios/
└── Widgets/
    ├── WidgetBundle.swift
    ├── Widget.swift
    ├── Provider.swift
    ├── WidgetEntry.swift
    ├── WidgetStorage.swift
    ├── WidgetBridge.swift
    ├── Assets.xcassets/
    ├── Info.plist
    └── EnterpriseWidget.entitlements

android/
└── widget/
    ├── HomeWidget.kt
    ├── WidgetProvider.kt
    ├── WidgetBridgeModule.kt
    ├── WidgetPackage.kt
    ├── WidgetStorage.kt
    ├── WidgetReceiver.kt
    ├── WidgetUpdater.kt
    └── WidgetWorker.kt
```

This architecture follows the **Single Responsibility Principle (SRP)** by keeping React Native responsible for business logic and native Android/iOS layers responsible for widget rendering, lifecycle management, and platform-specific storage. It scales well for enterprise applications and reusable React Native templates.