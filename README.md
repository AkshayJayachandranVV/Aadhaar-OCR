# Aadhar-OCR System

This **MERN** stack web application offers a seamless Optical Character Recognition (OCR) experience for Aadhaar card processing. Users can simply upload images of both the front and back of their Aadhaar card, and the app swiftly extracts crucial details like name, date of birth, and Aadhaar number using advanced OCR technology. The result? An efficient and user-friendly way to digitally manage Aadhaar information with precision and speed.



## Technologies Used

- **Frontend** : React.js
- **Backend** : Express.js (Node.js)
- **OCR Processing** : Tesseract.js
- **Styling** : Tailwind CSS

## Features

- **Image Upload** : Users can upload both the front and back of an Aadhaar card.
- **Image Display** : Uploaded images are displayed on the frontend.
- **OCR Processing**: The uploaded images are processed using Tesseract.js to extract information.
- **Data Display**: Extracted Aadhaar card information is displayed in a clean, organized format.

## OCR Processing

The application uses Tesseract.js for processing Aadhaar card images. This happens on the backend, where the images are sent via API calls to the Express server, processed using Tesseract.js, and the extracted information is returned to the frontend.

## Collect Environment Variables

Please contact the admin to collect the necessary environment variables required for the application to run. Create a `.env` file in the root of your project directory and populate it with the collected environment variables.


## Project Structure

The project is divided into two main directories :
frontend/: Contains the React frontend for user interaction and image uploads.
backend/: Contains the Express.js backend responsible for handling image uploads and performing OCR using Tesseract.js.

<!-- ## Installation

```bash

git clone https://github.com/darsandinesh/Aadhar-OCR.git

cd aadhaar-ocr
``` -->