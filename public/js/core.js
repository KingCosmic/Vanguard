/*
    No need to touch this code, it's only for testing purposes!!!!
    King u suck.
*/
var all_set;
$('input').keydown((event) => {
  console.log("dud");
  if ($('input#username').val().length == 4) {
    $('div#username_wrap').addClass('all_set');
    all_set = true;
    $('h1').css({'text-shadow': '0 0 0px rgba(40, 41, 42, .98)'});
  };
});

$('div#username_wrap').click(() => {
  if (all_set == true && $('div#username_wrap').hasClass('all_set')) {
    $('div#username_wrap').addClass('hide').removeClass('all_set');
    window.setTimeout(function () {
      $('div.completed').text('Username Here!');
      $('div.username_label').text('Battle Master');
    }, 500);
};
});
