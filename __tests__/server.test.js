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
    const response = await request.post("/person?name=Alaa");
    expect(response.status).toEqual(404);
  });

  it("Handles post method", async () => {
    const dataObject = {
      name: "Alaa",
      description: "any",
    };
    const response = await request.post("/api/v1/clothes").send(dataObject);
    id = response.body.id;
    expect(response.status).toEqual(200);
    expect(response.body.data.name).toBe(dataObject.name);
    expect(response.body.data.description).toBe(dataObject.description);
  });

  it("Handles reading a list of records", async () => {
    const dataObject = {
      name: "Alaa",
      description: "funny guy",
    };

    const dataObject2 = {
      name: "khalid",
      description: "funny guy",
    };

    await request.post("/api/v1/clothes").send(dataObject);
    await request.post("/api/v1/clothes").send(dataObject2);

    const response = await request.get("/api/v1/clothes");
    expect(response.status).toEqual(200);
    expect(response.body.length).toBe(3);
  });

  it("Handles reading a record", async () => {
    const response = await request.get("/api/v1/clothes/" + id);
    expect(response.status).toEqual(200);
    expect(response.body.data.name).toBe("Alaa");
  });

  it("Handles updating a record", async () => {
    const newObj = {
      name: "potato",
      description: "any",
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
