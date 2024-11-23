export interface Customers {
    id: number;
    name: string | null;
    email: string | null;
    cpf: string | null;
    isAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
    password?: string | null;
}
