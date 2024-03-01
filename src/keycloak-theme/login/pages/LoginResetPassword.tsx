import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import logo from "../assets/logo.png"

export default function LoginResetPassword(props: PageProps<Extract<KcContext, { pageId: "login-reset-password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { getClassName } = useGetClassName({
        doUseDefaultCss,
        classes
    });

    const { url, realm, auth } = kcContext;

    const { msg, msgStr } = i18n;

        // Function to handle form submission
        const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            postMessage({ type: "info", summary: "kindly check your email to reset your password" });
            console.log(postMessage);
        };

    return (
        <Template
            {...{ kcContext, i18n, doUseDefaultCss, classes }}
            displayMessage={false}
            headerNode={msg("emailForgotTitle")}
            infoNode={msg("emailInstruction")}
            height="350px" 
            bottom="100px"
        >
            <div>
                <img src={logo} style={{ width: '150px', height: '30px', marginRight: '10px', marginBottom: '20px' }} />
                <div style={{ fontWeight: 400, fontSize: '25px', lineHeight: '40px', color: '#253053', textAlign: 'left', marginBottom: '20px' }}>
                    Forgot Password
                </div>
            </div>
            <form id="kc-reset-password-form" className={getClassName("kcFormClass")} action={url.loginAction} method="post" onSubmit={handleFormSubmit}>              
                <div className={getClassName("kcFormGroupClass")}>
                    <div className="floating-label-group">
                        <input
                            type="text"
                            id="emailAddress"
                            name="emailAddress"
                            className={getClassName("kcInputClass") + " form-control"}
                            required

                        />
                        <label htmlFor="emailAddress" className={getClassName("kcLabelClass") + " floating-label"} >
                            Email Address
                        </label>
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
                        style={{ backgroundColor: '#2C82F9', borderRadius: '6px', color: '#FFFFFF' }}
                    />
                </div>
                <div className={getClassName("kcFormGroupClass")} style={{ textAlign: 'center', marginTop: '20px' }}>
                    <div className={getClassName("kcFormOptionsWrapperClass")}>
                        <span>
                            <a href={url.loginUrl} tabIndex={5} style={{ fontSize: '14px', color: '#2C82F9', fontWeight: '400' }}>
                                Sign - In
                            </a>
                        </span>
                    </div>
                </div>
            </form>
        </Template>
    );
}
