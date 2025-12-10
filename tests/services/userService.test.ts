import { UserService } from '../../src/services/userService';

// Mock du modèle Mongoose User
jest.mock('../../src/models/Users', () => {
  const findByIdMock = jest.fn();
  const findByIdAndDeleteMock = jest.fn();

  const User = {
    findById: findByIdMock,
    findByIdAndDelete: findByIdAndDeleteMock,
  } as any;

  return { User, __mocks: { findByIdMock, findByIdAndDeleteMock } };
});

const { __mocks } = require('../../src/models/Users');
const { findByIdMock, findByIdAndDeleteMock } = __mocks as {
  findByIdMock: jest.Mock;
  findByIdAndDeleteMock: jest.Mock;
};

describe('UserService', () => {
  const service = new UserService();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getById', () => {
    it('retourne les infos utilisateur sans password', async () => {
      const rawDoc = {
        _id: '507f1f77bcf86cd799439011',
        email: 'john@doe.com',
        username: 'john',
        location: 'Montreal',
        role: 'user',
        password: 'hashed',
      };
      // findById().lean()
      findByIdMock.mockReturnValueOnce({ lean: jest.fn().mockResolvedValue(rawDoc) });

      const user = await service.getById('507f1f77bcf86cd799439011');

      expect(findByIdMock).toHaveBeenCalledWith('507f1f77bcf86cd799439011');
      expect(user).toEqual({ id: rawDoc._id, email: rawDoc.email, username: rawDoc.username, location: rawDoc.location, role: rawDoc.role });
      expect((user as any).password).toBeUndefined();
    });

    it('lance 404 si utilisateur introuvable', async () => {
      findByIdMock.mockReturnValueOnce({ lean: jest.fn().mockResolvedValue(null) });
      await expect(service.getById('x')).rejects.toThrow('Utilisateur introuvable');
    });
  });

  describe('updateUser', () => {
    it('met à jour les champs autorisés et renvoie la projection', async () => {
      const savedDoc: any = {
        _id: '507f1f77bcf86cd799439011',
        email: 'john@doe.com',
        username: 'john',
        location: 'Old',
        role: 'user',
        save: jest.fn().mockResolvedValue(undefined),
      };
      findByIdMock.mockResolvedValueOnce(savedDoc);

      const updated = await service.updateUser(savedDoc._id, { username: 'johnny', location: 'Quebec' });

      expect(findByIdMock).toHaveBeenCalledWith(savedDoc._id);
      expect(savedDoc.username).toBe('johnny');
      expect(savedDoc.location).toBe('Quebec');
      expect(savedDoc.save).toHaveBeenCalledTimes(1);
      expect(updated).toMatchObject({
        id: savedDoc._id,
        email: savedDoc.email,
        username: 'johnny',
        location: 'Quebec',
        role: savedDoc.role,
      });
    });

    it('rejette si aucun champ à mettre à jour', async () => {
      await expect(service.updateUser('id', {} as any)).rejects.toThrow('Aucun champ à mettre à jour');
    });

    it('lance 404 si utilisateur introuvable', async () => {
      findByIdMock.mockResolvedValueOnce(null);
      await expect(service.updateUser('id', { username: 'x' })).rejects.toThrow('Utilisateur introuvable');
    });
  });

  describe('deleteUser', () => {
    it('supprime et renvoie success true', async () => {
      findByIdAndDeleteMock.mockResolvedValueOnce({ _id: 'id' });
      const res = await service.deleteUser('id');
      expect(findByIdAndDeleteMock).toHaveBeenCalledWith('id');
      expect(res).toEqual({ success: true });
    });

    it('lance 404 si utilisateur introuvable', async () => {
      findByIdAndDeleteMock.mockResolvedValueOnce(null);
      await expect(service.deleteUser('id')).rejects.toThrow('Utilisateur introuvable');
    });
  });

  describe('logout', () => {
    it('retourne success true (stateless)', async () => {
      const res = await service.logout();
      expect(res).toEqual({ success: true });
    });
  });
});
