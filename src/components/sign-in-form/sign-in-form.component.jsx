import { useState } from "react";
import { singInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.util';
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-in-form.styles.scss'
const defaultFormFields = {
    email: '',
    password: '',
}
const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetForm = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        const {user} = await singInWithGooglePopup();
        createUserDocumentFromAuth(user);
        console.log(user);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            resetForm();
            await signInAuthUserWithEmailAndPassword(email, password).then((response)=>{
                console.log(response);
                alert('user logged in successfully')
            })
        }catch(error){
            console.log(error);
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value});
    }

    return(
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign In with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Email' type='email' name='email' value={email} onChange={handleChange}/>
                <FormInput label='Password' type='password' name='password' value={password} onChange={handleChange}/>
                <div className="buttons-container">
                    <Button type='submit'>Sign In</Button>
                    <Button onClick={signInWithGoogle} buttonType='google'>Google Sign In</Button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;