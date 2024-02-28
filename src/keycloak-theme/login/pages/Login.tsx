import { useState, type FormEventHandler } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { useConstCallback } from "keycloakify/tools/useConstCallback";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import logo from "../assets/logo.png"
import microsoft from "../assets/microsoft.svg";

const my_custom_param= new URL(window.location.href).searchParams.get("my_custom_param");

if (my_custom_param !== null) {
    console.log("my_custom_param:", my_custom_param);
}

export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { getClassName } = useGetClassName({
        doUseDefaultCss,
        classes
    });

    const { social, realm, url, usernameHidden, login, auth, registrationDisabled } = kcContext;

    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    const onSubmit = useConstCallback<FormEventHandler<HTMLFormElement>>(e => {
        e.preventDefault();

        setIsLoginButtonDisabled(true);

        const formElement = e.target as HTMLFormElement;

        //NOTE: Even if we login with email Keycloak expect username and password in
        //the POST request.
        formElement.querySelector("input[name='email']")?.setAttribute("name", "username");

        formElement.submit();
    });

    return (
        <Template
            {...{ kcContext, i18n, doUseDefaultCss, classes }}
            displayInfo={social.displayInfo}
            displayWide={realm.password && social.providers !== undefined}
            headerNode={msg("doLogIn")}
            
        >

          
            <div id="kc-form" className={clsx(realm.password && social.providers !== undefined && getClassName("kcContentWrapperClass"))}>
                <div
                    id="kc-form-wrapper"
                >
                    <div>
                        <img src={logo} style={{ width: '150px', height: '30px', marginRight: '10px', marginBottom: '20px' }} />
                        <div style={{ fontWeight: 400, fontSize: '25px', lineHeight: '40px', color: '#253053', textAlign: 'left', marginBottom: '20px' }}>
                            Sign - In To Rise HR
                        </div>
                    </div>

                    {realm.password && (
                        <form id="kc-form-login" onSubmit={onSubmit} action={url.loginAction} method="post">
                            <div className={getClassName("kcFormGroupClass")} style={{marginTop:'30px'}}>
                                {!usernameHidden &&
                                    (() => {
                                        const label = !realm.loginWithEmailAllowed
                                            ? "username"
                                            : realm.registrationEmailAsUsername
                                                ? "email"
                                                : "usernameOrEmail";

                                        const autoCompleteHelper: typeof label = label === "usernameOrEmail" ? "username" : label;

                                        return (
                                            <>
                                                <div className="floating-label-group" style={{marginRight:'0px', marginLeft:'0px'}}>
                                                    <input
                                                        tabIndex={1}
                                                        id={autoCompleteHelper}
                                                        className={getClassName("kcInputClass") + " form-control"}
                                                        name={autoCompleteHelper}
                                                        defaultValue={login.username ?? ""}
                                                        type="text"
                                                        autoFocus={true}
                                                        autoComplete="off"
                                                    />
                                                    <label htmlFor={autoCompleteHelper} className={getClassName("kcLabelClass") + " floating-label"}>
                                                        Email Address
                                                    </label>
                                                </div>                                                                      
                                            </>                                           
                                        );
                                    })()}
                            </div>
                            <div className={getClassName("kcFormGroupClass")} style={{marginTop:'30px'}}>                             
                                <div className="floating-label-group" style={{ marginRight: '0px', marginLeft: '0px' }}>
                                    <input
                                        tabIndex={2}
                                        id="password"
                                        className={getClassName("kcInputClass") + " form-control"}
                                        name="password"
                                        type="password"
                                        autoComplete="off"
                                    />
                                    <label htmlFor="password" className={getClassName("kcLabelClass")+ " floating-label"}>
                                        Confirm Password
                                    </label>
                                </div>  
                            </div>
                            <div className={clsx(getClassName("kcFormGroupClass"), getClassName("kcFormSettingClass"))} style={{marginTop:'15px'}}>
                                <div id="kc-form-options">
                                    {realm.rememberMe && !usernameHidden && (
                                        <div className="checkbox">
                                            <label>
                                                <input
                                                    tabIndex={3}
                                                    id="rememberMe"
                                                    name="rememberMe"
                                                    type="checkbox"
                                                    {...(login.rememberMe === "on"
                                                        ? {
                                                            "checked": true
                                                        }
                                                        : {})}
                                                        style={{borderRadius:'4px'}}
                                                />
                                                <span style={{fontSize:'14px',color:'#5E6067'}}> {msg("rememberMe")} </span>
                                            </label>
                                        </div>
                                    )}
                                </div>                               
                            </div>
                            <div id="kc-form-buttons" className={getClassName("kcFormGroupClass")} style={{ marginTop: '10px'}}>
                                <input
                                    type="hidden"
                                    id="id-hidden-input"
                                    name="credentialId"
                                    {...(auth?.selectedCredential !== undefined
                                        ? {
                                            "value": auth.selectedCredential
                                        }
                                        : {})}
                                />
                                <input
                                    tabIndex={4}
                                    className={clsx(
                                        getClassName("kcButtonClass"),
                                        // getClassName("kcButtonPrimaryClass"),
                                        getClassName("kcButtonBlockClass"),
                                        getClassName("kcButtonLargeClass")
                                    )}
                                    name="login"
                                    id="kc-login"
                                    type="submit"
                                    value={"Sign - In"}
                                    disabled={isLoginButtonDisabled}
                                    style={{backgroundColor:'#2C82F9', borderRadius:'6px', color:'#FFFFFF'}}
                                />
                            </div>
                            <div className={getClassName("kcFormGroupClass")} style={{ textAlign: 'center',marginTop:'10px' }}>
                                <div className={getClassName("kcFormOptionsWrapperClass")}>
                                    {realm.resetPasswordAllowed && (
                                        <span>
                                            <a tabIndex={5} href={url.loginResetCredentialsUrl} style={{fontSize:'14px', color:'#2C82F9', fontWeight:'400'}}>
                                                Forgot Password?
                                            </a>
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className={getClassName("kcFormGroupClass")} style={{marginTop:'20px' }} >
                                <div className="separator">
                                    <span style={{fontSize:'14px', color:'#8C8C8C'}}>or continue with:</span>
                                </div>
                            </div>
                            <div className={getClassName("kcFormGroupClass")} style={{ marginTop:'10px' }}>
                                {realm.password && social.providers !== undefined && (
                                    <div
                                        id="kc-social-providers"                                       
                                    >
                                        <ul
                                            className={clsx(
                                                getClassName("kcFormSocialAccountListClass"),
                                                social.providers.length > 4 && getClassName("kcFormSocialAccountDoubleListClass")
                                            )}
                                        >
                                            {social.providers.map(p => (
                                                <li key={p.providerId} className={getClassName("kcFormSocialAccountListLinkClass")}>
                                                    <a href={p.loginUrl} id={`zocial-${p.alias}`} className={clsx("zocial", p.providerId)} style={{ borderRadius: '6px', fontSize: '14px', border: '1px solid #1E24323B', background: '#FFFFFF', color: '#253053' }} >
                                                        <img src={microsoft} style={{ width: '20px', height: '20px', marginRight: '5px'}} />
                                                        <span>{p.displayName}</span>
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                            
                        </form>
                    )}
                </div>
            </div>
            
        </Template>
    );
}
