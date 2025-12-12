import { RecommendationAiService } from '../../src/services/RecommandationAiService';
import { HttpException } from '../../src/utils/http-exception';
import { Types } from 'mongoose';
// ---------------------------------------------------
// ------ TEST FILE FOR RecommendationAiService ------
// ---------------------------------------------------
// Mocks (kept inside factory; accessed via __mocks export)

jest.mock('../../src/models/Recommandation_Ai', () => {
  const saveMock = jest.fn();
  const findMock = jest.fn();
  const sortMock = jest.fn();

  const mockModel = function (data: any) {
    return {
      save: saveMock,
    };
  } as any;

  (mockModel as any).find = findMock.mockReturnValue({ sort: sortMock });

  return { RecommendationAi: mockModel, __mocks: { saveMock, findMock, sortMock } };
});

// Retrieve mocks from the mocked module
const { __mocks } = require('../../src/models/Recommandation_Ai');
const { saveMock, findMock, sortMock } = __mocks;

describe('RecommendationAiService', () => {
  let service: RecommendationAiService;

  beforeEach(() => {
    jest.clearAllMocks();
    // Réinitialiser les mocks pour chaque test
    saveMock.mockClear();
    findMock.mockClear();
    sortMock.mockClear();
    service = new RecommendationAiService();
  });

  describe('saveRecommendation', () => {
    it('devrait persister et retourner le document sauvegardé', async () => {
      const mockSaved = { _id: 'saved-id', userQuery: 'How to water?', aiResponse: 'Water daily.' };
      saveMock.mockResolvedValueOnce(mockSaved);

      const result = await service.saveRecommendation(
        '507f1f77bcf86cd799439011',
        'How to water?',
        'Water daily.',
        'watering',
        'medium',
        undefined,
      );

      expect(saveMock).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockSaved);
    });

    it('devrait lancer une erreur 400 si userId manquant', async () => {
      try {
        await service.saveRecommendation('', 'query', 'response');
        fail('Devrait lever une exception');
      } catch (e: any) {
        expect(e.status).toBe(400);
        expect(e.message).toContain('userId, userQuery et aiResponse sont requis');
      }
    });

    it('devrait lancer une erreur 400 si userQuery manquant', async () => {
      try {
        await service.saveRecommendation('507f1f77bcf86cd799439011', '', 'response');
        fail('Devrait lever une exception');
      } catch (e: any) {
        expect(e.status).toBe(400);
        expect(e.message).toContain('userId, userQuery et aiResponse sont requis');
      }
    });

    it('devrait lancer une erreur 400 si aiResponse manquant', async () => {
      try {
        await service.saveRecommendation('507f1f77bcf86cd799439011', 'query', '');
        fail('Devrait lever une exception');
      } catch (e: any) {
        expect(e.status).toBe(400);
        expect(e.message).toContain('userId, userQuery et aiResponse sont requis');
      }
    });
  });;

  describe('getRecommendationsByUserId', () => {
    it('devrait retourner les recommandations triées par date', async () => {
      const mockList = [
        { _id: '2', dateGenerated: new Date('2024-01-02') },
        { _id: '1', dateGenerated: new Date('2024-01-01') },
      ];
      sortMock.mockResolvedValueOnce(mockList);

      const result = await service.getRecommendationsByUserId('507f1f77bcf86cd799439011');

      expect(findMock).toHaveBeenCalledWith({ userId: expect.any(Types.ObjectId) });
      expect(sortMock).toHaveBeenCalledWith({ dateGenerated: -1 });
      expect(result).toEqual(mockList);
    });

    it('devrait retourner un tableau vide si aucune recommandation', async () => {
      sortMock.mockResolvedValueOnce([]);

      const result = await service.getRecommendationsByUserId('507f1f77bcf86cd799439011');

      expect(result).toEqual([]);
    });

    it('devrait lancer une erreur 400 si userId manquant', async () => {
      try {
        await service.getRecommendationsByUserId('');
        fail('Devrait lever une exception');
      } catch (e: any) {
        expect(e.status).toBe(400);
        expect(e.message).toContain('userId est requis');
      }
    });

    it('devrait lancer une erreur 500 si la requête échoue', async () => {
      sortMock.mockRejectedValueOnce(new Error('Database error'));

      try {
        await service.getRecommendationsByUserId('507f1f77bcf86cd799439011');
        fail('Devrait lever une exception');
      } catch (e: any) {
        expect(e.status).toBe(500);
        expect(e.message).toContain('Erreur lors de la récupération');
      }
    });
  });
});
