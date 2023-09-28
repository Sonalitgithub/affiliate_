import { NextApiRequest, NextApiResponse } from "next";
import dotenv from "dotenv";
import Address from "../models/address";
import jwt from "jsonwebtoken";

dotenv.config();

//all get Address
const getAllAddress = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const authHeader = req.headers["authorization"];
    let token: any | undefined;
    token = authHeader;
    let decoded: any | undefined;
    decoded = jwt.decode(token);
   if(decoded?.userid){
      const userid = decoded.userid;
      jwt.verify(token, "Sonali");
      const address = await Address.findAll({ where: { userid: userid } });
      //console.log(address, "address");
      return res.status(200).json(address);
    } 
    // else {
    //   return res.send("Invalid Token");
    // }
  } catch (err: any) {
    res.status(err).json(err);
  }
};

//all get Address
const getOneAddress = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = req.query.id;
  if (data != undefined) {
    const address = await Address.findOne({ where: { id: data } });
    return res.status(200).json(address);
  } else {
    return res.status(404).json("hhhh");
  }
};

//craete Address
const postAddress = async (req: NextApiRequest, res: NextApiResponse) => {
  const authHeader = req.headers["authorization"];
  let token: any | undefined;
  token = authHeader;
  let decoded: any | undefined;
  decoded = jwt.decode(token);
  const userid = decoded.userid;
  jwt.verify(token, "Sonali");
  const address = await Address.create({
    userid: userid,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    city: req.body.city,
    zipcode: req.body.zipcode,
    state: req.body.state,
    address1: req.body.address1,
    address2: req.body.address2,
  });
  return res.status(200).json(address);
};

//for delete Address
const DeleteAddress = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userId = req.query.id;
    const findabout = await Address.destroy({ where: { id: userId } });
    const resmessage = { success: "Successfully User Removed" };
    return res.status(200).json(resmessage);
  } catch (err) {
    res.status(404).json(err);
  }
};

//for update Address
const UpdateAddress = async (req: NextApiRequest, res: NextApiResponse) => {
  const address = await Address.findOne({ where: { id: req.query.id } });
  if (address) {
    address.update(
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        city: req.body.city,
        zipcode: req.body.zipcode,
        state: req.body.state,
        address1: req.body.address1,
        address2: req.body.address2,
      },
      { where: { id: req.query.id } }
    );
    return res.status(200).json(address);
  } else {
    res.status(404).json("err");
  }
};

export {
  getAllAddress,
  postAddress,
  DeleteAddress,
  UpdateAddress,
  getOneAddress,
};
