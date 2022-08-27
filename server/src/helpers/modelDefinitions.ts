import Sequelize from "sequelize";

// Has Many
interface hasManyDef {
  foreignKey: { name: string; allowNull: boolean };
  sourceKey: string;
  constraints: boolean;
}

interface hasPolymorphicManyDef {
  foreignKey: { name: string; allowNull: boolean };
  constraints: boolean;
  scope: {
    [key: string]: string;
  };
}

/**
 * Should be defined and exported from the source table
 */
export class DefineOneToMany {
  /**
   *
   * @param foreignKey Defines the name of the foreign key in the target
   * table or an object representing the type definition for the
   * foreign column (see `Sequelize.define` for syntax). When using an
   * object, you can add a `name` property to set the
   * name of the column. Defaults to the name of source + primary key of source
   *
   * @param source_target_key Defines The name of the field to use as the key for the
   * association in the source table. Defaults to the primary key of the source table
   *
   * @param model This is the PLURALIZED name of the source model
   *
   * @param type This is the type of `source_target_key`
   */
  constructor(
    private readonly foreignKey: string = ``,
    private readonly source_target_key = "",
    private readonly model: string,
    private readonly type: keyof typeof Sequelize.DataTypes = "INTEGER"
  ) {}

  /**
   *
   * This specifies the `belongsTo` portion of a hasMany-belongsTo relationship
   * @param constraints defaults to true
   */
  defineBelongsTo = (constraints = true): belongsToDef => ({
    foreignKey: { name: this.foreignKey, allowNull: !constraints },
    targetKey: this.source_target_key,
    constraints,
  });

  public get options() {
    return {
      type: Sequelize.DataTypes[this.type],
      references: {
        model: this.model,
        key: this.source_target_key,
      },
    };
  }

  /**
   *
   * This specifies the `hasMany` portion of a hasMany-belongsTo relationship
   * @param constraints defaults to true
   */
  defineHasMany = (constraints = true): hasManyDef => ({
    foreignKey: { name: this.foreignKey, allowNull: !constraints },
    sourceKey: this.source_target_key,
    constraints,
  });
}

//BelongsTo
type belongsToDef = {
  foreignKey: { name: string; allowNull: boolean };
  targetKey: string;
  constraints: boolean;
};

/**
 * Polymorphic associations should be defined and exported from the `target` Table.
 * That means `source` Table should import from the target
 */
export class DefinePolymorphicAssociation {
  /**
   *
   * @param scopeType Creates a column in the target table to correctly associate source table
   *
   * @param foreignKey Defines the name of the foreign key in the target
   * table or an object representing the type definition for the
   * foreign column (see `Sequelize.define` for syntax). When using an
   * object, you can add a `name` property to set the
   * name of the column. Defaults to the name of source + primary key of source
   *
   */
  constructor(
    private readonly foreignKey: string,
    private readonly scopeType: string
  ) {}

  /**
   *
   * This specifies the `belongsTo` portion of a hasMany-belongsTo relationship
   * @param constraints defaults to true
   */
  defineBelongsTo = (constraints = true): belongsToDef => ({
    foreignKey: {
      name: this.foreignKey,
      allowNull: !constraints,
    },
    targetKey: "",
    constraints,
  });

  /**
   * @param scope Defines the value of the scope type in a polymorphic
   * association. May be `product` or `store` etc.
   *
   * This specifies the `hasMany` portion of a hasMany-belongsTo relationship
   * @param constraints defaults to true
   */
  defineHasMany = (
    scope: string,
    constraints = true
  ): hasPolymorphicManyDef => ({
    foreignKey: {
      name: this.foreignKey,
      allowNull: !constraints,
    },
    constraints,
    scope: {
      [this.scopeType]: scope,
    },
  });

  /**
   * @param scope Defines the value of the scope type in a polymorphic
   * association. May be `product` or `store` etc.
   *
   * This specifies the `hasOne` portion of a hasOne-belongsTo relationship
   * @param constraints defaults to true
   */
  defineHasOne = (
    scope: string,
    constraints = true
  ): hasPolymorphicManyDef => ({
    foreignKey: {
      name: this.foreignKey,
      allowNull: !constraints,
    },
    constraints,
    scope: {
      [this.scopeType]: scope,
    },
  });
}

/**
 * Should be defined and exported from the source table
 *
 * @param foreignKey Defines the name of the foreign key in the target
 * table or an object representing the type definition for the
 * foreign column (see `Sequelize.define` for syntax). When using an
 * object, you can add a `name` property to set the
 * name of the column. Defaults to the name of source + primary key of source
 *
 * @param source_target_key Defines The name of the field to use as the key for the
 * association in the source table. Defaults to the primary key of the source table
 *
 * @param model This is the pluralized name of the source model
 *
 * @param type This is the type of `source_target_key`
 */
export class DefineOneToOne {
  constructor(
    private readonly foreignKey = "",
    private readonly source_target_key = "",
    private readonly model: string,
    private readonly type: keyof typeof Sequelize.DataTypes
  ) {}

  defineBelongsTo = (constraints = true): belongsToDef => ({
    foreignKey: { name: this.foreignKey, allowNull: !constraints },
    targetKey: this.source_target_key,
    constraints,
  });
  defineHasOne = (constraints = true) => ({
    foreignKey: { name: this.foreignKey, allowNull: !constraints },
    sourceKey: this.source_target_key,
    constraints,
  });

  public get options() {
    return {
      type: Sequelize.DataTypes[this.type],
      references: {
        model: this.model,
        key: this.source_target_key,
      },
    };
  }
}

export class DefineManyToMany {
  static junction: string;
  /**
   * @param junction This is the junction table for the many to many relationship
   */
  constructor(private readonly junction: string) {}

  /**
   *
   * This specifies the `belongsTo` portion of a hasMany-belongsTo relationship
   * @param constraints defaults to true
   */
  defineBelongsToMany = (constraints = true) => ({
    through: this.junction,
    constraints,
  });
}
