
(function($) { "use strict";
    // $(".cursor-link-blog-post-1")
	// .on("mouseenter", function() {	 
	// $('.cursor').addClass("active-blog-post-1")	  
	// })
	// .on("mouseleave", function() {	  
	// $('.cursor').removeClass("active-blog-post-1")	  
	// })	
    var verifying = false;
    $(document).on('mouseenter', '.cursor-link-blog-post-1', function (event){	
        if (verifying) return; 
        $('.cursor').addClass("active-blog-post-1")	  
        $('#send').html('');
    })
    $(document).on('mouseleave', '.cursor-link-blog-post-1', function (event){
        if (verifying) return; 
        $('.cursor').removeClass("active-blog-post-1")	  
        $('#send').html('<span>揪！</span>');
    })
    
    $(document).on('click', '#send', function (event) {
        verifying = true;
        $('.cursor').removeClass("active-blog-post-1")	

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
                // // sendButton.css('background-color', '#71AFEE'); 
                // //linear-gradient(to top left, #FFFBE1,#FFB79B,#FEFACB, #D7E9E5),
                // sendButton.css('background', 'linear-gradient(to top left, #FFFBE1,#FFB79B,#FEFACB, #D7E9E5),linear-gradient(to top right, #71AFEE,    #FBE281, #F97241')
                sendButton.html('<span class="checkmark"></span>');
    
                setTimeout(function () {
                    $('#email').val(''); 
                    // sendButton.css('background','');
                    // sendButton.css('background-color', '#212121');
                    sendButton.prop('disabled', false).html('<span>揪！</span>');
                    verifying = false;
                }, 2000);
            }
            
        }).catch((error) => {
            sendButton.prop('disabled', false).html('<span>揪！</span>');
            verifying = false;
        });
    });

})(jQuery); 