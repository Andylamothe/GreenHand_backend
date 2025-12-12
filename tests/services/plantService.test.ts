import { PlantService } from '../../src/services/plantService';
import { HttpException } from '../../src/utils/http-exception';

// Mock des modèles Mongoose
jest.mock('../../src/models/Plants', () => {
  const findByIdAndUpdateMock = jest.fn();
  const findByIdMock = jest.fn();
  const findOneAndDeleteMock = jest.fn();

  const Plant = {
    findByIdAndUpdate: findByIdAndUpdateMock,
    findById: findByIdMock,
    findOneAndDelete: findOneAndDeleteMock,
  } as any;

  return { Plant, __mocks: { findByIdAndUpdateMock, findByIdMock, findOneAndDeleteMock } };
});

jest.mock('../../src/models/Category', () => {
  const findByIdMock = jest.fn();
  const Category = { findById: findByIdMock } as any;
  return { Category, __mocks: { findByIdMock } };
});

jest.mock('../../src/models/PlantPhotos', () => {
  const findMock = jest.fn();
  const createMock = jest.fn();
  const findOneAndDeleteMock = jest.fn();

  const PlantPhotos = {
    find: findMock,
    create: createMock,
    findOneAndDelete: findOneAndDeleteMock,
  } as any;

  return { PlantPhotos, __mocks: { findMock, createMock, findOneAndDeleteMock } };
});

const { __mocks: plantMocks } = require('../../src/models/Plants');
const { __mocks: categoryMocks } = require('../../src/models/Category');
const { __mocks: photoMocks } = require('../../src/models/PlantPhotos');

const { findByIdAndUpdateMock, findByIdMock, findOneAndDeleteMock: plantFindOneAndDeleteMock } = plantMocks;
const { findByIdMock: categoryFindByIdMock } = categoryMocks;
const { findMock: photoFindMock, createMock: photoCreateMock, findOneAndDeleteMock: photoFindOneAndDeleteMock } = photoMocks;

describe('PlantService', () => {
  let service: PlantService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new PlantService();
  });

  describe('updatePlant', () => {
    it('devrait mettre à jour une plante et retourner les données mises à jour', async () => {
      const plantId = '507f1f77bcf86cd799439011';
      const updateData = { name: 'Rose', wateringFrequency: 'weekly' };
      const updatedPlant = { _id: plantId, ...updateData, categoryId: '123' };

      findByIdAndUpdateMock.mockResolvedValueOnce(updatedPlant);

      const result = await service.updatePlant(plantId, updateData);

      expect(findByIdAndUpdateMock).toHaveBeenCalledWith(plantId, updateData, {
        new: true,
        runValidators: true,
      });
      expect(result).toEqual(updatedPlant);
    });

    it('devrait lancer une erreur 404 si la plante est introuvable', async () => {
      const plantId = 'invalid-id';
      findByIdAndUpdateMock.mockResolvedValueOnce(null);

      await expect(service.updatePlant(plantId, { name: 'Rose' })).rejects.toThrow(
        HttpException,
      );

      try {
        await service.updatePlant(plantId, { name: 'Rose' });
      } catch (e: any) {
        expect(e.status).toBe(404);
        expect(e.message).toBe('Plante introuvable');
      }
    });
  });

  describe('getPlant', () => {
    it('devrait récupérer une plante par son ID', async () => {
      const plantId = '507f1f77bcf86cd799439011';
      const mockPlant = { _id: plantId, name: 'Cactus', categoryId: '123' };

      findByIdMock.mockResolvedValueOnce(mockPlant);

      const result = await service.getPlant(plantId);

      expect(findByIdMock).toHaveBeenCalledWith(plantId);
      expect(result).toEqual(mockPlant);
    });

    it('devrait lancer une erreur 404 si la plante est introuvable', async () => {
      const plantId = 'invalid-id';
      findByIdMock.mockResolvedValueOnce(null);

      await expect(service.getPlant(plantId)).rejects.toThrow(HttpException);

      try {
        await service.getPlant(plantId);
      } catch (e: any) {
        expect(e.status).toBe(404);
        expect(e.message).toBe('Plante introuvable');
      }
    });
  });

  describe('getPlantDetails', () => {
    it('devrait retourner les détails complets d\'une plante avec catégorie et photos', async () => {
      const plantId = '507f1f77bcf86cd799439011';
      const categoryId = '61adb8b8c1d9e3f4a8c5d1e2';
      const mockPlant = { _id: plantId, name: 'Orchidée', categoryId };
      const mockCategory = { _id: categoryId, name: 'Plantes tropicales' };
      const mockPhotos = [
        { _id: 'photo1', plantId, healthScore: 85 },
        { _id: 'photo2', plantId, healthScore: 90 },
      ];

      findByIdMock.mockResolvedValueOnce(mockPlant);
      categoryFindByIdMock.mockResolvedValueOnce(mockCategory);
      photoFindMock.mockResolvedValueOnce(mockPhotos);

      const result = await service.getPlantDetails(plantId);

      expect(findByIdMock).toHaveBeenCalledWith(plantId);
      expect(categoryFindByIdMock).toHaveBeenCalledWith(categoryId);
      expect(photoFindMock).toHaveBeenCalledWith({ plantId });
      expect(result).toEqual({
        plant: mockPlant,
        category: mockCategory,
        photos: mockPhotos,
      });
    });

    it('devrait lancer une erreur 404 si la plante est introuvable', async () => {
      const plantId = 'invalid-id';
      findByIdMock.mockResolvedValueOnce(null);

      await expect(service.getPlantDetails(plantId)).rejects.toThrow(HttpException);

      try {
        await service.getPlantDetails(plantId);
      } catch (e: any) {
        expect(e.status).toBe(404);
        expect(e.message).toBe('Plante introuvable');
      }
    });
  });

  describe('addPhoto', () => {
    it('devrait ajouter une photo à une plante avec tous les paramètres valides', async () => {
      const plantId = '507f1f77bcf86cd799439011';
      const mockPlant = { _id: plantId, name: 'Fougère' };
      const photoData = {
        base64: 'data:image/jpeg;base64,/9j/4AAQSkZJRg...',
        healthScore: 75,
        comparisonResult: 'healthy',
      };
      const createdPhoto = {
        _id: 'photo-id',
        plantId,
        photoUrl: photoData.base64,
        healthScore: 75,
        comparisonResult: 'healthy',
        dateTaken: expect.any(Date),
      };

      findByIdMock.mockResolvedValueOnce(mockPlant);
      photoCreateMock.mockResolvedValueOnce(createdPhoto);

      const result = await service.addPhoto(plantId, photoData);

      expect(findByIdMock).toHaveBeenCalledWith(plantId);
      expect(photoCreateMock).toHaveBeenCalledWith({
        plantId,
        photoUrl: photoData.base64,
        healthScore: 75,
        comparisonResult: 'healthy',
        dateTaken: expect.any(Date),
      });
      expect(result).toEqual(createdPhoto);
    });

    it('devrait lancer une erreur 404 si la plante est introuvable', async () => {
      const plantId = 'invalid-id';
      findByIdMock.mockResolvedValueOnce(null);

      const photoData = {
        base64: 'data:image/jpeg;base64,...',
        healthScore: 75,
        comparisonResult: 'healthy',
      };

      await expect(service.addPhoto(plantId, photoData)).rejects.toThrow(HttpException);

      try {
        await service.addPhoto(plantId, photoData);
      } catch (e: any) {
        expect(e.status).toBe(404);
        expect(e.message).toBe('Plante introuvable');
      }
    });

    it('devrait lancer une erreur 400 si base64 manquant', async () => {
      const plantId = '507f1f77bcf86cd799439011';
      const mockPlant = { _id: plantId, name: 'Plante' };
      findByIdMock.mockResolvedValueOnce(mockPlant);

      const photoData = {
        base64: '',
        healthScore: 75,
        comparisonResult: 'healthy',
      };

      try {
        await service.addPhoto(plantId, photoData);
        fail('Devrait lever une exception');
      } catch (e: any) {
        expect(e.status).toBe(400);
        expect(e.message).toBe('Image manquante (base64)');
      }
    });

    it('devrait lancer une erreur 400 si healthScore manquant', async () => {
      const plantId = '507f1f77bcf86cd799439011';
      const mockPlant = { _id: plantId, name: 'Plante' };
      findByIdMock.mockResolvedValueOnce(mockPlant);

      const photoData = {
        base64: 'data:image/jpeg;base64,...',
        healthScore: undefined,
        comparisonResult: 'healthy',
      } as any;

      try {
        await service.addPhoto(plantId, photoData);
        fail('Devrait lever une exception');
      } catch (e: any) {
        expect(e.status).toBe(400);
        expect(e.message).toBe('healthScore manquant');
      }
    });
  });

  describe('deletePhoto', () => {
    it('devrait supprimer une photo et retourner les données supprimées', async () => {
      const plantId = '507f1f77bcf86cd799439011';
      const photoId = 'photo-id-123';
      const deletedPhoto = {
        _id: photoId,
        plantId,
        photoUrl: 'base64...',
        healthScore: 80,
      };

      photoFindOneAndDeleteMock.mockResolvedValueOnce(deletedPhoto);

      const result = await service.deletePhoto(plantId, photoId);

      expect(photoFindOneAndDeleteMock).toHaveBeenCalledWith({
        _id: photoId,
        plantId,
      });
      expect(result).toEqual(deletedPhoto);
    });

    it('devrait lancer une erreur 404 si la photo est introuvable', async () => {
      const plantId = '507f1f77bcf86cd799439011';
      const photoId = 'invalid-photo-id';

      photoFindOneAndDeleteMock.mockResolvedValueOnce(null);

      await expect(service.deletePhoto(plantId, photoId)).rejects.toThrow(HttpException);

      try {
        await service.deletePhoto(plantId, photoId);
      } catch (e: any) {
        expect(e.status).toBe(404);
        expect(e.message).toBe('Photo introuvable');
      }
    });
  });
});
