const axios = require("axios");
const auth = require("./config");

// Execute the operations
module.exports = async function (req, res, next) {
  try {
    const accessToken = await auth.getToken(auth.tokenRequest);
    const password = await generateRandomPassword(12);
    if (accessToken) {
      const userObject = req.body;
      req.body.password = userObject.password = password;
      await createUser(accessToken.accessToken, userObject);
      next();
    }
  } catch (error) {
    console.log("there is some error", error.message);
    res.status(500).json({ userCreation: `Failed | ${error.message}` , emailSent: 'Failed | Not Attempted' });
  }
};

// Function to create a user
async function createUser(accessToken, userObject) {
  
  const apiUrl = "https://graph.microsoft.com/v1.0/users";
  const newUser = {
    accountEnabled: true,
    displayName: `${userObject.firstName} ${userObject.lastName}`,
    mailNickname: userObject.firstName,
    identities: [
      {
        signInType: "emailAddress",
        issuer: "gsiextapps.onmicrosoft.com",
        issuerAssignedId: userObject.email,
      },
    ],
    passwordProfile: {
      forceChangePasswordNextSignIn: false,
      password: userObject.password,
    },
  };

  try {
    const response = await axios.post(apiUrl, newUser, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log("User created:", response.data);
  } catch (error) {
    throw new Error(error.response.data.error.message);
  }
}


async function generateRandomPassword(length) {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@!#$%^&*()-=_+";
    let password = "";
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
  
    return password;
  }