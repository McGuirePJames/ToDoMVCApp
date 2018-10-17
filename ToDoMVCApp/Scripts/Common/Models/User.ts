export class User {
    TwoFactorEnabled: boolean;
    PhoneNumberConfirmed: boolean;
    PhoneNumber: string;
    ConcurrencyStamp: string;
    SecurityStamp: string;
    PasswordHash: string;
    EmailConfirmed: boolean;
    NormalizedEmail: string;
    email: string;
    NormalizedUserName: string;
    UserName: string;
    LockoutEnabled: boolean;
    AccessFailedCount: number;
}
export default User;