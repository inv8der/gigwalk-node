// @flow
export type ForgotPasswordParams = {
    email: string
}

export type ResetPasswordParams = {
    email: string,
    password: string,
    token: string,
    checkExpired?: boolean
}
