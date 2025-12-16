import { InventoryController } from '../../src/controllers/inventoryController';
import { InventoryService } from '../../src/services/inventoryService';
import { HttpException } from '../../src/utils/http-exception';
import { Request, Response, NextFunction } from 'express';

jest.mock('../../src/services/inventoryService');

describe('InventoryController', () => {
  let controller: InventoryController;
  let mockRequest: any;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    jest.clearAllMocks();
    controller = new InventoryController();

    mockRequest = {
      user: { id: '507f1f77bcf86cd799439011' },
      body: {},
      query: {},
      params: {},
    };
    mockResponse = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
    };
    mockNext = jest.fn();
  });

  describe('getMyInventory', () => {
    it('devrait retourner l\'inventaire de l\'utilisateur', async () => {
      const mockInventory = { _id: 'inv-123', userId: '507f1f77bcf86cd799439011' } as any;
      jest.spyOn(InventoryService.prototype, 'getInventory').mockResolvedValueOnce(mockInventory);

      await controller.getMyInventory(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockResponse.json).toHaveBeenCalledWith(mockInventory);
    });
  });

  describe('getMyPlants', () => {
    it('devrait retourner les plantes de l\'inventaire', async () => {
      const mockInventory = { _id: { toString: () => 'inv-123' } } as any;
      const mockPlants = [{ _id: 'plant-1', name: 'Rose' }] as any;
      jest.spyOn(InventoryService.prototype, 'getInventory').mockResolvedValueOnce(mockInventory);
      jest.spyOn(InventoryService.prototype, 'getPlants').mockResolvedValueOnce(mockPlants);

      await controller.getMyPlants(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockResponse.json).toHaveBeenCalledWith(mockPlants);
    });
  });

  describe('addPlant', () => {
    it('devrait ajouter une plante à l\'inventaire', async () => {
      mockRequest.body = { name: 'Tulipe' };
      const mockInventory = { _id: { toString: () => 'inv-123' } } as any;
      const newPlant = { _id: 'plant-new', name: 'Tulipe' } as any;
      jest.spyOn(InventoryService.prototype, 'ensureInventory').mockResolvedValueOnce(mockInventory);
      jest.spyOn(InventoryService.prototype, 'addPlant').mockResolvedValueOnce(newPlant);

      await controller.addPlant(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(newPlant);
    });
  });

  describe('search', () => {
    it('devrait chercher une plante par nom', async () => {
      mockRequest.query = { name: 'Rose' };
      const mockInventory = { _id: { toString: () => 'inv-123' } } as any;
      const mockPlants = [{ _id: 'plant-1', name: 'Rose' }] as any;
      jest.spyOn(InventoryService.prototype, 'getInventory').mockResolvedValueOnce(mockInventory);
      jest.spyOn(InventoryService.prototype, 'searchPlant').mockResolvedValueOnce(mockPlants);

      await controller.search(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockResponse.json).toHaveBeenCalledWith(mockPlants);
    });
  });

  describe('filter', () => {
    it('devrait filtrer les plantes par catégorie', async () => {
      mockRequest.query = { category: 'cat-123' };
      const mockInventory = { _id: { toString: () => 'inv-123' } } as any;
      const mockPlants = [{ _id: 'plant-1', categoryId: 'cat-123' }] as any;
      jest.spyOn(InventoryService.prototype, 'getInventory').mockResolvedValueOnce(mockInventory);
      jest.spyOn(InventoryService.prototype, 'filterCategory').mockResolvedValueOnce(mockPlants);

      await controller.filter(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockResponse.json).toHaveBeenCalledWith(mockPlants);
    });
  });

  describe('deletePlant', () => {
    it('devrait supprimer une plante', async () => {
      mockRequest.params = { id: 'plant-1' };
      const delSpy = jest.spyOn(InventoryService.prototype, 'deletePlant').mockResolvedValueOnce(undefined as any);

      await controller.deletePlant(mockRequest as Request, mockResponse as Response, mockNext);

      expect(delSpy).toHaveBeenCalledWith('plant-1');
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Plante supprimée' });
    });
  });
});
