export interface JwtPayload {
  id: number
  username: string
}

export type SignUpResponse = {
  username: string
  id: number
}

export interface LogoutResponse {
  userId: number
  status: true
}
