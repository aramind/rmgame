import * as y from "yup";

const notEmpty = "This field cannot be empty";
const minLength3 = `Must be at least 3 characters long`;
const minLength4 = `Must be at least 4 characters long`;

const playerSchema = y.object().shape({
  username: y.string().required(`${notEmpty}`).min(3, minLength3),
  password: y.string().required(`${notEmpty}`).min(4, minLength4),
});

export default playerSchema;
