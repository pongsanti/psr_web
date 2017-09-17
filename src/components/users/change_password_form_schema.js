import yup from 'yup';

// do not use arrow function here.
// validation will throw errors !!
function samePassword() {
  let parent = this.parent;
  return  parent.new_password === parent.confirm_new_password;
};

const defaultStr = yup.string().default('')
const changePasswordModelSchema = yup.object({
  old_password: defaultStr.required('Please enter your password'),
  new_password: defaultStr.required('Please enter your new password').min(8, 'Password too short (8)')
    .test('passwords-match', 'Passwords do not match', samePassword),
  confirm_new_password: defaultStr
    .test('passwords-match', 'Passwords do not match', samePassword),
});

export default changePasswordModelSchema;
