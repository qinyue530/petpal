const Vaccine = require('../models/Vaccine');
const Pet = require('../models/Pet');
const { success, error } = require('../utils/response');

const create = async (req, res) => {
  try {
    const { pet_id, name, date, next_date, remark } = req.body;
    if (!pet_id || !name || !date) return error(res, 400, '参数不完整');

    // 验证宠物是否属于当前用户
    const pet = await Pet.findByPk(pet_id);
    if (!pet) return error(res, 404, '宠物不存在');
    if (pet.user_id !== req.user.id) return error(res, 403, '无权操作');

    const vaccine = await Vaccine.create({
      pet_id, name, date, next_date, remark
    });
    success(res, vaccine, '添加成功');
  } catch (err) {
    error(res, 500, err.message);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const vaccine = await Vaccine.findByPk(id);
    if (!vaccine) return error(res, 404, '疫苗记录不存在');

    // 验证宠物是否属于当前用户
    const pet = await Pet.findByPk(vaccine.pet_id);
    if (!pet || pet.user_id !== req.user.id) return error(res, 403, '无权操作');

    const { name, date, next_date, remark } = req.body;
    if (name !== undefined) vaccine.name = name;
    if (date !== undefined) vaccine.date = date;
    if (next_date !== undefined) vaccine.next_date = next_date;
    if (remark !== undefined) vaccine.remark = remark;

    await vaccine.save();
    success(res, vaccine, '更新成功');
  } catch (err) {
    error(res, 500, err.message);
  }
};

const deleteVaccine = async (req, res) => {
  try {
    const { id } = req.params;
    const vaccine = await Vaccine.findByPk(id);
    if (!vaccine) return error(res, 404, '疫苗记录不存在');

    const pet = await Pet.findByPk(vaccine.pet_id);
    if (!pet || pet.user_id !== req.user.id) return error(res, 403, '无权操作');

    await vaccine.destroy();
    success(res, null, '删除成功');
  } catch (err) {
    error(res, 500, err.message);
  }
};

const list = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const offset = parseInt(req.query.offset) || 0;
    const { pet_id } = req.query;

    if (!pet_id) return error(res, 400, '宠物ID不能为空');

    // 验证宠物是否属于当前用户
    const pet = await Pet.findByPk(pet_id);
    if (!pet) return error(res, 404, '宠物不存在');
    if (pet.user_id !== req.user.id) return error(res, 403, '无权操作');

    const { count, rows } = await Vaccine.findAndCountAll({
      where: { pet_id },
      limit,
      offset,
      order: [['date', 'ASC']]
    });
    success(res, { total: count, list: rows });
  } catch (err) {
    error(res, 500, err.message);
  }
};

const complete = async (req, res) => {
  try {
    const { id } = req.params;
    const vaccine = await Vaccine.findByPk(id);
    if (!vaccine) return error(res, 404, '疫苗记录不存在');

    const pet = await Pet.findByPk(vaccine.pet_id);
    if (!pet || pet.user_id !== req.user.id) return error(res, 403, '无权操作');

    vaccine.completed = true;
    await vaccine.save();
    success(res, vaccine, '标记完成');
  } catch (err) {
    error(res, 500, err.message);
  }
};

module.exports = { create, update, delete: deleteVaccine, list, complete };
