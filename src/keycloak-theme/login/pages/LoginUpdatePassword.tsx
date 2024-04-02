import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import logo from "../assets/logo.png";
import random from "../assets/Random.svg";
import { useState } from "react";
import eyeicon from "../assets/eyeIcon.svg";
import eyeiconInvisible from "../assets/eyeIconInvisible.svg";

export default function LoginUpdatePassword(props: PageProps<Extract<KcContext, { pageId: "login-update-password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { getClassName } = useGetClassName({
        doUseDefaultCss,
        classes
    });

    const { url, realm, auth , username, isAppInitiatedAction} = kcContext;

    const { msg, msgStr } = i18n;

    const [isPasswordVisible , setPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible , setConfirmPasswordVisible] = useState(false);
    const [password, setPassword] = useState("");
    const [newPassword,setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const togglePasswordVisibility = () => {
        setPasswordVisible(!isPasswordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!isConfirmPasswordVisible);
    };

  const generatePasswordAndFill = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Prevent default form submission behavior

    let generatedPassword = ""; // Initialize an empty string for the generated password

    // Generate a password that meets the specified criteria
    do {
      generatedPassword = generateRandomPassword(); // Generate a random password
    } while (validatePassword(generatedPassword) !== ""); // Continue generating until the password meets the criteria

    // Set the generated password to both password and confirm password fields
    setNewPassword(generatedPassword);
    setConfirmPassword(generatedPassword);
  };

  const generateRandomPassword = (): string => {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  
    const getRandomChar = (chars: string): string => {
      return chars.charAt(Math.floor(Math.random() * chars.length));
    };
  
    let password = '';
  
    // Generate a random number between 8 and 10 inclusive for the password length
    const passwordLength = Math.floor(Math.random() * 3) + 8;
  
    // Ensure at least 1 of each required character type
    password += getRandomChar(lowercaseChars); // 1 lowercase
    password += getRandomChar(uppercaseChars); // 1 uppercase
    password += getRandomChar(numbers); // 1 number
    password += getRandomChar(numbers); // 1 number
    password += getRandomChar(specialChars); // 1 special character
  
    // Fill the rest of the password with random characters
    for (let i = 5; i < passwordLength; i++) {
      const chars = lowercaseChars + uppercaseChars + specialChars;
      password += getRandomChar(chars);
    }
  
    // Shuffle the password to randomize the order
    password = password.split('').sort(() => Math.random() - 0.5).join('');
  
    return password;
  };
  

    const validatePassword = (password: string): string => {
        // Password must contain minimum of 8 characters
        if (password.length < 8) {
            return "Password must contain minimum of 8 characters";
        }
        // Password must contain maximum of 10 characters
        if (password.length > 10) {
            return "Password must contain maximum of 10 characters";
        }
        // Password must contain at least 1 lowercase character
        if (!/[a-z]/.test(password)) {
            return "Password must contain at least 1 lowercase character";
        }
        // Password must contain at least 1 uppercase character
        if (!/[A-Z]/.test(password)) {
            return "Password must contain at least 1 uppercase character";
        }
        // Password must contain at least 2 numbers
        if ((password.match(/\d/g) || []).length < 2) {
            return "Password must contain at least 2 numbers";
        }
        // Password must contain at least 1 Special Character
        if (!/[^a-zA-Z0-9]/.test(password)) {
            return "Password must contain at least 1 Special Character";
        }
        return ""; // No error
    };

    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const confirmPasswordValue = event.target.value;
      setConfirmPassword(confirmPasswordValue);
    
      if (confirmPasswordValue === newPassword) {
        event.target.setCustomValidity('');
      } else {
        event.target.setCustomValidity('Passwords do not match');
      }
    };

    const handleInvalidInput = (event: React.FormEvent<HTMLInputElement>, errorMessage: string) => {
        const target = event.target as HTMLInputElement;
        target.setCustomValidity(errorMessage);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const target = event.target as HTMLInputElement;
      const error = validatePassword(event.target.value);
      setNewPassword(event.target.value);
      target.setCustomValidity(error);
  };

    return (
      <Template
        {...{ kcContext, i18n, doUseDefaultCss, classes }}
        headerNode={msg("updatePasswordTitle")}
      >
        <div>
          <img
            src={logo}
            style={{
              width: "150px",
              height: "30px",
              marginRight: "10px",
              marginBottom: "20px",
            }}
          />
          <div
            style={{
              fontWeight: 400,
              fontSize: "25px",
              lineHeight: "40px",
              color: "#253053",
              textAlign: "left",
              marginBottom: "20px",
            }}
          >
            Set Your Password
          </div>
        </div>

        <form
          id="kc-passwd-update-form"
          className={getClassName("kcFormClass")}
          action={url.loginAction}
          method="post"
        >
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            readOnly={true}
            autoComplete="username"
            style={{ display: "none" }}
          />
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="current-password"
            style={{ display: "none" }}
          />

          <div className={getClassName("kcFormGroupClass")}>
            <div className="floating-label-group">
              <input
                type={isPasswordVisible ? "text" : "password"}
                id="password-new"
                name="password-new"
                value={newPassword}
                className={getClassName("kcInputClass") + " form-control"}
                onChange={handlePasswordChange}
                required
              />
              <label
                htmlFor="password-new"
                className={getClassName("kcLabelClass") + " floating-label"}
              >
                New Password
              </label>
              <img
                src={isPasswordVisible ? eyeicon : eyeiconInvisible}
                alt="Toggle password visibility"
                className="password-toggle-icon"
                onClick={togglePasswordVisibility}
                style={{
                  cursor: "pointer",
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
            </div>
          </div>
          <div
            className={getClassName("kcFormGroupClass")}
            style={{ marginTop: "20px" }}
          >
            <div className="floating-label-group">
              <input
                type={isConfirmPasswordVisible ? "text" : "password"}
                id="password-confirm"
                name="password-confirm"
                className={getClassName("kcInputClass") + " form-control"}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                // onInvalid={(e) =>
                //   handleInvalidInput(e, "Confirm your Password")
                // }
                required
              />
              <label
                htmlFor="password-confirm"
                className={getClassName("kcLabelClass") + " floating-label"}
              >
                Confirm Password
              </label>
              <img
                src={isConfirmPasswordVisible ? eyeicon : eyeiconInvisible}
                alt="Toggle password visibility"
                className="password-toggle-icon"
                onClick={toggleConfirmPasswordVisibility}
                style={{
                  cursor: "pointer",
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
            </div>
          </div>
          <div id="kc-form-buttons">
            <input
              className={clsx(
                getClassName("kcButtonClass"),
                // getClassName("kcButtonPrimaryClass"),
                getClassName("kcButtonBlockClass"),
                getClassName("kcButtonLargeClass")
              )}
              type="submit"
              value="Reset Password"
              style={{
                backgroundColor: "#2C82F9",
                borderRadius: "6px",
                color: "#FFFFFF",
              }}
            />
          </div>

          {/* <div>
            <div id="kc-form-options" className={getClassName("kcFormOptionsClass")}>
              <div className={getClassName("kcFormOptionsWrapperClass")}>
                {isAppInitiatedAction && (
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" id="logout-sessions" name="logout-sessions" value="on" checked />
                      {msgStr("logoutOtherSessions")}
                    </label>
                  </div>
                )}
              </div>
            </div>

            <div id="kc-form-buttons">
              {isAppInitiatedAction ? (
                <>
                  <input
                    className={clsx(
                      getClassName("kcButtonClass"),
                      //getClassName("kcButtonPrimaryClass"),
                      getClassName("kcButtonLargeClass")
                    )}
                    type="submit"
                    defaultValue={msgStr("doSubmit")}
                    style={{
                      backgroundColor: "#2C82F9",
                      borderRadius: "6px",
                      color: "#FFFFFF",
                    }}
                  />
                  <button
                    className={clsx(
                      getClassName("kcButtonClass"),
                      getClassName("kcButtonDefaultClass"),
                      getClassName("kcButtonLargeClass")
                    )}
                    type="submit"
                    name="cancel-aia"
                    value="true"
                  >
                    {msg("doCancel")}
                  </button>
                </>
              ) : (
                <input
                  className={clsx(
                    getClassName("kcButtonClass"),
                    //getClassName("kcButtonPrimaryClass"),
                    getClassName("kcButtonBlockClass"),
                    getClassName("kcButtonLargeClass")
                  )}
                  type="submit"
                  value="Reset Password"
                  style={{
                    backgroundColor: "#2C82F9",
                    borderRadius: "6px",
                    color: "#FFFFFF",
                  }}
                />
              )}
            </div>
            
          </div> */}

          <div className="separator" style={{ marginTop: "30px" }}>
            <span style={{ fontSize: "14px", color: "#8C8C8C" }}>or</span>
          </div>
          <div id="kc-form-buttons">
            <button
              className={clsx(
                getClassName("kcButtonClass"),
                getClassName("kcButtonPrimaryClass"),
                getClassName("kcButtonBlockClass"),
                getClassName("kcButtonLargeClass")
              )}
              type="submit"
              onClick={generatePasswordAndFill}
              style={{
                borderRadius: "6px",
                fontSize: "14px",
                border: "1px solid #1E24323B",
                background: "#FFFFFF",
                color: "#2C82F9",
                fontWeight: "400px",
                paddingRight: "0px",
              }}
            >
              <img
                src={random}
                style={{
                  width: "14px",
                  height: "14px",
                  marginRight: "5px",
                  marginBottom: "2px",
                }}
              />
              Generate Password
            </button>
          </div>
        </form>
      </Template>
    );
}
