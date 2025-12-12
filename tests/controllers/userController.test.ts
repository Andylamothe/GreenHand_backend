import { UserController } from '../../src/controllers/userController';
import { UserService } from '../../src/services/userService';
import { HttpException } from '../../src/utils/http-exception';
import { Request, Response, NextFunction } from 'express';

jest.mock('../../src/services/userService');

describe('UserController', () => {
  let controller: UserController;
  let mockRequest: any;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    jest.clearAllMocks();
    controller = new UserController();

    mockRequest = {
      user: { id: '507f1f77bcf86cd799439011' },
      body: {},
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    mockNext = jest.fn();
  });

  describe('me', () => {
    it('devrait retourner les infos utilisateur', async () => {
      const mockUser = { id: '507f1f77bcf86cd799439011', email: 'john@doe.com', username: 'john' } as any;
      jest.spyOn(UserService.prototype, 'getById').mockResolvedValueOnce(mockUser);

      await controller.me(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ success: true, user: mockUser });
    });

    it('devrait appeler next en cas d\'erreur', async () => {
      const error = new HttpException(404, 'User not found');
      jest.spyOn(UserService.prototype, 'getById').mockRejectedValueOnce(error);

      await controller.me(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('updateMe', () => {
    it('devrait mettre à jour le profil utilisateur', async () => {
      const updateData = { username: 'johnny', location: 'Quebec' };
      const mockUpdated = { id: '507f1f77bcf86cd799439011', ...updateData } as any;
      mockRequest.body = updateData;
      const updateSpy = jest.spyOn(UserService.prototype, 'updateUser').mockResolvedValueOnce(mockUpdated);

      await controller.updateMe(mockRequest as Request, mockResponse as Response, mockNext);

      expect(updateSpy).toHaveBeenCalledWith('507f1f77bcf86cd799439011', updateData);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ success: true, user: mockUpdated });
    });
  });

  describe('deleteMe', () => {
    it('devrait supprimer le compte utilisateur', async () => {
      const deleteSpy = jest.spyOn(UserService.prototype, 'deleteUser').mockResolvedValueOnce({ success: true } as any);

      await controller.deleteMe(mockRequest as Request, mockResponse as Response, mockNext);

      expect(deleteSpy).toHaveBeenCalledWith('507f1f77bcf86cd799439011');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ success: true });
    });
  });

  describe('logout', () => {
    it('devrait retourner success true', async () => {
      jest.spyOn(UserService.prototype, 'logout').mockResolvedValueOnce({ success: true } as any);

      await controller.logout(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ success: true });
    });
  });
});
