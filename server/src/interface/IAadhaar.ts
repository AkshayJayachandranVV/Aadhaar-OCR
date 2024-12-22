export interface UploadedFiles {
    aadharFront?: Express.Multer.File[];
    aadharBack?: Express.Multer.File[];
  }

  export  interface AadhaarInfo {
    dob: string | null;
    aadhaarNumber: string | null;
    gender: string | null;
    name: string | null;
    address: string | null;
  }