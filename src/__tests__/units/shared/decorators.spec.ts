import { resolve } from "path";
import { autoload } from "../../../shared/autoload";
import { container } from "../../../shared/container";
import { Injectable, Inject } from "../../../shared/decorators";

@Injectable("timeService")
// @ts-ignore
export class TimeService {
  public getCurrentDate(): Date {
    return new Date(Date.now());
  }
}

@Injectable("consumer")
// @ts-ignore
export class Consumer {
  // @ts-ignore
  @Inject("timeService") private timeService: TimeService;

  public currentDate: string;

  constructor() {
    // @ts-ignore
    this.currentDate = this.timeService.getCurrentDate();
  }
}

describe("Decorators function test", () => {
  let consumer: Consumer;
  let timeServiceMock: TimeService;

  beforeEach(() => {
    timeServiceMock = { getCurrentDate: jest.fn() };
    (timeServiceMock.getCurrentDate as jest.Mock).mockReturnValue("12/08/2020");

    container._providers["timeService"] = timeServiceMock;

    consumer = new Consumer();
  });

  it("should fetch the date", () => {
    // @ts-ignore
    expect(timeServiceMock.getCurrentDate).toHaveBeenCalledWith();
  });

  it("should set the date", () => {
    // @ts-ignore
    expect(consumer.currentDate).toBe("12/08/2020");
  });
});
