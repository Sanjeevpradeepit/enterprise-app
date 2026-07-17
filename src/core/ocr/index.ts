export * from './constants';

export * from './types';

export * from './permissions';

export * from './camera.service';

export * from './ocr.service';

export * from './parser.service';

export * from './document.service';


// Example Usage
// Scan Resume
// import { documentService } from '@/core/ocr';

// const result =
//   await documentService.scanResume();

// if (result) {
//   console.log(result.candidate);

//   /**
//    * {
//    *   name,
//    *   email,
//    *   phone,
//    *   skills,
//    *   experience
//    * }
//    */

//   navigation.navigate(
//     'CreateCandidate',
//     {
//       candidate: result.candidate,
//     },
//   );
// }
// Scan Business Card
// const result =
//   await documentService.scanBusinessCard();

// if (result) {
//   console.log(result.contact);

//   navigation.navigate(
//     'CreateContact',
//     {
//       contact: result.contact,
//     },
//   );
// }
// Enterprise Runtime Flow
// User taps "Scan Resume"
//           │
//           ▼
// cameraService.capture()
//           │
//           ▼
// Image Captured
//           │
//           ▼
// ocrService.recognize()
//           │
//           ▼
// Raw OCR Text
//           │
//           ▼
// parserService.parseResume()
//           │
//           ▼
// Candidate Model
//           │
//           ▼
// Candidate Form
//           │
//           ▼
// Recruiter Reviews
//           │
//           ▼
// Save Candidate