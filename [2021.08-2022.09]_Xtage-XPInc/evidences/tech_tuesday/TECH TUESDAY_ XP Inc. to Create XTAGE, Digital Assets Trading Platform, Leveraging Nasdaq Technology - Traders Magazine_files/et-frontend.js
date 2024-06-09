jQuery(document).ready(function($) {
    /*
     * Scrolling animation effect
     */
    new WOW().init();
    /*
     * Lightbox implementation
     */
    $('.et-lightbox-image').prettyPhoto({
        animation_speed: 'slow', /* fast/slow/normal */
        slideshow: 10000, /* false OR interval time in mss */
        social_tools: false,
        show_title: true,
        autoplay: true,
        opacity: 0.9,
        theme: 'light_square',
        deeplinking: false
    });

    /*
     *
     * @Horizontal timeline implementation
     */
    var et_slider = [];
    var et_timeline = [];
    $('.et-timeline-post-wrapper').each(function() {
        var selector = $(this);
        var id = $(this).data('id');
        var next_text = '<i class="fa fa-arrow-right" aria-hidden="true"></i>';
        var pre_text = '<i class="fa fa-arrow-left" aria-hidden="true"></i>';
        et_slider[id] = $(this).bxSlider({
            auto: false,
            pagerCustom: '#et-timeline-' + id,
            useCSS: false,
            touchEnabled: false,
            nextText: next_text,
            prevText: pre_text,
            pager: true,
            infiniteLoop: true,
            onSliderLoad: function(newIndex) {
                selector.closest('.et-horizontal-timeline').find('.et-active').removeClass("et-active");
                selector.closest('.et-horizontal-timeline').find('li a[data-slide-index="' + newIndex + '"]').addClass("et-active");
            },
            onSlideBefore: function($slideElement, oldIndex, newIndex) {
                selector.closest('.et-horizontal-timeline').find('.et-active').removeClass("et-active");
                selector.closest('.et-horizontal-timeline').find('li a[data-slide-index="' + newIndex + '"]').addClass("et-active");
                var slider = et_timeline[id];
                if (slider.getSlideCount() - newIndex >= count)
                    slider.goToSlide(newIndex);
                else
                    slider.goToSlide(slider.getSlideCount() - count);
            }
        });
    });
    var count = 0;
    $(".et-hor-timeline-date").each(function() {
        var id = $(this).data('id');
        et_timeline[id] = $(this).bxSlider({
            minSlides: 1,
            maxSlides: 3,
            useCSS: false,
            slideWidth: 350,
            moveSlides: 1,
            auto: false,
            touchEnabled: false,
            pager: false,
            infiniteLoop: true,
            controls: false
        });
    });
    var et_timeline_one = [];
    $(".et-timeline-one").each(function() {
        var id = $(this).data('id');
        var template = $(this).data('template');
        var next_text = '<i class="fa fa-angle-right" aria-hidden="true"></i>';
        var pre_text = '<i class="fa fa-angle-left" aria-hidden="true"></i>';
        if (template === 'template-4' || template === 'template-6') {
            var margin = 20;
        } else {
            margin = 0;
        }
        et_timeline_one[id] = $(this).bxSlider({
            minSlides: 1,
            maxSlides: 3,
            slideWidth: 360,
            moveSlides: 1,
            slideMargin: margin,
            auto: false,
            pager: false,
            useCSS: false,
            touchEnabled: false,
            infiniteLoop: true,
            nextText: next_text,
            prevText: pre_text
        });
    });

    $('.et-timeline-one').on('click', '.et-icon-block,.et-timeline-date-one, .et-top-date-line', function() {
        var id = $(this).closest('.et-timeline-one').data('id');
        et_timeline_one[id].goToNextSlide();
    });


    /*
     *  Toggle Template
     */
    $('.et-open-content').on("click", function() {
        $(".et-toggle-inner-content").slideUp(700);
        $(this).closest('.et-all-contain-here').find('.et-toggle-inner-content').slideDown(700);

    });


    /*
     * Pagination
     */

    /*
     * Builds Pagination Links
     *
     * @param {int} current_page
     * @param {int} total_page
     * @param {int} gallery_id
     * @param {string} layout_type
     * @return {string}
     */
    function et_build_pagination_html(current_page, total_page, post_id, layout_type, next_arrow, prev_arrow) {
        var pagination_html = '';
        if (current_page > 1) {
            pagination_html += '<li class="et-previous-page-wrap"><a href="javascript:void(0);" class="et-previous-page" data-total-page="' + total_page + '" data-layout-type="' + layout_type + '" data-post-id="' + post_id + '"  data-prev-arrow="' + prev_arrow + '" data-next-arrow="' + next_arrow + '">' + prev_arrow + '</a></li>';
        }
        var upper_limit = current_page + 2;
        var lower_limit = current_page - 2;
        if (upper_limit > total_page) {
            upper_limit = total_page;
        }

        if (lower_limit < 1) {
            lower_limit = 1;
        }
        if (upper_limit - lower_limit < 5 && upper_limit - 4 >= 1) {
            lower_limit = upper_limit - 4;
        }
        if (upper_limit < 5 && total_page >= 5) {
            upper_limit = 5;
        }

        for (var page_count = lower_limit; page_count <= upper_limit; page_count++) {
            var page_class = (current_page === page_count) ? 'et-current-page et-page-link' : 'et-page-link';
            pagination_html += '<li><a href="javascript:void(0);" data-total-page="' + total_page + '" data-page-number="' + page_count + '" class="' + page_class + '" data-layout-type="' + layout_type + '" data-post-id="' + post_id + '" data-prev-arrow="' + prev_arrow + '" data-next-arrow="' + next_arrow + '">' + page_count + '</a></li>';
        }
        if (current_page < total_page) {
            pagination_html += '<li class="et-next-page-wrap"><a href="javascript:void(0);" data-total-page="' + total_page + '" class="et-next-page" data-layout-type="' + layout_type + '" data-post-id="' + post_id + '" data-prev-arrow="' + prev_arrow + '" data-next-arrow="' + next_arrow + '">' + next_arrow + '</a></li>';
        }
        return pagination_html;
    }

    $('body').on('click', '.et-page-link', function() {
        var selector = $(this);
        selector.closest('.et-pagination-block').find('.et-page-link').removeClass('et-current-page');
        $(this).addClass('et-current-page');
        var layout_type = $(this).data('layout-type');
        var page_num = $(this).data('page-number');
        var post_id = $(this).data('post-id');
        var total_page = $(this).data('total-page');
        var next_arrow = $(this).data('next-arrow');
        var prev_arrow = $(this).data('prev-arrow');
        $.ajax({
            type: 'post',
            url: et_frontend_js_params.ajax_url,
            data: {
                action: 'et_pagination_action',
                _wpnonce: et_frontend_js_params.ajax_nonce,
                layout_type: layout_type,
                page_num: page_num,
                total_page: total_page,
                post_id: post_id,
                next_arrow: next_arrow,
                prev_arrow: prev_arrow

            },
            beforeSend: function(xhr) {
                selector.closest('.et-pagination-block').find('.et-ajax-loader').show();
            },
            success: function(response) {
                if (selector.closest('.et-main-blog-wrapper').find('.et-filter-wrap').length > 0) {
                    selector.closest('.et-main-blog-wrapper').find('.et-filter-trigger[data-filter-key="et-filter-all"]').click();
                }

                selector.closest('.et-pagination-block').find('.et-ajax-loader').hide();

                selector.closest('.et-main-blog-wrapper').find('.et-layout-' + layout_type + '-section .et-blog-cover').html(response);


                $('html, body').animate({
                    scrollTop: selector.closest('.et-main-blog-wrapper').find('.et-layout-' + layout_type + '-section').offset().top - 200 //this will keep content positioned correctly, but you shouldn't need both a '+ 200' and '- 200' here. Adjust this value as needed.
                }, 900);

                var pagination_html = et_build_pagination_html(page_num, total_page, post_id, layout_type, next_arrow, prev_arrow);
                selector.closest('.et-main-blog-wrapper').find('.et-pagination-block ul').html(pagination_html);

            }
        });
    });

    /**
     * Next Page Pagination
     *
     * @since 1.0.0
     */
    $('body').on('click', '.et-next-page,.et-previous-page', function() {
        var selector = $(this);
        var layout_type = $(this).data('layout-type');
        var post_id = $(this).data('post-id');
        var total_page = $(this).data('total-page');
        var current_page = $(this).closest('.et-pagination-block').find('.et-current-page').data('page-number');
        var next_page = parseInt(current_page) + 1;
        var previous_page = parseInt(current_page) - 1;
        var next_arrow = $(this).data('next-arrow');
        var prev_arrow = $(this).data('prev-arrow');
        if (selector.hasClass('et-previous-page')) {
            current_page = previous_page;
        } else {
            current_page = next_page;
        }

        $.ajax({
            type: 'post',
            url: et_frontend_js_params.ajax_url,
            data: {
                action: 'et_pagination_action',
                _wpnonce: et_frontend_js_params.ajax_nonce,
                layout_type: layout_type,
                page_num: current_page,
                post_id: post_id
            },
            beforeSend: function(xhr) {
                selector.closest('.et-pagination-block').find('.et-ajax-loader').show();
            },
            success: function(response) {
                if (selector.closest('.et-main-blog-wrapper').find('.et-filter-wrap').length > 0) {
                    selector.closest('.et-main-blog-wrapper').find('.et-filter-trigger[data-filter-key="et-filter-all"]').click();
                }
                selector.closest('.et-pagination-block').find('.et-ajax-loader').hide();

                selector.closest('.et-main-blog-wrapper').find('.et-layout-' + layout_type + '-section .et-blog-cover').html(response);

                $('html, body').animate({
                    scrollTop: selector.closest('.et-main-blog-wrapper').find('.et-layout-' + layout_type + '-section').offset().top - 200 //this will keep content positioned correctly, but you shouldn't need both a '+ 200' and '- 200' here. Adjust this value as needed.
                }, 900);

                var pagination_html = et_build_pagination_html(current_page, total_page, post_id, layout_type, next_arrow, prev_arrow);
                selector.closest('.et-main-blog-wrapper').find('.et-pagination-block ul').html(pagination_html);

            }
        });
    });

    /**
     * Load More Action
     *
     * @since 1.0.0
     */
    $('.et-load-more-trigger').click(function() {
        var selector = $(this);
        var layout_type = $(this).data('layout-type');
        var page_num = $(this).data('page-number');
        var post_id = $(this).data('post-id');
        var total_page = $(this).data('total-page');
        var next_page = parseInt(page_num) + 1;
        var current_date = $('.et-timeline-item').last().data('time');
        if (next_page <= total_page) {
            $.ajax({
                type: 'post',
                url: et_frontend_js_params.ajax_url,
                data: {
                    action: 'et_pagination_action',
                    _wpnonce: et_frontend_js_params.ajax_nonce,
                    layout_type: layout_type,
                    page_num: next_page,
                    post_id: post_id,
                    date: current_date
                },
                beforeSend: function(xhr) {
                    selector.hide();
                    selector.closest('.et-load-more-block').find('.et-ajax-loader').show();
                },
                success: function(response) {

                    selector.data('page-number', next_page);
                    selector.closest('.et-load-more-block').find('.et-ajax-loader').hide();
                    if (selector.closest('.et-main-blog-wrapper').find('.et-filter-wrap').length > 0) {
                        selector.closest('.et-main-blog-wrapper').find('.et-filter-trigger[data-filter-key="et-filter-all"]').click();
                    }

                    selector.closest('.et-main-blog-wrapper').find('.et-layout-' + layout_type + '-section .et-blog-cover').append(response);
                    if (next_page === total_page) {
                        selector.remove();
                    } else {

                        selector.show();
                    }
                }
            });
        } else {
            selector.remove();
        }
    });
    /**
     *Infinite Scroll Action
     *
     * @since 1.0.0
     */
    var infinte_load = 0;
    $('.et-infinite-load-trigger').click(function() {
        var selector = $(this);
        var layout_type = $(this).data('layout-type');
        var page_num = $(this).data('page-number');
        var post_id = $(this).data('post-id');
        var total_page = $(this).data('total-page');
        var next_page = parseInt(page_num) + 1;
        var current_date = $('.et-timeline-item').last().data('time');
        if (next_page <= total_page) {
            $.ajax({
                type: 'post',
                url: et_frontend_js_params.ajax_url,
                data: {
                    action: 'et_pagination_action',
                    _wpnonce: et_frontend_js_params.ajax_nonce,
                    layout_type: layout_type,
                    page_num: next_page,
                    post_id: post_id,
                    date: current_date
                },
                beforeSend: function(xhr) {
                    infinte_load = 1;
                    selector.hide();
                    selector.closest('.et-infinite-load').find('.et-infinite-loader').show();
                },
                success: function(response) {
                    infinte_load = 0;
                    selector.data('page-number', next_page);
                    selector.closest('.et-infinite-load').find('.et-infinite-loader').hide();
                    if (selector.closest('.et-main-blog-wrapper').find('.et-filter-wrap').length > 0) {
                        selector.closest('.et-main-blog-wrapper').find('.et-filter-trigger[data-filter-key="et-filter-all"]').click();
                    }


                    selector.closest('.et-main-blog-wrapper').find('.et-layout-' + layout_type + '-section .et-blog-cover').append(response);


                    if (next_page === total_page) {
                        selector.remove();
                    } else {

                        selector.show();
                    }
                }
            });
        } else {
            selector.remove();
        }
    });

    /*
     * History bar navigation
     */

    var id = $(".et-timeline-history").map(function() {
        return $(this).data("id");
    }).get();
    // console.log(id);
    var time = $(".et-timeline-history").map(function() {
        return $(this).data("time");
    }).get();
    for (var i = 0; i < id.length; i++) {

        $('#et-each-history-' + i).attr("href", '#' + id[i]);
        $('#et-each-history-' + i).html(time[i]);
    }

    $('.et-nav-history-bar').find("a").click(function(e) {
        e.preventDefault();

        var section = $(this).attr("href");
        $("html, body").animate({
            scrollTop: $(section).offset().top
        });
        $('.et-time-bar').removeClass('et-active');
        $(this).closest('.et-time-bar').addClass('et-active');
    });

    /** Initialize active class for on scroll event */
    if ($('.et-nav-history-bar a[href^="#"]').length > 0) {
        $(document).on("scroll", onScroll);
    }
    /** Add Class on scroll */
    function onScroll(event) {
        var scrollPos = $(document).scrollTop();
        $('.et-nav-history-bar a[href^="#"]').each(function() {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            if (refElement != '#' && $(refElement).length > 0) {
                if (refElement.position().top) {
                    if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                        $('.et-time-bar').removeClass('et-active');
                        $(this).closest('.et-time-bar').addClass('et-active');
                    }
                }
            }
        });
    }

    /**
     *  Infinte scroll Implementation
     * */

    $(window).scroll(function() {
        var top = ($('.et-infinite-scroll-wrapper').offset() || {"top": NaN}).top;
        var nav = $('.et-infinite-scroll-wrapper');
        if (!isNaN(top)) {
            if ($(window).scrollTop() >= nav.offset().top + nav.outerHeight() - window.innerHeight) {
                if (infinte_load === 0) {
                    $('.et-infinite-load-trigger:first').trigger('click');
                }
            }
        }
    });

    /*
     * Filter template implementation
     */
    $('.et-filter-trigger').click(function() {
        //alert('hi');
        var selector = $(this);
        var filter_key = selector.data('filter-key');
        var layout_type = selector.data('layout-type');
        //alert(layout_type);
        selector.closest('.et-filter-wrap').find('.et-filter-trigger').removeClass('et-active-filter');
        selector.addClass('et-active-filter');

        if (filter_key === 'et-filter-all') {
            selector.closest('.et-main-blog-wrapper').find('.et-timeline-date').removeClass('et-hidden-grid').addClass('et-visible-grid').show();

            selector.closest('.et-main-blog-wrapper').find('.et-timeline-item').removeClass('et-hidden-grid').addClass('et-visible-grid').show();

        } else {
            selector.closest('.et-main-blog-wrapper').find('.et-timeline-date').addClass('et-hidden-grid').removeClass('et-visible-grid').hide();
            selector.closest('.et-main-blog-wrapper').find('.et-timeline-item').addClass('et-hidden-grid').removeClass('et-visible-grid').hide();

            selector.closest('.et-main-blog-wrapper').find('.' + filter_key).removeClass('et-hidden-grid').addClass('et-visible-grid').show();
        }

    });

    //for slider of logo
    var et_extra_slider = [];
    $(".et-extra-slider-wrap").each(function() {
        var id = $(this).data('id');
        var next_text = '<i class="fa fa-angle-right" aria-hidden="true"></i>';
        var pre_text = '<i class="fa fa-angle-left" aria-hidden="true"></i>';
        et_extra_slider[id] = $(this).bxSlider({
            auto: false,
            control: true,
            pager: true,
            infiniteLoop: true,
            nextText: next_text,
            prevText: pre_text,
            touchEnabled: false

        });
    });
    $('.et-nav-one').click(function() {
        $(this).closest('.et-nav-history-bar').toggleClass('et-nav-active');

    });
    $('.et-year-wrap').click(function() {
        $(this).closest('.et-date-outer-wrap').find('.et-month-day-wrap').slideToggle();

    });

    $('.et-nav-three').click(function() {

        $(this).closest('.et-nav-history-bar').find('.et-time-wrap').slideToggle();

    });

    /* Get Variable price option for EDD
     */

    $('body').on('change', '.et-variable-price', function() {
        var price_id = $(this).val();
        var id = $(this).closest('.et-price').find('.et_price_options').data('id');
        var link = $(this).closest('.et-price').find('.et_price_options').data('link');
        $(this).closest('.et-timeline-item').find('.et-edd-price').attr("href", '' + link + '?edd_action=add_to_cart&download_id=' + id + '&edd_options[price_id]=' + price_id + '');
    });

    /*
     * Add class to last item of year to vertical layout
     */
    $('.et-timeline-line').each(function() {
        $('.et-timeline-line').prev('.et-timeline-item').addClass('et-last-child');
    });

});
