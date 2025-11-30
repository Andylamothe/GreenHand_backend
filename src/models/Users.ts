//TODO faire les relations entre les models via les methodes appropriées
// Pour l'instant, juste les classes de base avec les attributs et constructeurs

export class Users {   
    id: number;
    username: string;
    email: string;
    password: string;
    location: string;
    inventoryId?: number; // Référence à l'inventaire de l'utilisateur
    createdAt: Date;

    constructor(id: number, username: string, email: string, password: string, location: string, createdAt: Date) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.location = location;
        this.createdAt = createdAt;
    }
}