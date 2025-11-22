import { Role } from "../models/roleModel.js";
import User from "../models/userModel.js";

// Get all roles
export const getRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch roles", error });
  }
};

// Create a new role
export const createRole = async (req, res) => {
  try {
    const { name, permissions } = req.body;

    const roleExists = await Role.findOne({ name });
    if (roleExists)
      return res.status(400).json({ message: "Role already exists" });

    const role = new Role({ name, permissions });
    await role.save();

    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({ message: "Failed to create role", error });
  }
};

// Update role
export const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, permissions } = req.body;

    const updated = await Role.findByIdAndUpdate(
      id,
      { name, permissions },
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Role not found" });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update role", error });
  }
};

// Delete role
export const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;

    const role = await Role.findById(id);
    if (!role)
      return res.status(404).json({ message: "Role not found" });

    // remove role from users before deleting
    await User.updateMany({ role: id }, { $unset: { role: "" } });

    await role.deleteOne();

    res.json({ message: "Role deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete role", error });
  }
};
