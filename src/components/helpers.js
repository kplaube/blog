import moment from "moment";
import "moment/locale/pt-br";

export const localedDate = (date) => moment(date).format("LL");

export const localedReadingTime = (minutes) =>
  moment.duration(minutes, "minutes").humanize();

export const sizes = {
  tablet: "768px",
};

export const devices = {
  tablet: `(min-width: ${sizes.tablet})`,
};
