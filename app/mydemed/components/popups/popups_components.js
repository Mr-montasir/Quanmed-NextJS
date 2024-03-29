import React, { useEffect, useState, useRef } from 'react';
// import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount } from 'wagmi';
import { useAuth } from '../../../hooks/use-auth';
/*-------------// Media //------------*/
import FacebookIcon from '../../media/svgs/social/facebook.svg';
import TwitterIcon from '../../media/svgs/social/x_twitter.svg';
import X_icon from '../../media/svgs/help.svg';
import CheckIcon from '../../media/svgs/check_circle.svg';
import EmailIcon from '../../media/svgs/email.svg';
import Link from 'next/link';
import { usePopupFunctions } from '../../hooks/popups';
// import FacebookLogin from 'react-facebook-login';

export function SignUpPopup({ onClose, onSwitchPopup }) {

    const [data, setData] = useState({ acceptance: false })

    const auth = useAuth();

    const { openPopup, openSuccessPopup, openErrorPopup, renderPopup } = usePopupFunctions();

    const validateEmail = (email) => {
        return String(email).toLowerCase().match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    const checkInput = (ev) => {
        // Check if input is empty
        if (ev.target.value.trim() !== "") {
            ev.target.classList.add('not_empty');

            // Validate Email If input is not empty
            console.log(ev.target.getAttribute('type'))
            if (ev.target.getAttribute('type') == 'email') {
                if (!validateEmail(ev.target.value)) {
                    ev.target.closest('.field_container').classList.add('field_error');
                } else {
                    ev.target.closest('.field_container').classList.remove('field_error');
                }
            }
        } else {
            ev.target.classList.remove('not_empty');
        }
        // insert data or update it
        setData({
            ...data,
            [ev.target.name]: ev.target.value
        })
    }

    const onSubmit = async () => {
        if (Object.keys(data).length < 5) {
            openErrorPopup("Error", "Please fill all information.")
            console.log('Please fill all information.')
            return false;
        } else if (!data.acceptance) {
            openErrorPopup("Error", "Please confirm our privacy policy.")
            console.log('Please confirm our privacy policy.')
            return false;
        } else if (data.password !== data.confirm_pwd) {
            openErrorPopup("Error", "Please confirm your password.")
            console.log('Please confirm your password')
            return false;
        } else {
            try {
                await auth.signUp(data.email, data.full_name, data.password);
            } catch (err) {
                openErrorPopup("Error", "Sign up failed!")
                console.log('Sign up failed!')
                return false;
            }
            openSuccessPopup()
            console.log('Success for sign up!');
        }
    }
    return (
        <div className="popup_overlay" onClick={onClose}>
            <div className="popup" onClick={(e) => e.stopPropagation()}>
                <div className="popup_content">
                    <div className="top_heading">
                        <div className="left_side">
                            <h2>Sign up</h2>
                            <p>Enter your details below</p>
                        </div>
                        <div className="right_side">
                            <span style={{ padding: '5px 10px', cursor: 'pointer' }} onClick={() => onSwitchPopup('SignIn')}>Log in</span>
                        </div>
                    </div>
                    <div className="form_container sign_up">
                        <div className="field_container">
                            <input type="text" name='full_name' id='sign_up_full_name' onChange={(ev) => checkInput(ev)} />
                            <label htmlFor="sign_up_full_name">Full name</label>
                        </div>
                        <div className="field_container">
                            <input type='email' name='email' id='sign_up_email' onChange={(ev) => checkInput(ev)} />
                            <label htmlFor="sign_up_email">Email address</label>
                            <span className="error_message">That format doesn&apos;t look right. Make sure there aren&apos;t any typos.</span>
                        </div>
                        <div className="field_container">
                            <input type='password' name='password' id='sign_up_password' onChange={(ev) => checkInput(ev)} />
                            <label htmlFor="sign_up_password">Create Password</label>
                        </div>
                        <div className="field_container">
                            <input type='password' name='confirm_pwd' id='sign_up_confirm_password' onChange={(ev) => checkInput(ev)} />
                            <label htmlFor="sign_up_confirm_password">Confirm Password</label>
                        </div>
                        <div className="acceptance">
                            <input type="checkbox" name='acceptance' id="acceptance" onChange={(ev) => checkInput(ev)}/>
                            <label htmlFor="acceptance">By creating an account you agree to Privacy Policy</label>
                        </div>
                        <button className="submit_form" onClick={onSubmit}>Sign Up</button>
                        <button className="wallet_continue">Continue with wallet</button>
                    </div>
                </div>
            </div>
            {renderPopup()}
        </div>
    )
}
export function SignInPopup({ onClose, onSwitchPopup }) {
    const { openPopup, openErrorPopup, openSuccessPopup, renderPopup } = usePopupFunctions();

    const [data, setData] = useState({ acceptance: false })

    const auth = useAuth(); 
    // const { open } = useWeb3Modal()
    const { isConnected, address } = useAccount()

    useEffect(() => {
        if (isConnected) {
            auth.signinWithWallet(address);
            navigator('/mydemed');
        }
    }, [isConnected, auth, address])
    const validateEmail = (email) => {
        return String(email).toLowerCase().match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    const checkInput = (ev) => {
        // Check if input is empty
        if(ev.target.name != "acceptance") {
            if (ev.target.value.trim() !== "") {
                ev.target.classList.add('not_empty');
    
                // Validate Email If input is not empty
                console.log(ev.target.getAttribute('type'))
                if (ev.target.getAttribute('type') == 'email') {
                    if (!validateEmail(ev.target.value)) {
                        ev.target.closest('.field_container').classList.add('field_error');
                    } else {
                        ev.target.closest('.field_container').classList.remove('field_error');
                    }
                }
            } else {
                ev.target.classList.remove('not_empty');
            }
        }
        // insert data or update it
        setData({
            ...data,
            [ev.target.name]: ev.target.value
        })
    }

    async function onSignIn() {
        if (Object.keys(data).length < 3) {
            openErrorPopup("Error", "Please fill all information.")
            console.log('Please fill all information.')
            return false;
        }
        console.log(data)
        // sign proces
        try {
            await auth.signIn(data.email, data.password);
            navigator('/mydemed')
            openPopup("SuccessMessage")
        }
        catch (err) {
            openPopup("LoginFailed")
            console.log('sign in error!')
        }
    }

    function onSignInWithWallet() {
        open()
    }

    // const responseFacebook = (e) => {
    //     console.log("res", e)
    // }

    return (
        <div className="popup_overlay" onClick={onClose}>
            <div className="popup sign_in" onClick={(e) => e.stopPropagation()}>
                <div className="popup_content">
                    <div className="top_heading">
                        <div className="left_side">
                            <h2>Sign In</h2>
                            <p>Welcome back</p>
                        </div>
                        <div className="right_side">
                            <span style={{ padding: '5px 10px', cursor: 'pointer' }} onClick={() => onSwitchPopup('SignUp')}>SignUp</span>
                        </div>
                    </div>
                    <div className="form_container">
                        <div className="field_container">
                            <input type='email' name='email' id='sign_in_email' onChange={(ev) => checkInput(ev)} />
                            <label htmlFor="sign_in_email">Email address</label>
                            <span className="error_message">That format doesn&apos;t look right. Make sure there aren&apos;t any typos.</span>
                        </div>
                        <div className="field_container">
                            <input type='password' name='password' id='sign_in_password' onChange={(ev) => checkInput(ev)} />
                            <label htmlFor="sign_in_password">Create Password</label>
                        </div>
                        <div className="acceptance">
                            <input type="checkbox" name='acceptance' id="acceptance" onChange={(ev) => checkInput({ target: { name: 'acceptance', value: ev.target.checked } })} />
                            <label htmlFor="acceptance">Keep me logged in</label>
                        </div>
                        <button className="submit_form" onClick={onSignIn}>Log in</button>
                        <button className="wallet_continue" onClick={onSignInWithWallet}>Continue with wallet</button>
                        <span className="forgot_password">Forgot password?</span>
                    </div>
                </div>
                <div className="divider"><span>or</span></div>
                <div className="popup_content">
                    <div className="login_options">
                        <div className="option_login facebook">
                            <FacebookIcon /> <span>Sign in with Facebook</span>
                        </div>
                        <div className="option_login twitter">
                            <TwitterIcon /> <span>Sign in with Twitter</span>
                        </div>
                        {/* <FacebookLogin
                            appId="3224146307728769"
                            autoLoad={true}
                            fields="name,email,picture"
                            callback={e => responseFacebook(e)}
                            redirectUri="http://localhost:3000/callback"
                        /> */}
                    </div>
                </div>
            </div>
            {renderPopup()}
        </div>
    )
}
export function PasswordResetPopup({ onClose }) {
    const validateEmail = (email) => {
        return String(email).toLowerCase().match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    function checkInput(ev) {
        // Check if input is empty
        if (ev.target.value.trim() !== "") {
            ev.target.classList.add('not_empty');

            // Validate Email If input is not empty
            console.log(ev.target.getAttribute('type'))
            if (ev.target.getAttribute('type') == 'email') {
                if (!validateEmail(ev.target.value)) {
                    ev.target.closest('.field_container').classList.add('field_error');
                } else {
                    ev.target.closest('.field_container').classList.remove('field_error');
                }
            }
        } else {
            ev.target.classList.remove('not_empty');
        }
    }
    return (
        <div className="popup_overlay" onClick={onClose}>
            <div className="popup reset_password" onClick={(e) => e.stopPropagation()}>
                <div className="popup_content">
                    <div className="top_heading">
                        <div className="left_side">
                            <h2>Password reset</h2>
                            <p>We’ll help you reset it and get back on track.</p>
                        </div>
                        <div className="right_side">
                            <span>Back</span>
                        </div>
                    </div>
                    <div className="form_container">
                        <div className="field_container">
                            <input type='email' id='sign_in_email' onChange={(ev) => { checkInput(ev) }} />
                            <label htmlFor="sign_in_email">Email address</label>
                            <span className="error_message">That format doesn&apos;t look right. Make sure there aren&apos;t any typos.</span>
                        </div>
                        <div className="acceptance">
                            <input type="checkbox" id="acceptance" onChange={(ev) => { checkInput(ev) }} />
                            <label htmlFor="acceptance">Keep me logged in</label>
                        </div>
                        <button className="submit_form">Reset password</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export function DeleteNotePopup({ onClose }) {
    return (
        <div className="popup_overlay" onClick={onClose}>
            <div className="popup modern_alert" onClick={(e) => e.stopPropagation()}>
                <div className="popup_content">
                    <X_icon />
                    <h2>Delete Note</h2>
                    <p>Deleting a note will permanently remove it from your library</p>
                    <div className="buttons_con">
                        <div className="single_btn" onClick={onClose}> No, Keep Note </div>
                        <div className="single_btn"> Yes, Delete note </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export function DeactivateAccount({ onClose }) {
    return (
        <div className="popup_overlay" onClick={onClose}>
            <div className="popup modern_alert small_title" onClick={(e) => e.stopPropagation()}>
                <div className="popup_content">
                    <h2>Deativate Account</h2>
                    <p>Are you sure you want to deactivate your account? By doing this you will lose all of your saved data and will not be able to retrieve it.</p>
                    <div className="buttons_con">
                        <div className="single_btn" onClick={onClose}> Cancel </div>
                        <div className="single_btn"> Apply </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export function ApprovedPopup({ onClose }) {
    return (
        <div className="popup_overlay" onClick={onClose}>
            <div className="popup modern_alert" onClick={(e) => e.stopPropagation()}>
                <div className="popup_content">
                    <CheckIcon />
                    <h2>Approved</h2>
                    <p>Welcome to your personal medical portal</p>
                    <div className="buttons_con">
                        <div className="single_btn"> Get started </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export function SubscibePopup({ onClose }) {
    return (
        <div className="popup_overlay" onClick={onClose}>
            <div className="popup modern_alert" onClick={(e) => e.stopPropagation()}>
                <div className="popup_content">
                    <EmailIcon />
                    <h2>Subscribe</h2>
                    <p>Subscribe to our newsletter & stay updated.</p>
                    <div className="subscribe_form">
                        <input type="email" placeholder="Your Email" />
                        <button type="submit">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export function DashboardOptions({ onClose, onSwitchPopup }) {
    return (
        <div className="popup_overlay" onClick={onClose}>
            <div className="popup welcome_popup" onClick={(e) => e.stopPropagation()}>
                <div className="popup_content"> 
                    <h3>Welcome to My DeMed</h3> 
                    <div className="dashboard_options">
                        <div className='sl_button sign_up' onClick={() => onSwitchPopup('SignUp')}>Sign Up</div>
                        <div className='sl_button sign_in' onClick={() => onSwitchPopup('SignIn')}>sign In</div>

                        {/* This Needs to be updated as the above sign up form */}
                        <div className='sl_button continue_wallet' >Continue with wallet</div>
                    </div>
                </div>
            </div>
        </div>
    );
} 
export function VerificationPopup({ onClose }) {
    return (
        <div className="popup_overlay" onClick={onClose}>
            <div className="popup modern_alert" onClick={(e) => e.stopPropagation()}>
                <div className="popup_content">
                    <EmailIcon />
                    <h2>Verification</h2>
                    <p>Enter your email to confirm your account</p>
                    <div className="subscribe_form">
                        <input type="email" placeholder="Your Email" />
                        <button type="submit">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export function VerificationCode({ onClose }) {
    return (
        <div className="popup_overlay" onClick={onClose}>
            <div className="popup modern_alert" onClick={(e) => e.stopPropagation()}>
                <div className="popup_content">
                    <EmailIcon />
                    <h2>Code</h2>
                    <p>A verification code has been sent to your email, please enter it in the form below.</p>
                    <div className="subscribe_form">
                        <input type="text" placeholder="Your code" />
                        <button type="submit">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

/*------------------------------------------|
|              Messages Popups              |
|------------------------------------------*/
export function SuccessMessage({ text, onClose }) {
    setTimeout(() => {
        onClose()
    }, 2000);
    return (
        <div className="message_popup success_popup" >
            <CheckIcon />
            <h3>Success!</h3>
            <p> {text && ( text )} </p> 
        </div> 
    );
} 
export function ErrorMessage({ title, description, onClose }) {
    setTimeout(() => {
        onClose()
    }, 2000);
    return (
        <div className="message_popup error_message" >
            <X_icon />
            <h3>{title && ( title )}</h3>
            <p> {description && ( description )} </p> 
        </div> 
    );
} 