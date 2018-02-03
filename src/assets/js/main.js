
function _setCuts(){
    console.log("Cuts");

    console.log($('#mirror-slider').find('.slides').find('li').children().length);
    console.log($('#mirror-slider').find('.slides').html());

    $('#mirror-slider').find('.slides').find('li').each(function(){
        console.log("each slide");
        var $that = $(this);
        var $image = $that.find('img');
        $that.append('<div class="cut"></div>');
        for (var i = 0; i < 10; i++) {
            console.log("cut");
            $that.find('.cut').append('<span></span>');
        }
        $that.find('.cut span').css('background-image', 'url('+$image.attr('src')+')');
        $image.remove();
    });
}

function _setSlider(){
    var $height = $(window).height()-300;
    if($height%2 === 1) {
        $height++;
    }
    
    $('#mirror-slider').css('height', $height + 'px');

    $('#mirror-slider').find('.slides').find('li').each(function(){
        $(this).find('.cut span').each(function(i){
            var $y = -($('#mirror-slider').height() / 10)*i;
            $(this).css('background-position', '50% '+$y+'px');
        });
    });
}


function load_top() {

    var $mddShare = $('#mdd-share'),
        $mddShareOpen = $('#mdd-share--open'),
        $mddShareClose = $('#mdd-share--close'),
        $mddShareLayer = $('#mdd-share--layer');

    $mddShareOpen.on('click', function(){
        $mddShare.addClass('in');
        return false;
    });

    $mddShareClose.on('click', function(){
        $mddShare.removeClass('in');
        return false;
    });

    $mddShareLayer.find('.md-share').on('click', function(){
        window.open(jQuery(this).attr('href'), '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
        return false;
    });

    var $mirrorSlider = $('#mirror-slider'),
        $slides = $mirrorSlider.find('.slides'),
        $current = 0,
        $isMoving = false
        $isInit = false;



    /*$mirrorSlider.find('.nav a').on('click', function(){
        if(!$isMoving){
            $isMoving = true;
            $slides.find('li').eq($current).addClass('next-out');

            if($(this).data('dir') === 'prev'){
                
                $current--;
                if($current < 0 ){
                    $current = $slides.find('li').length - 1;
                }

            } else {

                $current++;
                if($current > ($slides.find('li').length - 1) ){
                    $current = 0;
                }

            }

            $slides.find('li').eq($current).addClass('next-in');

            setTimeout(function(){
                $slides.find('li.current').removeClass();
                $slides.find('li').eq($current).removeClass().addClass('current');
            }, 10);

            setTimeout(function(){
                $isMoving = false;
            }, 1500);

            $('.thumbs').toggleClass('next');
            $('.titles').toggleClass('next');
        }

        return false;
    });*/
}

function register() {
    setTimeout(function(){
        $('#mirror-slider').find('.slides').find('li').eq(0).removeClass('first').addClass('current');
    }, 10);

    $(window).resize(function(){
        _setSlider();
    });

    //_setCuts();
    _setSlider();
}
