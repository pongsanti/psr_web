import yup from 'yup';

const defaultStr = yup.string().default('')
const modelSchema = yup.object({
  display_name: defaultStr.required('Please enter display name'),
  email: defaultStr.required('Please enter email').email('Email is invalid'),
  password: defaultStr.required('Please enter password').min(8, 'Password too short (8)')
});

export default modelSchema;
