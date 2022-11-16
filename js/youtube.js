// Load the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Replace the 'ytplayer' element with an <iframe> and
// YouTube player after the API code downloads.
var player1_player = null;
var player1_list = null;

function onYouTubePlayerAPIReady() {
    player1_list = $('.video_box_player_1').attr('data-video-id')
    player1_player = new YT.Player('player_1', {
        height: '646.875',
        width: '1150',
        videoId: player1_list,
        playerVars: {
            // listType:'playlist',
            // list:player1__list,
            'playlist':['mPxFLpdw-44', 'rrI7tOhoVzA', 'aGUlfPcEyRc'],
            'index':parseInt(0),
            'autoplay': 0, 
            'loop': 1,
            'controls': 0,
            'rel' : 0,
        },
        events: {
            'onReady': player1_onPlayerReady,
        },
    });
}


function player1_play(videoId) {
    player1_player.loadVideoById(videoId);
}

function player1_onPlayerReady(event) {
    event.target.playVideo();
    event.target.mute();
    event.target.setPlaybackQuality('hd1080');
}

$(document).on('ready', function(){

    let ytArray = ['mPxFLpdw-44', 'rrI7tOhoVzA', 'aGUlfPcEyRc'];

    $('.yt_list button').on('click', function(){
        player1_player.loadVideoById(ytArray[$(this).index()]);
    });
});

