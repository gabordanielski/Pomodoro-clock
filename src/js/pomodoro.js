$(function(){

  let session_time=25;
  let break_time=5;
  let mode="session";

  let min = 25;
  let sec = 0;

  let clock = false;
  let each_sec_interval;

  // '+' '-' BUTTONS EVENTS

  $('.session_plus').click(function() {
    $(this).parent().find('span').html(parseInt($(this).parent().find('span').html()) + 1);
    session_time++;
    if (mode == "session") {
      min = session_time;
      sec = 0;
    }
    $('.session_time').html(session_time);
  });

  $('.session_minus').click(function() {
    $(this).parent().find('span').html(parseInt($(this).parent().find('span').html()) - 1);
    session_time--;
    if (mode == "session") {
      min = session_time;
      sec = 0;
    }
    $('.session_time').html(session_time);
  });

  $('.break_plus').click(function() {
    $(this).parent().find('span').html(parseInt($(this).parent().find('span').html()) + 1);
    break_time++;
    if (mode == "break") {
      min = break_time;
      sec = 0;
    }
    $('.break_time').html(break_time);
  });

  $('.break_minus').click(function() {
    $(this).parent().find('span').html(parseInt($(this).parent().find('span').html()) - 1);
    break_time--;
    if (mode == "break") {
      min = break_time;
      sec = 0;
    }
    $('.break_time').html(break_time);
  });

//  CLOCK CLICK EVENT

  $('.clock').click(function() {
    if (mode == 'session') {
      if (clock == false) {
        clock = true;
        $('.break_minus').attr('disabled', true).css('color', 'black');
        $('.break_plus').attr('disabled', true).css('color', 'black');
        $('.session_minus').attr('disabled', true).css('color', 'black');
        $('.session_plus').attr('disabled', true).css('color', 'black');
        each_sec_interval = setInterval(() => {
          if (sec == 0 && min == 0) {
            changeMode();
          }
          else if (sec == 0) {
            min--;
            sec = 59;
            $('.clock .session_time').html(min + ":" + sec);
            checkFill();
          }
          else if (sec > 0) {
            sec--;
            $('.clock .session_time').html(min + ":" + sec);
            if (sec < 10) {
              $('.clock .session_time').html(min + ":0" + sec);
            }
            checkFill();
          }
        }, 1000);
      }
      else {
        clock = false;
        $('.break_minus').attr('disabled', false);
        $('.break_plus').attr('disabled', false);
        $('.session_minus').attr('disabled', false);
        $('.session_plus').attr('disabled', false);
        clearInterval(each_sec_interval);
      }
    }
    if (mode == "break") {
      if (clock == false) {
        clock = true;
        $('.break_minus').attr('disabled', true).css('color', 'black');
        $('.break_plus').attr('disabled', true).css('color', 'black');
        $('.session_minus').attr('disabled', true).css('color', 'black');
        $('.session_plus').attr('disabled', true).css('color', 'black');
        each_sec_interval = setInterval(() => {
          if (sec == 0 && min == 0) {
            changeMode();
          }
          else if (sec == 0) {
            min--;
            sec = 59;
            $('.clock .break_time').html(min + ":" + sec);
            checkFill();
          }
          else if (sec > 0) {
            sec--;
            $('.clock .break_time').html(min + ":" + sec);
            if (sec < 10) {
              $('.clock .break_time').html(min + ":0" + sec);
            }
            checkFill();
          }
        }, 1000);
      }
      else {
        clock = false;
        $('.break_minus').attr('disabled', false);
        $('.break_plus').attr('disabled', false);
        $('.session_minus').attr('disabled', false);
        $('.session_plus').attr('disabled', false);
        clearInterval(each_sec_interval);
      }
    }
  });

  // CHANGE BETWEEN SESSION AND BREAK MODES
  function changeMode(){
    $('.fill').css('height','0%');
    $('.clock').addClass('shadow-pulse');
    $('.clock').on('animationend', function(){
        $('.clock').removeClass('shadow-pulse');
    });
    if(mode=="session"){
      $('.clock .session_time').css('display','none');
      $('.clock .break_time').css('display','block');
      $('.clock .break_time').html($('.span_break').html());
      mode="break";
      $('.action').html("Break");
      sec=0;
      min=parseInt($('.span_break').html());
      clearInterval(each_sec_interval);
      clock=false;
      $('.clock').click();
    }
    else if(mode=="break"){
      $('.clock .break_time').css('display','none');
      $('.clock .session_time').css('display','block');
      $('.clock .session_time').html($('.span_session').html());
      mode="session";
      $('.action').html("Session");
      sec=0;
      min=parseInt($('.span_session').html());
      clearInterval(each_sec_interval);
      clock=false;
      $('.clock').click();
    }
  }

  // CHECK % OF CLOCK FILL
  function checkFill(){
    if(mode=="session"){
      let fill_proc=''+((session_time*60*1000)-((sec*1000)+(min*60*1000)))/(session_time*60*10)+'%';
      $('.fill').css('height',fill_proc);
    }
    else if(mode=="break"){
      let fill_proc=''+((break_time*60*1000)-((sec*1000)+(min*60*1000)))/(break_time*60*10)+'%';
      $('.fill').css('height',fill_proc);
    }
  }

});
