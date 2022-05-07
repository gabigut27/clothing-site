import { useState } from 'react';
import { CreateAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import '../sign-up-form/sign-up-form.styles.scss';
import Button from '../button/button.component';

const deafultFormFields={
    displayName: '',
    email: '',
    password: '',
    confrimPasswrod: ''

}
const SignUpForm = () => {
    const [formFields, setFormFields] = useState(deafultFormFields);
    const {displayName, email, password, confrimPasswrod} = formFields;

    console.log(formFields);

    const resetFormFields = ()=>{
        setFormFields(deafultFormFields);
    };

    const handleSubmit = async (event) =>{
        event.preventDefault();
        if (password !== confrimPasswrod) {
            alert("password do not match!");
            console.log("not match pasword")
            return;
        }
        try{
            const { user } = await  CreateAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, {displayName});
            resetFormFields();
        }catch(error){
            if (error.code === "auth/email-already-in-use"){
                alert('Email already in use!');
            }
            else{
            console.log('user creation made error: ', error);
        }
        }

       

    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value });
    };
    return (
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                label="Disaplay Name"
                type="text" 
                required 
                onChange={handleChange}
                 name="displayName"
                  value={displayName}
                   />

                <FormInput
                label="Email"
                 type="email"
                  required
                   onChange={handleChange}
                    name="email"
                     value={email}
                      />

                <FormInput
                label="Password"
                 type="password"
                  required
                   onChange={handleChange}
                    name="password"
                     value={password}
                      />

                <FormInput
                label="Confrim Password"
                 type="password"
                  required
                   onChange={handleChange}
                    name="confrimPasswrod"
                     value={confrimPasswrod}
                      />
                
                <Button buttonType={'inverted'} type="submit">Sign Up</Button>
            </form>
        </div>
    );
};
export default SignUpForm;