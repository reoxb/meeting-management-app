import moment from "moment"

export default function validateLogin(values) {
    let errors = {}

    //Date errors
    if (!values.date) {
        errors.date = "Date required"
    } 
    else if (!moment(values.date, 'DD-MM-YYYY', true).isValid()) {
        errors.date = 'Invalid date'
    } 
    else if (Number(moment(values.date, 'DD-MM-YYYY', true).format('M')) !== (new Date().getMonth() + 1)) {
        errors.date = 'Your date is not a current month'
    }

    //Name errors
    if (!values.name) {
        errors.name = "Name required"
    } 

    //Email errors
    if (!values.email) {
        errors.email = "Email required"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Invalid email addres'
    }

    return errors;
}