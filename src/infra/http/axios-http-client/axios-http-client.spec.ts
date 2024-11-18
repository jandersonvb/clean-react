import { faker } from '@faker-js/faker'
import { AxiosHttpClient } from './axios-http-client'
import axios from 'axios'

jest.mock('axios')
const mockedAxios: jest.Mocked<Axios.AxiosStatic> = axios as jest.Mocked<typeof axios>

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}

describe('AxiosHttpClient', () => {
  test('should call axios with correct URL and verb', async () => {
    const url = faker.internet.url()

    const sut = makeSut()

    await sut.post({ url })

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockedAxios.post).toHaveBeenCalledWith(url)
  })
})
