const db = require("../database/dbConfig");

const { add } = require("./users-model");

describe("users model", function() {
  describe("add()", function() {
    beforeEach(async () => {
      await db("users").truncate();
    });

    it("should add a user", async function() {
      await add({ username: "users", password: "pass" });
      const users = await db("users"); 
      expect(users).toHaveLength(1); 
    });

    it("should insert the provided user", async function() {
      await add({ username: "john", password: "pass" });
      await add({ username: "amy", password: "pass" });

      const users = await db("users"); 

      expect(users).toHaveLength(2); 
      expect(users[0].username).toBe("john"); 
      expect(users[1].username).toBe("amy"); 
    });

    it("should return the inserted user", async function() {
      let user = await add({ username: "john", password: "pass" });
      expect(user.username).toBe("john");
      expect(user.id).toBeDefined(); 

      user = await add({ username: "amy", password: "pass" });
      expect(user.username).toBe("amy");
      expect(user.id).toBeDefined();
    });
  });
});