const Pet = require('../models/Pet');
const { success, error } = require('../utils/response');

const create = async (req, res) => {
  try {
    const { name, type, breed, gender, birthday, weight, avatar } = req.body;
    const pet = await Pet.create({
      user_id: req.user.id,
      name, type, breed, gender, birthday, weight, avatar
    });
    success(res, pet, '创建成功');
  } catch (err) {
    error(res, 500, err.message);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const pet = await Pet.findByPk(id);
    if (!pet) return error(res, 404, '宠物不存在');
    if (pet.user_id !== req.user.id) return error(res, 403, '无权操作');

    const { name, type, breed, gender, birthday, weight, avatar } = req.body;
    if (name !== undefined) pet.name = name;
    if (type !== undefined) pet.type = type;
    if (breed !== undefined) pet.breed = breed;
    if (gender !== undefined) pet.gender = gender;
    if (birthday !== undefined) pet.birthday = birthday;
    if (weight !== undefined) pet.weight = weight;
    if (avatar !== undefined) pet.avatar = avatar;

    await pet.save();
    success(res, pet, '更新成功');
  } catch (err) {
    error(res, 500, err.message);
  }
};

const deletePet = async (req, res) => {
  try {
    const { id } = req.params;
    const pet = await Pet.findByPk(id);
    if (!pet) return error(res, 404, '宠物不存在');
    if (pet.user_id !== req.user.id) return error(res, 403, '无权操作');

    await pet.destroy();
    success(res, null, '删除成功');
  } catch (err) {
    error(res, 500, err.message);
  }
};

const list = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const offset = parseInt(req.query.offset) || 0;

    const { count, rows } = await Pet.findAndCountAll({
      where: { user_id: req.user.id },
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    });
    success(res, { total: count, list: rows });
  } catch (err) {
    error(res, 500, err.message);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const pet = await Pet.findByPk(id);
    if (!pet) return error(res, 404, '宠物不存在');
    success(res, pet);
  } catch (err) {
    error(res, 500, err.message);
  }
};

module.exports = { create, update, delete: deletePet, list, getById };
