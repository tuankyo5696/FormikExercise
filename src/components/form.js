import React from 'react';
import { Send } from 'react-feather';
import { withFormik, Field } from 'formik';
import * as Yup from 'yup';
import './_form.scss'

const FormSubmit = (props) => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  } = props;
  const clearValues = () => {
    props.setFieldValue('firstname', '');
    props.setFieldValue('lastname', '');
    props.setFieldValue('email', '')
    props.setFieldValue('gender', '')
    props.setFieldValue('favoriteColor', '')
    props.setFieldValue('notes', '')
    props.setFieldValue('employedCheck',false)
  }
  return (
    <form onSubmit = {handleSubmit}>
      <div>
        <div className="elm1">
          <p> First Name</p>
        </div>
        <div className="elm2">
          <Field type="text" name="firstname" placeholder="First Name" value={values.firstname} />
        </div>
      </div>
      <div>
      <div className="elm1">
        </div>
      {errors.firstname && touched.firstname ? (
           <div className="elm2 Invalid"> {errors.firstname}
           </div>
         ) : ''}
      </div>

      <div>
        <div className="elm1">
          <p> Last Name</p>
        </div>
        <div className="elm2">
          <Field type="text" name="lastname" placeholder="Last Name" value={values.lastname}/>
        </div>
      </div>
      <div>
      <div className="elm1">
        </div>
      {errors.lastname && touched.lastname ? (
           <div className="elm2 Invalid"> {errors.lastname}
           </div>
         ) : ''}
      </div>

      <div>
        <div className="elm1">
          <p> Email</p>
        </div>
        <div className="elm2">
          <Field type="text" name="email" placeholder="Email" value={values.email} />
        </div>
      </div>
      <div>
      <div className="elm1">
        </div>
      {errors.email && touched.email ? (
           <div className="elm2 Invalid"> {errors.email}
           </div>
         ) : ''}
      </div>

      <div className="sex">
        <div className="elm1"> 
          <p>Sex</p>
        </div>
        <div className="elm2">
          <div>
            <Field  type="radio" name="gender" value="male" id ="genderMale" checked = {values.gender === 'male'} />
            <label htmlFor = "genderMale">Male</label>
          </div>
          <div>
            <Field type="radio" name="gender" value="female" id="genderFemale" checked={values.gender === 'female'}/>
            <label htmlFor= "genderFemale">Female</label>
          </div>
        </div>
      </div>
      <div>
      <div className="elm1">
        </div>
      {errors.gender  ? (
           <div className="elm2 Invalid"> {errors.gender}
           </div>
         ) : ''}
      </div>

      <div className="favorite">
        <div>
            <p>Favorite Color</p>
        </div>
        <select id="favorite" name="favoriteColor" value= {values.favoriteColor} onChange={handleChange} onBlur ={handleBlur}>
            <option value=""></option>
            <option value="Blue">Blue</option>
            <option value="Green">Green</option>
            <option value="Black">Black</option>
        </select>
      </div>

      <div className="employ">
        <div>
          <p>Employed</p>
        </div>
        <Field type="checkbox" name="employedCheck" value={values.employedCheck} checked={values.employedCheck === true}/> 
      </div>

      <div className="notes">
        <div>
          <p>Notes</p>
        </div>
        <div className="text">
          <Field component="textarea" id="subject" name="notes" value={values.notes}/>
        </div>
      </div>

      <div className="submit">
        <div>
          <Send/>
          <input className="s1" type="submit" />
        </div>
        <div>
          <input className="s2" type="button" value="Clear Values" onClick = {clearValues} />
        </div>
       
      </div>
      
    </form>
  );
}
const formSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid Email")
    .required("Email is required"), 
  firstname: Yup.string()
    .min(2, "Too short")
    .max(50, "Too long")
    .required("First Name is required"),
  lastname: Yup.string()
    .min(2, "Too short")
    .max(50, "Too long")
    .required("First Name is required"),
});

const EnhancedForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: () => ({
    firstname: '',
    lastname: '',
    email: '',
    gender: '',
    favoriteColor: '',
    employedCheck: false,
    notes : ' '

  }),
  validationSchema : formSchema,
  handleSubmit: (values, { props, setSubmitting, resetForm }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
      resetForm(); 
    }, 500);
  },
  validate: (values)=>{
    const errors = {};
    if (!values.gender) {
      errors.gender = "Gender is required"
    }
    return errors;
  }

})

export default EnhancedForm(FormSubmit);
