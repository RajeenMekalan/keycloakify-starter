import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import logo from "../assets/logo.png"

export default function MyExtraPage2(props: PageProps<Extract<KcContext, { pageId: "my-extra-page-3.ftl"; }>, I18n>) {

    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { getClassName } = useGetClassName({
        doUseDefaultCss,
        classes
    });

    const { url, realm, auth } = kcContext;

    const { msg, msgStr } = i18n;


    return (
        <Template
            {...{ kcContext, i18n, doUseDefaultCss, classes }}
            displayMessage={false}
            headerNode={msg("emailForgotTitle")}
            infoNode={msg("emailInstruction")}
        >
            <div>
                <img src={logo} style={{ width: '150px', height: '30px', marginRight: '10px', marginBottom: '20px' }} />
                <div style={{ fontWeight: 400, fontSize: '25px', lineHeight: '40px', color: '#253053', textAlign: 'left', marginBottom: '20px' }}>
                    Set Your Password
                </div>
            </div>
            <form id="kc-reset-password-form" className={getClassName("kcFormClass")} action={url.loginAction} method="post">
                <div className={getClassName("kcFormGroupClass")}>
                    <div className={getClassName("kcLabelWrapperClass")}>
                        <label htmlFor="newPassowrd" className={getClassName("kcLabelClass")}>
                           New Password
                        </label>                       
                    </div>
                    <div className={getClassName("kcInputWrapperClass")}>
                        <input
                            type="text"
                            id="newPassowrd"
                            name="newPassowrd"
                            className={getClassName("kcInputClass")}
                            autoFocus                           
                        />
                    </div>
                </div>
                <div className={getClassName("kcFormGroupClass")}>
                    <div className={getClassName("kcLabelWrapperClass")}>
                        <label htmlFor="confirmPassword" className={getClassName("kcLabelClass")}>
                           Confirm Password
                        </label>
                    </div>
                    <div className={getClassName("kcInputWrapperClass")}>
                        <input
                            type="text"
                            id="confirmPassword"
                            name="confirmPassword"
                            className={getClassName("kcInputClass")}
                            autoFocus
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
                        style={{ backgroundColor: '#2C82F9', borderRadius: '6px', color: '#FFFFFF' }}
                    />
                </div>
                <div className="separator" style={{ marginTop: '30px'}}>
                    <span style={{ fontSize: '14px', color: '#8C8C8C' }}>or</span>
                </div>
                <div id="kc-form-buttons">
                    <input
                        className={clsx(
                            getClassName("kcButtonClass"),
                            getClassName("kcButtonPrimaryClass"),
                            getClassName("kcButtonBlockClass"),
                            getClassName("kcButtonLargeClass")
                        )}
                        type="submit"
                        value="Generate Password"
                        style={{ borderRadius: '6px', fontSize: '14px', border: '1px solid #1E24323B', background: '#FFFFFF', color: '#2C82F9', fontWeight: '400px', paddingRight: '0px' }}
                    />
                </div>
            </form>
        </Template>
    );

}
