// src/controllers/companies.controller.js
import * as companiesService from "../services/companies.service.js";

/** Create company - owner becomes req.user.id */
export const createCompany = async (req, res) => {
  try {
    const payload = req.body;
    const company = await companiesService.createCompany(req.user.id, payload);
    res.status(201).json({ message: "Company created", company });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const listCompanies = async (req, res) => {
  try {
    const companies = await companiesService.listCompanies();
    res.json({ companies });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCompany = async (req, res) => {
  try {
    const company = await companiesService.getCompanyById(req.params.id);
    res.json({ company });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const company = await companiesService.updateCompany(req.user.id, req.params.id, req.body);
    res.json({ message: "Company updated", company });
  } catch (err) {
    // could be 403/404/400 depending on service error
    const status = err.message === "Forbidden" ? 403 : 400;
    res.status(status).json({ error: err.message });
  }
};

export const deleteCompany = async (req, res) => {
  try {
    await companiesService.deleteCompany(req.user.id, req.params.id);
    res.json({ message: "Company deleted" });
  } catch (err) {
    const status = err.message === "Forbidden" ? 403 : 400;
    res.status(status).json({ error: err.message });
  }
};
