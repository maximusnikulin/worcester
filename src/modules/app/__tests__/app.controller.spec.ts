import { Test, TestingModule } from '@nestjs/testing'

import { getTestingWithApp } from '@helpers/testing'

import { AppController } from '../app.controller'

describe('AppController', () => {
  let app: TestingModule

  beforeAll(async () => {
    app = await Test.createTestingModule(getTestingWithApp()).compile()
  })

  it('should return "Hello World!"', () => {
    const appController = app.get<AppController>(AppController)
    expect(appController.getHello()).toBe('Hello World!')
  })
})
