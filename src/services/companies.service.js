// src/services/companies.service.js
import { pool } from "../db/index.js";

/**
 * createCompany - ownerId is the recruiter creating it
 * payload: { name, about }
 */
export const createCompany = async (ownerId, payload) => {
  const { name, about = null } = payload;
  if (!name) throw new Error("Company name is required");

  const r = await pool.query(
    `INSERT INTO companies (owner_id, name, about)
     VALUES ($1, $2, $3)
     RETURNING id, owner_id, name, about, created_at, updated_at`,
    [ownerId, name, about]
  );
  return r.rows[0];
};

export const listCompanies = async () => {
  const r = await pool.query(
    `SELECT id, owner_id, name, about, created_at
     FROM companies
     ORDER BY created_at DESC`
  );
  return r.rows;
};

export const getCompanyById = async (id) => {
  const r = await pool.query(
    `SELECT id, owner_id, name, about, created_at
     FROM companies
     WHERE id=$1`,
    [id]
  );
  if (r.rows.length === 0) throw new Error("Company not found");
  return r.rows[0];
};

/**
 * updateCompany - only owner can update
 */
export const updateCompany = async (userId, companyId, payload) => {
  const cur = await pool.query(
    `SELECT owner_id FROM companies WHERE id=$1`,
    [companyId]
  );
  if (cur.rows.length === 0) throw new Error("Company not found");
  if (cur.rows[0].owner_id !== userId) throw new Error("Forbidden");

  const { name, about } = payload;
  const r = await pool.query(
    `UPDATE companies
     SET name = COALESCE($1, name),
         about = COALESCE($2, about)
     WHERE id=$3
     RETURNING id, owner_id, name, about, created_at, updated_at`,
    [name, about, companyId]
  );
  return r.rows[0];
};

/**
 * deleteCompany - only owner can delete
 */
export const deleteCompany = async (userId, companyId) => {
  const cur = await pool.query(
    `SELECT owner_id FROM companies WHERE id=$1`,
    [companyId]
  );
  if (cur.rows.length === 0) throw new Error("Company not found");
  if (cur.rows[0].owner_id !== userId) throw new Error("Forbidden");

  await pool.query(`DELETE FROM companies WHERE id=$1`, [companyId]);
  return;
};
