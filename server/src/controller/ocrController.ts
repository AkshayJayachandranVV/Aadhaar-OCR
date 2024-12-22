import { Request, Response } from 'express';
import {UploadedFiles,AadhaarInfo} from '../interface/IAadhaar'
import  {extractTextFromImage} from '../utils/tesseract'
import extractAadharDetails from '../utils/extractAadhaarDetails';
import AadharModel from '../model/aadhaarInfo'
const ocrController = async (req:Request,res:Response): Promise<void>  => {
    try {
        
        console.log('entered fetchdata')

        const files = req.files as UploadedFiles;

        // Access the uploaded files from memory (Buffer)
        const frontFile = files['aadharFront'] ? files['aadharFront'][0].buffer : null;
        const backFile = files['aadharBack'] ? files['aadharBack'][0].buffer : null;
    
        // Check if both files are uploaded
        if (!frontFile || !backFile) {
          res.status(400).json({ error: 'Both Aadhaar front and back images are required.' });
          return
        }
    
        // Log the buffers (useful for debugging)
        console.log('Front file buffer:', frontFile);
        console.log('Back file buffer:', backFile);


        const frontData = await extractTextFromImage(frontFile);
        const backData = await extractTextFromImage(backFile);

        console.log("extract front:",frontData)
        console.log("extract back:",backData)

        console.log("extract front:",frontData)
        const response = await extractAadharDetails(frontData,backData)
        console.log(response)
        if (response.data) {
            const savedData = await saveDetails(response.data);
            res.status(201).json({ message: 'Aadhaar details saved successfully', data: savedData });
        } else {
            res.status(400).json({ error: 'Failed to extract Aadhaar details.' });
        }

    } catch (error) {
        console.log('Error in the orc controller ->', error);
    }
}


const saveDetails = async (aadhaarData:AadhaarInfo) => {
    try {
        
        console.log('entered saveDetails')
        
        const existingRecord = await AadharModel.findOne({ aadhaarNumber: aadhaarData.aadhaarNumber });
        if (existingRecord) {
            console.log('Aadhaar number already exists.');
            return { message: 'Aadhaar details already exist', data: existingRecord };
        }
  
        const newAadhaar = new AadharModel({
            name: aadhaarData.name,
            dob: aadhaarData.dob,
            gender: aadhaarData.gender,
            aadhaarNumber: aadhaarData.aadhaarNumber,
            address: aadhaarData.address,
        });

        // Save the document to the database
        const savedDocument = await newAadhaar.save();
        console.log('Saved Aadhaar details:', savedDocument);

        return savedDocument;
        
    } catch (error) {
        console.log('Error in the orc controller ->', error);
    }
}





export default ocrController