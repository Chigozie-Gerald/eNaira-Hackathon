"use strict";
import {
  Association,
  BelongsToGetAssociationMixin,
  CreationOptional,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "sequelize";
import { User } from "./user";
import { user_product_association } from "../modelAssociationDefinitions/associations";

export interface ProductleanInterface {
  id?: number;
  name: string;
  price: number;
  description?: string;
  UserBVN: number;
}

export class Product extends Model<
  InferAttributes<Product>,
  InferCreationAttributes<Product>
> {
  /*Helper method for defining associations*/

  declare id: CreationOptional<number>;
  declare name: string;
  declare description: CreationOptional<string>;
  declare price: number;
  declare UserBVN: ForeignKey<User[`BVN`]>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;

  //CRUD MIXINS
  declare getUser: BelongsToGetAssociationMixin<User>;

  declare User: NonAttribute<User>;

  declare static associations: {
    User: Association<Product, User>;
  };

  static associate(models: any) {
    // define association here
    Product.belongsTo(models.User, user_product_association.defineBelongsTo());
  }
}

const ProductTable = (sequelize: any, DataTypes: any) => {
  Product.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      price: {
        type: DataTypes.FLOAT,
        validate: { min: 1 },
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      deletedAt: DataTypes.DATE,
    },
    {
      timestamps: true,
      paranoid: true,
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};

export default ProductTable;
