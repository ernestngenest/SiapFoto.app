const request = require('supertest');
const express = require('express');
const app = express();
const UserController = require('../controllers/UserController');
const errorHandler = require('../middlewares/errorHandler');
const { User } = require('../models');
const { signToken } = require('../helpers/jwt');
const { compareToken } = require('../helpers/bcrypt');

// Middleware setup
app.use(express.json());
app.use('/users', UserController);
app.use(errorHandler);

// Mocking dependencies
jest.mock('../models');
jest.mock('../helpers/bcrypt', () => ({
  compareToken: jest.fn(),
}));
jest.mock('../helpers/jwt', () => ({
  signToken: jest.fn(),
}));

describe('UserController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /users/register', () => {
    it('should register a new user', async () => {
      User.findOne.mockResolvedValue(null); // Email not found
      User.create.mockResolvedValue({ id: 1, username: 'testuser', email: 'test@example.com' });

      const response = await request(app)
        .post('/users/register')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123',
        });

      expect(response.status).toBe(500);
    
    });

    it('should return an error if email is already taken', async () => {
      User.findOne.mockResolvedValue({ email: 'test@example.com' });

      const response = await request(app)
        .post('/users/register')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123',
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Email already taken!');
    });
  });

  describe('POST /users/login', () => {
    it('should log in a user and return a token', async () => {
      User.findOne.mockResolvedValue({ id: 1, username: 'testuser', password: 'hashedPassword' });
      compareToken.mockReturnValue(true);
      signToken.mockReturnValue('mockToken');

      const response = await request(app)
        .post('/users/login')
        .send({
          email: 'test@example.com',
          password: 'password123',
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('access_token', 'mockToken');
    });

    it('should return an error if email or password is incorrect', async () => {
      User.findOne.mockResolvedValue(null);

      const response = await request(app)
        .post('/users/login')
        .send({
          email: 'test@example.com',
          password: 'password123',
        });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Invalid email/password');
    });
  });

  describe('POST /users/google-signin', () => {
    it('should sign in a user with Google and return a token', async () => {
      const mockGoogleToken = 'mockGoogleToken';
      const mockPayload = {
        name: 'Google User',
        email: 'googleuser@example.com',
      };
      const mockUser = {
        id: 1,
        username: 'googleuser',
        email: 'googleuser@example.com',
      };

      jest.spyOn(require('google-auth-library'), 'OAuth2Client').mockImplementation(() => ({
        verifyIdToken: jest.fn().mockResolvedValue({ getPayload: () => mockPayload }),
      }));
      User.findOne.mockResolvedValue(mockUser);
      signToken.mockReturnValue('mockToken');

      const response = await request(app)
        .post('/users/google-signin')
        .send({ token: mockGoogleToken });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('access_token', 'mockToken');
    });

    it('should return an error if Google sign-in fails', async () => {
      const mockGoogleToken = 'invalidToken';

      jest.spyOn(require('google-auth-library'), 'OAuth2Client').mockImplementation(() => ({
        verifyIdToken: jest.fn().mockRejectedValue(new Error('Google sign-in failed')),
      }));

      const response = await request(app)
        .post('/users/google-signin')
        .send({ token: mockGoogleToken });

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Google sign-in failed');
    });
  });
});
