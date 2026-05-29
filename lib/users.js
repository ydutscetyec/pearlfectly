import fs from "fs/promises";
import path from "path";
import bcrypt from "bcryptjs";

const usersFile = path.join(process.cwd(), "data", "users.json");

async function readJson(filePath, fallback) {
  try {
    const content = await fs.readFile(filePath, "utf8");
    return JSON.parse(content);
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, JSON.stringify(fallback, null, 2));
      return fallback;
    }
    throw error;
  }
}

async function writeJson(filePath, data) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

export async function getUsers() {
  return readJson(usersFile, []);
}

export async function findUserByEmail(email) {
  const users = await getUsers();
  return users.find(
    (user) => user.email?.toLowerCase() === email?.toLowerCase()
  );
}

export async function verifyCredentials(email, password) {
  const user = await findUserByEmail(email);
  if (!user) return null;
  const match = await bcrypt.compare(password, user.password);
  if (!match) return null;
  return user;
}

export async function addUser({ email, name, password }) {
  const existing = await findUserByEmail(email);
  if (existing) {
    return null;
  }

  const users = await getUsers();
  const hashed = await bcrypt.hash(password, 10);

  const user = {
    id: Date.now(),
    email: email.toLowerCase(),
    name: name || email.split("@")[0],
    password: hashed,
    isAdmin: users.length === 0,
    createdAt: new Date().toISOString(),
  };

  users.push(user);
  await writeJson(usersFile, users);
  return user;
}
