import * as y from "yup";

const notEmpty = "This field cannot be empty";
const minLength3 = `Must be at least 3 characters long`;
const minLength4 = `Must be at least 4 characters long`;

const addPlayerSchema = y.object().shape({
  playerRname: y.string().required(`${notEmpty}`).min(3, minLength3),
  playerRusername: y.string().required(`${notEmpty}`).min(3, minLength3),
  playerRpassword: y.string().required(`${notEmpty}`).min(4, minLength4),
  playerMname: y.string().required(`${notEmpty}`).min(3, minLength3),
  playerMusername: y.string().required(`${notEmpty}`).min(3, minLength3),
  playerMpassword: y.string().required(`${notEmpty}`).min(4, minLength4),
});

export default addPlayerSchema;
