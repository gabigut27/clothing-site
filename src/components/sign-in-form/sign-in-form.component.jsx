import { useState } from 'react';
import {
     createUserDocumentFromAuth,
      SignInWithGooglePopup,
      SignInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import '../sign-in-form/sign-in-form.styles.scss';
import Button, { BUTTON_TYPES_CLASSES } from '../button/button.component';

const deafultFormFields={
    email: '',
    password: '',

}
const SignInForm = () => {
    const [formFields, setFormFields] = useState(deafultFormFields);
    const {email, password } = formFields;


    // console.log(formFields);

    const resetFormFields = ()=>{
        setFormFields(deafultFormFields);
    };

    const signInWithGoogle = async () =>{
        await SignInWithGooglePopup();
        
    };

    const handleSubmit = async (event) =>{
        event.preventDefault();
        try{
            const {user} = await SignInAuthUserWithEmailAndPassword(email,password);
            resetFormFields();
        }catch(error){
            switch (error.code){
                case 'auth/user-not-found':
                    alert('user not exist');
                    break;
                case 'auth/wrong-password':
                    alert('incorrect password');
                    break;
                default:
                    console.log(error.code);

            }
            
        }


    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value });
    };
    return (
        <div className='sign-in-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
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
                
                
                <div className='buttons-container'>
                <Button 
                 buttonType={BUTTON_TYPES_CLASSES.inverted}
                 type="submit">Sign in </Button>  
                <Button 
                    buttonType={BUTTON_TYPES_CLASSES.google} 
                    type="button" 
                    onClick={signInWithGoogle}>
                         Google sign in </Button>
               
                

                </div>
                
                
            </form>
        </div>
    );
};
export default SignInForm;