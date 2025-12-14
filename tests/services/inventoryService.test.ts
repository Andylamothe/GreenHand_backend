import { InventoryService } from '../../src/services/inventoryService';
import { HttpException } from '../../src/utils/http-exception';

// Mock des modèles Mongoose
jest.mock('../../src/models/Inventory', () => {
  const findOneMock = jest.fn();
  const findByIdAndDeleteMock = jest.fn();
  const createMock = jest.fn();
  const findByIdMock = jest.fn();

  const Inventory = {
    findOne: findOneMock,
    findByIdAndDelete: findByIdAndDeleteMock,
    create: createMock,
    findById: findByIdMock,
  } as any;

  return { Inventory, __mocks: { findOneMock, findByIdAndDeleteMock, createMock, findByIdMock } };
});

jest.mock('../../src/models/Plants', () => {
  const findMock = jest.fn();
  const createMock = jest.fn();
  const findByIdAndDeleteMock = jest.fn();
  const deleteManyMock = jest.fn();

  const Plant = {
    find: findMock,
    create: createMock,
    findByIdAndDelete: findByIdAndDeleteMock,
    deleteMany: deleteManyMock,
  } as any;

  return { Plant, __mocks: { findMock, createMock, findByIdAndDeleteMock, deleteManyMock } };
});

const { __mocks: inventoryMocks } = require('../../src/models/Inventory');
const { __mocks: plantMocks } = require('../../src/models/Plants');

const { findOneMock: invFindOneMock, findByIdAndDeleteMock: invFindByIdAndDeleteMock, createMock: invCreateMock } = inventoryMocks;
const { findMock: plantFindMock, createMock: plantCreateMock, findByIdAndDeleteMock: plantFindByIdAndDeleteMock, deleteManyMock: plantDeleteManyMock } = plantMocks;

describe('InventoryService', () => {
  let service: InventoryService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new InventoryService();
  });

  describe('ensureInventory', () => {
    it('devrait retourner un inventaire existant', async () => {
      const userId = '507f1f77bcf86cd799439011';
      const existingInventory = { _id: 'inv-123', userId, plants: [] };

      invFindOneMock.mockResolvedValueOnce(existingInventory);

      const result = await service.ensureInventory(userId);

      expect(invFindOneMock).toHaveBeenCalledWith({ userId });
      expect(result).toEqual(existingInventory);
    });

    it('devrait créer un nouvel inventaire si inexistant', async () => {
      const userId = '507f1f77bcf86cd799439011';
      const newInventory = { _id: 'inv-123', userId, plants: [] };

      invFindOneMock.mockResolvedValueOnce(null);
      invCreateMock.mockResolvedValueOnce(newInventory);

      const result = await service.ensureInventory(userId);

      expect(invFindOneMock).toHaveBeenCalledWith({ userId });
      expect(invCreateMock).toHaveBeenCalledWith({ userId });
      expect(result).toEqual(newInventory);
    });
  });

  describe('getInventory', () => {
    it('devrait retourner l\'inventaire d\'un utilisateur', async () => {
      const userId = '507f1f77bcf86cd799439011';
      const inventory = { _id: 'inv-123', userId, plants: [] };

      invFindOneMock.mockResolvedValueOnce(inventory);

      const result = await service.getInventory(userId);

      expect(invFindOneMock).toHaveBeenCalledWith({ userId });
      expect(result).toEqual(inventory);
    });

    it('devrait lancer une erreur 404 si inventaire introuvable', async () => {
      const userId = 'invalid-user-id';

      invFindOneMock.mockResolvedValueOnce(null);

      await expect(service.getInventory(userId)).rejects.toThrow(HttpException);

      try {
        await service.getInventory(userId);
      } catch (e: any) {
        expect(e.status).toBe(404);
        expect(e.message).toBe('Inventaire introuvable');
      }
    });
  });

  describe('getPlants', () => {
    it('devrait retourner toutes les plantes d\'un inventaire', async () => {
      const inventoryId = 'inv-123';
      const plants = [
        { _id: 'plant-1', name: 'Rose', inventoryId },
        { _id: 'plant-2', name: 'Cactus', inventoryId },
      ];

      plantFindMock.mockResolvedValueOnce(plants);

      const result = await service.getPlants(inventoryId);

      expect(plantFindMock).toHaveBeenCalledWith({ inventoryId });
      expect(result).toEqual(plants);
      expect(result.length).toBe(2);
    });

    it('devrait retourner un tableau vide si aucune plante', async () => {
      const inventoryId = 'inv-123';

      plantFindMock.mockResolvedValueOnce([]);

      const result = await service.getPlants(inventoryId);

      expect(plantFindMock).toHaveBeenCalledWith({ inventoryId });
      expect(result).toEqual([]);
      expect(result.length).toBe(0);
    });
  });

  describe('addPlant', () => {
    it('devrait ajouter une plante à un inventaire', async () => {
      const inventoryId = 'inv-123';
      const plantData = { name: 'Tulipe', wateringFrequency: 'weekly' };
      const createdPlant = { _id: 'plant-123', ...plantData, inventoryId };

      plantCreateMock.mockResolvedValueOnce(createdPlant);

      const result = await service.addPlant(inventoryId, plantData);

      expect(plantCreateMock).toHaveBeenCalledWith({
        ...plantData,
        inventoryId,
      });
      expect(result).toEqual(createdPlant);
      expect((result as any).inventoryId).toBe(inventoryId);
    });

    it('devrait préserver les propriétés de la plante lors de l\'ajout', async () => {
      const inventoryId = 'inv-123';
      const plantData = {
        name: 'Lavande',
        wateringFrequency: 'daily',
        healthScore: 90,
        categoryId: 'cat-123',
      };
      const createdPlant = { _id: 'plant-456', ...plantData, inventoryId };

      plantCreateMock.mockResolvedValueOnce(createdPlant);

      const result = await service.addPlant(inventoryId, plantData);

      expect(result).toEqual(createdPlant);
      expect((result as any).name).toBe('Lavande');
      expect((result as any).wateringFrequency).toBe('daily');
      expect((result as any).healthScore).toBe(90);
    });
  });

  describe('searchPlant', () => {
    it('devrait chercher une plante par nom (case-insensitive)', async () => {
      const inventoryId = 'inv-123';
      const query = 'Rose';
      const searchResults = [
        { _id: 'plant-1', name: 'Rose', inventoryId },
        { _id: 'plant-2', name: 'Rosemary', inventoryId },
      ];

      plantFindMock.mockResolvedValueOnce(searchResults);

      const result = await service.searchPlant(inventoryId, query);

      expect(plantFindMock).toHaveBeenCalledWith({
        inventoryId,
        name: { $regex: query, $options: 'i' },
      });
      expect(result).toEqual(searchResults);
      expect(result.length).toBe(2);
    });

    it('devrait retourner un tableau vide si aucun résultat de recherche', async () => {
      const inventoryId = 'inv-123';
      const query = 'PlantInexistante';

      plantFindMock.mockResolvedValueOnce([]);

      const result = await service.searchPlant(inventoryId, query);

      expect(plantFindMock).toHaveBeenCalledWith({
        inventoryId,
        name: { $regex: query, $options: 'i' },
      });
      expect(result).toEqual([]);
    });
  });

  describe('filterCategory', () => {
    it('devrait filtrer les plantes par catégorie', async () => {
      const inventoryId = 'inv-123';
      const categoryId = 'cat-456';
      const filteredPlants = [
        { _id: 'plant-1', name: 'Rose', inventoryId, categoryId },
        { _id: 'plant-2', name: 'Tulipe', inventoryId, categoryId },
      ];

      plantFindMock.mockResolvedValueOnce(filteredPlants);

      const result = await service.filterCategory(inventoryId, categoryId);

      expect(plantFindMock).toHaveBeenCalledWith({ inventoryId, categoryId });
      expect(result).toEqual(filteredPlants);
      expect(result.every((p) => (p as any).categoryId === categoryId)).toBe(true);
    });

    it('devrait retourner un tableau vide si aucune plante dans la catégorie', async () => {
      const inventoryId = 'inv-123';
      const categoryId = 'cat-456';

      plantFindMock.mockResolvedValueOnce([]);

      const result = await service.filterCategory(inventoryId, categoryId);

      expect(plantFindMock).toHaveBeenCalledWith({ inventoryId, categoryId });
      expect(result).toEqual([]);
    });
  });

  describe('deletePlant', () => {
    it('devrait supprimer une plante et retourner ses données', async () => {
      const plantId = 'plant-123';
      const deletedPlant = { _id: plantId, name: 'Rose', inventoryId: 'inv-123' };

      plantFindByIdAndDeleteMock.mockResolvedValueOnce(deletedPlant);

      const result = await service.deletePlant(plantId);

      expect(plantFindByIdAndDeleteMock).toHaveBeenCalledWith(plantId);
      expect(result).toEqual(deletedPlant);
    });

    it('devrait lancer une erreur 404 si la plante est introuvable', async () => {
      const plantId = 'invalid-plant-id';

      plantFindByIdAndDeleteMock.mockResolvedValueOnce(null);

      await expect(service.deletePlant(plantId)).rejects.toThrow(HttpException);

      try {
        await service.deletePlant(plantId);
      } catch (e: any) {
        expect(e.status).toBe(404);
        expect(e.message).toBe('Plante introuvable');
      }
    });
  });

  describe('deleteInventory', () => {
    it('devrait supprimer un inventaire et toutes ses plantes', async () => {
      const userId = '507f1f77bcf86cd799439011';
      const inventoryId = 'inv-123';
      const inventory = { _id: inventoryId, userId };

      invFindOneMock.mockResolvedValueOnce(inventory);
      plantDeleteManyMock.mockResolvedValueOnce({ deletedCount: 5 });
      invFindByIdAndDeleteMock.mockResolvedValueOnce(inventory);

      const result = await service.deleteInventory(userId);

      expect(invFindOneMock).toHaveBeenCalledWith({ userId });
      expect(plantDeleteManyMock).toHaveBeenCalledWith({ inventoryId });
      expect(invFindByIdAndDeleteMock).toHaveBeenCalledWith(inventoryId);
      expect(result).toEqual({ message: 'Inventaire supprimé pour cet utilisateur' });
    });

    it('devrait lancer une erreur 404 si inventaire introuvable', async () => {
      const userId = 'invalid-user-id';

      invFindOneMock.mockResolvedValueOnce(null);

      await expect(service.deleteInventory(userId)).rejects.toThrow(HttpException);

      try {
        await service.deleteInventory(userId);
      } catch (e: any) {
        expect(e.status).toBe(404);
        expect(e.message).toBe('Inventaire introuvable');
      }
    });

    it('devrait supprimer toutes les plantes avant de supprimer l\'inventaire', async () => {
      const userId = '507f1f77bcf86cd799439011';
      const inventoryId = 'inv-123';
      const inventory = { _id: inventoryId, userId };

      invFindOneMock.mockResolvedValueOnce(inventory);
      plantDeleteManyMock.mockResolvedValueOnce({ deletedCount: 3 });
      invFindByIdAndDeleteMock.mockResolvedValueOnce(inventory);

      await service.deleteInventory(userId);

      // Vérifier que deleteMany est appelé
      expect(plantDeleteManyMock).toHaveBeenCalledWith({ inventoryId });
      // Vérifier que findByIdAndDelete est appelé après
      expect(invFindByIdAndDeleteMock).toHaveBeenCalledWith(inventoryId);
    });
  });
});
