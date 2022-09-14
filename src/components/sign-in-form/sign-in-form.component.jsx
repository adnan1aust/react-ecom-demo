import { useState, useContext } from "react";
import { singInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.util';
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-in-form.styles.scss'
import { UserContext } from "../../contexts/user.context";


const defaultFormFields = {
    email: '',
    password: '',
}

/*handle user sign in */
const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const { setCurrentUser } = useContext(UserContext);

    const resetForm = () => {
        setFormFields(defaultFormFields);
    }

    //login with google account
    const signInWithGoogle = async () => {

        const {user} = await singInWithGooglePopup();
        createUserDocumentFromAuth(user);
    }

    //login with email and password
    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            resetForm();
            if(!email || !password){
                alert('Please enter email and password')
            } else {
                await signInAuthUserWithEmailAndPassword(email, password).then((response)=>{
                    const { user } = response;
                    console.log('from sign in', user)
                    setCurrentUser(user); 
                })
            }
        }catch(error){
            console.log(error);
        }
    }

    //update object from form fields
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