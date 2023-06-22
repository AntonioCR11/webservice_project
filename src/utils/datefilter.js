const { Op } = require("sequelize");

class DateFilter {
    /**
     * 
     * @param {Express.Request} req The request object containing the user request information.
     * @param {Object} modifier The filter object that will be modified.
     * @returns Object The filter object that has applied the date filter by user request.
     */
    static appendModifier(req, modifier) {
        const { onlyDate, startDate, endDate } = req.query;

        if (onlyDate != undefined) {
            modifier.where["created_at"] = {}

            modifier.where["created_at"][Op.between] = [Date.parse(onlyDate), Date.parse(onlyDate) + (1000 * 60 * 60 * 24 - 1)]
            console.log(modifier.where["created_at"]);
        }
        else  {
            if (startDate != undefined || endDate != undefined) {
                modifier.where["created_at"] = {}
                
                if (startDate != undefined) {
                    modifier.where["created_at"][Op.gte] = Date.parse(startDate);
                }
                if (endDate != undefined) {
                    modifier.where["created_at"][Op.lte] = Date.parse(endDate) + (1000 * 60 * 60 * 24 - 1);
                }
            }
        }

        return modifier;
    }
}

module.exports = DateFilter;