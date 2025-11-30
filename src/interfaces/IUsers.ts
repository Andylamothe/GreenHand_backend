export interface IUsers {
    id: number;
    username: string;
    email: string;
    password: string;
    location: string;
    inventoryId?: number;
    createdAt: Date;
}