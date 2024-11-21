
(function($) { "use strict";
    console.log($('#send'))
    $(document).on('click', '#send', function (event) {
        const email = $('#email').val();
        let sendButton = $(this);
        sendButton.prop('disabled', true).html('<span class="loading-spinner"></span>');

        $.ajax({
            type: 'POST',
            url: 'https://script.google.com/macros/s/AKfycbwL9vrIHWtbc1fbVQSr1jviVGtjDgcIj_cEsmeVLi5azEZOSDhDWslu69HPoGEwWNZa/exec',
            data: JSON.stringify({
                email: email,
                name: "test",
            }),                             // 將資料轉為 JSON 字符串
            contentType: "application/json", // 設定 Content-Type
            success: function (response) {
                sendButton.css('background-color', '#71AFEE'); 
                sendButton.html('<span class="checkmark"></span>');

                setTimeout(function () {
                    $('#email').val(''); 
                    sendButton.css('background-color', '#212121');
                    sendButton.prop('disabled', false).html('<span>揪！</span>');
                }, 2000);
            },
            error: function (xhr, status, error) {
                // $('#errorMessage').show();
                // console.error('提交失敗:', error);

                // // 恢復按鈕狀態
                sendButton.prop('disabled', false).html('<span>揪！</span>');
            }
        });
    });

})(jQuery); 