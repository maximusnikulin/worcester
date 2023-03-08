import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'

import { getTestingWithApp } from '@helpers/testing'

import { AuthModule } from '../auth.module'
import { AuthRepository } from '../repos/auth.repo'

describe('Auth controller', () => {
  let app: INestApplication
  let moduleRef: TestingModule

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule(getTestingWithApp()).compile()

    app = moduleRef.createNestApplication()
    await app.init()
  })

  it(`/GET private data should fail`, () => {
    return request(app.getHttpServer()).get('/private-hello').expect(401)
  })

  it(`/GET private data should should be success after sign-up and sign-in`, async () => {
    const authRepo = moduleRef.get(AuthRepository)
    const credentials = {
      username: 'lory',
      password: 'secret123I',
    }

    await authRepo.delete({
      username: credentials.username,
    })

    await request(app.getHttpServer())
      .post('/auth/signup')
      .send(credentials)
      .expect(201)

    const {
      body: { accessToken: token },
    } = await request(app.getHttpServer())
      .post('/auth/signin')
      .send(credentials)
      .expect(200)

    const authHeader = `Bearer ${token}`

    await request(app.getHttpServer())
      .get('/private-hello')
      .set('Authorization', authHeader)
      .expect(200)

    await request(app.getHttpServer())
      .post('/auth/logout')
      .set('Authorization', authHeader)
      .expect(200)

    await request(app.getHttpServer()).get('/private-hello').expect(401)
  })

  afterAll(async () => {
    await app.get(AuthRepository).clear()
    await app.close()
  })
})
