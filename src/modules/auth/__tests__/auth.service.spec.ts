import { Test, TestingModule } from '@nestjs/testing'

import { getPreffix, getTestingWithApp } from '@helpers/testing'

import { AuthModule } from '../auth.module'
import { AuthService } from '../services/auth.service'

describe('auth service testing', () => {
  let authService: AuthService
  let moduleRef: TestingModule

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule(
      getTestingWithApp({
        imports: [AuthModule],
      }),
    ).compile()

    authService = moduleRef.get(AuthService)
  })

  afterAll(async () => {
    await moduleRef.close()
  })

  describe('negative cases', () => {
    it('should throw error if passwords are not the same', async () => {
      const preffix = getPreffix()
      const username = `test${preffix}`
      const password = `secret${preffix}`

      await authService.signUp({
        username,
        password,
      })

      await expect(
        authService.signIn({
          username,
          password: `norightsecret`,
        }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`"password wrong"`)
    })

    it('should throw error on signuo if username already exists', async () => {
      const preffix = getPreffix()
      const username = `test${preffix}`
      const password = `secret${preffix}`
      await authService.signUp({
        username,
        password,
      })

      await expect(
        authService.signUp({
          username,
          password: `qwerty`,
        }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`"Username already exists"`)
    })

    // it('should throw execption when we request private data with fail credentials', () => {})
  })

  describe('positive cases', () => {
    it('should return an token after signup success', async () => {
      const preffix = getPreffix()
      const username = `test${preffix}`
      const res = await authService.signUp({
        username,
        password: `secret${preffix}`,
      })

      expect(res.username).toBe(username)
    })

    it('should return an token after signin success', async () => {
      const preffix = getPreffix()
      const username = `test${preffix}`
      const password = `secret${preffix}`
      await authService.signUp({
        username,
        password,
      })

      const res = await authService.signIn({
        username,
        password,
      })

      expect(res.accessToken).toBeTruthy()
      expect(res.payload.username).toBe(username)
    })

    // it('should return private data if have right credentials', () => {

    // })
  })
})
