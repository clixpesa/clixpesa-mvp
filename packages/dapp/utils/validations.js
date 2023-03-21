export const validateNames = (userNames, setIsInvalid, isInvalid) => {
  if (!userNames) {
    setIsInvalid({ ...isInvalid, invalidName: true });
  } else {
    const name = userNames.split(' ');
    if (name.length < 2) {
      setIsInvalid({ ...isInvalid, invalidName: true });
    } else {
      setIsInvalid({ ...isInvalid, invalidName: false });
    }
  }
};

export const validatePhoneNo = (phoneNumber, setIsInvalid, isInvalid) => {
  if (!phoneNumber) {
    setIsInvalid({ ...isInvalid, invalidNo: true });
  } else {
    //TODO: phonenumber validation
    if (phoneNumber.length !== 13) {
      setIsInvalid({ ...isInvalid, invalidNo: true });
    } else {
      setIsInvalid({ ...isInvalid, invalidNo: false });
    }
  }
};
