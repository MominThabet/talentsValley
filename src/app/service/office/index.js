const Office = require('../../../model/office');

module.exports.addOffice = async (data) => {
  try {
    const { name, address, workingHours, fees } = data;
    const isOffice = await Office.findOne({ name, address, isDeleted: false });
    if (isOffice) {
      return { code: 2, message: 'office already exists', data: null };
    }
    const office = await Office.create({
      name,
      address,
      workingHours,
      fees,
    });
    return {
      code: 0,
      message: 'office added successfully',
      data: office,
    };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
// TODO:ADD PAGINATION IF NEEDED AND THERE IS TIME
module.exports.getAllOffices = async () => {
  try {
    const offices = await Office.find();
    if (offices.length === 0) {
      return { code: 1, message: 'no offices', data: null };
    }
    return { code: 0, message: 'offices', data: offices };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
