import bcrypt from "bcryptjs";
import fs from "fs/promises";
import path from "path";
import { getSupabaseAdmin } from "./supabase";

const usersFile = path.join(process.cwd(), "data", "users.json");

function mapUserFromSupabase(user) {
  if (!user) return null;

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    password: user.password,
    isAdmin: Boolean(user.is_admin),
    createdAt: user.created_at,
  };
}

async function readLocalUsers() {
  try {
    const content = await fs.readFile(usersFile, "utf8");
    return JSON.parse(content);
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.mkdir(path.dirname(usersFile), { recursive: true });
      await fs.writeFile(usersFile, JSON.stringify([], null, 2));
      return [];
    }

    throw error;
  }
}

async function writeLocalUsers(users) {
  await fs.mkdir(path.dirname(usersFile), { recursive: true });
  await fs.writeFile(usersFile, JSON.stringify(users, null, 2));
}

function isConfiguredAdminEmail(email) {
  const adminEmails = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

  return adminEmails.includes(email.trim().toLowerCase());
}

export async function getUsers() {
  const supabase = getSupabaseAdmin();

  if (supabase) {
    const { data, error } = await supabase
      .from("users")
      .select("id, email, name, password, is_admin, created_at")
      .order("created_at", { ascending: true });

    if (error) throw error;

    return (data || []).map(mapUserFromSupabase);
  }

  return readLocalUsers();
}

export async function findUserByEmail(email) {
  const normalizedEmail = email?.trim().toLowerCase();
  if (!normalizedEmail) return null;

  const supabase = getSupabaseAdmin();

  if (supabase) {
    const { data, error } = await supabase
      .from("users")
      .select("id, email, name, password, is_admin, created_at")
      .eq("email", normalizedEmail)
      .maybeSingle();

    if (error) throw error;

    return mapUserFromSupabase(data);
  }

  const users = await readLocalUsers();
  return users.find((user) => user.email?.toLowerCase() === normalizedEmail) || null;
}

export async function verifyCredentials(email, password) {
  const user = await findUserByEmail(email);

  if (!user) return null;

  const match = await bcrypt.compare(password, user.password);

  if (!match) return null;

  return user;
}

export async function addUser({ email, name, password }) {
  const normalizedEmail = email.trim().toLowerCase();
  const existing = await findUserByEmail(normalizedEmail);

  if (existing) return null;

  const hashed = await bcrypt.hash(password, 10);
  const isAdmin = isConfiguredAdminEmail(normalizedEmail);
  const displayName = name || normalizedEmail.split("@")[0];

  const supabase = getSupabaseAdmin();

  if (supabase) {
    const { data, error } = await supabase
      .from("users")
      .insert({
        email: normalizedEmail,
        name: displayName,
        password: hashed,
        is_admin: isAdmin,
      })
      .select("id, email, name, is_admin, created_at")
      .single();

    if (error) throw error;

    return mapUserFromSupabase(data);
  }

  const users = await readLocalUsers();
  const newUser = {
    id: Date.now(),
    email: normalizedEmail,
    name: displayName,
    password: hashed,
    isAdmin,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  await writeLocalUsers(users);

  const { password: _password, ...safeUser } = newUser;
  return safeUser;
}
