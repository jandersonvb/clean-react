import { faker } from '@faker-js/faker'

import axios from 'axios'

export const mockAxios = (): jest.Mocked<typeof axios> => {
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

  return mockedAxios
}
