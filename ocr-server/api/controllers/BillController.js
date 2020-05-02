var mongoose = require("mongoose");
//models in use
var Bill = mongoose.model("Bill");

// create bill
exports.create_bill = (req, res, next) => {
    let body = req.body;
    Bill.create(body, (err, bill) => {
        if (err) res.send(err);
        else res.json(bill);
    });
};

// get all bills
exports.get_all_bill = (req, res, next) => {
    Bill.find({}, (err, bill) => {
        if (err) res.send(err);
        else res.json(bill);
    });
};

exports.total = (req, res, next) => {
    if (req.params.id)
        // getting individual Totals
        Bill.find({ _id: req.params.id }, (err, bill) => {
            if (err) res.send(err);
            else res.json(bill[0].total);
        });
    // getting total of every bill
    else
        Bill.find(req.body, (err, bill) => {
            if (err) res.send(err);
            else
                res.json(
                    bill.reduce(
                        (accumulator, item) => item.total + accumulator,
                        0
                    )
                );
        });
};

exports.number_of_bills = (req, res, next) => {
    Bill.find({}, (err, bill) => {
        if (err) res.send(err);
        else res.json(bill.length);
    });
};

exports.get_bill = (req, res, next) => {
    Bill.find({ _id: req.params.id }, (err, bill) => {
        if (err) res.send(err);
        else res.json(bill);
    });
};
