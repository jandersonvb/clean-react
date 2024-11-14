import { HttpStatusCode, type HttpPostClient } from '@/data/protocols/http'
import { type Authentication, type AuthenticationParams } from '@/domain/usecases'
import { UnexpectedError, InvalidCredentialsError } from '@/domain/errors'

import { type AccountModel } from '@/domain/models'

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AuthenticationParams, AccountModel>
  ) {}

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return httpResponse.body!
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError()
      default:
        throw new UnexpectedError()
    }
  }
}
