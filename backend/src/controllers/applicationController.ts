import { Request, Response } from 'express';
import Application from '../models/Application.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getApplications = asyncHandler(async (req: Request, res: Response) => {
  const applications = await Application.find().populate('user scheme').exec();
  res.json({
    message: 'Applications retrieved successfully',
    data: applications
  });
});

export const getApplicationById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const application = await Application.findById(id).populate('user scheme').exec();
  
  if (!application) {
    res.status(404).json({ message: 'Application not found' });
    return;
  }
  
  res.json({
    message: 'Application retrieved successfully',
    data: application
  });
});

export const createApplication = asyncHandler(async (req: Request, res: Response) => {
  const { userId, schemeId } = req.body;
  
  const application = new Application({
    user: userId,
    scheme: schemeId,
    status: 'Draft',
    documents: [],
    notes: ''
  });
  
  await application.save();
  await application.populate('user scheme');
  
  res.status(201).json({
    message: 'Application created successfully',
    data: application
  });
});

export const uploadIncomeProof = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { documentName, documentUrl } = req.body;
  
  if (!documentName || !documentUrl) {
    res.status(400).json({ message: 'Document name and URL are required' });
    return;
  }
  
  const application = await Application.findById(id);
  
  if (!application) {
    res.status(404).json({ message: 'Application not found' });
    return;
  }
  
  application.documents.push({
    name: documentName,
    url: documentUrl,
    verified: false
  });
  
  await application.save();
  
  res.status(201).json({
    message: 'Income proof uploaded successfully',
    data: application
  });
});

export const scheduleAppointment = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { appointmentDate, appointmentTime, notes: appointmentNotes } = req.body;
  
  if (!appointmentDate || !appointmentTime) {
    res.status(400).json({ message: 'Appointment date and time are required' });
    return;
  }
  
  const application = await Application.findByIdAndUpdate(
    id,
    {
      $set: {
        'appointment.date': appointmentDate,
        'appointment.time': appointmentTime,
        'appointment.notes': appointmentNotes || ''
      }
    },
    { new: true }
  ).populate('user scheme');
  
  if (!application) {
    res.status(404).json({ message: 'Application not found' });
    return;
  }
  
  res.status(200).json({
    message: 'Appointment scheduled successfully',
    data: application
  });
});

export const reviewCaseNotes = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { caseNotes, status } = req.body;
  
  const updateData: any = {};
  if (caseNotes) updateData.notes = caseNotes;
  if (status) updateData.status = status;
  
  const application = await Application.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true }
  ).populate('user scheme');
  
  if (!application) {
    res.status(404).json({ message: 'Application not found' });
    return;
  }
  
  res.status(200).json({
    message: 'Case notes updated successfully',
    data: application
  });
});

export const updateApplicationStatus = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  
  if (!['Draft', 'Submitted', 'Under Review', 'Approved', 'Rejected'].includes(status)) {
    res.status(400).json({ message: 'Invalid status' });
    return;
  }
  
  const application = await Application.findByIdAndUpdate(
    id,
    { status, ...(status === 'Submitted' && { submittedAt: new Date() }) },
    { new: true }
  ).populate('user scheme');
  
  if (!application) {
    res.status(404).json({ message: 'Application not found' });
    return;
  }
  
  res.status(200).json({
    message: 'Application status updated successfully',
    data: application
  });
});

export const deleteApplication = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const application = await Application.findByIdAndDelete(id);
  
  if (!application) {
    res.status(404).json({ message: 'Application not found' });
    return;
  }
  
  res.status(200).json({
    message: 'Application deleted successfully'
  });
});
