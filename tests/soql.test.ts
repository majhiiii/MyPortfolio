import { describe, it, expect } from "vitest";

interface MockOpportunity {
  Id: string;
  Name: string;
  Amount: number;
  StageName: string;
}

const OPPORTUNITY_DATA: MockOpportunity[] = [
  { Id: "0061", Name: "Alpha", Amount: 20000, StageName: "Prospecting" },
  { Id: "0062", Name: "Beta", Amount: 80000, StageName: "Closed Won" },
  { Id: "0063", Name: "Gamma", Amount: 150000, StageName: "Closed Won" },
];

function evaluateMockSoql(query: string, data: MockOpportunity[]) {
  const upper = query.toUpperCase();
  let results = [...data];

  if (upper.includes("WHERE AMOUNT > 50000")) {
    results = results.filter((r) => r.Amount > 50000);
  }

  if (upper.includes("ORDER BY AMOUNT DESC")) {
    results.sort((a, b) => b.Amount - a.Amount);
  }

  return results;
}

describe("SOQL Mock Evaluator", () => {
  it("filters records based on WHERE clause", () => {
    const query = "SELECT Id, Name, Amount FROM Opportunity WHERE Amount > 50000";
    const res = evaluateMockSoql(query, OPPORTUNITY_DATA);

    expect(res.length).toBe(2);
    expect(res.every((r) => r.Amount > 50000)).toBe(true);
  });

  it("orders records descending when ORDER BY DESC is present", () => {
    const query = "SELECT Id, Amount FROM Opportunity WHERE Amount > 50000 ORDER BY Amount DESC";
    const res = evaluateMockSoql(query, OPPORTUNITY_DATA);

    expect(res[0].Amount).toBe(150000);
    expect(res[1].Amount).toBe(80000);
  });
});
