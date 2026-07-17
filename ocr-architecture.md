# OCR (Optical Character Recognition) Architecture

## Overview

OCR (Optical Character Recognition) allows a React Native application to use the device camera to scan printed documents such as resumes, business cards, invoices, or ID cards and automatically extract text into structured data.

Instead of manually typing information, OCR recognizes text from the captured image and pre-fills application forms for review.

---

# Benefits

- Reduce manual data entry
- Faster candidate onboarding
- Improve recruiter productivity
- Reduce typing errors
- Better user experience
- Support document digitization

---

# Resume Scanning Flow

```text
Recruiter
     │
     ▼
Tap "Scan Resume"
     │
     ▼
Open Camera
     │
     ▼
Capture Resume
     │
     ▼
OCR Engine Reads Text
     │
     ▼
Extract Candidate Information
     │
     ▼
Auto-fill Candidate Form
     │
     ▼
Recruiter Reviews
     │
     ▼
Save Candidate
```

---

# Example: Resume

## Printed Resume

```text
John Smith

Senior Software Engineer

Email:
john@gmail.com

Phone:
+1 9876543210

Skills
React
Node.js
AWS

Experience
8 Years
```

---

## OCR Extracted Result

```json
{
  "name": "John Smith",
  "email": "john@gmail.com",
  "phone": "+1 9876543210",
  "skills": [
    "React",
    "Node.js",
    "AWS"
  ],
  "experience": "8 Years"
}
```

---

## Candidate Form

The application automatically opens the candidate creation screen.

```text
Name
───────────────
John Smith

Email
───────────────
john@gmail.com

Phone
───────────────
+1 9876543210

Skills
───────────────
React
Node.js
AWS

Experience
───────────────
8 Years
```

The recruiter only reviews the extracted data before saving.

---

# Business Card Scanning Flow

```text
Recruiter
     │
     ▼
Tap "Scan Business Card"
     │
     ▼
Open Camera
     │
     ▼
Capture Business Card
     │
     ▼
OCR Engine
     │
     ▼
Extract Contact Information
     │
     ▼
Auto-fill Contact Form
     │
     ▼
Save Contact
```

---

# Example: Business Card

```text
Jane Doe

HR Manager

ABC Technologies

jane@abc.com

+91 9876543210
```

---

## OCR Result

```json
{
  "name": "Jane Doe",
  "designation": "HR Manager",
  "company": "ABC Technologies",
  "email": "jane@abc.com",
  "phone": "+91 9876543210"
}
```

---

# Enterprise Folder Structure

```text
src/
└── core/
    └── ocr/
        ├── camera.service.ts
        ├── ocr.service.ts
        ├── parser.service.ts
        ├── document.service.ts
        ├── permissions.ts
        ├── constants.ts
        ├── types.ts
        └── index.ts
```

---

# Responsibilities

## camera.service.ts

Responsible for:

- Open device camera
- Capture image
- Select image from gallery (optional)
- Compress image
- Return image path

No OCR logic belongs here.

---

## ocr.service.ts

Responsible for:

- Perform OCR
- Convert image into text
- Call ML Kit / Vision API
- Return raw extracted text

No parsing logic.

---

## parser.service.ts

Responsible for converting OCR text into structured models.

Example:

Raw Text

```text
John Smith

john@gmail.com

React

Node

AWS
```

↓

Structured Object

```json
{
  "name": "John Smith",
  "email": "john@gmail.com",
  "skills": [
    "React",
    "Node",
    "AWS"
  ]
}
```

---

## document.service.ts

Main orchestrator.

Responsibilities

- Capture image
- Run OCR
- Parse extracted text
- Return structured document

Flow

```text
Capture Image

      │

      ▼

OCR

      │

      ▼

Parser

      │

      ▼

Candidate Model
```

---

## permissions.ts

Responsible for

- Camera permission
- Gallery permission
- Open device settings

Nothing else.

---

## constants.ts

Contains

- OCR configuration
- Supported document types
- Maximum image size
- Compression quality

Example

```ts
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

export const IMAGE_QUALITY = 0.8;

export const OCR_LANGUAGE = 'en';
```

---

## types.ts

Contains interfaces

Example

```ts
export interface CandidateOCR {
  name?: string;
  email?: string;
  phone?: string;
  skills?: string[];
  experience?: string;
}

export interface BusinessCardOCR {
  name?: string;
  designation?: string;
  company?: string;
  email?: string;
  phone?: string;
}
```

---

# Runtime Flow

```text
User
     │
     ▼
Tap Scan
     │
     ▼
Camera Opens
     │
     ▼
Capture Image
     │
     ▼
OCR Service
     │
     ▼
Extract Raw Text
     │
     ▼
Parser Service
     │
     ▼
Structured Object
     │
     ▼
Candidate Form
     │
     ▼
Review
     │
     ▼
Save
```

---

# Backend Flow

```text
React Native

      │

      ▼

OCR Module

      │

      ▼

Candidate Object

      │

      ▼

REST API

      │

      ▼

API Gateway

      │

      ▼

Candidate Service

      │

      ▼

PostgreSQL
```

---

# Enterprise OCR Pipeline

```text
Camera

      │

      ▼

Captured Image

      │

      ▼

OCR Engine

      │

      ▼

Extracted Text

      │

      ▼

Parser

      │

      ▼

Structured JSON

      │

      ▼

Validation

      │

      ▼

Candidate Form

      │

      ▼

Save
```

---

# Supported Document Types

The same OCR module can support multiple document types.

- Resume
- Business Card
- Passport
- Driver's License
- Employee ID Card
- Invoice
- Receipt
- Contract
- Certificates
- Offer Letter

---

# Recommended OCR Libraries

| Purpose | Library |
|----------|----------|
| Camera | react-native-vision-camera |
| OCR (On-device) | Google ML Kit Text Recognition |
| OCR (Cloud) | Google Cloud Vision API |
| OCR (Cloud) | Azure AI Vision |
| OCR (Cloud) | AWS Textract |
| AI-powered Document Understanding | OpenAI Vision |

---

# Enterprise Use Cases

Recruitment

- Resume scanning
- Candidate onboarding
- Business card import

Human Resources

- Employee ID scanning
- Document verification

Finance

- Invoice OCR
- Receipt OCR
- Expense claims

Healthcare

- Patient forms
- Medical documents

Logistics

- Delivery documents
- Shipping labels

Insurance

- Claim forms
- Identity verification

---

# Enterprise Recommendations

For a production-ready React Native application:

- Keep camera functionality separate from OCR processing.
- Use an orchestrator (`document.service.ts`) to coordinate scanning and parsing.
- Parse OCR results into structured models before displaying them.
- Allow users to review and edit extracted information before saving.
- Support multiple document types using reusable parsers.
- Use on-device OCR for better privacy and offline support where possible.
- Integrate cloud-based OCR services for advanced document understanding when needed.

This modular architecture follows the Single Responsibility Principle (SRP), making the OCR feature scalable, reusable, and easy to maintain across large enterprise React Native applications.