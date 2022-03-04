async function store(req, res, next) {
    if (!req.body.name) {
        return res.json({
            success: false,
            messgae: "name can'nt by null",
            field : 'name'
        });
    }

    if (!req.body.number) {
        return res.json({
            success: false,
            messgae: "number can'nt by null",
            field : 'number'
        });
    }

    return next();
}

async function update(req, res, next) {
     if (!req.body.name) {
        return res.json({
            success: false,
            messgae: "name can'nt by null",
            field : 'name'
        });
    }

    if (!req.body.number) {
        return res.json({
            success: false,
            messgae: "number can'nt by null",
            field : 'number'
        });
    }
    return next();
}



module.exports = {
    store, update
}