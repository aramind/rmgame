import * as y from "yup";

const notEmpty = "This field cannot be empty";
const registerSchema = y.object().shape({
  username: y
    .string()
    .required(`${notEmpty}`)
    .min(3, "Must be at least 3 characters long"),
  password: y
    .string()
    .required(`${notEmpty}`)
    .min(4, "Must be at least 4 characters long"),
});

export default registerSchema;
