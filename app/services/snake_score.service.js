const snake_score = require('../models/snake_score.model');
const rest = require('../utils/restware.util');
const MySQLSequel = require('../utils/sequelize.util');

module.exports = {
    create: function (req, res) {
        try {
            const query = {};
            query.created_by = req.body.accessAccountId;;
            query.score = req.body.score;

            snake_score.create(query).then((result) => {
                'use strict';
                return rest.sendSuccessOne(res, result, 200);
            }).catch(function (error) {
                'use strict';
                console.log(error);
                return rest.sendError(res, 1, 'create_snake_score_fail', 400, error);
            });
        } catch (error) {
            console.log(error);
            return rest.sendError(res, 1, 'create_snake_score_fail', 400, error);
        }
    },

    getOne: function (req, res) {
        const id = req.params.id || '';
        try {
            const attributes = ['id', 'player_name', 'created_at'];

            const where = { id: id };

            snake_score.findOne({
                where: where,
                attributes: attributes,
                raw: true,
            }).then((result) => {
                'use strict';
                if (result) {
                    return rest.sendSuccessOne(res, result, 200);
                } else {
                    return rest.sendError(res, 1, 'unavailable_snake_score', 400);
                }
            });
        } catch (error) {
            return rest.sendError(res, 400, 'get_snake_score_fail', 400, error);
        }
    },

    getAll: function (req, res) {
        const query = req.query || '';
        try {
            const where = {};
            let page = 1;
            let perPage = 10;
            const sort = [];
            const offset = perPage * (page - 1);

            snake_score.findAndCountAll({
                where: where,
                limit: perPage,
                offset: offset,
                order: sort,
                raw: true,
            })
                .then((data) => {
                    const pages = Math.ceil(data.count / perPage);
                    const output = {
                        data: data.rows,
                        pages: {
                            current: page,
                            prev: page - 1,
                            hasPrev: false,
                            next: (page + 1) > pages ? 0 : (page + 1),
                            hasNext: false,
                            total: pages,
                        },
                        items: {
                            begin: ((page * perPage) - perPage) + 1,
                            end: page * perPage,
                            total: data.count,
                        },
                    };
                    output.pages.hasNext = (output.pages.next !== 0);
                    output.pages.hasPrev = (output.pages.prev !== 0);
                    return rest.sendSuccessMany(res, output, 200);
                }).catch(function (error) {
                    return rest.sendError(res, 1, 'get_list_snake_score_fail', 400, error);
                });
        } catch (error) {
            return rest.sendError(res, 1, 'get_list_snake_score_fail', 400, error);
        }
    },

    update: function (req, res) {
        try {
            const query = {};
            query.updated_by = req.body.accessAccountId;
            if (req.body.title) {
                query.title = req.body.title;
            }
            if (req.body.category) {
                query.category = req.body.category;
            }
            if (req.body.author) {
                query.author = req.body.author;
            }
            if (req.body.parts) {
                query.parts = req.body.parts;
            }
            const where = { id: req.params.id };

            snake_score.update(
                query,
                {
                    where: where,
                    returning: true,
                    plain: true
                }).then((result) => {
                    'use strict';
                    if ((result) && (result.length === 2)) {
                        return rest.sendSuccessOne(res, { id: req.params.id }, 200);
                    } else {
                        return rest.sendError(res, 1, 'update_snake_score_fail', 400, null);
                    }
                }).catch(function (error) {
                    'use strict';
                    console.log(error);
                    return rest.sendError(res, 1, 'update_snake_score_fail', 400, error);
                });
        } catch (error) {
            console.log(error);
            return rest.sendError(res, 1, 'update_snake_score_fail', 400, error);
        }
    },

    delete: function (req, res) {
        try {
            const where = { id: req.params.id };

            snake_score.destroy(
                { where: where }).then((result) => {
                    'use strict';
                    if (result >= 1) {
                        return rest.sendSuccessOne(res, { id: req.params.id }, 200);
                    } else {
                        return rest.sendError(res, 1, 'delete_snake_score_fail', 400, null);
                    }
                }).catch(function (error) {
                    'use strict';
                    return rest.sendError(res, 1, 'delete_snake_score_fail', 400, error);
                });
        } catch (error) {
            return rest.sendError(res, 1, 'delete_snake_score_fail', 400, error);
        }
    },

    rank: function (req, res) {
        var mysql = require('mysql2');

        var con = mysql.createConnection({
            host: "127.0.0.1",
            user: "api",
            password: "123",
            database: "audio_book"

            // host: process.env.DB_HOST,
            // port: process.env.DB_PORT,
            // username: process.env.DB_USER,
            // password: process.env.DB_PASSWORD,
            // database: process.env.DB_NAME
        });

        con.connect(function (err) {
            if (err) throw err;
            con.query("SELECT id, player_name, score, rank() OVER (order by score desc ) AS 'rank' FROM audio_book.tbl_snake_score;", function (err, result) {
                if (err) throw err;
                console.log(result);
            });
        });

        const id = req.params.id || '';
        try {
            const attributes = ['id', 'player_name', 'created_at', 'rank'];

            const where = { id: id };

            snake_score.findOne({
                where: where,
                attributes: attributes,
                raw: true,
            }).then((result) => {
                'use strict';
                if (result) {
                    return rest.sendSuccessOne(res, result, 200);
                } else {
                    return rest.sendError(res, 1, 'unavailable_snake_score', 400);
                }
            });
        } catch (error) {
            return rest.sendError(res, 400, 'get_snake_score_fail', 400, error);
        }
    },
};

