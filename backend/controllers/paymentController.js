const Payment = require('../models/Payment');
const mongoose = require('mongoose');

const createPayment = async (req, res) => {
    try {
        const payment = await Payment.create(req.body);

        return res.status(201).json({
            message: "payment created successfully",
            payment
        });

    } catch (error) {
        console.log("error while creating payment:", error);
        res.status(500).json({ error: error.message });
    }
};

const generateBill = async (req, res) => {
  try {
    const { paymentId } = req.params;

    // check if paymentId is a valid ObjectId before querying
    const test = await Payment.findById(paymentId);
console.log("Direct find:", test);

    //check if paymentId is a valid ObjectId before aggregation
    if (!mongoose.Types.ObjectId.isValid(paymentId)) {
  return res.status(400).json({
    success: false,
    message: "Invalid payment ID"
  });
}

    const bill = await Payment.aggregate([
      {
  $match: {
    _id: mongoose.Types.ObjectId.isValid(paymentId)
      ? new mongoose.Types.ObjectId(paymentId.trim())
      : null
  }
},

      // ServiceRecord
      {
        $lookup: {
          from: "servicerecords",
          localField: "serviceRecord",
          foreignField: "_id",
          as: "record"
        }
      },
      {
        $unwind: {
          path: "$record",
          preserveNullAndEmptyArrays: true // 🛡️ prevents crash
        }
      },

      // Car
      {
        $lookup: {
          from: "cars",
          localField: "record.car",
          foreignField: "_id",
          as: "car"
        }
      },
      {
        $unwind: {
          path: "$car",
          preserveNullAndEmptyArrays: true
        }
      },

      // Service
      {
        $lookup: {
          from: "services",
          localField: "record.service",
          foreignField: "_id",
          as: "service"
        }
      },
      {
        $unwind: {
          path: "$service",
          preserveNullAndEmptyArrays: true
        }
      },

      // 🛡️ SAFE NUMBER CONVERSION
      {
        $addFields: {
          cleanServicePrice: {
            $toDouble: {
              $replaceAll: {
                input: { $toString: { $ifNull: ["$service.servicePrice", "0"] } },
                find: ",",
                replacement: ""
              }
            }
          },
          cleanAmountPaid: {
            $toDouble: {
              $replaceAll: {
                input: { $toString: { $ifNull: ["$amountPaid", "0"] } },
                find: ",",
                replacement: ""
              }
            }
          }
        }
      },

      // FINAL RESULT
      {
        $project: {
          paymentNumber: 1,
          plateNumber: "$car.plateNumber",
          model: "$car.model",
          serviceName: "$service.serviceName",

          servicePrice: "$cleanServicePrice",
          amountPaid: "$cleanAmountPaid",
          paymentDate: 1,

          balance: {
            $cond: [
              { $gt: ["$cleanServicePrice", "$cleanAmountPaid"] },
              { $subtract: ["$cleanServicePrice", "$cleanAmountPaid"] },
              0
            ]
          },

          change: {
            $cond: [
              { $gt: ["$cleanAmountPaid", "$cleanServicePrice"] },
              { $subtract: ["$cleanAmountPaid", "$cleanServicePrice"] },
              0
            ]
          }
        }
      }
    ]);

    console.log("RAW paymentId:", paymentId);
    console.log("Is valid ObjectId:", mongoose.Types.ObjectId.isValid(paymentId));

    // 🛡️ EVEN IF DATA IS BROKEN, WE STILL RETURN SOMETHING
    if (!bill.length) {
      return res.status(404).json({
        success: false,
        message: "Bill not found (data may be disconnected)"
      });
    }

    return res.status(200).json({
      success: true,
      bill: bill[0]
    });

  } catch (error) {
    console.log("error while generating bill", error);

    return res.status(500).json({
      message: "error while generating bill",
      error: error.message
    });
  }
};

module.exports = {createPayment, generateBill};