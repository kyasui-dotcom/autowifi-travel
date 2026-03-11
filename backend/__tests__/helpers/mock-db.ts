// Mock for @/lib/db - provides a chainable mock database
// Usage: jest.mock("@/lib/db", () => require("../__tests__/helpers/mock-db"));

const createChainable = (resolvedValue: unknown = []) => {
  const chain: Record<string, jest.Mock> = {};
  chain.select = jest.fn().mockReturnValue(chain);
  chain.from = jest.fn().mockReturnValue(chain);
  chain.where = jest.fn().mockResolvedValue(resolvedValue);
  chain.orderBy = jest.fn().mockReturnValue(chain);
  chain.limit = jest.fn().mockResolvedValue(resolvedValue);
  chain.insert = jest.fn().mockReturnValue(chain);
  chain.values = jest.fn().mockReturnValue(chain);
  chain.onConflictDoUpdate = jest.fn().mockResolvedValue(undefined);
  return chain;
};

let _chain = createChainable();

export function __setMockRows(rows: unknown[]) {
  _chain = createChainable(rows);
}

export function __setMockError(error: Error) {
  _chain = createChainable();
  _chain.where = jest.fn().mockRejectedValue(error);
  _chain.limit = jest.fn().mockRejectedValue(error);
  _chain.values = jest.fn().mockReturnValue({
    onConflictDoUpdate: jest.fn().mockRejectedValue(error),
  });
  // For insert without onConflictDoUpdate
  const originalInsert = _chain.insert;
  _chain.insert = jest.fn().mockReturnValue({
    values: jest.fn().mockRejectedValue(error),
  });
}

export function __getMockChain() {
  return _chain;
}

export async function getDb() {
  return _chain;
}
