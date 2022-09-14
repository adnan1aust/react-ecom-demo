import { useState, useContext } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.util'
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-up-form.styles.scss'
import { UserContext } from "../../contexts/user.context";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;
    const { setCurrentUser } = useContext(UserContext);

    //reset form fields
    const resetForm = () => {
        setFormFields(defaultFormFields);
    }

    //handle form submit
    const handleSubmit = async (event) => {
        event.preventDefault();
        if(password !== confirmPassword){
            alert('The password did not match');
            return;
        }
        const {user}  = await createAuthUserWithEmailAndPassword(email, password)
        setCurrentUser(user);
        await createUserDocumentFromAuth(user, {displayName}).then(()=>{
            alert('user created successfully');
            resetForm();
        });
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value});
    }

    return(
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Display Name' type='text' name='displayName' value={displayName} onChange={handleChange}/>
                <FormInput label='Email' type='email' name='email' value={email} onChange={handleChange}/>
                <FormInput label='Password' type='password' name='password' value={password} onChange={handleChange}/>
                <FormInput label='Confirm Password' type='password' name='confirmPassword' value={confirmPassword} onChange={handleChange}/>
                <Button type='submit'>Sign Up</Button>
            </form>
        </div>
    );
}

export default SignUpForm;