import { RecommendationAiService } from '../../src/services/RecommandationAiService';
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
      save: saveMock.mockResolvedValue({ _id: 'saved-id', ...data }),
    };
  } as any;

  (mockModel as any).find = findMock.mockReturnValue({ sort: sortMock });

  return { RecommendationAi: mockModel, __mocks: { saveMock, findMock, sortMock } };
});

// Retrieve mocks from the mocked module
const { __mocks } = require('../../src/models/Recommandation_Ai');
const { saveMock, findMock, sortMock } = __mocks;

describe('RecommendationAiService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('saveRecommendation should persist and return saved document', async () => {
    const mockSaved = { _id: 'saved-id', userQuery: 'How to water?', aiResponse: 'Water daily.' };
    saveMock.mockResolvedValueOnce(mockSaved);

    const result = await RecommendationAiService.saveRecommendation(
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

  it('getRecommendationsByUserId should return sorted recommendations', async () => {
    const mockList = [
      { _id: '2', dateGenerated: new Date('2024-01-02') },
      { _id: '1', dateGenerated: new Date('2024-01-01') },
    ];
    sortMock.mockResolvedValueOnce(mockList);

    const result = await RecommendationAiService.getRecommendationsByUserId('507f1f77bcf86cd799439011');

    expect(findMock).toHaveBeenCalledWith({ userId: expect.any(Types.ObjectId) });
    expect(sortMock).toHaveBeenCalledWith({ dateGenerated: -1 });
    expect(result).toEqual(mockList);
  });
});
