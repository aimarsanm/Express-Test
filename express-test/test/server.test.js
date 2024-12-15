const request = require('supertest');
const PORT = process.env.PORT || 4444;
const url = `http://localhost:${PORT}`;

describe('Testing index', () => {
  it('GET /', async () => {
    const res = await request(url).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.type).toMatch(/json/);
  });
});
describe('Testing POST /send', () => {
it("POST /send", async () => {
    await request(url).post("/reset").send();
    const res = await request(url).post("/send").send({
      email: "janire@example.com",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.data.length).toBe(1);
    expect(res.body.data[0].email).toMatch("janire@example.com");
  });
});
describe('Testing DELETE /destroy/:id', () => {
it("DELETE /destroy/:id", async () => {
    const res = await request(url).get('/');
    const id = res.body.data[res.body.data.length - 1].id;
    const response = await request(url).delete(`/destroy/${id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.data.length).toBe(res.body.data.length - 1);
  });
});
describe('Testing PUT /update/:id', () => {
it("PUT /update/:id", async () => {
    // Resetea la base de datos ficticia
    await request(url).post("/reset").send();
  
    // Añade un usuario con el email 'janire@example.com'
    let res = await request(url).post("/send").send({
      email: "janire@example.com",
    });
  
    // Verifica que el usuario fue añadido correctamente
    expect(res.statusCode).toBe(201);
    expect(res.body.data.length).toBe(1);
    const id = res.body.data[0].id; // Obtén el ID del usuario recién creado
  
    // Actualiza el email del usuario con PUT
    res = await request(url).put(`/update/${id}`).send({
      email: "erabiltzaile@example.com",
    });
  
    // Verifica que el email se haya actualizado correctamente
    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBe(1);
    expect(res.body.data[0].email).toMatch("erabiltzaile@example.com");
  });
});
  