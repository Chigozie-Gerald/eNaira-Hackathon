import Sequelize from "sequelize";
import { DefineOneToMany } from "../helpers/modelDefinitions";

export const user_product_association = new DefineOneToMany(
  undefined,
  undefined,
  "Users",
  "INTEGER"
);

export const quantityOptions = (
  allowNull: boolean,
  defaultValue: number | undefined = 1
): {
  type: typeof Sequelize.DataTypes.INTEGER;
  validator: {
    validate: { min: number };
  };
  allowNull: boolean;
  defaultValue?: number;
} => {
  const quantity_options = {
    type: Sequelize.DataTypes.INTEGER,
    validator: {
      validate: { min: 1 },
    },
    allowNull,
  };
  const defaultObj = defaultValue ? { defaultValue } : {};
  return { ...quantity_options, ...defaultObj };
};
