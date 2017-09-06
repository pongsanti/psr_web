export const extract_string = (error) => ((error instanceof Object) ? extract_from_object(error) : error);

const extract_from_object = (error) => {
  if(error.hasOwnProperty('message')) {
    return error['message'];  
  } else {
    return ''
  }
}
  