const asyncHandler = require('../utils/asyncHandler');
const crypto = require('crypto');

// @desc    Initiate PayU payment
// @route   POST /api/payment/pay
// @access  Private
const initiatePayment = asyncHandler(async (req, res) => {
  const { amount, productInfo, firstName, email, phone } = req.body;

  const PAYU_MERCHANT_KEY = process.env.PAYU_MERCHANT_KEY;
  const PAYU_SALT = process.env.PAYU_SALT;
  const PAYU_BASE_URL = process.env.PAYU_BASE_URL;

  const txnId = "txn" + Date.now();
  const hashString = `${PAYU_MERCHANT_KEY}|${txnId}|${amount}|${productInfo}|${firstName}|${email}|${""}|${""}|${""}|${""}|${""}||||||${PAYU_SALT}`;

  // Generate SHA-512 hash
  const hash = crypto.createHash("sha512").update(hashString).digest("hex");

  const payUData = {
    key: PAYU_MERCHANT_KEY,
    txnid: txnId,
    amount: amount.toString(),
    productinfo: productInfo,
    firstname: firstName,
    email: email,
    phone: phone,
    surl: "http://localhost:3000/payment/success",
    furl: "http://localhost:3000/payment/fail",
    hash: hash,
    service_provider: "payu_paisa",
  };

  res.json({ success: true, data: { payUData, action: PAYU_BASE_URL } });
});

// @desc    Payment success callback
// @route   POST /api/payment/success
// @access  Public
const paymentSuccess = (req, res) => {
  res.json({ success: true, message: "Payment Successful!", data: req.body });
};

// @desc    Payment failure callback
// @route   POST /api/payment/fail
// @access  Public
const paymentFail = (req, res) => {
  res.json({ success: false, message: "Payment Failed!", data: req.body });
};

module.exports = {
  initiatePayment,
  paymentSuccess,
  paymentFail
};
