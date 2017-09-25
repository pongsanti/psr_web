import yup from 'yup';
import moment from 'moment';

// do not use arrow function here.
// validation will throw errors !!
function startDateEndDate() {
  let parent = this.parent;
  return  parent.start_at <= parent.end_at;
};

const startDateEndDateMsg = 'Start date must be before End date';

const formSchema = yup.object({
  truck_id: yup.number().required('Please select truck'),
  start_at: yup.date().default(moment()).required('Please select start date')
    .test('start_at before end_at', startDateEndDateMsg, startDateEndDate),
  end_at: yup.date().required('Please select end date')
    .test('start_at before end_at', startDateEndDateMsg, startDateEndDate),
});

export default formSchema;
