const connectDB = require('./db');
const { ObjectId } = require('mongodb');

exports.handler = async function (event) {
  const collection = await connectDB();
  const method = event.httpMethod;
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };

  if (method === "OPTIONS") {
    return { statusCode: 204, headers };
  }

  try {
    const id = event.path.split("/").pop();
    if (method === "GET" && event.path.includes("/tasks/") && id) {
      const task = await collection.findOne({ _id: new ObjectId(id) });
      return { statusCode: 200, headers, body: JSON.stringify(task) };
    }

    if (method === "GET") {
      const tasks = await collection.find({}).toArray();
      return { statusCode: 200, headers, body: JSON.stringify(tasks) };
    }

    const body = JSON.parse(event.body);

    if (method === "POST") {
      const result = await collection.insertOne(body);
      return { statusCode: 201, headers, body: JSON.stringify(result.ops[0]) };
    }

    if (method === "PUT") {
      const result = await collection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: body },
        { returnDocument: "after" }
      );
      return { statusCode: 200, headers, body: JSON.stringify(result.value) };
    }

    if (method === "DELETE") {
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount === 0) {
        return { statusCode: 404, headers, body: JSON.stringify({ error: "Завдання не знайдено" }) };
      }
      return { statusCode: 200, headers, body: JSON.stringify({ message: "Завдання видалено" }) };
    }


    return { statusCode: 405, headers, body: "Method Not Allowed" };
  } catch (error) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: error.message }) };
  }
};