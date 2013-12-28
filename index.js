    $(document).ready(function(){

        //BROWSER SNIFF FOR MOBILE
            //Check for mobile webkit
            var ua = navigator.userAgent,
            isMobileWebkit = /WebKit/.test(ua) && /Mobile/.test(ua),
            isMSIE = (/MSIE (\d+\.\d+);/.test(ua)); 
        
        
        
            //If mobile device -- add a class to the html tag (will be used in CSS later)
            if (isMobileWebkit) {
              $('html').addClass('mobile');
            }
            
            //If internet explorer -- add a class to the html tag (will be used in CSS later)
            if (isMobileWebkit) {
              $('html').addClass('msie');
            }

        
        
        //SET THE PARALLAX SCROLLING ITEMS (non mobile only)
            $('html:not(.mobile) #parallax-creator').parallax("50%", -1.1);
            $('html:not(.mobile) .parallax-creator-img').parallax("50%", .5);
    
    
            $('html:not(.mobile) #parallax-developer').parallax("50%", .9 );
            $('html:not(.mobile) .parallax-developer-img').parallax("50%", .15);        
            $('html:not(.mobile) .parallax-developer-code').parallax("50%", -3);  
            
            
            $('html:not(.mobile) #parallax-organizer').parallax("50%", .5 );
            $('html:not(.mobile) .parallax-organizer-img').parallax("50%", .3 );
            $('html:not(.mobile) .parallax-organizer-img2').parallax("50%", .3 );
            $('html:not(.mobile) .parallax-organizer-img3').parallax("50%", .3 );
    
            
        //ENABLE SMOOTH SCROLLING 
        //  Note:   The click functions would work without this code block
        //          The page would simply jump to the correct anchor tag. 
            $('html:not(.mobile) .nav .scrollTo a').click(function(e) {
                e.preventDefault();
                to = $(this).attr('href');
                scrollTo(to); 
            });
    
            function scrollTo(elem){
                var top = $(elem).offset().top;
                top = Math.max(1, top-50 );
        
                $.scrollTo( top , {
                    duration: 1000,
                    easing: 'swing'
                });
            }
        //END SMOOTH SCROLL
        //=============================    
            
            
        
        //NAVIGATION AUTO HIGHLIGHT
            //Waypoints capture the current location during scroll
            $('.navPoint')
              .waypoint(function(direction) {
                  //When moving down the page... check for the anchor to be 300px from the top
                  if(direction=="down")
                    setActive( this.id );
              }, {
                offset: function() {
                    return 300; //Set for 300px down the screen
                }
              })
              .waypoint(function(direction) {
                  //When moving up the page... check for the anchor to be at the top of the page
                  if(direction=="up")
                    setActive( this.id );
              }, {
                offset: function() {
                    return 0; //Trigger upon entry
                }
              });
    
            //SetActive highlights the correct navigation button
            function setActive(point){
                $('.scrollTo').each( function(){
                    if( $(this).find('a[href="#' + point + '"]').length > 0){
                        $(this).addClass('active');
                    }else{
                        $(this).removeClass('active');
                    }
                });
            }
        //END NAVIGATION AUTO HIGHLIGHT
        //=============================    
            
            
        //SET THE FILTER BUTTON FUNCTION FOR PROJECTS
        //  NOTE: There is no "click" assigned.  The "active" class is a trigger for the "setFilter" function.
            //On hover set the highlight
            $('.pFilter').hover( function(){
                //Collect the filter key from the current button
                classKey = $(this).attr('data-project_filter');
                
                //Set the filter, add the new class key
                setFilter(classKey)
            }, 
            function(){
                //Set the filter on mouse out -- include only buttons that are pressed
                setFilter();
            });
            
            //Set the filters
            function setFilter(addClass){
                //Collect all the filter buttons that are active -- format in a string friendlyw ay
                arr = $.map( $('.pFilter.active') , function( n, i ) {
                  return ( "." + $(n).attr('data-project_filter') );
                });
               
               //If the param isn't undefined -- add to array
               if(addClass!=undefined)
                   arr.push('.'+addClass);
               
               //Reset all projects to inactive
                $('.ProjectHost').addClass('project-inactive');
               
               //Remove the inactive flag from projects that were selected
                $('.ProjectHost'+ arr.join("") ).removeClass('project-inactive');
           }
        //END PROJECT FILTERING
        //=============================    
    
            
        //ADD THE PROJECTS TO THE DOM            
            $.getJSON( "index_projects.json", function( data ) {
                    //Default variables
                    var items = [];
                    var projectsHTML='';
                    
                    //Locate the page template by ID
                    pageTemplate = $('#projectItem').html();	
                    
                    //Loop through all projects, queue up the HTML
                    $.each( data.projects , function( key, d ) {
                      projectsHTML=projectsHTML+pageTemplate.format(key, d.Title, d.Desc, d.Icon, d.Classes);
                    });
                    
                    //Add the new html to the DOM
                    $('#projectList').html( projectsHTML );
                    
                    //ADD THE FADE HOVER OPTION
                    $('.ph_frame').hover(
                        function(){
                            $(this).find('.caption').stop( false, true ).fadeIn(250);
                        },
                        function(){
                            $(this).find('.caption').stop( false, true ).fadeOut(250);
                        }
                    );    
            });        
        //END PROJECT ADDITIONS
        //=============================    
    
        
    })
    