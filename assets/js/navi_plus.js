var lxpMenuSupport = {
  event_init : function(){

    // 통합검색 /////////////////////////////////////////////
    $('.total-searchform').focus(function(e){
        $('.auto-save').slideDown(200);
        return false;
    });

    $('.total-searchform').blur(function(e){
        $('.auto-save').hide();
        return false;
    });

    // footer 관련사이트 바로가기 ///////////////////////////
    $('a.btn-family-site').click(function() {
      // 리스트가 화면에 보이지 않는(숨겨진) 상태라면
      if (!$('.relative-site-list').is(':visible')) {
        $('.relative-site-list').slideDown();
      } 
      // 리스트가 화면에 보이고 있는 상태라면
      else {
        $('.relative-site-list').slideUp(); // hide()보다 slideUp이 자연스러워요
      }      
      return false;
    });

  }
}