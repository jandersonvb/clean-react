import { faker } from '@faker-js/faker'
import { type HttpPostParams } from '../protocols/http'

export const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.helpers.objectValue({
    key: faker.word.sample()
  })
})
