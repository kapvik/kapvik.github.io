$(document).ready(() => {

    const $ticketForm = $('#ticket-form')

    $($ticketForm).validate({
        rules: {
            name: {
                required: true,
                minlength: 3
            },
            lastName: {
                required: true,
                minlength: 3
            },
            email: {
                required: true,
                email: true
            },
            ticketType: {
                required: true
            },
            captcha: {
                required: true
            }
        },
        submitHandler: submitForm,

        //display the error message before inputs[type = radio]
        errorPlacement: (error, element) => {
            if ( element.is(":radio") ) {
                error.appendTo( $('.ticket_error') );
            }else {
                error.insertAfter( element );
            }
         }
    })

    function submitForm(){
        $.ajax({
            type: "POST",
            url: "./oop_registration.php",
            data: $ticketForm.serialize(),
            dataType: 'json',
            encode: true,
            success: data => {
                $('span').text('');
                $('#success > p').text('');
                if(!data.success) {
                    $('span').text('');
                    //displaing the error message after each invalid input
                    for (i in data.errors) {
                        $('.'+ i + '_error').html(data.errors[i])
                        $('#' + i ).val('');
                    }
                } else {
                    $('#success').append('<p class="text-center text-success">' + data.msg + '</p>');
                    $('.user-data').val('');
                    setTimeout(function() {
                        location.reload();  //Refresh page
                      }, 5000);
                    
                }
            }
        })
    }

    // refresh the captcha
    $('#refresh').click(function () {
        $('#captchaImg').attr('src', 'captcha.php?' + (new Date()).getTime())
    })
})