// TODO : faire les regex ici et les rajouter dans les models quand fini
import { z } from "zod";

export const regex = {
  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  usernameRegex: /^[a-zA-Z0-9._-]{3,30}$/,
  nameRegex: /^[a-zA-ZÀ-ÿ0-9 .,'-]{1,100}$/,
  passwordRegex:
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>\/?]).{8,}$/,
};

export const constraints = {
  name: { min: 1, max: 100 },
  description: { min: 0, max: 1000 },
  username: { min: 3, max: 30 },
  reviewMaxLength: 2000,
};

export const validators = {
  sanitizeText: (text: string): string =>
    text.replace(/<[^>]*>?/gm, "").slice(0, constraints.description.max),
};

export const userZodSchema = z.object({
  email: z.string().regex(regex.emailRegex, "l'email n'est pas valide"),
  username: z
    .string()
    .min(constraints.username.min, "le nom d'utilisateur doit avoir au moins 3 caractères")
    .max(constraints.username.max, "le nom d'utilisateur doit avoir maximum 30 caractères")
    .regex(regex.usernameRegex, "les caractères du nom d'utilisateur ne sont pas valides"),
  password: z
    .string()
    .regex(
      regex.passwordRegex,
      "le mot de passe est invalide (8+ caractères, majuscule, chiffre, symbole)"
    ),
});

export const categoryZodSchema = z.object({
  name: z
    .string()
    .min(constraints.name.min, "le nom est trop court")
    .max(constraints.name.max, "le nom est trop long")
    .regex(regex.nameRegex, "le nom contient des caractères invalides"),
  description: z
    .string()
    .max(constraints.description.max, "la description est trop longue")
    .transform(validators.sanitizeText)
    .optional(),
  initialAdvice: z.array(z.string()).optional(),
  categoryIcon: z.string().min(1, "l'icône est requise"),
});

export const plantZodSchema = z.object({
  name: z
    .string()
    .min(constraints.name.min, "le nom est trop court")
    .max(constraints.name.max, "le nom est trop long")
    .regex(regex.nameRegex, "le nom contient des caractères invalides"),
  categoryId: z.string().min(1, "la catégorie est requise"),
  inventoryId: z.string().min(1, "l'inventaire est requis"),
  description: z
    .string()
    .max(constraints.description.max, "la description est trop longue")
    .transform(validators.sanitizeText)
    .optional(),
  creationDate: z.string().optional(),
  lastWatered: z.string().optional(),
});