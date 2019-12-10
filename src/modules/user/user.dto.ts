export class UserDto {
    readonly email: string
    readonly password: string
}

export class UpdateUserPasswordDto {
    readonly password: string
    readonly newPassword: string
}