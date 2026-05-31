import fs from "fs/promises";
import path from "path";
import bcrypt from "bcryptjs";

const usersFile = path.join(process.cwd(), "data", "users.json");

async function readJson(filePath, fallback) {
  try {
    const content = await fs.readFile(filePath, "utf8");
    return JSON.parse(content);
  } catch {
    return fallback;
  }
}

async function writeJson(filePath, data) {
  if (process.env.VERCEL) {
    throw new Error("User signup is not available online until a real database is connected.");
  }

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
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (
    adminEmail &&
    adminPassword &&
    email?.trim().toLowerCase() === adminEmail &&
    password === adminPassword
  ) {
    return {
      id: "admin",
      email: adminEmail,
      name: "Admin",
      isAdmin: true,
    };
  }

  const user = await findUserByEmail(email);
  if (!user) return null;

  const match = await bcrypt.compare(password, user.password);
  if (!match) return null;

  return user;
}

export async function addUser({ email, name, password }) {
  if (process.env.VERCEL) {
    throw new Error("Signup needs an online database. Local JSON users cannot be saved on Vercel.");
  }

  const existing = await findUserByEmail(email);
  if (existing) return null;

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