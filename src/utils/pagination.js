class PaginationUtil {
    /**
     * Get all comments that belongs to a certain dev user.
     * 
     * The list of the comments are paginated and if a `page` and `limit` query params is not set, it
     * will default to the first page and limit it at max 30 rows.
     * 
     * @param {Express.Request} req The request object containing the user request.
     * @param {Object} modifier The modifiers that will be used to fetch the list of models.
     * @param {Express.Model} model The modifiers that will be used to fetch the list of models.
     * @returns An object containing a max page for the pagination, as well as the list of models.
     */
    static async getPaginatedModels(req, modifier, model) {
        let { page, limit } = req.query;

        page ??= 1;
        limit ??= 30;

        page = Number(page);
        limit = Number(limit);
        
        if (isNaN(page) || isNaN(limit)) throw new Error("Invalid page / limit format");

        const rowCounts = await model.count(modifier);

        modifier.limit = limit;
        modifier.offset = (page-1) * limit;

        const models = await model.findAll(modifier);

        const maxPage = Math.ceil(rowCounts/limit);

        return {
            maxPage,
            models
        }
    }
}

module.exports = PaginationUtil;