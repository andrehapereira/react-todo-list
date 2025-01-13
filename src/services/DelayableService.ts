import { AxiosResponse } from "axios";

export class DelayableService {
  #SLEEP = 5000;

  protected sleep(ms?: number) {
    return (response: AxiosResponse) =>
      new Promise<AxiosResponse>((resolve) =>
        setTimeout(() => resolve(response), ms ?? this.#SLEEP)
      );
  }
}
