
(function($) { "use strict";

    
    $(document).on('click', '#send', function (event) {
        const email = $('#email').val();
        let sendButton = $(this);
        sendButton.prop('disabled', true).html('<span class="loading-spinner"></span>');

        //let url = 'https://script.google.com/macros/s/AKfycbwL9vrIHWtbc1fbVQSr1jviVGtjDgcIj_cEsmeVLi5azEZOSDhDWslu69HPoGEwWNZa/exec'
        
        let url = 'https://script.google.com/macros/s/AKfycbxLMOJ4Ui6J5W6FXByWs-If0xIXmdZBgyaz0dGbKlpsIZWPZM-G2BPOKWaV-Y4pNMmF/exec'
        fetch(url, {
            redirect: "follow",
            method: "POST",
            headers: {
                "Content-Type": "text/plain",
            },
            body: JSON.stringify({
                page: document.title,
                email: email,
            }),
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`HTTP 錯誤: ${response.status}`);
            }
        }).then((data) => {
            console.log(data)
            if (data.result == 'success') {
                sendButton.css('background-color', '#71AFEE'); 
                sendButton.html('<span class="checkmark"></span>');
    
                setTimeout(function () {
                    $('#email').val(''); 
                    sendButton.css('background-color', '#212121');
                    sendButton.prop('disabled', false).html('<span>揪！</span>');
                }, 2000);
            }
            
        }).catch((error) => {
            sendButton.prop('disabled', false).html('<span>揪！</span>');
        });
    });

})(jQuery); 