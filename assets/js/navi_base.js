var lxpMenuSupport = {
  event_init : function(){
    // 찜하기 ////////////////////////////////////////////
    $('.btn_hart').click(function(){
      $(this).toggleClass('active');
      return false;
    });    

    // 상단 마이메뉴 영역 /////////////////////////////////////
    $('.top-mymenu .title').click(function(){
      $('.modal-mymenu').show();
    });

    $('.modal-mymenu').mouseleave(function(){
      $(this).hide();
    });

    $('.btn-modal-mymenu-close').click(function(){
      $('.modal-mymenu').hide();
    });

    // 학습요소추가 버튼 //////////////////////////////////////
    $('.btn-learn_item').click(function(){
      $(this).next().show();
    });

    $('.learn_item_box').mouseleave(function(){
      $('.learn_item').hide();
    });



    // 로그인 박스: Desktop /////////////////////////////////////////////////////////////////////////
    $('a.btn_totalbox').click(function(){
      $(this).addClass('active');
      $('a.btn_normalbox').removeClass('active');
      $('.total_box').fadeIn();
      $('.normal_box').hide();
      return false;
    });

    $('a.btn_normalbox').click(function(){
      $(this).addClass('active');
      $('a.btn_totalbox').removeClass('active');
      $('.total_box').hide();
      $('.normal_box').fadeIn();
      return false;
    });

    // 학습자 프로필 영역 : 즐겨찾기 show/hide /////////////////////////////////////////////////////
    $('a.btn-favorite-edit').click(function(){ //즐겨찾기 편집화면으로 이동
      $('.default-view').slideToggle();
      $('.favorite-edit').slideToggle();
      return flase;
    });

    $('a.btn-favorite-back').click(function(){ //기본화면으로 이동
      $('.default-view').slideToggle();
      $('.favorite-edit').slideToggle();
      return flase;
    });


   

  }
}