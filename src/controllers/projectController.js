'use strict';

exports.get = (req, res) => {
    res.status(200).send({ok : true, user : req.userId});
};
