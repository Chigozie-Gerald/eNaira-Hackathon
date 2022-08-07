import { Sequelize } from "sequelize/types";
import { Op as OpImport } from "sequelize";
import db from "../models";
import { Product as ProductInterface } from "../models/product";
import { User as UserInterface } from "../models/user";

export const sequelize = db.sequelize as Sequelize;
export const Op = OpImport;

export const Product = db.Product as typeof ProductInterface;
export const User = db.User as typeof UserInterface;
