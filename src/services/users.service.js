// src/services/users.service.js
import { pool } from "../db/index.js";

/**
 * findById
 */
export const findById = async (id) => {
  const r = await pool.query(
    `SELECT id, email, full_name, role, created_at FROM users WHERE id=$1`,
    [id]
  );
  if (r.rows.length === 0) throw new Error("User not found");
  return r.rows[0];
};

/**
 * updateProfile - allow updating full_name, maybe other safe fields
 */
export const updateProfile = async (id, payload) => {
  const { full_name } = payload;
  const r = await pool.query(
    `UPDATE users SET full_name = COALESCE($1, full_name) WHERE id=$2 RETURNING id, email, full_name, role, created_at`,
    [full_name, id]
  );
  if (r.rows.length === 0) throw new Error("User not found");
  return r.rows[0];
};

/**
 * upgradeToRecruiter - make role 'recruiter'
 * Basic policy: only change if currently 'candidate'; no extra approval flow.
 */
export const upgradeToRecruiter = async (id) => {
  const cur = await pool.query(`SELECT role FROM users WHERE id=$1`, [id]);
  if (cur.rows.length === 0) throw new Error("User not found");

  if (cur.rows[0].role === "recruiter") {
    throw new Error("User already a recruiter");
  }

  const r = await pool.query(
    `UPDATE users SET role = 'recruiter' WHERE id=$1 RETURNING id, email, full_name, role, created_at`,
    [id]
  );

  return r.rows[0];
};
