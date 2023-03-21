export class Container {
  public _providers: { [key: string]: any } = {};

  public resolve(token: string) {
    const matchedProvider = this._providers[token];

    if (matchedProvider) {
      return matchedProvider;
    } else {
      throw new Error(`No provider found for ${token}!`);
    }
  }
}

export const container = new Container();
