# Enterprise React Native WebSocket Architecture

This document describes a production-ready WebSocket architecture for an enterprise React Native application. The goal is to provide a scalable, maintainable, and secure real-time communication layer that can support chat, notifications, live dashboards, presence indicators, and other real-time features.

---

# Priority in Core Architecture

Recommended implementation order:

- ✅ Theme
- ✅ Authentication
- ✅ API Layer (Axios)
- ✅ Secure Storage (MMKV / Keychain)
- ✅ OTA Updates
- ✅ Analytics
- ✅ Crash Reporting
- ✅ Push Notifications (FCM)
- ✅ WebSocket
- ✅ Offline Sync
- ✅ Background Tasks

---

# Folder Structure

```text
src/
└── core/
    └── websocket/
        ├── websocket.service.ts
        ├── websocket.listener.ts
        ├── websocket.manager.ts
        ├── reconnect.service.ts
        ├── heartbeat.service.ts
        ├── message.handler.ts
        ├── event-emitter.ts
        ├── constants.ts
        ├── types.ts
        └── index.ts
```

---

# Responsibilities

## websocket.service.ts

Responsible for the actual WebSocket connection.

Responsibilities

- Connect
- Disconnect
- Send messages
- Receive messages
- Serialize payloads
- Parse incoming payloads

---

## websocket.manager.ts

Singleton connection manager.

Responsibilities

- Maintain one socket connection
- Prevent duplicate connections
- Maintain connection state
- Connect after login
- Disconnect on logout

---

## reconnect.service.ts

Responsible for automatic reconnection.

Responsibilities

- Exponential backoff
- Retry limits
- Connection timeout
- Internet recovery
- Retry scheduling

Example

```
1 sec

2 sec

4 sec

8 sec

16 sec
```

---

## heartbeat.service.ts

Responsible for connection health.

Responsibilities

- Send Ping
- Receive Pong
- Detect stale connection
- Reconnect if heartbeat fails

Flow

```
Ping

↓

Pong

↓

Connection Healthy

↓

Continue

OR

Ping Timeout

↓

Reconnect
```

---

## message.handler.ts

Routes incoming events.

Responsibilities

- Parse event
- Route to feature
- Update stores
- Trigger listeners

Supported events

```
CHAT_MESSAGE

CHAT_TYPING

NOTIFICATION

JOB_UPDATED

PROFILE_UPDATED

SYSTEM_ALERT

ONLINE_USERS
```

---

## websocket.listener.ts

Public listener API.

Example

```ts
socket.on('chat');

socket.on('notification');

socket.on('typing');

socket.on('job');

socket.on('profile');
```

---

## event-emitter.ts

Internal event bus.

```
WebSocket

      │

      ▼

EventEmitter

      │

      ▼

Business Logic

      │

      ▼

UI
```

Screens never communicate directly with WebSocket.

Everything goes through the event emitter.

---

# Runtime Flow

```
Login Success

      │

      ▼

Access Token

      │

      ▼

websocketManager.connect()

      │

      ▼

Authenticated WebSocket

      │

      ▼

Heartbeat Started

      │

      ▼

Register Listeners

      │

      ├───────────────┐
      │               │
      ▼               ▼

Chat Event     Notification Event

      │               │

      ▼               ▼

Update Store    Badge Count

      │               │

      ▼               ▼

Refresh UI      Show Notification
```

---

# Authentication

After login:

```
JWT Token

      │

      ▼

wss://api.example.com/ws
Authorization: Bearer <JWT>
```

or

```
wss://api.example.com/ws?token=<JWT>
```

The backend validates the JWT before accepting the WebSocket connection.

---

# Backend Architecture (NestJS)

```
Mobile App

      │

      ▼

API Gateway

      │

      ▼

WebSocket Gateway

      │

      ▼

JWT Authentication

      │

      ▼

Redis Adapter

      │

      ▼

RabbitMQ

      │

      ▼

Microservices

      │

      ▼

Connected Clients
```

---

# Event Flow

```
Microservice

      │

      ▼

RabbitMQ

      │

      ▼

WebSocket Gateway

      │

      ▼

Connected User

      │

      ▼

message.handler.ts

      │

      ▼

Store Update

      │

      ▼

React Components
```

---

# Connection Lifecycle

```
App Launch

      │

      ▼

Initialize WebSocket Module

      │

      ▼

User Login

      │

      ▼

Connect Socket

      │

      ▼

Authenticated

      │

      ▼

Heartbeat

      │

      ▼

Listen Events

      │

      ▼

Auto Reconnect

      │

      ▼

Logout

      │

      ▼

Disconnect
```

---

# Initialization

Initialize once inside Providers.

```tsx
useEffect(() => {
    websocketManager.initialize();
}, []);
```

The initialization should only prepare the module.

Do **NOT** connect here.

---

# Login Flow

```
Email Login

      │

      ▼

JWT Received

      │

      ▼

tokenService.saveAccessToken()

      │

      ▼

websocketManager.connect()

      │

      ▼

Connected
```

---

# Logout Flow

```
Logout

      │

      ▼

Disconnect WebSocket

      │

      ▼

Remove Listeners

      │

      ▼

Clear Queue

      │

      ▼

Remove Tokens
```

---

# Offline Queue

If the socket is unavailable, outgoing messages should be queued.

```
Send Message

      │

Socket Connected?

      │

 ┌────┴─────┐
 │          │

Yes         No

 │          │

 ▼          ▼

Send      Queue Message

            │

            ▼

Reconnect

            │

            ▼

Flush Queue
```

---

# Connection States

```text
DISCONNECTED

CONNECTING

CONNECTED

RECONNECTING

AUTHENTICATING

FAILED
```

---

# Message Types

```text
AUTHENTICATED

PING

PONG

CHAT_MESSAGE

CHAT_TYPING

CHAT_READ

NOTIFICATION

JOB_CREATED

JOB_UPDATED

PROFILE_UPDATED

SYSTEM_ALERT

ONLINE_USERS

LOGOUT
```

---

# Security

- JWT authentication
- Token expiration handling
- Automatic reconnect after token refresh
- TLS (`wss://`)
- Validate incoming events
- Ignore malformed payloads
- Server-side authorization

---

# Logging

Every connection event should be logged.

Example

```
Socket Connected

Socket Disconnected

Reconnect Attempt

Authentication Success

Authentication Failed

Ping

Pong

Incoming Event

Outgoing Event

Connection Error
```

---

# Enterprise Best Practices

- Use a singleton connection manager
- Never create multiple WebSocket connections
- Connect only after authentication
- Disconnect on logout
- Implement heartbeat (Ping/Pong)
- Use exponential backoff for reconnection
- Queue outgoing messages while offline
- Route all messages through a central handler
- Keep UI independent of WebSocket implementation
- Validate every incoming payload
- Log connection lifecycle events
- Secure communication using `wss://`

---

# Final Architecture

```text
src/
└── core/
    ├── api/
    ├── analytics/
    ├── auth/
    ├── biometric/
    ├── crash/
    ├── logger/
    ├── network/
    ├── notification/
    ├── ota/
    ├── storage/
    └── websocket/
        ├── websocket.service.ts
        ├── websocket.manager.ts
        ├── websocket.listener.ts
        ├── reconnect.service.ts
        ├── heartbeat.service.ts
        ├── message.handler.ts
        ├── event-emitter.ts
        ├── constants.ts
        ├── types.ts
        └── index.ts
```

---

# Summary

This architecture provides:

- Secure JWT-authenticated WebSocket connections
- Automatic reconnection with exponential backoff
- Heartbeat (Ping/Pong) monitoring
- Event-driven message routing
- Offline message queueing
- Centralized connection management
- Scalable event handling
- Separation of concerns
- Enterprise-ready real-time communication suitable for chat, notifications, presence, dashboards, and collaborative applications.