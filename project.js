    $(document).ready(function(){


        //BROWSER SNIFF FOR MOBILE
            //Check for mobile webkit
            var ua = navigator.userAgent,
            isMobileWebkit = /WebKit/.test(ua) && /Mobile/.test(ua);
    
            //If mobile device -- add a class to the html tag (will be used in CSS later)
            if (isMobileWebkit) {
              $('html').addClass('mobile');
            }

        
        
        
        var id = getURLParameter('id');
        
        $.getJSON( "index_projects.json", function( data ) {
              var items = [];
              var projectsHTML='';
              var imagesHTML='';
              var d;
            
              //Load the js templates
              pageTemplate = $('#projectDesc').html();	
              imageTemplate = $('#projectImage').html();	

              d = data.projects[id];
              projectsHTML=projectsHTML+pageTemplate.format(id, d.Title, d.Desc, d.Icon, d.LongDesc);
              $('#projectInfoHost').append( projectsHTML );

            
            //Template the images
              $.each( data.projects[id].Images , function( key, d ) {
                  imagesHTML=imagesHTML+imageTemplate.format(key, d.Path);     
              });
              $('#projectImageHost').append( (imagesHTML)   );

            
            
            
            
            
            
                //ADD THE FADE HOVER OPTION
                $('.fade').hover(
                    function(){
                        $(this).find('.caption').stop( false, true ).fadeIn(250);
                    },
                    function(){
                        $(this).find('.caption').stop( false, true ).fadeOut(250);
                    }
                );    
        });        
        
        

        //ADJUST MENU OPTIONS ACCORDINGLY
        $('.scrollTo a').each( function(){
            $(this).attr('href', 'index.html'+ $(this).attr('href') );
        });

            
        
   
        
        
       
        
        
    })
    
    
    function getURLParameter(name) {
        return decodeURI(
            (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
        );
    }
        