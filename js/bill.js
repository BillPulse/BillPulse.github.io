
var visitedpage = false;
var FadeTime = 250;
var enableLoadingIcon = false;
var missingpage = false;

/*
var loadinghtml = 
  "<div class='loading position-absolute h-100'><div class='mx-auto my-auto'><i class='fas fa-spinner fa-spin'></i> </div></div>";
*/

$( document ).on("click", ".bp-button", function() {
    
    if (visitedpage == false){
      $( ".site-container" ).toggleClass( "modal-active" );
      $( ".site-container" ).toggleClass( "menu-active" );
      $( ".bp-button i" ).toggleClass( "fa-times" );
    }
    else{
      $( ".bp-button i" ).toggleClass( "fa-arrow-left" );
      $( ".bp-button" ).addClass( "d-lg-none");
     LoadPage(".content .content-dynamic", "home");
      visitedpage = false;
    }

    $( ".bp-button i" ).toggleClass( "fa-bars" );
  });

  $( document ).on("click", ".modal-close-bg" , function() {
    $( ".site-container" ).removeClass( "modal-active" );
    $( ".site-container" ).removeClass( "menu-active" );
    $( ".site-container" ).removeClass( "feature-inactive" );

    if (visitedpage == false){
      $( ".bp-button i" ).removeClass( "fa-times" );
      $( ".bp-button i" ).addClass( "fa-bars" );
    }
  });

  $( document ).on("click", ".modal-close .dev-card button", function() {
    $( ".site-container" ).removeClass( "modal-active" );
    $( ".site-container" ).removeClass( "menu-active" );
    $( ".site-container" ).removeClass( "feature-inactive" );
    if (visitedpage == false){
      $( ".bp-button i" ).removeClass( "fa-times" );
      $( ".bp-button i" ).addClass( "fa-bars" );
    }
  });


  $( window ).resize(function() {
    if(visitedpage == false){

      $( ".site-container" ).removeClass( "modal-active" );
      $( ".site-container" ).removeClass( "menu-active" );
      $( ".site-container" ).removeClass( "feature-inactive" );
      $( ".bp-button i" ).removeClass( "fa-times" );
      $( ".bp-button i" ).addClass( "fa-bars" ); 
    }
   
  });

 $( document ).on("click", ".bp-card", function(event) {
      event.preventDefault();

      var clickedcard = $(this).children(".title").children("strong").html();

      visitedpage = true;

      if (clickedcard == "What is a Bill?"){
        LoadingAnimation();
        LoadPage(".content .content-dynamic", "whats-a-bill");
      }
      else if (clickedcard == "News"){
        LoadingAnimation();
        LoadPage(".content .content-dynamic", "news");
      }
      else if (clickedcard == "The Mental Health Bill"){
        LoadingAnimation();
        LoadPage(".content .content-dynamic", "mental-health-bill");
      }
      else if (clickedcard == "Committee Hearings"){
        LoadingAnimation();
        LoadPage(".content .content-dynamic", "committee");
      }
      else if (clickedcard == "Your Followed Bills"){
        LoadingAnimation();
        LoadPage(".content .content-dynamic", "activitylog");
      }
      else{
          $( ".site-container" ).toggleClass( "modal-active" );
          $( ".site-container" ).toggleClass( "feature-inactive" );
          visitedpage = false;
      }

      if (visitedpage == true){
        $( ".bp-button i" ).removeClass( "fa-bars" );
        $( ".bp-button i" ).addClass( "fa-arrow-left" );
        $( ".bp-button" ).removeClass( "d-lg-none");
      }
    });

    $( document).on("click", ".bp-menu" ,function(event) {

      event.preventDefault();

      var clickedmenu = $(this).children(".menu-name").html();
      var currentactive = $(".bp-active-menu");
      var activateclicked = true;

      $(".bp-menu").removeClass("bp-active-menu");

      if (clickedmenu == "Home"){
        LoadPage(".content .content-dynamic", "home");
      }
      else if(clickedmenu == "Profile"){
        LoadPage(".content .content-dynamic", "profile");
      }
      else if(clickedmenu == "About"){
        LoadPage(".content .content-dynamic", "about");
      }
      else if(clickedmenu == "Bills"){
        LoadPage(".content .content-dynamic", "bills");
      }
      else if(clickedmenu == "Activity Log"){
        LoadPage(".content .content-dynamic", "activitylog");
      }
      else{
        $( ".site-container" ).addClass( "modal-active" );
        $( ".site-container" ).addClass( "feature-inactive" );

        $(currentactive).addClass("bp-active-menu");
        activateclicked = false;
      }

      if(activateclicked == true){
         $(this).addClass("bp-active-menu");


          if (visitedpage == true){
            $( ".bp-button i" ).removeClass( "fa-arrow-left" );
            $( ".bp-button" ).addClass( "d-lg-none");
            visitedpage = false;
          }
          else{
            $( ".bp-button i" ).removeClass( "fa-times" );
          }
          
          $( ".bp-button i" ).addClass( "fa-bars" );

          $( ".site-container" ).removeClass( "modal-active" );
          $( ".site-container" ).removeClass( "menu-active" );
          $( ".site-container" ).removeClass( "feature-inactive" );
      }
      
    });

    $( document ).on("click", "#pulsemodal .btn", function() {
        $(this).toggleClass("btn-danger");  
        $(this).toggleClass("btn-success");
    });

   $(document).on("click", "#btnfollow" ,function() {
      if($("#btnfollow").html() == '<i class="far fa-hand-pointer"></i> FOLLOW'){
        $("#btnfollow").html('<i class="far fa-check-circle"></i> FOLLOWED');
      }
      else{
        $("#btnfollow").html('<i class="far fa-hand-pointer"></i> FOLLOW');
      }
  });




$(document).ready(function(){
    var path = window.location.pathname;
    path = path.slice(1);
    $(".loading").fadeOut();
    setTimeout(function(){
      if(missingpage == false){
        LoadPage(".content .content-dynamic", "home");
      }
      else{
        LoadPage(".content .content-dynamic", path);
      }
      
    }, 100);


    if (window.history && window.history.pushState) {

      $(window).on('popstate', function() {
        var path = window.location.pathname;
        path = path.slice(1);
        LoadPage(".content .content-dynamic", "home");
      });

    }

});

function LoadingAnimation(){
  if (enableLoadingIcon == true){
     var currentdata = $(".content .content-dynamic").html();
      $(".content .content-dynamic").html(loadinghtml + currentdata);
      $(".loading").fadeOut();
  }
}

function LoadPage(classname, filename){
  $(classname).fadeOut(FadeTime);
  history.pushState(null, '', filename);
  setTimeout(function(){
      $(classname).load("data/" + filename + ".html", 
        function( response, status, xhr ) {
          if ( status == "error" ) {
            $(classname).load("data/page-notfound.html");
          }
      });





      $(classname).fadeIn(FadeTime);
  }, FadeTime);
  
}
