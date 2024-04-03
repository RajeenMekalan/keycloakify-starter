<#macro emailLayout>
<html>
<head>
    <link rel="stylesheet" href='https://fonts.googleapis.com/css?family=DM%20Sans'>   
</head>
<body style="background-color: #F4F5F6; font-family: 'DM Sans', Arial, sans-serif;">
        <div style="padding: 24px; text-align: center; justify-content: center; margin: 0 auto;">
            <img src="assets/logo.png" alt="RiseHRlogo">
        </div>
        <div style="justify-content: center; margin: 0 auto; padding: 24px; max-width: 600px; background-color: white; border-radius: 16px;">
            <#nested>
        </div>            
        <div style="margin-top: 24px; font-weight: normal; font-size: 12px; color: #5E6067; text-align: center;">
            Copyright © 2024 Rise HR Team. All rights reserved<br>
            Powered by &nbsp; <img src="assets/logo.png" alt="risehr logo" style="width: 59px;height: 12px;">            
        </div>
    </body>
</html>
</#macro>
