const adaptive = require('./adaptive');

const express = require('express');


const router = express.Router();

router.post('/generations/questions', (req, res) => {
  const sessionId = req.body.sessionId;
  const userAgent = req.headers['user-agent'];
  const ipAddress = req.ip;
  const context = {sessionId, userAgent, ipAddress};

  // Extract parameters from request.
  const transactionId = req.body.transactionId;
  const enrollmentId = req.body.enrollmentId;

  // Request a knowledge questions verification.
  adaptive.generateQuestions(context, transactionId, enrollmentId)
      .then((result) => {
        res.send(result);
      }).catch((error) => {
        console.log(error);
        res.status(404).send({error: error.message});
      });
});

module.exports = router;
