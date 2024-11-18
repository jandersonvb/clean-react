import { AxiosHttpClient } from './axios-http-client'

import type axios from 'axios'

import { mockPostRequest } from '@/data/test'
import { mockAxios } from '@/infra/test'

jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxios()

  return {
    sut,
    mockedAxios
  }
}

describe('AxiosHttpClient', () => {
  test('should call axios with correct values', async () => {
    const request = mockPostRequest()

    const { sut, mockedAxios } = makeSut()

    await sut.post(request)

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })
  test('should return the correct status code and body', () => {
    const { sut, mockedAxios } = makeSut()

    const request = mockPostRequest()

    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    const promise = sut.post(request)

    expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
  })
})
