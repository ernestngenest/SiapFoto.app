const request = require('supertest');
const app = require('../app'); // Assuming your Express app is in ../app
const { Image } = require('../models');
const fal = require('@fal-ai/serverless-client');
const nodemailer = require('nodemailer');
const fs = require('fs');

jest.mock('@fal-ai/serverless-client');
jest.mock('imgbox');
jest.mock('nodemailer');
jest.mock('axios');
jest.mock('fs', () => ({
  readdirSync: jest.fn().mockReturnValue([]), // Mock fs.readdirSync
  readFileSync: jest.fn()
}));

describe('ImageController', () => {
  describe('POST /images', () => {
    it('should upload and process an image successfully', async () => {
      const mockFile = Buffer.from('mock image file');
      const mockBase64Uri = 'data:image/jpeg;base64,somebase64string';
      const mockFalResponse = { image: { url: 'https://mock.fal.ai/image.jpg' } };
      const mockImgboxResponse = { files: [{ original_url: 'https://mock.imgbox.com/image.jpg' }] };

      fal.subscribe.mockResolvedValue(mockFalResponse);
      require('imgbox').mockResolvedValue(mockImgboxResponse);
      fs.readFileSync.mockReturnValue(JSON.stringify([{ prompt: 'mockPrompt', base: 'mockBase64', composition: 'mockComposition', style: 'mockStyle' }]));

      const response = await request(app)
        .post('/images')
        .set('Authorization', `Bearer mockToken`) // Add token for authorization
        .attach('photo', mockFile, 'mockImage.jpg') // Simulate file upload
        .field('imgtype', 'male'); // Additional form fields

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('imgBoxUrl', 'https://mock.imgbox.com/image.jpg');
    });

    it('should return error if no file is uploaded', async () => {
      const response = await request(app)
        .post('/images')
        .set('Authorization', `Bearer mockToken`);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('unknown file');
    });
  });

  describe('DELETE /images/:id', () => {
    it('should delete an image by id', async () => {
      const mockImage = { id: 1, destroy: jest.fn() };
      Image.findByPk = jest.fn().mockResolvedValue(mockImage);

      const response = await request(app)
        .delete('/images/1')
        .set('Authorization', `Bearer mockToken`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Success Delete');
      expect(mockImage.destroy).toHaveBeenCalled();
    });

    it('should return error if image is not found', async () => {
      Image.findByPk = jest.fn().mockResolvedValue(null);

      const response = await request(app)
        .delete('/images/999')
        .set('Authorization', `Bearer mockToken`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Image Not Found');
    });
  });

  describe('GET /images', () => {
    it('should get all images for the logged-in user', async () => {
      const mockImages = [{ id: 1, imgUrl: 'https://mock.img.com' }];
      Image.findAll = jest.fn().mockResolvedValue(mockImages);

      const response = await request(app)
        .get('/images')
        .set('Authorization', `Bearer mockToken`);

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0]).toHaveProperty('imgUrl', 'https://mock.img.com');
    });
  });

  describe('GET /images/:id', () => {
    it('should get an image by id', async () => {
      const mockImage = { id: 1, imgUrl: 'https://mock.img.com' };
      Image.findOne = jest.fn().mockResolvedValue(mockImage);

      const response = await request(app)
        .get('/images/1')
        .set('Authorization', `Bearer mockToken`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('imgUrl', 'https://mock.img.com');
    });

    it('should return error if image is not found', async () => {
      Image.findOne = jest.fn().mockResolvedValue(null);

      const response = await request(app)
        .get('/images/999')
        .set('Authorization', `Bearer mockToken`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('not found');
    });
  });

  describe('POST /images/:id/email', () => {
    it('should send an email with the image attachment', async () => {
      const mockImage = { id: 1, imgUrl: 'https://mock.img.com' };
      const mockUser = { name: 'Mock User', email: 'mockuser@example.com' };
      const mockTransporter = { sendMail: jest.fn().mockResolvedValue(true) };

      Image.findByPk = jest.fn().mockResolvedValue(mockImage);
      nodemailer.createTransport.mockReturnValue(mockTransporter);
      
      const response = await request(app)
        .post('/images/1/email')
        .set('Authorization', `Bearer mockToken`)
        .send({ user: mockUser });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Email sent successfully with the image attachment.');
      expect(mockTransporter.sendMail).toHaveBeenCalled();
    });
  });
});
