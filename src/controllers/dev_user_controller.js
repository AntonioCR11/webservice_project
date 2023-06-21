const path = require("path");

const db = require(path.join(__dirname, "..", "models"));

const devUserController = {
    /**
     * Get all comments that belongs to a certain dev user.
     * 
     * The list of the comments are paginated and if a `page` and `limit` query params is not set, it
     * will default to the first page and limit it at max 30 rows.
     * 
     * @param {Express.Request} req The request object containing the user request.
     * @param {Express.Response} res The response object that will be returned to the user.
     * @returns A response object with a json body containing a max page for the pagination, as well as the list of comments.
     */
    getUserComments: async (req, res) => {
        // TODO: Get a certain user's comments

        return res.status(200).send({
            maxPage: 1,
            comments: []
        });
    },
    
    /**
     * Get all comment replies that belongs to a certain dev user.
     * 
     * The list of the replies are paginated and if `page` and `limit` query params is not set, it
     * will default to the first page and limit it at max 30 rows.
     * 
     * @param {Express.Request} req The request object containing the user request.
     * @param {Express.Response} res The response object that will be returned to the user.
     * @returns A response object with a json body containing a max page for the pagination, as well as the list of replies.
     */
    getUserReplies: async (req, res) => {
        // TODO: Get a certain user's replies

        return res.status(200).send({
            maxPage: 1,
            comments: []
        });
    },
    
    /**
     * Get all comment replies that is received by a certain dev user.
     * 
     * The list of the replies are paginated and if `page` and `limit` query params is not set, it
     * will default to the first page and limit it at max 30 rows.
     * 
     * @param {Express.Request} req The request object containing the user request.
     * @param {Express.Response} res The response object that will be returned to the user.
     * @returns A response object with a json body containing a max page for the pagination, as well as the list of replies.
     */
    getReceivedReplies: async (req, res) => {
        // TODO: Get the list of replies received by a certain dev user.

        return res.status(200).send({
            maxPage: 1,
            comments: []
        });
    },

    /**
     * Get all the comments and replies that belonged to a certain user.
     * 
     * The list of the replies are paginated and if `page` and `limit` query params is not set, it
     * will default to the first page and limit it at max 30 rows.
     * 
     * The list of comments and replies is blended together in a single list and sorted based on the **timeframe** it was created.
     * 
     * @param {Express.Request} req The request object containing the user request.
     * @param {Express.Response} res The response object that will be returned to the user.
     * @returns A response object with a json body containing a max page for the pagination, as well as the list of comments and replies.
     */
    getUserCommentsAndReplies: async (req, res) => {
        // TODO: Get the list of comments and replies that belonged to a dev user.

        return res.status(200).send({
            maxPage: 1,
            comments: []
        });
    },

    /**
     * Get all the comments and replies that was liked by a certain user.
     * 
     * The list of the replies are paginated and if `page` and `limit` query params is not set, it
     * will default to the first page and limit it at max 30 rows.
     * 
     * The list of comments and replies is blended together in a single list and sorted based on the **timeframe** it was created.
     * 
     * @param {Express.Request} req The request object containing the user request.
     * @param {Express.Response} res The response object that will be returned to the user.
     * @returns A response object with a json body containing a max page for the pagination, as well as the list of comments and replies.
     */
    getUserLikes: async (req, res) => {
        // TODO: Get the list of comments and replies that was liked bt a dev user.

        return res.status(200).send({
            maxPage: 1,
            comments: []
        });
    }
}

module.exports = devUserController;