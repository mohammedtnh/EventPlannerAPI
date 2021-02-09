module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    "Event",
    {
      organizer: {
        type: DataTypes.STRING,
        unique: true,
        validate: { len: [1, 20] },
      },
      name: { type: DataTypes.STRING, validate: { notContains: "event" } },
      email: {
        type: DataTypes.STRING,
        validate: { isEmail: true, notEmpty: true },
      },
      date: { type: DataTypes.DATE, validate: { isAfter: "2015-01-02" } },
      numOfSeats: { type: DataTypes.INTEGER, validate: { min: 0 } },
      bookedSeats: {
        type: DataTypes.INTEGER,
        validate: {
          notGreaterThanNumOfSeats(value) {
            if (parseInt(value) > parseInt(this.numOfSeats)) {
              throw new Error("bookedSeats can't be greater than numOfSeats.");
            }
          },
        },
      },
      startDate: {
        type: DataTypes.DATE,
        validate: {
          nullCheck(value) {
            if (this.endDate === null && value === null) {
              throw new Error(
                "if you set end date you have to set start date as well"
              );
            }
          },
        },
      },
      endDate: {
        type: DataTypes.DATE,
        validate: {
          nullCheck(value) {
            if (this.startDate === null && value === null) {
              throw new Error(
                "if you set start date you have to set end date as well"
              );
            }
          },
        },
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isUrl: true },
      },
    },
    {
      timestamps: false,
    }
  );
  return Event;
};
