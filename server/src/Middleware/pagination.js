
export function paginatedResults(model, modelUser, reactionList, condition) {
    return async (req, res, next) => {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)

        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        const results = {}


        function getCondition(condition) {
            let conditionSearch = condition;
            switch (conditionSearch) {
                case 'all':
                    conditionSearch = { isDeleted: false }
                    break;
                case 'owner':
                    conditionSearch = { userId: req.user._id, isDeleted: false }
                    break;
                case 'socialuser':
                    conditionSearch = { userId: req.params.userId, isDeleted: false, isPrivate: false }
                default:
                    conditionSearch = { userId: req.params.userId, isDeleted: false, isPrivate: false }
                    break;

            }
            return conditionSearch;
        }
        if (endIndex < await model.countDocuments().exec()) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }

        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }
        try {

            // find inverse all  posts
            const user = await modelUser.findById(req.user._id) // for update the user connections
            results.results = await model.find(getCondition(condition)).sort({ createdAt: -1 }).populate([
                {
                    path: "userId",
                    select: "name images.profile.url",
                },
                ...reactionList,
                {
                    path: 'comments',
                    select: 'text userId like unlike replies',
                    populate: [
                        {
                            path: "userId",
                            select: "name images.profile.url",
                        },
                        ...reactionList,
                        {
                            path: "replies",
                            select: 'text userId like unlike',
                            populate: [
                                {
                                    path: "userId",
                                    select: "name images.profile.url",
                                },
                                ...reactionList,
                            ]
                        }
                    ]
                }
            ]).limit(limit).skip(startIndex).exec()
            res.paginatedResults = results
            res.lastPage = Math.ceil(await model.countDocuments().exec() / limit)
            next()
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: e.message })
        }
    }
}
