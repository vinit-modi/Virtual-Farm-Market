module.exports = {
  MongoDBURL: "mongodb://localhost:27017/VFM",
  ServerPort: 3001,

  secret: "VirtualFarmMarket", // jwt secret key
  jwtExpirationTime: 60 * 60 * 8760,
};
