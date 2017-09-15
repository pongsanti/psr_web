import yup from 'yup';

// do not use arrow function here.
// validation will throw errors !!
function samePassword() {
  let parent = this.parent;
  return  parent.password === parent.confirm_password;
};

const defaultStr = yup.string().default('')
const modelSchema = yup.object({
  display_name: defaultStr.required('Please enter display name'),
  email: defaultStr.required('Please enter email').email('Email is invalid'),
  password: defaultStr.required('Please enter password').min(8, 'Password too short (8)')
    .test('passwords-match', 'Passwords do not match', samePassword),
  confirm_password: defaultStr
    .test('passwords-match', 'Passwords do not match', samePassword),
});

export default modelSchema;
