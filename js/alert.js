$(document).ready(function () {
    if(window.location.href.indexOf("negash.ir") > -1) {

    }
    else
    {
      var alertst =  "<div style=' position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; background:#000; color: #fff; z-index: 2000000000000;'>"
                     +  "<div style=' padding: 50px; color:#fff;'> "
                     +  "<h6 style='font-size: 50px; line-height: 1.6em; color:#fff;'><span style='font-size: 80px;color:#ff0000;'>هشدار:&nbsp;</span> برای حفظ حقوق سایت کدها و لینک هایی در کد دمو درج شده است تا یا سیستم های وبلاگدهی آنها را قبول نکنند و یا لااقل به صورت ناقص نمایش داده شوند. پس به حقوق دیگران احترام گذاشته و از کپی کردن کد از طریق صفحه دمو خودداری نمایید.</h6>"
                     +  "</div> "
                     +  "</div>"
                     + "<style> p, h1, h2, h3,h4 ,h5 { font-size: 200px !important;color: #ff0000 !important; } img {width: 5px !important; height: 5px !important;} body,html { overflow: hidden !important;} </style>"



     $('body').append(alertst);

   //  $('#mmmmmm').show();
    }
});