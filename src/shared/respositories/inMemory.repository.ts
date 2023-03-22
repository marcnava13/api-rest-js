import { sleep } from "../utils";
import { Entity, Pagination } from "./types.repository";

export class InMemoryRepository<T extends Entity> {
  private static _instance: InMemoryRepository<any>;
  private data: T[] = [];

  constructor() {
    if (!InMemoryRepository._instance) {
      InMemoryRepository._instance = this;
    }

    return InMemoryRepository._instance;
  }

  public async create(entity: T): Promise<void> {
    await sleep();
    this.data.push(entity);
  }

  public async findById(id: T["id"]): Promise<T | undefined> {
    await sleep();
    return this.data.find((entity) => entity.id === id);
  }

  public async update(
    id: string,
    entity: Partial<Omit<T, "id">>
  ): Promise<void> {
    await sleep();
    this.data = this.data.map((prevEntity) =>
      prevEntity.id === id ? { ...prevEntity, ...entity } : prevEntity
    );
  }

  public async delete(id: T["id"]): Promise<void> {
    await sleep();
    this.data = this.data.filter((entity) => entity.id !== id);
  }

  public async findAll(pagination: Pagination<T>): Promise<T[]> {
    let result = [...this.data];
    const { page, limit, filter, sort } = pagination;

    if (filter) {
      const filterArray = Object.entries(filter) as [keyof T, string][];

      result = result.filter((entity: T) => {
        return filterArray.every(([key, value]) => {
          return entity[key] === value.toLowerCase();
        });
      });
    }

    if (sort) {
      function isNumeric(n: any) {
        return !isNaN(parseFloat(n)) && isFinite(n);
      }

      function isString(s: any) {
        return typeof s === "string" || s instanceof String;
      }

      result = result.sort((a: T, b: T) => {
        const key = sort.field;
        const sorting = sort.order === "asc" ? 1 : -1;

        if (!a) return 1;
        if (!a[key]) return 1;
        if (!b) return -1;
        if (!b[key]) return 1;
        if (isNumeric(a[key]) && isNumeric(b[key])) {
          return ((a[key] as number) - (b[key] as number)) * sorting;
        }
        if (isString(a[key]) && isString(b[key])) {
          return (
            (a[key] as string)
              .toLowerCase()
              .localeCompare((b[key] as string).toLowerCase()) * sorting
          );
        }

        return 1;
      });
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    result = result.slice(startIndex, endIndex);

    return result;
  }
}
