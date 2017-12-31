export default {
  error: {
    userNotFound: 1,
    missingFields: 2,
    userSetWithRequest: 3,
    userClass: {
      relationshipFailure: 4,
      transactionFetchFailure: 5,
      addTransactionFailure: 6,
      findByIdError: 7,
      findByEmailError: 8
    },
    failedToCreateUser: 9,
    failedToCreateTransaction: 10,
    transactionNotFound: 11,
    transactionClass: {
      findByIdError: 12
    },
    notOwnerOfTransaction: 13,
    failedToUpdateTransaction: 14,
    userNotSetWithRequest: 15,
    transactionsToCreateEmpty: 16,
    transactionsStringToJSON: 17,
    failedToDeleteTransaction: 18
  }
};
