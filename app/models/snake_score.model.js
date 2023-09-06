const sequel = require('sequelize');
const mySequel = require('../utils/sequelize.util');
const account = require('./account.model');

const snake_score = mySequel.define('snake_score', {
    id: {
        type: sequel.BIGINT(20),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    player_name: {
        type: sequel.BIGINT(20),
        allowNull: false,
        references: {
            model: account,
            key: 'id',
        },
    },
    score: {
        type: sequel.BIGINT(20),
        allowNull: false,

    },
    created_at: {
        type: sequel.DATE,
        allowNull: true,
        defaultValue: sequel.NOW
    },
}, {
    underscored: false,
    timestamps: false,
    updatedAt: false,
    createdAt: false,
    includeDeleted: true,
    paranoid: true,
    freezeTableName: true,
    tableName: 'tbl_snake_score',
});

module.exports = snake_score;
