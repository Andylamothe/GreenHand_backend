import { CategoryService } from '../../src/services/categoryService';
import { HttpException } from '../../src/utils/http-exception';

// Mock du modèle Mongoose Category
jest.mock('../../src/models/Category', () => {
  const findMock = jest.fn();

  const Category = {
    find: findMock,
  } as any;

  return { Category, __mocks: { findMock } };
});

const { __mocks } = require('../../src/models/Category');
const { findMock } = __mocks;

describe('CategoryService', () => {
  let service: CategoryService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new CategoryService();
  });

  describe('getAllCategories', () => {
    it('devrait retourner toutes les catégories', async () => {
      const mockCategories = [
        { _id: 'cat-1', name: 'Cactus', description: 'Plantes succulentes' },
        { _id: 'cat-2', name: 'Orchidées', description: 'Plantes tropicales' },
        { _id: 'cat-3', name: 'Fougères', description: 'Plantes d\'ombre' },
      ];

      findMock.mockResolvedValueOnce(mockCategories);

      const result = await service.getAllCategories();

      expect(findMock).toHaveBeenCalledWith();
      expect(result).toEqual(mockCategories);
      expect(result.length).toBe(3);
    });

    it('devrait lancer une erreur 404 si aucune catégorie n\'existe', async () => {
      findMock.mockResolvedValueOnce([]);

      try {
        await service.getAllCategories();
        fail('Devrait lever une exception');
      } catch (e: any) {
        expect(e.status).toBe(404);
        expect(e.message).toBe('Aucune catégorie trouvée');
      }
    });

    it('devrait retourner une seule catégorie si c\'est la seule qui existe', async () => {
      const mockCategories = [
        { _id: 'cat-1', name: 'Plantes d\'intérieur', description: 'Adaptées à l\'intérieur' },
      ];

      findMock.mockResolvedValueOnce(mockCategories);

      const result = await service.getAllCategories();

      expect(findMock).toHaveBeenCalledWith();
      expect(result).toEqual(mockCategories);
      expect(result.length).toBe(1);
    });

    it('devrait retourner plusieurs catégories avec tous les champs requis', async () => {
      const mockCategories = [
        {
          _id: 'cat-1',
          name: 'Succulentes',
          description: 'Plantes grasses',
          icon: 'cactus.png',
        },
        {
          _id: 'cat-2',
          name: 'Herbacées',
          description: 'Plantes herbacées',
          icon: 'herb.png',
        },
      ];

      findMock.mockResolvedValueOnce(mockCategories);

      const result = await service.getAllCategories();

      expect(findMock).toHaveBeenCalledWith();
      expect(result).toEqual(mockCategories);
      expect(result.every((cat) => cat._id && cat.name)).toBe(true);
    });

    it('devrait appeler find() sans paramètres', async () => {
      const mockCategories = [{ _id: 'cat-1', name: 'Plantes' }];

      findMock.mockResolvedValueOnce(mockCategories);

      await service.getAllCategories();

      expect(findMock).toHaveBeenCalledWith();
      expect(findMock).toHaveBeenCalledTimes(1);
    });
  });
});
