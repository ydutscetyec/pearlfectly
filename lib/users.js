import bcrypt from "bcryptjs";
import { supabase } from "./supabase";

export async function getUsers() {
  const { data, error } = await supabase
    .from("users")
    .select("id, email, name, password, is_admin, created_at")
    .order("created_at", { ascending: true });

  if (error) throw error;

  return data.map((user) => ({
    id: user.id,
    email: user.email,
    name: user.name,
    password: user.password,
    isAdmin: user.is_admin,
    createdAt: user.created_at,
  }));
}

export async function findUserByEmail(email) {
  const normalizedEmail = email?.trim().toLowerCase();

  const { data, error } = await supabase
    .from("users")
    .select("id, email, name, password, is_admin, created_at")
    .eq("email", normalizedEmail)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return {
    id: data.id,
    email: data.email,
    name: data.name,
    password: data.password,
    isAdmin: data.is_admin,
    createdAt: data.created_at,
  };
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

  const { count, error: countError } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true });

  if (countError) throw countError;

  const hashed = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from("users")
    .insert({
      email: normalizedEmail,
      name: name || normalizedEmail.split("@")[0],
      password: hashed,
      is_admin: count === 0,
    })
    .select("id, email, name, is_admin, created_at")
    .single();

  if (error) throw error;

  return {
    id: data.id,
    email: data.email,
    name: data.name,
    isAdmin: data.is_admin,
    createdAt: data.created_at,
  };
}