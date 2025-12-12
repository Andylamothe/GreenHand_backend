import { CategoryController } from '../../src/controllers/categoryController';
import { CategoryService } from '../../src/services/categoryService';
import { HttpException } from '../../src/utils/http-exception';
import { Request, Response, NextFunction } from 'express';

jest.mock('../../src/services/categoryService');

describe('CategoryController', () => {
  let controller: CategoryController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    jest.clearAllMocks();
    controller = new CategoryController();

    mockRequest = {};
    mockResponse = {
      json: jest.fn().mockReturnThis(),
    };
    mockNext = jest.fn();
  });

  describe('getAllCategories', () => {
    it('devrait retourner toutes les catégories', async () => {
      const mockCategories = [
        { _id: 'cat-1', name: 'Cactus' },
        { _id: 'cat-2', name: 'Orchidées' },
      ];
      jest.spyOn(CategoryService.prototype, 'getAllCategories').mockResolvedValueOnce(mockCategories as any);

      await controller.getAllCategories(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockResponse.json).toHaveBeenCalledWith(mockCategories);
    });

    it('devrait appeler next en cas d\'erreur', async () => {
      const error = new HttpException(404, 'No categories');
      jest.spyOn(CategoryService.prototype, 'getAllCategories').mockRejectedValueOnce(error);

      await controller.getAllCategories(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });
});
