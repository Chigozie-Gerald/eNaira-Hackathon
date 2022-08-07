"use strict";
import {
  Association,
  CreationOptional,
  HasOneCreateAssociationMixin,
  HasOneGetAssociationMixin,
  HasOneSetAssociationMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "sequelize";
import { Product } from "./product";
import { user_product_association } from "../modelAssociationDefinitions/associations";

export interface UserleanInterface {
  NIN: number;
}

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  /*Helper method for defining associations*/

  declare NIN: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;

  declare createProduct: HasOneCreateAssociationMixin<Product>;
  declare getProduct: HasOneGetAssociationMixin<Product | null>;
  declare setProduct: HasOneSetAssociationMixin<Product, number>;

  declare Product: NonAttribute<Product>;

  declare static associations: {
    Product: Association<User, Product>;
  };

  static associate(models: any) {
    User.hasOne(models.Product, user_product_association.defineHasMany());
  }
}

const UserTable = (sequelize: any, DataTypes: any) => {
  User.init(
    {
      NIN: {
        type: DataTypes.INTEGER,
        primaryKey: true,
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
      modelName: "User",
    }
  );
  return User;
};

export default UserTable;
