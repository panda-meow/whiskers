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

function register() {
    $(window).resize(function(){
        _setSlider();
    });
    _setSlider();
}
