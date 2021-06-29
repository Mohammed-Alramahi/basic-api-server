"use strict";

const supertest = require("supertest");
const server = require("../src/server");
const request = supertest(server.server);

describe("Server Test Group", () => {
  let id;
  it("Handles bad route", async () => {
    const response = await request.get("/hello");
    expect(response.status).toEqual(404);
  });

  it("Handles bad method", async () => {
    const response = await request.post("/person?name=yazan");
    expect(response.status).toEqual(404);
  });

  it("Handles post method", async () => {
    const sentObj = {
      name: "yazan",
      description: "100",
    };
    const response = await request.post("/api/v1/clothes").send(sentObj);
    id = response.body.id;
    expect(response.status).toEqual(200);
    expect(response.body.data.name).toBe(sentObj.name);
    expect(response.body.data.description).toBe(sentObj.description);
  });

  it("Handles reading a list of records", async () => {
    const sentObj = {
      name: "yazan",
      description: "100",
    };

    const sentObj2 = {
      name: "moe",
      description: "100",
    };

    await request.post("/api/v1/clothes").send(sentObj);
    await request.post("/api/v1/clothes").send(sentObj2);

    const response = await request.get("/api/v1/clothes");
    expect(response.status).toEqual(200);
    expect(response.body.length).toBe(3);
  });

  it("Handles reading a record", async () => {
    const response = await request.get("/api/v1/clothes/" + id);
    expect(response.status).toEqual(200);
    expect(response.body.data.name).toBe("yazan");
  });

  it("Handles updating a record", async () => {
    const newObj = {
      name: "potato",
      description: "5",
    };

    const response = await request.put("/api/v1/clothes/" + id).send(newObj);
    expect(response.status).toEqual(200);
    expect(response.body.data.name).toBe("potato");
  });

  it("Handles deleting a record", async () => {
    const response = await request.delete("/api/v1/clothes/" + id);
    expect(response.status).toEqual(200);
    expect(response.body).toBe("");
  });
});
