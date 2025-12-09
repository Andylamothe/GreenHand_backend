import { User } from "../models/Users";
import { HttpException } from "../utils/http-exception";

// ===========================================================
// USER SERVICE
// - Encapsule la logique métier pour l'utilisateur courant
// - getById, updateUser, deleteUser, logout (stateless JWT)
// ===========================================================
export class UserService {
  // ---------------------------------------------------------
  // Récupère un utilisateur par son id et masque le password
  // ---------------------------------------------------------
  async getById(userId: string) {
    const user = await User.findById(userId).lean();
    if (!user) throw new HttpException(404, "Utilisateur introuvable");

    const { password, ...safe } = user as any;
    return { id: user._id, ...safe };
  }

  // ---------------------------------------------------------
  // Met à jour quelques champs autorisés. Le middleware Mongoose
  // re-hash le password si modifié (pre('save')).
  // ---------------------------------------------------------
  async updateUser(userId: string, data: { username?: string; location?: string; password?: string }) {
    if (!data || Object.keys(data).length === 0) {
      throw new HttpException(400, "Aucun champ à mettre à jour");
    }

    const user = await User.findById(userId);
    if (!user) throw new HttpException(404, "Utilisateur introuvable");

    if (typeof data.username === "string") user.username = data.username;
    if (typeof data.location === "string") user.location = data.location as any;
    if (typeof data.password === "string") user.password = data.password; // pre-save hook will hash

    await user.save();

    return {
      id: user._id,
      email: user.email,
      username: user.username,
      role: user.role,
      location: (user as any).location,
      createdAt: user.createdAt,
    };
  }

  // ---------------------------------------------------------
  // Supprime l'utilisateur par id
  // ---------------------------------------------------------
  async deleteUser(userId: string) {
    const user = await User.findByIdAndDelete(userId);
    if (!user) throw new HttpException(404, "Utilisateur introuvable");
    return { success: true };
  }

  // ---------------------------------------------------------
  // Logout (stateless JWT): rien à invalider coté serveur
  // ---------------------------------------------------------
  async logout() {
    // Stateless JWT: côté serveur, rien à faire (sauf si blacklist, non implémentée)
    return { success: true };
  }
}
