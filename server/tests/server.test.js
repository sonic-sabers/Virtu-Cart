const axios = require("axios");

describe("Login Endpoint", () => {
  it("should return 200 and a success message on successful login", async () => {
    const response = await axios.post("http://localhost:9000/api/auth/signin", {
      email: "heyAshish123@gmail.com",
      password: "admin2",
    });
    expect(response.data.userData.name).toBe("Ashish Gupta");
  });

  it("should return 401 and a invalid email message on wrong email login", async () => {
    try {
      const response = await axios.post(
        "http://localhost:9000/api/auth/signin",
        {
          email: "heyAshish123@gmail.com",
          password: "admin2",
        }
      );
    } catch (error) {
      expect(error.response.status).toBe(403);
    }
  });

  it("should return 401 and a invalid password message on wrong password login", async () => {
    try {
      const response = await axios.post(
        "http://localhost:9000/api/auth/signin",
        {
          email: "heyAshish123@gmail.com",
          password: "admi2",
        }
      );
    } catch (error) {
      expect(error.response.status).toBe(401);
    }
  });

  it("should return 200 and a success message on successful signup", async () => {
    const response = await axios.post("http://localhost:9000/api/auth/signup", {
      email: "test1@.com",
      password: "ok",
      name: "test1"
    });
    expect(response.userData.name).toBe("test1");
    expect(response.status).toBe(200);
  });
});

describe("User Endpoint", () => {
  it("should return 200 and the user details on successful user fetch", async () => {
    const response = await axios.get(
      "http://localhost:9000/api/user/65214a40b677b35851402ae6",
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MjE0YTQwYjY3N2IzNTg1MTQwMmFlNiIsImlhdCI6MTY5NzA1NjYwMSwiZXhwIjoxNjk3MTQzMDAxfQ.1TmVkijTP6iQ7WdlpoQjUqphk7dmAWo0jf2UBtb1neI`,
        },
      }
    );

    expect(response.data.name).toBe("Ashish Gupta");
  });
});

describe("Product Endpoint", () => {
  it("should return 200 and a success message on successful all product fetch", async () => {
    const response = await axios.get(
      "http://localhost:9000/api/products/all/products"
    );
    expect(response.status).toBe(200);
  });

  it("should return 200 and a success message on successful a product fetch", async () => {
    const response = await axios.get(
      "http://localhost:9000/api/products/6525c22f3068c0877c8a70ce"
    );
    expect(response.status).toBe(200);
  });

  it("should return 200 and a success message on successful best product fetch and have a length of 1", async () => {
    const response = await axios.get(
      "http://localhost:9000/api/products/best/product"
    );
    expect(response.status).toBe(200);
    expect(response.data.length).toBe(1);
  });

  it("should return 200 and a success message on successful new product fetch and have a length of 4", async () => {
    const response = await axios.get(
      "http://localhost:9000/api/products/new/products"
    );
    expect(response.status).toBe(200);
    expect(response.data.length).toBe(4);
  });

  it("should return 200 and a success message on successful new product fetch within a price range", async () => {
    const response = await axios.get(
      "http://localhost:9000/api/products/price/product",
      {
        upperLimit: 1500,
        lowerLimit: 600,
      }
    );
    expect(response.status).toBe(200);
  });

  it("should return 200 and a success message on successful new product fetch within a rating range", async () => {
    const response = await axios.get(
      "http://localhost:9000/api/products/rating/product",
      {
        upperLimit: 4.5,
        lowerLimit: 4,
      }
    );
    expect(response.status).toBe(200);
  });
});

describe("Service Endpoint", () => {
  it("should return 200 and a success message on successful all service fetch", async () => {
    const response = await axios.get(
      "http://localhost:9000/api/services/all/services"
    );
    expect(response.status).toBe(200);
  });

  it("should return 200 and a success message on successful a service fetch", async () => {
    const response = await axios.get(
      "http://localhost:9000/api/services/6524243c07ef559fea3f3ab2"
    );
    expect(response.status).toBe(200);
  });

  it("should return 200 and a success message on successful best service fetch and have a length of 1", async () => {
    const response = await axios.get(
      "http://localhost:9000/api/services/best/service"
    );
    expect(response.status).toBe(200);
    expect(response.data.length).toBe(1);
  });

  it("should return 200 and a success message on successful new service fetch and have a length of 4", async () => {
    const response = await axios.get(
      "http://localhost:9000/api/services/new/services"
    );
    expect(response.status).toBe(200);
    expect(response.data.length).toBe(4);
  });

  it("should return 200 and a success message on successful new service fetch within a price range", async () => {
    const response = await axios.get(
      "http://localhost:9000/api/services/price/service",
      {
        upperLimit: 8000,
        lowerLimit: 2000,
      }
    );
    expect(response.status).toBe(200);
  });

  it("should return 200 and a success message on successful new service fetch within a rating range", async () => {
    const response = await axios.get(
      "http://localhost:9000/api/services/rating/service",
      {
        upperLimit: 4.5,
        lowerLimit: 4,
      }
    );
    expect(response.status).toBe(200);
  });
});
