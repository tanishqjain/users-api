var express = require('express');
var router = express.Router();
var createUser = require('../controller/createUser');
var viewUnverifiedUsers = require('../controller/viewUnverifiedUser');
var approveUser = require('../controller/approveUser')
var sendApprovalMail = require('../controller/sendApprovalCompleteMail')

/* Create User. */
router.post('/create', createUser);

/* Approve users */
router.post('/approve', approveUser, sendApprovalMail);

/* Read unverfied users */
router.get('/viewUnverifiedUsers', viewUnverifiedUsers);

module.exports = router;
