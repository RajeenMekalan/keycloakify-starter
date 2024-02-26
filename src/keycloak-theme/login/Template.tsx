// Copy pasted from: https://github.com/InseeFrLab/keycloakify/blob/main/src/login/Template.tsx

import { assert } from "keycloakify/tools/assert";
import { clsx } from "keycloakify/tools/clsx";
import { usePrepareTemplate } from "keycloakify/lib/usePrepareTemplate";
import { type TemplateProps } from "keycloakify/login/TemplateProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "./kcContext";
import type { I18n } from "./i18n";

export default function Template(props: TemplateProps<KcContext, I18n>) {
    const {
        displayInfo = false,
        displayMessage = true,
        displayRequiredFields = false,
        displayWide = false,
        showAnotherWayIfPresent = true,
        headerNode,
        showUsernameNode = null,
        infoNode = null,
        kcContext,
        i18n,
        doUseDefaultCss,
        classes,
        children
    } = props;

    const { getClassName } = useGetClassName({ doUseDefaultCss, classes });

    const { msg, changeLocale, labelBySupportedLanguageTag, currentLanguageTag } = i18n;

    const { realm, locale, auth, url, message, isAppInitiatedAction } = kcContext;

    const { isReady } = usePrepareTemplate({
        "doFetchDefaultThemeResources": doUseDefaultCss,
        "styles": [
            `${url.resourcesCommonPath}/node_modules/patternfly/dist/css/patternfly.min.css`,
            `${url.resourcesCommonPath}/node_modules/patternfly/dist/css/patternfly-additions.min.css`,
            `${url.resourcesCommonPath}/lib/zocial/zocial.css`,
            `${url.resourcesPath}/css/login.css`
        ],
        "htmlClassName": getClassName("kcHtmlClass"),
        "bodyClassName": getClassName("kcBodyClass")
    });

    if (!isReady) {
        return null;
    }

    return (
        <div className={getClassName("kcLoginClass")}>

            <div className="middle-container">
                {/* Left Side Container */}
                <div className="left-side">
                    <div style={{ width: '520px', height: '630px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

                        <div style={{ fontFamily: 'DaytonaPro-Light', fontWeight: 400, fontSize: '48px', lineHeight: '61.25px', color: '#253053', textAlign: 'center' }}>
                            Welcome Back!
                        </div>

                        <img src="./assets/left.svg" style={{ width: '500px', height: '500px' }} />

                        <div style={{ fontFamily: 'DaytonaPro-Regular', fontWeight: 400, fontSize: '16px', lineHeight: '20.77px', textAlign: 'center', marginTop: '20px' }}>
                            Lorem ipsum dolor sit amet, cons elit.
                        </div>

                        {/* Second label with specified styles */}
                        <div style={{ fontFamily: 'DaytonaPro-Regular', fontWeight: 400, fontSize: '16px', lineHeight: '20.77px', textAlign: 'center', marginTop: '10px' }}>
                            Lorem ipsum dolor sit amet, cons elit.
                        </div>
                    </div>
                </div>

                {/* Right Side Container */}
                <div className="right-side">
                    <div className={clsx(getClassName("kcFormCardClass"), displayWide && getClassName("kcFormCardAccountClass"))} style={{ width: '520px', height: '630px', borderRadius: '25px' }}>
                        <div id="kc-content">
                            <div id="kc-content-wrapper">
                                {/* App-initiated actions should not see warning messages about the need to complete the action during login. */}
                                {displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && (
                                    <div className={clsx("alert", `alert-${message.type}`)}>
                                        {message.type === "success" && <span className={getClassName("kcFeedbackSuccessIcon")}></span>}
                                        {message.type === "warning" && <span className={getClassName("kcFeedbackWarningIcon")}></span>}
                                        {message.type === "error" && <span className={getClassName("kcFeedbackErrorIcon")}></span>}
                                        {message.type === "info" && <span className={getClassName("kcFeedbackInfoIcon")}></span>}
                                        <span
                                            className="kc-feedback-text"
                                            dangerouslySetInnerHTML={{
                                                "__html": message.summary
                                            }}
                                        />
                                    </div>
                                )}
                                {children}
                                {auth !== undefined && auth.showTryAnotherWayLink && showAnotherWayIfPresent && (
                                    <form
                                        id="kc-select-try-another-way-form"
                                        action={url.loginAction}
                                        method="post"
                                        className={clsx(displayWide && getClassName("kcContentWrapperClass"))}
                                    >
                                        <div
                                            className={clsx(
                                                displayWide && [getClassName("kcFormSocialAccountContentClass"), getClassName("kcFormSocialAccountClass")]
                                            )}
                                        >
                                            <div className={getClassName("kcFormGroupClass")}>
                                                <input type="hidden" name="tryAnotherWay" value="on" />
                                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                                <a
                                                    href="#"
                                                    id="try-another-way"
                                                    onClick={() => {
                                                        document.forms["kc-select-try-another-way-form" as never].submit();
                                                        return false;
                                                    }}
                                                >
                                                    {msg("doTryAnotherWay")}
                                                </a>
                                            </div>
                                        </div>
                                    </form>
                                )}
                                {displayInfo && (
                                    <div id="kc-info" className={getClassName("kcSignUpClass")}>
                                        <div id="kc-info-wrapper" className={getClassName("kcInfoAreaWrapperClass")}>
                                            {infoNode}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
