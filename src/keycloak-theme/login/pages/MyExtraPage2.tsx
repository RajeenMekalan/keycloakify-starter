import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import logo from "../assets/logo.png"

export default function MyExtraPage2(props: PageProps<Extract<KcContext, { pageId: "my-extra-page-2.ftl"; }>, I18n>) {
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
        height="350px" 
        bottom="100px"
    >
        <div>
            <img src={logo} style={{ width: '150px', height: '30px', marginRight: '10px', marginBottom: '20px' }} />
            <div style={{ fontWeight: 400, fontSize: '25px', lineHeight: '40px', color: '#253053', textAlign: 'left', marginBottom: '20px' }}>
                Forgot Password
            </div>
        </div>
        <form id="kc-reset-password-form" className={getClassName("kcFormClass")} action={url.loginAction} method="post">
            <div className={getClassName("kcFormGroupClass")}>                                     
                    <div className="floating-label-group">
                        <input
                            type="password"
                            id="emailAddress"
                            name="emailAddress"
                            className={getClassName("kcInputClass") + " form-control"}
                            
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
            <div className={getClassName("kcFormGroupClass")} style={{ textAlign: 'center',marginTop:'20px'  }}>
                    <div className={getClassName("kcFormOptionsWrapperClass")}>                   
                            <span>
                                <a tabIndex={5} style={{ fontSize: '14px', color: '#2C82F9', fontWeight: '400'}}>
                                    Sign - In
                                </a>
                            </span>
                    </div>
                </div>
        </form>
    </Template>
    );
}
