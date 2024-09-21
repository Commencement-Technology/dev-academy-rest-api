const asyncHandler = require("./async");

const advancedResults2 = (model, populate) => {
  return asyncHandler(async (req, res, next) => {
    let query;

    const reqQuery = { ...req.query };

    const startIndex = parseInt(reqQuery.startIndex) || 0;
    const limit = parseInt(reqQuery.limit) || 5;
    const sortDirection = reqQuery.sort === "asc" ? 1 : -1;
    const page = parseInt(reqQuery.page) || 1;

    query = model
      .find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    if (populate) {
      query = query.populate(populate);
    }

    const results = await query;

    const total = await model.countDocuments();
    const pages = Math.ceil(total / limit);
    const endIndex = page * limit;
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }

    res.advancedResults = {
      success: true,
      count: results.length,
      totalPages: pages,
      pagination,
      data: results,
    };

    next();
  });
};

module.exports = advancedResults2;
