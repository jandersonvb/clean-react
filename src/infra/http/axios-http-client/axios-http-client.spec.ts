import { faker } from '@faker-js/faker'
import { AxiosHttpClient } from './axios-http-client'
import axios from 'axios'
import { type HttpPostParams } from '@/data/protocols/http'

jest.mock('axios')
const mockedAxios: jest.Mocked<Axios.AxiosStatic> = axios as jest.Mocked<typeof axios>

const mockedAxiosResult = {
  status: faker.number.int(),
  statusText: 'OK',
  headers: {},
  config: {
    url: ''
  },
  data: faker.helpers.objectValue({
    key: faker.word.sample()
  })
}

mockedAxios.post.mockResolvedValue(mockedAxiosResult)

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}

const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.helpers.objectValue({
    key: faker.word.sample()
  })
})

describe('AxiosHttpClient', () => {
  test('should call axios with correct values', async () => {
    const request = mockPostRequest()

    const sut = makeSut()

    await sut.post(request)

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })
  test('should return the correct status code and body', async () => {
    const sut = makeSut()

    const request = mockPostRequest()

    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    const httpResponse = await sut.post(request)

    expect(httpResponse).toEqual({
      statusCode: mockedAxiosResult.status,
      body: mockedAxiosResult.data
    })
  })
})
